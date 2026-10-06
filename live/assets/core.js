/* =========================================================================
   Live Slides — спільне ядро для presenter.html і live.html
   Рендер слайдів + два транспорти синхронізації:
     • Firebase Realtime Database (робочий режим)
     • BroadcastChannel (?demo — перевірка в одному браузері без Firebase)
   ========================================================================= */
(function () {
  'use strict';
  const LS = (window.LS = {});

  LS.params = new URLSearchParams(location.search);
  LS.isDemo = LS.params.has('demo');

  /* ---------- утиліти ---------- */
  LS.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  LS.loadScript = (src) => new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = res;
    s.onerror = () => rej(new Error('Не вдалося завантажити ' + src));
    document.head.appendChild(s);
  });

  LS.store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* приватний режим */ } },
  };

  LS.norm = (s) => String(s || '').trim().toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, ' ').replace(/[.!?,;]+$/, '');

  LS.roomCode = () => {
    const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const b = crypto.getRandomValues(new Uint8Array(4));
    return Array.from(b, (x) => a[x % a.length]).join('');
  };

  LS.validRoom = (r) => /^[A-Z0-9]{4,8}$/.test(r || '');

  LS.joinUrl = (room) => {
    const u = new URL('live.html', location.href);
    u.search = '';
    u.searchParams.set('room', room);
    if (LS.isDemo) u.searchParams.set('demo', '');
    return u.toString().replace('demo=', 'demo');
  };

  LS.qr = (el, text, size) => {
    el.innerHTML = '';
    if (!window.QRCode) { el.textContent = text; return; }
    new window.QRCode(el, { text, width: size, height: size, colorDark: '#111111', colorLight: '#ffffff', correctLevel: window.QRCode.CorrectLevel.M });
  };

  /* ---------- уроки ---------- */
  LS.loadLesson = async (id, withTeacher) => {
    if (!/^[a-z0-9_-]+$/i.test(id || '')) throw new Error('Некоректна назва уроку: ' + id);
    const v = Math.floor(Date.now() / 60000); // оновлення кешу щохвилини
    window.LESSON = null;
    await LS.loadScript(`lessons/${id}/slides.js?v=${v}`);
    if (withTeacher) {
      window.TEACHER = {};
      await LS.loadScript(`lessons/${id}/teacher.js?v=${v}`).catch(() => {});
    }
    if (!window.LESSON || !Array.isArray(window.LESSON.slides)) throw new Error('Урок «' + id + '» не знайдено');
    return window.LESSON;
  };

  LS.stepCount = (s) => {
    if (!s) return 0;
    if (s.type === 'content') return s.reveal ? (s.items || []).length : 0;
    if (s.type === 'vocab') return s.reveal === false ? 0 : 3;
    return 0;
  };

  LS.isAnswerable = (s) => !!s && ['mcq', 'gap', 'open', 'match'].includes(s.type);

  // match: відповідь студента — рядок індексів правої колонки через кому ("2,0,,1"; порожньо = не обрано)
  LS.parseMatch = (v, n) => { const a = String(v == null ? '' : v).split(','); return Array.from({ length: n }, (_, i) => { const k = parseInt(a[i], 10); return Number.isInteger(k) && k >= 0 ? k : -1; }); };
  LS.matchScore = (v, pairs) => { const m = LS.parseMatch(v, pairs.length); return m.filter((k, i) => k === pairs[i]).length; };

  // стрілки між парами: малюються після вставки слайда в DOM (розміри відносно .m-wrap, тож масштаб пульта не заважає)
  LS.drawMatch = (el) => {
    const w = el && el.querySelector('.m-wrap'); if (!w || !el._links) return;
    const old = w.querySelector('svg.m-links'); if (old) old.remove();
    if (!w.offsetWidth) return;
    const pos = (x) => { let l = 0, t = 0, e = x; while (e && e !== w) { l += e.offsetLeft; t += e.offsetTop; e = e.offsetParent; } return { l, t, w: x.offsetWidth, h: x.offsetHeight }; };
    let g = '';
    el._links.forEach(({ i, j, cls }) => {
      const a = w.querySelector(`.m-l[data-i="${i}"]`), b = w.querySelector(`.m-r[data-j="${j}"]`);
      if (!a || !b) return;
      const p = pos(a), q = pos(b);
      const x1 = p.l + p.w + 2, y1 = p.t + p.h / 2, x2 = q.l - 3, y2 = q.t + q.h / 2, dx = Math.max(10, (x2 - x1) * 0.5);
      g += `<g class="${cls}"><path d="M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2 - 7} ${y2}"/><polygon points="${x2} ${y2} ${x2 - 8} ${y2 - 4.5} ${x2 - 8} ${y2 + 4.5}"/></g>`;
    });
    if (g) w.insertAdjacentHTML('beforeend', `<svg class="m-links" width="${w.offsetWidth}" height="${w.offsetHeight}" aria-hidden="true">${g}</svg>`);
  };

  /* ---------- рендер ----------
     ctx: { step, revealed, answer, results, mine, locked, interactive,
            mode: 'phone'|'screen'|'preview', joinUrl, onRespond(v) }       */
  const LETTERS = 'ABCDEFGH';

  function statusLine(slide, ctx) {
    if (!ctx.interactive || ctx.revealed) return '';
    if (ctx.locked) return '<div class="s-status is-locked">🔒 Приймання відповідей закрито</div>';
    if (ctx.mine != null) return '<div class="s-status is-sent">✓ Надіслано · можна змінити</div>';
    const hint = slide.type === 'mcq' ? 'Оберіть варіант' : 'Надішліть відповідь';
    return `<div class="s-status">${hint}</div>`;
  }

  // «стіна»: схвалені викладачем відповіді, без імен
  function wallHtml(ctx) {
    const w = ctx.wall;
    if (!w || !w.length) return '';
    return `<div class="wall"><div class="wall-h">Відповіді групи</div>${w.map((v) => `<div class="wall-i">${LS.esc(v)}</div>`).join('')}</div>`;
  }

  LS.render = (slide, ctx) => {
    ctx = Object.assign({ step: 99, mode: 'phone', interactive: false }, ctx || {});
    ctx.canAnswer = ctx.interactive && !ctx.locked && !ctx.revealed;
    const el = document.createElement('section');
    el.className = `slide slide--${slide.type} mode-${ctx.mode}`;
    const kicker = slide.kicker ? `<div class="s-kicker">${slide.kicker}</div>` : '';
    const a = ctx.revealed ? ctx.answer || null : null;
    const explain = a && a.explain ? `<div class="s-explain">${a.explain}</div>` : '';
    let h = '';

    switch (slide.type) {
      case 'title': {
        let join = '';
        if (ctx.mode === 'screen' && ctx.joinUrl) join = '<div class="s-join"><div class="s-qr"></div><div class="s-join-url"></div></div>';
        else if (ctx.mode === 'phone') join = '<div class="s-joined">✓ Ви підключені. Слайди змінюватимуться самі.</div>';
        h = `${kicker}<h1 class="s-title">${slide.title || ''}</h1>${slide.subtitle ? `<p class="s-sub">${slide.subtitle}</p>` : ''}${join}`;
        break;
      }
      case 'content': {
        const items = slide.items || [];
        const n = slide.reveal ? Math.min(ctx.step, items.length) : items.length;
        // ctx.ahead (лише пульт): ще не відкриті пункти видно блідими, щоб викладач бачив наперед
        const shown = ctx.ahead ? items.length : n;
        const lis = items.slice(0, shown).map((it, i) => `<li class="${i >= n ? 'is-ahead' : (slide.reveal && i === n - 1 ? 'is-new' : '')}">${it}</li>`).join('');
        const left = !ctx.ahead && slide.reveal && n < items.length ? `<div class="s-more">${'•'.repeat(items.length - n)}</div>` : '';
        h = `${kicker}${slide.title ? `<h2 class="s-h">${slide.title}</h2>` : ''}<ul class="s-items">${lis}</ul>${left}`;
        break;
      }
      case 'vocab': {
        const st = slide.reveal === false ? 3 : ctx.step;
        h = `${kicker}<div class="v-term">${slide.term || ''}</div>
          <div class="v-meta">${slide.ipa ? `<span class="v-ipa">${slide.ipa}</span>` : ''}${slide.pos ? `<span class="v-pos">${slide.pos}</span>` : ''}</div>
          ${(st >= 1 || ctx.ahead) && slide.def ? `<p class="v-def ${st >= 1 ? 'is-new' : 'is-ahead'}">${slide.def}</p>` : ''}
          ${(st >= 2 || ctx.ahead) && slide.example ? `<p class="v-ex ${st >= 2 ? 'is-new' : 'is-ahead'}">${slide.example}</p>` : ''}
          ${(st >= 3 || ctx.ahead) && slide.uk ? `<p class="v-uk ${st >= 3 ? 'is-new' : 'is-ahead'}">${slide.uk}</p>` : ''}`;
        break;
      }
      case 'mcq': {
        const res = ctx.results;
        const opts = (slide.options || []).map((o, i) => {
          const cls = ['opt'];
          if (ctx.mine === String(i)) cls.push('is-mine');
          if (a && a.correct === i) cls.push('is-correct');
          if (a && a.correct != null && ctx.mine === String(i) && a.correct !== i) cls.push('is-wrong'); // опитування без ключа: свій вибір не червоніє
          const pct = res && res.total ? Math.round((100 * ((res.counts || [])[i] || 0)) / res.total) : null;
          return `<button type="button" class="${cls.join(' ')}" data-v="${i}"${ctx.canAnswer ? '' : ' disabled'}>` +
            (pct !== null ? `<span class="opt-bar" style="width:${pct}%"></span>` : '') +
            `<span class="opt-l">${LETTERS[i]}</span><span class="opt-t">${o}</span>` +
            (pct !== null ? `<span class="opt-p">${pct}%</span>` : '') + '</button>';
        }).join('');
        const total = res && res.total ? `<div class="s-total">Відповіли: ${res.total}</div>` : '';
        h = `${kicker}<div class="s-prompt">${slide.prompt || ''}</div><div class="opts">${opts}</div>${total}${statusLine(slide, ctx)}${explain}`;
        break;
      }
      case 'gap': {
        const blank = a
          ? `<span class="blank is-filled">${LS.esc(a.text)}</span>`
          : `<span class="blank${ctx.mine != null ? ' is-mine' : ''}">${ctx.mine != null ? LS.esc(ctx.mine) : '&nbsp;'}</span>`;
        const sentence = (slide.prompt || '').replace('___', blank);
        let verdict = '';
        if (a && ctx.mine != null && ctx.mode !== 'preview') {
          const ok = (a.accept || [a.text]).map(LS.norm).includes(LS.norm(ctx.mine));
          verdict = ok
            ? '<div class="verdict is-ok">✓ Ваша відповідь правильна</div>'
            : `<div class="verdict is-no">Ваша відповідь: <b>${LS.esc(ctx.mine)}</b></div>`;
        }
        const form = ctx.canAnswer
          ? `<form class="ans"><input class="ans-in" name="a" maxlength="80" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="${LS.esc(slide.placeholder || 'Ваша відповідь')}"><button class="ans-btn" type="submit">Надіслати</button></form>`
          : '';
        h = `${kicker}${slide.instruction ? `<p class="s-instr">${slide.instruction}</p>` : ''}<p class="s-sentence">${sentence}</p>${form}${statusLine(slide, ctx)}${verdict}${explain}${wallHtml(ctx)}`;
        break;
      }
      case 'open': {
        const form = ctx.canAnswer
          ? `<form class="ans ans--open"><textarea class="ans-in" name="a" maxlength="300" rows="3" placeholder="${LS.esc(slide.placeholder || 'Ваша відповідь')}"></textarea><button class="ans-btn" type="submit">Надіслати</button></form>`
          : '';
        const mine = ctx.mine != null && ctx.mode !== 'preview' ? `<div class="mine"><span>Ваша відповідь</span>${LS.esc(ctx.mine)}</div>` : '';
        h = `${kicker}<div class="s-prompt">${slide.prompt || ''}</div>${form}${mine}${statusLine(slide, ctx)}${explain}${wallHtml(ctx)}`;
        break;
      }
      case 'match': {
        const L = slide.left || [], Rt = slide.right || [], n = L.length;
        const mine = LS.parseMatch(ctx.mine, n);
        const pairs = a && Array.isArray(a.pairs) ? a.pairs : null;
        const ghost = !pairs && ctx.ahead && ctx.answer && Array.isArray(ctx.answer.pairs) ? ctx.answer.pairs : null;
        const links = [];
        L.forEach((_, i) => {
          if (pairs) { if (pairs[i] >= 0) links.push({ i, j: pairs[i], cls: 'ok' }); if (mine[i] >= 0 && mine[i] !== pairs[i] && ctx.mode !== 'preview') links.push({ i, j: mine[i], cls: 'wrong' }); }
          else if (ghost) { if (ghost[i] >= 0) links.push({ i, j: ghost[i], cls: 'ghost' }); }
          else if (mine[i] >= 0 && ctx.mode === 'phone') links.push({ i, j: mine[i], cls: 'mine' });
        });
        const chip = (i) => {
          if (ctx.canAnswer) return `<select class="m-sel" data-i="${i}" aria-label="${i + 1}"><option value="">–</option>${Rt.map((_, j) => `<option value="${j}"${mine[i] === j ? ' selected' : ''}>${LETTERS[j].toLowerCase()}</option>`).join('')}</select>`;
          if (pairs) return `<span class="m-chip is-ok">${LETTERS[pairs[i]] ? LETTERS[pairs[i]].toLowerCase() : ''}</span>`;
          if (mine[i] >= 0 && ctx.mode === 'phone') return `<span class="m-chip is-mine">${LETTERS[mine[i]].toLowerCase()}</span>`;
          return '<span class="m-chip"></span>';
        };
        const hit = (j) => (pairs && pairs.includes(j) ? ' is-hit' : '');
        const form = ctx.canAnswer ? '<form class="ans m-form"><button class="ans-btn" type="submit">Надіслати</button></form>' : '';
        let verdict = '';
        if (pairs && ctx.mine != null && ctx.mode !== 'preview') {
          const ok = LS.matchScore(ctx.mine, pairs);
          verdict = `<div class="verdict ${ok === n ? 'is-ok' : 'is-no'}">${ok === n ? '✓ Усі пари правильні' : `Правильно: <b>${ok} з ${n}</b>`}</div>`;
        }
        h = `${kicker}${slide.prompt ? `<div class="s-prompt">${slide.prompt}</div>` : ''}<div class="m-wrap">
          <div class="m-col">${L.map((t, i) => `<div class="m-l" data-i="${i}"><span class="m-n">${i + 1}</span><span class="m-t">${t}</span>${chip(i)}</div>`).join('')}</div>
          <div class="m-col">${Rt.map((t, j) => `<div class="m-r${hit(j)}" data-j="${j}"><span class="m-letter">${LETTERS[j].toLowerCase()}</span><span class="m-t">${t}</span></div>`).join('')}</div></div>
          ${form}${statusLine(slide, ctx)}${verdict}${explain}`;
        el._links = links;
        break;
      }
      case 'end':
      default:
        h = `${kicker}<h1 class="s-title">${slide.title || ''}</h1>${slide.text ? `<p class="s-sub">${slide.text}</p>` : ''}`;
    }

    el.innerHTML = h;

    if (slide.type === 'title' && ctx.mode === 'screen' && ctx.joinUrl) {
      LS.qr(el.querySelector('.s-qr'), ctx.joinUrl, 240);
      el.querySelector('.s-join-url').textContent = ctx.joinUrl.replace(/^https?:\/\//, '');
    }

    if (slide.type === 'match') {
      const redraw = () => LS.drawMatch(el);
      requestAnimationFrame(() => requestAnimationFrame(redraw));
      if (window.ResizeObserver) { const ro = new ResizeObserver(redraw); ro.observe(el); }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
      if (ctx.canAnswer) {
        const sels = el.querySelectorAll('.m-sel');
        sels.forEach((x) => x.addEventListener('change', () => {
          el._links = Array.from(sels).filter((y) => y.value !== '').map((y) => ({ i: +y.dataset.i, j: +y.value, cls: 'mine' }));
          redraw();
        }));
        const f = el.querySelector('form.m-form');
        if (f && ctx.onRespond) f.addEventListener('submit', (e) => {
          e.preventDefault();
          const v = Array.from(sels).map((y) => y.value).join(',');
          if (v.replace(/,/g, '')) ctx.onRespond(v);
        });
      }
    }

    if (ctx.canAnswer && ctx.onRespond) {
      el.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => ctx.onRespond(b.dataset.v)));
      const f = el.querySelector('form.ans:not(.m-form)');
      if (f) {
        const inp = f.querySelector('.ans-in');
        f.addEventListener('submit', (e) => {
          e.preventDefault();
          const v = inp.value.trim();
          if (v) { ctx.onRespond(v); inp.blur(); }
        });
        if (inp.tagName === 'TEXTAREA') inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) f.requestSubmit();
        });
      }
    }
    return el;
  };

  /* =======================================================================
     ТРАНСПОРТ 1: Firebase Realtime Database
     ======================================================================= */
  const FB_VER = '10.12.2';
  let fbReady = null;

  function fbInit() {
    if (fbReady) return fbReady;
    fbReady = (async () => {
      const cfg = window.FIREBASE_CONFIG;
      if (!cfg || !cfg.apiKey || /ВСТАВТЕ|YOUR_/.test(cfg.apiKey) || !cfg.databaseURL) {
        throw new Error('Не заповнено firebase-config.js. Для перевірки без Firebase додайте до адреси ?demo');
      }
      const base = `https://www.gstatic.com/firebasejs/${FB_VER}/`;
      await LS.loadScript(base + 'firebase-app-compat.js');
      await Promise.all([LS.loadScript(base + 'firebase-auth-compat.js'), LS.loadScript(base + 'firebase-database-compat.js')]);
      firebase.initializeApp(cfg);
      return { db: firebase.database(), auth: firebase.auth() };
    })();
    return fbReady;
  }

  const waitUser = (auth) => new Promise((r) => { const un = auth.onAuthStateChanged((u) => { un(); r(u); }); });

  async function fbTeacher(room) {
    const { db, auth } = await fbInit();
    const base = db.ref('rooms/' + room);
    let respRef = null;
    return {
      kind: 'firebase',
      waitUser: () => waitUser(auth),
      signIn: () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((r) => r.user),
      signOut: () => auth.signOut(),
      setState: (s) => base.child('state').set(s),
      onPresence: (cb) => base.child('presence').on('value', (s) => cb(s.numChildren(), Object.keys(s.val() || {})), (e) => console.warn(e)),
      onRoster: (cb) => base.child('roster').on('value', (s) => cb(s.val() || {}), (e) => console.warn(e)),
      getAllResponses: () => base.child('responses').once('value').then((x) => x.val() || {}),
      watchResponses(slideId, cb) {
        if (respRef) respRef.off();
        respRef = base.child('responses/' + slideId);
        respRef.on('value', (s) => cb(s.val() || {}), (e) => console.warn(e));
      },
      clearResponses: (slideId) => base.child('responses/' + slideId).remove(),
      clearRoom: () => base.remove(),
      getState: () => base.child('state').once('value').then((x) => x.val()),
      // завершити заняття: стерти відповіді й присутність, лишити лише позначку «завершено»
      endRoom: (lesson) => base.set({ state: { ended: true, lesson: lesson || null, t: Date.now() } }),
      onConnection: (cb) => db.ref('.info/connected').on('value', (s) => cb(!!s.val())),
    };
  }

  async function fbStudent(room, opts) {
    const { db, auth } = await fbInit();
    let uid = null;
    if (!opts.screen) {
      let u = await waitUser(auth);
      if (!u) u = (await auth.signInAnonymously()).user;
      uid = u.uid;
    }
    const base = db.ref('rooms/' + room);
    return {
      kind: 'firebase',
      uid,
      onState: (cb) => base.child('state').on('value', (s) => cb(s.val()), (e) => console.warn(e)),
      startPresence() {
        if (!uid) return;
        const me = base.child('presence/' + uid);
        db.ref('.info/connected').on('value', (s) => {
          if (s.val()) me.onDisconnect().remove().then(() => me.set(true)).catch((e) => console.warn(e));
        });
      },
      respond: (slideId, v) => base.child(`responses/${slideId}/${uid}`).set({ v, t: firebase.database.ServerValue.TIMESTAMP }),
      // ім'я в цій кімнаті: записується один раз, змінити може лише викладач
      getMyName: () => base.child('roster/' + uid).once('value').then((x) => (x.val() || {}).n || null),
      setName: (n) => base.child('roster/' + uid).set({ n, t: firebase.database.ServerValue.TIMESTAMP }),
      onConnection: (cb) => db.ref('.info/connected').on('value', (s) => cb(!!s.val())),
    };
  }

  /* =======================================================================
     ТРАНСПОРТ 2: демо (BroadcastChannel) — вкладки одного браузера
     ======================================================================= */
  function demoTeacher(room) {
    const bc = new BroadcastChannel('ls-' + room);
    let state = null, presCb = null, respCb = null, watched = null, rosterCb = null;
    const seen = {}, resp = {}, roster = {};
    bc.onmessage = (e) => {
      const m = e.data || {};
      if (m.k === 'hello') {
        if (!m.screen) seen[m.cid] = Date.now();
        if (state) bc.postMessage({ k: 'state', s: state });
      } else if (m.k === 'name') {
        if (!roster[m.cid]) { roster[m.cid] = { n: String(m.n).slice(0, 60), t: Date.now() }; if (rosterCb) rosterCb(Object.assign({}, roster)); }
      } else if (m.k === 'bye') {
        delete seen[m.cid];
      } else if (m.k === 'resp') {
        // ті самі обмеження, що й у правилах Firebase
        if (!roster[m.cid]) return;
        if (!state || state.slideId !== m.slideId || state.locked || state.revealed) return;
        (resp[m.slideId] = resp[m.slideId] || {})[m.cid] = { v: String(m.v).slice(0, 300), t: Date.now() };
        if (watched === m.slideId && respCb) respCb(Object.assign({}, resp[m.slideId]));
      }
    };
    setInterval(() => {
      const now = Date.now();
      let n = 0;
      for (const k in seen) { if (now - seen[k] < 12000) n++; else delete seen[k]; }
      if (presCb) presCb(n, Object.keys(seen));
    }, 1000);
    return {
      kind: 'demo',
      waitUser: async () => ({ email: 'демо-режим', demo: true }),
      signIn: async () => ({ email: 'демо-режим', demo: true }),
      signOut: async () => {},
      setState: async (s) => { state = JSON.parse(JSON.stringify(s)); bc.postMessage({ k: 'state', s: state }); },
      onPresence: (cb) => { presCb = cb; },
      onRoster: (cb) => { rosterCb = cb; cb(Object.assign({}, roster)); },
      getAllResponses: async () => JSON.parse(JSON.stringify(resp)),
      watchResponses: (id, cb) => { watched = id; respCb = cb; cb(Object.assign({}, resp[id] || {})); },
      clearResponses: async (id) => { delete resp[id]; if (watched === id && respCb) respCb({}); },
      clearRoom: async () => { for (const k in resp) delete resp[k]; },
      getState: async () => (state ? JSON.parse(JSON.stringify(state)) : null),
      endRoom: async (lesson) => {
        for (const k in resp) delete resp[k];
        for (const k in roster) delete roster[k];
        state = { ended: true, lesson: lesson || null, t: Date.now() };
        bc.postMessage({ k: 'state', s: state });
      },
      onConnection: (cb) => cb(true),
    };
  }

  function demoStudent(room, opts) {
    const bc = new BroadcastChannel('ls-' + room);
    let cid;
    try {
      cid = sessionStorage.getItem('ls-cid');
      if (!cid) { cid = Math.random().toString(36).slice(2, 10); sessionStorage.setItem('ls-cid', cid); }
    } catch (e) { cid = Math.random().toString(36).slice(2, 10); }
    let stateCb = null;
    bc.onmessage = (e) => { const m = e.data || {}; if (m.k === 'state' && stateCb) stateCb(m.s); };
    const hello = () => {
      bc.postMessage({ k: 'hello', cid, screen: !!opts.screen });
      let n = null; try { n = sessionStorage.getItem('ls-dname-' + room); } catch (e) { /* */ }
      if (n) bc.postMessage({ k: 'name', cid, n });
    };
    return {
      kind: 'demo',
      uid: cid,
      onState: (cb) => { stateCb = cb; hello(); },
      startPresence: () => {
        setInterval(hello, 4000);
        addEventListener('pagehide', () => bc.postMessage({ k: 'bye', cid }));
      },
      respond: async (slideId, v) => bc.postMessage({ k: 'resp', slideId, cid, v }),
      getMyName: async () => { try { return sessionStorage.getItem('ls-dname-' + room); } catch (e) { return null; } },
      setName: async (n) => { try { sessionStorage.setItem('ls-dname-' + room, n); } catch (e) { /* */ } bc.postMessage({ k: 'name', cid, n }); },
      onConnection: (cb) => cb(true),
    };
  }

  LS.teacherTransport = (room) => (LS.isDemo ? Promise.resolve(demoTeacher(room)) : fbTeacher(room));
  LS.studentTransport = (room, opts) => (LS.isDemo ? Promise.resolve(demoStudent(room, opts || {})) : fbStudent(room, opts || {}));
})();

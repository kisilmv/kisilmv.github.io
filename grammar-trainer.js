'use strict';

/**
 * Граматичний тренажер B1–C2.
 * Налаштування — атрибути на #gr-app:
 *   data-base         — тека з JSON рівнів (b1.json, b2.json, c1.json, c2.json);
 *   data-levels       — коди рівнів через кому (типово b1,b2,c1,c2; для A1–A2 — a1,a2);
 *   data-version      — мітка для оновлення кешу JSON;
 *   data-storage-key  — ключ localStorage;
 *   data-event        — подія Google Analytics після завершення спроби.
 * Адреси (їх можна давати студентам як посилання):
 *   #b1               — теми рівня;
 *   #b1/<тема>        — теорія і вправи теми;
 *   #b1/test          — змішаний тест рівня;
 *   #b1/mistakes      — робота над помилками.
 * Відповіді нікуди не надсилаються: прогрес зберігається лише в localStorage.
 */
(function () {
  const TEST_SIZE = 20;
  const MASTERED = 0.8; // частка правильних, з якої тема вважається засвоєною
  const TYPE_TASKS = {
    choice: 'Оберіть правильний варіант.',
    input: 'Впишіть пропущене: одне чи кілька слів.',
    error: 'Знайдіть фрагмент із помилкою.'
  };

  const $ = (id) => document.getElementById(id);
  const app = $('gr-app');
  if (!app) return;

  const LEVELS = (app.dataset.levels || 'b1,b2,c1,c2').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);

  const config = {
    base: app.dataset.base || 'data/grammar/',
    version: app.dataset.version || '',
    storageKey: app.dataset.storageKey || 'grammar-trainer',
    event: app.dataset.event || ''
  };

  const ui = {
    levels: $('gr-levels'),
    view: $('gr-view'),
    status: $('gr-status')
  };

  /* ------------------------------------------------------------------
     Сховище: усі звертання в try/catch, без сховища все працює далі
     ------------------------------------------------------------------ */
  const store = {
    read() {
      try {
        const raw = window.localStorage.getItem(config.storageKey);
        const parsed = raw ? JSON.parse(raw) : null;
        const value = parsed && typeof parsed === 'object' ? parsed : {};
        value.topics = value.topics && typeof value.topics === 'object' ? value.topics : {};
        value.mistakes = value.mistakes && typeof value.mistakes === 'object' ? value.mistakes : {};
        value.tests = value.tests && typeof value.tests === 'object' ? value.tests : {};
        return value;
      } catch (error) {
        return { topics: {}, mistakes: {}, tests: {} };
      }
    },
    update(fn) {
      const value = this.read();
      fn(value);
      try {
        window.localStorage.setItem(config.storageKey, JSON.stringify(value));
      } catch (error) {
        /* Сховище недоступне (приватний режим, заборона cookie): прогрес не збережеться. */
      }
    }
  };

  const cache = {};   // рівень → дані JSON
  let run = null;     // поточна спроба
  let keyHandler = null;

  /* ------------------------------------------------------------------
     Допоміжні функції
     ------------------------------------------------------------------ */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function link(href, className, text) {
    const a = el('a', className, text);
    a.href = href;
    return a;
  }

  function button(className, text, onClick) {
    const b = el('button', className, text);
    b.type = 'button';
    if (onClick) b.addEventListener('click', onClick);
    return b;
  }

  /* *англійський фрагмент* у поясненнях → <em lang="en">, решта — звичайний текст. */
  function rich(node, text) {
    String(text || '').split(/(\*[^*]+\*)/).forEach((chunk) => {
      if (!chunk) return;
      if (/^\*[^*]+\*$/.test(chunk)) {
        const em = el('em', 'gr-en', chunk.slice(1, -1));
        em.lang = 'en';
        node.appendChild(em);
      } else {
        node.appendChild(document.createTextNode(chunk));
      }
    });
    return node;
  }

  function plural(n, one, few, many) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function focusHeading(node) {
    if (!node) return;
    node.focus({ preventScroll: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  function heading(tag, className, text) {
    const h = el(tag, className, text);
    h.tabIndex = -1;
    return h;
  }

  /* Нормалізація введеної відповіді: регістр, апострофи, пробіли, розділові знаки, скорочення. */
  function normalize(text) {
    let s = String(text || '').toLowerCase()
      .replace(/[‘’`´ʼ]/g, "'")
      .replace(/[.,!?;:"«»“”]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    s = s.replace(/\bcan't\b/g, 'cannot')
      .replace(/\bcan not\b/g, 'cannot')
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bshan't\b/g, 'shall not')
      .replace(/n't\b/g, ' not')
      .replace(/'ve\b/g, ' have')
      .replace(/'ll\b/g, ' will')
      .replace(/'re\b/g, ' are')
      .replace(/\bi'm\b/g, 'i am');
    return s.replace(/\s+/g, ' ').trim();
  }

  function levelLabel(level) {
    return level.toUpperCase();
  }

  function progressKey(level, topicId) {
    return level + '/' + topicId;
  }

  function mistakeKey(level, topicId, itemId) {
    return level + '/' + topicId + '/' + itemId;
  }

  function mistakesOf(level) {
    const all = store.read().mistakes;
    return Object.keys(all).filter((k) => k.indexOf(level + '/') === 0);
  }

  function topicState(level, topic) {
    const entry = store.read().topics[progressKey(level, topic.id)];
    if (!entry || typeof entry.best !== 'number') return null;
    return { best: entry.best, total: entry.total || topic.items.length };
  }

  /* ------------------------------------------------------------------
     Завантаження рівня
     ------------------------------------------------------------------ */
  function loadLevel(level) {
    if (cache[level]) return Promise.resolve(cache[level]);
    const url = config.base + level + '.json' + (config.version ? '?v=' + config.version : '');
    return fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then((json) => {
        if (!json || !Array.isArray(json.topics) || !json.topics.length) throw new Error('empty');
        cache[level] = json;
        return json;
      });
  }

  /* ------------------------------------------------------------------
     Маршрутизація
     ------------------------------------------------------------------ */
  function parseHash() {
    const parts = window.location.hash.replace(/^#/, '').split('/').filter(Boolean);
    const level = (parts[0] || '').toLowerCase();
    if (LEVELS.indexOf(level) === -1) return { level: null };
    return { level, sub: parts[1] || null };
  }

  function route() {
    detachKeys();
    run = null;
    const r = parseHash();
    if (!r.level) {
      showLevels();
      return;
    }
    ui.levels.hidden = true;
    ui.view.hidden = false;
    ui.view.innerHTML = '';
    ui.view.appendChild(el('p', 'trn-status', 'Завантажую рівень ' + levelLabel(r.level) + '…'));
    loadLevel(r.level)
      .then((data) => {
        if (r.sub === 'test') renderTestIntro(r.level, data);
        else if (r.sub === 'mistakes') startMistakes(r.level, data);
        else if (r.sub) {
          const topic = data.topics.find((t) => t.id === r.sub);
          if (topic) renderTopic(r.level, data, topic);
          else renderLevel(r.level, data);
        } else renderLevel(r.level, data);
      })
      .catch(() => {
        ui.view.innerHTML = '';
        const p = el('p', 'trn-status is-error', 'Не вдалося завантажити завдання. Перевірте з’єднання з інтернетом і оновіть сторінку.');
        p.setAttribute('role', 'alert');
        ui.view.appendChild(p);
        ui.view.appendChild(link('#', 'gr-back', '← До вибору рівня'));
      });
  }

  /* ------------------------------------------------------------------
     Екран рівнів (картки в HTML, тут лише прогрес)
     ------------------------------------------------------------------ */
  function showLevels() {
    ui.view.hidden = true;
    ui.view.innerHTML = '';
    ui.levels.hidden = false;
    const value = store.read();
    ui.levels.querySelectorAll('[data-level-progress]').forEach((node) => {
      const level = node.dataset.levelProgress;
      const total = Number(node.dataset.topics) || 0;
      const keys = Object.keys(value.topics).filter((k) => k.indexOf(level + '/') === 0);
      const mastered = keys.filter((k) => {
        const e = value.topics[k];
        return e && e.total && e.best / e.total >= MASTERED;
      }).length;
      const mistakes = Object.keys(value.mistakes).filter((k) => k.indexOf(level + '/') === 0).length;
      let text = keys.length
        ? 'Засвоєно тем: ' + mastered + ' з ' + total
        : 'Ще не розпочато';
      if (mistakes) text += ' · помилок на опрацювання: ' + mistakes;
      node.textContent = text;
      node.classList.toggle('is-started', keys.length > 0);
    });
    if (ui.status) ui.status.hidden = true;
  }

  /* ------------------------------------------------------------------
     Екран рівня: список тем
     ------------------------------------------------------------------ */
  function renderLevel(level, data) {
    ui.view.innerHTML = '';
    ui.view.appendChild(link('#', 'gr-back', '← Усі рівні'));

    const head = el('header', 'gr-head');
    head.appendChild(el('p', 'trn-part', 'Рівень ' + levelLabel(level)));
    const h = heading('h2', 'gr-title', data.title);
    head.appendChild(h);
    if (data.description) head.appendChild(rich(el('p', 'gr-lead'), data.description));
    ui.view.appendChild(head);

    const itemsTotal = data.topics.reduce((s, t) => s + t.items.length, 0);
    const actions = el('div', 'gr-level-actions');
    const testCard = el('div', 'gr-action-card');
    testCard.appendChild(el('h3', 'gr-action-title', 'Змішаний тест рівня'));
    const best = store.read().tests[level];
    testCard.appendChild(el('p', 'gr-action-text',
      Math.min(TEST_SIZE, itemsTotal) + ' завдань з усіх тем без підказок; наприкінці — розбір і теми, які варто повторити.' +
      (typeof best === 'number' ? ' Найкращий результат: ' + best + ' %.' : '')));
    testCard.appendChild(link('#' + level + '/test', 'btn btn--primary btn--sm', 'Пройти тест'));
    actions.appendChild(testCard);

    const mistakes = mistakesOf(level).length;
    const mCard = el('div', 'gr-action-card');
    mCard.appendChild(el('h3', 'gr-action-title', 'Робота над помилками'));
    mCard.appendChild(el('p', 'gr-action-text', mistakes
      ? 'Завдань, у яких ви помилилися: ' + mistakes + '. Правильна відповідь прибирає завдання зі списку.'
      : 'Тут збиратимуться завдання, у яких ви помилилися, щоб повернутися до них пізніше.'));
    if (mistakes) mCard.appendChild(link('#' + level + '/mistakes', 'btn btn--secondary btn--sm', 'Опрацювати ' + mistakes + ' ' + plural(mistakes, 'завдання', 'завдання', 'завдань')));
    actions.appendChild(mCard);
    ui.view.appendChild(actions);

    ui.view.appendChild(el('h3', 'gr-subtitle', 'Теми · ' + data.topics.length + ' ' + plural(data.topics.length, 'тема', 'теми', 'тем') + ', ' + itemsTotal + ' ' + plural(itemsTotal, 'завдання', 'завдання', 'завдань')));
    const list = el('ol', 'gr-topic-list');
    data.topics.forEach((topic, i) => {
      const li = el('li');
      const a = link('#' + level + '/' + topic.id, 'gr-topic-card');
      a.appendChild(el('span', 'gr-topic-num', String(i + 1)));
      const body = el('span', 'gr-topic-body');
      body.appendChild(el('span', 'gr-topic-title', topic.title));
      if (topic.titleEn) {
        const en = el('span', 'gr-topic-en', topic.titleEn);
        en.lang = 'en';
        body.appendChild(en);
      }
      if (topic.summary) body.appendChild(rich(el('span', 'gr-topic-summary'), topic.summary));
      a.appendChild(body);
      a.appendChild(statusPill(level, topic));
      li.appendChild(a);
      list.appendChild(li);
    });
    ui.view.appendChild(list);
    focusHeading(h);
  }

  function statusPill(level, topic) {
    const state = topicState(level, topic);
    if (!state) return el('span', 'gr-pill', 'нове');
    const mastered = state.best / state.total >= MASTERED;
    const pill = el('span', 'gr-pill ' + (mastered ? 'is-mastered' : 'is-started'), state.best + ' / ' + state.total);
    pill.title = mastered ? 'Тему засвоєно' : 'Найкращий результат';
    return pill;
  }

  /* ------------------------------------------------------------------
     Екран теми: теорія + старт вправ
     ------------------------------------------------------------------ */
  function renderTopic(level, data, topic) {
    ui.view.innerHTML = '';
    const index = data.topics.indexOf(topic);
    ui.view.appendChild(link('#' + level, 'gr-back', '← Теми рівня ' + levelLabel(level)));

    const head = el('header', 'gr-head');
    head.appendChild(el('p', 'trn-part', levelLabel(level) + ' · тема ' + (index + 1) + ' з ' + data.topics.length));
    const h = heading('h2', 'gr-title', topic.title);
    head.appendChild(h);
    if (topic.titleEn) {
      const en = el('p', 'gr-title-en', topic.titleEn);
      en.lang = 'en';
      head.appendChild(en);
    }
    ui.view.appendChild(head);

    ui.view.appendChild(renderTheory(topic.theory));

    const start = el('div', 'gr-start');
    const state = topicState(level, topic);
    start.appendChild(el('p', 'gr-start-text',
      'Вправи: ' + topic.items.length + ' ' + plural(topic.items.length, 'завдання', 'завдання', 'завдань') +
      ', відповідь перевіряється одразу й супроводжується поясненням.' +
      (state ? ' Найкращий результат: ' + state.best + ' з ' + state.total + '.' : '')));
    const actions = el('div', 'booking-actions');
    actions.appendChild(button('btn btn--primary', 'Почати вправи', () => startTopic(level, data, topic)));
    const next = data.topics[index + 1];
    if (next) actions.appendChild(link('#' + level + '/' + next.id, 'btn btn--secondary', 'Наступна тема →'));
    start.appendChild(actions);
    ui.view.appendChild(start);
    focusHeading(h);
  }

  function renderTheory(theory) {
    const box = el('article', 'gr-theory');
    if (!theory) return box;
    box.appendChild(el('h3', 'gr-theory-title', theory.title || 'Правило'));
    if (theory.intro) box.appendChild(rich(el('p', 'gr-theory-intro'), theory.intro));
    (theory.blocks || []).forEach((block) => {
      const section = el('section', 'gr-block');
      if (block.title) section.appendChild(rich(el('h4', 'gr-block-title'), block.title));
      if (block.text) section.appendChild(rich(el('p', 'gr-block-text'), block.text));
      if (block.examples && block.examples.length) {
        const ul = el('ul', 'gr-examples');
        block.examples.forEach((pair) => {
          const li = el('li');
          const en = el('span', 'gr-ex-en', pair[0]);
          en.lang = 'en';
          li.appendChild(en);
          if (pair[1]) li.appendChild(el('span', 'gr-ex-uk', pair[1]));
          ul.appendChild(li);
        });
        section.appendChild(ul);
      }
      box.appendChild(section);
    });
    if (theory.traps && theory.traps.length) {
      const traps = el('aside', 'gr-traps');
      traps.appendChild(el('h4', 'gr-traps-title', 'Типові пастки для україномовних'));
      const ul = el('ul', 'gr-traps-list');
      theory.traps.forEach((t) => ul.appendChild(rich(el('li'), t)));
      traps.appendChild(ul);
      box.appendChild(traps);
    }
    return box;
  }

  /* ------------------------------------------------------------------
     Запуск спроб
     ------------------------------------------------------------------ */
  function entriesOf(topic) {
    return topic.items.map((item) => ({ topic, item }));
  }

  function startTopic(level, data, topic) {
    startRun({ level, data, kind: 'topic', topic, title: topic.title, instant: true, entries: shuffle(entriesOf(topic)) });
  }

  function renderTestIntro(level, data) {
    ui.view.innerHTML = '';
    ui.view.appendChild(link('#' + level, 'gr-back', '← Теми рівня ' + levelLabel(level)));
    const head = el('header', 'gr-head');
    head.appendChild(el('p', 'trn-part', 'Рівень ' + levelLabel(level)));
    const h = heading('h2', 'gr-title', 'Змішаний тест рівня ' + levelLabel(level));
    head.appendChild(h);
    head.appendChild(el('p', 'gr-lead',
      'Завдання з усіх тем рівня в довільному порядку. Підказок під час тесту немає: правильні відповіді, пояснення й бали за темами ви побачите наприкінці. Кожна нова спроба — новий набір завдань.'));
    ui.view.appendChild(head);
    const actions = el('div', 'booking-actions');
    actions.appendChild(button('btn btn--primary', 'Почати тест', () => startTest(level, data)));
    ui.view.appendChild(actions);
    focusHeading(h);
  }

  /* Тест: порівну завдань із кожної теми, решта — випадково. */
  function startTest(level, data) {
    const pools = data.topics.map((t) => shuffle(entriesOf(t)));
    const picked = [];
    const size = Math.min(TEST_SIZE, pools.reduce((s, p) => s + p.length, 0));
    let round = 0;
    while (picked.length < size) {
      let added = false;
      shuffle(pools).forEach((pool) => {
        if (picked.length < size && pool[round]) {
          picked.push(pool[round]);
          added = true;
        }
      });
      if (!added) break;
      round += 1;
    }
    startRun({ level, data, kind: 'test', title: 'Змішаний тест рівня ' + levelLabel(level), instant: false, entries: shuffle(picked) });
  }

  function startMistakes(level, data) {
    const keys = mistakesOf(level);
    const entries = [];
    keys.forEach((key) => {
      const parts = key.split('/');
      const topic = data.topics.find((t) => t.id === parts[1]);
      const item = topic && topic.items.find((it) => String(it.id) === parts[2]);
      if (item) entries.push({ topic, item });
      else store.update((v) => { delete v.mistakes[key]; }); // завдання з дані вже прибрано
    });
    if (!entries.length) {
      renderLevel(level, data);
      return;
    }
    startRun({ level, data, kind: 'mistakes', title: 'Робота над помилками · ' + levelLabel(level), instant: true, entries: shuffle(entries) });
  }

  function startRun(options) {
    run = Object.assign({ index: 0, results: [] }, options);
    run.entries = run.entries.map((e) => Object.assign({}, e, {
      order: e.item.type === 'choice' ? shuffle(e.item.options.map((_, i) => i)) : null
    }));
    renderItem();
  }

  /* ------------------------------------------------------------------
     Виконання: одне завдання на екрані
     ------------------------------------------------------------------ */
  function renderItem() {
    detachKeys();
    const entry = run.entries[run.index];
    const { item, topic } = entry;
    const total = run.entries.length;
    const state = { given: null, checked: false };
    ui.view.innerHTML = '';

    const bar = el('div', 'gr-runbar');
    const title = el('p', 'gr-run-title', run.title);
    bar.appendChild(title);
    const counter = el('p', 'gr-counter', 'Завдання ' + (run.index + 1) + ' з ' + total);
    counter.setAttribute('aria-live', 'polite');
    bar.appendChild(counter);
    bar.appendChild(button('btn btn--secondary btn--sm', 'Завершити', requestFinish));
    ui.view.appendChild(bar);

    const progress = el('div', 'quiz-progress gr-progress');
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', 'Поступ');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', String(total));
    progress.setAttribute('aria-valuenow', String(run.index));
    const fill = el('div', 'quiz-progress-bar');
    fill.style.width = (run.index / total * 100) + '%';
    progress.appendChild(fill);
    ui.view.appendChild(progress);

    const card = el('section', 'gr-card');
    if (run.kind !== 'topic') card.appendChild(el('p', 'gr-card-topic', topic.title));
    const task = heading('h3', 'gr-task', item.task || TYPE_TASKS[item.type]);
    card.appendChild(task);
    if (item.context) {
      const ctx = el('p', 'gr-context', item.context);
      ctx.lang = 'en';
      card.appendChild(ctx);
    }

    const prompt = el('p', 'gr-prompt');
    prompt.lang = 'en';
    card.appendChild(prompt);

    const actions = el('div', 'gr-card-actions');
    const main = button('btn btn--primary', run.instant ? 'Перевірити' : 'Далі');
    main.disabled = true;
    actions.appendChild(main);

    const feedback = el('div', 'gr-feedback');
    feedback.hidden = true;
    feedback.tabIndex = -1;

    let input = null;
    const optionButtons = [];
    const segButtons = [];

    function setGiven(value) {
      if (state.checked) return;
      state.given = value;
      main.disabled = value == null || (typeof value === 'string' && !value.trim());
    }

    if (item.type === 'input') {
      buildPrompt(prompt, item.prompt, () => {
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'gr-input';
        input.lang = 'en';
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('aria-label', 'Пропущене слово чи слова');
        const longest = item.answers.reduce((m, a) => Math.max(m, a.length), 4);
        input.style.width = Math.min(Math.max(longest + 3, 7), 28) + 'ch';
        input.addEventListener('input', () => setGiven(input.value));
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            main.click();
          }
        });
        return input;
      });
    } else if (item.type === 'error') {
      item.prompt.split(/(\[\[[^\]]+\]\])/).forEach((chunk) => {
        const m = chunk.match(/^\[\[([^\]]+)\]\]$/);
        if (!m) {
          if (chunk) prompt.appendChild(document.createTextNode(chunk));
          return;
        }
        const idx = segButtons.length;
        const seg = button('gr-seg', m[1], () => {
          if (state.checked) return;
          segButtons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === idx)));
          setGiven(idx);
        });
        seg.setAttribute('aria-pressed', 'false');
        segButtons.push(seg);
        prompt.appendChild(seg);
      });
    } else {
      buildPrompt(prompt, item.prompt, () => el('span', 'gr-gap', '______'));
      const opts = el('div', 'gr-opts');
      opts.setAttribute('role', 'group');
      opts.setAttribute('aria-label', 'Варіанти відповіді');
      entry.order.forEach((optIndex, pos) => {
        const b = button('gr-opt', null, () => {
          if (state.checked) return;
          optionButtons.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
          const gap = prompt.querySelector('.gr-gap');
          if (gap) {
            gap.textContent = item.options[optIndex];
            gap.classList.add('is-filled');
          }
          setGiven(optIndex);
        });
        b.setAttribute('aria-pressed', 'false');
        b.appendChild(el('span', 'quiz-letter', String(pos + 1)));
        const t = el('span', 'gr-opt-text', item.options[optIndex]);
        t.lang = 'en';
        b.appendChild(t);
        optionButtons.push(b);
        opts.appendChild(b);
      });
      card.appendChild(opts);
    }

    card.appendChild(actions);
    card.appendChild(feedback);
    ui.view.appendChild(card);

    function goNext() {
      if (run.index + 1 < run.entries.length) {
        run.index += 1;
        renderItem();
      } else {
        finish();
      }
    }

    main.addEventListener('click', () => {
      if (state.checked) {
        goNext();
        return;
      }
      if (main.disabled) return;
      const correct = isCorrect(item, state.given);
      record(entry, state.given, correct);
      if (!run.instant) {
        goNext();
        return;
      }
      state.checked = true;
      showChecked({ item, correct, given: state.given, prompt, input, optionButtons, segButtons, entry });
      showFeedback(feedback, item, correct, state.given);
      main.textContent = run.index + 1 < run.entries.length ? 'Далі' : 'Результат';
      main.disabled = false;
      feedback.focus({ preventScroll: true });
      main.scrollIntoView({ block: 'nearest' });
    });

    // Клавіатура: 1–4 обирають варіант, Enter — перевірити / далі.
    keyHandler = (event) => {
      if (event.target && event.target.tagName === 'INPUT') return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const n = Number(event.key);
      if (optionButtons.length && n >= 1 && n <= optionButtons.length && !state.checked) {
        optionButtons[n - 1].click();
        optionButtons[n - 1].focus();
      } else if (event.key === 'Enter' && !main.disabled && !/^(BUTTON|A|INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        main.click();
      }
    };
    document.addEventListener('keydown', keyHandler);

    if (input) input.focus({ preventScroll: true });
    else task.focus({ preventScroll: true });
    // Нове завдання може опинитися вище за видиму область — повертаємо його в поле зору.
    if (run.index === 0 || bar.getBoundingClientRect().top < 0) focusHeading(bar);
  }

  function buildPrompt(node, text, makeGap) {
    const pieces = String(text).split('___');
    pieces.forEach((piece, i) => {
      if (piece) node.appendChild(document.createTextNode(piece));
      if (i < pieces.length - 1) node.appendChild(makeGap());
    });
  }

  function isCorrect(item, given) {
    if (given == null) return false;
    if (item.type === 'input') {
      const answer = normalize(given);
      return item.answers.some((a) => normalize(a) === answer);
    }
    return given === item.answer;
  }

  function correctText(item) {
    if (item.type === 'input') return item.answers[0];
    if (item.type === 'error') return item.fix;
    return item.options[item.answer];
  }

  function segmentsOf(item) {
    const out = [];
    item.prompt.replace(/\[\[([^\]]+)\]\]/g, (_, s) => { out.push(s); return _; });
    return out;
  }

  function givenText(item, given) {
    if (given == null || given === '') return '';
    if (item.type === 'input') return String(given).trim();
    if (item.type === 'error') return segmentsOf(item)[given];
    return item.options[given];
  }

  function showChecked(ctx) {
    const { item, correct, input, optionButtons, segButtons, prompt, entry } = ctx;
    if (item.type === 'input') {
      input.readOnly = true;
      input.classList.add(correct ? 'is-correct' : 'is-wrong');
    } else if (item.type === 'error') {
      segButtons.forEach((b, i) => {
        b.disabled = true;
        if (i === item.answer) b.classList.add('is-correct');
        else if (i === ctx.given) b.classList.add('is-wrong');
      });
    } else {
      optionButtons.forEach((b, pos) => {
        b.disabled = true;
        const optIndex = entry.order[pos];
        if (optIndex === item.answer) b.classList.add('is-correct');
        else if (optIndex === ctx.given) b.classList.add('is-wrong');
      });
      const gap = prompt.querySelector('.gr-gap');
      if (gap) {
        gap.textContent = item.options[item.answer];
        gap.classList.add('is-filled', 'is-correct');
      }
    }
  }

  function showFeedback(node, item, correct, given) {
    node.innerHTML = '';
    const verdict = el('p', 'quiz-verdict ' + (correct ? 'quiz-verdict--right' : 'quiz-verdict--wrong'), correct ? 'Правильно! ' : 'Неправильно. ');
    if (!correct || item.type === 'input' || item.type === 'error') {
      if (item.type === 'error') {
        verdict.appendChild(document.createTextNode('Помилка у фрагменті '));
        const wrong = el('b', null, segmentsOf(item)[item.answer]);
        wrong.lang = 'en';
        verdict.appendChild(wrong);
        verdict.appendChild(document.createTextNode(', правильно: '));
      } else {
        verdict.appendChild(document.createTextNode(item.type === 'input' && item.answers.length > 1 ? 'Прийнятні відповіді: ' : 'Правильна відповідь: '));
      }
      const right = el('b', null, item.type === 'input' ? item.answers.join(' / ') : correctText(item));
      right.lang = 'en';
      verdict.appendChild(right);
    }
    node.appendChild(verdict);
    if (!correct && item.type === 'input' && given) {
      const mine = el('p', 'gr-mine', 'Ваша відповідь: ');
      const b = el('b', null, String(given).trim());
      b.lang = 'en';
      mine.appendChild(b);
      node.appendChild(mine);
    }
    node.appendChild(rich(el('p', 'quiz-note'), item.explanation));
    node.hidden = false;
  }

  function record(entry, given, correct) {
    run.results[run.index] = { given, correct };
    const key = mistakeKey(run.level, entry.topic.id, entry.item.id);
    store.update((v) => {
      if (correct) delete v.mistakes[key];
      else v.mistakes[key] = 1;
    });
  }

  function detachKeys() {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = null;
  }

  /* ------------------------------------------------------------------
     Завершення й результат
     ------------------------------------------------------------------ */
  function requestFinish() {
    const answered = run.results.filter(Boolean).length;
    const left = run.entries.length - answered;
    if (left > 0 && !window.confirm('Без відповіді лишилося ' + left + ' ' + plural(left, 'завдання', 'завдання', 'завдань') + '. Завершити й переглянути результат?')) return;
    finish();
  }

  function finish() {
    detachKeys();
    const total = run.entries.length;
    const score = run.results.filter((r) => r && r.correct).length;

    store.update((v) => {
      if (run.kind === 'topic') {
        const key = progressKey(run.level, run.topic.id);
        const prev = v.topics[key];
        if (!prev || typeof prev.best !== 'number' || score > prev.best) v.topics[key] = { best: score, total };
      } else if (run.kind === 'test') {
        const percent = Math.round(score / total * 100);
        if (typeof v.tests[run.level] !== 'number' || percent > v.tests[run.level]) v.tests[run.level] = percent;
      }
    });

    try {
      if (config.event && typeof window.gtag === 'function') {
        window.gtag('event', config.event, {
          level: run.level,
          mode: run.kind,
          topic_id: run.kind === 'topic' ? run.topic.id : ''
        });
      }
    } catch (error) { /* аналітика необов'язкова */ }

    renderResult(score, total);
  }

  function renderResult(score, total) {
    const finished = run;
    ui.view.innerHTML = '';
    const back = finished.kind === 'topic' ? '#' + finished.level + '/' + finished.topic.id : '#' + finished.level;
    ui.view.appendChild(link('#' + finished.level, 'gr-back', '← Теми рівня ' + levelLabel(finished.level)));

    const box = el('section', 'quiz-result trn-result-box gr-result');
    const h = heading('h2', 'quiz-result-title', finished.title + ': результат');
    box.appendChild(h);
    box.appendChild(el('p', 'quiz-result-score', score + ' з ' + total));
    const share = total ? score / total : 0;
    let comment;
    if (share === 1) comment = 'Жодної помилки. Можна переходити до наступної теми або до змішаного тесту.';
    else if (share >= MASTERED) comment = 'Тему засвоєно. Перегляньте розбір нечисленних помилок: часто в них спільна причина.';
    else if (share >= 0.5) comment = 'Основу засвоєно, але є прогалини. Перечитайте правило й опрацюйте помилки.';
    else comment = 'Варто повернутися до правила: перечитайте пояснення й приклади, а потім спробуйте ще раз.';
    if (finished.kind === 'mistakes') comment = score === total
      ? 'Усі помилки виправлено — список очищено.'
      : 'Виправлені завдання зникли зі списку помилок, решта чекає наступної спроби.';
    box.appendChild(el('p', 'quiz-result-comment', comment));

    if (finished.kind !== 'topic') box.appendChild(renderBreakdown(finished));

    const actions = el('div', 'booking-actions');
    const wrong = finished.entries.filter((_, i) => !(finished.results[i] && finished.results[i].correct));
    if (wrong.length && finished.kind !== 'mistakes') {
      actions.appendChild(button('btn btn--primary', 'Виправити помилки (' + wrong.length + ')', () => {
        startRun({ level: finished.level, data: finished.data, kind: 'retry', topic: finished.topic, title: 'Виправлення помилок', instant: true, entries: shuffle(wrong.map((e) => ({ topic: e.topic, item: e.item }))) });
      }));
    }
    if (finished.kind === 'topic') {
      actions.appendChild(button('btn btn--secondary', 'Ще раз', () => startTopic(finished.level, finished.data, finished.topic)));
      const idx = finished.data.topics.indexOf(finished.topic);
      const next = finished.data.topics[idx + 1];
      actions.appendChild(link(back, 'btn btn--secondary', 'До правила'));
      if (next) actions.appendChild(link('#' + finished.level + '/' + next.id, 'btn btn--secondary', 'Наступна тема →'));
    } else if (finished.kind === 'test') {
      actions.appendChild(button('btn btn--secondary', 'Новий тест', () => startTest(finished.level, finished.data)));
    } else if (finished.kind === 'mistakes' && mistakesOf(finished.level).length) {
      actions.appendChild(button('btn btn--secondary', 'Ще раз', () => startMistakes(finished.level, finished.data)));
    }
    box.appendChild(actions);
    const cta = el('p', 'trn-cta', 'Хочете розібрати складні випадки разом? Це можна зробити на ');
    cta.appendChild(link('booking.html', null, 'індивідуальному занятті'));
    cta.appendChild(document.createTextNode('.'));
    box.appendChild(cta);
    ui.view.appendChild(box);

    ui.view.appendChild(renderReview(finished));
    focusHeading(h);
  }

  function renderBreakdown(finished) {
    const byTopic = [];
    finished.entries.forEach((e, i) => {
      let row = byTopic.find((r) => r.topic === e.topic);
      if (!row) {
        row = { topic: e.topic, got: 0, max: 0 };
        byTopic.push(row);
      }
      row.max += 1;
      if (finished.results[i] && finished.results[i].correct) row.got += 1;
    });
    byTopic.sort((a, b) => a.got / a.max - b.got / b.max);
    const wrap = el('div', 'gr-breakdown');
    wrap.appendChild(el('h3', 'gr-breakdown-title', 'Бали за темами'));
    const ul = el('ul', 'gr-breakdown-list');
    byTopic.forEach((row) => {
      const li = el('li', row.got < row.max ? 'is-weak' : 'is-ok');
      li.appendChild(link('#' + finished.level + '/' + row.topic.id, 'gr-breakdown-topic', row.topic.title));
      li.appendChild(el('span', 'trn-breakdown-score', row.got + ' / ' + row.max));
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    if (byTopic.some((r) => r.got < r.max)) {
      wrap.appendChild(el('p', 'gr-breakdown-note', 'Теми вгорі списку варто повторити першими: посилання відкривають правило й вправи.'));
    }
    return wrap;
  }

  function renderReview(finished) {
    const wrap = el('section', 'trn-review');
    const head = el('div', 'trn-review-head');
    head.appendChild(el('h3', 'trn-review-title', 'Розбір завдань'));
    const label = el('label', 'trn-check');
    const check = document.createElement('input');
    check.type = 'checkbox';
    label.appendChild(check);
    label.appendChild(el('span', null, 'Показати лише помилки'));
    head.appendChild(label);
    wrap.appendChild(head);

    const list = el('ol', 'trn-review-items gr-review-items');
    finished.entries.forEach((e, i) => {
      const res = finished.results[i];
      const ok = Boolean(res && res.correct);
      const li = el('li', 'trn-review-item ' + (ok ? 'is-right' : 'is-wrong'));
      const headLine = el('p', 'trn-review-head-line');
      headLine.appendChild(el('span', 'trn-review-num', '№ ' + (i + 1)));
      headLine.appendChild(el('span', 'trn-review-status ' + (ok ? 'quiz-verdict--right' : 'quiz-verdict--wrong'), ok ? 'правильно' : res ? 'помилка' : 'без відповіді'));
      if (finished.kind !== 'topic') headLine.appendChild(el('span', 'gr-review-topic', e.topic.title));
      li.appendChild(headLine);

      if (e.item.context) {
        const c = el('p', 'trn-review-context', e.item.context);
        c.lang = 'en';
        li.appendChild(c);
      }
      li.appendChild(solvedSentence(e.item));

      const answers = el('p', 'trn-review-answers', 'Ваша відповідь: ');
      const mine = el('b', null, res && givenText(e.item, res.given) ? givenText(e.item, res.given) : 'немає');
      if (res) mine.lang = 'en';
      answers.appendChild(mine);
      if (!ok) {
        answers.appendChild(document.createTextNode(' · правильно: '));
        const right = el('b', null, e.item.type === 'input' ? e.item.answers.join(' / ') : correctText(e.item));
        right.lang = 'en';
        answers.appendChild(right);
      }
      li.appendChild(answers);
      li.appendChild(rich(el('p', 'trn-review-expl'), e.item.explanation));
      list.appendChild(li);
    });
    wrap.appendChild(list);
    check.addEventListener('change', () => list.classList.toggle('is-only-wrong', check.checked));
    return wrap;
  }

  /* Речення з уже вставленою правильною відповіддю. */
  function solvedSentence(item) {
    const p = el('p', 'gr-solved');
    p.lang = 'en';
    if (item.type === 'error') {
      let seg = 0;
      item.prompt.split(/(\[\[[^\]]+\]\])/).forEach((chunk) => {
        const m = chunk.match(/^\[\[([^\]]+)\]\]$/);
        if (!m) {
          if (chunk) p.appendChild(document.createTextNode(chunk));
          return;
        }
        if (seg === item.answer) p.appendChild(el('mark', 'gr-solved-gap', item.fix));
        else p.appendChild(document.createTextNode(m[1]));
        seg += 1;
      });
    } else {
      buildPrompt(p, item.prompt, () => el('mark', 'gr-solved-gap', correctText(item)));
    }
    return p;
  }

  /* ------------------------------------------------------------------
     Старт
     ------------------------------------------------------------------ */
  window.addEventListener('hashchange', route);
  route();
})();

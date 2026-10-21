/**
 * Довідник граматики (grammar.html): пошук і фільтр рівня за темами обох тренажерів.
 *
 * Розмітку з картками генерує scripts/build-grammar.js; без JavaScript сторінка
 * показує всі теми. Тут лише фільтрування, сортування й позначки прогресу.
 *
 * Кожна картка має три рядки слів:
 *   data-p — сама тема (вага 3), data-k — розділ (вага 2), data-s — текст правила (вага 1).
 * Щоб тема пройшла, кожне слово запиту має знайтися хоча б в одному рядку:
 * точно, як початок слова, зі спільною основою (артиклів → артиклі)
 * або з однією друкарською помилкою (presnt → present).
 *
 * Прогрес читається з localStorage тренажерів (ключі grammar-trainer і a1-a2-trainer);
 * сторінка нічого не записує й нікуди не надсилає.
 */
(function () {
  'use strict';

  const form = document.getElementById('gx-search');
  const results = document.getElementById('gx-results');
  if (!form || !results) return;

  const input = document.getElementById('gx-q');
  const count = document.getElementById('gx-count');
  const reset = form.querySelector('.gx-reset');
  const empty = document.getElementById('gx-empty');
  const toc = document.getElementById('gx-toc');
  const progressNote = document.getElementById('gx-progress-note');

  const WEIGHTS = { p: 3, k: 2, s: 1 };
  const MASTERED = 0.8; // як у grammar-trainer.js
  const STORAGE_KEYS = ['grammar-trainer', 'a1-a2-trainer'];

  /* Та сама нормалізація, що в scripts/build-grammar.js. */
  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFC')
      .replace(/['’ʼ‘`´]/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim();
  }

  function words(text) {
    return text ? text.split(' ').filter(Boolean) : [];
  }

  const sections = Array.prototype.slice.call(results.querySelectorAll('.gx-section'));
  const cards = [];
  sections.forEach((section, order) => {
    section.dataset.order = String(order);
    section.querySelectorAll('.gx-topic').forEach((li) => {
      cards.push({
        li,
        section,
        key: li.dataset.key,
        level: li.dataset.level,
        phrase: li.dataset.p || '',
        fields: { p: words(li.dataset.p), k: words(li.dataset.k), s: words(li.dataset.s) }
      });
    });
  });
  const total = cards.length;

  /* ------------------------------------------------------------------
     Зіставлення слів
     ------------------------------------------------------------------ */
  function editDistance(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev2 = null;
    let prev = [];
    for (let j = 0; j <= b.length; j++) prev[j] = j;
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let rowMin = i;
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          v = Math.min(v, prev2[j - 2] + 1); // переставлені сусідні літери
        }
        cur[j] = v;
        if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      prev2 = prev;
      prev = cur;
    }
    return prev[b.length];
  }

  function wordQuality(t, w) {
    if (t === w) return 1;
    if (t.length <= 2) return 0; // a, to, if — лише точний збіг
    if (w.indexOf(t) === 0) return 0.9; // початок слова: «перф» → «перфект»
    if (t.length >= 4 && w.length >= 4) {
      let c = 0;
      const lim = Math.min(t.length, w.length);
      while (c < lim && t[c] === w[c]) c++;
      if (c >= Math.max(4, lim - 2)) return 0.8; // спільна основа: «умовних» → «умовні»
    }
    if (t.length >= 5) {
      const max = t.length >= 9 ? 2 : 1;
      if (Math.abs(t.length - w.length) <= max && editDistance(t, w, max) <= max) return 0.6;
    }
    return 0;
  }

  function fieldQuality(t, list) {
    let best = 0;
    for (let i = 0; i < list.length && best < 1; i++) {
      const q = wordQuality(t, list[i]);
      if (q > best) best = q;
    }
    return best;
  }

  function scoreCard(card, tokens, phrase) {
    let score = 0;
    for (let i = 0; i < tokens.length; i++) {
      let best = 0;
      Object.keys(WEIGHTS).forEach((f) => {
        const s = WEIGHTS[f] * fieldQuality(tokens[i], card.fields[f]);
        if (s > best) best = s;
      });
      if (!best) return 0;
      score += best;
    }
    if (tokens.length > 1 && (' ' + card.phrase + ' ').indexOf(' ' + phrase + ' ') !== -1) score += 2;
    return score;
  }

  /* ------------------------------------------------------------------
     Відображення
     ------------------------------------------------------------------ */
  function plural(n, one, few, many) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function currentLevel() {
    const checked = form.querySelector('input[name="level"]:checked');
    return checked ? checked.value : '';
  }

  function setLevel(value) {
    const radio = form.querySelector('input[name="level"][value="' + value + '"]');
    if (radio) radio.checked = true;
  }

  function apply() {
    const raw = input.value;
    const phrase = normalize(raw);
    const tokens = words(phrase);
    const level = currentLevel();
    const active = tokens.length > 0 || level !== '';

    const scores = new Map();
    let best = 0;
    cards.forEach((card) => {
      if (level && card.level !== level) return;
      const s = tokens.length ? scoreCard(card, tokens, phrase) : 1;
      if (s > 0) {
        scores.set(card, s);
        if (s > best) best = s;
      }
    });

    /* Якщо тема знайшлася за власною назвою, не показуємо ті, де слово трапилося лише в тексті правила. */
    const cutoff = tokens.length && best >= WEIGHTS.p ? best * 0.34 : 0;
    const sectionBest = new Map();
    let shown = 0;
    cards.forEach((card) => {
      const s = scores.get(card) || 0;
      const visible = s > 0 && s >= cutoff;
      card.li.hidden = !visible;
      if (visible) {
        shown++;
        sectionBest.set(card.section, Math.max(sectionBest.get(card.section) || 0, s));
      }
    });

    let sectionsShown = 0;
    sections.forEach((section) => {
      const visible = sectionBest.has(section);
      section.hidden = !visible;
      if (visible) sectionsShown++;
    });

    /* Розділи з найкращим збігом — угорі; без запиту — початковий порядок. */
    const ordered = sections.slice().sort((a, b) => {
      if (tokens.length) {
        const d = (sectionBest.get(b) || 0) - (sectionBest.get(a) || 0);
        if (d) return d;
      }
      return Number(a.dataset.order) - Number(b.dataset.order);
    });
    ordered.forEach((section) => results.appendChild(section));

    if (!active) {
      count.textContent = 'Усього тем: ' + total;
    } else if (shown) {
      count.textContent = 'Знайдено ' + shown + ' ' + plural(shown, 'тему', 'теми', 'тем') +
        ' у ' + sectionsShown + ' ' + plural(sectionsShown, 'розділі', 'розділах', 'розділах');
    } else {
      count.textContent = 'Нічого не знайдено';
    }
    empty.hidden = shown > 0;
    reset.hidden = !active;
    if (toc) toc.hidden = active;
    updateUrl(raw.trim(), level);
  }

  /* ------------------------------------------------------------------
     Адреса сторінки: ?q=…&level=… (щоб пошуком можна було поділитися)
     ------------------------------------------------------------------ */
  let urlTimer = null;
  function updateUrl(q, level) {
    window.clearTimeout(urlTimer);
    urlTimer = window.setTimeout(() => {
      try {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (level) params.set('level', level);
        const query = params.toString();
        const url = window.location.pathname + (query ? '?' + query : '') + window.location.hash;
        window.history.replaceState(null, '', url);
      } catch (error) {
        /* Без History API пошук працює далі. */
      }
    }, 400);
  }

  function readUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      input.value = params.get('q') || '';
      const level = (params.get('level') || '').toLowerCase();
      setLevel(/^[abc][12]$/.test(level) ? level : '');
    } catch (error) {
      /* Немає URLSearchParams — стартуємо з порожнього пошуку. */
    }
  }

  /* ------------------------------------------------------------------
     Прогрес із тренажерів
     ------------------------------------------------------------------ */
  function readProgress() {
    const all = {};
    STORAGE_KEYS.forEach((key) => {
      try {
        const raw = window.localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : null;
        const topics = parsed && parsed.topics && typeof parsed.topics === 'object' ? parsed.topics : {};
        Object.keys(topics).forEach((k) => { all[k] = topics[k]; });
      } catch (error) {
        /* Сховище недоступне — просто без позначок. */
      }
    });
    return all;
  }

  function showProgress() {
    const progress = readProgress();
    let started = 0;
    let mastered = 0;
    cards.forEach((card) => {
      const slot = card.li.querySelector('[data-progress]');
      const entry = progress[card.key];
      if (!slot || !entry || typeof entry.best !== 'number') return;
      const totalItems = entry.total || 10;
      const ok = entry.best / totalItems >= MASTERED;
      const pill = document.createElement('span');
      pill.className = 'gr-pill ' + (ok ? 'is-mastered' : 'is-started');
      pill.textContent = entry.best + ' / ' + totalItems;
      pill.title = ok ? 'Тему засвоєно' : 'Найкращий результат';
      slot.appendChild(pill);
      started++;
      if (ok) mastered++;
    });
    if (started && progressNote) {
      progressNote.textContent = 'Ваш прогрес: пройдено ' + started + ' з ' + total + ' ' +
        plural(total, 'теми', 'тем', 'тем') + ', засвоєно ' + mastered + '.';
      progressNote.hidden = false;
    }
  }

  /* ------------------------------------------------------------------
     Події
     ------------------------------------------------------------------ */
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    input.blur(); // на телефоні ховає клавіатуру
  });
  input.addEventListener('input', apply);
  form.addEventListener('change', (event) => {
    if (event.target && event.target.name === 'level') apply();
  });
  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      setLevel('');
      apply();
      input.focus();
    }, 0);
  });
  form.querySelectorAll('[data-q]').forEach((btn) => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.q;
      apply();
      input.focus();
    });
  });

  form.hidden = false;
  readUrl();
  showProgress();
  apply();
})();

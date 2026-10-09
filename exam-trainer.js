'use strict';

/**
 * Рушій тренажерів (НМТ, B2 First).
 * Сторінка задає налаштування атрибутами на #trn-app:
 *   data-src          — JSON із варіантами;
 *   data-storage-key  — ключ localStorage;
 *   data-event        — назва події Google Analytics після завершення спроби.
 * Щоб додати варіант, достатньо дописати його в JSON: код не змінюється.
 * Відповіді нікуди не надсилаються: прогрес і найкращі результати зберігаються лише в localStorage.
 */
(function () {
  const MODE_LABELS = { practice: 'тренування', test: 'пробний тест' };
  const CHOICE_TYPES = ['matching', 'multiple-choice', 'gapped-text', 'cloze', 'multiple-matching'];
  const LETTER_ONLY_TYPES = ['matching', 'gapped-text', 'multiple-matching'];
  const SINGLE_WORD_TYPES = ['open-cloze', 'word-formation'];

  const $ = (id) => document.getElementById(id);
  const app = $('trn-app');
  if (!app) return;

  const config = {
    src: app.dataset.src,
    storageKey: app.dataset.storageKey || 'exam-trainer',
    event: app.dataset.event || ''
  };

  const ui = {
    setup: $('trn-setup'),
    setupTitle: $('trn-setup-title'),
    status: $('trn-status'),
    form: $('trn-setup-form'),
    variantList: $('trn-variant-list'),
    timerInput: $('trn-timer-input'),
    best: $('trn-best'),
    bestList: $('trn-best-list'),
    resume: $('trn-resume'),
    resumeText: $('trn-resume-text'),
    resumeContinue: $('trn-resume-continue'),
    resumeDiscard: $('trn-resume-discard'),
    runner: $('trn-runner'),
    runnerTitle: $('trn-runner-title'),
    counter: $('trn-counter'),
    timer: $('trn-timer'),
    timerAlert: $('trn-timer-alert'),
    finish: $('trn-finish'),
    tabs: $('trn-task-tabs'),
    task: $('trn-task'),
    prev: $('trn-prev'),
    next: $('trn-next'),
    result: $('trn-result'),
    resultTitle: $('trn-result-title'),
    resultScore: $('trn-result-score'),
    resultComment: $('trn-result-comment'),
    breakdown: $('trn-breakdown'),
    again: $('trn-again'),
    choose: $('trn-choose'),
    onlyWrong: $('trn-only-wrong'),
    reviewList: $('trn-review-list')
  };

  /* ------------------------------------------------------------------
     Сховище: усі звертання в try/catch, без сховища все працює далі
     ------------------------------------------------------------------ */
  const store = {
    read() {
      try {
        const raw = window.localStorage.getItem(config.storageKey);
        const parsed = raw ? JSON.parse(raw) : null;
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (error) {
        return {};
      }
    },
    write(value) {
      try {
        window.localStorage.setItem(config.storageKey, JSON.stringify(value));
      } catch (error) {
        /* Сховище недоступне (приватний режим, заборона cookie): прогрес не збережеться. */
      }
    },
    update(fn) {
      const value = this.read();
      fn(value);
      this.write(value);
    }
  };

  let data = null;
  let variant = null; // поточний варіант
  let tasks = [];     // [{ part, task }]
  let byNumber = {};  // номер запитання → { task, question, options }
  let total = 0;      // кількість запитань
  let maxScore = 0;   // сума балів
  let session = null; // { variantId, mode, timer, deadline, answers, checked, taskIndex }
  let tickHandle = null;
  let warned = {};

  /* ------------------------------------------------------------------
     Допоміжні функції
     ------------------------------------------------------------------ */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function show(screen) {
    [ui.setup, ui.runner, ui.result].forEach((s) => { s.hidden = s !== screen; });
  }

  function focusHeading(node) {
    if (!node) return;
    node.focus({ preventScroll: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  function plural(n, one, few, many) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function isChoice(task) {
    return CHOICE_TYPES.indexOf(task.type) !== -1;
  }

  function optionsOf(task, question) {
    if (question.options) return question.options;
    if (task.type === 'multiple-matching') {
      return task.sections.map((s) => ({ letter: s.letter, text: s.title }));
    }
    return task.options || [];
  }

  function optionText(entry, letter) {
    const found = entry.options.find((o) => o.letter === letter);
    return found ? found.text : '';
  }

  function pointsOf(question) {
    return typeof question.points === 'number' ? question.points : 1;
  }

  /* Нормалізація введених відповідей: регістр, апострофи, пробіли, скорочення.
     Скорочення розгортаємо, бо Cambridge рахує їх за повну форму (didn't = did not),
     окрім can't = cannot, яке є одним словом. */
  function normalize(text) {
    let s = String(text || '').toLowerCase()
      .replace(/[‘’`´]/g, "'")
      .replace(/[.,!?;:"«»]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    s = s.replace(/\bcan't\b/g, 'cannot')
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bshan't\b/g, 'shall not')
      .replace(/n't\b/g, ' not')
      .replace(/'ve\b/g, ' have')
      .replace(/'ll\b/g, ' will')
      .replace(/'re\b/g, ' are')
      .replace(/\bi'm\b/g, 'i am');
    return s.replace(/\s+/g, ' ').trim();
  }

  function wordCount(normalized) {
    if (!normalized) return 0;
    // 's і 'd позначають окреме слово (is/has, had/would).
    return normalized.split(' ').reduce((sum, w) => sum + 1 + (/'[sd]$/.test(w) && w.length > 2 ? 1 : 0), 0);
  }

  function hasAnswer(n) {
    const value = session.answers[n];
    return typeof value === 'string' && value.trim() !== '';
  }

  /* Оцінювання одного запитання: { points, max, status: 'right' | 'partial' | 'wrong' | 'none' } */
  function scoreOf(n) {
    const entry = byNumber[n];
    const { task, question } = entry;
    const max = pointsOf(question);
    if (!hasAnswer(n)) return { points: 0, max, status: 'none' };
    const raw = session.answers[n];
    let points = 0;

    if (isChoice(task)) {
      points = raw === question.key ? max : 0;
    } else if (SINGLE_WORD_TYPES.indexOf(task.type) !== -1) {
      const answer = normalize(raw);
      const ok = answer.indexOf(' ') === -1 && question.answers.some((a) => normalize(a) === answer);
      points = ok ? max : 0;
    } else if (task.type === 'transformation') {
      points = scoreTransformation(question, raw);
    }
    const status = points === max ? 'right' : points > 0 ? 'partial' : 'wrong';
    return { points, max, status };
  }

  /* Part 4 B2 First: відповідь ділиться на дві частини, кожна дає 1 бал.
     Без ключового слова або з довжиною поза межами 2–5 слів — 0 балів. */
  function scoreTransformation(question, raw) {
    const answer = normalize(raw);
    const count = wordCount(answer);
    if (count < 2 || count > 5) return 0;
    const key = normalize(question.keyword);
    if ((' ' + answer + ' ').indexOf(' ' + key + ' ') === -1) return 0;
    let best = 0;
    question.answers.forEach((alt) => {
      const firsts = alt.parts[0].map(normalize);
      const seconds = alt.parts[1].map(normalize);
      firsts.forEach((a) => {
        seconds.forEach((b) => {
          let score = 0;
          if (answer === a + ' ' + b) score = 2;
          else {
            if (answer === a || answer.indexOf(a + ' ') === 0) score += 1;
            if (answer === b || answer.slice(-(b.length + 1)) === ' ' + b) score += 1;
            score = Math.min(score, 1);
          }
          if (score > best) best = score;
        });
      });
    });
    return Math.min(best, pointsOf(question));
  }

  function acceptedText(question) {
    if (question.answers && question.answers.length && typeof question.answers[0] === 'object') {
      // Повні правильні відповіді: кожна перша частина з кожною другою.
      const full = [];
      question.answers.forEach((alt) => {
        alt.parts[0].forEach((a) => alt.parts[1].forEach((b) => full.push(a + ' ' + b)));
      });
      return full.join(' / ');
    }
    return (question.answers || []).join(' / ');
  }

  function prepareVariant(id) {
    variant = data.variants.find((v) => v.id === id) || null;
    tasks = [];
    byNumber = {};
    total = 0;
    maxScore = 0;
    if (!variant) return false;
    variant.parts.forEach((part) => {
      part.tasks.forEach((task) => {
        tasks.push({ part, task });
        task.questions.forEach((question) => {
          byNumber[question.number] = { task, question, options: optionsOf(task, question) };
          total += 1;
          maxScore += pointsOf(question);
        });
      });
    });
    return true;
  }

  function variantMax(v) {
    return v.parts.reduce((s, p) => s + p.tasks.reduce((t, task) =>
      t + task.questions.reduce((q, question) => q + pointsOf(question), 0), 0), 0);
  }

  function variantCount(v) {
    return v.parts.reduce((s, p) => s + p.tasks.reduce((t, task) => t + task.questions.length, 0), 0);
  }

  function saveSession() {
    store.update((value) => { value.session = session; });
  }

  function answeredCount() {
    return Object.keys(byNumber).filter(hasAnswer).length;
  }

  function totalScore(onlyChecked) {
    return Object.keys(byNumber).reduce((sum, n) => {
      if (onlyChecked && !session.checked[n]) return sum;
      return sum + scoreOf(n).points;
    }, 0);
  }

  function partLabel(part, task) {
    if (part.label) return part.label + (task.subtitle ? ' · ' + task.subtitle : '');
    return 'Частина «' + part.title + '»' + (part.titleEn ? ' · ' + part.titleEn : '');
  }

  /* ------------------------------------------------------------------
     Екран вибору
     ------------------------------------------------------------------ */
  function renderSetup() {
    ui.variantList.innerHTML = '';
    data.variants.forEach((v, i) => {
      const label = el('label', 'trn-choice');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'variant';
      input.value = v.id;
      if (i === 0) input.checked = true;
      const body = el('span', 'trn-choice-body');
      body.appendChild(el('span', 'trn-choice-title', v.title));
      const count = variantCount(v);
      body.appendChild(el('span', 'trn-choice-text', count + ' ' + plural(count, 'завдання', 'завдання', 'завдань') + (v.level ? ' · рівень ' + v.level : '')));
      label.appendChild(input);
      label.appendChild(body);
      ui.variantList.appendChild(label);
    });

    document.querySelectorAll('[data-trn-duration]').forEach((n) => { n.textContent = data.meta.durationMinutes; });
    document.querySelectorAll('[data-trn-threshold]').forEach((n) => { n.textContent = data.meta.thresholdScore; });
    document.querySelectorAll('[data-trn-max]').forEach((n) => { n.textContent = data.meta.maxScore; });

    syncTimerOption();
    renderBest();
    renderResume();
    ui.status.hidden = true;
    ui.form.hidden = false;
  }

  function syncTimerOption() {
    const mode = ui.form.elements.mode.value;
    ui.timerInput.disabled = mode !== 'test';
    if (mode !== 'test') ui.timerInput.checked = false;
  }

  function renderBest() {
    const best = store.read().best || {};
    ui.bestList.innerHTML = '';
    data.variants.forEach((v) => {
      const entry = best[v.id];
      if (!entry) return;
      ['test', 'practice'].forEach((mode) => {
        if (typeof entry[mode] !== 'number') return;
        ui.bestList.appendChild(el('li', null, v.title + ', ' + MODE_LABELS[mode] + ': ' + entry[mode] + ' з ' + variantMax(v)));
      });
    });
    ui.best.hidden = !ui.bestList.children.length;
  }

  function renderResume() {
    const saved = store.read().session;
    const v = saved && data.variants.find((x) => x.id === saved.variantId);
    if (!v || !saved.answers || !MODE_LABELS[saved.mode]) {
      ui.resume.hidden = true;
      return;
    }
    const answered = Object.keys(saved.answers).filter((n) => String(saved.answers[n] || '').trim()).length;
    ui.resumeText.textContent = 'У вас є незавершена спроба: ' + v.title + ', ' + MODE_LABELS[saved.mode] +
      ', відповіді на ' + answered + ' ' + plural(answered, 'завдання', 'завдання', 'завдань') + '.';
    ui.resume.hidden = false;
  }

  function startSession(variantId, mode, withTimer) {
    if (!prepareVariant(variantId)) return;
    session = {
      variantId,
      mode,
      timer: Boolean(withTimer && mode === 'test'),
      deadline: withTimer && mode === 'test' ? Date.now() + data.meta.durationMinutes * 60000 : null,
      answers: {},
      checked: {},
      taskIndex: 0
    };
    saveSession();
    openRunner();
  }

  function resumeSession() {
    const saved = store.read().session;
    if (!saved || !prepareVariant(saved.variantId)) return;
    session = {
      variantId: saved.variantId,
      mode: saved.mode === 'test' ? 'test' : 'practice',
      timer: Boolean(saved.timer),
      deadline: typeof saved.deadline === 'number' ? saved.deadline : null,
      answers: saved.answers || {},
      checked: saved.checked || {},
      taskIndex: Math.min(Math.max(Number(saved.taskIndex) || 0, 0), tasks.length - 1)
    };
    // Відкидаємо відповіді на номери, яких у варіанті вже немає.
    Object.keys(session.answers).forEach((n) => { if (!byNumber[n]) delete session.answers[n]; });
    openRunner();
  }

  /* ------------------------------------------------------------------
     Виконання
     ------------------------------------------------------------------ */
  function openRunner() {
    ui.runnerTitle.textContent = variant.title + ' · ' + MODE_LABELS[session.mode];
    ui.finish.textContent = session.mode === 'test' ? 'Завершити тест' : 'Завершити';
    warned = {};
    renderTabs();
    renderTask();
    updateCounter();
    show(ui.runner);
    startTimer();
    focusHeading(document.getElementById('trn-task-title'));
  }

  function rangeOf(task) {
    return task.questions[0].number + '–' + task.questions[task.questions.length - 1].number;
  }

  function renderTabs() {
    ui.tabs.innerHTML = '';
    tasks.forEach((entry, i) => {
      const li = el('li');
      const btn = el('button', 'trn-tab');
      btn.type = 'button';
      btn.appendChild(el('span', 'trn-tab-label', entry.task.label || 'Task ' + (i + 1)));
      btn.appendChild(el('span', 'trn-tab-range', rangeOf(entry.task)));
      btn.addEventListener('click', () => goTo(i));
      li.appendChild(btn);
      ui.tabs.appendChild(li);
    });
    updateTabs();
  }

  function updateTabs() {
    Array.prototype.forEach.call(ui.tabs.querySelectorAll('.trn-tab'), (btn, i) => {
      const done = tasks[i].task.questions.every((q) => hasAnswer(q.number));
      btn.classList.toggle('is-done', done);
      if (i === session.taskIndex) btn.setAttribute('aria-current', 'step');
      else btn.removeAttribute('aria-current');
      btn.setAttribute('aria-label', btn.firstChild.textContent + ', завдання ' + btn.lastChild.textContent + (done ? ', усі відповіді дано' : ''));
    });
    ui.prev.hidden = session.taskIndex === 0;
    ui.next.hidden = session.taskIndex === tasks.length - 1;
  }

  function goTo(index) {
    if (index < 0 || index >= tasks.length) return;
    session.taskIndex = index;
    saveSession();
    renderTask();
    updateTabs();
    focusHeading(document.getElementById('trn-task-title'));
  }

  function renderTask() {
    const { part, task } = tasks[session.taskIndex];
    ui.task.innerHTML = '';

    ui.task.appendChild(el('p', 'trn-part', partLabel(part, task)));
    const heading = el('h3', 'trn-task-title', (task.label || '') + ' · завдання ' + rangeOf(task));
    heading.id = 'trn-task-title';
    heading.tabIndex = -1;
    ui.task.appendChild(heading);
    const instruction = el('p', 'trn-instruction', task.instruction);
    instruction.lang = 'en';
    ui.task.appendChild(instruction);

    if (task.passage) ui.task.appendChild(renderPassage(task));
    if (task.type === 'multiple-matching') ui.task.appendChild(renderSections(task));

    if (task.type === 'matching') {
      if (task.title) {
        const title = el('h4', 'trn-set-title', task.title);
        title.lang = 'en';
        ui.task.appendChild(title);
      }
      ui.task.appendChild(renderOptionsBox(task));
    }
    if (task.type === 'gapped-text') ui.task.appendChild(renderOptionsBox(task));

    const list = el('ol', 'trn-questions');
    task.questions.forEach((question) => list.appendChild(renderQuestion(task, question)));
    ui.task.appendChild(list);
  }

  function renderParagraph(text) {
    const p = el('p');
    text.split(/(\{\{\d+\}\})/).forEach((chunk) => {
      const m = chunk.match(/^\{\{(\d+)\}\}$/);
      if (!m) {
        if (chunk) p.appendChild(document.createTextNode(chunk));
        return;
      }
      const gap = el('span', 'trn-gap');
      gap.dataset.gap = m[1];
      p.appendChild(gap);
    });
    return p;
  }

  function renderPassage(task) {
    const article = el('article', 'trn-passage');
    article.lang = 'en';
    if (task.passage.title) article.appendChild(el('h4', 'trn-passage-title', task.passage.title));
    task.passage.paragraphs.forEach((text) => article.appendChild(renderParagraph(text)));
    updateGaps(article);
    return article;
  }

  function renderSections(task) {
    const article = el('article', 'trn-passage trn-sections');
    article.lang = 'en';
    if (task.title) article.appendChild(el('h4', 'trn-passage-title', task.title));
    task.sections.forEach((section) => {
      const block = el('section', 'trn-section');
      const head = el('h5', 'trn-section-title');
      head.appendChild(el('span', 'trn-section-letter', section.letter));
      head.appendChild(document.createTextNode(section.title));
      block.appendChild(head);
      section.paragraphs.forEach((text) => block.appendChild(el('p', null, text)));
      article.appendChild(block);
    });
    return article;
  }

  function gapDisplay(n) {
    const entry = byNumber[n];
    if (!entry || !hasAnswer(n)) return '';
    return isChoice(entry.task) ? optionText(entry, session.answers[n]) : session.answers[n].trim();
  }

  function updateGaps(scope) {
    (scope || ui.task).querySelectorAll('.trn-gap').forEach((gap) => {
      const n = gap.dataset.gap;
      const entry = byNumber[n];
      const shown = gapDisplay(n);
      gap.textContent = '';
      gap.appendChild(el('b', 'trn-gap-num', '(' + n + ')'));
      if (shown) {
        gap.appendChild(document.createTextNode(' ' + shown));
        gap.classList.add('is-filled');
      } else {
        gap.appendChild(el('span', 'trn-gap-line', '________'));
        gap.classList.remove('is-filled');
      }
      if (entry && entry.question.stem) gap.appendChild(el('span', 'trn-gap-stem', ' ' + entry.question.stem));
    });
  }

  function renderOptionsBox(task) {
    const box = el('div', 'trn-options-box');
    box.appendChild(el('p', 'trn-options-title', 'Варіанти відповіді'));
    if (task.stem) {
      const stem = el('p', 'trn-stem', task.stem.replace('___', '______'));
      stem.lang = 'en';
      box.appendChild(stem);
    }
    const list = el('ul', 'trn-options-list');
    list.lang = 'en';
    task.options.forEach((o) => {
      const li = el('li');
      li.appendChild(el('b', 'trn-options-letter', o.letter));
      li.appendChild(document.createTextNode(o.text));
      list.appendChild(li);
    });
    box.appendChild(list);
    return box;
  }

  function legendText(task, question) {
    const n = question.number;
    if (task.type === 'multiple-matching') return (task.stem ? task.stem + ' … ' : '') + question.prompt;
    if (question.prompt) return question.prompt;
    if (task.type === 'matching') return task.stem || '';
    if (task.type === 'word-formation') return 'Пропуск (' + n + ') · ' + question.stem;
    if (task.type === 'transformation') return 'Перефразуйте речення';
    return 'Пропуск (' + n + ')';
  }

  function renderQuestion(task, question) {
    const n = question.number;
    const item = el('li', 'trn-q');
    item.id = 'trn-q-' + n;

    if (question.text) {
      const card = el('div', 'trn-text-card');
      card.lang = 'en';
      card.appendChild(el('span', 'trn-text-num', String(n)));
      if (question.text.title) card.appendChild(el('p', 'trn-text-title', question.text.title));
      question.text.body.forEach((line) => card.appendChild(el('p', 'trn-text-line', line)));
      item.appendChild(card);
    }

    const fieldset = el('fieldset', 'trn-q-fieldset');
    const legend = el('legend', 'trn-q-legend');
    legend.appendChild(el('span', 'trn-q-num', '№ ' + n));
    const text = legendText(task, question);
    const legendBody = el('span', 'trn-q-prompt', text.replace('___', '______'));
    if (question.prompt || task.type === 'matching' || task.type === 'multiple-matching') legendBody.lang = 'en';
    legend.appendChild(legendBody);
    if (pointsOf(question) > 1) legend.appendChild(el('span', 'trn-q-points', pointsOf(question) + ' ' + plural(pointsOf(question), 'бал', 'бали', 'балів')));
    fieldset.appendChild(legend);

    if (isChoice(task)) fieldset.appendChild(renderChoices(task, question, item));
    else fieldset.appendChild(renderTextInput(task, question, item));
    item.appendChild(fieldset);

    if (session.mode === 'practice') {
      const actions = el('div', 'trn-q-actions');
      const check = el('button', 'btn btn--secondary btn--sm trn-check-btn', 'Перевірити');
      check.type = 'button';
      check.disabled = !hasAnswer(n);
      check.addEventListener('click', () => checkAnswer(n, item, true));
      actions.appendChild(check);
      item.appendChild(actions);
      const feedback = el('div', 'trn-feedback');
      feedback.tabIndex = -1;
      feedback.hidden = true;
      item.appendChild(feedback);
      if (session.checked[n]) checkAnswer(n, item, false);
    }
    return item;
  }

  function renderChoices(task, question, item) {
    const n = question.number;
    const entry = byNumber[n];
    const letterOnly = LETTER_ONLY_TYPES.indexOf(task.type) !== -1;
    const group = el('div', letterOnly ? 'trn-letters' : 'trn-opts');
    entry.options.forEach((o) => {
      const label = el('label', letterOnly ? 'trn-letter' : 'trn-opt');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'trn-q-' + n;
      input.value = o.letter;
      input.className = 'trn-radio';
      if (session.answers[n] === o.letter) input.checked = true;
      input.addEventListener('change', () => onAnswer(n, o.letter, item));
      label.appendChild(input);
      label.appendChild(el('span', 'quiz-letter', o.letter));
      const optText = el('span', letterOnly ? 'visually-hidden' : 'trn-opt-text', letterOnly ? ' — ' + o.text : o.text);
      optText.lang = 'en';
      label.appendChild(optText);
      if (letterOnly) label.title = o.text;
      group.appendChild(label);
    });
    return group;
  }

  function renderTextInput(task, question, item) {
    const n = question.number;
    const wrap = el('div', 'trn-input-wrap');

    if (task.type === 'transformation') {
      const lead = el('p', 'trn-tf-lead', question.lead);
      lead.lang = 'en';
      wrap.appendChild(lead);
      const key = el('p', 'trn-tf-key', question.keyword.toUpperCase());
      key.lang = 'en';
      wrap.appendChild(key);
      const second = el('p', 'trn-tf-second');
      second.lang = 'en';
      second.appendChild(document.createTextNode(question.before + ' '));
      const gap = el('span', 'trn-gap');
      gap.dataset.gap = String(n);
      second.appendChild(gap);
      second.appendChild(document.createTextNode(' ' + question.after));
      wrap.appendChild(second);
      updateGaps(wrap);
    }

    const id = 'trn-input-' + n;
    const label = el('label', 'trn-input-label',
      task.type === 'transformation'
        ? 'Пропущені слова (від 2 до 5, разом із ' + question.keyword.toUpperCase() + ')'
        : 'Одне слово');
    label.htmlFor = id;
    wrap.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.className = 'trn-text-input';
    input.lang = 'en';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocorrect', 'off');
    input.value = session.answers[n] || '';
    input.addEventListener('input', () => onAnswer(n, input.value, item));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (session.mode === 'practice' && hasAnswer(n) && !session.checked[n]) checkAnswer(n, item, true);
      }
    });
    wrap.appendChild(input);
    return wrap;
  }

  function onAnswer(n, value, item) {
    if (session.checked[n]) return;
    if (typeof value === 'string' && value.trim() === '' && !isChoice(byNumber[n].task)) delete session.answers[n];
    else session.answers[n] = value;
    saveSession();
    updateGaps();
    updateCounter();
    updateTabs();
    const check = item.querySelector('.trn-check-btn');
    if (check) check.disabled = !hasAnswer(n);
  }

  function verdictText(result) {
    if (result.status === 'right') return 'Правильно! ';
    if (result.status === 'partial') return 'Частково: ' + result.points + ' з ' + result.max + '. ';
    return 'Неправильно. ';
  }

  function checkAnswer(n, item, announce) {
    const entry = byNumber[n];
    if (!hasAnswer(n)) return;
    const result = scoreOf(n);
    if (announce) {
      session.checked[n] = true;
      saveSession();
      updateCounter();
    }

    item.classList.add('is-checked');
    if (isChoice(entry.task)) {
      const chosen = session.answers[n];
      item.querySelectorAll('.trn-radio').forEach((input) => {
        input.disabled = true;
        const label = input.parentNode;
        label.classList.toggle('is-correct', input.value === entry.question.key);
        label.classList.toggle('is-wrong', input.value === chosen && result.status !== 'right');
      });
    } else {
      const input = item.querySelector('.trn-text-input');
      input.readOnly = true;
      input.classList.toggle('is-correct', result.status === 'right');
      input.classList.toggle('is-partial', result.status === 'partial');
      input.classList.toggle('is-wrong', result.status === 'wrong');
    }
    const actions = item.querySelector('.trn-q-actions');
    if (actions) actions.hidden = true;

    const feedback = item.querySelector('.trn-feedback');
    feedback.innerHTML = '';
    const tone = result.status === 'right' ? 'quiz-verdict--right' : result.status === 'partial' ? 'trn-verdict--partial' : 'quiz-verdict--wrong';
    const verdict = el('p', 'quiz-verdict ' + tone, verdictText(result));
    if (isChoice(entry.task)) {
      verdict.appendChild(document.createTextNode('Правильна відповідь: '));
      const answer = el('b', null, entry.question.key + ' — ' + optionText(entry, entry.question.key));
      answer.lang = 'en';
      verdict.appendChild(answer);
    } else {
      verdict.appendChild(document.createTextNode('Прийнятні відповіді: '));
      const answer = el('b', null, acceptedText(entry.question));
      answer.lang = 'en';
      verdict.appendChild(answer);
    }
    feedback.appendChild(verdict);
    feedback.appendChild(el('p', 'quiz-note', entry.question.explanation));
    feedback.hidden = false;
    // Кнопка «Перевірити» зникає, тож переводимо фокус на пояснення, щоб він не загубився.
    if (announce) feedback.focus({ preventScroll: false });
  }

  function updateCounter() {
    let text = 'Відповіли: ' + answeredCount() + ' з ' + total;
    if (session.mode === 'practice') text += ' · бали: ' + totalScore(true);
    ui.counter.textContent = text;
  }

  /* ------------------------------------------------------------------
     Таймер (лише пробний тест, за бажанням)
     ------------------------------------------------------------------ */
  function startTimer() {
    stopTimer();
    if (!session.timer || !session.deadline) {
      ui.timer.hidden = true;
      return;
    }
    ui.timer.hidden = false;
    tick();
    tickHandle = window.setInterval(tick, 1000);
  }

  function stopTimer() {
    if (tickHandle) window.clearInterval(tickHandle);
    tickHandle = null;
  }

  function tick() {
    const left = Math.max(0, session.deadline - Date.now());
    const minutes = Math.floor(left / 60000);
    const seconds = Math.floor((left % 60000) / 1000);
    ui.timer.textContent = 'Залишилося ' + minutes + ':' + String(seconds).padStart(2, '0');
    ui.timer.classList.toggle('is-low', left <= 5 * 60000);
    [10, 1].forEach((mark) => {
      if (!warned[mark] && left <= mark * 60000 && left > 0) {
        warned[mark] = true;
        ui.timerAlert.textContent = 'Залишилося ' + mark + ' ' + plural(mark, 'хвилина', 'хвилини', 'хвилин') + '.';
      }
    });
    if (left <= 0) finish(true);
  }

  /* ------------------------------------------------------------------
     Завершення й результат
     ------------------------------------------------------------------ */
  function requestFinish() {
    const unanswered = total - answeredCount();
    let message = null;
    if (session.mode === 'test' && unanswered > 0) {
      message = 'Без відповіді лишилося ' + unanswered + ' ' +
        plural(unanswered, 'завдання', 'завдання', 'завдань') + '. Завершити тест?';
    } else if (session.mode === 'practice') {
      const unchecked = total - Object.keys(session.checked).filter((n) => byNumber[n]).length;
      if (unchecked > 0) {
        message = 'Неперевіреними лишилося ' + unchecked + ' ' +
          plural(unchecked, 'завдання', 'завдання', 'завдань') + '. Завершити й переглянути результат?';
      }
    }
    if (message && !window.confirm(message)) return;
    finish(false);
  }

  function finish(timeUp) {
    stopTimer();
    const score = totalScore(false);
    const finished = session;

    store.update((value) => {
      value.session = null;
      value.best = value.best || {};
      const entry = value.best[finished.variantId] || {};
      if (typeof entry[finished.mode] !== 'number' || score > entry[finished.mode]) entry[finished.mode] = score;
      value.best[finished.variantId] = entry;
    });

    // В аналітику йдуть лише номер варіанта й режим, без відповідей і балів.
    try {
      if (config.event && typeof window.gtag === 'function') {
        window.gtag('event', config.event, { variant_id: finished.variantId, mode: finished.mode });
      }
    } catch (error) { /* аналітика необов'язкова */ }

    renderResult(score, timeUp);
  }

  function renderResult(score, timeUp) {
    ui.resultScore.textContent = score + ' з ' + maxScore;
    const best = (store.read().best || {})[session.variantId];
    const bestScore = best && typeof best[session.mode] === 'number' ? best[session.mode] : null;

    let comment = '';
    if (timeUp) comment += 'Час вичерпано, тож зараховано відповіді, дані до цього моменту. ';
    const share = score / maxScore;
    if (share === 1) comment += 'Жодної помилки — чудово.';
    else if (share >= 0.75) comment += 'Сильний результат. Перегляньте розбір: помилки, яких лишилося небагато, зазвичай мають спільну причину.';
    else if (share >= 0.5) comment += 'Добра основа. Подивіться, у яких частинах найбільше втрачених балів: з них і варто почати.';
    else comment += 'Є над чим попрацювати. Розбір нижче пояснює кожну пастку, а повторна спроба через кілька днів покаже, що вже засвоєно.';
    if (bestScore != null && bestScore > score) comment += ' Ваш найкращий результат у цьому режимі — ' + bestScore + ' з ' + maxScore + '.';
    ui.resultComment.textContent = comment;

    renderBreakdown();
    renderReview();
    ui.onlyWrong.checked = false;
    ui.reviewList.classList.remove('is-only-wrong');
    show(ui.result);
    focusHeading(ui.resultTitle);
  }

  function renderBreakdown() {
    if (!ui.breakdown) return;
    ui.breakdown.innerHTML = '';
    tasks.forEach(({ task }) => {
      const got = task.questions.reduce((s, q) => s + scoreOf(q.number).points, 0);
      const max = task.questions.reduce((s, q) => s + pointsOf(q), 0);
      const li = el('li');
      li.appendChild(el('span', 'trn-breakdown-label', task.label || ''));
      li.appendChild(el('span', 'trn-breakdown-score', got + ' / ' + max));
      ui.breakdown.appendChild(li);
    });
  }

  function reviewStatus(result) {
    if (result.status === 'right') return 'правильно';
    if (result.status === 'partial') return 'частково, ' + result.points + ' з ' + result.max;
    if (result.status === 'none') return 'без відповіді';
    return 'помилка';
  }

  function renderReview() {
    ui.reviewList.innerHTML = '';
    tasks.forEach(({ part, task }) => {
      const block = el('section', 'trn-review-task');
      block.appendChild(el('h4', 'trn-review-task-title', (task.label || '') + ' · завдання ' + rangeOf(task) + ' · ' + (part.label || part.title)));
      const list = el('ol', 'trn-review-items');
      task.questions.forEach((question) => {
        const entry = byNumber[question.number];
        const result = scoreOf(question.number);
        const isRight = result.status === 'right';
        const li = el('li', 'trn-review-item ' + (isRight ? 'is-right' : result.status === 'partial' ? 'is-wrong is-partial' : 'is-wrong'));

        const head = el('p', 'trn-review-head-line');
        head.appendChild(el('span', 'trn-review-num', '№ ' + question.number));
        head.appendChild(el('span', 'trn-review-status ' + (isRight ? 'quiz-verdict--right' : result.status === 'partial' ? 'trn-verdict--partial' : 'quiz-verdict--wrong'), reviewStatus(result)));
        li.appendChild(head);

        const context = question.prompt || question.lead || (question.text && question.text.title) || (question.stem ? 'Слово: ' + question.stem : '');
        if (context) {
          const ctx = el('p', 'trn-review-context', context.replace('___', '______'));
          if (!question.stem || question.prompt || question.lead) ctx.lang = 'en';
          li.appendChild(ctx);
        }

        const answers = el('p', 'trn-review-answers');
        answers.appendChild(document.createTextNode('Ваша відповідь: '));
        if (hasAnswer(question.number)) {
          const raw = session.answers[question.number];
          const mine = el('b', null, isChoice(task) ? raw + ' — ' + optionText(entry, raw) : raw.trim());
          mine.lang = 'en';
          answers.appendChild(mine);
        } else {
          answers.appendChild(el('b', null, 'немає'));
        }
        if (!isRight) {
          answers.appendChild(document.createTextNode(isChoice(task) ? ' · правильна: ' : ' · прийнятні: '));
          const right = el('b', null, isChoice(task) ? question.key + ' — ' + optionText(entry, question.key) : acceptedText(question));
          right.lang = 'en';
          answers.appendChild(right);
        }
        li.appendChild(answers);
        li.appendChild(el('p', 'trn-review-expl', question.explanation));
        list.appendChild(li);
      });
      block.appendChild(list);
      if (!list.querySelector('.is-wrong')) block.classList.add('is-all-right');
      ui.reviewList.appendChild(block);
    });
  }

  /* ------------------------------------------------------------------
     Події
     ------------------------------------------------------------------ */
  ui.form.addEventListener('change', (event) => {
    if (event.target.name === 'mode') syncTimerOption();
  });

  ui.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const variantId = ui.form.elements.variant.value;
    startSession(variantId, ui.form.elements.mode.value, ui.timerInput.checked);
  });

  ui.resumeContinue.addEventListener('click', resumeSession);
  ui.resumeDiscard.addEventListener('click', () => {
    store.update((value) => { value.session = null; });
    ui.resume.hidden = true;
    focusHeading(ui.setupTitle);
  });

  ui.prev.addEventListener('click', () => goTo(session.taskIndex - 1));
  ui.next.addEventListener('click', () => goTo(session.taskIndex + 1));
  ui.finish.addEventListener('click', requestFinish);

  ui.again.addEventListener('click', () => startSession(session.variantId, session.mode, session.timer));
  ui.choose.addEventListener('click', () => {
    renderBest();
    renderResume();
    show(ui.setup);
    focusHeading(ui.setupTitle);
  });

  ui.onlyWrong.addEventListener('change', () => {
    ui.reviewList.classList.toggle('is-only-wrong', ui.onlyWrong.checked);
  });

  /* ------------------------------------------------------------------
     Завантаження даних
     ------------------------------------------------------------------ */
  fetch(config.src)
    .then((response) => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then((json) => {
      if (!json || !Array.isArray(json.variants) || !json.variants.length) throw new Error('empty');
      data = json;
      renderSetup();
    })
    .catch(() => {
      ui.status.textContent = 'Не вдалося завантажити завдання. Перевірте з’єднання з інтернетом і оновіть сторінку.';
      ui.status.classList.add('is-error');
    });
})();

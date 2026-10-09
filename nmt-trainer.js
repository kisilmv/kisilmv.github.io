'use strict';

/**
 * Тренажер НМТ з англійської мови.
 * Завдання беруться з data/nmt-trainer.json; щоб додати варіант, достатньо дописати його в JSON.
 * Відповіді нікуди не надсилаються: прогрес і найкращі результати зберігаються лише в localStorage.
 */
(function () {
  const DATA_URL = 'data/nmt-trainer.json?v=20261009';
  const STORAGE_KEY = 'nmt-trainer';
  const MODE_LABELS = { practice: 'тренування', test: 'пробний тест' };

  const $ = (id) => document.getElementById(id);
  const app = $('nmt-app');
  if (!app) return;

  const ui = {
    setup: $('nmt-setup'),
    setupTitle: $('nmt-setup-title'),
    status: $('nmt-status'),
    form: $('nmt-setup-form'),
    variantList: $('nmt-variant-list'),
    timerInput: $('nmt-timer-input'),
    best: $('nmt-best'),
    bestList: $('nmt-best-list'),
    resume: $('nmt-resume'),
    resumeText: $('nmt-resume-text'),
    resumeContinue: $('nmt-resume-continue'),
    resumeDiscard: $('nmt-resume-discard'),
    runner: $('nmt-runner'),
    runnerTitle: $('nmt-runner-title'),
    counter: $('nmt-counter'),
    timer: $('nmt-timer'),
    timerAlert: $('nmt-timer-alert'),
    finish: $('nmt-finish'),
    tabs: $('nmt-task-tabs'),
    task: $('nmt-task'),
    prev: $('nmt-prev'),
    next: $('nmt-next'),
    result: $('nmt-result'),
    resultTitle: $('nmt-result-title'),
    resultScore: $('nmt-result-score'),
    resultComment: $('nmt-result-comment'),
    again: $('nmt-again'),
    choose: $('nmt-choose'),
    onlyWrong: $('nmt-only-wrong'),
    reviewList: $('nmt-review-list')
  };

  /* ------------------------------------------------------------------
     Сховище: усі звертання в try/catch, без сховища все працює далі
     ------------------------------------------------------------------ */
  const store = {
    read() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (error) {
        return {};
      }
    },
    write(value) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
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
  let total = 0;
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

  function optionText(entry, letter) {
    const found = entry.options.find((o) => o.letter === letter);
    return found ? found.text : '';
  }

  function prepareVariant(id) {
    variant = data.variants.find((v) => v.id === id) || null;
    tasks = [];
    byNumber = {};
    total = 0;
    if (!variant) return false;
    variant.parts.forEach((part) => {
      part.tasks.forEach((task) => {
        tasks.push({ part, task });
        task.questions.forEach((question) => {
          byNumber[question.number] = {
            task,
            question,
            options: question.options || task.options
          };
          total += 1;
        });
      });
    });
    return true;
  }

  function saveSession() {
    store.update((value) => { value.session = session; });
  }

  function answeredCount() {
    return Object.keys(session.answers).length;
  }

  function correctCount(onlyChecked) {
    return Object.keys(byNumber).reduce((sum, n) => {
      if (onlyChecked && !session.checked[n]) return sum;
      return sum + (session.answers[n] === byNumber[n].question.key ? 1 : 0);
    }, 0);
  }

  /* ------------------------------------------------------------------
     Екран вибору
     ------------------------------------------------------------------ */
  function renderSetup() {
    ui.variantList.innerHTML = '';
    data.variants.forEach((v, i) => {
      const label = el('label', 'nmt-choice');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'variant';
      input.value = v.id;
      if (i === 0) input.checked = true;
      const body = el('span', 'nmt-choice-body');
      body.appendChild(el('span', 'nmt-choice-title', v.title));
      const count = v.parts.reduce((s, p) => s + p.tasks.reduce((t, task) => t + task.questions.length, 0), 0);
      body.appendChild(el('span', 'nmt-choice-text', count + ' ' + plural(count, 'завдання', 'завдання', 'завдань') + (v.level ? ' · рівень ' + v.level : '')));
      label.appendChild(input);
      label.appendChild(body);
      ui.variantList.appendChild(label);
    });

    document.querySelectorAll('[data-nmt-duration]').forEach((n) => { n.textContent = data.meta.durationMinutes; });
    document.querySelectorAll('[data-nmt-threshold]').forEach((n) => { n.textContent = data.meta.thresholdScore; });

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
        ui.bestList.appendChild(el('li', null, v.title + ', ' + MODE_LABELS[mode] + ': ' + entry[mode] + ' з ' + data.meta.maxScore));
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
    const answered = Object.keys(saved.answers).length;
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
    focusHeading(document.getElementById('nmt-task-title'));
  }

  function renderTabs() {
    ui.tabs.innerHTML = '';
    tasks.forEach((entry, i) => {
      const li = el('li');
      const btn = el('button', 'nmt-tab');
      btn.type = 'button';
      const first = entry.task.questions[0].number;
      const last = entry.task.questions[entry.task.questions.length - 1].number;
      btn.appendChild(el('span', 'nmt-tab-label', entry.task.label || 'Task ' + (i + 1)));
      btn.appendChild(el('span', 'nmt-tab-range', first + '–' + last));
      btn.addEventListener('click', () => goTo(i));
      li.appendChild(btn);
      ui.tabs.appendChild(li);
    });
    updateTabs();
  }

  function updateTabs() {
    Array.prototype.forEach.call(ui.tabs.querySelectorAll('.nmt-tab'), (btn, i) => {
      const done = tasks[i].task.questions.every((q) => session.answers[q.number]);
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
    focusHeading(document.getElementById('nmt-task-title'));
  }

  function renderTask() {
    const { part, task } = tasks[session.taskIndex];
    const first = task.questions[0].number;
    const last = task.questions[task.questions.length - 1].number;
    ui.task.innerHTML = '';

    ui.task.appendChild(el('p', 'nmt-part', 'Частина «' + part.title + '» · ' + (part.titleEn || '')));
    const heading = el('h3', 'nmt-task-title', (task.label || '') + ' · завдання ' + first + '–' + last);
    heading.id = 'nmt-task-title';
    heading.tabIndex = -1;
    ui.task.appendChild(heading);
    const instruction = el('p', 'nmt-instruction', task.instruction);
    instruction.lang = 'en';
    ui.task.appendChild(instruction);

    if (task.passage) ui.task.appendChild(renderPassage(task));

    if (task.type === 'matching') {
      if (task.title) {
        const title = el('h4', 'nmt-set-title', task.title);
        title.lang = 'en';
        ui.task.appendChild(title);
      }
      ui.task.appendChild(renderOptionsBox(task));
    }
    if (task.type === 'gapped-text') ui.task.appendChild(renderOptionsBox(task));

    const list = el('ol', 'nmt-questions');
    task.questions.forEach((question) => list.appendChild(renderQuestion(task, question)));
    ui.task.appendChild(list);
  }

  function renderPassage(task) {
    const article = el('article', 'nmt-passage');
    article.lang = 'en';
    if (task.passage.title) article.appendChild(el('h4', 'nmt-passage-title', task.passage.title));
    task.passage.paragraphs.forEach((text) => {
      const p = el('p');
      text.split(/(\{\{\d+\}\})/).forEach((chunk) => {
        const m = chunk.match(/^\{\{(\d+)\}\}$/);
        if (!m) {
          if (chunk) p.appendChild(document.createTextNode(chunk));
          return;
        }
        const gap = el('span', 'nmt-gap');
        gap.dataset.gap = m[1];
        p.appendChild(gap);
      });
      article.appendChild(p);
    });
    updateGaps(article);
    return article;
  }

  function updateGaps(scope) {
    (scope || ui.task).querySelectorAll('.nmt-gap').forEach((gap) => {
      const n = gap.dataset.gap;
      const chosen = session.answers[n];
      gap.textContent = '';
      gap.appendChild(el('b', 'nmt-gap-num', '(' + n + ')'));
      if (chosen && byNumber[n]) {
        gap.appendChild(document.createTextNode(' ' + optionText(byNumber[n], chosen)));
        gap.classList.add('is-filled');
      } else {
        gap.appendChild(el('span', 'nmt-gap-line', '________'));
        gap.classList.remove('is-filled');
      }
    });
  }

  function renderOptionsBox(task) {
    const box = el('div', 'nmt-options-box');
    box.appendChild(el('p', 'nmt-options-title', 'Варіанти відповіді'));
    if (task.stem) {
      const stem = el('p', 'nmt-stem', task.stem.replace('___', '______'));
      stem.lang = 'en';
      box.appendChild(stem);
    }
    const list = el('ul', 'nmt-options-list');
    list.lang = 'en';
    task.options.forEach((o) => {
      const li = el('li');
      li.appendChild(el('b', 'nmt-options-letter', o.letter));
      li.appendChild(document.createTextNode(o.text));
      list.appendChild(li);
    });
    box.appendChild(list);
    return box;
  }

  function renderQuestion(task, question) {
    const n = question.number;
    const entry = byNumber[n];
    const item = el('li', 'nmt-q');
    item.id = 'nmt-q-' + n;

    if (question.text) {
      const card = el('div', 'nmt-text-card');
      card.lang = 'en';
      card.appendChild(el('span', 'nmt-text-num', String(n)));
      if (question.text.title) card.appendChild(el('p', 'nmt-text-title', question.text.title));
      question.text.body.forEach((line) => card.appendChild(el('p', 'nmt-text-line', line)));
      item.appendChild(card);
    }

    const fieldset = el('fieldset', 'nmt-q-fieldset');
    const legend = el('legend', 'nmt-q-legend');
    legend.appendChild(el('span', 'nmt-q-num', '№ ' + n));
    let legendText = '';
    if (question.prompt) legendText = question.prompt;
    else if (task.type === 'matching') legendText = task.stem || '';
    else legendText = 'Пропуск (' + n + ')';
    const legendBody = el('span', 'nmt-q-prompt', legendText.replace('___', '______'));
    if (question.prompt || task.type === 'matching') legendBody.lang = 'en';
    legend.appendChild(legendBody);
    fieldset.appendChild(legend);

    const letterOnly = task.type === 'matching' || task.type === 'gapped-text';
    const group = el('div', letterOnly ? 'nmt-letters' : 'nmt-opts');
    entry.options.forEach((o) => {
      const label = el('label', letterOnly ? 'nmt-letter' : 'nmt-opt');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'nmt-q-' + n;
      input.value = o.letter;
      input.className = 'nmt-radio';
      if (session.answers[n] === o.letter) input.checked = true;
      input.addEventListener('change', () => onAnswer(n, o.letter, item));
      label.appendChild(input);
      label.appendChild(el('span', 'quiz-letter', o.letter));
      const text = el('span', letterOnly ? 'visually-hidden' : 'nmt-opt-text', letterOnly ? ' — ' + o.text : o.text);
      text.lang = 'en';
      label.appendChild(text);
      if (letterOnly) label.title = o.text;
      group.appendChild(label);
    });
    fieldset.appendChild(group);
    item.appendChild(fieldset);

    if (session.mode === 'practice') {
      const actions = el('div', 'nmt-q-actions');
      const check = el('button', 'btn btn--secondary btn--sm nmt-check-btn', 'Перевірити');
      check.type = 'button';
      check.disabled = !session.answers[n];
      check.addEventListener('click', () => checkAnswer(n, item, true));
      actions.appendChild(check);
      item.appendChild(actions);
      const feedback = el('div', 'nmt-feedback');
      feedback.tabIndex = -1;
      feedback.hidden = true;
      item.appendChild(feedback);
      if (session.checked[n]) checkAnswer(n, item, false);
    }
    return item;
  }

  function onAnswer(n, letter, item) {
    if (session.checked[n]) return;
    session.answers[n] = letter;
    saveSession();
    updateGaps();
    updateCounter();
    updateTabs();
    const check = item.querySelector('.nmt-check-btn');
    if (check) check.disabled = false;
  }

  function checkAnswer(n, item, announce) {
    const entry = byNumber[n];
    const chosen = session.answers[n];
    if (!chosen) return;
    const isRight = chosen === entry.question.key;
    if (announce) {
      session.checked[n] = true;
      saveSession();
      updateCounter();
    }

    item.classList.add('is-checked');
    item.querySelectorAll('.nmt-radio').forEach((input) => {
      input.disabled = true;
      const label = input.parentNode;
      label.classList.toggle('is-correct', input.value === entry.question.key);
      label.classList.toggle('is-wrong', input.value === chosen && !isRight);
    });
    const actions = item.querySelector('.nmt-q-actions');
    if (actions) actions.hidden = true;

    const feedback = item.querySelector('.nmt-feedback');
    feedback.innerHTML = '';
    const verdict = el('p', 'quiz-verdict ' + (isRight ? 'quiz-verdict--right' : 'quiz-verdict--wrong'),
      isRight ? 'Правильно! ' : 'Неправильно. ');
    verdict.appendChild(document.createTextNode('Правильна відповідь: '));
    const answer = el('b', null, entry.question.key + ' — ' + optionText(entry, entry.question.key));
    answer.lang = 'en';
    verdict.appendChild(answer);
    feedback.appendChild(verdict);
    feedback.appendChild(el('p', 'quiz-note', entry.question.explanation));
    feedback.hidden = false;
    // Кнопка «Перевірити» зникає, тож переводимо фокус на пояснення, щоб він не загубився.
    if (announce) feedback.focus({ preventScroll: false });
  }

  function updateCounter() {
    const answered = answeredCount();
    let text = 'Відповіли: ' + answered + ' з ' + total;
    if (session.mode === 'practice') text += ' · правильно: ' + correctCount(true);
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
      const unchecked = total - Object.keys(session.checked).length;
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
    const score = correctCount(false);
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
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'nmt_trainer_complete', { variant_id: finished.variantId, mode: finished.mode });
      }
    } catch (error) { /* аналітика необов'язкова */ }

    renderResult(score, timeUp);
  }

  function renderResult(score, timeUp) {
    const max = total;
    ui.resultScore.textContent = score + ' з ' + max;
    const best = (store.read().best || {})[session.variantId];
    const bestScore = best && typeof best[session.mode] === 'number' ? best[session.mode] : null;

    let comment = '';
    if (timeUp) comment += 'Час вичерпано, тож зараховано відповіді, дані до цього моменту. ';
    const share = score / max;
    if (share === 1) comment += 'Жодної помилки — чудово.';
    else if (share >= 0.75) comment += 'Сильний результат. Перегляньте розбір: помилки, яких лишилося небагато, зазвичай мають спільну причину.';
    else if (share >= 0.5) comment += 'Добра основа. Подивіться, у якій частині більше помилок — у читанні чи у використанні мови: з неї й варто почати.';
    else comment += 'Є над чим попрацювати. Розбір нижче пояснює кожну пастку, а повторна спроба через кілька днів покаже, що вже засвоєно.';
    if (bestScore != null && bestScore > score) comment += ' Ваш найкращий результат у цьому режимі — ' + bestScore + ' з ' + max + '.';
    ui.resultComment.textContent = comment;

    renderReview();
    ui.onlyWrong.checked = false;
    ui.reviewList.classList.remove('is-only-wrong');
    show(ui.result);
    focusHeading(ui.resultTitle);
  }

  function renderReview() {
    ui.reviewList.innerHTML = '';
    tasks.forEach(({ part, task }) => {
      const block = el('section', 'nmt-review-task');
      const first = task.questions[0].number;
      const last = task.questions[task.questions.length - 1].number;
      block.appendChild(el('h4', 'nmt-review-task-title', (task.label || '') + ' · завдання ' + first + '–' + last + ' · ' + part.title));
      const list = el('ol', 'nmt-review-items');
      task.questions.forEach((question) => {
        const entry = byNumber[question.number];
        const chosen = session.answers[question.number];
        const isRight = chosen === question.key;
        const li = el('li', 'nmt-review-item ' + (isRight ? 'is-right' : 'is-wrong'));

        const head = el('p', 'nmt-review-head-line');
        head.appendChild(el('span', 'nmt-review-num', '№ ' + question.number));
        head.appendChild(el('span', 'nmt-review-status ' + (isRight ? 'quiz-verdict--right' : 'quiz-verdict--wrong'),
          isRight ? 'правильно' : chosen ? 'помилка' : 'без відповіді'));
        li.appendChild(head);

        const context = question.prompt || (question.text && question.text.title);
        if (context) {
          const ctx = el('p', 'nmt-review-context', context.replace('___', '______'));
          ctx.lang = 'en';
          li.appendChild(ctx);
        }

        const answers = el('p', 'nmt-review-answers');
        answers.appendChild(document.createTextNode('Ваша відповідь: '));
        if (chosen) {
          const mine = el('b', null, chosen + ' — ' + optionText(entry, chosen));
          mine.lang = 'en';
          answers.appendChild(mine);
        } else {
          answers.appendChild(el('b', null, 'немає'));
        }
        if (!isRight) {
          answers.appendChild(document.createTextNode(' · правильна: '));
          const right = el('b', null, question.key + ' — ' + optionText(entry, question.key));
          right.lang = 'en';
          answers.appendChild(right);
        }
        li.appendChild(answers);
        li.appendChild(el('p', 'nmt-review-expl', question.explanation));
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
  fetch(DATA_URL)
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

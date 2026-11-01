/*
 * Monthly review quiz for @enfol — shared engine.
 * The page sets on #quiz-list:
 *   data-src — JSON with id, results[] and questions[] (see data/quiz/);
 *   data-quiz-id — optional, overrides the id sent to Google Analytics.
 * Events: quiz_start (first answer of an attempt) and quiz_complete (score, total).
 */
(function () {
  'use strict';

  var LETTERS = ['A', 'B', 'C', 'D'];
  var list = document.getElementById('quiz-list');
  var liveScore = document.getElementById('quiz-score-live');
  var bar = document.getElementById('quiz-progress-bar');
  var result = document.getElementById('quiz-result');
  var resultScore = document.getElementById('quiz-result-score');
  var resultComment = document.getElementById('quiz-result-comment');
  var restart = document.getElementById('quiz-restart');
  if (!list || !list.dataset.src) return;

  var QUESTIONS = [];
  var RESULTS = [];
  var quizId = list.dataset.quizId || '';
  var answered = 0;
  var score = 0;

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function render() {
    list.innerHTML = '';
    answered = 0;
    score = 0;
    QUESTIONS.forEach(function (q, qi) {
      var item = el('li', 'quiz-item');
      item.id = 'q' + (qi + 1);

      var meta = el('p', 'quiz-meta');
      meta.appendChild(el('span', 'quiz-num', 'Question ' + (qi + 1) + ' of ' + QUESTIONS.length));
      meta.appendChild(el('span', 'quiz-level quiz-level--' + q.level.charAt(0).toLowerCase() + q.level.charAt(1), q.level));
      meta.appendChild(el('span', 'quiz-topic', q.topic));
      item.appendChild(meta);

      var promptId = 'q' + (qi + 1) + '-prompt';
      var prompt = el('p', 'quiz-prompt', q.prompt.replace('___', '<span class="quiz-gap">_____</span>'));
      prompt.id = promptId;
      item.appendChild(prompt);

      var group = el('div', 'quiz-options');
      group.setAttribute('role', 'group');
      group.setAttribute('aria-labelledby', promptId);
      q.options.forEach(function (opt, oi) {
        var btn = el('button', 'quiz-option');
        btn.type = 'button';
        btn.dataset.index = String(oi);
        btn.appendChild(el('span', 'quiz-letter', LETTERS[oi]));
        btn.appendChild(el('span', 'quiz-option-text', opt));
        btn.addEventListener('click', function () { choose(item, q, oi); });
        group.appendChild(btn);
      });
      item.appendChild(group);

      var feedback = el('div', 'quiz-feedback');
      feedback.hidden = true;
      feedback.setAttribute('aria-live', 'polite');
      item.appendChild(feedback);

      list.appendChild(item);
    });
    update();
    result.hidden = true;
  }

  function track(name, params) {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
    } catch (err) { /* analytics is optional */ }
  }

  function choose(item, q, chosen) {
    if (item.classList.contains('is-answered')) return;
    item.classList.add('is-answered');
    var isRight = chosen === q.correct;
    if (answered === 0) track('quiz_start', { quiz_id: quizId });
    answered += 1;
    if (isRight) score += 1;

    var buttons = item.querySelectorAll('.quiz-option');
    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('is-correct');
      if (i === chosen && !isRight) btn.classList.add('is-wrong');
      if (i === chosen) btn.setAttribute('aria-pressed', 'true');
    });

    var fb = item.querySelector('.quiz-feedback');
    var html = '';
    html += '<p class="quiz-verdict ' + (isRight ? 'quiz-verdict--right' : 'quiz-verdict--wrong') + '">' +
      (isRight ? 'Correct!' : 'Not quite.') +
      ' The correct answer is <b>' + LETTERS[q.correct] + ') ' + q.options[q.correct].replace(/[.!?]$/, '') + '</b>.</p>';
    html += '<p class="quiz-note">' + q.note + '</p>';
    html += '<p class="quiz-why-title">Why the other options are wrong</p><ul class="quiz-why">';
    q.why.forEach(function (text, i) {
      if (text == null) return;
      var mine = i === chosen ? ' is-chosen' : '';
      html += '<li class="quiz-why-item' + mine + '"><span class="quiz-why-label">' + LETTERS[i] + ') ' + q.options[i] +
        (i === chosen ? ' <em>— your answer</em>' : '') + '</span>' + text + '</li>';
    });
    html += '</ul>';
    fb.innerHTML = html;
    fb.hidden = false;

    update();
    if (answered === QUESTIONS.length) showResult();
  }

  function update() {
    liveScore.textContent = 'Answered: ' + answered + ' of ' + QUESTIONS.length + ' · Score: ' + score;
    bar.style.width = (answered / QUESTIONS.length * 100) + '%';
  }

  function showResult() {
    resultScore.textContent = score + ' / ' + QUESTIONS.length;
    var c = '';
    for (var i = 0; i < RESULTS.length; i += 1) {
      if (score >= RESULTS[i].min) { c = RESULTS[i].text; break; }
    }
    resultComment.textContent = c;
    result.hidden = false;
    track('quiz_complete', { quiz_id: quizId, score: score, total: QUESTIONS.length });
    setTimeout(function () {
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      result.focus({ preventScroll: true });
    }, 600);
  }

  restart.addEventListener('click', function () {
    render();
    var top = document.getElementById('quiz-title');
    if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  fetch(list.dataset.src)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      QUESTIONS = data.questions || [];
      RESULTS = (data.results || []).slice().sort(function (a, b) { return b.min - a.min; });
      if (!quizId) quizId = data.id || '';
      render();
    })
    .catch(function () {
      liveScore.textContent = 'The questions could not be loaded. Please refresh the page.';
    });
})();

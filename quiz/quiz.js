/* Monthly review quiz — @enfol, September 2026 */
(function () {
  'use strict';

  var QUESTIONS = [
    {
      level: 'B1',
      topic: 'Cooking verbs',
      prompt: 'For a perfect winter soup, put the onions and tomatoes in water and let them ___ for an hour.',
      options: ['sprinkle', 'simmer', 'blend', 'spread'],
      correct: 1,
      note: '<b>Simmer</b> means to cook a liquid slowly, just below boiling — exactly what a soup does for an hour.',
      why: [
        '<b>Sprinkle</b> means to drop small pieces of something (salt, herbs) over a surface. You sprinkle herbs <i>on top</i> at the end; you can’t leave vegetables to “sprinkle” for an hour.',
        null,
        '<b>Blend</b> means to mix things until they are smooth. It takes a minute in a blender and comes <i>after</i> the cooking, not instead of it.',
        '<b>Spread</b> means to cover a surface with a soft substance, like butter on bread. It has nothing to do with cooking in water.'
      ]
    },
    {
      level: 'B1',
      topic: 'Casual comparisons',
      prompt: 'Let’s eat at home tonight — it’s ___ cheaper than going to a restaurant.',
      options: ['very', 'miles', 'much more', 'many'],
      correct: 1,
      note: '<b>Miles</b> + comparative is a casual way to say “much”: <i>miles cheaper, miles better</i>. In formal writing, use <i>much</i> or <i>significantly</i>.',
      why: [
        '<b>Very</b> goes with ordinary adjectives (<i>very cheap</i>), but never with comparatives. <i>Very cheaper</i> is incorrect.',
        null,
        '<b>Much more cheaper</b> is a double comparative: <i>cheaper</i> already contains the idea of “more”. Say <i>much cheaper</i>.',
        '<b>Many</b> goes with plural nouns (<i>many restaurants</i>), not with adjectives.'
      ]
    },
    {
      level: 'B1+',
      topic: 'Phrasal verbs: word order',
      prompt: 'Someone made a rude comment about my shirt, but I just ___ and forgot about it in five seconds.',
      options: ['shrugged off it', 'shrugged it off', 'shrugged it out', 'shrugged it down'],
      correct: 1,
      note: '<b>Shrug something off</b> = treat it as unimportant and not let it worry you. With a pronoun, the object goes in the middle: <i>shrug it off</i>.',
      why: [
        'The verb is right, but the word order is wrong. With a pronoun (<i>it, them, him</i>), a separable phrasal verb must be split: <i>shrug it off</i>, never <i>shrug off it</i>.',
        null,
        '<b>Shrug out</b> is not a phrasal verb with this meaning. The particle that means “getting rid of something” here is <i>off</i>.',
        '<b>Shrug down</b> does not exist in English. The correct particle is <i>off</i>.'
      ]
    },
    {
      level: 'B1+',
      topic: 'Money and quality',
      prompt: 'The organisers ___ the food, so everyone at the party stayed hungry.',
      options: ['splashed out on', 'skimped on', 'skimmed through', 'skimped with'],
      correct: 1,
      note: '<b>Skimp on</b> something = use too little of it to save money, so the quality suffers.',
      why: [
        '<b>Splash out on</b> means to spend a lot of money on something generously — the opposite situation. If they had splashed out on the food, nobody would be hungry.',
        null,
        '<b>Skim through</b> means to read something quickly (<i>skim through a report</i>). It looks similar but is about reading, not saving money.',
        'Right verb, wrong preposition. <i>Skimp</i> combines with <b>on</b>: <i>skimp on food, skimp on quality</i>.'
      ]
    },
    {
      level: 'B2',
      topic: 'Idioms: accepting a setback',
      prompt: 'Heavy rain ruined the outdoor festival, but the team didn’t complain. They ___ and kept working.',
      options: ['knocked it out of the park', 'held the line', 'took it on the chin', 'broke the buck'],
      correct: 2,
      note: '<b>Take it on the chin</b> = accept a failure or a bad situation bravely, without complaining.',
      why: [
        '<b>Knock it out of the park</b> means to do something extremely well, better than expected. Here the festival was ruined — it is a story about bad luck, not success.',
        '<b>Hold the line</b> means to stay firm when people push you to change something (<i>hold the line on prices</i>). Nobody is pressuring the team here; the point is accepting misfortune bravely.',
        null,
        '<b>Break the buck</b> is a finance term: a money market fund “breaks the buck” when its value falls below one dollar. It has nothing to do with festivals.'
      ]
    },
    {
      level: 'B2',
      topic: 'Legal English',
      prompt: 'The concert was cancelled because of a hurricane. Under the contract, nobody pays a penalty, because a hurricane counts as an ___.',
      options: ['act of faith', 'act of war', 'godsend', 'act of God'],
      correct: 3,
      note: '<b>Act of God</b> is a legal term for a natural event (a flood, earthquake or hurricane) that no person can control or prevent.',
      why: [
        'An <b>act of faith</b> is an action that shows trust or belief, e.g. lending money to a stranger. It is not a natural disaster.',
        '<b>Act of war</b> is a real legal term too, but it describes a hostile action by a country or army — a human decision, not the weather.',
        'A <b>godsend</b> is something unexpected and <i>very welcome</i>. A hurricane that cancels a concert is the opposite.',
        null
      ]
    },
    {
      level: 'B2+',
      topic: 'Inversion after nor',
      prompt: 'I don’t have Martin’s phone number. ___ anyone else in the office.',
      options: ['Nor does', 'Nor doesn’t', 'Neither', 'Also doesn’t'],
      correct: 0,
      note: '<b>Nor</b> + helping verb + subject = “and also not”: <i>Nor does anyone else.</i> The helping verb comes first, and there is no <i>not</i>.',
      why: [
        null,
        '<b>Nor</b> is already negative. Adding <i>doesn’t</i> creates a double negative. Say <i>Nor does…</i>',
        '<b>Neither</b> can start this kind of sentence, but it also needs a helping verb before the subject: <i>Neither does anyone else.</i> Without <i>does</i>, the sentence has no verb.',
        '<b>Also</b> is not used to add a negative idea. Use <i>nor/neither</i> at the start, or <i>either</i> at the end: <i>Nobody else has it either.</i>'
      ]
    },
    {
      level: 'B2+',
      topic: 'Verb–noun collocations',
      prompt: 'She ___ her listening skills by watching one episode a day without subtitles.',
      options: ['homes', 'sharps', 'whets', 'hones'],
      correct: 3,
      note: '<b>Hone</b> /həʊn/ = make a skill better and better through practice. It was once the name of a stone used to sharpen knives: <i>hone your skills, hone your craft</i>.',
      why: [
        '<b>Home</b> (as in <i>home in on</i>) means to move or aim directly towards a target. It looks and sounds similar, but it needs <i>in on</i> and has a different meaning.',
        '<b>Sharp</b> is an adjective, not a verb. The verb is <i>sharpen</i> — and <i>sharpens her listening skills</i> would be correct.',
        '<b>Whet</b> also means “to sharpen a blade”, but figuratively it collocates with <i>appetite</i> or <i>interest</i> (<i>whet your appetite</i>), not with skills.',
        null
      ]
    },
    {
      level: 'C1',
      topic: 'Inversion after negative adverbs',
      prompt: '___ before ten in the morning.',
      options: ['Seldom he answers the phone', 'Seldom does he answers the phone', 'Seldom does he answer the phone', 'Seldom answers he the phone'],
      correct: 2,
      note: 'After <b>seldom / rarely / never</b> at the start of a sentence, use question word order: helping verb + subject. With no helping verb, add <i>do/does/did</i> and keep the main verb in its base form.',
      why: [
        'This is normal statement word order. When <i>seldom</i> opens the sentence, inversion is required: <i>Seldom does he…</i> (Normal order is fine only if <i>seldom</i> moves inside: <i>He seldom answers…</i>)',
        'The inversion is correct, but after <i>does</i> the main verb must be in the base form: <i>does he answer</i>, not <i>does he answers</i>.',
        null,
        'In modern English only helping verbs move in front of the subject. Main verbs like <i>answer</i> do not invert — use <i>do/does/did</i>.'
      ]
    },
    {
      level: 'C1',
      topic: 'Easily confused words',
      prompt: 'I could hear only one speaker because the three talks were ___ — they all started at 2 p.m. in different rooms.',
      options: ['consecutive', 'subsequent', 'concurrent', 'successive'],
      correct: 2,
      note: '<b>Concurrent</b> = happening at the same time. Concurrent sessions run in parallel, so you have to choose one.',
      why: [
        '<b>Consecutive</b> means one after another, without a break. If the talks were consecutive, you could attend all three.',
        '<b>Subsequent</b> means “coming after something else” (<i>subsequent events</i>). It describes order in time, not things happening together.',
        null,
        '<b>Successive</b> is a near synonym of <i>consecutive</i>: following one after another. It contradicts “they all started at 2 p.m.”'
      ]
    },
    {
      level: 'C2',
      topic: 'Word history and register',
      prompt: 'Charging ten dollars for a small bottle of water is an ___ example of overpricing.',
      options: ['gregarious', 'egregious', 'exemplary', 'egalitarian'],
      correct: 1,
      note: '<b>Egregious</b> /ɪˈɡriːdʒəs/ = very bad and easy for everyone to see. From Latin <i>ex grege</i> “out of the flock”: once a compliment, now it means standing out for being terrible. Typical collocations: <i>egregious mistake, error, example</i>.',
      why: [
        '<b>Gregarious</b> shares the same Latin root (<i>grex</i>, “flock”), but it means sociable, fond of company. It describes people, not prices.',
        null,
        '<b>Exemplary</b> means excellent, a model for others — strongly positive. Ironically, that is close to what <i>egregious</i> meant centuries ago, but not today.',
        '<b>Egalitarian</b> means believing that all people are equal. It looks similar at the start, but the meaning is unrelated.'
      ]
    },
    {
      level: 'C2',
      topic: 'Financial slang',
      prompt: 'Investors panicked when a “safe” money market fund broke the buck. What does that mean?',
      options: [
        'The fund lost money on a single million-dollar trade.',
        'The fund offered less bang for the buck than its competitors.',
        'The fund stopped paying investors in cash.',
        'The value of one share of the fund fell below one dollar.'
      ],
      correct: 3,
      note: 'A money market fund aims to keep each share worth exactly $1. <b>Breaking the buck</b> means the value drops below that dollar — a rare and alarming event.',
      why: [
        'Traders do use <i>a buck</i> for one million dollars, but <b>break the buck</b> is a fixed phrase about a share value going under $1, not about one trade.',
        '<b>Bang for the buck</b> means value for money. A fund with poor value would simply be a bad choice; investors would not panic about a collapse.',
        'The phrase is not about how payments are made. It refers to the price of a share falling below the one-dollar mark.',
        null
      ]
    }
  ];

  var LETTERS = ['A', 'B', 'C', 'D'];
  var list = document.getElementById('quiz-list');
  var liveScore = document.getElementById('quiz-score-live');
  var bar = document.getElementById('quiz-progress-bar');
  var result = document.getElementById('quiz-result');
  var resultScore = document.getElementById('quiz-result-score');
  var resultComment = document.getElementById('quiz-result-comment');
  var restart = document.getElementById('quiz-restart');
  if (!list) return;

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

  function choose(item, q, chosen) {
    if (item.classList.contains('is-answered')) return;
    item.classList.add('is-answered');
    var isRight = chosen === q.correct;
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
      ' The correct answer is <b>' + LETTERS[q.correct] + ') ' + q.options[q.correct] + '</b>.</p>';
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
    var c;
    if (score === 12) c = 'Flawless — you knocked it out of the park! The C2 questions held no secrets for you.';
    else if (score >= 10) c = 'Excellent work. You are clearly honing your English — check the explanations for the one or two that slipped.';
    else if (score >= 7) c = 'A solid result. The upper-level items (inversion, confusable words) are worth another look.';
    else if (score >= 4) c = 'A fair start. Take it on the chin, reread the explanations and try again — the second attempt is usually much better.';
    else c = 'This month’s set was a challenge. Go back through the September posts on @enfol and give the quiz another go.';
    resultComment.textContent = c;
    result.hidden = false;
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

  render();
})();

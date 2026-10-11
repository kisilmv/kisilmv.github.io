/* =========================================================================
   Unit 3 · Continuous Delivery: Shipping Code Without Fear
   ESP · Комп'ютерні науки, 2 курс · B1+/B2
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Послідовність: Lead-in · Лексика A · Пасив (3.1) · Лексика B · by/with ·
   Лексика C, D · Сполучники часу (3.2) · Мета й запобігання (3.3) · 3.4 ·
   Пастки + 3.5 · Reading (3.6, 3.7) · Keyword drill (3.8) · Listening +
   Speaking A (retell) · Dialogues (3.9) + Speaking B (persuade) ·
   Release plan (3.11, explain). «Say it in English» (3.10) — після правил.
   Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const ID = 'esp-kn-unit3';
  const K = (s) => '<span class="muted">' + s + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  const blankN = (n) => '<span class="blank">' + n + '</span>';
  // Розмовний приклад: спершу українське речення (💬), наступним кроком — англійське
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  // Фото вмикаються, щойно файл додано до списку HAVE
  const HAVE = ['lead.jpg', 'trading.jpg', 'canary.jpg', 'lockout.jpg', 'standup.jpg', 'checkout.jpg'];
  const PH = (f, alt, pos, h) => HAVE.includes(f) ? '<img src="lessons/' + ID + '/' + f + '" alt="' + alt + '" style="display:block;width:100%;height:' + (h || 140) + 'px;object-fit:cover;object-position:' + (pos || '50% 50%') + ';border-radius:16px;margin-bottom:12px">' : '';
  const S = [];
  const add = (o) => S.push(o);

  // «Say it in English»: українське технічне речення → еталон → 💬 розмовне → еталон
  const SAY = (n, uk, en, evEn, evUk) => add({ id: 'say' + n, type: 'content', reveal: true,
    kicker: 'Say it in English · ' + n + '/14', title: uk,
    items: ['<b>' + en + '</b>', ...EV(evEn, evUk)] });
  // «Знайди помилку»: торкнутися хибної частини
  const FM = (id, n, sentence, parts, ex) => add({ id, type: 'mcq', kicker: '3.4 · Find the mistake · ' + n + '/8',
    prompt: (ex ? K('<b>Example:</b> The app <s>updated</s> every week. → The app <b>is updated</b> every week.') + '<br><br>' : '') +
      sentence + '<br><span class="muted">Tap the wrong part.</span>', options: parts });

  add({ id: 'title', type: 'title',
    kicker: 'Unit 3 · English for Computer Science',
    title: 'Continuous Delivery',
    subtitle: 'Shipping code without fear' });

  /* ---------- Lead-in ---------- */
  add({ id: 'l1', type: 'open', kicker: 'Lead-in · 1/4',
    prompt: PH('lead.jpg', 'A person with a coffee looking at a freshly redesigned website on a laptop', '50% 45%', 110) +
      'A website you use every day changes its design <b>overnight</b>, and nothing breaks.<br><b>What had to happen behind the scenes?</b> Name two or three steps.',
    placeholder: 'First, someone… Then…' });
  add({ id: 'l2', type: 'open', kicker: 'Lead-in · 2/4',
    prompt: 'A developer’s change passed <b>all the tests</b>, but it broke the site for <b>real users</b>.<br><b>Name three reasons</b> why that could happen.',
    placeholder: '1) The test data… 2) … 3) …' });
  add({ id: 'l3', type: 'mcq', kicker: 'Lead-in · 3/4',
    prompt: 'A new feature is ready. You are the team lead.<br><b>Who gets it first?</b>',
    options: ['all users at once', 'a small group of users first'] });
  add({ id: 'l4', type: 'open', kicker: 'Lead-in · 4/4',
    prompt: 'Look at your choice. What do you <b>gain</b>, and what do you <b>lose</b>?<br>' + K('One thing you gain, one thing you lose.'),
    placeholder: 'I gain… but I lose…' });

  /* ---------- Vocabulary A ---------- */
  add({ id: 'v0', type: 'end', kicker: 'Vocabulary',
    title: 'From a laptop to a million users',
    text: 'The words engineers use for every step' });
  add({ id: 'vA1', type: 'content', kicker: 'Vocabulary · A · 1/2', title: 'A. The delivery pipeline', items: [
    term('continuous integration (CI)', '/kənˈtɪnjuəs ˌɪntɪˈɡreɪʃn/', 'безперервна інтеграція'),
    term('continuous delivery (CD)', '/kənˈtɪnjuəs dɪˈlɪvəri/', 'безперервна доставка'),
    term('pipeline', '/ˈpaɪplaɪn/', 'конвеєр (CI/CD)'),
    term('build', '/bɪld/', 'збірка')] });
  add({ id: 'vA2', type: 'content', kicker: 'Vocabulary · A · 2/2', title: 'A. The delivery pipeline', items: [
    term('pull request', '/ˈpʊl rɪˌkwest/', 'запит на злиття'),
    term('to merge', '/mɝːdʒ/', 'зливати (гілки, зміни)'),
    term('main branch', '/ˌmeɪn ˈbræntʃ/', 'головна гілка'),
    term('test suite', '/ˈtest swiːt/', 'набір тестів')] });

  const BOX = (x, y, w, t1, t2, hi) =>
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="54" rx="10" style="fill:var(--' + (hi ? 'accent-soft' : 'surface-2') + ');stroke:var(--' + (hi ? 'accent' : 'line') + ');stroke-width:2"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 24) + '" text-anchor="middle" style="fill:var(--ink);font:700 14px system-ui,sans-serif">' + t1 + '</text>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 43) + '" text-anchor="middle" style="fill:var(--ink-2);font:13px system-ui,sans-serif">' + t2 + '</text>';
  const ARR = (x1, y1, x2, y2) => '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" style="stroke:var(--ink-2);stroke-width:2"/>' +
    '<path d="M' + (x2 - 6) + ' ' + (y2 - 5) + ' L' + x2 + ' ' + y2 + ' L' + (x2 - 6) + ' ' + (y2 + 5) + '" style="fill:none;stroke:var(--ink-2);stroke-width:2"/>';
  const PIPE =
    '<svg viewBox="0 0 320 170" width="100%" role="img" aria-label="The pipeline: pull request, main branch, CI server, staging, canary, production" style="display:block;max-width:440px">' +
    BOX(2, 6, 96, 'Pull request', 'review') + ARR(100, 33, 110, 33) +
    BOX(112, 6, 96, 'Main branch', 'merge') + ARR(210, 33, 220, 33) +
    BOX(222, 6, 96, 'CI server', 'build + tests') +
    '<path d="M270 62 C 270 84, 50 78, 50 100" style="fill:none;stroke:var(--ink-2);stroke-width:2;stroke-dasharray:5 4"/>' +
    '<path d="M45 94 L50 101 L55 94" style="fill:none;stroke:var(--ink-2);stroke-width:2"/>' +
    BOX(2, 104, 96, 'Staging', 'realistic data') + ARR(100, 131, 110, 131) +
    BOX(112, 104, 96, 'Canary', '1% of users', true) + ARR(210, 131, 220, 131) +
    BOX(222, 104, 96, 'Production', 'everyone') +
    '</svg>';
  add({ id: 'vA3', type: 'content', reveal: true, kicker: 'Vocabulary · A · The big picture', title: 'One change, six steps', items: [
    PIPE,
    K('Step by step: each change is checked before more people see it.')] });
  add({ id: 'mA', type: 'match', kicker: 'A · Quick check · Match',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['pull request', 'test suite', 'main branch', 'to merge'],
    right: ['all the automated tests', 'request to add changes', 'a test server', 'the shared code line', 'to join changes together', 'a paused release'] });
  add({ id: 'qA1', type: 'mcq', kicker: 'A · Quick check · 2/3',
    prompt: 'A server automatically <b>builds and tests</b> every change, many times a day.<br><b>This is …</b>',
    options: ['a pull request', 'a test suite', 'continuous integration', 'the main branch'] });
  add({ id: 'qA2', type: 'mcq', kicker: 'A · Quick check · 3/3',
    prompt: 'Every change that passes all the checks is <b>ready to go to users</b> at any moment.<br><b>This is …</b>',
    options: ['a build', 'continuous delivery', 'a pipeline', 'a merge'] });

  /* ---------- Grammar · Passive ---------- */
  add({ id: 'g0', type: 'end', kicker: 'Grammar',
    title: 'Describing a process',
    text: 'Steps, order and purpose' });
  add({ id: 'g1a', type: 'content', reveal: true, kicker: 'Grammar · The passive · 1/3',
    title: 'What is done, not who does it',
    items: [
      '<b>be</b> + past participle (V3)<br>' + K('The tense is in <b>be</b>: is merged · was merged · has been merged'),
      'Each change <b>is reviewed</b> by another developer.',
      '✅ The code <b>is reviewed</b>.<br>❌ The code <b>reviewed</b>. ' + K('= the code reviewed something!')
    ] });
  add({ id: 'g1a2', type: 'content', reveal: true, kicker: 'Grammar · The passive · 2/3',
    title: 'Rules and options',
    items: [
      'modal + <b>be</b> + V3<br><b>must be tested</b> · <b>can be changed</b>',
      'The database <b>must be tested</b> on a copy first.',
      'The release <b>can be stopped</b> at any moment.'
    ] });
  add({ id: 'g1b', type: 'content', reveal: true, kicker: 'Grammar · The passive · 3/3',
    title: 'Now say it: everyday English',
    items: [
      ...EV('My phone <b>was stolen</b> on the metro.', 'У мене в метро вкрали телефон.'),
      ...EV('The form <b>must be signed</b> by Friday.', 'Бланк треба підписати до п’ятниці.')
    ] });
  const PV = 'Put the verb into the correct <b>passive</b> form.';
  add({ id: 'e31_1', type: 'gap', kicker: '3.1 · 1/8',
    instruction: K('Example: The app ___ (update) every week. → <b>is updated</b>') + '<br>' + PV,
    prompt: 'Every pull request ___ (review) by at least one other developer.', placeholder: 'two words' });
  add({ id: 'e31_2', type: 'gap', kicker: '3.1 · 2/8', instruction: PV,
    prompt: 'In 2012, about 460 million dollars ___ (lose) by Knight Capital in roughly forty-five minutes.', placeholder: 'two words' });
  add({ id: 'e31_5', type: 'gap', kicker: '3.1 · 3/8', instruction: PV,
    prompt: 'The first website ___ (publish) by Tim Berners-Lee at CERN in 1991.', placeholder: 'two words' });
  SAY(1, 'Кожен запит на злиття перевіряє щонайменше ще один розробник.',
    'Every pull request is reviewed by at least one other developer.',
    'This song <b>was written by</b> my favorite band.', 'Цю пісню написав мій улюблений гурт.');
  add({ id: 'e31_7', type: 'gap', kicker: '3.1 · 4/8', instruction: PV,
    prompt: 'The name JavaScript ___ (choose) in 1995, although the language has little in common with Java.', placeholder: 'two words' });

  /* ---------- Vocabulary B ---------- */
  add({ id: 'vB1', type: 'content', kicker: 'Vocabulary · B · 1/3', title: 'B. Environments and releases', items: [
    term('staging environment', '/ˈsteɪdʒɪŋ ɪnˌvaɪrənmənt/', 'проміжне (передпродакшн) середовище'),
    term('production', '/prəˈdʌkʃn/', 'робоче середовище, продакшн'),
    term('to deploy', '/dɪˈplɔɪ/', 'розгортати'),
    term('to go live', '/ˌɡoʊ ˈlaɪv/', 'запускатися в роботу')] });
  add({ id: 'vBc', type: 'content', reveal: true, kicker: 'Vocabulary · B · 2/3', title: 'Why a “canary”?', items: [
    PH('canary.jpg', 'A coal miner in a tunnel holding a small cage with a yellow canary', '50% 40%', 130) +
      SM('Miners once took <b>canaries</b> underground. If the bird got sick, there was poisonous gas.'),
    term('canary release', '/kəˈneri rɪˌliːs/', 'канарковий випуск: нова версія спершу для ~1% трафіку')] });
  add({ id: 'vB2', type: 'content', kicker: 'Vocabulary · B · 3/3', title: 'B. Environments and releases', items: [
    term('blue-green deployment', '/ˌbluː ˈɡriːn dɪˈplɔɪmənt/', 'синьо-зелене розгортання ' + K('(two copies of production; switch users from one to the other)')),
    term('feature flag', '/ˈfiːtʃər flæɡ/', 'прапорець функції'),
    term('configuration', '/kənˌfɪɡjəˈreɪʃn/', 'конфігурація, налаштування')] });
  add({ id: 'qB1', type: 'mcq', kicker: 'B · Quick check · 1/3',
    prompt: 'At 9 a.m. the new version starts working <b>for real users</b>.<br><b>At 9 a.m. it …</b>',
    options: ['merges', 'goes live', 'rolls in', 'builds'] });
  add({ id: 'mB', type: 'match', kicker: 'B · Quick check · 2/3',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['staging environment', 'canary release', 'blue-green deployment', 'feature flag'],
    right: ['an on/off switch', 'a copy of production', 'first for 1% only', 'two copies, switch users', 'all the tests', 'an emergency code fix'] });
  add({ id: 'qB2', type: 'mcq', kicker: 'B · Quick check · 3/3',
    prompt: 'Server addresses, timeouts, limits: settings kept <b>outside the code</b>.<br><b>All this is the …</b>',
    options: ['production', 'deployment', 'configuration', 'build'] });
  add({ id: 'e31_3', type: 'gap', kicker: '3.1 · 5/8', instruction: PV,
    prompt: 'The same build ___ (deploy) to staging and to production.', placeholder: 'two words' });

  /* ---------- Words for the exercises + by / with ---------- */
  add({ id: 'vX1', type: 'content', kicker: 'Vocabulary · Words for the exercises', title: 'You will need these too', items: [
    term('API gateway', '/ˌeɪ piː ˈaɪ ˌɡeɪtweɪ/', 'шлюз API (єдина точка входу для запитів)'),
    term('token', '/ˈtoʊkən/', 'токен (цифровий ключ доступу)'),
    term('to authenticate', '/ɔːˈθentɪkeɪt/', 'автентифікувати'),
    term('rate limiting', '/ˈreɪt ˌlɪmɪtɪŋ/', 'обмеження частоти запитів')] });
  add({ id: 'g2a', type: 'content', reveal: true, kicker: 'Grammar · by or with? · 1/3',
    title: 'Who does it? What is it done with?',
    items: [
      'Ukrainian uses one case for both: «перевірений <b>шлюзом</b>» · «перевірений <b>токеном</b>»',
      '<b>by</b> = who / what does it ' + K('(the agent)') + '<br>The request is authenticated <b>by the API gateway</b>.',
      '<b>with</b> = the tool, the means<br>The request is authenticated <b>with a token</b>.'
    ] });
  add({ id: 'g2a2', type: 'content', reveal: true, kicker: 'Grammar · by or with? · 2/3',
    title: 'Ask: who? or with what?',
    items: [
      '✅ authenticated <b>with</b> a token<br>❌ authenticated <b>by</b> a token',
      'Name the agent only when it matters.<br>' + K('Every request is checked. (who checks it? not important)')
    ] });
  add({ id: 'g2b', type: 'content', reveal: true, kicker: 'Grammar · by or with? · 3/3',
    title: 'Now say it: everyday English',
    items: [
      ...EV('The letter was written <b>by</b> my grandmother <b>with</b> a fountain pen.', 'Лист написала бабуся авторучкою.'),
      ...EV('The door is opened <b>with</b> a key card.', 'Двері відчиняють карткою-ключем.')
    ] });
  add({ id: 'bw1', type: 'mcq', kicker: 'by or with? · 1/3',
    prompt: 'The new release was approved ___ the team lead.', options: ['with', 'by'] });
  add({ id: 'bw2', type: 'mcq', kicker: 'by or with? · 2/3',
    prompt: 'Each call to the payment API is signed ___ a secret key.', options: ['with', 'by'] });
  add({ id: 'bw3', type: 'mcq', kicker: 'by or with? · 3/3',
    prompt: 'All incoming requests are checked ___ the API gateway before they reach the servers.', options: ['by', 'with'] });

  /* ---------- Vocabulary C ---------- */
  add({ id: 'vC1', type: 'content', kicker: 'Vocabulary · C · 1/2', title: 'C. Observability', items: [
    term('monitoring', '/ˈmɑːnɪtərɪŋ/', 'моніторинг'),
    term('health check', '/ˈhelθ tʃek/', 'перевірка працездатності'),
    term('error rate', '/ˈerər reɪt/', 'частка помилок'),
    term('response time', '/rɪˈspɑːns taɪm/', 'час відгуку')] });
  add({ id: 'vC2', type: 'content', kicker: 'Vocabulary · C · 2/2', title: 'C. Observability', items: [
    term('load balancer', '/ˈloʊd ˌbælənsər/', 'балансувальник навантаження'),
    term('traffic', '/ˈtræfɪk/', 'трафік, потік запитів'),
    term('alert', '/əˈlɝːt/', 'сповіщення про проблему'),
    term('log', '/lɔːɡ/', 'журнал (подій)')] });
  add({ id: 'mC', type: 'match', kicker: 'C · Quick check · 1/3',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['health check', 'error rate', 'response time', 'load balancer'],
    right: ['share of failed requests', 'reply speed', 'a quick “alive?” test', 'spreads requests across servers', 'a data copy', 'new features list'] });
  add({ id: 'qC1', type: 'mcq', kicker: 'C · Quick check · 2/3',
    prompt: '3 a.m. A message on the phone wakes the engineer on duty: the error rate is too high.<br><b>This message is …</b>',
    options: ['a log', 'an alert', 'traffic', 'monitoring'] });
  add({ id: 'qC2', type: 'gap', kicker: 'C · Quick check · 3/3', instruction: 'Type the word.',
    prompt: 'Every request is written to a ___ file, so you can read it later.', placeholder: 'one word' });
  add({ id: 'e31_8', type: 'gap', kicker: '3.1 · 6/8', instruction: PV,
    prompt: 'Traffic ___ (shift) to the new version only after the error rate stays low for an hour.', placeholder: 'two words' });

  /* ---------- Vocabulary D ---------- */
  add({ id: 'vD1', type: 'content', kicker: 'Vocabulary · D · 1/2', title: 'D. When things go wrong', items: [
    term('outage', '/ˈaʊtɪdʒ/', 'перебій, недоступність сервісу'),
    term('incident', '/ˈɪnsɪdənt/', 'інцидент'),
    term('to roll back', '/ˌroʊl ˈbæk/', 'відкочувати до попередньої версії'),
    term('hotfix', '/ˈhɑːtfɪks/', 'термінове виправлення')] });
  add({ id: 'vD2', type: 'content', kicker: 'Vocabulary · D · 2/2', title: 'D. When things go wrong', items: [
    term('migration', '/maɪˈɡreɪʃn/', 'міграція (схеми бази даних)'),
    term('backup', '/ˈbækʌp/', 'резервна копія'),
    term('postmortem', '/ˌpoʊstˈmɔːrtəm/', 'розбір інциденту'),
    term('regression', '/rɪˈɡreʃn/', 'регресія (повернення помилки після змін)')] });
  add({ id: 'mD', type: 'match', kicker: 'D · Quick check · 1/3',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['hotfix', 'postmortem', 'regression', 'migration'],
    right: ['database schema change', 'analysis after a failure', 'old bug returns', 'urgent small fix', 'a second server', 'a new feature'] });
  add({ id: 'qD1', type: 'mcq', kicker: 'D · Quick check · 2/3',
    prompt: 'Nobody can open the site for <b>two hours</b>.<br><b>This is …</b>',
    options: ['a backup', 'an outage', 'a hotfix', 'a migration'] });
  add({ id: 'qD2', type: 'mcq', kicker: 'D · Quick check · 3/3',
    prompt: 'Any <b>unplanned</b> problem that hurts the service, big or small, is called …',
    options: ['a regression', 'a backup', 'an incident', 'a rollback'] });
  add({ id: 'e31_4', type: 'gap', kicker: '3.1 · 7/8', instruction: PV,
    prompt: 'All migrations ___ (must / test) on a copy of the production database.', placeholder: 'three words' });
  add({ id: 'e31_6', type: 'gap', kicker: '3.1 · 8/8', instruction: PV,
    prompt: 'If the canary shows errors, the release ___ (can / roll back) within seconds.', placeholder: 'four words' });
  SAY(2, 'Міграцію необхідно перевірити на копії бази даних.',
    'The migration must be tested on a copy of the database.',
    'Tickets <b>must be bought</b> in advance.', 'Квитки треба купити заздалегідь.');

  /* ---------- Grammar · Time clauses ---------- */
  add({ id: 'g3a', type: 'content', reveal: true, kicker: 'Grammar · Order of steps · 1/3',
    title: 'Time words: present, not will',
    items: [
      K('once · as soon as · after · before · until · when') + '<br><b>Once</b> the tests <b>pass</b>, the code <b>will be</b> merged.',
      '❌ as soon as the tests <b>will pass</b>',
      ...EV('Call me <b>as soon as</b> you <b>get</b> home.', 'Подзвони мені, щойно приїдеш додому.')
    ] });
  add({ id: 'g3q', type: 'mcq', kicker: 'Order of steps · Quick check',
    prompt: 'Once the build ___, I will send you the link.', options: ['will finish', 'finishes'] });
  add({ id: 'g3a2', type: 'content', reveal: true, kicker: 'Grammar · Order of steps · 2/3',
    title: 'before / after + -ing',
    items: [
      'The same subject in both parts → <b>-ing</b><br><b>Before deploying</b> the build, the pipeline runs the test suite.',
      ...EV('<b>Before leaving</b>, turn off the lights.', 'Перш ніж піти, вимкни світло.')
    ] });
  add({ id: 'g3b', type: 'content', reveal: true, kicker: 'Grammar · Order of steps · 3/3',
    title: 'until: no “not”',
    items: [
      '<b>until</b> = «доки не…», but <b>no</b> “not” in English<br>Wait <b>until</b> the build <b>finishes</b>.',
      ...EV('Wait here <b>until</b> I <b>come</b> back.', 'Чекай тут, доки я не повернуся.')
    ] });
  add({ id: 'vX2', type: 'content', kicker: 'Vocabulary · Words for the exercises', title: 'You will need these too', items: [
    term('container · image', '/kənˈteɪnər/ · /ˈɪmɪdʒ/', 'контейнер · образ (контейнера)'),
    term('to register (with)', '/ˈredʒɪstər/', 'реєструватися (в системі, сервісі)'),
    SM(K('The container <b>registers with</b> the load balancer, so traffic can reach it.'))] });
  const JN = (a, b, w) => 'Join: <b>' + a + '</b> <b>' + b + '</b> ' + K('(' + w + ')');
  add({ id: 'e32_1', type: 'gap', kicker: '3.2 · 1/6',
    instruction: K('Example: The film ends. We will go home. (as soon as) → As soon as the film <b>ends</b>, we will go home.') + '<br>' + JN('The tests pass.', 'The code will be merged.', 'once'),
    prompt: 'Once the tests ___, the code will be merged.', placeholder: 'one word' });
  add({ id: 'e32_2', type: 'gap', kicker: '3.2 · 2/6',
    instruction: JN('Run the migration on staging.', 'Then run it on production.', 'before + -ing'),
    prompt: 'Before ___ the migration on production, run it on staging.', placeholder: 'one word' });
  add({ id: 'e32_3', type: 'mcq', kicker: '3.2 · 3/6',
    prompt: JN('The old version keeps serving traffic.', 'The new one passes its health checks.', 'until') + '<br>The old version keeps serving traffic …',
    options: ['until the new one will pass its health checks.', 'until the new one doesn’t pass its health checks.', 'until the new one passes its health checks.'] });
  add({ id: 'e32_4', type: 'gap', kicker: '3.2 · 4/6',
    instruction: JN('The container starts.', 'Immediately after that, it registers with the load balancer.', 'as soon as'),
    prompt: 'As soon as the container ___, it registers with the load balancer.', placeholder: 'one word' });
  add({ id: 'e32_5', type: 'mcq', kicker: '3.2 · 5/6',
    prompt: JN('The CI server builds the image.', 'Then it runs the test suite.', 'after + -ing'),
    options: ['After build the image, the CI server runs the test suite.', 'After building the image, the CI server runs the test suite.', 'After the image building, the CI server runs the test suite.'] });
  SAY(3, 'Щойно тести пройдуть, код зіллють у головну гілку.',
    'As soon as the tests pass, the code will be merged into the main branch.',
    '<b>As soon as</b> the rain <b>stops</b>, we’ll go for a walk.', 'Щойно дощ ущухне, ми підемо гуляти.');
  add({ id: 'e32_6', type: 'gap', kicker: '3.2 · 6/6',
    instruction: JN('The canary will look healthy for an hour.', 'Then we will shift all traffic.', 'once'),
    prompt: 'Once the canary ___ healthy for an hour, we will shift all traffic.', placeholder: 'one word' });
  add({ id: 'g4a', type: 'content', reveal: true, kicker: 'Grammar · Purpose · 1/3',
    title: 'Why do we do it?',
    items: [
      '<b>to / in order to</b> + verb<br>We run the tests <b>to catch</b> bugs early.',
      '<b>so that</b> + subject + can / will / does not<br>We use feature flags <b>so that</b> we <b>can</b> switch a feature off fast.',
      ...EV('I set two alarms <b>so that</b> I <b>don’t oversleep</b>.', 'Я ставлю два будильники, щоб не проспати.')
    ] });
  add({ id: 'g4a2', type: 'content', reveal: true, kicker: 'Grammar · Purpose · 2/3',
    title: 'prevent … from + -ing',
    items: [
      '<b>prevent</b> + object + <b>from</b> + -ing<br>A health check <b>prevents</b> the load balancer <b>from sending</b> traffic to a dead server.',
      ...EV('The noise <b>prevented</b> me <b>from sleeping</b>.', 'Шум не давав мені спати.')
    ] });
  add({ id: 'g4b', type: 'content', reveal: true, kicker: 'Grammar · Purpose · 3/3',
    title: 'in case',
    items: [
      '<b>in case</b> = «на випадок, якщо» + present<br>We keep two copies of the logs <b>in case</b> one disk <b>fails</b>.',
      K('in case: act before, just to be safe · if: act only when it happens'),
      ...EV('Take an umbrella <b>in case</b> it <b>rains</b>.', 'Візьми парасольку на випадок, якщо піде дощ.')
    ] });
  const RW = (a, w) => 'Rewrite: <b>' + a + '</b> ' + K('(' + w + ')');
  add({ id: 'e33_1', type: 'mcq', kicker: '3.3 · 1/6',
    prompt: K('Example: I left early <b>so that</b> I <b>could</b> catch the train.') + '<br>' +
      RW('Every change is reviewed. That way, bugs are caught before release.', 'so that') + '<br>Every change is reviewed …',
    options: ['… so that to catch bugs before release.', '… so that bugs are caught before release.', '… so bugs to be caught before release.'] });
  SAY(4, 'Стара версія обслуговує трафік, доки нова не пройде перевірку працездатності.',
    'The old version serves traffic until the new one passes its health check.',
    'Don’t leave <b>until</b> I <b>call</b>.', 'Не йди, доки я не подзвоню.');

  /* ---------- Grammar · Purpose and prevention ---------- */
  add({ id: 'e33_2', type: 'gap', kicker: '3.3 · 2/6',
    instruction: RW('Rate limiting stops a single client; otherwise, it could overload the API.', 'prevent … from'),
    prompt: 'Rate limiting prevents a single client ___ the API.', placeholder: 'two words' });
  add({ id: 'e33_3', type: 'gap', kicker: '3.3 · 3/6',
    instruction: RW('We keep the previous release because the new one might fail.', 'in case'),
    prompt: 'We keep the previous release in case the new one ___.', placeholder: 'one word' });
  SAY(5, 'Кожен запит автентифікують токеном, щоб сторонні не мали доступу до API.',
    'Every request is authenticated with a token so that outsiders cannot access the API.',
    'I keep my passwords in a password manager <b>so that</b> I <b>don’t forget</b> them.', 'Я зберігаю паролі в менеджері паролів, щоб їх не забути.');
  add({ id: 'e33_4', type: 'gap', kicker: '3.3 · 4/6',
    instruction: RW('The build is tested in staging first. The aim is to catch configuration errors.', 'in order to'),
    prompt: 'The build is tested in staging first ___ catch configuration errors.', placeholder: 'three words' });
  add({ id: 'e33_5', type: 'mcq', kicker: '3.3 · 5/6',
    prompt: RW('We hide the new page behind a feature flag. Users must not see unfinished work.', 'so that … not'),
    options: ['… so that users not see unfinished work.', '… so that users don’t to see unfinished work.', '… so that users do not see unfinished work.', '… so that users not to see unfinished work.'] });
  add({ id: 'e33_6', type: 'gap', kicker: '3.3 · 6/6',
    instruction: RW('Take a database backup before the migration. The migration might go wrong.', 'in case'),
    prompt: 'Take a database backup before the migration in case it ___ wrong.', placeholder: 'one word' });
  SAY(6, 'Обмеження частоти запитів не дає одному клієнтові перевантажити сервер.',
    'Rate limiting prevents one client from overloading the server.',
    'Coffee <b>prevents</b> me <b>from falling</b> asleep at lectures.', 'Кава не дає мені заснути на лекціях.');
  SAY(7, 'Зробіть резервну копію на випадок, якщо міграція піде не так.',
    'Make a backup in case the migration goes wrong.',
    'Take a charger <b>in case</b> your phone <b>dies</b>.', 'Візьми зарядку на випадок, якщо телефон розрядиться.');

  /* ---------- 3.4 · Grammar mistakes ---------- */
  FM('fm1', 1, 'The code reviewed by two developers before every merge.',
    ['The code reviewed', 'by two developers', 'before every merge'], true);
  FM('fm2', 2, 'Once the tests will pass, the pipeline deploys the build.',
    ['Once', 'the tests will pass,', 'the pipeline deploys the build']);
  FM('fm4', 3, 'Rate limiting prevents the API to crash.',
    ['Rate limiting', 'prevents the API to crash']);
  add({ id: 'fm4fix', type: 'gap', kicker: '3.4 · Correct it',
    instruction: '<s>Rate limiting prevents the API to crash.</s><br>Write the correct ending.',
    prompt: 'Rate limiting prevents the API ___.', placeholder: 'two words' });
  FM('fm3', 4, 'Every request is authenticated by a token.',
    ['Every request', 'is authenticated', 'by a token']);
  FM('fm7', 5, 'Keep the old release in case the new one will fail.',
    ['Keep the old release', 'in case', 'the new one will fail']);

  /* ---------- Terminological traps + 3.5 + 3.4 (words) ---------- */
  add({ id: 'tsec', type: 'end', kicker: 'Vocabulary',
    title: 'Words that trick you',
    text: 'Same Ukrainian word, different English words' });
  const trap = (pair, uk, ex) => SM('<b>' + pair + '</b><br>' + K(uk) + '<br><i>' + ex + '</i>');
  const T35 = 'Choose the correct word.';
  add({ id: 't1', type: 'content', reveal: true, kicker: 'Traps · 1/4', title: 'Words that trick you', items: [
    trap('update ≠ upgrade', 'update — оновлення в межах версії (виправлення, латки) · upgrade — перехід на нову основну версію чи потужніший тарифний план',
      'An update fixes a bug; the upgrade to version 5 needs code changes.'),
    trap('production ≠ exploitation', '«експлуатація, робоче середовище» = production, operation · exploitation — використання вразливості',
      'It has been in production since 2021; exploitation of the bug needs an account.')] });
  add({ id: 'e35_1', type: 'mcq', kicker: '3.5 · 1/8', prompt: T35 + '<br>The ___ to the next major version of the framework will take a month.', options: ['update', 'upgrade'] });
  add({ id: 'e35_2', type: 'mcq', kicker: '3.5 · 2/8', prompt: T35 + '<br>This API has been in ___ for three years.', options: ['production', 'exploitation'] });
  add({ id: 'fm5', type: 'gap', kicker: '3.4 · Correct it · 6/8',
    instruction: '<s>This service has been in exploitation since 2021.</s><br>Replace the wrong word.',
    prompt: 'This service has been in ___ since 2021.', placeholder: 'one word' });
  SAY(8, 'Цей сервіс працює в продакшні з 2020 року.',
    'This service has been in production since 2020.',
    'I <b>have lived</b> in Ivano-Frankivsk <b>since</b> 2015.', 'Я живу в Івано-Франківську з 2015 року.');
  SAY(14, 'Перехід на нову основну версію фреймворку забере місяць.',
    'The upgrade to the new major version of the framework will take a month.',
    'I <b>upgraded</b> to a more expensive plan to get more mobile data.', 'Я перейшов на дорожчий тариф, щоб мати більше мобільного інтернету.');

  add({ id: 't2', type: 'content', reveal: true, kicker: 'Traps · 2/4', title: 'Words that trick you', items: [
    trap('check ≠ control', '«контролювати» у значенні «перевіряти» = check, monitor · control — керувати',
      'The pipeline checks the build; the load balancer controls where traffic goes.'),
    trap('validate ≠ verify', 'validate — перевіряти відповідність формату чи правилам · verify — підтверджувати справжність або істинність',
      'The form validates the email format; a confirmation link verifies that the address really exists.')] });
  add({ id: 'e35_3', type: 'mcq', kicker: '3.5 · 3/8', prompt: T35 + '<br>Please ___ the logs after every deployment.', options: ['control', 'check'] });
  add({ id: 'e35_4', type: 'mcq', kicker: '3.5 · 4/8', prompt: T35 + '<br>The form should ___ that the phone number contains only digits.', options: ['verify', 'validate'] });
  FM('fm6', 7, 'We need to control the logs after each deployment.',
    ['We need to', 'control the logs', 'after each deployment']);
  SAY(9, 'Перегляньте журнали, перш ніж зливати зміни.',
    'Check the logs before merging the changes.',
    '<b>Check</b> your pockets <b>before washing</b> your jeans.', 'Перевір кишені, перш ніж прати джинси.');
  SAY(12, 'Форма перевіряє формат адреси, а посилання підтверджує, що адреса справжня.',
    'The form validates the address format, and the link verifies that the address is real.',
    'The bank <b>verifies</b> my identity with my passport.', 'Банк перевіряє мою особу за паспортом.');

  add({ id: 't3', type: 'content', reveal: true, kicker: 'Traps · 3/4', title: 'Words that trick you', items: [
    trap('failure ≠ outage', 'failure — відмова окремого компонента · outage — перебій, коли сервіс недоступний для користувачів',
      'A disk failure is routine; an outage is what users notice.'),
    trap('review ≠ revision', '«рев’ю, перевірка коду» = code review · revision — версія, редакція (a Git revision) · «ревізія» = audit, inspection',
      'Please review my pull request; it changes the revision we deployed yesterday.')] });
  add({ id: 'e35_5', type: 'mcq', kicker: '3.5 · 5/8', prompt: T35 + '<br>The six-hour ___ affected billions of users.', options: ['outage', 'failure'] });
  add({ id: 'e35_6', type: 'mcq', kicker: '3.5 · 6/8', prompt: T35 + '<br>Every pull request needs a code ___ before it is merged.', options: ['revision', 'review'] });
  FM('fm8', 8, 'External auditors will make a revision of our access logs next month.',
    ['External auditors', 'will make a revision of', 'our access logs next month']);
  add({ id: 'fm8fix', type: 'gap', kicker: '3.4 · Correct it · 8/8',
    instruction: '<s>External auditors will make a revision of our access logs next month.</s><br>Use one verb.',
    prompt: 'External auditors will ___ our access logs next month.', placeholder: 'one word' });
  SAY(10, 'Будь ласка, перевір мій запит на злиття до обіду.',
    'Please review my pull request before lunch.',
    'Could you <b>review</b> my résumé by Friday?', 'Можеш переглянути моє резюме до п’ятниці?');
  SAY(11, 'Відмова одного диска не спричинила перебою в роботі сервісу.',
    'A single disk failure did not cause an outage.',
    'A traffic light <b>failure</b> caused a huge traffic jam.', 'Через відмову світлофора утворився величезний затор.');

  add({ id: 't4', type: 'content', reveal: true, kicker: 'Traps · 4/4', title: 'Words that trick you', items: [
    trap('environment ≠ medium', '«середовище (розробки, тестування)» = environment · medium — середовище передавання, носій',
      'The staging environment mirrors production; the transmission medium here is fiber.'),
    trap('to build ≠ to assemble', '«збирати проєкт» = build · assemble — збирати з фізичних частин або транслювати асемблером',
      'The CI server builds the project; the technicians assemble the servers.')] });
  add({ id: 'e35_7', type: 'mcq', kicker: '3.5 · 7/8', prompt: T35 + '<br>The bug appears only in the staging ___.', options: ['medium', 'environment'] });
  add({ id: 'e35_8', type: 'mcq', kicker: '3.5 · 8/8', prompt: T35 + '<br>Our CI server can ___ the whole project in four minutes.', options: ['build', 'assemble'] });
  add({ id: 'fmyou', type: 'open', kicker: '3.4 · Your turn',
    prompt: 'Which mistake from 3.4 do <b>you</b> make most often in English?<br>Write the wrong version and the correct one.',
    placeholder: '❌ … → ✅ …' });

  /* ---------- Reading ---------- */
  add({ id: 'rsec', type: 'end', kicker: 'Reading',
    title: 'Deploying Without Fear',
    text: 'Two disasters and the practices that prevent them' });
  add({ id: 'rv', type: 'content', kicker: 'Reading · Before you read', title: 'Five more words', items: [
    term('artifact', '/ˈɑːrtɪfækt/', 'артефакт (готовий файл збірки)'),
    term('rival', '/ˈraɪvl/', 'конкурент'),
    term('to undo · reversible', '/ʌnˈduː/ · /rɪˈvɝːsəbl/', 'скасувати · зворотний'),
    term('unreachable', '/ʌnˈriːtʃəbl/', 'недоступний, до якого не можна «достукатися»')] });
  add({ id: 'r0', type: 'open', kicker: 'Reading · Predict',
    prompt: PH('trading.jpg', 'Traders on a trading floor looking at red charts on many monitors', '50% 45%') +
      'In 2012, a trading firm lost <b>$460 million in 45 minutes</b>, right after new software was switched on.<br><b>What do you think went wrong?</b>',
    placeholder: 'Maybe the new code… / Perhaps nobody…' });

  const PARA = [
    'On the morning of August 1, 2012, the trading firm Knight Capital switched on new software on its servers. Within about forty-five minutes, the firm had lost roughly 460 million dollars, and less than a year later it merged with a <b>rival</b>. The cause was not a clever attack.',
    'According to the US Securities and Exchange Commission, the new code <b>had been copied</b> to seven of the firm’s eight servers; the eighth <b>was missed</b>. On that server, a <b>flag</b> that was meant to switch on a new feature switched on old, forgotten code instead, and it began sending millions of orders into the market.',
    'Most web teams will never lose money that fast, but every one of them faces the same risk each time it <b>deploys</b>. Modern web applications change constantly, and some companies deploy dozens of times a day. Every deployment is a moment when working code <b>is replaced</b> by new code that has never met real users. The discipline known as <b>continuous delivery</b> exists <b>so that</b> this moment becomes boring.',
    'A typical <b>pipeline</b> follows a strict sequence. First, each change <b>is reviewed</b> by at least one other developer. <b>Once</b> the <b>pull request</b> <b>is approved</b>, the code <b>is merged</b> into the <b>main branch</b>, and the continuous integration server builds it and runs the automated tests. <b>Before</b> anything <b>reaches</b> production, the build <b>is deployed</b> to a <b>staging environment</b>, where it is checked against realistic data. The build is never rebuilt between stages, <b>so that</b> the <b>artifact</b> tested in staging is exactly the artifact that <b>goes live</b>.',
    'Even then, the new version is not sent to everyone at once. In a <b>canary release</b>, it is served to perhaps one percent of <b>traffic</b> first — the name comes from the canaries that miners once carried underground to warn them of poisonous gas. <b>Monitoring</b> compares <b>error rates</b> and <b>response times</b> between the canary and the old version. <b>Once</b> the numbers <b>look</b> healthy, more traffic is shifted, step by step. If they do not, the release <b>is rolled back</b>, often automatically, before most users notice anything.',
    'Many teams go one step further and separate deploying from releasing. New code is shipped to production switched off, behind a <b>feature flag</b>, and is turned on later for selected users. If something goes wrong, the flag is simply switched off, which is far faster than a new deployment. Flags have a cost, though: every forgotten flag is old code waiting to be switched on by mistake — exactly what happened at Knight Capital. That is why flags should be removed <b>as soon as</b> a feature <b>is</b> fully launched.',
    '<b>Configuration</b> deserves the same care as code. In October 2021, Facebook, Instagram and WhatsApp were <b>unreachable</b> for about six hours, in one of the company’s longest <b>outages</b>, after a routine change to its network configuration went wrong. Because the company’s internal tools depended on the same network, engineers struggled to reach the very systems they needed to fix.',
    'None of these practices make failure impossible. What they do is make it small, visible and <b>reversible</b>. Experienced engineers often judge a deployment process by a single question: how quickly can we <b>undo</b> it?'
  ];
  const PN = ['1 · 1/2', '1 · 2/2', '2', '3', '4', '5', '6', '7'];
  const PID = ['r1', 'r1b', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7'];
  const para = (i) => add({ id: PID[i], type: 'content', kicker: 'Reading · Deploying Without Fear', title: 'Paragraph ' + PN[i] + ' of 7', items: [SM(PARA[i])] });

  para(0); para(1);
  add({ id: 'e36_1', type: 'mcq', kicker: '3.6 · 1/5', prompt: 'The Knight Capital losses were caused by …',
    options: ['a cyberattack on the firm.', 'new code missing from one server.', 'a slow network connection.', 'a failed database backup.'] });
  para(2);
  add({ id: 'e36_2', type: 'mcq', kicker: '3.6 · 2/5', prompt: 'According to the text, continuous delivery aims to …',
    options: ['reduce the number of deployments.', 'make deployments uneventful.', 'replace code review.', 'remove the need for testing.'] });
  para(3);
  add({ id: 'e36_3', type: 'mcq', kicker: '3.6 · 3/5', prompt: 'The build is not rebuilt between stages so that …',
    options: ['the pipeline runs faster.', 'staging uses fewer servers.', 'the tested artifact is identical to the one that goes live.', 'developers can skip code review.'] });
  para(4);
  add({ id: 'r4q', type: 'mcq', kicker: 'Paragraph 4 · Check',
    prompt: 'The canary’s error rate is <b>twice as high</b> as the old version’s.<br><b>What happens next?</b>',
    options: ['More traffic is shifted to the canary.', 'All users get the new version.', 'The release is rolled back.', 'The build is rebuilt.'] });
  para(5);
  add({ id: 'e36_4', type: 'mcq', kicker: '3.6 · 4/5', prompt: 'Feature flags are described as …',
    options: ['completely free of risk.', 'a way to turn features on and off without a new deployment.', 'a replacement for canary releases.', 'the cause of the Facebook outage.'] });
  para(6);
  add({ id: 'r6q', type: 'mcq', kicker: 'Paragraph 6 · Check',
    prompt: PH('lockout.jpg', 'Two engineers at night in front of a locked data center door with a red badge reader', '50% 40%', 88) +
      'Why was the Facebook outage so <b>hard to fix</b>?',
    options: ['The engineers were on holiday.', 'A hacker changed the configuration.', 'The code had not been tested.', 'Their tools used the same broken network.'] });
  para(7);
  add({ id: 'e36_5', type: 'mcq', kicker: '3.6 · 5/5', prompt: 'The tone of the final paragraph is best described as …',
    options: ['alarmed.', 'ironic and dismissive.', 'calm and practical.', 'nostalgic.'] });
  add({ id: 'r7q', type: 'gap', kicker: 'Paragraph 7 · Word', instruction: 'Find the word in paragraph 7.',
    prompt: 'can be undone → ___', placeholder: 'one word' });

  const FIND = 'Find a word or phrase in the text.';
  add({ id: 'e37_1', type: 'gap', kicker: '3.7 · 1/6', instruction: FIND, prompt: 'a request to add your changes to the main branch → ___', placeholder: 'two words' });
  add({ id: 'e37_2', type: 'gap', kicker: '3.7 · 2/6', instruction: FIND, prompt: 'an environment where a build is checked before it goes live → ___', placeholder: 'two words' });
  add({ id: 'mR', type: 'match', kicker: '3.7 · Words before the text · Match',
    prompt: 'What does each word (1–4) mean? Two options (a–f) are extra.',
    left: ['artifact', 'rival', 'to undo', 'unreachable'],
    right: ['a business partner', 'cannot be contacted', 'the built file', 'to cancel a change', 'a competing company', 'to repeat a change'] });
  add({ id: 'e37_3', type: 'gap', kicker: '3.7 · 3/6', instruction: FIND, prompt: 'a release first shown to a small share of traffic → ___', placeholder: 'two words' });
  add({ id: 'e37_4', type: 'gap', kicker: '3.7 · 4/6', instruction: FIND, prompt: 'a setting that turns a feature on or off without a new deployment → ___', placeholder: 'two words' });
  add({ id: 'e37_5', type: 'gap', kicker: '3.7 · 5/6', instruction: FIND, prompt: 'a period when a service cannot be used → ___', placeholder: 'one word' });
  add({ id: 'rq', type: 'mcq', kicker: 'Reading · Your view',
    prompt: 'Knight Capital or Facebook: <b>which disaster was easier to prevent?</b><br>' + K('Be ready to say which practice from the text would have helped.'),
    options: ['Knight Capital, 2012', 'Facebook, 2021'] });
  add({ id: 'e37_6', type: 'gap', kicker: '3.7 · 6/6', instruction: FIND, prompt: 'to return to the previous version → ___', placeholder: 'two or three words' });

  /* ---------- Keyword drill ---------- */
  add({ id: 'k0', type: 'content', kicker: '3.8 · Keyword drill', title: 'Build the sentence', items: [
    'You see only the <b>keywords</b> from the text, in the right order.',
    'Add articles and prepositions. Choose the tense and <b>active or passive</b>.',
    'Say your sentence → compare → repeat the target 3 times.'] });
  const KW = [
    ['new · code · copy · seven · eight · server · eighth · miss',
      'The <b>new code</b> was <b>copied</b> to <b>seven</b> of the <b>eight servers</b>; the <b>eighth</b> was <b>missed</b>.',
      'Новий код скопіювали на сім із восьми серверів, а восьмий пропустили.'],
    ['every · deployment · moment · working · code · replace',
      'The thing is, <b>every deployment</b> is a <b>moment</b> when <b>working code</b> gets <b>replaced</b>.',
      'Річ у тім, що кожне розгортання — це момент, коли робочий код замінюють.'],
    ['once · pull request · approve · code · merge · main branch',
      '<b>Once</b> the <b>pull request</b> is <b>approved</b>, the <b>code</b> is <b>merged</b> into the <b>main branch</b>.',
      'Щойно запит на злиття схвалять, код зливають у головну гілку.'],
    ['before · anything · reach · production · build · deploy · staging',
      '<b>Before anything reaches production</b>, the <b>build</b> is <b>deployed</b> to <b>staging</b>.',
      'Перш ніж щось потрапить у продакшн, збірку розгортають у проміжному середовищі.'],
    ['if · something · go wrong · flag · simply · switch off',
      'Honestly, <b>if something goes wrong</b>, the <b>flag</b> is <b>simply switched off</b>.',
      'Чесно кажучи, якщо щось піде не так, прапорець просто вимикають.'],
    ['configuration · deserve · same · care · code',
      '<b>Configuration deserves</b> exactly the <b>same care</b> as the <b>code</b> itself.',
      'Конфігурація заслуговує на таку саму увагу, як і сам код.']
  ];
  const kw = (i) => add({ id: 'k' + (i + 1), type: 'content', reveal: true,
    kicker: '3.8 · Keyword drill · ' + (i + 1) + '/6', title: KW[i][0], items: [KW[i][1], K(KW[i][2])] });
  kw(0); kw(1); kw(2);
  add({ id: 'kq', type: 'mcq', kicker: '3.8 · Keyword drill · Halfway',
    prompt: 'What did you <b>add</b> most often so far?',
    options: ['the verb <b>be</b> (passive)', 'articles: a / an / the', 'prepositions: to / of / into', 'the -ed ending'] });
  kw(3); kw(4); kw(5);
  add({ id: 'kfin', type: 'content', kicker: '3.8 · Keyword drill · All six', title: 'Now without the targets', items: [
    SM('<b>1.</b> new · code · copy · seven · eight · server · eighth · miss<br><b>2.</b> every · deployment · moment · working · code · replace<br><b>3.</b> once · pull request · approve · code · merge · main branch'),
    SM('<b>4.</b> before · anything · reach · production · build · deploy · staging<br><b>5.</b> if · something · go wrong · flag · simply · switch off<br><b>6.</b> configuration · deserve · same · care · code')] });

  /* ---------- Listening ---------- */
  add({ id: 'a0', type: 'end', kicker: 'Listening',
    title: 'The Brief',
    text: 'The same story, told for listeners' });
  add({ id: 'a1', type: 'open', kicker: 'Listening · Before you listen · 1/3',
    prompt: 'The audio names <b>three strategies</b> for deploying code safely.<br>From the text, <b>which three do you expect?</b>',
    placeholder: '1) a strict pipeline 2) … 3) …' });
  add({ id: 'a2', type: 'content', kicker: 'Listening · Before you listen · 2/3', title: 'Words from the audio', items: [
    term('catastrophic', '/ˌkætəˈstrɑːfɪk/', 'катастрофічний'),
    term('tamper-proof', '/ˈtæmpər pruːf/', 'захищений від втручання (не відкрити непомітно)'),
    term('to spike', '/spaɪk/', 'різко підскочити (про показник)'),
    term('to lock out', '/ˌlɑːk ˈaʊt/', 'залишити без доступу')] });
  add({ id: 'a3', type: 'content', kicker: 'Listening · Before you listen · 3/3', title: 'While you listen', items: [
    '<b>1.</b> What does the speaker compare a build that is <b>never rebuilt</b> to?',
    '<b>2.</b> Why do teams test on <b>real users</b> if they already have staging?',
    '<b>3.</b> What do these practices <b>not</b> do — and what <b>do</b> they do?',
    K('Spoken: <b>basically</b>, <b>literally</b>, <b>But man…</b>')] });
  add({ id: 'a4', type: 'end', kicker: 'Listening · 1st time',
    title: '🎧 Listen',
    text: 'Answer the three questions in your head.' });
  add({ id: 'L1', type: 'mcq', kicker: 'After listening · 1/10',
    prompt: 'A build that is never rebuilt is compared to …',
    options: ['a canary in a mine.', 'a switch on a wall.', 'a product sealed in a tamper-proof box.', 'a car on a test track.'] });
  add({ id: 'L2', type: 'mcq', kicker: 'After listening · 2/10',
    prompt: 'Teams test on real users because …',
    options: ['staging doesn’t perfectly mimic the real world.', 'staging environments are too expensive.', 'real users find bugs faster than tests.', 'the law requires it.'] });
  add({ id: 'L3', type: 'mcq', kicker: 'After listening · 3/10',
    prompt: 'According to the speaker, these practices …',
    options: ['make failure impossible.', 'make failure small, visible and instantly reversible.', 'replace the staging environment.', 'only work for very large companies.'] });
  add({ id: 'a5', type: 'end', kicker: 'Listening · 2nd time',
    title: '🎧 Listen again',
    text: 'Now catch the numbers.' });
  const NUM = 'Complete with a number.';
  add({ id: 'L4', type: 'gap', kicker: 'After listening · 4/10', instruction: NUM,
    prompt: 'Canary releases quietly serve the code to just ___ of traffic first.', placeholder: 'a number' });
  add({ id: 'L5', type: 'gap', kicker: 'After listening · 5/10', instruction: NUM,
    prompt: 'A forgotten flag hit old code on 1 out of ___ servers.', placeholder: 'a number' });
  add({ id: 'L6', type: 'gap', kicker: 'After listening · 6/10', instruction: NUM,
    prompt: 'Knight Capital lost $460 million in just ___ minutes.', placeholder: 'a number' });
  add({ id: 'L7', type: 'mcq', kicker: 'After listening · 7/10',
    prompt: 'Text or audio? Which detail is in the <b>audio</b> but <b>not</b> in the text?',
    options: ['the canaries in the mines', 'one percent of traffic', 'the tamper-proof box', 'the Facebook outage'] });
  add({ id: 'L8', type: 'mcq', kicker: 'After listening · 8/10',
    prompt: 'The audio sounds <b>spoken</b>, the text sounds <b>written</b>.<br>Which phrase is from the <b>audio</b>?',
    options: ['Configuration deserves the same care as code.', 'But man, flags have a severe cost.', 'According to the US Securities and Exchange Commission…', 'None of these practices make failure impossible.'] });
  add({ id: 'L9', type: 'mcq', kicker: 'After listening · 9/10',
    prompt: '<b>Audio:</b> a network change “locked engineers out for 6 hours”.<br><b>Text:</b> engineers “struggled to reach the very systems they needed to fix”.<br><b>Which one is more careful?</b>',
    options: ['the audio', 'the text'] });
  add({ id: 'L10', type: 'open', kicker: 'After listening · 10/10',
    prompt: 'The speaker says every push risks <b>“catastrophic financial ruin”</b>.<br>Name <b>one app</b> where a bad deploy really could ruin the company — and <b>one</b> where it couldn’t. Why?',
    placeholder: 'A bad deploy could ruin… because… but for… it’s just…' });

  add({ id: 'mL', type: 'match', kicker: 'After listening · Words from the audio',
    prompt: 'What does each word (1–4) mean? Two options (a–f) are extra.',
    left: ['catastrophic', 'tamper-proof', 'to spike', 'to lock out'],
    right: ['to jump up fast', 'cannot be opened secretly', 'extremely bad', 'to keep someone outside', 'to slow down', 'easy to repair'] });

  /* ---------- Speaking A · Retell (after the audio) ---------- */
  add({ id: 'spA1', type: 'content', reveal: true, kicker: 'Speaking A · One student at a time', format: 'retell',
    title: 'A postmortem in 45 seconds', items: [
      'Choose: <b>Knight Capital, 2012</b> or <b>Facebook, 2021</b>.',
      '<b>Moves:</b> what was changed → what was missed → what happened → what will prevent it',
      '<b>You must use:</b> was / were + V3 · as soon as / after · prevent … from + -ing'] });
  add({ id: 'spA2', type: 'content', kicker: 'Speaking A · Example', title: 'How it sounds', items: [
    SM('<b>Example (another story):</b> <i>In 2017, a command <b>was typed</b> with a mistake at Amazon’s storage service. <b>As soon as</b> it ran, far too many servers <b>were removed</b>, and thousands of websites went down for about four hours. Now the tool checks the numbers, which <b>prevents</b> engineers <b>from removing</b> too many servers at once.</i>'),
    '<b>Listeners:</b> ask one question that starts with <b>Why wasn’t…?</b>'] });
  add({ id: 'spA3', type: 'open', kicker: 'Speaking A · Get ready',
    prompt: 'Write your <b>last move</b> in one sentence: what will stop it from happening again?<br>Use <b>prevent … from + -ing</b>.',
    placeholder: 'A … prevents … from …' });

  /* ---------- Dialogues ---------- */
  const L = (who, t) => SM('<b>' + who + ':</b> ' + t);
  add({ id: 'd1q', type: 'mcq', kicker: 'Dialogue 1 · Before you read',
    prompt: PH('standup.jpg', 'A team of developers at a stand-up meeting; one points at a spike on a wall chart', '50% 40%', 100) +
      'Morning stand-up. A new release’s error rate jumped to <b>4%</b> in ten minutes.<br><b>What would you do first?</b>',
    options: ['roll it back', 'find the bug', 'write a postmortem', 'tell the users'] });
  add({ id: 'd1a', type: 'content', kicker: 'Dialogue 1 · 1/2', title: 'Stand-up: the failed canary', items: [
    L('Iryna', 'How’s the checkout release going?'),
    L('Maksym', 'Not great. The canary’s <b>error rate jumped</b> to four percent within ten minutes.'),
    L('Iryna', 'Did the pipeline roll it back?'),
    L('Maksym', 'Automatically, yes. <b>The alert fired</b>, and all traffic went back to the old version.')] });
  add({ id: 'd1b', type: 'content', kicker: 'Dialogue 1 · 2/2', title: 'Stand-up: the failed canary', items: [
    L('Iryna', 'Good. So the rollback worked — it’s the release itself we need to look at.'),
    L('Maksym', 'Exactly. I’ll <b>pull the logs</b> and reproduce it on staging this morning.'),
    L('Iryna', 'And <b>put the release on hold</b> until we know what went wrong. We’ll need a short postmortem, too.')] });
  add({ id: 'm39', type: 'match', kicker: '3.9 · Expressions · Match',
    prompt: 'What does each expression (1–5) mean? Two options (a–g) are extra.',
    left: ['the error rate jumped', 'the alert fired', 'to pull the logs', 'to put on hold', 'to stay flat'],
    right: ['to download the records', 'to pause for now', 'errors rose suddenly', 'to not change', 'to delete the records', 'the warning went off', 'to speed up'] });
  add({ id: 'd2a', type: 'content', kicker: 'Dialogue 2 · 1/3', title: 'Explaining a feature flag', items: [
    L('Product manager', 'The new search page is finished. Why not switch it on for everyone today?'),
    L('Developer', 'We could, but if it has a bug we haven’t seen yet, every user would hit it at the same time.'),
    L('Product manager', 'So what’s the plan?')] });
  add({ id: 'd2b', type: 'content', kicker: 'Dialogue 2 · 2/3', title: 'Explaining a feature flag', items: [
    L('Developer', 'Five percent today, twenty-five tomorrow, and everyone on Thursday — <b>once</b> the error rate <b>stays flat</b>.'),
    L('Product manager', 'And the other users? Marketing has already announced the new page.')] });
  add({ id: 'd2c', type: 'content', kicker: 'Dialogue 2 · 3/3', title: 'Explaining a feature flag', items: [
    L('Developer', '<b>That’s true</b>, and it’s the price of doing it safely. <b>To be fair</b>, the old page still works, so nobody loses anything — they just wait a couple of days.'),
    L('Product manager', 'All right. <b>Keep me posted</b>, and let me know the moment anything goes wrong.')] });
  add({ id: 'e39_1', type: 'open', kicker: '3.9 · Both dialogues',
    prompt: 'Find <b>five</b> words or phrases that show <b>time</b> or the <b>order of events</b>.',
    placeholder: 'within ten minutes, …' });
  add({ id: 'e39_3a', type: 'mcq', kicker: '3.9 · Dialogue 2',
    prompt: 'The developer <b>admits a weakness</b> in his plan.<br>Which words does he use?',
    options: ['We could, but…', 'So what’s the plan?', 'That’s true… To be fair…', 'Keep me posted…'] });
  add({ id: 'e39_3b', type: 'open', kicker: '3.9 · Dialogue 2',
    prompt: 'Marketing has already announced the page, but the PM <b>still says yes</b>.<br><b>What exactly convinced him?</b>',
    placeholder: 'He agreed because the developer…' });
  SAY(13, 'Ми призупиняємо випуск, доки не з’ясуємо причину.',
    'We’re putting the release on hold until we find out the cause.',
    'We’re <b>putting</b> the renovation <b>on hold until</b> we save some money.', 'Ми відкладаємо ремонт, доки не накопичимо грошей.');

  /* ---------- Speaking B · Persuade (role play) ---------- */
  add({ id: 'spB1', type: 'content', kicker: 'Speaking B · Role play', format: 'persuade',
    title: 'Not for everyone today', items: [
      '<b>Feature:</b> a new <b>payment page</b> in a food-delivery app',
      '<b>Student:</b> the developer · <b>Teacher:</b> the product manager',
      '<b>Goal:</b> keep the gradual rollout and get a “yes”',
      '<b>You must use:</b> That’s true, … · To be fair, … · once / until + present · in case'] });
  add({ id: 'spB2', type: 'content', reveal: true, kicker: 'Speaking B · The PM’s objections', title: 'One card, one student', items: [
    SM('🗨️ <b>1.</b> “Marketing has already emailed all our users.”'),
    SM('🗨️ <b>2.</b> “Our competitor launched the same thing yesterday.”'),
    SM('🗨️ <b>3.</b> “Staging tests passed. Why test on real users?”'),
    SM('🗨️ <b>4.</b> “What if users get the old page and complain?”')] });
  add({ id: 'spB3', type: 'content', kicker: 'Speaking B · Example', title: 'How it sounds', items: [
    SM('<b>PM:</b> “The CEO wants it live by Monday.”'),
    SM('<b>Developer:</b> <i><b>That’s true</b>, Monday matters. <b>To be fair</b>, we can still make it: five percent on Friday, and <b>once</b> the error rate <b>stays</b> flat over the weekend, everyone gets it on Monday. We keep the old page <b>in case</b> payments start failing.</i>'),
    '<b>Listeners:</b> did the developer agree first, give a number, and keep the plan?'] });

  /* ---------- Final task · Release plan (3.11) ---------- */
  add({ id: 'fx0', type: 'end', kicker: 'Final task',
    title: 'Release plan',
    text: 'Explain to a non-technical manager how your change will go live safely' });
  add({ id: 'fx1', type: 'content', kicker: '3.11 · The task', format: 'explain',
    title: 'Two minutes, one manager', items: [
      PH('checkout.jpg', 'A laptop with an online checkout page, shopping bags and a card on a desk', '50% 50%', 120) +
        '<b>Listener:</b> a manager with <b>no technical background</b>',
      '<b>Time:</b> two minutes · <b>one student at a time</b>',
      '<b>Rule:</b> every term you use must be clear to the manager'] });
  add({ id: 'fx2', type: 'mcq', kicker: '3.11 · Choose your scenario',
    prompt: 'Which change will you release?',
    options: ['checkout page before Black Friday', 'banking database migration', 'course-registration site', 'news recommendation algorithm', 'social network login change'] });
  add({ id: 'fx3', type: 'content', reveal: true, kicker: '3.11 · Four moves', title: 'Your plan', items: [
    SM('<b>1. Steps</b> of the release, in order ' + K('passive · once / before + -ing')),
    SM('<b>2. Quality:</b> how the change is checked before users see it'),
    SM('<b>3. If it goes wrong:</b> errors, slow responses, lost data ' + K('in case · roll back')),
    SM('<b>4. Schedule</b> and the <b>condition for stopping</b> it ' + K('a number, not “if something goes wrong”'))] });
  add({ id: 'fx4', type: 'content', kicker: '3.11 · Useful phrases · 1/2', title: 'You can say…', items: [
    SM('First, every change <b>is reviewed</b> and <b>tested</b> in the pipeline.'),
    SM('<b>Once</b> the build <b>passes</b>, it <b>is deployed</b> to staging.'),
    SM('The old version keeps running <b>in case</b> the new one <b>fails</b>.'),
    SM('The feature flag <b>prevents</b> users <b>from seeing</b> unfinished work.')] });
  add({ id: 'fx5', type: 'content', kicker: '3.11 · Useful phrases · 2/2', title: 'You can say…', items: [
    SM('We’d start with <b>one percent</b> of traffic.'),
    SM('If the error rate rises above <b>half a percent</b>, the release <b>is rolled back</b>.'),
    SM('The worst case, then, is a few errors for a few users, not an outage.'),
    SM('<b>In plain terms,</b> a canary release means … ' + K('(for the manager)'))] });
  add({ id: 'fx6', type: 'open', kicker: '3.11 · Get ready',
    prompt: 'Move 4 is the hardest. Write your <b>stop condition</b> with a <b>number</b>.<br>' + K('If … rises above … / falls below …, the release is …'),
    placeholder: 'If the error rate rises above…, the release is…' });
  add({ id: 'fx7', type: 'content', kicker: '3.11 · While you listen', title: 'Check the speaker', items: [
    SM('All <b>four moves</b>, in order?'),
    SM('At least <b>three passive</b> forms?'),
    SM('<b>once / until / before + -ing</b> and <b>so that / prevent … from / in case</b>?'),
    SM('A stop condition <b>with a number</b>?'),
    SM('Ask one question: <b>What exactly would make you stop the release?</b>')] });

  add({ id: 'end', type: 'end', kicker: 'Unit 3',
    title: 'How quickly can we undo it?',
    text: 'Small, visible and reversible: that is what “safe” means.' });

  // Логіка подачі для check_lesson.js (рушій ці поля ігнорує)
  const RP = 'rule: passive (be + V3)', RB = 'rule: by vs with', RT = 'rule: time clauses (once, until, before + -ing)',
    RU = 'rule: purpose (so that, prevent from, in case)',
    TR1 = 'traps: upgrade · production', TR2 = 'traps: check · validate', TR3 = 'traps: outage · review', TR4 = 'traps: environment · build';
  const TEACHES = { g1a: [RP], g2a: [RB], g3a: [RT], g3a2: [RT], g3b: [RT], g4a: [RU], g4a2: [RU], g4b: [RU], t1: [TR1], t2: [TR2], t3: [TR3], t4: [TR4] };
  const NEEDS = {
    l1: [], l2: [], l3: [], l4: [],
    mA: [], qA1: [], qA2: [], qB1: [], mB: [], qB2: [], mC: [], qC1: [], qC2: [], mD: [], qD1: [], qD2: [],
    e31_1: [RP], e31_2: [RP], e31_5: [RP], e31_7: [RP], e31_3: [RP], e31_8: [RP], e31_4: [RP], e31_6: [RP],
    bw1: [RB], bw2: [RB], bw3: [RB],
    e32_1: [RT], e32_2: [RT], e32_3: [RT], e32_4: [RT], e32_5: [RT], e32_6: [RT],
    e33_1: [RU], g3q: [RT], e33_2: [RU], e33_3: [RU], e33_4: [RU], e33_5: [RU], e33_6: [RU],
    fm1: [RP], fm2: [RT], fm4: [RU], fm4fix: [RU], fm3: [RB], fm7: [RU],
    e35_1: [TR1], e35_2: [TR1], fm5: [TR1], e35_3: [TR2], e35_4: [TR2], fm6: [TR2],
    e35_5: [TR3], e35_6: [TR3], fm8: [TR3], fm8fix: [TR3], e35_7: [TR4], e35_8: [TR4], fmyou: [RP, RT, RU],
    r0: [], e36_1: [], e36_2: [], e36_3: [], r4q: [], e36_4: [], r6q: [], e36_5: [], r7q: [],
    e37_1: [], e37_2: [], e37_3: [], mR: [], e37_4: [], e37_5: [], e37_6: [], kq: [RP],
    a1: [], L1: [], L2: [], L3: [], L4: [], L5: [], L6: [], L7: [], L8: [], L9: [], L10: [], mL: [], rq: [],
    spA3: [RU], d1q: [], m39: [], e39_1: [RT], e39_3a: [], e39_3b: [], fx2: [], fx6: [RP]
  };
  S.forEach((s) => {
    if (TEACHES[s.id]) s.teaches = TEACHES[s.id];
    if (!['mcq', 'gap', 'open', 'match'].includes(s.type)) return;
    if (s.needs === undefined) s.needs = NEEDS[s.id] || [];
  });

  window.LESSON = {
    id: ID,
    title: 'Unit 3 · Continuous Delivery',
    known: ['code', 'test', 'tests', 'developer', 'server', 'database', 'website', 'release', 'version', 'feature', 'user', 'bug',
      'update', 'API', 'app', 'network', 'data', 'shift', 'approve', 'team', 'deployment'],
    slides: S
  };
})();

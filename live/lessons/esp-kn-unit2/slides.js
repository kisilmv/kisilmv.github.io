/* =========================================================================
   Unit 2 · Edge AI and Model Deployment: Where Inference Runs
   ESP · Комп'ютерні науки, 2 курс · B1+/B2
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Принципи: лексика вводиться ДО вправ, де вона потрібна; формати чергуються
   (не більше 3 однакових слайдів поспіль); кожен патерн «Say it in English»
   має розмовний приклад; аудіо — після читання, з підготовкою й завданнями.
   Послідовність: Lead-in · Лексика A–D з граматикою 1–4 і 2.1–2.4 · Пастки + 2.5 ·
   Reading · Listening · Dialogues · Speaking. Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const K = (s) => '<span class="muted">' + s + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  const blankN = (n) => '<span class="blank">' + n + '</span>';
  const EV = (en, uk) => '<span style="display:block;font-size:18px;line-height:1.4">💬 <i>' + en + '</i><br>' + K(uk) + '</span>';

  const PH = (f, alt, pos) => '<img src="lessons/esp-kn-unit2/' + f + '" alt="' + alt + '" style="display:block;width:100%;height:140px;object-fit:cover;object-position:' + (pos || '50% 50%') + ';border-radius:16px;margin-bottom:12px">';
  const S = [];
  const add = (o) => S.push(o);

  // «Say it in English»: українське речення → цільове → розмовний приклад з тим самим патерном
  const SAY = (id, n, uk, en, evEn, evUk) => add({ id: 's' + n, type: 'content', reveal: true,
    kicker: 'Say it in English · ' + n + '/14', title: uk,
    items: ['<b>' + en + '</b>', EV(evEn, evUk)] });

  // «Знайди помилку»: торкнутися хибної частини
  const FM = (id, n, sentence, parts) => add({ id, type: 'mcq', kicker: '2.4 · Find the mistake · ' + n + '/10',
    prompt: sentence + '<br><span class="muted">Tap the wrong part.</span>', options: parts });

  add({ id: 'title', type: 'title',
    kicker: 'Unit 2 · English for Computer Science',
    title: 'Edge AI and Model Deployment',
    subtitle: 'Where inference runs' });

  /* ---------- Lead-in ---------- */
  add({ id: 'l1', type: 'mcq', kicker: 'Lead-in · 1/4',
    prompt: PH('datacenter.jpg', 'A long corridor of server racks in a data center') + 'A team trains a model <b>once</b>. Then a <b>million users</b> use it every day.<br><b>Over a year, which costs more?</b>',
    options: ['training the model', 'serving it to the users', 'about the same'] });
  add({ id: 'l2', type: 'open', kicker: 'Lead-in · 2/4',
    prompt: PH('metro.jpg', 'A passenger on a subway train looking at her phone', '50% 35%') + 'Your app calls a model <b>over the network</b>. The user goes into a <b>tunnel</b>.<br><b>What breaks?</b> Name as many things as you can.',
    placeholder: 'The app can’t… / The user doesn’t get…' });
  add({ id: 'l3', type: 'mcq', kicker: 'Lead-in · 3/4',
    prompt: 'A <b>code-completion</b> feature in your editor.<br><b>Which is worse?</b>',
    options: ['a slow suggestion', 'a slightly wrong suggestion'] });
  add({ id: 'l4', type: 'mcq', kicker: 'Lead-in · 4/4',
    prompt: 'A <b>fraud check</b> in a banking app.<br><b>Which is worse now?</b>',
    options: ['a slow check', 'a slightly wrong check'] });

  /* ---------- Vocabulary A ---------- */
  const PLACES =
    '<svg viewBox="0 0 320 150" width="100%" role="img" aria-label="Three places where a model can run: a data center, a browser tab and a phone" style="display:block;max-width:420px">' +
    '<rect x="4" y="8" width="96" height="70" rx="12" style="fill:var(--surface-2);stroke:var(--line);stroke-width:2"/>' +
    '<rect x="112" y="8" width="96" height="70" rx="12" style="fill:var(--surface-2);stroke:var(--line);stroke-width:2"/>' +
    '<rect x="220" y="8" width="96" height="70" rx="12" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/>' +
    '<text x="52" y="38" text-anchor="middle" style="fill:var(--ink);font:700 15px system-ui,sans-serif">Data center</text>' +
    '<text x="52" y="60" text-anchor="middle" style="fill:var(--ink-2);font:13px system-ui,sans-serif">server</text>' +
    '<text x="160" y="38" text-anchor="middle" style="fill:var(--ink);font:700 15px system-ui,sans-serif">Browser tab</text>' +
    '<text x="160" y="60" text-anchor="middle" style="fill:var(--ink-2);font:13px system-ui,sans-serif">in between</text>' +
    '<text x="268" y="38" text-anchor="middle" style="fill:var(--ink);font:700 15px system-ui,sans-serif">Phone</text>' +
    '<text x="268" y="60" text-anchor="middle" style="fill:var(--accent);font:13px system-ui,sans-serif">edge device</text>' +
    '<path d="M268 84 C 268 128, 52 128, 52 84" style="fill:none;stroke:var(--ink-2);stroke-width:2;stroke-dasharray:5 4"/>' +
    '<text x="160" y="146" text-anchor="middle" style="fill:var(--ink-2);font:13px system-ui,sans-serif">request → answer: a round trip</text>' +
    '</svg>';
  add({ id: 'v0', type: 'content', kicker: 'Vocabulary · A', title: 'Where can a model run?', items: [
    PLACES,
    K('American spelling and pronunciation, as in industry documentation.')] });
  add({ id: 'vA1', type: 'content', kicker: 'Vocabulary · A · 1/2', title: 'Where inference runs', items: [
    term('edge device', '/ˈedʒ dɪˌvaɪs/', 'периферійний (кінцевий) пристрій'),
    term('on-device inference', '/ˌɑːn dɪˌvaɪs ˈɪnfərəns/', 'висновування на пристрої'),
    term('endpoint', '/ˈendpɔɪnt/', 'кінцева точка (служби)'),
    term('round trip', '/ˌraʊnd ˈtrɪp/', 'повний цикл «запит — відповідь»')] });
  add({ id: 'vA2', type: 'content', kicker: 'Vocabulary · A · 2/2', title: 'Where inference runs', items: [
    term('latency', '/ˈleɪtnsi/', 'затримка'),
    term('bandwidth', '/ˈbændwɪdθ/', 'ширина смуги пропускання'),
    term('deployment target', '/dɪˈplɔɪmənt ˌtɑːrɡət/', 'цільове середовище розгортання'),
    term('to scale to zero', '/ˌskeɪl tə ˈzɪroʊ/', 'масштабуватися до нуля')] });
  add({ id: 'vAq1', type: 'mcq', kicker: 'A · Quick check · 1/2',
    prompt: 'The phone answers the user <b>without the network</b>.<br><b>This is …</b>',
    options: ['an endpoint', 'a round trip', 'on-device inference', 'bandwidth'] });
  add({ id: 'vAq2', type: 'gap', kicker: 'A · Quick check · 2/2',
    instruction: 'Type the word.',
    prompt: 'No users at night, so the service shuts down all its servers. It can ___ to zero.',
    placeholder: 'one word' });

  /* ---------- Vocabulary B ---------- */
  add({ id: 'vB1', type: 'content', kicker: 'Vocabulary · B · 1/2', title: 'Performance and constraints', items: [
    term('inference', '/ˈɪnfərəns/', 'висновування, виконання моделі'),
    term('throughput', '/ˈθruːpʊt/', 'пропускна спроможність'),
    term('cold start', '/ˌkoʊld ˈstɑːrt/', 'холодний старт'),
    term('memory footprint', '/ˈmeməri ˌfʊtprɪnt/', 'обсяг займаної пам’яті')] });
  add({ id: 'vB2', type: 'content', kicker: 'Vocabulary · B · 2/2', title: 'Performance and constraints', items: [
    term('overhead', '/ˈoʊvərhed/', 'накладні витрати'),
    term('constraint', '/kənˈstreɪnt/', 'обмеження'),
    term('bottleneck', '/ˈbɑːtlnek/', 'вузьке місце'),
    term('cost per request', '/ˌkɔːst pər rɪˈkwest/', 'вартість одного запиту')] });
  add({ id: 'vBq1', type: 'mcq', kicker: 'B · Quick check · 1/2',
    prompt: 'The first request after a <b>quiet period</b> takes half a second longer.<br><b>This is a …</b>',
    options: ['bottleneck', 'memory footprint', 'cold start', 'constraint'] });
  add({ id: 'vBq2', type: 'mcq', kicker: 'B · Quick check · 2/2',
    prompt: 'The model is fast, but the <b>database</b> is slow, so everything waits for it.<br><b>The database is the …</b>',
    options: ['bottleneck', 'throughput', 'overhead', 'endpoint'] });

  /* ---------- Grammar · Rule 1 ---------- */
  add({ id: 'g0', type: 'end', kicker: 'Grammar',
    title: 'Comparing things',
    text: '…and paying for the difference' });
  add({ id: 'g1a', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 1/2',
    title: 'How big is the difference?',
    items: [
      '<b>Big:</b> much · far · significantly · considerably',
      '<b>Small:</b> slightly · marginally · a little',
      'This endpoint is <b>much faster</b> than the old one.<br>The new build is <b>slightly slower</b>.',
      '✅ <b>much</b> faster<br>❌ <b>very</b> faster'
    ] });
  add({ id: 'g1b', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 2/2',
    title: 'In everyday English',
    items: [
      EV('My new apartment is <b>much bigger</b> than the old one.', 'Моя нова квартира набагато більша за стару.'),
      EV('The coffee here is <b>slightly cheaper</b> than downtown.', 'Кава тут трохи дешевша, ніж у центрі.'),
      EV('This game is <b>far more fun</b> than the first one.', 'Ця гра значно цікавіша за першу.')
    ] });

  const C1 = 'Choose the word.';
  add({ id: 'e21_2', type: 'mcq', kicker: '2.1 · 1/8', prompt: C1 + '<br>Python, first released in 1991, is ___ slower than C in tight numeric loops.', options: ['slightly', 'far'] });
  add({ id: 'e21_4', type: 'mcq', kicker: '2.1 · 2/8', prompt: C1 + '<br>The first request after a quiet period is ___ slower than the ones that follow it.', options: ['much', 'slightly'] });
  add({ id: 'e21_7', type: 'mcq', kicker: '2.1 · 3/8', prompt: C1 + '<br>This endpoint is ___ faster than the previous one: by about ten milliseconds.', options: ['far', 'slightly'] });
  add({ id: 'e21_you', type: 'open', kicker: 'Rule 1 · Your turn',
    prompt: 'Compare <b>two things from your life</b>: two phones, two cafés, two cities…<br>Use <b>much / far</b> or <b>slightly</b>.',
    placeholder: 'My laptop is much… than…' });

  add({ id: 'e21_5', type: 'mcq', kicker: '2.1 · 4/8', prompt: C1 + '<br>Git, released in 2005, made branching ___ cheaper than in earlier version control systems.', options: ['far', 'marginally'] });
  add({ id: 'e21_6', type: 'mcq', kicker: '2.1 · 5/8', prompt: C1 + '<br>Running inference in the browser is ___ cheaper for the provider: the user’s hardware does the work.', options: ['slightly', 'significantly'] });
  /* ---------- Vocabulary C ---------- */
  add({ id: 'vC1', type: 'content', kicker: 'Vocabulary · C · 1/2', title: 'Making the model smaller', items: [
    term('quantization', '/ˌkwɑːntəˈzeɪʃn/', 'квантування'),
    term('pruning', '/ˈpruːnɪŋ/', 'обтинання (вилучення зв’язків)'),
    term('distillation', '/ˌdɪstəˈleɪʃn/', 'дистиляція (навчання меншої моделі)'),
    term('weights', '/weɪts/', 'вагові коефіцієнти')] });
  add({ id: 'vC2', type: 'content', kicker: 'Vocabulary · C · 2/2', title: 'Making the model smaller', items: [
    term('accuracy', '/ˈækjərəsi/', 'правильність'),
    term('model artifact', '/ˈmɑːdl ˌɑːrtəfækt/', 'артефакт моделі (файл для розгортання)'),
    term('to fine-tune', '/ˌfaɪn ˈtuːn/', 'донавчати, тонко налаштовувати'),
    term('integer · floating-point', '/ˈɪntɪdʒər/ · /ˌfloʊtɪŋ ˈpɔɪnt/', 'ціле число · з рухомою комою')] });
  add({ id: 'vCq', type: 'mcq', kicker: 'C · Quick check',
    prompt: 'A small <b>student</b> model learns to imitate a large <b>teacher</b> model.<br><b>This is …</b>',
    options: ['pruning', 'quantization', 'fine-tuning', 'distillation'] });

  add({ id: 'vX', type: 'content', kicker: 'Vocabulary · Words for the exercises', title: 'You will need these too', items: [
    term('cache · to cache', '/kæʃ/', 'кеш · кешувати'),
    term('embeddings', '/ɪmˈbedɪŋz/', 'векторні подання (ембединги)'),
    term('batch', '/bætʃ/', 'пакет (запитів, даних)'),
    term('build', '/bɪld/', 'збірка (програми)')] });

  add({ id: 'e21_1', type: 'mcq', kicker: '2.1 · 6/8', prompt: C1 + '<br>A distilled model is ___ cheaper to serve than the full one, often by an order of magnitude.<br>' + K('an order of magnitude = about ten times'), options: ['marginally', 'far'] });
  add({ id: 'e21_3', type: 'mcq', kicker: '2.1 · 7/8', prompt: C1 + '<br>An 8-bit quantized model is usually only ___ less accurate than the 32-bit original.', options: ['slightly', 'much'] });
  add({ id: 'e21_8', type: 'mcq', kicker: '2.1 · 8/8', prompt: 'Your opinion: caching the embeddings made search ___ faster.<br>' + K('Which word would you choose, and why?'), options: ['much', 'slightly'] });
  SAY('s2', 2, 'Дистильована модель набагато дешевша за повну.',
    'A distilled model is much (far) cheaper than the full one.',
    'The train is <b>far more comfortable</b> than the bus.', 'Потяг набагато зручніший за автобус.');

  /* ---------- Grammar · Rule 2 ---------- */
  add({ id: 'g2a', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 1/2',
    title: 'The more…, the more…',
    items: [
      '<b>the</b> + comparative, <b>the</b> + comparative<br>' + K('1st part: the condition · 2nd part: the result'),
      '<b>The smaller</b> the model, <b>the cheaper</b> the inference.',
      '<b>The further</b> the request travels, <b>the higher</b> the latency.'
    ] });
  add({ id: 'g2b', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 2/2',
    title: 'In everyday English',
    items: [
      EV('<b>The more</b> you practice, <b>the easier</b> it gets.', 'Що більше практикуєшся, то легше стає.'),
      EV('<b>The sooner, the better.</b>', 'Що швидше, то краще.'),
      EV('<b>The older</b> I get, <b>the less</b> I sleep.', 'Що старшим я стаю, то менше сплю.')
    ] });

  const J2 = (n, a, b) => 'Join the facts: <b>' + a + '</b> <b>' + b + '</b>';
  add({ id: 'e22_1', type: 'gap', kicker: '2.2 · 1/6',
    instruction: J2(1, 'The model is small.', 'The inference is cheap.') + '<br>Type both words: <b>1, 2</b>',
    prompt: 'The ' + blankN(1) + ' the model, the ' + blankN(2) + ' the inference.<br>1, 2 → ___', placeholder: 'word 1, word 2' });
  add({ id: 'e22_2', type: 'gap', kicker: '2.2 · 2/6',
    instruction: J2(2, 'The request travels far.', 'The latency is high.') + '<br>Type both words: <b>1, 2</b>',
    prompt: 'The ' + blankN(1) + ' the request travels, the ' + blankN(2) + ' the latency.<br>1, 2 → ___', placeholder: 'word 1, word 2' });
  add({ id: 'e22_3', type: 'gap', kicker: '2.2 · 3/6',
    instruction: J2(3, 'The batch is large.', 'The throughput is good.') + '<br>Type both words: <b>1, 2</b>',
    prompt: 'The ' + blankN(1) + ' the batch, the ' + blankN(2) + ' the throughput.<br>1, 2 → ___', placeholder: 'word 1, word 2' });
  SAY('s1', 1, 'Чим менша модель, тим дешевше її обслуговувати.',
    'The smaller the model, the cheaper it is to serve.',
    '<b>The longer</b> I sleep, <b>the more tired</b> I feel.', 'Що довше я сплю, то більше втомлююся.');
  SAY('s9', 9, 'Чим далі мандрує запит, тим вища ймовірність його перехоплення.',
    'The further a request travels, the more likely it is to be intercepted.',
    '<b>The later</b> you book, <b>the more expensive</b> the tickets get.', 'Що пізніше бронюєш, то дорожчі квитки.');
  add({ id: 'e22_4', type: 'mcq', kicker: '2.2 · 4/6',
    prompt: '<b>The project has many dependencies. The build is slow.</b><br>Which sentence is correct?',
    options: ['The more dependencies the project has, the slowest the build.', 'More dependencies the project has, the slower the build.', 'The more dependencies the project has, the slower the build.'] });
  add({ id: 'e22_5', type: 'mcq', kicker: '2.2 · 5/6',
    prompt: '<b>The cache is warm. The response is fast.</b><br>Which sentence is correct?',
    options: ['The warmer the cache, the faster the response.', 'The warmer the cache, the more fast the response.', 'The cache is warmer, the response is faster.'] });
  add({ id: 'e22_6', type: 'mcq', kicker: '2.2 · 6/6',
    prompt: '<b>The deadline is close. The testing is careless.</b><br>Which sentence is correct?',
    options: ['The closer the deadline, the carelesser the testing.', 'The closer the deadline, the more careless the testing.', 'The closest the deadline, the more careless the testing.'] });

  /* ---------- Vocabulary D ---------- */
  add({ id: 'vD1', type: 'content', kicker: 'Vocabulary · D · 1/2', title: 'Runtime and tooling', items: [
    term('runtime', '/ˈrʌntaɪm/', 'середовище виконання'),
    term('inference engine', '/ˈɪnfərəns ˌendʒɪn/', 'рушій висновування'),
    term('container', '/kənˈteɪnər/', 'контейнер'),
    term('dependency', '/dɪˈpendənsi/', 'залежність')] });
  add({ id: 'vD2', type: 'content', kicker: 'Vocabulary · D · 2/2', title: 'Runtime and tooling', items: [
    term('model registry', '/ˈmɑːdl ˌredʒɪstri/', 'реєстр моделей'),
    term('rollback', '/ˈroʊlbæk/', 'відкат (до попередньої версії)'),
    term('telemetry', '/təˈlemətri/', 'телеметрія'),
    term('benchmark', '/ˈbentʃmɑːrk/', 'еталонне випробування')] });
  add({ id: 'vDq1', type: 'mcq', kicker: 'D · Quick check · 1/2',
    prompt: 'Version 3.2 crashes, so the team goes back to version 3.1.<br><b>This is a …</b>',
    options: ['benchmark', 'rollback', 'model registry', 'container'] });
  add({ id: 'vDq2', type: 'gap', kicker: 'D · Quick check · 2/2',
    instruction: 'Type the word.',
    prompt: 'Data that a running app sends back about its own work: speed, errors, memory → ___',
    placeholder: 'one word' });

  /* ---------- Grammar · Rule 3 ---------- */
  add({ id: 'g3a', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 1/2',
    title: 'Paying for an advantage',
    items: [
      '<b>at the cost of</b> + noun / -ing<br><b>in exchange for</b> + noun / -ing',
      'We cut latency <b>at the cost of</b> accuracy.<br>… <b>at the cost of losing</b> accuracy.',
      EV('I finished the project on time <b>at the cost of</b> my weekend.', 'Я вчасно завершив проєкт ціною власних вихідних.'),
      '❌ at the cost of <b>lose</b>'
    ] });
  add({ id: 'g3b', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 2/2',
    title: 'Talking about compromise',
    items: [
      '<b>a trade-off between</b> X <b>and</b> Y',
      'There is always <b>a trade-off between</b> cost <b>and</b> latency.',
      '<b>to come at a price</b> = to have a hidden cost',
      EV('Cheap flights <b>come at a price</b>: no bags, no legroom.', 'Дешеві перельоти мають свою ціну: без багажу й без місця для ніг.')
    ] });

  add({ id: 'e23_1', type: 'gap', kicker: '2.3 · 1/6',
    instruction: 'Rewrite. We shrank the model, but we lost three percent of accuracy. <b>(at the cost of)</b>',
    prompt: 'We shrank the model at the cost of ___ three percent of accuracy.', placeholder: 'one word' });
  add({ id: 'e23_2', type: 'mcq', kicker: '2.3 · 2/6',
    prompt: 'You get instant responses, but you give up the largest model. <b>(in exchange for)</b><br>You get instant responses in exchange for …',
    options: ['give up the largest model.', 'giving up the largest model.', 'to give up the largest model.'] });
  add({ id: 'e23_3', type: 'gap', kicker: '2.3 · 3/6',
    instruction: 'Rewrite. Cost and latency pull in opposite directions here. <b>(a trade-off between)</b>',
    prompt: 'There is a trade-off ___ cost and latency here.', placeholder: 'one word' });
  add({ id: 'e23_4', type: 'mcq', kicker: '2.3 · 4/6',
    prompt: 'Scaling to zero saves money, but it is not free: the first request is slow. <b>(come at a price)</b><br>Scaling to zero saves money, but it ___: the first request is slow.',
    options: ['comes at price', 'costs at a price', 'comes at a price'] });
  SAY('s3', 3, 'Ми зменшили затримку ціною трьох відсотків правильності.',
    'We cut latency at the cost of three percent (three points) of accuracy.',
    'He got rich <b>at the cost of</b> his health.', 'Він розбагатів ціною власного здоров’я.');
  SAY('s5', 5, 'Завжди існує компроміс між вартістю й затримкою.',
    'There is always a trade-off between cost and latency.',
    'There’s always <b>a trade-off between</b> price <b>and</b> quality.', 'Завжди доводиться обирати між ціною та якістю.');
  add({ id: 'e23_5', type: 'gap', kicker: '2.3 · 5/6',
    instruction: 'Rewrite. The app works offline, but the download is twenty megabytes larger. <b>(at the cost of)</b>',
    prompt: 'The app works offline at the cost of a ___ that is twenty megabytes larger.', placeholder: 'one word' });
  add({ id: 'e23_6', type: 'mcq', kicker: '2.3 · 6/6',
    prompt: 'We can release on Friday if we drop the multilingual model. <b>(in exchange for)</b><br>We can release on Friday in exchange for …',
    options: ['dropping the multilingual model.', 'drop the multilingual model.', 'we drop the multilingual model.'] });

  /* ---------- Grammar · Rule 4 ---------- */
  add({ id: 'g4a', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 1/2',
    title: 'unlike or whereas?',
    items: [
      '<b>unlike</b> + noun / pronoun ' + K('(a preposition)'),
      '<b>Unlike a server</b>, a phone has strict memory limits.',
      '<b>whereas / while</b> + subject + verb ' + K('(a conjunction)'),
      '<b>Whereas a server has</b> plenty of memory, a phone does not.'
    ] });
  add({ id: 'g4b', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 2/2',
    title: 'In everyday English',
    items: [
      EV('<b>Unlike my brother</b>, I can’t stand coffee.', 'На відміну від брата, я терпіти не можу кави.'),
      EV('<b>Whereas my brother loves</b> coffee, I can’t stand it.', 'Тоді як мій брат любить каву, я її терпіти не можу.'),
      '❌ <b>Unlike a server has</b> plenty of memory, …'
    ] });
  add({ id: 'g4q1', type: 'mcq', kicker: 'Rule 4 · Quick check · 1/2',
    prompt: '___ a server, a phone has strict memory limits.',
    options: ['Whereas', 'Unlike'] });
  add({ id: 'g4q2', type: 'mcq', kicker: 'Rule 4 · Quick check · 2/2',
    prompt: '___ the cloud model needs the network, the device model works offline.',
    options: ['Whereas', 'Unlike'] });
  SAY('s4', 4, 'На відміну від суто хмарної схеми, цей застосунок працює без мережі.',
    'Unlike a purely cloud-based design, this app works without a network (offline).',
    '<b>Unlike most of my friends</b>, I don’t have a car.', 'На відміну від більшості друзів, я не маю авто.');

  /* ---------- 2.4 · Grammar mistakes ---------- */
  FM('e24_1', 1, 'Unlike a server has unlimited memory, a phone has strict limits.',
    ['Unlike a server has', 'unlimited memory,', 'a phone has strict limits']);
  FM('e24_2', 2, 'This endpoint is very faster than the previous one.',
    ['This endpoint is', 'very faster', 'than the previous one']);
  add({ id: 'e24_6', type: 'gap', kicker: '2.4 · Correct it · 3/10',
    instruction: '<s>He hard works on the deployment script.</s><br>Write the verb and the adverb in the right order.',
    prompt: 'He ___ on the deployment script.', placeholder: 'two words' });
  FM('e24_7', 4, 'The latency is more better after caching.',
    ['The latency is', 'more better', 'after caching']);
  FM('e24_8', 5, 'This approach is more efficient as the previous one.',
    ['This approach', 'is more efficient', 'as the previous one']);
  add({ id: 'e24_fix', type: 'open', kicker: '2.4 · Your turn',
    prompt: 'Choose <b>one</b> sentence from 2.4 and write it <b>correctly</b>.',
    placeholder: 'This endpoint is…' });

  /* ---------- Words that trick you ---------- */
  add({ id: 'tsec', type: 'end', kicker: 'Vocabulary',
    title: 'Words that trick you',
    text: 'Small words, big mistakes' });
  add({ id: 'w1', type: 'mcq', kicker: 'Quick review · 1/2',
    prompt: 'The ___ the request travels, the higher the latency.',
    options: ['far', 'further', 'furthest', 'more far'] });
  add({ id: 'w2', type: 'mcq', kicker: 'Quick review · 2/2',
    prompt: 'The first request after a quiet period is slow. This is a …',
    options: ['rollback', 'bottleneck', 'benchmark', 'cold start'] });

  /* ---------- Terminological traps, interleaved with 2.5 ---------- */
  const trap = (pair, uk, ex) => SM('<b>' + pair + '</b><br>' + K(uk) + '<br><i>' + ex + '</i>');
  const T25 = 'Choose the correct word.';
  add({ id: 't1', type: 'content', reveal: true, kicker: 'Traps · 1/4', title: 'Words that trick you', items: [
    trap('accuracy ≠ precision', 'accuracy — частка правильних відповідей · precision — частка істинно позитивних серед позитивних прогнозів; для чисел — розрядність',
      'We cut the precision of the weights to 8 bits and lost two percent of accuracy.'),
    trap('effective ≠ efficient', 'effective — дає потрібний результат · efficient — дає його з малими витратами',
      'Caching is an effective fix, and it makes the service more efficient.')] });
  add({ id: 'e25_1', type: 'mcq', kicker: '2.5 · 1/8', prompt: T25 + '<br>The new cache is ___: it delivers the same results using half the compute.', options: ['effective', 'efficient'] });
  add({ id: 'e25_2', type: 'mcq', kicker: '2.5 · 2/8', prompt: T25 + '<br>Cutting the ___ of the weights from 32 to 8 bits makes the artifact four times smaller.', options: ['accuracy', 'precision'] });
  add({ id: 'e25_8', type: 'mcq', kicker: '2.5 · 3/8', prompt: T25 + '<br>The measured ___ of the classifier was 94 percent on the held-out set.<br>' + K('held-out set = data the model did not see in training'), options: ['accuracy', 'precision'] });

  add({ id: 't2', type: 'content', reveal: true, kicker: 'Traps · 2/4', title: 'Words that trick you', items: [
    trap('actual ≠ current', 'actual — справжній, фактичний · «актуальний» = current, topical, relevant',
      'The current release is 3.2, but the actual load was higher than our estimates.'),
    trap('implement ≠ realize', '«реалізувати модуль» = implement, build · realize — усвідомлювати',
      'We implemented the retry logic once we realized how often the endpoint timed out.')] });
  add({ id: 'e25_3', type: 'mcq', kicker: '2.5 · 4/8', prompt: T25 + '<br>Our team will ___ the new retry logic in the next release.', options: ['implement', 'realize'] });
  add({ id: 'e25_4', type: 'mcq', kicker: '2.5 · 5/8', prompt: T25 + '<br>The ___ version of the runtime was published in March.', options: ['actual', 'current'] });
  SAY('s10', 10, 'Фактичне навантаження виявилося вищим, ніж показували наші оцінки.',
    'The actual load turned out to be higher than our estimates showed.',
    'The <b>actual</b> price was much higher than the ad said.', 'Справжня ціна була значно вищою, ніж ішлося в оголошенні.');
  SAY('s11', 11, 'Наша команда реалізує рівень кешування цього спринту.',
    'Our team is implementing the caching layer this sprint.',
    'I only <b>realized</b> at the station that I’d left my keys at home.', 'Лише на вокзалі я зрозумів, що залишив ключі вдома.');

  add({ id: 't3', type: 'content', reveal: true, kicker: 'Traps · 3/4', title: 'Words that trick you', items: [
    trap('software ≠ a service', 'software незлічуване: ніколи <b>softwares</b> · рахуємо: a piece of software, an application, a service',
      'We deployed three new services, not three new softwares.'),
    trap('ability ≠ possibility', '«можливість щось робити» = the ability / the opportunity to do · possibility + of + -ing',
      'The app has the ability to run offline; there is also a possibility of adding a second model.')] });
  add({ id: 'e25_5', type: 'mcq', kicker: '2.5 · 6/8', prompt: T25 + '<br>Local inference gives the app the ___ to work without a network.', options: ['ability', 'possibility'] });
  add({ id: 'e25_7', type: 'mcq', kicker: '2.5 · 7/8', prompt: T25 + '<br>We deployed three new ___ to the staging cluster.<br>' + K('staging cluster = servers for testing before release'), options: ['softwares', 'services'] });
  SAY('s12', 12, 'Цей застосунок має змогу працювати без з’єднання.',
    'This app has the ability to work without a connection (offline).',
    'Students here have <b>the opportunity to</b> study abroad for a semester.', 'Тутешні студенти мають змогу семестр навчатися за кордоном.');
  SAY('s13', 13, 'Ми розгорнули три нові сервіси на тестовому кластері.',
    'We deployed three new services to the staging cluster.',
    'I installed <b>three new apps</b> and one <b>piece of software</b> for my camera.', 'Я встановив три нові застосунки й одну програму для фотоапарата.');

  add({ id: 't4', type: 'content', reveal: true, kicker: 'Traps · 4/4', title: 'Words that trick you', items: [
    trap('technique ≠ technology', 'technique — прийом, спосіб · technology — технологія як галузь чи сукупність засобів',
      'Distillation is a technique; edge computing is a technology.'),
    trap('data · information', 'обидва незлічувані: ніколи <b>informations</b> · data: is або are, але послідовно',
      'The data is noisy. The information is stored in the registry.')] });
  add({ id: 'e25_6', type: 'mcq', kicker: '2.5 · 8/8', prompt: T25 + '<br>Distillation is a well-documented ___ for shrinking a model.', options: ['technique', 'technology'] });
  SAY('s8', 8, 'Дистиляція — це прийом, а не технологія.',
    'Distillation is a technique, not a technology.',
    'For me, cooking is <b>a hobby, not a chore</b>.', 'Для мене куховарство — це хобі, а не обов’язок.');

  /* ---------- 2.4 · Vocabulary mistakes ---------- */
  FM('e24_3', 6, 'We have the possibility to run the model in the browser.',
    ['We have', 'the possibility to run', 'the model in the browser']);
  FM('e24_4', 7, 'Serverless inference is a very actual topic in backend development.',
    ['Serverless inference is a very', 'actual topic', 'in backend development']);
  add({ id: 'e24_10', type: 'gap', kicker: '2.4 · Correct it · 8/10',
    instruction: '<s>The informations are stored in the model registry.</s><br>Correct the subject and the verb.',
    prompt: 'The ___ stored in the model registry.', placeholder: 'two words' });
  FM('e24_5', 9, 'Our team realized the caching layer last sprint.',
    ['Our team', 'realized the caching layer', 'last sprint']);
  FM('e24_9', 10, 'We shipped two new softwares this quarter.',
    ['We shipped two new softwares', 'this quarter']);

  /* ---------- Reading ---------- */
  add({ id: 'rv', type: 'content', kicker: 'Reading · Before you read', title: 'Four more words', items: [
    term('serverless', '/ˈsɜːrvərləs/', 'безсерверний (сервери орендуються лише на час запиту)'),
    term('an afterthought', '/ˈæftərθɔːt/', 'запізніла думка, щось другорядне'),
    term('jurisdiction · to comply', '/ˌdʒʊrɪsˈdɪkʃn/ · /kəmˈplaɪ/', 'юрисдикція · дотримуватися вимог'),
    term('dull', '/dʌl/', 'нудний, буденний')] });
  add({ id: 'r0', type: 'open', kicker: 'Reading · Predict',
    prompt: PH('phone.jpg', 'A smartphone with a glowing network pattern on a desk next to a laptop', '45% 60%') + 'The text is called <b>“Where the Model Runs”</b>.<br>It names <b>three places</b> where inference can run. Which three?',
    placeholder: 'on a…, in a…, on a…' });

  const PARA = [
    'Every machine-learning system has two bills. Training a model is a single, visible expense that appears once in a budget. <b>Inference</b> is charged every time somebody uses the product, and for anything with real users the cost of serving a model soon overtakes the cost of building it. That is why the question of where inference runs is an engineering decision rather than an <b>afterthought</b>.',
    'There are three usual answers: a server in a data center, the user’s own device, or something in between, such as a browser tab. A server gives you the largest model and the simplest deployment: one <b>artifact</b>, one <b>runtime</b>, one place to patch. But every request pays for a <b>round trip</b>, and <b>the further</b> the request travels, <b>the higher</b> the <b>latency</b>. <b>Serverless</b> functions make the bill smaller when traffic is irregular, <b>at the cost of</b> a <b>cold start</b>: the first request after a quiet period can be several hundred milliseconds slower than the ones that follow.',
    'Moving inference to the device changes the arithmetic completely. The provider stops paying per request, because the user’s hardware does the work. Responses arrive with no network delay, and the application keeps working on a train with no signal. Regulation sometimes settles the matter on its own: if personal data may not leave a particular <b>jurisdiction</b>, the simplest way to <b>comply</b> is to make sure it never leaves the phone.',
    'Nothing here is free. To fit into a phone or a browser tab, the model has to shrink. <b>Quantization</b> replaces 32-bit floating-point <b>weights</b> with 8-bit integers, cutting the artifact roughly fourfold. <b>Distillation</b> trains a smaller student model to imitate a larger teacher; the student is <b>much faster</b> and <b>considerably cheaper</b> to run, but usually <b>slightly less accurate</b>.',
    'Engineers therefore speak of <b>a trade-off between</b> size, speed, accuracy and cost: you buy one <b>at the cost of</b> another. The judgment lies in knowing which of the four a particular product can afford to lose. A code suggestion that is wrong one time in twenty is merely annoying; a fraud check with the same error rate is not.',
    'The choice is rarely permanent. Teams often start in the cloud, where iteration is fastest, and push the model outward only when the bill or the latency forces them to. Others do both: a small model on the device answers the easy cases immediately and hands the difficult ones to a larger model on the server. <b>Unlike</b> a purely cloud-based design, that arrangement degrades gracefully: when the network disappears, the product becomes worse rather than useless.',
    '<b>Whereas</b> the public conversation about artificial intelligence is dominated by the size of the newest model, most of the engineering work you will actually do concerns a <b>duller</b> question: which machine runs it, how often, and who pays for the electricity.'
  ];
  const RK = (i) => 'Reading · Where the Model Runs';
  const PN = ['1', '2', '3', '4 · 1/2', '4 · 2/2', '5', '6'];
  const PID = ['r1', 'r2', 'r3', 'r4', 'r4b', 'r5', 'r6'];
  const para = (i) => add({ id: PID[i], type: 'content', kicker: RK(i), title: 'Paragraph ' + PN[i] + ' of 6', items: [SM(PARA[i])] });

  para(0);
  add({ id: 'e26_1', type: 'mcq', kicker: '2.6 · 1/5', prompt: 'According to the text, for a product with real users …',
    options: ['training is always the larger expense.', 'serving eventually costs more than training.', 'the two costs stay roughly equal.', 'the cost depends only on the model size.'] });
  para(1);
  add({ id: 'e26_2', type: 'mcq', kicker: '2.6 · 2/5', prompt: 'A cold start is described as the price paid for …',
    options: ['moving inference to the device.', 'quantizing the weights.', 'scaling down when traffic is irregular.', 'distilling a smaller model.'] });
  para(2);
  add({ id: 'e26_3', type: 'mcq', kicker: '2.6 · 3/5', prompt: 'Data-protection rules are mentioned as a reason to …',
    options: ['keep the model in the data center.', 'process the data on the user’s device.', 'reduce the size of the artifact.', 'avoid distillation.'] });
  para(3);
  para(4);
  add({ id: 'r4q', type: 'mcq', kicker: 'Paragraph 4 · Check',
    prompt: 'Size, speed, accuracy, cost.<br>Which one can a <b>fraud check</b> NOT afford to lose?',
    options: ['size', 'speed', 'accuracy', 'cost'] });
  para(5);

  const HYB =
    '<svg viewBox="0 0 320 150" width="100%" role="img" aria-label="Hybrid design: a small model on the phone handles easy cases and sends hard cases to a large model on the server" style="display:block;max-width:420px">' +
    '<rect x="4" y="14" width="120" height="78" rx="12" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/>' +
    '<rect x="196" y="14" width="120" height="78" rx="12" style="fill:var(--surface-2);stroke:var(--line);stroke-width:2"/>' +
    '<text x="64" y="44" text-anchor="middle" style="fill:var(--ink);font:700 16px system-ui,sans-serif">Phone</text>' +
    '<text x="64" y="66" text-anchor="middle" style="fill:var(--ink-2);font:13px system-ui,sans-serif">small model</text>' +
    '<text x="64" y="84" text-anchor="middle" style="fill:var(--accent);font:13px system-ui,sans-serif">easy cases</text>' +
    '<text x="256" y="44" text-anchor="middle" style="fill:var(--ink);font:700 16px system-ui,sans-serif">Server</text>' +
    '<text x="256" y="66" text-anchor="middle" style="fill:var(--ink-2);font:13px system-ui,sans-serif">large model</text>' +
    '<text x="256" y="84" text-anchor="middle" style="fill:var(--ink-2);font:13px system-ui,sans-serif">hard cases</text>' +
    '<path d="M128 53 L188 53" style="stroke:var(--ink-2);stroke-width:2"/><path d="M182 47 L190 53 L182 59" style="fill:none;stroke:var(--ink-2);stroke-width:2"/>' +
    '<text x="160" y="124" text-anchor="middle" style="fill:var(--ink);font:600 14px system-ui,sans-serif">No network?</text>' +
    '<text x="160" y="144" text-anchor="middle" style="fill:var(--ink-2);font:13px system-ui,sans-serif">the app is worse, not useless</text>' +
    '</svg>';
  add({ id: 'rh', type: 'content', reveal: true, kicker: 'Reading · Paragraph 5', title: 'The hybrid design', items: [
    HYB,
    'The device model answers <b>the easy cases</b> at once.',
    'The difficult ones <b>go to the server</b>.',
    'No signal → the product <b>degrades gracefully</b>.'] });
  add({ id: 'e26_4', type: 'mcq', kicker: '2.6 · 4/5', prompt: 'In the hybrid arrangement, the device model …',
    options: ['replaces the server model entirely.', 'handles the straightforward cases.', 'is trained on the user’s data.', 'runs only when the network is available.'] });
  para(6);
  add({ id: 'e26_5', type: 'mcq', kicker: '2.6 · 5/5', prompt: 'The tone of the final paragraph is best described as …',
    options: ['alarmed.', 'ironic and dismissive.', 'quietly corrective.', 'nostalgic.'] });

  const FIND = 'Find a word or phrase in the text.';
  add({ id: 'e27_1', type: 'gap', kicker: '2.7 · 1/6', instruction: FIND, prompt: 'the delay affecting the first request after a period of inactivity → ___' });
  add({ id: 'e27_2', type: 'gap', kicker: '2.7 · 2/6', instruction: FIND, prompt: 'the packaged file that a trained model is deployed as → ___' });
  add({ id: 'e27_3', type: 'gap', kicker: '2.7 · 3/6', instruction: FIND, prompt: 'a complete journey from the client to the server and back → ___' });
  SAY('s7', 7, 'Холодний старт додає кілька сотень мілісекунд.',
    'A cold start adds several hundred milliseconds.',
    'The traffic <b>adds</b> half an hour to my commute.', 'Затори додають пів години до моєї дороги на роботу.');
  add({ id: 'e27_4', type: 'gap', kicker: '2.7 · 4/6', instruction: FIND, prompt: 'training a smaller model to imitate a larger one → ___' });
  add({ id: 'e27_5', type: 'gap', kicker: '2.7 · 5/6', instruction: FIND, prompt: 'to become gradually worse instead of failing completely → ___', placeholder: 'two words' });
  add({ id: 'e27_6', type: 'gap', kicker: '2.7 · 6/6', instruction: FIND, prompt: 'a situation in which you gain one thing by giving up another → ___' });

  /* ---------- Listening ---------- */
  add({ id: 'a0', type: 'end', kicker: 'Listening',
    title: 'A two-minute brief',
    text: 'The same topic, told for listeners.' });
  add({ id: 'a1', type: 'open', kicker: 'Listening · Before you listen · 1/3',
    prompt: 'Training is paid <b>once</b>. Inference is paid <b>every time</b>.<br>Think of an <b>everyday comparison</b>.',
    placeholder: 'Training is like…, inference is like…' });
  add({ id: 'a2', type: 'content', kicker: 'Listening · Before you listen · 2/3', title: 'Words from the audio', items: [
    term('a brief', '/briːf/', 'стислий огляд, брифінг'),
    term('kind of like · No way!', '/ˈkaɪnd əv laɪk/ · /ˌnoʊ ˈweɪ/', 'щось на кшталт · Та ні в якому разі!'),
    term('gas · cell signal ' + K('AmE'), '/ɡæs/ · /ˈsel ˌsɪɡnəl/', 'пальне · мобільний зв’язок'),
    term('to figure out · to afford', '/ˌfɪɡjər ˈaʊt/ · /əˈfɔːrd/', 'з’ясувати · дозволити собі')] });
  add({ id: 'a3', type: 'content', kicker: 'Listening · Before you listen · 3/3', title: 'While you listen', items: [
    '<b>1.</b> What <b>two everyday things</b> does the speaker compare training and inference to?',
    '<b>2.</b> Why do engineers move the model <b>onto the phone</b>? Two reasons.',
    '<b>3.</b> What happens to a hybrid app <b>on a train with no signal</b>?'] });
  add({ id: 'a4', type: 'end', kicker: 'Listening · 1st time',
    title: '🎧 Listen',
    text: 'Answer the three questions in your head.' });

  add({ id: 'L1', type: 'mcq', kicker: 'After listening · 1/9',
    prompt: 'The speaker says training is like …, and inference is like …',
    options: ['renting a car · paying for parking', 'buying a car · buying gas', 'buying gas · buying a car', 'building a road · driving on it'] });
  add({ id: 'L2', type: 'mcq', kicker: 'After listening · 2/9',
    prompt: 'Engineers move the model onto the phone to …',
    options: ['train it faster and make it bigger.', 'avoid quantization and distillation.', 'connect it to the cloud more often.', 'save money and ensure privacy.'] });
  add({ id: 'L3', type: 'mcq', kicker: 'After listening · 3/9',
    prompt: 'On a train with no signal, the hybrid app …',
    options: ['stops working.', 'gets slightly worse.', 'switches to the server model.', 'downloads a larger model.'] });
  add({ id: 'a5', type: 'end', kicker: 'Listening · 2nd time',
    title: '🎧 Listen again',
    text: 'Now catch the details: numbers, people, examples.' });
  add({ id: 'L4', type: 'gap', kicker: 'After listening · 4/9',
    instruction: 'Complete the speaker’s words.',
    prompt: 'Quantization changes 32-bit numbers into 8-bit integers to cut the size by ___.', placeholder: 'a number' });
  add({ id: 'L5', type: 'gap', kicker: 'After listening · 5/9',
    instruction: 'Complete the speaker’s question.',
    prompt: 'Would you rather have the slow, expensive ___ answer every question, or the quick, cheap student?', placeholder: 'one word' });
  add({ id: 'L6', type: 'mcq', kicker: 'After listening · 6/9',
    prompt: 'Text or audio? Which idea is in the <b>text</b> but <b>not</b> in the audio?',
    options: ['the cold start', 'the hybrid setup', 'serverless functions', 'the student and the teacher model'] });
  add({ id: 'L7', type: 'mcq', kicker: 'After listening · 7/9',
    prompt: 'The audio sounds <b>spoken</b>, the text sounds <b>written</b>.<br>Which phrase is from the <b>audio</b>?',
    options: ['rather than an afterthought', 'degrades gracefully', 'kind of like buying a car', 'settles the matter on its own'] });
  add({ id: 'L8', type: 'open', kicker: 'After listening · 8/9',
    prompt: 'Answer the speaker: <b>the professor or the student?</b><br>Choose for <b>one app</b> you use. Use <b>much / slightly</b> + comparative.',
    placeholder: 'For a… app, I’d take the…, because it is much…' });
  add({ id: 'L9', type: 'open', kicker: 'After listening · 9/9',
    prompt: 'The speaker explains with comparisons. <b>Your turn.</b><br>Finish: <b>A cold start is like …</b>',
    placeholder: 'A cold start is like…, because…' });

  /* ---------- Dialogues ---------- */
  const L = (who, t) => SM('<b>' + who + ':</b> ' + t);
  add({ id: 'd1a', type: 'content', kicker: 'Dialogue 1 · 1/2', title: 'Planning the deployment', items: [
    L('Kateryna', 'Have you decided how we’re serving the summarizer?'),
    L('Andrii', 'I was going to put it behind a serverless endpoint. The traffic is <b>spiky</b>.'),
    L('Kateryna', 'That works for the bill, but watch the cold starts. The first request can take half a second longer.'),
    L('Andrii', 'For the nightly job that’s fine. It’s the interactive path I’m worried about.')] });
  add({ id: 'd1b', type: 'content', kicker: 'Dialogue 1 · 2/2', title: 'Planning the deployment', items: [
    L('Kateryna', 'Then <b>keep one instance warm</b> for that route and let the rest scale to zero.'),
    L('Andrii', 'More expensive, but I think it’s a fair trade.'),
    L('Kateryna', '<b>Run the numbers</b> before the review, and bring the p95 latency, not the average.'),
    K('p95 latency = 95 percent of requests are faster than this')] });
  const M28 = 'Dialogue 1 · What does it mean?';
  add({ id: 'e28m_1', type: 'mcq', kicker: '2.8 · ' + M28 + ' · 1/3', prompt: '<b>spiky traffic</b>',
    options: ['traffic that is always very high', 'traffic with sudden, short peaks', 'traffic from attackers'] });
  add({ id: 'e28m_2', type: 'mcq', kicker: '2.8 · ' + M28 + ' · 2/3', prompt: '<b>to keep an instance warm</b>',
    options: ['to keep one copy of the service running, so it has no cold start', 'to cool down an overloaded server', 'to restart the service every hour'] });
  add({ id: 'e28m_3', type: 'mcq', kicker: '2.8 · ' + M28 + ' · 3/3', prompt: '<b>to run the numbers</b>',
    options: ['to run a benchmark on new hardware', 'to count how many users there are', 'to calculate the costs before deciding'] });

  add({ id: 'd2a', type: 'content', kicker: 'Dialogue 2 · 1/3', title: 'Explaining on-device inference', items: [
    L('Product manager', 'Why can’t we just call the API? It’s far less code.'),
    L('Developer', 'We could, but the feature would stop working offline, and half our users are on the metro.'),
    L('Product manager', 'How much worse is the on-device model?')] });
  add({ id: 'd2b', type: 'content', kicker: 'Dialogue 2 · 2/3', title: 'Explaining on-device inference', items: [
    L('Developer', 'Slightly less accurate: about three percent. But responses come back in forty milliseconds instead of three hundred.'),
    L('Product manager', 'And the cost?')] });
  add({ id: 'd2c', type: 'content', kicker: 'Dialogue 2 · 3/3', title: 'Explaining on-device inference', items: [
    L('Developer', 'We stop paying per request. The trade-off is the download: the model adds about twenty megabytes to the app.'),
    L('Product manager', 'That’s a real cost on a low-end phone. Let me <b>think it over</b>. Send me the numbers in writing.')] });
  add({ id: 'e28_1', type: 'open', kicker: '2.8 · Both dialogues',
    prompt: 'Find <b>three expressions</b> that describe a <b>compromise</b> or a <b>price paid</b> for an advantage.',
    placeholder: 'a fair trade, …' });
  add({ id: 'e28_3a', type: 'mcq', kicker: '2.8 · Hedging',
    prompt: 'The PM wants to call the API. The developer disagrees, but <b>softly</b>.<br>Which words soften the disagreement?',
    options: ['Why can’t we just…', 'We could, but…', 'And the cost?', 'Send me the numbers'] });
  add({ id: 'e28_3b', type: 'open', kicker: '2.8 · Hedging',
    prompt: 'Why does <b>“We could, but…”</b> work better than <b>“No, that’s wrong”</b>?',
    placeholder: 'Because the PM…' });

  /* ---------- Say it: the last two ---------- */
  SAY('s6', 6, 'Свій перший застосунок я написав ще на другому курсі.',
    'I wrote my first app back in my second year.',
    'I met my best friend <b>back in</b> first grade.', 'Свого найкращого друга я зустрів ще в першому класі.');
  SAY('s14', 14, 'Вузьке місце не в моделі, а в базі даних.',
    'The bottleneck isn’t the model, it’s the database.',
    'The problem <b>isn’t</b> the car, <b>it’s</b> the driver.', 'Проблема не в машині, а у водієві.');

  /* ---------- Speaking ---------- */
  add({ id: 'sp1', type: 'content', kicker: 'Speaking · One student at a time', title: 'Where should it run?', items: [
    PH('team.jpg', 'Two developers discussing a system diagram on a glass whiteboard', '45% 30%').replace('margin-bottom:12px', 'margin-bottom:0'),
    '<b>Listener:</b> a product manager · <b>Time:</b> 90 seconds',
    '<b>Goal:</b> recommend where the model for one feature should run, and say what it costs'] });
  add({ id: 'sp2', type: 'mcq', kicker: 'Speaking · Choose your feature',
    prompt: 'Which feature will you talk about?',
    options: ['an offline translator in a metro app', 'a fraud check in a banking app', 'code completion in an editor', 'photo search in a gallery app', 'a voice assistant in a car'] });
  add({ id: 'sp3', type: 'content', reveal: true, kicker: 'Speaking · Five moves', title: 'Your plan', items: [
    '<b>1.</b> <b>Recommend</b>: server, browser, device or hybrid.',
    '<b>2.</b> <b>Compare</b>: much / slightly + comparative.',
    '<b>3.</b> <b>Trade-off</b>: at the cost of / in exchange for.',
    '<b>4.</b> <b>Rule of thumb</b>: the …er, the …er.',
    '<b>5.</b> <b>Contrast</b>: unlike / whereas.'] });
  add({ id: 'sp4', type: 'content', kicker: 'Speaking · Useful phrases', title: 'You can say…', items: [
    'I’d recommend running it <b>on the device</b>, because…',
    'The cloud model is <b>slightly more accurate</b>, but <b>far slower</b> offline.',
    'We get offline mode <b>in exchange for</b> a larger download.',
    '<b>Unlike</b> a cloud-only design, this one keeps working in the metro.'] });
  add({ id: 'sp5', type: 'open', kicker: 'Speaking · Get ready',
    prompt: 'Move 3 is the hardest. Write your <b>trade-off</b> in one sentence.<br>Use <b>at the cost of</b> or <b>in exchange for</b>.',
    placeholder: 'We get… at the cost of…' });
  add({ id: 'sp6', type: 'content', kicker: 'Speaking · While you listen', title: 'Check the speaker', items: [
    'A clear <b>recommendation</b>?',
    '<b>much / far / slightly</b> + comparative?',
    '<b>at the cost of</b> or <b>in exchange for</b> + noun / -ing?',
    '<b>the …er, the …er</b>?',
    '<b>unlike</b> + noun or <b>whereas</b> + clause?'] });

  add({ id: 'end', type: 'end', kicker: 'Unit 2',
    title: 'Which machine runs it, how often, and who pays for the electricity?',
    text: 'That is most of the engineering work you will actually do.' });

  window.LESSON = {
    id: 'esp-kn-unit2',
    title: 'Unit 2 · Edge AI and Model Deployment',
    slides: S
  };
})();

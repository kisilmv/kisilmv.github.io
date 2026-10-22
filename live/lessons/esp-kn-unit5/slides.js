/* =========================================================================
   Unit 5 · APIs: Contracts Between Systems
   ESP · Комп'ютерні науки, 2 курс · B1+/B2
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Послідовність: Lead-in · Лексика A–D · Reading «Breaking the Contract» ·
   Grammar 1–4 (must / have to · mustn't ≠ don't have to · should / had better ·
   мова специфікацій) з вправами 5.2, 5.3, 5.5 і «Say it in English» ·
   Пастки (5.4) · Keyword drill · Speaking A–C · Final: brief a partner team.
   Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const ID = 'esp-kn-unit5';
  const K = (s) => '<span class="muted">' + s + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  const CODE = (s) => '<code style="font-size:.92em;background:var(--surface-2);padding:1px 5px;border-radius:6px">' + s + '</code>';
  // Фото вмикаються, щойно файл додано до списку HAVE
  const HAVE = [];
  const PH = (f, alt, pos, h) => HAVE.includes(f) ? '<img src="lessons/' + ID + '/' + f + '" alt="' + alt + '" style="display:block;width:100%;height:' + (h || 140) + 'px;object-fit:cover;object-position:' + (pos || '50% 50%') + ';border-radius:16px;margin-bottom:12px">' : '';
  const S = [];
  const add = (o) => S.push(o);

  // «Say it in English»: українське технічне речення → еталон → 💬 розмовне → його еталон
  const SAY = (n, uk, en, evEn, evUk) => add({ id: 'say' + n, type: 'content', reveal: true,
    kicker: 'Say it in English · ' + n + '/12', title: uk,
    items: ['<b>' + en + '</b>', ...EV(evEn, evUk)] });
  // «Знайди помилку» (5.5): торкнутися хибної частини
  const FM = (id, n, sentence, parts, ex) => add({ id, type: 'mcq', kicker: '5.5 · Find the mistake · ' + n + '/6',
    prompt: (ex ? K('<b>Example:</b> You <s>must to</s> log in. → You <b>must</b> log in.') + '<br><br>' : '') +
      sentence + '<br>' + K('Tap the wrong part.'), options: parts });

  add({ id: 'title', type: 'title',
    kicker: 'Unit 5 · English for Computer Science',
    title: 'APIs: Contracts Between Systems',
    subtitle: 'Rules, requirements and broken promises' });

  /* ---------- Lead-in ---------- */
  add({ id: 'l1', type: 'mcq', kicker: 'Lead-in · 1/3',
    prompt: PH('lead.jpg', 'A phone with a taxi app showing a city map at night', '50% 45%', 110) +
      'You open a <b>taxi app</b> and see a map.<br><b>Who made the map, in your opinion?</b>',
    options: ['the taxi company', 'a big map company, like Google or Apple', 'the phone maker', 'I’m not sure'] });
  add({ id: 'l2', type: 'mcq', kicker: 'Lead-in · 2/3',
    prompt: 'Your favorite app stops working <b>overnight</b>. The reason: another company changed the rules of its <b>API</b>.<br><b>Who is responsible?</b>',
    options: ['the developers of my app', 'the company that changed the rules', 'both companies', 'nobody — it just happens'] });
  add({ id: 'l3', type: 'open', kicker: 'Lead-in · 3/3',
    prompt: 'Name <b>one app</b> on your phone that shows <b>data from another company</b>.<br>Use: <i>… shows … from …</i><br>' + K('Example: Bolt shows maps from Google.'),
    placeholder: '… shows … from …' });

  /* ---------- Vocabulary A · Requests and responses ---------- */
  add({ id: 'v0', type: 'end', kicker: 'Vocabulary',
    title: 'How systems talk',
    text: 'Requests, responses, limits, versions and contracts' });
  add({ id: 'vA1', type: 'content', kicker: 'Vocabulary · A · 1/3', title: 'A. Requests and responses', items: [
    term('endpoint', '/ˈendpɔɪnt/', 'кінцева точка (адреса ресурсу API)'),
    term('request', '/rɪˈkwest/', 'запит (до сервера)'),
    term('response', '/rɪˈspɑːns/', 'відповідь (сервера)'),
    term('HTTP method', '/ˌeɪtʃ tiː tiː ˈpiː ˌmeθəd/', 'HTTP-метод: GET, POST, PUT, PATCH, DELETE')] });
  add({ id: 'vA2', type: 'content', kicker: 'Vocabulary · A · 2/3', title: 'A. Requests and responses', items: [
    term('status code', '/ˈsteɪtəs ˌkoʊd/', 'код стану: 200, 404 …'),
    term('payload', '/ˈpeɪloʊd/', 'корисне навантаження (дані в тілі запиту чи відповіді)'),
    term('JSON', '/ˈdʒeɪsən/', 'текстовий формат обміну даними'),
    term('resource', '/ˈriːsɔːrs/', 'ресурс (об’єкт, з яким працюють через API)')] });
  const ARROWS = '<svg viewBox="0 0 300 210" style="display:block;width:100%;max-width:300px;margin:4px auto">' +
    '<defs><marker id="ah5" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="var(--accent)"/></marker></defs>' +
    '<rect x="4" y="70" width="82" height="64" rx="12" fill="var(--surface-2)" stroke="var(--line)"/>' +
    '<text x="45" y="98" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">your</text><text x="45" y="117" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">app</text>' +
    '<rect x="214" y="70" width="82" height="64" rx="12" fill="var(--surface-2)" stroke="var(--line)"/>' +
    '<text x="255" y="107" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">server</text>' +
    '<line x1="90" y1="84" x2="208" y2="84" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#ah5)"/>' +
    '<line x1="210" y1="122" x2="92" y2="122" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#ah5)"/>' +
    '<text x="150" y="20" text-anchor="middle" font-size="13" fill="var(--ink-2)">request: method + endpoint</text>' +
    '<text x="150" y="40" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">GET /v1/orders/42</text>' +
    '<text x="150" y="160" text-anchor="middle" font-size="13" fill="var(--ink-2)">response: status code + payload</text>' +
    '<text x="150" y="180" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">200 OK · {"id": 42, "total": 18.5}</text>' +
    '<text x="150" y="202" text-anchor="middle" font-size="13" fill="var(--ink-2)">404 Not Found = no such resource</text></svg>';
  add({ id: 'vA3', type: 'content', kicker: 'Vocabulary · A · 3/3', title: 'One request, one response', items: [ARROWS,
    SM('The resource here is <b>order 42</b>. The payload is in <b>JSON</b>.')] });
  add({ id: 'mA', type: 'match', kicker: 'A · Match',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['endpoint', 'payload', 'status code', 'resource'],
    right: ['a number like 404', 'a secret password', 'order 42 itself', 'an address: /v1/orders', 'a list of rules', 'the data inside']
  });
  add({ id: 'qA1', type: 'mcq', kicker: 'A · Quick check · 1/2',
    prompt: 'You want to <b>read</b> order 42 and change nothing.<br><b>Which HTTP method?</b>',
    options: ['POST', 'DELETE', 'GET', 'PUT'] });
  add({ id: 'qA2', type: 'mcq', kicker: 'A · Quick check · 2/2',
    prompt: 'Your app asks for ' + CODE('/v1/orders/999') + '. The response is <b>404</b>.<br><b>What does it mean?</b>',
    options: ['Order 999 doesn’t exist.', 'Everything is OK.', 'The request was too long.', 'The JSON is broken.'] });

  /* ---------- Vocabulary B · Access and limits ---------- */
  add({ id: 'vB1', type: 'content', kicker: 'Vocabulary · B · 1/2', title: 'B. Access and limits', items: [
    term('API key', '/ˌeɪ piː ˈaɪ kiː/', 'ключ API'),
    term('client', '/ˈklaɪənt/', 'клієнт (програма, що надсилає запити)'),
    term('rate limit', '/ˈreɪt ˌlɪmɪt/', 'обмеження частоти запитів'),
    term('to throttle', '/ˈθrɑːtl/', 'обмежувати, сповільнювати (потік запитів)')] });
  add({ id: 'vB2', type: 'content', kicker: 'Vocabulary · B · 2/2', title: 'B. Access and limits', items: [
    term('to retry', '/ˌriːˈtraɪ/', 'повторювати спробу'),
    term('timeout', '/ˈtaɪmaʊt/', 'тайм-аут, гранична тривалість очікування'),
    term('pagination', '/ˌpædʒɪˈneɪʃn/', 'пагінація, посторінкова видача'),
    term('to cache', '/kæʃ/', 'кешувати ' + K('(sounds like cash)'))] });
  add({ id: 'mB', type: 'match', kicker: 'B · Match',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['rate limit', 'to retry', 'pagination', 'to cache'],
    right: ['to try again', 'to delete old data', 'results page by page', 'max requests per minute', 'to keep a copy', 'a faster server']
  });
  add({ id: 'qB1', type: 'mcq', kicker: 'B · Quick check · 1/3',
    prompt: 'The limit is <b>100 requests a minute</b>. Your app sends <b>500</b>.<br>The server <b>slows your app down</b>. It …',
    options: ['caches it.', 'throttles it.', 'retries it.', 'paginates it.'] });
  add({ id: 'qB2', type: 'gap', kicker: 'B · Quick check · 2/3',
    instruction: K('Example: The program that sends requests is the ___. → <b>client</b>') + '<br>One word.',
    prompt: 'The server didn’t answer for 30 seconds, so the client stopped waiting. That was a ___.', placeholder: 'one word' });
  add({ id: 'qB3', type: 'mcq', kicker: 'B · Quick check · 3/3',
    prompt: 'Every request carries a <b>long secret string</b> that tells the server which app is calling. It is …',
    options: ['a timeout', 'a rate limit', 'a status code', 'an API key'] });

  /* ---------- Vocabulary C · Change and compatibility ---------- */
  add({ id: 'vC1', type: 'content', kicker: 'Vocabulary · C · 1/2', title: 'C. Change and compatibility', items: [
    term('version', '/ˈvɝːʒn/', 'версія: v1, v2 …'),
    term('field', '/fiːld/', 'поле (у даних): "price", "id"'),
    term('breaking change', '/ˌbreɪkɪŋ ˈtʃeɪndʒ/', 'несумісна (руйнівна) зміна'),
    term('backward compatible', '/ˌbækwərd kəmˈpætəbl/', 'зворотно сумісний ' + K('(BrE also backwards)'))] });
  add({ id: 'vC2', type: 'content', kicker: 'Vocabulary · C · 2/2', title: 'C. Change and compatibility', items: [
    term('to deprecate', '/ˈdeprəkeɪt/', 'оголошувати застарілим (ще працює, але буде вилучене)'),
    term('sunset date', '/ˈsʌnset ˌdeɪt/', 'дата остаточного вимкнення'),
    term('changelog', '/ˈtʃeɪndʒlɔːɡ/', 'журнал змін'),
    term('to pin (a version)', '/pɪn/', 'закріплювати (версію)')] });
  add({ id: 'mC', type: 'match', kicker: 'C · Match',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['breaking change', 'sunset date', 'changelog', 'to pin a version'],
    right: ['a list of changes', 'the last working day', 'to keep one version', 'it breaks old code', 'the first release', 'to delete a version']
  });
  add({ id: 'qC1', type: 'mcq', kicker: 'C · Quick check · 1/3',
    prompt: 'The API renames the field ' + CODE('"price"') + ' to ' + CODE('"cost"') + '. Old apps still look for <b>"price"</b>.<br><b>This is …</b>',
    options: ['a changelog.', 'a breaking change.', 'a sunset date.', 'backward compatible.'] });
  add({ id: 'qC2', type: 'mcq', kicker: 'C · Quick check · 2/3',
    prompt: 'The API <b>adds a new field</b>, ' + CODE('"currency"') + '. Old apps ignore it and work as before.<br><b>The change is …</b>',
    options: ['a breaking change.', 'deprecated.', 'backward compatible.', 'pinned.'] });
  add({ id: 'qC3', type: 'gap', kicker: 'C · Quick check · 3/3',
    instruction: 'One word.',
    prompt: 'The v1 endpoint still works, but it will be removed next year. It is ___.', placeholder: 'one word' });

  /* ---------- Vocabulary D · The contract ---------- */
  add({ id: 'vD1', type: 'content', kicker: 'Vocabulary · D · 1/2', title: 'D. The contract', items: [
    term('provider', '/prəˈvaɪdər/', 'постачальник (сервісу, API)'),
    term('third-party', '/ˌθɝːd ˈpɑːrti/', 'сторонній'),
    term('to integrate', '/ˈɪntəɡreɪt/', 'інтегрувати, вбудовувати'),
    term('documentation', '/ˌdɑːkjəmenˈteɪʃn/', 'документація ' + K('(informal: docs)'))] });
  add({ id: 'vD2', type: 'content', kicker: 'Vocabulary · D · 2/2', title: 'D. The contract', items: [
    term('specification', '/ˌspesəfɪˈkeɪʃn/', 'специфікація'),
    term('requirement', '/rɪˈkwaɪərmənt/', 'вимога'),
    term('obligation', '/ˌɑːblɪˈɡeɪʃn/', 'обов’язок, зобов’язання'),
    term('webhook', '/ˈwebhʊk/', 'вебхук: сервер сам надсилає повідомлення на адресу клієнта')] });
  add({ id: 'mD', type: 'match', kicker: 'D · Match',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['provider', 'third-party', 'requirement', 'webhook'],
    right: ['from another company', 'a fast database', 'the company offering it', 'something you must do', 'a server calls you', 'a free app']
  });
  add({ id: 'qD1', type: 'mcq', kicker: 'D · Quick check · 1/4',
    prompt: 'Your app gives the payment service <b>its own URL</b>. When a payment succeeds, the service <b>calls that URL</b>.<br><b>This is …</b>',
    options: ['a webhook.', 'a rate limit.', 'a specification.', 'pagination.'] });
  add({ id: 'qD4', type: 'gap', kicker: 'D · Quick check · 2/4',
    instruction: 'Put the verb <b>integrate</b> into the past.',
    prompt: 'We ___ the payment service into our app in just two days.', placeholder: 'one word' });
  add({ id: 'qD2', type: 'mcq', kicker: 'D · Quick check · 3/4',
    prompt: 'A taxi app shows a Google map. For this app, Google is …',
    options: ['a client.', 'a third-party provider.', 'a requirement.', 'an endpoint.'] });
  add({ id: 'qD3', type: 'mcq', kicker: 'D · Quick check · 4/4',
    prompt: 'The client must follow the rules. But the provider has ___ too: for example, not to break old code without warning.',
    options: ['webhooks', 'endpoints', 'obligations', 'timeouts'] });

  /* ---------- Reading ---------- */
  add({ id: 'rsec', type: 'end', kicker: 'Reading',
    title: 'Breaking the Contract',
    text: 'One company broke its promise to developers. Another has kept it since 2011.' });
  add({ id: 'rv', type: 'content', kicker: 'Reading · Before you read', title: 'Four more words', items: [
    term('to charge (for)', '/tʃɑːrdʒ/', 'брати плату (за)'),
    term('to afford', '/əˈfɔːrd/', 'дозволити собі (фінансово)'),
    term('to object (to)', '/əbˈdʒekt/', 'заперечувати (проти)'),
    term('in advance', '/ɪn ədˈvæns/', 'заздалегідь')] });
  add({ id: 'rP', type: 'mcq', kicker: 'Reading · Predict',
    prompt: PH('dark.jpg', 'A phone on a desk with an app screen gone dark and a closed sign', '50% 50%', 110) +
      'In the text, a popular app <b>closes</b> because of an API. <b>Why?</b>',
    options: ['The provider started to charge a lot.', 'The provider made a breaking change.', 'The provider had a long outage.', 'The app broke the rate limit.'] });

  const PARA = [
    'Open a taxi app and you see a map, a price and a “Pay” button. Very little of this was built by the taxi company itself. The map comes from one <b>provider</b>, the payment from another, the text messages from a third. These <b>third-party</b> services are <b>integrated</b> through APIs — application programming interfaces. A modern web application is less a single program than a conversation between dozens of services, and every API is a promise about how that conversation will go.',
    'The promise is written down in the <b>documentation</b>. A typical REST API describes a set of <b>endpoints</b>, such as /v1/orders. The <b>client</b> sends a <b>request</b> with an <b>HTTP method</b> — GET to read a <b>resource</b>, POST to create one, PUT or PATCH to change it, DELETE to remove it — and the server returns a <b>response</b> with a <b>status code</b> and, usually, a <b>JSON payload</b>. A 200 means success, a 404 means the resource does not exist, and a 401 means the client has not proved who it is.',
    'The documentation also sets the rules. Every request <b>must include</b> an <b>API key</b>. A client <b>must not send</b> more than, say, 100 requests per minute: that is the <b>rate limit</b>. With <b>pagination</b>, a client <b>may ask</b> for fifty records at a time. Many <b>specifications</b> borrow their wording from RFC 2119, a short document from 1997 that defines exactly what MUST, SHOULD and MAY mean. MUST is a <b>requirement</b>. SHOULD is a strong recommendation: a client <b>should cache</b> data that rarely changes and <b>should set</b> a <b>timeout</b> instead of waiting forever. MAY is a real option.',
    'Rules work in both directions. If a client sends too many requests, the server <b>throttles</b> it and returns 429 Too Many Requests; a well-written client <b>has to wait</b> and <b>retry</b> later. But the provider has <b>obligations</b> too. Thousands of developers have written code that expects a <b>field</b> called “price” to be a number. If the provider renames that field or turns it into text, all that code breaks overnight. Such a change is called a <b>breaking change</b>, and good API teams take it almost as seriously as a security flaw.',
    'The most painful example of a broken promise came in 2023. In April, Reddit announced that it would start <b>charging</b> for its API, which had been free for years. At the end of May, Christian Selig, the developer of Apollo, a popular Reddit app for iPhone, learned what that meant: 12,000 dollars per 50 million requests. Apollo made about seven billion requests a month, so the bill would have been roughly 20 million dollars a year.',
    'The new prices started on July 1, about a month later. Selig <b>did not have to close</b> the app — in theory, he could have paid — but he could not <b>afford</b> it, and Apollo shut down on June 30. Reddit had every right to change its prices; what developers <b>objected to</b> was the speed. A month is not enough to rebuild a business.',
    'Compare that with Stripe, the payment company. According to a 2017 post by its engineers, Stripe has kept every <b>version</b> of its API working since the company started in 2011. Each account is <b>pinned</b> to the version that is current when it makes its first request, and versions are named by date, for example 2017-05-24.',
    'When Stripe makes a breaking change, it releases a new version, and old clients <b>do not have to upgrade</b> until they are ready. Adding a new endpoint or field <b>is allowed</b> at any time, because such changes are <b>backward compatible</b>: existing code keeps working. Stripe also sends <b>webhooks</b> — messages to the client’s own URL — when a payment succeeds, so clients <b>do not need to</b> keep asking.',
    'The basic rules are simple. You <b>must never remove</b> or rename a field without a new version. When you <b>deprecate</b> an endpoint, you <b>should announce</b> it months <b>in advance</b> and give a clear <b>sunset date</b>, the day it will stop working. You <b>had better keep</b> a <b>changelog</b>, or clients will discover your changes the hard way. And remember that an API is not just code: it is a contract with people who have built their work on top of yours.'
  ];
  const PN = ['1', '2', '3', '4', '5 · 1/2', '5 · 2/2', '6 · 1/2', '6 · 2/2', '7'];
  const PID = ['r1', 'r2', 'r3', 'r4', 'r5', 'r5b', 'r6', 'r6b', 'r7'];
  const para = (i) => add({ id: PID[i], type: 'content', kicker: 'Reading · Breaking the Contract', title: 'Paragraph ' + PN[i] + ' of 7', items: [SM(PARA[i])] });
  const RC = (n) => 'Reading · Check · ' + n + '/9';

  para(0);
  add({ id: 'c1', type: 'mcq', kicker: RC(1), prompt: 'How much of the taxi app did the taxi company build itself?',
    options: ['all of it', 'the map and the payment', 'very little of it', 'only the text messages'] });
  para(1);
  add({ id: 'c2', type: 'mcq', kicker: RC(2), prompt: 'The server returns <b>401</b>. According to the text, this means the client …',
    options: ['asked for a resource that doesn’t exist.', 'has not proved who it is.', 'sent too many requests.', 'received the data successfully.'] });
  para(2);
  add({ id: 'c3', type: 'mcq', kicker: RC(3), prompt: 'Many API documentation pages use the words of RFC 2119. What does <b>SHOULD</b> mean?',
    options: ['a requirement', 'a real option', 'a prohibition', 'a strong recommendation'] });
  para(3);
  add({ id: 'c4', type: 'mcq', kicker: RC(4), prompt: 'Which change would <b>break</b> thousands of clients overnight?',
    options: ['turning the field “price” into text', 'adding a new endpoint', 'returning 429 to a client that sends too much', 'fixing a typo in the documentation'] });
  para(4);
  add({ id: 'c5', type: 'gap', kicker: RC(5), instruction: 'Complete with a number from the text.',
    prompt: 'Apollo made about ___ billion requests a month.', placeholder: 'a number' });
  para(5);
  add({ id: 'c6', type: 'mcq', kicker: RC(6), prompt: 'What did developers object to most?',
    options: ['Reddit’s right to charge money', 'how fast the change came', 'the design of Apollo', 'the price of an iPhone'] });
  para(6);
  add({ id: 'c7', type: 'mcq', kicker: RC(7), prompt: 'A new Stripe account makes its first request today. Its version is …',
    options: ['always the newest one, updated every day.', 'version 1 from 2011.', 'the version that is current today.', 'chosen by Stripe at random.'] });
  para(7);
  add({ id: 'c8', type: 'mcq', kicker: RC(8), prompt: 'Why can Stripe add a new field <b>at any time</b>?',
    options: ['It is backward compatible: old code keeps working.', 'Stripe has no rate limit.', 'Clients are pinned to the newest version.', 'Webhooks tell clients about it.'] });
  para(8);
  add({ id: 'c9', type: 'mcq', kicker: RC(9), prompt: 'The main idea of the last paragraph: an API is …',
    options: ['just a piece of code.', 'a contract with people who depend on it.', 'too expensive for most teams.', 'safe if it has a changelog.'] });

  const FIND = 'Find a word or number in the text.';
  add({ id: 'f1', type: 'gap', kicker: 'Find it in the text · 1/4', instruction: K('Example: “success” as a status code → <b>200</b>') + '<br>' + FIND,
    prompt: 'the status code for “Too Many Requests” → ___', placeholder: 'a number' });
  add({ id: 'f2', type: 'gap', kicker: 'Find it in the text · 2/4', instruction: FIND,
    prompt: 'the year RFC 2119 was published → ___', placeholder: 'a year' });
  add({ id: 'mR', type: 'match', kicker: 'Before you read · Check',
    prompt: 'What does each word (1–4) mean in the text? Two options (a–f) are extra.',
    left: ['to charge', 'to afford', 'to object to', 'in advance'],
    right: ['to have enough money', 'to ask money for', 'to fill a battery', 'to say you disagree', 'before it happens', 'to make a copy'] });
  add({ id: 'f3', type: 'gap', kicker: 'Find it in the text · 3/4', instruction: FIND,
    prompt: 'the year Stripe started → ___', placeholder: 'a year' });
  add({ id: 'f4', type: 'gap', kicker: 'Find it in the text · 4/4', instruction: FIND + ' One word, last paragraph.',
    prompt: 'An API is not just code: it is a ___ with people.', placeholder: 'one word' });
  add({ id: 'rB', type: 'open', kicker: 'Reading · Back to the lead-in',
    prompt: '“Reddit had every right to change its prices.” <b>One sentence:</b> what should Reddit have done differently?<br>Use: <i>Reddit should have … in advance, because …</i><br>' + K('Ideas: announce it months earlier · give a sunset date · a lower price for small apps'),
    placeholder: 'Reddit should have … in advance, because …' });

  /* ---------- Grammar · Rule 1: must / have to / need to ---------- */
  add({ id: 'g0', type: 'end', kicker: 'Grammar',
    title: 'Rules, requirements and advice',
    text: 'must · have to · mustn’t · don’t have to · should · had better' });
  add({ id: 'g1a', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 1/3',
    title: 'Necessary: must · have to · need to', items: [
      SM('<b>must</b> = the rule comes from the speaker or the document<br>Every request <b>must include</b> an API key.'),
      SM('<b>have to</b> = the situation makes it necessary<br>If the server throttles it, the client <b>has to wait</b>.'),
      SM('<b>need to</b> = it is necessary, a bit softer<br>We <b>need to</b> update the docs.')] });
  add({ id: 'g1a2', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 2/3',
    title: 'Past and future: had to · will have to', items: [
      SM('<b>must</b> has no past or future form.'),
      SM('When v1 was switched off, we <b>had to rewrite</b> half of the client.'),
      SM('Next year, all clients <b>will have to</b> move to v3.'),
      SM('✅ we <b>had to</b> rewrite<br>❌ we <b>musted</b> rewrite · ❌ we <b>must</b> rewrote')] });
  add({ id: 'g1b', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 3/3',
    title: 'Now say it: everyday English', items: [
      ...EV('You <b>have to</b> show your ID at the entrance.', 'На вході треба показати посвідчення.'),
      ...EV('Yesterday I <b>had to</b> walk home — my phone was dead.', 'Учора мені довелося йти додому пішки — телефон розрядився.')] });
  const CH = 'Choose the correct option.';
  add({ id: 'e52_1', type: 'mcq', kicker: '5.2 · 1/8',
    prompt: K('Example: In a library, you ___ be quiet. → <b>must</b> (it is the rule)') + '<br>' + CH + '<br>Every request ___ include a valid API key; otherwise, the server returns 401.',
    options: ['may', 'must', 'should'] });
  SAY(1, 'Кожен запит має містити ключ API.',
    'Every request must include an API key.',
    'You <b>must</b> wear a helmet on a construction site.', 'На будівельному майданчику треба носити каску.');
  add({ id: 'e52_4', type: 'mcq', kicker: '5.2 · 2/8',
    prompt: CH + '<br>When the old version was switched off, we ___ rewrite half of our client.',
    options: ['must', 'should', 'had to'] });
  FM('fm2', 1, 'Last year we must migrate to version 2.', ['Last year', 'we must migrate', 'to version 2'], true);
  SAY(2, 'Коли стару версію вимкнули, нам довелося переписати половину клієнта.',
    'When the old version was switched off, we had to rewrite half of the client.',
    'I <b>had to</b> take a taxi because the last bus had left.', 'Мені довелося взяти таксі, бо останній автобус уже поїхав.');
  add({ id: 'g1g', type: 'gap', kicker: 'Rule 1 · Future',
    instruction: K('Example: Tomorrow we ___ (must) work late. → <b>will have to</b>') + '<br>Put <b>must</b> into the future.',
    prompt: 'After the sunset date, all clients ___ (must) use v3.', placeholder: 'three words' });
  SAY(3, 'Клієнтові доведеться зачекати й повторити запит пізніше.',
    'The client will have to wait and retry later.',
    'You’<b>ll have to</b> wait — the doctor is busy.', 'Вам доведеться зачекати — лікар зайнятий.');

  /* ---------- Grammar · Rule 2: mustn't ≠ don't have to ---------- */
  add({ id: 'gN', type: 'mcq', kicker: 'Grammar · Notice', discovery: true,
    prompt: 'From the text: “Old clients <b>do not have to</b> upgrade until they are ready.”<br><b>What does it mean?</b>',
    options: ['Old clients are not allowed to upgrade.', 'Old clients can upgrade later — it isn’t necessary now.'] });
  add({ id: 'g2a', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 1/3',
    title: 'mustn’t ≠ don’t have to', items: [
      SM('<b>must not / mustn’t</b> = it is not allowed ⛔<br>A client <b>mustn’t send</b> more than 100 requests a minute.'),
      SM('<b>don’t have to · don’t need to · needn’t</b> = it isn’t necessary, but you can 🙂<br>Old clients <b>don’t have to upgrade</b> until they are ready.'),
      SM('<b>needn’t</b> + verb, no <i>to</i>: You <b>needn’t send</b> the user ID.')] });
  add({ id: 'g2a2', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 2/3',
    title: '«не треба» = ⛔ or 🙂 ?', items: [
      SM('«Ключ <b>не треба</b> нікому показувати» ⛔<br>→ You <b>mustn’t</b> show the key to anyone.'),
      SM('«Ключ <b>не треба</b> надсилати двічі» 🙂<br>→ You <b>don’t have to / needn’t</b> send the key twice.')] });
  add({ id: 'g2b', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 3/3',
    title: 'Now say it: everyday English', items: [
      ...EV('You <b>don’t have to</b> come tomorrow — it’s a holiday.', 'Завтра можеш не приходити — вихідний.'),
      ...EV('But you <b>mustn’t</b> be late on Monday!', 'Але в понеділок не можна запізнюватися!')] });
  add({ id: 'e52_2', type: 'mcq', kicker: '5.2 · 3/8',
    prompt: CH + '<br>Pagination is optional: you ___ send the page parameter if you need only the first fifty records.',
    options: ['mustn’t', 'had better not', 'don’t have to'] });
  add({ id: 'e52_3', type: 'mcq', kicker: '5.2 · 4/8',
    prompt: CH + '<br>You ___ put your secret API key in front-end JavaScript — anyone can read it there.',
    options: ['mustn’t', 'don’t have to', 'needn’t'] });
  SAY(4, 'Не можна надсилати більше ніж сто запитів на хвилину.',
    'You mustn’t send more than 100 requests a minute.',
    'You <b>mustn’t</b> park here — it’s a bus stop.', 'Тут не можна паркуватися — це зупинка автобуса.');
  FM('fm1', 2, 'You don’t have to share your API key with anyone — keep it secret.', ['You don’t have to share', 'your API key with anyone', 'keep it secret']);
  add({ id: 'e52_7', type: 'mcq', kicker: '5.2 · 5/8',
    prompt: CH + '<br>Since version 2, you ___ send the user’s ID: the server reads it from the token.',
    options: ['must', 'mustn’t', 'needn’t'] });
  SAY(5, 'Старим клієнтам не обов’язково оновлюватися, доки вони не будуть готові.',
    'Old clients don’t have to upgrade until they’re ready.',
    'You <b>don’t have to</b> pay now — you can pay later.', 'Можна не платити зараз — заплатите пізніше.');
  const RW = (a, w) => 'Rewrite: <b>' + a + '</b> ' + K('(' + w + ')');
  SAY(6, 'Ідентифікатор користувача надсилати не потрібно: сервер бере його з токена.',
    'You needn’t send the user ID: the server reads it from the token.',
    'You <b>needn’t</b> bring anything — we have plenty of food.', 'Нічого не принось — їжі в нас удосталь.');
  FM('fm6', 3, 'Clients mustn’t upgrade until they are ready; old versions keep working.', ['Clients mustn’t upgrade', 'until they are ready;', 'old versions keep working']);

  /* ---------- Grammar · Rule 3: should / ought to / had better ---------- */
  add({ id: 'g3a', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 1/3',
    title: 'Advice: should · ought to · had better', items: [
      SM('<b>should</b> = a good idea, the usual word<br>A client <b>should cache</b> data that rarely changes.'),
      SM('<b>ought to</b> = the same, more formal and rarer<br>You <b>ought to set</b> a timeout.')] });
  add({ id: 'g3a2', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 2/3',
    title: 'Advice + warning: had better', items: [
      SM('<b>had better (’d better)</b> = advice + warning: or something bad happens<br>You<b>’d better add</b> a retry, <b>or</b> the app will crash on every 429.'),
      SM('✅ you’d better <b>add</b> · ❌ you’d better <b>to add</b><br>' + K('had better is about now, not the past'))] });
  add({ id: 'g3b', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 3/3',
    title: 'Now say it: everyday English', items: [
      ...EV('You <b>should</b> try this pizza place — it’s great.', 'Тобі варто сходити в цю піцерію — вона чудова.'),
      ...EV('We<b>’d better</b> leave now, <b>or</b> we’ll miss the train.', 'Нам краще вийти зараз, бо спізнимося на потяг.')] });
  add({ id: 'e52_5', type: 'mcq', kicker: '5.2 · 6/8',
    prompt: CH + '<br>Clients ___ cache the list of countries; it changes maybe once a year.',
    options: ['should', 'mustn’t', 'had to'] });
  SAY(7, 'Клієнтам варто кешувати дані, які рідко змінюються.',
    'Clients should cache data that rarely changes.',
    'You <b>should</b> see a doctor about that cough.', 'Тобі варто показатися лікареві з цим кашлем.');
  add({ id: 'e52_6', type: 'mcq', kicker: '5.2 · 7/8',
    prompt: CH + '<br>The demo starts in ten minutes. We ___ fix the timeout now, or the app will freeze on stage.',
    options: ['don’t have to', 'had better', 'had to'] });
  SAY(8, 'Краще додай повторну спробу, бо застосунок падатиме на кожній помилці 429.',
    'You’d better add a retry, or the app will crash on every 429.',
    'You’<b>d better</b> take an umbrella, <b>or</b> you’ll get wet.', 'Краще візьми парасольку, бо змокнеш.');
  FM('fm3', 4, 'You had better to add a retry, or the app will crash.', ['You had better to add', 'a retry,', 'or the app will crash']);

  /* ---------- Grammar · Rule 4: the language of specifications ---------- */
  add({ id: 'g4a', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 1/3',
    title: 'Spec language: RFC 2119', items: [
      SM('<b>MUST</b> = a requirement · <b>MUST NOT</b> = not allowed'),
      SM('<b>SHOULD / SHOULD NOT</b> = strongly recommended / not recommended'),
      SM('<b>MAY</b> (or <b>OPTIONAL</b>) = a real choice'),
      SM('With the passive (Unit 3): The API key <b>must be sent</b> in the header. Responses <b>may be cached</b> for 60 seconds.')] });
  add({ id: 'g4a2', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 2/3',
    title: 'Formal phrases', items: [
      SM('<b>be required to</b> = must<br>Clients <b>are required to</b> use HTTPS.'),
      SM('<b>be (not) allowed to</b> = may / mustn’t<br>Clients <b>are not allowed to</b> share keys.'),
    ] });
  add({ id: 'g4a3', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 3/3',
    title: 'be supposed to', items: [
      SM('<b>be supposed to</b> = the rule says so, but it often doesn’t happen<br>The “price” field <b>is supposed to</b> be a number, but yesterday it came as text.'),
      ...EV('The train <b>is supposed to</b> arrive at six, but it’s always late.', 'Потяг мав би прибувати о шостій, але завжди запізнюється.')] });
  add({ id: 'm4', type: 'match', kicker: 'Rule 4 · Match',
    prompt: 'What does each spec word (1–4) mean in plain English? Two options (a–f) are extra.',
    left: ['MUST', 'MUST NOT', 'SHOULD', 'MAY'],
    right: ['you had to', 'you can choose', 'you have to', 'it’s a good idea', 'you’d better not ask', 'you aren’t allowed to'] });
  add({ id: 'e53_1', type: 'gap', kicker: '5.3 · Spec → plain English · 1/6',
    instruction: K('Example: Users MUST NOT log in twice. → You <b>aren’t allowed to</b> log in twice.') + '<br>Rewrite this line from the specification ' + K('(have to · two words)') + ':<br><b>Clients MUST send the API key in the Authorization header.</b>',
    prompt: 'You ___ send the API key in the Authorization header.', placeholder: 'two words' });
  add({ id: 'e53_4', type: 'mcq', kicker: '5.3 · Spec → plain English · 2/6',
    prompt: RW('The page parameter is OPTIONAL.', 'don’t have to') + '<br>You …',
    options: ['don’t have to send the page parameter.', 'mustn’t send the page parameter.', 'don’t have to sending the page parameter.'] });
  add({ id: 'e53_2', type: 'gap', kicker: '5.3 · Spec → plain English · 3/6',
    instruction: RW('Clients MUST NOT share API keys between applications.', 'aren’t allowed to'),
    prompt: 'You aren’t allowed to ___ API keys between applications.', placeholder: 'one word' });
  SAY(9, 'Ключ API треба передавати в заголовку.',
    'The API key must be sent in the header.',
    'The form <b>must be signed</b> by both parents.', 'Форму мають підписати обоє батьків.');
  add({ id: 'e53_6', type: 'mcq', kicker: '5.3 · Spec → plain English · 4/6',
    prompt: RW('Since v3, the user_id parameter is NOT REQUIRED.', 'needn’t') + '<br>Since v3, you ___ the user_id parameter.',
    options: ['needn’t to send', 'needn’t send', 'mustn’t send'] });
  add({ id: 'e53_3', type: 'gap', kicker: '5.3 · Spec → plain English · 5/6',
    instruction: RW('Clients SHOULD retry after the time given in the Retry-After header.', 'ought to'),
    prompt: 'You ought ___ retry after the time given in the Retry-After header.', placeholder: 'one word' });
  add({ id: 'e53_5', type: 'gap', kicker: '5.3 · Spec → plain English · 6/6',
    instruction: RW('Responses SHOULD NOT be cached for longer than 60 seconds.', 'shouldn’t'),
    prompt: 'You ___ cache responses for longer than 60 seconds.', placeholder: 'one word' });
  add({ id: 'e4p', type: 'gap', kicker: 'Rule 4 · Passive',
    instruction: K('Example: Logs MUST be kept for a year. → Logs <b>must be</b> kept for a year.') + '<br>Responses MAY be cached for 60 seconds.',
    prompt: 'Responses ___ cached for 60 seconds.', placeholder: 'two words' });
  add({ id: 'e52_8', type: 'mcq', kicker: '5.2 · 8/8',
    prompt: CH + '<br>According to the docs, the “price” field ___ be a number, but yesterday it came as text.',
    options: ['mustn’t', 'is supposed to', 'doesn’t have to'] });
  SAY(10, 'Поле «price» мало б бути числом, але вчора прийшло текстом.',
    'The “price” field is supposed to be a number, but yesterday it came as text.',
    'I’m <b>supposed to</b> be on a diet, but I just ate a whole cake.', 'Я ніби на дієті, але щойно з’їв цілий торт.');

  /* ---------- Traps + 5.4 + 5.5 ---------- */
  add({ id: 'tsec', type: 'end', kicker: 'Vocabulary',
    title: 'Words that trick you',
    text: 'Same Ukrainian word, different English words' });
  const trap = (pair, uk, ex) => SM('<b>' + pair + '</b><br>' + K(uk) + '<br><i>' + ex + '</i>');
  const T54 = 'Choose the correct word.';
  add({ id: 't1', type: 'content', reveal: true, kicker: 'Traps · 1/3', title: 'Words that trick you', items: [
    trap('response ≠ answer', '«відповідь сервера» = response · answer — відповідь людини на запитання',
      'The server sent a 200 response; she didn’t answer my email.'),
    trap('request ≠ query', '«запит» до сервера через API = request · query — запит до бази даних, пошуковий запит',
      'The app sends a request to the API; the API runs a query on the database.')] });
  add({ id: 'e54_1', type: 'mcq', kicker: '5.4 · 1/6', prompt: T54 + '<br>The server sent a 404 ___.', options: ['answer', 'response'] });
  add({ id: 'e54_2', type: 'mcq', kicker: '5.4 · 2/6', prompt: T54 + '<br>This SQL ___ takes four seconds; we need an index.', options: ['query', 'request'] });
  add({ id: 'fm4', type: 'gap', kicker: '5.5 · Correct it · 5/6',
    instruction: '<s>The server returned an answer with status code 200.</s><br>Replace the wrong word.',
    prompt: 'The server returned a ___ with status code 200.', placeholder: 'one word' });
  add({ id: 't2', type: 'content', reveal: true, kicker: 'Traps · 2/3', title: 'Words that trick you', items: [
    trap('call ≠ challenge', '«виклик API» = API call · challenge — складне завдання, виклик долі',
      'Each API call costs a fraction of a cent; scaling is a real challenge.'),
    trap('current ≠ actual', '«актуальна версія» = the current (latest) version · actual — справжній, фактичний',
      'Use the current version; the actual cost was twice the estimate.')] });
  add({ id: 'e54_3', type: 'mcq', kicker: '5.4 · 3/6', prompt: T54 + '<br>Each API ___ costs a fraction of a cent.', options: ['challenge', 'call'] });
  add({ id: 'e54_4', type: 'mcq', kicker: '5.4 · 4/6', prompt: T54 + '<br>Please use the ___ version of the library, 5.1.', options: ['current', 'actual'] });
  add({ id: 'fm5', type: 'gap', kicker: '5.5 · Correct it · 6/6',
    instruction: '<s>Please download the actual version of the library.</s><br>Replace the wrong word.',
    prompt: 'Please download the ___ version of the library.', placeholder: 'one word' });
  SAY(11, 'Кожен виклик API коштує частку цента.',
    'Every API call costs a fraction of a cent.',
    'I got a <b>call</b> from my bank this morning.', 'Сьогодні вранці мені дзвонили з банку.');
  add({ id: 't3', type: 'content', reveal: true, kicker: 'Traps · 3/3', title: 'Words that trick you', items: [
    trap('deprecated ≠ obsolete', 'deprecated — ще працює, але не рекомендовано й буде вилучено · obsolete — уже не вживається',
      'The v1 endpoint is deprecated; floppy disks are obsolete.'),
    trap('client ≠ customer', '«клієнт API» = client (програма) · customer — покупець, замовник',
      'The mobile app is our main client; our customers pay monthly.')] });
  add({ id: 'e54_5', type: 'mcq', kicker: '5.4 · 5/6', prompt: T54 + '<br>The v1 endpoint is ___: it still works, but it will be removed in March.', options: ['obsolete', 'deprecated'] });
  add({ id: 'e54_6', type: 'mcq', kicker: '5.4 · 6/6', prompt: T54 + '<br>Our main ___ is the mobile app that sends requests to the API.', options: ['client', 'customer'] });
  SAY(12, 'Завантажте актуальну версію бібліотеки.',
    'Download the current version of the library.',
    'What’s the <b>current</b> price of gas?', 'Яка зараз ціна на бензин?');

  /* ---------- Keyword drill ---------- */
  add({ id: 'k0', type: 'content', kicker: 'Keyword drill', title: 'Build the sentence', items: [
    'You see only the <b>keywords</b> from the text, in the right order.',
    'Add articles and prepositions. Choose the tense and the <b>modal verb</b>.',
    'Say your sentence → compare → repeat the target 3 times.'] });
  const KW = [
    ['map · come · one · provider · payment · another · text message · third',
      'The <b>map comes</b> from <b>one provider</b>, the <b>payment</b> from <b>another</b>, the <b>text messages</b> from a <b>third</b>.',
      'Карта надходить від одного постачальника, оплата — від іншого, текстові повідомлення — від третього.'],
    ['client · must not · send · more than · 100 requests · minute',
      'A <b>client must not send more than 100 requests</b> per <b>minute</b>.',
      'Клієнт не має права надсилати понад сто запитів на хвилину.'],
    ['if · provider · rename · field · all · code · break · overnight',
      '<b>If</b> the <b>provider renames</b> the <b>field</b>, <b>all</b> that <b>code breaks overnight</b>.',
      'Якщо постачальник перейменує поле, увесь цей код за ніч перестане працювати.'],
    ['Apollo · make · seven billion · request · month',
      '<b>Apollo made</b> about <b>seven billion requests</b> a <b>month</b>.',
      'Apollo робив близько семи мільярдів запитів на місяць.'],
    ['old · client · not · have to · upgrade · until · ready',
      '<b>Old clients</b> do <b>not have to upgrade until</b> they are <b>ready</b>.',
      'Старим клієнтам не обов’язково оновлюватися, доки вони не будуть готові.'],
    ['API · not · just · code · contract · people',
      'An <b>API</b> is <b>not just code</b>: it is a <b>contract</b> with <b>people</b>.',
      'API — це не просто код, а договір із людьми.']
  ];
  const kw = (i) => add({ id: 'k' + (i + 1), type: 'content', reveal: true,
    kicker: 'Keyword drill · ' + (i + 1) + '/6', title: KW[i][0], items: [KW[i][1], K(KW[i][2])] });
  kw(0); kw(1); kw(2);
  add({ id: 'kq', type: 'mcq', kicker: 'Keyword drill · Halfway',
    prompt: 'What was <b>hardest</b> so far?',
    options: ['the modal verb (must not)', 'the tense (renames, breaks)', 'articles: a / the', 'prepositions (from, per)'] });
  kw(3); kw(4); kw(5);

  /* ---------- Speaking A · Spec → plain English chain (paraphrase) ---------- */
  add({ id: 'sp0', type: 'end', kicker: 'Speaking',
    title: 'Talk like an API team',
    text: 'Three short tasks, then a briefing for a partner team' });
  add({ id: 'spA1', type: 'content', reveal: true, kicker: 'Speaking A · Paraphrase chain', format: 'paraphrase',
    title: 'One rule, two ways', items: [
      'The teacher opens <b>one line from the docs</b>.',
      '<b>Student 1</b> says it in plain English: <i>have to · mustn’t · don’t have to · should</i>',
      '<b>Student 2</b> says the same rule <b>another way</b>: <i>be required to · aren’t allowed to · needn’t · ought to · ’d better</i>'] });
  add({ id: 'spA2', type: 'content', kicker: 'Speaking A · Example', title: 'How it sounds', items: [
    SM('<b>Docs:</b> ' + CODE('Clients MUST NOT log passwords.')),
    SM('<b>Student 1:</b> <i>You <b>mustn’t</b> write passwords to the logs.</i>'),
    SM('<b>Student 2:</b> <i>You <b>aren’t allowed to</b> log passwords — you’d better check your logger.</i>')] });
  add({ id: 'spA3', type: 'content', reveal: true, kicker: 'Speaking A · One student at a time', title: 'Lines from the docs', items: [
    SM('📄 <b>1.</b> ' + CODE('Clients MUST use HTTPS.')),
    SM('📄 <b>2.</b> ' + CODE('Clients MUST NOT send more than 10 requests per second.')),
    SM('📄 <b>3.</b> ' + CODE('The limit parameter is OPTIONAL. Default: 50.')),
    SM('📄 <b>4.</b> ' + CODE('Clients SHOULD cache /countries for 24 hours.'))] });
  add({ id: 'spA4', type: 'mcq', kicker: 'Speaking A · Listeners',
    prompt: 'Line 3: which pattern did <b>Student 2</b> use?',
    options: ['needn’t', 'don’t need to', 'aren’t required to', 'a different pattern'] });

  /* ---------- Speaking B · A junior developer asks (cued answers) ---------- */
  add({ id: 'spB1', type: 'content', kicker: 'Speaking B · Questions from a junior', format: 'cued-answers',
    title: '“Do I have to…?”', items: [
      PH('junior.jpg', 'A young developer asking a senior colleague a question at a desk with two monitors', '50% 40%', 96) + SM('<b>The teacher</b> is a junior developer. <b>One student at a time</b> answers one question.'),
      SM('<b>Use the facts on the card.</b> Start with one frame:'),
      SM('<i>No, you don’t have to …, but you should …</i><br><i>No! You mustn’t …, because …</i><br><i>Yes, you have to … . Otherwise, …</i>')] });
  add({ id: 'spB2', type: 'content', kicker: 'Speaking B · Example', title: 'How it sounds', items: [
    SM('<b>Junior:</b> “Do I have to add a timeout?” ' + K('Facts: no timeout by default · the server sometimes hangs')),
    SM('<b>You:</b> <i>Yes, you <b>have to</b> add one. <b>Otherwise</b>, the app will wait forever when the server hangs. Ten seconds <b>should</b> be enough.</i>')] });
  add({ id: 'spB3', type: 'content', reveal: true, kicker: 'Speaking B · One student at a time', title: 'The junior asks…', items: [
    SM('❓ <b>1.</b> “Do I have to send the <b>page</b> parameter?”<br>' + K('optional · default: first 50 records')),
    SM('❓ <b>2.</b> “Can I put the API key in the JavaScript file?”<br>' + K('secret · anyone can read front-end code · keep it on the server')),
  ] });
  add({ id: 'spB3b', type: 'content', reveal: true, kicker: 'Speaking B · One student at a time', title: 'The junior asks…', items: [
    SM('❓ <b>3.</b> “I got a <b>429</b>. Do I just send it again right away?”<br>' + K('rate limit · Retry-After: 30 seconds')),
    SM('❓ <b>4.</b> “Do I have to move to <b>v3</b> today?”<br>' + K('v2 works until March 31 · v3 renames “price”'))] });
  add({ id: 'spB4', type: 'mcq', kicker: 'Speaking B · Listeners',
    prompt: 'Question 3: what did the speaker tell the junior to do?',
    options: ['send it again at once', 'wait 30 seconds and retry', 'ask for a new API key', 'something else'] });

  /* ---------- Speaking C · Say no to a partner (decline) ---------- */
  add({ id: 'spC1', type: 'content', kicker: 'Speaking C · Say no politely', format: 'decline',
    title: '“Just do it for us!”', items: [
      PH('partner.jpg', 'A video call between two teams, one person leaning forward with a request', '50% 45%', 96) + SM('<b>The teacher</b> is the team lead of a big partner company. <b>One student at a time</b> answers one request.'),
      SM('<b>Goal:</b> say no, explain why, offer something else.')] });
  add({ id: 'spC2', type: 'content', reveal: true, kicker: 'Speaking C · Patterns', title: 'No — but…', items: [
    SM('<b>I’m afraid we can’t</b> …, because …'),
    SM('<b>If we did that</b>, every other client <b>would have to</b> … ' + K('(Unit 4)')),
    SM('<b>What we can do is</b> …'),
    SM('You<b>’ll have to</b> … by … · You<b>’d better</b> … before …')] });
  add({ id: 'spC3', type: 'content', reveal: true, kicker: 'Speaking C · One student at a time', title: 'The partner wants…', items: [
    SM('🤝 <b>1.</b> “Keep <b>v1</b> running forever. We have no time to upgrade.”<br>' + K('v1 sunset date: June 30 · migration guide is ready')),
    SM('🤝 <b>2.</b> “Remove the <b>rate limit</b> for us. We need 1,000 requests a minute.”<br>' + K('limit: 100 a minute · webhooks · caching')),
    SM('🤝 <b>3.</b> “Rename <b>price</b> to <b>cost</b> tomorrow. Our designers prefer it.”<br>' + K('breaking change · 300 other clients · only in a new version'))] });
  add({ id: 'spC4', type: 'mcq', kicker: 'Speaking C · Result',
    prompt: 'Request 2: what did the speaker <b>offer instead</b>?',
    options: ['webhooks', 'caching', 'a higher limit for money', 'nothing'] });

  /* ---------- Final task · Brief a partner team (brief) ---------- */
  add({ id: 'fx0', type: 'end', kicker: 'Final task',
    title: 'Brief a partner team',
    text: 'Explain the rules of your API to developers who will integrate it' });
  add({ id: 'fx1', type: 'content', reveal: true, kicker: 'Final task · The task', title: 'One minute, one API', items: [
    PH('briefing.jpg', 'A developer presenting a diagram of boxes and arrows on a screen to a small team', '50% 40%', 110) +
      SM('<b>Listeners:</b> developers from a partner company. They will integrate <b>your</b> API next week.'),
    SM('<b>One student at a time</b>, about one minute. Use the facts on <b>your API card</b>.')] });
  const CARD = (id, n, t, lines) => add({ id, type: 'content', kicker: 'Final task · API card ' + n + '/3', title: t, items: lines.map(SM) });
  CARD('fx2', 1, '🌦️ A. Weather API', [
    '<b>Endpoint:</b> ' + CODE('GET /v2/forecast?city=…'),
    '<b>MUST:</b> API key in the header · <b>MUST NOT:</b> more than 60 requests a minute',
    '<b>OPTIONAL:</b> ' + CODE('days') + ' (default 3) · <b>SHOULD:</b> cache for 10 minutes',
    '<b>Change:</b> /v1 is deprecated · sunset date: <b>December 1</b>']);
  CARD('fx3', 2, '🎓 B. University timetable API', [
    '<b>Endpoint:</b> ' + CODE('GET /v1/groups/{id}/schedule'),
    '<b>MUST:</b> HTTPS · <b>MUST NOT:</b> share student data',
    '<b>OPTIONAL:</b> ' + CODE('week') + ' (default: this week) · <b>SHOULD:</b> use webhooks for room changes',
    '<b>Change:</b> field ' + CODE('room') + ' becomes an object in <b>v2</b> · v1 works until <b>June 30</b>']);
  CARD('fx4', 3, '🍕 C. Food delivery orders API', [
    '<b>Endpoint:</b> ' + CODE('POST /v3/orders'),
    '<b>MUST:</b> API key + a unique order ID · <b>MUST NOT:</b> retry faster than every 5 seconds',
    '<b>OPTIONAL:</b> ' + CODE('note') + ' for the courier · <b>SHOULD:</b> set a 10-second timeout',
    '<b>Change:</b> “price” in cents from <b>v4</b> · see the changelog']);
  add({ id: 'fx5', type: 'mcq', kicker: 'Final task · Vote',
    prompt: 'Which API will <b>you</b> brief the partners on?',
    options: ['A — Weather', 'B — University timetable', 'C — Food delivery orders'] });
  add({ id: 'fx6', type: 'content', reveal: true, kicker: 'Final task · Four moves', format: 'brief',
    title: 'Your briefing in four moves', items: [
      SM('<b>1. What it does:</b> <i>Our API lets you … The main endpoint is …</i>'),
      SM('<b>2. The musts:</b> <i>You have to … · You mustn’t … , or …</i>'),
      SM('<b>3. The options:</b> <i>You don’t have to … · You should …</i>'),
      SM('<b>4. What’s changing:</b> <i>… is deprecated. You’ll have to … by … · You’d better … now.</i>')] });
  add({ id: 'fx7', type: 'content', kicker: 'Final task · Example', title: 'How it sounds', items: [
    SM('<b>Card:</b> a currency API · /v1/rates · key required · max 30 requests a minute · base currency optional · v1 sunset May 1'),
    SM('<i>Our API gives you exchange rates. The main endpoint is /v1/rates. You <b>have to</b> send your API key with every request, and you <b>mustn’t</b> send more than thirty requests a minute, or the server will throttle you. You <b>don’t have to</b> choose a base currency — the default is the dollar. One warning: v1 is deprecated, so you<b>’ll have to</b> move to v2 by May 1. You<b>’d better</b> start now.</i>')] });
  add({ id: 'fx8', type: 'open', kicker: 'Final task · Get ready',
    prompt: 'Move 4 is the hardest. Write it for <b>your card</b>: one sentence with <b>will have to … by …</b><br>' + K('Example: v1 is deprecated, so you’ll have to move to v2 by May 1.'),
    placeholder: '… is deprecated, so you’ll have to … by …' });
  add({ id: 'fx9', type: 'content', kicker: 'Final task · While you listen', title: 'Check the speaker', items: [
    SM('All <b>four moves</b>, in order?'),
    SM('<b>have to / mustn’t</b> for the rules?'),
    SM('<b>don’t have to / should</b> for the options?'),
    SM('<b>’ll have to … by …</b> and a <b>date</b>?'),
    SM('The teacher (a partner) will ask: <b>“What happens if we miss the sunset date?”</b>')] });
  add({ id: 'fx10', type: 'mcq', kicker: 'Final task · Listeners',
    prompt: 'The last speaker: which pattern did you hear <b>for the options</b> (move 3)?',
    options: ['don’t have to', 'needn’t', 'should', 'none of them'] });

  add({ id: 'end', type: 'end', kicker: 'Unit 5',
    title: 'An API is a promise.',
    text: 'Write the rules clearly — and keep them.' });

  // Логіка подачі для check_lesson.js (рушій ці поля ігнорує)
  const R1 = 'rule 1: must · have to · had to · will have to', R2 = 'rule 2: mustn’t ≠ don’t have to · needn’t',
    R3 = 'rule 3: should · ought to · had better', R4 = 'rule 4: MUST / SHOULD / MAY · be required / allowed / supposed to',
    TR1 = 'traps: response · query', TR2 = 'traps: call · current', TR3 = 'traps: deprecated · client';
  const TEACHES = { g1a: [R1], g1a2: [R1], g2a: [R2], g2a2: [R2], g3a: [R3], g3a2: [R3], g4a: [R4], g4a2: [R4], g4a3: [R4], t1: [TR1], t2: [TR2], t3: [TR3] };
  const NEEDS = {
    l1: [], l2: [], l3: [],
    mA: ['endpoint', 'payload', 'status code', 'resource'], qA1: ['HTTP method'], qA2: ['status code'],
    mB: ['rate limit', 'to retry', 'pagination', 'to cache'], qB1: ['to throttle', 'rate limit'], qB2: ['timeout', 'client'], qB3: ['API key'],
    mC: ['breaking change', 'sunset date', 'changelog', 'to pin (a version)'], qC1: ['field', 'breaking change'], qC2: ['backward compatible'], qC3: ['to deprecate', 'endpoint'],
    mD: ['provider', 'third-party', 'requirement', 'webhook'], qD1: ['webhook'], qD2: ['third-party', 'provider'],
    rP: ['provider', 'breaking change', 'rate limit', 'to charge (for)'],
    c1: [], c2: ['status code', 'client'], c3: [], c4: ['field', 'endpoint'], c5: [], c6: ['to object (to)'], c7: ['version'], c8: ['backward compatible', 'webhook'], c9: [],
    f1: ['status code'], f2: [], mR: ['to charge (for)', 'to afford', 'to object (to)', 'in advance'], f3: [], f4: [], rB: ['in advance'],
    gN: [R2],
    e52_1: [R1, 'request', 'API key'], e52_4: [R1, 'version', 'client'], fm2: [R1], g1g: [R1, 'sunset date'],
    e52_2: [R2, 'pagination'], e52_3: [R2, 'API key'], fm1: [R2], e52_7: [R2], e53_2: [R2, R4], e53_4: [R2, R4], fm6: [R2], e53_6: [R2, R4],
    e52_5: [R3, 'to cache'], e52_6: [R3, 'timeout'], fm3: [R3, 'to retry'], e53_3: [R3, R4], e53_5: [R3, R4],
    m4: [R4], e53_1: [R4], e4p: [R4], e52_8: [R4, 'field'],
    e54_1: [TR1], e54_2: [TR1], fm4: [TR1, 'status code'], e54_3: [TR2], e54_4: [TR2], fm5: [TR2], e54_5: [TR3], e54_6: [TR3],
    kq: [], spA4: [R2, R4], spB4: ['rate limit'], spC4: ['webhook', 'to cache'], fx5: [], fx8: [R1, 'to deprecate'], fx10: [R2, R3]
  };
  S.forEach((s) => {
    if (TEACHES[s.id]) s.teaches = [...(s.teaches || []), ...TEACHES[s.id]];
    if (!['mcq', 'gap', 'open', 'match'].includes(s.type)) return;
    if (s.needs === undefined) s.needs = NEEDS[s.id] || [];
  });

  window.LESSON = {
    id: ID,
    title: 'Unit 5 · APIs: Contracts Between Systems',
    known: ['API', 'app', 'server', 'code', 'data', 'user', 'website', 'bug', 'update', 'upgrade', 'database', 'token', 'key', 'URL',
      'header', 'parameter', 'library', 'HTTPS', 'front-end', 'JavaScript', 'log', 'logs', 'security flaw', 'production', 'outage', 'index', 'SQL', 'ID'],
    slides: S
  };
})();

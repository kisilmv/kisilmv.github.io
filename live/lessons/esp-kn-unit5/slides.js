/* =========================================================================
   Unit 5 · APIs: Contracts Between Systems
   ESP · Комп'ютерні науки, 2 курс · B1+/B2 · групове заняття (телефони)
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Задум: «Розбір кейсу: один контракт зламано, інший дотримано».
   Наскрізна лінія: Apollo (стороннє iPhone-застосування для Reddit) закрилося
   30 червня 2023 р. через ціни на API → як Apollo «розмовляє» з Reddit →
   ліміти й рахунок на $20 млн → правила документації (must / mustn't) →
   глибокий розбір: як Stripe змінює API, нікого не ламаючи → мова специфікацій
   і порада (should, had better, should have) → пастки й вимова →
   говоріння від імені API-команди. Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const ID = 'esp-kn-unit5';
  const K = (s) => '<span class="muted">' + s + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  // рядок механізму: що термін РОБИТЬ (англійською, на екрані студента)
  const MX = (s) => '<span style="display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:8px;margin-top:-2px">⚙️ ' + s + '</span>';
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  const CODE = (s) => '<code style="font-size:.92em;background:var(--surface-2);padding:1px 5px;border-radius:6px">' + s + '</code>';
  const CARD = (head, body) => '<span style="display:block;border:1px solid var(--line);border-radius:12px;padding:8px 10px;background:var(--surface-2);font-size:16px;line-height:1.45">' +
    '<span class="muted" style="display:block;font-size:13px;margin-bottom:3px">' + head + '</span>' + body + '</span>';
  const FX = (...p) => '<span class="fx" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px">' +
    p.map((x) => x === '+' ? '<span style="color:var(--ink-2)">+</span>' : '<span style="background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px"><b>' + x + '</b></span>').join('') + '</span>';
  const GT = (head, rows) => '<table class="gt" style="width:100%;border-collapse:collapse;font-size:16px;line-height:1.35">' +
    '<tr>' + head.map((h) => '<th style="text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)">' + h + '</th>').join('') + '</tr>' +
    rows.map((r) => '<tr>' + r.map((c) => '<td style="padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top">' + c + '</td>').join('') + '</tr>').join('') + '</table>';
  const RC = (badge, rule, ex) => '<span class="rc" style="display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4">' +
    '<span style="display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px">' + badge + '</span>' + rule + (ex ? '<br><i>' + ex + '</i>' : '') + '</span>';
  // Згенеровані сцени (Gemini) вмикаються, щойно файл додано до HAVE
  const HAVE = [];
  const PH = (f, alt, pos, h) => HAVE.includes(f) ? '<img src="lessons/' + ID + '/' + f + '" alt="' + alt + '" style="display:block;width:100%;height:' + (h || 120) + 'px;object-fit:cover;object-position:' + (pos || '50% 50%') + ';border-radius:16px;margin-bottom:12px">' : '';
  const S = [];
  const add = (o) => S.push(o);

  // «Say it in English» (до 6 на урок): укр. технічне речення → еталон → 💬 розмовне → його еталон
  let sayN = 0;
  const SAY = (uk, en, evEn, evUk, needs) => { sayN += 1; add({ id: 'say' + sayN, type: 'content', reveal: true, family: 'translate', needs,
    kicker: 'Say it in English · ' + sayN + '/6', title: uk, items: ['<b>' + en + '</b>', ...EV(evEn, evUk)] }); };
  const TAP = K('Tap the wrong part.');
  const para = (id, n, html) => add({ id, type: 'content', kicker: 'Reading · Breaking the Contract · ' + n + '/10', title: n === 1 ? 'A promise between programs' : 'Paragraph ' + n, items: [SM(html)] });

  add({ id: 'title', type: 'title',
    kicker: 'Unit 5 · English for Computer Science',
    title: 'APIs: Contracts Between Systems',
    subtitle: 'One promise broken, one promise kept' });

  /* ================= The case ================= */
  add({ id: 'h1', type: 'content', reveal: true, kicker: 'The case · June 30, 2023', title: 'An app closes. Nothing is broken.', items: [
    PH('apollo.jpg', 'A phone on a desk with a dark app screen and a farewell message', '50% 50%', 110) +
      CARD('June 30, 2023 · Halifax, Canada', '<b>Apollo</b>, a popular app for reading Reddit on iPhone, shuts down.'),
    SM('The app has no serious bug. Its servers work fine.'),
    SM('Its developer, Christian Selig, closes it because of <b>one change</b> on Reddit’s side — a change to Reddit’s <b>API</b>.')] });
  add({ id: 'h2', type: 'mcq', kicker: 'The case · Place your bet', poll: true,
    prompt: '<b>Bet:</b> what did Reddit change?<br>' + K('No wrong answers yet. We check your bet later in the lesson.'),
    options: ['It removed old features, and the app stopped working.', 'It started to charge money for its API.', 'It banned all apps that are not made by Reddit.'] });

  /* ================= Block 1 · How Apollo talks to Reddit ================= */
  add({ id: 'b1', type: 'end', kicker: 'Inside the app', title: 'How Apollo talks to Reddit', text: 'Requests, responses, status codes' });
  add({ id: 'a1', type: 'content', reveal: true, kicker: 'Inside the app · What is an API?', title: 'The posts are not on your phone', items: [
    SM('Apollo doesn’t keep Reddit’s posts. Every time you scroll, it <b>asks Reddit’s servers</b> for them.'),
    SM('An <b>API</b> (application programming interface) is the set of rules for these questions: <b>what</b> a program may ask for, <b>how</b> to ask, and <b>what</b> it gets back.'),
    SM('🍽️ Think of a restaurant menu: you can order only what is on the menu, the way the menu says. The kitchen stays closed to you.')] });
  add({ id: 'a2', type: 'content', kicker: 'Inside the app · Words 1/4', title: 'Asking', items: [
    term('request', '/rɪˈkwest/', 'запит (до сервера)'),
    MX('A request is a message one program sends to another to ask for data or for an action.'),
    term('endpoint', '/ˈendpɔɪnt/', 'кінцева точка (адреса ресурсу API)'),
    MX('An endpoint is one address of the API for one kind of data, for example ' + CODE('/r/pics/hot') + '.')] });
  add({ id: 'a3', type: 'content', kicker: 'Inside the app · Words 2/4', title: 'What to do, and with what', items: [
    term('HTTP method', '/ˌeɪtʃ tiː tiː ˈpiː ˌmeθəd/', 'HTTP-метод'),
    MX('The method says what to do: <b>GET</b> reads, <b>POST</b> creates, <b>PUT</b> or <b>PATCH</b> changes, <b>DELETE</b> removes.'),
    term('resource', '/ˈriːsɔːrs/', 'ресурс (об’єкт, з яким працюють через API)'),
    MX('A resource is the thing you work with through the API: a post, a comment, a user, an order.')] });
  add({ id: 'q1', type: 'mcq', kicker: 'Inside the app · What happens?', family: 'scenario',
    needs: ['HTTP method', 'resource'],
    prompt: 'You open Apollo. It must <b>show</b> the hot posts and change nothing on Reddit.<br><b>Which method does it use?</b>',
    options: ['POST', 'GET', 'DELETE'] });
  add({ id: 'a4', type: 'content', kicker: 'Inside the app · Words 3/4', title: 'Answering', items: [
    term('response', '/rɪˈspɑːns/', 'відповідь (сервера)'),
    MX('The response is the server’s reply to one request: a status code and, usually, some data.'),
    term('status code', '/ˈsteɪtəs ˌkoʊd/', 'код стану'),
    MX('A status code is a three-digit number that says how the request went: 200 means OK.')] });
  add({ id: 'a5', type: 'content', kicker: 'Inside the app · Words 4/4', title: 'The data itself', items: [
    term('payload', '/ˈpeɪloʊd/', 'корисне навантаження (дані в запиті чи відповіді)'),
    MX('The payload is the data itself, inside the request or the response: the posts, the comments.'),
    term('JSON', '/ˈdʒeɪsən/', 'JSON, текстовий формат обміну даними'),
    MX('JSON writes data as names and values: ' + CODE('{"title": "Cats", "score": 812}'))] });
  const PATH = '<svg viewBox="0 0 300 200" style="display:block;width:100%;max-width:310px;margin:2px auto">' +
    '<defs><marker id="u5a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="var(--accent)"/></marker></defs>' +
    '<rect x="4" y="64" width="78" height="62" rx="12" fill="var(--surface-2)" stroke="var(--line)"/>' +
    '<text x="43" y="91" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">Apollo</text><text x="43" y="110" text-anchor="middle" font-size="13" fill="var(--ink-2)">(client)</text>' +
    '<rect x="218" y="64" width="78" height="62" rx="12" fill="var(--surface-2)" stroke="var(--line)"/>' +
    '<text x="257" y="91" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">Reddit</text><text x="257" y="110" text-anchor="middle" font-size="13" fill="var(--ink-2)">(server)</text>' +
    '<line x1="86" y1="78" x2="212" y2="78" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#u5a)"/>' +
    '<line x1="214" y1="114" x2="88" y2="114" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#u5a)"/>' +
    '<text x="150" y="18" text-anchor="middle" font-size="13" fill="var(--ink-2)">① request</text>' +
    '<text x="150" y="38" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">GET /r/pics/hot</text>' +
    '<text x="150" y="56" text-anchor="middle" font-size="13" fill="var(--ink-2)">+ key: a8F3…k2</text>' +
    '<text x="150" y="146" text-anchor="middle" font-size="13" fill="var(--ink-2)">② response</text>' +
    '<text x="150" y="166" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">200 OK</text>' +
    '<text x="150" y="188" text-anchor="middle" font-size="14" fill="var(--ink)">{"title": "Cats", "score": 812}</text></svg>';
  add({ id: 'a6', type: 'content', reveal: true, kicker: 'Inside the app · One trip', title: 'One request, one response', items: [PATH,
    SM('① Apollo sends a <b>request</b>: the method (GET), the endpoint (/r/pics/hot) and its secret key.'),
    SM('② Reddit sends a <b>response</b>: the status code (200 OK) and the payload in JSON.')] });
  add({ id: 'mL', type: 'match', kicker: 'Inside the app · Label the trip', family: 'label',
    needs: ['HTTP method', 'endpoint', 'status code', 'payload'],
    prompt: 'What is each part of the trip (1–4)? Two options (a–f) are extra.',
    left: [CODE('GET'), CODE('/r/pics/hot'), CODE('200'), CODE('{"score": 812}')],
    right: ['the JSON payload', 'the HTTP method', 'the resource', 'the endpoint', 'the status code', 'the request'] });
  add({ id: 'a7', type: 'content', reveal: true, kicker: 'Inside the app · Status codes', title: 'Four numbers every developer says', teaches: ['concept: status codes'], items: [
    GT(['code', 'say it', 'it means'], [
      ['<b>200</b>', 'two hundred', 'OK, here is your data'],
      ['<b>401</b>', 'four-oh-one', 'Unauthorized: you haven’t proved who you are (no valid key)'],
      ['<b>404</b>', 'four-oh-four', 'Not Found: there is no such resource'],
      ['<b>429</b>', 'four twenty-nine', 'Too Many Requests: slow down']]),
    SM('2xx = it worked · 4xx = the <b>client</b> did something wrong · 5xx = the <b>server</b> has a problem')] });
  add({ id: 'q2', type: 'gap', kicker: 'Inside the app · What happens?', family: 'scenario',
    needs: ['concept: status codes', 'request'],
    instruction: K('Example: Everything worked. → <b>200</b>') + '<br>Write the status code.',
    prompt: 'Apollo asks for a post that a user deleted yesterday. Reddit answers ___.', placeholder: 'a number' });
  add({ id: 'a8', type: 'content', kicker: 'Inside the app · Who is who', title: 'The two sides', items: [
    term('client', '/ˈklaɪənt/', 'клієнт (програма, що надсилає запити)'),
    MX('The client is the <b>program</b> that sends requests (here, the Apollo app), not a person who pays.'),
    term('API key', '/ˌeɪ piː ˈaɪ ˌkiː/', 'ключ API'),
    MX('An API key is a long secret string in every request. It tells the server <b>which app</b> is calling.')] });
  add({ id: 'a9', type: 'content', kicker: 'Inside the app · Who is who', title: 'The two companies', items: [
    term('provider', '/prəˈvaɪdər/', 'постачальник (сервісу, API)'),
    MX('The provider is the company that runs the API and its servers: here, Reddit.'),
    term('third-party', '/ˌθɝːd ˈpɑːrti/', 'сторонній'),
    MX('A third-party app is made by someone else, not by the provider: Apollo was made by one developer, not by Reddit.')] });
  add({ id: 'q3', type: 'match', kicker: 'Inside the app · What happens?', family: 'cause',
    needs: ['concept: status codes', 'API key', 'client', 'endpoint'],
    prompt: 'What happens in each case (1–4)? Two options (a–f) are extra.',
    left: ['Apollo forgets the API key.', 'Apollo asks for /r/pics/hott (a typo).', 'Reddit’s own server crashes.', 'All goes well.'],
    right: ['429', '404', '200', '401', '5xx', 'the key changes'] });

  para('r1', 1, 'Open Apollo and you see posts, pictures and comments. None of them live on your phone, and none of them live on Apollo’s own servers. Every time you scroll, the app sends a <b>request</b> to Reddit through its API, and Reddit sends the posts back. Apollo is a <b>third-party</b> app: Reddit is the <b>provider</b>. Every API is a promise about how such a conversation will go: what you may ask for, how to ask, and what you will get.');
  para('r2', 2, 'A typical REST API ' + K('(the most common style of web API)') + ' has a set of <b>endpoints</b>, such as /r/pics/hot. The <b>client</b> sends a request with an <b>HTTP method</b> — GET to read a <b>resource</b>, POST to create one, PUT or PATCH to change it, DELETE to remove it — and the server returns a <b>response</b> with a <b>status code</b> and, usually, a <b>JSON payload</b>. Every request carries the app’s <b>API key</b>, so Reddit always knows which app is calling.');
  add({ id: 'c1', type: 'mcq', kicker: 'Reading · True, false or not given?', family: 'tfng',
    needs: ['provider', 'third-party'],
    prompt: K('Example: “Apollo shows comments.” → <b>True</b> (paragraph 1)') + '<br>“Apollo is a third-party app, and it stores Reddit’s posts on its own servers.”',
    options: ['True', 'False', 'Not given'] });
  add({ id: 'c2', type: 'gap', kicker: 'Reading · Find it in the text', family: 'define', needs: ['API key', 'provider'],
    instruction: 'Paragraph 2. Two words.',
    prompt: 'The provider knows which app is calling, because every request carries the app’s ___.', placeholder: 'two words' });

  /* ================= Block 2 · Limits and the $20 million bill ================= */
  add({ id: 'b2', type: 'end', kicker: 'The bill', title: 'Seven billion requests a month', text: 'Limits, retries — and a price' });
  add({ id: 'l1', type: 'content', kicker: 'The bill · Words 1/3', title: 'Too many requests', teaches: ['concept: throttling'], items: [
    term('rate limit', '/ˈreɪt ˌlɪmɪt/', 'обмеження частоти запитів'),
    MX('A rate limit is the maximum number of requests a client may send in a period: for example, 100 a minute.'),
    term('to throttle', '/ˈθrɑːtl/', 'обмежувати, пригальмовувати (потік запитів)'),
    MX('To throttle a client is to slow it down: the server answers 429 instead of the data. ' + K('A throttle is the pedal that controls fuel in an engine.'))] });
  add({ id: 'l2', type: 'content', kicker: 'The bill · Words 2/3', title: 'Waiting and trying again', teaches: ['concept: timeout'], items: [
    term('to retry', '/ˌriːˈtraɪ/', 'повторювати спробу'),
    MX('To retry is to send the same request again later, after a failure or a 429.'),
    term('timeout', '/ˈtaɪmaʊt/', 'тайм-аут (граничний час очікування)'),
    MX('A timeout is the longest time a client waits for a response. After it, the client stops waiting. ' + K('Not a break in a game!'))] });
  add({ id: 'l3', type: 'content', kicker: 'The bill · Words 3/3', title: 'Asking less', items: [
    term('to cache', '/kæʃ/', 'кешувати ' + K('(sounds like cash)')),
    MX('To cache data is to keep a copy of it, so the client does not have to ask the server again.'),
    term('pagination', '/ˌpædʒəˈneɪʃn/', 'пагінація, посторінкова видача'),
    MX('Pagination means the API gives results page by page: 25 posts now, the next 25 when you scroll.')] });
  add({ id: 'mB', type: 'match', kicker: 'The bill · Cause and effect', family: 'cause',
    needs: ['rate limit', 'to throttle', 'timeout', 'to cache', 'to retry'],
    prompt: 'What follows from each case (1–4)? Two options (a–f) are extra.',
    left: ['500 requests a minute, limit 100', 'no answer for 30 seconds', 'the same list asked 1,000 times', 'a 429 with “wait 30 s”'],
    right: ['cache the list', 'the key is deleted', 'wait, then retry', 'the server throttles it', 'the client times out', 'the payload grows'] });
  add({ id: 'q4', type: 'match', kicker: 'The bill · In what order?', family: 'sequence',
    needs: ['to retry', 'concept: throttling'],
    prompt: 'Apollo hits the rate limit. Put the steps (1–4) in order. One position (a–e) is extra.',
    left: ['Apollo waits 30 seconds.', 'Apollo sends one request too many.', 'Apollo retries the request.', 'Reddit answers 429: “wait 30 s”.'],
    right: ['1st', '2nd', '3rd', '4th', '5th'] });
  const CB = 'Use: <b>cache · hit · return · set · throttle</b> ' + K('(two are extra; change the form if needed)');
  add({ id: 'q5', type: 'gap', kicker: 'The bill · Word partners · 1/3', family: 'colloc', needs: ['rate limit'],
    instruction: K('Example: The client <b>sends</b> a request.') + '<br>' + CB,
    prompt: 'Apollo ___ the rate limit at 9 p.m., when everyone was online.', placeholder: 'one word' });
  add({ id: 'q6', type: 'gap', kicker: 'The bill · Word partners · 2/3', family: 'colloc', needs: ['timeout'],
    instruction: CB,
    prompt: 'Always ___ a timeout, or the app will wait forever.', placeholder: 'one word' });
  add({ id: 'q7', type: 'gap', kicker: 'The bill · Word partners · 3/3', family: 'colloc', needs: ['status code'],
    instruction: CB,
    prompt: 'For a deleted post, the server will ___ a 404 status code.', placeholder: 'one word' });

  add({ id: 'rv', type: 'content', kicker: 'The bill · Before you read', title: 'Four words for the story', glossOnly: true, items: [
    term('to charge (for)', '/tʃɑːrdʒ/', 'брати плату (за)'),
    term('to afford', '/əˈfɔːrd/', 'мати змогу заплатити, дозволити собі'),
    term('to object (to)', '/əbˈdʒekt/', 'заперечувати (проти)'),
    term('in advance', '/ɪn ədˈvæns/', 'заздалегідь')] });
  para('r3', 3, 'Rules work in both directions. Reddit lets an app send about 100 requests a minute: that is the <b>rate limit</b>. If a client sends more, the server <b>throttles</b> it and returns 429 Too Many Requests; a well-written client waits and <b>retries</b> later. A good client also <b>caches</b> posts it has already loaded and uses <b>pagination</b>, asking for 25 posts at a time, never for the whole site.');
  para('r4', 4, 'In April 2023, Reddit announced that it would start <b>charging</b> for its API, which had been free for years. At the end of May, Christian Selig, the developer of Apollo, learned what that meant: 12,000 dollars per 50 million requests. Apollo made about seven billion requests a month.');
  add({ id: 'q8', type: 'gap', kicker: 'The bill · Do the math', family: 'numbers',
    needs: ['to charge (for)'],
    instruction: '7,000,000,000 ÷ 50,000,000 = <b>140</b> “packs” of requests.<br>140 × $12,000 = ? ' + K('Write the number of millions, e.g. 2.5'),
    prompt: 'Reddit would charge Apollo about $___ million a month — over $20 million a year.', placeholder: 'e.g. 2.5' });
  para('r5', 5, 'The new prices started on July 1, about a month later. Selig did not have to close the app — in theory, he could have paid — but he could not <b>afford</b> it, and Apollo shut down on June 30. Reddit had every right to change its prices; what developers <b>objected to</b> was the speed. A month is not enough to rebuild a business.');
  add({ id: 'c4', type: 'gap', kicker: 'Reading · Back to the text', family: 'form', needs: ['to object (to)'],
    instruction: 'Paragraph 5. Put the verb <b>object</b> in the right form.',
    prompt: 'Developers ___ to the speed of the change, not to the prices.', placeholder: 'one word' });
  add({ id: 'h3', type: 'content', reveal: true, kicker: 'The case · Your bet', title: 'What did Reddit change?', items: [
    SM('✅ <b>It started to charge money for its API.</b> The API itself still worked.'),
    SM('The problem was the <b>price</b> and the <b>speed</b>: about a month between the prices and the bill.')] });
  add({ id: 'c3', type: 'mcq', kicker: 'Reading · What does the text mean?', family: 'scenario',
    needs: ['to afford', 'to object (to)'],
    prompt: '“Selig did not have to close the app, but he could not afford it.” <b>So …</b>',
    options: ['Reddit did not allow him to pay.', 'he could pay in theory, but he had no money for it.', 'he closed the app because of a bug.'] });
  add({ id: 'kw', type: 'content', reveal: true, kicker: 'Retell · One student at a time', family: 'retell-cue', title: 'Apollo in three sentences', items: [
    SM('<b>1.</b> April 2023 · Reddit · announce · start · charge · API'),
    SM('<b>2.</b> Apollo · make · seven billion · request · month · cost · $20 million · year'),
    SM('<b>3.</b> developers · object to · speed · month · not enough'),
    K('→ <i>In April 2023, Reddit announced that it would start charging for its API. …</i>')] });

  /* ================= Block 3 · Reddit's rules: must & co ================= */
  add({ id: 'b3', type: 'end', kicker: 'The rules', title: 'What a client must and mustn’t do', text: 'must · have to · mustn’t · don’t have to' });
  para('r6', 6, 'The documentation sets the rules. Every request <b>must include</b> an API key. A client <b>must not send</b> more than 100 requests a minute. With pagination, a client <b>may ask</b> for up to 100 posts at a time, but it <b>does not have to</b>: the default is 25. Many API documents borrow their wording from RFC 2119, a short document from 1997 that defines exactly what MUST, SHOULD and MAY mean.');
  add({ id: 'g1', type: 'content', reveal: true, kicker: 'The rules · Rule 1 · 1/2', title: 'It is necessary', items: [
    FX('must / have to / need to', '+', 'verb'),
    RC('must', 'a rule from a document or the speaker', 'Every request <b>must include</b> an API key.'),
    RC('have to', 'the situation makes it necessary', 'After a 429, the client <b>has to wait</b>.'),
    RC('need to', 'necessary, softer', 'We <b>need to</b> fix it.')] });
  add({ id: 'g2', type: 'content', reveal: true, kicker: 'The rules · Rule 1 · 2/2', title: '“must” has no past and no future', items: [
    GT(['now', 'past', 'future'], [['must / have to', '<b>had to</b>', '<b>will have to</b>']]),
    SM('When Reddit changed the prices, Selig <b>had to</b> decide fast.'),
    SM('After the sunset date, all clients <b>will have to</b> use v2.'),
    RC('✗', 'we <s>musted</s> rewrite · we <s>must</s> rewrote', 'we <b>had to</b> rewrite')] });
  add({ id: 'e1', type: 'gap', kicker: 'The rules · Form · 1/2', family: 'form', needs: ['rule 1: must · have to · had to · will have to'],
    instruction: K('Example: Tomorrow we ___ (must) work late. → <b>will have to</b>') + '<br>Put the verb in the right form.',
    prompt: 'When the prices changed, Selig ___ (must) close Apollo within a month.', placeholder: 'two words' });
  add({ id: 'e2', type: 'mcq', kicker: 'The rules · Find the mistake', family: 'error', needs: ['rule 1: must · have to · had to · will have to'],
    prompt: K('<b>Example:</b> You <s>must to</s> log in. → You <b>must</b> log in.') + '<br>Last year Apollo must pay nothing for the API.<br>' + TAP,
    options: ['Last year', 'Apollo must pay', 'nothing for the API'] });
  add({ id: 'gN', type: 'mcq', kicker: 'The rules · Notice', discovery: true, needs: ['rule 2: mustn’t ≠ don’t have to'],
    prompt: 'From paragraph 6: a client <b>does not have to</b> ask for 100 posts.<br><b>What does it mean?</b>',
    options: ['It is not allowed to ask for 100 posts.', 'It can ask for 100 posts, but it isn’t necessary.'] });
  add({ id: 'g3', type: 'content', reveal: true, kicker: 'The rules · Rule 2 · 1/2', title: 'mustn’t ≠ don’t have to', items: [
    RC('⛔ mustn’t', 'it is <b>not allowed</b>', 'A client <b>mustn’t send</b> more than 100 requests a minute.'),
    RC('🙂 don’t have to · don’t need to · needn’t', 'it <b>isn’t necessary</b>, but you can', 'You <b>don’t have to</b> ask for 100 posts.'),
    RC('form', '<b>needn’t</b> + verb, no <i>to</i>', 'You <b>needn’t send</b> the user ID.')] });
  add({ id: 'g4', type: 'content', reveal: true, kicker: 'The rules · Rule 2 · 2/2', title: '«не треба»: ⛔ or 🙂?', items: [
    GT(['Українською', 'English'], [
      ['Ключ <b>не треба</b> нікому показувати. ⛔', 'You <b>mustn’t</b> show the key to anyone.'],
      ['Ключ <b>не треба</b> надсилати двічі. 🙂', 'You <b>don’t have to</b> send the key twice.']]),
    ...EV('You <b>don’t have to</b> come tomorrow — it’s a holiday. But you <b>mustn’t</b> be late on Monday!', 'Завтра можеш не приходити — вихідний. Але в понеділок не можна запізнюватися!')] });
  const DOCS = CARD('📄 API docs · Rules for clients',
    '1 Send your API key with every request.<br>2 Max 100 requests a minute.<br>3 Pagination: the <b>limit</b> parameter is optional (default: 25).<br>4 Never put your key in front-end code.');
  add({ id: 'e3', type: 'gap', kicker: 'The rules · Docs into speech · 1/3', family: 'genre', needs: ['rule 2: mustn’t ≠ don’t have to', 'API key'],
    instruction: DOCS + K('Example: line 1 → You <b>have to</b> send your API key.'),
    prompt: 'Line 3: You ___ send the limit parameter.', placeholder: 'three words' });
  add({ id: 'e4', type: 'gap', kicker: 'The rules · Docs into speech · 2/3', family: 'genre', needs: ['rule 2: mustn’t ≠ don’t have to', 'rate limit'],
    instruction: DOCS,
    prompt: 'Line 2: You ___ send more than 100 requests a minute.', placeholder: 'one word' });
  add({ id: 'e5', type: 'mcq', kicker: 'The rules · Docs into speech · 3/3', family: 'genre', needs: ['rule 2: mustn’t ≠ don’t have to'],
    prompt: DOCS + '<br>Line 4 in plain English:',
    options: ['You don’t have to put it there.', 'You needn’t to put it there.', 'You mustn’t put it there.'] });
  SAY('Ключ API не можна показувати нікому.', 'You mustn’t show your API key to anyone.',
    'You <b>mustn’t</b> park here — it’s a bus stop.', 'Тут не можна паркуватися — це зупинка автобуса.', ['rule 2: mustn’t ≠ don’t have to', 'API key']);
  add({ id: 'e6', type: 'gap', kicker: 'The rules · Correct it', family: 'error', needs: ['rule 2: mustn’t ≠ don’t have to', 'API key'],
    instruction: '<s>You don’t have to share your API key with anyone — keep it secret.</s><br>Correct the modal verb. One word.',
    prompt: 'You ___ share your API key with anyone — keep it secret.', placeholder: 'one word' });
  SAY('Старим клієнтам не обов’язково оновлюватися, доки вони не будуть готові.', 'Old clients don’t have to upgrade until they’re ready.',
    'You <b>don’t have to</b> pay now — you can pay later.', 'Можна не платити зараз — заплатите пізніше.', ['rule 2: mustn’t ≠ don’t have to', 'client']);

  /* ================= Block 4 · Deep dive: Stripe ================= */
  add({ id: 'b4', type: 'end', kicker: 'Deep dive', title: 'How to change an API without breaking anyone', text: 'The other side of the story: Stripe, the payment company' });
  add({ id: 'd1', type: 'content', kicker: 'Deep dive · Words 1/4', title: 'What the provider promises', items: [
    term('field', '/fiːld/', 'поле (у даних)'),
    MX('A field is one named piece of data in the payload: ' + CODE('"price": 18.5') + ' is the field “price”.'),
    term('obligation', '/ˌɑːbləˈɡeɪʃn/', 'обов’язок, зобов’язання'),
    MX('An obligation is something you have to do because you promised: the provider’s obligation is not to break its clients.')] });
  const BREAK = '<svg viewBox="0 0 300 150" style="display:block;width:100%;max-width:310px;margin:2px auto">' +
    '<rect x="4" y="10" width="138" height="56" rx="10" fill="var(--surface-2)" stroke="var(--line)"/>' +
    '<text x="73" y="32" text-anchor="middle" font-size="13" fill="var(--ink-2)">old client code expects</text>' +
    '<text x="73" y="54" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">"price": 18.5</text>' +
    '<rect x="158" y="10" width="138" height="56" rx="10" fill="var(--surface-2)" stroke="var(--no)"/>' +
    '<text x="227" y="32" text-anchor="middle" font-size="13" fill="var(--ink-2)">the API now sends</text>' +
    '<text x="227" y="54" text-anchor="middle" font-size="15" font-weight="700" fill="var(--no)">"cost": 18.5</text>' +
    '<text x="150" y="96" text-anchor="middle" font-size="15" fill="var(--ink)">price = nothing → total = error 💥</text>' +
    '<text x="150" y="126" text-anchor="middle" font-size="13" fill="var(--ink-2)">The server is fine. The clients break.</text></svg>';
  add({ id: 'd2', type: 'content', reveal: true, kicker: 'Deep dive · Why “breaking”? · 1/2', title: 'A small change, a big crash', items: [BREAK,
    SM('Old code looks for “price”. It finds nothing, so the app crashes.')] });
  add({ id: 'd2b', type: 'content', reveal: true, kicker: 'Deep dive · Why “breaking”? · 2/2', title: 'The name for it', teaches: ['concept: breaking change'], items: [
    term('breaking change', '/ˌbreɪkɪŋ ˈtʃeɪndʒ/', 'несумісна (руйнівна) зміна'),
    MX('A breaking change makes old client code fail: renaming or removing a field, or turning a number into text.'),
    SM('Why the name: the change <b>breaks the clients</b>, not the server. Thousands of apps can break overnight.')] });
  add({ id: 'd3', type: 'content', kicker: 'Deep dive · Words 2/4', title: 'Safe changes', teaches: ['concept: backward compatible'], items: [
    term('backward compatible', '/ˌbækwərd kəmˈpætəbl/', 'зворотно сумісний ' + K('(BrE also backwards)')),
    MX('A backward compatible change works with old client code: for example, a new field that old clients simply ignore.'),
    term('version', '/ˈvɝːʒn/', 'версія'),
    MX('A version is one fixed state of the API: v1, v2, or a date like 2017-05-24. Breaking changes go into a new version.')] });
  add({ id: 'd4', type: 'mcq', kicker: 'Deep dive · Breaking or not?', family: 'scenario',
    needs: ['breaking change', 'backward compatible', 'field'],
    prompt: K('Example: the field “price” becomes “cost” → <b>breaking</b>') + '<br>The API <b>adds</b> a new field, ' + CODE('"currency": "USD"') + '. Old apps don’t read it.',
    options: ['a breaking change: old apps crash', 'backward compatible: old apps work as before', 'a breaking change, but only for new apps'] });
  add({ id: 'd5', type: 'gap', kicker: 'Deep dive · Breaking or not?', family: 'scenario',
    needs: ['breaking change', 'backward compatible', 'field'],
    instruction: 'The field ' + CODE('"price": 18.5') + ' becomes ' + CODE('"price": "18.50 USD"') + ' — same name, but now it is text.<br>One word.',
    prompt: 'Old code expects a number, so this is a ___ change.', placeholder: 'one word' });
  add({ id: 'd6', type: 'content', kicker: 'Deep dive · Words 3/4', title: 'Saying goodbye to an old endpoint', teaches: ['concept: deprecated'], items: [
    term('to deprecate', '/ˈdeprəkeɪt/', 'оголошувати застарілим'),
    MX('To deprecate an endpoint is to announce that it will be removed. A deprecated endpoint <b>still works</b> for now.'),
    term('sunset date', '/ˈsʌnset ˌdeɪt/', 'дата остаточного вимкнення'),
    MX('The sunset date is the day a deprecated endpoint stops working. After it, requests fail.')] });
  add({ id: 'd7', type: 'mcq', kicker: 'Deep dive · What happens?', family: 'scenario',
    needs: ['to deprecate', 'sunset date', 'endpoint'],
    prompt: 'Today is November 5. /v1/posts is <b>deprecated</b>, sunset date: March 31.<br>Apollo calls /v1/posts today. <b>What happens?</b>',
    options: ['It works today, but Apollo should move to v2 before March 31.', 'It fails: deprecated means removed.', 'It works forever.'] });
  add({ id: 'd8', type: 'content', kicker: 'Deep dive · Words 4/4', title: 'Keeping order', items: [
    term('to pin (a version)', '/pɪn/', 'закріплювати (версію)'),
    MX('To pin a version is to fix a client to one version, so its responses don’t change when the API changes.'),
    term('changelog', '/ˈtʃeɪndʒlɔːɡ/', 'журнал змін'),
    MX('A changelog is a dated list of every change in the API, so clients can see what is new before it hits them.')] });
  para('r7', 7, 'The provider has <b>obligations</b> too. Thousands of developers have written code that expects a <b>field</b> called “price” to be a number. If the provider renames that field or turns it into text, all that code breaks overnight. Such a change is called a <b>breaking change</b>, and good API teams take it almost as seriously as a security flaw.');
  add({ id: 'c5', type: 'gap', kicker: 'Reading · Find it in the text', family: 'define', needs: ['obligation', 'field'],
    instruction: 'Paragraph 7. One word.',
    prompt: 'The provider has ___ too: it mustn’t rename a field and break thousands of apps.', placeholder: 'one word' });
  para('r8', 8, 'Compare Reddit with Stripe, the payment company. In a 2017 blog post, Stripe’s engineers wrote that every <b>version</b> of their API had kept working since 2011. Each account is <b>pinned</b> to the version that is current when it makes its first request, and versions are named by date, for example 2017-05-24. When Stripe makes a breaking change, it releases a new version, and old clients do not have to upgrade until they are ready.');
  const PIN = '<svg viewBox="0 0 300 160" style="display:block;width:100%;max-width:290px;margin:0 auto">' +
    '<line x1="10" y1="30" x2="292" y2="30" stroke="var(--line)" stroke-width="2"/>' +
    '<circle cx="40" cy="30" r="6" fill="var(--accent)"/><text x="40" y="16" text-anchor="middle" font-size="13" fill="var(--ink)">2017-05-24</text>' +
    '<circle cx="160" cy="30" r="6" fill="var(--ink-2)"/><text x="160" y="16" text-anchor="middle" font-size="13" fill="var(--ink)">2018-02-05</text>' +
    '<text x="160" y="52" text-anchor="middle" font-size="12" fill="var(--no)">breaking change</text>' +
    '<circle cx="268" cy="30" r="6" fill="var(--ink-2)"/><text x="268" y="16" text-anchor="middle" font-size="13" fill="var(--ink)">today</text>' +
    '<rect x="8" y="72" width="284" height="34" rx="8" fill="var(--accent-soft)" stroke="var(--line)"/>' +
    '<text x="150" y="94" text-anchor="middle" font-size="14" fill="var(--ink)">Shop A (since 2017): gets <tspan font-weight="700">2017-05-24</tspan></text>' +
    '<rect x="8" y="118" width="284" height="34" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>' +
    '<text x="150" y="140" text-anchor="middle" font-size="14" fill="var(--ink)">Shop B (new today): gets <tspan font-weight="700">today’s version</tspan></text></svg>';
  add({ id: 'd9', type: 'content', reveal: true, kicker: 'Deep dive · Step by step', title: 'Pinning, step by step', teaches: ['concept: version pinning'], items: [PIN,
    SM('① Shop A’s first request is in 2017 → <b>pinned</b> to 2017-05-24.'),
    SM('② 2018: a breaking change, but only in a <b>new version</b>.'),
    SM('③ Shop A keeps the old format and upgrades when ready, after reading the <b>changelog</b>.')] });
  add({ id: 'd10', type: 'mcq', kicker: 'Deep dive · What happens?', family: 'scenario',
    needs: ['concept: version pinning', 'breaking change'],
    prompt: 'Your shop is pinned to <b>2017-05-24</b>. Tonight Stripe releases a new version that renames a field.<br><b>Tomorrow your shop …</b>',
    options: ['works as before: it still gets the 2017 format.', 'crashes: every client gets the new version.', 'is switched off until it upgrades.'] });
  add({ id: 'd11', type: 'content', reveal: true, kicker: 'Deep dive · Logic words', title: 'Say why, say what follows', items: [
    RC('so that', '+ a purpose', 'Stripe pins every account <b>so that</b> old code keeps working.'),
    RC('which means', '+ a result of the whole idea', 'v1 is deprecated, <b>which means</b> it will stop working soon.'),
    RC('unless', '= if not', 'Old clients keep the old version <b>unless</b> they upgrade.')] });
  add({ id: 'd12', type: 'gap', kicker: 'Deep dive · Why? · 1/2', family: 'cause', needs: ['concept: version pinning'],
    instruction: K('Example: v1 is deprecated, ___ it will stop working. → <b>which means</b>') + '<br>Use: <b>so that · unless · which means</b>',
    prompt: 'Stripe releases breaking changes only in new versions ___ old clients don’t crash.', placeholder: 'two words' });
  add({ id: 'd13', type: 'gap', kicker: 'Deep dive · Why? · 2/2', family: 'cause', needs: ['concept: version pinning', 'to pin (a version)'],
    instruction: 'Use: <b>so that · unless · which means</b>',
    prompt: 'A pinned client gets the same format ___ its developers upgrade it.', placeholder: 'one word' });
  add({ id: 'd14', type: 'content', kicker: 'Deep dive · One more word', title: 'Don’t call us — we’ll call you', teaches: ['concept: webhook'], items: [
    term('webhook', '/ˈwebhʊk/', 'вебхук'),
    MX('A webhook is a message the <b>server</b> sends to the client’s own URL when something happens: “Payment 42 succeeded.”'),
    SM('Without it, the client has to keep asking: “Paid yet? Now?” — thousands of useless requests.'),
    K('Usually the client calls the server. Here the server calls the client.')] });
  add({ id: 'd14b', type: 'mcq', kicker: 'Deep dive · What should it use?', family: 'scenario', needs: ['webhook', 'timeout', 'rate limit'],
    prompt: 'An online shop must know <b>the moment</b> a payment succeeds, without sending thousands of requests. It should use …',
    options: ['a longer timeout.', 'a higher rate limit.', 'a webhook.'] });
  para('r9', 9, 'Adding a new endpoint or field is allowed at any time, because such changes are <b>backward compatible</b>: existing code keeps working. Stripe also sends <b>webhooks</b> when a payment succeeds, so clients do not need to keep asking. Since 2024, Stripe has followed a new rhythm: a new version every month with no breaking changes, and twice a year a major release, such as 2024-09-30.acacia, that may include them.');
  add({ id: 'd15', type: 'mcq', kicker: 'Reading · True, false or not given?', family: 'tfng',
    needs: ['breaking change', 'version'],
    prompt: '“Since 2024, every monthly Stripe version may contain breaking changes.”',
    options: ['True', 'Not given', 'False'] });
  add({ id: 'd16', type: 'gap', kicker: 'Deep dive · Word forms · 1/2', family: 'wordform', needs: ['backward compatible'],
    instruction: K('Example: Stripe’s ___ (promise) is simple. → <b>promise</b> (no change)') + '<br>Change the word in brackets if needed.',
    prompt: 'Backward ___ (compatible) is the main promise of Stripe’s API.', placeholder: 'one word' });
  add({ id: 'd17', type: 'gap', kicker: 'Deep dive · Word forms · 2/2', family: 'wordform', needs: ['to deprecate', 'endpoint'],
    instruction: 'Change the word in brackets.',
    prompt: 'The ___ (deprecate) of /v1/posts was announced six months in advance.', placeholder: 'one word' });
  add({ id: 'd18', type: 'gap', kicker: 'Deep dive · Define it', family: 'define', needs: ['webhook', 'to pin (a version)', 'changelog'],
    instruction: K('Example: A ___ is a program that sends requests. → <b>client</b>') + '<br>One or two words.',
    prompt: 'A ___ is a dated list of every change in an API.', placeholder: 'one word' });

  /* ================= Block 5 · Writing the rules ================= */
  add({ id: 'b5', type: 'end', kicker: 'Writing the rules', title: 'MUST, SHOULD, MAY — and good advice', text: 'The language of specifications' });
  add({ id: 'g5', type: 'content', reveal: true, kicker: 'Writing the rules · Rule 3 · 1/2', title: 'Spec words (RFC 2119)', items: [
    GT(['spec says', 'plain English'], [
      ['<b>MUST</b>', 'you have to'],
      ['<b>MUST NOT</b>', 'you aren’t allowed to'],
      ['<b>SHOULD</b>', 'it’s a good idea (strongly recommended)'],
      ['<b>SHOULD NOT</b>', 'it’s a bad idea'],
      ['<b>MAY</b> · OPTIONAL', 'you can choose']]),
    SM('Specs write them in CAPITALS, so nobody reads them as ordinary words.')] });
  add({ id: 'g6', type: 'content', reveal: true, kicker: 'Writing the rules · Rule 3 · 2/2', title: 'Formal phrases + the passive', items: [
    RC('= must', '<b>be required to</b>', 'Clients <b>are required to</b> use HTTPS.'),
    RC('= mustn’t', '<b>be not allowed to</b>', 'Clients <b>are not allowed to</b> share keys.'),
    FX('modal', '+', 'be', '+', 'V3'),
    RC('passive', 'what happens to the thing', 'The API key <b>must be sent</b> in the header. Responses <b>may be cached</b>.')] });
  add({ id: 'm1', type: 'match', kicker: 'Writing the rules · Spec → plain', family: 'register', needs: ['rule 3: MUST / SHOULD / MAY · be required / allowed'],
    prompt: 'What does each spec word (1–4) mean in plain English? Two options (a–f) are extra.',
    left: ['MUST', 'MUST NOT', 'SHOULD', 'MAY'],
    right: ['you can choose', 'you had to', 'it’s a good idea', 'you have to', 'you’d better ask', 'you aren’t allowed to'] });
  add({ id: 'e7', type: 'gap', kicker: 'Writing the rules · Rewrite · 1/3', family: 'transform', needs: ['rule 3: MUST / SHOULD / MAY · be required / allowed', 'API key'],
    instruction: K('Example: Clients MUST use HTTPS. → Clients <b>are required to</b> use HTTPS.') + '<br><b>Clients MUST NOT share API keys between apps.</b>',
    prompt: 'Clients are not ___ to share API keys between apps.', placeholder: 'one word' });
  add({ id: 'e8', type: 'gap', kicker: 'Writing the rules · Rewrite · 2/3', family: 'transform', needs: ['rule 3: MUST / SHOULD / MAY · be required / allowed', 'API key'],
    instruction: '<b>Clients MUST send the API key in the header.</b> ' + K('(passive)'),
    prompt: 'The API key must ___ sent in the header.', placeholder: 'one word' });
  add({ id: 'g7', type: 'content', reveal: true, kicker: 'Writing the rules · Rule 4 · 1/3', title: 'Advice: should · ought to · had better', items: [
    FX('should / ought to / had better', '+', 'verb (no to)'),
    RC('should', 'a good idea, the usual word', 'A client <b>should cache</b> data that rarely changes.'),
    RC('ought to', 'the same, more formal and rarer', 'You <b>ought to set</b> a timeout.')] });
  add({ id: 'g7b', type: 'content', reveal: true, kicker: 'Writing the rules · Rule 4 · 2/3', title: 'Advice with a warning', items: [
    RC('had better (’d better)', 'advice + warning: <b>or</b> something bad happens', 'You<b>’d better add</b> a retry, <b>or</b> the app will crash on every 429.'),
    RC('✗', 'you’d better <s>to add</s> · had better is about <b>now</b>, not the past', 'you’d better <b>add</b>')] });
  add({ id: 'g8', type: 'content', reveal: true, kicker: 'Writing the rules · Rule 4 · 3/3', title: 'Two more patterns', items: [
    RC('should have + V3', 'criticism of the past: it was a good idea, but it didn’t happen', 'Reddit <b>should have announced</b> the prices earlier.'),
    RC('be supposed to', 'the rule says so, but often it doesn’t happen', '“price” <b>is supposed to</b> be a number, but yesterday it came as text.'),
    ...EV('We<b>’d better</b> leave now, <b>or</b> we’ll miss the train.', 'Нам краще вийти зараз, бо спізнимося на потяг.')] });
  add({ id: 'e9', type: 'mcq', kicker: 'Writing the rules · Choose the form', family: 'form', needs: ['rule 4: should · ought to · had better · should have · be supposed to', 'timeout'],
    prompt: K('Example: It’s raining. You ___ take an umbrella. → <b>should</b>') + '<br>The demo starts in ten minutes. We ___ fix the timeout now, or the app will freeze on stage.',
    options: ['had better', 'don’t have to', 'had to'] });
  add({ id: 'e10', type: 'mcq', kicker: 'Writing the rules · Find the mistake', family: 'error', needs: ['rule 4: should · ought to · had better · should have · be supposed to', 'to retry'],
    prompt: 'You had better to add a retry, or the app will crash.<br>' + TAP,
    options: ['a retry,', 'or the app will crash', 'You had better to add'] });
  add({ id: 'e11', type: 'gap', kicker: 'Writing the rules · Rewrite · 3/3', family: 'transform', needs: ['rule 3: MUST / SHOULD / MAY · be required / allowed', 'rule 4: should · ought to · had better · should have · be supposed to', 'to cache'],
    instruction: '<b>Responses SHOULD NOT be cached for longer than 60 seconds.</b>',
    prompt: 'You ___ cache responses for longer than 60 seconds.', placeholder: 'one word' });
  SAY('Клієнтам варто кешувати дані, які рідко змінюються.', 'Clients should cache data that rarely changes.',
    'You <b>should</b> see a doctor about that cough.', 'Тобі варто показатися лікареві з цим кашлем.', ['rule 4: should · ought to · had better · should have · be supposed to', 'to cache']);
  add({ id: 'e12', type: 'gap', kicker: 'Writing the rules · Complete it', family: 'form', needs: ['rule 4: should · ought to · had better · should have · be supposed to', 'field'],
    instruction: K('Example: The train ___ to arrive at six, but it’s late. → is <b>supposed</b>') + '<br>One word.',
    prompt: 'According to the docs, the “price” field is ___ to be a number, but yesterday it came as text.', placeholder: 'one word' });
  SAY('Поле «price» мало б бути числом, але вчора прийшло текстом.', 'The “price” field is supposed to be a number, but yesterday it came as text.',
    'I’m <b>supposed to</b> be on a diet, but I just ate a whole cake.', 'Я ніби на дієті, але щойно з’їв цілий торт.', ['rule 4: should · ought to · had better · should have · be supposed to', 'field']);
  para('r10', 10, 'The basic rules for API teams are simple. You must never remove or rename a field without a new version. When you <b>deprecate</b> an endpoint, you should announce it months <b>in advance</b> and give a clear <b>sunset date</b>. You had better keep a <b>changelog</b>, or clients will discover your changes the hard way. And remember that an API is not just code: it is a contract with people who have built their work on top of yours.');
  const LOG = CARD('📋 Changelog · November 5, 2026',
    'A. <b>/v1/posts</b> is deprecated. Clients SHOULD move to /v2/posts.<br>B. Sunset date: March 31, 2027. After it, /v1/posts MUST NOT be called.<br>C. we kinda renamed price → cost, sorry lol');
  add({ id: 'e13', type: 'mcq', kicker: 'Writing the rules · Changelog', family: 'genre', needs: ['changelog', 'to deprecate', 'sunset date', 'rule 3: MUST / SHOULD / MAY · be required / allowed'],
    prompt: LOG + '<br>Which line breaks the rules of a changelog <b>and</b> the rules of paragraph 10?',
    options: ['A', 'B', 'C'] });
  add({ id: 'e14', type: 'open', kicker: 'Writing the rules · Your verdict', family: 'form', needs: ['rule 4: should · ought to · had better · should have · be supposed to', 'in advance'],
    prompt: '“Reddit had every right to change its prices.” <b>One sentence:</b> what should Reddit have done?<br>Use: <i>Reddit should have … , so that …</i><br>' + K('Ideas: announce it six months in advance · give a sunset date for the free API · a lower price for small apps'),
    placeholder: 'Reddit should have … , so that …' });

  /* ================= Block 6 · Words and sounds that trick you ================= */
  add({ id: 'b6', type: 'end', kicker: 'Traps', title: 'Words and sounds that trick you', text: 'Same Ukrainian word, different English words' });
  const trap = (pair, uk, ex) => SM('<b>' + pair + '</b><br>' + K(uk) + '<br><i>' + ex + '</i>');
  add({ id: 't1', type: 'content', reveal: true, kicker: 'Traps · 1/3', title: 'One Ukrainian word, two English words', items: [
    trap('response ≠ answer', '«відповідь сервера» = response · answer — відповідь людини',
      'The server sent a 200 response; she didn’t answer my email.'),
    trap('request ≠ query', '«запит» до API = request · query — запит до бази даних, пошуковий запит',
      'Apollo sends a request; Reddit runs a query on its database.')] });
  add({ id: 't1b', type: 'content', reveal: true, kicker: 'Traps · 2/3', title: 'Two more pairs', teaches: ['traps: response · query · call · current'], items: [
    trap('call ≠ challenge', '«виклик API» = API call · challenge — складне завдання',
      'Each API call cost money; paying was a real challenge.'),
    trap('current ≠ actual', '«актуальна версія» = the current version · actual — справжній, фактичний',
      'Use the current version; the actual bill was $20 million.')] });
  add({ id: 'tm', type: 'match', kicker: 'Traps · Pick the word', family: 'trap', needs: ['traps: response · query · call · current'],
    prompt: 'Which word fits each gap (1–4)? Two options (a–f) are extra.',
    left: ['a 404 ___ (відповідь)', 'a slow SQL ___ (запит)', 'each API ___ (виклик)', 'the ___ version, 5.1 (актуальна)'],
    right: ['call', 'answer', 'current', 'query', 'actual', 'response'] });
  add({ id: 't2', type: 'content', reveal: true, kicker: 'Traps · 3/3', title: 'Two more', teaches: ['traps: deprecated · client'], items: [
    trap('deprecated ≠ obsolete', 'deprecated — ще працює, але буде вилучено · obsolete — уже не вживається',
      'The v1 endpoint is deprecated; floppy disks are obsolete.'),
    trap('client ≠ customer', '«клієнт API» = client (програма) · customer — покупець',
      'Apollo was a client of Reddit’s API; Apollo’s customers paid for the app.')] });
  add({ id: 'pe1', type: 'mcq', kicker: 'Traps · Fix the machine translation · 1/2', family: 'post-edit', needs: ['traps: deprecated · client', 'endpoint'],
    prompt: K('Example: «актуальна версія» → <s>actual</s> <b>current</b> version') + '<br>«Ендпоінт v1 застарілий: він працює до березня.»<br>→ The v1 endpoint is obsolete: it works until March.<br>' + TAP,
    options: ['The v1 endpoint', 'is obsolete', 'it works until March'] });
  add({ id: 'pe2', type: 'mcq', kicker: 'Traps · Fix the machine translation · 2/2', family: 'post-edit', needs: ['traps: deprecated · client', 'rate limit'],
    prompt: '«Наш клієнт (мобільний застосунок) перевищив ліміт запитів.»<br>→ Our customer, the mobile app, went over the rate limit.<br>' + TAP,
    options: ['Our customer,', 'the mobile app,', 'went over the rate limit'] });
  add({ id: 'pe3', type: 'gap', kicker: 'Traps · Correct it', family: 'error', needs: ['traps: response · query · call · current'],
    instruction: '<s>The server returned an answer with status code 200.</s><br>Replace the wrong word.',
    prompt: 'The server returned a ___ with status code 200.', placeholder: 'one word' });
  add({ id: 'sd', type: 'content', reveal: true, kicker: 'Traps · Say it right · One student per line', family: 'abbr', teaches: ['concept: reading abbreviations'], items: [
    GT(['written', 'engineers say'], [
      ['API', 'A-P-I, letter by letter'],
      ['JSON', 'like the name <b>Jason</b>'],
      ['REST', 'like the word <b>rest</b>'],
      ['HTTP · URL', 'letter by letter'],
      ['2017-05-24', 'May twenty-fourth, twenty seventeen']]),
    SM('Stress: <b>DEP</b>recate · inte<b>GRA</b>tion · <b>PAY</b>load · com<b>PAT</b>ible')] });
  add({ id: 'st1', type: 'mcq', kicker: 'Traps · Stress', family: 'stress', needs: ['concept: reading abbreviations', 'to deprecate'],
    prompt: K('Example: PAYload') + '<br>Where is the stress in <b>deprecated</b>?',
    options: ['de-PRE-ca-ted', 'DEP-re-ca-ted', 'dep-re-CA-ted'] });
  add({ id: 'st2', type: 'gap', kicker: 'Traps · Say it right', family: 'abbr', needs: ['concept: reading abbreviations', 'concept: status codes'],
    instruction: 'A colleague reads: <b>“GET slash vee one slash posts, four twenty-nine.”</b> What is on her screen?',
    prompt: 'GET /v1/posts → ___', placeholder: 'a number' });

  /* ================= Block 7 · Speaking: the API team ================= */
  add({ id: 'b7', type: 'end', kicker: 'The API team', title: 'Talk like an API team', text: 'Four short turns, one student at a time' });
  add({ id: 'sA1', type: 'content', reveal: true, kicker: 'The API team · Relay', format: 'paraphrase', family: 'relay',
    title: 'One rule, two ways', items: [
      SM('The teacher opens <b>one line from the docs</b>.'),
      SM('<b>Student 1</b> says it in plain English: <i>have to · mustn’t · don’t have to · should</i>'),
      SM('<b>Student 2</b> says it <b>another way</b>: <i>are required to · aren’t allowed to · needn’t · ought to · ’d better</i>'),
      K('Example: ' + CODE('MUST NOT log passwords') + ' → You <b>mustn’t</b> log them. → You <b>aren’t allowed to</b> log them.')] });
  add({ id: 'sA2', type: 'content', reveal: true, kicker: 'The API team · Relay · One student at a time', title: 'Lines from the docs', items: [
    SM('📄 <b>1.</b> ' + CODE('Clients MUST use HTTPS.')),
    SM('📄 <b>2.</b> ' + CODE('Clients MUST NOT send more than 10 requests per second.')),
    SM('📄 <b>3.</b> ' + CODE('The limit parameter is OPTIONAL. Default: 25.')),
    SM('📄 <b>4.</b> ' + CODE('Clients SHOULD cache /countries for 24 hours.'))] });
  add({ id: 'sA3', type: 'mcq', kicker: 'The API team · Listeners', poll: true,
    prompt: 'Line 3: which pattern did <b>Student 2</b> use?',
    options: ['needn’t', 'don’t need to', 'aren’t required to', 'another pattern'] });
  add({ id: 'sB1', type: 'content', reveal: true, kicker: 'The API team · Questions from a junior', format: 'cued-answers',
    title: '“Do I have to…?”', items: [
      PH('junior.jpg', 'A young developer asking a senior colleague a question at a desk with two monitors', '50% 40%', 96) + SM('<b>The teacher</b> is a junior. <b>One student at a time</b> answers, using the facts.'),
      SM('<i>No, you don’t have to …, but you should …</i><br><i>No! You mustn’t …, because …</i><br><i>Yes, you have to … . Otherwise, …</i>'),
      K('Example: “Do I have to add a timeout?” (the server hangs) → <i>Yes, you have to. Otherwise, the app will wait forever.</i>')] });
  add({ id: 'sB2', type: 'content', reveal: true, kicker: 'The API team · One student at a time', title: 'The junior asks…', items: [
    SM('❓ <b>1.</b> “Do I have to send the <b>limit</b> parameter?”<br>' + K('optional · default: 25 posts')),
    SM('❓ <b>2.</b> “Can I put the API key in the JavaScript file?”<br>' + K('secret · anyone can read front-end code · keep it on the server'))] });
  add({ id: 'sB2b', type: 'content', reveal: true, kicker: 'The API team · One student at a time', title: 'The junior asks…', items: [
    SM('❓ <b>3.</b> “I got a <b>429</b>. Do I send it again right away?”<br>' + K('rate limit · Retry-After: 30 seconds')),
    SM('❓ <b>4.</b> “Do I have to move to <b>v2</b> today?”<br>' + K('v1 is deprecated · sunset date: March 31'))] });
  add({ id: 'sB3', type: 'mcq', kicker: 'The API team · Listeners', poll: true,
    prompt: 'Question 3: what did the speaker tell the junior to do?',
    options: ['send it again at once', 'wait 30 seconds and retry', 'ask for a new API key', 'something else'] });
  add({ id: 'sC1', type: 'content', reveal: true, kicker: 'The API team · Say no politely', format: 'decline',
    title: '“Just do it for us!”', items: [
      PH('partner.jpg', 'A video call between two teams, one person leaning forward with a request', '50% 45%', 96) + SM('<b>The teacher</b> is the team lead of a big partner company. <b>One student at a time</b>: say no, say why, offer something else.'),
      SM('<b>I’m afraid we can’t</b> …, because …'),
      SM('<b>If we did that</b>, every other client <b>would have to</b> … ' + K('(Unit 4)')),
      SM('<b>What we can do is</b> … · You<b>’d better</b> … before …')] });
  add({ id: 'sC2', type: 'content', reveal: true, kicker: 'The API team · One student at a time', title: 'The partner wants…', items: [
    SM('🤝 <b>1.</b> “Keep <b>v1</b> running forever. We have no time to upgrade.”<br>' + K('v1 sunset date: March 31 · the migration guide is ready')),
    SM('🤝 <b>2.</b> “Remove the <b>rate limit</b> for us. We need 1,000 requests a minute.”<br>' + K('limit: 100 a minute · webhooks · caching')),
    SM('🤝 <b>3.</b> “Rename <b>price</b> to <b>cost</b> tomorrow. Our designers prefer it.”<br>' + K('breaking change · 300 other clients · only in a new version'))] });
  add({ id: 'sC3', type: 'mcq', kicker: 'The API team · Listeners', poll: true,
    prompt: 'Request 2: what did the speaker <b>offer instead</b>?',
    options: ['webhooks', 'caching', 'a higher limit for money', 'nothing'] });

  /* ================= Final task ================= */
  add({ id: 'fx0', type: 'end', kicker: 'Final task', title: 'Don’t be the next Reddit', text: 'One student at a time briefs a partner team on one API card' });
  add({ id: 'fx1', type: 'content', reveal: true, kicker: 'Final task · The task', format: 'brief', title: 'Four moves, one card', items: [
    SM('<b>1. What it does:</b> <i>Our API lets you … The main endpoint is …</i>'),
    SM('<b>2. The musts:</b> <i>You have to … · You mustn’t … , or …</i>'),
    SM('<b>3. The options:</b> <i>You don’t have to … · You should …</i>'),
    SM('<b>4. What’s changing:</b> <i>… is deprecated, which means … You’ll have to … by …</i>')] });
  const API = (id, n, t, lines) => add({ id, type: 'content', kicker: 'Final task · API card ' + n + '/3', title: t, items: lines.map(SM) });
  API('fx2', 1, '🌦️ A. Weather API', [
    '<b>Endpoint:</b> ' + CODE('GET /v2/forecast?city=…'),
    '<b>MUST:</b> API key in the header · <b>MUST NOT:</b> more than 60 requests a minute',
    '<b>OPTIONAL:</b> ' + CODE('days') + ' (default 3) · <b>SHOULD:</b> cache for 10 minutes',
    '<b>Change:</b> /v1 is deprecated · sunset date: <b>December 1</b>']);
  API('fx3', 2, '🎓 B. University timetable API', [
    '<b>Endpoint:</b> ' + CODE('GET /v1/groups/{id}/schedule'),
    '<b>MUST:</b> HTTPS · <b>MUST NOT:</b> share student data',
    '<b>OPTIONAL:</b> ' + CODE('week') + ' (default: this week) · <b>SHOULD:</b> use webhooks for room changes',
    '<b>Change:</b> the field ' + CODE('room') + ' becomes an object in <b>v2</b> · v1 works until <b>June 30</b>']);
  API('fx4', 3, '🍕 C. Food delivery orders API', [
    '<b>Endpoint:</b> ' + CODE('POST /v3/orders'),
    '<b>MUST:</b> API key + a unique order ID · <b>MUST NOT:</b> retry faster than every 5 seconds',
    '<b>OPTIONAL:</b> ' + CODE('note') + ' for the courier · <b>SHOULD:</b> set a 10-second timeout',
    '<b>Change:</b> “price” in cents from <b>v4</b> · see the changelog']);
  add({ id: 'fx5', type: 'mcq', kicker: 'Final task · Vote', poll: true,
    prompt: 'Which API should the <b>first</b> speaker brief the partners on?',
    options: ['A — Weather', 'B — University timetable', 'C — Food delivery orders'] });
  add({ id: 'fx6', type: 'content', reveal: true, kicker: 'Final task · Example', title: 'How it sounds', items: [
    SM('<b>Card:</b> a currency API · /v1/rates · key required · max 30 requests a minute · base currency optional · v1 sunset May 1'),
    SM('<i>Our API gives you exchange rates. The main endpoint is /v1/rates. You <b>have to</b> send your API key with every request, and you <b>mustn’t</b> send more than thirty a minute. You <b>don’t have to</b> choose a base currency. One warning: v1 is deprecated, <b>which means</b> it stops working on May 1. You<b>’ll have to</b> move to v2 by then, so you<b>’d better</b> start now.</i>')] });
  add({ id: 'fx7', type: 'gap', kicker: 'Final task · Move 4 for card A', family: 'form', needs: ['rule 1: must · have to · had to · will have to', 'to deprecate', 'sunset date'],
    instruction: 'Card A: /v1 is deprecated · sunset date: December 1.',
    prompt: '/v1 is deprecated, so you ___ move to /v2 by December 1.', placeholder: 'three words' });
  add({ id: 'fx8', type: 'content', kicker: 'Final task · While you listen', title: 'Check the speaker', items: [
    SM('All <b>four moves</b>, in order?'),
    SM('<b>have to / mustn’t</b> for the rules? <b>don’t have to / should</b> for the options?'),
    SM('<b>’ll have to … by …</b> and a <b>date</b>?'),
    SM('Then the teacher (a partner) asks: <b>“What happens if we miss the sunset date?”</b>')] });
  add({ id: 'fx9', type: 'mcq', kicker: 'Final task · Listeners', poll: true,
    prompt: 'The last speaker: which pattern did you hear <b>for the options</b> (move 3)?',
    options: ['don’t have to', 'needn’t', 'should', 'none of them'] });

  add({ id: 'end', type: 'end', kicker: 'Unit 5',
    title: 'An API is a promise.',
    text: 'Write the rules clearly — and keep them.' });

  // Мітки правил для check_lesson.js (рушій ці поля ігнорує)
  const R1 = 'rule 1: must · have to · had to · will have to', R2 = 'rule 2: mustn’t ≠ don’t have to',
    R3 = 'rule 3: MUST / SHOULD / MAY · be required / allowed', R4 = 'rule 4: should · ought to · had better · should have · be supposed to';
  const TEACHES = { a1: ['concept: API'], g1: [R1], g2: [R1], g3: [R2], g4: [R2], g5: [R3], g6: [R3], g7: [R4], g8: [R4] };
  S.forEach((s) => {
    if (TEACHES[s.id]) s.teaches = [...(s.teaches || []), ...TEACHES[s.id]];
    if (['mcq', 'gap', 'open', 'match'].includes(s.type) && s.needs === undefined) s.needs = [];
  });

  window.LESSON = {
    id: ID,
    title: 'Unit 5 · APIs: Contracts Between Systems',
    audience: 'КН · 2 курс · B1+/B2 · Computer Science (122) · group, phones',
    concept: 'Розбір кейсу «Один контракт зламано, інший дотримано»: Apollo закрилося через ціни на API Reddit (2023) ↔ Stripe тримає старі версії API з 2011 р. Кожен блок додає до кейсу одну частину: як Apollo говорить із Reddit → ліміти й рахунок на $20 млн → правила документації → глибокий розбір версіонування Stripe → мова специфікацій і порада Reddit → пастки й вимова → брифінг від імені API-команди. Фірмовий хід: ставка на початку, розкрита після читання.',
    known: ['API', 'app', 'server', 'code', 'data', 'user', 'website', 'bug', 'update', 'upgrade', 'database', 'token', 'key', 'URL', 'documentation', 'docs',
      'header', 'parameter', 'library', 'HTTPS', 'front-end', 'JavaScript', 'log', 'logs', 'security flaw', 'index', 'SQL', 'ID', 'iPhone', 'post', 'comment',
      'so that', 'unless', 'which means', 'the speed', 'math'],
    wordlistExtra: [
      { after: 'a7', term: 'Unauthorized (401)', ipa: '/ʌnˈɔːθəraɪzd/', uk: 'неавторизований: клієнт не підтвердив, хто він' },
      { after: 'a7', term: 'Too Many Requests (429)', ipa: '/tuː ˈmeni rɪˈkwests/', uk: 'забагато запитів' },
      { after: 'r2', term: 'REST', ipa: '/rest/', uk: 'REST, найпоширеніший стиль веб-API' },
      { after: 'q5', term: 'to hit the rate limit', ipa: '/hɪt ðə ˈreɪt ˌlɪmɪt/', uk: 'досягти ліміту запитів' },
      { after: 'q6', term: 'to set a timeout', ipa: '/set ə ˈtaɪmaʊt/', uk: 'встановити тайм-аут' },
      { after: 'd11', term: 'which means', ipa: '/wɪtʃ ˈmiːnz/', uk: 'що означає, а отже' },
      { after: 'g6', term: 'to be required to', ipa: '/rɪˈkwaɪərd/', uk: 'бути зобов’язаним' },
      { after: 'g7', term: 'had better (’d better)', ipa: '/hæd ˈbetər/', uk: 'краще б (порада з попередженням)' },
      { after: 'g8', term: 'to be supposed to', ipa: '/səˈpoʊst tə/', uk: 'мати б (за правилом), начебто мати' },
      { after: 't1', term: 'query', ipa: '/ˈkwɪri/', uk: 'запит (до бази даних)', note: 'request — запит до API' },
      { after: 't2', term: 'obsolete', ipa: '/ˌɑːbsəˈliːt/', uk: 'застарілий, вийшов з ужитку', note: '≠ deprecated' },
      { after: 'sC1', term: 'I’m afraid we can’t …', ipa: '/aɪm əˈfreɪd wi ˈkænt/', uk: 'на жаль, ми не можемо …' }
    ],
    slides: S
  };
})();

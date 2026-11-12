/* Unit 5 (КН) · APIs: Contracts Between Systems · «Порушена обіцянка»
   ПУБЛІЧНА частина (бачать студенти). Нотатки й ключі — у teacher.js (не публікується). */
window.LESSON = {
 "id": "esp-kn-unit5",
 "title": "Unit 5 · APIs: Contracts Between Systems",
 "audience": "КН · 2nd year · B1+/B2 · Computer Science (web technologies) · group, students on phones",
 "concept": "Порушена обіцянка. Наскрізна лінія — два листи про ту саму новину (грубий і ввічливий), історія Apollo й Reddit (2023) на часовій шкалі й Stripe як компанія, що дотримується обіцянки. Блоки: два листи (голосування й чому) → історія (API як офіціант, текст 1–3, найточніше речення, шкала з чотирьох дат) → Правило 1 на шкалі (be due to / set to / about to) → гроші й час (fee, free of charge, a price hike, raise prices, on short notice AmE, in advance, реакція на твердження) → інший шлях (зміна, що ламає, roll out / phase out, deprecated, sunset date, changelog, Stripe, порядок прощання з версією, словотвір, наголос) → Правило 2 (will be + -ing / will have + V3, by ≠ until) → сказати як слід (фрази оголошення, регістр, порядок слів, ввічлива відмова, скарга, «правильно чи хибно», виправити лист A рядок за рядком) → відтворити шкалу → передати оголошення по колу. Техніка — на рівні користувача; викладач лише слухає й виправляє.",
 "known": [
  "app",
  "apps",
  "server",
  "servers",
  "code",
  "data",
  "user",
  "users",
  "website",
  "bug",
  "update",
  "phone",
  "posts",
  "comments",
  "pictures",
  "developer",
  "developers",
  "company",
  "price",
  "prices",
  "money",
  "business",
  "text",
  "number",
  "plan",
  "guide",
  "free",
  "pay",
  "paid",
  "month",
  "year",
  "version",
  "email",
  "login",
  "access",
  "webinar",
  "train",
  "bus",
  "gym",
  "schedule",
  "launch",
  "to launch",
  "request",
  "requests"
 ],
 "wordlistExtra": [
  {
   "after": "e1",
   "term": "to switch off",
   "ipa": "/ˌswɪtʃ ˈɔːf/",
   "uk": "вимкнути"
  },
  {
   "after": "r1",
   "term": "a request",
   "ipa": "/rɪˈkwest/",
   "uk": "запит"
  },
  {
   "after": "r2",
   "term": "to charge for",
   "ipa": "/tʃɑːrdʒ/",
   "uk": "брати плату за"
  },
  {
   "after": "r3",
   "term": "to object (to)",
   "ipa": "/əbˈdʒekt/",
   "uk": "заперечувати (проти)"
  },
  {
   "after": "g1b",
   "term": "be due to · be set to · be about to",
   "noIpa": true,
   "uk": "мати (за планом) · збиратися · от-от"
  },
  {
   "after": "o2",
   "term": "to release",
   "ipa": "/rɪˈliːs/",
   "uk": "випустити"
  },
  {
   "after": "o7",
   "term": "a notification",
   "ipa": "/ˌnoʊtɪfɪˈkeɪʃn/",
   "uk": "сповіщення"
  },
  {
   "after": "g2b",
   "term": "by · until",
   "ipa": "/baɪ/ · /ənˈtɪl/",
   "uk": "не пізніше ніж · аж до"
  },
  {
   "after": "n1",
   "term": "Please note that …",
   "noIpa": true,
   "uk": "Зверніть увагу, що …"
  },
  {
   "after": "n1",
   "term": "Thank you for your patience.",
   "noIpa": true,
   "uk": "Дякуємо за терпіння."
  }
 ],
 "slides": [
  {
   "id": "title",
   "type": "title",
   "kicker": "Unit 5 · English for Computer Science",
   "title": "APIs: Contracts Between Systems",
   "subtitle": "A broken promise"
  },
  {
   "id": "e1",
   "type": "content",
   "reveal": true,
   "kicker": "Two emails · Same news",
   "title": "Which one would you trust?",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Email A · from a big website</span>Starting July 1, access to our data is paid. Apps that don’t pay will be switched off.</span>",
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Email B · from another big website</span>We’re writing to let you know about a change. Starting January 1 — six months from today — large apps will need a paid plan. We understand this may be difficult, so free access will continue until then. Thank you for your patience.</span>"
   ]
  },
  {
   "id": "e2",
   "type": "mcq",
   "poll": true,
   "kicker": "Two emails · Vote",
   "needs": [],
   "prompt": "You built an app on this website’s data. Which company would you trust?",
   "options": [
    "the company behind email A",
    "the company behind email B",
    "neither of them"
   ]
  },
  {
   "id": "e3",
   "type": "mcq",
   "family": "genre",
   "kicker": "Two emails · Why?",
   "needs": [],
   "prompt": "Which part of email B shows that the company <b>cares</b> about the reader?",
   "options": [
    "We understand this may be difficult",
    "large apps will need a paid plan",
    "Starting January 1",
    "about a change"
   ]
  },
  {
   "id": "s0",
   "type": "end",
   "kicker": "The story",
   "title": "An app that closed",
   "text": "Something like email A happened — to Apollo, in 2023. REST, JSON, GET, webhooks are just names: you don’t need to know how they work."
  },
  {
   "id": "s1",
   "type": "content",
   "reveal": true,
   "kicker": "The story · Before you read",
   "title": "An API is a waiter",
   "teaches": [
    "concept: API"
   ],
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>an API</b> <span class=\"muted\">/ˌeɪ piː ˈaɪ/</span><br>API, інтерфейс програмування застосунків</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>the way one program asks another program for data</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🍽️ Your app <b>orders</b>; the waiter (the API) brings it from the kitchen (the big website).</span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a provider · a client</b> <span class=\"muted\">/prəˈvaɪdər/ · /ˈklaɪənt/</span><br>постачальник · клієнт (програма)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>the provider runs the API; the client app uses it. Client ≠ customer (a person who pays).</i></span>"
   ]
  },
  {
   "id": "s2",
   "type": "match",
   "family": "label",
   "kicker": "The story · Who is who?",
   "needs": [
    "a provider",
    "a client"
   ],
   "prompt": "In the story, who is who? Match each name (1–3). One option (a–d) is extra.",
   "left": [
    "Reddit",
    "Apollo",
    "Apollo’s users"
   ],
   "right": [
    "the customers",
    "the provider",
    "the waiter",
    "the client"
   ]
  },
  {
   "id": "p1",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 1/10 · 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Open Apollo, a popular app for reading Reddit on the iPhone, and you see posts, pictures and comments. None of them live on your phone, and none of them live on Apollo’s own servers. Every time you scroll, the app sends a request to Reddit through its API, and Reddit sends the posts back.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Reddit — a huge forum website · a request — запит · to scroll — гортати · third-party — сторонній</span>"
   ]
  },
  {
   "id": "p1b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 1/10 · 2/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Apollo is a third-party app: Reddit is the provider. Every API is a promise about how such a conversation will go: what you may ask for, how to ask, and what you will get.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> Apollo shows Reddit’s posts, but it gets them from Reddit every time. The API is a promise about how they talk.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Apollo щоразу бере дописи в Reddit через API; API — це обіцянка про те, як вони спілкуються.</span>"
   ]
  },
  {
   "id": "r1q",
   "type": "gap",
   "family": "detail",
   "kicker": "Breaking the Contract · Check 1/10",
   "needs": [],
   "instruction": "One word from the text.",
   "prompt": "Every API is a ___ about how such a conversation will go.",
   "placeholder": "one word"
  },
  {
   "id": "p2",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 2/10 · 1/3",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">A typical REST API (the most common style of web API) has a set of endpoints, such as /r/pics/hot.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">REST, HTTP, GET, POST, PUT, PATCH, DELETE, JSON are just names: you don’t need to know how they work · endpoint — адреса · response — відповідь · payload — дані у відповіді · an API key — секретний код застосунку</span>"
   ]
  },
  {
   "id": "p2b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 2/10 · 2/3",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The client sends a request with an HTTP method — GET to read a resource, POST to create one, PUT or PATCH to change it, DELETE to remove it — and the server returns a response with a status code and, usually, a JSON payload.</span>"
   ]
  },
  {
   "id": "p2c",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 2/10 · 3/3",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Every request carries the app’s API key, so Reddit always knows which app is calling.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> Apps ask for data in fixed ways, like ordering from a menu. The answer comes with a short code and the data. Every request shows which app is asking.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Застосунки просять дані за сталими правилами, як із меню; кожен запит показує, хто питає.</span>"
   ]
  },
  {
   "id": "p2q",
   "type": "mcq",
   "family": "define",
   "kicker": "Breaking the Contract · Check 2/10",
   "needs": [],
   "prompt": "Which word in 2/10 means “the answer that comes back”?",
   "options": [
    "request",
    "response",
    "endpoint",
    "method"
   ]
  },
  {
   "id": "p3",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 3/10 · 1/3",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Rules work in both directions. Since July 2023, Reddit’s free plan lets a small app send about 100 requests a minute: that is the rate limit. A big app like Apollo needs far more — and has to pay.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">a free plan — безкоштовний тариф · a rate limit — ліміт запитів · to throttle — сповільнювати · to cache — зберігати копію · pagination — посторінкове завантаження</span>"
   ]
  },
  {
   "id": "p3b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 3/10 · 2/3",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">If a client sends more, the server throttles it and returns 429 Too Many Requests; a well-written client waits and retries later. A good client also caches posts it has already loaded and uses pagination, asking for 25 posts at a time, never for the whole site.</span>"
   ]
  },
  {
   "id": "p3c",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 3/10 · 3/3",
   "items": [
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> Both sides have rules. A small app may ask about 100 times a minute; a big app must pay. A polite app waits, saves what it has, and never asks for everything at once.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Правила діють для обох: мала програма — близько 100 запитів на хвилину, велика — платить, ввічлива — чекає й не просить усе одразу.</span>"
   ]
  },
  {
   "id": "p3q",
   "type": "gap",
   "family": "wordform",
   "kicker": "Breaking the Contract · Check 3/10",
   "needs": [],
   "instruction": "One word from 3/10: re- + try.",
   "prompt": "A well-written client waits and ___ later.",
   "placeholder": "one word"
  },
  {
   "id": "p4",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 4/10 · 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">In April 2023, Reddit announced that it would start charging for its API, which had been free for years. At the end of May, Christian Selig, the developer of Apollo, learned what that meant: 12,000 dollars per 50 million requests. Apollo made about seven billion requests a month — a bill of about 20 million dollars a year.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">to charge for — брати плату за · a bill — рахунок</span>"
   ]
  },
  {
   "id": "p4b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 4/10 · 2/2",
   "items": [
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> Reddit started to ask for money. For Apollo, the bill was about 20 million dollars a year.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Reddit почав брати гроші; для Apollo рахунок становив близько 20 млн доларів на рік.</span>"
   ]
  },
  {
   "id": "r2q",
   "type": "gap",
   "family": "numbers",
   "kicker": "Breaking the Contract · Check 4/10",
   "needs": [],
   "instruction": "One word from the text. Then say the whole number aloud.",
   "prompt": "Apollo made about seven ___ requests a month.",
   "placeholder": "one word"
  },
  {
   "id": "p5",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 5/10 · 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The new prices started on July 1, about a month later. Selig did not have to close the app — in theory, he could have paid — but he could not afford it, and Apollo shut down on June 30. Reddit had every right to change its prices; what developers objected to most was the speed.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">to shut down — закритися · to object (to) — заперечувати (проти)</span>"
   ]
  },
  {
   "id": "p5b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 5/10 · 2/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">A month is not enough to rebuild a business.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> Apollo closed because the price was too high. People were angry mostly about the speed: only one month.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Apollo закрився через зависоку ціну; найбільше обурила швидкість — лише місяць.</span>"
   ]
  },
  {
   "id": "rq1",
   "type": "gap",
   "family": "para",
   "kicker": "Breaking the Contract · Which part?",
   "needs": [],
   "instruction": "Type a number from 1 to 5.",
   "prompt": "The part that says what developers did not like most is part ___.",
   "placeholder": "1–5"
  },
  {
   "id": "rq2",
   "type": "mcq",
   "family": "precision",
   "kicker": "Breaking the Contract · The most precise",
   "needs": [],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: “The bill was big.” → less precise than “The bill was $20 million a year.”<br></span>Which sentence is the <b>most precise</b>?",
   "options": [
    "Reddit made its API more expensive.",
    "Reddit changed some prices in 2023.",
    "Reddit’s API was not free anymore.",
    "Reddit charged $12,000 per 50 million requests."
   ]
  },
  {
   "id": "tl",
   "type": "content",
   "reveal": true,
   "kicker": "The story · On a timeline",
   "title": "Four dates",
   "items": [
    "<svg viewBox=\"0 0 270 210\" width=\"100%\" style=\"max-width:340px;display:block\" role=\"img\" aria-label=\"The Apollo story: four dates\"><line x1=\"12\" y1=\"10\" x2=\"12\" y2=\"200\" stroke=\"var(--line)\" stroke-width=\"3\"/><circle cx=\"12\" cy=\"24\" r=\"7\" fill=\"var(--accent)\"/><text x=\"28\" y=\"20\" font-size=\"14\" fill=\"var(--ink-2)\">April 2023</text><text x=\"28\" y=\"40\" font-size=\"16\" fill=\"var(--ink)\">Reddit announces paid access</text><circle cx=\"12\" cy=\"74\" r=\"7\" fill=\"var(--accent)\"/><text x=\"28\" y=\"70\" font-size=\"14\" fill=\"var(--ink-2)\">end of May</text><text x=\"28\" y=\"90\" font-size=\"16\" fill=\"var(--ink)\">Selig learns the price</text><circle cx=\"12\" cy=\"124\" r=\"7\" fill=\"var(--accent)\"/><text x=\"28\" y=\"120\" font-size=\"14\" fill=\"var(--ink-2)\">June 30</text><text x=\"28\" y=\"140\" font-size=\"16\" fill=\"var(--ink)\">Apollo shuts down</text><circle cx=\"12\" cy=\"174\" r=\"7\" fill=\"var(--accent)\"/><text x=\"28\" y=\"170\" font-size=\"14\" fill=\"var(--ink-2)\">July 1</text><text x=\"28\" y=\"190\" font-size=\"16\" fill=\"var(--ink)\">the new prices start</text></svg>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">On <b>June 29</b>, Apollo is one day from the end. How do we say that in English? → next slide.</span>"
   ]
  },
  {
   "id": "g1a",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 1 · 1/2",
   "title": "It’s on the calendar",
   "teaches": [
    "rule: be due to · be set to · be about to"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>be</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>due to</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>verb</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">due to</span>planned for a fixed time (schedules, prices, trains)<br><i>The new prices are due to start on July 1.</i></span>",
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>be</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>set to</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>verb</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">set to</span>ready and very likely to happen (news style)<br><i>Reddit is set to charge for its API.</i></span>"
   ]
  },
  {
   "id": "g1b",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 1 · 2/2",
   "title": "Very soon",
   "teaches": [
    "rule: be due to · be set to · be about to"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>be</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>about to</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>verb</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">about to</span>in a moment, very soon (+ base verb, never -ing)<br><i>On June 29, Apollo was about to shut down.</i></span>",
    "<table class=\"gt\" style=\"width:100%;border-collapse:collapse;font-size:16px;line-height:1.35\"><tr><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\"></th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">now</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">in the past</th></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">due to</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">is due to start</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">was due to start</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">set to</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">is set to charge</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">was set to charge</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">about to</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">is about to close</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">was about to close</td></tr></table>"
   ]
  },
  {
   "id": "g1c",
   "type": "match",
   "family": "sequence",
   "kicker": "Rule 1 · On the timeline",
   "needs": [
    "rule: be due to · be set to · be about to"
   ],
   "prompt": "Which sentence (a–e) is true on each day (1–3)? Two are extra.",
   "left": [
    "April 18, 2023",
    "the evening of June 29",
    "July 2"
   ],
   "right": [
    "Apollo is due to open.",
    "Reddit has just announced it.",
    "Apollo is gone.",
    "Apollo is about to shut down.",
    "The API is free again."
   ]
  },
  {
   "id": "g1d",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 1 · Form",
   "needs": [
    "rule: be due to · be set to · be about to"
   ],
   "instruction": "Example: The train ___ (due / leave) at 9:15. → is due to leave",
   "prompt": "Hurry up! The webinar ___ (about / start)!",
   "placeholder": "four words"
  },
  {
   "id": "g1d2",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 1 · Form · In the past",
   "needs": [
    "rule: be due to · be set to · be about to"
   ],
   "instruction": "Use the past form.",
   "prompt": "The new prices ___ (due / start) on July 1, so Apollo closed on June 30.",
   "placeholder": "four words"
  },
  {
   "id": "g1e",
   "type": "mcq",
   "family": "error",
   "kicker": "Rule 1 · Find the mistake",
   "needs": [
    "rule: be due to · be set to · be about to"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: The bus is due to <s>arriving</s> at 8. → is due to <b>arrive</b><br></span><b>Our university’s new app is set to launching in February.</b><br>Tap the wrong part.",
   "options": [
    "Our university’s",
    "new app",
    "is set",
    "to launching in February."
   ]
  },
  {
   "id": "m0",
   "type": "end",
   "kicker": "Money and time",
   "title": "Who pays, and when?",
   "text": "The words of the story"
  },
  {
   "id": "m1",
   "type": "content",
   "reveal": true,
   "kicker": "Money and time · Words 1/2",
   "title": "Money",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a fee</b> <span class=\"muted\">/fiː/</span><br>плата, збір (за послугу)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a bank fee · a course fee</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>free of charge</b> <span class=\"muted\">/ˌfriː əv ˈtʃɑːrdʒ/</span><br>безкоштовно</span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a price hike</b> <span class=\"muted\">/ˈpraɪs haɪk/</span><br>різке підвищення цін</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>informal, news style; neutral: a price increase</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to raise prices</b> <span class=\"muted\">/reɪz/</span><br>підвищити ціни</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>BrE also: to put up prices</i></span>"
   ]
  },
  {
   "id": "m2",
   "type": "content",
   "reveal": true,
   "kicker": "Money and time · Words 2/2",
   "title": "Early or last minute?",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>in advance · ahead of time</b> <span class=\"muted\">/ɪn ədˈvæns/</span><br>заздалегідь</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Good companies announce changes months in advance.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>on short notice</b> <span class=\"muted\">/ˌʃɔːrt ˈnoʊtɪs/</span><br>з коротким попередженням</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>AmE; BrE at short notice</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>overnight</b> <span class=\"muted\">/ˌoʊvərˈnaɪt/</span><br>за одну ніч, раптово</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>One small change can break old apps overnight.</i></span>"
   ]
  },
  {
   "id": "m3",
   "type": "gap",
   "family": "nuance",
   "kicker": "Money and time · Complete · 1/3",
   "needs": [
    "a price hike",
    "to raise prices"
   ],
   "instruction": "Use: fee · free · hike · notice · raise",
   "prompt": "Students are angry about the ___ in the gym’s monthly price.",
   "placeholder": "one word"
  },
  {
   "id": "m4",
   "type": "gap",
   "family": "nuance",
   "kicker": "Money and time · Complete · 2/3",
   "needs": [
    "a fee"
   ],
   "instruction": "Use: fee · free · hike · notice · raise",
   "prompt": "The bank takes a two percent ___ for every card payment abroad.",
   "placeholder": "one word"
  },
  {
   "id": "m5",
   "type": "gap",
   "family": "nuance",
   "kicker": "Money and time · Complete · 3/3",
   "needs": [
    "on short notice"
   ],
   "instruction": "Use: fee · free · hike · notice · raise",
   "prompt": "Reddit changed its prices on short ___: developers had only a month.",
   "placeholder": "one word"
  },
  {
   "id": "m7",
   "type": "match",
   "family": "colloc",
   "kicker": "Money and time · Word partners",
   "needs": [
    "to raise prices",
    "free of charge",
    "on short notice",
    "ahead of time"
   ],
   "prompt": "Which word (a–e) completes each phrase (1–4)? One is extra.",
   "left": [
    "to raise …",
    "free of …",
    "on short …",
    "ahead of …"
   ],
   "right": [
    "notice",
    "charge",
    "prices",
    "time",
    "advance"
   ]
  },
  {
   "id": "m6",
   "type": "content",
   "reveal": true,
   "kicker": "Money and time · React · One student per claim",
   "title": "Fair or not?",
   "format": "react",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>That’s a fair point, because …</b><br><b>I see the point, but …</b><br><b>I don’t agree at all: …</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">1. “Reddit had every right to change its prices.”<br>2. “A month is enough to change an app.”<br>3. “Free things can’t stay free forever.”<br>4. “Apollo’s users did nothing wrong, but they lost their app.”</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Use: in advance · on short notice · a price hike · free of charge</span>"
   ]
  },
  {
   "id": "o0",
   "type": "end",
   "kicker": "The other way",
   "title": "A company that keeps its promise",
   "text": "Stripe changes, and nobody breaks"
  },
  {
   "id": "o1",
   "type": "content",
   "reveal": true,
   "kicker": "The other way · Words 1/2",
   "title": "Changes that break things",
   "teaches": [
    "concept: breaking change"
   ],
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a breaking change</b> <span class=\"muted\">/ˌbreɪkɪŋ ˈtʃeɪndʒ/</span><br>зміна, що ламає сумісність</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a change that makes old apps stop working</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🚌 Your bus stop closes overnight: a breaking change. A good company keeps the old stop for a while and warns you in advance.</span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to roll out · to phase out</b> <span class=\"muted\">/ˌroʊl ˈaʊt/ · /ˌfeɪz ˈaʊt/</span><br>запроваджувати · виводити з ужитку (поступово)</span>"
   ]
  },
  {
   "id": "p6",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 6/10 · 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The documentation sets the rules. Every request must include an API key. A client must not send more than 100 requests a minute. With pagination, a client may ask for up to 100 posts at a time, but it does not have to: the default is 25.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">documentation — документація · the default — значення за замовчуванням · RFC 2119 — just a name</span>"
   ]
  },
  {
   "id": "p6b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 6/10 · 2/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Many API documents borrow their wording from RFC 2119, a short document from 1997 that defines exactly what MUST, SHOULD and MAY mean.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> The documentation is the rulebook: what you must do, must not do and may do.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Документація — це звід правил: що треба, чого не можна і що можна робити.</span>"
   ]
  },
  {
   "id": "p6q",
   "type": "gap",
   "family": "detail",
   "kicker": "Breaking the Contract · Check 6/10",
   "needs": [],
   "instruction": "One word from the text.",
   "prompt": "A client may ask for up to 100 posts at a time, but it does not ___ to.",
   "placeholder": "one word"
  },
  {
   "id": "p7",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 7/10 · 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The provider has obligations too. Thousands of developers have written code that expects a field called “price” to be a number. If the provider renames that field or turns it into text, all that code breaks overnight. Such a change is called a breaking change, and good API teams take it almost as seriously as a security flaw.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">obligations — обов’язки · a field — поле (у даних)</span>"
   ]
  },
  {
   "id": "p7b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 7/10 · 2/2",
   "items": [
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> The provider has rules too. If it changes even one name, thousands of apps can stop working at once.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Постачальник теж має обов’язки: зміниш одну назву — і тисячі застосунків перестануть працювати.</span>"
   ]
  },
  {
   "id": "p7q",
   "type": "gap",
   "family": "detail",
   "kicker": "Breaking the Contract · Check 7/10",
   "needs": [],
   "instruction": "One word from the text.",
   "prompt": "Such a change is called a ___ change, and good API teams take it seriously.",
   "placeholder": "one word"
  },
  {
   "id": "p8",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 8/10 · 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Compare Reddit with Stripe, the payment company. In a 2017 blog post, Stripe’s engineers wrote that every version of their API had kept working since 2011. Each account is pinned to the version that is current when it makes its first request, and versions are named by date.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">pinned to — прив’язаний до · current — чинний · to upgrade — перейти на нову версію</span>"
   ]
  },
  {
   "id": "p8b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 8/10 · 2/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">When Stripe makes a breaking change, it releases a new version, and old clients do not have to upgrade until they are ready.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> Stripe keeps old versions working, so old apps can change when they are ready.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Stripe не вимикає старі версії, тож старі застосунки переходять тоді, коли готові.</span>"
   ]
  },
  {
   "id": "o1b",
   "type": "gap",
   "family": "colloc",
   "kicker": "The other way · Complete · 1/2",
   "needs": [
    "to roll out"
   ],
   "instruction": "One word.",
   "prompt": "This week, we are rolling ___ the new version of the app.",
   "placeholder": "one word"
  },
  {
   "id": "o1c",
   "type": "gap",
   "family": "define",
   "kicker": "The other way · Complete · 2/2",
   "needs": [
    "overnight",
    "a breaking change"
   ],
   "instruction": "One word.",
   "prompt": "A breaking change can stop thousands of old apps ___.",
   "placeholder": "one word"
  },
  {
   "id": "o3",
   "type": "mcq",
   "family": "tfng",
   "kicker": "Stripe · True, false or not given?",
   "needs": [
    "a breaking change"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: “Stripe is a payments company.” → True.<br></span><b>When Stripe makes a breaking change, old apps must move to the new version at once.</b>",
   "options": [
    "True",
    "False",
    "Not given"
   ]
  },
  {
   "id": "p9",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 9/10 · 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Adding a new endpoint or field is allowed at any time, because such changes are backward compatible: existing code keeps working. Stripe also sends webhooks when a payment succeeds, so clients do not need to keep asking. acacia, that may include them.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">backward compatible — сумісний зі старим · webhooks — just a name: Stripe messages your app · a major release — великий випуск</span>"
   ]
  },
  {
   "id": "p9b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 9/10 · 2/2",
   "items": [
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> Adding new things is safe. Stripe also tells apps when a payment succeeds, so they don’t have to keep asking. Big changes come only twice a year.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Додавати нове безпечно; Stripe сам повідомляє про оплату, а великі зміни — лише двічі на рік.</span>"
   ]
  },
  {
   "id": "o4",
   "type": "content",
   "reveal": true,
   "kicker": "The other way · Words 2/2",
   "title": "Saying goodbye to an old version",
   "teaches": [
    "concept: deprecation and sunset date"
   ],
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>deprecated</b> <span class=\"muted\">/ˈdeprəkeɪtɪd/</span><br>застарілий, оголошений до вилучення</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>still works, but will stop — like a bus stop that will close in June 🚏</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a sunset date</b> <span class=\"muted\">/ˈsʌnset deɪt/</span><br>дата припинення роботи</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>the day the old version is switched off</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a changelog</b> <span class=\"muted\">/ˈtʃeɪndʒlɔːɡ/</span><br>журнал змін</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a dated list of every change</i></span>"
   ]
  },
  {
   "id": "o4b",
   "type": "gap",
   "family": "define",
   "kicker": "The other way · Check the word",
   "needs": [
    "a changelog"
   ],
   "instruction": "One word.",
   "prompt": "Before you upgrade, read the ___: it lists every change with its date.",
   "placeholder": "one word"
  },
  {
   "id": "o5",
   "type": "mcq",
   "family": "nuance",
   "kicker": "The other way · In what order?",
   "needs": [
    "deprecated",
    "a sunset date"
   ],
   "prompt": "An old version says goodbye. Which order is right?",
   "options": [
    "switched off → deprecated → in use",
    "in use → deprecated → switched off on the sunset date",
    "deprecated → in use → switched off",
    "in use → switched off → deprecated"
   ]
  },
  {
   "id": "o6",
   "type": "gap",
   "family": "wordform",
   "kicker": "The other way · Word forms · 1/2",
   "needs": [
    "deprecated"
   ],
   "instruction": "Example: Reddit’s ___ (announce) came in April. → announcement",
   "prompt": "The ___ (deprecate) of the old version was announced six months in advance.",
   "placeholder": "one word"
  },
  {
   "id": "o7",
   "type": "gap",
   "family": "wordform",
   "kicker": "The other way · Word forms · 2/2",
   "needs": [],
   "instruction": "Change the form: a noun.",
   "prompt": "Turn on ___ (notify) so you know about every change.",
   "placeholder": "one word"
  },
  {
   "id": "p10",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 10/10 · 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The basic rules for API teams are simple. You must never remove or rename a field without a new version. When you deprecate an endpoint, you should announce it months in advance and give a clear sunset date. You had better keep a changelog, or clients will discover your changes the hard way.</span><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">to discover — виявити · the hard way — на гіркому досвіді</span>"
   ]
  },
  {
   "id": "p10b",
   "type": "content",
   "reveal": true,
   "kicker": "Breaking the Contract · 10/10 · 2/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">And remember that an API is not just code: it is a contract with people who have built their work on top of yours.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;border-left:4px solid var(--ok);padding-left:9px\"><b>In plain words:</b> Don’t remove things without a new version, warn early, keep a list of changes. An API is a promise to people.</span>",
    "<span style=\"display:block;font-size:16px;line-height:1.4;color:var(--ink-2)\">🇺🇦 <b>Коротко:</b> Не прибирай без нової версії, попереджай заздалегідь, веди журнал змін: API — обіцянка людям.</span>"
   ]
  },
  {
   "id": "p10q",
   "type": "gap",
   "family": "detail",
   "kicker": "Breaking the Contract · Check 10/10",
   "needs": [],
   "instruction": "One word from the text.",
   "prompt": "An API is not just code: it is a ___ with people.",
   "placeholder": "one word"
  },
  {
   "id": "g2a",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 2 · 1/2",
   "title": "On that day · By that day",
   "teaches": [
    "rule: will be + -ing · will have + V3"
   ],
   "items": [
    "<svg viewBox=\"0 0 270 160\" width=\"100%\" style=\"max-width:340px;display:block\" role=\"img\" aria-label=\"Rule 2 on a timeline\"><line x1=\"12\" y1=\"10\" x2=\"12\" y2=\"150\" stroke=\"var(--line)\" stroke-width=\"3\"/><circle cx=\"12\" cy=\"24\" r=\"7\" fill=\"var(--accent)\"/><text x=\"28\" y=\"20\" font-size=\"14\" fill=\"var(--ink-2)\">today</text><text x=\"28\" y=\"40\" font-size=\"16\" fill=\"var(--ink)\">we announce the change</text><circle cx=\"12\" cy=\"74\" r=\"7\" fill=\"var(--accent)\"/><text x=\"28\" y=\"70\" font-size=\"14\" fill=\"var(--ink-2)\">March 31 (sunset date)</text><text x=\"28\" y=\"90\" font-size=\"16\" fill=\"var(--ink)\">we will be switching off v1</text><circle cx=\"12\" cy=\"124\" r=\"7\" fill=\"var(--accent)\"/><text x=\"28\" y=\"120\" font-size=\"14\" fill=\"var(--ink-2)\">by April 1</text><text x=\"28\" y=\"140\" font-size=\"16\" fill=\"var(--ink)\">most apps will have moved to v2</text></svg>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">will be + -ing</span>in progress at a future time; also a polite, neutral plan<br><i>On March 31, we will be switching off version 1.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">will have + V3</span>finished before a future time (often with by)<br><i>By April 1, most apps will have moved to version 2.</i></span>"
   ]
  },
  {
   "id": "g2b",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 2 · 2/2",
   "title": "Watch the little words",
   "teaches": [
    "rule: will be + -ing · will have + V3"
   ],
   "items": [
    "<table class=\"gt\" style=\"width:100%;border-collapse:collapse;font-size:16px;line-height:1.35\"><tr><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">meaning</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">form</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">example</th></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">in progress at that time</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">will be + -ing</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">At 9 p.m., we’ll be updating the app (8–10 p.m.).</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">finished before that time</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">will have + V3</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">By May, we’ll have fixed it. (= We’ll fix it by May.)</td></tr></table>",
    "<span style=\"display:block;font-size:17px;line-height:1.5\">✅ By May, we <b>will have fixed</b> it.<br>❌ <s>By May, we <b>have fixed</b> it.</s></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">by = not later than (не пізніше ніж) · until = all the time up to (аж до)</span>"
   ]
  },
  {
   "id": "g2c",
   "type": "match",
   "family": "schedule",
   "kicker": "Rule 2 · Schedule → announcement",
   "needs": [
    "rule: will be + -ing · will have + V3"
   ],
   "prompt": "Turn the schedule into an announcement. Which ending (a–d) fits each line (1–3)? One is wrong English.",
   "left": [
    "8–10 p.m. tomorrow: server work. At 9 p.m., we …",
    "Friday: the bug fix is done. By Friday, we …",
    "Until May 1: the old app works. Until May 1, it …"
   ],
   "right": [
    "will keep working.",
    "will be updating the servers.",
    "will fixed the bug.",
    "will have fixed the bug."
   ]
  },
  {
   "id": "g2d",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 2 · Form · 2/2",
   "needs": [
    "rule: will be + -ing · will have + V3"
   ],
   "instruction": "will have + V3.",
   "prompt": "By the end of the year, Stripe ___ (release) two big updates.",
   "placeholder": "three words"
  },
  {
   "id": "g2e",
   "type": "gap",
   "family": "trap",
   "kicker": "Rule 2 · by or until?",
   "needs": [
    "rule: will be + -ing · will have + V3"
   ],
   "instruction": "by or until?",
   "prompt": "«Стара версія працюватиме до 31 березня.»<br>The old version will work ___ March 31.",
   "placeholder": "one word"
  },
  {
   "id": "g2f",
   "type": "mcq",
   "family": "error",
   "kicker": "Rule 2 · Find the mistake",
   "needs": [
    "rule: will be + -ing · will have + V3"
   ],
   "prompt": "<b>By June 30, Selig will had closed Apollo.</b><br>Tap the wrong part.",
   "options": [
    "By June 30, Selig",
    "will had closed",
    "Apollo."
   ]
  },
  {
   "id": "g2g",
   "type": "content",
   "reveal": true,
   "family": "translate",
   "kicker": "Rules 1–2 · Say it in English · One student per line",
   "title": "A mixed round",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">💬 Потяг має прибути о 18:40.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>The train is due to arrive at 6:40 p.m.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">💬 До п’ятниці я вже все прочитаю.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>By Friday, I’ll have read everything.</i></span>"
   ]
  },
  {
   "id": "n0",
   "type": "end",
   "kicker": "Saying it well",
   "title": "How a polite announcement sounds",
   "text": "Back to email B"
  },
  {
   "id": "n1",
   "type": "content",
   "reveal": true,
   "kicker": "Saying it well · The phrases",
   "title": "Five phrases from email B",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>We’re writing to let you know that …</b><br><b>Starting</b> + date, …<br><b>Please note that …</b><br><b>We understand this may …</b><br><b>Thank you for your patience.</b></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">patience — терпіння · Please note — зверніть увагу</span>"
   ]
  },
  {
   "id": "n2",
   "type": "mcq",
   "family": "register",
   "kicker": "Saying it well · Which one fits?",
   "needs": [],
   "prompt": "Which sentence fits a <b>polite</b> email to all users?",
   "options": [
    "Hey guys, v1 is gone soon.",
    "You must leave v1 now.",
    "We kindly order you to leave v1.",
    "Please note that version 1 will be switched off on March 31."
   ]
  },
  {
   "id": "n3",
   "type": "mcq",
   "family": "wordorder",
   "kicker": "Saying it well · Word order",
   "needs": [],
   "prompt": "Which word order is correct?",
   "options": [
    "We’re writing you to let know about a change.",
    "We’re writing to let know you about a change.",
    "We’re writing to let you know about a change."
   ]
  },
  {
   "id": "n4",
   "type": "gap",
   "family": "genre",
   "kicker": "Saying it well · Complete",
   "needs": [],
   "instruction": "One word: a modal.",
   "prompt": "We understand this ___ be difficult for some of you.",
   "placeholder": "one word"
  },
  {
   "id": "n4b",
   "type": "gap",
   "family": "genre",
   "kicker": "Saying it well · The last line",
   "needs": [],
   "instruction": "One word.",
   "prompt": "We know this change is not easy. Thank you for your ___.",
   "placeholder": "one word"
  },
  {
   "id": "n5",
   "type": "content",
   "reveal": true,
   "kicker": "Saying it well · Say no politely · One student per request",
   "title": "“Just do it for us!”",
   "format": "decline",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>I’m afraid we can’t …, because …</b><br><b>If we did that, every other app would …</b><br><b>Instead, we can …</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🤝 1. “Keep the old version forever.”<br>→ sunset date: March 31 · a guide is ready<br>🤝 2. “Give us free access. We are a small team.”<br>→ free plan: 100 requests a minute</span>"
   ]
  },
  {
   "id": "n6",
   "type": "content",
   "reveal": true,
   "kicker": "Saying it well · An Apollo user complains · One student per line",
   "title": "“That’s not fair!”",
   "format": "complain",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>I’ve been using … for … years, and now …</b><br><b>It isn’t fair that …</b><br><b>If only Reddit had …</b><br><b>What I’d like is …</b></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Facts: used Apollo for 6 years · a month’s notice · no other good app · a free plan for small apps</span>"
   ]
  },
  {
   "id": "q0",
   "type": "content",
   "kicker": "Saying it well · Right or wrong?",
   "title": "Vote fast",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Two sentences. One may be wrong. Vote on your phone; then one student who voted correctly fixes the wrong ones aloud.</span>"
   ]
  },
  {
   "id": "q1",
   "type": "mcq",
   "family": "rightwrong",
   "kicker": "Right or wrong? · 1/2",
   "needs": [
    "rule: will be + -ing · will have + V3"
   ],
   "prompt": "“The old version will work by March 31.”",
   "options": [
    "✅ right",
    "❌ wrong"
   ]
  },
  {
   "id": "q2",
   "type": "mcq",
   "family": "rightwrong",
   "kicker": "Right or wrong? · 2/2",
   "needs": [
    "rule: be due to · be set to · be about to"
   ],
   "prompt": "“The new prices are due to start on July 1.”",
   "options": [
    "✅ right",
    "❌ wrong"
   ]
  },
  {
   "id": "n7",
   "type": "content",
   "reveal": true,
   "kicker": "Saying it well · Fix email A · One student per line",
   "title": "Make it polite",
   "format": "paraphrase",
   "items": [
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">One student per line: say it again politely.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">❌ 1. “Starting July 1, access to our data is paid.”<br>❌ 2. “You have one month.”<br>❌ 3. “Apps that don’t pay will be switched off.”<br>❌ 4. “Questions? Read the website.”</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\">We’re writing to let you know that … · Please note that … · We understand this may … · If you have questions, … · Thank you for your patience.</span>"
   ]
  },
  {
   "id": "k0",
   "type": "end",
   "kicker": "Retell the text",
   "title": "The short version",
   "text": "Read it once, then retell it from key words"
  },
  {
   "id": "k1",
   "type": "content",
   "kicker": "Retell the text · The short version",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Apps like Apollo get their data from other companies through an API. An API is a promise: what you may ask for and what you will get. In April 2023, Reddit said it would charge for its API. With a bill of 20 million dollars a year, on June 29 Apollo was about to shut down. When Stripe makes a breaking change, it releases a new version, and old apps don’t have to move. Good API teams announce changes in advance and keep a changelog.</span>"
   ]
  },
  {
   "id": "k2",
   "type": "content",
   "reveal": true,
   "family": "retell-cue",
   "kicker": "Retell the text · 1/3 · One student per line",
   "title": "Lines 1–2",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>1.</b> apps / Apollo / get / data / other companies / API</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Apps like Apollo get their data from other companies through an API.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>2.</b> API / promise / what / ask for / what / get</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>An API is a promise: what you may ask for and what you will get.</i></span>"
   ]
  },
  {
   "id": "k3",
   "type": "content",
   "reveal": true,
   "family": "retell-cue",
   "kicker": "Retell the text · 2/3 · One student per line",
   "title": "Lines 3–4",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>3.</b> April 2023 / Reddit / say / charge / API</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>In April 2023, Reddit said it would charge for its API.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>4.</b> bill / 20 million / June 29 / Apollo / about / shut down</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>With a bill of 20 million dollars a year, on June 29 Apollo was about to shut down.</i></span>"
   ]
  },
  {
   "id": "k4",
   "type": "content",
   "reveal": true,
   "family": "retell-cue",
   "kicker": "Retell the text · 3/3 · One student per line",
   "title": "Lines 5–6",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>5.</b> Stripe / breaking change / new version / old apps / not have to / move</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>When Stripe makes a breaking change, it releases a new version, and old apps don’t have to move.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>6.</b> good teams / announce / in advance / changelog</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Good API teams announce changes in advance and keep a changelog.</i></span>"
   ]
  },
  {
   "id": "x0",
   "type": "end",
   "kicker": "Final task",
   "title": "Pass the announcement",
   "text": "One announcement, six students, one sentence each"
  },
  {
   "id": "x1",
   "type": "content",
   "reveal": true,
   "kicker": "Final task · How it works",
   "title": "Six sentences, six students",
   "format": "brief",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Read the card. Student 1 says sentence 1, student 2 adds sentence 2, and so on.</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>1.</b> We’re writing to let you know that …<br><b>2.</b> … is due to / is set to …<br><b>3.</b> Starting …, we will be + -ing …</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>4.</b> By …, … will have + V3 …<br><b>5.</b> Please note that … / We understand this may …<br><b>6.</b> Thank you for your patience.</span>"
   ]
  },
  {
   "id": "x2",
   "type": "content",
   "reveal": true,
   "kicker": "Final task · Example",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Example · A music app</span>new version: May 1 · offline listening: paid plan only · old version: sunset May 31 · playlists stay free</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.48\"><b>1.</b> We’re writing to let you know about our new app. <b>2.</b> Version 2 is due to launch on May 1. <b>3.</b> Starting May 1, we will be offering offline listening on the paid plan only.</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.48\"><b>4.</b> By June 1, we will have switched off the old version. <b>5.</b> Please note that your playlists stay free. <b>6.</b> Thank you for your patience.</span>"
   ]
  },
  {
   "id": "x3",
   "type": "content",
   "kicker": "Final task · Card A",
   "title": "🎓 The university schedule app",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card A</span>new app: February 1 · log in only with your university email · old app: sunset February 28 · the schedule stays free · turn on notifications for room changes</span>"
   ]
  },
  {
   "id": "x4",
   "type": "content",
   "kicker": "Final task · Card B",
   "title": "🏋️ The gym",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card B</span>a price hike: March 1, 500 → 600 hryvnias a month · current members pay the old price until June · new booking app: March 1 · old paper cards: sunset April 30</span>"
   ]
  },
  {
   "id": "x5",
   "type": "content",
   "kicker": "Final task · Card C",
   "title": "🚌 The city bus app",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card C</span>new route map: Monday · the stop “Market” closes: June 1 · a new stop “Park”, 200 m away · tickets in the app: the same price · paper tickets: phased out by July 1</span>"
   ]
  },
  {
   "id": "end",
   "type": "end",
   "kicker": "Unit 5 · APIs: Contracts Between Systems",
   "title": "An API is a promise.",
   "text": "Keep it, and announce changes well."
  }
 ]
};

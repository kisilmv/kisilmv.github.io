/* Unit 5 (КН) · APIs: Contracts Between Systems · «Порушена обіцянка»
   ПУБЛІЧНА частина (бачать студенти). Нотатки й ключі — у teacher.js (не публікується). */
window.LESSON = {
 "id": "esp-kn-unit5",
 "title": "Unit 5 · APIs: Contracts Between Systems",
 "audience": "КН · 2nd year · B1+/B2 · Computer Science (web technologies) · group, students on phones",
 "concept": "Порушена обіцянка. Наскрізна лінія — історія Apollo й Reddit (2023) як історія обіцянки, яку порушили, і Stripe як компанія, що її дотримує. Блоки: обіцянка (слова домовленостей, API як офіціант, provider/client) → рахунок (текст 1–4, слова про гроші, числа, фразові дієслова завершення, слова часу, реакція на твердження) → правила (must / have to / mustn’t / don’t have to, MUST/SHOULD/MAY, відповіді новенькому за картою документації) → порада й докір (should / had better / should have, адвокат диявола) → інший шлях (Stripe, слова зміни, словотвір, наголос, ввічлива відмова) → сказати як слід (жанр оголошення, регістр, порядок слів, аукціон помилок, скарга) → keyword drill → оголосити про зміну. Техніка — на рівні користувача; викладач лише слухає й виправляє.",
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
  "money",
  "business",
  "key",
  "text",
  "number",
  "contract",
  "plan",
  "guide",
  "free",
  "pay",
  "paid",
  "month",
  "year",
  "version 1",
  "email",
  "login"
 ],
 "wordlistExtra": [
  {
   "after": "r1",
   "term": "a request",
   "ipa": "/rɪˈkwest/",
   "uk": "запит"
  },
  {
   "after": "r1",
   "term": "third-party",
   "ipa": "/ˌθɜːrd ˈpɑːrti/",
   "uk": "сторонній"
  },
  {
   "after": "m2",
   "term": "price · cost",
   "ipa": "/praɪs/ · /kɔːst/",
   "uk": "ціна · вартість, коштувати"
  },
  {
   "after": "r5",
   "term": "to object (to)",
   "ipa": "/əbˈdʒekt/",
   "uk": "заперечувати (проти)"
  },
  {
   "after": "g1b",
   "term": "mustn’t",
   "ipa": "/ˈmʌsnt/",
   "uk": "не можна (заборона)"
  },
  {
   "after": "g1b",
   "term": "don’t have to",
   "ipa": "/doʊnt ˈhæf tə/",
   "uk": "не обов’язково"
  },
  {
   "after": "g3a",
   "term": "had better",
   "ipa": "/hæd ˈbetər/",
   "uk": "краще (порада з попередженням)"
  },
  {
   "after": "o7",
   "term": "deprecation",
   "ipa": "/ˌdeprəˈkeɪʃn/",
   "uk": "оголошення застарілим"
  },
  {
   "after": "o8",
   "term": "dependable",
   "ipa": "/dɪˈpendəbl/",
   "uk": "надійний"
  },
  {
   "after": "n2",
   "term": "Please note that …",
   "noIpa": true,
   "uk": "Зверніть увагу, що …"
  },
  {
   "after": "n2",
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
   "id": "l1",
   "type": "content",
   "reveal": true,
   "kicker": "The story · June 30, 2023",
   "title": "An app closes. Nothing is broken.",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>Apollo</b>, a popular app for reading Reddit on the iPhone, shuts down.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">The app has no serious bug. Its servers work fine.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Its developer, Christian Selig, closes it because of <b>one change on Reddit’s side</b>.</span>"
   ]
  },
  {
   "id": "l2",
   "type": "mcq",
   "poll": true,
   "kicker": "The story · Place your bet",
   "prompt": "Your bet: what did Reddit change?<span class=\"muted\" style=\"font-size:15px;line-height:1.35\"><br>No wrong answers yet. We check later.</span>",
   "options": [
    "It switched off its API.",
    "It started to charge money.",
    "It banned all other apps.",
    "It deleted Apollo’s account."
   ]
  },
  {
   "id": "p0",
   "type": "end",
   "kicker": "The promise",
   "title": "Words for agreements",
   "text": "Before the story: how people promise"
  },
  {
   "id": "p1",
   "type": "content",
   "reveal": true,
   "kicker": "The promise · Words 1",
   "title": "Keep it or break it",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to keep / to break a promise</b> <span class=\"muted\">/ˈprɑːmɪs/</span><br>дотримати / порушити обіцянку</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Many users felt that Reddit broke a promise.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to keep your word</b> <span class=\"muted\">/wɜːrd/</span><br>дотримати слова</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>He said he would help, and he kept his word.</i></span>"
   ]
  },
  {
   "id": "p1b",
   "type": "content",
   "reveal": true,
   "kicker": "The promise · Words 2",
   "title": "The rules you sign",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>terms and conditions</b> <span class=\"muted\">/ˌtɜːrmz ən kənˈdɪʃnz/</span><br>умови користування</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Nobody reads the terms and conditions.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>the fine print</b> <span class=\"muted\">/ˌfaɪn ˈprɪnt/</span><br>дрібний шрифт (умови, які легко пропустити)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>The fine print says prices may change.</i></span>"
   ]
  },
  {
   "id": "p2",
   "type": "match",
   "family": "colloc",
   "kicker": "The promise · Which verb?",
   "needs": [
    "to keep / to break a promise",
    "to keep your word",
    "the fine print",
    "terms and conditions"
   ],
   "prompt": "Which verb (a–f) fits each sentence (1–4)? Two verbs are extra.",
   "left": [
    "Always ___ the fine print.",
    "He promised to help, and he ___ his word.",
    "Tap “I agree” to ___ the terms.",
    "If you ___ the contract, you pay a fine."
   ],
   "right": [
    "accept",
    "kept",
    "read",
    "break",
    "made",
    "did"
   ]
  },
  {
   "id": "p3",
   "type": "content",
   "reveal": true,
   "kicker": "The promise · Between programs",
   "title": "An API is a waiter",
   "teaches": [
    "concept: API"
   ],
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>an API</b> <span class=\"muted\">/ˌeɪ piː ˈaɪ/</span><br>API, інтерфейс програмування застосунків</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Application Programming Interface: the way one program asks another program for data</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🍽️ Your app <b>orders</b>. The waiter (the API) takes the order to the kitchen (the server) and <b>brings the food back</b>.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">📄 The menu = the <b>documentation</b>: what you may order and how.</span>"
   ]
  },
  {
   "id": "p4",
   "type": "content",
   "reveal": true,
   "kicker": "The promise · Who is who",
   "title": "Provider and client",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a provider</b> <span class=\"muted\">/prəˈvaɪdər/</span><br>постачальник (послуги)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>the company that runs the API: Reddit</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a client</b> <span class=\"muted\">/ˈklaɪənt/</span><br>клієнт (програма)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>the app that uses the API: Apollo</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">trap</span><b>client ≠ customer</b>: in IT, a client is often a program; a customer is a person who pays<br><i>Apollo is a client of Reddit’s API. Apollo’s users are its customers.</i></span>"
   ]
  },
  {
   "id": "p5",
   "type": "mcq",
   "family": "trap",
   "kicker": "The promise · Check",
   "needs": [
    "a provider",
    "a client"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: Apollo uses Reddit’s API → Apollo is a client.<br></span>A taxi app shows a Google map. For this app, Google is …",
   "options": [
    "a client.",
    "a customer.",
    "a provider."
   ]
  },
  {
   "id": "b0",
   "type": "end",
   "kicker": "The bill",
   "title": "What happened to Apollo",
   "text": "The story, in four short parts"
  },
  {
   "id": "r1",
   "type": "content",
   "kicker": "Breaking the Contract · 1/4",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Open Apollo and you see posts, pictures and comments. None of them live on your phone, and none of them live on Apollo’s own servers. Every time you scroll, the app sends a request to Reddit through its API, and Reddit sends the posts back. Apollo is a third-party app: Reddit is the provider. Every API is a promise about how such a conversation will go: what you may ask for, how to ask, and what you will get.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">a request — запит · third-party — сторонній</span>"
   ]
  },
  {
   "id": "r1q",
   "type": "gap",
   "family": "detail",
   "kicker": "Breaking the Contract · Check 1/4",
   "needs": [],
   "instruction": "One word from the text.",
   "prompt": "Every time you scroll, Apollo sends a ___ to Reddit.",
   "placeholder": "one word"
  },
  {
   "id": "m1",
   "type": "content",
   "reveal": true,
   "kicker": "The bill · Money words",
   "title": "Who pays?",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to charge (for)</b> <span class=\"muted\">/tʃɑːrdʒ/</span><br>брати плату (за)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>In 2023, Reddit started to charge for its API.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a fee</b> <span class=\"muted\">/fiː/</span><br>плата, збір (за послугу)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a bank fee · a course fee</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to afford</b> <span class=\"muted\">/əˈfɔːrd/</span><br>мати змогу (за)платити</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>I can’t afford a new laptop.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>free of charge</b> <span class=\"muted\">/ˌfriː əv ˈtʃɑːrdʒ/</span><br>безкоштовно</span>"
   ]
  },
  {
   "id": "m2",
   "type": "content",
   "reveal": true,
   "kicker": "The bill · Money words · Close meanings",
   "title": "price · cost · fee · charge",
   "items": [
    "<table class=\"gt\" style=\"width:100%;border-collapse:collapse;font-size:16px;line-height:1.35\"><tr><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">word</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">means</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">example</th></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>price</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">what a seller asks</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">The price went up.</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>cost</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">what you spend (also a verb)</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">It costs $5.</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>fee</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">money for a service</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">a bank fee</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>charge</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">verb: to ask money for</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">They charge $5.</td></tr></table>"
   ]
  },
  {
   "id": "m3",
   "type": "gap",
   "family": "nuance",
   "kicker": "The bill · Money words · 1/3",
   "needs": [
    "to charge (for)"
   ],
   "instruction": "Use: afford · charge · cost · fee · price (change the form if needed)",
   "prompt": "Many universities ___ students a small fee for a new ID card.",
   "placeholder": "one word"
  },
  {
   "id": "m4",
   "type": "gap",
   "family": "nuance",
   "kicker": "The bill · Money words · 2/3",
   "needs": [
    "to afford"
   ],
   "instruction": "Use: afford · charge · cost · fee · price (change the form if needed)",
   "prompt": "This app is nice, but I can’t ___ fifteen dollars a month.",
   "placeholder": "one word"
  },
  {
   "id": "m5",
   "type": "gap",
   "family": "nuance",
   "kicker": "The bill · Money words · 3/3",
   "needs": [
    "a fee"
   ],
   "instruction": "Use: afford · charge · cost · fee · price (change the form if needed)",
   "prompt": "There is a two percent ___ for every card payment.",
   "placeholder": "one word"
  },
  {
   "id": "r3",
   "type": "content",
   "kicker": "Breaking the Contract · 2/4",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Rules work in both directions. Since July 2023, Reddit’s free plan lets a small app send about 100 requests a minute: that is the limit. A big app like Apollo needs far more, so it has to pay. If an app sends too many requests, Reddit slows it down and answers: “Too many requests.” A polite app waits and tries again later.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">a plan — тариф · to slow down — сповільнювати</span>"
   ]
  },
  {
   "id": "r3q",
   "type": "gap",
   "family": "detail",
   "kicker": "Breaking the Contract · Check 2/4",
   "needs": [],
   "instruction": "One word from the text.",
   "prompt": "If an app sends too many requests, Reddit ___ it down.",
   "placeholder": "one word"
  },
  {
   "id": "r4",
   "type": "content",
   "kicker": "Breaking the Contract · 3/4",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">In April 2023, Reddit announced that it would start charging for its API, which had been free for years. At the end of May, Christian Selig, the developer of Apollo, learned what that meant: 12,000 dollars per 50 million requests. Apollo made about seven billion requests a month.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">to announce — оголосити</span>"
   ]
  },
  {
   "id": "nm",
   "type": "content",
   "reveal": true,
   "kicker": "The bill · Say the numbers · One student per line",
   "title": "Numbers aloud",
   "family": "numbers",
   "items": [
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: $3,500 → three thousand five hundred dollars. No “s”: thousand, million, billion.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>$12,000 per 50 million requests</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>about 7 billion requests a month</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>about $20 million a year</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>June 30, 2023</b></span>"
   ]
  },
  {
   "id": "r4q",
   "type": "gap",
   "family": "detail",
   "kicker": "Breaking the Contract · Check 3/4",
   "needs": [],
   "instruction": "One word.",
   "prompt": "For Apollo, the new price meant about 20 million dollars a ___.",
   "placeholder": "one word"
  },
  {
   "id": "r5",
   "type": "content",
   "kicker": "Breaking the Contract · 4/4",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The new prices started on July 1, about a month later. Selig did not have to close the app — in theory, he could have paid — but he could not afford it, and Apollo shut down on June 30. Reddit had every right to change its prices; what developers objected to most was the speed. A month is not enough to rebuild a business.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">to object (to) — заперечувати (проти) · to rebuild — перебудувати</span>"
   ]
  },
  {
   "id": "r5q",
   "type": "mcq",
   "family": "meaning",
   "kicker": "Breaking the Contract · Check 4/4",
   "needs": [
    "to afford"
   ],
   "prompt": "“Selig did not have to close the app, but he could not afford it.” This means …",
   "options": [
    "Reddit forced Selig to close the app.",
    "Selig wanted to close the app anyway.",
    "Nobody forced him, but the price was too high."
   ]
  },
  {
   "id": "r5b",
   "type": "gap",
   "family": "colloc",
   "kicker": "Breaking the Contract · Words",
   "needs": [
    "to keep / to break a promise"
   ],
   "instruction": "One verb in the past.",
   "prompt": "Reddit didn’t break any law, but many users felt it ___ a promise.",
   "placeholder": "one word"
  },
  {
   "id": "bet",
   "type": "content",
   "reveal": true,
   "kicker": "The story · Your bet",
   "title": "What did Reddit change?",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">✅ <b>B</b>: it started to charge money for its API. The API itself still worked.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">The problem was the <b>price</b> and the <b>speed</b>: about a month between the announcement and the bill.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Who chose B? 🎯</span>"
   ]
  },
  {
   "id": "e1",
   "type": "content",
   "reveal": true,
   "kicker": "The bill · Phrasal verbs",
   "title": "Endings",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to shut down</b> <span class=\"muted\">/ˌʃʌt ˈdaʊn/</span><br>закритися, припинити роботу</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Apollo shut down on June 30.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to give up</b> <span class=\"muted\">/ˌɡɪv ˈʌp/</span><br>здатися, відмовитися</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Selig gave up: he couldn’t pay.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to phase out</b> <span class=\"muted\">/ˌfeɪz ˈaʊt/</span><br>поступово припиняти (використання)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>The old version will be phased out by March.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to carry on</b> <span class=\"muted\">/ˌkæri ˈɑːn/</span><br>продовжувати</span>"
   ]
  },
  {
   "id": "e2",
   "type": "match",
   "family": "colloc",
   "kicker": "The bill · Which particle?",
   "needs": [
    "to shut down",
    "to give up",
    "to phase out",
    "to carry on"
   ],
   "prompt": "Which word (a–e) completes each verb (1–4)? One is extra.",
   "left": [
    "Apollo shut ___ in 2023.",
    "Don’t give ___ — try again!",
    "We’ll phase ___ the old app.",
    "Please carry ___ working."
   ],
   "right": [
    "down",
    "out",
    "up",
    "on",
    "off"
   ]
  },
  {
   "id": "e3",
   "type": "content",
   "reveal": true,
   "kicker": "The bill · Time words",
   "title": "Early or late?",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>in advance</b> <span class=\"muted\">/ɪn ədˈvæns/</span><br>заздалегідь</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Good companies announce changes months in advance.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>at short notice</b> <span class=\"muted\">/ət ˌʃɔːrt ˈnoʊtɪs/</span><br>з коротким попередженням, нашвидку</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Reddit changed its prices at short notice.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>overnight</b> <span class=\"muted\">/ˌoʊvərˈnaɪt/</span><br>за одну ніч, раптово</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>One small change can break old apps overnight.</i></span>"
   ]
  },
  {
   "id": "e4",
   "type": "gap",
   "family": "colloc",
   "kicker": "The bill · Complete",
   "needs": [
    "in advance"
   ],
   "instruction": "Two words.",
   "prompt": "A month is not enough. Developers want big changes announced months ___.",
   "placeholder": "two words"
  },
  {
   "id": "e4b",
   "type": "gap",
   "family": "colloc",
   "kicker": "The bill · Complete",
   "needs": [
    "at short notice"
   ],
   "instruction": "One word.",
   "prompt": "Reddit changed its prices at short ___: developers had only a month.",
   "placeholder": "one word"
  },
  {
   "id": "e5",
   "type": "gap",
   "family": "form",
   "kicker": "The bill · Form",
   "needs": [
    "to give up"
   ],
   "instruction": "Change the form. Example: He ___ (carry on) for six years. → carried on",
   "prompt": "After the bill, Selig didn’t fight: he ___ (give up) and closed the app.",
   "placeholder": "two words"
  },
  {
   "id": "s1",
   "type": "content",
   "reveal": true,
   "kicker": "The bill · React · One student per claim",
   "title": "Fair or not?",
   "format": "react",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>That’s fair, because …</b><br><b>I see the point, but …</b><br><b>I don’t agree at all: …</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">1. “Reddit had every right to change its prices.”<br>2. “A month is enough to change an app.”<br>3. “Free things can’t stay free forever.”<br>4. “Apollo’s users did nothing wrong, but they lost their app.”</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Use: in advance · at short notice · afford · charge · keep a promise</span>"
   ]
  },
  {
   "id": "g0",
   "type": "end",
   "kicker": "The rules",
   "title": "Must, have to, or no need?",
   "text": "The language of rules"
  },
  {
   "id": "g0b",
   "type": "content",
   "reveal": true,
   "kicker": "The rules · You will need these too",
   "title": "Old and new",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a version</b> <span class=\"muted\">/ˈvɜːrʒn/</span><br>версія</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Stripe names its versions by date: 2017-05-24.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to upgrade</b> <span class=\"muted\">/ʌpˈɡreɪd/</span><br>перейти на нову версію, оновитися</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Old apps don’t have to upgrade today.</i></span>"
   ]
  },
  {
   "id": "g1a",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 1 · 1/2",
   "title": "must · have to",
   "teaches": [
    "rule: must · have to · mustn’t · don’t have to"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>must / have to</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>verb</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">must</span>a rule from the speaker or a document<br><i>Every request must include a key.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">have to</span>a rule from outside, or a situation<br><i>Apollo had to pay — or close.</i></span>",
    "<table class=\"gt\" style=\"width:100%;border-collapse:collapse;font-size:16px;line-height:1.35\"><tr><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">now</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">past</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">future</th></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">must / have to</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>had to</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>will have to</b></td></tr></table>"
   ]
  },
  {
   "id": "g1b",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 1 · 2/2",
   "title": "mustn’t ≠ don’t have to",
   "teaches": [
    "rule: must · have to · mustn’t · don’t have to"
   ],
   "items": [
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">⛔ mustn’t</span>= it is not allowed<br><i>You mustn’t share your key.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">🙂 don’t have to</span>= it is not necessary; you can if you want<br><i>You don’t have to upgrade today.</i></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Ukrainian «не треба» can mean both! Ask: ⛔ or 🙂?</span>"
   ]
  },
  {
   "id": "g1c",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 1 · Form",
   "needs": [
    "rule: must · have to · mustn’t · don’t have to"
   ],
   "instruction": "Example: Last year we ___ (must) pay for the course. → had to",
   "prompt": "When Reddit announced the prices, Selig ___ (must) decide within a month.",
   "placeholder": "two words"
  },
  {
   "id": "g1d",
   "type": "mcq",
   "family": "trap",
   "kicker": "Rule 1 · ⛔ or 🙂?",
   "needs": [
    "rule: must · have to · mustn’t · don’t have to"
   ],
   "prompt": "«Вам не треба оновлюватися сьогодні: стара версія працює до березня.»<br>You ___ upgrade today.",
   "options": [
    "mustn’t",
    "don’t have to",
    "have to"
   ]
  },
  {
   "id": "say1",
   "type": "content",
   "reveal": true,
   "family": "translate",
   "kicker": "Say it in English",
   "title": "Старим застосункам не обов’язково оновлюватися, доки вони не будуть готові.",
   "items": [
    "<b>Old apps don’t have to upgrade until they are ready.</b>",
    "<span style=\"display:block;font-size:18px;line-height:1.4\">💬 Тобі не треба приходити завтра: я впораюся сам.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.4\">→ <i>You don’t have to come tomorrow: I can do it alone.</i></span>"
   ]
  },
  {
   "id": "g2",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 2",
   "title": "The words of the docs",
   "teaches": [
    "rule: MUST · SHOULD · MAY"
   ],
   "items": [
    "<table class=\"gt\" style=\"width:100%;border-collapse:collapse;font-size:16px;line-height:1.35\"><tr><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">in the docs</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">in speech</th></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>MUST</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">must · have to</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>MUST NOT</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">mustn’t · can’t</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>SHOULD</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">should · it’s a good idea</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\"><b>MAY</b></td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">can, if you want · don’t have to</td></tr></table>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">These capital words come from a short 1997 document, RFC 2119.</span>"
   ]
  },
  {
   "id": "g2b",
   "type": "content",
   "kicker": "Docs · A real example",
   "title": "Reddit’s rules for apps",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">📄 Docs · Rules for clients</span>1. Every request MUST include a key.<br>2. A client MUST NOT send more than 100 requests a minute.<br>3. A client MAY ask for up to 100 posts at a time. The default is 25.<br>4. A client SHOULD save posts it has already loaded.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">default — значення за замовчуванням</span>"
   ]
  },
  {
   "id": "g2q",
   "type": "match",
   "family": "define",
   "kicker": "Rule 2 · Docs → plain English",
   "needs": [
    "rule: MUST · SHOULD · MAY"
   ],
   "prompt": "What does each docs word (1–4) mean? One option (a–e) is extra.",
   "left": [
    "MUST",
    "MUST NOT",
    "SHOULD",
    "MAY"
   ],
   "right": [
    "you can choose",
    "it’s not allowed",
    "it’s a good idea",
    "it’s required",
    "it’s too late"
   ]
  },
  {
   "id": "g1e",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 2 · Docs into speech",
   "needs": [
    "rule: must · have to · mustn’t · don’t have to",
    "rule: MUST · SHOULD · MAY"
   ],
   "instruction": "Rule 2 of the docs, said aloud. One word (or two).",
   "prompt": "A client ___ send more than 100 requests a minute.",
   "placeholder": "mustn’t …"
  },
  {
   "id": "say2",
   "type": "content",
   "reveal": true,
   "family": "translate",
   "kicker": "Say it in English",
   "title": "Ключ API не можна нікому показувати.",
   "items": [
    "<b>You mustn’t show your API key to anyone.</b>",
    "<span style=\"display:block;font-size:18px;line-height:1.4\">💬 Тут не можна паркуватися.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.4\">→ <i>You mustn’t park here.</i></span>"
   ]
  },
  {
   "id": "s2",
   "type": "content",
   "reveal": true,
   "kicker": "Docs · Questions from a new developer · One student per question",
   "title": "“Do I have to…?”",
   "format": "cued-answers",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\">Yes, you have to … . Otherwise, …<br>No, you mustn’t …, because …<br>No, you don’t have to …, but you can …<br>Yes, you should …, so that …</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">❓ 1. “Do I have to send the key every time?”<br>❓ 2. “Can I send 500 requests a minute?”</span>"
   ]
  },
  {
   "id": "s2b",
   "type": "content",
   "reveal": true,
   "kicker": "Docs · Questions from a new developer · Round 2",
   "title": "“Should I…?”",
   "format": "cued-answers",
   "round2": true,
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\">Yes, you have to … . Otherwise, …<br>No, you mustn’t …, because …<br>No, you don’t have to …, but you can …<br>Yes, you should …, so that …</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">❓ 3. “Do I have to ask for 100 posts?”<br>❓ 4. “Should I save posts I’ve already loaded?”</span>"
   ]
  },
  {
   "id": "g3",
   "type": "end",
   "kicker": "Advice and blame",
   "title": "should · had better · should have",
   "text": "What to do, and what someone should have done"
  },
  {
   "id": "g3a",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 3 · 1/2",
   "title": "Advice: should · had better",
   "teaches": [
    "rule: should · had better · should have"
   ],
   "items": [
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">should</span>normal advice<br><i>You should read the changelog.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">had better (’d better)</span>advice + a warning: or something bad will happen<br><i>You’d better upgrade by March, or your app will stop.</i></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.5\">✅ had better <b>upgrade</b><br>❌ <s>had better <b>to</b> upgrade</s></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">had better: no past meaning, no “to”. Negative: had better not. · changelog — журнал змін</span>"
   ]
  },
  {
   "id": "g3b",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 3 · 2/2",
   "title": "Blame: should have",
   "teaches": [
    "rule: should · had better · should have"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>should have</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>V3</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">should have</span>it was a good idea, but nobody did it<br><i>Reddit should have given developers more time.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">shouldn’t have</span>somebody did it, and it was a mistake<br><i>They shouldn’t have changed the prices so fast.</i></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">You met this in Unit 4: Equifax should have patched the server.</span>"
   ]
  },
  {
   "id": "g3c",
   "type": "mcq",
   "family": "form",
   "kicker": "Rule 3 · Choose the form",
   "needs": [
    "rule: should · had better · should have",
    "rule: must · have to · mustn’t · don’t have to"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: It’s raining. You ___ take an umbrella. → should<br></span>The old version stops tomorrow. You ___ update tonight, or the app won’t work.",
   "options": [
    "don’t have to",
    "had better",
    "ought"
   ]
  },
  {
   "id": "g3d",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 3 · Form",
   "needs": [
    "rule: should · had better · should have"
   ],
   "instruction": "should have + V3.",
   "prompt": "Reddit ___ (should / announce) the new prices months earlier.",
   "placeholder": "three words"
  },
  {
   "id": "say3",
   "type": "content",
   "reveal": true,
   "family": "translate",
   "kicker": "Say it in English",
   "title": "Краще оновіться до березня, інакше застосунок перестане працювати.",
   "items": [
    "<b>You’d better upgrade by March, or the app will stop working.</b>",
    "<span style=\"display:block;font-size:18px;line-height:1.4\">💬 Краще візьми куртку, а то змерзнеш.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.4\">→ <i>You’d better take a jacket, or you’ll be cold.</i></span>"
   ]
  },
  {
   "id": "g3e",
   "type": "mcq",
   "poll": true,
   "kicker": "Advice and blame · Vote",
   "needs": [],
   "prompt": "“Reddit had every right to change its prices.” Do you agree?",
   "options": [
    "Yes, I agree.",
    "Partly.",
    "No, I don’t."
   ]
  },
  {
   "id": "s3",
   "type": "content",
   "reveal": true,
   "kicker": "Advice and blame · Devil’s advocate · One student at a time",
   "title": "Argue the other side",
   "format": "devils-advocate",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Say the opposite of your vote, in two sentences.</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\">For Reddit: <b>Reddit didn’t have to keep it free.</b> … Developers should have …</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\">Against Reddit: <b>Reddit should have …</b> · <b>It shouldn’t have …</b></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Reasons: servers cost money · a month’s notice · millions of users · a free plan for small apps · a promise</span>"
   ]
  },
  {
   "id": "o0",
   "type": "end",
   "kicker": "The other way",
   "title": "How Stripe keeps its promise",
   "text": "A company that changes without breaking anyone"
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
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🚌 A bus company closes your stop overnight: that’s a breaking change.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">A good company keeps the old route for a while, opens a new one and tells you <b>in advance</b>.</span>"
   ]
  },
  {
   "id": "o2",
   "type": "content",
   "kicker": "Breaking the Contract · Stripe 1/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Thousands of apps expect a field called “price” to be a number. If the provider renames that field, or turns it into text, all those apps break overnight. Such a change is called a breaking change, and good API teams take it almost as seriously as a security flaw.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">a field — поле (у даних) · to rename — перейменувати · a flaw — вада</span>"
   ]
  },
  {
   "id": "o3",
   "type": "content",
   "kicker": "Breaking the Contract · Stripe 2/2",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Compare Reddit with Stripe, the payment company. In a 2017 blog post, Stripe’s engineers wrote that every version of their API had kept working since 2011. Each customer stays on the version it started with, and versions are named by date. When Stripe makes a breaking change, it releases a new version, and old apps do not have to upgrade until they are ready.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">to release — випустити</span>"
   ]
  },
  {
   "id": "o3b",
   "type": "gap",
   "family": "colloc",
   "kicker": "Stripe · Check",
   "needs": [
    "a breaking change"
   ],
   "instruction": "One word.",
   "prompt": "Renaming “price” to “cost” is a ___ change: old apps stop working.",
   "placeholder": "one word"
  },
  {
   "id": "o4",
   "type": "mcq",
   "family": "tfng",
   "kicker": "Stripe · True, false or not given?",
   "needs": [
    "a version"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: “Stripe is a payment company.” → True.<br></span><b>Stripe’s old versions stop working every year.</b>",
   "options": [
    "True",
    "False",
    "Not given"
   ]
  },
  {
   "id": "o5",
   "type": "content",
   "reveal": true,
   "kicker": "The other way · Words 2/2",
   "title": "Saying goodbye to an old version",
   "teaches": [
    "concept: deprecation and sunset date"
   ],
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>deprecated</b> <span class=\"muted\">/ˈdeprəkeɪtɪd/</span><br>застарілий, оголошений до вилучення</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>still works, but will stop — like an old bus ticket 🎫</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a sunset date</b> <span class=\"muted\">/ˈsʌnset deɪt/</span><br>дата припинення роботи</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>the last day the old version works</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a changelog</b> <span class=\"muted\">/ˈtʃeɪndʒlɔːɡ/</span><br>журнал змін</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a dated list of every change</i></span>"
   ]
  },
  {
   "id": "o6",
   "type": "match",
   "family": "define",
   "kicker": "The other way · What does it mean?",
   "needs": [
    "deprecated",
    "a sunset date",
    "a changelog",
    "to upgrade"
   ],
   "prompt": "Match each word (1–4) with its meaning. One option (a–e) is extra.",
   "left": [
    "deprecated",
    "sunset date",
    "changelog",
    "upgrade"
   ],
   "right": [
    "get the new version",
    "works, but will stop",
    "a list of changes",
    "the last working day",
    "a free version"
   ]
  },
  {
   "id": "o7",
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
   "id": "o8",
   "type": "gap",
   "family": "wordform",
   "kicker": "The other way · Word forms · 2/2",
   "needs": [],
   "instruction": "Change the form: -able.",
   "prompt": "A good API is ___ (depend): developers can trust it for years.",
   "placeholder": "one word"
  },
  {
   "id": "o9",
   "type": "mcq",
   "family": "stress",
   "kicker": "The other way · Say it right",
   "needs": [
    "deprecated"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: deVELoper · DOCumentation? No: docuMENtation.<br></span>Where is the stress in <b>deprecate</b>?",
   "options": [
    "dePREcate",
    "DEPrecate",
    "depreCATE"
   ]
  },
  {
   "id": "o10",
   "type": "content",
   "kicker": "Breaking the Contract · Advice for API teams",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The basic rules for API teams are simple. You must never remove or rename a field without a new version. When you deprecate an old version, you should announce it months in advance and give a clear sunset date. You had better keep a changelog, or clients will discover your changes the hard way. And remember that an API is not just code: it is a contract with people who have built their work on top of yours.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">to discover — виявити · the hard way — на гіркому досвіді (Unit 4)</span>"
   ]
  },
  {
   "id": "o11",
   "type": "gap",
   "family": "detail",
   "kicker": "Advice for API teams · Check",
   "needs": [
    "rule: should · had better · should have",
    "a changelog"
   ],
   "instruction": "One word from the text.",
   "prompt": "You had better keep a changelog, ___ clients will discover your changes the hard way.",
   "placeholder": "one word"
  },
  {
   "id": "s4",
   "type": "content",
   "reveal": true,
   "kicker": "The other way · Say no politely · One student per request",
   "title": "“Just do it for us!”",
   "format": "decline",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>I’m afraid we can’t …, because …</b><br><b>If we did that, every other … would have to …</b><br><b>What we can do is …</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🤝 1. “Keep the old version forever. We have no time.”<br>→ sunset date: March 31 · a guide is ready<br>🤝 2. “Remove the limit for us. We need 1,000 requests a minute.”<br>→ limit: 100 · a paid plan</span>"
   ]
  },
  {
   "id": "s4b",
   "type": "content",
   "reveal": true,
   "kicker": "The other way · Say no politely · Round 2",
   "title": "“Rename it tomorrow!”",
   "format": "decline",
   "round2": true,
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>I’m afraid we can’t …, because …</b><br><b>If we did that, every other … would have to …</b><br><b>What we can do is …</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🤝 3. “Rename price to cost tomorrow.”<br>→ a breaking change · 300 other apps · only in a new version</span>"
   ]
  },
  {
   "id": "say4",
   "type": "content",
   "reveal": true,
   "family": "translate",
   "kicker": "Say it in English",
   "title": "Reddit слід було попередити розробників раніше.",
   "items": [
    "<b>Reddit should have warned developers earlier.</b>",
    "<span style=\"display:block;font-size:18px;line-height:1.4\">💬 Тобі слід було мені зателефонувати.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.4\">→ <i>You should have called me.</i></span>"
   ]
  },
  {
   "id": "n0",
   "type": "end",
   "kicker": "Saying it well",
   "title": "Two ways to announce a change",
   "text": "Same news, different words"
  },
  {
   "id": "n1",
   "type": "content",
   "reveal": true,
   "kicker": "Saying it well · Two emails",
   "title": "Which one would you trust?",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Email A</span>Starting July 1, the API is paid: $12,000 per 50 million requests. Apps that don’t pay will be switched off.</span>",
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Email B</span>We’re writing to let you know about a change to our API. Starting January 1 — six months from today — large apps will need a paid plan. We understand this may be difficult, so free access will continue until then. Please read our guide, and contact us if you have questions. Thank you for your patience.</span>"
   ]
  },
  {
   "id": "n2",
   "type": "content",
   "reveal": true,
   "kicker": "Saying it well · The phrases",
   "title": "How a polite announcement sounds",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>We’re writing to let you know that …</b></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>Starting</b> + date, …</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>Please note that …</b></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>We understand this may …</b></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>Thank you for your patience.</b></span>"
   ]
  },
  {
   "id": "n3",
   "type": "mcq",
   "family": "register",
   "kicker": "Saying it well · Which one fits?",
   "needs": [],
   "prompt": "Which sentence fits email B?",
   "options": [
    "Pay or get out.",
    "lol the old version is dead soon",
    "Please note that the old version will stop on March 31."
   ]
  },
  {
   "id": "n4",
   "type": "mcq",
   "family": "wordorder",
   "kicker": "Saying it well · Word order",
   "needs": [],
   "prompt": "Which word order is correct?",
   "options": [
    "We’re writing to let know you about a change.",
    "We’re writing you to let know about a change.",
    "We’re writing to let you know about a change."
   ]
  },
  {
   "id": "n5",
   "type": "gap",
   "family": "genre",
   "kicker": "Saying it well · Complete",
   "needs": [],
   "instruction": "One word: a modal.",
   "prompt": "We understand this ___ be difficult for some of you.",
   "placeholder": "one word"
  },
  {
   "id": "au0",
   "type": "content",
   "reveal": true,
   "kicker": "Saying it well · Error auction",
   "title": "Correct or wrong? Vote fast.",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Three sentences from this lesson. Some are wrong.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Vote on your phone. Then one student fixes each wrong sentence aloud.</span>"
   ]
  },
  {
   "id": "au1",
   "type": "mcq",
   "family": "auction",
   "kicker": "Error auction · 1/3",
   "needs": [
    "rule: must · have to · mustn’t · don’t have to"
   ],
   "prompt": "“You mustn’t upgrade today: the old version works until March.”",
   "options": [
    "✅ correct",
    "❌ wrong"
   ]
  },
  {
   "id": "au2",
   "type": "mcq",
   "family": "auction",
   "kicker": "Error auction · 2/3",
   "needs": [
    "rule: should · had better · should have"
   ],
   "prompt": "“Reddit should have given developers more time.”",
   "options": [
    "✅ correct",
    "❌ wrong"
   ]
  },
  {
   "id": "au3",
   "type": "mcq",
   "family": "auction",
   "kicker": "Error auction · 3/3",
   "needs": [
    "rule: should · had better · should have",
    "a changelog"
   ],
   "prompt": "“You had better to read the changelog before you upgrade.”",
   "options": [
    "✅ correct",
    "❌ wrong"
   ]
  },
  {
   "id": "s5",
   "type": "content",
   "reveal": true,
   "kicker": "Saying it well · An Apollo user complains · One student per line",
   "title": "“That’s not fair!”",
   "format": "complain",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>I’ve been using … for … years, and now …</b></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>It isn’t fair that …</b></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>Reddit should have …</b></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>What I’d like is …</b></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Facts: used Apollo for 6 years · a month’s notice · no other good app · keep a free plan for small apps</span>"
   ]
  },
  {
   "id": "k0",
   "type": "end",
   "kicker": "Keyword drill",
   "title": "The story in five sentences",
   "text": "Example: Apollo / shut down / June 30 → Apollo shut down on June 30."
  },
  {
   "id": "k1",
   "type": "content",
   "reveal": true,
   "family": "retell-cue",
   "kicker": "Keyword drill · 1/3 · One student per set",
   "title": "Sets 1–2",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>1.</b> Reddit / announce / start / charge / API / free / years</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Reddit announced that it would start charging for its API, which had been free for years.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>2.</b> Selig / not / have to / close / app / but / not / afford</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Selig didn’t have to close the app, but he couldn’t afford it.</i></span>"
   ]
  },
  {
   "id": "k2",
   "type": "content",
   "reveal": true,
   "family": "retell-cue",
   "kicker": "Keyword drill · 2/3 · One student per set",
   "title": "Sets 3–4",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>3.</b> provider / rename / field / app / break / overnight</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>If the provider renames a field, all those apps break overnight.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>4.</b> old / app / not / have to / upgrade / until / ready</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Old apps don’t have to upgrade until they are ready.</i></span>"
   ]
  },
  {
   "id": "k3",
   "type": "content",
   "reveal": true,
   "family": "retell-cue",
   "kicker": "Keyword drill · 3/3 · One student",
   "title": "Set 5",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>5.</b> deprecate / old version / should / announce / months / advance</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>When you deprecate an old version, you should announce it months in advance.</i></span>"
   ]
  },
  {
   "id": "x0",
   "type": "end",
   "kicker": "Final task",
   "title": "Announce a change",
   "text": "Be the company that keeps its promise"
  },
  {
   "id": "x1",
   "type": "content",
   "reveal": true,
   "kicker": "Final task · How it works",
   "title": "Four moves, one card",
   "format": "brief",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">One card, four students, <b>one move each</b>, out loud.</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>1. Opening:</b> We’re writing to let you know that …<br><b>2. What changes:</b> Starting …, you’ll have to … · You mustn’t …</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>3. What stays:</b> You don’t have to … until … · … will carry on …<br><b>4. Advice and close:</b> You’d better … / You should … · Thank you for your patience.</span>"
   ]
  },
  {
   "id": "x2",
   "type": "content",
   "reveal": true,
   "kicker": "Final task · Example",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Example · A music app</span>May 1: offline listening — paid plan only · old version: sunset May 31 · playlists stay free · update the app</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.48\"><b>1.</b> We’re writing to let you know about a change to our app.<br><b>2.</b> Starting May 1, you’ll have to use the paid plan for offline listening.</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.48\"><b>3.</b> You don’t have to pay for your playlists: they will carry on as before.<br><b>4.</b> You’d better update the app by May 31, or it will stop working. Thank you for your patience.</span>"
   ]
  },
  {
   "id": "x3",
   "type": "content",
   "kicker": "Final task · Card A",
   "title": "🎓 The university schedule app",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card A</span>From February 1: log in <b>only</b> with your university email · the old app version is deprecated, sunset date February 28 · the schedule stays free · turn on notifications for room changes</span>"
   ]
  },
  {
   "id": "x4",
   "type": "content",
   "kicker": "Final task · Card B",
   "title": "🏋️ The gym",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card B</span>From March 1: the monthly fee goes from 500 to 600 hryvnias · current members don’t pay more until June · classes must be booked in the app · update the app</span>"
   ]
  },
  {
   "id": "x5",
   "type": "content",
   "kicker": "Final task · Card C",
   "title": "🌦️ The weather API",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card C</span>Version 1 is deprecated, sunset date December 1 · version 2: a key is required · max 60 requests a minute · version 1 users don’t change anything until December 1 · read the guide</span>"
   ]
  },
  {
   "id": "end",
   "type": "end",
   "kicker": "Unit 5 · APIs: Contracts Between Systems",
   "title": "An API is a promise.",
   "text": "Keep your word, and say it well."
  }
 ]
};

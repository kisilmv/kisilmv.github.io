/* Unit 4 (КН) · Web Application Security · «Тиждень Дани»
   ПУБЛІЧНА частина (бачать студенти). Нотатки й ключі — у teacher.js (не публікується). */
window.LESSON = {
 "id": "esp-kn-unit4",
 "title": "Unit 4 · Web Application Security",
 "audience": "КН · 2nd year · B1+/B2 · Computer Science (web technologies) · group, students on phones",
 "concept": "Тиждень Дани. Наскрізна лінія — один поганий тиждень студентки КН Дани (Львів): понеділок — фішинговий лист (лексика, колокації, тривожні сигнали, попередження); вівторок — без доступу (фразові дієслова, пастки, Правило 1: wish + past, словотвір, наголос); середа — чужі оцінки 1044 (автентифікація/авторизація на рівні користувача, звіт про ваду, регістр, одна проблема — три читачі); четвер — новини про Equifax (текст у 7 частинах, числа, розкриття ставки, Правило 2: wish / if only + past perfect, голосування); п’ятниця — що пішло не так (Правило 3: змішані умовні, Правило 4: інверсія Had… / Should…, ідіоми, AmE/BrE, переказ тижня); підсумок — допомогти другові в чотири ходи. Техніка — на рівні користувача; кожне завдання — мовне. Викладач лише слухає й виправляє.",
 "known": [
  "email",
  "password",
  "link",
  "account",
  "phone",
  "app",
  "website",
  "site",
  "student",
  "grade",
  "grades",
  "teacher",
  "code",
  "data",
  "message",
  "online",
  "internet",
  "friend",
  "university",
  "news",
  "company",
  "server",
  "number",
  "game",
  "photo",
  "photos",
  "bank",
  "computer",
  "problem",
  "virus",
  "browser",
  "page",
  "click",
  "attack",
  "attacker",
  "attackers",
  "hacker",
  "IT",
  "Wi-Fi",
  "framework",
  "feature",
  "library",
  "error",
  "card",
  "leak",
  "protect",
  "safe",
  "week",
  "report",
  "portal"
 ],
 "wordlistExtra": [
  {
   "after": "m5",
   "term": "urgent",
   "ipa": "/ˈɜːrdʒənt/",
   "uk": "терміновий"
  },
  {
   "after": "t10",
   "term": "insecure",
   "ipa": "/ˌɪnsɪˈkjʊr/",
   "uk": "небезпечний, ненадійний"
  },
  {
   "after": "t10",
   "term": "protection",
   "ipa": "/prəˈtekʃn/",
   "uk": "захист"
  },
  {
   "after": "g2b",
   "term": "as long as",
   "ipa": "/əz ˈlɔːŋ əz/",
   "uk": "за умови, що; доки"
  },
  {
   "after": "g2b",
   "term": "otherwise",
   "ipa": "/ˈʌðərwaɪz/",
   "uk": "інакше"
  },
  {
   "after": "g2b",
   "term": "unless",
   "ipa": "/ənˈles/",
   "uk": "якщо не"
  },
  {
   "after": "w7",
   "term": "a heads-up",
   "ipa": "/ˈhedz ʌp/",
   "uk": "коротке попередження",
   "note": "informal"
  },
  {
   "after": "h7",
   "term": "threat modeling",
   "ipa": "/ˈθret ˌmɑːdəlɪŋ/",
   "uk": "моделювання загроз",
   "note": "BrE modelling"
  },
  {
   "after": "h9",
   "term": "injection",
   "ipa": "/ɪnˈdʒekʃn/",
   "uk": "ін’єкція, впровадження коду"
  },
  {
   "after": "h16",
   "term": "penetration test",
   "ipa": "/ˌpenəˈtreɪʃn test/",
   "uk": "тест на проникнення"
  },
  {
   "after": "h16",
   "term": "bug bounty program",
   "ipa": "/ˈbʌɡ ˌbaʊnti ˌproʊɡræm/",
   "uk": "програма винагород за знайдені вади"
  },
  {
   "after": "a9",
   "term": "a break-in",
   "ipa": "/ˈbreɪk ɪn/",
   "uk": "проникнення, пограбування (оселі)"
  }
 ],
 "slides": [
  {
   "id": "title",
   "type": "title",
   "kicker": "Unit 4 · English for Computer Science",
   "title": "Web Application Security",
   "subtitle": "Dana’s bad week"
  },
  {
   "id": "i1",
   "type": "content",
   "reveal": true,
   "kicker": "Dana’s week · Sunday night",
   "title": "Meet Dana",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Dana is a second-year computer science student in Lviv.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">On Sunday night, everything is fine: her email, her bank app, her grades.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">On Tuesday morning, she can’t get into her email: someone has <b>broken into</b> it. This week is the story of how it happened and what she learned.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">to break into (an account) — зламати (обліковий запис), проникнути в нього</span>"
   ]
  },
  {
   "id": "i2",
   "type": "mcq",
   "poll": true,
   "kicker": "Dana’s week · Place your bet",
   "prompt": "Your bet: how did someone get into Dana’s email?<span class=\"muted\" style=\"font-size:15px;line-height:1.35\"><br>No wrong answers yet. We check on Thursday.</span>",
   "options": [
    "They guessed her password.",
    "She typed it on a fake page.",
    "She used the same password on another site.",
    "Her phone got a virus."
   ]
  },
  {
   "id": "m0",
   "type": "end",
   "kicker": "Monday",
   "title": "The email",
   "text": "A message that looks real"
  },
  {
   "id": "m1",
   "type": "content",
   "reveal": true,
   "kicker": "Monday · Words 1/2",
   "title": "A fake message",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>phishing</b> <span class=\"muted\">/ˈfɪʃɪŋ/</span><br>фішинг</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a fake email or text that tries to get your password or money</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a scam</b> <span class=\"muted\">/skæm/</span><br>шахрайство, ошуканство</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>You won a free iPhone? It’s a scam.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>fake</b> <span class=\"muted\">/feɪk/</span><br>підроблений, фальшивий</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a fake email · a fake login page</i></span>"
   ]
  },
  {
   "id": "m2",
   "type": "content",
   "reveal": true,
   "kicker": "Monday · Words 2/2",
   "title": "What you do with an email",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to click (on) a link</b> <span class=\"muted\">/klɪk/</span><br>натиснути на посилання</span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to open an attachment</b> <span class=\"muted\">/əˈtætʃmənt/</span><br>відкрити вкладення (файл у листі)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>The attachment was a virus.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to reset a password</b> <span class=\"muted\">/ˌriːˈset/</span><br>скинути й змінити пароль</span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to report (an email)</b> <span class=\"muted\">/rɪˈpɔːrt/</span><br>повідомити про (лист), поскаржитися</span>"
   ]
  },
  {
   "id": "m3",
   "type": "match",
   "family": "colloc",
   "kicker": "Monday · Which verb?",
   "needs": [
    "to click (on) a link",
    "to open an attachment",
    "to reset a password",
    "to report (an email)"
   ],
   "prompt": "Which verb (a–f) fits each sentence (1–4)? Two verbs are extra.",
   "left": [
    "You ___ on a link.",
    "You ___ an attachment.",
    "You ___ your password.",
    "You ___ a scam to IT."
   ],
   "right": [
    "push",
    "report",
    "click",
    "write",
    "reset",
    "open"
   ]
  },
  {
   "id": "m4",
   "type": "content",
   "kicker": "Monday · 8:14 a.m.",
   "title": "Dana’s inbox",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">From: University IT Service &lt;it-service@univ-account-check.com&gt; · 8:14 a.m.</span><b>URGENT: Your account will be closed</b><br><br>Dear user,<br>We detected unusual activity on you account. If you do not confirm your password within 24 hours, your account will be deleted.<br>Click here to confirm: <u>univ-login-check.net</u><br><br>Thank you,<br>IT Team</span>"
   ]
  },
  {
   "id": "m5",
   "type": "content",
   "reveal": true,
   "kicker": "Monday · Read the email like a teacher",
   "title": "Red flags",
   "teaches": [
    "concept: phishing red flags"
   ],
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a red flag</b> <span class=\"muted\">/ˌred ˈflæɡ/</span><br>тривожний сигнал</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a sign that something is wrong</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🚩 <b>Dear user</b> — a real service knows your name.<br>🚩 <b>URGENT · within 24 hours</b> — pressure: they don’t want you to think.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">🚩 <b>on you account</b> — a mistake in the English.<br>🚩 The address and the link are not the university’s site.</span>"
   ]
  },
  {
   "id": "m6",
   "type": "mcq",
   "family": "genre",
   "kicker": "Monday · Spot it",
   "needs": [
    "a red flag"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: “Dear user” → a red flag.<br></span>Ivan got a similar email. Which line is <b>not</b> a red flag?",
   "options": [
    "Act now, or you will lose your files!",
    "Dear customer, confirm you card details.",
    "Reset your password here within 1 hour!",
    "Hi Ivan, your lab report is due on Friday."
   ]
  },
  {
   "id": "s1a",
   "type": "content",
   "reveal": true,
   "kicker": "Monday · Warn Dana · One student at a time",
   "title": "Don’t click it!",
   "format": "warn",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>Don’t …!</b> If you …, you’ll …<br><b>Whatever you do, don’t …</b><br><b>Before you …, check …</b></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: Don’t open the attachment! If you open it, you’ll get a virus.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>Cues</b> — one student per cue:<br>1. the link in the email<br>2. her password on that site<br>3. the sender’s address<br>4. report it to IT</span>"
   ]
  },
  {
   "id": "t0",
   "type": "end",
   "kicker": "Tuesday",
   "title": "Locked out",
   "text": "Dana can’t get into her email"
  },
  {
   "id": "t1",
   "type": "content",
   "reveal": true,
   "kicker": "Tuesday · Phrasal verbs 1/2",
   "title": "In and out",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to log in / to log out</b> <span class=\"muted\">/ˌlɔːɡ ˈɪn/</span><br>увійти / вийти (з облікового запису)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Dana logs in with her email and password.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to sign up</b> <span class=\"muted\">/ˌsaɪn ˈʌp/</span><br>зареєструватися</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>She signed up for a game site in 2022.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to be locked out</b> <span class=\"muted\">/ˌlɑːkt ˈaʊt/</span><br>не мати змоги увійти (доступ заблоковано)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Her password didn’t work, and she was locked out.</i></span>"
   ]
  },
  {
   "id": "t2",
   "type": "content",
   "reveal": true,
   "kicker": "Tuesday · Phrasal verbs 2/2",
   "title": "Trouble and help",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to break into / to hack into</b> <span class=\"muted\">/ˌbreɪk ˈɪntuː/</span><br>зламати, проникнути</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Someone broke into her account on Monday night.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to find out</b> <span class=\"muted\">/ˌfaɪnd ˈaʊt/</span><br>дізнатися, з’ясувати</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>She found out on Tuesday morning.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to give away (a password)</b> <span class=\"muted\">/ˌɡɪv əˈweɪ/</span><br>видати, розголосити</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Never give away your password, not even to “IT”.</i></span>"
   ]
  },
  {
   "id": "t3",
   "type": "match",
   "family": "colloc",
   "kicker": "Tuesday · Which particle?",
   "needs": [
    "to log in / to log out",
    "to break into / to hack into",
    "to find out",
    "to give away (a password)"
   ],
   "prompt": "Which word (a–e) completes each verb (1–4)? One is extra.",
   "left": [
    "Dana couldn’t log ___.",
    "Someone broke ___ her email.",
    "She found ___ on Tuesday.",
    "Never give ___ your password."
   ],
   "right": [
    "out",
    "into",
    "away",
    "in",
    "over"
   ]
  },
  {
   "id": "t4",
   "type": "gap",
   "family": "form",
   "kicker": "Tuesday · Phrasal verbs · Form",
   "needs": [
    "to be locked out",
    "to sign up"
   ],
   "instruction": "Change the form. Example: She ___ (sign up) last year. → signed up",
   "prompt": "Dana tried her password three times, and then she ___ (be / lock out).",
   "placeholder": "three words"
  },
  {
   "id": "t5",
   "type": "content",
   "reveal": true,
   "kicker": "Tuesday · Words that trick you · 1/2",
   "title": "security ≠ safety · password ≠ parole",
   "items": [
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">security</span>protection from people who attack on purpose<br><i>account security · a security team</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">safety</span>protection from accidents<br><i>road safety · fire safety</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">password ≠ parole</span>«пароль» = <b>password</b> · <b>parole</b> = умовно-дострокове звільнення<br><i>Enter your password.</i></span>"
   ]
  },
  {
   "id": "t6",
   "type": "content",
   "reveal": true,
   "kicker": "Tuesday · Words that trick you · 2/2",
   "title": "«Авторизуватися» · «зламати»",
   "items": [
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">log in</span>«авторизуватися» in everyday Ukrainian = <b>log in</b> / <b>sign in</b><br><i>I logged in to my account.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">crack</span>to find a password by guessing millions of times<br><i>A short password is cracked in minutes.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">break</span>to damage or stop working<br><i>The update broke my app.</i></span>"
   ]
  },
  {
   "id": "t7",
   "type": "mcq",
   "family": "trap",
   "kicker": "Tuesday · Choose the word · 1/2",
   "needs": [],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: “Never tell anyone your bank ___.” → PIN<br></span>A fire in the server room is a ___ problem, not a hacker problem.",
   "options": [
    "password",
    "security",
    "safety"
   ]
  },
  {
   "id": "t8",
   "type": "mcq",
   "family": "post-edit",
   "kicker": "Tuesday · Fix the machine translation",
   "needs": [
    "to log in / to log out"
   ],
   "prompt": "«Я не можу авторизуватися в пошті.»<br>MT: <b>I can’t authorize in my email.</b><br>Tap the wrong part.",
   "options": [
    "I can’t",
    "authorize in",
    "my email."
   ]
  },
  {
   "id": "t9",
   "type": "gap",
   "family": "trap",
   "kicker": "Tuesday · Choose the word · 2/2",
   "needs": [],
   "instruction": "Choose and change the form: crack / break.",
   "prompt": "The update ___ my app: it doesn’t open anymore.",
   "placeholder": "one word"
  },
  {
   "id": "t10",
   "type": "content",
   "reveal": true,
   "kicker": "Tuesday · Word families",
   "title": "One root, many words",
   "items": [
    "<table class=\"gt\" style=\"width:100%;border-collapse:collapse;font-size:16px;line-height:1.35\"><tr><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">noun</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">adjective</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">opposite</th></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">protection</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">protective</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">—</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">security</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">secure</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">insecure</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">safety</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">safe</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">unsafe</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">vulnerability</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">vulnerable</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">—</td></tr></table><span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Verbs: to protect · to secure</span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>vulnerable</b> <span class=\"muted\">/ˈvʌlnərəbl/</span><br>вразливий (якого легко атакувати)</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">-tion, -ity → nouns · in-, un- → opposites</span>"
   ]
  },
  {
   "id": "t11",
   "type": "gap",
   "family": "wordform",
   "kicker": "Tuesday · Word forms · 1/2",
   "needs": [
    "vulnerable"
   ],
   "instruction": "Example: Strong passwords give better ___ (protect). → protection",
   "prompt": "Free Wi-Fi in a café can be ___ (secure), so don’t log in to your bank there.",
   "placeholder": "one word"
  },
  {
   "id": "t12",
   "type": "gap",
   "family": "wordform",
   "kicker": "Tuesday · Word forms · 2/2",
   "needs": [
    "vulnerable"
   ],
   "instruction": "Change the form.",
   "prompt": "The test found a serious ___ (vulnerable) in the game site.",
   "placeholder": "one word"
  },
  {
   "id": "t13",
   "type": "mcq",
   "family": "stress",
   "kicker": "Tuesday · Say it right",
   "needs": [],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: PHOtograph → phoTOgraphy: the stress moves.<br></span>Where is the stress in <b>security</b>?",
   "options": [
    "SEcurity",
    "secuRIty",
    "securiTY",
    "seCUrity"
   ]
  },
  {
   "id": "g1a",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 1",
   "title": "I wish I could log in",
   "teaches": [
    "rule: wish + past (now)"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>I wish / If only</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>past simple</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">now</span>a wish about now: the real situation is different<br><i>I wish I could log in. (= but I can’t)</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">were</span>with “be”: were for all persons (“was” is informal)<br><i>I wish it were Sunday again.</i></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.5\">✅ I wish I <b>knew</b> …<br>❌ <s>I wish I <b>know</b> …</s></span>"
   ]
  },
  {
   "id": "g1b",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 1 · Form",
   "needs": [
    "rule: wish + past (now)",
    "to log in / to log out"
   ],
   "instruction": "Example: I don’t know the code. → I wish I ___ (know) it. → knew",
   "prompt": "Dana can’t open her email. She thinks: “I wish I ___ (can) log in.”",
   "placeholder": "one word"
  },
  {
   "id": "g1c",
   "type": "mcq",
   "family": "error",
   "kicker": "Rule 1 · Find the mistake",
   "needs": [
    "rule: wish + past (now)"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: I wish I <s>am</s> at home. → I wish I <b>were</b> at home.<br></span><b>If only I have a different password for each site!</b><br>Tap the wrong part.",
   "options": [
    "If only",
    "I have",
    "a different password",
    "for each site!"
   ]
  },
  {
   "id": "g1d",
   "type": "open",
   "family": "personal",
   "kicker": "Rule 1 · Your turn",
   "needs": [
    "rule: wish + past (now)"
   ],
   "prompt": "One true sentence about your phone, laptop or apps:<br><b>“I wish my … , because …”</b>",
   "placeholder": "I wish my …"
  },
  {
   "id": "sx1",
   "type": "content",
   "reveal": true,
   "family": "translate",
   "kicker": "Tuesday · Say it in English · One student per line",
   "title": "Two wishes",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">💬 Шкода, що я не пам’ятаю новий пароль.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>I wish I could remember my new password.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">💬 Якби ж то сьогодні була неділя!</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>If only it were Sunday today!</i></span>"
   ]
  },
  {
   "id": "w0",
   "type": "end",
   "kicker": "Wednesday",
   "title": "Grade 1044",
   "text": "A page that shows too much"
  },
  {
   "id": "w1",
   "type": "content",
   "reveal": true,
   "kicker": "Wednesday · The grade portal",
   "title": "Someone else’s grades",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Dana logs in to the university grade portal. Her page is <b>/grades/1043</b>.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">She types <b>1044</b> by mistake and sees <b>Ivan’s</b> grades.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">The site checked <b>who</b> she is. It didn’t check <b>what she may see</b>.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Like a hotel key card that opens every room, not only yours.</span>"
   ]
  },
  {
   "id": "w2",
   "type": "content",
   "reveal": true,
   "kicker": "Wednesday · Two checks",
   "title": "Who are you? What may you do?",
   "teaches": [
    "concept: authentication vs authorization"
   ],
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>authentication</b> <span class=\"muted\">/ɔːˌθentɪˈkeɪʃn/</span><br>автентифікація</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>checks who you are: a password, a code on your phone</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>authorization</b> <span class=\"muted\">/ˌɔːθərəˈzeɪʃn/</span><br>авторизація (перевірка прав)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>checks what you are allowed to see or do</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>permission</b> <span class=\"muted\">/pərˈmɪʃn/</span><br>дозвіл, право</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Dana has permission to see her grades, not Ivan’s.</i></span>"
   ]
  },
  {
   "id": "w3",
   "type": "gap",
   "family": "define",
   "kicker": "Wednesday · Check the word",
   "needs": [
    "authentication",
    "authorization"
   ],
   "instruction": "authentication or authorization?",
   "prompt": "The portal asks for Dana’s password. This step is ___.",
   "placeholder": "one word"
  },
  {
   "id": "w3b",
   "type": "gap",
   "family": "define",
   "kicker": "Wednesday · Check the word",
   "needs": [
    "authentication",
    "authorization"
   ],
   "instruction": "authentication or authorization?",
   "prompt": "A safe portal checks that /grades/1044 is not Dana’s. This step is ___.",
   "placeholder": "one word"
  },
  {
   "id": "w5",
   "type": "content",
   "reveal": true,
   "kicker": "Wednesday · Dana writes to IT",
   "title": "A bug report",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">To: it-help@univ.edu.ua · Subject: Students can see other students’ grades</span>Hello,<br>I found a problem on the grade portal.<br><b>Steps:</b> 1. Log in. 2. Open /grades/1043. 3. Change the number to 1044.<br><b>Expected:</b> an error message.<br><b>Actual:</b> I can see another student’s grades.<br>Best regards,<br>Dana Koval, group KN-24</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Steps · Expected · Actual: the three parts of a bug report. Steps are short orders: Log in. Open … Change …</span>"
   ]
  },
  {
   "id": "w6",
   "type": "mcq",
   "family": "genre",
   "kicker": "Wednesday · Spot the style",
   "needs": [],
   "prompt": "Ivan wrote his own report. Which step breaks the style of “Steps”?",
   "options": [
    "1. Then I was logging in.",
    "2. Open the grades page.",
    "3. Change the number.",
    "4. Press Enter."
   ]
  },
  {
   "id": "w7",
   "type": "match",
   "family": "register",
   "kicker": "Wednesday · Who is it for?",
   "needs": [],
   "prompt": "Match each message (1–3) to its reader. One reader (a–d) is extra.<span class=\"muted\" style=\"font-size:15px;line-height:1.35\"><br>heads-up — a quick warning</span>",
   "left": [
    "lol I can see ur grades 😅",
    "Dear Dean Petrenko, I am writing to report a problem.",
    "Hi, quick heads-up: the portal shows other people’s grades."
   ],
   "right": [
    "the dean (formal)",
    "an app store review",
    "Ivan, a friend",
    "a friendly teacher"
   ]
  },
  {
   "id": "w4",
   "type": "content",
   "reveal": true,
   "kicker": "Wednesday · One problem, three readers · One student per reader",
   "title": "Say it three ways",
   "format": "paraphrase",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">The problem</span>The portal shows other students’ grades.</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\">To Ivan: <b>Guess what! …</b> 😅<br>To a teacher you know: <b>Hi, quick heads-up: …</b><br>To the dean: <b>Dear Dean Petrenko, I am writing to let you know that …</b></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Next problems: (a) The portal accepts very short passwords. (b) The login page doesn’t work on phones.</span>"
   ]
  },
  {
   "id": "h0",
   "type": "end",
   "kicker": "Thursday",
   "title": "The news",
   "text": "Dana reads about the biggest unlocked door"
  },
  {
   "id": "h1",
   "type": "content",
   "reveal": true,
   "kicker": "Thursday · Before you read",
   "title": "Words for the story",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a breach</b> <span class=\"muted\">/briːtʃ/</span><br>злам, витік даних через атаку</span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to patch</b> <span class=\"muted\">/pætʃ/</span><br>встановити виправлення («залатати»)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a patch = a small fix for a known flaw</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>a settlement</b> <span class=\"muted\">/ˈsetlmənt/</span><br>мирова угода (з виплатою грошей)</span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>preventable</b> <span class=\"muted\">/prɪˈventəbl/</span><br>якому можна було запобігти</span>"
   ]
  },
  {
   "id": "h2",
   "type": "content",
   "kicker": "Thursday · The Door Nobody Locked · 1/7",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">In March 2017, the team behind Apache Struts, a popular tool for building web applications, published a fix for a critical vulnerability. Any server that still ran an old version could be taken over with a single request, and attacks began almost immediately. At Equifax, one of the three largest credit reporting agencies in the United States, an order to update was sent out — but one online portal was never patched.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">credit reporting agency — кредитне бюро (зберігає дані про кредити людей)</span>"
   ]
  },
  {
   "id": "h3",
   "type": "content",
   "kicker": "Thursday · The Door Nobody Locked · 2/7",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">In mid-May, attackers found it and got in. By the time the intrusion was discovered at the end of July, the personal data of about 147 million people had been stolen. The company later agreed to pay up to 700 million dollars in a settlement, and a US congressional report described the breach as entirely preventable: if the server had been patched in March, the attackers would have found the door locked.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">intrusion — вторгнення · congressional — Конгресу США</span>"
   ]
  },
  {
   "id": "h4",
   "type": "match",
   "family": "sequence",
   "kicker": "Thursday · In what order?",
   "needs": [
    "to patch"
   ],
   "prompt": "What happened 1st, 2nd, 3rd, 4th? One event (a–e) did not happen.",
   "left": [
    "1st",
    "2nd",
    "3rd",
    "4th"
   ],
   "right": [
    "Attackers got in.",
    "A fix was published.",
    "Equifax found the attack.",
    "Equifax paid a settlement.",
    "Equifax deleted the data."
   ]
  },
  {
   "id": "h5",
   "type": "content",
   "reveal": true,
   "kicker": "Thursday · Say the numbers · One student per line",
   "title": "Numbers aloud",
   "family": "numbers",
   "items": [
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: 2,500 → two thousand five hundred. No “s”: thousand, million.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>March 2017</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>about 147 million people</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>up to $700 million</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>more than 99.9 percent</b></span>"
   ]
  },
  {
   "id": "h6",
   "type": "content",
   "reveal": true,
   "kicker": "Thursday · Back to Dana",
   "title": "So how did they get in?",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">On Thursday, Dana gets another email — a real one this time.</span>",
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">From: GameZone · Security notice</span>We are sorry to tell you that our site was <b>breached</b> last month. Your password may have been stolen.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Dana signed up for GameZone in 2022 with <b>the same password</b> as her email. The attackers just tried it — and it worked.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Your bet on Sunday: who chose C? 🎯</span>"
   ]
  },
  {
   "id": "h7",
   "type": "content",
   "kicker": "Thursday · The Door Nobody Locked · 3/7",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The lesson is uncomfortable. Attackers rarely need brilliant tricks; far more often, they look for doors that nobody locked. That is why security teams practice thinking like an attacker. When they design a new feature, they ask questions such as: What would happen if someone used this form in a way we did not expect? What if a user were not who they claimed to be? This practice is known as threat modeling, and it is much cheaper than a breach.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">threat — загроза · to claim — стверджувати</span>"
   ]
  },
  {
   "id": "h8",
   "type": "gap",
   "family": "define",
   "kicker": "Thursday · Find it in 3/7",
   "needs": [],
   "instruction": "Two words from text 3/7.",
   "prompt": "imagining in advance how someone could attack your app → ___",
   "placeholder": "two words"
  },
  {
   "id": "g2a",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 2 · 1/2",
   "title": "If only I hadn’t…",
   "teaches": [
    "rule: wish · if only + past perfect"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>I wish / If only</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>had + V3</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">the past</span>a regret: it happened, and now it is too late<br><i>I wish I hadn’t used the same password.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">about others</span>complaining about what someone did or didn’t do<br><i>If only GameZone had told us sooner!</i></span>"
   ]
  },
  {
   "id": "g2b",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 2 · 2/2",
   "title": "Now or then?",
   "teaches": [
    "rule: wish · if only + past perfect"
   ],
   "items": [
    "<table class=\"gt\" style=\"width:100%;border-collapse:collapse;font-size:16px;line-height:1.35\"><tr><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">about now (Rule 1)</th><th style=\"text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)\">about the past (Rule 2)</th></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">I wish I <b>knew</b>.</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">I wish I <b>had known</b>.</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">If only it <b>were</b> …</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">If only it <b>had been</b> …</td></tr><tr><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">I wish I <b>could</b> …</td><td style=\"padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top\">I wish I <b>had been able to</b> …</td></tr></table>",
    "<span style=\"display:block;font-size:17px;line-height:1.5\">✅ I wish I <b>hadn’t clicked</b>.<br>❌ <s>I wish I <b>wouldn’t have clicked</b>.</s></span>"
   ]
  },
  {
   "id": "g2c",
   "type": "match",
   "family": "cause",
   "kicker": "Rule 2 · Now or then?",
   "needs": [
    "rule: wish + past (now)",
    "rule: wish · if only + past perfect"
   ],
   "prompt": "Which wish (a–d) fits each situation (1–3)? One wish is wrong English.",
   "left": [
    "Dana can’t log in now.",
    "She used one password in 2022.",
    "GameZone wrote a month late."
   ],
   "right": [
    "If only they’d told us!",
    "I wish I wouldn’t use it.",
    "I wish I could log in.",
    "I wish I hadn’t used it."
   ]
  },
  {
   "id": "g2d",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 2 · Form · 1/2",
   "needs": [
    "rule: wish · if only + past perfect",
    "to sign up"
   ],
   "instruction": "Example: I didn’t save the file. → I wish I ___ (save) it. → had saved",
   "prompt": "Dana thinks: “I wish I ___ (sign up) for GameZone with a different password.”",
   "placeholder": "two or three words"
  },
  {
   "id": "g2e",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 2 · Form · 2/2",
   "needs": [
    "rule: wish · if only + past perfect"
   ],
   "instruction": "If only + had + V3.",
   "prompt": "If only GameZone ___ (tell) us about the breach in May!",
   "placeholder": "two words"
  },
  {
   "id": "sx2",
   "type": "content",
   "reveal": true,
   "family": "translate",
   "kicker": "Thursday · Say it in English · One student per line",
   "title": "Too late",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">💬 Шкода, що я відкрила те вкладення.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>I wish I hadn’t opened that attachment.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">💬 Якби ж то ти сказав мені раніше!</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>If only you had told me earlier!</i></span>"
   ]
  },
  {
   "id": "h9",
   "type": "content",
   "kicker": "Thursday · The Door Nobody Locked · 4/7",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">The classic unlocked door is injection: an attacker types a command into a box that should hold a name, and a careless app obeys it. Injection has been on the OWASP Top 10, the best-known list of web application risks, since the first edition in 2003.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">injection — ін’єкція (впровадження коду) · to obey — слухатися · edition — видання, випуск</span>"
   ]
  },
  {
   "id": "h10",
   "type": "mcq",
   "family": "tfng",
   "kicker": "Thursday · True, false or not given?",
   "needs": [],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: “Equifax is in the US.” → True (1/7).<br></span><b>Injection is a new kind of attack.</b>",
   "options": [
    "True",
    "False",
    "Not given"
   ]
  },
  {
   "id": "h11",
   "type": "content",
   "kicker": "Thursday · The Door Nobody Locked · 5/7",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Yet in the 2025 edition, first place goes to a quieter problem: broken access control. Authentication answers the question “Who are you?”; authorization answers “What are you allowed to do?” Many applications ask only the first question. Imagine a user who opens /invoices/1043, changes the number to 1044 and receives somebody else’s invoice. The cure is to check permissions for every request and to give each user only the access they really need.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">invoice — рахунок · cure — ліки, засіб</span>"
   ]
  },
  {
   "id": "h12",
   "type": "mcq",
   "family": "scenario",
   "kicker": "Thursday · Text and story",
   "needs": [],
   "prompt": "Which day of Dana’s week is the same problem as the invoice in 5/7?",
   "options": [
    "Monday: the fake email",
    "Thursday: GameZone",
    "Tuesday: locked out",
    "Wednesday: grade 1044"
   ]
  },
  {
   "id": "h13",
   "type": "content",
   "reveal": true,
   "kicker": "Thursday · Before 6/7",
   "title": "Two more words",
   "teaches": [
    "concept: multi-factor authentication"
   ],
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>multi-factor authentication (MFA)</b> <span class=\"muted\">/ˌmʌlti ˌfæktər ɔːˌθentɪˈkeɪʃn/</span><br>багатофакторна автентифікація</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>a password + one more thing, for example a code on your phone. Also called two-factor authentication (2FA).</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to compromise (an account)</b> <span class=\"muted\">/ˈkɑːmprəmaɪz/</span><br>скомпрометувати, зламати</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>An account is compromised when someone else gets into it.</i></span>"
   ]
  },
  {
   "id": "h14",
   "type": "content",
   "kicker": "Thursday · The Door Nobody Locked · 6/7",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">Passwords deserve special care. A well-built site never keeps them as readable text. Instead, it turns each password into a scrambled code that cannot be turned back. Still, the best protection is to make a stolen password useless on its own. Microsoft has estimated that an account with multi-factor authentication is more than 99.9 percent less likely to be compromised.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">scrambled — перемішаний, нечитабельний · to estimate — оцінювати</span>"
   ]
  },
  {
   "id": "h15",
   "type": "gap",
   "family": "tfng",
   "kicker": "Thursday · Check 6/7",
   "needs": [
    "multi-factor authentication (MFA)"
   ],
   "instruction": "One word from text 6/7.",
   "prompt": "With MFA, a stolen password alone is ___.",
   "placeholder": "one word"
  },
  {
   "id": "h16",
   "type": "content",
   "kicker": "Thursday · The Door Nobody Locked · 7/7",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.48\">No web application is perfectly secure, and new weak points are found every day. What matters is how quickly the unlocked doors are found — ideally by the team itself, before an attacker tries the handle.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">weak point — слабке місце · handle — ручка (дверей)</span>"
   ]
  },
  {
   "id": "h17",
   "type": "mcq",
   "family": "odd",
   "kicker": "Thursday · Odd one out",
   "needs": [
    "to reset a password"
   ],
   "prompt": "Which verb does <b>not</b> go with <b>a password</b>?",
   "options": [
    "reset",
    "crack",
    "open",
    "change"
   ]
  },
  {
   "id": "h18",
   "type": "mcq",
   "poll": true,
   "kicker": "Thursday · Vote",
   "needs": [],
   "prompt": "Which habit protects a student best? Vote.",
   "options": [
    "a different password for every site",
    "two-factor authentication (2FA)",
    "never clicking links in emails",
    "updating apps quickly"
   ]
  },
  {
   "id": "h19",
   "type": "content",
   "reveal": true,
   "kicker": "Thursday · Defend the vote · One student at a time",
   "title": "Why that one?",
   "format": "justify-ranking",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>Most of us chose …: if more students had used it, fewer accounts would be hacked now.</b><br><b>I wish everyone …</b><br><b>Had I known about … earlier, I’d have …</b></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Reasons: one leak → all your accounts · fake links look real · old apps have known flaws · a stolen password alone is not enough</span>"
   ]
  },
  {
   "id": "f0",
   "type": "end",
   "kicker": "Friday",
   "title": "What went wrong",
   "text": "Looking back at the week"
  },
  {
   "id": "g3a",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 3 · 1/2",
   "title": "Past cause, result now",
   "teaches": [
    "rule: mixed conditionals"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>If</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>had + V3</b></span><span style=\"color:var(--ink-2)\">,</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>would</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>verb</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">mixed</span>something in the past → a result <b>now</b><br><i>If Dana had used different passwords, she wouldn’t be so worried now.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">compare</span>result then: … she wouldn’t <b>have lost</b> her email · result now: … she wouldn’t <b>be</b> so worried</span>"
   ]
  },
  {
   "id": "g3b",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 3 · 2/2",
   "title": "Who you are, what you did",
   "teaches": [
    "rule: mixed conditionals"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>If</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>past</b></span><span style=\"color:var(--ink-2)\">,</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>would have</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>V3</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">mixed</span>something always true about a person → a result in the past<br><i>If Dana were more careful, she wouldn’t have reused her password.</i></span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Ukrainian «якби» again: ask about each half, “now or then?”</span>"
   ]
  },
  {
   "id": "g3c",
   "type": "gap",
   "family": "form",
   "kicker": "Rule 3 · Form",
   "needs": [
    "rule: mixed conditionals"
   ],
   "instruction": "Example: If I had slept more, I ___ (not / be) tired now. → wouldn’t be",
   "prompt": "If GameZone had protected its passwords, Dana ___ (not / have to) change all her passwords today.",
   "placeholder": "three words"
  },
  {
   "id": "g3d",
   "type": "match",
   "family": "cause",
   "kicker": "Rule 3 · Now or then?",
   "needs": [
    "rule: mixed conditionals"
   ],
   "prompt": "Join the halves (1–3). Watch the time. One ending (a–d) is extra.",
   "left": [
    "If she had turned on MFA in 2022,",
    "If she weren’t so busy,",
    "If the university had checked the portal,"
   ],
   "right": [
    "she’d have read GameZone’s email sooner.",
    "she wouldn’t have to change passwords today.",
    "Ivan’s grades would be private now.",
    "she won’t be safe."
   ]
  },
  {
   "id": "g4a",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 4 · 1/2",
   "title": "Had she known…",
   "teaches": [
    "rule: inversion · had · should"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>Had</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>subject</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>V3</b></span><span style=\"color:var(--ink-2)\">,</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>would have …</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">formal</span>= If she had known … — no “if”: had comes first<br><i>Had the server been patched in March, the attackers would have found the door locked.</i></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">where</span>news, reports, formal emails<br><i>Had GameZone acted sooner, millions of passwords would have been safe.</i></span>"
   ]
  },
  {
   "id": "g4b",
   "type": "content",
   "reveal": true,
   "kicker": "Grammar · Rule 4 · 2/2",
   "title": "Should you…: formal warnings",
   "teaches": [
    "rule: inversion · had · should"
   ],
   "items": [
    "<span class=\"fx\" style=\"display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px\"><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>Should</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>you</b></span><span style=\"color:var(--ink-2)\">+</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>verb</b></span><span style=\"color:var(--ink-2)\">,</span><span style=\"background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px\"><b>please …</b></span></span>",
    "<span class=\"rc\" style=\"display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4\"><span style=\"display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px\">formal</span>= If you … (it may happen)<br><i>Should you get a strange email, please report it to IT.</i></span>",
    "<span style=\"display:block;font-size:17px;line-height:1.5\">✅ <b>Had she</b> checked …<br>❌ <s><b>If had she</b> checked …</s></span>"
   ]
  },
  {
   "id": "g4c",
   "type": "mcq",
   "family": "transform",
   "kicker": "Rule 4 · The formal version",
   "needs": [
    "rule: inversion · had · should"
   ],
   "prompt": "“If the portal had been tested, nobody would have seen Ivan’s grades.” Which is the formal version?",
   "options": [
    "Had the portal been tested, …",
    "Had been the portal tested, …",
    "If had the portal been tested, …"
   ]
  },
  {
   "id": "g4d",
   "type": "gap",
   "family": "genre",
   "kicker": "Rule 4 · A university notice",
   "needs": [
    "rule: inversion · had · should"
   ],
   "instruction": "One word. The notice is formal.",
   "prompt": "📢 ___ you notice anything strange on the portal, please write to it-help@univ.edu.ua.",
   "placeholder": "one word"
  },
  {
   "id": "g4e",
   "type": "mcq",
   "family": "error",
   "kicker": "Rule 4 · Find the mistake",
   "needs": [
    "rule: inversion · had · should"
   ],
   "prompt": "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Example: Had I known yesterday, I <s>would tell</s> you then. → I <b>would have told</b> you then.<br></span><b>Had GameZone told us sooner, we would change our passwords last month.</b><br>Tap the wrong part.",
   "options": [
    "Had GameZone",
    "told us sooner,",
    "we",
    "would change our passwords last month."
   ]
  },
  {
   "id": "sx3",
   "type": "content",
   "reveal": true,
   "family": "translate",
   "kicker": "Friday · Say it in English · One student per line",
   "title": "Formal and mixed",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">💬 Якби ти тоді послухав мене, ти б зараз не мав проблем.</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>If you had listened to me, you wouldn’t have problems now.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">📢 Якщо ви забудете пароль, натисніть «Reset».</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Should you forget your password, click “Reset.”</i></span>"
   ]
  },
  {
   "id": "f1",
   "type": "content",
   "reveal": true,
   "kicker": "Friday · Idioms",
   "title": "Too late!",
   "items": [
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to close the barn door after the horse is out</b> <span class=\"muted\">/bɑːrn/</span><br>зачиняти стайню, коли коня вже вкрали (запізно)</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>BrE: shut the stable door after the horse has bolted</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>better safe than sorry</b> <span class=\"muted\">/ˌseɪf ðən ˈsɑːri/</span><br>краще перестрахуватися</span><span style=\"display:block;font-size:16px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:5px\"><i>Take an umbrella: better safe than sorry.</i></span>",
    "<span style=\"display:block;font-size:19px;line-height:1.35\"><b>to learn the hard way</b> <span class=\"muted\">/ˈhɑːrd weɪ/</span><br>навчитися на гіркому досвіді</span>"
   ]
  },
  {
   "id": "f2",
   "type": "match",
   "family": "variety",
   "kicker": "Friday · AmE → BrE",
   "needs": [],
   "prompt": "Match each American form (1–3) with the BrE one. One (a–d) is extra.",
   "left": [
    "would have gotten",
    "first floor (street level)",
    "vacation"
   ],
   "right": [
    "ground floor",
    "second floor",
    "would have got",
    "holiday"
   ]
  },
  {
   "id": "f2b",
   "type": "gap",
   "family": "idiom",
   "kicker": "Friday · Which idiom?",
   "needs": [
    "to learn the hard way"
   ],
   "instruction": "One word. Example: I always lock my bike, even for a minute. Better safe than ___. → sorry",
   "prompt": "I lost all my photos last year, so now I save them twice. I learned it the ___ way.",
   "placeholder": "one word"
  },
  {
   "id": "f3",
   "type": "content",
   "reveal": true,
   "kicker": "Friday · Dana’s week · One student per day",
   "title": "Tell it with regret",
   "format": "narrate",
   "items": [
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\">On …, she … . Luckily, she didn’t … .<br><b>She wishes she had …</b> · <b>If only …</b><br><b>If she had …, she wouldn’t be … now.</b></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Mon — a fake email; she didn’t click<br>Tue — locked out of her email<br>Wed — saw Ivan’s grades; wrote to IT<br>Thu — GameZone breach; the same password<br>Fri — changed all passwords; turned on MFA</span>"
   ]
  },
  {
   "id": "wr0",
   "type": "content",
   "kicker": "Friday · Word race",
   "title": "The week in words",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">Three quick gaps, then a match. Answer as fast as you can!</span>"
   ]
  },
  {
   "id": "wr1",
   "type": "gap",
   "family": "race",
   "kicker": "Word race · 1/3",
   "needs": [
    "phishing"
   ],
   "instruction": "One word.",
   "prompt": "A fake email that tries to steal your password is called ___.",
   "placeholder": "one word"
  },
  {
   "id": "wr2",
   "type": "gap",
   "family": "race",
   "kicker": "Word race · 2/3",
   "needs": [
    "permission"
   ],
   "instruction": "One word.",
   "prompt": "Dana had no ___ to see Ivan’s grades, but the portal showed them.",
   "placeholder": "one word"
  },
  {
   "id": "wr3",
   "type": "gap",
   "family": "race",
   "kicker": "Word race · 3/3",
   "needs": [
    "multi-factor authentication (MFA)"
   ],
   "instruction": "Three letters.",
   "prompt": "A password plus a code on your phone is called ___.",
   "placeholder": "three letters"
  },
  {
   "id": "wr4",
   "type": "match",
   "family": "define",
   "kicker": "Word race · Match",
   "needs": [
    "to be locked out",
    "to break into / to hack into",
    "to patch",
    "to compromise (an account)"
   ],
   "prompt": "Match each word (1–4) with its meaning. One meaning (a–e) is extra.",
   "left": [
    "to be locked out",
    "to break into",
    "to patch",
    "compromised"
   ],
   "right": [
    "someone else got in",
    "to fix a known flaw",
    "to tell a secret",
    "can’t log in",
    "to get in illegally"
   ]
  },
  {
   "id": "k0",
   "type": "end",
   "kicker": "Keyword drill",
   "title": "The text in six sentences",
   "text": "Example: Dana / sign up / game site / 2022 → Dana signed up for a game site in 2022."
  },
  {
   "id": "k1",
   "type": "content",
   "reveal": true,
   "family": "retell-cue",
   "kicker": "Keyword drill · 1/3 · One student per set",
   "title": "Sets 1–2",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>1.</b> fix / critical / flaw / publish / one / server / never / patch</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>A fix for the critical flaw was published, but one server was never patched.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>2.</b> attacker / rarely / need / clever / trick / look for / door / nobody / lock</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Attackers rarely need clever tricks; they look for doors nobody has locked.</i></span>"
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
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>3.</b> what / happen / if / someone / use / form / way / not / expect</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>What would happen if someone used this form in a way we didn’t expect?</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>4.</b> application / check / who / user / not / whether / invoice / belong</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>The application checked who the user was, but not whether the invoice belonged to them.</i></span>"
   ]
  },
  {
   "id": "k3",
   "type": "content",
   "reveal": true,
   "family": "retell-cue",
   "kicker": "Keyword drill · 3/3 · One student per set",
   "title": "Sets 5–6",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>5.</b> had / Dana / turn on / MFA / stolen / password / be / useless</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Had Dana turned on MFA, the stolen password would have been useless.</i></span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\"><b>6.</b> had / server / patch / March / breach / prevent</span>",
    "<span style=\"display:block;font-size:18px;line-height:1.45\">→ <i>Had the server been patched in March, the breach would have been prevented.</i></span>"
   ]
  },
  {
   "id": "x0",
   "type": "end",
   "kicker": "Sunday",
   "title": "Help a friend",
   "text": "Four moves, four students, one story"
  },
  {
   "id": "x1",
   "type": "content",
   "reveal": true,
   "kicker": "Final task · How it works",
   "title": "Four moves",
   "format": "instruct",
   "items": [
    "<span style=\"display:block;font-size:18px;line-height:1.45\">A friend has a problem. Four students, <b>one move each</b>.</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>1. What happened:</b> Yesterday, …<br><b>2. The regret:</b> I bet he/she wishes … · If only …</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.45;background:var(--accent-soft);border-radius:10px;padding:5px 10px\"><b>3. Now:</b> If he/she had …, he/she wouldn’t be … now.<br><b>4. Advice:</b> If I were him/her, I’d … · Should it happen again, …</span>"
   ]
  },
  {
   "id": "x2",
   "type": "content",
   "reveal": true,
   "kicker": "Final task · Example",
   "title": "How it sounds",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Example · Oleh</span>Oleh got a text: “Your parcel is waiting. Pay 2 dollars here.” He paid with his card.</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.48\"><b>1.</b> Yesterday, Oleh got a fake text about a parcel, and he paid with his card.<br><b>2.</b> I bet he wishes he had checked the sender. If only he had looked at the link!</span>",
    "<span style=\"display:block;font-size:17px;line-height:1.48\"><b>3.</b> If he hadn’t paid, he wouldn’t be so worried about his card now.<br><b>4.</b> If I were him, I’d call the bank right now. Should it happen again, he’d better just delete the text.</span>"
   ]
  },
  {
   "id": "x3",
   "type": "content",
   "kicker": "Final task · Card A",
   "title": "Marta: one password",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card A · Marta</span>Marta uses <b>marta2005</b> for everything: email, bank, Instagram. Yesterday her Instagram was hacked, and now strangers send messages from her account.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Words: reset · break into · locked out · MFA · a different password for every site</span>"
   ]
  },
  {
   "id": "x4",
   "type": "content",
   "kicker": "Final task · Card B",
   "title": "Sofia: the bank email",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card B · Sofia</span>Sofia got an email “from her bank”: “Your card is blocked. Log in here.” She typed her password on the page. An hour later, 3,000 hryvnias were gone.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Words: phishing · a fake page · a red flag · report · log in</span>"
   ]
  },
  {
   "id": "x5",
   "type": "content",
   "kicker": "Final task · Card C",
   "title": "Andrii: the free game",
   "items": [
    "<span style=\"display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:16px;line-height:1.45\"><span style=\"display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px\">Card C · Andrii</span>Andrii downloaded a “free” copy of a paid game from a strange site. Now his laptop is slow, and his browser opens ads by itself.</span>",
    "<span class=\"muted\" style=\"font-size:15px;line-height:1.35\">Words: a scam · a virus · update · fake · Should it happen again</span>"
   ]
  },
  {
   "id": "end",
   "type": "end",
   "kicker": "Unit 4 · Web Application Security",
   "title": "Better safe than sorry.",
   "text": "Lock your doors before someone tries the handle."
  }
 ]
};

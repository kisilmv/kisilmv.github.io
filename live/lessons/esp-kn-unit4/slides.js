/* =========================================================================
   Unit 4 · Web Application Security: Thinking Like an Attacker
   ESP · Комп'ютерні науки, 2 курс · B1+/B2 · group
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Задум: «Аудит перед запуском: п'ять дверей». Наскрізний кейс — вигаданий
   університетський портал оцінок GradeBook, який запускається за два тижні.
   Група — команда аудиторів: карта дверей (поверхня атаки) → двері 1: пошукове
   поле (ін'єкції; умовні 0/1) → двері 2: /grades/1044 (автентифікація ≠
   авторизація, глибокий розбір; unless / as long as / otherwise) → двері 3:
   таблиця паролів (геш ≠ шифрування, сіль) → двері 4: вхід викладачів (фішинг,
   MFA; другий тип) → двері 5: стара бібліотека (Equifax; третій тип, should have)
   → аудіо The Brief → як знаходити двері першими (моделювання загроз) →
   keyword drill → вердикт і брифінг для декана. Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const ID = 'esp-kn-unit4';
  const K = (s) => '<span class="muted" style="font-size:15px;line-height:1.35">' + s + '</span>';
  const RD = (h) => '<span style="display:block;font-size:17px;line-height:1.42">' + h + '</span>';
  const SS = (h) => '<span style="display:block;font-size:16px;line-height:1.4">' + h + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> <span class="muted">' + ipa + '</span><br>' + uk + '</span>';
  // рядок механізму: що термін РОБИТЬ
  const TM = (en, ipa, uk, mech) => term(en, ipa, uk) + '<span style="display:block;font-size:17px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px;margin-top:6px">' + mech + '</span>';
  const MECH = (h) => '<span style="display:block;font-size:17px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px">' + h + '</span>';
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  const HAVE = ['door.jpg', 'lead.jpg', 'servers.jpg', 'windows.jpg', 'review.jpg', 'client.jpg', 'briefing.jpg'];
  const PH = (f, alt, pos, h) => HAVE.includes(f) ? '<img src="lessons/' + ID + '/' + f + '" alt="' + alt + '" style="display:block;width:100%;height:' + (h || 130) + 'px;object-fit:cover;object-position:' + (pos || '50% 50%') + ';border-radius:16px;margin-bottom:12px">' : '';
  // картка-документ: коментар рев'ю, бюлетень, лист
  const CARD = (head, body) => '<span style="display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:17px;line-height:1.45">' +
    '<span style="display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px">' + head + '</span>' + body + '</span>';
  const MONO = (s) => '<span style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:15px">' + s + '</span>';
  // граматичні блоки
  const FX = (...p) => '<span class="fx" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px">' +
    p.map((x) => x === '+' || x === ',' ? '<span style="color:var(--ink-2)">' + x + '</span>' : '<span style="background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px"><b>' + x + '</b></span>').join('') + '</span>';
  const GT = (head, rows) => '<table class="gt" style="width:100%;border-collapse:collapse;font-size:16px;line-height:1.35">' +
    '<tr>' + head.map((h) => '<th style="text-align:left;color:var(--ink-2);font-weight:600;padding:4px;border-bottom:2px solid var(--line)">' + h + '</th>').join('') + '</tr>' +
    rows.map((r) => '<tr>' + r.map((c) => '<td style="padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top">' + c + '</td>').join('') + '</tr>').join('') + '</table>';
  const RC = (badge, rule, ex) => '<span class="rc" style="display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4">' +
    '<span style="display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px">' + badge + '</span>' + rule + (ex ? '<br><i>' + ex + '</i>' : '') + '</span>';
  const OKNO = (ok, no) => '<span style="display:block;font-size:17px;line-height:1.5">✅ ' + ok + '<br>❌ <s>' + no + '</s></span>';
  const SVG = (vb, label, body) => '<svg viewBox="' + vb + '" width="100%" style="max-width:340px;display:block" role="img" aria-label="' + label + '">' + body + '</svg>';
  const BOX = (x, y, w, h, fill) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="9" fill="' + (fill || 'var(--surface-2)') + '" stroke="var(--line)"/>';
  const TX = (x, y, t, o) => '<text x="' + x + '" y="' + y + '" font-size="' + ((o && o.s) || 14) + '" fill="' + ((o && o.c) || 'var(--ink)') + '"' + (o && o.m ? ' text-anchor="middle"' : '') + (o && o.b ? ' font-weight="700"' : '') + (o && o.mono ? ' font-family="ui-monospace,Menlo,monospace"' : '') + '>' + t + '</text>';
  const AR = (x1, y1, x2, y2, c) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || 'var(--ink-2)') + '" stroke-width="2" marker-end="url(#ah)"/>';
  const DEFS = '<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--ink-2)"/></marker></defs>';

  const S = [];
  const add = (o) => S.push(o);
  // «Say it in English»: українське технічне речення → еталон → 💬 розмовне → еталон
  const SAY = (id, uk, en, evEn, evUk) => add({ id, type: 'content', reveal: true, family: 'translate',
    kicker: 'Say it in English', title: uk, items: ['<b>' + en + '</b>', ...EV(evEn, evUk)] });

  // Мітки правил і понять (для check_lesson.js; рушій їх ігнорує)
  const R1 = 'rule: zero and first conditional', R2 = 'rule: unless · as long as · otherwise',
    R3 = 'rule: second conditional', R4 = 'rule: third conditional · should have';
  const C_AS = 'concept: attack surface', C_INJ = 'concept: SQL injection', C_AA = 'concept: authentication vs authorization',
    C_BAC = 'concept: broken access control', C_HASH = 'concept: hash vs encrypt', C_SALT = 'concept: salt and slow hashing',
    C_MFA = 'concept: multi-factor authentication', C_DEP = 'concept: dependency and patching';

  /* ======================= THE CASE ======================= */
  add({ id: 'title', type: 'title', kicker: 'Unit 4 · English for Computer Science',
    title: 'Web Application Security', subtitle: 'A security audit: five doors before launch' });

  add({ id: 'c1', type: 'content', reveal: true, kicker: 'The case · GradeBook', title: 'Two weeks before launch',
    items: [
      SM('A student team has built <b>GradeBook</b>: students see their grades, teachers enter them. It goes live in <b>two weeks</b>: 9,000 students, 600 teachers.'),
      SM('The dean asks: <b>“Is it safe?”</b> You are the <b>audit team</b>: check every door before someone else does.'),
      K('grade — оцінка · go live — запрацювати · dean — декан · audit — перевірка')] });
  add({ id: 'c2', type: 'content', reveal: true, kicker: 'The case · How to look', title: 'Think like an attacker',
    items: [
      PH('door.jpg', 'A heavy vault door left open while a hooded figure reaches inside', '50% 45%', 90) +
        TM('attacker', '/əˈtækər/', 'зловмисник, нападник', 'a person who tries to get into a system without permission, to steal, change or break something.'),
      SM('Attackers rarely need brilliant tricks. Far more often, they look for <b>doors that nobody locked</b>.'),
      K('A “door” here = any place where someone can get into the system.')] });
  add({ id: 'c3', type: 'mcq', poll: true, kicker: 'The case · Place your bet',
    prompt: 'Your guess. Which weak point do security testers find <b>most often</b> in web apps today?' + K('<br>No wrong answers yet: we will check later.'),
    options: ['a brand-new trick nobody knows', 'code typed into a form', 'a page that shows data to the wrong user', 'a password typed into a fake website'] });

  /* ======================= THE MAP OF DOORS ======================= */
  add({ id: 'sA', type: 'end', kicker: 'The map', title: 'Where could someone get in?', text: 'Four words first, then the map of GradeBook' });

  add({ id: 'v1', type: 'content', reveal: true, kicker: 'The map · Words for the audit · 1/2', title: 'Weak points',
    items: [
      TM('flaw', '/flɔː/', 'вада, хиба', 'any mistake or weak point in a design or in code.'),
      TM('vulnerability', '/ˌvʌlnərəˈbɪləti/', 'вразливість', 'a flaw that an attacker can actually use to get in or do damage. Every vulnerability is a flaw; not every flaw is a vulnerability.')] });
  add({ id: 'v2', type: 'content', reveal: true, kicker: 'The map · Words for the audit · 2/2', title: 'Using a weak point',
    teaches: [C_AS],
    items: [
      TM('to exploit', '/ɪkˈsplɔɪt/', 'використати (вразливість)', 'to use a vulnerability on purpose: “They exploited a flaw in the login form.”'),
      TM('attack surface', '/əˈtæk ˌsɜːrfəs/', 'поверхня атаки', 'all the places where someone can try to get in: every form, URL and file upload, and every library you use. Each new feature makes it bigger.')] });
  add({ id: 'v3', type: 'content', reveal: true, kicker: 'The map · GradeBook’s weak points', title: 'Five doors to check',
    items: [
      SVG('0 0 320 206', 'GradeBook: five places to check, numbered in the order of the audit', DEFS +
        TX(10, 14, 'the internet', { s: 13, c: 'var(--ink-2)' }) +
        [['1', 'search box', 22], ['2', '/grades/1043', 59], ['3', 'password table', 96], ['4', 'teachers’ login', 133], ['5', 'old library', 170]].map(([n, t, y]) =>
          BOX(10, y, 150, 30) + TX(22, y + 20, n, { b: 1, c: 'var(--accent)' }) + TX(40, y + 20, t, { s: 14, mono: t.startsWith('/') }) + AR(162, y + 15, 214, 108)).join('') +
        BOX(216, 78, 96, 60, 'var(--accent-soft)') + TX(264, 104, 'GradeBook', { m: 1, b: 1 }) + TX(264, 124, 'grades data', { m: 1, s: 13, c: 'var(--ink-2)' })),
      SM('<b>1, 2, 4</b>: places where people send data in. <b>5</b>: someone else’s code inside GradeBook. <b>3</b>: what an attacker gets <b>if</b> they get in.'),
      SM('The audit checks them in this order: <b>is each door locked?</b>')] });
  add({ id: 'm1', type: 'match', family: 'label', kicker: 'The map · Check the doors',
    needs: [C_AS, 'attacker'],
    prompt: 'GradeBook’s attack surface: how could an attacker <b>exploit</b> each door (1–4)? One option (a–e) is extra.',
    left: ['search box', '/grades/1043', 'teachers’ login', 'old library'],
    right: ['type code, not text', 'use a known flaw', 'read the password table', 'guess passwords', 'change the number'] });
  /* ======================= DOOR 1 · THE SEARCH BOX ======================= */
  add({ id: 'sB', type: 'end', kicker: 'Door 1 · The search box', title: 'What if the input is code?', text: 'Injection: the classic unlocked door' });

  add({ id: 'v4', type: 'content', reveal: true, kicker: 'Door 1 · Injection · 1/4', title: 'Data or a command?',
    teaches: [C_INJ],
    items: [
      TM('SQL injection', '/ˌes kjuː ˈel ɪnˌdʒekʃn/', 'SQL-ін’єкція', 'an attack in which someone types database code (SQL) into a form, and the app sends it to the database, which runs it.'),
      K('SQL /ˌes kjuː ˈel/ or /ˈsiːkwəl/ — Structured Query Language, the language of databases · query — запит')] });
  add({ id: 'v5', type: 'content', reveal: true, kicker: 'Door 1 · Injection · 2/4', title: 'How it works',
    items: [
      SVG('0 0 320 196', 'An app pastes user input into a database query', DEFS +
        TX(10, 18, 'GradeBook builds this query:', { s: 13, c: 'var(--ink-2)' }) +
        BOX(10, 26, 300, 34) + TX(20, 48, "...WHERE name = '<tspan fill=\"var(--accent)\" font-weight=\"700\">INPUT</tspan>'", { mono: 1, s: 14 }) +
        TX(10, 86, 'A student types:  Anna', { s: 14 }) + TX(26, 106, "→ name = 'Anna'  → Anna’s grades", { s: 13, mono: 1, c: 'var(--ok)' }) +
        TX(10, 136, "An attacker types:  x' OR '1'='1", { s: 14 }) + TX(26, 156, "→ name = 'x' OR '1'='1'", { s: 13, mono: 1, c: 'var(--no)' }) +
        TX(26, 178, '→ always true: EVERY student’s grades', { s: 13, c: 'var(--no)' })),
      SM('GradeBook <b>pastes</b> the input into its command.'),
      SM('The database can’t tell the student’s name from the attacker’s code. It runs everything.')] });

  add({ id: 'ic1', type: 'gap', family: 'cause', kicker: 'Door 1 · Check the idea', needs: [C_INJ],
    instruction: 'One word.',
    prompt: 'GradeBook pastes the input into its query, so the database runs the attacker’s ___.', placeholder: 'one word' });
  add({ id: 'v6', type: 'content', reveal: true, kicker: 'Door 1 · Injection · 3/4', title: 'The main lock',
    items: [
      TM('parameterized query', '/pəˈræmətəraɪzd ˈkwɪri/', 'параметризований запит', 'the command and the user’s data travel <b>separately</b>, so the data is never run as code.'),
      K('Think of a paper form with boxes: whatever you write in the “Name” box stays a name, even if it looks like an order.')] });
  add({ id: 'v6b', type: 'content', reveal: true, kicker: 'Door 1 · Injection · 4/4', title: 'A second layer',
    items: [
      TM('input validation', '/ˈɪnpʊt ˌvælɪˈdeɪʃn/', 'перевірка вхідних даних', 'the server checks that each input looks right (a grade is 1–100) and rejects the rest. Useful, but not enough alone.'),
      SM('Checks in the <b>browser</b> can be skipped: an attacker can send requests straight to the server with a script.')] });
  add({ id: 'sc1', type: 'mcq', family: 'scenario', kicker: 'Door 1 · Check the idea',
    needs: [C_INJ, 'input validation'],
    prompt: 'GradeBook checks input only with JavaScript in the <b>browser</b>. An attacker sends requests with a script, <b>without a browser</b>. <b>What checks the input?</b>',
    options: ['The browser checks it anyway.', 'Nothing checks it.', 'The database rejects bad input.'] });
  add({ id: 'v7', type: 'content', reveal: true, kicker: 'Door 1 · The same mistake on a page', title: 'Cross-site scripting',
    items: [
      TM('cross-site scripting (XSS)', '/ˌkrɔːs saɪt ˈskrɪptɪŋ/', 'міжсайтовий скриптинг', 'someone types a script into a comment field; the site shows it to other visitors, their browsers run it, and it can steal their login session.'),
      SM('SQL injection attacks the <b>database</b>. XSS attacks the <b>other users</b>.'),
      K('XSS, not CSS: CSS already meant style sheets.')] });
  /* ---------- Grammar 1 · how the system works vs what will happen ---------- */
  add({ id: 'g1a', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 1/2', title: 'How the system works: always',
    teaches: [R1],
    items: [
      FX('If', '+', 'present', ',', 'present'),
      RC('zero', 'a rule of the system: it happens <b>every time</b>.', 'If the app pastes input into a query, the database runs it.'),
      RC('zero', '<i>when</i> works here too.', 'When a student logs in, GradeBook shows their grades.')] });
  add({ id: 'g1b', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 2/2', title: 'One likely result in the future',
    items: [
      FX('If', '+', 'present', ',', 'will / can / may', '+', 'V'),
      RC('first', 'a real possibility: what <b>will</b> happen if…', 'If we don’t fix the search box, someone will find it.'),
      RC('trap', 'After <b>if</b>: present, never <b>will</b>.'),
      OKNO('If we fix it…', 'If we will fix it…')] });

  add({ id: 'g1c', type: 'gap', family: 'form', kicker: 'Door 1 · Rule 1 · 1/3', needs: [R1],
    instruction: 'Put the verb in the correct form. <b>Example:</b> If a request <b>comes</b> (come) from a robot, the server blocks it.',
    prompt: 'If a student ___ (enter) the wrong password five times, GradeBook locks the account for fifteen minutes.', placeholder: 'one word' });
  add({ id: 'g1d', type: 'gap', family: 'form', kicker: 'Door 1 · Rule 1 · 2/3', needs: [R1],
    instruction: 'Put the verb in the correct form.',
    prompt: 'If we ___ (not / update) the search code this week, the scanner will flag it again.' + K('<br>scanner — a tool that checks code for known flaws'), placeholder: 'two words' });
  add({ id: 'g1e', type: 'gap', family: 'form', kicker: 'Door 1 · Rule 1 · 3/3', needs: [R1, 'input validation'],
    instruction: 'Put the verb in the correct form (passive).',
    prompt: 'If the input ___ (not / check) on the server, an attacker will be able to inject SQL code.', placeholder: 'two or three words' });

  add({ id: 'ca1', type: 'match', family: 'cause', kicker: 'Door 1 · Cause and effect',
    needs: [R1, C_INJ, 'cross-site scripting (XSS)', 'parameterized query'],
    prompt: 'Link each <b>if</b> (1–4) to its result. One (a–e) is extra.',
    left: ['If input goes into the query,', 'If the query uses parameters,', 'If comments hold scripts (cross-site scripting),', 'If we test the form before launch,'],
    right: ['the flaw is caught.', 'the input stays data.', 'the server deletes it.', 'the database runs code.', 'browsers run the script.'] });
  add({ id: 'r3a', type: 'content', kicker: 'The text · The Door Nobody Locked · ¶3 · 1/2', title: 'The classic door',
    items: [RD('The classic unlocked door is injection. <b>[A]</b> If an application builds a database query by pasting the user’s input directly into it, an attacker can type SQL code instead of a name, and the database will run it. <b>[B]</b> The same mistake in a web page leads to cross-site scripting, in which a script typed into a comment field runs in other visitors’ browsers. <b>[C]</b>')] });
  add({ id: 'in1', type: 'mcq', family: 'insert', kicker: 'The text · ¶3 · Where does it go?', needs: [C_INJ],
    prompt: K('Example: “I woke up. [A] I made coffee. [B]” → “Then I drank it.” goes at B.<br>') +
      'Where does this sentence fit best: A, B or C?<br><b>“To the database, the attacker’s code looks exactly like the app’s own.”</b>',
    options: ['A', 'B', 'C'] });
  add({ id: 'r3b', type: 'content', kicker: 'The text · ¶3 · 2/2', title: 'The known defense',
    items: [RD('The defense is well known: input is validated on the server, and queries are built with parameters so that user data is never treated as code. Injection has appeared in every edition of the OWASP Top 10, the best-known list of critical web application risks, since the first one in 2003.'),
      K('OWASP /ˈoʊwɑːsp/ — Open Worldwide Application Security Project · edition — видання')] });

  add({ id: 'sp1', type: 'content', reveal: true, family: 'ladder', format: 'explain', kicker: 'Door 1 · Speak · One at a time',
    title: 'Explain it three times',
    items: [
      SM('<b>To a developer:</b> <i>“The search code pastes the input into the SQL query, so…”</i>'),
      SM('<b>To the dean:</b> <i>“If someone types a command into the search box, …”</i>'),
      SM('<b>To your grandmother:</b> <i>“Think of a form where someone writes an order instead of a name, and the clerk…”</i>')] });
  /* ======================= DOOR 2 · THE GRADES PAGE (deep dive) ======================= */
  add({ id: 'sC', type: 'end', kicker: 'Door 2 · The grades page', title: 'Who are you? And is this yours?', text: 'The deep dive of the audit' });

  add({ id: 'v8', type: 'content', reveal: true, kicker: 'Door 2 · Two questions · 1/2', title: 'Two different checks',
    teaches: [C_AA],
    items: [
      TM('authentication', '/ɔːˌθentɪˈkeɪʃn/', 'автентифікація', 'checking <b>who you are</b>: a password, a fingerprint, a code from your phone.'),
      TM('authorization', '/ˌɔːθərəˈzeɪʃn/', 'авторизація (перевірка прав)', 'checking <b>what you are allowed to do</b>: see this page? change this grade?')] });
  add({ id: 'v9', type: 'content', reveal: true, kicker: 'Door 2 · Two questions · 2/2', title: 'A word that tricks Ukrainian speakers',
    teaches: ['concept: log in is not authorize'],
    items: [
      SM('«Авторизуватися» often means “to enter a site”. In English, that is <b>log in</b> or <b>sign in</b>.') + OKNO('I <b>logged in</b> with my email.', 'I authorized with my email.'),
      SM('<b>Authorize</b> = give or check rights: <i>Only the admin can authorize new teachers.</i>'),
      K('Airport: the passport check = authentication; the boarding pass for <b>this</b> flight = authorization.')] });
  add({ id: 'aa1', type: 'gap', family: 'define', kicker: 'Door 2 · Check the idea', needs: [C_AA],
    instruction: 'One word: authentication or authorization?',
    prompt: 'GradeBook asks for your password and a code from your phone. It is checking who you are: this is ___.', placeholder: 'one word' });

  add({ id: 'v10', type: 'content', reveal: true, kicker: 'Door 2 · What the server remembers', title: 'Sessions and rights',
    items: [
      TM('session', '/ˈseʃn/', 'сеанс', 'after you log in, the server remembers you for a while; every request after that carries a session ID, so you don’t log in again.'),
      TM('permission', '/pərˈmɪʃn/', 'дозвіл, право доступу', 'the right to do one thing: view a report, edit a grade, delete a course.')] });
  add({ id: 'dd1', type: 'content', reveal: true, kicker: 'Door 2 · Deep dive · 1/2', title: 'One request, step by step',
    teaches: [C_BAC],
    items: [
      SVG('0 0 320 222', 'A request for grade report 1044 passes two checks on the server', DEFS +
        BOX(10, 4, 300, 30) + TX(20, 24, 'Maria’s browser:  GET /grades/1044', { s: 14, mono: 1 }) + AR(160, 34, 160, 50) +
        BOX(10, 52, 300, 44) + TX(20, 70, '① Who are you?', { b: 1 }) + TX(20, 88, 'session ID → Maria  ✓ authentication', { s: 13, c: 'var(--ok)' }) + AR(160, 96, 160, 112) +
        BOX(10, 114, 300, 44) + TX(20, 132, '② Is report 1044 Maria’s?', { b: 1 }) + TX(20, 150, 'no, it is Ivan’s  ✗ authorization', { s: 13, c: 'var(--no)' }) + AR(160, 158, 160, 174) +
        BOX(10, 176, 300, 42, 'var(--accent-soft)') + TX(20, 194, '403 Forbidden', { b: 1, mono: 1 }) + TX(20, 211, 'Maria sees nothing of Ivan’s', { s: 13, c: 'var(--ink-2)' })),
      SM('Maria changes her report number in the URL, <b>1043</b>, to <b>1044</b>. <b>①</b> Her session: it is Maria. <b>②</b> Is 1044 hers? No.'),
      SM('<b>403 Forbidden</b>: “I know who you are, and you may not see this.”')] });
  add({ id: 'dd2', type: 'content', reveal: true, kicker: 'Door 2 · Deep dive · 2/2', title: 'GradeBook skips step ②',
    items: [
      SM('GradeBook asks <b>only</b> question ①. Maria is logged in, so it sends report 1044: <b>Ivan’s grades</b>.'),
      TM('broken access control', '/ˌbroʊkən ˈækses kənˌtroʊl/', 'вади керування доступом', 'the app checks who you are, but not what you may see or do. Any logged-in user can read other people’s data.'),
      K('<b>broken</b> here = doesn’t work properly. Logging in is not a key to every room: it only proves who you are.')] });
  add({ id: 'sc2', type: 'mcq', family: 'scenario', kicker: 'Door 2 · Check the idea',
    needs: [C_BAC, C_AA],
    prompt: 'A teacher is logged in. She changes <b>/course/12/edit</b> to <b>/course/13/edit</b> and edits a colleague’s course. <b>What failed?</b>',
    options: ['authentication: the server didn’t check who she is', 'SQL injection in the URL', 'authorization: the server didn’t check her permissions'] });

  add({ id: 'v11', type: 'content', reveal: true, kicker: 'Door 2 · The cure', title: 'Only what you really need',
    items: [
      TM('access control', '/ˈækses kənˌtroʊl/', 'керування доступом', 'all the rules that decide who may do what, checked <b>on the server</b> for <b>every</b> request.'),
      TM('least privilege', '/ˌliːst ˈprɪvəlɪdʒ/', 'принцип найменших привілеїв', 'each user and each service gets only the access it really needs: a student sees only their own grades.')] });
  add({ id: 'sq0', type: 'match', family: 'sequence', kicker: 'Door 2 · Check the order', needs: [C_BAC],
    prompt: 'In an app with working <b>access control</b>, what happens 1st, 2nd, 3rd? One step (a–d) is extra.',
    left: ['1st', '2nd', '3rd'],
    right: ['server checks the owner', 'browser sends the request', 'server re-checks the password', 'server checks the session'] });

  add({ id: 'df1', type: 'gap', family: 'define', kicker: 'Door 2 · Name the principle',
    needs: ['least privilege'],
    instruction: 'Name the principle. <b>Example:</b> checking who you are → <b>authentication</b>.',
    prompt: 'GradeBook’s email robot can send emails, but it cannot read or change grades. This follows the principle of ___.', placeholder: 'two words' });

  add({ id: 'bet2', type: 'content', reveal: true, kicker: 'The case · Your bet vs the evidence', title: 'So which weak point is number one?',
    items: [
      SM('Your bet: what did most of you choose? <b>OWASP Top 10, 2025</b>, the best-known list of flaws found in web apps, says:'),
      SM('<b>#1</b>: broken access control, the door we just checked. Injection was #1 for years; in 2025 it is <b>#5</b>: frameworks now help to lock that door.'),
      K('Careful: the list ranks flaws <b>in apps</b>. Many real attacks start with a stolen password instead: that is Door 4.')] });
  add({ id: 'ab1', type: 'mcq', family: 'abbr', kicker: 'Say it like an engineer · 1/2', needs: [],
    prompt: K('Example: “API” is read letter by letter: A-P-I.<br>') + 'How do engineers usually say <b>OWASP</b>?',
    options: ['“OH-wasp”, as one word', 'O-W-A-S-P, letter by letter', '“oh-WASP”, stress on WASP'] });
  add({ id: 'ab2', type: 'content', reveal: true, family: 'abbr', kicker: 'Say it like an engineer · 2/2 · One student at a time',
    title: 'Read one line aloud. The next student reads the next line.',
    items: [SM('<b>SQL</b> → “S-Q-L” or “sequel”'), SM('<b>XSS</b> → “X-S-S” or “cross-site scripting”'), SM('<b>URL</b> → “U-R-L”'),
      SM('<b>403</b> → “four-oh-three”'), SM('<b>/grades/1044</b> → “slash grades slash ten forty-four”')] });

  add({ id: 'r4a', type: 'content', kicker: 'The text · ¶4 · 1/2', title: 'A quieter problem',
    items: [RD('Yet in the 2025 edition, first place goes to a quieter problem: broken access control. Authentication answers the question “Who are you?”; authorization answers “What are you allowed to do?” Many applications ask only the first question.')] });
  add({ id: 'r4b', type: 'content', kicker: 'The text · ¶4 · 2/2', title: 'The invoice',
    items: [RD('Imagine a user who opens /invoices/1043, changes the number to 1044 and receives somebody else’s invoice. The application has checked who the user is, but not whether the invoice belongs to them. The cure is to check permissions on the server for every request and to follow the principle of least privilege: each user and each service gets only the access it really needs.'),
      K('invoice — рахунок-фактура')] });

  /* ---------- Grammar 2 · unless / as long as / otherwise ---------- */
  add({ id: 'mp1', type: 'match', family: 'label', kicker: 'The text · ¶4 · The same flaw in GradeBook', needs: [C_BAC],
    prompt: 'The text talks about invoices. What is the same thing in GradeBook (a–d)? One is extra.',
    left: ['/invoices/1043', 'somebody else’s invoice', 'check permissions'],
    right: ['Ivan’s grades', 'check the owner', '/grades/1043', 'check the password'] });

  add({ id: 'g2a', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 1/2', title: 'unless = if … not',
    teaches: [R2],
    items: [
      FX('unless', '+', 'positive verb'),
      RC('unless', 'already contains <b>not</b>, so the verb after it is positive.', 'The server rejects the request unless the report belongs to the user.'),
      OKNO('unless it belongs to you', 'unless it doesn’t belong to you')] });
  add({ id: 'g2b', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 2/2', title: 'More ways to set a condition',
    items: [
      RC('as long as', '= only if; only while this is true', 'A session stays open as long as you are active.'),
      RC('provided that', 'the same, more formal (rules)', 'Teachers may export grades provided that the course is theirs.'),
      RC('otherwise', 'after ; or a period: the result if the condition fails', 'Check the owner; otherwise, anyone can read any report.')] });
  add({ id: 'tr1', type: 'mcq', family: 'transform', kicker: 'Door 2 · Rule 2 · Same meaning', needs: [R2],
    prompt: K('Example: If it doesn’t rain, we’ll go. → We’ll go <b>unless</b> it rains.<br>') +
      '“If a teacher <b>doesn’t own</b> the course, she <b>can’t edit</b> it.” <b>Same meaning?</b>',
    options: ['She can’t edit it unless she doesn’t own it.', 'She can edit it unless she owns it.', 'She can’t edit it unless she owns it.'] });
  const BANK2 = 'Use: <b>as long as · otherwise · unless · until</b> (one is extra).';
  SAY('say2', 'Сервер відхиляє запит, якщо звіт не належить користувачеві.',
    'The server rejects the request unless the report belongs to the user.',
    'I won’t come unless you invite me.', 'Я не прийду, якщо ти мене не запросиш.');

  add({ id: 'g2c', type: 'gap', family: 'form', kicker: 'Door 2 · Rule 2 · 1/3', needs: [R2],
    instruction: BANK2, prompt: 'A teacher can’t change a grade ___ the course is hers.', placeholder: 'one word' });
  add({ id: 'g2d', type: 'gap', family: 'form', kicker: 'Door 2 · Rule 2 · 2/3', needs: [R2, 'session'],
    instruction: BANK2, prompt: 'A session stays open ___ the student is active; after 30 idle minutes, it closes.', placeholder: 'one to three words' });
  add({ id: 'g2e', type: 'gap', family: 'form', kicker: 'Door 2 · Rule 2 · 3/3', needs: [R2],
    instruction: BANK2, prompt: 'Add the ownership check today; ___, grades will leak on day one.', placeholder: 'one word' });

  add({ id: 'pr1', type: 'content', reveal: true, family: 'relay', format: 'paraphrase', kicker: 'Door 2 · Paraphrase chain · One student at a time',
    title: 'Say the same rule three ways',
    items: [
      CARD('The rule', 'If a user isn’t the owner of a report, the server says no.'),
      SM('<b>Student 1</b>, with <b>unless</b>: <i>The server says no unless…</i>'),
      SM('<b>Student 2</b>, with <b>as long as</b>: <i>The server shows a report only as long as…</i>'),
      SM('<b>Student 3</b>, with <b>otherwise</b>: <i>The server must check the owner; otherwise, …</i>')] });

  /* ---------- Code review ---------- */
  const LN = (who, t) => SM('<b>' + who + ':</b> ' + t);
  const LN2 = (a, b) => SM('<b>' + a[0] + ':</b> ' + a[1] + '<br><b>' + b[0] + ':</b> ' + b[1]);
  add({ id: 'cr1', type: 'content', reveal: true, kicker: 'Door 2 · A code review of the grades page · 1/2',
    items: [
      PH('review.jpg', 'Two developers reviewing code together at one monitor', '50% 40%', 56) + LN2(['Oksana', 'I’ve looked at your pull request. The grades page works, but there’s a problem.'], ['Taras', 'What kind of problem?']),
      LN('Oksana', 'If I’m logged in and change the report ID in the URL, I can see someone else’s grades.'),
      LN('Taras', 'Seriously? But the user has to be logged in to open the page.')] });
  add({ id: 'cr2', type: 'content', reveal: true, kicker: 'Door 2 · A code review of the grades page · 2/2',
    items: [
      LN2(['Oksana', 'Right: you check who the user is, but not whether the report is theirs.'], ['Taras', 'Oh, I see. So that’s authentication without authorization.']),
      LN('Oksana', 'Exactly. If this had gone to production, we’d have exposed student data on day one.'),
      LN('Taras', 'Good catch. I’ll add an ownership check and a test for it before I push again.') +
        K('good catch — добре, що помітила · push — надіслати зміни · ownership check — перевірка власника')] });
  add({ id: 'gn1', type: 'mcq', family: 'genre', kicker: 'Door 2 · The review comment', needs: [C_BAC, R2],
    prompt: 'A good review comment says <b>the risk</b>, <b>when it happens</b> and <b>the fix</b>.<br><b>Which comment does all three?</b>',
    options: [
      'This page is insecure. Please rewrite it.',
      'Great work, but I don’t like the URL.',
      'Any logged-in user can open any report by changing the ID. Please add an ownership check; otherwise, grades leak.'] });

  add({ id: 'sp2', type: 'content', reveal: true, format: 'warn', kicker: 'Door 2 · Speak · One student at a time',
    title: 'Review it. The teacher is the developer.',
    items: [
      CARD('Pull request #58 · “Download my grades (PDF)”', MONO('/grades/pdf?id=1043') + ' · logged in ✓ · owner ✗'),
      SM('<b>Risk:</b> <i>If someone changes the ID, they can…</i><br><b>Safe only if:</b> <i>It’s only safe as long as…</i>'),
      SM('<b>Fix:</b> <i>Please add…; otherwise, …</i>') +
        K('The developer will argue. Answer: <i>Logging in is authentication; it doesn’t check…</i>')] });
  /* ======================= DOOR 3 · THE PASSWORD TABLE ======================= */
  add({ id: 'sD', type: 'end', kicker: 'Door 3 · The password table', title: 'What if someone steals the database?', text: 'What we found: GradeBook stores passwords in a way that a thief could guess quickly.' });

  add({ id: 'v12', type: 'content', reveal: true, kicker: 'Door 3 · What is stored · 1/2', title: 'Readable or not?',
    items: [
      TM('credentials', '/krəˈdenʃlz/', 'облікові дані', 'what you use to log in: usually a username and a password.'),
      TM('plain text', '/ˌpleɪn ˈtekst/', 'відкритий (незашифрований) текст', 'data stored as normal, readable letters: anyone who sees the table can read every password.')] });
  add({ id: 'v13', type: 'content', reveal: true, kicker: 'Door 3 · What is stored · 2/2', title: 'Encrypt or hash?',
    teaches: [C_HASH],
    items: [
      TM('encryption', '/ɪnˈkrɪpʃn/', 'шифрування', 'scrambles data with a key. With the key, you can turn it back: good for card numbers the system must read again.'),
      TM('to hash', '/hæʃ/', 'гешувати', 'turns a password into a fixed-length string that <b>cannot be turned back</b>. At login, the server hashes the typed password and compares.')] });
  add({ id: 'v13b', type: 'content', reveal: true, kicker: 'Door 3 · Encrypt or hash? · Two pictures', title: 'A box and a grinder',
    items: [
      SM('🔒 <b>Encryption</b> = a locked box: with the key, you open it again.'),
      SM('🥩 <b>Hashing</b> = a meat grinder: you can’t turn mince back into steak, but the same steak always gives the same mince.'),
      K('Ukrainian «шифрувати паролі» in a spec = <b>hash</b> passwords.')] });
  add({ id: 'hc1', type: 'gap', family: 'scenario', kicker: 'Door 3 · Check the idea', needs: [C_HASH],
    instruction: 'One word: <b>hash</b> or <b>encrypt</b>?',
    prompt: 'The dean’s office must print each graduate’s passport number on the diploma later. So GradeBook must ___ the passport numbers.', placeholder: 'one word' });
  add({ id: 'v14', type: 'content', reveal: true, kicker: 'Door 3 · How passwords are stored', title: 'Salt and a slow hash',
    teaches: [C_SALT],
    items: [
      SVG('0 0 320 176', 'A password and a random salt go into a slow hash function; only the hash is stored', DEFS +
        BOX(10, 6, 130, 32) + TX(20, 27, 'kitten7', { mono: 1 }) + TX(146, 27, '+', { b: 1 }) +
        BOX(166, 6, 144, 32) + TX(176, 27, 'salt: x9Qp', { mono: 1 }) +
        AR(160, 40, 160, 56) + BOX(70, 58, 180, 34, 'var(--accent-soft)') + TX(160, 80, 'bcrypt (slow on purpose)', { m: 1, s: 13, b: 1 }) +
        AR(160, 92, 160, 108) + BOX(10, 110, 300, 32) + TX(20, 131, 'stored: $2b$12$x9Qp…Hq7 (salt + hash)', { mono: 1, s: 13 }) +
        TX(10, 166, 'Login: same salt + typed password → same hash? ✓', { s: 13, c: 'var(--ink-2)' })),
      TM('salt', '/sɔːlt/', 'сіль', 'a random value added to each password before hashing, so two students with “qwerty123” get different hashes.'),
      SM('<b>Slow on purpose</b>: one check is fast for you; billions of guesses become far too slow.')] });
  add({ id: 'sc4', type: 'gap', family: 'scenario', kicker: 'Door 3 · Check the idea', needs: [C_SALT],
    instruction: 'One word.',
    prompt: 'Two students both use “qwerty123”. With a salt, their hashes are ___.', placeholder: 'one word' });

  add({ id: 'v15', type: 'content', reveal: true, kicker: 'Door 3 · The attacker’s side', title: 'Cracking and compromising',
    items: [
      TM('to crack', '/kræk/', 'підібрати (пароль, геш)', 'to find the password behind a hash by guessing very fast. Not <b>break</b> (= damage, stop working).'),
      TM('to compromise', '/ˈkɑːmprəmaɪz/', 'скомпрометувати', 'to break the security of an account or system and take control of it.'),
      K('bcrypt /ˈbiːkrɪpt/ · Argon2 /ˈɑːrɡɑːn tuː/ — slow hash functions')] });
  add({ id: 'sc3', type: 'mcq', family: 'scenario', kicker: 'Door 3 · Check the idea', needs: [C_HASH, C_SALT],
    prompt: 'After the fix, GradeBook salts every password and hashes it with bcrypt. Then an attacker steals the table. <b>Can the attacker read the passwords?</b>',
    options: ['Not directly: they can only guess, very slowly.', 'Yes, if they also steal the encryption key.', 'Yes: a hash is just a password written in code.'] });
  add({ id: 'tp1', type: 'content', reveal: true, kicker: 'Door 3 · Words that trick you', title: 'Three pairs',
    items: [
      GT(['say', 'not', 'because'], [
        ['<b>hash</b> passwords', 'encrypt', 'a hash can’t be turned back'],
        ['<b>crack</b> a password', 'break', 'break = damage, stop working'],
        ['<b>password</b>', 'parole', 'parole = early release from prison']]),
      K('«пароль» = password · «зламати пароль» = crack · «шифрувати паролі» = hash')] });

  add({ id: 'tm1', type: 'match', family: 'trap', kicker: 'Door 3 · Which verb?', needs: [C_HASH, 'crack'],
    prompt: 'What does each verb (1–4) do? One option (a–e) is extra.',
    left: ['hash', 'encrypt', 'crack', 'break'],
    right: ['guess a password fast', 'stop something working', 'two-way, with a key', 'give a user rights', 'one way only'] });

  add({ id: 'pe1', type: 'mcq', family: 'post-edit', kicker: 'Door 3 · Fix the machine translation · 1/3', needs: [C_HASH],
    prompt: K('Example: «Сайт зламали» → The site was <s>broken</s> → The site was <b>hacked</b>.<br>') +
      'A spec says: «Ми шифруємо паролі користувачів.»<br>MT: <b>We encrypt users’ passwords.</b><br>Tap the wrong part.',
    options: ['We', 'encrypt', 'users’ passwords'] });
  add({ id: 'pe2', type: 'gap', family: 'post-edit', kicker: 'Door 3 · Fix the machine translation · 2/3', needs: ['concept: log in is not authorize'],
    instruction: '«Після авторизації студент бачить свої оцінки.»<br>MT: After <s>authorizing</s>, the student sees their grades. Correct it.',
    prompt: 'After ___, the student sees their grades.', placeholder: 'two words' });
  add({ id: 'pe3', type: 'gap', family: 'post-edit', kicker: 'Door 3 · Fix the machine translation · 3/3', needs: ['crack'],
    instruction: '«Короткий пароль зламують за кілька хвилин.»<br>MT: A short password is <s>broken</s> in minutes. Correct it.',
    prompt: 'A short password is ___ in minutes.', placeholder: 'one word' });

  add({ id: 'r5a', type: 'content', kicker: 'The text · ¶5 · 1/2', title: 'Passwords deserve special care',
    items: [RD('A well-built site never stores them in plain text, and it does not simply encrypt them either. Instead, each password is combined with a random salt and hashed with a deliberately slow algorithm such as bcrypt or Argon2. Unless an attacker has enormous computing power, stolen hashes of strong passwords are practically useless.'),
      K('deliberately — навмисно · computing power — обчислювальна потужність')] });

  add({ id: 'rt1', type: 'gap', family: 'trap', kicker: 'The text · ¶5 · Check', needs: [C_HASH],
    instruction: 'One word from the text.',
    prompt: 'A well-built site never stores passwords in plain text, and it does not simply ___ them either.', placeholder: 'one word' });
  SAY('say3', 'Паролі не шифрують, а гешують із сіллю.',
    'Passwords aren’t encrypted; they’re hashed with a salt.',
    'You don’t boil green tea; you brew it.', 'Зелений чай не варять, а заварюють.');

  add({ id: 'wf1', type: 'gap', family: 'wordform', kicker: 'Door 3 · Word forms · 1/3', needs: ['encryption'],
    instruction: 'Change the word in brackets. <b>Example:</b> Account (secure) → account <b>security</b>.',
    prompt: 'Card numbers are protected with strong ___ (encrypt).', placeholder: 'one word' });
  add({ id: 'wf2', type: 'gap', family: 'wordform', kicker: 'Door 3 · Word forms · 2/3', needs: ['input validation'],
    instruction: 'Change the word in brackets.',
    prompt: 'Input ___ (validate) must happen on the server, not only in the browser.', placeholder: 'one word' });
  add({ id: 'wf3', type: 'gap', family: 'wordform', kicker: 'Door 3 · Word forms · 3/3', needs: ['vulnerability'],
    instruction: 'Change the word in brackets.',
    prompt: 'The scanner found a critical ___ (vulnerable) in the search code.', placeholder: 'one word' });

  /* ======================= DOOR 4 · THE TEACHERS’ LOGIN ======================= */
  add({ id: 'sE', type: 'end', kicker: 'Door 4 · The teachers’ login', title: 'What if a password is stolen?', text: 'The door that a hash cannot lock' });

  add({ id: 'ps1', type: 'open', family: 'personal', kicker: 'Door 4 · You first',
    prompt: PH('lead.jpg', 'A worried young woman looking at a red warning on her phone', '50% 40%', 90) +
      'An email says: <b>“Your credentials were found in a list of stolen passwords.”</b><br>What do you do <b>first</b>? One sentence:<br>' +
      K('First, I’d change… / turn on… / check…'),
    placeholder: 'First, I’d…' });

  add({ id: 'v16', type: 'content', reveal: true, kicker: 'Door 4 · How passwords get stolen', title: 'Bait and a better habit',
    items: [
      TM('phishing', '/ˈfɪʃɪŋ/', 'фішинг', 'a fake email or website that tricks you into typing your password. Like fishing: the email is the bait.'),
      TM('password manager', '/ˈpæswɜːrd ˌmænɪdʒər/', 'менеджер паролів', 'an app that creates a long, different password for every site and remembers them all.')] });
  add({ id: 'v17', type: 'content', reveal: true, kicker: 'Door 4 · The lock that still works', title: 'Two things, not one',
    teaches: [C_MFA],
    items: [
      TM('multi-factor authentication (MFA)', '/ˌmʌlti ˌfæktər ɔːˌθentɪˈkeɪʃn/', 'багатофакторна автентифікація', 'you log in with two different things: something you <b>know</b> (a password) and something you <b>have</b> (your phone). A stolen password alone is not enough.'),
      SS('Like a bank card: the card (you have) + the PIN (you know). An <b>app</b> code is safer than an <b>SMS</b> code: SMS codes can be stolen if someone takes over your phone number.')] });
  add({ id: 'sc5', type: 'mcq', family: 'scenario', kicker: 'Door 4 · Check the idea', needs: [C_MFA, 'compromise'],
    prompt: 'A teacher uses her GradeBook password on a shopping site too. That site is <b>compromised</b>, and her password leaks. Multi-factor authentication is on in GradeBook. <b>What happens when the attacker tries it?</b>',
    options: ['The attacker logs in and changes grades.', 'The attacker logs in, but can only read grades.', 'The attacker also needs the code from her phone.'] });
  /* ---------- Grammar 3 · second conditional ---------- */
  add({ id: 'g3a', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 1/3', title: 'Imagine it: what would happen if…?',
    teaches: [R3],
    items: [
      FX('If', '+', 'past simple', ',', 'would / could / might', '+', 'V'),
      RC('second', 'a past form, but <b>not</b> past time: a situation we imagine, now or in the future.', 'If someone stole a teacher’s password, they could change grades.')] });
  add({ id: 'g3a2', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 2/3', title: 'Two jobs of the second conditional',
    items: [
      RC('security question', 'the question security teams ask:', 'What would happen if someone uploaded a script instead of a photo?'),
      RC('advice', '<b>were</b> for all persons:', 'If I were you, I’d turn on MFA.')] });
  add({ id: 'g3b', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 3/3', title: 'How likely do you think it is?',
    items: [
      GT(['', 'the speaker thinks…', 'example'], [
        ['<b>first</b>', 'it really happens', 'If a password <b>leaks</b>, an attacker <b>can</b> log in.'],
        ['<b>second</b>', 'it is a scenario we imagine', 'If someone <b>got</b> into an account, they <b>would</b> see grades.']]),
      SM('The choice is not only grammar: it shows how real you think the danger is.')] });

  add({ id: 'g3c', type: 'match', family: 'form', kicker: 'Door 4 · Rule 3 · 1/3', needs: [R3, 'phishing', 'password manager'],
    prompt: 'Join the halves (1–3). Watch the type: real or imagined? One ending (a–d) is extra.',
    left: ['If someone stole a teacher’s password,', 'If a phishing email works,', 'If I were the team lead,'],
    right: ['attackers can log in.', 'I’d require password managers.', 'I’ll require password managers.', 'they could change grades.'] });
  add({ id: 'g3d', type: 'gap', family: 'form', kicker: 'Door 4 · Rule 3 · 2/3', needs: [R3, C_MFA],
    instruction: 'Put the verb in the correct form. <b>Example:</b> If we <b>had</b> (have) more time, we would test more.',
    prompt: 'If we ___ (turn on) MFA for teachers, a stolen password wouldn’t be enough.', placeholder: 'two words' });
  add({ id: 'g3e', type: 'mcq', family: 'error', kicker: 'Door 4 · Rule 3 · 3/3 · Find the mistake', needs: [R3],
    prompt: K('Example: If it <s>will rain</s>, we’ll stay home. → If it <b>rains</b>, …<br>') +
      '<b>If I would be you, I would change the password today.</b><br>Tap the wrong part.',
    options: ['If I would be you,', 'I would change', 'the password today'] });

  add({ id: 'dl1', type: 'content', reveal: true, kicker: 'Door 4 · The dean’s office · 1/2',
    items: [
      PH('client.jpg', 'A developer with a laptop explaining something to a business client', '50% 35%', 44) +
        LN('Manager', 'Our teachers hate extra steps. Do we really need two-factor login?'),
      LN('Developer', 'I understand. But if a teacher’s password leaks from another site, an attacker can simply log in here.'),
      LN2(['Manager', 'Surely our teachers use different passwords?'], ['Developer', 'Many reuse the same password, unfortunately. And if someone got into a teacher’s account, they could change grades.']) +
        K('surely — хіба ж (чекаю на згоду)')] });
  add({ id: 'dl2', type: 'content', reveal: true, kicker: 'Door 4 · The dean’s office · 2/2',
    items: [
      LN('Developer', 'We could keep it optional for students, provided that we turn on two-factor login for all teachers. I’d also recommend an authenticator app instead of SMS codes.'),
      LN2(['Manager', 'That sounds reasonable, as long as the login stays quick.'], ['Developer', 'It will. Trusted devices are remembered for thirty days.']),
      LN('Manager', 'Fine. But if complaints start coming in, let’s review it.') +
        K('authenticator app — застосунок-автентифікатор')] });
  add({ id: 'co1', type: 'match', family: 'colloc', kicker: 'Door 4 · Words that go together', needs: [C_MFA, 'password manager'],
    prompt: 'Which words (a–e) go with each verb (1–4) in the dialogue? One is extra.',
    left: ['turn on', 'reuse', 'remember', 'review'],
    right: ['the decision', 'trusted devices', 'the same password', 'the hash function', 'two-factor login'] });

  add({ id: 'sp3', type: 'content', reveal: true, format: 'persuade', kicker: 'Door 4 · Hot seat · The teacher is the manager',
    title: 'Answer each objection',
    items: [
      SS('<b>1.</b> “Our teachers hate extra steps.”<br>→ <i>I understand, but if…, an attacker can…</i>'),
      SS('<b>2.</b> “Nobody would attack a grades website.”<br>→ <i>If someone got into…, they could…</i>'),
      SS('<b>3.</b> “SMS codes are easier.”<br>→ <i>I’d recommend an app instead, provided that…</i>'),
      SS('<b>4.</b> “What if teachers complain?”<br>→ <i>Let’s review it after a month; otherwise, …</i>')] });
  /* ======================= DOOR 5 · THE OLD LIBRARY ======================= */
  add({ id: 'sF', type: 'end', kicker: 'Door 5 · The old library', title: 'The door nobody locked', text: 'What we found: a library in GradeBook is two versions behind. A true story shows why that matters.' });

  add({ id: 'v18', type: 'content', reveal: true, kicker: 'Door 5 · Someone else’s code', title: 'Dependencies and patches',
    teaches: [C_DEP],
    items: [
      TM('dependency', '/dɪˈpendənsi/', 'залежність (стороння бібліотека)', 'someone else’s code (a library or a framework) that your app uses. If it has a vulnerability, your app has it too.'),
      TM('to patch', '/pætʃ/', 'залатати, встановити виправлення', 'to install a fix for a known flaw. The fix itself is a <b>patch</b>.')] });
  add({ id: 'v19', type: 'content', reveal: true, kicker: 'Door 5 · When it goes wrong', title: 'Breach and certificate',
    items: [
      TM('data breach', '/ˈdeɪtə briːtʃ/', 'злам (порушення захисту) даних', 'an attack in which someone gets into a system and takes data. A <b>leak</b> is data exposed by mistake, often with no attacker.'),
      TM('certificate', '/sərˈtɪfɪkət/', 'сертифікат', 'a digital file that a server or a security device needs to work with encrypted traffic. It has an end date: then it <b>expires</b>.')] });
  add({ id: 'nu1', type: 'gap', family: 'nuance', kicker: 'Door 5 · Breach or leak?', needs: ['data breach'],
    instruction: 'Choose and type: <b>breach</b> or <b>leak</b>.',
    prompt: 'A GradeBook admin saves all grades in a <b>public</b> folder by mistake. No attacker is involved. This is a ___.', placeholder: 'one word' });

  add({ id: 'r1a', type: 'content', kicker: 'The text · ¶1 · 1/3', title: 'March 2017',
    items: [PH('servers.jpg', 'A row of server racks with green lights and one red light', '50% 50%', 80) +
      RD('In March 2017, the team behind Apache Struts, a popular framework for Java web applications, published a fix for a critical vulnerability. Any server that still ran an old version could be taken over with a single, specially crafted request, and attacks began almost immediately.'),
      K('Apache Struts /əˈpætʃi strʌts/ · Java /ˈdʒɑːvə/ · specially crafted — спеціально сформований')] });
  add({ id: 'r1b', type: 'content', kicker: 'The text · ¶1 · 2/3', title: 'One portal',
    items: [RD('At Equifax, one of the three largest credit reporting agencies in the United States, an order to update was sent out, but one online portal was never patched. In mid-May, attackers found it and got in. By the time the intrusion was discovered at the end of July, the personal data of about 147 million people had been stolen.'),
      K('Equifax /ˈekwɪfæks/ · credit reporting agency — кредитне бюро · intrusion — вторгнення')] });
  add({ id: 'r1c', type: 'content', kicker: 'The text · ¶1 · 3/3', title: 'Entirely preventable',
    items: [RD('The attack went unnoticed partly because a security certificate on a traffic-inspection device had expired long before, so encrypted traffic was not being checked. The company later agreed to pay up to 700 million dollars in a settlement, and a US congressional report described the breach as entirely preventable.'),
      K('settlement — мирова угода · congressional report — звіт Конгресу')] });

  add({ id: 'sq1', type: 'match', family: 'sequence', kicker: 'The text · ¶1 · Put the events in order', needs: ['patch', 'data breach'],
    prompt: 'What happened 1st, 2nd…? One event (a–e) did <b>not</b> happen.',
    left: ['1st', '2nd', '3rd', '4th'],
    right: ['the breach is discovered', 'portal patched in March', 'Equifax agrees to pay', 'a fix is published', 'attackers get in'] });

  add({ id: 'nm1', type: 'content', reveal: true, family: 'numbers', kicker: 'The text · Say the numbers · One student at a time',
    title: 'Read one line aloud. The next student reads the next line.',
    items: [SM('<b>March 2017</b>'), SM('<b>147 million</b> people'), SM('up to <b>$700 million</b>'), SM('<b>99.9%</b> (MFA, Microsoft, 2019)'), SM('since <b>2003</b>')] });

  /* ---------- Grammar 4 · third conditional and should have ---------- */
  add({ id: 'g4a', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 1/2', title: '«Якби»: now or then?',
    teaches: [R4],
    items: [
      SM('Ukrainian «якби сервер оновили» can be about <b>now</b> or about <b>March 2017</b>. English must choose.'),
      GT(['time', 'English'], [
        ['now (imagine)', 'If the server <b>were</b> patched, we <b>would</b> sleep better.'],
        ['the past (too late)', 'If the server <b>had been</b> patched in March, the breach <b>would not have</b> happened.']]),
      FX('If', '+', 'had + V3', ',', 'would have', '+', 'V3')] });
  add({ id: 'g4b', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 2/2', title: 'Looking back at a mistake',
    items: [
      RC('third', 'a past that did not happen: the postmortem of an incident.', 'If Equifax had patched the portal, the attackers would have found the door locked.'),
      RC('should have', '+ V3: criticism or regret about the past.', 'They should have checked every server.'),
      RC('trap', 'no <b>would</b> after <b>if</b>.'),
      OKNO('If they had patched…', 'If they would have patched…')] });

  add({ id: 'g4c', type: 'gap', family: 'form', kicker: 'Door 5 · Rule 4 · 1/2', needs: [R4, 'patch'],
    instruction: 'Put the verb in the correct form. <b>Example:</b> If they <b>had tested</b> (test) the form, they would have found the flaw.',
    prompt: 'If the company ___ (patch) the server in March, the attackers wouldn’t have gotten in.' + K('<br>gotten — AmE · BrE got'), placeholder: 'two words' });
  add({ id: 'g4d', type: 'mcq', family: 'error', kicker: 'Door 5 · Rule 4 · 2/2 · Find the mistake', needs: [R4, 'certificate'],
    prompt: '<b>If somebody would have noticed the expired certificate, the attack wouldn’t have gone unnoticed.</b><br>Tap the wrong part.',
    options: ['If somebody would have noticed', 'the expired certificate,', 'the attack wouldn’t have gone unnoticed.'] });
  add({ id: 'g4e', type: 'mcq', family: 'transform', kicker: 'Door 5 · Same meaning', needs: [R4, 'plain text', 'to hash'],
    prompt: '“The passwords <b>weren’t hashed</b>, so they <b>were exposed</b> in plain text.” <b>Same meaning?</b>' + K('<br>they = the passwords'),
    options: [
      'If they were hashed, they wouldn’t be exposed.',
      'If they would have been hashed, they wouldn’t have been exposed.',
      'If they had been hashed, they wouldn’t have been exposed.'] });
  add({ id: 'g4f', type: 'gap', family: 'form', kicker: 'Door 5 · should have', needs: [R4],
    instruction: '<b>Example:</b> We didn’t back up the data. → We <b>should have backed up</b> the data.',
    prompt: 'They didn’t test the login form properly. → They ___ the login form properly.', placeholder: 'three words' });

  add({ id: 'g4g', type: 'gap', family: 'genre', kicker: 'Door 5 · The postmortem', needs: [R4, 'patch'],
    instruction: 'A postmortem lists lessons with <b>should have</b> + V3. Complete the card.',
    prompt: CARD('Postmortem · Lessons learned', '1. We should have checked every dependency on every server.<br>2. We should have ___ the portal within 48 hours.'), placeholder: 'one word' });

  SAY('say5', 'Якби компанія встановила виправлення в березні, зламу не сталося б.',
    'If the company had installed the patch in March, the breach wouldn’t have happened.',
    'If I had left earlier, I wouldn’t have been late.', 'Якби я вийшов раніше, я б не запізнився.');

  /* ======================= FINDING THE DOORS FIRST ======================= */
  add({ id: 'sG', type: 'end', kicker: 'Finding the doors first', title: 'Before the attacker tries the handle', text: 'Three ways a team finds its own unlocked doors' });

  add({ id: 'v20', type: 'content', reveal: true, kicker: 'Finding the doors first · 1/2', title: 'Imagine the attack',
    items: [
      TM('threat', '/θret/', 'загроза', 'anything that could hurt the system: an attacker, a phishing email, a mistake by an admin.'),
      TM('threat modeling', '/ˈθret ˌmɑːdəlɪŋ/', 'моделювання загроз', 'before building a feature, the team asks “What would happen if someone used this in a way we didn’t expect?” and plans the defense. AmE modeling · BrE modelling')] });
  add({ id: 'v21', type: 'content', reveal: true, kicker: 'Finding the doors first · 2/2', title: 'Invite the attack',
    items: [
      TM('penetration test', '/ˌpenəˈtreɪʃn test/', 'тест на проникнення', 'the company hires security experts to attack its own app, with permission, and report what they find.'),
      TM('bug bounty program', '/ˈbʌɡ ˌbaʊnti ˌproʊɡræm/', 'програма винагород за вразливості', 'the company pays anyone who finds a vulnerability and reports it. The finders are <b>ethical hackers</b>.')] });
  add({ id: 'r2', type: 'content', kicker: 'The text · ¶2 and ¶6', title: 'How teams find the doors',
    items: [RD('When they design a new feature, security teams ask questions such as: What would happen if someone used this form in a way we did not expect? This practice is known as threat modeling, and it is much cheaper than a breach.'),
      RD('Every new dependency, form and API endpoint adds to the attack surface. What matters is how quickly the unlocked doors are found, ideally by the team itself, through code reviews, penetration tests and bug bounty programs, before an attacker tries the handle.')] });

  add({ id: 'od1', type: 'mcq', family: 'odd', kicker: 'Finding the doors first · Odd one out', needs: ['threat modeling', 'penetration test', 'bug bounty program', 'data breach'],
    prompt: 'Which one does <b>not</b> help a team find its unlocked doors <b>before</b> an attacker?',
    options: ['threat modeling', 'a penetration test', 'a data breach', 'a bug bounty program'] });
  add({ id: 'tp2', type: 'gap', family: 'trap', kicker: 'Finding the doors first · hacker or attacker?', needs: ['bug bounty program'],
    instruction: 'Choose and type. <b>Example:</b> Two-factor login improves account (security / safety) → <b>security</b>.',
    prompt: 'GradeBook will pay ethical ___ (hackers / attackers) to test the site before launch.', placeholder: 'one word' });

  add({ id: 'sp4', type: 'content', reveal: true, format: 'speculate', kicker: 'Threat modeling · One student per feature',
    title: 'What would happen if…?',
    items: [
      SM('Like checking your windows before a vacation. The teacher opens <b>one feature</b>:') +
        SS('📷 photo upload (a script instead of a photo?) · 🔗 “Share my grades” link (who else can open it?) · 🔑 “Forgot password?” (100 emails?) · 📄 ' + MONO('/grades/pdf?id=1043')) ,
      SM('<i>What would happen if someone…? Then they could… So we… unless / as long as…</i>') +
        K('Example: What would happen if someone asked for 100 resets? I’d get 100 emails. So resets work only as long as there are fewer than three an hour.')] });
  /* ======================= LISTENING · THE BRIEF ======================= */
  add({ id: 'a0', type: 'end', kicker: 'Listening · The Brief', title: 'The same story, told for listeners', text: 'Equifax, access control, passwords' });
  add({ id: 'a1', type: 'content', reveal: true, kicker: 'Listening · Words from the audio · 1/2', title: 'Three expressions',
    items: [
      TM('to jiggle a doorknob', '/ˈdʒɪɡl ə ˈdɔːrnɑːb/', 'смикати дверну ручку', 'to try the handle to see if a door is unlocked. AmE <b>doorknob</b> · BrE door handle'),
      TM('backstop', '/ˈbækstɑːp/', 'остання лінія захисту', 'the last protection that still works when everything else fails.'),
      TM('blind spot', '/ˈblaɪnd spɑːt/', 'сліпа зона', 'a weak point that you do not see yourself.')] });
  add({ id: 'a1b', type: 'content', reveal: true, kicker: 'Listening · Words from the audio · 2/2', title: 'Spoken English',
    items: [
      SM('AmE <b>first floor</b> = the floor at street level (Ukrainian «перший поверх»). In BrE, it has another name.'),
      SM('Fillers: <b>you know</b>, <b>basically</b>, <b>kind of like</b>. Listen for one more informal phrase.')] });
  add({ id: 'a2', type: 'content', reveal: true, kicker: 'Listening · While you listen', title: 'Three questions',
    items: [SM('<b>1.</b> What are attackers <b>compared to</b>?'), SM('<b>2.</b> What everyday action is threat modeling <b>like</b>?'),
      SM('<b>3.</b> What is the <b>ultimate backstop</b>?'),
      K('The voice says “threat modeling” unclearly: listen for the idea, not the word.')] });
  add({ id: 'a3', type: 'end', kicker: 'Listening · 1st time', title: '🎧 Listen', text: 'Answer the three questions in your head.' });
  add({ id: 'L1', type: 'mcq', family: 'tfng', kicker: 'After listening · True, false or not given? · 1/2', needs: ['backstop'],
    prompt: K('Example: “The audio mentions Equifax.” → <b>True</b>.<br>') + '<b>The speaker says injection is still the number-one threat.</b>',
    options: ['True', 'False', 'Not given'] });
  add({ id: 'L1b', type: 'mcq', family: 'tfng', kicker: 'After listening · True, false or not given? · 2/2', needs: [],
    prompt: '<b>The speaker says how long the attackers stayed in Equifax’s network.</b>',
    options: ['True', 'False', 'Not given'] });
  add({ id: 'L1c', type: 'gap', family: 'tfng', kicker: 'After listening · Details · 1/2', needs: [],
    instruction: 'One word (with a hyphen) from the audio.',
    prompt: 'Threat modeling is way cheaper than dealing with a ___ later.', placeholder: 'one word' });
  add({ id: 'L1d', type: 'gap', family: 'tfng', kicker: 'After listening · Details · 2/2', needs: ['bug bounty program'],
    instruction: 'Two words from the audio.',
    prompt: 'The last question: will your next ___ uncover your blind spots before the bad guys do?', placeholder: 'two words' });
  add({ id: 'L2', type: 'gap', family: 'variety', kicker: 'After listening · AmE or BrE?', needs: [],
    instruction: 'The speaker checks the windows on the <b>first floor</b> (AmE). One word.',
    prompt: 'In British English, the same floor is the ___ floor.', placeholder: 'one word' });
  add({ id: 'aL', type: 'match', family: 'define', kicker: 'After listening · Words from the audio', needs: ['to jiggle a doorknob', 'backstop', 'blind spot'],
    prompt: 'What does each expression (1–3) mean? One option (a–d) is extra.',
    left: ['to jiggle a doorknob', 'backstop', 'blind spot'],
    right: ['a weakness nobody sees', 'a very strong lock', 'to test a door', 'the final safety net'] });
  add({ id: 'a4', type: 'end', kicker: 'Listening · 2nd time', title: '🎧 Listen again', text: 'Now listen for how it sounds: spoken, not written.' });
  add({ id: 'L5', type: 'mcq', family: 'register', kicker: 'After listening · Spoken or written?', needs: [],
    prompt: 'Which sentence sounds <b>spoken</b>, not written?',
    options: ['Passwords deserve special care.', 'Finally, we gotta talk passwords.', 'No web application is perfectly secure.'] });

  /* ======================= KEYWORD DRILL ======================= */
  add({ id: 'kw0', type: 'end', kicker: 'Keyword drill · The text in six sentences', title: 'Build the sentence from the key words',
    text: 'One student per set. Then the class says the target sentence.' });
  const KW = [
    ['fix · critical · flaw · publish · one · server · never · patch', 'A <b>fix</b> for the <b>critical flaw</b> was <b>published</b>, but <b>one server</b> was <b>never patched</b>.'],
    ['attacker · rarely · need · clever · trick · look for · door · nobody · lock', '<b>Attackers rarely need clever tricks</b>; they <b>look for doors nobody</b> has <b>locked</b>.'],
    ['what · happen · if · someone · use · form · way · not · expect', '<b>What would happen if someone used</b> this <b>form</b> in a <b>way</b> we <b>didn’t expect</b>?'],
    ['application · check · who · user · not · whether · invoice · belong', 'The <b>application checked who</b> the <b>user</b> was, but <b>not whether</b> the <b>invoice belonged</b> to them.'],
    ['unless · attacker · have · enormous · computing power · stolen · hash · useless', '<b>Unless</b> an <b>attacker has enormous computing power</b>, <b>stolen hashes</b> are almost <b>useless</b>.'],
    ['if · server · patch · March · breach · prevent', '<b>If</b> the <b>server</b> had been <b>patched</b> in <b>March</b>, the <b>breach</b> would have been <b>prevented</b>.']];
  const kw = (n, a, b) => add({ id: 'kw' + n, type: 'content', reveal: true, family: 'retell-cue', kicker: 'Keyword drill · ' + n + '/3 · One student at a time',
    title: 'Two sets', items: [SM('<b>' + (a + 1) + '.</b> ' + KW[a][0]), SM('→ ' + KW[a][1]), SM('<b>' + (b + 1) + '.</b> ' + KW[b][0]), SM('→ ' + KW[b][1])] });
  kw(1, 0, 1);
  kw(2, 2, 3);
  add({ id: 'kwq', type: 'mcq', poll: true, kicker: 'Keyword drill · Halfway', prompt: 'What was <b>hardest</b> so far?',
    options: ['the passive (was published)', 'the type of condition', 'word order: who the user was', 'articles: a / the'] });
  kw(3, 4, 5);

  /* ======================= THE VERDICT ======================= */
  add({ id: 'fin0', type: 'end', kicker: 'The verdict', title: 'Brief the dean', text: 'What we found, and what to fix first' });

  add({ id: 'fin1', type: 'content', reveal: true, kicker: 'The verdict · The audit board', title: 'Five doors: what we found',
    items: [
      GT(['door', 'found', 'fix'], [
        ['1 search', 'input in the query', 'parameters'],
        ['2 grades', 'no owner check', 'check each request'],
        ['3 passwords', 'fast hash, no salt', 'bcrypt + salt'],
        ['4 login', 'password only', 'MFA for teachers'],
        ['5 library', 'two versions behind', 'patch it']]),
      K('The dean has time for <b>one</b> fix before launch; the rest come in the first month.')] });
  add({ id: 'fin2', type: 'mcq', poll: true, kicker: 'The verdict · Decision board', prompt: 'Which door do we lock <b>first</b>?',
    options: ['2 grades page', '4 teachers’ login', '5 old library', '1 search box'] });
  add({ id: 'fin3', type: 'content', reveal: true, format: 'justify-ranking', kicker: 'The verdict · Defend the vote · One student at a time',
    title: 'Most of you chose one door. Say why.',
    items: [
      SM('<i>We’d lock door … first, mainly because…</i>'),
      SM('Reasons: <b>9,000 students’ data</b> · <b>easy to exploit</b> · <b>a real incident shows it</b> · <b>cheap to fix</b>'),
      SM('<b>Next student:</b> argue for a different door: <i>I see the point, but if we left door … open, …</i>')] });

  add({ id: 'rg1', type: 'mcq', family: 'register', kicker: 'The verdict · Who is listening?', needs: [C_INJ, 'parameters'],
    prompt: 'The dean has <b>no technical background</b>. Which sentence fits her?',
    options: [
      'Right now, someone could type a command into the search box and read every student’s grades.',
      'The search code concatenates unsanitized input into SQL.',
      'We must sanitize inputs and use prepared statements.'] });

  add({ id: 'fin4', type: 'content', reveal: true, format: 'brief', kicker: 'Final task · Four moves · One student per move',
    title: 'Brief the dean',
    items: [
      PH('briefing.jpg', 'A young developer presenting a shield-and-lock sketch on a whiteboard to a manager', '50% 40%', 56) +
        SS('<b>1. Protect:</b> <i>The most valuable thing in GradeBook is…</i>'),
      SS('<b>2. Threats:</b> <i>If an attacker got into a teacher’s account, they could…</i>'),
      SS('<b>3. Protections:</b> <i>A grade can’t be changed unless… · It stays safe as long as…</i>'),
      SS('<b>4. Lesson + action:</b> <i>If Equifax had patched…, … I’d strongly recommend… Otherwise, …</i>')] });
  add({ id: 'fin5', type: 'content', reveal: true, format: 'brief', round2: true, kicker: 'Final task · Round 2 · One student per move',
    title: 'Same four moves: an online pharmacy',
    items: [
      SS('<b>1. Protect:</b> prescriptions · card payments'),
      SS('<b>2. Threat:</b> the pharmacist reuses her password → fake prescriptions'),
      SS('<b>3. Protections:</b> card data goes to the payment provider (the company that handles card payments) · MFA for staff'),
      SS('<b>4. Lesson + action:</b> an old <b>plugin</b> (a small add-on) is two versions behind → patch it this week')] });
  add({ id: 'end', type: 'end', kicker: 'Unit 4 · Web Application Security',
    title: 'Find the unlocked doors first.', text: 'Before an attacker tries the handle.' });

  window.LESSON = {
    id: ID,
    title: 'Unit 4 · Web Application Security',
    audience: 'КН · 2nd year · B1+/B2 · Computer Science (web technologies) · group, students on phones',
    concept: 'Аудит перед запуском: п’ять дверей. Наскрізний кейс — вигаданий портал оцінок GradeBook за два тижні до запуску; група — аудитори. Двері: пошукове поле (ін’єкції) → /grades/1044 (вади керування доступом, глибокий розбір зі схемою запиту) → таблиця паролів (геш ≠ шифрування, сіль) → вхід викладачів (фішинг, MFA) → стара бібліотека (Equifax, текст роздатки як докази) → як знаходити двері першими → вердикт і брифінг для декана. Фірмові ходи: ставка на «двері № 1» з розбором за OWASP 2025, аукціон помилок, дошка рішень.',
    known: ['code', 'test', 'server', 'database', 'website', 'user', 'bug', 'update', 'app', 'data', 'team', 'password', 'account',
      'email', 'link', 'log in', 'library', 'traffic', 'pull request', 'production', 'browser', 'request', 'form', 'script', 'URL', 'framework', 'parameters'],
    wordlistExtra: [
      { after: 'c1', term: 'grade', ipa: '/ɡreɪd/', uk: 'оцінка', note: 'AmE; BrE also mark' },
      { after: 'c1', term: 'dean', ipa: '/diːn/', uk: 'декан' },
      { after: 'c1', term: 'audit', ipa: '/ˈɔːdɪt/', uk: 'аудит, перевірка' },
      { after: 'v2', term: 'an exploit (noun)', ipa: '/ˈeksplɔɪt/', uk: 'експлойт (код атаки)', note: 'stress shift: the verb is /ɪkˈsplɔɪt/' },
      { after: 'dd1', term: '403 Forbidden', ipa: '/ˌfɔːr oʊ ˈθriː fərˈbɪdn/', uk: 'код HTTP «заборонено»' },
      { after: 'bet2', term: 'OWASP', ipa: '/ˈoʊwɑːsp/', uk: 'OWASP', note: 'Open Worldwide Application Security Project; read as one word' },
      { after: 'r4b', term: 'invoice', ipa: '/ˈɪnvɔɪs/', uk: 'рахунок-фактура' },
      { after: 'cr2', term: 'good catch', ipa: '/ˌɡʊd ˈkætʃ/', uk: 'добре, що помітив(-ла)', note: 'informal' },
      { after: 'cr2', term: 'to push (changes)', ipa: '/pʊʃ/', uk: 'надіслати зміни в репозиторій' },
      { after: 'cr2', term: 'ownership check', ipa: '/ˈoʊnərʃɪp tʃek/', uk: 'перевірка власника' },
      { after: 'dl1', term: 'surely', ipa: '/ˈʃʊrli/', uk: 'хіба ж, напевно ж', note: 'expects agreement' },
      { after: 'dl2', term: 'authenticator app', ipa: '/ɔːˈθentɪkeɪtər æp/', uk: 'застосунок-автентифікатор' },
      { after: 'dl2', term: 'trusted device', ipa: '/ˌtrʌstɪd dɪˈvaɪs/', uk: 'довірений пристрій' },
      { after: 'v19', term: 'leak', ipa: '/liːk/', uk: 'витік (через помилку)', note: 'vs breach: a leak needs no attacker' },
      { after: 'r1b', term: 'intrusion', ipa: '/ɪnˈtruːʒn/', uk: 'вторгнення' },
      { after: 'r1c', term: 'settlement', ipa: '/ˈsetlmənt/', uk: 'мирова угода' },
      { after: 'v21', term: 'ethical hacker', ipa: '/ˌeθɪkl ˈhækər/', uk: 'етичний хакер', note: 'fixed phrase; in reports a criminal is an attacker' },
      { after: 'a1b', term: 'first floor (AmE) · ground floor (BrE)', ipa: '/ˌfɜːrst ˈflɔːr/ · /ˌɡraʊnd ˈflɔːr/', uk: 'перший поверх', note: 'BrE first floor = AmE second floor' },
      { after: 'a1b', term: 'we gotta', ipa: '/wi ˈɡɑːtə/', uk: 'мусимо', note: 'informal spoken = we have got to' },
      { after: 'fin5', term: 'plugin', ipa: '/ˈplʌɡɪn/', uk: 'плагін' }
    ],
    slides: S
  };
})();

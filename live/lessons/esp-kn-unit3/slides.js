/* =========================================================================
   Unit 3 · Continuous Delivery: Shipping Code Without Fear
   ESP · Комп'ютерні науки, 2 курс · B1+/B2 · group
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Задум: «Розслідування збою». Наскрізний кейс — Knight Capital, 1 серпня 2012.
   Кроки розслідування: що змінилося того ранку → як має рухатися зміна (конвеєр) →
   репетиція (staging) → канарковий випуск (глибокий розбір) → прапорці, конфігурація,
   дані → прослуховування «The Brief» → ранок після збою (стендап, статус-сторінка) →
   вердикт і план безпечного релізу. Тексти читання — «докази» в кроках.
   Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const ID = 'esp-kn-unit3';
  const K = (s) => '<span class="muted">' + s + '</span>';
  const RD = (h) => '<span style="display:block;font-size:17px;line-height:1.42">' + h + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  // рядок механізму: що термін РОБИТЬ (окремий пункт під term)
  const MECH = (h) => '<span style="display:block;font-size:17px;line-height:1.4;border-left:3px solid var(--line);padding-left:9px">' + h + '</span>';
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  const HAVE = ['trading.jpg', 'canary.jpg', 'lockout.jpg', 'standup.jpg', 'checkout.jpg'];
  const PH = (f, alt, pos, h) => HAVE.includes(f) ? '<img src="lessons/' + ID + '/' + f + '" alt="' + alt + '" style="display:block;width:100%;height:' + (h || 130) + 'px;object-fit:cover;object-position:' + (pos || '50% 50%') + ';border-radius:16px;margin-bottom:12px">' : '';
  // картка-документ: повідомлення, звіт, алерт, коміт
  const CARD = (head, body) => '<span style="display:block;border:1px solid var(--line);background:var(--surface-2);border-radius:12px;padding:8px 11px;font-size:17px;line-height:1.45">' +
    '<span style="display:block;font-size:13px;color:var(--ink-2);margin-bottom:3px">' + head + '</span>' + body + '</span>';
  const MONO = (s) => '<span style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:15px">' + s + '</span>';
  // граматичні блоки
  const FX = (...p) => '<span class="fx" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:17px">' +
    p.map((x) => x === '+' || x === '→' ? '<span style="color:var(--ink-2)">' + x + '</span>' : '<span style="background:var(--accent-soft);border:1px solid var(--line);border-radius:10px;padding:3px 9px"><b>' + x + '</b></span>').join('') + '</span>';
  const RC = (badge, rule, ex) => '<span class="rc" style="display:block;border-left:4px solid var(--accent);padding:2px 0 2px 10px;font-size:17px;line-height:1.4">' +
    '<span style="display:inline-block;background:var(--accent);color:var(--surface);border-radius:8px;padding:0 8px;font-size:13px;font-weight:700;margin-right:6px">' + badge + '</span>' + rule + (ex ? '<br><i>' + ex + '</i>' : '') + '</span>';
  const OKNO = (ok, no) => '<span style="display:block;font-size:17px;line-height:1.5">✅ ' + ok + '<br>❌ <s>' + no + '</s></span>';

  const S = [];
  const add = (o) => S.push(o);
  // «Say it in English»: українське технічне речення → еталон → 💬 розмовне → еталон
  let sayN = 0;
  const SAY = (id, uk, en, evEn, evUk) => add({ id, type: 'content', reveal: true, family: 'translate',
    kicker: 'Say it in English', title: uk, items: ['<b>' + en + '</b>', ...EV(evEn, evUk)] });

  /* ======================= THE CASE ======================= */
  add({ id: 'title', type: 'title', kicker: 'Unit 3 · English for Computer Science',
    title: 'Continuous Delivery', subtitle: 'An investigation: 45 minutes, $460 million' });

  add({ id: 'c1', type: 'content', reveal: true, kicker: 'The case · New York, August 1, 2012 · 1/2',
    title: 'What happened at 9:30 a.m.?',
    items: [
      PH('trading.jpg', 'A busy trading floor with rows of screens', '50% 40%', 56) +
        SM('<b>9:30 a.m.</b> The stock market opens. <b>Knight Capital</b>, a big trading firm, switches on new software.'),
      SM('In the next <b>45 minutes</b>, its computers send more than <b>4 million orders</b> to the market.'),
      K('trading firm — торговельна компанія · order — заявка (купити чи продати)')] });
  add({ id: 'c1b', type: 'content', reveal: true, kicker: 'The case · New York, August 1, 2012 · 2/2',
    title: 'By 10:15 a.m.',
    items: [SM('The new code had been copied to its servers in the days before.'),
      SM('Nobody asked for these orders.'),
      SM('By about <b>10:15</b>, Knight has lost <b>$460 million</b>.'),
      SM('The firm almost goes bankrupt in one morning.')] });

  add({ id: 'c2', type: 'mcq', poll: true, kicker: 'The case · Place your bet',
    prompt: 'Your first guess. <b>What caused it?</b>' + K('<br>No wrong answers yet: we will check the evidence.'),
    options: ['a hacker attack', 'a forgotten piece of old code', 'a broken network cable', 'a tired trader who pressed the wrong key'] });

  add({ id: 'c3', type: 'mcq', family: 'numbers', kicker: 'The case · Say the numbers · 1/2', needs: [],
    prompt: 'Engineers report numbers aloud all the time.<br><b>How do you say “$460 million”?</b>',
    options: ['four hundred sixty million dollars', 'four hundred sixty millions dollars', 'four hundred sixty million dollar'] });

  add({ id: 'c4', type: 'content', reveal: true, kicker: 'The case · Say the numbers · 2/2 · One student at a time',
    title: 'Read one line aloud. The next student reads the next line.',
    items: [SM('<b>4,000,000</b> orders'), SM('<b>45</b> minutes'), SM('<b>7</b> of <b>8</b> servers'),
      SM('<b>97</b> warning emails'), SM('<b>August 1, 2012</b>'), SM('<b>154</b> stocks')] });

  /* ======================= STEP 1 · WHAT CHANGED THAT MORNING ======================= */
  add({ id: 's1', type: 'end', kicker: 'The investigation · Step 1', title: 'What changed that morning?',
    text: 'Three words first, then the evidence' });

  add({ id: 'v1', type: 'content', reveal: true, kicker: 'Step 1 · Words for the case · 1/3',
    title: 'Putting new code to work',
    items: [
      term('to deploy', '/dɪˈplɔɪ/', 'розгортати'),
      MECH('to copy a new version of the code to the servers and start it there.'),
      term('production', '/prəˈdʌkʃn/', 'робоче середовище, продакшн'),
      MECH('the servers that real users work with. “In production” means live, working for real people.')] });

  add({ id: 'v2', type: 'content', reveal: true, kicker: 'Step 1 · Words for the case · 2/3', title: 'What is a feature flag?',
    teaches: ['concept: feature flag'],
    items: [
      term('feature flag', '/ˈfiːtʃər flæɡ/', 'прапорець функції'),
      MECH('a switch inside the code. The new code is already on the servers, but it runs only when the flag is ON.'),
      SM('Why “flag”? In programming, a <b>flag</b> is a yes/no value that tells the program what to do.'),
      K('Think of a light switch: the lamp is already installed; the switch decides if it shines.')] });
  add({ id: 'v2b', type: 'content', reveal: true, kicker: 'Step 1 · Words for the case · 3/3', title: 'One code, two behaviors',
    items: [
      '<svg viewBox="0 0 320 150" width="100%" style="max-width:340px;display:block" role="img" aria-label="Feature flag: ON runs the new feature, OFF runs the old one">' +
        '<rect x="8" y="8" width="304" height="134" rx="12" fill="var(--surface-2)" stroke="var(--line)"/>' +
        '<text x="22" y="36" font-size="15" fill="var(--ink)" font-family="ui-monospace,Menlo,monospace">if (newSearch == ON)</text>' +
        '<text x="40" y="62" font-size="15" fill="var(--ok)" font-family="ui-monospace,Menlo,monospace">run the NEW search</text>' +
        '<text x="22" y="90" font-size="15" fill="var(--ink)" font-family="ui-monospace,Menlo,monospace">else</text>' +
        '<text x="40" y="116" font-size="15" fill="var(--ink-2)" font-family="ui-monospace,Menlo,monospace">run the OLD search</text>' +
        '<text x="22" y="136" font-size="13" fill="var(--ink-2)">the flag value lives in a setting, not in the code</text></svg>',
      SM('The code holds <b>both</b> versions. The flag picks one.'),
      SM('To change the flag, nobody deploys new code: they change a setting.')] });

  add({ id: 'v3', type: 'mcq', family: 'scenario', kicker: 'Step 1 · Check the idea',
    needs: ['concept: feature flag', 'feature flag'],
    prompt: 'The new search page is already on the servers, behind a feature flag. The flag is <b>OFF</b>.<br><b>What do users see?</b>',
    options: ['the new search page', 'an error page', 'the old search page'] });

  add({ id: 'r1', type: 'content', kicker: 'Evidence 1 · Deploying Without Fear · ¶1 · 1/2', title: 'The morning',
    items: [RD('On the morning of August 1, 2012, the trading firm Knight Capital switched on new software on its servers. Within about forty-five minutes, the firm had lost roughly 460 million dollars, and less than a year later it merged with a rival. The cause was not a clever attack.'),
      K('merged with a rival — об’єдналася з конкурентом')] });
  add({ id: 'r1b', type: 'content', kicker: 'Evidence 1 · Deploying Without Fear · ¶1 · 2/2', title: 'The cause',
    items: [RD('According to the US Securities and Exchange Commission, the new code had been copied to seven of the firm’s eight servers; the eighth was missed. On that server, a flag that was meant to switch on a new feature switched on old, forgotten code instead, and it began sending millions of orders into the market.'),
      K('the US Securities and Exchange Commission (SEC) — Комісія з цінних паперів і бірж США')] });

  add({ id: 'c5', type: 'content', reveal: true, kicker: 'The case · Your bet vs the evidence', title: 'So who was right?',
    items: [SM('Look at the poll: what did most of you choose?'),
      SM('The evidence: <b>a forgotten piece of old code</b>, on one server out of eight.'),
      SM('Not a hacker. Not a cable. <b>A deployment</b>, the moment new code replaces old code.')] });

  add({ id: 'q1', type: 'mcq', family: 'tfng', kicker: 'Evidence 1 · True, false or not given?',
    needs: [],
    prompt: K('<b>Example:</b> “Knight Capital was a trading firm.” → <b>True</b> (the text says so).<br>') +
      '<b>The new code reached all eight servers.</b>',
    options: ['True', 'False', 'Not given'] });

  add({ id: 'seq1', type: 'match', family: 'sequence', kicker: 'Evidence 1 · Put the events in order',
    needs: [],
    prompt: 'What happened first, second…? One event (a–e) did not happen.',
    left: ['1st', '2nd', '3rd', '4th'],
    right: ['the market opens', 'a hacker breaks in', '$460 million lost', '7 servers get code', 'server 8 floods orders'] });

  /* ======================= GRAMMAR · THE INCIDENT REPORT ======================= */
  add({ id: 'g0', type: 'end', kicker: 'Writing it down', title: 'The incident report',
    text: 'Reports say what was done, not who did it' });

  add({ id: 'g0v', type: 'content', reveal: true, kicker: 'Writing it down · One word first', title: 'What do we call it?',
    items: [term('incident', '/ˈɪnsɪdənt/', 'інцидент'),
      MECH('any unplanned problem that hurts a service, big or small. After an incident, the team writes an incident report.'),
      K('incident report — звіт про інцидент')] });

  add({ id: 'gp1', type: 'content', reveal: true, kicker: 'Grammar · The passive · 1/2', title: 'What was done?',
    teaches: ['rule: passive'],
    items: [FX('be', '+', 'V3 (past participle)'),
      RC('who? not important', 'The action matters, not the person.', 'The new code <b>was copied</b> to seven servers.'),
      RC('tense = be', '<b>is</b> merged · <b>was</b> merged · <b>has been</b> merged'),
      SM('The eighth server <b>was missed</b>. Millions of orders <b>were sent</b>.')] });
  add({ id: 'gp2', type: 'content', reveal: true, kicker: 'Grammar · The passive · 2/2', title: 'Rules and options',
    items: [RC('can / must', 'modal + <b>be</b> + V3', 'The release <b>can be rolled back</b>. Every change <b>must be reviewed</b>.'),
      RC('by', 'Name the doer only when it matters.', 'The page <b>was published by</b> Tim Berners-Lee.'),
      OKNO('The code <b>is</b> reviewed.', 'The code reviewed.'),
      K('Without <b>be</b>, the sentence becomes active, and the meaning changes.')] });

  const REP = (line) => CARD('INCIDENT REPORT · Knight Capital · August 1, 2012', line);
  add({ id: 'pr1', type: 'gap', family: 'genre', kicker: 'Incident report · 1/4',
    needs: ['rule: passive'],
    instruction: 'Complete the report with the passive. <b>Example:</b> The release ___ (approve) on Monday. → <b>was approved</b>',
    prompt: REP('Before the market opened, the new code ___ (copy) to only seven of the eight servers.') });
  add({ id: 'gp3', type: 'content', reveal: true, kicker: 'Grammar · The passive · everyday English', title: 'Now say it: everyday English',
    items: [...EV('My bike was stolen last night.', 'Мій велосипед учора ввечері вкрали.'),
      ...EV('The exam has been moved to Friday.', 'Іспит перенесли на п’ятницю.')] });
  add({ id: 'pr2', type: 'gap', family: 'genre', kicker: 'Incident report · 2/4',
    needs: ['rule: passive'],
    instruction: 'Complete the report with the passive.',
    prompt: REP('Before 9:30 a.m., 97 warning emails ___ (send) to the team, but nobody acted on them.') });
  add({ id: 'pr3', type: 'gap', family: 'genre', kicker: 'Incident report · 3/4',
    needs: ['rule: passive'],
    instruction: 'Complete the report with the passive.',
    prompt: REP('In about 45 minutes, roughly 460 million dollars ___ (lose).') });
  add({ id: 'pr4', type: 'mcq', family: 'error', kicker: 'Incident report · 4/4 · Find the mistake',
    needs: ['rule: passive'],
    prompt: K('<b>Example:</b> The app <s>updated</s> every week. → The app <b>is updated</b> every week.<br>') +
      '<b>The old code switched on by a flag on server 8.</b><br><span class="muted">Tap the wrong part.</span>',
    options: ['The old code', 'switched on', 'by a flag', 'on server 8'] });

  add({ id: 'kw1', type: 'content', reveal: true, format: 'retell', kicker: 'Retell the case · One student at a time · 1/2',
    title: 'Build one sentence from the key words. Use the passive.',
    items: [SM('<b>1.</b> new code · copy · seven · eight servers · eighth · miss'),
      SM('→ <i>The new code <b>was copied</b> to seven of the eight servers; the eighth <b>was missed</b>.</i>'),
      SM('<b>2.</b> flag · meant · switch on · new feature · old code · switch on'),
      SM('→ <i>A flag that <b>was meant</b> to switch on a new feature switched on old code instead.</i>')] });
  add({ id: 'kw2', type: 'content', reveal: true, kicker: 'Retell the case · One student at a time · 2/2',
    title: 'One more, then the whole story.',
    items: [SM('<b>3.</b> 97 emails · send · before 9:30 · nobody · act on'),
      SM('→ <i>97 warning emails <b>were sent</b> before 9:30, but nobody acted on them.</i>'),
      SM('<b>Now one student:</b> all three sentences, without looking at the arrows.')] });

  /* ======================= STEP 2 · HOW SHOULD A CHANGE TRAVEL ======================= */
  add({ id: 's2', type: 'end', kicker: 'The investigation · Step 2', title: 'How should a change travel?',
    text: 'The road from a laptop to a million users' });

  add({ id: 'v3g', type: 'content', reveal: true, kicker: 'Step 2 · How code changes travel in Git · 1/2', title: 'Branches and commits',
    items: [
      '<svg viewBox="0 0 320 120" width="100%" style="max-width:300px;display:block;margin:0 auto" role="img" aria-label="Git: a branch splits from main, gets commits, and is merged back">' +
        '<path d="M12 30 H308" stroke="var(--ink-2)" stroke-width="3"/><text x="12" y="20" font-size="13" fill="var(--ink-2)">main branch</text>' +
        '<path d="M70 30 C90 30 90 85 120 85 H220 C250 85 250 30 270 30" stroke="var(--accent)" stroke-width="3" fill="none"/>' +
        '<circle cx="140" cy="85" r="7" fill="var(--accent)"/><circle cx="175" cy="85" r="7" fill="var(--accent)"/><circle cx="210" cy="85" r="7" fill="var(--accent)"/>' +
        '<text x="120" y="112" font-size="13" fill="var(--ink)">your branch: 3 saved changes</text><text x="270" y="18" font-size="13" text-anchor="middle" fill="var(--ink)">merge</text></svg>',
      term('branch', '/bræntʃ/', 'гілка'),
      MECH('your own copy of the code, where you work without touching the shared code.')] });
  add({ id: 'v3h', type: 'content', reveal: true, kicker: 'Step 2 · How code changes travel in Git · 2/2', title: 'Saving your work',
    items: [term('commit', '/kəˈmɪt/', 'коміт'),
      MECH('one saved change in Git, with a short message that says what the change does.'),
      K('Git — the most popular tool that keeps every version of the code')] });
  add({ id: 'v3q', type: 'gap', family: 'define', kicker: 'Step 2 · Quick check',
    needs: ['branch'], instruction: 'Which Git word?',
    prompt: 'You want to try a risky new idea without breaking the shared code. First, you create a new ___ .' });
  add({ id: 'v4', type: 'content', reveal: true, kicker: 'Step 2 · The pipeline words · 1/4', title: 'Asking the team',
    items: [term('pull request', '/ˈpʊl rɪˌkwest/', 'запит на злиття'),
      MECH('you ask the team to read your change and add it to the shared code. You ask them to “pull” your branch in.'),
      term('to merge', '/mɝːdʒ/', 'зливати (зміни, гілки)'),
      MECH('to add the changes from one branch of the code into another branch.')] });
  add({ id: 'v5', type: 'content', reveal: true, kicker: 'Step 2 · The pipeline words · 2/4', title: 'The shared code and the package',
    items: [term('main branch', '/ˌmeɪn ˈbræntʃ/', 'головна гілка'),
      MECH('the shared version of the code; every new change is merged into it.'),
      term('build', '/bɪld/', 'збірка'),
      MECH('the code turned into something that can run: an app file, a package or a container image (the packaged app with everything it needs).')] });
  add({ id: 'v5q', type: 'gap', family: 'define', kicker: 'Step 2 · Quick check',
    needs: ['pull request', 'main branch'],
    instruction: 'Which term from the last two slides?',
    prompt: 'You ask your team to look at your change before it joins the main branch. You open a ___ .' });
  add({ id: 'v6', type: 'content', reveal: true, kicker: 'Step 2 · The pipeline words · 3/4', title: 'Machines that check',
    items: [term('test suite', '/ˈtest swiːt/', 'набір тестів'),
      MECH('all the automatic tests of a project. A computer runs them on every change.'),
      term('continuous integration (CI)', '/kənˈtɪnjuəs ˌɪntɪˈɡreɪʃn/', 'безперервна інтеграція'),
      MECH('developers merge small changes into the main branch many times a day; a server builds and tests every change automatically.')] });
  add({ id: 'v7', type: 'content', reveal: true, kicker: 'Step 2 · The pipeline words · 4/4', title: 'Always ready',
    items: [term('pipeline', '/ˈpaɪplaɪn/', 'конвеєр (CI/CD)'),
      MECH('the fixed chain of steps that every change goes through, from pull request to production.'),
      term('continuous delivery (CD)', '/kənˈtɪnjuəs dɪˈlɪvəri/', 'безперервна доставка'),
      MECH('every change that passes all the checks is ready to go to users at any moment.')] });

  add({ id: 'v7q', type: 'gap', family: 'define', kicker: 'Step 2 · Quick check',
    needs: ['continuous integration (CI)'],
    instruction: 'Which term? Type the full name.',
    prompt: 'Developers merge small changes often, and a server builds and tests each one automatically → continuous ___' });

  add({ id: 'pp1', type: 'content', reveal: true, kicker: 'Step 2 · The big picture', title: 'One change, five gates',
    teaches: ['concept: pipeline'],
    items: [
      '<svg viewBox="0 0 320 270" width="100%" style="max-width:300px;display:block;margin:0 auto" role="img" aria-label="Pipeline: pull request, main branch, CI server, staging, canary, production">' +
        [['Pull request', 'a teammate reviews it'], ['Main branch', 'the change is merged'], ['CI server', 'build + test suite'],
         ['Staging', 'realistic data (Step 3)'], ['Canary', '1% of users (Step 4)'], ['Production', 'everyone']].map((b, i) => {
          const y = 4 + i * 44;
          return '<rect x="10" y="' + y + '" width="300" height="34" rx="10" fill="' + (i === 5 ? 'var(--accent-soft)' : 'var(--surface-2)') + '" stroke="var(--line)"/>' +
            '<text x="22" y="' + (y + 22) + '" font-size="15" font-weight="700" fill="var(--ink)">' + b[0] + '</text>' +
            '<text x="150" y="' + (y + 22) + '" font-size="13" fill="var(--ink-2)">' + b[1] + '</text>' +
            (i < 5 ? '<path d="M160 ' + (y + 34) + ' v6" stroke="var(--ink-2)" stroke-width="2"/><polygon points="155,' + (y + 39) + ' 165,' + (y + 39) + ' 160,' + (y + 44) + '" fill="var(--ink-2)"/>' : '');
        }).join('') + '</svg>',
      SM('Each box before Production is a <b>gate</b>: if a check fails, the change stops.'),
      SM('The pipeline deploys <b>automatically</b>, and the same build is <b>never rebuilt</b>.')] });

  add({ id: 'seqP', type: 'match', family: 'sequence', kicker: 'Step 2 · Order the gates',
    needs: ['concept: pipeline'],
    prompt: 'What happens to a change first, second…? One step (a–e) is <b>not</b> part of a safe pipeline.',
    left: ['1st', '2nd', '3rd', '4th'],
    right: ['CI builds and tests', 'it reaches production', 'it is rebuilt again', 'a teammate reviews it', 'it is merged'] });

  add({ id: 'colP', type: 'match', family: 'colloc', kicker: 'Step 2 · Verbs engineers use',
    needs: ['pull request', 'test suite', 'build', 'main branch'],
    prompt: 'Which verb goes in each gap? Two verbs (a–f) are extra.',
    left: ['___ a pull request', '___ the test suite', '___ the build to production', '___ your branch into main'],
    right: ['make', 'merge', 'open', 'speak', 'deploy', 'run'] });

  add({ id: 'gt1', type: 'content', reveal: true, kicker: 'Grammar · Order of steps · 1/2', title: 'Time words: present, not will',
    teaches: ['rule: time clauses'],
    items: [FX('once · as soon as · when · until', '+', 'present', '→', 'will …'),
      RC('future idea, present form', '', 'Once the tests <b>pass</b>, the code <b>will be merged</b>.'),
      OKNO('as soon as the tests <b>pass</b>', 'as soon as the tests will pass'),
      RC('no “not” after until', '«доки не пройде» → until it <b>passes</b>')] });
  add({ id: 'gt2', type: 'content', reveal: true, kicker: 'Grammar · Order of steps · 2/2', title: 'before / after + -ing',
    items: [FX('before · after', '+', 'V-ing'),
      RC('same subject', 'Use -ing when both parts have the same subject.', '<b>Before deploying</b> the build, the pipeline runs the test suite.'),
      ...EV('Before leaving the office, I always switch off my laptop.', 'Перш ніж піти з офісу, я завжди вимикаю ноутбук.')] });

  add({ id: 't1', type: 'gap', family: 'form', kicker: 'Order of steps · 1/3',
    needs: ['rule: time clauses'],
    instruction: '<b>Example:</b> When the build ___ (finish), I’ll send you the link. → <b>finishes</b>',
    prompt: 'Once the test suite ___ (pass), the code will be merged into the main branch.' });
  add({ id: 't2', type: 'gap', family: 'transform', kicker: 'Order of steps · 2/3',
    needs: ['rule: time clauses', 'pull request', 'branch'],
    instruction: 'Join: <i>The developer merges the pull request. Then she deletes her branch.</i> Use <b>after</b> + -ing.',
    prompt: 'After ___ the pull request, the developer deletes her branch.' });

  add({ id: 'sc2', type: 'mcq', family: 'scenario', kicker: 'Back to Knight · Which gate?',
    needs: ['concept: pipeline'],
    prompt: 'At Knight, a person copied the new code to the servers by hand, and one server was missed.<br><b>Which practice would prevent that?</b>',
    options: ['a careful code review of the pull request', 'a faster CI server with more tests', 'one automatic deployment of the build to every server'] });

  add({ id: 'r2', type: 'content', kicker: 'Evidence 2 · Deploying Without Fear · ¶2', title: 'Every deployment is a risk',
    items: [RD('Most web teams will never lose money that fast, but every one of them faces the same risk each time it deploys. Modern web applications change constantly, and some companies deploy dozens of times a day. Every deployment is a moment when working code is replaced by new code that has never met real users. The discipline known as continuous delivery exists so that this moment becomes boring.'),
      K('dozens — десятки · discipline — тут: підхід')] });
  add({ id: 'q2', type: 'mcq', family: 'tfng', kicker: 'Evidence 2 · True, false or not given?',
    needs: [],
    prompt: '<b>Knight Capital deployed code dozens of times a day.</b>',
    options: ['True', 'False', 'Not given'] });

  SAY('say1', 'Щойно тести пройдуть, код зіллють у головну гілку.', 'Once the tests pass, the code will be merged into the main branch.',
    'As soon as I get paid, I’ll buy new headphones.', 'Щойно отримаю зарплату, куплю нові навушники.');

  /* ======================= STEP 3 · A REHEARSAL BEFORE THE SHOW ======================= */
  add({ id: 's3', type: 'end', kicker: 'The investigation · Step 3', title: 'A rehearsal before the show',
    text: 'Test it where it is safe to fail' });

  add({ id: 'v8', type: 'content', reveal: true, kicker: 'Step 3 · Words · 1/3', title: 'The rehearsal stage',
    items: [term('staging environment', '/ˈsteɪdʒɪŋ ɪnˌvaɪrənmənt/', 'проміжне (передпродакшн) середовище'),
      MECH('a copy of production with realistic data. The build is checked there before real users see it.'),
      K('Like a dress rehearsal in a theater: same stage, same costumes, no audience yet.')] });
  add({ id: 'v8b', type: 'content', reveal: true, kicker: 'Step 3 · Words · 2/3', title: 'Same code, different settings',
    items: [term('configuration', '/kənˌfɪɡjəˈreɪʃn/', 'конфігурація, налаштування'),
      MECH('settings kept outside the code: server addresses, limits, timeouts.'),
      SM('Same code + different configuration = different behavior.')] });

  add({ id: 'st1', type: 'mcq', family: 'stress', kicker: 'Step 3 · Say it right',
    needs: ['configuration'],
    prompt: K('<b>Example:</b> production → pro<b>DUC</b>tion<br>') + '<b>Where is the main stress in “configuration”?</b>',
    options: ['<b>CON</b>figuration', 'con<b>FIG</b>uration', 'configu<b>RA</b>tion'] });

  add({ id: 'v9', type: 'content', reveal: true, kicker: 'Step 3 · Words · 3/3', title: 'Why the build is never rebuilt',
    teaches: ['concept: same build'],
    items: [term('artifact', '/ˈɑːrtɪfækt/', 'артефакт (готовий файл збірки)'),
      MECH('the file that a build produces: an app package or a container image.'),
      SM('The artifact tested in staging must be <b>exactly</b> the artifact that goes live.')] });
  add({ id: 'v9b', type: 'content', reveal: true, kicker: 'Step 3 · The sealed box', title: 'Build once, deploy many times',
    items: [SM('Think of a product sealed in a tamper-proof box at the factory: nobody opens it again before it reaches the customer.'),
      SM('If you rebuild, you get a <b>new</b> artifact that nobody has tested, maybe with a different library version inside.')] });

  add({ id: 'r3', type: 'content', kicker: 'Evidence 3 · Deploying Without Fear · ¶3', title: 'A strict sequence',
    items: [RD('A typical pipeline follows a strict sequence. First, each change is reviewed by at least one other developer. Once the pull request is approved, the code is merged into the main branch, and the continuous integration server builds it and runs the automated tests. Before anything reaches production, the build is deployed to a staging environment, where it is checked against realistic data. The build is never rebuilt between stages, so that the artifact tested in staging is exactly the artifact that goes live.')] });

  add({ id: 'q3', type: 'gap', family: 'cause', kicker: 'Evidence 3 · Why?',
    needs: ['concept: same build', 'artifact'],
    instruction: 'Complete with one word from ¶3.',
    prompt: 'Why no rebuild? So that the tested ___ and the live one are the same file.' });

  add({ id: 'sc3', type: 'mcq', family: 'scenario', kicker: 'Step 3 · Check the idea',
    needs: ['concept: same build', 'staging environment'],
    prompt: 'The build passed all checks in the staging environment. Before production, a developer rebuilds the code “just to be safe”.<br><b>What is the risk?</b>',
    options: ['Production gets an artifact that nobody has tested.', 'Staging stops working until the next build is ready.', 'No risk: the source code is exactly the same.'] });
  add({ id: 'bk3', type: 'mcq', family: 'scenario', kicker: 'Back to Knight · Would staging help?',
    needs: ['staging environment'],
    prompt: '<b>Would a staging environment have caught Knight’s missed server?</b>',
    options: ['Yes: staging checks every server before the market opens.', 'No: staging tests the build, not the copying to production servers.', 'Only if the staging environment also had exactly eight servers.'] });

  add({ id: 'cm1', type: 'content', reveal: true, kicker: 'Genre · The commit message', title: 'How engineers label a change',
    teaches: ['genre: commit message'],
    items: [CARD('git log (the list of commits) · main branch', MONO('Fix timeout in checkout API<br>Add health check to search service<br>Remove old payment flag')),
      RC('imperative', 'an order to the code: <b>Fix</b>, <b>Add</b>, <b>Remove</b>'),
      OKNO('<b>Fix</b> timeout in checkout API', 'Fixed timeout in checkout API.'),
      RC('short', 'About 50 characters, no period at the end.')] });
  add({ id: 'cm2', type: 'gap', family: 'genre', kicker: 'Genre · The commit message · 1/2',
    needs: ['genre: commit message'],
    instruction: 'A teammate wrote <i>“Removed old Power Peg flag.”</i> Fix the first word. <b>Example:</b> Updated README → <b>Update</b> README' + K('<br>Power Peg — Knight’s old order function, unused since 2003'),
    prompt: CARD('commit', MONO('___ old Power Peg flag')) });
  add({ id: 'cm3', type: 'mcq', family: 'genre', kicker: 'Genre · The commit message · 2/2',
    needs: ['genre: commit message', 'staging environment'],
    prompt: '<b>Which commit message follows the convention?</b>' + K('<br>config = configuration'),
    options: [MONO('Added staging config.'), MONO('Add staging config'), MONO('Adding the staging config')] });

  add({ id: 'tr1', type: 'content', reveal: true, kicker: 'Words that trick you · 1/3', title: 'Ukrainian sends you the wrong way',
    teaches: ['traps: production · environment'],
    items: [RC('експлуатація', '= <b>production</b>, <b>operation</b>', 'The service has been <b>in production</b> since 2021.'),
      RC('exploitation', '= using a security weakness'),
      RC('середовище', '= <b>environment</b> (staging, test)', 'The <b>staging environment</b> mirrors production.'),
      RC('medium', '= a material that carries signals (fiber, air)')] });
  add({ id: 'tp1', type: 'match', family: 'trap', kicker: 'Words that trick you · Match',
    needs: ['traps: production · environment'],
    prompt: 'Which English word fits each Ukrainian idea? Two words (a–f) are traps.',
    left: ['працює в експлуатації', 'тестове середовище', 'середовище передавання', 'використання вразливості'],
    right: ['medium', 'in exploitation', 'exploitation', 'in production', 'environment', 'ambience'] });

  add({ id: 'say2', type: 'gap', family: 'form', kicker: 'Say it in English · The key part',
    needs: ['traps: production · environment', 'production'],
    instruction: 'Translate: <i>Цей сервіс працює в продакшні з 2020 року.</i> Type the missing words.',
    prompt: 'This service ___ in production since 2020.' });

  /* ======================= STEP 4 · THE CANARY (DEEP DIVE) ======================= */
  add({ id: 's4', type: 'end', kicker: 'The investigation · Step 4', title: 'Test it on a few real users first',
    text: 'The canary release, step by step' });

  add({ id: 'v10', type: 'content', reveal: true, kicker: 'Step 4 · Words · 1/4', title: 'Why a “canary”?',
    teaches: ['concept: canary release'],
    items: [PH('canary.jpg', 'A miner holding a canary in a cage underground', '50% 35%', 95) +
        SM('Miners once took canaries underground. If the bird got sick, there was poisonous gas, and the miners still had time to leave.'),
      term('canary release', '/kəˈneri rɪˌliːs/', 'канарковий випуск'),
      MECH('the new version goes first to a small share of users, for example 1% of traffic. If it is “sick”, only a few people notice.')] });
  add({ id: 'v11', type: 'content', reveal: true, kicker: 'Step 4 · Words · 2/4', title: 'Who gets which version?',
    items: [term('traffic', '/ˈtræfɪk/', 'трафік, потік запитів'),
      MECH('all the requests that come to your service from users.'),
      term('load balancer', '/ˈloʊd ˌbælənsər/', 'балансувальник навантаження'),
      MECH('receives every request and decides which server gets it. It can send 1% to the new version and 99% to the old one.')] });
  add({ id: 'v12', type: 'content', reveal: true, kicker: 'Step 4 · Words · 3/4', title: 'Watching the system',
    items: [term('monitoring', '/ˈmɑːnɪtərɪŋ/', 'моніторинг'),
      MECH('collecting numbers about a running system (errors, speed, load) and watching them all the time.'),
      term('health check', '/ˈhelθ tʃek/', 'перевірка працездатності'),
      MECH('a tiny automatic question to a server every few seconds: “Are you OK?” If it does not answer, it gets no traffic.')] });
  add({ id: 'v12q', type: 'gap', family: 'scenario', kicker: 'Step 4 · Check the idea',
    needs: ['health check', 'load balancer', 'traffic'],
    instruction: 'Type one word from the last two slides.',
    prompt: 'Server 3 stops answering its health checks. The load balancer stops sending it any ___ .' });
  add({ id: 'v13', type: 'content', reveal: true, kicker: 'Step 4 · Words · 4/4', title: 'The two numbers that matter',
    items: [term('error rate', '/ˈerər reɪt/', 'частка помилок'),
      MECH('the share of requests that fail: 2 failed requests out of 1,000 = an error rate of 0.2%.'),
      term('response time', '/rɪˈspɑːns taɪm/', 'час відгуку'),
      MECH('how long a request waits for an answer, usually in milliseconds (ms).')] });

  add({ id: 'pc1', type: 'mcq', family: 'precision', kicker: 'Step 4 · Say it precisely',
    needs: ['canary release', 'error rate'],
    prompt: 'You are watching the canary. <b>Which report is the most useful for the team?</b>',
    options: ['“The canary’s error rate is 4%; the old version’s is 0.2%.”', '“Errors went up a lot on the canary this morning.”', '“The canary’s error rate is 4%, which seems high.”'] });

  add({ id: 'v14', type: 'content', reveal: true, kicker: 'Step 4 · When numbers go wrong', title: 'Alerts and logs',
    items: [term('alert', '/əˈlɝːt/', 'сповіщення про проблему'),
      MECH('an automatic message to the engineer on duty when a number crosses a limit, even at 3 a.m.'),
      term('log', '/lɔːɡ/', 'журнал (подій)'),
      MECH('a file where the system writes every event, so that engineers can read later what happened.')] });

  add({ id: 'dd1', type: 'content', reveal: true, kicker: 'Deep dive · How a canary release works · 1/2', title: 'From 1% to everyone, or back',
    teaches: ['concept: canary rollout'],
    items: [
      '<svg viewBox="0 0 320 250" width="100%" style="max-width:280px;display:block;margin:0 auto" role="img" aria-label="Canary rollout: the load balancer sends 99 percent to the old version and 1 percent to the canary; monitoring compares them">' +
        '<rect x="95" y="6" width="130" height="32" rx="9" fill="var(--surface-2)" stroke="var(--line)"/><text x="160" y="27" font-size="14" text-anchor="middle" fill="var(--ink)">users · traffic</text>' +
        '<path d="M160 38 v12" stroke="var(--ink-2)" stroke-width="2"/>' +
        '<rect x="85" y="50" width="150" height="32" rx="9" fill="var(--accent-soft)" stroke="var(--line)"/><text x="160" y="71" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)">load balancer</text>' +
        '<path d="M120 82 L70 110 M200 82 L250 110" stroke="var(--ink-2)" stroke-width="2"/>' +
        '<text x="70" y="102" font-size="13" text-anchor="end" fill="var(--ink-2)">99%</text><text x="254" y="102" font-size="13" fill="var(--ink-2)">1%</text>' +
        '<rect x="12" y="110" width="128" height="40" rx="9" fill="var(--surface-2)" stroke="var(--line)"/><text x="76" y="129" font-size="14" text-anchor="middle" fill="var(--ink)">old version</text><text x="76" y="144" font-size="13" text-anchor="middle" fill="var(--ink-2)">errors 0.2%</text>' +
        '<rect x="180" y="110" width="128" height="40" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/><text x="244" y="129" font-size="14" text-anchor="middle" fill="var(--ink)">canary (new)</text><text x="244" y="144" font-size="13" text-anchor="middle" fill="var(--ink-2)">errors ?</text>' +
        '<path d="M76 150 L140 178 M244 150 L180 178" stroke="var(--ink-2)" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<rect x="70" y="178" width="180" height="32" rx="9" fill="var(--surface-2)" stroke="var(--line)"/><text x="160" y="199" font-size="14" text-anchor="middle" fill="var(--ink)">monitoring compares</text>' +
        '<text x="8" y="236" font-size="13" fill="var(--ok)">healthy → 5% → 25% → 100%</text><text x="312" y="236" font-size="13" text-anchor="end" fill="var(--no)">sick → back</text></svg>',
      SM('<b>1.</b> The load balancer sends 1% of the traffic to the canary.'),
      SM('<b>2.</b> Monitoring compares the two versions: error rate, response time.')] });
  add({ id: 'dd2', type: 'content', reveal: true, kicker: 'Deep dive · How a canary release works · 2/2', title: 'Healthy or sick?',
    items: [SM('<b>3.</b> Healthy? More traffic is shifted, step by step: 5%, 25%, 100%.'),
      term('to roll back', '/ˌroʊl ˈbæk/', 'відкотити до попередньої версії'),
      MECH('<b>4.</b> Sick? All traffic is sent back to the old version, often automatically, before most users notice.'),
      K('noun: a <b>rollback</b> /ˈroʊlbæk/')] });

  add({ id: 'r4', type: 'content', kicker: 'Evidence 4 · Deploying Without Fear · ¶4', title: 'Not to everyone at once',
    items: [RD('Even then, the new version is not sent to everyone at once. In a canary release, it is served to perhaps one percent of traffic first. Monitoring compares error rates and response times between the canary and the old version. Once the numbers look healthy, more traffic is shifted, step by step. If they do not, the release is rolled back, often automatically, before most users notice anything.')] });
  add({ id: 'q4', type: 'mcq', family: 'scenario', kicker: 'Evidence 4 · What happens next?',
    needs: ['concept: canary rollout', 'roll back', 'error rate', 'monitoring'],
    prompt: CARD('Team rule', 'Roll back if the canary’s error rate is more than <b>1.5×</b> the old version’s.') +
      'Monitoring now: old version <b>0.2%</b>, canary <b>0.6%</b>; response time is normal. <b>What happens next?</b>',
    options: ['More traffic is shifted to the canary.', 'The release is rolled back.', 'Nothing changes until tomorrow.'] });

  add({ id: 'gu1', type: 'content', reveal: true, kicker: 'Grammar · Purpose · 1/2', title: 'Why do we do it?',
    teaches: ['rule: purpose'],
    items: [FX('so that', '+', 'subject + verb'),
      RC('so that', 'often with can / will / does not', 'The canary gets 1% <b>so that</b> only a few users <b>see</b> a bug.'),
      FX('to · in order to', '+', 'infinitive'),
      RC('in order to', 'more formal', 'The build is tested in staging <b>in order to catch</b> configuration errors.')] });
  add({ id: 'gu2', type: 'content', reveal: true, kicker: 'Grammar · Purpose · 2/3', title: 'prevent … from',
    items: [FX('prevent', '+', 'object', '+', 'from', '+', 'V-ing'),
      OKNO('Health checks prevent the load balancer <b>from sending</b> traffic to a dead server.', 'prevent the load balancer to send'),
      K('укр. «не дає … надсилати» → prevents … from sending')] });
  add({ id: 'gu3', type: 'content', reveal: true, kicker: 'Grammar · Purpose · 3/3', title: 'in case',
    items: [RC('in case = на випадок, якщо', 'a careful step done in advance; present, not will', 'We keep the old version running <b>in case</b> the canary <b>fails</b>.'),
      ...EV('Take an umbrella in case it rains.', 'Візьми парасольку на випадок, якщо піде дощ.')] });

  const BANK = 'Use: <b>because · in case · so that · until</b> (one is extra)';
  add({ id: 'cz1', type: 'gap', family: 'cause', kicker: 'Why each step? · 1/3',
    needs: ['rule: purpose', 'canary release', 'traffic'], instruction: BANK,
    prompt: 'The canary gets only 1% of the traffic ___ a bug reaches only a few users.' });
  add({ id: 'cz2', type: 'gap', family: 'cause', kicker: 'Why each step? · 2/3',
    needs: ['rule: purpose', 'canary release'], instruction: BANK,
    prompt: 'Knight should have had a kill switch ___ the new code misbehaved.' + K('<br>kill switch — a button that stops everything at once') });
  add({ id: 'cz3', type: 'gap', family: 'cause', kicker: 'Why each step? · 3/3',
    needs: ['rule: time clauses', 'traffic', 'error rate'], instruction: BANK,
    prompt: 'The canary gets no more traffic ___ its error rate is back to normal.' });
  SAY('say3', 'Стара версія обслуговує трафік, доки нова не пройде перевірку працездатності.', 'The old version serves traffic until the new one passes its health check.',
    'I won’t go home until I finish the report.', 'Я не піду додому, доки не закінчу звіт.');
  add({ id: 'pf1', type: 'gap', family: 'form', kicker: 'prevent … from',
    needs: ['rule: purpose', 'concept: pipeline'],
    instruction: 'Type one word in the right form.',
    prompt: 'An automatic deployment prevents a technician from ___ (miss) a server.' });
  add({ id: 't3', type: 'gap', family: 'form', kicker: 'Order of steps · 3/3',
    needs: ['rule: time clauses', 'canary release'],
    instruction: 'Type one word in the right form.',
    prompt: 'Once the canary ___ (look) healthy for an hour, we will shift all traffic.' });


  const AL = (t, body) => CARD('🔔 ALERT · ' + t, body);
  const ALP = CARD('Pattern', SM('Since <b>[time]</b>, we’ve been seeing <b>[what]</b> on <b>[where]</b>. The old version is at <b>[number]</b>. Next, we’ll <b>[roll back / watch / shift more traffic]</b>.'));
  add({ id: 'al1', type: 'content', reveal: true, format: 'brief', kicker: 'Live alerts · One student at a time · 1/2',
    title: 'Report the alert to the team.',
    items: [ALP,
      AL('10:02 · checkout canary', 'error rate <b>4.1%</b> · old version <b>0.2%</b>')] });
  add({ id: 'al1b', type: 'content', reveal: true, kicker: 'Live alerts · One student at a time · 2/2',
    title: 'Two more alerts.',
    items: [AL('10:15 · search canary', 'response time <b>900 ms</b> · old version <b>200 ms</b> · errors normal'),
      AL('10:40 · login canary · since 09:40', 'error rate <b>0.2%</b> · old version <b>0.2%</b> · healthy for 60 minutes'),
      K('Same pattern: Since …, we’ve been seeing … The old version is at … Next, we’ll …')] });
  add({ id: 'al2', type: 'mcq', poll: true, kicker: 'Live alerts · Your call',
    prompt: 'Alert 2: the search canary is slow (900 ms vs 200 ms), but there are no errors.<br><b>What would you do?</b>',
    options: ['roll back now', 'watch it for 10 more minutes', 'shift more traffic'] });
  const CH = (who, line) => '<span style="display:block;font-size:16px;line-height:1.38;margin:2px 0"><b>' + who + ':</b> ' + line + '</span>';
  add({ id: 'd1a', type: 'content', reveal: true, kicker: 'A modern team · Stand-up · 1/2', title: 'Next morning: a canary failed',
    items: [PH('standup.jpg', 'A team at a morning stand-up looking at a chart with an error spike', '50% 40%', 80) + CH('Iryna', 'How’s the checkout release going?'),
      CH('Maksym', 'Not great. The canary’s error rate jumped to four percent within ten minutes.'),
      CH('Iryna', 'Did the pipeline roll it back?'),
      CH('Maksym', 'Automatically, yes. The alert fired, and all traffic went back to the old version.')] });
  add({ id: 'd1b', type: 'content', reveal: true, kicker: 'A modern team · Stand-up · 2/2', title: 'What now?',
    items: [CH('Iryna', 'Good. So the rollback worked; it’s the release itself we need to look at.'),
      CH('Maksym', 'Exactly. I’ll pull the logs and reproduce it on staging this morning.'),
      CH('Iryna', 'And put the release on hold until we know what went wrong. We’ll need a short postmortem, too.')] });
  add({ id: 'dx1', type: 'match', family: 'define', kicker: 'Stand-up · Team talk',
    needs: ['alert', 'log', 'error rate'],
    prompt: 'What does each expression mean? Two meanings (a–f) are extra.',
    left: ['the error rate jumped', 'the alert fired', 'pull the logs', 'put it on hold'],
    right: ['stop it for now', 'delete the old files', 'rose suddenly', 'collect the records', 'fix it at once', 'the warning went off'] });
  add({ id: 'su1', type: 'content', reveal: true, kicker: 'Genre · The status page · 1/2', title: 'How a team tells its users',
    teaches: ['genre: status update'],
    items: [CARD('status.shop.com · Checkout errors', SM('<b>10:05 UTC</b> We are investigating errors on the checkout page.<br><b>10:20 UTC</b> A fix has been deployed. We are monitoring the results.<br><b>10:50 UTC</b> This incident has been resolved.'))] });
  add({ id: 'su1b', type: 'content', reveal: true, kicker: 'Genre · The status page · 2/2', title: 'The rules of the genre',
    items: [RC('happening now', 'present continuous', 'We <b>are investigating</b> …'),
      RC('done', 'present perfect, often passive', 'A fix <b>has been deployed</b>.'),
      RC('tone', 'calm, no blame, no jokes, times with a time zone')] });
  add({ id: 'su2', type: 'gap', family: 'genre', kicker: 'Genre · The status page · 1/2',
    needs: ['genre: status update', 'rule: passive'], instruction: 'Complete the update. Use the verb in brackets.',
    prompt: CARD('status.shop.com', SM('10:20 UTC · A fix ___ (deploy). We are monitoring the results.')) });
  add({ id: 'su3', type: 'mcq', family: 'register', kicker: 'Genre · The status page · 2/2',
    needs: ['genre: status update'],
    prompt: '<b>Which message fits a public status page?</b>',
    options: ['Checkout is broken because of a bad release by our developer.', 'We are investigating errors on the checkout page. Next update in 30 minutes.', 'Checkout errors happened. We will fix them soon, probably.'] });
  add({ id: 'bk4', type: 'open', family: 'cause', kicker: 'Back to Knight · One sentence',
    needs: ['canary release', 'roll back'],
    prompt: 'Iryna’s canary was rolled back in minutes.<br><b>Finish:</b> <i>For Knight, a canary on one server would only help if …</i>',
    placeholder: '… someone / something …' });

  /* ======================= STEP 5 · OLD CODE, BAD CONFIG, LOST DATA ======================= */
  add({ id: 's5', type: 'end', kicker: 'The investigation · Step 5', title: 'Old code, bad configuration, lost data',
    text: 'Three ways a release still goes wrong' });

  add({ id: 'dr1', type: 'content', reveal: true, kicker: 'Step 5 · Deploy is not release', title: 'Two different moments',
    teaches: ['concept: deploy vs release'],
    items: [SM('<b>Deploy</b> = the new code is on the servers.'),
      SM('<b>Release</b> = users can actually use the feature.'),
      SM('With a feature flag, you can deploy today, release next week, and “un-release” in one second by switching the flag off.'),
      K('to ship (code) — випускати, відправляти в продакшн · launched — запущений для всіх')] });
  add({ id: 'r5', type: 'content', kicker: 'Evidence 5 · Deploying Without Fear · ¶5', title: 'Switched off',
    items: [RD('Many teams go one step further and separate deploying from releasing. New code is shipped to production switched off, behind a feature flag, and is turned on later for selected users. If something goes wrong, the flag is simply switched off, which is far faster than a new deployment. Flags have a cost, though: every forgotten flag is old code waiting to be switched on by mistake, exactly what happened at Knight Capital. That is why flags should be removed as soon as a feature is fully launched.')] });
  add({ id: 'q5', type: 'mcq', family: 'tfng', kicker: 'Evidence 5 · True, false or not given?',
    needs: ['concept: deploy vs release', 'feature flag'],
    prompt: '<b>Feature flags are completely free of risk.</b>',
    options: ['True', 'False', 'Not given'] });
  add({ id: 'd2a', type: 'content', reveal: true, kicker: 'The product manager (PM) · 1/2', title: 'Why not everyone today?',
    items: [CH('Product manager', 'The new search page is finished. Why not switch it on for everyone today?'),
      CH('Developer', 'We could, but if it has a bug we haven’t seen yet, every user would hit it at the same time.'),
      CH('Product manager', 'So what’s the plan?'),
      CH('Developer', 'Five percent today, twenty-five tomorrow, and everyone on Thursday, once the error rate stays flat.')] });
  add({ id: 'd2b', type: 'content', reveal: true, kicker: 'The product manager · 2/2', title: 'The price of safety',
    items: [CH('PM', 'And the other users? Marketing has already announced the new page.'),
      CH('Developer', 'That’s true, and it’s the price of doing it safely. To be fair, the old page still works, so nobody loses anything; they just wait a couple of days.'),
      CH('PM', 'All right. Keep me posted, and let me know the moment anything goes wrong.'),
      K('stay flat — не змінюватися · keep me posted — тримай у курсі')] });
  add({ id: 'lad1', type: 'content', reveal: true, format: 'explain', kicker: 'Explain it · One student per step',
    title: 'Explain a feature flag three times, for three listeners.',
    items: [SM('<b>1 · To a developer:</b> <i>The new code is deployed behind a flag, so that …</i>'),
      SM('<b>2 · To the PM:</b> <i>In plain words, … It means we can … without …</i>'),
      SM('<b>3 · To someone outside IT:</b> <i>Think of it as a light switch: …</i>'),
      K('Content: on the servers · switched off · on for 5% · off in 1 second')] });
  add({ id: 'lad2', type: 'mcq', poll: true, kicker: 'Explain it · Listeners',
    prompt: '<b>Which explanation was the clearest for someone outside IT?</b>',
    options: ['Step 1 speaker', 'Step 2 speaker', 'Step 3 speaker'] });

  add({ id: 'v15', type: 'content', reveal: true, kicker: 'Step 5 · Words · 1/3', title: 'When users notice',
    items: [term('outage', '/ˈaʊtɪdʒ/', 'перебій, недоступність сервісу'),
      MECH('a period when users cannot use the service at all.'),
      SM('Every outage is an incident; not every incident is an outage.'),
      term('hotfix', '/ˈhɑːtfɪks/', 'термінове виправлення'),
      MECH('a small, urgent fix that goes out fast, outside the normal release schedule.')] });
  add({ id: 'v16', type: 'content', reveal: true, kicker: 'Step 5 · Words · 2/3', title: 'Code is not data',
    teaches: ['concept: rollback vs data'],
    items: [term('migration', '/maɪˈɡreɪʃn/', 'міграція (схеми бази даних)'),
      MECH('a change to the structure of the database (e.g. a new column). It changes the stored data.'),
      term('backup', '/ˈbækʌp/', 'резервна копія'),
      MECH('a saved copy of the data that you can restore later.'),
      SM('A rollback brings back the <b>old code</b>. It does <b>not</b> bring back <b>old data</b>.')] });
  add({ id: 'sc5', type: 'mcq', family: 'scenario', kicker: 'Step 5 · Check the idea',
    needs: ['concept: rollback vs data', 'migration', 'roll back', 'backup'],
    prompt: 'Version 3.2 ran a migration that damaged user data. The team decides to roll back to version 3.1.<br><b>Is the data OK again?</b>',
    options: ['No: the code is old again, but the data needs the backup.', 'Yes: a rollback brings back both code and data.', 'Yes, but only if the release used a canary first.'] });
  add({ id: 'bk5', type: 'mcq', family: 'scenario', kicker: 'Back to Knight · Can it be undone?',
    needs: ['roll back', 'concept: rollback vs data'],
    prompt: 'At 10:15 Knight finally stopped the old code. <b>Could it roll back the 4 million orders it had already sent?</b>',
    options: ['Yes: a rollback undoes everything since 9:30.', 'Yes, but only with a feature flag.', 'No: like damaged data, trades in the market stay done.'] });
  SAY('say4', 'Зробіть резервну копію на випадок, якщо міграція піде не так.', 'Take a backup in case the migration goes wrong.',
    'Save the file in case your laptop crashes.', 'Збережи файл на випадок, якщо ноутбук зависне.');
  add({ id: 'v17', type: 'content', reveal: true, kicker: 'Step 5 · Words · 3/3', title: 'After the fire',
    items: [term('regression', '/rɪˈɡreʃn/', 'регресія'),
      MECH('a bug that appears in something that used to work, right after a change.'),
      term('postmortem', '/ˌpoʊstˈmɔːrtəm/', 'розбір інциденту'),
      MECH('a written analysis after an incident: what happened, why, and what we change. It looks for causes, not for people to blame.')] });

  add({ id: 'dx0', type: 'match', family: 'define', kicker: 'Step 5 · Quick check',
    needs: ['outage', 'hotfix', 'regression', 'postmortem'],
    prompt: 'What does each term mean? Two meanings (a–f) are extra.',
    left: ['outage', 'hotfix', 'regression', 'postmortem'],
    right: ['a written analysis', 'a new major version', 'an urgent small fix', 'users cannot use it', 'a data copy', 'old feature breaks again'] });

  const WF = 'Change the form of the word in brackets.';
  add({ id: 'wf1', type: 'gap', family: 'wordform', kicker: 'Word families · 1/3',
    needs: ['deploy'],
    instruction: WF + ' <b>Example:</b> (reliable) Users want ___ . → <b>reliability</b>',
    prompt: 'Every ___ (deploy) is a moment when working code is replaced.' });
  add({ id: 'wf2', type: 'gap', family: 'wordform', kicker: 'Word families · 2/3',
    needs: ['regression'], instruction: WF,
    prompt: 'The update caused a ___ (regress) in the search feature: it used to work.' });
  add({ id: 'wf3', type: 'gap', family: 'wordform', kicker: 'Word families · 3/3',
    needs: ['configuration'], instruction: WF,
    prompt: 'The outage started after a routine change to the network ___ (configure).' });

  add({ id: 'r6', type: 'content', kicker: 'Evidence 6 · Deploying Without Fear · ¶6', title: 'Configuration counts too',
    items: [PH('lockout.jpg', 'Two engineers outside a locked data center door at night', '50% 45%', 110) +
        RD('Configuration deserves the same care as code. In October 2021, Facebook, Instagram and WhatsApp were unreachable for about six hours, in one of the company’s longest outages, after a routine change to its network configuration went wrong. Because the company’s internal tools depended on the same network, engineers struggled to reach the very systems they needed to fix.')] });
  add({ id: 'q6', type: 'mcq', family: 'cause', kicker: 'Evidence 6 · Why so long?',
    needs: ['outage', 'configuration'],
    prompt: '<b>Why was the Facebook outage so hard to fix?</b>',
    options: ['The engineers were on vacation.', 'The backup was too old.', 'Their own tools used the same broken network.'] });

  add({ id: 'tr2', type: 'content', reveal: true, kicker: 'Words that trick you · 2/3', title: 'Pairs that look close',
    teaches: ['traps: outage · check · upgrade'],
    items: [RC('failure ≠ outage', '<b>failure</b>: one part stops working · <b>outage</b>: users cannot use the service', 'A disk failure is routine; an outage is what users notice.'),
      RC('контролювати', '“перевіряти” = <b>check</b>, <b>monitor</b> · <b>control</b> = керувати', 'The pipeline <b>checks</b> the build; the load balancer <b>controls</b> where traffic goes.'),
      RC('update ≠ upgrade', '<b>update</b>: small fixes inside a version · <b>upgrade</b>: a move to a new major version', 'The upgrade to the next major version needs code changes.')] });
  add({ id: 'tr3', type: 'content', reveal: true, kicker: 'Words that trick you · 3/3', title: 'Three more pairs',
    teaches: ['traps: validate · review · build'],
    items: [RC('validate ≠ verify', '<b>validate</b>: check the format or rules · <b>verify</b>: confirm it is real or true', 'The form validates the email format; a link verifies the address exists.'),
      RC('ревізія ≠ revision', '<b>code review</b> = перевірка коду · <b>revision</b> = версія · ревізія = <b>audit</b>', 'Please review my pull request.'),
      RC('збирати', 'a project: <b>build</b> · physical parts: <b>assemble</b>', 'The CI server builds the project; technicians assemble the servers.')] });
  add({ id: 'tp3', type: 'match', family: 'trap', kicker: 'Words that trick you · Choose the word',
    needs: ['traps: outage · check · upgrade', 'traps: validate · review · build'],
    prompt: 'Which word fits each phrase? Four words (a–h) are the traps.',
    left: ['a six-hour ___ for all users', '___ the logs after each deploy', 'the ___ to version 4', 'a code ___ for every PR'],
    right: ['update', 'review', 'control', 'failure', 'upgrade', 'revision', 'outage', 'check'] });
  add({ id: 'tp5', type: 'gap', family: 'trap', kicker: 'Words that trick you · Type it · 1/2',
    needs: ['traps: validate · review · build'], instruction: 'Choose the word in brackets and type it.',
    prompt: 'The form should ___ that the phone number contains only digits. (validate / verify)' });
  add({ id: 'tp7', type: 'gap', family: 'trap', kicker: 'Words that trick you · Type it · 2/2',
    needs: ['traps: validate · review · build'], instruction: 'Choose the word in brackets and type it.',
    prompt: 'Our CI server can ___ the whole project in four minutes. (build / assemble)' });

  add({ id: 'gb0', type: 'content', reveal: true, kicker: 'Security words', title: 'Who is asking?',
    items: [term('to authenticate', '/ɔːˈθentɪkeɪt/', 'автентифікувати'),
      MECH('to check who is sending a request before answering it.'),
      term('token', '/ˈtoʊkən/', 'токен'),
      MECH('a secret string sent with each request to prove who you are, like a pass.')] });
  add({ id: 'gb1', type: 'content', reveal: true, kicker: 'Grammar · by or with?', title: 'Who does it? What is it done with?',
    teaches: ['rule: by vs with'],
    items: [RC('by', 'the doer: a person or a system', 'checked <b>by</b> the API gateway (the “front door” server)'),
      RC('with', 'the tool or the means', 'signed <b>with</b> a secret key'),
      K('укр. «шлюзом», «ключем» — один відмінок. Питайте: <b>хто?</b> → by · <b>чим?</b> → with.'),
      RC('more natural', 'authenticated <b>with</b> (or <b>using</b>) a token')] });
  add({ id: 'bw1', type: 'gap', family: 'form', kicker: 'by or with? · 1/2',
    needs: ['rule: by vs with'], instruction: 'Type <b>by</b> or <b>with</b>.',
    prompt: 'The new release was approved ___ the team lead.' });
  add({ id: 'bw2', type: 'gap', family: 'form', kicker: 'by or with? · 2/2',
    needs: ['rule: by vs with', 'token', 'authenticate'], instruction: 'Type <b>by</b> or <b>with</b>.',
    prompt: 'Every request is authenticated ___ a token.' });
  SAY('say6', 'Кожен запит автентифікують токеном, щоб сторонні не мали доступу до API.', 'Every request is authenticated with a token so that outsiders cannot access the API.',
    'I lock my bike with a chain so that nobody can take it.', 'Я замикаю велосипед ланцюгом, щоб ніхто не забрав.');

  add({ id: 'au1', type: 'content', kicker: 'Error auction · 1/2 · Buy only the correct sentences', title: 'Sentences A–C',
    items: [K('You have $1,000: correct buy +$200, wrong buy −$300 · rate limiting — обмеження частоти запитів'),
      SM('<b>A.</b> Once the tests will pass, the pipeline deploys the build.'),
      SM('<b>B.</b> The backup is encrypted with a secret key.'),
      SM('<b>C.</b> Rate limiting prevents the API to crash.')] });
  add({ id: 'au1b', type: 'content', kicker: 'Error auction · 2/2 · Buy only the correct sentences', title: 'Sentences D–F',
    items: [SM('<b>D.</b> This service has been in exploitation since 2021.'),
      SM('<b>E.</b> Keep the old release in case the new one fails.'),
      SM('<b>F.</b> Auditors will make a revision of our logs.'),
      K('auditor — аудитор')] });
  add({ id: 'au2', type: 'gap', family: 'error', kicker: 'Error auction · Your bid',
    needs: ['rule: time clauses', 'rule: by vs with', 'rule: purpose', 'traps: production · environment', 'traps: validate · review · build'],
    instruction: 'Type the letters of the <b>correct</b> sentences together, e.g. <b>AC</b>.',
    prompt: 'Correct sentences: ___' });
  add({ id: 'au3', type: 'gap', family: 'error', kicker: 'Error auction · Fix it · 1/2',
    needs: ['rule: purpose'], instruction: 'Fix sentence C. Type the missing words.',
    prompt: 'Rate limiting prevents the API ___ .' });
  add({ id: 'au4', type: 'gap', family: 'error', kicker: 'Error auction · Fix it · 2/2',
    needs: ['traps: validate · review · build'], instruction: 'Fix sentence F. Type one verb.',
    prompt: 'Auditors will ___ our logs next month.' });

  add({ id: 'say5', type: 'mcq', family: 'trap', kicker: 'Say it in English · Which version?',
    needs: ['outage', 'traps: outage · check · upgrade'],
    prompt: '<i>Відмова одного диска не спричинила перебою в роботі сервісу.</i><br><b>Which English version is right?</b>',
    options: ['The outage of one disk did not cause a failure of the service.', 'The failure of one disk did not cause an outage.', 'The refusal of one disk did not cause a break in the service work.'] });

  /* ======================= LISTENING · THE BRIEF ======================= */

  /* ======================= THE MORNING AFTER ======================= */





  /* ======================= THE VERDICT ======================= */
  add({ id: 's6', type: 'end', kicker: 'The expert’s version', title: 'The Brief', text: 'An engineer retells the whole case in two minutes' });
  add({ id: 'lw1', type: 'content', reveal: true, kicker: 'Listening · Words from the audio · 1/2', title: 'Before you listen',
    items: [term('catastrophic', '/ˌkætəˈstrɑːfɪk/', 'катастрофічний'), MECH('extremely bad: a disaster that is hard to recover from.'),
      term('tamper-proof', '/ˈtæmpər ˌpruːf/', 'захищений від втручання'), MECH('made so that nobody can open or change it without leaving a sign.')] });
  add({ id: 'lw1b', type: 'content', reveal: true, kicker: 'Listening · Words from the audio · 2/2', title: 'One more word',
    items: [term('to mimic', '/ˈmɪmɪk/', 'імітувати, копіювати'), MECH('to copy how something looks or works.')] });
  add({ id: 'lw2', type: 'content', reveal: true, kicker: 'Listening · While you listen', title: 'Listen for three things',
    items: [SM('<b>1.</b> What three strategies does the speaker name?'),
      SM('<b>2.</b> How does the speaker describe the moment of deployment?'),
      SM('<b>3.</b> What question does the speaker ask before the third strategy?'),
      K('“The Brief” — коротке аудіо, у якому весь кейс переказано розмовною англійською.')] });
  add({ id: 'L0', type: 'end', kicker: 'Listening · 1st time', title: '🎧 Listen', text: 'Phones down, ears on' });
  add({ id: 'L1', type: 'gap', family: 'form', kicker: 'After listening · 1/5',
    needs: ['catastrophic'], instruction: 'Type the adjective you heard.',
    prompt: 'Continuous delivery is designed to make that ___ moment completely boring.' });
  add({ id: 'L2', type: 'mcq', family: 'cause', kicker: 'After listening · 2/5',
    needs: ['staging environment', 'mimic', 'tamper-proof'],
    prompt: 'The build is already sealed like a tamper-proof box. <b>So why do teams still test on real users with canary releases?</b>',
    options: ['Staging does not perfectly mimic the real world.', 'Automatic tests take too long to run.', 'Canary releases are cheaper than staging.'] });
  add({ id: 'L3', type: 'end', kicker: 'Listening · 2nd time', title: '🎧 Listen again', text: 'Catch the exact words' });
  add({ id: 'L4', type: 'gap', family: 'cause', kicker: 'After listening · 3/5',
    needs: ['roll back', 'error rate'], instruction: 'Type one verb you heard.',
    prompt: 'If error rates ___ , the release rolls back automatically.' + K('<br>Hint: a short verb meaning “rise suddenly”.') });
  add({ id: 'L5', type: 'gap', family: 'form', kicker: 'After listening · 4/5',
    needs: ['roll back'], instruction: 'Type one verb you heard.',
    prompt: 'But what if we need to ___ a change without rolling back the entire deployment?' });
  add({ id: 'L6', type: 'mcq', family: 'register', kicker: 'After listening · 5/5 · Spoken or written?',
    needs: ['catastrophic'],
    prompt: 'The audio is spoken; the text is written. <b>Which phrase is from the audio?</b>',
    options: ['Every one of them faces the same risk each time it deploys.', 'They’re basically risking catastrophic financial ruin.'] });
  add({ id: 's8', type: 'end', kicker: 'The investigation · The verdict', title: 'How quickly can we undo it?',
    text: 'Back to Knight Capital' });
  add({ id: 'r7', type: 'content', kicker: 'Evidence 7 · Deploying Without Fear · ¶7', title: 'Small, visible, reversible',
    items: [RD('None of these practices make failure impossible. What they do is make it small, visible and reversible. Experienced engineers often judge a deployment process by a single question: how quickly can we undo it?'),
      K('reversible — такий, що його можна скасувати')] });

  add({ id: 'vd1', type: 'mcq', poll: true, kicker: 'The verdict · Vote',
    prompt: '<b>Which practice would have saved Knight Capital most cheaply?</b>',
    options: ['one automatic deployment of the same build to all servers', 'removing old flags and dead code', 'a canary release on one server first', 'acting on the 97 warning emails'] });
  add({ id: 'vd2', type: 'content', reveal: true, format: 'justify-ranking', kicker: 'The verdict · One student at a time',
    title: 'Justify the class vote. One reason each.',
    items: [SM('Reasons you can use: <b>no human copying</b> · <b>no old code left to wake up</b> · <b>only a few orders at risk</b> · <b>the warning came before 9:30</b>'),
      CARD('Patterns', SM('<b>It prevents</b> … <b>from</b> …-ing.<br>… <b>so that</b> … can’t …<br><b>Before</b> …-ing, … <b>would</b> …')),
      K('Next student: agree, or “I’d rather choose …, because …”')] });

  /* ======================= FINAL TASK · RELEASE PLAN ======================= */
  add({ id: 's9', type: 'end', kicker: 'Final task', title: 'Your release plan', text: 'Explain to a manager how a change goes out safely' });
  add({ id: 'fp0', type: 'mcq', poll: true, kicker: 'Release plan · Choose the case',
    prompt: PH('checkout.jpg', 'A laptop with a checkout page among holiday shopping bags', '50% 45%', 100) + '<b>Which change will the class release?</b>',
    options: ['a new checkout page before Black Friday', 'a database migration for a banking app', 'a new login system for a social network'] });
  add({ id: 'fp1', type: 'content', reveal: true, format: 'propose', kicker: 'Release plan · One student per move',
    title: 'Four moves. The teacher is the manager.',
    items: [SM('<b>1 · Steps in order:</b> First, … is reviewed. Once … passes, … is deployed to …'),
      SM('<b>2 · Quality checks:</b> … is tested on … in order to …'),
      SM('<b>3 · If it goes wrong:</b> We keep … running in case … · the release is rolled back'),
      SM('<b>4 · Schedule and stop:</b> We’d start with …% of traffic. If the error rate rises above …%, …')] });
  add({ id: 'fp2', type: 'open', family: 'precision', kicker: 'Release plan · Move 4 first',
    needs: ['error rate', 'roll back', 'canary release'],
    prompt: 'Move 4 is the hardest. Write your <b>stop condition with a number</b>.' + K('<br>If the error rate rises above …%, the release is rolled back.'),
    placeholder: 'If the error rate rises above …' });
  add({ id: 'fp3', type: 'content', reveal: true, kicker: 'Release plan · While you listen', title: 'Check the speaker',
    items: [SM('✔ Did the steps come <b>in order</b> (once, before, after)?'),
      SM('✔ Was there a <b>number</b> in the stop condition?'),
      SM('✔ Did the speaker say <b>how to undo it</b> if it goes wrong?')] });

  add({ id: 'end', type: 'end', kicker: 'Unit 3 · Case closed',
    title: 'Small, visible, reversible', text: 'Whenever a release goes out, ask: how quickly can we undo it?' });

  window.LESSON = {
    id: ID,
    title: 'Unit 3 · Continuous Delivery',
    audience: 'КН · 2nd year · B1+/B2 · Computer Science · group',
    concept: 'Розслідування збою: наскрізний кейс — Knight Capital, 1 серпня 2012 ($460M за 45 хв). Кожен крок розслідування додає запобіжник конвеєра (рев’ю, CI, staging з тією самою збіркою, canary, прапорці, бекап) і перевіряє: чи врятувало б це Knight? Глибокий розбір — канарковий випуск зі схемою. Читання — «докази» по кроках; фінал — вердикт і план безпечного релізу.',
    known: ['code', 'test', 'tests', 'developer', 'server', 'servers', 'database', 'website', 'release', 'version', 'feature', 'user', 'users', 'bug',
      'API', 'app', 'network', 'data', 'team', 'software', 'market', 'order', 'orders', 'hacker', 'email', 'error', 'request', 'requests', 'deployment'],
    wordlistExtra: [
      { after: 'r2', term: 'dozens of times', ipa: '/ˈdʌzənz əv ˈtaɪmz/', uk: 'десятки разів' },
      { after: 'dr1', term: 'to ship (code)', ipa: '/ʃɪp/', uk: 'випускати (код) у продакшн' },
      { after: 'au1', term: 'rate limiting', ipa: '/ˈreɪt ˌlɪmɪtɪŋ/', uk: 'обмеження частоти запитів' },
      { after: 'd1b', term: 'to pull the logs', ipa: '/pʊl ðə ˈlɔːɡz/', uk: 'зібрати журнали' },
      { after: 'd1b', term: 'to put sth on hold', ipa: '/pʊt ɑːn ˈhoʊld/', uk: 'призупинити' },
      { after: 'd2b', term: 'to stay flat', ipa: '/steɪ ˈflæt/', uk: 'не змінюватися (про показник)' },
      { after: 'd2b', term: 'keep me posted', ipa: '/kiːp mi ˈpoʊstɪd/', uk: 'тримай мене в курсі' },
      { after: 'tr1', term: 'in production', ipa: '/ɪn prəˈdʌkʃn/', uk: 'в експлуатації [not “in exploitation” (= using a security weakness)]' },
      { after: 'tr1', term: 'medium', ipa: '/ˈmiːdiəm/', uk: 'середовище передавання сигналу [a test place = environment]' },
      { after: 'cz2', term: 'kill switch', ipa: '/ˈkɪl swɪtʃ/', uk: 'аварійний вимикач' },
      { after: 'd1a', term: 'stand-up (meeting)', ipa: '/ˈstænd ʌp/', uk: 'коротка щоденна нарада команди' },
      { after: 'tr2', term: 'upgrade (n, v)', ipa: '/ˈʌpɡreɪd/ (n) · /ʌpˈɡreɪd/ (v)', uk: 'перехід на нову основну версію [update = small fixes inside a version]' },
      { after: 'tr3', term: 'to validate', ipa: '/ˈvælɪdeɪt/', uk: 'перевіряти формат, правила [verify /ˈverɪfaɪ/ = підтверджувати справжність]' },
      { after: 'tr3', term: 'code review', ipa: '/ˈkoʊd rɪˌvjuː/', uk: 'перевірка коду [revision = версія; ревізія = audit]' },
      { after: 'tr3', term: 'to assemble', ipa: '/əˈsembl/', uk: 'збирати (фізичні частини) [a project is built, not assembled]' },
      { after: 'gb0', term: 'API gateway', ipa: '/ˌeɪpiːˈaɪ ˈɡeɪtweɪ/', uk: 'API-шлюз' },
      { after: 'L1', term: 'terrifying', ipa: '/ˈterəfaɪɪŋ/', uk: 'жахливий, моторошний' },
      { after: 'L4', term: 'to spike', ipa: '/spaɪk/', uk: 'різко зростати' },
      { after: 'r7', term: 'reversible', ipa: '/rɪˈvɝːsəbl/', uk: 'такий, що його можна скасувати' }],
    slides: S
  };
})();

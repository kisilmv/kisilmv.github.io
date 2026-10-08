/* =========================================================================
   Unit 5 · Debugging Embedded Systems: When the Board Won't Boot
   ESP · Комп'ютерна інженерія (F7), 2 курс · B1+/B2
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Послідовність: Lead-in · Лексика A–C · Before you read (D) · Reading ·
   Grammar 1–5 · Say it in English · Keyword drill · Speaking (3 завдання) ·
   Failure review board. Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const K = (s) => '<span class="muted">' + s + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  // Розмовний приклад: спершу українське речення (💬), наступним кроком — англійське
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  const S = [];
  const add = (o) => S.push(o);

  // «Say it in English»: українське технічне речення → еталон → 💬 розмовне → еталон
  const SAY = (n, uk, en, evEn, evUk) => add({ id: 'say' + n, type: 'content', reveal: true,
    kicker: 'Say it in English · ' + n + '/8', title: uk,
    items: ['<b>' + en + '</b>', ...EV(evEn, evUk)] });
  // «Знайди помилку»: торкнутися хибної частини
  const FM = (id, n, sentence, parts) => add({ id, type: 'mcq', kicker: 'Find the mistake · ' + n + '/4',
    prompt: (n === 1 ? '<span class="muted"><b>Example:</b> She must <s>forgot</s> → must <b>have forgotten</b> the password.</span><br><br>' : '') + sentence + '<br><span class="muted">Tap the wrong part.</span>', options: parts });

  add({ id: 'title', type: 'title',
    kicker: 'Unit 5 · English for Computer Engineering',
    title: 'Debugging Embedded Systems',
    subtitle: 'When the board won’t boot' });

  /* ---------- Lead-in ---------- */
  add({ id: 'l1', type: 'mcq', kicker: 'Lead-in · 1/3',
    prompt: 'Your smart thermostat <b>restarts every night</b> at about 3 a.m.<br><b>What would you check first?</b>',
    options: ['the power supply', 'the Wi-Fi router', 'the firmware version', 'the temperature in the room'] });
  add({ id: 'l2', type: 'open', kicker: 'Lead-in · 2/3',
    prompt: 'Think of a device that <b>failed you</b>: a phone, a laptop, a router, a car.<br><b>What exactly went wrong, and what was the first thing you did?</b>',
    placeholder: 'My … kept … , so I …' });
  add({ id: 'l3', type: 'mcq', kicker: 'Lead-in · 3/3',
    prompt: 'Which bug would you rather get?',
    options: ['a bug that appears <b>every time</b> you press a button', 'a bug that appears <b>once a week</b>, at night'] });

  /* ---------- Vocabulary A: the method ---------- */
  add({ id: 'v0', type: 'end', kicker: 'Vocabulary',
    title: 'How engineers hunt for bugs',
    text: 'The method, the tools and the usual suspects' });
  add({ id: 'vA1', type: 'content', kicker: 'Vocabulary · A · 1/3', title: 'A. The method', items: [
    term('symptom', '/ˈsɪmptəm/', 'ознака несправності, симптом'),
    term('intermittent', '/ˌɪntərˈmɪtənt/', 'нерегулярний, що виникає час від часу'),
    term('to reproduce', '/ˌriprəˈdus/', 'відтворити (несправність)'),
    term('on demand', '/ˌɑn dɪˈmænd/', 'на вимогу, будь-коли')] });
  add({ id: 'vA2', type: 'content', kicker: 'Vocabulary · A · 2/3', title: 'A. The method', items: [
    term('hypothesis', '/haɪˈpɑθəsɪs/', 'гіпотеза ' + K('(pl. hypotheses /haɪˈpɑθəˌsiz/)')),
    term('hunch', '/hʌntʃ/', 'здогад, інтуїтивне припущення'),
    term('evidence', '/ˈɛvɪdəns/', 'докази ' + K('(uncountable: no “evidences”)'))] });
  add({ id: 'vA3', type: 'content', kicker: 'Vocabulary · A · 3/3', title: 'A. The method', items: [
    term('to rule out', '/ˌrul ˈaʊt/', 'виключити (можливу причину)'),
    term('to narrow down', '/ˌnæroʊ ˈdaʊn/', 'звузити (коло причин)'),
    SM(K('We ruled out the battery and narrowed the problem down to one driver.'))] });
  add({ id: 'mA', type: 'match', kicker: 'A · Match',
    prompt: 'What does each word (1–4) mean? Two options (a–f) are extra.',
    left: ['symptom', 'hypothesis', 'evidence', 'to rule out'],
    right: ['facts behind a claim', 'to repair a fault', 'visible sign of trouble', 'to exclude a cause', 'a cause to test', 'a list of tools'] });
  add({ id: 'vAq1', type: 'mcq', kicker: 'A · Quick check · 1/3',
    prompt: 'The board freezes once or twice a week, and never while we are watching.<br><b>This fault is …</b>',
    options: ['on demand', 'reproduced', 'intermittent', 'ruled out'] });
  add({ id: 'vAq2', type: 'gap', kicker: 'A · Quick check · 2/3',
    instruction: 'Complete with one word.',
    prompt: 'We can’t fix the bug until we can ___ it on the bench.' });
  add({ id: 'vAq3', type: 'mcq', kicker: 'A · Quick check · 3/3',
    prompt: 'Two days of tests ___ the list of suspects to one driver.',
    options: ['ruled out', 'narrowed down', 'reproduced', 'proved'] });

  /* ---------- Vocabulary B: the toolbox ---------- */
  add({ id: 'vB1', type: 'content', kicker: 'Vocabulary · B · 1/2', title: 'B. The toolbox', items: [
    term('multimeter', '/ˈmʌltiˌmitər/', 'мультиметр'),
    term('oscilloscope', '/əˈsɪləˌskoʊp/', 'осцилограф ' + K('(stress on “cil”)')),
    term('logic analyzer', '/ˈlɑdʒɪk ˈænəˌlaɪzər/', 'логічний аналізатор'),
    term('serial log', '/ˈsɪriəl ˈlɔɡ/', 'журнал через послідовний порт (UART)')] });
  add({ id: 'vB2', type: 'content', kicker: 'Vocabulary · B · 2/2', title: 'B. The toolbox', items: [
    term('hardware debugger', '/ˈhɑrdˌwɛr diˈbʌɡər/', 'апаратний налагоджувач (через JTAG або SWD)'),
    term('to halt', '/hɔlt/', 'зупинити (процесор)'),
    term('to step through', '/ˌstɛp ˈθru/', 'виконувати (код) покроково'),
    term('trace', '/treɪs/', 'трасування; журнал трасування')] });
  add({ id: 'mB', type: 'match', kicker: 'B · Which tool?',
    prompt: 'Which tool answers each question? Two options are extra.',
    left: ['Is the supply really 3.3 V?', 'Is there a short voltage drop?', 'What is on the SPI bus?', 'What did the firmware print before the crash?'],
    right: ['oscilloscope', 'serial log', 'multimeter', 'logic analyzer', 'soldering iron', 'a new board'] });
  add({ id: 'vBq1', type: 'mcq', kicker: 'B · Quick check · 1/2',
    prompt: 'You want to stop the processor and run the code <b>one line at a time</b>.<br><b>You need …</b>',
    options: ['a multimeter', 'a serial log', 'a hardware debugger', 'an oscilloscope'] });
  add({ id: 'vBq2', type: 'gap', kicker: 'B · Quick check · 2/2',
    instruction: 'Complete with one word from B.',
    prompt: 'Press “Pause” in the debugger to ___ the processor and read its registers.' });

  /* ---------- Vocabulary C: the usual suspects ---------- */
  add({ id: 'vC1', type: 'content', kicker: 'Vocabulary · C · 1/2', title: 'C. The usual suspects', items: [
    term('brownout', '/ˈbraʊnˌaʊt/', 'короткочасне просідання напруги живлення'),
    term('floating input', '/ˌfloʊtɪŋ ˈɪnˌpʊt/', 'плаваючий (ні до чого не під’єднаний) вхід'),
    term('race condition', '/ˈreɪs kənˌdɪʃən/', 'стан гонитви'),
    term('stack overflow', '/ˈstæk ˈoʊvərˌfloʊ/', 'переповнення стека')] });
  add({ id: 'vC2', type: 'content', kicker: 'Vocabulary · C · 2/2', title: 'C. The usual suspects', items: [
    term('watchdog timer', '/ˈwɑtʃˌdɔɡ ˌtaɪmər/', 'сторожовий таймер'),
    term('to fire', '/faɪr/', 'спрацювати ' + K('(the watchdog fired)')),
    term('to clear (a flag)', '/klɪr/', 'скинути (прапорець) ' + K('· the flag is clear = скинутий')),
    term('deadline', '/ˈdɛdˌlaɪn/', 'граничний час виконання (задачі)')] });
  add({ id: 'mC', type: 'match', kicker: 'C · Symptom → cause',
    prompt: 'Which cause fits each symptom? Two options are extra.',
    left: ['Resets when the motor starts', 'Empty pin reads 1, 0, 1…', 'Result depends on task order', 'Crashes after deep nested calls'],
    right: ['stack overflow', 'brownout', 'loose screw', 'floating input', 'race condition', 'weak antenna'] });
  add({ id: 'vCq1', type: 'mcq', kicker: 'C · Quick check · 1/3',
    prompt: 'The main loop stopped, and one second later the board reset itself.<br><b>What reset it?</b>',
    options: ['the logic analyzer', 'the serial log', 'the stack overflow', 'the watchdog timer'] });
  add({ id: 'vCq2', type: 'gap', kicker: 'C · Quick check · 2/3',
    instruction: 'Complete with one word from C.',
    prompt: 'The watchdog ___ because the main loop stopped for two seconds.' });
  add({ id: 'vCq3', type: 'gap', kicker: 'C · Quick check · 3/3',
    instruction: 'Complete with one word from C.',
    prompt: 'The brownout flag is ___, so the voltage never dropped.' });

  /* ---------- Before you read (D) ---------- */
  add({ id: 'rB0', type: 'end', kicker: 'Reading',
    title: 'When the Board Won’t Boot',
    text: 'A spacecraft on Mars, a computer that keeps resetting, and engineers 150 million kilometers away' });
  add({ id: 'vD1', type: 'content', kicker: 'Before you read · 1/3', title: 'D. The Mars story', items: [
    term('replica', '/ˈrɛplɪkə/', 'точна копія (системи для випробувань)'),
    term('priority inversion', '/praɪˌɔrəti ɪnˈvɜrʒən/', 'інверсія пріоритетів'),
    term('priority inheritance', '/praɪˌɔrəti ɪnˈhɛrɪtəns/', 'успадкування пріоритету'),
    term('in hindsight', '/ɪn ˈhaɪndˌsaɪt/', 'заднім числом, коли вже знаєш, що сталося')] });
  add({ id: 'vD2', type: 'content', reveal: true, kicker: 'Before you read · 2/3', title: 'Priority inversion in plain words', items: [
    SM('⬆ <b>HIGH</b> bus task: waits… waits…<br>↔ <b>MEDIUM</b> tasks: keep running<br>⬇ <b>LOW</b> weather task: 🔑 holds the key'),
    SM('A <b>low</b>-priority task holds a shared resource (a “key”). A <b>high</b>-priority task needs that key and waits.'),
    SM('<b>Medium</b>-priority tasks keep the processor busy, so the low task never gets time to give the key back.')] });
  add({ id: 'vD3', type: 'content', reveal: true, kicker: 'Before you read · 3/3', title: 'The fix: priority inheritance', items: [
    SM('With <b>priority inheritance</b>, the low task <b>borrows</b> the high priority while it holds the key.'),
    SM('Now medium tasks cannot interrupt it. It finishes quickly and gives the key back.'),
    SM('The high-priority task gets the key in time.')] });
  add({ id: 'vDq', type: 'mcq', kicker: 'D · Quick check',
    prompt: 'A low-priority task blocks a high-priority one, while medium tasks keep running.<br><b>This is …</b>',
    options: ['priority inheritance', 'a race condition', 'priority inversion', 'a brownout'] });
  add({ id: 'rP', type: 'open', kicker: 'Before you read · Predict', discovery: true,
    prompt: 'In 1997, a spacecraft on Mars began to <b>reset itself again and again</b>.<br><b>How could engineers on Earth find the cause?</b> Write one idea.',
    placeholder: 'They could…' });

  /* ---------- Reading ---------- */
  const PARA = [
    'On July 4, 1997, NASA’s Mars Pathfinder landed on Mars, and for a few days everything went well. Then the spacecraft’s computer began to reset itself, again and again. Each reset interrupted the current work, and engineers on Earth, more than 150 million kilometers away, had to answer a question every embedded engineer knows: what is going wrong inside a machine you cannot touch?',
    'Debugging an embedded system is harder than debugging an ordinary application. The bug might be in the code, but it might just as well be in the hardware, the power supply or the timing between the two. Many faults are <b>intermittent</b>: the device works for hours and then freezes once, at night, when nobody is watching. And some of the most annoying bugs disappear as soon as you connect a debugger, because the debugger itself changes the timing.',
    'Experienced engineers therefore follow a method rather than a <b>hunch</b>. The first step is to describe the <b>symptom</b> precisely. “It doesn’t work” is not a symptom; “the board resets about every forty minutes when the motor is running” is. The second step is to <b>reproduce</b> the fault, ideally <b>on demand</b>. A bug you can trigger every time is already half fixed; a bug that appears once a week is a nightmare.',
    'Next comes a <b>hypothesis</b> — a possible cause that can be tested. Finally, the engineer changes one thing at a time and checks whether the symptom disappears. Step by step, the list of suspects is <b>narrowed down</b>.',
    'The toolbox matters. A <b>multimeter</b> shows whether a voltage is correct. An <b>oscilloscope</b> shows how a signal changes over time, so it can reveal a short voltage drop, or <b>brownout</b>, that a multimeter would miss. A <b>logic analyzer</b> records many digital lines at once and decodes protocols such as I²C or SPI.',
    'A <b>hardware debugger</b> connected through JTAG or SWD lets the engineer <b>halt</b> the processor, <b>step through</b> the code line by line and read memory. And the humblest tool of all, a <b>serial log</b> printed over UART, is often the fastest way to see what the firmware was doing just before it crashed.',
    'Good debugging is also a way of reasoning. A firmware engineer looking at a log might say: “The <b>watchdog</b> fired, so the main loop <b>must have stopped</b> for more than a second. It <b>can’t have been</b> a power problem, because the brownout flag is clear. It <b>might have been</b> waiting for a sensor that never answered.” Every sentence shows how sure the speaker is, and every claim points to <b>evidence</b>.',
    'Some causes come up again and again. A <b>floating input</b> — a pin connected to nothing — picks up noise and reads random values. A <b>race condition</b> appears when two tasks use the same data and the result depends on which one runs first. A <b>stack overflow</b> quietly overwrites memory and crashes the program somewhere far from the real mistake.',
    'Pathfinder’s problem was a timing bug of exactly this quiet kind. Engineers at NASA’s Jet Propulsion Laboratory ran an exact <b>replica</b> of the spacecraft on Earth with full tracing switched on and, after many hours, reproduced the reset. The <b>trace</b> showed a classic <b>priority inversion</b>: a low-priority weather task held a shared resource, a high-priority bus task waited for it, and medium-priority tasks kept running in between.',
    'When the bus task missed its <b>deadline</b>, the scheduler decided that something had gone badly wrong and reset the computer. The fix was a single setting, <b>priority inheritance</b>, which had been switched off. The team changed it by sending a small patch to Mars.',
    'The story is still taught today. The reset had actually appeared a few times during testing before launch, but it was hard to reproduce, and the team gave priority to other work. <b>In hindsight</b>, it should have been investigated earlier. Yet the tools that saved the mission — a trace facility, a replica on the bench and a way to change code remotely — had been built in advance. In embedded systems, you debug with the tools you prepared before anything went wrong.'
  ];
  const para = (n) => add({ id: 'r' + n, type: 'content', kicker: 'Reading · When the Board Won’t Boot',
    title: 'Paragraph ' + n + ' of 11', items: [SM(PARA[n - 1])] });

  para(1);
  add({ id: 'q1', type: 'mcq', kicker: 'Reading · Check · 1/10',
    prompt: 'What was the problem with Pathfinder?',
    options: ['It lost contact with Earth.', 'Its computer kept resetting itself.', 'It landed in the wrong place.', 'Its batteries ran out.'] });
  para(2);
  add({ id: 'q2', type: 'mcq', kicker: 'Reading · Check · 2/10',
    prompt: 'Why do some bugs disappear when you connect a debugger?',
    options: ['The debugger fixes them automatically.', 'The debugger turns off the power supply.', 'The debugger changes the timing.', 'Those bugs are only in the hardware.'] });
  para(3);
  add({ id: 'q3', type: 'mcq', kicker: 'Reading · Check · 3/10',
    prompt: 'According to the text, which bug is “already half fixed”?',
    options: ['one that appears once a week', 'one you can trigger on demand', 'one that disappears with a debugger', 'one that is in the hardware'] });
  para(4);
  add({ id: 'q4', type: 'match', kicker: 'Reading · Check · 4/10',
    prompt: 'Put the method in order: which step comes 1st, 2nd, 3rd, 4th? Two options are extra.',
    left: ['1st', '2nd', '3rd', '4th'],
    right: ['change one thing, check', 'call the manufacturer', 'describe the symptom', 'form a hypothesis', 'replace the board', 'reproduce the fault'] });
  para(5);
  add({ id: 'q5', type: 'mcq', kicker: 'Reading · Check · 5/10',
    prompt: 'Why can an oscilloscope find a brownout that a multimeter misses?',
    options: ['It is more expensive.', 'It decodes the SPI bus.', 'It can halt the processor.', 'It shows how the voltage changes over time.'] });
  para(6);
  para(7);
  add({ id: 'q6', type: 'mcq', kicker: 'Reading · Check · 6/10',
    prompt: 'Why is the engineer sure it <b>wasn’t</b> a power problem?',
    options: ['The watchdog fired.', 'The brownout flag is clear.', 'The sensor never answered.', 'The main loop stopped.'] });
  para(8);
  add({ id: 'q7', type: 'mcq', kicker: 'Reading · Check · 7/10',
    prompt: 'Why is a stack overflow hard to find?',
    options: ['It crashes the program far from the real mistake.', 'It makes a pin read random values.', 'It only happens when two tasks run.', 'It cannot be seen in a serial log.'] });
  para(9);
  add({ id: 'q8', type: 'mcq', kicker: 'Reading · Check · 8/10',
    prompt: 'What did the trace show?',
    options: ['The power supply dropped every forty minutes.', 'A sensor never answered.', 'A weather task held a resource that the bus task needed.', 'There was a stack overflow in the bus task.'] });
  para(10);
  add({ id: 'q9', type: 'mcq', kicker: 'Reading · Check · 9/10',
    prompt: 'Why did the computer reset, and how was it fixed?',
    options: ['The bus task missed its deadline; priority inheritance was switched on.', 'The battery was empty; a new one was sent.', 'The weather task crashed; it was switched off.', 'The replica failed; the team built a new one.'] });
  para(11);
  add({ id: 'q10', type: 'mcq', kicker: 'Reading · Check · 10/10',
    prompt: 'What is the main lesson of the final paragraph?',
    options: ['Bugs found in testing are rarely important.', 'Spacecraft should not use priorities.', 'Replicas are too expensive to build.', 'Prepare your debugging tools before anything goes wrong.'] });
  const FIND = [
    ['a guess based on a feeling, not on evidence', 'Paragraph 3'],
    ['to run code one line at a time', 'Paragraph 6'],
    ['with the knowledge you have only after the event', 'Paragraph 11']
  ];
  FIND.forEach((f, i) => add({ id: 'f' + (i + 1), type: 'gap', kicker: 'Find it in the text · ' + (i + 1) + '/3',
    instruction: 'One word or phrase. ' + K(f[1]),
    prompt: f[0] + ' → ___' }));

  /* ---------- Grammar ---------- */
  add({ id: 'g0', type: 'end', kicker: 'Grammar',
    title: 'Making deductions',
    text: 'How sure are you — and what is your evidence?' });
  add({ id: 'gN', type: 'content', reveal: true, kicker: 'Grammar · Notice',
    title: 'How sure is the speaker?', items: [
      SM('The watchdog fired, so the main loop <b>must have stopped</b>.<br>' + K('→ the speaker is almost sure: there is evidence')),
      SM('It <b>can’t have been</b> a power problem.<br>' + K('→ the speaker is sure it is impossible')),
      SM('It <b>might have been</b> waiting for a sensor.<br>' + K('→ only a possibility'))] });

  // Rule 1
  add({ id: 'g1a', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 1/2',
    title: 'About now: modal + verb', items: [
      SM('<b>must</b> ●●●●○ ' + K('I’m almost sure') + '<br><b>might · may · could</b> ●●○○○ ' + K('it’s possible') + '<br><b>can’t</b> ○○○○○ ' + K('it’s impossible')),
      SM('The LED is off and the meter shows 0 V. The board <b>must be</b> unpowered.'),
      SM('The reading jumps randomly. The pin <b>might be</b> floating.'),
      SM('The fan is spinning, so the board <b>can’t be</b> completely dead.')] });
  add({ id: 'g1b', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 2/2',
    title: 'Happening right now: modal + be + -ing', items: [
      SM('Listen to that click — the relay <b>must be switching</b> again.'),
      SM('The CPU is hot. A task <b>might be running</b> in an endless loop.')] });
  add({ id: 'e1_1', type: 'mcq', kicker: 'Rule 1 · Practice · 1/4',
    prompt: 'The LED is off and the multimeter shows 0 V.<br>The board ___ unpowered.',
    options: ['might be', 'must be', 'can’t be', 'should be'] });
  add({ id: 'e1_2', type: 'mcq', kicker: 'Rule 1 · Practice · 2/4',
    prompt: 'The pin reads 1, 0, 1… but maybe a wire is just loose.<br>The input ___ floating.',
    options: ['must be', 'can’t be', 'might be', 'mustn’t be'] });
  add({ id: 'e1_3', type: 'mcq', kicker: 'Rule 1 · Practice · 3/4',
    prompt: 'The fan is spinning and the display shows the time.<br>The board ___ completely dead.',
    options: ['can’t be', 'must be', 'might be', 'should be'] });
  add({ id: 'e1_4', type: 'gap', kicker: 'Rule 1 · Practice · 4/4',
    instruction: '<b>Example:</b> Listen — the relay <b>must be switching</b>. Use must + be + -ing.',
    prompt: 'The battery is getting hot. Something ___ (draw) too much current.',
    placeholder: 'must be …' });

  add({ id: 'g1c', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · Everyday English',
    title: 'Now say it: everyday English', items: [
      ...EV('He <b>must be</b> at home — the lights are on.', 'Він, мабуть, удома — світло горить.'),
      ...EV('She <b>might be driving</b> — that’s why she isn’t answering.', 'Може, вона за кермом — тому й не відповідає.')] });
  // Rule 2
  add({ id: 'g2a', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 1/2',
    title: 'About the past: modal + have + V3 (past participle)', items: [
      SM('The watchdog fired, so the main loop <b>must have stopped</b>.'),
      SM('It <b>might have been</b> waiting for a sensor that never answered.'),
      SM('It <b>can’t have been</b> a power problem — the flag is clear.'),
      SM('✅ it must <b>have</b> stopped &nbsp; ❌ it must <b>has</b> stopped ' + K('(have never changes)'))] });
  add({ id: 'g2b', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 2/2',
    title: 'Now say it: everyday English', items: [
      ...EV('You <b>must have been</b> tired after that shift.', 'Ти, напевно, втомився після такої зміни.'),
      ...EV('He <b>can’t have said</b> that — he wasn’t even there.', 'Він не міг такого сказати — його там навіть не було.')] });

  add({ id: 'e2_1', type: 'gap', kicker: 'Rule 2 · Practice · 1/4',
    instruction: '<b>Example:</b> The log ends at 03:12, so the firmware <b>must have frozen</b> then. Use the verb in brackets.',
    prompt: 'The watchdog fired, so the main loop must ___ (stop).',
    placeholder: 'have …' });
  add({ id: 'e2_4', type: 'mcq', kicker: 'Rule 2 · Practice · 2/4',
    prompt: 'The serial log ends at 03:12 with <b>no error message</b>.<br>Which conclusion is the most honest?',
    options: ['The firmware must have frozen.', 'The firmware can’t have frozen.', 'The firmware might have frozen, or the log buffer might have filled up.', 'The firmware froze.'] });
  FM('fm1', 1, 'The sensor must has stopped answering.', ['The sensor', 'must has stopped', 'answering']);
  add({ id: 'e2_2', type: 'gap', kicker: 'Rule 2 · Practice · 3/4',
    instruction: 'Use the verb in brackets.',
    prompt: 'It can’t ___ (be) a brownout — the flag is clear.',
    placeholder: 'have …' });
  FM('fm4', 2, 'The flag is clear, so it can’t have be a power problem.', ['The flag is clear', 'so it', 'can’t have be', 'a power problem']);
  add({ id: 'e2_3', type: 'mcq', kicker: 'Rule 2 · Practice · 4/4',
    prompt: 'The board passed every test yesterday and never left the lab.<br>It ___ damaged in transport.',
    options: ['must have been', 'can’t have been', 'might have been', 'must be'] });
  FM('fm3', 3, 'The board might been reset by the watchdog.', ['The board', 'might been reset', 'by the watchdog']);

  // Rule 3
  add({ id: 'g3a', type: 'content', reveal: true, kicker: 'Grammar · Rule 3',
    title: 'Trap: can’t, not mustn’t', items: [
      SM('Sure it is <b>not</b> true → <b>can’t</b><br>It <b>can’t be</b> the cable: the replica fails too.'),
      SM('<b>mustn’t</b> = it is not allowed<br>You <b>mustn’t touch</b> the board while it is powered.'),
      SM('✅ It can’t be the cable &nbsp; ❌ It mustn’t be the cable'),
      ...EV('You <b>can’t be</b> serious!', 'Ти що, жартуєш? (Не може бути, що ти серйозно!)')] });
  add({ id: 'e3_1', type: 'mcq', kicker: 'Rule 3 · Practice · 1/2',
    prompt: 'The same cable works perfectly on the replica.<br>It ___ the cable.',
    options: ['mustn’t be', 'can’t be', 'must be', 'mustn’t have been'] });
  add({ id: 'e3_2', type: 'mcq', kicker: 'Rule 3 · Practice · 2/2',
    prompt: 'Safety rule in the lab:<br>You ___ connect the probe while the motor is running.',
    options: ['can’t have', 'mustn’t', 'might not', 'can’t be'] });

  FM('fm2', 4, 'It mustn’t be a brownout, because the flag is clear.', ['It mustn’t be', 'a brownout', 'because the flag is clear']);

  // Rule 4
  add({ id: 'g4a', type: 'content', reveal: true, kicker: 'Grammar · Rule 4',
    title: 'should have ≠ must have', items: [
      SM('<b>should have</b> + V3 = it was the right thing to do, but nobody did it ' + K('(criticism)') + '<br>The reset <b>should have been investigated</b> before launch.'),
      SM('<b>must have</b> + V3 = I’m almost sure it happened ' + K('(conclusion)') + '<br>The reset <b>must have been caused</b> by the bus task.'),
      ...EV('I <b>should have taken</b> an umbrella.', 'Треба було взяти парасольку.')] });
  add({ id: 'e4_1', type: 'mcq', kicker: 'Rule 4 · Practice · 1/3',
    prompt: 'We found the bug in the field, in winter — never in the lab.<br>We ___ the firmware at low temperature.',
    options: ['must have tested', 'should have tested', 'can’t have tested', 'might test'] });
  add({ id: 'e4_2', type: 'mcq', kicker: 'Rule 4 · Practice · 2/3',
    prompt: 'The board reset exactly when the motor started.<br>The voltage ___ dropped.',
    options: ['should have', 'shouldn’t have', 'must have', 'can’t have'] });
  add({ id: 'e4_3', type: 'mcq', kicker: 'Rule 4 · Practice · 3/3',
    prompt: 'The reset appeared before launch, but nobody looked into it.<br>In hindsight, it ___ earlier.',
    options: ['should have been investigated', 'must have been investigated', 'can’t have been investigated', 'might be investigated'] });

  // Rule 5
  add({ id: 'g5a', type: 'content', reveal: true, kicker: 'Grammar · Rule 5',
    title: 'Point to the evidence', items: [
      SM('<b>Judging by</b> the oscilloscope, the voltage <b>probably</b> drops when the motor starts.'),
      SM('<b>The log suggests that</b> the task was waiting for the bus.'),
      SM('<b>It looks like</b> a race condition. <b>It seems that</b> two tasks write to the same buffer.'),
      ] });
  add({ id: 'g5b', type: 'content', reveal: true, kicker: 'Grammar · Rule 5 · Everyday English',
    title: '«мабуть» ≠ always must', items: [
      SM('Strong evidence → <b>must</b>. Weak evidence → <b>probably</b> or <b>might</b>.'),
      ...EV('<b>Judging by</b> the line, the food here <b>must be</b> good.', 'Судячи з черги, тут, мабуть, смачно.'),
      ...EV('He’s <b>probably</b> stuck in traffic.', 'Він, мабуть, застряг у заторі.')] });
  add({ id: 'e5_1', type: 'mcq', kicker: 'Rule 5 · Practice',
    prompt: 'Which sentence would you write in a <b>bug report</b>?',
    options: ['I have a feeling it’s the SPI driver.', 'The SPI driver is broken, 100%.', 'Maybe everything is broken.', 'Judging by the logic analyzer, the SPI driver probably sends the wrong clock.'] });
  add({ id: 'e5_2', type: 'open', kicker: 'Grammar · Your turn',
    prompt: 'A smart doorbell works all day but <b>goes offline every night at about 2 a.m.</b> The router restarts at 2 a.m. for updates.<br><b>Write two sentences:</b> one hypothesis with <b>might / must</b>, one thing you rule out with <b>can’t</b> + your evidence.',
    placeholder: 'Judging by …, it must … It can’t … because …' });

  /* ---------- Say it in English ---------- */
  SAY(1, 'Плата, мабуть, не живиться: світлодіод не горить.',
    'The board must be unpowered: the LED is off.',
    'They <b>must be</b> on vacation — the shop is closed.', 'Вони, мабуть, у відпустці — крамниця зачинена.');
  SAY(2, 'Можливо, цей вхід плаває.',
    'This input might be floating.',
    'She <b>might be</b> on the subway — her phone is out of range.', 'Може, вона в метро — телефон поза зоною.');
  SAY(3, 'Це не може бути проблема живлення: прапорець просідання скинуто.',
    'It can’t be a power problem: the brownout flag is clear.',
    'It <b>can’t be</b> five o’clock already!', 'Не може бути, що вже п’ята!');
  add({ id: 'sq1', type: 'mcq', kicker: 'Say it · Quick check',
    prompt: '«Він не міг цього зробити — він був у відпустці».',
    options: ['He mustn’t have done it — he was on vacation.', 'He can’t have done it — he was on vacation.', 'He can’t do it — he was on vacation.', 'He shouldn’t have done it — he was on vacation.'] });
  SAY(4, 'Головний цикл, напевно, зупинився більш ніж на секунду.',
    'The main loop must have stopped for more than a second.',
    'You <b>must have heard</b> the news.', 'Ти, напевно, вже чув новину.');
  SAY(5, 'Можливо, задача чекала на датчик, який так і не відповів.',
    'The task might have been waiting for a sensor that never answered.',
    'I <b>might have sent</b> it to the wrong address.', 'Можливо, я надіслав це не на ту адресу.');
  SAY(6, 'Плату не могли пошкодити під час перевезення — вона не залишала лабораторії.',
    'The board can’t have been damaged in transport — it never left the lab.',
    'It <b>can’t have been</b> Oleh — he doesn’t have a key.', 'Це не міг бути Олег — у нього немає ключа.');
  add({ id: 'sq2', type: 'mcq', kicker: 'Say it · Quick check',
    prompt: '«Нам слід було перевірити мікропрограму на морозі».',
    options: ['We must have tested the firmware in the cold.', 'We should test the firmware in the cold.', 'We should have tested the firmware in the cold.', 'We might have tested the firmware in the cold.'] });
  SAY(7, 'Цю ваду слід було дослідити ще до запуску.',
    'This bug should have been investigated before launch.',
    'I <b>should have called</b> you yesterday.', 'Мені треба було подзвонити тобі вчора.');
  SAY(8, 'Судячи з осцилографа, напруга, ймовірно, просідає, коли запускається двигун.',
    'Judging by the oscilloscope, the voltage probably drops when the motor starts.',
    '<b>Judging by</b> his face, the exam <b>didn’t go</b> well.', 'Судячи з його обличчя, іспит пройшов не дуже.');

  /* ---------- Keyword drill ---------- */
  add({ id: 'k0', type: 'content', kicker: 'Keyword drill', title: 'Build the sentence', items: [
    'You see only the <b>keywords</b> from the text, in the right order.',
    'Add articles and prepositions. Choose the tense or the modal.',
    'Say your sentence → compare → repeat the target 3 times.'] });
  const KW = [
    ['bug · might · code · might just as well · hardware · power supply · timing',
      'The <b>bug might</b> be in the <b>code</b>, but it <b>might just as well</b> be in the <b>hardware</b>, the <b>power supply</b> or the <b>timing</b>.',
      'Вада може бути в коді, але так само може бути в апаратній частині, живленні чи синхронізації.'],
    ['bug · trigger · every time · already · half · fix',
      'The thing is, a <b>bug</b> you can <b>trigger every time</b> is <b>already half fixed</b>.',
      'Річ у тім, що ваду, яку можна викликати щоразу, вже наполовину виправлено.'],
    ['oscilloscope · reveal · short · voltage drop · multimeter · miss',
      'An <b>oscilloscope</b> can <b>reveal</b> a <b>short voltage drop</b> that a <b>multimeter</b> would <b>miss</b>.',
      'Осцилограф може виявити коротке просідання напруги, яке мультиметр пропустив би.'],
    ['watchdog · fire · so · main loop · must · stop · more than · second',
      'The <b>watchdog fired</b>, <b>so</b> the <b>main loop must</b> have <b>stopped</b> for <b>more than</b> a <b>second</b>.',
      'Спрацював сторожовий таймер, отже, головний цикл, напевно, зупинився більш ніж на секунду.'],
    ['low-priority · task · hold · shared resource · high-priority · task · wait',
      'A <b>low-priority task held</b> a <b>shared resource</b>, and a <b>high-priority task waited</b> for it.',
      'Задача з низьким пріоритетом утримувала спільний ресурс, а задача з високим пріоритетом чекала на нього.'],
    ['in hindsight · reset · should · investigate · earlier',
      'To be honest, <b>in hindsight</b>, the <b>reset should</b> have been <b>investigated earlier</b>.',
      'Чесно кажучи, тепер зрозуміло, що перезапуск слід було дослідити раніше.']
  ];
  const kw = (i) => add({ id: 'k' + (i + 1), type: 'content', reveal: true,
    kicker: 'Keyword drill · ' + (i + 1) + '/6', title: KW[i][0], items: [KW[i][1], K(KW[i][2])] });
  kw(0); kw(1); kw(2);
  add({ id: 'kq', type: 'mcq', kicker: 'Keyword drill · Halfway',
    prompt: 'Which word did you <b>add</b> most often so far?',
    options: ['articles: a / an / the', 'prepositions: in / for / to', 'the verb be', 'linking words: but / that'] });
  kw(3); kw(4); kw(5);

  /* ---------- Speaking A: Clue by clue (speculate) ---------- */
  add({ id: 'spA0', type: 'end', kicker: 'Speaking',
    title: 'Think like a debugger',
    text: 'Three short tasks, then the failure review board' });
  add({ id: 'spA1', type: 'content', reveal: true, kicker: 'Speaking A · Clue by clue', format: 'speculate',
    title: 'One clue at a time', items: [
      'The teacher opens <b>one clue</b>. <b>One student</b> says what <b>might / must / can’t</b> have happened.',
      'After every clue, change your mind if the evidence says so.',
      '<b>You must use:</b> must have · might have · can’t have · judging by'] });
  add({ id: 'spA1b', type: 'content', kicker: 'Speaking A · Example', title: 'How it sounds', items: [
      SM('<b>Example.</b> Clue: “The display is dark, but the fan is spinning.”<br>→ <i>The board <b>can’t be</b> completely unpowered — the fan is spinning. Judging by the dark display, the backlight <b>might have failed</b>.</i>')] });
  add({ id: 'spA2', type: 'content', reveal: true, kicker: 'Speaking A · Case 1 · One student at a time',
    title: 'The silent weather station', items: [
      SM('🔎 <b>1.</b> A weather station on a roof sends data every 10 minutes. Since last week, it <b>goes silent every day at about 6 p.m.</b> and comes back at 8 a.m.'),
      SM('🔎 <b>2.</b> It runs on a battery charged by a <b>solar panel</b>.'),
      SM('🔎 <b>3.</b> The serial log shows <b>“brownout reset”</b> at 17:58.'),
      SM('🔎 <b>4.</b> Last week, workers <b>moved the panel</b> to the north side of the roof.')] });
  add({ id: 'spA3', type: 'content', reveal: true, kicker: 'Speaking A · Case 2 · One student at a time', round2: true, format: 'speculate',
    title: 'The parking sensor that sees ghosts', items: [
      SM('🔎 <b>1.</b> A parking sensor sometimes reports a car <b>when the space is empty</b>.'),
      SM('🔎 <b>2.</b> It happens <b>more often when it rains</b>.'),
      SM('🔎 <b>3.</b> The logic analyzer shows the input line <b>jumping between 0 and 1</b> with nothing connected.'),
      SM('🔎 <b>4.</b> Last month, a technician <b>cut a wire</b> to fit the sensor into a new housing.')] });

  /* ---------- Speaking B: Rank the suspects (justify-ranking) ---------- */
  add({ id: 'spB1', type: 'content', kicker: 'Speaking B · Rank the suspects', format: 'justify-ranking',
    title: 'The drone that reboots in the air', items: [
      SM('The flight controller <b>reboots in the air</b> — only on <b>cold mornings</b>, about once in 20 flights.'),
      SM('<b>A.</b> cold battery → brownout<br><b>B.</b> race condition: GPS task vs motor task<br><b>C.</b> stack overflow in the logging task<br><b>D.</b> loose connector on the motion sensor')] });
  add({ id: 'spB2', type: 'open', kicker: 'Speaking B · Your ranking',
    prompt: 'Rank the suspects <b>from most to least likely</b>. Then add <b>one test</b> that could rule out your number 1.',
    placeholder: 'A – C – D – B. Test: …' });
  add({ id: 'spB3', type: 'content', reveal: true, kicker: 'Speaking B · One student at a time',
    title: 'Defend your ranking', items: [
      '<b>You must use:</b> probably · might · can’t · judging by · to rule out',
      SM('<b>Example (one suspect):</b> <i>I’d put A first. Judging by the “cold mornings” detail, the battery voltage <b>probably</b> drops under load. We could rule it out with an oscilloscope on the supply line during takeoff.</i>'),
      '<b>Listeners:</b> name one suspect the speaker ranked differently from you — and why.'] });

  /* ---------- Speaking C: Explain it to a non-engineer (explain) ---------- */
  add({ id: 'spC1', type: 'content', kicker: 'Speaking C · Explain it simply', format: 'explain',
    title: 'What really happened on Mars?', items: [
      '<b>Listener:</b> a journalist, no technical background',
      '<b>One minute</b> · one student at a time',
      '<b>Banned words:</b> mutex · semaphore · scheduler · thread',
      '<b>Plan:</b> symptom → cause → fix → what they should have done'] });
  add({ id: 'spC2', type: 'content', reveal: true, kicker: 'Speaking C · Useful phrases',
    title: 'Keep it simple', items: [
      SM('<b>In plain terms,</b> the computer had urgent, normal and unimportant jobs.'),
      SM('<b>Think of it as</b> a queue for one key…'),
      SM('<b>What went wrong was that</b> the urgent job had to wait too long.'),
      SM('The engineers <b>must have</b> been shocked by the trace.'),
      SM('<b>In hindsight,</b> they <b>should have</b> investigated it before launch.')] });

  /* ---------- Failure review board (brief) ---------- */
  add({ id: 'fr0', type: 'end', kicker: 'Final task',
    title: 'Failure review board',
    text: 'A device failed in the field. Your team explains what happened.' });
  add({ id: 'fr1', type: 'content', reveal: true, kicker: 'Failure review board · Roles', format: 'brief',
    title: 'Three roles, one story', items: [
      '<b>Field engineer:</b> symptom and evidence',
      '<b>Firmware engineer:</b> two hypotheses, what was ruled out',
      '<b>Hardware engineer:</b> most likely cause and fix',
      '<b>Everyone:</b> the lesson — <b>should have</b>'] });
  add({ id: 'fr2', type: 'mcq', kicker: 'Failure review board · Choose a case',
    prompt: 'Which failure will your team review?',
    options: ['🛴 the scooter that resets uphill', '📦 the conveyor that counts boxes twice', '🌡️ the thermostat that freezes after 49 days', '🌱 the greenhouse with crazy moisture readings'] });
  add({ id: 'fr3', type: 'content', kicker: 'Case cards · 1/2', title: 'The evidence', items: [
    SM('🛴 <b>Scooter:</b> the dashboard resets only when riding <b>uphill</b> with a heavy rider. Log: “brownout reset”. The motor draws up to 40 A on hills.'),
    SM('📦 <b>Conveyor:</b> one box in ~500 is counted <b>twice</b>. It started after a new “statistics” task was added. Both tasks update the same counter.')] });
  add({ id: 'fr4', type: 'content', kicker: 'Case cards · 2/2', title: 'The evidence', items: [
    SM('🌡️ <b>Thermostat:</b> every unit freezes after <b>about 49.7 days</b> of uptime, never earlier. The watchdog does not fire. Hint: 2³² milliseconds ≈ 49.7 days.'),
    SM('🌱 <b>Greenhouse:</b> moisture readings jump between 0% and 100% after a <b>repair</b>. The multimeter shows nothing on the sensor line when the sensor is unplugged.')] });
  add({ id: 'fr5', type: 'content', kicker: 'Failure review board · Phrases', title: 'Useful phrases', items: [
    SM('The first report said … Precisely, the symptom is …'),
    SM('Our first hypothesis was … We ruled it out, because …'),
    SM('Judging by the log, the … must have … It can’t have been …, because …'),
    SM('We reproduced it on demand by …'),
    SM('In hindsight, we should have …')] });
  add({ id: 'fr6', type: 'open', kicker: 'Failure review board · Get ready',
    prompt: 'Write your team’s <b>lesson</b> in one sentence with <b>should have</b> + V3 and a concrete action.',
    placeholder: 'We should have … before …' });
  add({ id: 'fr7', type: 'content', kicker: 'Failure review board · While you listen', title: 'Check the team', items: [
    'A precise <b>symptom</b>?',
    '<b>must have</b> + <b>can’t have</b> with evidence?',
    'Something <b>ruled out</b> — and how?',
    'A lesson with <b>should have</b>?',
    'Ask one question that starts: <b>Could it have been…?</b>'] });

  add({ id: 'end', type: 'end', kicker: 'Unit 5',
    title: 'A symptom, a hypothesis, a test.',
    text: 'And the tools you prepared before anything went wrong.' });

  // Логіка подачі для check_lesson.js (рушій ці поля ігнорує)
  const R1 = 'rule 1: must / might / can’t + verb', R2 = 'rule 2: modal + have + V3', R3 = 'rule 3: can’t, not mustn’t',
    R4 = 'rule 4: should have vs must have', R5 = 'rule 5: judging by · probably', PI = 'concept: priority inversion';
  const TEACHES = { g1a: [R1], g1b: [R1], g2a: [R2], g3a: [R3], g4a: [R4], g5a: [R5], vD2: [PI] };
  const NEEDS = {
    vDq: [PI], q8: ['priority inversion'], q9: ['priority inheritance', 'deadline'],
    e1_1: [R1], e1_2: [R1, 'floating input'], e1_3: [R1], e1_4: [R1],
    e2_1: [R2, 'watchdog timer'], e2_2: [R2, 'brownout'], e2_3: [R2], e2_4: [R2, 'serial log'],
    e3_1: [R3, 'replica'], e3_2: [R3],
    fm1: [R2], fm2: [R3, 'brownout'], fm3: [R2, 'watchdog timer'], fm4: [R2],
    e4_1: [R4], e4_2: [R2, R4], e4_3: [R4, 'in hindsight'],
    e5_1: [R5, 'logic analyzer'], e5_2: [R1, R2, R5, 'to rule out'],
    sq1: [R2, R3], sq2: [R4], kq: [],
    spB2: [R5, 'to rule out'], fr6: [R4], fr2: []
  };
  S.forEach((s) => {
    if (TEACHES[s.id]) s.teaches = TEACHES[s.id];
    if (!['mcq', 'gap', 'open', 'match'].includes(s.type)) return;
    if (s.needs === undefined) s.needs = NEEDS[s.id] || [];
  });

  window.LESSON = {
    id: 'esp-ki-unit5',
    title: 'Unit 5 · Debugging Embedded Systems',
    known: ['board', 'firmware', 'sensor', 'battery', 'cable', 'LED', 'motor', 'bug', 'debugger', 'reset', 'patch', 'log'],
    slides: S
  };
})();

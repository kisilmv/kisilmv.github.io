/* =========================================================================
   Unit 6 · Low-Power Design: Ten Years on One Battery
   ESP · Комп'ютерна інженерія (F7), 2 курс · B1+/B2
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Послідовність: Lead-in · Лексика A (бюджет і числа) · B (сон, графік) ·
   C (приховані витоки) · Reading · Grammar 1–5 · Say it in English ·
   Keyword drill · Speaking A–C · Final: recommend a design.
   Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const K = (s) => '<span class="muted">' + s + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  const S = [];
  const add = (o) => S.push(o);

  /* Графік струму в часі (схематичний). labels: { meas, tx, sleep } → літери; floor — висота «дна» (сну) */
  const PROFILE = (labels, opt = {}) => {
    const fy = opt.floor || 122, txs = opt.tx || [248], meas = opt.meas || [40, 100, 160, 210];
    let d = 'M10 ' + fy;
    const ev = [...meas.map((x) => [x, 'm']), ...txs.map((x) => [x, 't'])].sort((a, b) => a[0] - b[0]);
    ev.forEach(([x, k]) => {
      if (k === 'm') d += ` L${x} ${fy} L${x} 92 L${x + 5} 92 L${x + 5} ${fy}`;
      else d += ` L${x} ${fy} L${x} 22 L${x + 18} 22 L${x + 18} ${fy}`;
    });
    d += ' L292 ' + fy;
    const tag = (x, y, t) => t ? `<circle cx="${x}" cy="${y}" r="10" fill="var(--accent)"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">${t}</text>` : '';
    const mx = meas[1] + 2, tx = txs[0] + 9;
    return '<svg viewBox="0 0 300 160" style="display:block;width:100%;max-width:290px;margin:2px auto">' +
      '<rect x="0" y="0" width="300" height="160" rx="10" fill="var(--surface-2)"/>' +
      '<line x1="10" y1="135" x2="292" y2="135" stroke="var(--line)" stroke-width="1.5"/>' +
      '<line x1="10" y1="12" x2="10" y2="135" stroke="var(--line)" stroke-width="1.5"/>' +
      `<path d="${d}" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>` +
      tag(mx, 78, labels.meas) + tag(tx, 12 + 0, '') + (labels.tx ? tag(tx - 22, 30, labels.tx) : '') + tag(opt.sleepX || 70, fy - 14, labels.sleep) +
      '<text x="290" y="152" text-anchor="end" font-size="13" fill="var(--ink-2)">time →</text>' +
      '<text x="16" y="152" font-size="13" fill="var(--ink-2)">current ↑</text>' +
      (opt.caption ? `<text x="290" y="16" text-anchor="end" font-size="13" font-weight="700" fill="var(--ink-2)">${opt.caption}</text>` : '') +
      '</svg>';
  };

  // «Say it in English»
  const SAY = (n, uk, en, evEn, evUk) => add({ id: 'say' + n, type: 'content', reveal: true,
    kicker: 'Say it in English · ' + n + '/7', title: uk,
    items: ['<b>' + en + '</b>', ...EV(evEn, evUk)] });
  // «Знайди помилку»
  const FM = (id, n, sentence, parts) => add({ id, type: 'mcq', kicker: 'Find the mistake · ' + n + '/3',
    prompt: (n === 1 ? K('<b>Example:</b> By Friday we <s>will finish</s> → <b>will have finished</b> it.') + '<br>' : '') + sentence + '<br>' + K('Tap the wrong part.'), options: parts });

  add({ id: 'title', type: 'title',
    kicker: 'Unit 6 · English for Computer Engineering',
    title: 'Low-Power Design',
    subtitle: 'Ten years on one battery' });

  /* ---------- Lead-in ---------- */
  add({ id: 'l1', type: 'mcq', kicker: 'Lead-in · 1/3',
    prompt: 'A water company installs a <b>smart water meter</b> in your basement. It runs on one battery.<br><b>How long should that battery last?</b>',
    options: ['6 months', '2 years', '10 years', '25 years'] });
  add({ id: 'l2', type: 'mcq', kicker: 'Lead-in · 2/3',
    prompt: 'A small sensor measures soil moisture and sends the result once an hour.<br><b>Which part uses the most energy, in your opinion?</b>',
    options: ['the microcontroller', 'the moisture sensor', 'the radio', 'the status LED'] });
  add({ id: 'l3', type: 'open', kicker: 'Lead-in · 3/3',
    prompt: 'Your fitness band needs charging every <b>7 days</b>. Your car key fob works for <b>3 years</b> on one coin cell.<br><b>Give one reason.</b> Use: <i>The key fob works longer because it …</i><br>' + K('Ideas: a screen? a radio? how often it works?'),
    placeholder: 'The key fob works longer because it …' });

  /* ---------- Vocabulary A: the energy budget ---------- */
  add({ id: 'v0', type: 'end', kicker: 'Vocabulary',
    title: 'Every microamp counts',
    text: 'The budget, the sleep and the hidden drains' });
  add({ id: 'vA1', type: 'content', kicker: 'Vocabulary · A · 1/4', title: 'A. The energy budget', items: [
    term('battery life', '/ˈbætəri ˌlaɪf/', 'ресурс (час роботи) батареї'),
    term('capacity', '/kəˈpæsəti/', 'ємність (батареї)'),
    term('milliamp-hour (mAh)', '/ˌmɪliˌæmp ˈaʊər/', 'міліампер-година'),
    term('to last', '/læst/', 'працювати, витримувати (певний час)')] });
  add({ id: 'vA2', type: 'content', kicker: 'Vocabulary · A · 2/4', title: 'A. The energy budget', items: [
    term('to draw (current)', '/drɔ/', 'споживати (струм) ' + K('· draw – drew – drawn')),
    term('average current', '/ˈævərɪdʒ ˈkɜrənt/', 'середній струм'),
    term('microamp (µA)', '/ˈmaɪkroʊˌæmp/', 'мікроампер ' + K('· 1 mA = 1,000 µA')),
    term('to drain', '/dreɪn/', 'розряджати («висаджувати») батарею')] });
  add({ id: 'vA3', type: 'content', kicker: 'Vocabulary · A · 3/4', title: 'A. The energy budget', items: [
    term('dead battery', '/ˌdɛd ˈbætəri/', 'розряджена батарея ' + K('· BrE flat battery')),
    term('energy budget', '/ˈɛnərdʒi ˌbʌdʒɪt/', 'енергетичний бюджет'),
    term('estimate', '/ˈɛstəmət/ (n.) · /ˈɛstəˌmeɪt/ (v.)', 'оцінка · оцінювати'),
    term('safety margin', '/ˈseɪfti ˌmɑrdʒɪn/', 'запас (надійності)')] });
  add({ id: 'vA4', type: 'content', reveal: true, kicker: 'Vocabulary · A · 4/4', title: 'Say the numbers', teaches: ['skill: reading numbers and units'], items: [
    SM('<b>27 µA</b> → twenty-seven <b>microamps</b><br><b>40 mA</b> → forty <b>milliamps</b>'),
    SM('<b>2,400 mAh</b> → two thousand four hundred <b>milliamp-hours</b>'),
    SM('<b>87,600</b> → eighty-seven thousand six hundred ' + K('(comma = thousands)')),
    SM('<b>0.1%</b> → zero <b>point</b> one <b>percent</b> ' + K('(point = decimals)'))] });
  add({ id: 'mA', type: 'match', kicker: 'A · Match',
    prompt: 'What does each word mean? Two options are extra.',
    left: ['capacity', 'to drain', 'safety margin', 'average current'],
    right: ['price of a cell', 'use up a battery', 'charge a battery stores', 'extra reserve', 'mean current', 'to charge a battery'] });
  add({ id: 'vAq1', type: 'mcq', kicker: 'A · Quick check · 1/3',
    prompt: 'A forgotten debug LED ___ the battery in three weeks.',
    options: ['lasted', 'estimated', 'drained', 'drew'] });
  add({ id: 'vAq2', type: 'mcq', kicker: 'A · Quick check · 2/3',
    prompt: 'Capacity: <b>1,000 mAh</b> (milliamp-hours). Average current: <b>1 mA</b>.<br><b>How long will the battery last?</b>',
    options: ['about 1,000 days', 'about 1,000 hours (six weeks)', 'about ten years', 'about one hour'] });
  add({ id: 'vAq3', type: 'gap', kicker: 'A · Quick check · 3/3',
    instruction: 'Say the number, then type the unit as a word.',
    prompt: '2,400 mAh ÷ 87,600 hours ≈ 27 ___',
    placeholder: 'micro…' });
  add({ id: 'vAq4', type: 'mcq', kicker: 'A · AmE or BrE?',
    prompt: 'In <b>American</b> English, a battery with no charge left is a ___ battery.',
    options: ['flat', 'lost', 'dead', 'low'] });

  /* ---------- Vocabulary B: sleeping well ---------- */
  add({ id: 'vB1', type: 'content', kicker: 'Vocabulary · B · 1/3', title: 'B. Sleeping well', items: [
    term('deep sleep', '/ˌdip ˈslip/', 'режим глибокого сну'),
    term('peripheral', '/pəˈrɪfərəl/', 'периферійний модуль ' + K('(UART, ADC, timers)')),
    term('to wake up', '/ˌweɪk ˈʌp/', 'пробуджувати(ся) ' + K('· a wake-up source')),
    term('real-time clock (RTC)', '/ˈriəlˌtaɪm ˈklɑk/', 'годинник реального часу')] });
  add({ id: 'vB2', type: 'content', kicker: 'Vocabulary · B · 2/3', title: 'B. Sleeping well', items: [
    term('interrupt', '/ˈɪntəˌrʌpt/', 'переривання ' + K('(a signal: “wake up now!”)')),
    term('duty cycle', '/ˈduti ˌsaɪkəl/', 'частка часу, коли пристрій активний'),
    term('to transmit', '/trænzˈmɪt/', 'передавати (по радіо)'),
    term('trade-off', '/ˈtreɪdˌɔf/', 'компроміс ' + K('· Unit 2'))] });
  add({ id: 'vB3', type: 'content', reveal: true, kicker: 'Vocabulary · B · 3/3', title: 'Read a power profile', teaches: ['concept: power profile'], items: [
    PROFILE({ meas: 'A', tx: 'B', sleep: 'C' }),
    SM('<b>C</b> — deep sleep: <b>2 µA</b>, almost all the time'),
    SM('<b>A</b> — the RTC wakes the MCU to read the sensor: <b>5 mA</b>, 50 ms'),
    SM('<b>B</b> — the radio transmits: <b>40 mA</b>, over a second')] });
  add({ id: 'mB', type: 'match', kicker: 'B · Match',
    prompt: 'What does each clue (1–4) describe? Two options are extra.',
    left: ['Wakes the MCU at 6:00 every day', 'Wakes it when a door opens', 'Share of time it is awake', 'UART, ADC, timers'],
    right: ['safety margin', 'interrupt', 'peripherals', 'real-time clock', 'duty cycle', 'capacity'] });
  add({ id: 'vBq1', type: 'mcq', kicker: 'B · Quick check · 1/2',
    prompt: PROFILE({ tx: 'A', sleep: 'B', meas: 'C' }, { tx: [236], meas: [30, 90, 150, 200], sleepX: 120 }) + '<b>Which letter shows the radio sending a packet?</b>',
    options: ['A', 'B', 'C'] });
  add({ id: 'vBq2', type: 'gap', kicker: 'B · Quick check · 2/2',
    instruction: 'A number only.',
    prompt: 'The device is awake <b>1 second</b> in every <b>1,000 seconds</b>.<br>Its duty cycle is ___ percent.',
    placeholder: '0.…' });

  /* ---------- Vocabulary C: hidden drains ---------- */
  add({ id: 'vC1', type: 'content', kicker: 'Vocabulary · C · 1/3', title: 'C. Hidden drains', items: [
    term('voltage regulator', '/ˈvoʊltɪdʒ ˈrɛɡjəˌleɪtər/', 'стабілізатор напруги'),
    term('quiescent current', '/kwiˈɛsənt ˈkɜrənt/', 'струм спокою ' + K('(flows even when nothing works)')),
    term('pull-up resistor', '/ˈpʊlˌʌp rɪˈzɪstər/', 'підтягувальний резистор'),
    term('leak', '/lik/', 'витік (струму)')] });
  add({ id: 'vC2', type: 'content', kicker: 'Vocabulary · C · 2/3', title: 'C. Hidden drains', items: [
    term('power gating', '/ˈpaʊər ˌɡeɪtɪŋ/', 'повне вимкнення живлення вузла, коли він не потрібен'),
    term('load switch', '/ˈloʊd ˌswɪtʃ/', 'ключ навантаження'),
    term('power profiler', '/ˈpaʊər ˌproʊfaɪlər/', 'аналізатор (профайлер) енергоспоживання'),
    term('self-discharge', '/ˌsɛlf ˈdɪsˌtʃɑrdʒ/', 'саморозряд')] });
  add({ id: 'vC3', type: 'content', kicker: 'Vocabulary · C · 3/3', title: 'C. Hidden drains', items: [
    term('peak current', '/ˌpik ˈkɜrənt/', 'піковий струм'),
    term('datasheet', '/ˈdeɪtəˌʃit/', 'технічний паспорт (компонента)'),
    term('supercapacitor', '/ˌsupərkəˈpæsətər/', 'суперконденсатор, іоністор'),
    term('energy harvesting', '/ˈɛnərdʒi ˌhɑrvɪstɪŋ/', 'збирання енергії з довкілля ' + K('(light, vibration, heat)'))] });
  add({ id: 'mC', type: 'match', kicker: 'C · Problem → fix',
    prompt: 'Which fix solves each problem? Two options are extra.',
    left: ['Sensor stays on while the MCU sleeps', 'Radio pulse causes a brownout', 'Multimeter shows only an average', 'Nobody can ever change the battery'],
    right: ['a power profiler', 'a faster CPU', 'a load switch', 'energy harvesting', 'a brighter LED', 'capacitor at the radio'] });
  add({ id: 'vCq1', type: 'mcq', kicker: 'C · Quick check · 1/3',
    prompt: 'The voltage regulator uses <b>5 µA</b> even when the whole board is asleep.<br><b>This 5 µA is its …</b>',
    options: ['peak current', 'duty cycle', 'self-discharge', 'quiescent current'] });
  add({ id: 'vCq2', type: 'gap', kicker: 'C · Quick check · 2/3',
    instruction: 'One word from C.',
    prompt: 'A new battery sits on a shelf for a year and loses a little charge. This is called ___.' });
  add({ id: 'vCq3', type: 'mcq', kicker: 'C · Quick check · 3/3',
    prompt: 'A solar-powered sensor needs energy at night, but it has no battery.<br><b>Where does it store the energy?</b>',
    options: ['in a load switch', 'in a supercapacitor', 'in a datasheet', 'in a pull-up resistor'] });

  /* ---------- Reading ---------- */
  add({ id: 'rB0', type: 'end', kicker: 'Reading',
    title: 'Ten Years on One Battery',
    text: 'A water meter in Chicago, a soil sensor in California, and nobody to change the battery' });
  add({ id: 'rP', type: 'mcq', kicker: 'Before you read · Predict',
    prompt: 'Which <b>two</b> ideas do you expect in the text? Choose the one you are <b>surest</b> about.',
    options: ['The device sleeps almost all the time.', 'Engineers use a bigger and bigger battery.', 'The radio transmits less often.', 'The device is connected to the grid at night.'] });

  const PARA = [
    'In a basement in Chicago, a water meter reports how much water a family uses. In a vineyard in California, a soil sensor tells farmers when to water the vines. Neither device is connected to the power grid, and nobody is going to climb down to the basement or walk through the vineyard to change a battery every few months. Customers expect these devices to run for ten years or more on a single battery. For an embedded engineer, that turns <b>battery life</b> into the first design requirement, not the last.',
    'The starting point is an <b>energy budget</b>. A typical lithium AA cell for such devices stores about 2,400 <b>milliamp-hours</b> (mAh). Ten years is roughly 87,600 hours, so the device can <b>draw</b> an <b>average current</b> of no more than about 27 <b>microamps</b> (µA). That is hundreds of times less than a single indicator LED draws. Every design decision — the microcontroller, the radio, the sensors, even a single resistor — is checked against this number.',
    'The secret is that a low-power device spends almost all its life asleep. In <b>deep sleep</b>, a modern microcontroller switches off its CPU and most of its <b>peripherals</b> and draws only one or two microamps. A <b>real-time clock</b> (RTC) or an external <b>interrupt</b> <b>wakes</b> it <b>up</b>; the device takes a measurement, does a little processing and goes back to sleep within milliseconds. The fraction of time the device is awake is called the <b>duty cycle</b>. In a well-designed sensor, it is often below 0.1 percent.',
    'The radio is usually the most expensive item in the budget. A microcontroller reading a sensor might draw 5 milliamps for 50 milliseconds, but a radio sending a packet can draw 40 milliamps for more than a second. In a typical design, the radio is responsible for more than 80 percent of the energy. So engineers <b>transmit</b> less often, send fewer bytes and pack several readings into one message. The <b>trade-off</b> is clear: the less often a device reports, the longer its battery <b>lasts</b>, but the older the data is when it arrives.',
    'Then come the hidden <b>drains</b>. A <b>voltage regulator</b> has its own <b>quiescent current</b>, which flows even when nothing else is running. A <b>pull-up resistor</b> can waste current through a pin that is held low. A sensor that stays powered while the microcontroller sleeps may quietly use more energy than everything else together. A common fix is <b>power gating</b>: a <b>load switch</b> disconnects the sensor completely until it is needed.',
    'Finding these <b>leaks</b> requires the right instrument. An ordinary multimeter shows an average and cannot follow a current that jumps from 2 µA to 40 mA in a microsecond. Engineers use a <b>power profiler</b>, which records current over time and shows exactly which task is <b>draining</b> the battery. The first measurement of a new board is often a surprise.',
    'The battery itself is not a perfect tank of energy. It loses a little charge every year through <b>self-discharge</b>, and in the cold it delivers less of its <b>capacity</b>. It also limits the <b>peak current</b>: if the radio demands a high pulse from a small cell, the voltage can drop for a moment and cause a brownout reset. A capacitor placed next to the radio supplies the short pulse, so the battery only has to deliver a smaller, steadier current.',
    'With all these numbers, engineers produce a battery-life <b>estimate</b>. A typical one might say: “With hourly reports, the sensor <b>will be drawing</b> about 19 µA on average. In theory, the battery <b>will last</b> more than 14 years; after self-discharge and cold winters, it <b>is likely to last</b> about 11. If it is installed this year, by 2036 the meter <b>will have sent</b> roughly 87,600 messages.” Because <b>datasheet</b> figures are measured in ideal conditions, careful teams add a <b>safety margin</b> of 20 to 30 percent.',
    'Some designers are going further. With <b>energy harvesting</b>, a device collects energy from light, vibration or heat and stores it in a <b>supercapacitor</b>. Battery-free sensors are still rare, but they <b>are likely to</b> become common as microcontrollers need less and less power. Until then, the battery is the budget, and every microamp counts.'
  ];
  const para = (n) => add({ id: 'r' + n, type: 'content', kicker: 'Reading · Ten Years on One Battery',
    title: 'Paragraph ' + n + ' of 9', items: [SM(PARA[n - 1])] });

  para(1);
  add({ id: 'q1', type: 'mcq', kicker: 'Reading · Check · 1/9',
    prompt: 'Why is battery life “the first design requirement” for these devices?',
    options: ['Lithium batteries are very expensive.', 'Nobody is going to change the battery for years.', 'The devices are connected to the power grid.', 'Customers prefer very small devices.'] });
  para(2);
  add({ id: 'q2', type: 'gap', kicker: 'Reading · Check · 2/9',
    instruction: 'A number from the text.',
    prompt: 'To last ten years on 2,400 mAh, the energy budget allows no more than about ___ µA on average.' });
  para(3);
  add({ id: 'q3', type: 'mcq', kicker: 'Reading · Check · 3/9',
    prompt: 'What can wake up the microcontroller?',
    options: ['the radio', 'the battery', 'an RTC or an external interrupt', 'a power profiler'] });
  para(4);
  add({ id: 'q4', type: 'mcq', kicker: 'Reading · Check · 4/9',
    prompt: 'Why do engineers pack several readings into one message?',
    options: ['The radio uses most of the energy.', 'The sensor is too slow.', 'Customers want older data.', 'The microcontroller has no memory.'] });
  para(5);
  add({ id: 'q5', type: 'mcq', kicker: 'Reading · Check · 5/9',
    prompt: 'What does the load switch do in paragraph 5?',
    options: ['It holds a pin low.', 'It wakes up the microcontroller.', 'It measures the quiescent current.', 'It cuts power to the sensor until it is needed.'] });
  para(6);
  add({ id: 'q6', type: 'mcq', kicker: 'Reading · Check · 6/9',
    prompt: 'Why can’t an ordinary multimeter find these leaks?',
    options: ['It shows an average and misses fast jumps.', 'It only measures voltage.', 'It drains the battery itself.', 'It cannot measure microamps at all.'] });
  para(7);
  add({ id: 'q7', type: 'mcq', kicker: 'Reading · Check · 7/9',
    prompt: 'Why do engineers put a capacitor next to the radio?',
    options: ['to store data between messages', 'to supply the short pulse, so the battery gives a steadier current', 'to stop self-discharge in the cold', 'to make the radio transmit more often'] });
  para(8);
  add({ id: 'q8', type: 'gap', kicker: 'Reading · Check · 8/9',
    instruction: 'A number from the text.',
    prompt: 'In theory, the battery will last more than 14 years. In real life, it is likely to last about ___ years.' });
  add({ id: 'q8b', type: 'mcq', kicker: 'Reading · Check · 8/9 · Why?',
    prompt: 'Why do careful teams add a safety margin of 20–30 percent?',
    options: ['Customers ask for it.', 'Datasheet figures come from ideal conditions.', 'Batteries get cheaper every year.', 'The radio needs it to transmit.'] });
  para(9);
  add({ id: 'q9', type: 'mcq', kicker: 'Reading · Check · 9/9',
    prompt: 'What does the author say about battery-free sensors?',
    options: ['They are already everywhere.', 'They will never work.', 'They are rare now but likely to become common.', 'They need bigger microcontrollers.'] });
  const FIND = [
    ['without anyone noticing', 'Paragraph 5'],
    ['more stable, with fewer jumps', 'Paragraph 7'],
    ['not common, seldom seen', 'Paragraph 9']
  ];
  FIND.forEach((f, i) => add({ id: 'f' + (i + 1), type: 'gap', kicker: 'Find it in the text · ' + (i + 1) + '/3',
    instruction: 'One word. ' + K(f[1]),
    prompt: f[0] + ' → ___' }));
  add({ id: 'rL', type: 'mcq', kicker: 'Reading · Back to the lead-in',
    prompt: 'In the lead-in, you guessed which part uses the most energy. <b>What does the text say?</b>',
    options: ['the status LED', 'the microcontroller', 'the moisture sensor', 'the radio'] });

  /* ---------- Grammar ---------- */
  add({ id: 'g0', type: 'end', kicker: 'Grammar',
    title: 'Predictions and estimates',
    text: 'How will the device live — and how sure are you?' });
  add({ id: 'gN', type: 'content', reveal: true, kicker: 'Grammar · Notice',
    title: 'Four ways to talk about the future', items: [
      SM('It <b>will last</b> over 14 years. ' + K('→ a calculation')),
      SM('It <b>will be drawing</b> about 19 µA. ' + K('→ in progress then')),
      SM('By 2036 it <b>will have sent</b> 87,600 messages. ' + K('→ a total by then')),
      SM('It <b>is likely to last</b> about 11 years. ' + K('→ how probable'))] });

  // Rule 1
  add({ id: 'g1a', type: 'content', reveal: true, kicker: 'Grammar · Rule 1',
    title: 'will or be going to?', items: [
      SM('<b>will</b>: from a <b>calculation</b>, experience or opinion<br>With hourly reports, the battery <b>will last</b> about 11 years.'),
      SM('<b>be going to</b>: from what you <b>see now</b><br>The voltage is falling — the meter <b>is going to shut down</b>.'),
      ...EV('Look at those clouds — it’s <b>going to rain</b>.', 'Глянь на ці хмари — зараз буде дощ.')] });
  add({ id: 'e1_1', type: 'mcq', kicker: 'Rule 1 · Practice · 1/3',
    prompt: 'Our spreadsheet says: 2,400 mAh at 19 µA.<br>The battery ___ about 14 years in theory.',
    options: ['is going to last', 'will last', 'lasts', 'is lasting'] });
  add({ id: 'e1_2', type: 'mcq', kicker: 'Rule 1 · Practice · 2/3',
    prompt: 'The profiler shows the current climbing fast toward the cell’s limit.<br>Watch out — it ___ a brownout!',
    options: ['will have caused', 'is likely causing', 'is going to cause', 'causes'] });
  add({ id: 'e1_3', type: 'mcq', kicker: 'Rule 1 · Practice · 3/3',
    prompt: 'Which sentence is a prediction <b>from what you see now</b>?',
    options: ['I think the customer will accept a daily report.', 'The LED is getting dimmer — the battery is going to die.', 'The radio will draw 40 mA.', 'The meter will last 11 years.'] });

  // Rule 2
  add({ id: 'g2a', type: 'content', reveal: true, kicker: 'Grammar · Rule 2',
    title: 'will be + -ing: in progress in the future', items: [
      SM('<b>A moment:</b> At 3 a.m., the sensor <b>will be sleeping</b>.'),
      SM('<b>A period:</b> For ten years, it <b>will be sending</b> data every hour.'),
      SM('<b>An average:</b> It <b>will be drawing</b> about 19 µA.'),
      ...EV('Don’t call me at eight — I’<b>ll be driving</b>.', 'Не дзвони мені о восьмій — я буду за кермом.')] });
  add({ id: 'e2_1', type: 'gap', kicker: 'Rule 2 · Practice · 1/2',
    instruction: K('<b>Example:</b> At noon, the radio <b>will be transmitting</b>.') + ' Use will be + -ing.',
    prompt: 'Don’t try to read the meter at 3 a.m. — it ___ (sleep).',
    placeholder: 'will be …' });
  add({ id: 'e2_2', type: 'mcq', kicker: 'Rule 2 · Practice · 2/2',
    prompt: 'This time next year, about 10,000 of our sensors ___ in vineyards.',
    options: ['will run', 'will be running', 'are going to have run', 'run'] });

  // Rule 3
  add({ id: 'g3a', type: 'content', reveal: true, kicker: 'Grammar · Rule 3',
    title: 'will have + V3: finished before a future point', items: [
      SM('By 2036, the meter <b>will have sent</b> 87,600 messages.'),
      SM('<b>By the time</b> the technician <b>arrives</b>, the battery <b>will have drained</b>.<br>✅ arrives ❌ will arrive ' + K('(as in Unit 3)')),
      ...EV('By the time you <b>get</b> here, we’<b>ll have eaten</b> everything.', 'Поки ти сюди доберешся, ми вже все з’їмо.')] });
  add({ id: 'e3_1', type: 'gap', kicker: 'Rule 3 · Practice · 1/3',
    instruction: 'Use will have + V3.',
    prompt: 'By the end of the test, the sensor ___ (send) 2,000 packets.',
    placeholder: 'will have …' });
  FM('fm1', 1, 'By the time winter will come, we will have installed 5,000 meters.', ['By the time', 'winter will come', 'we will have installed', '5,000 meters']);
  add({ id: 'e3_2', type: 'mcq', kicker: 'Rule 3 · Practice · 2/3',
    prompt: 'A sensor reports <b>once an hour</b>. You install it today.<br><b>By this time next week, it will have sent …</b>',
    options: ['24 messages', '7 messages', '168 messages', '1,000 messages'] });
  add({ id: 'g23', type: 'content', reveal: true, kicker: 'Grammar · Rules 2 + 3',
    title: 'in progress or finished?', items: [
      SM('In 2030 the meter <b>will be sending</b> data. ' + K('→ still working then')),
      SM('By 2030 the meter <b>will have sent</b> 35,000 messages. ' + K('→ a total, counted at that point')),
      SM(K('Hint: <b>by</b> + time → usually will have + V3'))] });
  add({ id: 'e3_3', type: 'mcq', kicker: 'Rule 3 · Practice · 3/3',
    prompt: 'By 2030, the first meters ___ about 40 percent of their capacity.',
    options: ['will be using', 'will have used', 'are going to use', 'will use'] });
  FM('fm2', 2, 'By Friday, the profiler will have record every wake-up.', ['By Friday', 'the profiler', 'will have record', 'every wake-up']);

  // Rule 4
  add({ id: 'g4a', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 1/2',
    title: 'How probable? (Unit 5 → the future)', items: [
      SM('Unit 5: it <b>must have</b> stopped · it <b>might be</b> floating ' + K('(now and the past)')),
      SM('<b>The future:</b><br>●●●●● <b>will definitely · is bound to</b><br>●●●●○ <b>will probably · is likely to</b><br>●●●○○ <b>may well</b><br>●●○○○ <b>might · could</b><br>●○○○○ <b>probably won’t · is unlikely to</b>')] });
  add({ id: 'g4c', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 2/2',
    title: 'Use and word order', items: [
      SM('After cold winters, the battery <b>is likely to last</b> about 11 years.'),
      SM('The cell <b>is unlikely to survive</b> ten winters at −30 °C.'),
      SM('✅ will <b>probably</b> last · <b>probably</b> won’t last<br>❌ won’t probably last')] });
  add({ id: 'g4b', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · Everyday English',
    title: 'Now say it: everyday English', items: [
      ...EV('The train <b>is likely to be</b> late again.', 'Потяг, найпевніше, знову запізниться.'),
      ...EV('She <b>probably won’t</b> come — she’s sick.', 'Вона, мабуть, не прийде — захворіла.')] });
  add({ id: 'e4_1', type: 'mcq', kicker: 'Rule 4 · Practice · 1/3',
    prompt: 'Without power gating, the sensor ___ the battery in under two years.<br>' + K('(= it is probable)'),
    options: ['is likely to drain', 'is unlikely to drain', 'might have drained', 'can’t drain'] });
  FM('fm3', 3, 'The cell won’t probably survive ten winters at −30 °C.', ['The cell', 'won’t probably', 'survive', 'ten winters at −30 °C']);
  add({ id: 'e4_2', type: 'gap', kicker: 'Rule 4 · Practice · 2/3',
    instruction: 'One word.',
    prompt: 'A pull-up resistor on a pin that is always low is ___ to waste current. ' + K('(= it will definitely happen)') });
  add({ id: 'e4_3', type: 'mcq', kicker: 'Rule 4 · Practice · 3/3',
    prompt: 'The datasheet says 1 µA, but nobody has measured it yet.<br>Which sentence is the most honest?',
    options: ['The board will definitely draw 1 µA.', 'The board is bound to draw 1 µA.', 'The board must have drawn 1 µA.', 'The board may well draw more than 1 µA.'] });

  // Rule 5
  add({ id: 'g5a', type: 'content', reveal: true, kicker: 'Grammar · Rule 5',
    title: 'Approximate numbers', items: [
      SM('<b>about · around · roughly</b> 27 µA ' + K('≈')),
      SM('<b>just under</b> 20 µA ' + K('(19.8)') + ' · <b>just over</b> 20 µA ' + K('(20.3)')),
      SM('<b>up to</b> 40 mA ' + K('(max)') + ' · <b>at least</b> 20 percent ' + K('(min)') + ' · <b>no more than</b> 27 µA'),
      SM('<b>on average</b> = over a long time')] });
  add({ id: 'e5_1', type: 'match', kicker: 'Rule 5 · Match',
    prompt: 'Which phrase fits each number? Two options are extra.',
    left: ['19.8 µA', '20.3 µA', 'max 40 mA', 'min 20% margin'],
    right: ['just over 20 µA', 'up to 40 mA', 'exactly 20 µA', 'at least 20 percent', 'just under 20 µA', 'no more than 20%'] });
  add({ id: 'e5_2', type: 'open', kicker: 'Grammar · Your turn',
    prompt: PROFILE({}, { caption: 'sleep 3 µA · radio 45 mA' }) + 'Estimate: <b>9.6 years</b>. Write <b>one sentence</b> with an approximate number + <b>will</b> or <b>is likely to</b>.',
    placeholder: 'The battery is likely to last just under …' });

  /* ---------- Say it in English ---------- */
  SAY(1, 'Із погодинними звітами батарея працюватиме приблизно 11 років.',
    'With hourly reports, the battery will last about 11 years.',
    'The repair <b>will take</b> about a week.', 'Ремонт займе десь тиждень.');
  SAY(2, 'Напруга падає — лічильник от-от вимкнеться.',
    'The voltage is falling — the meter is going to shut down.',
    'Hurry up — we’re <b>going to miss</b> the bus!', 'Швидше — ми зараз проґавимо автобус!');
  SAY(3, 'О третій ночі датчик спатиме.',
    'At 3 a.m., the sensor will be sleeping.',
    'This time tomorrow, I’<b>ll be lying</b> on the beach.', 'Завтра о цій порі я лежатиму на пляжі.');
  add({ id: 'sq1', type: 'mcq', kicker: 'Say it · Quick check',
    prompt: '«Наступного року о цій порі наші датчики працюватимуть у трьох країнах».<br>This time next year, our sensors ___ in three countries.',
    options: ['will have worked', 'are working', 'will be working', 'work'] });
  SAY(4, 'До 2036 року лічильник надішле приблизно 87 600 повідомлень.',
    'By 2036, the meter will have sent roughly 87,600 messages.',
    'By June, I’<b>ll have saved</b> enough for a new laptop.', 'До червня я вже назбираю на новий ноутбук.');
  SAY(5, 'Поки технік приїде, батарея вже розрядиться.',
    'By the time the technician arrives, the battery will have drained.',
    'By the time we <b>get</b> there, the store <b>will have closed</b>.', 'Поки ми туди доїдемо, крамниця вже зачиниться.');
  add({ id: 'sq2', type: 'mcq', kicker: 'Say it · Quick check',
    prompt: '«Батарея, найімовірніше, не витримає десяти зим».',
    options: ['The battery won’t probably survive ten winters.', 'The battery probably won’t survive ten winters.', 'The battery is likely to survive ten winters.', 'The battery can’t have survived ten winters.'] });
  SAY(6, 'Без вимкнення живлення датчик, найпевніше, розрядить батарею менш ніж за два роки.',
    'Without power gating, the sensor is likely to drain the battery in under two years.',
    'Prices <b>are likely to go up</b> again in spring.', 'Ціни, найпевніше, знову зростуть навесні.');
  SAY(7, 'Радіо може споживати до 40 міліампер трохи більше ніж секунду.',
    'The radio can draw up to 40 milliamps for just over a second.',
    'The trip takes <b>just under</b> three hours.', 'Поїздка триває трохи менше ніж три години.');

  /* ---------- Keyword drill ---------- */
  add({ id: 'k0', type: 'content', kicker: 'Keyword drill', title: 'Build the sentence', items: [
    'You see only the <b>keywords</b> from the text, in the right order.',
    'Add articles and prepositions. Choose the tense.',
    'Say your sentence → compare → repeat the target 3 times.'] });
  const KW = [
    ['nobody · going · climb down · basement · change · battery · every few months',
      '<b>Nobody</b> is <b>going</b> to <b>climb down</b> to the <b>basement</b> to <b>change</b> a <b>battery every few months</b>.',
      'Ніхто не спускатиметься в підвал, щоб міняти батарейку кожні кілька місяців.'],
    ['device · draw · average current · no more than · 27 microamps',
      'The <b>device</b> can <b>draw</b> an <b>average current</b> of <b>no more than</b> about <b>27 microamps</b>.',
      'Пристрій може споживати середній струм не більше ніж близько 27 мікроамперів.'],
    ['less often · device · report · longer · battery · last',
      'The <b>less often</b> a <b>device reports</b>, the <b>longer</b> its <b>battery lasts</b>.',
      'Що рідше пристрій звітує, то довше працює його батарея.'],
    ['sensor · stay · powered · may · quietly · use · more energy',
      'A <b>sensor</b> that <b>stays powered</b> while the MCU sleeps <b>may quietly use more energy</b> than everything else.',
      'Датчик, що лишається під живленням, поки мікроконтролер спить, може непомітно споживати більше енергії, ніж усе інше.'],
    ['battery · likely · last · about 11 years',
      'After self-discharge and cold winters, the <b>battery</b> is <b>likely</b> to <b>last about 11 years</b>.',
      'З урахуванням саморозряду й холодних зим батарея, найпевніше, пропрацює близько 11 років.'],
    ['by 2036 · meter · send · roughly · 87,600 messages',
      '<b>By 2036</b>, the <b>meter</b> will have <b>sent roughly 87,600 messages</b>.',
      'До 2036 року лічильник надішле приблизно 87 600 повідомлень.']
  ];
  const kw = (i) => add({ id: 'k' + (i + 1), type: 'content', reveal: true,
    kicker: 'Keyword drill · ' + (i + 1) + '/6', title: KW[i][0], items: [KW[i][1], K(KW[i][2])] });
  kw(0); kw(1); kw(2);
  add({ id: 'kq', type: 'mcq', kicker: 'Keyword drill · Halfway',
    prompt: 'Which sentence from the drill describes a <b>trade-off</b> with <b>the …-er, the …-er</b> (Unit 2)?',
    options: ['Nobody is going to climb down…', 'The device can draw…', 'The less often a device reports…', 'none of them'] });
  kw(3); kw(4); kw(5);

  /* ---------- Speaking A: paraphrase chain ---------- */
  add({ id: 'spA0', type: 'end', kicker: 'Speaking',
    title: 'Talk like a power engineer',
    text: 'Three short tasks, then a recommendation to a customer' });
  add({ id: 'spA1', type: 'content', reveal: true, kicker: 'Speaking A · Paraphrase chain', format: 'paraphrase',
    title: 'One fact, three ways', items: [
      'The teacher shows <b>one fact</b>. Student 1 says it with <b>will</b>.',
      'Student 2 says the same fact with <b>is likely to</b> or <b>probably won’t</b>.',
      'Student 3 turns it into a total with <b>By … , it will have …</b>'] });
  add({ id: 'spA1b', type: 'content', kicker: 'Speaking A · Example', title: 'How it sounds', items: [
      SM('<b>Example.</b> Fact: <i>hourly reports, 11 years</i><br>1 → <i>With hourly reports, the battery will last about 11 years.</i><br>2 → <i>The battery is likely to last about 11 years.</i><br>3 → <i>By 2036, the meter will have sent roughly 87,600 messages.</i>')] });
  add({ id: 'spA2', type: 'content', reveal: true, kicker: 'Speaking A · One student at a time',
    title: 'Facts for the chain', items: [
      SM('📟 <b>1.</b> Parking sensor · report every <b>10 minutes</b> · battery <b>5 years</b>'),
      SM('🌡️ <b>2.</b> Fridge logger · <b>1 reading a minute</b> · battery <b>2 years</b>'),
      SM('🐄 <b>3.</b> Cow collar · GPS fix every <b>15 minutes</b> · battery <b>just under 3 years</b>'),
      SM('🚲 <b>4.</b> Bike lock · wakes on an <b>interrupt</b> only · battery <b>up to 7 years</b>')] });

  /* ---------- Speaking B: compare two power profiles ---------- */
  add({ id: 'spB1', type: 'content', kicker: 'Speaking B · Read the graphs', format: 'describe-compare',
    title: 'Firmware 1.0 vs Firmware 2.0', items: [
      PROFILE({}, { floor: 104, caption: 'v1.0 · sleep 40 µA · ≈ 4 years' }),
      PROFILE({}, { floor: 124, caption: 'v2.0 · sleep 2 µA · ≈ 11 years' })] });
  add({ id: 'spB2', type: 'content', reveal: true, kicker: 'Speaking B · One student at a time',
    title: 'Compare and predict', items: [
      SM('<b>1 · Difference:</b> <i>In 2.0, the sleep current is much / far lower …</i>'),
      SM('<b>2 · Why:</b> <i>It looks like the sensor stays powered in 1.0 …</i>'),
      SM('<b>3 · Prediction:</b> <i>With 2.0, the battery is likely to last …</i>'),
      SM(K('Unit 2: much / far lower · the lower …, the longer … · Unit 5: it looks like …'))] });
  add({ id: 'spB3', type: 'mcq', kicker: 'Speaking B · Listeners',
    prompt: 'What cause did the <b>last speaker</b> give for the high sleep current in 1.0?',
    options: ['a sensor left powered', 'a pull-up on a low pin', 'the regulator’s quiescent current', 'a different cause'] });

  /* ---------- Speaking C: negotiate (teacher = product manager) ---------- */
  add({ id: 'spC1', type: 'content', kicker: 'Speaking C · Push back with numbers', format: 'negotiate',
    title: '“I want a report every minute!”', items: [
      '<b>The teacher</b> is a product manager. <b>One student at a time</b> answers.',
      SM('<b>Your data</b> (2,400 mAh cell):<br>every minute → <b>≈ 1 mA</b> average → about <b>3 months</b><br>every 10 minutes → <b>≈ 100 µA</b> → about <b>2 years</b><br>every hour → <b>≈ 19 µA</b> → about <b>11 years</b>'),
      '<b>Goal:</b> agree on a rate the battery can live with.'] });
  add({ id: 'spC2', type: 'content', reveal: true, kicker: 'Speaking C · Patterns', title: 'Say no — politely, with numbers', items: [
    SM('<b>I see why you want that, but</b> if we report every minute, the battery <b>is going to be dead</b> in about three months.'),
    SM('<b>By the time</b> the first winter <b>ends</b>, every meter <b>will have drained</b> its battery.'),
    SM('<b>What if we</b> report every hour <b>and</b> send an alarm at once if something goes wrong?'),
    SM('<b>That way</b>, the battery <b>is likely to last</b> about 11 years.')] });
  add({ id: 'spC3', type: 'mcq', kicker: 'Speaking C · Result',
    prompt: 'Which rate did the class and the “manager” agree on?',
    options: ['every minute', 'every 10 minutes', 'every hour + instant alarms', 'no agreement'] });

  /* ---------- Final task: recommend a design (persuade) ---------- */
  add({ id: 'fr0', type: 'end', kicker: 'Final task',
    title: 'Which design should we build?',
    text: 'A customer needs a soil sensor. You recommend one design.' });
  add({ id: 'fr1', type: 'content', kicker: 'Final task · The customer', title: 'What the vineyard needs', items: [
    SM('🍇 <b>at least one reading an hour</b>'),
    SM('🔋 <b>10 years</b> without a battery change'),
    SM('❄️ winters down to <b>−10 °C</b>, some weeks of fog'),
    SM('💰 <b>as cheap as possible</b>: 2,000 sensors')] });
  add({ id: 'fr2', type: 'content', kicker: 'Final task · Design cards', title: 'Three options', items: [
    SM('<b>A.</b> coin cell <b>220 mAh</b> · Bluetooth every 10 s · <b>25 µA</b> → about <b>1 year</b> · cheapest'),
    SM('<b>B.</b> lithium AA <b>2,400 mAh</b> · long-range radio hourly · <b>19 µA</b> → about <b>11 years</b> · needs a capacitor for the radio pulse'),
    SM('<b>C.</b> solar cell + supercapacitor · no battery · reading every 15 min · data gaps in foggy weeks · most expensive')] });
  add({ id: 'fr3', type: 'mcq', kicker: 'Final task · Vote',
    prompt: 'Which design would <b>you</b> recommend to the vineyard?',
    options: ['A — coin cell + Bluetooth', 'B — lithium AA + long-range radio', 'C — solar + supercapacitor'] });
  add({ id: 'fr4', type: 'content', reveal: true, kicker: 'Final task · Four moves', format: 'persuade',
    title: 'Recommend it in four moves', items: [
      SM('<b>1. Choice:</b> <i>I’d recommend design …, mainly because …</i>'),
      SM('<b>2. Estimate:</b> <i>With …, the battery will last / is likely to last …</i>'),
      SM('<b>3. Risk:</b> <i>The main risk is … It may well … / It is unlikely to …</i>'),
      SM('<b>4. Total:</b> <i>By 20…, each sensor will have sent about … readings.</i>')] });
  add({ id: 'fr5', type: 'content', kicker: 'Final task · Example', title: 'How it sounds', items: [
    SM('<i>I’d recommend design <b>A</b>, mainly because it is the cheapest. With Bluetooth every ten seconds, the battery <b>will last</b> only about a year, so it <b>is unlikely to</b> meet the ten-year goal. The main risk is cost later: by 2036, the vineyard <b>will have changed</b> about 20,000 batteries.</i>'),
    SM(K('A deliberately weak choice — can you do better with B or C?'))] });
  add({ id: 'fr6', type: 'open', kicker: 'Final task · Get ready',
    prompt: 'Write <b>Move 4</b> for your design: one sentence with <b>By … , … will have …</b> and a number.<br>' + K('1 reading an hour ≈ 8,760 a year · every 15 min ≈ 35,000 a year'),
    placeholder: 'By 2036, each sensor will have sent about …' });
  add({ id: 'fr7', type: 'content', kicker: 'Final task · One student at a time', title: 'While you listen', items: [
    'Which design? Which <b>estimate</b>?',
    'Did the speaker use <b>will / is likely to / by … will have</b>?',
    'Was there an <b>approximate number</b> (about, just under, up to)?',
    'The teacher (the customer) will ask: <b>“What if the winter is colder?”</b>'] });
  add({ id: 'fr8', type: 'mcq', kicker: 'Final task · Listeners',
    prompt: 'Which <b>risk</b> did the last speaker name?',
    options: ['cold winters / self-discharge', 'radio pulse / brownout', 'foggy weeks / data gaps', 'cost of batteries'] });

  add({ id: 'end', type: 'end', kicker: 'Unit 6',
    title: 'The battery is the budget.',
    text: 'Sleep deeply, transmit rarely — and every microamp counts.' });

  // Логіка подачі для check_lesson.js (рушій ці поля ігнорує)
  const R1 = 'rule 1: will vs be going to', R2 = 'rule 2: will be + -ing', R3 = 'rule 3: will have + V3',
    R4 = 'rule 4: likely · bound to · probably won’t', R5 = 'rule 5: approximate numbers',
    NUM = 'skill: reading numbers and units', PP = 'concept: power profile';
  const TEACHES = { g1a: [R1], g2a: [R2], g3a: [R3], g4a: [R4], g4c: [R4], g5a: [R5] };
  const NEEDS = {
    l1: [], l2: [], rP: [], rL: [],
    vAq1: ['to drain'], vAq2: ['capacity', 'to last', 'milliamp-hour (mAh)', NUM], vAq4: ['dead battery'], vCq3: ['supercapacitor'], vAq3: ['microamp (µA)', NUM],
    vBq1: [PP, 'to transmit'], vBq2: ['duty cycle', NUM],
    vCq1: ['quiescent current', 'voltage regulator'], vCq2: ['self-discharge'],
    q1: ['battery life'], q2: ['average current', 'energy budget', NUM], q3: ['real-time clock (RTC)', 'interrupt', 'to wake up'], q4: ['to transmit', 'trade-off'], q5: ['load switch'],
    q6: ['leak'], q7: ['peak current'], q8: ['estimate'], q8b: ['safety margin', 'datasheet'], q9: [],
    f1: [], f2: [], f3: [],
    e1_1: [R1], e1_2: [R1, 'brownout'], e1_3: [R1], e2_1: [R2], e2_2: [R2],
    e3_1: [R3], e3_2: [R3], e3_3: [R2, R3, 'capacity'], fm1: [R3], fm2: [R3, 'power profiler'],
    e4_1: [R4, 'power gating', 'to drain'], e4_2: [R4, 'pull-up resistor'], e4_3: [R4, 'datasheet'], fm3: [R4],
    e5_1: [R5], e5_2: [R5, R1, R4, PP],
    sq1: [R2], sq2: [R4], kq: [],
    spB3: [PP], spC3: [], fr3: [], fr6: [R3], fr8: ['self-discharge', 'brownout']
  };
  S.forEach((s) => {
    if (TEACHES[s.id]) s.teaches = [...(s.teaches || []), ...TEACHES[s.id]];
    if (!['mcq', 'gap', 'open', 'match'].includes(s.type)) return;
    if (s.needs === undefined) s.needs = NEEDS[s.id] || [];
  });

  window.LESSON = {
    id: 'esp-ki-unit6',
    title: 'Unit 6 · Low-Power Design',
    known: ['battery', 'sensor', 'LED', 'radio', 'microcontroller', 'MCU', 'firmware', 'current', 'voltage', 'resistor', 'capacitor',
      'packet', 'multimeter', 'brownout', 'message', 'data'],
    slides: S
  };
})();

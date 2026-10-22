/* =========================================================================
   Unit 4 · Embedded and IoT Security: Closing the Back Doors
   ESP · Комп'ютерна інженерія · B1
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Послідовність: Lead-in · Лексика A–D + «You will need these too» ·
   Grammar 1–4 · Terminological traps · Reading · Keyword drill ·
   Dialogues · Say it in English · Speaking A–B · Final: security briefing.
   Меж занять у презентації немає.
   ========================================================================= */
(function () {
  const K = (s) => '<span class="muted">' + s + '</span>';
  const IMG = 'lessons/esp-ki-unit4/reading.jpg';
  const RD = (h) => '<span style="display:block;font-size:17px;line-height:1.42">' + h + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  const blankN = (n) => '<span class="blank">' + n + '</span>';

  const S = [];
  const add = (o) => S.push(o);

  // «Знайди помилку» (mcq: торкнися хибної частини)
  const FM = (id, n, sentence, parts) => add({ id, type: 'mcq', kicker: 'Find the mistake · ' + n + '/8',
    prompt: (n === 1 ? K('<b>Example:</b> The firmware <s>are</s> → <b>is</b> signed.') + '<br>' : '') + sentence + '<br>' + K('Tap the wrong part.'),
    options: parts });
  // «Say it in English»: UA технічне → EN → 💬 UA розмовне → EN
  const SAY = (n, uk, en, evEn, evUk) => add({ id: 'say' + n, type: 'content', reveal: true,
    kicker: 'Say it in English · ' + n + '/11', title: uk,
    items: [SM('<b>' + en + '</b>'), ...EV(evEn, evUk)] });

  add({ id: 'title', type: 'title',
    kicker: 'Unit 4 · English for Computer Engineering',
    title: 'Embedded and IoT Security',
    subtitle: 'Closing the back doors' });

  /* ---------- Lead-in ---------- */
  add({ id: 'l1', type: 'mcq', kicker: 'Lead-in · 1/3',
    prompt: 'You buy a Wi-Fi camera, plug it in, and it works at once. You never set a password.<br><b>Is that good design or bad design?</b>',
    options: ['Good design', 'Bad design', 'It depends'] });
  add({ id: 'l2', type: 'mcq', kicker: 'Lead-in · 2/3',
    prompt: 'Someone steals one of your <b>smart locks</b>. They have a <b>screwdriver</b> and a laptop.<br><b>What would they try first?</b>',
    options: ['open the case, connect a cable', 'guess the app password', 'break it with a hammer', 'call the support line'] });
  add({ id: 'l3', type: 'mcq', kicker: 'Lead-in · 3/3',
    prompt: 'Someone hacks a connected device.<br><b>For which device would that be more dangerous?</b>',
    options: ['a smart light bulb', 'an insulin pump'] });

  /* ---------- Vocabulary ---------- */
  add({ id: 'v0', type: 'end', kicker: 'Vocabulary',
    title: 'Words for attacks and defenses',
    text: 'American spelling and pronunciation, as in industry documentation.' });

  add({ id: 'vA1', type: 'content', kicker: 'Vocabulary · A · 1/2', title: 'A. Threats and attacks', items: [
    term('vulnerability', '/ˌvʌlnərəˈbɪləti/', 'вразливість'),
    term('attacker', '/əˈtækər/', 'зловмисник, нападник'),
    term('botnet', '/ˈbɑtˌnɛt/', 'ботнет (мережа заражених пристроїв)'),
    term('malware', '/ˈmælˌwɛr/', 'шкідливе програмне забезпечення')] });
  add({ id: 'vA2', type: 'content', kicker: 'Vocabulary · A · 2/2', title: 'A. Threats and attacks', items: [
    term('DDoS attack', '/ˈdiˌdɑs əˈtæk/', 'DDoS-атака (розподілена атака на відмову в обслуговуванні)'),
    term('to take over', '/ˌteɪk ˈoʊvər/', 'захоплювати (керування)'),
    term('remote attack', '/rɪˈmoʊt əˈtæk/', 'віддалена атака'),
    term('physical attack', '/ˈfɪzɪkəl əˈtæk/', 'фізична атака')] });
  add({ id: 'mA', type: 'match', kicker: 'A · Match',
    prompt: 'Which word fits each meaning? Two options are extra.',
    left: ['a weak point attackers can use', 'software made to do harm', 'an attack over the network', 'to get control of a device'],
    right: ['physical attack', 'to take over', 'malware', 'botnet', 'remote attack', 'vulnerability'] });
  add({ id: 'vAq', type: 'mcq', kicker: 'A · Quick check',
    prompt: 'Thousands of infected cameras send traffic to one server at the same time, and the server stops working.<br><b>This is a …</b>',
    options: ['physical attack', 'vulnerability', 'DDoS attack', 'botnet'] });

  add({ id: 'vB1', type: 'content', kicker: 'Vocabulary · B · 1/2', title: 'B. Access and identity', items: [
    term('default password', '/dɪˈfɔlt ˈpæsˌwɜrd/', 'заводський пароль'),
    term('credentials', '/krəˈdɛnʃəlz/', 'облікові дані'),
    term('authentication', '/ɔˌθɛntɪˈkeɪʃən/', 'автентифікація'),
    term('authorization', '/ˌɔθərəˈzeɪʃən/', 'авторизація (надання й перевірка прав)')] });
  add({ id: 'vB2', type: 'content', kicker: 'Vocabulary · B · 2/2', title: 'B. Access and identity', items: [
    term('certificate', '/sərˈtɪfɪkət/', 'сертифікат'),
    term('to revoke', '/rɪˈvoʊk/', 'відкликати (сертифікат, доступ)'),
    term('private key', '/ˈpraɪvət ˈki/', 'закритий ключ'),
    term('open port', '/ˈoʊpən ˈpɔrt/', 'відкритий порт')] });
  add({ id: 'mB', type: 'match', kicker: 'B · Match',
    prompt: 'Which word fits each meaning? Two options are extra.',
    left: ['a username and a password', 'checking who you are', 'deciding what you may do', 'to cancel a certificate officially'],
    right: ['private key', 'authorization', 'credentials', 'to revoke', 'authentication', 'open port'] });
  add({ id: 'vBq', type: 'mcq', kicker: 'B · Quick check',
    prompt: 'A camera comes with the password <b>admin</b>, and anyone on the internet can connect to it.<br><b>The camera has …</b>',
    options: ['a private key and a certificate', 'authentication and authorization', 'a default password and an open port', 'malware and a botnet'] });

  add({ id: 'vC1', type: 'content', kicker: 'Vocabulary · C · 1/2', title: 'C. Hardware protection', items: [
    term('debug port', '/diˈbʌɡ ˌpɔrt/', 'порт налагодження ' + K('(JTAG, UART)')),
    term('header', '/ˈhɛdər/', 'штировий роз’єм (на платі)'),
    term('to dump firmware', '/ˌdʌmp ˈfɜrmˌwɛr/', 'вивантажувати (зчитувати) мікропрограму'),
    term('secure boot', '/sɪˈkjʊr ˈbut/', 'безпечне завантаження')] });
  add({ id: 'vC2', type: 'content', kicker: 'Vocabulary · C · 2/2', title: 'C. Hardware protection', items: [
    term('chain of trust', '/ˌtʃeɪn əv ˈtrʌst/', 'ланцюжок довіри'),
    term('secure element', '/sɪˈkjʊr ˈɛləmənt/', 'захищений елемент (мікросхема для ключів)'),
    term('tamper detection', '/ˈtæmpər dɪˈtɛkʃən/', 'виявлення втручання'),
    term('to clone', '/kloʊn/', 'клонувати, виготовляти копію')] });
  add({ id: 'mC', type: 'match', kicker: 'C · Match',
    prompt: 'Which word fits each meaning? Two options are extra.',
    left: ['to read out a copy of the firmware', 'each startup stage checks the next', 'a chip that keeps keys safe', 'to make an exact copy'],
    right: ['secure boot', 'to clone', 'header', 'chain of trust', 'to dump firmware', 'secure element'] });
  add({ id: 'vCq', type: 'mcq', kicker: 'C · Quick check',
    prompt: 'Someone opens the case, and the device erases its keys.<br><b>This feature is …</b>',
    options: ['secure boot', 'a debug port', 'a header', 'tamper detection'] });

  add({ id: 'vD1', type: 'content', kicker: 'Vocabulary · D · 1/2', title: 'D. Responsibility and response', items: [
    term('security flaw', '/sɪˈkjʊrəti ˌflɔ/', 'вада захисту'),
    term('to patch', '/pætʃ/', 'латати, випускати виправлення'),
    term('recall', '/ˈriˌkɔl/', 'відкликання (партії виробів)'),
    term('support period', '/səˈpɔrt ˌpɪriəd/', 'строк підтримки (оновлень)')] });
  add({ id: 'vD2', type: 'content', kicker: 'Vocabulary · D · 2/2', title: 'D. Responsibility and response', items: [
    term('functional safety', '/ˈfʌŋkʃənəl ˈseɪfti/', 'функційна безпека'),
    term('penetration test', '/ˌpɛnəˈtreɪʃən ˌtɛst/', 'тест на проникнення'),
    term('attack surface', '/əˈtæk ˌsɜrfəs/', 'поверхня атаки'),
    term('to ship', '/ʃɪp/', 'постачати, випускати (продукт)')] });
  add({ id: 'mD', type: 'match', kicker: 'D · Match',
    prompt: 'Which word fits each meaning? Two options are extra.',
    left: ['a weakness in the protection', 'to fix with an update', 'experts attack it on purpose', 'how long updates will come'],
    right: ['recall', 'support period', 'to patch', 'attack surface', 'security flaw', 'penetration test'] });
  add({ id: 'vDq', type: 'mcq', kicker: 'D · Quick check',
    prompt: 'Every open port, every debug header and every online service is one more way in.<br><b>Together they make up the device’s …</b>',
    options: ['support period', 'functional safety', 'recall', 'attack surface'] });

  add({ id: 'vE', type: 'content', kicker: 'Vocabulary · You will need these too', title: 'Startup and old protocols', items: [
    term('bootloader', '/ˈbutˌloʊdər/', 'завантажувач'),
    term('firmware image', '/ˈfɜrmˌwɛr ˈɪmɪdʒ/', 'образ мікропрограми ' + K('(often just “the image”)')),
    term('signature', '/ˈsɪɡnətʃər/', 'цифровий підпис ' + K('· valid = дійсний')),
    term('Telnet', '/ˈtɛlˌnɛt/', 'Telnet: старий протокол віддаленого доступу, пароль іде без шифрування')] });
  add({ id: 'vEq', type: 'mcq', kicker: 'You will need these too · Quick check',
    prompt: 'Before it starts a new firmware image, the bootloader checks one thing.<br><b>What does it check?</b>',
    options: ['the header', 'the signature', 'the credentials', 'the recall'] });

  /* ---------- Grammar ---------- */
  add({ id: 'g0', type: 'end', kicker: 'Grammar',
    title: 'Talking about risks',
    text: 'Conditions and consequences' });

  // Rule 1
  add({ id: 'g1a', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 1/3',
    title: 'Real conditions: zero',
    items: [
      'if + present → present<br>' + K('a rule: it always happens'),
      'If a device <b>ships</b> with a default password, anyone who knows the model <b>can log in</b>.'
    ] });
  add({ id: 'g1b', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 2/3',
    title: 'Real conditions: first',
    items: [
      'if + present → will / can / may + verb<br>' + K('a likely result in the future'),
      'If we <b>don’t close</b> the debug port, attackers <b>will read</b> the firmware.',
      '✅ if the signature check <b>fails</b><br>❌ if the signature check <b>will fail</b>'
    ] });
  add({ id: 'g1c', type: 'content', reveal: true, kicker: 'Grammar · Rule 1 · 3/3',
    title: 'Now say it: everyday English',
    items: [
      ...EV('If you <b>heat</b> ice, it <b>melts</b>.', 'Якщо нагріти лід, він тане.'),
      ...EV('If you <b>don’t hurry</b>, you’<b>ll miss</b> the bus.', 'Якщо не поквапишся, проґавиш автобус.')
    ] });

  const G1 = 'Put the verb in the correct form.';
  add({ id: 'e41_1', type: 'gap', kicker: 'Rule 1 · Practice · 1/8',
    instruction: K('<b>Example:</b> If the battery <b>dies</b> (die), the clock stops.') + ' ' + G1,
    prompt: 'If a sensor ___ (lose) power, it keeps its settings in flash memory.' });
  add({ id: 'e41_2', type: 'gap', kicker: 'Rule 1 · Practice · 2/8', instruction: G1,
    prompt: 'If we ___ (not / disable) the debug port, anyone with a cable will be able to read the firmware.' });
  FM('fm1', 1, 'If the check will fail, the device returns to the old image.',
    ['If the check will fail', 'the device returns', 'to the old image']);
  add({ id: 'e41_3', type: 'mcq', kicker: 'Rule 1 · Practice · 3/8',
    prompt: 'If a device uses Telnet, an attacker on the same network ___ the password.',
    options: ['would see', 'saw', 'can see', 'could have seen'] });
  add({ id: 'e41_4', type: 'gap', kicker: 'Rule 1 · Practice · 4/8', instruction: 'Type both forms: <b>1, 2</b>',
    prompt: 'If the signature check ' + blankN(1) + ' (fail), the bootloader ' + blankN(2) + ' (not / start) the new image.<br>1, 2 → ___',
    placeholder: 'form 1, form 2' });
  add({ id: 'e41_5', type: 'gap', kicker: 'Rule 1 · Practice · 5/8', instruction: G1,
    prompt: 'Tamper switches ___ (erase) the keys if the case is opened.' });
  add({ id: 'e41_6', type: 'mcq', kicker: 'Rule 1 · Practice · 6/8',
    prompt: 'If the device ___ three failed logins, it will block the account for ten minutes.',
    options: ['will detect', 'detects', 'would detect', 'detected'] });
  add({ id: 'e41_7', type: 'gap', kicker: 'Rule 1 · Practice · 7/8', instruction: G1,
    prompt: 'If you ___ (connect) the camera to the internet with the default password, it will be found within minutes.' });
  add({ id: 'e41_8', type: 'gap', kicker: 'Rule 1 · Practice · 8/8', instruction: 'Type both forms: <b>1, 2</b>',
    prompt: 'If the firmware ' + blankN(1) + ' (not / sign), an attacker ' + blankN(2) + ' (be able to) replace it.<br>1, 2 → ___',
    placeholder: 'form 1, form 2' });

  // Rule 2
  add({ id: 'g2a', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 1/4',
    title: 'unless = if … not',
    items: [
      'The verb after <b>unless</b> is <b>positive</b>: the “not” is already inside.',
      'The bootloader refuses to start the image <b>unless</b> its signature <b>is</b> valid.',
      '✅ unless the signature <b>is</b> valid<br>❌ unless the signature <b>isn’t</b> valid'
    ] });
  add({ id: 'e42_1', type: 'mcq', kicker: 'Rule 2 · Practice · 1/7',
    prompt: 'If the signature is not valid, the image is rejected.<br><b>Which sentence means the same?</b>',
    options: [
      'The image is rejected unless the signature isn’t valid.',
      'The image is rejected unless the signature will be valid.',
      'The image is rejected unless the signature is valid.'
    ] });
  add({ id: 'e42_5', type: 'mcq', kicker: 'Rule 2 · Practice · 2/7',
    prompt: 'If users don’t change the default password, the device is easy to take over.<br><b>Unless users ___ the default password, the device is easy to take over.</b>',
    options: ['don’t change', 'change', 'will change'] });
  FM('fm2', 2, 'The image is not installed unless the signature isn’t valid.',
    ['The image is not installed', 'unless', 'the signature isn’t valid']);
  add({ id: 'g2b', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 2/4',
    title: 'as long as · provided that',
    items: [
      '<b>as long as / provided that</b> = only if<br>' + K('provided that is more formal'),
      'The device stays secure <b>as long as</b> the private key never leaves the secure element.'
    ] });
  add({ id: 'e42_2', type: 'gap', kicker: 'Rule 2 · Practice · 3/7',
    instruction: K('<b>Example:</b> You can use the lab <b>as long as</b> you lock it.') + ' The device is secure, but only if the private key stays in the secure element. <b>(as long as)</b>',
    prompt: 'The device is secure ___ the private key stays in the secure element.' });
  add({ id: 'e42_4', type: 'gap', kicker: 'Rule 2 · Practice · 4/7',
    instruction: 'You can leave the debug header on the board, but only if the port is locked. <b>(provided that)</b>',
    prompt: 'You can leave the debug header on the board ___ the port is locked.' });
  add({ id: 'g2c', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 3/4',
    title: 'otherwise',
    items: [
      '<b>otherwise</b> = if not, then…<br>' + K('after a period or a semicolon'),
      'Disable Telnet before shipping; <b>otherwise</b>, the device can be taken over remotely.',
      ...EV('Take an umbrella; <b>otherwise</b>, you’ll get wet.', 'Візьми парасольку, інакше змокнеш.')
    ] });
  add({ id: 'e42_3', type: 'gap', kicker: 'Rule 2 · Practice · 5/7',
    instruction: 'Change the default password now. If you don’t, the camera can join a botnet. <b>(otherwise)</b>',
    prompt: 'Change the default password now; ___, the camera can join a botnet.' });
  add({ id: 'g2d', type: 'content', reveal: true, kicker: 'Grammar · Rule 2 · 4/4',
    title: 'Now say it: everyday English',
    items: [
      ...EV('I won’t go <b>unless</b> you come with me.', 'Я не піду, якщо ти не підеш зі мною.'),
      ...EV('You can borrow my car <b>as long as</b> you bring it back by six.', 'Можеш узяти мою машину, аби лише повернув до шостої.')
    ] });
  add({ id: 'e42_6', type: 'open', kicker: 'Rule 2 · Practice · 6/7',
    prompt: 'The gateway accepts a sensor only if it presents a valid certificate.<br><b>Rewrite with <i>unless</i>.</b><br>' + K('Start: The gateway doesn’t …'),
    placeholder: 'The gateway doesn’t …' });
  add({ id: 'e42_7', type: 'match', kicker: 'Rule 2 · Practice · 7/7',
    prompt: 'Which ending fits each start? Two endings are extra.',
    left: ['The lock stays closed unless', 'Updates are safe as long as', 'Sign every image;', 'You may ship it provided that'],
    right: ['the port is locked.', 'otherwise, it’s rejected.', 'the owner’s fingerprint matches.', 'unless it is valid.', 'they are signed.', 'if will fail.'] });

  // Rule 3
  add({ id: 'g3', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 1/2',
    title: 'Unreal: now or future',
    items: [
      'if + <b>past simple</b> → would / could / might + verb<br>' + K('past form = not real, not past'),
      'If an attacker <b>opened</b> the case, what <b>would</b> they <b>find</b>?',
      '<b>If I were you</b>, I <b>would disable</b> the UART port in production.'
    ] });
  add({ id: 'g3e', type: 'content', reveal: true, kicker: 'Grammar · Rule 3 · 2/2',
    title: 'Now say it: everyday English',
    items: [
      ...EV('If I <b>had</b> more time, I’<b>d learn</b> to play the guitar.', 'Якби я мав більше часу, я навчився б грати на гітарі.'),
      ...EV('<b>If I were you</b>, I’<b>d take</b> the job.', 'На твоєму місці я взяв би цю роботу.')
    ] });
  add({ id: 'e43_5', type: 'mcq', kicker: 'Rule 3 · Practice · 1/2',
    prompt: 'I’m not the hardware lead, so I can’t remove the debug header.<br><b>If I ___ the hardware lead, I would remove the debug header.</b>',
    options: ['am', 'had been', 'were', 'would be'] });
  FM('fm3', 3, 'If I would be you, I would lock the debug interface.',
    ['If I would be you', 'I would lock', 'the debug interface']);
  add({ id: 'e43_1', type: 'gap', kicker: 'Rule 3 · Practice · 2/2',
    instruction: 'Our devices don’t have a secure element, so the keys are stored in ordinary flash.',
    prompt: 'If our devices ___ a secure element, the keys wouldn’t be stored in ordinary flash.' });

  // Rule 4
  add({ id: 'g4a', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 1/3',
    title: 'Unreal: now or past?',
    items: [
      K('Ukrainian «якби» works for now and for the past. English must choose.'),
      '<b>Now:</b> If the port <b>were</b> closed, we <b>would sleep</b> better.',
      '<b>Past:</b> if + <b>had + V3</b> → would have + V3<br>If the cameras <b>had shipped</b> with unique passwords, the botnet <b>would have been</b> much smaller.'
    ] });
  add({ id: 'g4b', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 2/3',
    title: 'Too late to change',
    items: [
      '<b>Criticism:</b> We <b>should have removed</b> the test firmware before shipping.',
      '✅ if they <b>had removed</b><br>❌ if they <b>would have removed</b>'
    ] });
  add({ id: 'g4e', type: 'content', reveal: true, kicker: 'Grammar · Rule 4 · 3/3',
    title: 'Now say it: everyday English',
    items: [
      ...EV('If we <b>had left</b> earlier, we <b>wouldn’t have missed</b> the train.', 'Якби ми вийшли раніше, то не спізнилися б на потяг.'),
      ...EV('I <b>should have called</b> you yesterday.', 'Мені слід було подзвонити тобі вчора.')
    ] });
  add({ id: 'e43_2', type: 'gap', kicker: 'Rule 4 · Practice · 1/4',
    instruction: K('<b>Example:</b> If we had tested it, we <b>would have found</b> the bug.') + ' The manufacturer didn’t disable Telnet, so Mirai infected its cameras.',
    prompt: 'If the manufacturer had disabled Telnet, Mirai ___ its cameras.',
    placeholder: 'three words' });
  add({ id: 'e43_3', type: 'mcq', kicker: 'Rule 4 · Practice · 2/4',
    prompt: 'The firmware wasn’t encrypted, so a competitor copied it.<br><b>If the firmware ___, a competitor couldn’t have copied it.</b>',
    options: ['was encrypted', 'had been encrypted', 'would have been encrypted', 'had encrypted'] });
  FM('fm4', 4, 'If the vendor would have closed the port, the camera would not have been infected.',
    ['If the vendor would have closed the port', 'the camera would not have been infected']);
  add({ id: 'e43_4', type: 'open', kicker: 'Rule 4 · Practice · 3/4',
    prompt: 'Nobody tested the car’s entertainment system, so outside researchers found the flaw first.<br><b>Continue: If somebody …</b>',
    placeholder: 'If somebody had …' });
  add({ id: 'e43_6', type: 'gap', kicker: 'Rule 4 · Practice · 4/4',
    instruction: 'They didn’t lock the JTAG port, and now anyone can dump the firmware.',
    prompt: 'They ___ the JTAG port.',
    placeholder: 'should…' });

  /* ---------- Terminological traps ---------- */
  const trap = (pair, uk, ex) => SM('<b>' + pair + '</b><br>' + K(uk) + '<br><i>' + ex + '</i>');
  add({ id: 't1', type: 'content', reveal: true, kicker: 'Traps · 1/4', title: 'Terminological traps', items: [
    trap('security ≠ safety', 'security — захист від навмисних дій · safety — захист людей від випадкової шкоди',
      'A hacked insulin pump is a security problem that can quickly become a safety problem.'),
    trap('default ≠ standard', '«заводський пароль» = default password · standard — відповідний стандарту',
      'The default password was admin.')] });
  add({ id: 'e45_1', type: 'mcq', kicker: 'Traps · Practice · 1/8',
    prompt: 'An insulin pump must meet strict ___ requirements so that it never harms a patient by accident.',
    options: ['security', 'safety'] });
  add({ id: 'e45_2', type: 'mcq', kicker: 'Traps · Practice · 2/8',
    prompt: 'All the cameras used the same ___ password: admin.',
    options: ['default', 'standard'] });
  FM('fm6', 5, 'All our cameras ship with the same standard password, admin.',
    ['All our cameras', 'ship with', 'the same standard password', 'admin']);
  add({ id: 't2', type: 'content', reveal: true, kicker: 'Traps · 2/4', title: 'Terminological traps', items: [
    trap('reboot ≠ reset', '«перезавантажити» = reboot · reset — скинути до початкового стану',
      'Reboot the router if it freezes; a factory reset erases all your settings.'),
    trap('hardware ≠ iron', '«залізо» (жаргон) = hardware · iron — залізо (метал), праска',
      'The bug is in the hardware, not in the firmware.')] });
  add({ id: 'e45_3', type: 'mcq', kicker: 'Traps · Practice · 3/8',
    prompt: 'If the device freezes, just ___ it; your settings will be kept.',
    options: ['reset', 'reboot'] });
  FM('fm5', 6, 'Hold the button for ten seconds to reboot the device to factory settings.',
    ['Hold the button', 'for ten seconds', 'to reboot the device', 'to factory settings']);
  add({ id: 'e45_4', type: 'mcq', kicker: 'Traps · Practice · 4/8',
    prompt: 'Our startup designs both the ___ and the firmware of the lock.',
    options: ['hardware', 'iron'] });
  add({ id: 't3', type: 'content', reveal: true, kicker: 'Traps · 3/4', title: 'Terminological traps', items: [
    trap('recall ≠ revoke', 'відкликати партію виробів = recall · сертифікат, ключ, доступ = revoke',
      'The carmaker recalled 1.4 million vehicles; the leaked certificate was revoked.'),
    trap('tamper with ≠ damage', 'tamper with — навмисно втручатися · damage — пошкоджувати',
      'The seal shows whether anyone has tampered with the meter.')] });
  add({ id: 'e45_5', type: 'mcq', kicker: 'Traps · Practice · 5/8',
    prompt: 'After the private key leaked, the certificate was ___.',
    options: ['recalled', 'revoked'] });
  FM('fm7', 7, 'The certificate was recalled after the private key leaked.',
    ['The certificate', 'was recalled', 'after the private key leaked']);
  add({ id: 'e45_6', type: 'mcq', kicker: 'Traps · Practice · 6/8',
    prompt: 'The case has a switch that erases the keys if someone tries to ___ with the device.',
    options: ['damage', 'tamper'] });
  add({ id: 't4', type: 'content', reveal: true, kicker: 'Traps · 4/4', title: 'Terminological traps', items: [
    trap('sensitive ≠ sensible', 'чутливі, конфіденційні дані = sensitive data · sensible — розсудливий',
      'A smart meter collects sensitive data; a sensible design stores as little as possible.'),
    trap('authentication ≠ authorization', 'хто ви? = authentication · що вам дозволено? = authorization',
      'The lock authenticates the owner by fingerprint; authorization decides whether a guest may open it at night.')] });
  add({ id: 'e45_7', type: 'mcq', kicker: 'Traps · Practice · 7/8',
    prompt: 'The smart meter stores ___ data, such as when a family is at home.',
    options: ['sensible', 'sensitive'] });
  add({ id: 'e45_8', type: 'mcq', kicker: 'Traps · Practice · 8/8',
    prompt: 'The lock checks the owner’s fingerprint: that is ___. The app then decides who else may open the door.',
    options: ['authentication', 'authorization'] });
  FM('fm8', 8, 'Our team designs the iron for the new controller.',
    ['Our team', 'designs', 'the iron', 'for the new controller']);

  /* ---------- Reading ---------- */
  add({ id: 'rB0', type: 'end', kicker: 'Reading',
    title: 'Default Settings, Real Damage',
    text: 'Cameras that took down websites, a car on a highway, and the engineer’s view' });
  add({ id: 'rW', type: 'content', kicker: 'Before you read · Words from the text', title: 'You will meet these', items: [
    term('nuisance', '/ˈnusəns/', 'дрібна неприємність, морока'),
    term('wipers', '/ˈwaɪpərz/', 'склоочисники ' + K('· BrE windscreen wipers')),
    term('transmission', '/trænzˈmɪʃən/', 'трансмісія, коробка передач'),
    term('regulator', '/ˈrɛɡjəˌleɪtər/', 'регулятор, наглядовий орган')] });
  add({ id: 'r0', type: 'mcq', kicker: 'Before you read · Predict',
    prompt: '<img src="' + IMG + '" alt="An infected camera sends traffic to overloaded servers; a car on a highway" style="display:block;width:100%;height:110px;object-fit:cover;object-position:50% 30%;border-radius:14px;margin-bottom:8px">Title: <b>“Default Settings, Real Damage”</b>.<br><b>What happened?</b>',
    options: ['Cameras took down websites.', 'Hackers robbed a bank.', 'An app leaked passwords.'] });

  const PARA = [
    'On October 21, 2016, millions of people in the United States and Europe suddenly could not open Twitter, Netflix, Reddit or GitHub. The sites themselves were working. The target was Dyn, a company that ran DNS services for them, and the traffic that flooded its servers came from an unusual army: home routers, digital video recorders and security cameras infected with <b>malware</b> called Mirai. Dyn later estimated that up to 100,000 infected devices took part in the attack.',
    'Mirai needed no brilliant tricks. It scanned the internet for devices with <b>open Telnet ports</b> and tried a short list of about sixty factory <b>default</b> usernames and passwords, such as admin and admin. If a device accepted one of them, it <b>was taken over</b> within seconds. Most owners never noticed anything: the camera kept recording, and the only symptom was some extra network traffic. At its peak, the <b>botnet</b> controlled around 600,000 devices. If those cameras had shipped with unique passwords and closed ports, Mirai would have been a small nuisance rather than a global headline.',
    'For embedded engineers, the story has a second, more worrying chapter. In 2015, two security researchers showed that a car could be attacked in a similar way: remotely. Through a flaw in the connected entertainment system of a Jeep Cherokee, they reached the vehicle’s internal network and took control of its radio, its wipers and even its transmission while a journalist was driving it on a highway. Fiat Chrysler <b>recalled</b> 1.4 million vehicles to fix the problem. In a connected device, a <b>security flaw</b> can quickly become a <b>safety</b> problem.',
    'That is why hardware teams practice thinking like an attacker, one who has the device on the desk. What would happen if someone opened the case? What if they connected a cable to the board? <b>Debug interfaces</b> such as JTAG and UART are essential during development, but if they are left open on production boards, an attacker can <b>dump the firmware</b>, read the keys and build a perfect copy of the device. Good designs lock or disable these ports before shipping and add <b>tamper detection</b> that erases secrets when the case is opened.',
    'The software side needs the same care. With <b>secure boot</b>, each stage of the startup process checks the signature of the next one, and the processor refuses to run any code unless its signature is valid. This <b>chain of trust</b> begins with keys stored in a <b>secure element</b>, a small chip designed to keep them inside even under physical attack. As long as the <b>private key</b> never leaves that chip, a cloned board is of little use to an attacker.',
    'Regulators have also stopped waiting for manufacturers. Since April 2024, consumer connected products sold in the United Kingdom may not have universal default passwords. In the European Union, the Cyber Resilience Act has required manufacturers to report actively exploited <b>vulnerabilities</b> since September 11, 2026, and from December 2027 products with digital elements will have to meet its security requirements to carry the CE marking. Unless a device can receive security updates throughout its <b>support period</b>, it will not meet those requirements.',
    'Many connected devices stay in service for ten years or more. Over that time, someone will almost certainly find a vulnerability. The real question for an engineer is not whether this will happen, but whether the device will still be locked, updatable and worth trusting when it does.'
  ];
  const para = (n) => add({ id: 'r' + n, type: 'content', kicker: 'Reading · Default Settings, Real Damage',
    title: 'Paragraph ' + n + ' of 7', items: [RD(PARA[n - 1])] });
  const find = (id, n, def, pn) => add({ id, type: 'gap', kicker: 'Find it in the text · ' + n + '/5',
    instruction: (n === 1 ? K('<b>Example:</b> software made to do harm → <b>malware</b>') + ' ' : '') + 'A word or phrase from ' + pn + '.',
    prompt: def + ' → ___' });

  para(1);
  add({ id: 'q1', type: 'mcq', kicker: 'Reading · Check · 1/9',
    prompt: 'Why couldn’t millions of people open Twitter or Netflix?',
    options: ['The sites themselves were down.', 'A DDoS attack flooded Dyn’s DNS servers.', 'Their home routers were broken.', 'Twitter blocked users in Europe.'] });
  para(2);
  add({ id: 'e46_1', type: 'mcq', kicker: 'Reading · Check · 2/9',
    prompt: 'Mirai took over devices mainly by …',
    options: ['exploiting a secret flaw in DNS servers', 'stealing passwords from device owners', 'trying factory default usernames and passwords', 'installing fake firmware updates'] });
  add({ id: 'q2', type: 'mcq', kicker: 'Reading · Check · 3/9',
    prompt: 'If those cameras had shipped with unique passwords, Mirai would have been …',
    options: ['a global headline', 'a small nuisance', 'a much bigger botnet', 'a safety problem'] });
  find('e47_2', 1, 'to get control of a device', 'paragraph 2');
  para(3);
  add({ id: 'q3', type: 'mcq', kicker: 'Reading · Check · 4/9',
    prompt: 'What did the researchers take control of in the Jeep?',
    options: ['only the engine', 'the GPS and the doors', 'the radio, the wipers and the transmission', 'the journalist’s phone'] });
  add({ id: 'e46_2', type: 'mcq', kicker: 'Reading · Check · 5/9',
    prompt: 'The Jeep Cherokee example shows that …',
    options: ['a flaw in a connected device can put people in danger', 'cars are safer than home cameras', 'entertainment systems should never be connected', 'journalists often test cars for security'] });
  find('e47_3', 2, 'an official request to return products to the maker for repair', 'paragraph 3');
  para(4);
  add({ id: 'e46_3', type: 'mcq', kicker: 'Reading · Check · 6/9',
    prompt: 'Open debug ports on production boards let an attacker …',
    options: ['shut down a DNS service', 'avoid the CE marking', 'control a car’s transmission', 'read the firmware and keys and copy the device'] });
  find('e47_4', 3, 'connectors used to test and program a board during development', 'paragraph 4');
  para(5);
  add({ id: 'e46_4', type: 'mcq', kicker: 'Reading · Check · 7/9',
    prompt: 'A secure element is described as …',
    options: ['a type of debug port', 'a chip that keeps keys inside even under physical attack', 'a list of default passwords', 'a part of the processor that inspects traffic'] });
  find('e47_6', 4, 'a sequence in which each startup stage checks the next one', 'paragraph 5');
  para(6);
  add({ id: 'q6', type: 'mcq', kicker: 'Reading · Check · 8/9',
    prompt: 'Since when must manufacturers in the EU report actively exploited vulnerabilities?',
    options: ['since April 2024', 'since October 2016', 'only from December 2027', 'since September 2026'] });
  find('e47_7', 5, 'the time during which a device gets security updates', 'paragraph 6');
  para(7);
  add({ id: 'e46_5', type: 'mcq', kicker: 'Reading · Check · 9/9',
    prompt: 'The final paragraph mainly suggests that engineers should …',
    options: ['be ready for the vulnerability that will eventually be found', 'design devices that last longer than ten years', 'stop worrying about vulnerabilities', 'wait for regulators to set the rules'] });

  /* ---------- Keyword drill ---------- */
  add({ id: 'k0', type: 'content', kicker: 'Keyword drill', title: 'Build the sentence', items: [
    'You see only the <b>keywords</b> from the text, in the right order.',
    'Add articles and prepositions. Choose the tense and the type of condition.',
    'Say your sentence → compare → repeat the target 3 times.'] });
  const KW = [
    ['scan · internet · device · open · Telnet port · try · default · password',
      'Mirai <b>scanned</b> the <b>internet</b> for <b>devices</b> with <b>open Telnet ports</b> and <b>tried default passwords</b>.',
      'Mirai шукав в інтернеті пристрої з відкритими портами Telnet і пробував заводські паролі.'],
    ['owner · never · notice · anything · camera · keep · record',
      'To be honest, most <b>owners never noticed anything</b>, because the <b>camera kept recording</b>.',
      'Чесно кажучи, більшість власників нічого не помітили, бо камера й далі записувала.'],
    ['security · flaw · quickly · become · safety · problem',
      'The thing is, a <b>security flaw</b> can <b>quickly become</b> a <b>safety problem</b>.',
      'Річ у тім, що вада кіберзахисту може швидко стати загрозою для безпеки людей.'],
    ['what · happen · if · someone · open · case · connect · cable',
      '<b>What would happen if someone opened</b> the <b>case</b> and <b>connected</b> a <b>cable</b> to the board?',
      'Що станеться, якби хтось відкрив корпус і під’єднав до плати кабель?'],
    ['processor · refuse · run · code · unless · signature · valid',
      'The <b>processor refuses</b> to <b>run</b> any <b>code unless</b> its <b>signature</b> is <b>valid</b>.',
      'Процесор відмовляється виконувати будь-який код, якщо його підпис недійсний.'],
    ['if · camera · ship · unique · password · botnet · much · small',
      '<b>If</b> those <b>cameras</b> had <b>shipped</b> with <b>unique passwords</b>, the <b>botnet</b> would have been <b>much smaller</b>.',
      'Якби ці камери постачали з унікальними паролями, ботнет був би значно меншим.']
  ];
  const kw = (i) => add({ id: 'k' + (i + 1), type: 'content', reveal: true,
    kicker: 'Keyword drill · ' + (i + 1) + '/6', title: KW[i][0], items: [KW[i][1], K(KW[i][2])] });
  kw(0); kw(1); kw(2);
  add({ id: 'kq', type: 'mcq', kicker: 'Keyword drill · Halfway',
    prompt: 'Sentence 2: “the camera kept ___”. <b>Which form follows <i>keep</i>?</b>',
    options: ['to record', 'record', 'recording', 'recorded'] });
  kw(3); kw(4); kw(5);

  /* ---------- Dialogues ---------- */
  add({ id: 'dl0', type: 'end', kicker: 'Dialogues',
    title: 'Engineers at work',
    text: 'An open debug port and a default password: two conversations' });
  add({ id: 'dw1', type: 'content', kicker: 'Dialogue 1 · Words', title: 'You will hear these', items: [
    term('Go ahead.', '/ˌɡoʊ əˈhɛd/', 'Кажи, продовжуй.'),
    term('root shell', '/ˈrut ˌʃɛl/', 'командний рядок із правами root (суперкористувача)'),
    term('Fair point.', '/ˌfɛr ˈpɔɪnt/', 'Слушно.'),
    term('just in case', '/ˌdʒʌst ɪn ˈkeɪs/', 'про всяк випадок')] });
  const L = (who, t) => SM('<b>' + who + ':</b> ' + t);
  add({ id: 'd1a', type: 'content', kicker: 'Dialogue 1 · 1/3', title: 'The open debug port', items: [
    L('Sofiia', 'I’ve checked the production board for the smart lock. There’s one thing I don’t like.'),
    L('Andrii', 'Go ahead.'),
    L('Sofiia', 'The UART header is still on the board, and it isn’t locked. If I connect a cable, I get a root shell.')] });
  const TYPES = ['real · now or always', 'real · future', 'unreal · now or future', 'unreal · past'];
  const C49 = [
    'If I connect a cable, I get a root shell.',
    'If someone bought one lock, they could dump the firmware and read the keys.',
    'If we had missed this before launch, we’d have had to recall the whole batch.',
    'If our cameras ended up in a botnet, our brand would be in the news.',
    'If calls go up, let’s look at the wizard again.'
  ];
  const c49 = (i) => add({ id: 'e49c_' + (i + 1), type: 'mcq', kicker: 'Which type of condition? · ' + (i + 1) + '/5',
    prompt: C49[i], options: TYPES });
  c49(0);
  add({ id: 'd1b', type: 'content', kicker: 'Dialogue 1 · 2/3', title: 'The open debug port', items: [
    L('Andrii', 'Really? We only used it for testing.'),
    L('Sofiia', 'I know, but attackers don’t care why it’s there. If someone bought one lock, they could dump the firmware and read the keys.'),
    L('Andrii', 'Fair point. If we had missed this before launch, we’d have had to recall the whole batch.')] });
  add({ id: 'd1c', type: 'content', kicker: 'Dialogue 1 · 3/3', title: 'The open debug port', items: [
    L('Sofiia', 'Exactly. Can we disable the port in the production firmware?'),
    L('Andrii', 'Yes. And I’ll ask the hardware team to remove the header from the next revision, just in case.')] });
  add({ id: 'e49m_1', type: 'match', kicker: 'Dialogue 1 · Match',
    prompt: 'What does each phrase mean here? Two options are extra.',
    left: ['Go ahead.', 'root shell', 'Fair point.', 'just in case'],
    right: ['full admin access', 'a broken cable', 'Please continue.', 'to be safe', 'That’s a good argument.', 'Let’s stop.'] });
  c49(1); c49(2);

  add({ id: 'dw2', type: 'content', kicker: 'Dialogue 2 · Words', title: 'You will hear these', items: [
    term('straight out of the box', '/ˌstreɪt aʊt əv ðə ˈbɑks/', 'одразу після розпакування'),
    term('Surely …?', '/ˈʃʊrli/', 'Хіба ж …? Напевно ж …?'),
    term('to get flooded with calls', '/ˈflʌdɪd/', 'потонути в дзвінках'),
    term('That settles it.', '/ˈsɛtəlz/', 'Це вирішує питання.')] });
  add({ id: 'd2a', type: 'content', kicker: 'Dialogue 2 · 1/4', title: 'Drop the default password', items: [
    L('Manager', 'Customers love that our camera works straight out of the box. Why change that?'),
    L('Engineer', 'I understand. But if every camera has the same password, an attacker can take over thousands of them in one night.'),
    L('Manager', 'Surely most people change it themselves?')] });
  add({ id: 'd2b', type: 'content', kicker: 'Dialogue 2 · 2/4', title: 'Drop the default password', items: [
    L('Engineer', 'Most don’t, unfortunately. And if our cameras ended up in a botnet, our brand would be in the news.'),
    L('Manager', 'So what do you suggest?')] });
  c49(3);
  add({ id: 'd2c', type: 'content', kicker: 'Dialogue 2 · 3/4', title: 'Drop the default password', items: [
    L('Engineer', 'Each camera gets a unique password printed on its label, provided that setup still takes under two minutes. I’d also recommend a short setup wizard in the app.'),
    L('Manager', 'Fine, as long as support doesn’t get flooded with calls.')] });
  add({ id: 'd2d', type: 'content', kicker: 'Dialogue 2 · 4/4', title: 'Drop the default password', items: [
    L('Engineer', 'It shouldn’t. And there’s one more thing: since April 2024, we can’t sell cameras with a universal default password in the UK anyway.'),
    L('Manager', 'Then that settles it. But if calls go up, let’s look at the wizard again.'),
    L('Engineer', 'Agreed. We’ll track the numbers for the first month.')] });
  c49(4);
  add({ id: 'e49m_2', type: 'match', kicker: 'Dialogue 2 · Match',
    prompt: 'What does each phrase mean here? Two options are extra.',
    left: ['straight out of the box', 'Surely most people …?', 'get flooded with calls', 'That settles it.'],
    right: ['in its original box', 'That decides it.', 'right after unpacking', 'call many customers', 'get too many calls', 'Most people do, right?'] });
  add({ id: 'e49_3', type: 'mcq', kicker: 'Dialogue 2 · The key argument',
    prompt: 'Which argument <b>finally</b> persuades the manager?',
    options: ['Customers love simple setup.', 'A short setup wizard in the app.', 'Since April 2024, the UK does not allow universal default passwords.', 'Support will get fewer calls.'] });

  /* ---------- Say it in English ---------- */
  SAY(1, 'Якщо пристрій постачають із заводським паролем, будь-хто, хто знає модель, може в нього ввійти.',
    'If a device ships with a default password, anyone who knows the model can log in to it.',
    'If you <b>leave</b> milk out of the fridge, it <b>goes</b> bad.', 'Якщо залишити молоко поза холодильником, воно псується.');
  SAY(2, 'Якщо ми не вимкнемо порт налагодження, зловмисники прочитають мікропрограму.',
    'If we don’t disable the debug port, attackers will read the firmware.',
    'If you <b>don’t charge</b> your phone, it’<b>ll die</b> before lunch.', 'Якщо не зарядиш телефон, він сяде ще до обіду.');
  SAY(3, 'Завантажувач не запускає образ, якщо підпис недійсний. <span class="muted">(unless)</span>',
    'The bootloader doesn’t start the image unless the signature is valid.',
    'I won’t lend you the money <b>unless</b> you <b>pay</b> me back by Friday.', 'Я не позичу тобі грошей, якщо не повернеш до п’ятниці.');
  add({ id: 'sq1', type: 'mcq', kicker: 'Say it · Quick check · 1/3',
    prompt: '«Пристрій не оновиться, якщо його не під’єднати».',
    options: ['It won’t update unless it isn’t connected.', 'It won’t update unless it will be connected.', 'It won’t update unless it is connected.', 'It won’t update if it is connected.'] });
  SAY(4, 'Пристрій захищений, доки закритий ключ не залишає захищеного елемента.',
    'The device is secure as long as the private key doesn’t leave the secure element.',
    'You can stay out late <b>as long as</b> you text me.', 'Можеш гуляти допізна, аби лише написав мені.');
  SAY(5, 'Вимкніть Telnet перед відвантаженням, інакше пристрій можна буде захопити віддалено.',
    'Disable Telnet before shipping; otherwise, the device can be taken over remotely.',
    'Leave now; <b>otherwise</b>, you’ll be stuck in traffic.', 'Виїжджай зараз, інакше застрягнеш у заторі.');
  SAY(6, 'Якби зловмисник відкрив корпус, він не знайшов би на платі жодних ключів.',
    'If an attacker opened the case, they wouldn’t find any keys on the board.',
    'If I <b>won</b> the lottery, I’<b>d buy</b> a house by the ocean.', 'Якби я виграв у лотерею, купив би будинок біля моря.');
  add({ id: 'sq2', type: 'mcq', kicker: 'Say it · Quick check · 2/3',
    prompt: '«На твоєму місці я б не відкривав цього листа».',
    options: ['If I would be you, I wouldn’t open this email.', 'If I were you, I wouldn’t open this email.', 'If I am you, I won’t open this email.', 'If I had been you, I wouldn’t open this email.'] });
  SAY(7, 'На вашому місці я б заблокував інтерфейс JTAG.',
    'If I were you, I would lock the JTAG interface.',
    '<b>If I were you</b>, I’<b>d see</b> a doctor.', 'На твоєму місці я пішов би до лікаря.');
  SAY(8, 'Якби виробник закрив порти, ці камери не потрапили б до ботнету.',
    'If the manufacturer had closed the ports, these cameras wouldn’t have ended up in a botnet.',
    'If you <b>had told</b> me earlier, I <b>would have helped</b>.', 'Якби ти сказав мені раніше, я б допоміг.');
  SAY(9, 'Нам слід було видалити тестову мікропрограму перед відвантаженням.',
    'We should have removed the test firmware before shipping.',
    'We <b>should have booked</b> a table.', 'Нам слід було забронювати столик.');
  add({ id: 'sq3', type: 'mcq', kicker: 'Say it · Quick check · 3/3',
    prompt: '«Якби ми перевірили плату до запуску, ми знайшли б порт».',
    options: ['If we would have checked it, we’d have found the port.', 'If we checked it, we found the port.', 'If we have checked it, we will find the port.', 'If we had checked it, we would have found the port.'] });
  SAY(10, 'Після витоку ключа сертифікат відкликали.',
    'After the key leaked, the certificate was revoked.',
    'After the accident, his driver’s license <b>was revoked</b>.', 'Після аварії в нього відкликали водійське посвідчення.');
  SAY(11, 'Пломба показує, чи хтось втручався в лічильник.',
    'The seal shows whether anyone has tampered with the meter.',
    'Someone <b>has tampered with</b> my bike lock.', 'Хтось намагався розкрутити мій велосипедний замок.');

  /* ---------- Speaking A: paraphrase chain ---------- */
  add({ id: 'spA0', type: 'end', kicker: 'Speaking',
    title: 'Talk like a security engineer',
    text: 'Two short tasks, then a briefing for a manager' });
  add({ id: 'spA1', type: 'content', reveal: true, kicker: 'Speaking A · Paraphrase chain', format: 'paraphrase',
    title: 'One risk, three ways', items: [
      'The teacher shows <b>one risk</b>. Student 1 says it with <b>If … , … will / can …</b>',
      'Student 2 says the same risk with <b>unless</b>.',
      'Student 3 turns it into advice with <b>… ; otherwise, …</b>'] });
  add({ id: 'spA1b', type: 'content', kicker: 'Speaking A · Example', title: 'How it sounds', items: [
    SM('<b>Example.</b> Risk: <i>unsigned firmware → an attacker can replace it</i><br>1 → <i>If the firmware isn’t signed, an attacker will be able to replace it.</i><br>2 → <i>An attacker can replace the firmware unless it is signed.</i><br>3 → <i>Sign the firmware; otherwise, an attacker can replace it.</i>')] });
  add({ id: 'spA2', type: 'content', reveal: true, kicker: 'Speaking A · One student at a time',
    title: 'Risks for the chain', items: [
      SM('📷 <b>1.</b> open Telnet port → the camera can join a botnet'),
      SM('🔑 <b>2.</b> the same password on every camera → an attacker can take over thousands in one night'),
      SM('🔌 <b>3.</b> unlocked JTAG port → anyone can dump the firmware'),
      SM('📦 <b>4.</b> no tamper detection → the keys can be read from an opened case')] });
  add({ id: 'spA3', type: 'mcq', kicker: 'Speaking A · Listeners',
    prompt: 'The last student in the chain: which word did they <b>start</b> their advice with?',
    options: ['Disable / Lock …', 'Change / Set …', 'Add / Use …', 'something else'] });

  /* ---------- Speaking B: warn the manager (teacher = manager) ---------- */
  add({ id: 'spB1', type: 'content', kicker: 'Speaking B · Stop the launch', format: 'warn',
    title: '“We ship the lock tomorrow!”', items: [
      '<b>The teacher</b> is the product manager. <b>One student at a time</b> warns about <b>one</b> problem.',
      SM('🔌 the <b>UART header</b> is unlocked: a cable gives a root shell'),
      SM('🧪 the <b>test firmware</b> is still on 500 boards'),
      SM('🔑 every lock has the <b>same Wi-Fi setup password</b>')] });
  add({ id: 'spB2', type: 'content', reveal: true, kicker: 'Speaking B · Patterns', title: 'Warn — briefly and politely', items: [
    SM('<b>I understand the deadline, but</b> if we ship it like this, …'),
    SM('<b>If an attacker bought</b> one lock, they <b>could</b> …'),
    SM('<b>If I were you</b>, I’d … before we ship.'),
    SM('<b>Otherwise</b>, we may have to recall the whole batch.')] });
  add({ id: 'spB3', type: 'mcq', kicker: 'Speaking B · Result',
    prompt: 'What did the “manager” finally decide?',
    options: ['ship tomorrow anyway', 'fix one problem, then ship', 'delay the launch and fix all three', 'no decision yet'] });

  /* ---------- Final task: security briefing ---------- */
  add({ id: 'fr0', type: 'end', kicker: 'Final task',
    title: 'Security briefing',
    text: 'A manager who is not technical asks: “Is our device safe?”' });
  add({ id: 'fr1', type: 'mcq', kicker: 'Final task · Choose',
    prompt: 'Which device will the class brief the manager on?',
    options: ['a smart door lock', 'a baby monitor camera', 'a connected insulin pump'] });
  add({ id: 'fr2a', type: 'content', kicker: 'Final task · Card A', title: '🔒 Smart door lock', items: [
    SM('<b>Protects:</b> people’s homes'),
    SM('<b>Remote:</b> app login with a default password → open the door from anywhere'),
    SM('<b>Physical:</b> open UART header → dump the firmware, read the keys'),
    SM('<b>Has / lacks:</b> secure boot ✅ · secure element ❌ · tamper detection ❌')] });
  add({ id: 'fr2b', type: 'content', kicker: 'Final task · Card B', title: '👶 Baby monitor camera', items: [
    SM('<b>Protects:</b> a family’s video and audio: sensitive data'),
    SM('<b>Remote:</b> open Telnet port → the camera joins a botnet, strangers watch'),
    SM('<b>Physical:</b> unlocked JTAG port → clone the camera'),
    SM('<b>Has / lacks:</b> unique passwords ✅ · patches ❌ (support period: 1 year)')] });
  add({ id: 'fr2c', type: 'content', kicker: 'Final task · Card C', title: '💉 Connected insulin pump', items: [
    SM('<b>Protects:</b> a patient’s life: functional safety'),
    SM('<b>Remote:</b> unsigned firmware update over Bluetooth → wrong dose'),
    SM('<b>Physical:</b> open debug port → read the private key'),
    SM('<b>Has / lacks:</b> penetration test ✅ · secure boot ❌')] });
  add({ id: 'fr3', type: 'content', reveal: true, kicker: 'Final task · Four moves', format: 'brief',
    title: 'Brief the manager in four moves', items: [
      SM('<b>1. What it protects:</b> <i>The most sensitive part of this device is …</i>'),
      SM('<b>2. Two attacks:</b> <i>If someone …, they could … · If an attacker had the device on their desk, …</i>'),
      SM('<b>3. Protection + condition:</b> <i>It won’t … unless … · It stays safe as long as …</i>'),
      SM('<b>4. Priority action:</b> <i>If I were you, I’d … ; otherwise, …</i>')] });
  add({ id: 'fr4', type: 'content', kicker: 'Final task · Example', title: 'How it sounds', items: [
    SM('<i>The most sensitive part of this lock is the key that opens the door. <b>If someone logged in</b> with the default password, they <b>could open</b> the door from anywhere. The lock <b>won’t run</b> new firmware <b>unless</b> it is signed, but the keys are in ordinary flash. <b>If I were you</b>, I’d disable the UART header; <b>otherwise</b>, one stolen lock is enough to attack them all.</i>'),
    SM(K('Moves 1–4 in four sentences. Can you add a <b>past</b> example (Mirai, the Jeep)?'))] });
  add({ id: 'fr5', type: 'open', kicker: 'Final task · Move 4',
    prompt: 'Your <b>priority action</b> for the chosen device in <b>one sentence</b>.<br>Use: <i>If I were you, I’d … ; otherwise, …</i><br>' + K('Ideas: lock the port · add a secure element · sign every update · patch for 5 years'),
    placeholder: 'If I were you, I’d … ; otherwise, …' });
  add({ id: 'fr6', type: 'content', reveal: true, kicker: 'Final task · One student at a time', title: 'Build the briefing', items: [
    SM('<b>Student 1:</b> move 1 + move 2'),
    SM('<b>Student 2:</b> repeats move 2 in a new way + move 3'),
    SM('<b>Student 3:</b> move 4 + a past example: <i>If they had …, … would have …</i>'),
    SM('<b>The teacher (the manager) asks:</b> “Can’t we just fix it after launch?”')] });
  add({ id: 'fr7', type: 'mcq', kicker: 'Final task · Listeners',
    prompt: 'Which <b>priority action</b> did the last speaker name?',
    options: ['lock or disable a debug port', 'unique passwords / no default password', 'sign the firmware / secure boot', 'patches and a longer support period'] });

  add({ id: 'end', type: 'end', kicker: 'Unit 4',
    title: 'Someone will find a vulnerability.',
    text: 'Your job: keep the device locked, updatable and worth trusting.' });

  // Логіка подачі для check_lesson.js (рушій ці поля ігнорує)
  const R1 = 'rule 1: zero and first conditional', R2 = 'rule 2: unless · as long as · provided that · otherwise',
    R3 = 'rule 3: second conditional', R4 = 'rule 4: third conditional · should have';
  const T1 = 'trap: security vs safety · default vs standard', T2 = 'trap: reboot vs reset · hardware vs iron',
    T3 = 'trap: recall vs revoke · tamper with', T4 = 'trap: sensitive vs sensible · authentication vs authorization';
  const TEACHES = { g1a: [R1], g1b: [R1], g2a: [R2], g2b: [R2], g2c: [R2], g3: [R3], g4a: [R4], g4b: [R4],
    t1: [T1], t2: [T2], t3: [T3], t4: [T4] };
  const NEEDS = {
    l1: [], l2: [], l3: [], r0: [],
    vAq: ['DDoS attack', 'physical attack', 'vulnerability', 'botnet'], vBq: ['default password', 'open port', 'private key', 'certificate'],
    vCq: ['tamper detection', 'secure boot', 'debug port', 'header'], vDq: ['attack surface', 'functional safety', 'support period', 'recall'],
    vEq: ['bootloader', 'signature', 'firmware image', 'header', 'credentials'],
    e41_1: [R1], e41_2: [R1, 'debug port'], fm1: [R1], e41_3: [R1, 'Telnet', 'attacker'], e41_4: [R1, 'signature', 'bootloader'],
    e41_5: [R1, 'tamper detection'], e41_6: [R1], e41_7: [R1, 'default password'], e41_8: [R1, 'attacker'],
    e42_1: [R2, 'signature'], e42_5: [R2, 'default password', 'to take over'], fm2: [R2, 'signature'],
    e42_2: [R2, 'private key', 'secure element'], e42_4: [R2, 'header', 'debug port'], e42_3: [R2, 'botnet', 'default password'],
    e42_7: [R2, 'signature'],
    e43_5: [R3, 'header'], fm3: [R3], e43_1: [R3, 'secure element'],
    e43_2: [R4, 'Telnet'], e43_3: [R4], fm4: [R4], e43_6: [R4, 'to dump firmware'],
    e45_1: [T1], e45_2: [T1], fm6: [T1], e45_3: [T2], fm5: [T2], e45_4: [T2], e45_5: [T3, 'private key'], fm7: [T3],
    e45_6: [T3], e45_7: [T4], e45_8: [T4], fm8: [T2],
    q1: ['DDoS attack'], q2: ['nuisance'], q3: ['wipers', 'transmission'], e46_1: ['to take over', 'default password'], e46_2: ['security flaw'], e46_3: ['debug port'],
    e46_4: ['secure element', 'physical attack'], q6: ['vulnerability'], e46_5: ['vulnerability'],
    e47_2: ['to take over'], e47_3: ['recall'], e47_4: ['debug port'], e47_6: ['chain of trust'], e47_7: ['support period'],
    kq: [],
    e49m_1: ['Go ahead.', 'root shell', 'Fair point.', 'just in case'],
    e49c_1: [R1], e49c_2: [R3], e49c_3: [R4], e49c_4: [R3, 'botnet'], e49c_5: [R1],
    e49m_2: ['straight out of the box', 'Surely …?', 'to get flooded with calls', 'That settles it.'], e49_3: [],
    sq1: [R2], sq2: [R3], sq3: [R4],
    spA3: [], spB3: [], fr1: [], fr7: ['debug port', 'support period']
  };
  S.forEach((s) => {
    if (TEACHES[s.id]) s.teaches = [...(s.teaches || []), ...TEACHES[s.id]];
    if (!['mcq', 'gap', 'open', 'match'].includes(s.type)) return;
    if (s.needs === undefined) s.needs = NEEDS[s.id] || [];
  });

  window.LESSON = {
    id: 'esp-ki-unit4',
    title: 'Unit 4 · Embedded and IoT Security',
    known: ['password', 'camera', 'Wi-Fi', 'router', 'firmware', 'sensor', 'device', 'port', 'cable', 'board', 'case', 'key', 'keys',
      'flash memory', 'gateway', 'server', 'network', 'internet', 'app', 'update', 'smart lock', 'insulin pump', 'JTAG', 'UART',
      'DNS', 'processor', 'Bluetooth', 'data', 'hacker', 'hack'],
    slides: S
  };
})();

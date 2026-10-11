/* =========================================================================
   Unit 4 · Web Application Security: Thinking Like an Attacker
   ESP · Комп'ютерні науки, 2 курс · B1+/B2
   ПУБЛІЧНА частина: те, що бачать студенти. Нотатки й ключі — у teacher.js.
   Послідовність: Lead-in · Лексика A · Умовні 0/1 (4.1) · Лексика B ·
   unless / as long as / provided that / otherwise (4.2) · Лексика C, D ·
   Другий тип (4.3) · Третій тип і should have (4.3) · 4.4 · Пастки + 4.5 ·
   Reading (4.6, 4.7) · Keyword drill (4.8) · Listening + Speaking A ·
   Dialogues (4.9) + Speaking B · Security briefing (4.11).
   «Say it in English» (4.10) — після відповідних правил. Меж занять немає.
   ========================================================================= */
(function () {
  const ID = 'esp-kn-unit4';
  const K = (s) => '<span class="muted">' + s + '</span>';
  const SM = (h) => '<span style="display:block;font-size:18px;line-height:1.45">' + h + '</span>';
  const term = (en, ipa, uk) => '<span style="display:block;font-size:19px;line-height:1.35"><b>' + en + '</b> ' + K(ipa) + '<br>' + uk + '</span>';
  const blankN = (n) => '<span class="blank">' + n + '</span>';
  const EV = (en, uk) => [
    '<span style="display:block;font-size:18px;line-height:1.4">💬 ' + uk + '</span>',
    '<span style="display:block;font-size:18px;line-height:1.4">→ <i>' + en + '</i></span>'];
  // Фото вмикаються, щойно файл додано до списку HAVE
  const HAVE = ['door.jpg', 'lead.jpg', 'servers.jpg', 'windows.jpg', 'review.jpg', 'client.jpg', 'briefing.jpg'];
  const PH = (f, alt, pos, h) => HAVE.includes(f) ? '<img src="lessons/' + ID + '/' + f + '" alt="' + alt + '" style="display:block;width:100%;height:' + (h || 140) + 'px;object-fit:cover;object-position:' + (pos || '50% 50%') + ';border-radius:16px;margin-bottom:12px">' : '';
  const S = [];
  const add = (o) => S.push(o);

  const SAY = (n, uk, en, evEn, evUk) => add({ id: 'say' + n, type: 'content', reveal: true,
    kicker: 'Say it in English · ' + n + '/14', title: uk,
    items: ['<b>' + en + '</b>', ...EV(evEn, evUk)] });
  const FM = (id, n, sentence, parts, ex) => add({ id, type: 'mcq', kicker: '4.4 · Find the mistake · ' + n + '/8',
    prompt: (ex ? K('<b>Example:</b> If it <s>will rain</s>, we’ll stay home. → If it <b>rains</b>, …') + '<br><br>' : '') +
      sentence + '<br><span class="muted">Tap the wrong part.</span>', options: parts });

  add({ id: 'title', type: 'title',
    kicker: 'Unit 4 · English for Computer Science',
    title: 'Web Application Security',
    subtitle: 'Thinking like an attacker' });

  /* ---------- Lead-in ---------- */
  add({ id: 'l1', type: 'open', kicker: 'Lead-in · 1/4',
    prompt: PH('lead.jpg', 'A worried young woman looking at a red warning on her phone', '50% 40%', 110) +
      'An email says: <b>“Your password was found in a list of stolen passwords.”</b><br>What do you do <b>first</b>? And what could the website have done to protect you?',
    placeholder: 'First, I’d… The website could have…' });
  add({ id: 'l2', type: 'open', kicker: 'Lead-in · 2/4',
    prompt: 'A comment form asks for your <b>name</b>.<br>Someone with bad intentions types something else. <b>Name three things</b> they could type.',
    placeholder: '1) a piece of code… 2) … 3) …' });
  add({ id: 'l3', type: 'mcq', kicker: 'Lead-in · 3/4',
    prompt: 'You run an online shop. <b>Which is worse?</b>',
    options: ['the site is down for an hour', 'customer data is quietly exposed for a month'] });
  add({ id: 'l4', type: 'open', kicker: 'Lead-in · 4/4',
    prompt: 'Why is your choice worse? Think about <b>customers</b>, <b>money</b> and <b>time</b>.',
    placeholder: 'If the shop… , customers would…' });

  /* ---------- Vocabulary A ---------- */
  add({ id: 'v0', type: 'end', kicker: 'Vocabulary',
    title: 'Who attacks, and how?',
    text: 'Threats, attacks and the people behind them' });
  add({ id: 'vA1', type: 'content', kicker: 'Vocabulary · A · 1/2', title: 'A. Threats and attacks', items: [
    term('vulnerability', '/ˌvʌlnərəˈbɪləti/', 'вразливість'),
    term('threat', '/θret/', 'загроза'),
    term('attacker', '/əˈtækər/', 'зловмисник, нападник'),
    term('to exploit', '/ɪkˈsplɔɪt/', 'використовувати (вразливість)')] });
  add({ id: 'vA2', type: 'content', kicker: 'Vocabulary · A · 2/2', title: 'A. Threats and attacks', items: [
    term('SQL injection', '/ˌes kjuː ˈel ɪnˌdʒekʃn/', 'SQL-ін’єкція, впровадження SQL-коду'),
    term('cross-site scripting (XSS)', '/ˌkrɔːs saɪt ˈskrɪptɪŋ/', 'міжсайтовий скриптинг'),
    term('phishing', '/ˈfɪʃɪŋ/', 'фішинг'),
    term('malware', '/ˈmælwer/', 'шкідливе програмне забезпечення')] });
  add({ id: 'mA', type: 'match', kicker: 'A · Quick check · 1/3',
    prompt: 'What does each word (1–4) mean? Two options (a–f) are extra.',
    left: ['vulnerability', 'threat', 'to exploit', 'phishing'],
    right: ['a possible danger', 'fake emails for passwords', 'a strong password', 'a weak point', 'to fix a bug', 'to use a weakness'] });
  add({ id: 'qA1', type: 'mcq', kicker: 'A · Quick check · 2/3',
    prompt: 'Someone types a script into a <b>comment field</b>, and it runs in <b>other visitors’ browsers</b>.<br><b>This is …</b>',
    options: ['SQL injection', 'phishing', 'cross-site scripting', 'malware'] });
  add({ id: 'qA2', type: 'mcq', kicker: 'A · Quick check · 3/3',
    prompt: 'A program that <b>secretly</b> copies your files and sends them to a stranger is …',
    options: ['malware', 'an attacker', 'a threat', 'phishing'] });

  /* ---------- Grammar · Real conditions ---------- */
  add({ id: 'g0', type: 'end', kicker: 'Grammar',
    title: 'Talking about risks',
    text: 'Conditions and consequences' });
  add({ id: 'g1a', type: 'content', reveal: true, kicker: 'Grammar · Real conditions · 1/3',
    title: 'Always true: if + present, present',
    items: [
      '<b>Zero conditional</b> = a rule of the system<br>If the token <b>expires</b>, the user <b>is logged out</b>.',
      'If a site <b>uses</b> plain HTTP, anyone on the same Wi-Fi <b>can read</b> the traffic.',
      ...EV('If I <b>drink</b> coffee after six, I <b>can’t</b> sleep.', 'Якщо я п’ю каву після шостої, то не можу заснути.')
    ] });
  add({ id: 'g1a2', type: 'content', reveal: true, kicker: 'Grammar · Real conditions · 2/3',
    title: 'A likely result: if + present, will / can / may',
    items: [
      '<b>First conditional</b> = a real chance in the future<br>If we <b>don’t update</b> the server this week, attackers <b>will find</b> it.',
      '✅ if the token <b>expires</b><br>❌ if the token <b>will expire</b><br>' + K('the same rule as once / until in Unit 3')
    ] });
  add({ id: 'g1b', type: 'content', reveal: true, kicker: 'Grammar · Real conditions · 3/3',
    title: 'Now say it: everyday English',
    items: [
      ...EV('If it <b>rains</b> tomorrow, we’<b>ll stay</b> home.', 'Якщо завтра буде дощ, ми залишимося вдома.'),
      ...EV('If you <b>leave</b> now, you <b>can catch</b> the last bus.', 'Якщо вийдеш зараз, устигнеш на останній автобус.')
    ] });
  add({ id: 'vX1', type: 'content', kicker: 'Vocabulary · Words for the exercises', title: 'You will need these too', items: [
    term('scanner · to flag', '/ˈskænər/ · /flæɡ/', 'сканер (вразливостей) · позначати як проблему'),
    term('admin', '/ˈædmɪn/', 'адміністратор ' + K('(short for administrator)')),
    term('plugin', '/ˈplʌɡɪn/', 'плагін, додатковий модуль'),
    term('to lock (an account)', '/lɑːk/', 'блокувати (обліковий запис)')] });
  const PF = 'Put the verb into the correct form.';
  add({ id: 'e41_1', type: 'gap', kicker: '4.1 · 1/8',
    instruction: K('Example: If you ___ (press) this button, the page reloads. → <b>press</b>') + '<br>' + PF,
    prompt: 'If a user ___ (enter) the wrong password five times, the account is locked for fifteen minutes.', placeholder: 'one word' });
  add({ id: 'e41_2', type: 'gap', kicker: '4.1 · 2/8', instruction: PF,
    prompt: 'If we ___ (not / update) the library this week, the scanner will flag it again.', placeholder: 'two words' });
  add({ id: 'e41_3', type: 'gap', kicker: '4.1 · 3/8', instruction: PF,
    prompt: 'If a site uses plain HTTP, anyone on the same Wi-Fi network ___ (can / read) the traffic.', placeholder: 'two words' });
  add({ id: 'g1q', type: 'mcq', kicker: 'Real conditions · Quick check',
    prompt: '<b>Zero or first?</b><br>If the password is wrong, the server returns an error.',
    options: ['zero: a rule, it happens every time', 'first: one likely future result'] });
  add({ id: 'e41_4', type: 'gap', kicker: '4.1 · 4/8',
    instruction: PF + '<br>Type both forms: <b>1, 2</b>',
    prompt: 'If the attacker ' + blankN(1) + ' (guess) the admin password, they ' + blankN(2) + ' (get) full access.<br>1, 2 → ___', placeholder: 'form 1, form 2' });
  add({ id: 'e41_7', type: 'gap', kicker: '4.1 · 5/8', instruction: PF,
    prompt: 'If you ___ (click) the link in that email, you will land on a fake login page.', placeholder: 'one word' });
  SAY(2, 'Якщо ми не оновимо бібліотеку цього тижня, сканер знову її позначить.',
    'If we don’t update the library this week, the scanner will flag it again.',
    'If you <b>don’t hurry</b>, we<b>’ll miss</b> the movie.', 'Якщо ти не поквапишся, ми пропустимо фільм.');
  add({ id: 'e41_8', type: 'gap', kicker: '4.1 · 6/8',
    instruction: PF + '<br>Type both forms: <b>1, 2</b>',
    prompt: 'If the input ' + blankN(1) + ' (not / check) on the server, an attacker ' + blankN(2) + ' (be able to) inject SQL code.<br>1, 2 → ___', placeholder: 'form 1, form 2' });

  /* ---------- Vocabulary B ---------- */
  add({ id: 'vB1', type: 'content', kicker: 'Vocabulary · B · 1/2', title: 'B. Identity and access', items: [
    term('authentication', '/ɔːˌθentɪˈkeɪʃn/', 'автентифікація: хто ви?'),
    term('authorization', '/ˌɔːθərəˈzeɪʃn/', 'авторизація: що вам дозволено?'),
    term('access control', '/ˈækses kənˌtroʊl/', 'керування доступом'),
    term('permission', '/pərˈmɪʃn/', 'дозвіл, право доступу')] });
  add({ id: 'vB2', type: 'content', kicker: 'Vocabulary · B · 2/2', title: 'B. Identity and access', items: [
    term('multi-factor authentication (MFA)', '/ˌmʌlti ˌfæktər ɔːˌθentɪˈkeɪʃn/', 'багатофакторна автентифікація'),
    term('session', '/ˈseʃn/', 'сеанс'),
    term('credentials', '/krəˈdenʃlz/', 'облікові дані'),
    term('password manager', '/ˈpæswɝːd ˌmænɪdʒər/', 'менеджер паролів')] });
  add({ id: 'mB', type: 'match', kicker: 'B · Quick check · 1/4',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['authentication', 'authorization', 'credentials', 'session'],
    right: ['Who are you?', 'one visit, logged in', 'What may you do?', 'a list of users', 'username + password', 'a strong firewall'] });
  add({ id: 'qB1', type: 'mcq', kicker: 'B · Quick check · 2/4',
    prompt: 'You log in with a password and then type a <b>code from your phone</b>.<br><b>This is …</b>',
    options: ['access control', 'a session', 'multi-factor authentication', 'a permission'] });
  add({ id: 'qB2', type: 'mcq', kicker: 'B · Quick check · 3/4',
    prompt: 'An app that <b>creates and remembers</b> a different strong password for every site is …',
    options: ['a session', 'a password manager', 'a permission', 'a firewall'] });
  add({ id: 'qB3', type: 'mcq', kicker: 'B · Quick check · 4/4',
    prompt: 'A user can <b>read</b> the files but cannot <b>delete</b> them.<br>For deleting, they don’t have the …',
    options: ['session', 'credentials', 'permission', 'password manager'] });
  add({ id: 'e41_6', type: 'gap', kicker: '4.1 · 7/8', instruction: PF,
    prompt: 'If the session ___ (expire), the user will have to log in again.', placeholder: 'one word' });

  /* ---------- Grammar · unless, as long as, provided that, otherwise ---------- */
  add({ id: 'g2a', type: 'content', reveal: true, kicker: 'Grammar · Conditions · 1/3',
    title: 'unless = if … not',
    items: [
      'The request is rejected <b>unless</b> the token <b>is</b> valid.',
      '✅ unless the token <b>is</b> valid<br>❌ unless the token <b>isn’t</b> valid<br>' + K('unless already contains “not”'),
      ...EV('I won’t go <b>unless</b> you <b>come</b> with me.', 'Я не піду, якщо ти не підеш зі мною.')
    ] });
  add({ id: 'g2a2', type: 'content', reveal: true, kicker: 'Grammar · Conditions · 2/3',
    title: 'as long as · provided that · otherwise',
    items: [
      '<b>as long as / provided that</b> = «за умови, що»<br>The session stays open <b>as long as</b> the user is active.',
      'More formal: access is allowed <b>provided that</b> MFA is on.',
      '<b>otherwise</b> = «інакше»<br>Change the keys now; <b>otherwise</b>, the old ones can be reused.'
    ] });
  add({ id: 'g2b', type: 'content', reveal: true, kicker: 'Grammar · Conditions · 3/3',
    title: 'Now say it: everyday English',
    items: [
      ...EV('You can borrow my car <b>as long as</b> you <b>bring</b> it back by ten.', 'Можеш узяти мою машину, аби лише повернув її до десятої.'),
      ...EV('Leave now; <b>otherwise</b>, you’ll miss the train.', 'Виходь зараз, інакше спізнишся на потяг.')
    ] });
  const RW = (a, w) => 'Rewrite: <b>' + a + '</b> ' + K('(' + w + ')');
  add({ id: 'e42_1', type: 'mcq', kicker: '4.2 · 1/6',
    prompt: K('Example: If you don’t call, I won’t come. → I won’t come <b>unless</b> you <b>call</b>.') + '<br>' +
      RW('If the token is not valid, the request is rejected.', 'unless') + '<br>The request is rejected …',
    options: ['unless the token isn’t valid.', 'unless the token is valid.', 'unless the token will be valid.'] });
  add({ id: 'e42_2', type: 'mcq', kicker: '4.2 · 2/6',
    prompt: RW('The data is safe, but only if the keys are kept secret.', 'as long as') + '<br>The data is safe ___ the keys are kept secret.',
    options: ['until', 'unless', 'as long as'] });
  add({ id: 'e42_5', type: 'gap', kicker: '4.2 · 3/6',
    instruction: RW('If users don’t turn on two-factor authentication, one stolen password is enough.', 'unless'),
    prompt: 'Unless users ___ on two-factor authentication, one stolen password is enough.', placeholder: 'one word' });
  SAY(3, 'Запит відхиляють, якщо токен недійсний. (unless)',
    'The request is rejected unless the token is valid.',
    'You can’t board the plane <b>unless</b> you <b>have</b> a passport.', 'Ти не сядеш у літак, якщо не маєш паспорта.');
  add({ id: 'e42_6', type: 'mcq', kicker: '4.2 · 4/6',
    prompt: RW('The API accepts a request only if it comes with a valid key.', 'unless'),
    options: ['The API accepts a request unless it comes with a valid key.', 'The API doesn’t accept a request unless it doesn’t come with a valid key.', 'The API doesn’t accept a request unless it comes with a valid key.'] });
  SAY(4, 'Дані в безпеці, доки ключі зберігаються в таємниці.',
    'The data is safe as long as the keys are kept secret.',
    'I’m happy <b>as long as</b> my family <b>is</b> healthy.', 'Я щасливий, доки моя родина здорова.');

  /* ---------- Vocabulary C ---------- */
  add({ id: 'vC1', type: 'content', kicker: 'Vocabulary · C · 1/2', title: 'C. Protecting data', items: [
    term('encryption', '/ɪnˈkrɪpʃn/', 'шифрування'),
    term('to hash', '/hæʃ/', 'гешувати, обчислювати геш'),
    term('salt', '/sɔːlt/', 'сіль (випадкове значення, яке додають до пароля)'),
    term('certificate', '/sərˈtɪfɪkət/', 'сертифікат')] });
  add({ id: 'vC2', type: 'content', kicker: 'Vocabulary · C · 2/2', title: 'C. Protecting data', items: [
    term('sensitive data', '/ˌsensətɪv ˈdeɪtə/', 'чутливі (конфіденційні) дані'),
    term('plain text', '/ˌpleɪn ˈtekst/', 'відкритий (незашифрований) текст'),
    term('input validation', '/ˈɪnpʊt ˌvælɪˈdeɪʃn/', 'перевірка вхідних даних'),
    term('least privilege', '/ˌliːst ˈprɪvəlɪdʒ/', '(принцип) найменших привілеїв')] });
  add({ id: 'mC', type: 'match', kicker: 'C · Quick check · 1/3',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['salt', 'certificate', 'plain text', 'least privilege'],
    right: ['proves a site’s identity', 'only the access needed', 'random value added', 'readable, not encrypted', 'a slow algorithm', 'a list of attacks'] });
  add({ id: 'qC1', type: 'mcq', kicker: 'C · Quick check · 2/3',
    prompt: 'Card numbers, medical records, passport scans: all of them are …',
    options: ['plain text', 'input validation', 'sensitive data', 'encryption'] });
  add({ id: 'qC2', type: 'mcq', kicker: 'C · Quick check · 3/3',
    prompt: 'The server checks that the <b>“age”</b> field contains only a number from 1 to 120.<br><b>This is …</b>',
    options: ['input validation', 'encryption', 'least privilege', 'a certificate'] });
  add({ id: 'e41_5', type: 'gap', kicker: '4.1 · 8/8', instruction: PF,
    prompt: 'Passwords ___ (be) much harder to crack if they are hashed with a slow algorithm such as bcrypt.', placeholder: 'one word' });
  SAY(1, 'Якщо пароль зберігають відкритим текстом, його може прочитати будь-хто з доступом до бази даних.',
    'If a password is stored in plain text, anyone with access to the database can read it.',
    'If you <b>leave</b> milk out of the fridge, it <b>goes</b> bad.', 'Якщо залишити молоко поза холодильником, воно скисає.');
  add({ id: 'e42_4', type: 'gap', kicker: '4.2 · 5/6',
    instruction: RW('You can store the file in the cloud, but only if it is encrypted.', 'provided that'),
    prompt: 'You can store the file in the cloud ___ it is encrypted.', placeholder: 'two words' });

  /* ---------- Vocabulary D ---------- */
  add({ id: 'vD1', type: 'content', kicker: 'Vocabulary · D · 1/2', title: 'D. Finding and fixing flaws', items: [
    term('data breach', '/ˈdeɪtə briːtʃ/', 'злам (порушення захисту) даних'),
    term('flaw', '/flɔː/', 'вада, хиба'),
    term('to patch', '/pætʃ/', 'латати, встановлювати виправлення'),
    term('penetration test', '/ˌpenəˈtreɪʃn test/', 'тест на проникнення')] });
  add({ id: 'vD2', type: 'content', kicker: 'Vocabulary · D · 2/2', title: 'D. Finding and fixing flaws', items: [
    term('bug bounty program', '/ˈbʌɡ ˌbaʊnti ˌproʊɡræm/', 'програма винагород за знайдені вразливості'),
    term('dependency', '/dɪˈpendənsi/', 'залежність (стороння бібліотека)'),
    term('to compromise', '/ˈkɑːmprəmaɪz/', 'зламувати, компрометувати'),
    term('attack surface', '/əˈtæk ˌsɝːfəs/', 'поверхня атаки')] });
  add({ id: 'mD', type: 'match', kicker: 'D · Quick check · 1/3',
    prompt: 'What does each term (1–4) mean? Two options (a–f) are extra.',
    left: ['penetration test', 'bug bounty program', 'dependency', 'attack surface'],
    right: ['a library you use', 'rewards for found flaws', 'all possible entry points', 'a planned, allowed attack', 'a stolen database', 'a new feature'] });
  add({ id: 'qD1', type: 'mcq', kicker: 'D · Quick check · 2/3',
    prompt: 'Attackers got into the network and copied <b>two million</b> customer records.<br><b>This is …</b>',
    options: ['a flaw', 'a data breach', 'a patch', 'a dependency'] });
  add({ id: 'qD2', type: 'mcq', kicker: 'D · Quick check · 3/3',
    prompt: 'An attacker took over the admin account.<br><b>The account was …</b>',
    options: ['patched', 'flagged', 'compromised', 'validated'] });
  add({ id: 'e42_3', type: 'gap', kicker: '4.2 · 6/6',
    instruction: RW('Update the plugin today. If you don’t, attackers can use the known flaw.', 'otherwise'),
    prompt: 'Update the plugin today; ___, attackers can use the known flaw.', placeholder: 'one word' });
  SAY(5, 'Оновіть плагін сьогодні, інакше зловмисники скористаються відомою вадою.',
    'Update the plugin today; otherwise, attackers will use the known flaw.',
    'Charge your phone now; <b>otherwise</b>, it’ll die on the way.', 'Заряди телефон зараз, інакше він розрядиться в дорозі.');

  /* ---------- Grammar · Unreal now (second conditional) ---------- */
  add({ id: 'g3a', type: 'content', reveal: true, kicker: 'Grammar · Unreal conditions · 1/2',
    title: 'Not real: if + past, would / could / might',
    items: [
      'If an attacker <b>stole</b> the database, the hashes <b>would</b> still be hard to use.<br>' + K('past form = “not real”, not past time'),
      'Threat modeling: What <b>would</b> happen if someone <b>uploaded</b> a script instead of a photo?',
      'Advice: If I <b>were</b> you, I<b>’d</b> turn on MFA. ' + K('❌ If I would be you')
    ] });
  add({ id: 'g3b', type: 'content', reveal: true, kicker: 'Grammar · Unreal conditions · 2/2',
    title: 'Now say it: everyday English',
    items: [
      ...EV('If I <b>had</b> more free time, I <b>would learn</b> the guitar.', 'Якби я мав більше вільного часу, то навчився б грати на гітарі.'),
      ...EV('If I <b>were</b> you, I<b>’d take</b> the job.', 'На твоєму місці я погодився б на цю роботу.')
    ] });
  add({ id: 'g3q', type: 'mcq', kicker: 'Unreal conditions · Quick check',
    prompt: 'What would happen if the admin password ___ public?',
    options: ['becomes', 'became', 'would become'] });
  add({ id: 'e43_1', type: 'gap', kicker: '4.3 · 1/6',
    instruction: K('Example: I don’t have a car, so I walk. → If I <b>had</b> a car, I wouldn’t walk.') + '<br>' +
      RW('We don’t have a bug bounty program, so researchers don’t report flaws to us.', 'If we …'),
    prompt: 'If we ___ a bug bounty program, researchers would report flaws to us.', placeholder: 'one word' });
  SAY(6, 'Якби зловмисник викрав базу даних, геші паролів мало чим би йому допомогли.',
    'If an attacker stole the database, the password hashes wouldn’t help them much.',
    'If I <b>won</b> the lottery, I <b>would travel</b> the world.', 'Якби я виграв у лотерею, то подорожував би світом.');
  add({ id: 'e43_5', type: 'gap', kicker: '4.3 · 2/6',
    instruction: RW('I’m not the team lead, so I can’t make everyone use a password manager.', 'If I …') + '<br>Type both words: <b>1, 2</b>',
    prompt: 'If I ' + blankN(1) + ' the team lead, I ' + blankN(2) + ' make everyone use a password manager.<br>1, 2 → ___', placeholder: 'word 1, word 2' });
  SAY(7, 'На вашому місці я б увімкнув двофакторну автентифікацію.',
    'If I were you, I would turn on two-factor authentication.',
    'If I <b>were</b> you, I<b>’d call</b> her right now.', 'На твоєму місці я б зараз же їй подзвонив.');

  /* ---------- Grammar · Unreal past (third conditional, should have) ---------- */
  add({ id: 'g4a', type: 'content', reveal: true, kicker: 'Grammar · The past we can’t change · 1/3',
    title: '«Якби»: now or then?',
    items: [
      '«Якби сервер оновили» — today or in March 2017? <b>English must choose.</b>',
      '<b>Now</b> (2nd): If the server <b>were</b> patched, we <b>would</b> sleep better.',
      '<b>Past</b> (3rd): if + <b>had</b> + V3, <b>would have</b> + V3<br>If the server <b>had been patched</b> in March, the breach <b>would not have happened</b>.'
    ] });
  add({ id: 'g4a2', type: 'content', reveal: true, kicker: 'Grammar · The past we can’t change · 2/3',
    title: 'No would after if · should have',
    items: [
      '✅ if they <b>had patched</b><br>❌ if they <b>would have</b> patched',
      '<b>should have</b> + V3 = criticism or regret about the past<br>We <b>should have changed</b> the keys last year.'
    ] });
  add({ id: 'g4q', type: 'mcq', kicker: 'The past · Quick check',
    prompt: 'We didn’t change the keys last year. That was a mistake.<br>We ___ the keys last year.',
    options: ['should change', 'should have changed', 'had changed'] });
  add({ id: 'g4b', type: 'content', reveal: true, kicker: 'Grammar · The past we can’t change · 3/3',
    title: 'Now say it: everyday English',
    items: [
      ...EV('If I <b>had left</b> earlier, I <b>wouldn’t have missed</b> the train.', 'Якби я вийшов раніше, то не спізнився б на потяг.'),
      ...EV('I <b>should have listened</b> to my mom.', 'Мені слід було послухати маму.')
    ] });
  add({ id: 'e43_2', type: 'mcq', kicker: '4.3 · 3/6',
    prompt: RW('The company didn’t patch the server, so the attackers got in.', 'If the company …') + '<br>If the company …',
    options: ['would have patched the server, the attackers wouldn’t have gotten in.', 'had patched the server, the attackers wouldn’t have gotten in.', 'patched the server, the attackers wouldn’t get in.'] });
  add({ id: 'e43_3', type: 'gap', kicker: '4.3 · 4/6',
    instruction: RW('The passwords weren’t hashed, so they were exposed in plain text.', 'If the passwords …'),
    prompt: 'If the passwords ___ hashed, they wouldn’t have been exposed in plain text.', placeholder: 'two words' });
  add({ id: 'e43_4', type: 'gap', kicker: '4.3 · 5/6',
    instruction: RW('Nobody noticed the expired certificate, so the attack went unnoticed for weeks.', 'If somebody …'),
    prompt: 'If somebody ___ the expired certificate, the attack wouldn’t have gone unnoticed for weeks.', placeholder: 'two words' });
  SAY(8, 'Якби компанія встановила виправлення в березні, зламу не сталося б.',
    'If the company had installed the patch in March, the breach wouldn’t have happened.',
    'If you <b>had told</b> me, I <b>would have helped</b>.', 'Якби ти мені сказав, я б допоміг.');
  add({ id: 'e43_6', type: 'gap', kicker: '4.3 · 6/6',
    instruction: RW('They didn’t test the login form properly, and now we have to fix it in production.', 'should have'),
    prompt: 'They ___ the login form properly.', placeholder: 'three words' });
  SAY(9, 'Нам слід було вчасно змінити ключі.',
    'We should have changed (rotated) the keys on time.',
    'I <b>should have bought</b> the tickets earlier.', 'Мені слід було купити квитки раніше.');

  /* ---------- 4.4 · Grammar mistakes ---------- */
  FM('fm1', 1, 'If the token will expire, the user is logged out.',
    ['If the token will expire,', 'the user', 'is logged out'], true);
  FM('fm2', 2, 'The request is rejected unless the token isn’t valid.',
    ['The request', 'is rejected', 'unless the token isn’t valid']);
  FM('fm3', 3, 'If Equifax would have patched the server in March, the breach would not have happened.',
    ['If Equifax would have patched the server in March,', 'the breach would not have happened']);
  add({ id: 'fm3fix', type: 'gap', kicker: '4.4 · Correct it',
    instruction: '<s>If Equifax would have patched the server in March, …</s><br>Write the correct verb form.',
    prompt: 'If Equifax ___ the server in March, the breach would not have happened.', placeholder: 'two words' });
  FM('fm4', 4, 'If I would be you, I would change the password today.',
    ['If I would be you,', 'I would change', 'the password today']);

  /* ---------- Traps + 4.5 + 4.4 (words) ---------- */
  add({ id: 'tsec', type: 'end', kicker: 'Vocabulary',
    title: 'Words that trick you',
    text: 'Same Ukrainian word, different English words' });
  const trap = (pair, uk, ex) => SM('<b>' + pair + '</b><br>' + K(uk) + '<br><i>' + ex + '</i>');
  const T45 = 'Choose the correct word.';
  add({ id: 't1', type: 'content', reveal: true, kicker: 'Traps · 1/4', title: 'Words that trick you', items: [
    trap('security ≠ safety', 'security — захист від навмисних дій (зламу, крадіжки) · safety — захист від випадкової шкоди, передусім для людей',
      'Two-factor login improves security; fire extinguishers are a safety measure.'),
    trap('password ≠ parole', '«пароль» = password · parole — умовно-дострокове звільнення',
      'Enter your password; the prisoner was released on parole.')] });
  add({ id: 'e45_1', type: 'mcq', kicker: '4.5 · 1/8', prompt: T45 + '<br>Fire extinguishers and rubber mats in the server room are ___ measures.', options: ['security', 'safety'] });
  add({ id: 'e45_8', type: 'mcq', kicker: '4.5 · 2/8', prompt: T45 + '<br>You will be asked for your ___ again after thirty minutes of inactivity.', options: ['parole', 'password'] });
  add({ id: 'fm5', type: 'gap', kicker: '4.4 · Correct it · 5/8',
    instruction: '<s>Never send your parole by email.</s><br>Replace the wrong word.',
    prompt: 'Never send your ___ by email.', placeholder: 'one word' });
  SAY(11, 'Ніколи не надсилайте свій пароль електронною поштою.',
    'Never send your password by email.',
    'Never <b>leave</b> your bag unattended at the airport.', 'Ніколи не залишайте сумку без нагляду в аеропорту.');

  add({ id: 't2', type: 'content', reveal: true, kicker: 'Traps · 2/4', title: 'Words that trick you', items: [
    trap('authentication ≠ authorization', 'authentication — хто ви · authorization — що вам дозволено · «авторизуватися» (увійти) = log in',
      'You authenticate with a password; authorization decides if you can delete posts.'),
    trap('attacker ≠ hacker', '«хакер» у значенні «зловмисник» = attacker · hacker — нейтральне, часом схвальне слово (ethical hacker)',
      'The attacker stole the data; the company pays ethical hackers to find flaws.')] });
  add({ id: 'e45_3', type: 'mcq', kicker: '4.5 · 3/8', prompt: T45 + '<br>First, the site checks who you are — that is ___; then it checks what you may do.', options: ['authorization', 'authentication'] });
  add({ id: 'e45_4', type: 'mcq', kicker: '4.5 · 4/8', prompt: T45 + '<br>The company pays ethical ___ to test its website.', options: ['hackers', 'attackers'] });
  FM('fm6', 6, 'After you authorize with your email and password, the site opens your dashboard.',
    ['After you authorize', 'with your email and password,', 'the site opens your dashboard']);
  SAY(10, 'Спершу сайт перевіряє, хто ви, а потім — що вам дозволено робити.',
    'First, the site checks who you are, and then what you are allowed to do.',
    'First, the guard <b>checks who you are</b>, then <b>where you’re allowed</b> to go.', 'Спершу охоронець перевіряє, хто ви, а потім — куди вам можна йти.');
  SAY(13, 'Компанія запросила етичних хакерів перевірити свій вебсайт.',
    'The company invited ethical hackers to test its website.',
    'We <b>invited</b> a friend <b>to check</b> our new apartment for problems.', 'Ми запросили друга перевірити нашу нову квартиру на вади.');

  add({ id: 't3', type: 'content', reveal: true, kicker: 'Traps · 3/4', title: 'Words that trick you', items: [
    trap('hash ≠ encrypt', '«шифрувати паролі» = hash passwords (безповоротно) · encrypt — шифрувати з можливістю розшифрувати ключем',
      'Passwords are hashed; card numbers are encrypted.'),
    trap('breach ≠ leak', 'breach — злам, несанкціонований доступ до даних · leak — витік, часто випадковий, без атаки',
      'The breach began with an unpatched server; the leak happened because a file was left public.')] });
  add({ id: 'e45_5', type: 'mcq', kicker: '4.5 · 5/8', prompt: T45 + '<br>Passwords must never be stored in a form that can be turned back into text, so they are ___.', options: ['encrypted', 'hashed'] });
  add({ id: 'e45_2', type: 'mcq', kicker: '4.5 · 6/8', prompt: T45 + '<br>Criminals got into the network and stole customer records; the ___ was discovered two months later.', options: ['breach', 'leak'] });
  FM('fm7', 7, 'The database stores users’ passwords encrypted with bcrypt.',
    ['The database stores', 'users’ passwords', 'encrypted with bcrypt']);
  SAY(14, 'Паролі не шифрують, а гешують із сіллю.',
    'Passwords aren’t encrypted; they’re hashed with a salt.',
    'This isn’t <b>tea</b>; it’s <b>coffee</b> with milk.', 'Це не чай, а кава з молоком.');

  add({ id: 't4', type: 'content', reveal: true, kicker: 'Traps · 4/4', title: 'Words that trick you', items: [
    trap('crack ≠ break', '«зламати пароль, геш» = crack · break — пошкодити, порушити роботу · «зламати сайт» = hack into, compromise',
      'Weak passwords are cracked in seconds; the update broke the checkout page.'),
    trap('sensitive ≠ sensible', '«чутливі, конфіденційні дані» = sensitive data · sensible — розсудливий, розумний',
      'Card numbers are sensitive data; a sensible rule is never to log them.')] });
  add({ id: 'e45_6', type: 'mcq', kicker: '4.5 · 7/8', prompt: T45 + '<br>With a modern graphics card, a short password can be ___ in minutes.', options: ['broken', 'cracked'] });
  add({ id: 'e45_7', type: 'mcq', kicker: '4.5 · 8/8', prompt: T45 + '<br>Do not write ___ data such as card numbers to log files.', options: ['sensitive', 'sensible'] });
  add({ id: 'fm8', type: 'gap', kicker: '4.4 · Correct it · 8/8',
    instruction: '<s>Medical records are sensible data and must be protected.</s><br>Replace the wrong word.',
    prompt: 'Medical records are ___ data and must be protected.', placeholder: 'one word' });
  SAY(12, 'Не записуйте чутливі дані в журнали.',
    'Don’t write sensitive data to the logs.',
    'Don’t <b>post</b> your boarding pass online: it has <b>personal</b> data.', 'Не публікуйте посадковий талон в інтернеті: на ньому персональні дані.');
  add({ id: 'fmyou', type: 'open', kicker: '4.4 · Your turn',
    prompt: 'Which mistake from 4.4 do <b>you</b> make most often?<br>Write the wrong version and the correct one.',
    placeholder: '❌ … → ✅ …' });

  /* ---------- Reading ---------- */
  add({ id: 'rsec', type: 'end', kicker: 'Reading',
    title: 'The Door Nobody Locked',
    text: 'One unpatched server and what it taught the industry' });
  add({ id: 'rv', type: 'content', kicker: 'Reading · Before you read', title: 'Five more words', items: [
    term('intrusion', '/ɪnˈtruːʒn/', 'вторгнення'),
    term('settlement', '/ˈsetlmənt/', 'мирова угода'),
    term('preventable', '/prɪˈventəbl/', 'такий, якому можна запобігти'),
    term('invoice', '/ˈɪnvɔɪs/', 'рахунок (до оплати)')] });
  add({ id: 'r0', type: 'open', kicker: 'Reading · Predict',
    prompt: PH('door.jpg', 'A heavy vault door left open while a hooded figure reaches inside', '50% 50%', 120) +
      'The text is called <b>“The Door Nobody Locked”</b>.<br>In a web application, <b>what could an unlocked door be?</b> Give two examples.',
    placeholder: 'an old version of…, a page that…' });

  const PARA = [
    'In March 2017, the team behind Apache Struts, a popular framework for Java web applications, published a fix for a critical <b>vulnerability</b>. Any server that still ran an old version could be taken over with a single, specially crafted request, and attacks began almost immediately. At Equifax, one of the three largest credit reporting agencies in the United States, an order to update was sent out — but one online portal was never <b>patched</b>.<br>' + K('credit reporting agency = a company that collects credit histories'),
    'In mid-May, attackers found it and got in. By the time the <b>intrusion</b> was discovered at the end of July, the personal data of about 147 million people <b>had been stolen</b>. The attack went unnoticed partly because a security <b>certificate</b> on a traffic-inspection device had expired long before, so encrypted traffic was not being checked.',
    'The company later agreed to pay up to 700 million dollars in a <b>settlement</b>, and a US congressional report described the <b>breach</b> as entirely <b>preventable</b>: <b>if</b> the server <b>had been patched</b> in March, the attackers <b>would have found</b> the door locked.',
    'The lesson is uncomfortable. Attackers rarely need brilliant tricks; far more often, they look for doors that nobody locked. That is why security teams practice thinking like an <b>attacker</b>. When they design a new feature, they ask questions such as: <b>What would happen if</b> someone <b>used</b> this form in a way we did not expect? What if a user <b>were</b> not who they claimed to be? This practice is known as <b>threat modeling</b>, and it is much cheaper than a breach.',
    'The classic unlocked door is injection. <b>If</b> an application <b>builds</b> a database query by pasting the user’s input directly into it, an attacker <b>can type</b> SQL code instead of a name, and the database will run it. The same mistake in a web page leads to <b>cross-site scripting</b>, in which a script typed into a comment field runs in other visitors’ browsers.',
    'The defense is well known: input <b>is validated</b> on the server, and queries are built with parameters so that user data is never treated as code. Injection has appeared in every edition of the OWASP Top 10, the best-known list of critical web application risks, since the first one in 2003.',
    'Yet in the 2025 edition, first place goes to a quieter problem: broken <b>access control</b>. <b>Authentication</b> answers the question “Who are you?”; <b>authorization</b> answers “What are you allowed to do?” Many applications ask only the first question. Imagine a user who opens /invoices/1043, changes the number to 1044 and receives somebody else’s <b>invoice</b>.',
    'The application has checked who the user is, but not whether the invoice belongs to them. The cure is to check <b>permissions</b> on the server for every request and to follow the principle of <b>least privilege</b>: each user and each service gets only the access it really needs.',
    'Passwords deserve special care. A well-built site never stores them in <b>plain text</b>, and it does not simply encrypt them either. Instead, each password is combined with a random <b>salt</b> and <b>hashed</b> with a deliberately slow algorithm such as bcrypt or Argon2. <b>Unless</b> an attacker <b>has</b> enormous computing power, stolen hashes of strong passwords are practically useless.',
    'Still, the best protection is to make a stolen password insufficient on its own. Microsoft has estimated that an account protected by <b>multi-factor authentication</b> is more than 99.9 percent less likely to be <b>compromised</b>.',
    'No web application is perfectly secure. Every new <b>dependency</b>, form and API endpoint adds to the <b>attack surface</b>, and new vulnerabilities are published every day. What matters is how quickly the unlocked doors are found — ideally by the team itself, through code reviews, <b>penetration tests</b> and <b>bug bounty programs</b>, before an attacker tries the handle.'
  ];
  const PN = ['1 · 1/3', '1 · 2/3', '1 · 3/3', '2', '3 · 1/2', '3 · 2/2', '4 · 1/2', '4 · 2/2', '5 · 1/2', '5 · 2/2', '6'];
  const PID = ['r1', 'r1b', 'r1c', 'r2', 'r3', 'r3b', 'r4', 'r4b', 'r5', 'r5b', 'r6'];
  const para = (i) => add({ id: PID[i], type: 'content', kicker: 'Reading · The Door Nobody Locked', title: 'Paragraph ' + PN[i] + ' of 6', items: [SM(PARA[i])] });

  para(0);
  add({ id: 'e46_1', type: 'mcq', kicker: '4.6 · 1/5', prompt: PH('servers.jpg', 'A row of server racks with green lights and one red light', '50% 50%', 80) + 'The Equifax attackers got in because …',
    options: ['an employee’s password was stolen.', 'a server was still running an old version of Struts.', 'they used a flaw nobody knew about.', 'the company had no firewall.'] });
  para(1);
  add({ id: 'e46_2', type: 'mcq', kicker: '4.6 · 2/5', prompt: 'The attack stayed hidden for weeks partly because …',
    options: ['the attackers deleted the logs.', 'most staff were on summer vacation.', 'encrypted traffic was not being inspected.', 'the stolen data was never used.'] });
  para(2);
  add({ id: 'r1q', type: 'mcq', kicker: 'Paragraph 1 · Grammar in the text',
    prompt: '“If the server <b>had been patched</b> in March, the attackers <b>would have found</b> the door locked.”<br><b>Was the server patched in March?</b>',
    options: ['Yes', 'No'] });
  para(3);
  add({ id: 'e46_3', type: 'mcq', kicker: '4.6 · 3/5', prompt: 'During threat modeling, security teams mainly ask …',
    options: ['how a system could be used in unexpected ways.', 'how much the project will cost.', 'how fast the application should run.', 'who the attackers are.'] });
  para(4); para(5);
  add({ id: 'r3q', type: 'mcq', kicker: 'Paragraph 3 · Check',
    prompt: 'What is the <b>defense</b> against injection?',
    options: ['hiding the database from users', 'validating input on the server and using parameters in queries', 'removing all comment fields', 'encrypting the whole database'] });
  para(6); para(7);
  add({ id: 'e46_4', type: 'mcq', kicker: '4.6 · 4/5', prompt: 'In the invoice example, the application …',
    options: ['was open to SQL injection.', 'did not check who the user was.', 'stored invoices in plain text.', 'did not check whether the user had the right to see the invoice.'] });
  para(8); para(9);
  add({ id: 'r5q', type: 'mcq', kicker: 'Paragraph 5 · Check',
    prompt: 'According to the text, what is the <b>best</b> protection for passwords?',
    options: ['a very long salt', 'a faster algorithm', 'making a stolen password not enough on its own', 'encrypting passwords with a secret key'] });
  para(10);
  add({ id: 'e46_5', type: 'mcq', kicker: '4.6 · 5/5', prompt: 'The main idea of the final paragraph is that …',
    options: ['perfect security can be reached with enough effort.', 'teams should stop adding new features.', 'security depends on finding weaknesses quickly.', 'attackers always win in the end.'] });

  const FIND = 'Find a word or phrase in the text.';
  add({ id: 'e47_1', type: 'gap', kicker: '4.7 · 1/6', instruction: FIND, prompt: 'a weakness in software that an attacker can use → ___', placeholder: 'one word' });
  add({ id: 'e47_2', type: 'gap', kicker: '4.7 · 2/6', instruction: FIND, prompt: 'to install a fix for a known weakness → ___', placeholder: 'one or two words' });
  add({ id: 'mR', type: 'match', kicker: '4.7 · Words before the text · Match',
    prompt: 'What does each word (1–4) mean? Two options (a–f) are extra.',
    left: ['intrusion', 'settlement', 'preventable', 'invoice'],
    right: ['could be stopped', 'a bill to pay', 'a court fine', 'getting in without permission', 'an out-of-court deal', 'a list of users'] });
  add({ id: 'e47_3', type: 'gap', kicker: '4.7 · 3/6', instruction: FIND, prompt: 'imagining in advance how a system could be attacked → ___', placeholder: 'two words' });
  add({ id: 'e47_4', type: 'gap', kicker: '4.7 · 4/6', instruction: FIND, prompt: 'checking what a user is allowed to do → ___', placeholder: 'one word' });
  add({ id: 'rq', type: 'mcq', kicker: 'Reading · Your view',
    prompt: 'Which <b>unlocked door</b> from the text is the easiest to leave open <b>by accident</b>?<br>' + K('Be ready to explain why.'),
    options: ['an unpatched server', 'an injection flaw', 'a missing permission check', 'a password without MFA'] });
  add({ id: 'e47_5', type: 'gap', kicker: '4.7 · 5/6', instruction: FIND, prompt: 'a random value added to a password before it is hashed → ___', placeholder: 'one word' });
  add({ id: 'e47_6', type: 'gap', kicker: '4.7 · 6/6', instruction: FIND, prompt: 'all the places where an attacker could try to get in → ___', placeholder: 'two words' });

  /* ---------- Keyword drill ---------- */
  add({ id: 'k0', type: 'content', kicker: '4.8 · Keyword drill', title: 'Build the sentence', items: [
    'You see only the <b>keywords</b> from the text, in the right order.',
    'Add articles and prepositions. Choose the tense, <b>active or passive</b> and the <b>type of condition</b>.',
    'Say your sentence → compare → repeat the target 3 times.'] });
  const KW = [
    ['fix · critical · flaw · publish · one · server · never · patch',
      'A <b>fix</b> for the <b>critical flaw</b> was <b>published</b>, but <b>one server</b> was <b>never patched</b>.',
      'Виправлення критичної вади оприлюднили, але один сервер так і не залатали.'],
    ['attacker · rarely · need · clever · trick · look for · door · nobody · lock',
      'To be honest, <b>attackers rarely need clever tricks</b>; they <b>look for doors nobody</b> has <b>locked</b>.',
      'Чесно кажучи, зловмисникам рідко потрібні хитрі трюки: вони шукають двері, які ніхто не замкнув.'],
    ['what · happen · if · someone · use · form · way · not · expect',
      '<b>What</b> would <b>happen if someone used</b> this <b>form</b> in a <b>way</b> we <b>didn’t expect</b>?',
      'Що станеться, якби хтось скористався цією формою так, як ми не очікували?'],
    ['application · check · who · user · not · whether · invoice · belong',
      'The <b>application checked who</b> the <b>user</b> was, but <b>not whether</b> the <b>invoice belonged</b> to them.',
      'Застосунок перевірив, хто такий користувач, але не те, чи належить йому рахунок.'],
    ['unless · attacker · have · enormous · computing power · stolen · hash · useless',
      'Honestly, <b>unless</b> an <b>attacker has enormous computing power</b>, <b>stolen hashes</b> are almost <b>useless</b>.',
      'Правду кажучи, якщо зловмисник не має величезних обчислювальних потужностей, викрадені геші майже марні.'],
    ['if · server · patch · March · breach · prevent',
      '<b>If</b> the <b>server</b> had been <b>patched</b> in <b>March</b>, the <b>breach</b> would have been <b>prevented</b>.',
      'Якби сервер залатали ще в березні, зламові можна було б запобігти.']
  ];
  const kw = (i) => add({ id: 'k' + (i + 1), type: 'content', reveal: true,
    kicker: '4.8 · Keyword drill · ' + (i + 1) + '/6', title: KW[i][0], items: [KW[i][1], K(KW[i][2])] });
  kw(0); kw(1); kw(2);
  add({ id: 'kq', type: 'mcq', kicker: '4.8 · Keyword drill · Halfway',
    prompt: 'What was <b>hardest</b> so far?',
    options: ['the passive (was published)', 'the type of condition', 'articles: a / the', 'prepositions'] });
  kw(3); kw(4); kw(5);
  add({ id: 'kfin', type: 'content', kicker: '4.8 · Keyword drill · All six', title: 'Now without the targets', items: [
    SM('<b>1.</b> fix · critical · flaw · publish · one · server · never · patch<br><b>2.</b> attacker · rarely · need · clever · trick · look for · door · nobody · lock<br><b>3.</b> what · happen · if · someone · use · form · way · not · expect'),
    SM('<b>4.</b> application · check · who · user · not · whether · invoice · belong<br><b>5.</b> unless · attacker · have · enormous · computing power · stolen · hash · useless<br><b>6.</b> if · server · patch · March · breach · prevent')] });

  /* ---------- Listening ---------- */
  add({ id: 'a0', type: 'end', kicker: 'Listening',
    title: 'The Brief',
    text: 'The same story, told for listeners' });
  add({ id: 'a1', type: 'open', kicker: 'Listening · Before you listen · 1/3',
    prompt: 'The audio gives <b>three ways</b> to find the unlocked doors first.<br>From the text, <b>which three do you expect?</b>',
    placeholder: '1) thinking like an attacker 2) … 3) …' });
  add({ id: 'a2', type: 'content', kicker: 'Listening · Before you listen · 2/3', title: 'Words from the audio', items: [
    term('to jiggle a doorknob', '/ˈdʒɪɡl ə ˈdɔːrnɑːb/', 'смикати дверну ручку (перевіряти, чи відчинено)'),
    term('to slip inside', '/ˌslɪp ɪnˈsaɪd/', 'прослизнути всередину'),
    term('backstop', '/ˈbækstɑːp/', 'остання лінія захисту, запобіжник'),
    term('blind spot', '/ˈblaɪnd spɑːt/', 'сліпа зона, чого ми не помічаємо')] });
  add({ id: 'a3', type: 'content', kicker: 'Listening · Before you listen · 3/3', title: 'While you listen', items: [
    '<b>1.</b> What are attackers <b>compared to</b>?',
    '<b>2.</b> What everyday action is threat modeling <b>like</b>?',
    '<b>3.</b> What is the <b>ultimate backstop</b>?',
    K('Spoken: <b>you know</b>, <b>basically</b>, <b>kind of like</b>, <b>we gotta</b> = we have got to')] });
  add({ id: 'a4', type: 'end', kicker: 'Listening · 1st time',
    title: '🎧 Listen',
    text: 'Answer the three questions in your head.' });
  add({ id: 'L1', type: 'mcq', kicker: 'After listening · 1/10',
    prompt: 'Attackers are compared to people who …',
    options: ['pick locks with special tools.', 'jiggle doorknobs to find an unlocked door.', 'break windows at night.', 'follow you home.'] });
  add({ id: 'L2', type: 'mcq', kicker: 'After listening · 2/10',
    prompt: 'Threat modeling is <b>kind of like</b> …',
    options: ['checking your first-floor windows before a vacation.', 'installing an alarm after a break-in.', 'hiring a guard for your house.', 'changing all the locks every year.'] });
  add({ id: 'L3', type: 'mcq', kicker: 'After listening · 3/10',
    prompt: 'The speaker calls ___ “the ultimate backstop”.',
    options: ['bcrypt', 'random salt', 'multi-factor authentication', 'a bug bounty program'] });
  add({ id: 'a5', type: 'end', kicker: 'Listening · 2nd time',
    title: '🎧 Listen again',
    text: 'Now catch the numbers.' });
  const NUM = 'Complete with a number.';
  add({ id: 'L4', type: 'gap', kicker: 'After listening · 4/10', instruction: NUM,
    prompt: 'The Equifax breach: one unpatched server, 147 million stolen records and a $___ million settlement.', placeholder: 'a number' });
  add({ id: 'L5', type: 'gap', kicker: 'After listening · 5/10', instruction: NUM,
    prompt: 'Change the invoice number in the URL from 1043 to ___, and you see someone else’s bill.', placeholder: 'a number' });
  add({ id: 'L6', type: 'gap', kicker: 'After listening · 6/10', instruction: NUM,
    prompt: 'MFA makes an account over ___% less likely to be compromised.', placeholder: 'a number' });
  add({ id: 'L7', type: 'mcq', kicker: 'After listening · 7/10',
    prompt: 'Text or audio? Which reason for the <b>long-hidden</b> Equifax attack is in the <b>text</b> but <b>not</b> in the audio?',
    options: ['the unpatched server', 'the expired certificate', 'the 147 million records', 'the settlement'] });
  add({ id: 'L8', type: 'mcq', kicker: 'After listening · 8/10',
    prompt: 'Which phrase sounds <b>spoken</b>, not written?',
    options: ['Passwords deserve special care.', 'No web application is perfectly secure.', 'Finally, we gotta talk passwords.', 'The cure is to check permissions on the server.'] });
  add({ id: 'L9', type: 'mcq', kicker: 'After listening · 9/10',
    prompt: 'The audio calls the 2025 number-one threat …',
    options: ['injection.', 'broken access control.', 'phishing.', 'malware.'] });
  add({ id: 'L10', type: 'open', kicker: 'After listening · 10/10',
    prompt: 'The speaker ends with a question about <b>bug bounty programs</b>.<br>Would you <b>pay strangers</b> to attack your app? Give <b>one benefit</b> and <b>one risk</b>.',
    placeholder: 'I would / wouldn’t, because… The risk is that…' });
  add({ id: 'mL', type: 'match', kicker: 'After listening · Words from the audio',
    prompt: 'What does each expression (1–4) mean? Two options (a–f) are extra.',
    left: ['to jiggle a doorknob', 'to slip inside', 'backstop', 'blind spot'],
    right: ['the last protection', 'to break a door', 'to get in quietly', 'an unseen weak point', 'to try the handle', 'a strong password'] });

  /* ---------- Speaking A · Threat modeling (speculate) ---------- */
  add({ id: 'spA1', type: 'content', reveal: true, kicker: 'Speaking A · One student at a time', format: 'speculate',
    title: 'Threat modeling session', items: [
      PH('windows.jpg', 'A man with a suitcase checking that a window is locked before a trip', '60% 45%', 96) + 'The teacher opens <b>one feature</b>. <b>One student</b> thinks like an attacker.',
      '<b>Step 1:</b> What would happen if someone …?',
      '<b>Step 2:</b> How do we stop it? Use <b>unless / as long as / provided that</b>.'] });
  add({ id: 'spA2', type: 'content', kicker: 'Speaking A · Example', title: 'How it sounds', items: [
    SM('<b>Feature:</b> a “Forgot password?” link'),
    SM('<i><b>What would happen if</b> someone <b>requested</b> a reset for my email a hundred times? I <b>would get</b> a hundred emails, and the real one could get lost. So the reset works <b>only as long as</b> there are fewer than three requests an hour, and the link expires <b>unless</b> it is used in fifteen minutes.</i>'),
    '<b>Listeners:</b> add one more “What if…?” for the same feature.'] });
  add({ id: 'spA3', type: 'content', reveal: true, kicker: 'Speaking A · The features', title: 'One feature, one student', items: [
    SM('📷 <b>1.</b> Upload a profile photo'),
    SM('🔗 <b>2.</b> “Share this document” link'),
    SM('🎟️ <b>3.</b> A coupon code field at checkout'),
    SM('📄 <b>4.</b> Download your invoice as a PDF: /invoice?id=1043')] });

  /* ---------- Dialogues ---------- */
  const L = (who, t) => SM('<b>' + who + ':</b> ' + t);
  add({ id: 'd1q', type: 'mcq', kicker: 'Dialogue 1 · Before you read',
    prompt: PH('review.jpg', 'Two developers reviewing code together at one monitor', '50% 40%', 84) +
      'A colleague’s pull request has a <b>security flaw</b>. <b>How do you tell them?</b>',
    options: ['in the code review, politely', 'in the team chat, so everyone learns', 'to the team lead first', 'I just fix it myself'] });
  add({ id: 'd1a', type: 'content', kicker: 'Dialogue 1 · 1/3', title: 'Code review: the invoice page', items: [
    L('Oksana', 'I’ve looked at your pull request. The invoice page works, but there’s a problem.'),
    L('Taras', 'What kind of problem?'),
    L('Oksana', '<b>If</b> I’<b>m</b> logged in and <b>change</b> the invoice ID in the URL, I <b>can see</b> someone else’s invoice.')] });
  add({ id: 'd1b', type: 'content', kicker: 'Dialogue 1 · 2/3', title: 'Code review: the invoice page', items: [
    L('Taras', 'Seriously? But the user has to be logged in to open the page.'),
    L('Oksana', 'Right — you check who the user is, but not whether the invoice is theirs.'),
    L('Taras', 'Oh, I see. So that’s authentication without authorization.')] });
  add({ id: 'd1c', type: 'content', kicker: 'Dialogue 1 · 3/3', title: 'Code review: the invoice page', items: [
    L('Oksana', 'Exactly. <b>If</b> this <b>had gone</b> to production, we<b>’d have exposed</b> customer data on day one.'),
    L('Taras', '<b>Good catch</b>. I’ll add an ownership check and a test for it <b>before I push again</b>.'),
    L('Oksana', 'Great. And add a test with a second user, <b>just in case</b>.')] });
  add({ id: 'e49_1a', type: 'mcq', kicker: '4.9 · Dialogue 1',
    prompt: '“<b>If this had gone to production</b>, we’d have exposed customer data.”<br><b>Did the code go to production?</b>',
    options: ['Yes, on day one', 'No, it was stopped in the code review'] });
  add({ id: 'd2a', type: 'content', kicker: 'Dialogue 2 · 1/3', title: 'Persuading a client to add two-factor login', items: [
    L('Client', 'Our customers hate extra steps. Do we really need two-factor login?'),
    L('Developer', 'I understand. But <b>if</b> a customer’s password <b>leaks</b> from another site, an attacker <b>can</b> simply log in here.'),
    L('Client', '<b>Surely</b> our customers use different passwords?')] });
  add({ id: 'd2b', type: 'content', kicker: 'Dialogue 2 · 2/3', title: 'Persuading a client to add two-factor login', items: [
    L('Developer', 'Many don’t, unfortunately. And <b>if</b> someone <b>got</b> into an account, they <b>would see</b> addresses and order history.'),
    L('Client', 'So what do you suggest?'),
    L('Developer', 'We could keep it optional for most users, <b>provided that</b> it’s required for admin accounts and payment changes. <b>I’d also recommend</b> an authenticator app instead of SMS codes.')] });
  add({ id: 'd2c', type: 'content', kicker: 'Dialogue 2 · 3/3', title: 'Persuading a client to add two-factor login', items: [
    L('Client', 'That sounds reasonable, <b>as long as</b> the login stays quick.'),
    L('Developer', 'It will. <b>Trusted devices</b> are remembered for thirty days, so most customers will see the extra step only once a month.'),
    L('Client', 'Fine. But if <b>complaints start coming in</b>, let’s review it.'),
    L('Developer', 'Agreed. Let’s check the numbers after the first month.')] });
  add({ id: 'm49', type: 'match', kicker: '4.9 · Expressions · Match',
    prompt: 'What does each expression (1–4) mean? Two options (a–f) are extra.',
    left: ['good catch', 'before I push again', 'surely', 'trusted devices'],
    right: ['known phones', 'well noticed!', 'after I delete it', 'expecting a yes', 'before sending code', 'a strong password'] });
  add({ id: 'e49_1', type: 'open', kicker: '4.9 · Dialogue 2',
    prompt: PH('client.jpg', 'A developer with a laptop explaining something to a business client', '50% 35%', 84) + 'Find the <b>two</b> developer’s sentences with <b>if</b>.<br>Which one is a <b>real</b> danger, and which one is a <b>hypothetical</b> scenario?',
    placeholder: 'Real: “If a customer’s password…” Hypothetical: …' });
  add({ id: 'e49_3', type: 'mcq', kicker: '4.9 · Dialogue 2',
    prompt: 'The developer persuades <b>without arguing</b>.<br>What does he offer <b>in exchange</b>?',
    options: ['a lower price', 'MFA for admins and payments, plus trusted devices', 'SMS codes at every login', 'no MFA at all'] });

  /* ---------- Speaking B · Code review (warn) ---------- */
  add({ id: 'spB1', type: 'content', kicker: 'Speaking B · Code review', format: 'warn',
    title: 'Good catch!', items: [
      SM('<b>Student:</b> the reviewer · <b>Teacher:</b> the author of the code'),
      SM('<b>Goal:</b> point out the flaw politely, say what could happen, ask for one fix'),
      SM('<b>You must use:</b> If … , … can / could … · If this had gone to production, … · unless / as long as'),
      SM('<b>Listeners:</b> was the reviewer polite, clear about the risk, concrete about the fix?')] });
  add({ id: 'spB2', type: 'content', reveal: true, kicker: 'Speaking B · The pull requests', title: 'One card, one student', items: [
    SM('🧩 <b>1.</b> The login function writes every password to the log file.'),
    SM('🧩 <b>2.</b> The admin page checks only that the user is logged in.'),
    SM('🧩 <b>3.</b> The photo upload accepts any file type, of any size.'),
    SM('🧩 <b>4.</b> The secret API key is written in the front-end JavaScript.')] });
  add({ id: 'spB3', type: 'content', kicker: 'Speaking B · Example', title: 'How it sounds', items: [
    SM('<b>Card:</b> “The search box puts the user’s text straight into the SQL query.”'),
    SM('<b>Reviewer:</b> <i>The search works well, but there’s one problem. <b>If</b> someone <b>types</b> SQL code into the box, the database <b>will run</b> it. <b>If this had gone to production</b>, anyone <b>could have read</b> our users table. Could you use a parameterized query? It’s safe <b>as long as</b> user data is never treated as code.</i>')] });

  /* ---------- Final task · Security briefing (4.11) ---------- */
  add({ id: 'fx0', type: 'end', kicker: 'Final task',
    title: 'Security briefing',
    text: 'Explain to a non-technical manager the main risks of your application and how to reduce them' });
  add({ id: 'fx1', type: 'content', kicker: '4.11 · The task', format: 'explain',
    title: 'Two minutes, one manager', items: [
      PH('briefing.jpg', 'A young developer presenting a shield-and-lock sketch on a whiteboard to a manager', '50% 40%', 120) +
        '<b>Listener:</b> a manager with <b>no technical background</b>',
      '<b>Time:</b> two minutes · <b>one student at a time</b>',
      '<b>Rule:</b> every term you use must be clear to the manager'] });
  add({ id: 'fx2', type: 'mcq', kicker: '4.11 · Choose your application',
    prompt: 'Which application will you talk about?',
    options: ['an online pharmacy', 'a university grade portal', 'a volunteer fundraising platform', 'a food-delivery app', 'a hotel booking site'] });
  add({ id: 'fx3', type: 'content', reveal: true, kicker: '4.11 · Four moves', title: 'Your plan', items: [
    SM('<b>1. What to protect:</b> the data or functions attackers want most'),
    SM('<b>2. Two threats</b> and what would happen if they succeeded ' + K('if + past, would')),
    SM('<b>3. Protections</b> and their conditions ' + K('unless · as long as · provided that')),
    SM('<b>4. A past incident</b> → one priority action ' + K('if + had + V3 · should have'))] });
  add({ id: 'fx4', type: 'content', kicker: '4.11 · Useful phrases · 1/2', title: 'You can say…', items: [
    SM('The most valuable thing in this application is …'),
    SM('<b>If</b> an attacker <b>got</b> access to the admin panel, they <b>could</b> …'),
    SM('A payment detail can’t be changed <b>unless</b> a second person confirms it.'),
    SM('The data stays safe <b>as long as</b> our dependencies are patched.')] });
  add({ id: 'fx5', type: 'content', kicker: '4.11 · Useful phrases · 2/2', title: 'You can say…', items: [
    SM('<b>If</b> that company <b>had patched</b> its server, the breach <b>would not have happened</b>.'),
    SM('I’d strongly recommend turning on multi-factor authentication for all staff.'),
    SM('<b>Otherwise</b>, a single stolen password is enough.'),
    SM('<b>In plain terms,</b> … ' + K('(for the manager)'))] });
  add({ id: 'fx6', type: 'open', kicker: '4.11 · Get ready',
    prompt: 'Move 4 is the hardest. Write your <b>priority action</b> with a <b>deadline</b> and a reason from a past incident.<br>' + K('If … had …, … would have … So this month we should …'),
    placeholder: 'If Equifax had…, … So by the end of the month we…' });
  add({ id: 'fx7', type: 'content', kicker: '4.11 · While you listen', title: 'Check the speaker', items: [
    SM('All <b>four moves</b>, in order?'),
    SM('Two <b>if + past, would</b> sentences?'),
    SM('One <b>if + had + V3</b> or <b>should have</b>?'),
    SM('<b>unless / as long as / provided that / otherwise</b>?'),
    SM('Ask one question: <b>What would happen if we did nothing this month?</b>')] });

  add({ id: 'end', type: 'end', kicker: 'Unit 4',
    title: 'Find the unlocked doors first.',
    text: 'Before an attacker tries the handle.' });

  // Логіка подачі для check_lesson.js (рушій ці поля ігнорує)
  const R0 = 'rule: zero and first conditional', R2 = 'rule: unless · as long as · provided that · otherwise',
    R3 = 'rule: second conditional (if + past, would)', R4 = 'rule: third conditional · should have',
    TR1 = 'traps: security · password', TR2 = 'traps: authentication · attacker', TR3 = 'traps: hash · breach', TR4 = 'traps: crack · sensitive';
  const TEACHES = { g1a: [R0], g1a2: [R0], g2a: [R2], g2a2: [R2], g3a: [R3], g4a: [R4], g4a2: [R4], t1: [TR1], t2: [TR2], t3: [TR3], t4: [TR4] };
  const NEEDS = {
    e41_1: [R0], e41_2: [R0], e41_3: [R0], g1q: [R0], e41_4: [R0], e41_7: [R0], e41_8: [R0], e41_6: [R0], e41_5: [R0],
    e42_1: [R2], e42_2: [R2], e42_5: [R2], e42_6: [R2], e42_4: [R2], e42_3: [R2],
    g3q: [R3], e43_1: [R3], e43_5: [R3], e43_2: [R4], e43_3: [R4], e43_4: [R4], e43_6: [R4], g4q: [R4],
    fm1: [R0], fm2: [R2], fm3: [R4], fm3fix: [R4], fm4: [R3],
    e45_1: [TR1], e45_8: [TR1], fm5: [TR1], e45_3: [TR2], e45_4: [TR2], fm6: [TR2], e45_5: [TR3], e45_2: [TR3], fm7: [TR3],
    e45_6: [TR4], e45_7: [TR4], fm8: [TR4], fmyou: [R0, R2, R3, R4], r1q: [R4], e49_1a: [R4], e49_1: [R0, R3], fx6: [R4]
  };
  S.forEach((s) => {
    if (TEACHES[s.id]) s.teaches = TEACHES[s.id];
    if (!['mcq', 'gap', 'open', 'match'].includes(s.type)) return;
    if (s.needs === undefined) s.needs = NEEDS[s.id] || [];
  });

  window.LESSON = {
    id: ID,
    title: 'Unit 4 · Web Application Security',
    known: ['code', 'test', 'server', 'database', 'website', 'user', 'bug', 'update', 'API', 'app', 'data', 'team', 'password', 'account',
      'email', 'link', 'login', 'log in', 'token', 'key', 'library', 'traffic', 'pull request', 'production', 'deploy', 'log', 'cloud', 'firewall'],
    slides: S
  };
})();

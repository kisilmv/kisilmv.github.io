/**
 * Онлайн-запис на заняття — серверна частина (Google Apps Script).
 *
 * Як це працює:
 *  • У Google Календарі є окремий календар (назва — CONFIG.CALENDAR_NAME).
 *  • Подія з назвою «Вільно» в ньому = відкритий слот.
 *  • Студент бронює слот на сайті → подія стає «Зайнято: Ім'я», студент отримує лист
 *    із посиланням на Zoom і посиланням для скасування, ви — сповіщення.
 *  • Студент скасовує за посиланням з листа → подія знову стає «Вільно».
 *  • Форма контактів на головній сторінці (дія lead) надсилає вам лист і, за потреби, Telegram-сповіщення.
 *
 * Розгортання: Розгорнути → Нове розгортання → Вебзастосунок,
 *   «Виконувати як» — Я, «Хто має доступ» — Усі.
 */

/* ==========================================================================
   Перевірка з редактора: ця функція стоїть першою, тож просто натисніть «▶ Виконати».
   Перший запуск попросить дозволи на Календар і Пошту — це нормально.
   ========================================================================== */
function testSetup() {
  const cal = getCalendar_();
  const slots = listFreeSlots_();
  console.log('Календар: ' + cal.getName());
  console.log('Вільних слотів найближчим часом: ' + slots.length);
  slots.slice(0, 5).forEach((s) => console.log(s.start + ' → ' + s.end));
  MailApp.getRemainingDailyQuota(); // запит дозволу на пошту
}

/* ==========================================================================
   НАЛАШТУВАННЯ — змініть під себе
   ========================================================================== */
const CONFIG = {
  CALENDAR_ID: 'aa02fa94f6ddabfb6f3753a185713e93a3e38d55ecd09c5422515919b8d8ef04@group.calendar.google.com', // ідентифікатор календаря «Приватні заняття»
  CALENDAR_NAME: 'Приватні заняття',          // запасний варіант: пошук за назвою
  FREE_TITLE: 'Вільно',                        // назва події, що означає відкритий слот
  BOOKED_PREFIX: 'Зайнято: ',                  // префікс назви заброньованої події
  BOOKED_COLOR: CalendarApp.EventColor.RED,    // колір заброньованої події (найтемніший червоний у Google Календарі, «Томатний», id 11)
  TIMEZONE: 'Europe/Kyiv',
  DAYS_AHEAD: 28,                              // на скільки днів уперед показувати слоти
  MIN_LEAD_HOURS: 1,                           // не можна забронювати слот, що починається раніше ніж за N год
  CANCEL_MIN_HOURS: 1,                         // студент може скасувати не пізніше ніж за N год
  MAX_ACTIVE_PER_EMAIL: 5,                     // скільки майбутніх занять може мати одна адреса
  ZOOM_LINK: 'https://zoom.us/j/ВАШ_ІДЕНТИФІКАТОР', // постійне посилання на вашу конференцію
  ZOOM_NOTE: '',                               // напр. 'Ідентифікатор: 123 456 7890, код: 1234'
  BOOKING_PAGE_URL: 'https://kisilmv.github.io/booking.html',
  TEACHER_NAME: 'Микола Кісіль'
};

/* Необов'язково: сповіщення в Telegram.
 * Файл → Налаштування проєкту → Властивості скрипту:
 *   TELEGRAM_BOT_TOKEN — токен бота від @BotFather
 *   TELEGRAM_CHAT_ID   — ваш chat id
 */

const GOALS = [
  'Індивідуальні заняття',
  'Підготовка до НМТ',
  'Cambridge English',
  'IELTS, TOEFL та інші іспити',
  'Англійська для IT і бізнесу',
  'Персональний інструктор',
  'Інше'
];

/* Теми форми контактів на головній сторінці (мають збігатися з <select id="contact-topic">) */
const LEAD_TOPICS = GOALS.concat(['Наукова співпраця']);

/* ==========================================================================
   Точки входу
   ========================================================================== */
function doGet(e) {
  const p = (e && e.parameter) || {};
  try {
    switch (p.action) {
      case 'slots':
        return json_({ ok: true, timezone: CONFIG.TIMEZONE, slots: listFreeSlots_() });
      case 'booking':
        return json_(getBookingInfo_(p.key, p.token));
      case 'ping':
        return json_({ ok: true, calendar: getCalendar_().getName() });
      default:
        return json_(fail_('bad_action', 'Невідома дія.'));
    }
  } catch (err) {
    console.error(err);
    return json_(serverError_(err));
  }
}

function doPost(e) {
  let body = {};
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_(fail_('bad_request', 'Некоректний запит.'));
  }
  try {
    switch (body.action) {
      case 'book':
        return json_(withLock_(() => book_(body)));
      case 'cancel':
        return json_(withLock_(() => cancel_(body.key, body.token)));
      case 'lead':
        return json_(lead_(body));
      default:
        return json_(fail_('bad_action', 'Невідома дія.'));
    }
  } catch (err) {
    console.error(err);
    return json_(serverError_(err));
  }
}

/* ==========================================================================
   Слоти
   ========================================================================== */
function listFreeSlots_() {
  const cal = getCalendar_();
  const now = new Date();
  const from = new Date(now.getTime() + CONFIG.MIN_LEAD_HOURS * 3600 * 1000);
  const to = new Date(now.getTime() + CONFIG.DAYS_AHEAD * 24 * 3600 * 1000);

  return cal.getEvents(from, to)
    .filter((ev) => isFree_(ev) && !ev.isAllDayEvent() && ev.getStartTime() >= from)
    .sort((a, b) => a.getStartTime() - b.getStartTime())
    .map((ev) => ({
      key: makeKey_(ev),
      start: ev.getStartTime().toISOString(),
      end: ev.getEndTime().toISOString()
    }));
}

/* ==========================================================================
   Бронювання
   ========================================================================== */
function book_(body) {
  // Пастка для ботів: приховане поле має бути порожнім
  if (body.website) return fail_('bad_request', 'Некоректний запит.');

  const name = clean_(body.name, 80);
  const email = clean_(body.email, 120).toLowerCase();
  const goal = GOALS.indexOf(body.goal) >= 0 ? body.goal : '';
  const note = clean_(body.note, 1000);

  if (name.length < 2) return fail_('invalid', 'Вкажіть, будь ласка, ім’я.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail_('invalid', 'Перевірте адресу електронної пошти.');

  const ev = findEvent_(body.key);
  const minStart = Date.now() + CONFIG.MIN_LEAD_HOURS * 3600 * 1000;
  if (!ev || !isFree_(ev) || ev.getStartTime().getTime() < minStart) {
    return fail_('taken', 'На жаль, цей час щойно зайняли або він уже недоступний. Оберіть інший слот.');
  }

  if (countActiveBookings_(email) >= CONFIG.MAX_ACTIVE_PER_EMAIL) {
    return fail_('limit', 'На цю адресу вже заброньовано максимальну кількість занять (' +
      CONFIG.MAX_ACTIVE_PER_EMAIL + '). Напишіть мені, якщо потрібно більше.');
  }

  const token = Utilities.getUuid();
  ev.setTitle(CONFIG.BOOKED_PREFIX + name);
  safe_(() => ev.setColor(CONFIG.BOOKED_COLOR));
  ev.setDescription([
    'Студент: ' + name,
    'Email: ' + email,
    goal ? 'Мета: ' + goal : '',
    note ? 'Коментар: ' + note : '',
    'Заброньовано: ' + fmt_(new Date(), 'dd.MM.yyyy HH:mm') + ' (через сайт)'
  ].filter(Boolean).join('\n'));
  ev.setTag('token', token);
  ev.setTag('email', email);
  ev.setTag('name', name);

  const key = makeKey_(ev);
  const cancelUrl = CONFIG.BOOKING_PAGE_URL + '?cancel=' + encodeURIComponent(key) +
    '&token=' + encodeURIComponent(token);

  safe_(() => sendStudentConfirmation_(ev, name, email, cancelUrl));
  safe_(() => notifyTeacher_('✅ Нове бронювання', ev, name, email, goal, note));

  return { ok: true, start: ev.getStartTime().toISOString(), end: ev.getEndTime().toISOString(), email: email };
}

/* ==========================================================================
   Скасування
   ========================================================================== */
function getBookingInfo_(key, token) {
  const ev = findEvent_(key);
  if (!ev || !token || ev.getTag('token') !== token) {
    return fail_('not_found', 'Бронювання не знайдено. Можливо, його вже скасовано.');
  }
  return {
    ok: true,
    name: ev.getTag('name') || '',
    start: ev.getStartTime().toISOString(),
    end: ev.getEndTime().toISOString(),
    canCancel: hoursUntil_(ev) >= CONFIG.CANCEL_MIN_HOURS,
    cancelMinHours: CONFIG.CANCEL_MIN_HOURS
  };
}

function cancel_(key, token) {
  const ev = findEvent_(key);
  if (!ev || !token || ev.getTag('token') !== token) {
    return fail_('not_found', 'Бронювання не знайдено. Можливо, його вже скасовано.');
  }
  if (hoursUntil_(ev) < CONFIG.CANCEL_MIN_HOURS) {
    return fail_('too_late', 'Онлайн-скасування можливе не пізніше ніж за ' + CONFIG.CANCEL_MIN_HOURS +
      ' год до початку. Напишіть мені напряму.');
  }

  const name = ev.getTag('name') || '';
  const email = ev.getTag('email') || '';

  ev.setTitle(CONFIG.FREE_TITLE);
  resetColor_(ev);
  ev.setDescription('');
  ['token', 'email', 'name'].forEach((k) => ev.deleteTag(k));

  safe_(() => sendStudentCancellation_(ev, name, email));
  safe_(() => notifyTeacher_('❌ Скасування', ev, name, email, '', ''));

  return { ok: true };
}

/* ==========================================================================
   Форма контактів
   ========================================================================== */
function lead_(body) {
  // Та сама пастка для ботів, що й у бронюванні
  if (body.website) return fail_('bad_request', 'Некоректний запит.');

  const name = clean_(body.name, 80);
  const email = clean_(body.email, 120).toLowerCase();
  const topic = LEAD_TOPICS.indexOf(body.topic) >= 0 ? body.topic : 'Інше';
  const message = cleanMultiline_(body.message, 3000);

  if (name.length < 2) return fail_('invalid', 'Вкажіть, будь ласка, ім’я.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail_('invalid', 'Перевірте адресу електронної пошти.');
  if (message.length < 10) return fail_('invalid', 'Напишіть повідомлення (щонайменше 10 символів).');

  sendTeacher_('✉️ Повідомлення з сайту: ' + topic + ' — ' + name, [
    '✉️ Повідомлення з сайту',
    'Тема: ' + topic,
    'Ім’я: ' + name,
    'Email: ' + email,
    '',
    message
  ].join('\n'), email);

  return { ok: true };
}

/* ==========================================================================
   Листи та сповіщення
   ========================================================================== */
function sendStudentConfirmation_(ev, name, email, cancelUrl) {
  const when = humanWhen_(ev);
  const zoomNote = CONFIG.ZOOM_NOTE ? '<br>' + esc_(CONFIG.ZOOM_NOTE) : '';
  const html =
    '<p>Вітаю, ' + esc_(name) + '!</p>' +
    '<p>Заняття з англійської заброньовано:<br><b>' + esc_(when) + '</b> (за київським часом), 60 хвилин.</p>' +
    '<p>Посилання на Zoom: <a href="' + esc_(CONFIG.ZOOM_LINK) + '">' + esc_(CONFIG.ZOOM_LINK) + '</a>' + zoomNote + '</p>' +
    '<p>Якщо плани зміняться, скасуйте заняття не пізніше ніж за ' + CONFIG.CANCEL_MIN_HOURS +
    ' год до початку: <a href="' + esc_(cancelUrl) + '">скасувати бронювання</a>.</p>' +
    '<p>До зустрічі!<br>' + esc_(CONFIG.TEACHER_NAME) + '</p>';

  MailApp.sendEmail({
    to: email,
    subject: 'Заняття з англійської: ' + when,
    htmlBody: html,
    body: stripHtml_(html) + '\n\nСкасувати: ' + cancelUrl,
    name: CONFIG.TEACHER_NAME,
    attachments: [Utilities.newBlob(buildIcs_(ev), 'text/calendar', 'zanyattia.ics')]
  });
}

function sendStudentCancellation_(ev, name, email) {
  if (!email) return;
  const when = humanWhen_(ev);
  const html =
    '<p>Вітаю' + (name ? ', ' + esc_(name) : '') + '!</p>' +
    '<p>Заняття <b>' + esc_(when) + '</b> скасовано.</p>' +
    '<p>Обрати інший час можна тут: <a href="' + esc_(CONFIG.BOOKING_PAGE_URL) + '">' +
    esc_(CONFIG.BOOKING_PAGE_URL) + '</a></p>' +
    '<p>' + esc_(CONFIG.TEACHER_NAME) + '</p>';
  MailApp.sendEmail({
    to: email,
    subject: 'Заняття скасовано: ' + when,
    htmlBody: html,
    body: stripHtml_(html),
    name: CONFIG.TEACHER_NAME
  });
}

function notifyTeacher_(title, ev, name, email, goal, note) {
  const lines = [
    title,
    humanWhen_(ev),
    name ? 'Студент: ' + name : '',
    email ? 'Email: ' + email : '',
    goal ? 'Мета: ' + goal : '',
    note ? 'Коментар: ' + note : ''
  ].filter(Boolean);
  sendTeacher_(title + ': ' + humanWhen_(ev), lines.join('\n'), email);
}

/* Лист вам (і Telegram, якщо налаштовано). replyTo — щоб «Відповісти» йшло студентові. */
function sendTeacher_(subject, text, replyTo) {
  const props = PropertiesService.getScriptProperties();
  const botToken = props.getProperty('TELEGRAM_BOT_TOKEN');
  const chatId = props.getProperty('TELEGRAM_CHAT_ID');
  if (botToken && chatId) {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + botToken + '/sendMessage', {
      method: 'post',
      payload: { chat_id: chatId, text: text },
      muteHttpExceptions: true
    });
  }

  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    subject: subject,
    body: text,
    replyTo: replyTo || undefined
  });
}

/* ==========================================================================
   Допоміжні функції
   ========================================================================== */
function getCalendar_() {
  if (CONFIG.CALENDAR_ID) {
    const byId = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
    if (byId) return byId;
  }
  const cals = CalendarApp.getCalendarsByName(CONFIG.CALENDAR_NAME);
  if (!cals.length) throw new Error('Календар «' + CONFIG.CALENDAR_NAME + '» не знайдено');
  return cals[0];
}

function serverError_(err) {
  const res = fail_('server', 'Сталася помилка на сервері. Спробуйте пізніше.');
  res.detail = String((err && err.message) || err);
  return res;
}

function isFree_(ev) {
  return ev.getTitle().trim().toLowerCase() === CONFIG.FREE_TITLE.toLowerCase();
}

/* Ключ слота: час початку + ідентифікатор події.
   Для повторюваних подій усі повторення мають однаковий ідентифікатор, тому потрібен і час. */
function makeKey_(ev) {
  return ev.getStartTime().getTime() + '.' + Utilities.base64EncodeWebSafe(ev.getId());
}

function findEvent_(key) {
  if (!key || typeof key !== 'string') return null;
  const dot = key.indexOf('.');
  if (dot < 1) return null;
  const start = Number(key.slice(0, dot));
  if (!isFinite(start)) return null;
  let id;
  try {
    id = Utilities.newBlob(Utilities.base64DecodeWebSafe(key.slice(dot + 1))).getDataAsString();
  } catch (err) {
    return null;
  }
  const events = getCalendar_().getEvents(new Date(start), new Date(start + 60 * 1000));
  for (let i = 0; i < events.length; i++) {
    if (events[i].getId() === id && events[i].getStartTime().getTime() === start) return events[i];
  }
  return null;
}

function countActiveBookings_(email) {
  const now = new Date();
  const to = new Date(now.getTime() + 180 * 24 * 3600 * 1000);
  return getCalendar_().getEvents(now, to).filter((ev) => ev.getTag('email') === email).length;
}

function hoursUntil_(ev) {
  return (ev.getStartTime().getTime() - Date.now()) / 3600000;
}

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) return fail_('busy', 'Сервер зайнятий. Спробуйте ще раз за хвилину.');
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function safe_(fn) {
  try { fn(); } catch (err) { console.error(err); }
}

const DAYS_UK = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'пʼятниця', 'субота'];
const MONTHS_UK = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня',
  'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

function humanWhen_(ev) {
  const s = ev.getStartTime();
  const dow = Number(fmt_(s, 'u')) % 7;             // 1 = пн … 7 = нд
  const month = Number(fmt_(s, 'M')) - 1;
  return DAYS_UK[dow] + ', ' + fmt_(s, 'd') + ' ' + MONTHS_UK[month] + ', ' +
    fmt_(s, 'HH:mm') + '–' + fmt_(ev.getEndTime(), 'HH:mm');
}

function fmt_(date, pattern) {
  return Utilities.formatDate(date, CONFIG.TIMEZONE, pattern);
}

function buildIcs_(ev) {
  const utc = (d) => Utilities.formatDate(d, 'UTC', "yyyyMMdd'T'HHmmss'Z'");
  const text = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//kisilmv//booking//UK',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:' + Utilities.getUuid() + '@kisilmv.github.io',
    'DTSTAMP:' + utc(new Date()),
    'DTSTART:' + utc(ev.getStartTime()),
    'DTEND:' + utc(ev.getEndTime()),
    'SUMMARY:' + text('Англійська — заняття з ' + CONFIG.TEACHER_NAME),
    'LOCATION:' + text(CONFIG.ZOOM_LINK),
    'DESCRIPTION:' + text('Zoom: ' + CONFIG.ZOOM_LINK + (CONFIG.ZOOM_NOTE ? '\n' + CONFIG.ZOOM_NOTE : '')),
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Заняття з англійської через 30 хвилин',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

function clean_(value, max) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

/* Як clean_, але зберігає переноси рядків (для тексту повідомлення) */
function cleanMultiline_(value, max) {
  return String(value == null ? '' : value).replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, max);
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripHtml_(html) {
  return html.replace(/<br>/g, '\n').replace(/<\/p>/g, '\n\n').replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim();
}

function fail_(code, message) {
  return { ok: false, error: code, message: message };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}


/** Повертає звільненому слоту колір календаря (або нейтральний, якщо скидання не підтримується). */
function resetColor_(ev) {
  try {
    ev.setColor('');
  } catch (e) {
    safe_(() => ev.setColor(CalendarApp.EventColor.PALE_GREEN));
  }
}

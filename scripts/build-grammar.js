#!/usr/bin/env node
'use strict';

/**
 * Генерує статичну сторінку-довідник grammar.html: усі теми обох граматичних
 * тренажерів (A1–A2 і B1–C2), згруповані наскрізно за розділами з
 * data/grammar-sections.json, з пошуковими рядками для grammar.js.
 *
 * Запуск: node scripts/build-grammar.js
 * Запускайте після кожної зміни тем у data/a1-a2/*.json, data/grammar/*.json
 * або розділів у data/grammar-sections.json. Залежностей немає.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SECTIONS_PATH = path.join(ROOT, 'data', 'grammar-sections.json');
const PAGE_PATH = path.join(ROOT, 'grammar.html');
const SITE_URL = 'https://kisilmv.github.io/';
const PAGE_URL = SITE_URL + 'grammar.html';
const ASSET_VERSION = '20261021';

const LEVELS = [
  { code: 'a1', name: 'Beginner', file: 'data/a1-a2/a1.json', page: 'a1-a2-trainer.html' },
  { code: 'a2', name: 'Elementary', file: 'data/a1-a2/a2.json', page: 'a1-a2-trainer.html' },
  { code: 'b1', name: 'Intermediate', file: 'data/grammar/b1.json', page: 'grammar-trainer.html' },
  { code: 'b2', name: 'Upper-Intermediate', file: 'data/grammar/b2.json', page: 'grammar-trainer.html' },
  { code: 'c1', name: 'Advanced', file: 'data/grammar/c1.json', page: 'grammar-trainer.html' },
  { code: 'c2', name: 'Proficiency', file: 'data/grammar/c2.json', page: 'grammar-trainer.html' }
];
const LEVEL_ORDER = LEVELS.map((l) => l.code);

/* --------------------------------------------------------------------------
   Допоміжні функції
   -------------------------------------------------------------------------- */
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** *курсив* у даних тренажера → <em lang="en">…</em> */
function inline(text) {
  return esc(text).replace(/\*([^*]+)\*/g, '<em lang="en">$1</em>');
}

function plain(text) {
  return String(text || '').replace(/\*/g, '');
}

/**
 * Нормалізація для пошуку. Та сама функція є в grammar.js — змінюйте обидві разом.
 * Нижній регістр, апострофи прибрано (don't = dont, обов'язок = обовязок),
 * усе, крім літер і цифр, — пробіл.
 */
function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFC')
    .replace(/['’ʼ‘`´]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function uniqueWords(parts) {
  const seen = new Set();
  const out = [];
  normalize(parts.join(' ')).split(' ').forEach((w) => {
    if (w && !seen.has(w)) {
      seen.add(w);
      out.push(w);
    }
  });
  return out.join(' ');
}

function italics(text) {
  const out = [];
  String(text || '').replace(/\*([^*]+)\*/g, (m, frag) => {
    out.push(frag);
    return m;
  });
  return out;
}

function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/* --------------------------------------------------------------------------
   Дані
   -------------------------------------------------------------------------- */
const topics = new Map(); // 'b2/articles' → тема
let exerciseCount = 0;

LEVELS.forEach((level) => {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, level.file), 'utf8'));
  data.topics.forEach((topic, index) => {
    const key = level.code + '/' + topic.id;
    exerciseCount += Array.isArray(topic.items) ? topic.items.length : 0;
    topics.set(key, { key, level, index, topic });
  });
});

const config = JSON.parse(fs.readFileSync(SECTIONS_PATH, 'utf8'));
const used = new Map();
const problems = [];

config.sections.forEach((section) => {
  section.topics.forEach((key) => {
    if (!topics.has(key)) problems.push(`Розділ «${section.id}»: теми ${key} немає в даних тренажерів.`);
    if (used.has(key)) problems.push(`Тема ${key} є і в «${used.get(key)}», і в «${section.id}».`);
    used.set(key, section.id);
  });
});
topics.forEach((_, key) => {
  if (!used.has(key)) problems.push(`Тему ${key} не віднесено до жодного розділу в data/grammar-sections.json.`);
});
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

/* --------------------------------------------------------------------------
   Розмітка
   -------------------------------------------------------------------------- */
/**
 * Три рядки для пошуку з різною вагою (див. grammar.js):
 *   data-p — сама тема: назви, ідентифікатор, topicKeywords;
 *   data-k — розділ: загальні keywords (за ними знаходиться весь маршрут). Назва розділу сюди
 *            навмисно не входить: інакше «артиклі» з назви «Іменники, артиклі…» показували б увесь розділ;
 *   data-s — правило: короткий опис, заголовки блоків, англійські приклади-формули з теорії.
 * Слово, що вже є у вагомішому рядку, у слабший не дублюється.
 */
function searchStrings(entry, section) {
  const t = entry.topic;
  const th = t.theory || {};
  const own = ((section.topicKeywords || {})[entry.key]) || [];
  const primary = uniqueWords([t.title, t.titleEn, t.id.replace(/-/g, ' '), ...own].map(plain));
  const taken = new Set(primary.split(' '));
  const minus = (text) => text.split(' ').filter((w) => w && !taken.has(w)).join(' ');

  const sectionWords = minus(uniqueWords((section.keywords || []).map(plain)));
  sectionWords.split(' ').forEach((w) => taken.add(w));

  const secondaryParts = [t.summary, th.title, th.intro];
  (th.blocks || []).forEach((b) => {
    secondaryParts.push(b.title);
    secondaryParts.push(...italics(b.text));
  });
  (th.traps || []).forEach((trap) => secondaryParts.push(...italics(trap)));
  const secondary = minus(uniqueWords(secondaryParts.map(plain)));
  return { primary, section: sectionWords, secondary };
}

function renderCard(entry, section) {
  const t = entry.topic;
  const href = `${entry.level.page}#${entry.key}`;
  const s = searchStrings(entry, section);
  return `            <li class="gx-topic" data-level="${entry.level.code}" data-key="${esc(entry.key)}" data-p="${esc(s.primary)}" data-k="${esc(s.section)}" data-s="${esc(s.secondary)}">
              <a class="gr-topic-card gx-card" href="${esc(href)}">
                <span class="gx-level" aria-label="Рівень ${entry.level.code.toUpperCase()}">${entry.level.code.toUpperCase()}</span>
                <span class="gr-topic-body">
                  <span class="gr-topic-title">${inline(t.title)}</span>
                  <span class="gr-topic-en" lang="en">${inline(t.titleEn)}</span>
                  <span class="gr-topic-summary">${inline(t.summary)}</span>
                </span>
                <span class="gx-pill-slot" data-progress></span>
              </a>
            </li>`;
}

function sortedEntries(section) {
  return section.topics
    .map((key) => topics.get(key))
    .sort((a, b) => (LEVEL_ORDER.indexOf(a.level.code) - LEVEL_ORDER.indexOf(b.level.code)) || (a.index - b.index));
}

function routeOf(entries) {
  const levels = [];
  entries.forEach((e) => {
    const code = e.level.code.toUpperCase();
    if (levels.indexOf(code) === -1) levels.push(code);
  });
  return levels;
}

function renderSection(section) {
  const entries = sortedEntries(section);
  const route = routeOf(entries);
  const routeHtml = route.length > 1
    ? `<span class="gx-route" aria-label="Рівні: ${route.join(', ')}">${route.join(' <span aria-hidden="true">→</span> ')}</span>`
    : `<span class="gx-route">${route[0]}</span>`;
  return `        <section class="gx-section" id="${esc(section.id)}" data-section="${esc(section.id)}" aria-labelledby="h-${esc(section.id)}">
          <header class="gx-section-head">
            <h2 class="gx-section-title" id="h-${esc(section.id)}">${inline(section.title)}</h2>
            ${routeHtml}
          </header>
          <p class="gx-section-intro">${inline(section.intro)}</p>
          <ol class="gr-topic-list gx-topic-list">
${entries.map((e) => renderCard(e, section)).join('\n')}
          </ol>
        </section>`;
}

function renderToc() {
  const items = config.sections.map((s) =>
    `            <li><a class="gx-toc-link" href="#${esc(s.id)}">${inline(s.title)} <span class="gx-toc-count">${s.topics.length}</span></a></li>`
  ).join('\n');
  return `        <nav class="gx-toc" id="gx-toc" aria-labelledby="gx-toc-title">
          <h2 class="gx-toc-title" id="gx-toc-title">Розділи</h2>
          <ul class="gx-toc-list">
${items}
          </ul>
        </nav>`;
}

function renderLevelFilter() {
  const options = [{ value: '', label: 'Усі' }].concat(LEVELS.map((l) => ({ value: l.code, label: l.code.toUpperCase() })));
  return options.map((o) =>
    `              <label class="gx-chip"><input type="radio" name="level" value="${o.value}"${o.value === '' ? ' checked' : ''}><span>${o.label}</span></label>`
  ).join('\n');
}

function jsonLd() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': SITE_URL + '#person', name: 'Микола Кісіль', url: SITE_URL },
      {
        '@type': 'CollectionPage',
        '@id': PAGE_URL + '#page',
        name: 'Граматика англійської від A1 до C2',
        description: `Довідник усіх ${topics.size} граматичних тем тренажерів: пошук українською й англійською, теми згруповано за розділами й рівнями.`,
        url: PAGE_URL,
        inLanguage: ['uk', 'en'],
        isAccessibleForFree: true,
        author: { '@id': SITE_URL + '#person' },
        hasPart: [
          { '@type': 'LearningResource', name: 'Лексико-граматичний тренажер англійської A1–A2', url: SITE_URL + 'a1-a2-trainer.html' },
          { '@type': 'LearningResource', name: 'Граматичний тренажер англійської B1–C2', url: SITE_URL + 'grammar-trainer.html' }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Граматика', item: PAGE_URL }
        ]
      }
    ]
  };
  return JSON.stringify(ld, null, 2).replace(/\n/g, '\n  ');
}

function renderPage() {
  const n = topics.size;
  const topicsWord = plural(n, 'тема', 'теми', 'тем');
  const description = `Усі ${n} ${topicsWord} англійської граматики від A1 до C2 на одній сторінці: пошук українською й англійською, наскрізні маршрути тем через рівні, ${exerciseCount} вправ із поясненнями українською.`;
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <!-- Згенеровано scripts/build-grammar.js з data/grammar-sections.json і даних тренажерів. Не редагуйте вручну. -->
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-495CR8HH3T"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-495CR8HH3T');
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Граматика англійської від A1 до C2: усі теми з пошуком — Микола Кісіль</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${PAGE_URL}">
  <link rel="icon" href="favicon.ico" sizes="48x48">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="icon" href="favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="Микола Кісіль">
  <meta name="theme-color" content="#faf8f4">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${PAGE_URL}">
  <meta property="og:site_name" content="Микола Кісіль">
  <meta property="og:title" content="Граматика англійської від A1 до C2 — Микола Кісіль">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE_URL}og-image.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Микола Кісіль — репетитор з англійської онлайн: НМТ, Cambridge, IT-англійська, Zoom">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="og:locale" content="uk_UA">
  <script type="application/ld+json">
  ${jsonLd()}
  </script>
  <script>
    (function () {
      var theme = null;
      try { theme = window.localStorage.getItem('theme'); } catch (error) { theme = null; }
      if (theme !== 'light' && theme !== 'dark') {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
  <link rel="stylesheet" href="styles.css?v=20261016">
  <link rel="stylesheet" href="booking.css?v=20261016">
  <link rel="stylesheet" href="service-page.css?v=20261020">
  <link rel="stylesheet" href="grammar.css?v=${ASSET_VERSION}">
  <script src="script.js?v=20261007" defer></script>
  <script src="grammar.js?v=${ASSET_VERSION}" defer></script>
</head>
<body class="booking-page service-page grammar-index-page">
  <a class="skip-link" href="#main">Перейти до основного вмісту</a>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Микола Кісіль — на головну сторінку">
        <span class="brand-mark" aria-hidden="true">МК</span>
        <span class="brand-text">
          <span class="brand-name">Микола Кісіль</span>
          <span class="brand-role">англійська мова · переклад · термінознавство</span>
        </span>
      </a>

      <div class="header-actions">
        <a class="booking-home-link" href="index.html">На головну</a>
        <button class="icon-button theme-toggle" type="button" aria-pressed="false" aria-label="Темна тема" title="Перемкнути тему">
          <svg class="icon icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg class="icon icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <main id="main" tabindex="-1">
    <section class="section booking-section" aria-labelledby="page-title">
      <div class="container">
        <nav class="svc-breadcrumbs" aria-label="Навігаційний ланцюжок">
          <ol>
            <li><a href="index.html">Головна</a></li>
            <li><a href="index.html#lessons">Заняття</a></li>
            <li><span aria-current="page">Граматика</span></li>
          </ol>
        </nav>

        <header class="section-header">
          <p class="section-kicker">Безкоштовно, без реєстрації</p>
          <h1 class="section-title" id="page-title">Граматика англійської: усі теми від A1 до C2</h1>
          <p class="section-intro">
            Тут зібрано всі теми обох граматичних тренажерів. Одна й та сама тема часто повертається на кількох рівнях:
            <span lang="en">Present Perfect</span> з’являється на A2, поглиблюється на B1 і B2, а умовні речення тягнуться від B1 до C2.
            Тому теми згруповано за розділами, а всередині розділу — від простішого рівня до складнішого. Шукайте українською,
            англійською чи формулою: «пасив», <span lang="en">«articles»</span>, <span lang="en">«have been doing»</span>.
          </p>
          <ul class="booking-facts" aria-label="Коротко про довідник">
            <li>${n} ${topicsWord}</li>
            <li>${config.sections.length} розділів</li>
            <li>${exerciseCount} вправ</li>
            <li>A1–C2</li>
          </ul>
        </header>

        <form class="gx-search" id="gx-search" role="search" aria-label="Пошук граматичних тем" hidden>
          <div class="gx-field">
            <label for="gx-q">Знайти тему</label>
            <input id="gx-q" name="q" type="search" autocomplete="off" spellcheck="false" enterkeyhint="search" placeholder="Напр.: пасив, артиклі, have been doing">
          </div>
          <fieldset class="gx-field gx-levels">
            <legend>Рівень</legend>
            <div class="gx-chips">
${renderLevelFilter()}
            </div>
          </fieldset>
          <p class="gx-try"><span class="gx-try-label">Спробуйте:</span>
            <button class="gx-try-btn" type="button" data-q="Present Perfect" lang="en">Present Perfect</button>
            <button class="gx-try-btn" type="button" data-q="умовні">умовні</button>
            <button class="gx-try-btn" type="button" data-q="пасив">пасив</button>
            <button class="gx-try-btn" type="button" data-q="артиклі">артиклі</button>
            <button class="gx-try-btn" type="button" data-q="used to" lang="en">used to</button>
            <button class="gx-try-btn" type="button" data-q="інверсія">інверсія</button>
          </p>
          <div class="gx-search-footer">
            <p class="gx-count" id="gx-count" aria-live="polite">Усього тем: ${n}</p>
            <button class="btn btn--secondary gx-reset" type="reset" hidden>Скинути</button>
          </div>
          <p class="gx-progress-note" id="gx-progress-note" hidden></p>
        </form>

${renderToc()}

        <div class="gx-results" id="gx-results">
${config.sections.map(renderSection).join('\n\n')}
        </div>

        <div class="gx-empty" id="gx-empty" hidden>
          <h2 class="gx-empty-title">Такої теми поки немає</h2>
          <p>Спробуйте інше слово: українську назву («умовні речення»), англійську (<span lang="en">«conditionals»</span>) або саму конструкцію (<span lang="en">«if I had known»</span>). Якщо потрібної теми справді бракує, <a href="index.html#contacts">напишіть мені</a> — додам її до тренажера.</p>
        </div>

        <section class="svc-section" aria-labelledby="how-title">
          <h2 id="how-title">Як користуватися</h2>
          <div class="svc-note">
            <ul class="svc-list">
              <li><b>Кожна картка веде просто у вправи теми.</b> Спершу ви побачите стисле правило українською з прикладами й типовими пастками, потім — десять завдань.</li>
              <li><b>Маршрут у розділі.</b> Позначка на кшталт <span class="gx-route gx-route--inline">B1 → B2 → C1</span> показує, на яких рівнях тема повертається. Якщо тема легка, переходьте до наступної картки розділу.</li>
              <li><b>Ваш прогрес.</b> На картках пройдених тем видно найкращий результат. Він зберігається лише у вашому браузері й нікуди не надсилається.</li>
              <li><b>Викладачам.</b> Пошук можна передати посиланням: адреса на кшталт <code>grammar.html?q=пасив&amp;level=b2</code> відкриває сторінку вже з результатами.</li>
            </ul>
          </div>
          <p>
            Не знаєте свого рівня? Почніть із <a href="level-test.html">тесту рівня</a>. Повні тренажери з вибором рівня, змішаними тестами
            й роботою над помилками: <a href="a1-a2-trainer.html">A1–A2</a> і <a href="grammar-trainer.html">B1–C2</a>.
          </p>
        </section>

        <div class="cta-band">
          <div>
            <h2 class="cta-title">Граматика — лише частина мови</h2>
            <p class="cta-text">На індивідуальних заняттях переводимо правила в живе мовлення й письмо та розбираємо помилки, яких тренажер не помітить.</p>
          </div>
          <div class="cta-actions">
            <a class="btn btn--primary" href="booking.html">Обрати час у розкладі</a>
            <a class="btn btn--secondary" href="level-test.html">Визначити рівень</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <a class="brand brand--small" href="index.html" aria-label="Микола Кісіль — на головну сторінку">
        <span class="brand-mark" aria-hidden="true">МК</span>
        <span class="brand-name">Микола Кісіль</span>
      </a>
      <nav class="footer-nav" aria-label="Навігація в підвалі">
        <ul>
          <li><a href="index.html#lessons">Заняття</a></li>
          <li><a href="grammar.html" aria-current="page">Граматика</a></li>
          <li><a href="index.html#about">Про мене</a></li>
          <li><a href="publications.html">Публікації</a></li>
          <li><a href="index.html#contacts">Контакти</a></li>
          <li><a href="booking.html">Розклад</a></li>
          <li><a href="privacy.html">Конфіденційність</a></li>
        </ul>
      </nav>
      <p class="footer-copy">© <span data-current-year>2026</span> Микола Кісіль. Усі права захищено.</p>
    </div>
  </footer>
</body>
</html>
`;
}

fs.writeFileSync(PAGE_PATH, renderPage());
console.log(`grammar.html: ${topics.size} тем у ${config.sections.length} розділах, ${exerciseCount} вправ.`);

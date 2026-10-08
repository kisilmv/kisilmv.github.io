#!/usr/bin/env node
'use strict';

/**
 * Генерує статичну сторінку publications.html і блок трьох найновіших праць
 * на головній (index.html) з data/publications.json.
 *
 * Запуск: node scripts/build-publications.js
 * Залежностей немає — лише вбудовані модулі Node.js.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'data', 'publications.json');
const PAGE_PATH = path.join(ROOT, 'publications.html');
const INDEX_PATH = path.join(ROOT, 'index.html');
const SITE_URL = 'https://kisilmv.github.io/';
const PERSON_ID = `${SITE_URL}#person`;
const ASSET_VERSION = '20261008';

const LATEST_START = '<!-- publications:latest:start (генерується scripts/build-publications.js) -->';
const LATEST_END = '<!-- publications:latest:end -->';

const TYPE_ORDER = ['article', 'conference', 'textbook-mon', 'textbook', 'lectures', 'abstract'];
const TYPE_SHORT = {
  article: 'Стаття',
  conference: 'Матеріали конференції',
  'textbook-mon': 'Посібник · гриф МОН',
  textbook: 'Навчальний посібник',
  lectures: 'Навчально-методичне видання',
  abstract: 'Автореферат'
};
const BOOK_TYPES = new Set(['textbook-mon', 'textbook', 'lectures', 'abstract']);

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const selfPrefixes = data.person.selfAuthorPrefixes;

/* --------------------------------------------------------------------------
   Допоміжні функції
   -------------------------------------------------------------------------- */

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const isSelf = (author) => selfPrefixes.some((prefix) => author.startsWith(`${prefix} `));
const isLatin = (text) => /^[\s\d\p{P}]*\p{Script=Latin}/u.test(text);
const langAttr = (text) => (isLatin(text) ? ' lang="en"' : '');
const doiUrl = (doi) => `https://doi.org/${doi}`;

/** Додає крапку в кінці елемента, якщо він ще не закінчується розділовим знаком. */
const endWithPeriod = (text) => (/[.?!…]$/.test(text) ? text : `${text}.`);

/** Сортування: від нових до старих; у межах року — за порядком у вихідному переліку. */
const byNewest = (a, b) => b.year - a.year || b.sourceNo - a.sourceNo;

const publications = data.publications.slice().sort(byNewest);

/* --------------------------------------------------------------------------
   ДСТУ 8302:2015
   Кожен запис будується як масив сегментів { text, kind },
   щоб той самий опис можна було вивести і як HTML, і як простий текст.
   -------------------------------------------------------------------------- */

function placesText(places, year) {
  const list = (places || [])
    .map((place) => (place.publisher ? `${place.city} : ${place.publisher}` : place.city))
    .join(' ; ');
  return list ? `${list}, ${year}` : String(year);
}

function dstuSegments(pub) {
  const segments = [];
  const push = (text, kind = 'text') => segments.push({ text, kind });

  pub.authors.forEach((author, index) => {
    if (index > 0) {
      push(', ');
    }
    push(author, isSelf(author) ? 'self' : 'author');
  });
  push(' ');

  // Назва, паралельна назва, підзаголовкові відомості
  push(pub.title, 'title');
  if (pub.parallelTitle) {
    push(' = ');
    push(pub.parallelTitle, 'title-parallel');
  }

  const hasPublisher = (pub.places || []).some((place) => place.publisher);
  const tail = [];

  if (BOOK_TYPES.has(pub.type)) {
    let titleRest = pub.genre ? ` : ${pub.genre}` : '';
    if (pub.responsibility) {
      titleRest += ` / ${pub.responsibility}`;
    }
    push(endWithPeriod(titleRest));
    if (pub.edition) {
      tail.push(endWithPeriod(pub.edition));
    }
    tail.push(`${placesText(pub.places, pub.year)}.`);
    if (pub.extent) {
      tail.push(pub.extent);
    }
  } else {
    push('. ');
    let container = pub.container;
    if (pub.series) {
      container += `. ${pub.series}`;
    }
    if (pub.containerInfo) {
      container += ` : ${pub.containerInfo}`;
    }
    if (pub.event) {
      container += ` (${pub.event})`;
    }
    if (pub.responsibility) {
      container += ` / ${pub.responsibility}`;
    }
    push(endWithPeriod(container), 'container');

    // Для збірників із видавцем номер випуску стоїть перед вихідними даними,
    // для журналів і видань без видавця — після року.
    const numbering = [pub.part, pub.issue].filter(Boolean).map(endWithPeriod);
    if (hasPublisher) {
      tail.push(...numbering, `${placesText(pub.places, pub.year)}.`);
    } else {
      tail.push(`${placesText(pub.places, pub.year)}.`, ...numbering);
    }
    if (pub.pages) {
      tail.push(`${pub.pagesPrefix || 'С.'} ${pub.pages}.`);
    }
  }

  if (pub.note) {
    tail.push(endWithPeriod(pub.note));
  }

  if (tail.length) {
    push(` ${tail.join(' ')}`);
  }

  if (pub.doi) {
    push(' ');
    push(doiUrl(pub.doi), 'doi');
  } else if (pub.url) {
    push(' URL: ');
    push(pub.url, 'url');
  }

  return segments;
}

const segmentsToText = (segments) => segments.map((segment) => segment.text).join('').replace(/\s+/g, ' ').trim();

function segmentsToHtml(segments) {
  return segments
    .map(({ text, kind }) => {
      const safe = escapeHtml(text);
      switch (kind) {
        case 'self':
          return `<strong class="pub-self">${safe}</strong>`;
        case 'title':
          return `<span class="pub-title"${langAttr(text)}>${safe}</span>`;
        case 'title-parallel':
          return `<span${langAttr(text)}>${safe}</span>`;
        case 'container':
          return `<span class="pub-container">${safe}</span>`;
        case 'doi':
        case 'url':
          return `<a class="pub-inline-link" href="${safe}" target="_blank" rel="noopener noreferrer">${safe}</a>`;
        default:
          return safe;
      }
    })
    .join('');
}

/* --------------------------------------------------------------------------
   APA 7 (простий текст, мовою оригіналу, без транслітерації)
   -------------------------------------------------------------------------- */

function apaAuthor(author) {
  const spaceIndex = author.indexOf(' ');
  return spaceIndex === -1 ? author : `${author.slice(0, spaceIndex)}, ${author.slice(spaceIndex + 1)}`;
}

function apaAuthors(authors) {
  const list = authors.map(apaAuthor);
  if (list.length === 1) {
    return list[0];
  }
  return `${list.slice(0, -1).join(', ')}, & ${list[list.length - 1]}`;
}

const apaPublishers = (places) =>
  (places || [])
    .map((place) => place.publisher)
    .filter(Boolean)
    .join('; ');

function apaReference(pub) {
  const parts = [`${apaAuthors(pub.authors)} (${pub.year}).`];
  const titleWithParallel = pub.parallelTitle ? `${pub.title} [${pub.parallelTitle}]` : pub.title;
  const publishers = apaPublishers(pub.places);

  if (BOOK_TYPES.has(pub.type)) {
    let title = titleWithParallel;
    if (pub.edition) {
      title += ` (${pub.edition})`;
    }
    if (pub.type === 'abstract') {
      title += ` [${pub.apaGenre || pub.genre}, ${pub.responsibility}]`;
    } else if (pub.genre) {
      title += ` [${pub.genre}]`;
    }
    parts.push(endWithPeriod(title));
    if (publishers) {
      parts.push(endWithPeriod(publishers));
    }
  } else if (pub.type === 'article') {
    parts.push(endWithPeriod(titleWithParallel));
    let source = pub.container;
    if (pub.series) {
      source += `. ${pub.series}`;
    }
    const numbering = pub.apaNumbering || pub.issue || '';
    if (numbering) {
      source += `, ${numbering}`;
    }
    if (pub.pages) {
      source += `, ${pub.pages}`;
    }
    parts.push(endWithPeriod(source));
  } else {
    parts.push(endWithPeriod(titleWithParallel));
    let source = `In ${pub.container}`;
    if (pub.containerInfo) {
      source += `: ${pub.containerInfo}`;
    }
    const locator = [pub.part, pub.pages ? `pp. ${pub.pages}` : null].filter(Boolean).join(', ');
    if (locator) {
      source += ` (${locator})`;
    }
    parts.push(endWithPeriod(source));
    if (publishers) {
      parts.push(endWithPeriod(publishers));
    }
  }

  if (pub.doi) {
    parts.push(doiUrl(pub.doi));
  } else if (pub.url) {
    parts.push(pub.url);
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

/* --------------------------------------------------------------------------
   JSON-LD
   -------------------------------------------------------------------------- */

function jsonLdWork(pub) {
  const isBook = BOOK_TYPES.has(pub.type);
  const work = {
    '@type': isBook ? 'Book' : 'ScholarlyArticle',
    '@id': `${SITE_URL}publications.html#${pub.id}`,
    name: pub.title,
    author: pub.authors.map((author) => (isSelf(author) ? { '@id': PERSON_ID } : { '@type': 'Person', name: author })),
    datePublished: String(pub.year),
    inLanguage: pub.language.length === 1 ? pub.language[0] : pub.language,
    url: pub.doi ? doiUrl(pub.doi) : `${SITE_URL}publications.html#${pub.id}`
  };

  if (pub.parallelTitle) {
    work.alternativeHeadline = pub.parallelTitle;
  }
  if (pub.doi) {
    work.identifier = { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi };
    work.sameAs = doiUrl(pub.doi);
  }
  if (!isBook && pub.container) {
    work.isPartOf = { '@type': pub.type === 'article' ? 'Periodical' : 'Book', name: pub.container };
  }
  if (pub.pages) {
    work.pagination = pub.pages;
  }
  if (isBook && pub.edition) {
    work.bookEdition = pub.edition;
  }
  if (isBook && pub.extent) {
    const pages = parseInt(pub.extent, 10);
    if (!Number.isNaN(pages)) {
      work.numberOfPages = pages;
    }
  }
  if (pub.type === 'abstract') {
    work.genre = 'автореферат дисертації';
  }
  const publisher = (pub.places || []).map((place) => place.publisher).filter(Boolean);
  if (publisher.length) {
    work.publisher = publisher.map((name) => ({ '@type': 'Organization', name }));
  }
  work.about = pub.topics.map((topic) => data.topics[topic]);
  if (!work.about.length) {
    delete work.about;
  }
  return JSON.parse(JSON.stringify(work));
}

function jsonLd() {
  const graph = [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}publications.html#page`,
      url: `${SITE_URL}publications.html`,
      name: 'Публікації — Микола Кісіль',
      inLanguage: 'uk',
      isPartOf: { '@id': `${SITE_URL}#website` },
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: publications.length,
        itemListElement: publications.map((pub, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': `${SITE_URL}publications.html#${pub.id}` }
        }))
      }
    },
    ...publications.map(jsonLdWork)
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c');
}

/* --------------------------------------------------------------------------
   HTML
   -------------------------------------------------------------------------- */

const searchIndex = (pub) =>
  [pub.title, pub.parallelTitle, ...pub.authors]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/[’'`ʼ]/g, '’');

function topicTags(pub) {
  if (!pub.topics.length) {
    return '';
  }
  const items = pub.topics.map((topic) => `<li class="tag">${escapeHtml(data.topics[topic])}</li>`).join('');
  return `\n              <ul class="tag-list pub-tags" aria-label="Теми">${items}</ul>`;
}

function renderEntry(pub) {
  const segments = dstuSegments(pub);
  const dstuText = segmentsToText(segments);
  const apaText = apaReference(pub);
  const doiButton = pub.doi
    ? `\n                <a class="pub-btn pub-btn--doi" href="${escapeHtml(doiUrl(pub.doi))}" target="_blank" rel="noopener noreferrer">DOI<span class="visually-hidden">: ${escapeHtml(pub.doi)} (відкриється в новій вкладці)</span></a>`
    : '';

  return `            <li class="pub" id="${pub.id}" data-type="${pub.type}" data-topics="${pub.topics.join(' ')}" data-year="${pub.year}" data-search="${escapeHtml(searchIndex(pub))}">
              <p class="pub-meta"><span class="pub-year">${pub.year}</span><span class="pub-kind">${escapeHtml(TYPE_SHORT[pub.type])}</span></p>
              <p class="pub-ref">${segmentsToHtml(segments)}</p>${topicTags(pub)}
              <div class="pub-actions">${doiButton}
                <button class="pub-btn" type="button" data-copy="${escapeHtml(dstuText)}" data-copy-label="ДСТУ" hidden>Копіювати ДСТУ</button>
                <button class="pub-btn" type="button" data-copy="${escapeHtml(apaText)}" data-copy-label="APA 7" hidden>Копіювати APA 7</button>
              </div>
            </li>`;
}

function renderGroups() {
  return TYPE_ORDER.map((type) => {
    const items = publications.filter((pub) => pub.type === type);
    if (!items.length) {
      return '';
    }
    return `        <section class="pub-group" data-group="${type}" aria-labelledby="group-${type}">
          <h2 class="pub-group-title" id="group-${type}">${escapeHtml(data.types[type])} <span class="pub-group-count" data-group-count>${items.length}</span></h2>
          <ul class="pub-list">
${items.map(renderEntry).join('\n')}
          </ul>
        </section>`;
  })
    .filter(Boolean)
    .join('\n\n');
}

function renderOptions(entries) {
  return entries.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
}

function renderPage() {
  const total = publications.length;
  const years = [...new Set(publications.map((pub) => pub.year))].sort((a, b) => a - b);
  const minYear = years[0];
  const maxYear = years[years.length - 1];
  const typeOptions = renderOptions([['', 'Усі типи'], ...TYPE_ORDER.map((type) => [type, data.types[type]])]);
  const topicOptions = renderOptions([['', 'Усі теми'], ...Object.entries(data.topics)]);
  const yearFrom = years.map((year) => `<option value="${year}"${year === minYear ? ' selected' : ''}>${year}</option>`).join('');
  const yearTo = years.map((year) => `<option value="${year}"${year === maxYear ? ' selected' : ''}>${year}</option>`).join('');
  const description = `Повна бібліографія Миколи Кісіля: ${total} праць ${minYear}–${maxYear} рр. — статті, матеріали конференцій, навчальні посібники. Термінознавство, переклад, ШІ і мова, якість вищої освіти.`;

  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <!-- Згенеровано scripts/build-publications.js з data/publications.json. Не редагуйте вручну. -->
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-495CR8HH3T"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-495CR8HH3T');
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Публікації — Микола Кісіль</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${SITE_URL}publications.html">
  <link rel="icon" href="favicon.ico" sizes="48x48">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="icon" href="favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Микола Кісіль">
  <meta name="theme-color" content="#faf8f4">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}publications.html">
  <meta property="og:site_name" content="Микола Кісіль">
  <meta property="og:title" content="Публікації — Микола Кісіль">
  <meta property="og:description" content="${escapeHtml(description)}">
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
  <link rel="stylesheet" href="styles.css?v=20261008">
  <link rel="stylesheet" href="booking.css?v=20261007">
  <link rel="stylesheet" href="publications.css?v=${ASSET_VERSION}">
  <script src="script.js?v=20261007" defer></script>
  <script src="publications.js?v=${ASSET_VERSION}" defer></script>
</head>
<body class="booking-page publications-page">
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
    <section class="section booking-section" aria-labelledby="publications-title">
      <div class="container">
        <header class="section-header">
          <p class="section-kicker">Бібліографія</p>
          <h1 class="section-title" id="publications-title">Публікації</h1>
          <p class="section-intro">
            Наукові праці з термінознавства, перекладу, мови в добу штучного інтелекту, філософії та якості вищої освіти,
            а також навчальні видання з англійської мови. Описи оформлено за ДСТУ 8302:2015.
          </p>
          <ul class="pub-summary">
            <li>Усього праць: <strong>${total}</strong></li>
            <li>${minYear}–${maxYear}</li>
            <li><a href="${escapeHtml(data.person.orcid)}" target="_blank" rel="noopener noreferrer">ORCID: 0009-0003-3382-9229<span class="visually-hidden"> (відкриється в новій вкладці)</span></a></li>
          </ul>
        </header>

        <form class="pub-filters" id="pub-filters" role="search" aria-label="Пошук і фільтри публікацій" hidden>
          <div class="pub-field pub-field--search">
            <label for="pub-q">Пошук за назвою чи співавтором</label>
            <input id="pub-q" name="q" type="search" autocomplete="off" spellcheck="false" placeholder="Напр.: термін, Малик">
          </div>
          <div class="pub-field">
            <label for="pub-type">Тип</label>
            <select id="pub-type" name="type">${typeOptions}</select>
          </div>
          <div class="pub-field">
            <label for="pub-topic">Тема</label>
            <select id="pub-topic" name="topic">${topicOptions}</select>
          </div>
          <fieldset class="pub-field pub-years">
            <legend>Роки</legend>
            <label class="visually-hidden" for="pub-from">Від року</label>
            <select id="pub-from" name="from">${yearFrom}</select>
            <span aria-hidden="true">–</span>
            <label class="visually-hidden" for="pub-to">До року</label>
            <select id="pub-to" name="to">${yearTo}</select>
          </fieldset>
          <div class="pub-filters-footer">
            <p class="pub-count" id="pub-count" aria-live="polite">Знайдено записів: ${total} з ${total}</p>
            <button class="btn btn--secondary pub-reset" type="reset">Скинути фільтри</button>
          </div>
        </form>

${renderGroups()}

        <p class="cards-empty pub-empty" id="pub-empty" hidden>За цими умовами нічого не знайдено. Спробуйте змінити запит або скинути фільтри.</p>
        <p class="visually-hidden" id="pub-copy-status" aria-live="polite"></p>
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
          <li><a href="index.html#about">Про мене</a></li>
          <li><a href="publications.html" aria-current="page">Публікації</a></li>
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

/* --------------------------------------------------------------------------
   Три найновіші праці на головній
   -------------------------------------------------------------------------- */

function shortVenue(pub) {
  if (BOOK_TYPES.has(pub.type)) {
    return [pub.genre, `${placesText(pub.places, pub.year)}`, pub.extent].filter(Boolean).join('. ');
  }
  const numbering = [pub.part, pub.issue].filter(Boolean).join('. ');
  const pages = pub.pages ? `${pub.pagesPrefix || 'С.'} ${pub.pages}` : '';
  return [pub.container, String(pub.year), numbering, pages].filter(Boolean).join('. ');
}

function renderLatestCard(pub) {
  const link = pub.doi
    ? `<a class="card-link" href="${escapeHtml(doiUrl(pub.doi))}" target="_blank" rel="noopener noreferrer">
              DOI: ${escapeHtml(pub.doi)}<span class="visually-hidden"> (відкриється в новій вкладці)</span>
            </a>`
    : `<a class="card-link" href="publications.html#${pub.id}">У повному списку публікацій</a>`;
  const tags = pub.topics.length
    ? `
            <ul class="tag-list" aria-label="Теми">
${pub.topics.map((topic) => `              <li class="tag">${escapeHtml(data.topics[topic])}</li>`).join('\n')}
            </ul>`
    : '';

  return `          <article class="card">
            <div class="card-meta">
              <span class="card-type">${escapeHtml(TYPE_SHORT[pub.type])}</span>
              <span>${pub.year}</span>
            </div>
            <h4 class="card-title"${langAttr(pub.title)}>${escapeHtml(pub.title)}</h4>
            <p class="card-authors">${escapeHtml(pub.authors.join(', '))}</p>
            <p class="card-venue">${escapeHtml(shortVenue(pub))}</p>${tags}
            ${link}
          </article>`;
}

function updateIndex() {
  const html = fs.readFileSync(INDEX_PATH, 'utf8');
  const start = html.indexOf(LATEST_START);
  const end = html.indexOf(LATEST_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error('У index.html не знайдено маркерів блоку найновіших публікацій.');
  }
  const block = `${LATEST_START}
        <h3 class="publications-subtitle">Найновіші праці</h3>
        <div class="card-grid">
${publications.slice(0, 3).map(renderLatestCard).join('\n\n')}
        </div>
        `;
  const updated = html.slice(0, start) + block + html.slice(end);
  if (updated !== html) {
    fs.writeFileSync(INDEX_PATH, updated);
  }
}

/* --------------------------------------------------------------------------
   Запуск
   -------------------------------------------------------------------------- */

fs.writeFileSync(PAGE_PATH, renderPage());
updateIndex();
console.log(`publications.html: ${publications.length} записів; index.html: оновлено 3 найновіші праці.`);

'use strict';

/**
 * Сторінка «Публікації»: фільтри поверх статичного HTML і копіювання описів.
 * Без JavaScript увесь перелік лишається видимим, а панель фільтрів і кнопки копіювання приховані.
 */

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[’'`ʼ]/g, '’')
    .replace(/\s+/g, ' ')
    .trim();

function initPublicationsFilters() {
  const form = document.getElementById('pub-filters');
  const entries = Array.from(document.querySelectorAll('.pub[data-type]'));
  const groups = Array.from(document.querySelectorAll('.pub-group'));
  const count = document.getElementById('pub-count');
  const empty = document.getElementById('pub-empty');

  if (!form || !entries.length) {
    return;
  }

  const fields = {
    q: form.elements.q,
    type: form.elements.type,
    topic: form.elements.topic,
    from: form.elements.from,
    to: form.elements.to
  };
  const defaults = {
    from: fields.from.querySelector('option[selected]').value,
    to: fields.to.querySelector('option[selected]').value
  };
  const total = entries.length;

  /* Стан фільтрів зберігається в адресі, щоб добірку можна було надіслати посиланням. */
  const readUrl = () => {
    const params = new URLSearchParams(window.location.search);
    Object.keys(fields).forEach((name) => {
      const value = params.get(name);
      if (value === null) {
        return;
      }
      const field = fields[name];
      if (field.tagName === 'SELECT' && !Array.from(field.options).some((option) => option.value === value)) {
        return;
      }
      field.value = value;
    });
  };

  const writeUrl = () => {
    if (!window.history || typeof window.history.replaceState !== 'function') {
      return;
    }
    const params = new URLSearchParams();
    if (fields.q.value.trim()) {
      params.set('q', fields.q.value.trim());
    }
    ['type', 'topic'].forEach((name) => {
      if (fields[name].value) {
        params.set(name, fields[name].value);
      }
    });
    if (fields.from.value !== defaults.from) {
      params.set('from', fields.from.value);
    }
    if (fields.to.value !== defaults.to) {
      params.set('to', fields.to.value);
    }
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  };

  const apply = () => {
    const terms = normalize(fields.q.value).split(' ').filter(Boolean);
    const type = fields.type.value;
    const topic = fields.topic.value;
    let from = Number(fields.from.value);
    let to = Number(fields.to.value);
    if (from > to) {
      [from, to] = [to, from];
    }

    let visible = 0;
    entries.forEach((entry) => {
      const year = Number(entry.dataset.year);
      const topics = entry.dataset.topics.split(' ');
      const haystack = entry.dataset.search;
      const matches =
        (!type || entry.dataset.type === type) &&
        (!topic || topics.includes(topic)) &&
        year >= from &&
        year <= to &&
        terms.every((term) => haystack.includes(term));
      entry.hidden = !matches;
      if (matches) {
        visible += 1;
      }
    });

    groups.forEach((group) => {
      const shown = group.querySelectorAll('.pub:not([hidden])').length;
      group.hidden = shown === 0;
      const badge = group.querySelector('[data-group-count]');
      if (badge) {
        badge.textContent = String(shown);
      }
    });

    if (count) {
      count.textContent = `Знайдено записів: ${visible} з ${total}`;
    }
    if (empty) {
      empty.hidden = visible !== 0;
    }
    writeUrl();
  };

  readUrl();
  form.hidden = false;
  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', () => {
    window.setTimeout(apply, 0);
  });
  apply();

  /* Панель фільтрів з'являється після завантаження й зсуває вміст — повертаємося до якоря запису. */
  const target = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
  if (target) {
    target.scrollIntoView({ block: 'start' });
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(area);
  if (!ok) {
    throw new Error('copy failed');
  }
}

function initCopyButtons() {
  const buttons = Array.from(document.querySelectorAll('[data-copy]'));
  const status = document.getElementById('pub-copy-status');
  const timers = new WeakMap();

  buttons.forEach((button) => {
    button.hidden = false;
    const label = button.textContent;

    button.addEventListener('click', async () => {
      let message;
      try {
        await copyText(button.dataset.copy);
        button.textContent = 'Скопійовано';
        button.classList.add('is-copied');
        message = `Опис за ${button.dataset.copyLabel} скопійовано.`;
      } catch (error) {
        button.textContent = 'Не вдалося';
        message = 'Не вдалося скопіювати. Виділіть текст опису вручну.';
      }
      if (status) {
        status.textContent = message;
      }
      window.clearTimeout(timers.get(button));
      timers.set(
        button,
        window.setTimeout(() => {
          button.textContent = label;
          button.classList.remove('is-copied');
        }, 2000)
      );
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPublicationsFilters();
  initCopyButtons();
});

'use strict';

/**
 * Персональний сайт — клієнтська логіка.
 * Модулі: тема, мобільне меню, плавна прокрутка, підсвічування активного розділу,
 * фільтрація публікацій, форма зворотного зв'язку, вибір теми заняття, рік у підвалі, стан шапки.
 */

const THEME_STORAGE_KEY = 'theme';
const THEME_COLORS = { light: '#faf8f4', dark: '#111418' };
const DESKTOP_QUERY = '(min-width: 60em)';

const storage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* Сховище недоступне (приватний режим тощо): вибір діятиме до перезавантаження. */
    }
  }
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
   Тема (світла / темна) зі збереженням у localStorage
   -------------------------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const getStoredTheme = () => {
    const value = storage.get(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  };

  const getSystemTheme = () => (systemQuery.matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', THEME_COLORS[theme]);
    }
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  };

  applyTheme(getStoredTheme() || getSystemTheme());

  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      storage.set(THEME_STORAGE_KEY, nextTheme);
    });
  }

  const handleSystemChange = () => {
    if (!getStoredTheme()) {
      applyTheme(getSystemTheme());
    }
  };

  if (typeof systemQuery.addEventListener === 'function') {
    systemQuery.addEventListener('change', handleSystemChange);
  } else if (typeof systemQuery.addListener === 'function') {
    systemQuery.addListener(handleSystemChange);
  }
}

/* --------------------------------------------------------------------------
   Мобільне меню
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  if (!toggle || !nav) {
    return null;
  }

  const desktopQuery = window.matchMedia(DESKTOP_QUERY);
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const open = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрити меню');
    nav.classList.add('is-open');
    document.body.classList.add('menu-open');

    const firstLink = nav.querySelector('a');
    if (firstLink) {
      firstLink.focus();
    }
  };

  const close = ({ restoreFocus = false } = {}) => {
    if (!isOpen()) {
      return;
    }
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Відкрити меню');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');

    if (restoreFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    if (isOpen()) {
      close();
    } else {
      open();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      close({ restoreFocus: true });
    }
  });

  document.addEventListener('click', (event) => {
    if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) {
      close();
    }
  });

  nav.addEventListener('focusout', (event) => {
    const nextFocus = event.relatedTarget;
    if (isOpen() && nextFocus && !nav.contains(nextFocus) && nextFocus !== toggle) {
      close();
    }
  });

  const handleViewportChange = (event) => {
    if (event.matches) {
      close();
    }
  };

  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', handleViewportChange);
  } else if (typeof desktopQuery.addListener === 'function') {
    desktopQuery.addListener(handleViewportChange);
  }

  return { close, isOpen };
}

/* --------------------------------------------------------------------------
   Плавна прокрутка до розділів
   -------------------------------------------------------------------------- */
function initSmoothScroll(menu) {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) {
      return;
    }

    const hash = link.getAttribute('href');
    if (hash === '#') {
      event.preventDefault();
      return;
    }

    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';

    if (hash === '#top') {
      event.preventDefault();
      if (menu) {
        menu.close();
      }
      window.scrollTo({ top: 0, behavior });
      if (window.history && typeof window.history.pushState === 'function') {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) {
      return;
    }

    event.preventDefault();
    if (menu) {
      menu.close();
    }

    target.scrollIntoView({ behavior, block: 'start' });

    if (window.history && typeof window.history.pushState === 'function') {
      window.history.pushState(null, '', hash);
    }

    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  });
}

/* --------------------------------------------------------------------------
   Підсвічування активного пункту меню під час прокрутки
   -------------------------------------------------------------------------- */
function initActiveSection() {
  const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  if (!links.length || !sections.length || !('IntersectionObserver' in window)) {
    return;
  }

  const linkBySection = new Map();
  sections.forEach((section) => {
    const matchingLink = links.find((link) => link.getAttribute('href') === `#${section.id}`) || null;
    linkBySection.set(section, matchingLink);
  });

  const setActive = (activeLink) => {
    links.forEach((link) => {
      if (link === activeLink) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(linkBySection.get(entry.target));
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   Фільтрація публікацій і проєктів
   -------------------------------------------------------------------------- */
function initPublicationFilters() {
  const buttons = Array.from(document.querySelectorAll('.filter-btn[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.card[data-category]'));
  const status = document.getElementById('filter-status');
  const emptyMessage = document.querySelector('.cards-empty');

  if (!buttons.length || !cards.length) {
    return;
  }

  const total = cards.length;

  const applyFilter = (filter) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const categories = card.dataset.category.split(/\s+/);
      const isVisible = filter === 'all' || categories.includes(filter);
      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount !== 0;
    }

    if (status) {
      status.textContent = `Показано матеріалів: ${visibleCount} з ${total}`;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  const initiallyPressed = buttons.find((button) => button.getAttribute('aria-pressed') === 'true');
  applyFilter(initiallyPressed ? initiallyPressed.dataset.filter : 'all');
}

/* --------------------------------------------------------------------------
   Форма зворотного зв'язку: валідація та надсилання через Apps Script (дія lead)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) {
    return;
  }

  const status = form.querySelector('.form-status');
  const recipient = form.dataset.recipient || 'kisilmv@gmail.com';
  const endpoint = form.dataset.endpoint || '';
  const submitButton = form.querySelector('[type="submit"]');
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (value) => (value.length >= 2 ? true : 'Вкажіть ім’я (щонайменше 2 символи).'),
    email: (value) => {
      if (!value.length) {
        return 'Вкажіть електронну адресу.';
      }
      return EMAIL_PATTERN.test(value) ? true : 'Перевірте формат адреси, наприклад: name@domain.com.';
    },
    message: (value) => (value.length >= 10 ? true : 'Напишіть повідомлення (щонайменше 10 символів).')
  };

  const fields = Array.from(form.querySelectorAll('input[name], textarea[name]')).filter((field) => field.name in rules);

  const setStatus = (message, type) => {
    if (!status) {
      return;
    }
    status.textContent = message;
    status.classList.remove('is-success', 'is-error');
    if (type) {
      status.classList.add(`is-${type}`);
    }
  };

  const setFieldError = (field, message) => {
    const wrapper = field.closest('.field');
    const errorElement = document.getElementById(`${field.id}-error`);

    if (message) {
      if (wrapper) {
        wrapper.classList.add('is-invalid');
      }
      field.setAttribute('aria-invalid', 'true');
      if (errorElement) {
        errorElement.textContent = message;
      }
    } else {
      if (wrapper) {
        wrapper.classList.remove('is-invalid');
      }
      field.removeAttribute('aria-invalid');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  };

  const validateField = (field) => {
    const rule = rules[field.name];
    if (!rule) {
      return true;
    }
    const result = rule(field.value.trim());
    const isValid = result === true;
    setFieldError(field, isValid ? '' : result);
    return isValid;
  };

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value.trim() || field.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
    });

    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length) {
      setStatus('Будь ласка, виправте позначені поля.', 'error');
      invalidFields[0].focus();
      return;
    }

    if (!endpoint) {
      setStatus(`Форму не налаштовано. Напишіть, будь ласка, напряму на ${recipient}.`, 'error');
      return;
    }

    const formData = new FormData(form);
    const payload = {
      action: 'lead',
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      topic: String(formData.get('topic') || 'Інше').trim(),
      message: String(formData.get('message') || '').trim(),
      website: String(formData.get('website') || '')
    };

    if (submitButton) {
      submitButton.disabled = true;
    }
    setStatus('Надсилаю…');

    try {
      // text/plain — «простий» запит без CORS-preflight, який Apps Script не підтримує
      const response = await fetch(endpoint, { method: 'POST', body: JSON.stringify(payload) });
      const result = await response.json();

      if (result && result.ok) {
        setStatus(`Дякую! Повідомлення надіслано. Я відповім на ${payload.email}.`, 'success');
        form.reset();
        fields.forEach((field) => setFieldError(field, ''));
      } else {
        const reason = result && result.error === 'invalid' && result.message ? `${result.message} ` : '';
        setStatus(`${reason || 'Не вдалося надіслати повідомлення. '}Можна написати напряму на ${recipient}.`, 'error');
      }
    } catch (error) {
      setStatus(`Не вдалося надіслати повідомлення: перевірте з’єднання або напишіть напряму на ${recipient}.`, 'error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   Кнопки «Записатися»: попередній вибір теми у формі
   -------------------------------------------------------------------------- */
function initTopicPrefill() {
  const select = document.getElementById('contact-topic');
  if (!select) {
    return;
  }

  document.querySelectorAll('[data-topic]').forEach((link) => {
    link.addEventListener('click', () => {
      const topic = link.dataset.topic;
      const hasOption = Array.from(select.options).some((option) => option.value === topic);
      if (hasOption) {
        select.value = topic;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Поточний рік у підвалі
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = year;
  });
}

/* --------------------------------------------------------------------------
   Тінь шапки після початку прокрутки
   -------------------------------------------------------------------------- */
function initHeaderState() {
  const header = document.querySelector('.site-header');
  if (!header) {
    return;
  }

  let ticking = false;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

/* --------------------------------------------------------------------------
   Ініціалізація
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const menu = initMobileMenu();
  initSmoothScroll(menu);
  initActiveSection();
  initPublicationFilters();
  initContactForm();
  initTopicPrefill();
  initFooterYear();
  initHeaderState();
});

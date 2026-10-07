'use strict';

/**
 * Онлайн-запис на заняття — клієнтська логіка.
 * Дані бере з вебзастосунку Google Apps Script (booking-backend/Code.gs).
 */

/* Вставте сюди URL вебзастосунку Apps Script (закінчується на /exec) */
const BOOKING_API_URL = 'https://script.google.com/macros/s/AKfycbxwFvc62jbwy0SwopM_iJz9kLkHGP0PJJqpf4sn1YCTv0kDJBPv7LUBgyS6vvxdeTeY/exec';

const BOOKING_TZ = 'Europe/Kyiv';
const CANCEL_MIN_HOURS = 1;

(function () {
  const $ = (id) => document.getElementById(id);
  const params = new URLSearchParams(window.location.search);
  const demo = !BOOKING_API_URL && params.has('demo');

  const localTz = (() => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return BOOKING_TZ; }
  })();

  /* ---------- Форматування дат ---------- */
  const fmtTime = (d, tz) => new Intl.DateTimeFormat('uk-UA', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
  const fmtDayKey = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: BOOKING_TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  const fmtWeekday = (d) => new Intl.DateTimeFormat('uk-UA', { timeZone: BOOKING_TZ, weekday: 'long' }).format(d);
  const fmtDate = (d) => new Intl.DateTimeFormat('uk-UA', { timeZone: BOOKING_TZ, day: 'numeric', month: 'long' }).format(d);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function describeSlot(startIso, endIso) {
    const s = new Date(startIso);
    const e = new Date(endIso);
    const kyiv = fmtTime(s, BOOKING_TZ) + '–' + fmtTime(e, BOOKING_TZ);
    const local = fmtTime(s, localTz) + '–' + fmtTime(e, localTz);
    return {
      day: cap(fmtWeekday(s)) + ', ' + fmtDate(s),
      kyiv: kyiv,
      local: local !== kyiv ? local : ''
    };
  }

  function whenHtml(startIso, endIso) {
    const d = describeSlot(startIso, endIso);
    const localNote = d.local ? ' · за вашим часом ' + d.local : '';
    return escapeHtml(d.day + ', ' + d.kyiv) + '<small>за київським часом' + escapeHtml(localNote) + '</small>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------- Зв'язок із сервером ---------- */
  async function apiGet(query) {
    if (demo) return demoApi(query);
    const res = await fetch(BOOKING_API_URL + '?' + new URLSearchParams(query).toString(), { cache: 'no-store' });
    return res.json();
  }

  async function apiPost(body) {
    if (demo) return demoApi(body);
    // text/plain — «простий» запит без CORS-preflight, який Apps Script не підтримує
    const res = await fetch(BOOKING_API_URL, { method: 'POST', body: JSON.stringify(body) });
    return res.json();
  }

  /* ---------- Демо-режим: booking.html?demo (поки сервер не підключено) ---------- */
  let demoSlots = null;
  function demoApi(q) {
    if (!demoSlots) {
      demoSlots = [];
      const base = new Date();
      base.setMinutes(0, 0, 0);
      [[1, 9], [1, 18], [2, 17], [2, 19], [4, 10], [4, 11], [4, 18], [6, 16], [8, 18]].forEach(([day, hour], i) => {
        const s = new Date(base);
        s.setDate(s.getDate() + day);
        s.setHours(hour);
        demoSlots.push({ key: 'demo' + i, start: s.toISOString(), end: new Date(s.getTime() + 3600e3).toISOString() });
      });
    }
    return new Promise((resolve) => setTimeout(() => {
      if (q.action === 'slots') resolve({ ok: true, slots: demoSlots });
      else if (q.action === 'book') {
        const slot = demoSlots.find((s) => s.key === q.key);
        demoSlots = demoSlots.filter((s) => s.key !== q.key);
        resolve({ ok: true, start: slot.start, end: slot.end, email: q.email });
      } else if (q.action === 'booking') {
        resolve({ ok: true, name: 'Олена', start: demoSlots[2].start, end: demoSlots[2].end, canCancel: true, cancelMinHours: CANCEL_MIN_HOURS });
      } else resolve({ ok: true });
    }, 450));
  }

  document.querySelectorAll('[data-cancel-hours]').forEach((el) => { el.textContent = CANCEL_MIN_HOURS; });

  // cancel і token забирає з адреси скрипт у <head> booking.html (до запуску аналітики)
  const cancelLink = window.BOOKING_CANCEL ||
    (params.has('cancel') ? { key: params.get('cancel'), token: params.get('token') } : null);

  if (cancelLink && cancelLink.key && cancelLink.token) {
    initCancelView(cancelLink.key, cancelLink.token);
  } else {
    initScheduleView();
  }

  /* =========================================================================
     Розклад і бронювання
     ========================================================================= */
  function initScheduleView() {
    const status = $('slots-status');
    const daysEl = $('slot-days');
    const refreshBtn = $('slots-refresh');
    const dialog = $('booking-dialog');
    const form = $('booking-form');
    const formStatus = $('form-status');
    const submitBtn = $('booking-submit');
    const success = $('booking-success');
    let current = null;
    let loading = false;

    if (!BOOKING_API_URL && !demo) {
      status.textContent = '';
      daysEl.innerHTML = '<div class="slot-empty"><p><b>Онлайн-запис незабаром запрацює.</b></p>' +
        '<p>Поки що <a href="index.html#contacts">залиште заявку</a> — я запропоную зручний час.</p></div>';
      return;
    }

    if (demo) status.dataset.demo = '1';

    async function loadSlots() {
      if (loading) return;
      loading = true;
      refreshBtn.hidden = true;
      status.classList.remove('is-error');
      status.textContent = 'Завантажую розклад…';
      if (!daysEl.children.length) {
        daysEl.innerHTML = '<div class="slot-day slot-day--skeleton"></div><div class="slot-day slot-day--skeleton"></div><div class="slot-day slot-day--skeleton"></div>';
      }
      try {
        const data = await apiGet({ action: 'slots' });
        if (!data.ok) throw new Error(data.message);
        render(data.slots);
      } catch (err) {
        daysEl.innerHTML = '';
        status.classList.add('is-error');
        status.textContent = 'Не вдалося завантажити розклад. Перевірте з’єднання й спробуйте ще раз.';
      } finally {
        loading = false;
        refreshBtn.hidden = false;
      }
    }

    function render(slots) {
      daysEl.innerHTML = '';
      if (!slots.length) {
        status.textContent = '';
        daysEl.innerHTML = '<div class="slot-empty"><p><b>Наразі всі слоти зайняті.</b></p>' +
          '<p>Нові з’являються регулярно — зазирніть пізніше або <a href="index.html#contacts">напишіть мені</a>, і я підберу час.</p></div>';
        return;
      }

      const groups = new Map();
      slots.forEach((slot) => {
        const key = fmtDayKey(new Date(slot.start));
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(slot);
      });

      const n = slots.length;
      status.textContent = (demo ? 'Демонстраційний режим. ' : '') + 'Вільних слотів: ' + n + '.';

      groups.forEach((daySlots) => {
        const first = new Date(daySlots[0].start);
        const card = document.createElement('article');
        card.className = 'slot-day';
        card.innerHTML = '<h2 class="slot-day-title">' + escapeHtml(cap(fmtWeekday(first))) +
          '<span>' + escapeHtml(fmtDate(first)) + '</span></h2>';
        const list = document.createElement('ul');
        list.className = 'slot-list';
        daySlots.forEach((slot) => {
          const d = describeSlot(slot.start, slot.end);
          const li = document.createElement('li');
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'slot-btn';
          btn.innerHTML = '<span>' + escapeHtml(d.kyiv) + '</span>' +
            (d.local ? '<span class="slot-local">у вас ' + escapeHtml(d.local) + '</span>' : '');
          btn.setAttribute('aria-label', 'Забронювати: ' + d.day + ', ' + d.kyiv);
          btn.addEventListener('click', () => openDialog(slot));
          li.appendChild(btn);
          list.appendChild(li);
        });
        card.appendChild(list);
        daysEl.appendChild(card);
      });
    }

    function openDialog(slot) {
      current = slot;
      form.hidden = false;
      success.hidden = true;
      formStatus.textContent = '';
      formStatus.className = 'form-status';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Забронювати';
      $('dialog-when').innerHTML = whenHtml(slot.start, slot.end);
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      setTimeout(() => $('b-name').focus(), 30);
    }

    function closeDialog() {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }

    dialog.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]') || e.target === dialog) closeDialog();
    });

    dialog.addEventListener('close', () => {
      if (!success.hidden) loadSlots();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('b-name').value.trim();
      const email = $('b-email').value.trim();
      formStatus.className = 'form-status is-error';

      if (name.length < 2) {
        formStatus.textContent = 'Вкажіть, будь ласка, ім’я.';
        $('b-name').focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        formStatus.textContent = 'Перевірте адресу електронної пошти.';
        $('b-email').focus();
        return;
      }

      formStatus.textContent = '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Бронюю…';

      try {
        const res = await apiPost({
          action: 'book',
          key: current.key,
          name: name,
          email: email,
          note: $('b-note').value.trim(),
          website: $('b-website').value
        });
        if (!res.ok) {
          formStatus.textContent = res.message || 'Не вдалося забронювати. Спробуйте ще раз.';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Забронювати';
          if (res.error === 'taken') loadSlots();
          return;
        }
        try { if (typeof gtag === 'function') gtag('event', 'booking_created'); } catch (err) { /* аналітика необов'язкова */ }
        $('success-when').innerHTML = whenHtml(res.start, res.end);
        $('success-email').textContent = res.email || email;
        form.hidden = true;
        success.hidden = false;
        form.reset();
      } catch (err) {
        formStatus.textContent = 'Немає зв’язку із сервером. Перевірте інтернет і спробуйте ще раз.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Забронювати';
      }
    });

    refreshBtn.addEventListener('click', loadSlots);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !dialog.open) loadSlots();
    });

    loadSlots();
  }

  /* =========================================================================
     Скасування за посиланням з листа
     ========================================================================= */
  async function initCancelView(key, token) {
    $('view-schedule').hidden = true;
    $('view-cancel').hidden = false;
    document.title = 'Скасування заняття — Микола Кісіль';

    const status = $('cancel-status');
    const details = $('cancel-details');
    const after = $('cancel-after');
    const confirmBtn = $('cancel-confirm');

    const showError = (msg) => {
      details.hidden = true;
      status.hidden = false;
      status.classList.add('is-error');
      status.textContent = msg;
      after.hidden = false;
    };

    if (!BOOKING_API_URL && !demo) {
      showError('Онлайн-запис ще не підключено.');
      return;
    }

    let info;
    try {
      info = await apiGet({ action: 'booking', key: key, token: token });
    } catch (err) {
      showError('Немає зв’язку із сервером. Спробуйте пізніше.');
      return;
    }
    if (!info.ok) {
      showError(info.message || 'Бронювання не знайдено.');
      return;
    }

    status.hidden = true;
    details.hidden = false;
    $('cancel-when').innerHTML = whenHtml(info.start, info.end);

    if (!info.canCancel) {
      $('cancel-hint').textContent = 'До заняття лишилося менше ніж ' + info.cancelMinHours +
        ' год, тож онлайн-скасування вже недоступне. Будь ласка, напишіть мені напряму.';
      confirmBtn.hidden = true;
      return;
    }

    $('cancel-hint').textContent = (info.name ? info.name + ', ' : '') +
      'після скасування цей час знову стане вільним для інших студентів.';

    confirmBtn.addEventListener('click', async () => {
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Скасовую…';
      try {
        const res = await apiPost({ action: 'cancel', key: key, token: token });
        if (!res.ok) {
          showError(res.message || 'Не вдалося скасувати.');
          return;
        }
        details.hidden = true;
        status.hidden = false;
        status.classList.remove('is-error');
        status.textContent = 'Заняття скасовано. Підтвердження надіслано на вашу пошту.';
        after.hidden = false;
      } catch (err) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Скасувати заняття';
        $('cancel-hint').textContent = 'Немає зв’язку із сервером. Спробуйте ще раз.';
      }
    });
  }
})();

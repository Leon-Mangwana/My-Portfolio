/* ===================================================================
   Leon Mangwana — Portfolio interactions (vanilla JS)
   =================================================================== */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Theme (persisted; defaults to dark) ---------- */
  var toggle = document.getElementById('themeToggle');
  var sun = document.querySelector('.icon-sun');
  var moon = document.querySelector('.icon-moon');

  function applyTheme(mode) {
    root.classList.toggle('light', mode === 'light');
    if (sun && moon) {
      sun.classList.toggle('hidden', mode === 'light');
      moon.classList.toggle('hidden', mode !== 'light');
    }
  }
  applyTheme(localStorage.getItem('theme') || 'dark');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.classList.contains('light') ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Nav scroll state + progress bar ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  function onScroll() {
    var t = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', t > 24);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (t / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  function closeMenu() {
    if (!menu) return;
    menu.style.maxHeight = '0px';
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.style.maxHeight && menu.style.maxHeight !== '0px';
      if (open) { closeMenu(); }
      else { menu.style.maxHeight = menu.scrollHeight + 'px'; burger.setAttribute('aria-expanded', 'true'); }
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  /* ---------- Scroll spy ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute('id');
          navLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll (with stagger) ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.classList.add('visible'); }, i * 70);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Animated counters ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step); else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cObs.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); });
  }

  /* ---------- Typed headline ---------- */
  var typed = document.getElementById('typed');
  if (typed) {
    var roles = ['Software Engineer', 'Full-Stack Developer', 'Mobile App Builder', 'Problem Solver', 'CS Student'];
    var ri = 0, ci = 0, del = false;
    (function tick() {
      var w = roles[ri];
      typed.textContent = w.substring(0, ci);
      if (!del && ci < w.length) { ci++; setTimeout(tick, 70); }
      else if (del && ci > 0) { ci--; setTimeout(tick, 38); }
      else if (!del) { del = true; setTimeout(tick, 1500); }
      else { del = false; ri = (ri + 1) % roles.length; setTimeout(tick, 320); }
    })();
  }

  /* ---------- Tilt on cards ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (px * 6) + 'deg) rotateX(' + (-py * 6) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------- Mouse spotlight ---------- */
  var spot = document.getElementById('spotlight');
  if (spot && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', function (e) {
      spot.style.opacity = '1';
      spot.style.left = e.clientX + 'px';
      spot.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  /* ---------- Contact form (Formspree + graceful fallback) ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var statusEl = document.getElementById('formStatus');
    var btn = document.getElementById('cfSubmit');
    function setStatus(msg, type) { if (statusEl) { statusEl.textContent = msg; statusEl.className = 'text-sm text-center mt-3 min-h-[1.2em] ' + (type || ''); } }

    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        e.preventDefault();
        var subject = encodeURIComponent(form.subject.value || 'Portfolio enquiry');
        var body = encodeURIComponent((form.message.value || '') + '\n\n— ' + (form.name.value || '') + ' (' + (form.email.value || '') + ')');
        window.location.href = 'mailto:K2Leony@gmail.com?subject=' + subject + '&body=' + body;
        setStatus('Opening your email app… (set up Formspree for in-page sending — see the note in index.html)', 'ok');
        return;
      }
      e.preventDefault();
      btn.disabled = true; setStatus('Sending…', '');
      fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (res.ok) { form.reset(); setStatus('Thanks! Your message has been sent — I’ll reply soon.', 'ok'); }
          else { setStatus('Something went wrong. Please email K2Leony@gmail.com directly.', 'err'); }
        })
        .catch(function () { setStatus('Network error. Please email K2Leony@gmail.com directly.', 'err'); })
        .finally(function () { btn.disabled = false; });
    });
  }
})();

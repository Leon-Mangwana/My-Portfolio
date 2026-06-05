/* ===================================================================
   Leon Mangwana — Portfolio interactions
   =================================================================== */
(function () {
  'use strict';

  /* ---------- Year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (persisted) ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var stored = localStorage.getItem('theme');
  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  var initial = stored || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initial);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Navbar scroll state + progress bar ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('scrollProgress');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 30);

    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');

  function closeMenu() {
    if (!links) return;
    links.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Active nav link on scroll (scroll spy) ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // small stagger for siblings entering together
          setTimeout(function () { entry.target.classList.add('visible'); }, i * 70);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { revObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Animated count-up for stats ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var duration = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('.stat__num[data-count]');
  if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { countObs.observe(c); });
  }

  /* ---------- Typed role effect ---------- */
  var typedEl = document.getElementById('typed');
  if (typedEl) {
    var roles = [
      'Computer Science Student',
      'Aspiring Software Engineer',
      'Web & Database Developer',
      'Problem Solver'
    ];
    var ri = 0, ci = 0, deleting = false;
    function tick() {
      var word = roles[ri];
      typedEl.textContent = word.substring(0, ci);
      if (!deleting && ci < word.length) {
        ci++; setTimeout(tick, 75);
      } else if (deleting && ci > 0) {
        ci--; setTimeout(tick, 40);
      } else {
        if (!deleting) { deleting = true; setTimeout(tick, 1600); }
        else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 350); }
      }
    }
    tick();
  }

  /* ---------- Contact form (Formspree AJAX + graceful fallback) ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var statusEl = document.getElementById('formStatus');
    var submitBtn = document.getElementById('cfSubmit');

    function setStatus(msg, type) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = 'form__status' + (type ? ' ' + type : '');
    }

    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';

      // Not configured yet → fall back to opening the visitor's email client.
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        e.preventDefault();
        var name = encodeURIComponent(form.name.value || '');
        var subject = encodeURIComponent(form.subject.value || 'Portfolio enquiry');
        var body = encodeURIComponent((form.message.value || '') + '\n\n— ' + (form.name.value || '') + ' (' + (form.email.value || '') + ')');
        window.location.href = 'mailto:K2Leony@gmail.com?subject=' + subject + '&body=' + body;
        setStatus('Opening your email app… (set up Formspree for in-page sending — see the note in index.html)', 'ok');
        return;
      }

      // Configured → submit via fetch so the visitor stays on the page.
      e.preventDefault();
      submitBtn.disabled = true;
      setStatus('Sending…', '');

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus('Thanks! Your message has been sent — I’ll reply soon.', 'ok');
        } else {
          setStatus('Something went wrong. Please email K2Leony@gmail.com directly.', 'err');
        }
      }).catch(function () {
        setStatus('Network error. Please email K2Leony@gmail.com directly.', 'err');
      }).finally(function () {
        submitBtn.disabled = false;
      });
    });
  }
})();

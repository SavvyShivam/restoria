/* Restoria landing — vanilla JS, zero dependencies. */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');

    // year
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = new Date().getFullYear();

    /* ---- sticky nav shadow ---- */
    var nav = document.querySelector('.nav');
    if (nav) {
      var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 12); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---- mobile menu ---- */
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () { links.classList.toggle('open'); });
      links.addEventListener('click', function (e) {
        if (e.target.closest('a')) links.classList.remove('open');
      });
    }

    /* ---- scroll reveals ---- */
    var revealEls = document.querySelectorAll('.reveal, .stagger');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- interactive before/after slider ---- */
    document.querySelectorAll('[data-ba]').forEach(function (ba) {
      var dragging = false;
      // --split drives the 'before' clip (inset from the right); divider/handle use left:pct%.
      var apply = function (pct) {
        pct = Math.max(2, Math.min(98, pct));
        ba.style.setProperty('--split', (100 - pct) + '%');       // before: inset(0 <right> 0 0)
        var div = ba.querySelector('.divider'), h = ba.querySelector('.handle');
        if (div) div.style.left = pct + '%';
        if (h) h.style.left = pct + '%';
      };
      var pctFromEvent = function (e) {
        var r = ba.getBoundingClientRect();
        var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
        return (x / r.width) * 100;
      };
      var start = function (e) { dragging = true; ba.classList.add('grabbing'); apply(pctFromEvent(e)); };
      var move = function (e) { if (dragging) { apply(pctFromEvent(e)); if (e.cancelable) e.preventDefault(); } };
      var end = function () { dragging = false; ba.classList.remove('grabbing'); };

      ba.addEventListener('pointerdown', start);
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', end);

      // auto-demo: sweep from center once it scrolls into view, then rest at 50%
      var demoed = false;
      var demo = function () {
        if (demoed) return; demoed = true;
        var seq = [50, 78, 24, 50], i = 0;
        var tick = function () {
          if (i >= seq.length) return;
          animateTo(seq[i], 620); i++;
          setTimeout(tick, 640);
        };
        var animateTo = function (target, dur) {
          var startPct = parseFloat((ba.querySelector('.handle') || {}).style.left) || 50;
          var t0 = performance.now();
          var step = function (now) {
            var k = Math.min(1, (now - t0) / dur);
            var e = 1 - Math.pow(1 - k, 3); // easeOutCubic
            apply(startPct + (target - startPct) * e);
            if (k < 1 && !dragging) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        };
        setTimeout(tick, 260);
      };
      apply(50);
      if ('IntersectionObserver' in window) {
        var dio = new IntersectionObserver(function (en) {
          en.forEach(function (x) { if (x.isIntersecting) { demo(); dio.disconnect(); } });
        }, { threshold: 0.5 });
        dio.observe(ba);
      }
    });
  });
})();

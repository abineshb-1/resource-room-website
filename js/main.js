/* =============================================
   LEARNNEST — MAIN JS
   Navigation toggle + scroll reveal
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navigation hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('nav-overlay');

  if (hamburger && navOverlay) {
    hamburger.addEventListener('click', function () {
      const isOpen = navOverlay.classList.contains('open');
      if (isOpen) {
        navOverlay.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        navOverlay.classList.add('open');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    /* Close overlay when a link is clicked */
    navOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navOverlay.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  /* ---- Active nav link ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});

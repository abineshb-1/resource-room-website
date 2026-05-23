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

  /* ---- Contact form → WhatsApp ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = (document.getElementById('name')?.value    || '').trim();
      const age     = (document.getElementById('child-age')?.value || '').trim();
      const phone   = (document.getElementById('phone')?.value   || '').trim();
      const message = (document.getElementById('message')?.value || '').trim();

      if (!name && !phone && !message) {
        alert('Please fill in at least your name and a message before sending.');
        return;
      }

      const lines = [
        'New enquiry from the Learnnest website',
        '',
        name    ? 'Name: '           + name    : null,
        age     ? "Child's age: "    + age     : null,
        phone   ? 'Contact number: ' + phone   : null,
        message ? '\nMessage:\n'     + message : null,
      ].filter(Boolean).join('\n');

      const waURL = 'https://wa.me/919900085179?text=' + encodeURIComponent(lines);
      window.open(waURL, '_blank');
    });
  }

});

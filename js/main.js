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

  /* ---- Contact form — validation + success message ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const name    = (document.getElementById('name')?.value    || '').trim();
      const phone   = (document.getElementById('phone')?.value   || '').trim();
      const message = (document.getElementById('message')?.value || '').trim();

      if (!name && !phone && !message) {
        e.preventDefault();
        alert('Please fill in at least your name and a message before sending.');
        return;
      }

      const subjectInput = contactForm.querySelector('input[name="subject"]');
      if (subjectInput && name) {
        subjectInput.value = 'New enquiry from ' + name + ' — Resource Room';
      }
    });
  }

  /* Show success message after redirect back from Web3Forms */
  if (window.location.search.includes('sent=1')) {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
    history.replaceState(null, '', window.location.pathname);
  }

});

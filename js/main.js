/* ============================================
   MAIN — Navigation, Scroll, Interactions
   ============================================ */

(function () {
  'use strict';

  // ─── MOBILE NAV TOGGLE ───
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.textContent = isOpen ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', isOpen);

      if (navOverlay) {
        navOverlay.classList.toggle('visible', isOpen);
      }
    });

    // Close on overlay click
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-expanded', false);
        navOverlay.classList.remove('visible');
      });
    }

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
        if (navOverlay) navOverlay.classList.remove('visible');
      });
    });
  }

  // ─── SCROLL NAV STYLE ───
  const navBar = document.querySelector('.nav-bar');
  if (navBar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      navBar.classList.toggle('scrolled', scrollY > 50);
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ─── ACTIVE PAGE INDICATOR ───
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = href.split('/').pop() || 'index.html';

    if (linkPath === currentPath ||
      (currentPath === '' && linkPath === 'index.html') ||
      (currentPath === 'index.html' && (href === '/' || href === './'))) {
      link.classList.add('active');
    }
  });

  // ─── SCROLL REVEAL (IntersectionObserver) ───
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ─── TYPING EFFECT ───
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const phrases = [
      'Desarrollador Full Stack',
      'Backend Engineer',
      'Frontend Creator',
      'Apasionado por el código',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Start typing after hero animation
    setTimeout(typeEffect, 1200);
  }

  // ─── SKILL BAR ANIMATION ───
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          skillObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    skillFills.forEach(fill => skillObserver.observe(fill));
  }

  // ─── PROJECT FILTERS ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];

          if (filter === 'all' || tags.includes(filter)) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ─── PAGE TRANSITION ───
  const mainContent = document.querySelector('.page-content') || document.querySelector('main');
  if (mainContent) {
    mainContent.classList.add('page-transition');
  }

  // ─── CONTACT FORM (mailto fallback) ───
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const subject = contactForm.querySelector('#subject').value;
      const message = contactForm.querySelector('#message').value;

      // EDITAR: Reemplaza con tu email real
      const mailtoEmail = 'tu-email@example.com';
      const mailtoSubject = encodeURIComponent(subject || 'Contacto desde portafolio');
      const mailtoBody = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\n\n${message}`
      );

      window.location.href = `mailto:${mailtoEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    });
  }

})();

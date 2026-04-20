/* ══════════════════════════════════════════
   NEXOVIBEX — script.js
   FAQ Toggle · Scroll Reveal · Particles · Smooth Scroll
══════════════════════════════════════════ */

// ════════════════════════════════
// FAQ ACCORDION TOGGLE
// ════════════════════════════════
function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');

  // Close all open items first
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

  // Open clicked item if it was closed
  if (!wasOpen) item.classList.add('open');
}

// ════════════════════════════════
// SCROLL REVEAL (IntersectionObserver)
// ════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stagger delay based on sibling index
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const delay = siblings.indexOf(entry.target) * 80;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ════════════════════════════════
// FLOATING PARTICLES
// ════════════════════════════════
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#00cfff', '#a855f7', '#e040fb', '#f5c842'];

  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size     = Math.random() * 4 + 1;
    const color    = colors[Math.floor(Math.random() * colors.length)];
    const left     = Math.random() * 100;
    const duration = Math.random() * 18 + 12;
    const delay    = Math.random() * 20;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;

    container.appendChild(p);
  }
})();

// ════════════════════════════════
// SMOOTH SCROLL — Anchor Links
// ════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

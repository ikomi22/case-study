document.addEventListener('DOMContentLoaded', () => {

  // ── Mark active nav link based on current page ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.top-nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('nav-active');
  });

  // ── Reading progress ──
  const progressFill = document.querySelector('.reading-progress-fill');
  if (progressFill) {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) progressFill.style.transform = `scaleX(${window.scrollY / total})`;
    };
    window.addEventListener('scroll', update, { passive: true });
  }

  // ── Scroll-in animations ──
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    document.querySelectorAll('.metrics-row, .kpi-dashboard, .lessons-grid, .stakeholder-matrix, .ssp-grid, .landing-cards-grid').forEach(parent => {
      [...parent.children].forEach((child, i) => {
        child.style.setProperty('--stagger', `${i * 90}ms`);
      });
    });

    const targets = document.querySelectorAll(
      '.section-label, .decision-card, .kpi-card, .metric-card, .lesson-card, ' +
      '.pull-quote, .signature-quote, .sh-col, .ssp-col, .journey-stage, ' +
      '.context-layout, .sub-title, .funnel, .progress-item, .landing-card'
    );

    targets.forEach(el => el.classList.add('anim-ready'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });

    targets.forEach(el => observer.observe(el));
  }

});

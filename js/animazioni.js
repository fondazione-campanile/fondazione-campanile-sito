{
  const movimentoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!movimentoRidotto.matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('animazioni');

    const osservatore = new IntersectionObserver((voci) => {
      voci.forEach((voce) => {
        if (voce.isIntersecting) {
          voce.target.classList.add('rivelato');
          osservatore.unobserve(voce.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('[data-rivela]').forEach((elemento) => {
          osservatore.observe(elemento);
        });
      });
    });
  }
}
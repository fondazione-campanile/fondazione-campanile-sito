{
  const movimentoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)');

  function preparaScrittura(elemento) {
    const testo = elemento.textContent.trim();

    const leggibile = document.createElement('span');
    leggibile.className = 'visually-hidden';
    leggibile.textContent = testo;

    const visibile = document.createElement('span');
    visibile.setAttribute('aria-hidden', 'true');

    Array.from(testo).forEach((carattere, indice) => {
      const lettera = document.createElement('span');
      lettera.className = 'lettera';
      lettera.textContent = carattere;
      lettera.style.setProperty('--i', indice);
      visibile.append(lettera);
    });

    elemento.replaceChildren(leggibile, visibile);
  }

  if (!movimentoRidotto.matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('animazioni');

    document.querySelectorAll('[data-scrittura]').forEach(preparaScrittura);

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
        document.querySelectorAll('[data-rivela], [data-scrittura]').forEach((elemento) => {
          osservatore.observe(elemento);
        });
      });
    });
  }
}
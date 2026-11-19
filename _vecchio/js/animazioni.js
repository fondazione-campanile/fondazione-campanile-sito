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

    // Comparse e titoli: osservati direttamente
    const osservatore = new IntersectionObserver((voci) => {
      voci.forEach((voce) => {
        if (voce.isIntersecting) {
          voce.target.classList.add('rivelato');
          osservatore.unobserve(voce.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    // Fasce: si osserva il contenitore, perché la fascia nascosta è fuori schermo
    const osservatoreFasce = new IntersectionObserver((voci) => {
      voci.forEach((voce) => {
        if (voce.isIntersecting) {
          voce.target.querySelectorAll(':scope > .fascia').forEach((fascia) => {
            fascia.classList.add('rivelato');
          });
          osservatoreFasce.unobserve(voce.target);
        }
      });
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0 });

    // Avvio dell'osservazione (dopo due frame, così lo stato nascosto è già disegnato)
    const avvia = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.querySelectorAll('[data-rivela], [data-scrittura]').forEach((elemento) => {
            osservatore.observe(elemento);
          });

          const contenitori = new Set(
            Array.from(document.querySelectorAll('.fascia'), (fascia) => fascia.parentElement)
          );
          contenitori.forEach((contenitore) => osservatoreFasce.observe(contenitore));
        });
      });
    };

    // Se c'è l'intro, si aspetta che finisca; altrimenti si parte subito
    if (document.documentElement.classList.contains('intro-attiva')) {
      document.addEventListener('intro-finita', avvia, { once: true });
    } else {
      avvia();
    }
  }
}
{
  const lista = document.getElementById('progetti-lista');

  if (lista) {
    const galleria = lista.closest('.progetti__galleria');
    const schede = Array.from(lista.querySelectorAll('.progetto'));
    const precedente = galleria.querySelector('[data-direzione="-1"]');
    const successivo = galleria.querySelector('[data-direzione="1"]');
    const movimentoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)');

    function indiceCorrente() {
      const passo = schede[1].offsetLeft - schede[0].offsetLeft;
      return Math.round(lista.scrollLeft / passo);
    }

    function aggiornaFrecce() {
      const fine = lista.scrollWidth - lista.clientWidth;
      precedente.disabled = lista.scrollLeft <= 1;
      successivo.disabled = lista.scrollLeft >= fine - 1;
    }

    function vaiA(indice) {
      const limitato = Math.max(0, Math.min(indice, schede.length - 1));
      lista.scrollTo({
        left: schede[limitato].offsetLeft,
        behavior: movimentoRidotto.matches ? 'auto' : 'smooth'
      });
    }

    if (schede.length > 1) {
      precedente.hidden = false;
      successivo.hidden = false;

      precedente.addEventListener('click', () => vaiA(indiceCorrente() - 1));
      successivo.addEventListener('click', () => vaiA(indiceCorrente() + 1));

      let inAttesa = false;
      lista.addEventListener('scroll', () => {
        if (!inAttesa) {
          inAttesa = true;
          requestAnimationFrame(() => {
            aggiornaFrecce();
            inAttesa = false;
          });
        }
      }, { passive: true });

      window.addEventListener('resize', aggiornaFrecce);
      aggiornaFrecce();
    }
  }
}
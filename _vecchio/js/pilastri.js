{
  const lista = document.querySelector('.pilastri');
  const movimentoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (lista && !movimentoRidotto.matches) {
    const pilastri = Array.from(lista.querySelectorAll('.pilastro'));
    let inAttesa = false;

    function aggiorna() {
      const soglia = window.innerHeight * 0.6;
      const inizi = pilastri.map((pilastro) => pilastro.getBoundingClientRect().top);
      let attivo = null;

      pilastri.forEach((pilastro, indice) => {
        if (inizi[indice] < soglia) {
          attivo = pilastro;
        }

        if (indice < pilastri.length - 1) {
          const tratto = inizi[indice + 1] - inizi[indice];
          const percorso = (soglia - inizi[indice]) / tratto;
          const avanzamento = Math.min(Math.max(percorso, 0), 1);
          pilastro.style.setProperty('--avanzamento', avanzamento);
        }
      });

      pilastri.forEach((pilastro) => {
        pilastro.classList.toggle('pilastro--attivo', pilastro === attivo);
      });

      inAttesa = false;
    }

    function richiediAggiornamento() {
      if (!inAttesa) {
        inAttesa = true;
        requestAnimationFrame(aggiorna);
      }
    }

    lista.classList.add('pilastri--animati');
    aggiorna();

    window.addEventListener('scroll', richiediAggiornamento, { passive: true });
    window.addEventListener('resize', richiediAggiornamento);
  }
}
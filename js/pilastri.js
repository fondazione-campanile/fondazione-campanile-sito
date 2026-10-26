const lista = document.querySelector('.pilastri');
const movimentoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)');

if (lista && !movimentoRidotto.matches) {
  const pilastri = Array.from(lista.querySelectorAll('.pilastro'));
  let inAttesa = false;

  function aggiornaAttivo() {
    const soglia = window.innerHeight * 0.6;
    let attivo = null;

    pilastri.forEach((pilastro) => {
      if (pilastro.getBoundingClientRect().top < soglia) {
        attivo = pilastro;
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
      requestAnimationFrame(aggiornaAttivo);
    }
  }

  lista.classList.add('pilastri--animati');
  aggiornaAttivo();

  window.addEventListener('scroll', richiediAggiornamento, { passive: true });
  window.addEventListener('resize', richiediAggiornamento);
}
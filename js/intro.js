{
  const radice = document.documentElement;
  const intro = document.querySelector('.intro');

  if (intro && radice.classList.contains('intro-attiva')) {
    function salta() {
      intro.classList.add('intro--salto');
    }

    function termina(evento) {
      const nomi = ['intro-uscita', 'intro-salto'];
      if (evento.target !== intro || !nomi.includes(evento.animationName)) {
        return;
      }

      radice.classList.remove('intro-attiva');
      intro.remove();
      document.removeEventListener('keydown', salta);
      document.dispatchEvent(new Event('intro-finita'));
    }

    intro.addEventListener('animationend', termina);
    intro.addEventListener('click', salta);
    document.addEventListener('keydown', salta);
  }
}
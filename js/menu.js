{
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('menu-principale');
const contenuti = document.querySelectorAll('main, footer');
const desktop = window.matchMedia('(min-width: 64rem)');

function impostaMenu(aperto) {
  toggle.setAttribute('aria-expanded', String(aperto));
  contenuti.forEach((elemento) => {
    elemento.inert = aperto;
  });
}

function menuAperto() {
  return toggle.getAttribute('aria-expanded') === 'true';
}

toggle.addEventListener('click', () => {
  impostaMenu(!menuAperto());
});

nav.addEventListener('click', (evento) => {
  if (evento.target.closest('a')) {
    impostaMenu(false);
  }
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && menuAperto()) {
    impostaMenu(false);
    toggle.focus();
  }
});

document.addEventListener('click', (evento) => {
  if (menuAperto() && !nav.contains(evento.target) && !toggle.contains(evento.target)) {
    impostaMenu(false);
  }
});

desktop.addEventListener('change', (evento) => {
  if (evento.matches) {
    impostaMenu(false);
  }
});
}
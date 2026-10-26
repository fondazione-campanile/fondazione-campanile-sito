{
  const dialogo = document.getElementById('zoom');

  if (dialogo) {
    const immagine = dialogo.querySelector('.zoom__img');
    const didascalia = dialogo.querySelector('.zoom__didascalia');

    document.querySelectorAll('[data-zoom]').forEach((pulsante) => {
      pulsante.addEventListener('click', () => {
        const origine = pulsante.querySelector('img');
        immagine.src = origine.src;
        didascalia.textContent = pulsante.dataset.didascalia;
        dialogo.showModal();
      });
    });

    dialogo.addEventListener('click', (evento) => {
      if (evento.target === dialogo) {
        dialogo.close();
      }
    });
  }
}
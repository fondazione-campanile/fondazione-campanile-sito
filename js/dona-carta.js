{
  const contenitore = document.querySelector('.dona-carta');
  const pulsante = document.querySelector('.dona-carta__vai');

  if (contenitore && pulsante) {
    const linkLibero = contenitore.dataset.linkLibero;
    const altro = contenitore.querySelector('.pillola--altro');
    const inputAltro = altro.querySelector('.pillola__input');
    const importoIniziale = contenitore.querySelector('input[name="importo"][checked]');

    contenitore.hidden = false;

    const aggiorna = () => {
      const mensile = contenitore.querySelector('input[name="frequenza"]:checked').value === 'mensile';

      altro.hidden = mensile;
      if (mensile && inputAltro.checked) {
        importoIniziale.checked = true;
      }

      const scelta = contenitore.querySelector('input[name="importo"]:checked');
      const importo = scelta.value;

      if (mensile) {
        pulsante.href = scelta.dataset.linkMensile;
        pulsante.textContent = `Dona ${importo} € al mese`;
      } else if (importo === 'altro') {
        pulsante.href = linkLibero;
        pulsante.textContent = 'Dona con carta';
      } else {
        const indirizzo = new URL(linkLibero);
        indirizzo.searchParams.set('prefilled_amount', importo * 100);
        pulsante.href = indirizzo.toString();
        pulsante.textContent = `Dona ${importo} € con carta`;
      }
    };

    contenitore.addEventListener('change', aggiorna);
    aggiorna();
  }
}
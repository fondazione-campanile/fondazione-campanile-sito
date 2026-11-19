{
const sezione = document.querySelector('.impegni');

if (sezione) {
  const schede = Array.from(sezione.querySelectorAll('[role="tab"]'));
  const pannelli = sezione.querySelectorAll('[role="tabpanel"]');
  const parti = sezione.querySelectorAll('.logo__parte');

  function selezionaArea(area, spostaFocus = false) {
    schede.forEach((scheda) => {
      const attiva = scheda.dataset.area === area;
      scheda.setAttribute('aria-selected', String(attiva));
      scheda.tabIndex = attiva ? 0 : -1;
      if (attiva && spostaFocus) {
        scheda.focus();
      }
    });

    pannelli.forEach((pannello) => {
      pannello.hidden = pannello.id !== `pannello-${area}`;
    });

    parti.forEach((parte) => {
      parte.classList.toggle('logo__parte--attiva', parte.dataset.area === area);
    });

  }

  sezione.classList.add('impegni--interattivo');

  const iniziale = schede.find((scheda) => scheda.getAttribute('aria-selected') === 'true');
  selezionaArea(iniziale ? iniziale.dataset.area : schede[0].dataset.area);

  schede.forEach((scheda) => {
    scheda.addEventListener('click', () => {
      selezionaArea(scheda.dataset.area);
    });
  });

  parti.forEach((parte) => {
    parte.addEventListener('click', () => {
      selezionaArea(parte.dataset.area);
    });
  });

  sezione.querySelector('[role="tablist"]').addEventListener('keydown', (evento) => {
    const corrente = schede.indexOf(document.activeElement);
    if (corrente === -1) return;

    let nuovo;
    if (evento.key === 'ArrowRight') {
      nuovo = (corrente + 1) % schede.length;
    } else if (evento.key === 'ArrowLeft') {
      nuovo = (corrente - 1 + schede.length) % schede.length;
    } else if (evento.key === 'Home') {
      nuovo = 0;
    } else if (evento.key === 'End') {
      nuovo = schede.length - 1;
    } else {
      return;
    }

    evento.preventDefault();
    selezionaArea(schede[nuovo].dataset.area, true);
  });
}
}
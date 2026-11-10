{
  const avviso = document.getElementById('avviso-copia');

  document.querySelectorAll('[data-copia]').forEach((pulsante) => {
    const etichetta = pulsante.textContent;
    pulsante.hidden = false;

    pulsante.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pulsante.dataset.copia);
        pulsante.textContent = 'Copiato!';
        if (avviso) avviso.textContent = `${etichetta.replace('Copia ', '')} copiato negli appunti.`;
      } catch {
        pulsante.textContent = 'Copia non riuscita';
      }

      setTimeout(() => {
        pulsante.textContent = etichetta;
      }, 2000);
    });
  });
}
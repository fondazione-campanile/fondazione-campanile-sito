'use client';

import { useEffect, useState } from 'react';

// Da sostituire con i link Stripe (di test, poi definitivi)
const LINK_LIBERO = 'https://buy.stripe.com/LINK-LIBERO';
const IMPORTI = [
  { valore: '10', linkMensile: 'https://buy.stripe.com/LINK-MENSILE-10' },
  { valore: '25', linkMensile: 'https://buy.stripe.com/LINK-MENSILE-25' },
  { valore: '50', linkMensile: 'https://buy.stripe.com/LINK-MENSILE-50' },
];
const IMPORTO_INIZIALE = '25';

export default function DonaCarta() {
  const [pronto, setPronto] = useState(false);
  const [mensile, setMensile] = useState(false);
  const [importo, setImporto] = useState(IMPORTO_INIZIALE);

  useEffect(() => {
    setPronto(true);
  }, []);

  const scegliFrequenza = (ogniMese) => {
    setMensile(ogniMese);
    if (ogniMese && importo === 'altro') {
      setImporto(IMPORTO_INIZIALE);
    }
  };

  // Indirizzo e testo del pulsante, ricavati dallo stato
  let indirizzo = LINK_LIBERO;
  let testo = 'Dona con carta';

  if (pronto) {
    if (mensile) {
      indirizzo = IMPORTI.find((voce) => voce.valore === importo).linkMensile;
      testo = `Dona ${importo} € al mese`;
    } else if (importo !== 'altro') {
      const url = new URL(LINK_LIBERO);
      url.searchParams.set('prefilled_amount', Number(importo) * 100);
      indirizzo = url.toString();
      testo = `Dona ${importo} € con carta`;
    }
  }

  return (
    <>
      <div className="dona-carta" hidden={!pronto}>
        <fieldset className="dona-carta__gruppo">
          <legend className="dona-carta__legenda">Frequenza</legend>
          <label className="pillola">
            <input className="pillola__input" type="radio" name="frequenza" checked={!mensile} onChange={() => scegliFrequenza(false)} /> Una volta
          </label>
          <label className="pillola">
            <input className="pillola__input" type="radio" name="frequenza" checked={mensile} onChange={() => scegliFrequenza(true)} /> Ogni mese
          </label>
        </fieldset>

        <fieldset className="dona-carta__gruppo">
          <legend className="dona-carta__legenda">Importo</legend>
          {IMPORTI.map((voce) => (
            <label className="pillola" key={voce.valore}>
              <input className="pillola__input" type="radio" name="importo" checked={importo === voce.valore} onChange={() => setImporto(voce.valore)} /> {voce.valore} €
            </label>
          ))}
          <label className="pillola pillola--altro" hidden={mensile}>
            <input className="pillola__input" type="radio" name="importo" checked={importo === 'altro'} onChange={() => setImporto('altro')} /> Altro
          </label>
        </fieldset>
      </div>

      <a className="metodo__pulsante dona-carta__vai" href={indirizzo}>{testo}</a>
    </>
  );
}
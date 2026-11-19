'use client';

import { useState } from 'react';

const IMPORTI = ['10', '25', '50'];
const MINIMO = 5;

export default function DonaCarta() {
  const [mensile, setMensile] = useState(false);
  const [importo, setImporto] = useState('25');
  const [altro, setAltro] = useState('');
  const [inCorso, setInCorso] = useState(false);
  const [errore, setErrore] = useState('');

  const euro = Number(importo === 'altro' ? altro : importo);
  const valido = Number.isInteger(euro) && euro >= MINIMO;

  const dona = async () => {
    if (!valido) {
      setErrore(`Inserisci un importo intero di almeno ${MINIMO} €.`);
      return;
    }

    setErrore('');
    setInCorso(true);

    try {
      const risposta = await fetch('/api/donazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ importo: euro, mensile }),
      });
      const dati = await risposta.json();
      if (!risposta.ok) throw new Error(dati.errore);
      window.location.href = dati.url;
    } catch {
      setErrore('Non è stato possibile avviare il pagamento. Riprova tra poco.');
      setInCorso(false);
    }
  };

  let testo = 'Dona con carta';
  if (inCorso) {
    testo = 'Attendere…';
  } else if (valido) {
    testo = mensile ? `Dona ${euro} € al mese` : `Dona ${euro} € con carta`;
  }

  return (
    <>
      <div className="dona-carta">
        <fieldset className="dona-carta__gruppo">
          <legend className="dona-carta__legenda">Frequenza</legend>
          <label className="pillola">
            <input className="pillola__input" type="radio" name="frequenza" checked={!mensile} onChange={() => setMensile(false)} /> Una volta
          </label>
          <label className="pillola">
            <input className="pillola__input" type="radio" name="frequenza" checked={mensile} onChange={() => setMensile(true)} /> Ogni mese
          </label>
        </fieldset>

        <fieldset className="dona-carta__gruppo">
          <legend className="dona-carta__legenda">Importo</legend>
          {IMPORTI.map((valore) => (
            <label className="pillola" key={valore}>
              <input className="pillola__input" type="radio" name="importo" checked={importo === valore} onChange={() => setImporto(valore)} /> {valore} €
            </label>
          ))}
          <label className="pillola">
            <input className="pillola__input" type="radio" name="importo" checked={importo === 'altro'} onChange={() => setImporto('altro')} /> Altro
          </label>
        </fieldset>

        {importo === 'altro' && (
          <p className="dona-carta__altro">
            <label htmlFor="importo-altro">Importo in euro</label>
            <input
              id="importo-altro"
              type="number"
              min={MINIMO}
              step="1"
              inputMode="numeric"
              value={altro}
              onChange={(evento) => setAltro(evento.target.value)}
            />
          </p>
        )}
      </div>

      <button className="metodo__pulsante dona-carta__vai" type="button" onClick={dona} disabled={inCorso}>
        {testo}
      </button>

      {errore && <p className="dona-carta__errore" role="alert">{errore}</p>}
    </>
  );
}
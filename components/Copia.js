'use client';

import { useEffect, useState } from 'react';

export default function Copia({ valore, etichetta }) {
  const [pronto, setPronto] = useState(false);
  const [testo, setTesto] = useState(etichetta);
  const [annuncio, setAnnuncio] = useState('');

  useEffect(() => {
    setPronto(true);
  }, []);

  const copia = async () => {
    try {
      await navigator.clipboard.writeText(valore);
      setTesto('Copiato!');
      setAnnuncio(`${etichetta.replace('Copia ', '')} copiato negli appunti.`);
    } catch {
      setTesto('Copia non riuscita');
    }
    setTimeout(() => setTesto(etichetta), 2000);
  };

  return (
    <>
      <button className="copia copia--chiaro" type="button" hidden={!pronto} onClick={copia}>
        {testo}
      </button>
      <span className="visually-hidden" aria-live="polite">{annuncio}</span>
    </>
  );
}
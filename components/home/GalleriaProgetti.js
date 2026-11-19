'use client';

import { useEffect, useRef, useState } from 'react';

export default function GalleriaProgetti({ progetti }) {
  const listaRef = useRef(null);
  const dialogoRef = useRef(null);
  const [pronta, setPronta] = useState(false);
  const [allInizio, setAllInizio] = useState(true);
  const [allaFine, setAllaFine] = useState(false);
  const [zoom, setZoom] = useState(null);

  // Frecce: abilitate o no a seconda della posizione dello scorrimento
  useEffect(() => {
    const lista = listaRef.current;
    let inAttesa = false;
    let frame;

    const aggiornaFrecce = () => {
      const fine = lista.scrollWidth - lista.clientWidth;
      setAllInizio(lista.scrollLeft <= 1);
      setAllaFine(lista.scrollLeft >= fine - 1);
      inAttesa = false;
    };

    const suScroll = () => {
      if (!inAttesa) {
        inAttesa = true;
        frame = requestAnimationFrame(aggiornaFrecce);
      }
    };

    setPronta(true);
    aggiornaFrecce();
    lista.addEventListener('scroll', suScroll, { passive: true });
    window.addEventListener('resize', aggiornaFrecce);

    return () => {
      cancelAnimationFrame(frame);
      lista.removeEventListener('scroll', suScroll);
      window.removeEventListener('resize', aggiornaFrecce);
    };
  }, []);

  // Zoom: quando scegli una foto, si apre la finestra
  useEffect(() => {
    if (zoom) {
      dialogoRef.current.showModal();
    }
  }, [zoom]);

  const vaiA = (direzione) => {
    const lista = listaRef.current;
    const schede = lista.querySelectorAll('.progetto');
    const passo = schede[1].offsetLeft - schede[0].offsetLeft;
    const corrente = Math.round(lista.scrollLeft / passo);
    const limitato = Math.max(0, Math.min(corrente + direzione, schede.length - 1));
    const ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    lista.scrollTo({
      left: schede[limitato].offsetLeft,
      behavior: ridotto ? 'auto' : 'smooth',
    });
  };

  const chiudiSeFuori = (evento) => {
    if (evento.target === evento.currentTarget) {
      dialogoRef.current.close();
    }
  };

  const frecceVisibili = pronta && progetti.length > 1;

  return (
    <div className="progetti__galleria" data-rivela>
      <div
        ref={listaRef}
        className="progetti__lista"
        id="progetti-lista"
        role="region"
        aria-label="Elenco dei progetti"
        tabIndex={0}
      >
        {progetti.map((progetto) => (
          <article className="progetto" aria-labelledby={`progetto-${progetto.id}-titolo`} key={progetto.id}>
            <div className="progetto__media">
              <button
                className="progetto__zoom"
                type="button"
                aria-label={`Ingrandisci la foto del progetto ${progetto.titolo}`}
                onClick={() => setZoom({ src: progetto.immagine, didascalia: progetto.titolo })}
              >
                <img className="progetto__img" src={progetto.immagine} alt="" width="900" height="675" loading="lazy" />
              </button>
              <img
                className={progetto.logoQuadrato ? 'progetto__logo progetto__logo--quadrato' : 'progetto__logo'}
                src={progetto.logo}
                alt=""
                width={progetto.logoLarghezza}
                height={progetto.logoAltezza}
                loading="lazy"
              />
            </div>

            <div className="progetto__corpo">
              <ul className="progetto__etichette">
                <li className={`etichetta etichetta--${progetto.area}`}>{progetto.areaNome}</li>
                <li className="etichetta etichetta--stato">{progetto.stato}</li>
              </ul>
              <h3 id={`progetto-${progetto.id}-titolo`} className="progetto__titolo">{progetto.titolo}</h3>
              <p className="progetto__testo">{progetto.testo}</p>
              <a className="progetto__link" href={progetto.link} target="_blank" rel="noopener">
                {progetto.linkTesto}<span className="visually-hidden"> (si apre in una nuova scheda)</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <button
        className="progetti__freccia progetti__freccia--precedente"
        type="button"
        aria-label="Progetto precedente"
        aria-controls="progetti-lista"
        hidden={!frecceVisibili}
        disabled={allInizio}
        onClick={() => vaiA(-1)}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        className="progetti__freccia progetti__freccia--successiva"
        type="button"
        aria-label="Progetto successivo"
        aria-controls="progetti-lista"
        hidden={!frecceVisibili}
        disabled={allaFine}
        onClick={() => vaiA(1)}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <dialog
        ref={dialogoRef}
        className="zoom"
        id="zoom"
        aria-labelledby="zoom-didascalia"
        onClick={chiudiSeFuori}
        onClose={() => setZoom(null)}
      >
        <form className="zoom__barra" method="dialog">
          <button className="zoom__chiudi" type="submit" aria-label="Chiudi">
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </form>
        <figure className="zoom__figura">
          {zoom && <img className="zoom__img" src={zoom.src} alt="" />}
          <figcaption className="zoom__didascalia" id="zoom-didascalia">{zoom?.didascalia}</figcaption>
        </figure>
      </dialog>
    </div>
  );
}
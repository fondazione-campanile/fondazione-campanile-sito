'use client';

import { useEffect, useRef, useState } from 'react';
import Scrittura from '@/components/Scrittura';

const aree = [
  {
    id: 'cura',
    nome: 'Cura',
    immagine: '/assets/photo/impegni-casa.jpg',
    testo: (
      <>
        <strong>Al centro vi è la persona</strong>: è da lì che parte ogni cosa che facciamo. Ci prendiamo cura di bambini e ragazzi, adulti e anziani in condizione di fragilità, con un'assistenza che unisce aspetti sanitari, sociali, psicologici ed educativi. Per i più giovani significa accompagnarne la crescita; per tutti, ricevere un'attenzione costruita sulla propria storia.
      </>
    ),
  },
  {
    id: 'lavoro',
    nome: 'Lavoro',
    immagine: '/assets/photo/impegni-lavoro.jpg',
    testo: (
      <>
        <strong>Una porta è un passaggio dall’attesa alla possibilità</strong>. Attraverso formazione professionale, laboratori artigianali, tirocini e collaborazioni con cooperative e imprese sociali, accompagniamo giovani con disabilità o in condizione di svantaggio verso un’occupazione stabile: un lavoro vero, che porti autonomia economica, un ruolo riconosciuto e la possibilità di partecipare pienamente alla vita della comunità.
      </>
    ),
  },
  {
    id: 'luoghi',
    nome: 'Luoghi',
    immagine: '/assets/photo/impegni-luoghi.jpg',
    testo: (
      <>
        <strong>Un tetto non protegge solo chi ci vive</strong>: accoglie chi entra, chi si ferma, chi passa. Diamo vita a luoghi aperti alla comunità, come gallerie d’arte, botteghe, spazi di cultura e ristorazione, in cui le persone fragili non sono ospiti, ma protagoniste. Spazi dove lavorare, creare e incontrarsi, e dove l'inclusione diventa un'esperienza quotidiana.
      </>
    ),
  },
];

export default function Impegni() {
  const [area, setArea] = useState('cura');
  const [interattivo, setInterattivo] = useState(false);
  const schedeRef = useRef([]);

  useEffect(() => {
    setInterattivo(true);
  }, []);

  const classeParte = (nome, idArea) =>
    `logo__parte logo__${nome}${interattivo && area === idArea ? ' logo__parte--attiva' : ''}`;

  const gestisciTasti = (evento) => {
    const corrente = aree.findIndex((voce) => voce.id === area);
    let nuovo;

    if (evento.key === 'ArrowRight') {
      nuovo = (corrente + 1) % aree.length;
    } else if (evento.key === 'ArrowLeft') {
      nuovo = (corrente - 1 + aree.length) % aree.length;
    } else if (evento.key === 'Home') {
      nuovo = 0;
    } else if (evento.key === 'End') {
      nuovo = aree.length - 1;
    } else {
      return;
    }

    evento.preventDefault();
    setArea(aree[nuovo].id);
    schedeRef.current[nuovo].focus();
  };

  return (
    <section
      id="impegni"
      className={interattivo ? 'section section--avorio impegni impegni--interattivo' : 'section section--avorio impegni'}
      aria-labelledby="impegni-titolo"
    >
      <Scrittura id="impegni-titolo" className="section__title">Impegni</Scrittura>

      <div className="impegni__layout">
        <div className="impegni__colonna">
          <p className="fascia fascia--sospesa fascia--blu">Prendersi cura, aprire porte, costruire luoghi</p>

          <div className="impegni__grafica" data-rivela>
            <svg className="impegni__logo" viewBox="165 -5 510 492" aria-hidden="true">
              <path
                className={classeParte('porta', 'lavoro')}
                onClick={() => setArea('lavoro')}
                fill="#1f3a5f"
                d="M551.4,481.17c-.66-52.11-.17-120.27-.08-172.09-.35-2.77-.69-5.61-1-8.46-8.8-74.07-76.51-125.17-150-114.18-54.7,8.21-106.9,54.21-111.15,122.69.08,49.95-.09,164.39-.09,172h.27L289,482l238.47-.91c1,0,2,0,3,.08Z"
              />

              <g className={classeParte('persona', 'cura')} onClick={() => setArea('cura')} fill="#f7f4ee">
                <path d="M490.19,482H349.81c0-13.67.86-27.42,1.090-41.15A70.85,70.85,0,0,1,361.32,405a70.21,70.21,0,0,1,10.24-12.92,68.690,68.690,0,0,1,97.14.23,70.68,70.68,0,0,1,10.13,12.92,74.79,74.79,0,0,1,4.57,8.86c.43,1,.84,2.08,1.24,3.11a70,70,0,0,1,2.85,9.78,70.78,70.78,0,0,1,1.61,13.84C489.33,454.55,490.19,468.42,490.19,482Z" />
                <path d="M464.9,309.82a45.23,45.23,0,0,1-44.74,45,43.91,43.91,0,0,1-15.45-2.73c-1.36-.52-2.68-1.07-4-1.7a45.56,45.56,0,0,1-25.64-40.22,43,43,0,0,1,.92-9.27,43.53,43.53,0,0,1,8-17.58c.4-.57.86-1.15,1.32-1.7a40.84,40.84,0,0,1,2.91-3.13,45.25,45.25,0,0,1,63.5-.12c.52.52,1,1,1.5,1.56s.95,1.06,1.41,1.61a44.13,44.13,0,0,1,8.23,15c.2.69.4,1.38.6,2.1a44.42,44.42,0,0,1,1.38,8.83C464.87,308.3,464.9,309,464.9,309.82Z" />
              </g>

              <path
                className={classeParte('tetto', 'luoghi')}
                onClick={() => setArea('luoghi')}
                fill="#c0643a"
                d="M670.2,229c-.78,9.7-4.87,17.23-13.42,21s-16.71,2.17-23.880-4.36c-27.640-25.13-55.42-50.11-83.090-75.21C510.08,134.4,470.14,98.59,430.9,62c-8.72-8.13-13.6-7.31-21.93.36-60.63,55.76-121.74,111-182.73,166.4-7.09,6.43-14,13.11-21.64,18.88-8.72,6.59-18,6-26.25-1.17-8-7-10.37-15.85-5.88-25.9,2.39-5.36,6.49-9.35,10.79-13.25Q290.18,110.270,397,13.1C415.77-4,424.25-4.12,442.58,12.52Q550,110.09,657.42,207.69C664,213.67,669.21,220.21,670.2,229Z"
              />
            </svg>

            <div className="impegni__schede" role="tablist" aria-label="Aree di impegno" onKeyDown={gestisciTasti}>
              {aree.map((voce, indice) => (
                <button
                  key={voce.id}
                  ref={(elemento) => { schedeRef.current[indice] = elemento; }}
                  className="impegni__scheda"
                  id={`scheda-${voce.id}`}
                  type="button"
                  role="tab"
                  aria-selected={area === voce.id}
                  aria-controls={`pannello-${voce.id}`}
                  tabIndex={area === voce.id ? 0 : -1}
                  onClick={() => setArea(voce.id)}
                >
                  {voce.nome}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="impegni__pannelli" data-rivela style={{ '--ritardo': '0.2s' }}>
          {aree.map((voce) => (
            <div
              key={voce.id}
              className="impegni__pannello"
              id={`pannello-${voce.id}`}
              role="tabpanel"
              aria-labelledby={`scheda-${voce.id}`}
              tabIndex={0}
              hidden={interattivo && area !== voce.id}
            >
              <h3 className="impegni__nome">{voce.nome}</h3>
              <p className="impegni__testo">{voce.testo}</p>
              <img className="impegni__img" src={voce.immagine} alt="" width="1200" height="750" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
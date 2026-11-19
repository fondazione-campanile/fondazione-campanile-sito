'use client';

import { useEffect, useRef } from 'react';

export default function Pilastri({ pilastri }) {
  const listaRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lista = listaRef.current;
    const elementi = Array.from(lista.querySelectorAll('.pilastro'));
    let inAttesa = false;
    let frame;

    function aggiorna() {
      const soglia = window.innerHeight * 0.6;
      const inizi = elementi.map((pilastro) => pilastro.getBoundingClientRect().top);
      let attivo = null;

      elementi.forEach((pilastro, indice) => {
        if (inizi[indice] < soglia) {
          attivo = pilastro;
        }

        if (indice < elementi.length - 1) {
          const tratto = inizi[indice + 1] - inizi[indice];
          const percorso = (soglia - inizi[indice]) / tratto;
          const avanzamento = Math.min(Math.max(percorso, 0), 1);
          pilastro.style.setProperty('--avanzamento', avanzamento);
        }
      });

      elementi.forEach((pilastro) => {
        pilastro.classList.toggle('pilastro--attivo', pilastro === attivo);
      });

      inAttesa = false;
    }

    function richiediAggiornamento() {
      if (!inAttesa) {
        inAttesa = true;
        frame = requestAnimationFrame(aggiorna);
      }
    }

    lista.classList.add('pilastri--animati');
    aggiorna();

    window.addEventListener('scroll', richiediAggiornamento, { passive: true });
    window.addEventListener('resize', richiediAggiornamento);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', richiediAggiornamento);
      window.removeEventListener('resize', richiediAggiornamento);
    };
  }, []);

  return (
    <ul className="pilastri" ref={listaRef}>
      {pilastri.map((pilastro) => (
        <li className="pilastro" key={pilastro.nome}>
          <h3 className="pilastro__nome">{pilastro.nome}</h3>
          <p className="pilastro__testo">{pilastro.testo}</p>
          <img className="pilastro__img" src={pilastro.immagine} alt="" width="1200" height="675" loading="lazy" />
        </li>
      ))}
    </ul>
  );
}
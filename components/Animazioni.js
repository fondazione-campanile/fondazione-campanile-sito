'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Animazioni() {
  const percorso = usePathname();

  useEffect(() => {
    const radice = document.documentElement;
    if (!radice.classList.contains('animazioni')) return;

    // Comparse e titoli: osservati direttamente
    const osservatore = new IntersectionObserver((voci) => {
      voci.forEach((voce) => {
        if (voce.isIntersecting) {
          voce.target.classList.add('rivelato');
          osservatore.unobserve(voce.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    // Fasce: si osserva il contenitore, perché la fascia nascosta è fuori schermo
    const osservatoreFasce = new IntersectionObserver((voci) => {
      voci.forEach((voce) => {
        if (voce.isIntersecting) {
          voce.target.querySelectorAll(':scope > .fascia').forEach((fascia) => {
            fascia.classList.add('rivelato');
          });
          osservatoreFasce.unobserve(voce.target);
        }
      });
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0 });

    let frame;
    const avvia = () => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          document.querySelectorAll('[data-rivela], [data-scrittura]').forEach((elemento) => {
            osservatore.observe(elemento);
          });

          const contenitori = new Set(
            Array.from(document.querySelectorAll('.fascia'), (fascia) => fascia.parentElement)
          );
          contenitori.forEach((contenitore) => osservatoreFasce.observe(contenitore));
        });
      });
    };

    // Se c'è l'intro, si aspetta che finisca; altrimenti si parte subito
    if (radice.classList.contains('intro-attiva')) {
      document.addEventListener('intro-finita', avvia, { once: true });
    } else {
      avvia();
    }

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('intro-finita', avvia);
      osservatore.disconnect();
      osservatoreFasce.disconnect();
    };
  }, [percorso]);

  return null;
}
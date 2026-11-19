'use client';

import { useEffect, useRef } from 'react';

export default function Intro() {
  const introRef = useRef(null);

  useEffect(() => {
    const radice = document.documentElement;
    const intro = introRef.current;
    if (!radice.classList.contains('intro-attiva')) return;

    const salta = () => intro.classList.add('intro--salto');

    const termina = (evento) => {
      const nomi = ['intro-uscita', 'intro-salto'];
      if (evento.target !== intro || !nomi.includes(evento.animationName)) return;

      radice.classList.remove('intro-attiva');
      document.removeEventListener('keydown', salta);
      document.dispatchEvent(new Event('intro-finita'));
    };

    intro.addEventListener('animationend', termina);
    intro.addEventListener('click', salta);
    document.addEventListener('keydown', salta);

    return () => {
      intro.removeEventListener('animationend', termina);
      intro.removeEventListener('click', salta);
      document.removeEventListener('keydown', salta);
    };
  }, []);

  return (
    <div className="intro" aria-hidden="true" ref={introRef}>
      <img className="intro__logo intro__logo--wip" src="/assets/img/Logo-FonAntCamp-WIP-01.png" alt="" />
      <img className="intro__logo intro__logo--finale" src="/assets/img/Logo-FonAntCamp-Bianco-su-Nero.png" alt="" />
    </div>
  );
}
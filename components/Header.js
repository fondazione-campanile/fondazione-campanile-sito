'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [aperto, setAperto] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);

  // 2. main e footer inerti quando il menu è aperto
  useEffect(() => {
    document.querySelectorAll('main, footer').forEach((elemento) => {
      elemento.inert = aperto;
    });
  }, [aperto]);

  // 4 e 5. Esc e clic fuori, solo mentre il menu è aperto
  useEffect(() => {
    if (!aperto) return;

    const chiudiConEsc = (evento) => {
      if (evento.key === 'Escape') {
        setAperto(false);
        toggleRef.current.focus();
      }
    };

    const chiudiSeFuori = (evento) => {
      const dentro = navRef.current.contains(evento.target) || toggleRef.current.contains(evento.target);
      if (!dentro) {
        setAperto(false);
      }
    };

    document.addEventListener('keydown', chiudiConEsc);
    document.addEventListener('click', chiudiSeFuori);

    return () => {
      document.removeEventListener('keydown', chiudiConEsc);
      document.removeEventListener('click', chiudiSeFuori);
    };
  }, [aperto]);

  // 5. Passando a desktop il menu si chiude
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const chiudiSuDesktop = (evento) => {
      if (evento.matches) {
        setAperto(false);
      }
    };

    desktop.addEventListener('change', chiudiSuDesktop);
    return () => desktop.removeEventListener('change', chiudiSuDesktop);
  }, []);

  // 3. Un clic su una voce chiude il menu
  const chiudiSeLink = (evento) => {
    if (evento.target.closest('a')) {
      setAperto(false);
    }
  };

  return (
    <header className="header">
      <a className="header__brand" href="#top">
        <img
          className="header__logo"
          src="/assets/img/Logo-FonAntCamp-Esteso.png"
          alt="Fondazione Antonio Campanile"
          width="888"
          height="151"
        />
      </a>

      {/* 1. Il pulsante inverte lo stato */}
      <button
        ref={toggleRef}
        className="nav-toggle"
        type="button"
        aria-expanded={aperto}
        aria-controls="menu-principale"
        aria-label="Menu"
        onClick={() => setAperto(!aperto)}
      >
        <span className="nav-toggle__line"></span>
        <span className="nav-toggle__line"></span>
        <span className="nav-toggle__line"></span>
      </button>

      <nav ref={navRef} className="nav" id="menu-principale" aria-label="Menu principale" onClick={chiudiSeLink}>
        <ul className="nav__list">
          <li><a className="nav__link" href="#chi-siamo">Chi siamo</a></li>
          <li><a className="nav__link" href="#cosa-facciamo">Cosa facciamo</a></li>
          <li><a className="nav__link" href="#impegni">Impegni</a></li>
          <li><a className="nav__link" href="#progetti">Progetti</a></li>
          <li><Link className="nav__link" href="/carta-servizi">Carta dei Servizi</Link></li>
          <li><a className="nav__link nav__link--cta" href="#dona">Dona</a></li>
        </ul>
      </nav>
    </header>
  );
}
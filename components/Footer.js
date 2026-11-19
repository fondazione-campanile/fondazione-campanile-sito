import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" id="contatti">
      <div className="footer__contenuto">
        <Link className="footer__marchio" href="/#top">
          <img
            className="footer__logo"
            src="/assets/img/Logo-FonAntCamp-Esteso-b.png"
            alt="Fondazione Antonio Campanile, torna all’inizio della home"
            width="889"
            height="151"
            loading="lazy"
          />
        </Link>

        <address className="footer__dati">
          Fondazione Antonio Campanile ETS<br />
          Via Ragosia 1, 91019 Valderice (TP)<br />
          C.F. 02970910812
        </address>

        <div className="footer__registro">
          <p>Iscritta al RUNTS sez. g) – rep. n. 179329</p>
          <p>
            Un’iniziativa di{' '}
            <a href="https://www.auxiliumtrapani.it" target="_blank" rel="noopener">
              Fondazione Auxilium<span className="visually-hidden"> (si apre in una nuova scheda)</span>
            </a>
          </p>
          <p><a href="mailto:fondazionecampanile@gmail.com">fondazionecampanile@gmail.com</a></p>
        </div>
      </div>

      <div className="footer__fondo">
        <p>© 2026 Fondazione Antonio Campanile ETS</p>
        <Link href="/informativa-privacy">Informativa privacy</Link>
      </div>
    </footer>
  );
}
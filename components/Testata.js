import Link from 'next/link';

export default function Testata() {
  return (
    <header className="testata">
      <Link className="testata__marchio" href="/">
        <img
          className="testata__logo"
          src="/assets/img/Logo-FonAntCamp-Esteso.png"
          alt="Fondazione Antonio Campanile, vai alla home"
          width="888"
          height="151"
        />
      </Link>
    </header>
  );
}
import Link from 'next/link';
import Testata from '@/components/Testata';

export const metadata = {
  title: 'Grazie per la tua donazione – Fondazione Antonio Campanile',
  robots: { index: false },
};

export default function Grazie() {
  return (
    <>
      <Testata />
      <main className="informativa">
        <div className="informativa__contenuto">
          <p className="informativa__codice">Donazione ricevuta</p>
          <h1 className="section__title">Grazie!</h1>
          <p className="informativa__intro">La tua donazione è andata a buon fine. Riceverai una conferma via email.</p>
          <Link className="informativa__ritorno" href="/">Torna al sito</Link>
        </div>
      </main>
    </>
  );
}
import Link from 'next/link';
import Testata from '@/components/Testata';

export const metadata = {
  title: 'Pagina non trovata – Fondazione Antonio Campanile',
};

export default function NonTrovata() {
  return (
    <>
      <Testata />

      <main className="informativa">
        <div className="informativa__contenuto">
          <p className="informativa__codice">Errore 404</p>
          <h1 className="section__title">Pagina non trovata</h1>
          <p className="informativa__intro">L’indirizzo che hai aperto non esiste o è stato spostato.</p>
          <Link className="informativa__ritorno" href="/">Torna al sito</Link>
        </div>
      </main>
    </>
  );
}
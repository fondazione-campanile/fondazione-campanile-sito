import Link from 'next/link';
import Testata from '@/components/Testata';
import { condivisione } from '@/lib/condivisione';

const titolo = 'Carta dei Servizi – Fondazione Antonio Campanile';
const descrizione = 'Carta dei Servizi della Fondazione Antonio Campanile.';

export const metadata = {
  title: titolo,
  description: descrizione,
  robots: { index: false },
  alternates: { canonical: '/carta-servizi' },
  openGraph: { ...condivisione, title: titolo, description: descrizione, url: '/carta-servizi' },
};

export default function CartaServizi() {
  return (
    <>
      <Testata />

      <main className="informativa">
        <div className="informativa__contenuto">
          <p className="informativa__codice">In preparazione</p>
          <h1 className="section__title">Carta dei Servizi</h1>
          <p className="informativa__intro">Stiamo preparando la Carta dei Servizi della Fondazione, che sarà pubblicata a breve su questa pagina.</p>
          <p>
            Per informazioni sui nostri servizi puoi scrivere a{' '}
            <a href="mailto:fondazionecampanile@gmail.com">fondazionecampanile@gmail.com</a>.
          </p>

          <Link className="informativa__ritorno" href="/">Torna al sito</Link>
        </div>
      </main>
    </>
  );
}
import Link from 'next/link';
import Testata from '@/components/Testata';
import { condivisione } from '@/lib/condivisione';

const titolo = 'Informativa privacy – Fondazione Antonio Campanile';
const descrizione = 'Informativa sul trattamento dei dati personali della Fondazione Antonio Campanile.';

export const metadata = {
  title: titolo,
  description: descrizione,
  robots: { index: false },
  alternates: { canonical: '/informativa-privacy' },
  openGraph: { ...condivisione, title: titolo, description: descrizione, url: '/informativa-privacy' },
};

export default function InformativaPrivacy() {
  return (
    <>
      <Testata />

      <main className="informativa">
        <div className="informativa__contenuto">
          <p className="informativa__codice">In preparazione</p>
          <h1 className="section__title">Informativa privacy</h1>
          <p className="informativa__intro">Stiamo preparando l’informativa sul trattamento dei dati personali, che sarà pubblicata a breve su questa pagina.</p>
          <p>
            Il titolare del trattamento è la Fondazione Antonio Campanile ETS, Via Ragosia 1, 91019 Valderice (TP), C.F. 02970910812. Per qualsiasi richiesta relativa ai tuoi dati personali puoi scrivere a{' '}
            <a href="mailto:fondazionecampanile@gmail.com">fondazionecampanile@gmail.com</a>.
          </p>

          <Link className="informativa__ritorno" href="/">Torna al sito</Link>
        </div>
      </main>
    </>
  );
}
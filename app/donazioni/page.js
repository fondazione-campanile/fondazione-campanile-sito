import Link from 'next/link';
import Testata from '@/components/Testata';
import Copia from '@/components/Copia';
import DonaCarta from '@/components/DonaCarta';
import { condivisione } from '@/lib/condivisione';

const titolo = 'Fai una donazione – Fondazione Antonio Campanile ETS';
const descrizione = 'Sostieni la Fondazione Antonio Campanile ETS con una donazione con carta o bonifico, o destinando il tuo 5x1000.';

export const metadata = {
  title: titolo,
  description: descrizione,
  alternates: { canonical: '/donazioni' },
  openGraph: { ...condivisione, title: titolo, description: descrizione, url: '/donazioni' },
};

export default function Donazioni() {
  return (
    <>
      <Testata />

      <main className="informativa">
        <div className="informativa__contenuto informativa__contenuto--largo">
          <h1 className="section__title">Fai una donazione</h1>
          <p className="informativa__intro">Con una donazione sostieni i progetti della Fondazione per le persone con disabilità e in condizione di fragilità: occasioni di lavoro, di relazione e di autonomia, oggi e nel “dopo di noi”.</p>

          {/* Metodi di donazione */}
          <section aria-labelledby="metodi-titolo">
            <h2 id="metodi-titolo" className="informativa__sottotitolo">Come donare</h2>

            <div className="metodi">
              <article className="metodo metodo--carta" aria-labelledby="metodo-carta-titolo">
                <h3 id="metodo-carta-titolo" className="metodo__titolo">
                  <span className="icona icona--carta" aria-hidden="true"></span>Carta di credito
                </h3>
                <p>Dona online in modo sicuro: il pagamento avviene su Stripe e i dati della tua carta non passano dal nostro sito.</p>
                <DonaCarta />
              </article>

              <article className="metodo metodo--bonifico" aria-labelledby="metodo-bonifico-titolo">
                <h3 id="metodo-bonifico-titolo" className="metodo__titolo">
                  <span className="icona icona--bonifico" aria-hidden="true"></span>Bonifico bancario
                </h3>
                <dl className="metodo__dati">
                  <dt>Intestatario</dt>
                  <dd>FONDAZIONE ANTONIO CAMPANILE</dd>

                  <dt>Banca</dt>
                  <dd>BCC “G. Toniolo” e San Michele di San Cataldo (CL) Società Cooperativa</dd>

                  <dt>IBAN</dt>
                  <dd>
                    <span className="metodo__iban">IT79 I089 5216 4000 0000 0175 386</span>
                    <Copia valore="IT79I0895216400000000175386" etichetta="Copia IBAN" />
                  </dd>

                  <dt>Causale</dt>
                  <dd>Donazione liberale</dd>
                </dl>
              </article>
            </div>
          </section>

          {/* Ricevuta */}
          <section aria-labelledby="ricevuta-titolo">
            <h2 id="ricevuta-titolo" className="informativa__sottotitolo">Ricevuta fiscale</h2>
            <p>Per ogni donazione emettiamo una ricevuta fiscale, che ti inviamo via email.</p>
            <p>
              Se doni con bonifico, dopo il versamento scrivi a{' '}
              <a href="mailto:fondazionecampanile@gmail.com">fondazionecampanile@gmail.com</a> indicando:
            </p>
            <ul className="informativa__elenco">
              <li>nome e cognome;</li>
              <li>codice fiscale;</li>
              <li>indirizzo di residenza;</li>
              <li>indirizzo email a cui ricevere la ricevuta;</li>
              <li>data e importo del bonifico.</li>
            </ul>
          </section>

          {/* 5x1000 */}
          <section className="cinque" aria-labelledby="cinque-titolo">
            <h2 id="cinque-titolo" className="fascia fascia--sospesa">
              <span className="icona icona--cinque" aria-hidden="true"></span>Il tuo 5x1000
            </h2>
            <p>Destinare il 5x1000 non costa nulla. Nella dichiarazione dei redditi firma nel riquadro dedicato al sostegno degli enti del Terzo settore e scrivi il nostro codice fiscale:</p>
            <p className="cinque__codice">
              <span>02970910812</span>
              <Copia valore="02970910812" etichetta="Copia codice fiscale" />
            </p>
          </section>

          {/* Garanzie */}
          <section aria-labelledby="garanzie-titolo">
            <h2 id="garanzie-titolo" className="informativa__sottotitolo">Le nostre garanzie</h2>
            <ul className="informativa__elenco">
              <li><strong>Nessun utile distribuito.</strong> Gli avanzi di gestione restano nella fondazione e servono alle sue attività.</li>
              <li><strong>Una gestione controllata.</strong> Un revisore legale vigila sulla corretta amministrazione della fondazione.</li>
              <li><strong>Bilancio annuale.</strong> Ogni anno il Consiglio di amministrazione approva il bilancio della fondazione.</li>
            </ul>
          </section>

          <Link className="informativa__ritorno" href="/#dona">Torna al sito</Link>
        </div>
      </main>
    </>
  );
}
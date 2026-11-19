import Link from 'next/link';
import Scrittura from '@/components/Scrittura';

export default function Dona() {
  return (
    <section id="dona" className="section section--terracotta-scuro dona" aria-labelledby="dona-titolo">
      <Scrittura id="dona-titolo" className="section__title">Fai una donazione</Scrittura>

      <div className="dona__layout">
        <div className="dona__colonna">
          <p className="fascia fascia--sospesa fascia--avorio">Ogni gesto costruisce un futuro</p>

          <ul className="dona__garanzie" data-rivela>
            <li><strong>Nessun utile distribuito.</strong> Gli avanzi di gestione restano nella fondazione e servono alle sue attività.</li>
            <li><strong>Una gestione controllata.</strong> Un revisore legale vigila sulla corretta amministrazione della fondazione.</li>
            <li><strong>Bilancio annuale.</strong> Ogni anno il Consiglio di amministrazione approva il bilancio della fondazione.</li>
          </ul>
        </div>

        <div className="dona__scheda" data-rivela style={{ '--ritardo': '0.2s' }}>
          <p className="dona__frase">Con una donazione diventi parte di questo progetto: ci aiuti a dare a chi è più fragile una casa, un lavoro, una comunità.</p>
          <Link className="dona__pulsante" href="/donazioni">Dona ora</Link>
          <p className="dona__nota">Puoi donare con carta di credito o con bonifico bancario. Per ogni donazione ricevi una ricevuta fiscale via email.</p>
        </div>
      </div>
    </section>
  );
}
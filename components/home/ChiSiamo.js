import Scrittura from '@/components/Scrittura';

export default function ChiSiamo() {
  return (
    <section id="chi-siamo" className="section section--avorio chi-siamo" aria-labelledby="chi-siamo-titolo">
      <div className="chi-siamo__testo">
        <Scrittura id="chi-siamo-titolo" className="section__title">Chi siamo</Scrittura>
        <p data-rivela>
          La <strong>Fondazione Antonio Campanile ETS</strong> è un ente senza scopo di lucro nato nel 2026 a Valderice, in provincia di Trapani, per iniziativa della <strong>Fondazione Auxilium</strong>.
        </p>
        <p data-rivela style={{ '--ritardo': '0.15s' }}>
          Il nostro impegno è costruire strumenti concreti per le persone con disabilità e in condizione di fragilità, perché possano contare su più <strong>occasioni di lavoro, di socialità e di autonomia</strong>. Crediamo che ogni persona abbia capacità da valorizzare, e che queste trovino spazio quando esistono luoghi, attività e opportunità pensati per accoglierle. Per questo diamo vita a progetti stabili e sostenibili nel tempo, radicati nella comunità, capaci di offrire risposte alle persone e alle loro famiglie oggi e anche nel <strong>“dopo di noi”</strong>.
        </p>
      </div>

      <img
        className="chi-siamo__foto"
        data-rivela
        style={{ '--ritardo': '0.3s' }}
        src="/assets/photo/cuore.jpg"
        alt=""
        width="1200"
        height="1200"
        loading="lazy"
      />

      <p className="chi-siamo__motto" data-rivela>Radicati nel territorio, aperti a tutti</p>
    </section>
  );
}
import Scrittura from '@/components/Scrittura';

const pilastri = [
  {
    nome: 'Imprese sociali e inserimento lavorativo',
    testo: 'Il lavoro dà dignità, autonomia e un ruolo nella comunità. Promuoviamo imprese sociali in cui le persone con fragilità possono formarsi e lavorare, con compiti adatti alle capacità di ciascuno, dentro progetti pensati per durare nel tempo.',
    immagine: '/assets/photo/cosa-facciamo-1.jpg',
  },
  {
    nome: 'Servizi socio-ricreativi',
    testo: 'Organizziamo attività sportive, ludiche e laboratoriali per bambini, ragazzi e adulti con disabilità: occasioni per muoversi, creare e stringere amicizie. Le apriamo al territorio, perché l’inclusione si costruisce stando insieme.',
    immagine: '/assets/photo/cosa-facciamo-2.jpg',
  },
  {
    nome: 'Accompagnamento alle autonomie',
    testo: 'Percorsi per imparare a gestire la casa, il tempo, il denaro e la cura di sé, rispettando i tempi di ciascuno e insieme alle famiglie. È il nostro modo di preparare oggi il “dopo di noi”.',
    immagine: '/assets/photo/cosa-facciamo-3.jpg',
  },
];

export default function CosaFacciamo() {
  return (
    <section id="cosa-facciamo" className="section section--blu cosa-facciamo" aria-labelledby="cosa-facciamo-titolo">
      <Scrittura id="cosa-facciamo-titolo" className="section__title">Cosa facciamo</Scrittura>

      <div className="cosa-facciamo__corpo">
        <ul className="pilastri">
          {pilastri.map((pilastro) => (
            <li className="pilastro" key={pilastro.nome}>
              <h3 className="pilastro__nome">{pilastro.nome}</h3>
              <p className="pilastro__testo">{pilastro.testo}</p>
              <img className="pilastro__img" src={pilastro.immagine} alt="" width="1200" height="675" loading="lazy" />
            </li>
          ))}
        </ul>

        <p className="cosa-facciamo__descrizione" data-rivela>
          La Fondazione Antonio Campanile ETS costruisce strumenti concreti, come imprese sociali, servizi socio-ricreativi e percorsi di autonomia, perché le persone con disabilità e fragilità abbiano più occasioni di lavoro, relazione e partecipazione alla vita della comunità.
        </p>

        <div className="cosa-facciamo__motto">
          <p className="fascia fascia--sospesa fascia--motto">Dare casa alle capacità di ciascuno</p>
        </div>
      </div>
    </section>
  );
}
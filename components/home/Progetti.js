import Scrittura from '@/components/Scrittura';

const progetti = [
  {
    id: 'galleria',
    titolo: 'Galleria Betania',
    area: 'luoghi',
    areaNome: 'Luoghi',
    stato: 'In corso',
    testo: 'Galleria Betania dà spazio e voce ai giovani artisti della Fondazione Auxilium. Pittura su tela, sculture in plastilina e tecniche diverse raccontano talento, diversità e inclusione. Ogni anno una nuova mostra su un tema diverso, nel 2025 la libertà, visitabile su prenotazione.',
    immagine: '/assets/photo/luoghi-galleria-betania.jpg',
    logo: '/assets/img/galleria-betania-logo.png',
    logoLarghezza: 800,
    logoAltezza: 244,
    logoQuadrato: false,
    link: 'https://www.galleriabetania.it',
    linkTesto: 'Visita la galleria',
  },
  {
    id: 'beta-bar',
    titolo: 'Beta Bar',
    area: 'lavoro',
    areaNome: 'Lavoro',
    stato: 'Evento',
    testo: 'Il Beta Bar è un luogo dove le possibilità diventano concrete. I ragazzi acquisiscono autonomia inserendosi in un contesto lavorativo reale: preparano cocktail, servono ai tavoli, entrano in contatto con le persone e costruiscono una rete sociale con il territorio.',
    immagine: '/assets/photo/progetto-beta-bar.jpg',
    logo: '/assets/img/fondazione-auxilium-logo.png',
    logoLarghezza: 500,
    logoAltezza: 500,
    logoQuadrato: true,
    link: 'https://www.instagram.com/p/DXPAhaqDZqB/',
    linkTesto: 'Info sull’evento',
  },
];

export default function Progetti() {
  return (
    <section id="progetti" className="section section--blu progetti" aria-labelledby="progetti-titolo">
      <Scrittura id="progetti-titolo" className="section__title">Progetti</Scrittura>
      <p className="fascia">Ogni progetto è un passo concreto: ecco cosa stiamo costruendo</p>

      <div className="progetti__galleria" data-rivela>
        <div className="progetti__lista" id="progetti-lista" role="region" aria-label="Elenco dei progetti" tabIndex={0}>
          {progetti.map((progetto) => (
            <article className="progetto" aria-labelledby={`progetto-${progetto.id}-titolo`} key={progetto.id}>
              <div className="progetto__media">
                <button
                  className="progetto__zoom"
                  type="button"
                  data-zoom
                  data-didascalia={progetto.titolo}
                  aria-label={`Ingrandisci la foto del progetto ${progetto.titolo}`}
                >
                  <img className="progetto__img" src={progetto.immagine} alt="" width="900" height="675" loading="lazy" />
                </button>
                <img
                  className={progetto.logoQuadrato ? 'progetto__logo progetto__logo--quadrato' : 'progetto__logo'}
                  src={progetto.logo}
                  alt=""
                  width={progetto.logoLarghezza}
                  height={progetto.logoAltezza}
                  loading="lazy"
                />
              </div>

              <div className="progetto__corpo">
                <ul className="progetto__etichette">
                  <li className={`etichetta etichetta--${progetto.area}`}>{progetto.areaNome}</li>
                  <li className="etichetta etichetta--stato">{progetto.stato}</li>
                </ul>
                <h3 id={`progetto-${progetto.id}-titolo`} className="progetto__titolo">{progetto.titolo}</h3>
                <p className="progetto__testo">{progetto.testo}</p>
                <a className="progetto__link" href={progetto.link} target="_blank" rel="noopener">
                  {progetto.linkTesto}<span className="visually-hidden"> (si apre in una nuova scheda)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
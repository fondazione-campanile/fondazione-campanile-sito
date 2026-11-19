import Scrittura from '@/components/Scrittura';

export default function Hero() {
  return (
    <section className="hero">
      <img
        className="hero__img"
        src="/assets/photo/mani_unite.jpg"
        alt=""
        width="1000"
        height="992"
        fetchPriority="high"
      />
    <Scrittura as="h1" className="hero__title" style={{ '--velocita': '0.025s' }}>Il domani si prepara oggi.</Scrittura>
      <p className="hero__subtitle" data-rivela style={{ '--ritardo': '0.7s' }}>
        Dare casa alle capacità di ciascuno
      </p>
      <a
        className="hero__freccia"
        href="#chi-siamo"
        aria-label="Vai alla sezione Chi siamo"
        data-rivela
        style={{ '--ritardo': '1.2s' }}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
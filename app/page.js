import Header from '@/components/Header';
import Hero from '@/components/home/Hero';
import ChiSiamo from '@/components/home/ChiSiamo';
import CosaFacciamo from '@/components/home/CosaFacciamo';
import Progetti from '@/components/home/Progetti';
import Dona from '@/components/home/Dona';
import Intro from '@/components/home/Intro';
import Impegni from '@/components/home/Impegni';

export default function Home() {
  return (
    <>
     <Intro />
      <a className="salta" href="#top">Salta al contenuto</a>
      <Header />
      <main id="top" tabIndex={-1}>
        <Hero />
        <ChiSiamo />
        <CosaFacciamo />
        {<Impegni />}
        <Progetti />
        <Dona />
      </main>
    </>
  );
}
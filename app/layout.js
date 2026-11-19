import './common.css';
import './sito.css';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://www.fondazionecampanile.it'),
  title: 'Fondazione Antonio Campanile',
  description: "Fondazione senza scopo di lucro a Valderice (TP) per l'inclusione delle persone con disabilità e in condizione di fragilità.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Fondazione Antonio Campanile',
    title: 'Fondazione Antonio Campanile',
    description: "Fondazione senza scopo di lucro a Valderice (TP) per l'inclusione delle persone con disabilità e in condizione di fragilità.",
    url: '/',
    locale: 'it_IT',
    images: [{ url: '/assets/photo/mani_unite.jpg', alt: 'Mani unite' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/assets/favicon/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon/favicon-fac.svg', type: 'image/svg+xml' },
    ],
    apple: '/assets/favicon/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#1F3A5F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
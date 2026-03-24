import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'the wu lab - Handcrafted Energy Jewelry',
  description: 'Discover handcrafted energy jewelry and BaZi analysis at the wu lab',
  openGraph: {
    title: 'the wu lab - Handcrafted Energy Jewelry',
    description: 'Discover handcrafted energy jewelry and BaZi analysis at the wu lab',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${montserrat.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover handcrafted energy jewelry and BaZi analysis at the wu lab" />
      </head>
      <body className={`${cormorantGaramond.variable} ${montserrat.variable} font-sans`}>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

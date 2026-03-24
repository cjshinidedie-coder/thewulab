import type { Metadata } from 'next';
import { Crimson_Pro, Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';
import './globals.css';

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-crimson',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
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
    <html lang="en" className={`${crimsonPro.variable} ${inter.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover handcrafted energy jewelry and BaZi analysis at the wu lab" />
      </head>
      <body className={`${crimsonPro.variable} ${inter.variable} font-sans`}>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

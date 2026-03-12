  import type { Metadata } from 'next';
  import Navbar from './components/Navbar';
  import { AppProvider } from './context/AppContext';
  import './globals.css';

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
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Discover handcrafted energy jewelry
  and BaZi analysis at the wu lab" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght
  @400;600;700&family=Montserrat:wght@300;400;600;700&family=Noto+Serif+SC:wght@
  400;600;700&family=Noto+Sans+SC:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <AppProvider>
            <Navbar />
            {children}
          </AppProvider>
        </body>
      </html>
    );
  }

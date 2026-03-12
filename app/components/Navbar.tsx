'use client';

  import { useState } from 'react';
  import Link from 'next/link';

  export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);
    const [language, setLanguage] = useState('en');

    const translations = {
      en: {
        shop: 'Shop',
        bazi: 'Bazi Calculator',
        meaning: 'Meaning',
        search: 'Search products...'
      },
      zh: {
        shop: '购物',
        bazi: '八字测算',
        meaning: '含义',
        search: '搜索商品...'
      }
    };

    const t = translations[language as keyof typeof translations];

    return (
      <>
        <style jsx>{`
          .announcement-bar {
            background-color: #8B3A3A;
            color: #FFFFFF;
            text-align: center;
            padding: 10px 20px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 1px;
          }

          header {
            background-color: #FFFFFF;
            border-bottom: 1px solid #E8E8E8;
            padding: 12px 40px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .header-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-family: 'Playfair Display', 'Noto Serif SC', serif;
            font-size: 28px;
            font-weight: 700;
            color: #333333;
            letter-spacing: 1.5px;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .logo:hover {
            color: #C41E3A;
          }

          nav {
            display: flex;
            gap: 50px;
            align-items: center;
            flex: 1;
            justify-content: center;
          }

          nav a {
            color: #333333;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            transition: color 0.3s ease;
            font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          }

          nav a:hover {
            color: #C41E3A;
          }

          .nav-icons {
            display: flex;
            gap: 25px;
            align-items: center;
          }

          .search-container {
            position: relative;
          }

          .search-trigger {
            background: none;
            border: none;
            color: #333333;
            font-size: 18px;
            cursor: pointer;
            transition: color 0.3s ease;
            padding: 0;
          }

          .search-trigger:hover {
            color: #C41E3A;
          }

          .search-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            width: 320px;
            background: #FFFFFF;
            border: 1px solid #E8E8E8;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            margin-top: 8px;
            z-index: 50;
            padding: 12px;
          }

          .search-dropdown input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #E8E8E8;
            border-radius: 4px;
            font-size: 14px;
            font-family: 'Montserrat', sans-serif;
            outline: none;
          }

          .search-dropdown input:focus {
            border-color: #C41E3A;
          }

          .lang-switcher {
            display: flex;
            gap: 8px;
            font-size: 12px;
            align-items: center;
          }

          .lang-btn {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-weight: 600;
            transition: color 0.3s ease;
            padding: 0;
            font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          }

          .lang-btn.active {
            color: #333333;
          }

          .lang-btn:hover {
            color: #C41E3A;
          }

          .lang-separator {
            color: #ccc;
          }

          .icon-btn {
            background: none;
            border: none;
            color: #333333;
            font-size: 18px;
            cursor: pointer;
            transition: color 0.3s ease;
            position: relative;
            padding: 0;
          }

          .icon-btn:hover {
            color: #C41E3A;
          }

          .cart-count {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #C41E3A;
            color: #FFFFFF;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
          }

          @media (max-width: 768px) {
            header {
              padding: 12px 20px;
            }

            .logo {
              font-size: 20px;
            }

            nav {
              gap: 20px;
              font-size: 11px;
            }

            .nav-icons {
              gap: 15px;
            }

            .search-dropdown {
              width: 250px;
            }
          }
        `}</style>

        <div className="announcement-bar">
          ✨ Free Worldwide Shipping on Orders Over $100 ✨
        </div>

        <header>
          <div className="header-container">
            <Link href="/" className="logo">
              the wu lab
            </Link>

            <nav>
              <a href="#shop">{t.shop}</a>
              <a href="#bazi">{t.bazi}</a>
              <a href="#meaning">{t.meaning}</a>
            </nav>

            <div className="nav-icons">
              <div className="search-container">
                <button
                  className="search-trigger"
                  onClick={() => setSearchOpen(!searchOpen)}
                  title="Search"
                >
                  🔍
                </button>
                {searchOpen && (
                  <div className="search-dropdown">
                    <input
                      type="text"
                      placeholder={t.search}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="lang-switcher">
                <button
                  className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <span className="lang-separator">|</span>
                <button
                  className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
                  onClick={() => setLanguage('zh')}
                >
                  中文
                </button>
              </div>

              <button className="icon-btn" title="Shopping Cart">
                🛒
                {cartCount > 0 && <span 
  className="cart-count">{cartCount}</span>}
              </button>

              <button className="icon-btn" title="Favorites">
                ♡
              </button>
            </div>
          </div>
        </header>
      </>
    );
  }

  ---
  第二步：更新 layout.tsx

  完整替换 app/layout.tsx：

  import type { Metadata } from 'next';
  import Navbar from './components/Navbar';
  import './globals.css';

  export const metadata: Metadata = {
    title: 'the wu lab - Handcrafted Energy Jewelry',
    description: 'Discover handcrafted energy jewelry and BaZi analysis at the
  wu lab',
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
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght
  @400;600;700&family=Montserrat:wght@300;400;600;700&family=Noto+Serif+SC:wght@
  400;600;700&family=Noto+Sans+SC:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    );
  }

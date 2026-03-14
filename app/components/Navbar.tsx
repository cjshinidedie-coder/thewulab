'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';
import CartDrawer from './CartDrawer';
import FavoritesDrawer from './FavoritesDrawer';

export default function Navbar() {
  const { language, setLanguage, cartCount, favorites } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  const translations = {
    en: {
      shop: 'Shop',
      bazi: 'Bazi Calculator',
      meaning: 'Meaning',
      search: 'Search products...',
      shopByElement: 'Shop by Element',
      shopByStyle: 'Shop by Style',
      metal: 'Metal',
      wood: 'Wood',
      water: 'Water',
      fire: 'Fire',
      earth: 'Earth',
      bracelets: 'Bracelets',
      handJewelry: 'Hand Jewelry',
      earrings: 'Earrings',
      necklaces: 'Necklaces',
    },
    zh: {
      shop: '购物',
      bazi: '八字测算',
      meaning: '含义',
      search: '搜索商品...',
      shopByElement: '按元素购物',
      shopByStyle: '按款式购物',
      metal: '金',
      wood: '木',
      water: '水',
      fire: '火',
      earth: '土',
      bracelets: '手串',
      handJewelry: '手饰',
      earrings: '耳饰',
      necklaces: '项链',
    },
  };

  const t = translations[language];

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

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: #333333;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: color 0.3s ease;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #C41E3A;
        }

        .mega-menu-wrapper {
          position: relative;
        }

        .mega-menu-trigger {
          color: #333333;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: color 0.3s ease;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
        }

        .mega-menu-trigger:hover {
          color: #C41E3A;
        }

        .mega-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          padding: 30px 40px;
          margin-top: 12px;
          z-index: 200;
          min-width: 600px;
          display: none;
        }

        .mega-menu-dropdown.active {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .mega-menu-column h3 {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 16px;
          letter-spacing: 0.05em;
        }

        .mega-menu-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mega-menu-column ul li {
          margin-bottom: 12px;
        }

        .mega-menu-column ul li a {
          color: #666666;
          text-decoration: none;
          font-size: 13px;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          transition: color 0.3s ease;
          text-transform: none;
          font-weight: 400;
        }

        .mega-menu-column ul li a:hover {
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
          display: none;
        }

        .search-dropdown.active {
          display: block;
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

          .mega-menu-dropdown {
            min-width: 400px;
            padding: 20px;
            grid-template-columns: 1fr;
            gap: 20px;
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
            <div className="mega-menu-wrapper">
              <button
                className="mega-menu-trigger"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                {t.shop}
              </button>
              <div
                className={`mega-menu-dropdown ${megaMenuOpen ? 'active' : ''}`}
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <div className="mega-menu-column">
                  <h3>{t.shopByElement}</h3>
                  <ul>
                    <li><a href="#">✨ {t.metal}</a></li>
                    <li><a href="#">🌿 {t.wood}</a></li>
                    <li><a href="#">💧 {t.water}</a></li>
                    <li><a href="#">🔥 {t.fire}</a></li>
                    <li><a href="#">🌍 {t.earth}</a></li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h3>{t.shopByStyle}</h3>
                  <ul>
                    <li><a href="#">{t.bracelets}</a></li>
                    <li><a href="#">{t.handJewelry}</a></li>
                    <li><a href="#">{t.earrings}</a></li>
                    <li><a href="#">{t.necklaces}</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <a href="#bazi" className="nav-link">{t.bazi}</a>
            <a href="#meaning" className="nav-link">{t.meaning}</a>
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
                <div className="search-dropdown active">
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

            <button
              className="icon-btn"
              title="Shopping Cart"
              onClick={() => setCartDrawerOpen(true)}
            >
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            <button
              className="icon-btn"
              title="Favorites"
              onClick={() => setFavoritesDrawerOpen(true)}
            >
              ♡
              {favorites.length > 0 && <span className="cart-count">{favorites.length}</span>}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <FavoritesDrawer isOpen={favoritesDrawerOpen} onClose={() => setFavoritesDrawerOpen(false)} />
    </>
  );
}
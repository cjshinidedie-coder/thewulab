'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';
import CartDrawer from './CartDrawer';
import FavoritesDrawer from './FavoritesDrawer';

export default function Navbar() {
  const { language, setLanguage, cartCount, favorites } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 商品数据库
  const products = [
    { id: '1', name: 'Cosmic Turquoise Bracelet', price: 226.00, image: '/product-1.png' },
    { id: '2', name: 'Imperial Jasper Bracelet', price: 183.00, image: '/product-2.png' },
    { id: '3', name: 'Santa Maria Aquamarine', price: 2524.00, image: '/product-3.png' },
    { id: '4', name: 'Labradorite Bracelet', price: 310.00, image: '/product-4.png' },
    { id: '5', name: 'Blue Aventurine Bracelet', price: 310.00, image: '/product-5.png' },
    { id: '6', name: 'Tiger Eye - Hematite Pair', price: 60.00, image: '/product-6.png' },
    { id: '7', name: 'Lava Bracelet', price: 310.00, image: '/product-7.png' },
    { id: '8', name: 'Dragon Blood Jasper', price: 297.00, image: '/product-8.png' }
  ];

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
      noResults: 'No products found',
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
      noResults: '未找到商品',
    },
  };

  const t = translations[language];

  // 处理搜索输入
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = value.toLowerCase();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  // 处理 Mega Menu 悬停（带延迟关闭）
  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setMegaMenuOpen(true);
  };

  // 处理搜索结果点击
  const handleSearchResultClick = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    return () => {
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current);
      }
    };
  }, []);

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
          font-family: var(--font-cormorant), 'Noto Serif SC', serif;
          font-size: 28px;
          font-weight: 400;
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
          height: 20px;
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
          font-family: var(--font-montserrat), 'Noto Sans SC', sans-serif;
          cursor: pointer;
          line-height: 1;
          display: flex;
          align-items: center;
        }

        .nav-link:hover {
          color: #C41E3A;
        }

        .mega-menu-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .mega-menu-trigger {
          color: #333333;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: color 0.3s ease;
          font-family: var(--font-montserrat), 'Noto Sans SC', sans-serif;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          line-height: 1;
          display: flex;
          align-items: center;
        }

        .mega-menu-trigger:hover {
          color: #C41E3A;
        }

        .mega-menu-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background-color: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          padding: 30px 40px;
          z-index: 200;
          min-width: 600px;
          display: none;
          pointer-events: none;
        }

        .mega-menu-dropdown.active {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          pointer-events: auto;
        }

        .mega-menu-column h3 {
          font-family: var(--font-cormorant), 'Noto Serif SC', serif;
          font-size: 16px;
          font-weight: 400;
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
          width: 380px;
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
          margin-bottom: 8px;
        }

        .search-dropdown input:focus {
          border-color: #C41E3A;
        }

        .search-results {
          max-height: 400px;
          overflow-y: auto;
        }

        .search-result-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          text-decoration: none;
          color: inherit;
        }

        .search-result-item:hover {
          background-color: #F5F5F5;
        }

        .search-result-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .search-result-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
        }

        .search-result-name {
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          line-height: 1.3;
        }

        .search-result-price {
          font-size: 12px;
          color: #C41E3A;
          font-weight: 600;
        }

        .search-no-results {
          padding: 20px 12px;
          text-align: center;
          color: #999999;
          font-size: 13px;
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
            width: 300px;
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
          <Link href="/" className="logo font-serif">
            the wu lab
          </Link>

          <nav>
            <div className="mega-menu-wrapper"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                className="mega-menu-trigger"
              >
                {t.shop}
              </button>
              <div
                className={`mega-menu-dropdown ${megaMenuOpen ? 'active' : ''}`}
              >
                <div className="mega-menu-column">
                  <h3>{t.shopByElement}</h3>
                  <ul>
                    <li><Link href="/elements/metal">{t.metal}</Link></li>
                    <li><Link href="/elements/wood">{t.wood}</Link></li>
                    <li><Link href="/elements/water">{t.water}</Link></li>
                    <li><Link href="/elements/fire">{t.fire}</Link></li>
                    <li><Link href="/elements/earth">{t.earth}</Link></li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h3>{t.shopByStyle}</h3>
                  <ul>
                    <li><Link href="/shop?category=bracelets">{t.bracelets}</Link></li>
                    <li><Link href="/shop?category=hand-jewelry">{t.handJewelry}</Link></li>
                    <li><Link href="/shop?category=earrings">{t.earrings}</Link></li>
                    <li><Link href="/shop?category=necklaces">{t.necklaces}</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href="/bazi" className="mega-menu-trigger" style={{ textDecoration: 'none' }}>{t.bazi}</Link>
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
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                  />
                  {searchQuery.trim() !== '' && (
                    <div className="search-results">
                      {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="search-result-item"
                            onClick={handleSearchResultClick}
                          >
                            <img src={product.image} alt={product.name} className="search-result-image" />
                            <div className="search-result-info">
                              <div className="search-result-name">{product.name}</div>
                              <div className="search-result-price">${product.price.toFixed(2)}</div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="search-no-results">{t.noResults}</div>
                      )}
                    </div>
                  )}
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
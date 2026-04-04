'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
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
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

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
      auraDesign: 'Aura Design',
      newArrivals: 'New Arrivals',
      signature: 'Signature',
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
      auraDesign: '气场定制',
      newArrivals: '新品上市',
      signature: '高定系列',
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

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (value.trim() === '') { setSearchResults([]); return; }
    const query = value.toLowerCase();
    setSearchResults(products.filter(p => p.name.toLowerCase().includes(query)));
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setMegaMenuOpen(false), 150);
  };
  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setMegaMenuOpen(true);
  };
  const handleSearchResultClick = () => {
    setSearchOpen(false); setSearchQuery(''); setSearchResults([]);
  };

  const handleLangSelect = (lang: 'en' | 'zh') => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  useEffect(() => {
    return () => { if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current); };
  }, []);

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  // Smart scroll header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Announcement bar */}
      <div className="sticky top-0 left-0 w-full z-[101] bg-[#8B3A3A] text-white text-center py-2.5 px-5 text-[13px] font-semibold tracking-wide">
        {language === 'en' ? '✨ Free Worldwide Shipping on Orders Over $100 ✨' : '✨ 满 $100 全球免运费 ✨'}
      </div>

      {/* Header wrapper */}
      <header className={`sticky top-0 left-0 w-full z-[100] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Top bar */}
        <div className="relative z-[50] flex items-center justify-between h-16 md:h-20 px-5 md:px-10 max-w-[1400px] mx-auto">
          {/* Left spacer — keeps logo centered */}
          <div className="w-28 md:w-40 shrink-0" />

          {/* Centered logo */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-2xl md:text-3xl font-light tracking-widest text-stone-800 hover:text-[#C41E3A] transition-colors duration-300 whitespace-nowrap"
          >
            THE WU LAB
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-5 md:gap-6 shrink-0">
            {/* Search */}
            <div className="relative flex items-center">
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-stone-700 hover:text-[#C41E3A] transition-colors text-lg" title="Search">
                🔍
              </button>
              {searchOpen && (
                <div className="absolute top-full right-0 w-[340px] md:w-[380px] bg-white border border-stone-200 rounded shadow-lg mt-2 z-[9999] p-3">
                  <input
                    type="text"
                    placeholder={t.search}
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded text-sm font-sans outline-none focus:border-[#C41E3A] mb-2"
                  />
                  {searchQuery.trim() !== '' && (
                    <div className="max-h-[400px] overflow-y-auto">
                      {searchResults.length > 0 ? searchResults.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} onClick={handleSearchResultClick}
                          className="flex gap-3 p-3 rounded hover:bg-stone-50 transition-colors no-underline text-inherit">
                          <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded shrink-0" />
                          <div className="flex flex-col justify-center gap-1">
                            <div className="text-[13px] font-semibold text-stone-800 leading-tight">{product.name}</div>
                            <div className="text-xs text-[#C41E3A] font-semibold">${product.price.toFixed(2)}</div>
                          </div>
                        </Link>
                      )) : (
                        <div className="py-5 text-center text-stone-400 text-[13px]">{t.noResults}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Globe language switcher */}
            <div className="relative flex items-center" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="text-stone-700 hover:text-[#C41E3A] transition-colors"
                title="Language"
              >
                <Globe className="w-5 h-5" />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-4 w-24 bg-white shadow-xl z-[100] rounded-sm border border-stone-100">
                  <button
                    onClick={() => handleLangSelect('en')}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] font-sans transition-colors ${language === 'en' ? 'text-[#C41E3A] font-semibold' : 'text-stone-600 hover:text-[#C41E3A] hover:bg-stone-50'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLangSelect('zh')}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] font-sans transition-colors ${language === 'zh' ? 'text-[#C41E3A] font-semibold' : 'text-stone-600 hover:text-[#C41E3A] hover:bg-stone-50'}`}
                  >
                    中文
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <button onClick={() => setCartDrawerOpen(true)} className="relative text-stone-700 hover:text-[#C41E3A] transition-colors text-lg" title="Cart">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C41E3A] text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-semibold">{cartCount}</span>
              )}
            </button>

            {/* Favorites */}
            <button onClick={() => setFavoritesDrawerOpen(true)} className="relative text-stone-700 hover:text-[#C41E3A] transition-colors text-lg" title="Favorites">
              ♡
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C41E3A] text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-semibold">{favorites.length}</span>
              )}
            </button>
          </div>
        </div>

        {/* Main nav links — always visible */}
        <div className="relative z-[50] flex justify-center items-center gap-8 md:gap-12 py-3.5 max-w-[1400px] mx-auto border-t border-stone-100/60">
          <div className="relative"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <Link href="/shop" className="text-[12px] md:text-[13px] font-normal tracking-[0.12em] uppercase text-stone-600 hover:text-[#C41E3A] transition-colors font-sans no-underline">
              {t.shop}
            </Link>
            {megaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-stone-200 rounded-lg shadow-xl p-8 z-[9999] min-w-[550px] grid grid-cols-2 gap-10">
                <div>
                  <h3 className="font-serif text-base font-light text-stone-700 mb-4 tracking-wide">{t.shopByElement}</h3>
                  <ul className="space-y-3">
                    <li><Link href="/elements/metal" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.metal}</Link></li>
                    <li><Link href="/elements/wood" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.wood}</Link></li>
                    <li><Link href="/elements/water" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.water}</Link></li>
                    <li><Link href="/elements/fire" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.fire}</Link></li>
                    <li><Link href="/elements/earth" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.earth}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-base font-light text-stone-700 mb-4 tracking-wide">{t.shopByStyle}</h3>
                  <ul className="space-y-3">
                    <li><Link href="/shop?category=bracelets" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.bracelets}</Link></li>
                    <li><Link href="/shop?category=hand-jewelry" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.handJewelry}</Link></li>
                    <li><Link href="/shop?category=earrings" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.earrings}</Link></li>
                    <li><Link href="/shop?category=necklaces" className="text-[13px] text-stone-500 hover:text-[#C41E3A] transition-colors font-light no-underline">{t.necklaces}</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link href="/bazi" className="text-[12px] md:text-[13px] font-normal tracking-[0.12em] uppercase text-stone-600 hover:text-[#C41E3A] transition-colors font-sans no-underline">
            {t.bazi}
          </Link>
          <Link href="/new-arrivals" className="text-[12px] md:text-[13px] font-normal tracking-[0.12em] uppercase text-stone-600 hover:text-[#C41E3A] transition-colors font-sans no-underline">
            {t.newArrivals}
          </Link>
          <Link href="/signature" className="text-[12px] md:text-[13px] font-normal tracking-[0.12em] uppercase text-stone-600 hover:text-[#C41E3A] transition-colors font-sans no-underline">
            {t.signature}
          </Link>
          <Link href="/diy" className="text-[12px] md:text-[13px] font-normal tracking-[0.12em] uppercase text-stone-600 hover:text-[#C41E3A] transition-colors font-sans no-underline">
            {t.auraDesign}
          </Link>
        </div>
      </header>

      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <FavoritesDrawer isOpen={favoritesDrawerOpen} onClose={() => setFavoritesDrawerOpen(false)} />
    </>
  );
}

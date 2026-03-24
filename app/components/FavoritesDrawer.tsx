'use client';

import { useApp } from '@/app/context/AppContext';
import Link from 'next/link';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesDrawer({ isOpen, onClose }: FavoritesDrawerProps) {
  const { language, favorites, toggleFavorite } = useApp();

  const translations = {
    en: {
      favorites: 'Favorites',
      empty: 'No favorites yet',
      startAdding: 'Start adding your favorite items',
      exploreBracelets: 'Explore Bracelets',
      addToCart: 'Add to Cart',
      remove: 'Remove',
    },
    zh: {
      favorites: '收藏夹',
      empty: '还没有收藏',
      startAdding: '开始添加您喜欢的商品',
      exploreBracelets: '浏览手链',
      addToCart: '加入购物车',
      remove: '移除',
    }
  };

  const t = translations[language];

  // 商品数据库
  const products: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Cosmic Turquoise Bracelet',
      element: '🌊 Water Element',
      price: 226.00,
      image: '/product-1.png'
    },
    '2': {
      id: '2',
      name: 'Imperial Jasper Bracelet',
      element: '✨ Metal Element',
      price: 183.00,
      image: '/product-2.png'
    },
    '3': {
      id: '3',
      name: 'Santa Maria Aquamarine',
      element: '🌊 Water Element',
      price: 2524.00,
      image: '/product-3.png'
    },
    '4': {
      id: '4',
      name: 'Labradorite Bracelet',
      element: '🌿 Wood Element',
      price: 310.00,
      image: '/product-4.png'
    },
    '5': {
      id: '5',
      name: 'Blue Aventurine Bracelet',
      element: '🌊 Water Element',
      price: 310.00,
      image: '/product-5.png'
    },
    '6': {
      id: '6',
      name: 'Tiger Eye - Hematite Pair',
      element: '🔥 Fire Element',
      price: 60.00,
      image: '/product-6.png'
    },
    '7': {
      id: '7',
      name: 'Lava Bracelet',
      element: '🔥 Fire Element',
      price: 310.00,
      image: '/product-7.png'
    },
    '8': {
      id: '8',
      name: 'Dragon Blood Jasper',
      element: '🌍 Earth Element',
      price: 297.00,
      image: '/product-8.png'
    }
  };

  const favoriteProducts = favorites.map(id => products[id]).filter(Boolean);

  return (
    <>
      <style jsx>{`
        .favorites-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .favorites-drawer-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .favorites-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 400px;
          height: 100vh;
          background-color: #FFFFFF;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }

        .favorites-drawer.active {
          transform: translateX(0);
        }

        .favorites-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #E8E8E8;
        }

        .favorites-title {
          font-family: var(--font-cormorant), 'Noto Serif SC', serif;
          font-size: 20px;
          font-weight: 400;
          color: #333333;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666666;
          transition: color 0.3s ease;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: #C41E3A;
        }

        .favorites-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }

        .favorites-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          gap: 20px;
        }

        .empty-icon {
          font-size: 48px;
          opacity: 0.5;
        }

        .empty-text {
          font-size: 16px;
          color: #666666;
          font-weight: 500;
        }

        .empty-subtext {
          font-size: 13px;
          color: #999999;
        }

        .explore-btn {
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: background-color 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .explore-btn:hover {
          background-color: #A01830;
        }

        .favorites-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .favorite-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          background-color: #F9F9F9;
          border-radius: 8px;
          align-items: flex-start;
        }

        .item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .item-image:hover {
          transform: scale(1.05);
        }

        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .item-name {
          font-size: 14px;
          font-weight: 600;
          color: #333333;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .item-name:hover {
          color: #C41E3A;
        }

        .item-element {
          font-size: 12px;
          color: #C41E3A;
          font-weight: 600;
        }

        .item-price {
          font-size: 13px;
          color: #333333;
          font-weight: 600;
        }

        .item-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          margin-top: 8px;
        }

        .add-to-cart-btn {
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: background-color 0.3s ease;
          width: 100%;
        }

        .add-to-cart-btn:hover {
          background-color: #A01830;
        }

        .remove-btn {
          background: none;
          border: 1px solid #E8E8E8;
          color: #666666;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          width: 100%;
        }

        .remove-btn:hover {
          border-color: #C41E3A;
          color: #C41E3A;
        }

        .favorites-footer {
          padding: 20px 24px;
          border-top: 1px solid #E8E8E8;
          text-align: center;
          font-size: 13px;
          color: #666666;
        }

        @media (max-width: 768px) {
          .favorites-drawer {
            width: 100%;
          }
        }
      `}</style>

      <div className={`favorites-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

      <div className={`favorites-drawer ${isOpen ? 'active' : ''}`}>
        <div className="favorites-header">
          <h2 className="favorites-title">{t.favorites}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="favorites-content">
          {favoriteProducts.length === 0 ? (
            <div className="favorites-empty">
              <div className="empty-icon">♡</div>
              <p className="empty-text">{t.empty}</p>
              <p className="empty-subtext">{t.startAdding}</p>
              <Link href="/" className="explore-btn" onClick={onClose}>
                {t.exploreBracelets}
              </Link>
            </div>
          ) : (
            <div className="favorites-list">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="favorite-item">
                  <Link href={`/product/${product.id}`} onClick={onClose}>
                    <img src={product.image} alt={product.name} className="item-image" />
                  </Link>
                  <div className="item-info">
                    <Link href={`/product/${product.id}`} onClick={onClose} style={{ textDecoration: 'none' }}>
                      <div className="item-name">{product.name}</div>
                    </Link>
                    <div className="item-element">{product.element}</div>
                    <div className="item-price">${product.price.toFixed(2)}</div>
                    <div className="item-actions">
                      <button className="add-to-cart-btn">{t.addToCart}</button>
                      <button
                        className="remove-btn"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {favoriteProducts.length > 0 && (
          <div className="favorites-footer">
            {favoriteProducts.length} {t.favorites}
          </div>
        )}
      </div>
    </>
  );
}

'use client';

import { useApp } from '@/app/context/AppContext';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { language, cartCount } = useApp();

  const translations = {
    en: {
      shoppingCart: 'Shopping Cart',
      empty: 'Your cart is empty',
      browseProducts: 'Browse Products',
      checkout: 'Proceed to Checkout',
      items: 'items',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
    },
    zh: {
      shoppingCart: '购物车',
      empty: '您的购物车是空的',
      browseProducts: '浏览商品',
      checkout: '前往结账',
      items: '件商品',
      subtotal: '小计',
      shipping: '运费',
      total: '总计',
    }
  };

  const t = translations[language];

  return (
    <>
      <style jsx>{`
        .cart-drawer-overlay {
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

        .cart-drawer-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .cart-drawer {
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

        .cart-drawer.active {
          transform: translateX(0);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #E8E8E8;
        }

        .cart-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 20px;
          font-weight: 700;
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

        .cart-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }

        .cart-empty {
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

        .browse-btn {
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

        .browse-btn:hover {
          background-color: #A01830;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item {
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
        }

        .item-price {
          font-size: 13px;
          color: #C41E3A;
          font-weight: 600;
        }

        .item-quantity {
          font-size: 12px;
          color: #666666;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #999999;
          cursor: pointer;
          font-size: 18px;
          padding: 0;
          transition: color 0.3s ease;
        }

        .remove-btn:hover {
          color: #C41E3A;
        }

        .cart-footer {
          padding: 20px 24px;
          border-top: 1px solid #E8E8E8;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cart-summary {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666666;
          margin-bottom: 8px;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 700;
          color: #333333;
          padding-top: 12px;
          border-top: 1px solid #E8E8E8;
          margin-bottom: 12px;
        }

        .checkout-btn {
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 14px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: background-color 0.3s ease;
          width: 100%;
        }

        .checkout-btn:hover {
          background-color: #A01830;
        }

        @media (max-width: 768px) {
          .cart-drawer {
            width: 100%;
          }
        }
      `}</style>

      <div className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

      <div className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">{t.shoppingCart}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {cartCount === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <p className="empty-text">{t.empty}</p>
              <Link href="/" className="browse-btn" onClick={onClose}>
                {t.browseProducts}
              </Link>
            </div>
          ) : (
            <div className="cart-items">
              <div className="cart-item">
                <img src="/product-1.png" alt="Product" className="item-image" />
                <div className="item-info">
                  <div className="item-name">Cosmic Turquoise Bracelet</div>
                  <div className="item-price">$226.00</div>
                  <div className="item-quantity">Qty: 1</div>
                </div>
                <button className="remove-btn">✕</button>
              </div>
            </div>
          )}
        </div>

        {cartCount > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <span>{cartCount} {t.items}</span>
              <span>$226.00</span>
            </div>
            <div className="cart-summary">
              <span>{t.shipping}</span>
              <span>$0.00</span>
            </div>
            <div className="cart-total">
              <span>{t.total}</span>
              <span>$226.00</span>
            </div>
            <Link href="/checkout" className="checkout-btn" onClick={onClose}>{t.checkout}</Link>
          </div>
        )}
      </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/app/context/AppContext';

export default function Checkout() {
  const router = useRouter();
  const { language, cartCount, clearCart } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  // 多语言翻译
  const translations = {
    en: {
      checkout: 'Checkout',
      shippingAddress: 'Shipping Address',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      country: 'Country',
      address: 'Address',
      paymentMethod: 'Payment Method',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date (MM/YY)',
      cvc: 'CVC',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      freeShipping: 'Free Shipping',
      shippingCost: '$10.00',
      total: 'Total',
      placeOrder: 'Place Order',
      paymentSuccessful: 'Payment Successful!',
      thankYou: 'Thank you for your purchase. Your order has been confirmed.',
      backToHome: 'Back to Home',
      emptyCart: 'Your cart is empty',
      continueShoppingText: 'Add items to your cart to proceed with checkout.',
      continueShopping: 'Continue Shopping',
    },
    zh: {
      checkout: '结账',
      shippingAddress: '收货地址',
      firstName: '名字',
      lastName: '姓氏',
      email: '邮箱',
      country: '国家',
      address: '详细地址',
      paymentMethod: '支付方式',
      cardNumber: '卡号',
      expiryDate: '有效期 (MM/YY)',
      cvc: 'CVC',
      orderSummary: '订单摘要',
      subtotal: '小计',
      shipping: '运费',
      freeShipping: '免运费',
      shippingCost: '¥60.00',
      total: '总计',
      placeOrder: '确认付款',
      paymentSuccessful: '支付成功！',
      thankYou: '感谢您的购买。您的订单已确认。',
      backToHome: '返回首页',
      emptyCart: '购物车为空',
      continueShoppingText: '请添加商品到购物车以继续结账。',
      continueShopping: '继续购物',
    }
  };

  const t = translations[language];

  // 计算价格
  const subtotal = cartCount * 100; // 假设每件商品 $100
  const shippingCost = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    // 验证表单
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.country || !formData.address || !formData.cardNumber || !formData.expiryDate || !formData.cvc) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // 模拟支付处理（1.5秒）
    setTimeout(() => {
      setIsLoading(false);
      setPaymentSuccess(true);

      // 3秒后清空购物车并跳转回首页
      setTimeout(() => {
        clearCart();
        router.push('/');
      }, 3000);
    }, 1500);
  };

  if (cartCount === 0 && !paymentSuccess) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>{t.emptyCart}</h1>
        <p style={{ fontSize: '16px', color: '#666666', marginBottom: '24px' }}>{t.continueShoppingText}</p>
        <Link href="/" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '14px', fontWeight: '600', backgroundColor: '#C41E3A', padding: '12px 24px', borderRadius: '4px', display: 'inline-block' }}>
          {t.continueShopping}
        </Link>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
        <h1 style={{ fontSize: '36px', marginBottom: '12px', fontFamily: "'Playfair Display', serif", color: '#333333' }}>{t.paymentSuccessful}</h1>
        <p style={{ fontSize: '16px', color: '#666666', marginBottom: '32px', maxWidth: '500px' }}>{t.thankYou}</p>
        <p style={{ fontSize: '13px', color: '#999999' }}>Redirecting to home in 3 seconds...</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          background-color: #FAFAFA;
          color: #333333;
        }

        .checkout-page {
          background-color: #FFFFFF;
          min-height: 100vh;
        }

        .checkout-header {
          padding: 20px 40px;
          border-bottom: 1px solid #E8E8E8;
        }

        .checkout-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 32px;
          font-weight: 700;
          color: #333333;
          letter-spacing: 0.05em;
        }

        .checkout-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        /* LEFT SIDE - FORM */
        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-section-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 20px;
          font-weight: 700;
          color: #333333;
          letter-spacing: 0.05em;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-row.full {
          grid-template-columns: 1fr;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input,
        .form-select {
          padding: 12px 16px;
          border: 1px solid #E8E8E8;
          border-radius: 4px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #C41E3A;
        }

        /* RIGHT SIDE - ORDER SUMMARY */
        .order-summary {
          display: flex;
          flex-direction: column;
          gap: 30px;
          position: sticky;
          top: 20px;
          height: fit-content;
        }

        .summary-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 20px;
          font-weight: 700;
          color: #333333;
          letter-spacing: 0.05em;
        }

        .summary-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px;
          background-color: #F9F9F9;
          border-radius: 8px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid #E8E8E8;
        }

        .summary-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .item-name {
          font-size: 14px;
          font-weight: 600;
          color: #333333;
        }

        .item-qty {
          font-size: 12px;
          color: #999999;
        }

        .item-price {
          font-size: 14px;
          font-weight: 700;
          color: #333333;
        }

        .summary-totals {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background-color: #F9F9F9;
          border-radius: 8px;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }

        .total-row.subtotal {
          color: #666666;
        }

        .total-row.shipping {
          color: #666666;
        }

        .total-row.final {
          font-size: 18px;
          font-weight: 700;
          color: #333333;
          padding-top: 12px;
          border-top: 1px solid #E8E8E8;
        }

        .shipping-free {
          color: #27AE60;
          font-weight: 600;
        }

        .place-order-btn {
          width: 100%;
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 16px 24px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .place-order-btn:hover:not(:disabled) {
          background-color: #A01830;
          box-shadow: 0 8px 20px rgba(196, 30, 58, 0.2);
        }

        .place-order-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .checkout-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .order-summary {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .checkout-container {
            padding: 40px 20px;
            gap: 30px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .checkout-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="checkout-page">
        <div className="checkout-header">
          <h1 className="checkout-title">{t.checkout}</h1>
        </div>

        <div className="checkout-container">
          {/* LEFT SIDE - FORM */}
          <div className="checkout-form">
            {/* Shipping Address */}
            <div className="form-section">
              <h2 className="form-section-title">{t.shippingAddress}</h2>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t.firstName}</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.lastName}</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row full">
                <div className="form-group">
                  <label className="form-label">{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row full">
                <div className="form-group">
                  <label className="form-label">{t.country}</label>
                  <select
                    name="country"
                    className="form-select"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CN">China</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
              <div className="form-row full">
                <div className="form-group">
                  <label className="form-label">{t.address}</label>
                  <input
                    type="text"
                    name="address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h2 className="form-section-title">{t.paymentMethod}</h2>
              <div className="form-row full">
                <div className="form-group">
                  <label className="form-label">{t.cardNumber}</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="form-input"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="19"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t.expiryDate}</label>
                  <input
                    type="text"
                    name="expiryDate"
                    className="form-input"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.cvc}</label>
                  <input
                    type="text"
                    name="cvc"
                    className="form-input"
                    placeholder="123"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="order-summary">
            <h2 className="summary-title">{t.orderSummary}</h2>

            <div className="summary-items">
              <div className="summary-item">
                <div className="item-info">
                  <div className="item-name">Sample Product</div>
                  <div className="item-qty">Qty: {cartCount}</div>
                </div>
                <div className="item-price">${(cartCount * 100).toFixed(2)}</div>
              </div>
            </div>

            <div className="summary-totals">
              <div className="total-row subtotal">
                <span>{t.subtotal}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row shipping">
                <span>{t.shipping}</span>
                <span className={shippingCost === 0 ? 'shipping-free' : ''}>
                  {shippingCost === 0 ? t.freeShipping : t.shippingCost}
                </span>
              </div>
              <div className="total-row final">
                <span>{t.total}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={isLoading}
            >
              {isLoading && <span className="loading-spinner"></span>}
              {t.placeOrder}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';
import React from 'react';
import { useCart } from '../context/AppContext';

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCart();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Checkout</h1>
      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <h3>Order Summary</h3>
        <p>Total Items: {cart.length}</p>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Total: ${getCartTotal()}</p>
      </div>
      
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: 'orange' }}>Payment Methods (PayPal & Stripe)</h3>
        <p>如果看到这段文字，说明新代码生效了！</p>
        {/* 这里是 PayPal 占位 */}
        <div style={{ background: '#ffc439', padding: '10px', textAlign: 'center', marginBottom: '10px', borderRadius: '4px' }}>
          Mock PayPal Button
        </div>
        {/* 这里是 Stripe 占位 */}
        <div style={{ background: '#6772e5', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '4px' }}>
          Mock Stripe Card Input
        </div>
      </div>
    </div>
  );
}

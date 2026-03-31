'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useApp } from '../context/AppContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function StripePaymentForm({ totalAmount, cartItems }: { totalAmount: number; cartItems: any[] }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // 创建支付意图
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          cartItems: cartItems,
          customerEmail: 'customer@example.com',
        }),
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // 确认支付
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'Customer Name',
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <div className="text-green-700 font-semibold mb-2">✓ Payment Successful!</div>
        <p className="text-green-600 text-sm">Your payment has been processed successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-lg bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
}

function PayPalPaymentForm({ totalAmount, cartItems }: { totalAmount: number; cartItems: any[] }) {
  const createOrder = async () => {
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          cartItems: cartItems,
          customerEmail: 'customer@example.com',
        }),
      });

      const data = await response.json();
      if (data.orderId) {
        return data.orderId;
      }
      throw new Error('Failed to create PayPal order');
    } catch (error) {
      console.error('PayPal order creation error:', error);
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.orderID }),
      });

      const result = await response.json();
      if (result.status === 'COMPLETED') {
        alert('Payment successful!');
      }
    } catch (error) {
      console.error('PayPal capture error:', error);
      alert('Payment capture failed');
    }
  };

  return (
    <PayPalButtons
      createOrder={(_data, _actions) => createOrder()}
      onApprove={onApprove}
      onError={(err) => {
        console.error('PayPal error:', err);
        alert('PayPal payment failed');
      }}
      style={{
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
      }}
    />
  );
}

export default function CheckoutPage() {
  const { cartItems, diyCartItems, removeDiyFromCart, removeFromCart, language } = useApp();
  const [activeTab, setActiveTab] = useState<'stripe' | 'paypal'>('stripe');
  const [totalAmount, setTotalAmount] = useState(0);
  const isEn = language === 'en';

  // 动态计算总价
  useEffect(() => {
    const productTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const diyTotal = diyCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalAmount(productTotal + diyTotal);
  }, [cartItems, diyCartItems]);

  const isEmpty = cartItems.length === 0 && diyCartItems.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{isEn ? 'Checkout' : '安全结算'}</h1>
          <p className="text-gray-600">{isEn ? 'Complete your payment securely' : '安全完成您的支付'}</p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{isEn ? 'Order Summary' : '订单摘要'}</h2>

          {isEmpty ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">{isEn ? 'Your cart is empty' : '购物车为空'}</p>
              <a
                href="/diy"
                className="inline-block bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                {isEn ? 'Design a Bracelet' : '去设计手串'}
              </a>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                {/* DIY items */}
                {diyCartItems.map((item) => (
                  <div key={item.id} className="border border-stone-100 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.beadCount} {isEn ? 'beads' : '颗珠子'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">¥{item.totalPrice}</p>
                        <button onClick={() => removeDiyFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 mt-1">
                          {isEn ? 'Remove' : '移除'}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.beads.map((b, i) => (
                        <img key={i} src={b.image} alt={isEn ? b.nameEn : b.name} className="w-7 h-7 rounded-full object-contain drop-shadow-sm" />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Regular cart items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">¥{(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 mt-1">
                        {isEn ? 'Remove' : '移除'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900">{isEn ? 'Total' : '合计'}:</span>
                <span className="text-3xl font-bold text-red-700">
                  ¥{totalAmount.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Payment Methods */}
        {!isEmpty && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('stripe')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'stripe'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                💳 Credit Card (Stripe)
              </button>
              <button
                onClick={() => setActiveTab('paypal')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'paypal'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🅿️ PayPal
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'stripe' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Pay with Credit Card
                  </h3>
                  <Elements stripe={stripePromise}>
                    <StripePaymentForm totalAmount={totalAmount} cartItems={cartItems} />
                  </Elements>
                  <p className="text-xs text-gray-500 mt-4">
                    Test card: 4242 4242 4242 4242 | Any future date | Any CVC
                  </p>
                </div>
              )}

              {activeTab === 'paypal' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Pay with PayPal
                  </h3>
                  <PayPalScriptProvider
                    options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                      currency: 'USD',
                    }}
                  >
                    <PayPalPaymentForm totalAmount={totalAmount} cartItems={cartItems} />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Security Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            🔒 Your payment information is encrypted and secure. We use industry-standard SSL encryption.
          </p>
        </div>
      </div>
    </div>
  );
}

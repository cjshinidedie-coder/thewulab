'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import { loadStripe } from '@stripe/stripe-js';

export function CheckoutButton() {
  const { items, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');

  const handleCheckout = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'stripe') {
        // Stripe 支付
        const response = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            email,
          }),
        });

        const { sessionId } = await response.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        await stripe?.redirectToCheckout({ sessionId });
      } else {
        // PayPal 支付
        const response = await fetch('/api/checkout/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            email,
          }),
        });

        const { approvalLink } = await response.json();
        window.location.href = approvalLink;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="stripe"
            checked={paymentMethod === 'stripe'}
            onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal')}
          />
          Pay with Stripe
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal')}
          />
          Pay with PayPal
        </label>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Checkout - $${getTotalPrice().toFixed(2)}`}
      </button>
    </div>
  );
}

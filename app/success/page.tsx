'use client';

export default function Success() {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">✓ Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          You will receive a confirmation email shortly with your order details.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}

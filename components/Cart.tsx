'use client';

import { useCart } from '@/lib/store';
import { PRODUCTS } from '@/lib/products';
import { CheckoutButton } from './CheckoutButton';

export function Cart() {
  const { items, addItem, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const handleAddProduct = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Available Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.element}</p>
                <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddProduct(product.id)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-white sticky top-6">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-12 px-2 py-1 border rounded text-center"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                        <span className="ml-auto font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold mb-2">
                    <span>Total ({getTotalItems()} items):</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <CheckoutButton />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

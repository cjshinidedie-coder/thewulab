'use client';

import { useState } from 'react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const mockProducts = [
    { id: 1, name: 'Cosmic Turquoise Bracelet', price: '$226.00', image: '/product-1.png' },
    { id: 2, name: 'Imperial Jasper Bracelet', price: '$183.00', image: '/product-2.png' },
    { id: 3, name: 'Santa Maria Aquamarine', price: '$2,524.00', image: '/product-3.png' },
    { id: 4, name: 'Labradorite Bracelet', price: '$310.00', image: '/product-4.png' },
    { id: 5, name: 'Blue Aventurine Bracelet', price: '$310.00', image: '/product-5.png' },
    { id: 6, name: 'Tiger Eye - Hematite Pair', price: '$60.00', image: '/product-6.png' },
  ];

  const categories = ['Bracelets', 'Accessories', 'Earrings', 'Necklaces'];
  const elements = ['Metal', 'Wood', 'Water', 'Fire', 'Earth'];
  const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'bestseller', label: 'Best Sellers' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-light text-gray-900">All Products</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Left Sidebar - Filters */}
          <div className="w-56 flex-shrink-0">
            <div className="sticky top-20">
              {/* Category Section */}
              <div className="mb-10">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Style</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`block w-full text-left px-4 py-2 rounded text-sm transition-colors ${
                        selectedCategory === cat
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Element Section */}
              <div className="mb-10 pt-10 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Element</h3>
                <div className="space-y-2">
                  {elements.map((elem) => (
                    <button
                      key={elem}
                      onClick={() => setSelectedElement(selectedElement === elem ? null : elem)}
                      className={`block w-full text-left px-4 py-2 rounded text-sm transition-colors ${
                        selectedElement === elem
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {elem}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="mb-8 flex justify-between items-center">
              <p className="text-sm text-gray-600">{mockProducts.length} products</p>
              <div className="flex gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                      sortBy === option.value
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 hover:shadow-lg transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-serif text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-lg font-semibold text-gray-900">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

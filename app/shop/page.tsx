'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';
import { productsData } from '@/lib/productsData';

export default function ShopPage() {
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const allProducts = productsData;

  const categories = ['Bracelets', 'Accessories', 'Earrings', 'Necklaces'];
  const elements = ['Metal', 'Wood', 'Water', 'Fire', 'Earth'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'bestseller', label: 'Best Sellers' },
    { value: 'newest', label: 'Newest' },
  ];

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    if (sortOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sortOpen]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by element
    if (selectedElement) {
      filtered = filtered.filter(product => product.element === selectedElement);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'bestseller':
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, selectedElement, sortBy]);

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
              <p className="text-sm font-serif text-gray-800">{filteredAndSortedProducts.length} products</p>
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 font-serif text-sm text-gray-800 hover:text-[#C41E3A] transition-colors bg-transparent border-none cursor-pointer"
                >
                  Sort by: {sortOptions.find(o => o.value === sortBy)?.label}
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white shadow-md border border-gray-100 z-50 rounded-sm">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => { setSortBy(option.value); setSortOpen(false); }}
                        className={`block w-full text-left px-5 py-2.5 font-serif text-sm transition-colors ${
                          sortBy === option.value
                            ? 'text-[#C41E3A]'
                            : 'text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 hover:shadow-lg transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isBestSeller && (
                      <div className="absolute top-3 left-3 bg-gray-900 text-white px-2 py-1 text-xs font-semibold rounded">
                        BEST SELLER
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{product.element} • {product.category}</p>
                    <h3 className="text-sm font-serif text-gray-900">{product.name}</h3>
                    <p className="text-lg font-semibold text-gray-900 mb-4">{product.priceDisplay}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        href={`/product/${product.id}`}
                        className="flex-1 bg-red-700 text-white py-2 px-3 rounded text-xs font-semibold uppercase tracking-wider hover:bg-red-800 transition-colors text-center"
                      >
                        Buy Now
                      </Link>
                      <button
                        onClick={() => addToCart({
                          id: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          image: product.image
                        })}
                        className="flex-1 bg-red-700 text-white py-2 px-3 rounded text-xs font-semibold uppercase tracking-wider hover:bg-red-800 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
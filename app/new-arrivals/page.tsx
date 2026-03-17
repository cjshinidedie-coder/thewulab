'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';

interface Product {
  id: string;
  name: string;
  element: string;
  elementType: 'water' | 'fire' | 'wood' | 'metal' | 'earth';
  price: number;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const NEW_PRODUCTS: Product[] = [
  { id: '1', name: 'Cosmic Turquoise Bracelet', element: '🌊 Water', elementType: 'water', price: 226, image: '/product-1.png', isNew: true, isBestSeller: true },
  { id: '3', name: 'Santa Maria Aquamarine', element: '🌊 Water', elementType: 'water', price: 2524, image: '/product-3.png', isNew: true },
  { id: '5', name: 'Blue Aventurine Bracelet', element: '🌊 Water', elementType: 'water', price: 310, image: '/product-5.png', isNew: true },
];

type SortOption = 'newest' | 'price-low' | 'price-high' | 'bestseller';

export default function NewArrivalsPage() {
  const { addToCart, toggleFavorite, favorites } = useApp();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);

  const filteredProducts = NEW_PRODUCTS.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-high': return b.price - a.price;
      case 'price-low': return a.price - b.price;
      case 'bestseller': return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      default: return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-serif font-light text-gray-900">New Arrivals</h1>
          <p className="text-gray-600 mt-2">{sortedProducts.length} items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Sort</h3>
                  <div className="space-y-3">
                    {[
                      { value: 'newest' as SortOption, label: 'Newest' },
                      { value: 'price-low' as SortOption, label: 'Price: Low to High' },
                      { value: 'price-high' as SortOption, label: 'Price: High to Low' },
                      { value: 'bestseller' as SortOption, label: 'Best Sellers' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input type="radio" name="sort" value={option.value} checked={sortBy === option.value} onChange={(e) => setSortBy(e.target.value as SortOption)} className="w-4 h-4" />
                        <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wider">Price</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-3">
                        <label className="text-xs text-gray-600">Min</label>
                        <span className="text-sm font-semibold">${priceRange[0]}</span>
                      </div>
                      <input type="range" min="0" max="3000" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-3">
                        <label className="text-xs text-gray-600">Max</label>
                        <span className="text-sm font-semibold">${priceRange[1]}</span>
                      </div>
                      <input type="range" min="0" max="3000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden mb-4">
                    <Link href={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 text-xs font-semibold uppercase">New</div>
                    {product.isBestSeller && <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 text-xs font-semibold uppercase">Best</div>}
                    <button onClick={() => toggleFavorite(product.id)} className={`absolute bottom-4 right-4 text-2xl ${favorites.includes(product.id) ? 'text-red-700' : 'text-gray-400 hover:text-gray-900'}`}>♡</button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 uppercase tracking-wider">{product.element}</p>
                    <Link href={`/product/${product.id}`}><h3 className="text-sm font-serif text-gray-900 hover:text-gray-600">{product.name}</h3></Link>
                    <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                    <div className="flex gap-2 pt-3">
                      <button onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })} className="flex-1 bg-gray-900 text-white py-2 text-xs font-semibold uppercase hover:bg-gray-800">Add to Bag</button>
                      <Link href={`/product/${product.id}`} className="flex-1 border border-gray-900 text-gray-900 py-2 text-xs font-semibold uppercase hover:bg-gray-50 text-center">View</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

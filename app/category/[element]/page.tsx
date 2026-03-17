'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';

interface Product {
  id: string;
  name: string;
  element: string;
  price: number;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  elementType: string;
}

const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cosmic Turquoise Bracelet',
    element: '🌊 Water Element',
    elementType: 'water',
    price: 226.00,
    image: '/product-1.png',
    isNew: true,
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Imperial Jasper Bracelet',
    element: '✨ Metal Element',
    elementType: 'metal',
    price: 183.00,
    image: '/product-2.png',
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Santa Maria Aquamarine',
    element: '🌊 Water Element',
    elementType: 'water',
    price: 2524.00,
    image: '/product-3.png',
    isNew: true,
  },
  {
    id: '4',
    name: 'Labradorite Bracelet',
    element: '🌿 Wood Element',
    elementType: 'wood',
    price: 310.00,
    image: '/product-4.png',
  },
  {
    id: '5',
    name: 'Blue Aventurine Bracelet',
    element: '🌊 Water Element',
    elementType: 'water',
    price: 310.00,
    image: '/product-5.png',
    isNew: true,
  },
  {
    id: '6',
    name: 'Tiger Eye - Hematite Pair',
    element: '🔥 Fire Element',
    elementType: 'fire',
    price: 60.00,
    image: '/product-6.png',
    isBestSeller: true,
  },
  {
    id: '7',
    name: 'Lava Bracelet',
    element: '🔥 Fire Element',
    elementType: 'fire',
    price: 310.00,
    image: '/product-7.png',
  },
  {
    id: '8',
    name: 'Dragon Blood Jasper',
    element: '🌍 Earth Element',
    elementType: 'earth',
    price: 297.00,
    image: '/product-8.png',
  },
];

const ELEMENT_INFO: Record<string, { emoji: string; name: string; description: string }> = {
  water: {
    emoji: '🌊',
    name: 'Water',
    description: 'Water brings calmness, communication, and emotional balance to your life.',
  },
  fire: {
    emoji: '🔥',
    name: 'Fire',
    description: 'Fire brings passion, vitality, and transformative energy to your life.',
  },
  wood: {
    emoji: '🌿',
    name: 'Wood',
    description: 'Wood brings growth, creativity, and new beginnings to your life.',
  },
  metal: {
    emoji: '✨',
    name: 'Metal',
    description: 'Metal brings clarity, strength, and prosperity to your life.',
  },
  earth: {
    emoji: '🌍',
    name: 'Earth',
    description: 'Earth brings stability, grounding, and inner strength to your life.',
  },
};

type SortOption = 'newest' | 'price-low' | 'price-high' | 'bestseller';

export default function CategoryPage({
  params,
}: {
  params: { element: string };
}) {
  const { addToCart, toggleFavorite, favorites } = useApp();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);

  const element = params.element.toLowerCase();
  const elementInfo = ELEMENT_INFO[element];

  if (!elementInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg">Element not found</p>
      </div>
    );
  }

  const categoryProducts = ALL_PRODUCTS.filter(
    (p) => p.elementType === element
  );

  const filteredProducts = categoryProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'bestseller':
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      case 'newest':
      default:
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-7xl mb-6">{elementInfo.emoji}</div>
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
            {elementInfo.name} Element
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            {elementInfo.description}
          </p>
          <p className="text-gray-600">
            {sortedProducts.length} products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-8 sticky top-20 h-fit">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-8">
                Refine
              </h2>

              {/* Sort */}
              <div className="mb-10 pb-10 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                  Sort By
                </h3>
                <div className="space-y-3">
                  {[
                    { value: 'newest' as SortOption, label: 'Newest' },
                    { value: 'price-low' as SortOption, label: 'Price: Low to High' },
                    { value: 'price-high' as SortOption, label: 'Price: High to Low' },
                    { value: 'bestseller' as SortOption, label: 'Best Sellers' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="w-4 h-4 text-gray-900 cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide">
                  Price Range
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs text-gray-600">Min</label>
                      <span className="text-sm font-semibold text-gray-900">
                        ${priceRange[0]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs text-gray-600">Max</label>
                      <span className="text-sm font-semibold text-gray-900">
                        ${priceRange[1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <Link href={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      {product.isNew && (
                        <div className="absolute top-4 left-4 bg-red-700 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                          New
                        </div>
                      )}
                      {product.isBestSeller && (
                        <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                          Best
                        </div>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`absolute bottom-4 right-4 text-3xl transition-all duration-300 ${
                          favorites.includes(product.id)
                            ? 'text-red-700 scale-110'
                            : 'text-white drop-shadow-lg hover:scale-110'
                        }`}
                      >
                        ♡
                      </button>
                    </div>

                    <div className="p-6">
                      <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">
                        {product.element}
                      </p>
                      <h3 className="text-lg font-serif font-semibold text-gray-900 mb-3 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 mb-6">
                        ${product.price.toFixed(2)}
                      </p>

                      <div className="flex gap-3">
                        <Link
                          href={`/product/${product.id}`}
                          className="flex-1 bg-gray-900 text-white py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors text-center"
                        >
                          View
                        </Link>
                        <button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                            })
                          }
                          className="flex-1 border-2 border-gray-900 text-gray-900 py-3 rounded text-sm font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No products found for this element</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

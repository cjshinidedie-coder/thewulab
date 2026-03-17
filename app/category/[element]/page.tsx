'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';
import { PRODUCTS, sortProducts, filterByElement, SortOption } from '@/lib/products';

const ELEMENT_INFO = {
  water: { emoji: '🌊', name: 'Water', color: 'blue' },
  fire: { emoji: '🔥', name: 'Fire', color: 'red' },
  wood: { emoji: '🌿', name: 'Wood', color: 'green' },
  metal: { emoji: '✨', name: 'Metal', color: 'gray' },
  earth: { emoji: '🌍', name: 'Earth', color: 'yellow' },
};

export default function CategoryPage({
  params,
}: {
  params: { element: string };
}) {
  const { language, addToCart, toggleFavorite, favorites } = useApp();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);

  const element = params.element.toLowerCase() as keyof typeof ELEMENT_INFO;
  const elementInfo = ELEMENT_INFO[element];

  const translations = {
    en: {
      filter: 'Filter',
      sort: 'Sort By',
      priceRange: 'Price Range',
      sortNewest: 'Newest',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortBestseller: 'Best Sellers',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      noProducts: 'No products found for this element',
      elementDescription: {
        water: 'Water brings calmness, communication, and emotional balance to your life.',
        fire: 'Fire brings passion, vitality, and transformative energy to your life.',
        wood: 'Wood brings growth, creativity, and new beginnings to your life.',
        metal: 'Metal brings clarity, strength, and prosperity to your life.',
        earth: 'Earth brings stability, grounding, and inner strength to your life.',
      },
    },
    zh: {
      filter: '筛选',
      sort: '排序',
      priceRange: '价格范围',
      sortNewest: '最新',
      sortPriceLow: '价格：从低到高',
      sortPriceHigh: '价格：从高到低',
      sortBestseller: '热销商品',
      addToCart: '加入购物车',
      buyNow: '立即购买',
      noProducts: '未找到该元素的商品',
      elementDescription: {
        water: '水为您的生活带来平静、沟通和情感平衡。',
        fire: '火为您的生活带来激情、活力和变革能量。',
        wood: '木为您的生活带来成长、创意和新的开始。',
        metal: '金为您的生活带来清晰、力量和繁荣。',
        earth: '土为您的生活带来稳定、扎根和内在力量。',
      },
    },
  };

  const t = translations[language];

  if (!elementInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg">Element not found</p>
      </div>
    );
  }

  const categoryProducts = filterByElement(PRODUCTS, element);
  const filteredProducts = categoryProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-4">{elementInfo.emoji}</div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            {elementInfo.name} Element
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">
            {t.elementDescription[element as keyof typeof t.elementDescription]}
          </p>
          <p className="text-gray-600">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.filter}</h2>

              {/* Sort */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.sort}</h3>
                <div className="space-y-3">
                  {[
                    { value: 'newest' as SortOption, label: t.sortNewest },
                    { value: 'price-low' as SortOption, label: t.sortPriceLow },
                    { value: 'price-high' as SortOption, label: t.sortPriceHigh },
                    { value: 'bestseller' as SortOption, label: t.sortBestseller },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="w-4 h-4 text-gray-900"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.priceRange}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-600">Min: ${priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Max: ${priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
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
                    className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <Link href={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      {product.isNew && (
                        <div className="absolute top-4 left-4 bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold">
                          NEW
                        </div>
                      )}
                      {product.isBestSeller && (
                        <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded text-xs font-semibold">
                          BESTSELLER
                        </div>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`absolute bottom-4 right-4 text-2xl transition-all ${
                          favorites.includes(product.id)
                            ? 'text-red-700'
                            : 'text-white drop-shadow'
                        }`}
                      >
                        ♡
                      </button>
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-gray-600 mb-2">{product.element}</p>
                      <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 mb-4">
                        ${product.price.toFixed(2)}
                      </p>

                      <div className="flex gap-3">
                        <Link
                          href={`/product/${product.id}`}
                          className="flex-1 bg-gray-900 text-white py-2 rounded text-sm font-semibold hover:bg-gray-800 transition-colors text-center"
                        >
                          {t.buyNow}
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
                          className="flex-1 border border-gray-900 text-gray-900 py-2 rounded text-sm font-semibold hover:bg-gray-50 transition-colors"
                        >
                          {t.addToCart}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">{t.noProducts}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';

export default function BaziCalculator() {
  const { language, addToCart, toggleFavorite, favorites } = useApp();
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
    gender: 'male',
    birthPlace: '',
  });
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // 多语言翻译
  const translations = {
    en: {
      title: 'BaZi Calculator',
      subtitle: 'Discover Your Five Elements & Missing Element',
      birthDate: 'Birth Date',
      year: 'Year',
      month: 'Month',
      day: 'Day',
      birthTime: 'Birth Time',
      hour: 'Hour',
      minute: 'Minute',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      birthPlace: 'Birth Place',
      calculate: 'Calculate',
      yourElements: 'Your Five Elements',
      missingElement: 'Missing Element',
      recommendedProducts: 'Recommended Products for You',
      addToCart: 'Add to Cart',
      favorite: 'Add to Favorites',
      water: 'Water',
      fire: 'Fire',
      wood: 'Wood',
      metal: 'Metal',
      earth: 'Earth',
      placeholders: {
        year: 'Year',
        month: 'Month',
        day: 'Day',
        hour: 'Hour',
        minute: 'Minute',
        birthPlace: 'e.g., New York',
      },
      validation: {
        fillAll: 'Please fill in all fields',
        invalidDate: 'Please enter a valid date',
        invalidTime: 'Please enter a valid time',
      },
    },
    zh: {
      title: '八字测算',
      subtitle: '发现你的五行属性与缺失元素',
      birthDate: '出生日期',
      year: '年',
      month: '月',
      day: '日',
      birthTime: '出生时间',
      hour: '时',
      minute: '分',
      gender: '性别',
      male: '男',
      female: '女',
      birthPlace: '出生地点',
      calculate: '开始测算',
      yourElements: '你的五行属性',
      missingElement: '缺失元素',
      recommendedProducts: '为你推荐的商品',
      addToCart: '加入购物车',
      favorite: '加入收藏',
      water: '水',
      fire: '火',
      wood: '木',
      metal: '金',
      earth: '土',
      placeholders: {
        year: 'Year',
        month: 'Month',
        day: 'Day',
        hour: 'Hour',
        minute: 'Minute',
        birthPlace: '例如：北京',
      },
      validation: {
        fillAll: '请填写所有字段',
        invalidDate: '请输入有效的日期',
        invalidTime: '请输入有效的时间',
      },
    },
  };

  const t = translations[language];

  // 商品数据库
  const products = [
    { id: '1', name: 'Cosmic Turquoise Bracelet', element: '🌊 Water Element', price: 226.00, image: '/product-1.png' },
    { id: '2', name: 'Imperial Jasper Bracelet', element: '✨ Metal Element', price: 183.00, image: '/product-2.png' },
    { id: '3', name: 'Santa Maria Aquamarine', element: '🌊 Water Element', price: 2524.00, image: '/product-3.png' },
    { id: '4', name: 'Labradorite Bracelet', element: '🌿 Wood Element', price: 310.00, image: '/product-4.png' },
    { id: '5', name: 'Blue Aventurine Bracelet', element: '🌊 Water Element', price: 310.00, image: '/product-5.png' },
    { id: '6', name: 'Tiger Eye - Hematite Pair', element: '🔥 Fire Element', price: 60.00, image: '/product-6.png' },
    { id: '7', name: 'Lava Bracelet', element: '🔥 Fire Element', price: 310.00, image: '/product-7.png' },
    { id: '8', name: 'Dragon Blood Jasper', element: '🌍 Earth Element', price: 297.00, image: '/product-8.png' }
  ];

  // 八字测算逻辑
  const calculateBazi = () => {
    // 验证表单
    if (!formData.year || !formData.month || !formData.day || !formData.hour || !formData.minute || !formData.birthPlace) {
      alert(t.validation.fillAll);
      return;
    }

    const year = parseInt(formData.year);
    const month = parseInt(formData.month);
    const day = parseInt(formData.day);
    const hour = parseInt(formData.hour);

    if (month < 1 || month > 12 || day < 1 || day > 31 || hour < 0 || hour > 23) {
      alert(t.validation.invalidDate);
      return;
    }

    // 简化的五行计算（基于年月日时的数字）
    // 计算每个元素的强度
    const elementStrengths = {
      water: (year % 5 === 0 ? 2 : 1) + (month % 5 === 0 ? 1 : 0),
      fire: (year % 5 === 1 ? 2 : 1) + (month % 5 === 1 ? 1 : 0),
      wood: (year % 5 === 2 ? 2 : 1) + (month % 5 === 2 ? 1 : 0),
      metal: (year % 5 === 3 ? 2 : 1) + (month % 5 === 3 ? 1 : 0),
      earth: (year % 5 === 4 ? 2 : 1) + (month % 5 === 4 ? 1 : 0),
    };

    // 找出缺失的元素（强度最低的）
    const sortedElements = Object.entries(elementStrengths).sort((a, b) => a[1] - b[1]);
    const missingElement = sortedElements[0][0];

    setResult({
      birthDate: `${formData.year}-${formData.month}-${formData.day}`,
      birthTime: `${formData.hour}:${formData.minute}`,
      gender: formData.gender,
      birthPlace: formData.birthPlace,
      elements: elementStrengths,
      missingElement: missingElement,
    });
    setShowResult(true);
  };

  // 根据缺失元素获取推荐商品
  const getRecommendedProducts = () => {
    if (!result) return [];

    const elementMap: Record<string, string> = {
      water: '🌊',
      fire: '🔥',
      wood: '🌿',
      metal: '✨',
      earth: '🌍',
    };

    const emoji = elementMap[result.missingElement];
    return products.filter(p => p.element.includes(emoji)).slice(0, 4);
  };

  const recommendedProducts = getRecommendedProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-wide">
            {t.title}
          </h1>
          <p className="text-base text-gray-600 font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Main Content - Form and Result */}
        <div className="flex flex-col lg:flex-row gap-12 justify-center items-start mb-12">
          {/* Form Section */}
          <div className="w-full lg:w-96 bg-white p-10 rounded-lg shadow-sm">
            {/* Birth Date */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                {t.birthDate}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors"
                  placeholder={t.placeholders.year}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  min="1900"
                  max="2024"
                />
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors"
                  placeholder={t.placeholders.month}
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors"
                  placeholder={t.placeholders.day}
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  min="1"
                  max="31"
                />
              </div>
            </div>

            {/* Birth Time */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                {t.birthTime}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors"
                  placeholder={t.placeholders.hour}
                  value={formData.hour}
                  onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
                  min="0"
                  max="23"
                />
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors"
                  placeholder={t.placeholders.minute}
                  value={formData.minute}
                  onChange={(e) => setFormData({ ...formData, minute: e.target.value })}
                  min="0"
                  max="59"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                {t.gender}
              </label>
              <div className="flex gap-5">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="cursor-pointer"
                  />
                  {t.male}
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="cursor-pointer"
                  />
                  {t.female}
                </label>
              </div>
            </div>

            {/* Birth Place */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                {t.birthPlace}
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors"
                placeholder={t.placeholders.birthPlace}
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
              />
            </div>

            {/* Calculate Button */}
            <button
              className="w-full bg-red-700 text-white py-4 rounded text-sm font-semibold uppercase tracking-widest hover:bg-red-800 transition-colors shadow-md hover:shadow-lg mt-6"
              onClick={calculateBazi}
            >
              {t.calculate}
            </button>
          </div>

          {/* Result Section */}
          {showResult && result && (
            <div className="w-full lg:w-96 bg-gradient-to-br from-red-50 to-pink-50 p-10 rounded-lg border-2 border-red-700">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 text-center">
                {t.yourElements}
              </h2>

              {/* Elements Grid */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                <div className="bg-white p-3 rounded text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-1">🌊</div>
                  <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">
                    {t.water}
                  </div>
                  <div className="text-lg font-bold text-red-700">
                    {result.elements.water}
                  </div>
                </div>
                <div className="bg-white p-3 rounded text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-1">🔥</div>
                  <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">
                    {t.fire}
                  </div>
                  <div className="text-lg font-bold text-red-700">
                    {result.elements.fire}
                  </div>
                </div>
                <div className="bg-white p-3 rounded text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-1">🌿</div>
                  <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">
                    {t.wood}
                  </div>
                  <div className="text-lg font-bold text-red-700">
                    {result.elements.wood}
                  </div>
                </div>
                <div className="bg-white p-3 rounded text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-1">✨</div>
                  <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">
                    {t.metal}
                  </div>
                  <div className="text-lg font-bold text-red-700">
                    {result.elements.metal}
                  </div>
                </div>
                <div className="bg-white p-3 rounded text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-1">🌍</div>
                  <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">
                    {t.earth}
                  </div>
                  <div className="text-lg font-bold text-red-700">
                    {result.elements.earth}
                  </div>
                </div>
              </div>

              {/* Missing Element Box */}
              <div className="bg-white p-6 rounded border-4 border-red-700 text-center">
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  {t.missingElement}
                </div>
                <div className="font-serif text-4xl font-bold text-red-700 mb-2">
                  {result.missingElement === 'water' && '🌊 ' + t.water}
                  {result.missingElement === 'fire' && '🔥 ' + t.fire}
                  {result.missingElement === 'wood' && '🌿 ' + t.wood}
                  {result.missingElement === 'metal' && '✨ ' + t.metal}
                  {result.missingElement === 'earth' && '🌍 ' + t.earth}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {result.missingElement === 'water' && 'Water brings calmness, communication, and emotional balance to your life.'}
                  {result.missingElement === 'fire' && 'Fire brings passion, vitality, and transformative energy to your life.'}
                  {result.missingElement === 'wood' && 'Wood brings growth, creativity, and new beginnings to your life.'}
                  {result.missingElement === 'metal' && 'Metal brings clarity, strength, and prosperity to your life.'}
                  {result.missingElement === 'earth' && 'Earth brings stability, grounding, and inner strength to your life.'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommended Products Section */}
        {showResult && recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-10 tracking-wide">
              {t.recommendedProducts}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    <button
                      className={`absolute top-2 right-2 text-2xl transition-all ${
                        favorites.includes(product.id)
                          ? 'text-red-700'
                          : 'text-white drop-shadow'
                      }`}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      ♡
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="font-serif text-base font-semibold text-gray-900 mb-1 tracking-wide">
                      {product.name}
                    </div>
                    <div className="text-xs font-semibold text-red-700 mb-2">
                      {product.element}
                    </div>
                    <div className="text-base font-bold text-gray-900 mb-3">
                      ${product.price.toFixed(2)}
                    </div>
                    <button
                      className="w-full bg-red-700 text-white py-2 rounded text-xs font-semibold uppercase tracking-widest hover:bg-red-800 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
                      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    >
                      {t.addToCart}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

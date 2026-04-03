'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';
import { productsData } from '@/lib/productsData';

export default function BaziCalculator() {
  const { language } = useApp();
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

  const translations = {
    en: {
      title: 'BaZi Calculator',
      subtitle: 'Discover Your Five Elements & Cosmic Blueprint',
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
      balancingElement: 'Your Balancing Element',
      recommendedAura: 'Recommended for Your Aura',
      shopNow: 'Shop Now',
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
      },
      elementDescriptions: {
        water: 'Water brings calmness, intuition, and emotional depth — restoring the flow your chart seeks.',
        fire: 'Fire ignites passion, clarity of purpose, and transformative warmth your energy craves.',
        wood: 'Wood nurtures growth, creativity, and renewal — the vitality your chart is calling for.',
        metal: 'Metal sharpens focus, resilience, and inner refinement your spirit needs.',
        earth: 'Earth grounds your energy with stability, patience, and enduring strength.',
      },
    },
    zh: {
      title: '八字测算',
      subtitle: '探索你的五行属性与宇宙蓝图',
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
      balancingElement: '你的平衡元素',
      recommendedAura: '为你的气场甄选',
      shopNow: '立即选购',
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
      },
      elementDescriptions: {
        water: '水带来宁静、直觉与情感深度——恢复你命盘所寻求的流动。',
        fire: '火点燃热情、目标清晰与变革的温暖——你的能量所渴望的。',
        wood: '木滋养成长、创造力与新生——你命盘正在呼唤的生命力。',
        metal: '金磨砺专注、韧性与内在精炼——你的精神所需要的。',
        earth: '土以稳定、耐心与持久的力量扎根你的能量。',
      },
    },
  };

  const t = translations[language];

  const elementKeys = ['water', 'fire', 'wood', 'metal', 'earth'] as const;

  const elementLabels: Record<string, { en: string; zh: string }> = {
    water: { en: 'WATER', zh: '水' },
    fire: { en: 'FIRE', zh: '火' },
    wood: { en: 'WOOD', zh: '木' },
    metal: { en: 'METAL', zh: '金' },
    earth: { en: 'EARTH', zh: '土' },
  };

  // Minimal SVG icons for each element
  const elementIcons: Record<string, JSX.Element> = {
    water: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M14 4C14 4 6 14 6 18a8 8 0 0016 0c0-4-8-14-8-14z" />
      </svg>
    ),
    fire: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M14 3c0 0-7 8-7 14a7 7 0 0014 0c0-3-2-6-3-8 0 3-2 5-4 5s-3-4 0-11z" />
      </svg>
    ),
    wood: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M14 26V8M14 8C12 6 9 3 9 3M14 8C16 6 19 3 19 3M14 14C12 12 10 10 10 10M14 14C16 12 18 10 18 10" />
      </svg>
    ),
    metal: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="14" cy="14" r="9" />
        <path d="M14 5v18M5 14h18" />
      </svg>
    ),
    earth: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M4 18h20M7 14h14M10 10h8M13 6h2" />
      </svg>
    ),
  };

  const calculateBazi = () => {
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

    const elementStrengths = {
      water: (year % 5 === 0 ? 2 : 1) + (month % 5 === 0 ? 1 : 0),
      fire: (year % 5 === 1 ? 2 : 1) + (month % 5 === 1 ? 1 : 0),
      wood: (year % 5 === 2 ? 2 : 1) + (month % 5 === 2 ? 1 : 0),
      metal: (year % 5 === 3 ? 2 : 1) + (month % 5 === 3 ? 1 : 0),
      earth: (year % 5 === 4 ? 2 : 1) + (month % 5 === 4 ? 1 : 0),
    };

    const sortedElements = Object.entries(elementStrengths).sort((a, b) => a[1] - b[1]);
    const missingElement = sortedElements[0][0];

    setResult({
      elements: elementStrengths,
      missingElement,
    });
    setShowResult(true);
  };

  const getRecommendedProducts = () => {
    if (!result) return [];
    const elementMap: Record<string, string> = {
      water: 'Water', fire: 'Fire', wood: 'Wood', metal: 'Metal', earth: 'Earth',
    };
    const elementName = elementMap[result.missingElement];
    return productsData.filter(p => p.element === elementName).slice(0, 3);
  };

  const recommendedProducts = getRecommendedProducts();

  return (
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/bazi-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-4 tracking-[0.06em]">
            {t.title}
          </h1>
          <p className="text-sm text-gray-500 font-light tracking-wide">
            {t.subtitle}
          </p>
        </div>

        {/* Form + Result */}
        <div className="flex flex-col lg:flex-row gap-14 justify-center items-start">
          {/* Form */}
          <div className="w-full lg:w-[400px] bg-white/80 backdrop-blur-sm border border-gray-200 p-10 rounded-sm">
            <div className="mb-7">
              <label className="block text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-[0.15em]">
                {t.birthDate}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm font-sans focus:outline-none focus:border-gray-400 transition-colors bg-white/60" placeholder={t.placeholders.year} value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} min="1900" max="2026" />
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm font-sans focus:outline-none focus:border-gray-400 transition-colors bg-white/60" placeholder={t.placeholders.month} value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} min="1" max="12" />
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm font-sans focus:outline-none focus:border-gray-400 transition-colors bg-white/60" placeholder={t.placeholders.day} value={formData.day} onChange={(e) => setFormData({ ...formData, day: e.target.value })} min="1" max="31" />
              </div>
            </div>

            <div className="mb-7">
              <label className="block text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-[0.15em]">
                {t.birthTime}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm font-sans focus:outline-none focus:border-gray-400 transition-colors bg-white/60" placeholder={t.placeholders.hour} value={formData.hour} onChange={(e) => setFormData({ ...formData, hour: e.target.value })} min="0" max="23" />
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm font-sans focus:outline-none focus:border-gray-400 transition-colors bg-white/60" placeholder={t.placeholders.minute} value={formData.minute} onChange={(e) => setFormData({ ...formData, minute: e.target.value })} min="0" max="59" />
              </div>
            </div>

            <div className="mb-7">
              <label className="block text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-[0.15em]">
                {t.gender}
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="cursor-pointer accent-gray-900" />
                  {t.male}
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="cursor-pointer accent-gray-900" />
                  {t.female}
                </label>
              </div>
            </div>

            <div className="mb-7">
              <label className="block text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-[0.15em]">
                {t.birthPlace}
              </label>
              <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm font-sans focus:outline-none focus:border-gray-400 transition-colors bg-white/60" placeholder={t.placeholders.birthPlace} value={formData.birthPlace} onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })} />
            </div>

            <button
              className="w-full bg-[#1a1a1a] text-white py-4 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#333] transition-colors mt-4"
              onClick={calculateBazi}
            >
              {t.calculate}
            </button>
          </div>

          {/* Result */}
          {showResult && result && (
            <div className="w-full lg:flex-1 max-w-[520px]">
              {/* Five Elements */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-10 rounded-sm mb-8">
                <h2 className="font-serif text-2xl text-gray-900 mb-8 text-center tracking-[0.06em]">
                  {t.yourElements}
                </h2>

                <div className="grid grid-cols-5 gap-2">
                  {elementKeys.map((key) => {
                    const isMissing = result.missingElement === key;
                    return (
                      <div
                        key={key}
                        className={`flex flex-col items-center py-5 rounded-sm transition-all ${
                          isMissing ? 'bg-gray-50 ring-1 ring-gray-200' : ''
                        }`}
                      >
                        <div className={`mb-3 ${isMissing ? 'text-gray-400' : 'text-gray-700'}`}>
                          {elementIcons[key]}
                        </div>
                        <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1">
                          {language === 'en' ? key.charAt(0).toUpperCase() + key.slice(1) : ''}
                        </div>
                        <div className="font-serif text-lg text-gray-900 tracking-wide">
                          {language === 'en' ? elementLabels[key].en : elementLabels[key].zh}
                        </div>
                        <div className={`mt-2 text-xs tabular-nums ${isMissing ? 'text-gray-300' : 'text-gray-500'}`}>
                          {result.elements[key]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Balancing Element */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-10 rounded-sm text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-6">
                  {t.balancingElement}
                </div>

                <div className="text-gray-800 mb-5 flex justify-center">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {elementIcons[result.missingElement]}
                  </div>
                </div>

                <div className="font-serif text-4xl text-gray-900 tracking-[0.08em] mb-4">
                  {language === 'en'
                    ? elementLabels[result.missingElement].en
                    : elementLabels[result.missingElement].zh}
                </div>

                <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm mx-auto">
                  {t.elementDescriptions[result.missingElement as keyof typeof t.elementDescriptions]}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Product Recommendations */}
        {showResult && recommendedProducts.length > 0 && (
          <div className="mt-24 mb-8">
            <div className="text-center mb-14">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] mb-3">
                {language === 'en' ? 'Curated for You' : '为你甄选'}
              </p>
              <h2 className="font-serif text-3xl text-gray-900 tracking-[0.05em] italic">
                {t.recommendedAura}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="group text-center">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden mb-5 rounded-sm">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </Link>
                  </div>

                  <h3 className="font-serif text-base text-gray-900 tracking-wide mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-[0.15em] mb-2">
                    {product.element} Element
                  </p>
                  <p className="text-base text-gray-900 font-light mb-5">
                    {product.priceDisplay}
                  </p>

                  <Link
                    href={`/product/${product.id}`}
                    className="inline-block bg-[#1a1a1a] text-white px-10 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-[#333] transition-colors rounded-sm"
                  >
                    {t.shopNow}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

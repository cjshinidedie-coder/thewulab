'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';

// @ts-ignore
import { Solar } from 'lunar-javascript';

// 🔮 V3 终极版测算引擎：引入地支藏干与月令权重
const calculateRealBazi = (year: number, month: number, day: number, hour: number) => {
  try {
    // 1. 获取天文历法真八字
    const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
    const lunar = solar.getLunar();
    const baZi = lunar.getEightChar();

    const yG = baZi.getYearGan(); const yZ = baZi.getYearZhi();
    const mG = baZi.getMonthGan(); const mZ = baZi.getMonthZhi();
    const dG = baZi.getDayGan(); const dZ = baZi.getDayZhi();
    const tG = baZi.getTimeGan(); const tZ = baZi.getTimeZhi();

    // 2. 天干纯五行能量库 (每个天干基础能量 100)
    const stemMap: Record<string, string> = {
      '甲':'wood', '乙':'wood', '丙':'fire', '丁':'fire', '戊':'earth',
      '己':'earth', '庚':'metal', '辛':'metal', '壬':'water', '癸':'water'
    };

    // 3. 地支藏干能量库 (真正的道家排盘核心，按余气、中气、本气分配能量)
    const branchMap: Record<string, any> = {
      '子': { water: 100 },
      '丑': { earth: 60, water: 30, metal: 10 },
      '寅': { wood: 60, fire: 30, earth: 10 },
      '卯': { wood: 100 },
      '辰': { earth: 60, wood: 30, water: 10 },
      '巳': { fire: 60, earth: 30, metal: 10 },
      '午': { fire: 70, earth: 30 },
      '未': { earth: 60, fire: 30, wood: 10 },
      '申': { metal: 60, water: 30, earth: 10 },
      '酉': { metal: 100 },
      '戌': { earth: 60, metal: 30, fire: 10 },
      '亥': { water: 70, wood: 30 }
    };

    // 原始能量池
    let rawScores = { water: 0, fire: 0, wood: 0, metal: 0, earth: 0 };

    // 4. 计算天干能量
    [yG, mG, dG, tG].forEach(gan => {
      if (stemMap[gan]) rawScores[stemMap[gan] as keyof typeof rawScores] += 100;
    });

    // 5. 计算地支藏干能量（月令 mZ 能量直接翻倍！）
    [yZ, mZ, dZ, tZ].forEach((zhi, index) => {
      const weights = branchMap[zhi];
      const multiplier = (index === 1) ? 2.5 : 1; // 月令权重极高，乘以2.5倍
      
      if (weights) {
        for (const [el, val] of Object.entries(weights)) {
          rawScores[el as keyof typeof rawScores] += (val as number) * multiplier;
        }
      }
    });

    // 6. 将庞大的能量分转化为前端展示的 1-10 简化数值
    let displayScores = { water: 0, fire: 0, wood: 0, metal: 0, earth: 0 };
    for (const key in rawScores) {
       displayScores[key as keyof typeof displayScores] = Math.round(rawScores[key as keyof typeof rawScores] / 100);
    }

    // 7. 寻找命局最弱元素（喜用神/缺失元素）
    let missingElement = 'wood';
    let minScore = 9999;
    
    for (const [element, score] of Object.entries(rawScores)) {
      if (score < minScore) {
        minScore = score;
        missingElement = element;
      }
    }

    return { 
      elements: displayScores, 
      missingElement: missingElement, 
      realBazi: [yG, yZ, mG, mZ, dG, dZ, tG, tZ].join('') 
    };
  } catch (error) {
    console.error("历法计算错误:", error);
    return { elements: { water: 1, fire: 1, wood: 2, metal: 2, earth: 2 }, missingElement: 'water' };
  }
};

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
      subtitle: 'Discover Your Five Elements & Balancing Energy',
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
      yourElements: 'Your Energy Chart',
      missingElement: 'Your Balancing Element',
      recommendedProducts: 'Recommended for Your Aura',
      addToCart: 'Add to Cart',
      favorite: 'Add to Favorites',
      water: 'Water',
      fire: 'Fire',
      wood: 'Wood',
      metal: 'Metal',
      earth: 'Earth',
      placeholders: { year: 'Year', month: 'Month', day: 'Day', hour: 'Hour', minute: 'Minute', birthPlace: 'e.g., New York' },
      validation: { fillAll: 'Please fill in all fields', invalidDate: 'Please enter a valid date', invalidTime: 'Please enter a valid time' },
    },
    zh: {
      title: '八字气场测算',
      subtitle: '基于道家历法与地支藏干，精准推演你的五行能量盘',
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
      calculate: '开启测算',
      yourElements: '你的五行能量盘',
      missingElement: '专属平衡元素 (喜用神)',
      recommendedProducts: '气场专属推荐',
      addToCart: '加入购物车',
      favorite: '加入收藏',
      water: '水',
      fire: '火',
      wood: '木',
      metal: '金',
      earth: '土',
      placeholders: { year: 'Year', month: 'Month', day: 'Day', hour: 'Hour', minute: 'Minute', birthPlace: '例如：北京' },
      validation: { fillAll: '请填写所有字段', invalidDate: '请输入有效的日期', invalidTime: '请输入有效的时间' },
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

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

  const calculateBazi = () => {
    if (!formData.year || !formData.month || !formData.day || !formData.hour || !formData.minute || !formData.birthPlace) {
      alert(t.validation.fillAll); return;
    }
    const year = parseInt(formData.year); const month = parseInt(formData.month);
    const day = parseInt(formData.day); const hour = parseInt(formData.hour);

    if (month < 1 || month > 12 || day < 1 || day > 31 || hour < 0 || hour > 23) {
      alert(t.validation.invalidDate); return;
    }

    const dynamicResult = calculateRealBazi(year, month, day, hour);

    setResult({
      birthDate: `${formData.year}-${formData.month}-${formData.day}`,
      birthTime: `${formData.hour}:${formData.minute}`,
      gender: formData.gender,
      birthPlace: formData.birthPlace,
      elements: dynamicResult.elements,
      missingElement: dynamicResult.missingElement,
    });
    setShowResult(true);
  };

  const getRecommendedProducts = () => {
    if (!result) return [];
    const elementMap: Record<string, string> = { water: '🌊', fire: '🔥', wood: '🌿', metal: '✨', earth: '🌍' };
    const emoji = elementMap[result.missingElement];
    return products.filter(p => p.element.includes(emoji)).slice(0, 4);
  };

  const recommendedProducts = getRecommendedProducts();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: "url('/bazi-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-wide">{t.title}</h1>
          <p className="text-base text-gray-600 font-light">{t.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 justify-center items-start mb-12">
          <div className="w-full lg:w-96 bg-white/80 backdrop-blur-md border border-white/20 p-10 rounded-lg shadow-sm">
            {/* Form Inputs (Slightly condensed for readability) */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">{t.birthDate}</label>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors" placeholder={t.placeholders.year} value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} min="1900" max="2026" />
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors" placeholder={t.placeholders.month} value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} min="1" max="12" />
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors" placeholder={t.placeholders.day} value={formData.day} onChange={(e) => setFormData({ ...formData, day: e.target.value })} min="1" max="31" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">{t.birthTime}</label>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors" placeholder={t.placeholders.hour} value={formData.hour} onChange={(e) => setFormData({ ...formData, hour: e.target.value })} min="0" max="23" />
                <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors" placeholder={t.placeholders.minute} value={formData.minute} onChange={(e) => setFormData({ ...formData, minute: e.target.value })} min="0" max="59" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">{t.gender}</label>
              <div className="flex gap-5">
                <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="cursor-pointer" />{t.male}</label>
                <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="cursor-pointer" />{t.female}</label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">{t.birthPlace}</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded text-sm font-sans focus:outline-none focus:border-red-700 transition-colors" placeholder={t.placeholders.birthPlace} value={formData.birthPlace} onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })} />
            </div>

            <button className="w-full bg-red-700 text-white py-4 rounded text-sm font-semibold uppercase tracking-widest hover:bg-red-800 transition-colors shadow-md hover:shadow-lg mt-6" onClick={calculateBazi}>{t.calculate}</button>
          </div>

          {showResult && result && (
            <div className="w-full lg:w-96 bg-gradient-to-br from-red-50 to-pink-50 p-10 rounded-lg border-2 border-red-700">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 text-center">{t.yourElements}</h2>

              <div className="grid grid-cols-5 gap-3 mb-6">
                <div className="bg-white p-3 rounded text-center shadow-sm"><div className="text-2xl mb-1">🌊</div><div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">{t.water}</div><div className="text-lg font-bold text-red-700">{result.elements.water}</div></div>
                <div className="bg-white p-3 rounded text-center shadow-sm"><div className="text-2xl mb-1">🔥</div><div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">{t.fire}</div><div className="text-lg font-bold text-red-700">{result.elements.fire}</div></div>
                <div className="bg-white p-3 rounded text-center shadow-sm"><div className="text-2xl mb-1">🌿</div><div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">{t.wood}</div><div className="text-lg font-bold text-red-700">{result.elements.wood}</div></div>
                <div className="bg-white p-3 rounded text-center shadow-sm"><div className="text-2xl mb-1">✨</div><div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">{t.metal}</div><div className="text-lg font-bold text-red-700">{result.elements.metal}</div></div>
                <div className="bg-white p-3 rounded text-center shadow-sm"><div className="text-2xl mb-1">🌍</div><div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">{t.earth}</div><div className="text-lg font-bold text-red-700">{result.elements.earth}</div></div>
              </div>

              <div className="bg-white p-6 rounded border-4 border-red-700 text-center">
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{t.missingElement}</div>
                <div className="font-serif text-4xl font-bold text-red-700 mb-2">
                  {result.missingElement === 'water' && '🌊 ' + t.water}
                  {result.missingElement === 'fire' && '🔥 ' + t.fire}
                  {result.missingElement === 'wood' && '🌿 ' + t.wood}
                  {result.missingElement === 'metal' && '✨ ' + t.metal}
                  {result.missingElement === 'earth' && '🌍 ' + t.earth}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed mt-3">
                  {result.missingElement === 'water' && 'Water brings calmness, communication, and emotional balance.'}
                  {result.missingElement === 'fire' && 'Fire brings passion, vitality, and transformative energy.'}
                  {result.missingElement === 'wood' && 'Wood brings growth, creativity, and new beginnings.'}
                  {result.missingElement === 'metal' && 'Metal brings clarity, strength, and prosperity.'}
                  {result.missingElement === 'earth' && 'Earth brings stability, grounding, and inner strength.'}
                </div>
              </div>
            </div>
          )}
        </div>

        {showResult && recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-10 tracking-wide">{t.recommendedProducts}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Link href={`/product/${product.id}`}><img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></Link>
                    <button className={`absolute top-2 right-2 text-2xl transition-all ${favorites.includes(product.id) ? 'text-red-700' : 'text-white drop-shadow'}`} onClick={() => toggleFavorite(product.id)}>♡</button>
                  </div>
                  <div className="p-3">
                    <div className="font-serif text-base font-semibold text-gray-900 mb-1 tracking-wide">{product.name}</div>
                    <div className="text-xs font-semibold text-red-700 mb-2">{product.element}</div>
                    <div className="text-base font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</div>
                    <button className="w-full bg-red-700 text-white py-2 rounded text-xs font-semibold uppercase tracking-widest hover:bg-red-800 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all" onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}>{t.addToCart}</button>
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
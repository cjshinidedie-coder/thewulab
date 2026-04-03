'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';

// @ts-ignore
import { Solar } from 'lunar-javascript';

// 🔮 V3 终极版精准测算引擎
const calculateRealBazi = (year: number, month: number, day: number, hour: number) => {
  try {
    const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
    const lunar = solar.getLunar();
    const baZi = lunar.getEightChar();

    const yG = baZi.getYearGan(); const yZ = baZi.getYearZhi();
    const mG = baZi.getMonthGan(); const mZ = baZi.getMonthZhi();
    const dG = baZi.getDayGan(); const dZ = baZi.getDayZhi();
    const tG = baZi.getTimeGan(); const tZ = baZi.getTimeZhi();

    const stemMap: Record<string, string> = {
      '甲':'wood', '乙':'wood', '丙':'fire', '丁':'fire', '戊':'earth',
      '己':'earth', '庚':'metal', '辛':'metal', '壬':'water', '癸':'water'
    };

    const branchMap: Record<string, any> = {
      '子': { water: 100 }, '丑': { earth: 60, water: 30, metal: 10 },
      '寅': { wood: 60, fire: 30, earth: 10 }, '卯': { wood: 100 },
      '辰': { earth: 60, wood: 30, water: 10 }, '巳': { fire: 60, earth: 30, metal: 10 },
      '午': { fire: 70, earth: 30 }, '未': { earth: 60, fire: 30, wood: 10 },
      '申': { metal: 60, water: 30, earth: 10 }, '酉': { metal: 100 },
      '戌': { earth: 60, metal: 30, fire: 10 }, '亥': { water: 70, wood: 30 }
    };

    let rawScores = { water: 0, fire: 0, wood: 0, metal: 0, earth: 0 };

    [yG, mG, dG, tG].forEach(gan => {
      if (stemMap[gan]) rawScores[stemMap[gan] as keyof typeof rawScores] += 100;
    });

    [yZ, mZ, dZ, tZ].forEach((zhi, index) => {
      const weights = branchMap[zhi];
      const multiplier = (index === 1) ? 2.5 : 1; 
      if (weights) {
        for (const [el, val] of Object.entries(weights)) {
          rawScores[el as keyof typeof rawScores] += (val as number) * multiplier;
        }
      }
    });

    let displayScores = { water: 0, fire: 0, wood: 0, metal: 0, earth: 0 };
    for (const key in rawScores) {
       displayScores[key as keyof typeof displayScores] = Math.round(rawScores[key as keyof typeof rawScores] / 100);
    }

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

// 🌟 高级极简线框图标组件 (替代廉价的 Emoji)
const ElementIcon = ({ type }: { type: string }) => {
  const baseClass = "w-6 h-6 mx-auto mb-3 stroke-gray-600";
  switch (type) {
    case 'water':
      return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={baseClass}><path d="M12 22a8 8 0 0 0 8-8c0-6-8-12-8-12S4 8 4 14a8 8 0 0 0 8 8z" /></svg>;
    case 'fire':
      return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={baseClass}><path d="M12 22c5.5 0 8-4.5 8-9s-8-11-8-11-8 6.5-8 11 2.5 9 8 9z"/><path d="M12 22c-2.5 0-4-2-4-5s4-6 4-6 4 3 4 6-1.5 5-4 5z"/></svg>;
    case 'wood':
      return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={baseClass}><path d="M12 22V8M12 8L8 4M12 8l4-4M12 14l-4-4M12 14l4-4" /></svg>;
    case 'metal':
      return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={baseClass}><circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/></svg>;
    case 'earth':
      return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={baseClass}><circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="3" ry="8"/><path d="M4 12h16"/></svg>;
    default: return null;
  }
};

export default function BaziCalculator() {
  const { language, addToCart, toggleFavorite, favorites } = useApp();
  const [formData, setFormData] = useState({ year: '', month: '', day: '', hour: '', minute: '', gender: 'male', birthPlace: '' });
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const translations = {
    en: {
      title: 'BaZi Calculator', subtitle: 'Discover Your Five Elements & Balancing Energy',
      birthDate: 'BIRTH DATE', year: 'Year', month: 'Month', day: 'Day',
      birthTime: 'BIRTH TIME', hour: 'Hour', minute: 'Minute',
      gender: 'GENDER', male: 'Male', female: 'Female',
      birthPlace: 'BIRTH PLACE', calculate: 'CALCULATE',
      yourElements: 'Your Five Elements', missingElement: 'YOUR BALANCING ELEMENT',
      recommendedProducts: 'Recommended for Your Aura', addToCart: 'Add to Cart',
      water: 'WATER', fire: 'FIRE', wood: 'WOOD', metal: 'METAL', earth: 'EARTH',
      placeholders: { year: 'YYYY', month: 'MM', day: 'DD', hour: 'HH', minute: 'MM', birthPlace: 'e.g., New York' },
      validation: { fillAll: 'Please fill in all fields', invalidDate: 'Please enter a valid date' },
    },
    zh: {
      title: '八字气场测算', subtitle: '基于道家历法与地支藏干，精准推演你的五行能量盘',
      birthDate: '出生日期', year: '年', month: '月', day: '日',
      birthTime: '出生时间', hour: '时', minute: '分',
      gender: '性别', male: '男', female: '女',
      birthPlace: '出生地点', calculate: '开启测算',
      yourElements: '你的五行能量盘', missingElement: '专属平衡元素',
      recommendedProducts: '气场专属推荐', addToCart: '加入购物车',
      water: '水', fire: '火', wood: '木', metal: '金', earth: '土',
      placeholders: { year: '年', month: '月', day: '日', hour: '时', minute: '分', birthPlace: '例如：北京' },
      validation: { fillAll: '请填写所有字段', invalidDate: '请输入有效的日期' },
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const products = [
    { id: '1', name: 'Cosmic Turquoise Bracelet', element: 'WATER', price: 226.00, image: '/product-1.png' },
    { id: '2', name: 'Imperial Jasper Bracelet', element: 'METAL', price: 183.00, image: '/product-2.png' },
    { id: '3', name: 'Santa Maria Aquamarine', element: 'WATER', price: 2524.00, image: '/product-3.png' },
    { id: '4', name: 'Labradorite Bracelet', element: 'WOOD', price: 310.00, image: '/product-4.png' },
    { id: '5', name: 'Blue Aventurine Bracelet', element: 'WATER', price: 310.00, image: '/product-5.png' },
    { id: '6', name: 'Tiger Eye - Hematite Pair', element: 'FIRE', price: 60.00, image: '/product-6.png' },
    { id: '7', name: 'Lava Bracelet', element: 'FIRE', price: 310.00, image: '/product-7.png' },
    { id: '8', name: 'Dragon Blood Jasper', element: 'EARTH', price: 297.00, image: '/product-8.png' }
  ];

  const calculateBazi = () => {
    if (!formData.year || !formData.month || !formData.day || !formData.hour || !formData.minute || !formData.birthPlace) {
      alert(t.validation.fillAll); return;
    }
    const dynamicResult = calculateRealBazi(parseInt(formData.year), parseInt(formData.month), parseInt(formData.day), parseInt(formData.hour));
    setResult({ ...dynamicResult });
    setShowResult(true);
  };

  const getRecommendedProducts = () => {
    if (!result) return [];
    return products.filter(p => p.element.toLowerCase() === result.missingElement.toLowerCase()).slice(0, 4);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans" style={{ backgroundImage: "url('/bazi-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="max-w-5xl mx-auto">
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch mb-16">
          
          {/* 左侧表单 - 完美还原高奢奶白磨砂玻璃 */}
          <div className="w-full lg:w-[420px] bg-white/70 backdrop-blur-md border border-white/40 p-10 shadow-sm flex flex-col justify-center">
            
            <div className="mb-6">
              <label className="block text-[10px] font-semibold text-gray-500 mb-3 uppercase tracking-[0.2em]">{t.birthDate}</label>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" className="w-full px-4 py-3 bg-white/80 border border-white/60 text-sm focus:outline-none focus:bg-white transition-colors placeholder-gray-400 text-gray-800" placeholder={t.placeholders.year} value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} min="1900" max="2026" />
                <input type="number" className="w-full px-4 py-3 bg-white/80 border border-white/60 text-sm focus:outline-none focus:bg-white transition-colors placeholder-gray-400 text-gray-800" placeholder={t.placeholders.month} value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} min="1" max="12" />
                <input type="number" className="w-full px-4 py-3 bg-white/80 border border-white/60 text-sm focus:outline-none focus:bg-white transition-colors placeholder-gray-400 text-gray-800" placeholder={t.placeholders.day} value={formData.day} onChange={(e) => setFormData({ ...formData, day: e.target.value })} min="1" max="31" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[10px] font-semibold text-gray-500 mb-3 uppercase tracking-[0.2em]">{t.birthTime}</label>
              <div className="grid grid-cols-2 gap-3 pr-[33%]">
                <input type="number" className="w-full px-4 py-3 bg-white/80 border border-white/60 text-sm focus:outline-none focus:bg-white transition-colors placeholder-gray-400 text-gray-800" placeholder={t.placeholders.hour} value={formData.hour} onChange={(e) => setFormData({ ...formData, hour: e.target.value })} min="0" max="23" />
                <input type="number" className="w-full px-4 py-3 bg-white/80 border border-white/60 text-sm focus:outline-none focus:bg-white transition-colors placeholder-gray-400 text-gray-800" placeholder={t.placeholders.minute} value={formData.minute} onChange={(e) => setFormData({ ...formData, minute: e.target.value })} min="0" max="59" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[10px] font-semibold text-gray-500 mb-3 uppercase tracking-[0.2em]">{t.gender}</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500"><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="accent-gray-800" />{t.male}</label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500"><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="accent-gray-800" />{t.female}</label>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[10px] font-semibold text-gray-500 mb-3 uppercase tracking-[0.2em]">{t.birthPlace}</label>
              <input type="text" className="w-full px-4 py-3 bg-white/80 border border-white/60 text-sm focus:outline-none focus:bg-white transition-colors placeholder-gray-400 text-gray-800" placeholder={t.placeholders.birthPlace} value={formData.birthPlace} onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })} />
            </div>

            <button className="w-full bg-[#111] text-white py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-md" onClick={calculateBazi}>
              {t.calculate}
            </button>
          </div>

          {/* 右侧结果 - 完美还原双透明分离盒子，白底高亮 */}
          {showResult && result && (
            <div className="w-full lg:w-[460px] flex flex-col gap-6">
              
              {/* Top Box: Elements */}
              <div className="bg-white/70 backdrop-blur-md border border-white/40 p-8 shadow-sm text-center flex-1">
                <h2 className="font-serif text-xl text-gray-600 mb-8 tracking-wide">{t.yourElements}</h2>
                <div className="flex justify-between items-center px-2">
                  {['water', 'fire', 'wood', 'metal', 'earth'].map((el) => {
                    const isMissing = result.missingElement === el;
                    return (
                      <div key={el} className={`flex flex-col items-center py-4 px-2 transition-all ${isMissing ? 'bg-white shadow-sm' : 'opacity-60'}`}>
                        <ElementIcon type={el} />
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{(t as any)[el]}</div>
                        <div className="text-lg font-serif text-gray-700">{result.elements[el]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Box: Balancing Element */}
              <div className="bg-white/70 backdrop-blur-md border border-white/40 p-8 shadow-sm text-center flex-1 flex flex-col justify-center">
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em] mb-4">{t.missingElement}</div>
                <ElementIcon type={result.missingElement} />
                <div className="font-serif text-2xl text-gray-700 mb-4 uppercase tracking-widest mt-2">
                  {(t as any)[result.missingElement]}
                </div>
                <div className="text-xs text-gray-500 leading-relaxed font-light px-6">
                  {result.missingElement === 'water' && 'Water brings calmness, intuition, and emotional depth — restoring the flow your chart seeks.'}
                  {result.missingElement === 'fire' && 'Fire brings passion, vitality, and transformative energy — igniting the spark your chart seeks.'}
                  {result.missingElement === 'wood' && 'Wood brings growth, creativity, and new beginnings — rooting the stability your chart seeks.'}
                  {result.missingElement === 'metal' && 'Metal brings clarity, strength, and prosperity — refining the structure your chart seeks.'}
                  {result.missingElement === 'earth' && 'Earth brings stability, grounding, and inner strength — centering the balance your chart seeks.'}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 推荐商品区 */}
        {showResult && getRecommendedProducts().length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl text-gray-600 text-center mb-10 tracking-wide">{t.recommendedProducts}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getRecommendedProducts().map((product) => (
                <div key={product.id} className="bg-white/80 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Link href={`/product/${product.id}`}><img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></Link>
                    <button className={`absolute top-3 right-3 text-2xl transition-all ${favorites?.includes(product.id) ? 'text-red-800' : 'text-white/80 drop-shadow-md hover:text-white'}`} onClick={() => toggleFavorite && toggleFavorite(product.id)}>♡</button>
                  </div>
                  <div className="p-5 text-center">
                    <div className="font-serif text-sm text-gray-700 mb-2 tracking-wide">{product.name}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{product.element}</div>
                    <div className="text-sm text-gray-700 mb-4">${product.price.toFixed(2)}</div>
                    <button className="w-full bg-[#111] text-white py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors" onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}>{t.addToCart}</button>
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
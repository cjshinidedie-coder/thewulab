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
        year: 'e.g., 1990',
        month: '1-12',
        day: '1-31',
        hour: '0-23',
        minute: '0-59',
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
        year: '例如：1990',
        month: '1-12',
        day: '1-31',
        hour: '0-23',
        minute: '0-59',
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
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          background-color: #FAFAFA;
          color: #333333;
        }

        .bazi-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px;
        }

        .bazi-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .bazi-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 48px;
          font-weight: 700;
          color: #333333;
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }

        .bazi-subtitle {
          font-size: 16px;
          color: #666666;
          font-weight: 300;
        }

        .bazi-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .form-section {
          background-color: #FFFFFF;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #E8E8E8;
          border-radius: 4px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #C41E3A;
        }

        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #E8E8E8;
          border-radius: 4px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          background-color: #FFFFFF;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .form-select:focus {
          outline: none;
          border-color: #C41E3A;
        }

        .gender-group {
          display: flex;
          gap: 20px;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .radio-label input {
          cursor: pointer;
        }

        .calculate-btn {
          width: 100%;
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 16px 30px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .calculate-btn:hover {
          background-color: #A01830;
          box-shadow: 0 8px 20px rgba(196, 30, 58, 0.2);
        }

        .result-section {
          background: linear-gradient(135deg, #FFE8E8 0%, #FFF5F5 100%);
          padding: 40px;
          border-radius: 12px;
          border: 2px solid #C41E3A;
        }

        .result-hidden {
          display: none;
        }

        .result-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 28px;
          font-weight: 700;
          color: #333333;
          margin-bottom: 30px;
          text-align: center;
        }

        .elements-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        .element-card {
          background-color: #FFFFFF;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }

        .element-card:hover {
          transform: translateY(-5px);
        }

        .element-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .element-name {
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .element-strength {
          font-size: 18px;
          font-weight: 700;
          color: #C41E3A;
        }

        .missing-element-box {
          background-color: #FFFFFF;
          padding: 30px;
          border-radius: 8px;
          text-align: center;
          border: 3px solid #C41E3A;
          margin-bottom: 30px;
        }

        .missing-label {
          font-size: 13px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .missing-element-name {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 42px;
          font-weight: 700;
          color: #C41E3A;
          margin-bottom: 8px;
        }

        .missing-description {
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
        }

        .recommended-section {
          margin-top: 60px;
        }

        .section-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 32px;
          font-weight: 700;
          color: #333333;
          text-align: center;
          margin-bottom: 40px;
          letter-spacing: 0.05em;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .product-card {
          background-color: #FFFFFF;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image-wrapper {
          position: relative;
          margin-bottom: 12px;
          overflow: hidden;
          aspect-ratio: 1;
          background-color: #F9F9F9;
          border-radius: 4px;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .favorite-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: auto;
          height: auto;
          border: none;
          background-color: transparent;
          border-radius: 0;
          font-size: 28px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: none;
          color: #FFFFFF;
          padding: 0;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }

        .favorite-btn:hover {
          transform: scale(1.15);
        }

        .favorite-btn.active {
          color: #C41E3A;
        }

        .product-name {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 6px;
          letter-spacing: 0.05em;
        }

        .product-element {
          font-size: 13px;
          color: #C41E3A;
          margin-bottom: 8px;
          font-weight: 600;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
        }

        .product-price {
          font-size: 16px;
          font-weight: 700;
          color: #333333;
          margin-bottom: 12px;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
        }

        .product-buttons {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .add-to-cart {
          flex: 1;
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 12px 30px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(10px);
          border-radius: 4px;
        }

        .product-card:hover .add-to-cart {
          opacity: 1;
          transform: translateY(0);
        }

        .add-to-cart:hover {
          background-color: #A01830;
        }

        .favorite-icon-btn {
          width: 50px;
          height: 50px;
          border: 1px solid #E8E8E8;
          background-color: #FFFFFF;
          border-radius: 4px;
          cursor: pointer;
          font-size: 24px;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(10px);
        }

        .product-card:hover .favorite-icon-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .favorite-icon-btn:hover {
          border-color: #C41E3A;
          color: #C41E3A;
        }

        @media (max-width: 768px) {
          .bazi-container {
            padding: 40px 20px;
          }

          .bazi-title {
            font-size: 32px;
          }

          .bazi-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .elements-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="bazi-container">
        <div className="bazi-header">
          <h1 className="bazi-title">{t.title}</h1>
          <p className="bazi-subtitle">{t.subtitle}</p>
        </div>

        <div className="bazi-content">
          {/* 表单部分 */}
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">{t.birthDate}</label>
              <div className="form-row">
                <input
                  type="number"
                  className="form-input"
                  placeholder={t.placeholders.year}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  min="1900"
                  max="2024"
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder={t.placeholders.month}
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder={t.placeholders.day}
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  min="1"
                  max="31"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t.birthTime}</label>
              <div className="form-row">
                <input
                  type="number"
                  className="form-input"
                  placeholder={t.placeholders.hour}
                  value={formData.hour}
                  onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
                  min="0"
                  max="23"
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder={t.placeholders.minute}
                  value={formData.minute}
                  onChange={(e) => setFormData({ ...formData, minute: e.target.value })}
                  min="0"
                  max="59"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t.gender}</label>
              <div className="gender-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  />
                  {t.male}
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  />
                  {t.female}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t.birthPlace}</label>
              <input
                type="text"
                className="form-input"
                placeholder={t.placeholders.birthPlace}
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
              />
            </div>

            <button className="calculate-btn" onClick={calculateBazi}>
              {t.calculate}
            </button>
          </div>

          {/* 结果部分 */}
          <div className={`result-section ${!showResult ? 'result-hidden' : ''}`}>
            {showResult && result && (
              <>
                <h2 className="result-title">{t.yourElements}</h2>

                <div className="elements-grid">
                  <div className="element-card">
                    <div className="element-icon">🌊</div>
                    <div className="element-name">{t.water}</div>
                    <div className="element-strength">{result.elements.water}</div>
                  </div>
                  <div className="element-card">
                    <div className="element-icon">🔥</div>
                    <div className="element-name">{t.fire}</div>
                    <div className="element-strength">{result.elements.fire}</div>
                  </div>
                  <div className="element-card">
                    <div className="element-icon">🌿</div>
                    <div className="element-name">{t.wood}</div>
                    <div className="element-strength">{result.elements.wood}</div>
                  </div>
                  <div className="element-card">
                    <div className="element-icon">✨</div>
                    <div className="element-name">{t.metal}</div>
                    <div className="element-strength">{result.elements.metal}</div>
                  </div>
                  <div className="element-card">
                    <div className="element-icon">🌍</div>
                    <div className="element-name">{t.earth}</div>
                    <div className="element-strength">{result.elements.earth}</div>
                  </div>
                </div>

                <div className="missing-element-box">
                  <div className="missing-label">{t.missingElement}</div>
                  <div className="missing-element-name">
                    {result.missingElement === 'water' && '🌊 ' + t.water}
                    {result.missingElement === 'fire' && '🔥 ' + t.fire}
                    {result.missingElement === 'wood' && '🌿 ' + t.wood}
                    {result.missingElement === 'metal' && '✨ ' + t.metal}
                    {result.missingElement === 'earth' && '🌍 ' + t.earth}
                  </div>
                  <div className="missing-description">
                    {result.missingElement === 'water' && 'Water brings calmness, communication, and emotional balance to your life.'}
                    {result.missingElement === 'fire' && 'Fire brings passion, vitality, and transformative energy to your life.'}
                    {result.missingElement === 'wood' && 'Wood brings growth, creativity, and new beginnings to your life.'}
                    {result.missingElement === 'metal' && 'Metal brings clarity, strength, and prosperity to your life.'}
                    {result.missingElement === 'earth' && 'Earth brings stability, grounding, and inner strength to your life.'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 推荐商品部分 */}
        {showResult && recommendedProducts.length > 0 && (
          <div className="recommended-section">
            <h2 className="section-title">{t.recommendedProducts}</h2>
            <div className="products-grid">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <Link href={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="product-image" />
                    </Link>
                    <button
                      className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      ♡
                    </button>
                  </div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-element">{product.element}</div>
                  <div className="product-price">${product.price.toFixed(2)}</div>
                  <div className="product-buttons">
                    <button className="add-to-cart" onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}>{t.addToCart}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

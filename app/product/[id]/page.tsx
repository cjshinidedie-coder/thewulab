'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/app/context/AppContext';

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const { language, addToCart, toggleFavorite, favorites } = useApp();
  const isFavorited = favorites.includes(productId);

  // 多语言翻译
  const translations = {
    en: {
      backToHome: '← Back to Home',
      keyFeatures: 'Key Features',
      quantity: 'Quantity:',
      addToCart: 'Add to Cart',
      favorite: 'Add to Favorites',
      energyAlignment: '✨ Energy Alignment',
      energyDescription: 'This {element} piece is carefully crafted to harmonize with your energy. Wear it close to your heart to experience its transformative power and align with your true potential.',
      freeShipping: 'Free shipping on orders over $100',
      reviews: '(128 reviews)',
      youMayAlsoLike: 'You May Also Like',
      productNotFound: 'Product not found',
      notFoundDescription: 'The product you are looking for does not exist.',
    },
    zh: {
      backToHome: '← 返回首页',
      keyFeatures: '主要特性',
      quantity: '数量:',
      addToCart: '加入购物车',
      favorite: '加入收藏',
      energyAlignment: '✨ 能量对齐',
      energyDescription: '这件{element}饰品经过精心制作，与您的能量相协调。将其贴近心脏佩戴，体验其变革力量，与您真实的潜能相一致。',
      freeShipping: '订单满 $100 免运费',
      reviews: '(128 条评价)',
      youMayAlsoLike: '您可能也喜欢',
      productNotFound: '商品未找到',
      notFoundDescription: '您查找的商品不存在。',
    }
  };

  const t = translations[language];

  // 商品数据库
  const products: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Cosmic Turquoise Bracelet',
      element: '🌊 Water Element',
      price: 226.00,
      originalPrice: 226.00,
      image: '/product-1.png',
      description: `Immerse yourself in the calming energy of this exquisite Cosmic Turquoise Bracelet. Handcrafted with precision, this piece embodies the essence of the Water element, promoting tranquility, communication, and emotional balance. Perfect for those seeking to harmonize their energy and embrace their true potential.`,
      features: [
        'Authentic turquoise stones',
        'Handcrafted with care',
        'Water element alignment',
        'Adjustable sizing',
        'Comes with energy guide'
      ]
    },
    '2': {
      id: '2',
      name: 'Imperial Jasper Bracelet',
      element: '✨ Metal Element',
      price: 183.00,
      originalPrice: 183.00,
      image: '/product-2.png',
      description: `Elevate your presence with the Imperial Jasper Bracelet, a stunning representation of the Metal element. This luxurious piece combines elegance with powerful energy, promoting clarity, strength, and prosperity. Wear it to attract abundance and manifest your desires.`,
      features: [
        'Premium imperial jasper',
        'Metal element energy',
        'Prosperity alignment',
        'Elegant design',
        'Authentic craftsmanship'
      ]
    },
    '3': {
      id: '3',
      name: 'Santa Maria Aquamarine',
      element: '🌊 Water Element',
      price: 2524.00,
      originalPrice: 2524.00,
      image: '/product-3.png',
      description: `The crown jewel of our collection, the Santa Maria Aquamarine is a rare and precious gemstone that embodies the highest vibrations of the Water element. This exceptional piece promotes deep spiritual connection, clarity of purpose, and profound inner peace.`,
      features: [
        'Rare Santa Maria aquamarine',
        'Premium quality',
        'Spiritual alignment',
        'Investment piece',
        'Certificate of authenticity'
      ]
    },
    '4': {
      id: '4',
      name: 'Labradorite Bracelet',
      element: '🌿 Wood Element',
      price: 310.00,
      originalPrice: 310.00,
      image: '/product-4.png',
      description: `Discover the transformative power of Labradorite, a stone of change and new beginnings. This Wood element bracelet supports growth, creativity, and personal transformation. Perfect for those embarking on new journeys and seeking to unlock their potential.`,
      features: [
        'Genuine labradorite',
        'Wood element energy',
        'Transformation support',
        'Creative enhancement',
        'Growth alignment'
      ]
    },
    '5': {
      id: '5',
      name: 'Blue Aventurine Bracelet',
      element: '🌊 Water Element',
      price: 310.00,
      originalPrice: 310.00,
      image: '/product-5.png',
      description: `Embrace serenity with the Blue Aventurine Bracelet, a gentle yet powerful Water element piece. This calming stone promotes inner peace, emotional healing, and harmonious relationships. Ideal for those seeking balance and tranquility in their lives.`,
      features: [
        'Natural blue aventurine',
        'Calming energy',
        'Emotional healing',
        'Relationship harmony',
        'Peace promotion'
      ]
    },
    '6': {
      id: '6',
      name: 'Tiger Eye - Hematite Pair',
      element: '🔥 Fire Element',
      price: 60.00,
      originalPrice: 60.00,
      image: '/product-6.png',
      description: `Harness the power of dual Fire element stones with this Tiger Eye and Hematite pairing. This dynamic combination promotes courage, grounding, and protective energy. Perfect for those seeking strength and stability in their daily lives.`,
      features: [
        'Tiger eye & hematite',
        'Fire element power',
        'Courage enhancement',
        'Grounding energy',
        'Protective properties'
      ]
    },
    '7': {
      id: '7',
      name: 'Lava Bracelet',
      element: '🔥 Fire Element',
      price: 310.00,
      originalPrice: 310.00,
      image: '/product-7.png',
      description: `Channel the raw power of the Fire element with our Lava Bracelet. This bold and energetic piece promotes passion, vitality, and transformation. Wear it to ignite your inner fire and manifest your deepest desires.`,
      features: [
        'Authentic lava stone',
        'Fire element alignment',
        'Passion activation',
        'Vitality enhancement',
        'Transformative energy'
      ]
    },
    '8': {
      id: '8',
      name: 'Dragon Blood Jasper',
      element: '🌍 Earth Element',
      price: 297.00,
      originalPrice: 297.00,
      image: '/product-8.png',
      description: `Ground yourself with the powerful Dragon Blood Jasper, an Earth element stone of strength and vitality. This rare gemstone promotes courage, endurance, and deep connection to the earth. Perfect for those seeking stability and inner strength.`,
      features: [
        'Dragon blood jasper',
        'Earth element energy',
        'Strength promotion',
        'Grounding properties',
        'Vitality enhancement'
      ]
    }
  };

  const product = products[productId];

  if (!product) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>{t.productNotFound}</h1>
        <p style={{ fontSize: '16px', color: '#666666', marginBottom: '24px' }}>{t.notFoundDescription}</p>
        <Link href="/" style={{ color: '#C41E3A', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          {t.backToHome}
        </Link>
      </div>
    );
  }

  return (
    <div>
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

        .product-detail-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
        }

        .back-link {
          display: inline-block;
          margin-bottom: 20px;
          color: #C41E3A;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #A01830;
        }

        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .product-image-section {
          position: relative;
        }

        .product-main-image {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 12px;
          background-color: #F9F9F9;
        }

        .product-info-section {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .product-element-badge {
          display: inline-block;
          background-color: #FFE8E8;
          color: #C41E3A;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
          width: fit-content;
        }

        .product-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 42px;
          font-weight: 700;
          color: #333333;
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .stars {
          color: #FFD700;
          font-size: 16px;
        }

        .rating-text {
          color: #666666;
        }

        .product-price-section {
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 1px solid #E8E8E8;
        }

        .price-display {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 8px;
        }

        .current-price {
          font-size: 36px;
          font-weight: 700;
          color: #C41E3A;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
        }

        .original-price {
          font-size: 18px;
          color: #999999;
          text-decoration: line-through;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
        }

        .product-description {
          font-size: 16px;
          color: #666666;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .product-features {
          margin-bottom: 30px;
        }

        .features-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 12px;
        }

        .features-list {
          list-style: none;
        }

        .features-list li {
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
          font-size: 14px;
          color: #666666;
        }

        .features-list li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #C41E3A;
          font-weight: bold;
        }

        .quantity-section {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .quantity-label {
          font-size: 14px;
          font-weight: 600;
          color: #333333;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          border: 1px solid #E8E8E8;
          border-radius: 4px;
          overflow: hidden;
        }

        .quantity-btn {
          width: 40px;
          height: 40px;
          border: none;
          background-color: #F5F5F5;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .quantity-btn:hover {
          background-color: #E8E8E8;
        }

        .quantity-input {
          width: 60px;
          height: 40px;
          border: none;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 30px;
        }

        .btn-add-cart {
          flex: 1;
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
        }

        .btn-add-cart:hover {
          background-color: #A01830;
          box-shadow: 0 8px 20px rgba(196, 30, 58, 0.2);
        }

        .btn-favorite {
          width: 50px;
          height: 50px;
          border: 1px solid #E8E8E8;
          background-color: #FFFFFF;
          border-radius: 4px;
          cursor: pointer;
          font-size: 24px;
          transition: all 0.3s ease;
        }

        .btn-favorite:hover {
          border-color: #C41E3A;
          color: #C41E3A;
        }

        .btn-favorite.active {
          border-color: #C41E3A;
          color: #C41E3A;
          background-color: #FFE8E8;
        }

        .energy-box {
          padding: 20px;
          background-color: #FFE8E8;
          border-radius: 8px;
          margin-top: 20px;
        }

        .energy-label {
          font-size: 13px;
          color: #C41E3A;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .energy-text {
          font-size: 13px;
          color: #666666;
          line-height: 1.6;
        }

        .related-products {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid #E8E8E8;
        }

        .related-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
          text-align: center;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .related-card {
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .related-card:hover {
          transform: translateY(-5px);
        }

        .related-image {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .related-name {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .related-element {
          font-size: 13px;
          color: #C41E3A;
          margin-bottom: 8px;
        }

        .related-price {
          font-size: 16px;
          font-weight: 700;
          color: #333333;
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .product-title {
            font-size: 28px;
          }

          .current-price {
            font-size: 28px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn-favorite {
            width: 100%;
          }

          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="product-detail-container">
        <Link href="/" className="back-link">{t.backToHome}</Link>

        <div className="product-grid">
          {/* Product Image */}
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="product-main-image" />
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-element-badge">{product.element}</div>

            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-text">{t.reviews}</span>
            </div>

            <div className="product-price-section">
              <div className="price-display">
                <span className="current-price">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <p style={{ fontSize: '13px', color: '#666666' }}>{t.freeShipping}</p>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-features">
              <h3 className="features-title">{t.keyFeatures}</h3>
              <ul className="features-list">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="quantity-section">
              <label className="quantity-label">{t.quantity}</label>
              <div className="quantity-control">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-add-cart" onClick={addToCart}>{t.addToCart}</button>
              <button
                className={`btn-favorite ${isFavorited ? 'active' : ''}`}
                onClick={() => toggleFavorite(productId)}
                title={t.favorite}
              >
                {isFavorited ? '♥' : '♡'}
              </button>
            </div>

            <div className="energy-box">
              <p className="energy-label">{t.energyAlignment}</p>
              <p className="energy-text">
                {t.energyDescription.replace('{element}', product.element)}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="related-products">
          <h2 className="related-title">{t.youMayAlsoLike}</h2>
          <div className="related-grid">
            {Object.values(products)
              .filter((p: any) => p.id !== productId)
              .slice(0, 4)
              .map((relatedProduct: any) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="related-card">
                    <img src={relatedProduct.image} alt={relatedProduct.name} className="related-image" />
                    <p className="related-name">{relatedProduct.name}</p>
                    <p className="related-element">{relatedProduct.element}</p>
                    <p className="related-price">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

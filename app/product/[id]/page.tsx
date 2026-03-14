'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useApp } from '@/app/context/AppContext';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { language, addToCart, toggleFavorite, favorites } = useApp();
  const isFavorited = favorites.includes(productId);

  const handleBuyNow = () => {
    addToCart();
    router.push('/checkout');
  };

  // 多语言翻译
  const translations = {
    en: {
      backToHome: '← Back to Home',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      material: 'Material',
      size: 'Size',
      element: 'Element',
      care: 'Care',
      freeShipping: 'Free Shipping on Orders Over $100',
      youMayAlsoLike: 'You May Also Like',
      productNotFound: 'Product not found',
      notFoundDescription: 'The product you are looking for does not exist.',
      reviews: '(128 reviews)',
      detailImage1: 'Detail View 1',
      detailImage2: 'Detail View 2',
      modelWear1: 'Model Wear 1',
      modelWear2: 'Model Wear 2',
    },
    zh: {
      backToHome: '← 返回首页',
      buyNow: '立即购买',
      addToCart: '加入购物车',
      material: '材质',
      size: '尺寸',
      element: '五行元素',
      care: '保养说明',
      freeShipping: '订单满 $100 免运费',
      youMayAlsoLike: '您可能也喜欢',
      productNotFound: '商品未找到',
      notFoundDescription: '您查找的商品不存在。',
      reviews: '(128 条评价)',
      detailImage1: '细节图 1',
      detailImage2: '细节图 2',
      modelWear1: '穿戴效果 1',
      modelWear2: '穿戴效果 2',
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
      material: 'Natural Turquoise, Sterling Silver',
      size: 'Adjustable (6.5" - 8")',
      care: 'Avoid water exposure. Clean with soft cloth.',
      description: `Immerse yourself in the calming energy of this exquisite Cosmic Turquoise Bracelet. Handcrafted with precision, this piece embodies the essence of the Water element, promoting tranquility, communication, and emotional balance. Perfect for those seeking to harmonize their energy and embrace their true potential.

Each stone is carefully selected for its unique patterns and vibrant blue hues. The sterling silver setting ensures durability while maintaining the delicate beauty of the natural turquoise. This bracelet is not just a piece of jewelry—it's a spiritual companion for your journey.

Wear it close to your heart to experience its transformative power and align with your true cosmic blueprint.`
    },
    '2': {
      id: '2',
      name: 'Imperial Jasper Bracelet',
      element: '✨ Metal Element',
      price: 183.00,
      originalPrice: 183.00,
      image: '/product-2.png',
      material: 'Imperial Jasper, Gold Plated',
      size: 'Adjustable (6.5" - 8")',
      care: 'Keep away from harsh chemicals. Polish regularly.',
      description: `Elevate your presence with the Imperial Jasper Bracelet, a stunning representation of the Metal element. This luxurious piece combines elegance with powerful energy, promoting clarity, strength, and prosperity. Wear it to attract abundance and manifest your desires.

The rich red and black patterns of Imperial Jasper symbolize grounding and protection. Combined with gold plating, this bracelet radiates sophistication and power. It's perfect for those seeking to enhance their confidence and attract success.

This is more than jewelry—it's a statement of your commitment to personal growth and prosperity.`
    },
    '3': {
      id: '3',
      name: 'Santa Maria Aquamarine',
      element: '🌊 Water Element',
      price: 2524.00,
      originalPrice: 2524.00,
      image: '/product-3.png',
      material: 'Santa Maria Aquamarine, Platinum',
      size: 'One Size',
      care: 'Professional cleaning recommended. Store separately.',
      description: `The crown jewel of our collection, the Santa Maria Aquamarine is a rare and precious gemstone that embodies the highest vibrations of the Water element. This exceptional piece promotes deep spiritual connection, clarity of purpose, and profound inner peace.

Santa Maria Aquamarine is one of the rarest and most valuable aquamarines in the world. Its exceptional clarity and brilliant blue color make it a collector's treasure. Set in platinum, this bracelet is a masterpiece of luxury and spirituality.

This is an investment piece that will be treasured for generations.`
    },
    '4': {
      id: '4',
      name: 'Labradorite Bracelet',
      element: '🌿 Wood Element',
      price: 310.00,
      originalPrice: 310.00,
      image: '/product-4.png',
      material: 'Labradorite, Silver',
      size: 'Adjustable (6.5" - 8")',
      care: 'Avoid extreme temperatures. Clean gently.',
      description: `Discover the transformative power of Labradorite, a stone of change and new beginnings. This Wood element bracelet supports growth, creativity, and personal transformation. Perfect for those embarking on new journeys and seeking to unlock their potential.

Labradorite is known for its magical labradorescence—a play of light that seems to glow from within. This optical phenomenon symbolizes the hidden potential within each of us. Wearing this bracelet reminds you that transformation is always possible.

Embrace change and unlock your creative power with this stunning piece.`
    },
    '5': {
      id: '5',
      name: 'Blue Aventurine Bracelet',
      element: '🌊 Water Element',
      price: 310.00,
      originalPrice: 310.00,
      image: '/product-5.png',
      material: 'Blue Aventurine, Silver',
      size: 'Adjustable (6.5" - 8")',
      care: 'Keep away from direct sunlight. Clean regularly.',
      description: `Embrace serenity with the Blue Aventurine Bracelet, a gentle yet powerful Water element piece. This calming stone promotes inner peace, emotional healing, and harmonious relationships. Ideal for those seeking balance and tranquility in their lives.

Blue Aventurine is a stone of communication and emotional expression. Its soothing blue energy helps calm anxiety and promote peaceful sleep. This bracelet is perfect for meditation and spiritual practice.

Find your inner calm and express your truth with this beautiful piece.`
    },
    '6': {
      id: '6',
      name: 'Tiger Eye - Hematite Pair',
      element: '🔥 Fire Element',
      price: 60.00,
      originalPrice: 60.00,
      image: '/product-6.png',
      material: 'Tiger Eye, Hematite, Stainless Steel',
      size: 'Adjustable (6.5" - 8")',
      care: 'Durable. Clean with water and dry thoroughly.',
      description: `Harness the power of dual Fire element stones with this Tiger Eye and Hematite pairing. This dynamic combination promotes courage, grounding, and protective energy. Perfect for those seeking strength and stability in their daily lives.

Tiger Eye brings focus and determination, while Hematite provides grounding and protection. Together, they create a powerful shield against negative energy. This bracelet is ideal for those facing challenges and seeking inner strength.

Stand strong and face your challenges with confidence.`
    },
    '7': {
      id: '7',
      name: 'Lava Bracelet',
      element: '🔥 Fire Element',
      price: 310.00,
      originalPrice: 310.00,
      image: '/product-7.png',
      material: 'Lava Stone, Silver',
      size: 'Adjustable (6.5" - 8")',
      care: 'Can be used with essential oils. Clean gently.',
      description: `Channel the raw power of the Fire element with our Lava Bracelet. This bold and energetic piece promotes passion, vitality, and transformation. Wear it to ignite your inner fire and manifest your deepest desires.

Lava stone is porous and can absorb essential oils, making it perfect for aromatherapy. Its volcanic origin symbolizes the raw power of nature and the transformative energy within you. This bracelet is a powerful tool for manifestation and personal power.

Ignite your passion and transform your life with this dynamic piece.`
    },
    '8': {
      id: '8',
      name: 'Dragon Blood Jasper',
      element: '🌍 Earth Element',
      price: 297.00,
      originalPrice: 297.00,
      image: '/product-8.png',
      material: 'Dragon Blood Jasper, Bronze',
      size: 'Adjustable (6.5" - 8")',
      care: 'Avoid harsh chemicals. Store in cool place.',
      description: `Ground yourself with the powerful Dragon Blood Jasper, an Earth element stone of strength and vitality. This rare gemstone promotes courage, endurance, and deep connection to the earth. Perfect for those seeking stability and inner strength.

Dragon Blood Jasper is a rare stone with deep red and green colors, symbolizing the balance between passion and growth. Its powerful grounding energy helps you stay centered and focused. This bracelet is perfect for those seeking stability and strength.

Root yourself in strength and embrace your power with this magnificent piece.`
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

        .product-page {
          background-color: #FFFFFF;
          min-height: 100vh;
        }

        .back-link {
          display: inline-block;
          padding: 20px 40px;
          color: #C41E3A;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #A01830;
        }

        .product-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 40px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        /* LEFT SIDE - IMAGE GALLERY */
        .image-gallery {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .main-image-wrapper {
          width: 100%;
          aspect-ratio: 1;
          background-color: #F9F9F9;
          border-radius: 8px;
          overflow: hidden;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .detail-images-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
        }

        .detail-image-wrapper {
          aspect-ratio: 1;
          background-color: #F9F9F9;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
          width: 100%;
        }

        .detail-image-wrapper:hover {
          transform: scale(1.02);
        }

        .detail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* RIGHT SIDE - PRODUCT INFO */
        .product-info {
          display: flex;
          flex-direction: column;
          gap: 30px;
          position: sticky;
          top: 20px;
          padding: 20px;
          width: 100%;
        }

        .product-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .product-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 48px;
          font-weight: 700;
          color: #333333;
          letter-spacing: 0.05em;
          line-height: 1.2;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .stars {
          color: #FFD700;
          font-size: 14px;
        }

        .rating-text {
          color: #666666;
        }

        .price-section {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .price {
          font-size: 48px;
          font-weight: 700;
          color: #C41E3A;
          font-family: 'Montserrat', sans-serif;
        }

        .original-price {
          font-size: 18px;
          color: #999999;
          text-decoration: line-through;
        }

        .shipping-badge {
          display: inline-block;
          padding: 12px 16px;
          border: 2px solid #C41E3A;
          border-radius: 4px;
          color: #C41E3A;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background-color: #FFFFFF;
        }

        .product-description {
          font-size: 14px;
          color: #666666;
          line-height: 1.8;
          font-weight: 300;
          white-space: pre-wrap;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn-buy-now {
          flex: 1;
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 16px 24px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-buy-now:hover {
          background-color: #A01830;
          box-shadow: 0 8px 20px rgba(196, 30, 58, 0.2);
        }

        .btn-add-cart {
          flex: 1;
          background-color: #FFFFFF;
          color: #C41E3A;
          padding: 16px 24px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: 2px solid #C41E3A;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-add-cart:hover {
          background-color: #FFE8E8;
        }

        .btn-favorite {
          width: 50px;
          height: 50px;
          border: 2px solid #E8E8E8;
          background-color: #FFFFFF;
          border-radius: 4px;
          cursor: pointer;
          font-size: 24px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
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

        .specs-table {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
          background-color: #F9F9F9;
          border-radius: 8px;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid #E8E8E8;
        }

        .spec-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .spec-label {
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .spec-value {
          font-size: 14px;
          color: #666666;
          text-align: right;
          max-width: 50%;
        }

        /* RELATED PRODUCTS */
        .related-section {
          margin-top: 80px;
          padding-top: 60px;
          border-top: 1px solid #E8E8E8;
        }

        .section-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 36px;
          font-weight: 700;
          color: #333333;
          text-align: center;
          margin-bottom: 50px;
          letter-spacing: 0.05em;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          margin-bottom: 60px;
        }

        .product-card {
          text-align: center;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image-wrapper {
          position: relative;
          margin-bottom: 16px;
          overflow: hidden;
          aspect-ratio: 1;
          background-color: #F9F9F9;
          border-radius: 8px;
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

        .product-card-name {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 15px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 6px;
          letter-spacing: 0.05em;
        }

        .product-card-element {
          font-size: 12px;
          color: #C41E3A;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .product-card-price {
          font-size: 15px;
          font-weight: 700;
          color: #333333;
        }

        /* FOOTER */
        footer {
          background-color: #FFFFFF;
          border-top: 1px solid #E8E8E8;
          padding: 40px 40px 30px;
          margin-top: 0;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 60px;
          margin-bottom: 0;
          padding-bottom: 30px;
          border-bottom: 1px solid #E8E8E8;
        }

        .footer-section h3 {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 8px;
        }

        .footer-section a {
          color: #666666;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.3s ease;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          font-weight: 300;
        }

        .footer-section a:hover {
          color: #C41E3A;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 15px;
          font-size: 12px;
          color: #999999;
        }

        .footer-bottom a {
          color: #999;
          text-decoration: none;
        }

        .footer-bottom a:hover {
          color: #C41E3A;
        }

        @media (max-width: 1024px) {
          .product-container {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 0 20px 40px;
          }

          .product-info {
            position: static;
            padding: 20px;
          }

          .product-title {
            font-size: 36px;
          }

          .price {
            font-size: 36px;
          }

          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .product-container {
            grid-template-columns: 1fr;
            padding: 0 20px 40px;
            gap: 30px;
          }

          .product-info {
            padding: 16px;
          }

          .product-title {
            font-size: 28px;
          }

          .price {
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
            gap: 20px;
          }

          .footer-top {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>

      <div className="product-page">
        <Link href="/" className="back-link">{t.backToHome}</Link>

        <div className="product-container">
          {/* LEFT SIDE - IMAGE GALLERY */}
          <div className="image-gallery">
            <div className="main-image-wrapper">
              <img src={product.image} alt={product.name} className="main-image" />
            </div>
            <div className="detail-images-grid">
              <div className="detail-image-wrapper">
                <img src={product.image} alt={t.detailImage1} className="detail-image" />
              </div>
              <div className="detail-image-wrapper">
                <img src={product.image} alt={t.detailImage2} className="detail-image" />
              </div>
              <div className="detail-image-wrapper">
                <img src={product.image} alt={t.modelWear1} className="detail-image" />
              </div>
              <div className="detail-image-wrapper">
                <img src={product.image} alt={t.modelWear2} className="detail-image" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - PRODUCT INFO */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-text">{t.reviews}</span>
              </div>
            </div>

            <div className="price-section">
              <span className="price">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="shipping-badge">{t.freeShipping}</div>

            <p className="product-description">{product.description}</p>

            <div className="action-buttons">
              <button className="btn-buy-now" onClick={handleBuyNow}>{t.buyNow}</button>
              <button className="btn-add-cart" onClick={addToCart}>{t.addToCart}</button>
              <button
                className={`btn-favorite ${isFavorited ? 'active' : ''}`}
                onClick={() => toggleFavorite(productId)}
                title="Add to Favorites"
              >
                {isFavorited ? '♥' : '♡'}
              </button>
            </div>

            <div className="specs-table">
              <div className="spec-row">
                <span className="spec-label">{t.material}</span>
                <span className="spec-value">{product.material}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">{t.size}</span>
                <span className="spec-value">{product.size}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">{t.element}</span>
                <span className="spec-value">{product.element}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">{t.care}</span>
                <span className="spec-value">{product.care}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 40px' }}>
          <div className="related-section">
            <h2 className="section-title">{t.youMayAlsoLike}</h2>
            <div className="related-grid">
              {Object.values(products)
                .filter((p: any) => p.id !== productId)
                .slice(0, 4)
                .map((relatedProduct: any) => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="product-card">
                      <div className="product-image-wrapper">
                        <img src={relatedProduct.image} alt={relatedProduct.name} className="product-image" />
                      </div>
                      <p className="product-card-name">{relatedProduct.name}</p>
                      <p className="product-card-element">{relatedProduct.element}</p>
                      <p className="product-card-price">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <div className="footer-content">
            <div className="footer-top">
              <div className="footer-section">
                <h3>Shop</h3>
                <ul>
                  <li><a href="#">All Bracelets</a></li>
                  <li><a href="#">New Arrivals</a></li>
                  <li><a href="#">Best Sellers</a></li>
                  <li><a href="#">Sale</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Customer Care</h3>
                <ul>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Shipping Info</a></li>
                  <li><a href="#">Returns & Exchanges</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>About</h3>
                <ul>
                  <li><a href="#">Our Story</a></li>
                  <li><a href="#">Craftsmanship</a></li>
                  <li><a href="#">Energy Work</a></li>
                  <li><a href="#">Blog</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Connect</h3>
                <ul>
                  <li><a href="#">Instagram</a></li>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">Twitter</a></li>
                  <li><a href="#">Newsletter</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2024 the wu lab. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

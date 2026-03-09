'use client';

import { useRef } from 'react';
import { Cart } from '@/components/Cart';

export default function Home() {
  const shopRef = useRef<HTMLDivElement>(null);

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          background-color: #FAFAFA;
          color: #333333;
          line-height: 1.6;
          font-weight: 300;
        }

        section {
          padding-top: 2.5rem !important;
          padding-bottom: 2.5rem !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }

        /* ===== HERO SECTION ===== */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -2;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: -1;
        }

        .hero-content {
          max-width: 700px;
          z-index: 2;
          position: relative;
        }

        .hero h1 {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 72px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 12px;
          line-height: 1.2;
          letter-spacing: 0.05em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .hero-subtitle {
          font-size: 18px;
          color: #FFFFFF;
          margin-bottom: 25px;
          font-weight: 300;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
        }

        .btn-primary {
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 16px 50px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
          border-radius: 4px;
        }

        .btn-primary:hover {
          background-color: #A01830;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(196, 30, 58, 0.2);
        }

        /* ===== DISCOVER BANNER SECTION ===== */
        .discover-banner-section {
          padding: 30px 40px;
          margin: 0;
          background-color: #FFFFFF;
        }

        .discover-banner-merged {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          height: 500px;
        }

        .discover-banner-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .discover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 50px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 100%);
          gap: 20px;
        }

        .discover-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 36px;
          font-weight: 700;
          color: #333333;
          letter-spacing: 0.05em;
          max-width: 400px;
        }

        .discover-text {
          font-size: 16px;
          color: #666666;
          line-height: 1.6;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          font-weight: 300;
          max-width: 400px;
        }

        .btn-secondary {
          background-color: #C41E3A;
          color: #FFFFFF;
          padding: 14px 40px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
          margin-top: 12px;
          border-radius: 4px;
        }

        .btn-secondary:hover {
          background-color: #A01830;
          color: #FFFFFF;
        }

        /* ===== SECTION ===== */
        .section {
          padding: 30px 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 48px;
          font-weight: 700;
          color: #333333;
          text-align: center;
          margin-bottom: 25px;
          letter-spacing: 0.05em;
        }

        /* ===== PRODUCTS GRID ===== */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 50px;
          margin-bottom: 0;
        }

        .product-card {
          text-align: center;
          transition: transform 0.3s ease;
          background-color: #FFFFFF;
          padding: 12px;
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

        /* ===== FEATURED BANNER SECTION ===== */
        .featured-banner-section {
          padding: 30px 40px;
          margin: 0;
          background-color: #FFFFFF;
        }

        .featured-banner {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          height: 400px;
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .banner-content {
          position: absolute;
          bottom: 30px;
          left: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .banner-label {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 36px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .banner-btn {
          background-color: #C41E3A;
          color: #FFFFFF;
          border: none;
          padding: 12px 28px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          letter-spacing: 0.5px;
          width: fit-content;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .banner-btn:hover {
          background-color: #A01830;
        }

        /* ===== SHOP BY ELEMENT ===== */
        .element-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 40px;
          margin-bottom: 0;
        }

        .element-card {
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease;
          text-decoration: none;
          color: inherit;
        }

        .element-card:hover {
          transform: scale(1.08);
        }

        .element-circle {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          margin: 0 auto 12px;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .element-card:hover .element-circle {
          box-shadow: 0 8px 25px rgba(196, 30, 58, 0.2);
        }

        .element-name {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          letter-spacing: 0.05em;
        }

        /* ===== REVIEWS SECTION ===== */
        .reviews-section {
          background-color: #FAFAFA;
          padding: 30px 40px;
          margin: 0;
        }

        .reviews-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .reviews-title {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 32px;
          font-weight: 700;
          color: #333333;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: 0.05em;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .review-card {
          background-color: #FFFFFF;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }

        .review-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .review-stars {
          font-size: 16px;
          color: #FFD700;
          margin-bottom: 12px;
        }

        .review-text {
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
          margin-bottom: 15px;
          font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
          font-weight: 300;
        }

        .review-author {
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          letter-spacing: 0.5px;
        }

        /* ===== FOOTER ===== */
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

        .newsletter-box {
          margin-bottom: 15px;
        }

        .newsletter-box h3 {
          font-family: 'Playfair Display', 'Noto Serif SC', serif;
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }

        .newsletter-box p {
          font-size: 13px;
          color: #666;
          margin-bottom: 8px;
        }

        .newsletter-input {
          display: flex;
          gap: 10px;
        }

        .newsletter-input input {
          flex: 1;
          padding: 9px 12px;
          background-color: #F9F9F9;
          border: 1px solid #E8E8E8;
          font-size: 13px;
          transition: border-color 0.3s ease;
        }

        .newsletter-input input:focus {
          outline: none;
          border-color: #C41E3A;
        }

        .newsletter-input button {
          padding: 9px 22px;
          background-color: #C41E3A;
          color: #FFFFFF;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .newsletter-input button:hover {
          background-color: #A01830;
        }

        .social-icons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 15px;
        }

        .social-icons a {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F5F5F5;
          border-radius: 50%;
          color: #333333;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .social-icons a:hover {
          background-color: #C41E3A;
          color: #FFFFFF;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 15px;
          border-top: 1px solid #E8E8E8;
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

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 42px;
          }

          .element-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .reviews-grid {
            grid-template-columns: 1fr;
          }

          .footer-top {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/首页视频.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Awaken Your True Potential</h1>
          <p className="hero-subtitle">Handcrafted artisan jewelry aligned with the Five Elements</p>
          <button onClick={scrollToShop} className="btn-primary">
            Shop Now
          </button>
        </div>
      </section>

      {/* DISCOVER ELEMENT BANNER SECTION */}
      <section className="discover-banner-section">
        <div className="discover-banner-merged">
          <img src="/products/bazi-section-bg.png" alt="Discover Your Missing Element" className="discover-banner-bg" />
          <div className="discover-overlay">
            <h2 className="discover-title">Discover Your Missing Element</h2>
            <p className="discover-text">
              Get your personalized BaZi energy report and find the perfect cosmic jewelry to harmonize your five elements. Our ancient wisdom combined with modern craftsmanship will guide you to your true cosmic blueprint.
            </p>
            <button className="btn-secondary">Calculate Now</button>
          </div>
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="section">
        <h2 className="section-title">Best Sellers</h2>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/products/product-1.png" alt="Cosmic Turquoise Bracelet" className="product-image" />
            </div>
            <div className="product-name">Cosmic Turquoise Bracelet</div>
            <div className="product-element">🌊 Water Element</div>
            <div className="product-price">$226.00</div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/products/product-2.png" alt="Imperial Jasper Bracelet" className="product-image" />
            </div>
            <div className="product-name">Imperial Jasper Bracelet</div>
            <div className="product-element">✨ Metal Element</div>
            <div className="product-price">$183.00</div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/products/product-3.png" alt="Santa Maria Aquamarine" className="product-image" />
            </div>
            <div className="product-name">Santa Maria Aquamarine</div>
            <div className="product-element">🌊 Water Element</div>
            <div className="product-price">$2,524.00</div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/products/product-4.png" alt="Labradorite Bracelet" className="product-image" />
            </div>
            <div className="product-name">Labradorite Bracelet</div>
            <div className="product-element">🌿 Wood Element</div>
            <div className="product-price">$310.00</div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/products/product-5.png" alt="Blue Aventurine Bracelet" className="product-image" />
            </div>
            <div className="product-name">Blue Aventurine Bracelet</div>
            <div className="product-element">🌊 Water Element</div>
            <div className="product-price">$310.00</div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/products/product-6.png" alt="Tiger Eye - Hematite Pair" className="product-image" />
            </div>
            <div className="product-name">Tiger Eye - Hematite Pair</div>
            <div className="product-element">🔥 Fire Element</div>
            <div className="product-price">$60.00</div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/products/product-7.png" alt="Lava Bracelet" className="product-image" />
            </div>
            <div className="product-name">Lava Bracelet</div>
            <div className="product-element">🔥 Fire Element</div>
            <div className="product-price">$310.00</div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/products/product-8.png" alt="Dragon Blood Jasper" className="product-image" />
            </div>
            <div className="product-name">Dragon Blood Jasper</div>
            <div className="product-element">🌍 Earth Element</div>
            <div className="product-price">$297.00</div>
          </div>
        </div>
      </section>

      {/* FEATURED BANNER SECTION */}
      <section className="featured-banner-section">
        <div className="featured-banner">
          <img src="/products/banner-new-arrivals.png" alt="New Arrivals" className="banner-image" />
          <div className="banner-content">
            <div className="banner-label">New Arrivals</div>
            <a href="#" className="banner-btn">View Products</a>
          </div>
        </div>
      </section>

      {/* SHOP BY ELEMENT SECTION */}
      <section className="section">
        <h2 className="section-title">Shop by Element</h2>
        <div className="element-grid">
          <a href="#" className="element-card">
            <div className="element-circle" style={{ backgroundImage: "url('/green-forest.png')" }}></div>
            <div className="element-name">🌿 Wood</div>
          </a>

          <a href="#" className="element-card">
            <div className="element-circle" style={{ backgroundImage: "url('/fire-flame.jpg')" }}></div>
            <div className="element-name">🔥 Fire</div>
          </a>

          <a href="#" className="element-card">
            <div className="element-circle" style={{ backgroundImage: "url('/earth-desert.png')" }}></div>
            <div className="element-name">🌍 Earth</div>
          </a>

          <a href="#" className="element-card">
            <div className="element-circle" style={{ backgroundImage: "url('/metal-gold.png')" }}></div>
            <div className="element-name">✨ Metal</div>
          </a>

          <a href="#" className="element-card">
            <div className="element-circle" style={{ backgroundImage: "url('/water-stream.png')" }}></div>
            <div className="element-name">🌊 Water</div>
          </a>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="reviews-section">
        <div className="reviews-container">
          <h2 className="reviews-title">Customer Reviews</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <div className="review-text">This bracelet perfectly matches my missing water element! I felt the energy shift within days. Highly recommend!</div>
              <div className="review-author">Sarah M.</div>
            </div>

            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <div className="review-text">The BaZi calculator is incredibly accurate. The personalized recommendations helped me choose the perfect piece for my energy needs.</div>
              <div className="review-author">David Chen</div>
            </div>

            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <div className="review-text">Beautiful craftsmanship and the energy is real! I've noticed positive changes in my life since wearing this. Worth every penny!</div>
              <div className="review-author">Emma L.</div>
            </div>

            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <div className="review-text">I bought this as a gift for my sister based on her BaZi chart. She absolutely loves it and says it brings her good luck!</div>
              <div className="review-author">Michael W.</div>
            </div>

            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <div className="review-text">The attention to detail is amazing. Each piece feels special and the energy alignment with my birth chart is spot on!</div>
              <div className="review-author">Jessica R.</div>
            </div>

            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <div className="review-text">Finally found jewelry that actually works with my energy! The BaZi analysis was so detailed and helpful. Best purchase ever!</div>
              <div className="review-author">Lisa T.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP SECTION - Cart Component */}
      <section className="section" ref={shopRef}>
        <Cart />
      </section>

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
              <div className="newsletter-box">
                <h3>Join Our Journey</h3>
                <p>Subscribe to receive exclusive offers and cosmic insights</p>
                <div className="newsletter-input">
                  <input type="email" placeholder="Enter your email" />
                  <button>Subscribe</button>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>Follow Us</p>
                <div className="social-icons">
                  <a href="#">📷</a>
                  <a href="#">f</a>
                  <a href="#">𝕏</a>
                  <a href="#">♪</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024 the wu lab. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

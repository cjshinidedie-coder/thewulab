'use client';                                                                 

  import { useRef, useState } from 'react';
  import Link from 'next/link';
  import { Cart } from '@/components/Cart';

  export default function Home() {
    const shopRef = useRef<HTMLDivElement>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    const scrollToShop = () => {
      shopRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleFavorite = (productId: string) => {
      setFavorites(prev =>
        prev.includes(productId)
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );
    };

    const products = [
      {
        id: '1',
        name: 'Cosmic Turquoise Bracelet',
        element: '🌊 Water Element',
        price: '$226.00',
        image: '/product-1.png'
      },
      {
        id: '2',
        name: 'Imperial Jasper Bracelet',
        element: '✨ Metal Element',
        price: '$183.00',
        image: '/product-2.png'
      },
      {
        id: '3',
        name: 'Santa Maria Aquamarine',
        element: '🌊 Water Element',
        price: '$2,524.00',
        image: '/product-3.png'
      },
      {
        id: '4',
        name: 'Labradorite Bracelet',
        element: '🌿 Wood Element',
        price: '$310.00',
        image: '/product-4.png'
      },
      {
        id: '5',
        name: 'Blue Aventurine Bracelet',
        element: '🌊 Water Element',
        price: '$310.00',
        image: '/product-5.png'
      },
      {
        id: '6',
        name: 'Tiger Eye - Hematite Pair',
        element: '🔥 Fire Element',
        price: '$60.00',
        image: '/product-6.png'
      },
      {
        id: '7',
        name: 'Lava Bracelet',
        element: '🔥 Fire Element',
        price: '$310.00',
        image: '/product-7.png'
      },
      {
        id: '8',
        name: 'Dragon Blood Jasper',
        element: '🌍 Earth Element',
        price: '$297.00',
        image: '/product-8.png'
      }
    ];

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
            background: linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%,
  rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 100%);
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

          /* ===== SWIPER CAROUSEL STYLES ===== */
          .swiper {
            width: 100%;
            padding: 10px 0;
            position: relative;
            z-index: 10;
            overflow-x: auto;
            scroll-behavior: smooth;
          }

          .swiper-wrapper {
            display: flex;
            gap: 30px;
          }

          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: stretch;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            flex-shrink: 0;
            width: calc(25% - 22.5px);
            min-width: 280px;
          }

          .swiper-slide img {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
            pointer-events: auto;
            display: block;
          }

          .swiper-slide .product-card {
            width: 100%;
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
            position: relative;
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
            cursor: pointer;
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
            background-color: transparent;
            transform: scale(1.15);
            box-shadow: none;
            color: #FFFFFF;
          }

          .favorite-btn.active {
            color: #C41E3A;
            font-size: 28px;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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

          .add-to-cart {
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
            flex: 1;
          }

          .product-card:hover .add-to-cart {
            opacity: 1;
            transform: translateY(0);
          }

          .add-to-cart:hover {
            background-color: #A01830;
          }

          .product-buttons {
            display: flex;
            gap: 10px;
            margin-top: 12px;
          }

          .buy-now {
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
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .product-card:hover .buy-now {
            opacity: 1;
            transform: translateY(0);
          }

          .buy-now:hover {
            background-color: #A01830;
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

          /* ===== TRUST SECTION ===== */
          .trust-section {
            background-color: #FFFFFF;
            padding: 30px 40px;
            margin: 0;
          }

          .trust-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            text-align: center;
          }

          .trust-item {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .trust-image {
            width: 100%;
            max-width: 80px;
            height: auto;
            margin-bottom: 15px;
            border-radius: 8px;
            object-fit: contain;
          }

          .trust-title {
            font-family: 'Playfair Display', 'Noto Serif SC', serif;
            font-size: 18px;
            font-weight: 600;
            color: #333333;
            margin-bottom: 6px;
            letter-spacing: 0.05em;
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

            .trust-container {
              grid-template-columns: repeat(2, 1fr);
            }

            .swiper-slide {
              width: calc(50% - 15px);
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
            <p className="hero-subtitle">Handcrafted artisan jewelry aligned
  with the Five Elements</p>
            <button onClick={scrollToShop} className="btn-primary">
              Shop Now
            </button>
          </div>
        </section>

        {/* DISCOVER ELEMENT BANNER SECTION */}
        <section className="discover-banner-section">
          <div className="discover-banner-merged">
            <img src="/missing-element.png" alt="Discover Your Missing Element"
  className="discover-banner-bg" />
            <div className="discover-overlay">
              <h2 className="discover-title">Discover Your Missing Element</h2>
              <p className="discover-text">
                Get your personalized BaZi energy report and find the perfect
  cosmic jewelry to harmonize your five elements. Our ancient wisdom combined
  with modern craftsmanship will guide you to your true cosmic blueprint.
              </p>
              <button className="btn-secondary">Calculate Now</button>
            </div>
          </div>
        </section>

        {/* BEST SELLERS SECTION - WITH SWIPER HORIZONTAL SCROLL */}
        <section className="section">
          <h2 className="section-title">Best Sellers</h2>
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              {products.map((product) => (
                <div key={product.id} className="swiper-slide">
                  <div className="product-card">
                    <div className="product-image-wrapper">
                      <Link href={`/product/${product.id}`}>
                        <img src={product.image} alt={product.name}
  className="product-image" />
                      </Link>
                      <button
                        className={`favorite-btn
  ${favorites.includes(product.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(product.id)}
                      >
                        ♡
                      </button>
                    </div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-element">{product.element}</div>
                    <div className="product-price">{product.price}</div>
                    <div className="product-buttons">
                      <Link href={`/product/${product.id}`} className="buy-now">
                        Buy Now
                      </Link>
                      <button className="add-to-cart">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED BANNER SECTION */}
        <section className="featured-banner-section">
          <div className="featured-banner">
            <img src="/new-arrivals.png" alt="New Arrivals"
  className="banner-image" />
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
              <div className="element-circle" style={{ backgroundImage:
  "url('/wood.png')" }}></div>
              <div className="element-name">🌿 Wood</div>
            </a>

            <a href="#" className="element-card">
              <div className="element-circle" style={{ backgroundImage:
  "url('/fire.png')" }}></div>
              <div className="element-name">🔥 Fire</div>
            </a>

            <a href="#" className="element-card">
              <div className="element-circle" style={{ backgroundImage:
  "url('/earth.png')" }}></div>
              <div className="element-name">🌍 Earth</div>
            </a>

            <a href="#" className="element-card">
              <div className="element-circle" style={{ backgroundImage:
  "url('/metal.png')" }}></div>
              <div className="element-name">✨ Metal</div>                      
            </a> 
                                                                                
            <a href="#" className="element-card">                               
              <div className="element-circle" style={{ backgroundImage: 
  "url('/water.png')" }}></div>
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
                <div className="review-text">This bracelet perfectly matches my
  missing water element! I felt the energy shift within days. Highly
  recommend!</div>
                <div className="review-author">Sarah M.</div>
              </div>

              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <div className="review-text">The BaZi calculator is incredibly
  accurate. The personalized recommendations helped me choose the perfect piece
  for my energy needs.</div>
                <div className="review-author">David Chen</div>
              </div>

              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <div className="review-text">Beautiful craftsmanship and the
  energy is real! I've noticed positive changes in my life since wearing this.
  Worth every penny!</div>
                <div className="review-author">Emma L.</div>
              </div>

              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <div className="review-text">I bought this as a gift for my
  sister based on her BaZi chart. She absolutely loves it and says it brings her
   good luck!</div>
                <div className="review-author">Michael W.</div>
              </div>

              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <div className="review-text">The attention to detail is amazing.
   Each piece feels special and the energy alignment with my birth chart is spot
   on!</div>
                <div className="review-author">Jessica R.</div>
              </div>

              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <div className="review-text">Finally found jewelry that actually
   works with my energy! The BaZi analysis was so detailed and helpful. Best
  purchase ever!</div>
                <div className="review-author">Lisa T.</div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SECTION - SERVICE ICONS */}
        <section className="trust-section">
          <div className="trust-container">
            <div className="trust-item">
              <img src="/trust-hands.png" alt="Handmade with Love" 
  className="trust-image" />
              <div className="trust-title">Handmade with Love</div>
            </div>

            <div className="trust-item">
              <img src="/trust-lucky.png" alt="Brings Good Fortune" 
  className="trust-image" />
              <div className="trust-title">Brings Good Fortune</div>
            </div>

            <div className="trust-item">
              <img src="/trust-secure.png" alt="Secure Payment" 
  className="trust-image" />
              <div className="trust-title">Secure Payment</div>
            </div>

            <div className="trust-item">
              <img src="/trust-gift.png" alt="Perfect Gift Choice" 
  className="trust-image" />
              <div className="trust-title">Perfect Gift Choice</div>
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
                  <p>Subscribe to receive exclusive offers and cosmic
  insights</p>
                  <div className="newsletter-input">
                    <input type="email" placeholder="Enter your email" />
                    <button>Subscribe</button>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#999', marginBottom: 
  '8px' }}>Follow Us</p>
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
              <p>© 2024 the wu lab. All rights reserved. | <a href="#">Privacy
  Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  ---
  商品详情页完整代码：app/product/[id]/page.tsx

  'use client';

  import { useState } from 'react';
  import Link from 'next/link';
  import { useParams } from 'next/navigation';

  export default function ProductDetail() {
    const params = useParams();
    const productId = params.id as string;
    const [quantity, setQuantity] = useState(1);

    // 商品数据库
    const products: Record<string, any> = {
      '1': {
        id: '1',
        name: 'Cosmic Turquoise Bracelet',
        element: '🌊 Water Element',
        price: 226.00,
        originalPrice: 226.00,
        image: '/product-1.png',
        description: 'Immerse yourself in the calming energy of this exquisite
  Cosmic Turquoise Bracelet. Handcrafted with precision, this piece embodies the
   essence of the Water element, promoting tranquility, communication, and
  emotional balance. Perfect for those seeking to harmonize their energy and
  embrace their true potential.',
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
        description: 'Elevate your presence with the Imperial Jasper Bracelet, a
   stunning representation of the Metal element. This luxurious piece combines
  elegance with powerful energy, promoting clarity, strength, and prosperity.
  Wear it to attract abundance and manifest your desires.',
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
        description: 'The crown jewel of our collection, the Santa Maria
  Aquamarine is a rare and precious gemstone that embodies the highest
  vibrations of the Water element. This exceptional piece promotes deep
  spiritual connection, clarity of purpose, and profound inner peace.',
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
        description: 'Discover the transformative power of Labradorite, a stone
  of change and new beginnings. This Wood element bracelet supports growth,
  creativity, and personal transformation. Perfect for those embarking on new
  journeys and seeking to unlock their potential.',
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
        description: 'Embrace serenity with the Blue Aventurine Bracelet, a
  gentle yet powerful Water element piece. This calming stone promotes inner
  peace, emotional healing, and harmonious relationships. Ideal for those
  seeking balance and tranquility in their lives.',
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
        description: 'Harness the power of dual Fire element stones with this
  Tiger Eye and Hematite pairing. This dynamic combination promotes courage,
  grounding, and protective energy. Perfect for those seeking strength and
  stability in their daily lives.',
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
        description: 'Channel the raw power of the Fire element with our Lava
  Bracelet. This bold and energetic piece promotes passion, vitality, and
  transformation. Wear it to ignite your inner fire and manifest your deepest
  desires.',
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
        description: 'Ground yourself with the powerful Dragon Blood Jasper, an
  Earth element stone of strength and vitality. This rare gemstone promotes
  courage, endurance, and deep connection to the earth. Perfect for those
  seeking stability and inner strength.',
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
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1>Product not found</h1>
          <Link href="/">Back to Home</Link>
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

          .breadcrumb {
            margin-bottom: 30px;
            font-size: 13px;
          }

          .breadcrumb a {
            color: #C41E3A;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .breadcrumb a:hover {
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
          }
        `}</style>

        <div className="product-detail-container">
          <Link href="/" className="back-link">← Back to Home</Link>

          <div className="product-grid">
            {/* Product Image */}
            <div className="product-image-section">
              <img src={product.image} alt={product.name} 
  className="product-main-image" />
            </div>

            {/* Product Info */}
            <div className="product-info-section">
              <div className="product-element-badge">{product.element}</div>

              <h1 className="product-title">{product.name}</h1>

              <div className="product-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-text">(128 reviews)</span>
              </div>

              <div className="product-price-section">
                <div className="price-display">
                  <span 
  className="current-price">${product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span 
  className="original-price">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#666666' }}>Free shipping
  on orders over $100</p>
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-features">
                <h3 className="features-title">Key Features</h3>
                <ul className="features-list">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="quantity-section">
                <label className="quantity-label">Quantity:</label>
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
                    onChange={(e) => setQuantity(Math.max(1,
  parseInt(e.target.value) || 1))}
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
                <button className="btn-add-cart">Add to Cart</button>
                <button className="btn-favorite">♡</button>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#FFE8E8',
  borderRadius: '8px', marginTop: '20px' }}>
                <p style={{ fontSize: '13px', color: '#C41E3A', fontWeight: 
  '600', marginBottom: '8px' }}>✨ Energy Alignment</p>
                <p style={{ fontSize: '13px', color: '#666666', lineHeight: 
  '1.6' }}>
                  This {product.element} piece is carefully crafted to harmonize
   with your energy. Wear it close to your heart to experience its
  transformative power and align with your true potential.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px 
  solid #E8E8E8' }}>
            <h2 style={{ fontFamily: "'Playfair Display', 'Noto Serif SC',
  serif", fontSize: '32px', fontWeight: '700', marginBottom: '30px', textAlign: 
  'center' }}>
              You May Also Like
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 
  'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {Object.values(products)
                .filter((p: any) => p.id !== productId)
                .slice(0, 4)
                .map((relatedProduct: any) => (
                  <Link key={relatedProduct.id} 
  href={`/product/${relatedProduct.id}`} style={{ textDecoration: 'none', color:
   'inherit' }}>
                    <div style={{ cursor: 'pointer', transition: 'transform 0.3s
   ease' }} onMouseEnter={(e) => e.currentTarget.style.transform =
  'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform =
  'translateY(0)'}>
                      <img src={relatedProduct.image} alt={relatedProduct.name} 
  style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 
  '8px', marginBottom: '12px' }} />
                      <p style={{ fontFamily: "'Playfair Display', 'Noto Serif 
  SC', serif", fontSize: '16px', fontWeight: '600', marginBottom: '6px'
  }}>{relatedProduct.name}</p>
                      <p style={{ fontSize: '13px', color: '#C41E3A',
  marginBottom: '8px' }}>{relatedProduct.element}</p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: 
  '#333333' }}>${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }


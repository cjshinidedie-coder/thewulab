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
      {/* HERO SECTION */}
      <section className="hero-section">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Awaken Your True Potential</h1>
          <p className="hero-subtitle">Handcrafted artisan jewelry aligned with the Five Elements</p>
          <button
            onClick={scrollToShop}
            className="btn-primary"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* SHOP SECTION */}
      <div ref={shopRef} className="py-8">
        <Cart />
      </div>

      <style jsx>{`
        .hero-section {
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

        .hero-title {
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

        @media (max-width: 768px) {
          .hero-title {
            font-size: 42px;
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Cart } from '@/components/Cart';
import { useApp } from '@/app/context/AppContext';

export default function Home() {
  const shopRef = useRef<HTMLDivElement>(null);
  const { language, addToCart, toggleFavorite, favorites } = useApp();

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 多语言文案
  const translations = {
    en: {
      heroTitle: 'Awaken Your True Potential',
      heroSubtitle: 'Handcrafted artisan jewelry aligned with the Five Elements',
      shopNow: 'Shop Now',
      discoverTitle: 'Discover Your Missing Element',
      discoverText: 'Get your personalized BaZi energy report and find the perfect cosmic jewelry to harmonize your five elements. Our ancient wisdom combined with modern craftsmanship will guide you to your true cosmic blueprint.',
      calculateNow: 'Calculate Now',
      bestSellers: 'Best Sellers',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      newArrivals: 'New Arrivals',
      viewProducts: 'View Products',
      shopByElement: 'Shop by Element',
      wood: '🌿 Wood',
      fire: '🔥 Fire',
      earth: '🌍 Earth',
      metal: '✨ Metal',
      water: '🌊 Water',
      customerReviews: 'Customer Reviews',
      handmadeWithLove: 'Handmade with Love',
      bringsGoodFortune: 'Brings Good Fortune',
      securePayment: 'Secure Payment',
      perfectGiftChoice: 'Perfect Gift Choice',
      shop: 'Shop',
      allBracelets: 'All Bracelets',
      newArrivalsLink: 'New Arrivals',
      bestSellersLink: 'Best Sellers',
      sale: 'Sale',
      customerCare: 'Customer Care',
      contactUs: 'Contact Us',
      shippingInfo: 'Shipping Info',
      returnsExchanges: 'Returns & Exchanges',
      faq: 'FAQ',
      about: 'About',
      ourStory: 'Our Story',
      craftsmanship: 'Craftsmanship',
      energyWork: 'Energy Work',
      blog: 'Blog',
      joinOurJourney: 'Join Our Journey',
      subscribeText: 'Subscribe to receive exclusive offers and cosmic insights',
      enterEmail: 'Enter your email',
      subscribe: 'Subscribe',
      followUs: 'Follow Us',
      copyright: '© 2024 the wu lab. All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
    },
    zh: {
      heroTitle: '唤醒你的真实潜能',
      heroSubtitle: '与五行元素相协调的手工艺术珠宝',
      shopNow: '立即购物',
      discoverTitle: '发现你缺失的元素',
      discoverText: '获取个性化的八字能量报告，找到完美的宇宙珠宝来协调你的五行元素。我们的古老智慧与现代工艺相结合，将引导你找到真正的宇宙蓝图。',
      calculateNow: '立即计算',
      bestSellers: '热销商品',
      addToCart: '加入购物车',
      buyNow: '立即购买',
      newArrivals: '新品上市',
      viewProducts: '查看商品',
      shopByElement: '按元素购物',
      wood: '🌿 木',
      fire: '🔥 火',
      earth: '🌍 土',
      metal: '✨ 金',
      water: '🌊 水',
      customerReviews: '客户评价',
      handmadeWithLove: '用爱手工制作',
      bringsGoodFortune: '带来好运',
      securePayment: '安全支付',
      perfectGiftChoice: '完美礼物选择',
      shop: '购物',
      allBracelets: '所有手链',
      newArrivalsLink: '新品上市',
      bestSellersLink: '热销商品',
      sale: '促销',
      customerCare: '客户服务',
      contactUs: '联系我们',
      shippingInfo: '运费信息',
      returnsExchanges: '退货和换货',
      faq: '常见问题',
      about: '关于',
      ourStory: '我们的故事',
      craftsmanship: '工艺',
      energyWork: '能量工作',
      blog: '博客',
      joinOurJourney: '加入我们的旅程',
      subscribeText: '订阅以获取独家优惠和宇宙见解',
      enterEmail: '输入您的邮箱',
      subscribe: '订阅',
      followUs: '关注我们',
      copyright: '© 2024 the wu lab. 版权所有。',
      privacyPolicy: '隐私政策',
      termsOfService: '服务条款',
    }
  };

  const t = translations[language];

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
            <h1>{t.heroTitle}</h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <button onClick={scrollToShop} className="btn-primary">
              {t.shopNow}
            </button>
          </div>
        </section>

        {/* DISCOVER ELEMENT BANNER SECTION */}
        <section className="discover-banner-section">
          <div className="discover-banner-merged">
            <img src="/missing-element.png" alt="Discover Your Missing Element"
  className="discover-banner-bg" />
            <div className="discover-overlay">
              <h2 className="discover-title">{t.discoverTitle}</h2>
              <p className="discover-text">
                {t.discoverText}
              </p>
              <button className="btn-secondary">{t.calculateNow}</button>
            </div>
          </div>
        </section>

        {/* BEST SELLERS SECTION - WITH SWIPER HORIZONTAL SCROLL */}
        <section className="section">
          <h2 className="section-title">{t.bestSellers}</h2>
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
                        {t.buyNow}
                      </Link>
                      <button className="add-to-cart" onClick={addToCart}>{t.addToCart}</button>
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
              <div className="banner-label">{t.newArrivals}</div>
              <Link href="/product/1" className="banner-btn">{t.viewProducts}</Link>
            </div>
          </div>
        </section>

        {/* SHOP BY ELEMENT SECTION */}
        <section className="section">
          <h2 className="section-title">{t.shopByElement}</h2>
          <div className="element-grid">
            <Link href="/product/4" className="element-card">
              <div className="element-circle" style={{ backgroundImage:
  "url('/wood.png')" }}></div>
              <div className="element-name">{t.wood}</div>
            </Link>

            <Link href="/product/6" className="element-card">
              <div className="element-circle" style={{ backgroundImage:
  "url('/fire.png')" }}></div>
              <div className="element-name">{t.fire}</div>
            </Link>

            <Link href="/product/8" className="element-card">
              <div className="element-circle" style={{ backgroundImage:
  "url('/earth.png')" }}></div>
              <div className="element-name">{t.earth}</div>
            </Link>

            <Link href="/product/2" className="element-card">
              <div className="element-circle" style={{ backgroundImage:
  "url('/metal.png')" }}></div>
              <div className="element-name">{t.metal}</div>
            </Link>

            <Link href="/product/1" className="element-card">
              <div className="element-circle" style={{ backgroundImage:
  "url('/water.png')" }}></div>
              <div className="element-name">{t.water}</div>
            </Link>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="reviews-section">
          <div className="reviews-container">
            <h2 className="reviews-title">{t.customerReviews}</h2>
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
              <div className="trust-title">{t.handmadeWithLove}</div>
            </div>

            <div className="trust-item">
              <img src="/trust-lucky.png" alt="Brings Good Fortune"
  className="trust-image" />
              <div className="trust-title">{t.bringsGoodFortune}</div>
            </div>

            <div className="trust-item">
              <img src="/trust-secure.png" alt="Secure Payment"
  className="trust-image" />
              <div className="trust-title">{t.securePayment}</div>
            </div>

            <div className="trust-item">
              <img src="/trust-gift.png" alt="Perfect Gift Choice"
  className="trust-image" />
              <div className="trust-title">{t.perfectGiftChoice}</div>
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
                <h3>{t.shop}</h3>
                <ul>
                  <li><a href="#">{t.allBracelets}</a></li>
                  <li><a href="#">{t.newArrivalsLink}</a></li>
                  <li><a href="#">{t.bestSellersLink}</a></li>
                  <li><a href="#">{t.sale}</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>{t.customerCare}</h3>
                <ul>
                  <li><a href="#">{t.contactUs}</a></li>
                  <li><a href="#">{t.shippingInfo}</a></li>
                  <li><a href="#">{t.returnsExchanges}</a></li>
                  <li><a href="#">{t.faq}</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>{t.about}</h3>
                <ul>
                  <li><a href="#">{t.ourStory}</a></li>
                  <li><a href="#">{t.craftsmanship}</a></li>
                  <li><a href="#">{t.energyWork}</a></li>
                  <li><a href="#">{t.blog}</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <div className="newsletter-box">
                  <h3>{t.joinOurJourney}</h3>
                  <p>{t.subscribeText}</p>
                  <div className="newsletter-input">
                    <input type="email" placeholder={t.enterEmail} />
                    <button>{t.subscribe}</button>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#999', marginBottom:
  '8px' }}>{t.followUs}</p>
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
              <p>{t.copyright} | <a href="#">{t.privacyPolicy}</a> | <a href="#">{t.termsOfService}</a></p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
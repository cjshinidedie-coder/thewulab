'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';

export default function Home() {
  const shopRef = useRef<HTMLDivElement>(null);
  const { language } = useApp();

  const t = language === 'en' ? {
    heroTitle: 'Awaken Your True Potential',
    heroSubtitle: 'Handcrafted artisan jewelry aligned with the Five Elements',
    shopNow: 'Shop Now',
    newArrivals: 'New Arrivals',
    viewProducts: 'View Products',
    shopByElement: 'Shop by Element',
    wood: '🌿 Wood',
    fire: '🔥 Fire',
    earth: '🌍 Earth',
    metal: '✨ Metal',
    water: '🌊 Water',
    handmadeWithLove: 'Handmade with Love',
    bringsGoodFortune: 'Brings Good Fortune',
    securePayment: 'Secure Payment',
    perfectGiftChoice: 'Perfect Gift Choice',
    copyright: '© 2024 the wu lab. All rights reserved.',
  } : {
    heroTitle: '唤醒你的真实潜能',
    heroSubtitle: '与五行元素相协调的手工艺术珠宝',
    shopNow: '立即购物',
    newArrivals: '新品上市',
    viewProducts: '查看商品',
    shopByElement: '按元素购物',
    wood: '🌿 木',
    fire: '🔥 火',
    earth: '🌍 土',
    metal: '✨ 金',
    water: '🌊 水',
    handmadeWithLove: '用爱手工制作',
    bringsGoodFortune: '带来好运',
    securePayment: '安全支付',
    perfectGiftChoice: '完美礼物选择',
    copyright: '© 2024 the wu lab. 版权所有。',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/首页视频.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white max-w-3xl px-6 z-10">
          <h1 className="font-serif text-7xl md:text-8xl font-bold mb-6 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl font-light mb-12 tracking-wide">
            {t.heroSubtitle}
          </p>
          <Link
            href="/shop"
            className="inline-block bg-red-700 hover:bg-red-800 text-white px-14 py-4 rounded text-sm font-semibold uppercase tracking-widest transition-colors"
          >
            {t.shopNow}
          </Link>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src="/new-arrivals.png"
              alt="New Arrivals"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25 flex items-center justify-start pl-12">
              <div className="text-white">
                <h2 className="font-serif text-6xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t.newArrivals}
                </h2>
                <Link
                  href="/new-arrivals"
                  className="inline-block bg-white text-gray-900 px-10 py-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  {t.viewProducts}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Element */}
      <section ref={shopRef} className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-6xl font-bold text-center mb-24 text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t.shopByElement}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            {[
              { name: t.wood, emoji: '🌿', color: 'from-green-100 to-green-50', href: '/category/wood' },
              { name: t.fire, emoji: '🔥', color: 'from-red-100 to-red-50', href: '/category/fire' },
              { name: t.earth, emoji: '🌍', color: 'from-yellow-100 to-yellow-50', href: '/category/earth' },
              { name: t.metal, emoji: '✨', color: 'from-gray-100 to-gray-50', href: '/category/metal' },
              { name: t.water, emoji: '🌊', color: 'from-blue-100 to-blue-50', href: '/category/water' },
            ].map((element) => (
              <Link key={element.name} href={element.href} className="group text-center cursor-pointer">
                <div className={`w-full aspect-square rounded-full bg-gradient-to-br ${element.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
                  <span className="text-8xl">{element.emoji}</span>
                </div>
                <p className="text-2xl font-serif font-semibold text-gray-900 group-hover:text-red-700 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {element.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl mb-4">🤝</div>
              <p className="font-serif text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.handmadeWithLove}
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">✨</div>
              <p className="font-serif text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.bringsGoodFortune}
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">🔒</div>
              <p className="font-serif text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.securePayment}
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">🎁</div>
              <p className="font-serif text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.perfectGiftChoice}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            {t.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}

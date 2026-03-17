'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useApp } from '@/app/context/AppContext';

export default function Home() {
  const shopRef = useRef<HTMLDivElement>(null);
  const { language } = useApp();

  const t = language === 'en' ? {
    heroTitle: 'Awaken Your True Potential',
    heroSubtitle: 'Handcrafted artisan jewelry aligned with the Five Elements',
    shopNow: 'Shop Now',
    newArrivals: 'New Arrivals',
    shopByElement: 'Shop by Element',
    wood: '🌿 Wood',
    fire: '🔥 Fire',
    earth: '🌍 Earth',
    metal: '✨ Metal',
    water: '🌊 Water',
  } : {
    heroTitle: '唤醒你的真实潜能',
    heroSubtitle: '与五行元素相协调的手工艺术珠宝',
    shopNow: '立即购物',
    newArrivals: '新品上市',
    shopByElement: '按元素购物',
    wood: '🌿 木',
    fire: '🔥 火',
    earth: '🌍 土',
    metal: '✨ 金',
    water: '🌊 水',
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

        <div className="relative text-center text-white max-w-3xl px-4 z-10">
          <h1 className="font-serif text-6xl md:text-7xl font-bold mb-6 tracking-wide">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl font-light mb-10 tracking-wide">
            {t.heroSubtitle}
          </p>
          <Link
            href="/shop"
            className="inline-block bg-red-700 hover:bg-red-800 text-white px-12 py-4 rounded text-sm font-semibold uppercase tracking-widest transition-colors"
          >
            {t.shopNow}
          </Link>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 rounded-lg overflow-hidden bg-gray-200">
            <img
              src="/new-arrivals.png"
              alt="New Arrivals"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="font-serif text-5xl font-bold mb-8">{t.newArrivals}</h2>
                <Link
                  href="/new-arrivals"
                  className="inline-block bg-white text-gray-900 px-10 py-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Element */}
      <section ref={shopRef} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-5xl font-bold text-center mb-20 text-gray-900">
            {t.shopByElement}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {[
              { name: t.wood, emoji: '🌿', href: '/category/wood' },
              { name: t.fire, emoji: '🔥', href: '/category/fire' },
              { name: t.earth, emoji: '🌍', href: '/category/earth' },
              { name: t.metal, emoji: '✨', href: '/category/metal' },
              { name: t.water, emoji: '🌊', href: '/category/water' },
            ].map((element) => (
              <Link
                key={element.name}
                href={element.href}
                className="group text-center"
              >
                <div className="w-full aspect-square rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                  <span className="text-7xl">{element.emoji}</span>
                </div>
                <p className="text-xl font-serif font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                  {element.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <p className="font-semibold text-gray-900">Handmade with Love</p>
            </div>
            <div>
              <div className="text-4xl mb-4">✨</div>
              <p className="font-semibold text-gray-900">Brings Good Fortune</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔒</div>
              <p className="font-semibold text-gray-900">Secure Payment</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎁</div>
              <p className="font-semibold text-gray-900">Perfect Gift Choice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2024 the wu lab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

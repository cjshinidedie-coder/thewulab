'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src="/首页视频.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 -z-10"></div>

        <div className="text-center text-white max-w-2xl px-4">
          <h1 className="text-6xl font-serif font-bold mb-4">
            Awaken Your True Potential
          </h1>
          <p className="text-xl mb-8 font-light">
            Handcrafted artisan jewelry aligned with the Five Elements
          </p>
          <Link
            href="/shop"
            className="inline-block bg-red-700 text-white px-12 py-4 rounded text-sm font-semibold uppercase tracking-widest hover:bg-red-800 transition-colors"
          >
            Shop Now
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
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-serif font-bold mb-6">New Arrivals</h2>
                <Link
                  href="/new-arrivals"
                  className="inline-block bg-white text-gray-900 px-8 py-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Element */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">
            Shop by Element
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Wood', emoji: '🌿', href: '/category/wood' },
              { name: 'Fire', emoji: '🔥', href: '/category/fire' },
              { name: 'Earth', emoji: '🌍', href: '/category/earth' },
              { name: 'Metal', emoji: '✨', href: '/category/metal' },
              { name: 'Water', emoji: '🌊', href: '/category/water' },
            ].map((element) => (
              <Link
                key={element.name}
                href={element.href}
                className="group text-center hover:opacity-80 transition-opacity"
              >
                <div className="w-full aspect-square rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
                  <span className="text-6xl">{element.emoji}</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{element.name}</p>
              </Link>
            ))}
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

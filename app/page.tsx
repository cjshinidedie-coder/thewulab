'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold text-gray-900">the wu lab</div>
          <div className="flex gap-8">
            <Link href="/shop" className="text-sm font-semibold text-gray-900 hover:text-red-700">Shop</Link>
            <Link href="/new-arrivals" className="text-sm font-semibold text-gray-900 hover:text-red-700">New</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/首页视频.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white max-w-4xl px-6 z-10">
          <h1 className="font-serif text-8xl md:text-9xl font-bold mb-8 tracking-wide" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.05em' }}>
            Awaken Your True Potential
          </h1>
          <p className="text-xl md:text-2xl font-light mb-16 tracking-wide" style={{ letterSpacing: '0.05em' }}>
            Handcrafted artisan jewelry aligned with the Five Elements
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/shop" className="inline-block bg-red-700 hover:bg-red-800 text-white px-16 py-4 rounded text-sm font-semibold uppercase tracking-widest transition-all hover:shadow-lg">
              Shop All
            </Link>
            <Link href="/new-arrivals" className="inline-block bg-white/20 hover:bg-white/30 text-white px-16 py-4 rounded text-sm font-semibold uppercase tracking-widest transition-all hover:shadow-lg border border-white/50">
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Element */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-6xl font-bold text-center mb-24 text-gray-900" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.05em' }}>
            Shop by Element
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            {[
              { emoji: '🌿', name: 'Wood', href: '/category/wood', gradient: 'from-green-100 to-green-50' },
              { emoji: '🔥', name: 'Fire', href: '/category/fire', gradient: 'from-red-100 to-red-50' },
              { emoji: '🌍', name: 'Earth', href: '/category/earth', gradient: 'from-yellow-100 to-yellow-50' },
              { emoji: '✨', name: 'Metal', href: '/category/metal', gradient: 'from-gray-100 to-gray-50' },
              { emoji: '🌊', name: 'Water', href: '/category/water', gradient: 'from-blue-100 to-blue-50' },
            ].map((element) => (
              <Link key={element.name} href={element.href} className="group text-center">
                <div className={`w-full aspect-square rounded-full bg-gradient-to-br ${element.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
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
              <p className="font-serif text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Handmade with Love</p>
            </div>
            <div>
              <div className="text-5xl mb-4">✨</div>
              <p className="font-serif text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Brings Good Fortune</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🔒</div>
              <p className="font-serif text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Secure Payment</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🎁</div>
              <p className="font-serif text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Perfect Gift Choice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">© 2024 the wu lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

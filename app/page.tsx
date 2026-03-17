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
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/首页视频.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white max-w-3xl px-6 z-10">
          <h1 className="font-serif text-7xl md:text-8xl font-bold mb-6 tracking-wide">Awaken Your True Potential</h1>
          <p className="text-lg md:text-2xl font-light mb-12 tracking-wide">Handcrafted artisan jewelry aligned with the Five Elements</p>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/shop" className="group relative h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative text-center text-white z-10">
                <h2 className="font-serif text-5xl font-bold mb-4">Shop All</h2>
                <p className="text-lg">Explore our complete collection</p>
              </div>
            </Link>
            <Link href="/new-arrivals" className="group relative h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative text-center text-white z-10">
                <h2 className="font-serif text-5xl font-bold mb-4">New Arrivals</h2>
                <p className="text-lg">Discover what's new</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Five Elements */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-5xl font-bold text-center mb-20 text-gray-900">Shop by Element</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { emoji: '🌿', name: 'Wood', href: '/category/wood' },
              { emoji: '🔥', name: 'Fire', href: '/category/fire' },
              { emoji: '🌍', name: 'Earth', href: '/category/earth' },
              { emoji: '✨', name: 'Metal', href: '/category/metal' },
              { emoji: '🌊', name: 'Water', href: '/category/water' },
            ].map((element) => (
              <Link key={element.name} href={element.href} className="group text-center">
                <div className="w-full aspect-square rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl transition-all transform group-hover:scale-110">
                  <span className="text-7xl">{element.emoji}</span>
                </div>
                <p className="text-xl font-serif font-semibold text-gray-900 group-hover:text-red-700 transition-colors">{element.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">© 2024 the wu lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

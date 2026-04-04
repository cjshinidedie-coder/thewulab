'use client';

import { useApp } from '@/app/context/AppContext';

export default function BlogPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-12 tracking-wide font-light">
          {language === 'en' ? 'Cosmic Insights' : '宇宙见解'}
        </h1>

        <div className="space-y-6 text-stone-700 leading-relaxed text-base">
          <p>
            {language === 'en'
              ? 'Coming Soon...'
              : '敬请期待...'}
          </p>
          <p className="text-sm text-stone-500">
            {language === 'en'
              ? 'Explore more secrets about gemstone energy and celestial trajectories.'
              : '探寻更多关于宝石能量与星象轨迹的秘密。'}
          </p>
        </div>
      </div>
    </div>
  );
}

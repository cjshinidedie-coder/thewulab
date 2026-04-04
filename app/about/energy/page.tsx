'use client';

import { useApp } from '@/app/context/AppContext';

export default function EnergyWorkPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-center text-stone-800 mb-12 tracking-wide font-light">
          {language === 'en' ? 'Energy Work' : '能量注入'}
        </h1>

        <div className="space-y-6 text-stone-700 leading-relaxed text-base">
          <p>
            {language === 'en'
              ? 'Every piece that leaves The Wu Lab is not a cold commodity. Before dispatch, we perform specific frequency singing bowl purification and natural energy awakening rituals based on the customer\'s natal Five Elements, ensuring that the moment it touches your skin, it resonates perfectly with your energy field.'
              : '每一件离开 The Wu Lab 的饰品，都不是冰冷的商品。发货前，我们会根据顾客的本命五行，进行特定频率的音钵净化与自然能量唤醒仪式，确保它在触碰您肌肤的那一刻，便能与您的气场完美共振。'}
          </p>
        </div>
      </div>
    </div>
  );
}

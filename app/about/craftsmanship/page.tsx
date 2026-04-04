'use client';

import { useApp } from '@/app/context/AppContext';

export default function CraftsmanshipPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-center text-stone-800 mb-12 tracking-wide font-light">
          {language === 'en' ? 'Craftsmanship' : '极致工艺'}
        </h1>

        <div className="space-y-6 text-stone-700 leading-relaxed text-base">
          <p>
            {language === 'en'
              ? 'We reject assembly-line manufacturing. We uphold the restraint and purity of old-money elegance. All precious metal components are hand-polished and finished by experienced artisans. Each primary gemstone is rigorously selected according to the 4C standards, ensuring its brilliance and energy are in optimal condition.'
              : '拒绝流水线制造。我们坚持老钱风的克制与纯粹，所有贵金属部件均由经验丰富的工匠手工打磨、抛光。每一颗主石均经过严苛的 4C 标准筛选，确保其火彩与能量处于极佳状态。'}
          </p>
        </div>
      </div>
    </div>
  );
}

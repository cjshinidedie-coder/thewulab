'use client';

import { useApp } from '@/app/context/AppContext';

export default function OurStoryPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-center text-stone-800 mb-12 tracking-wide font-light">
          {language === 'en' ? 'Our Story' : '我们的故事'}
        </h1>

        <div className="space-y-6 text-stone-700 leading-relaxed text-base">
          <p>
            {language === 'en'
              ? 'The Wu Lab was born at the intersection of ancient Eastern wisdom and modern luxury aesthetics. "Wu" represents the flow of the Five Elements (Metal, Wood, Water, Fire, Earth) and symbolizes the origin of all things. We believe that the finest jewelry is not merely dazzling adornment, but a medium to awaken inner energy fields and balance life force.'
              : 'The Wu Lab 诞生于古老东方智慧与现代高奢美学的交汇处。「Wu」代表五行（金、木、水、火、土）的流转，也象征着万物（物）的本源。我们相信，顶级的珠宝不仅是璀璨的装饰，更是唤醒内在气场、平衡生命能量的媒介。'}
          </p>
        </div>
      </div>
    </div>
  );
}

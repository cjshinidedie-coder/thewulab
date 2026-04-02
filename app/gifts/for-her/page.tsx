'use client';

import Link from 'next/link';
import { useApp } from '@/app/context/AppContext';
import { giftProducts } from '@/src/data/gifts';

const forHerProducts = giftProducts.filter((p) => p.category === 'for-her');

const translations = {
  en: {
    title: 'Gifts For Her',
    subtitle: 'Sacred red strings for luck, protection, and infinite fortune.',
    currency: '$',
    backToHome: 'Back to Home',
  },
  zh: {
    title: '送给她的礼物',
    subtitle: '祈愿红绳，护佑安康与无尽好运。',
    currency: '¥',
    backToHome: '返回首页',
  },
};

export default function GiftsForHerPage() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Title area */}
      <section className="pt-20 pb-12 px-6 text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-[0.08em] text-stone-800 mb-5">
          {t.title}
        </h1>
        <p className="font-sans text-[15px] md:text-base font-light text-stone-500 tracking-wide leading-relaxed">
          {t.subtitle}
        </p>
      </section>

      {/* Product grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        {forHerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {forHerProducts.map((product) => (
              <div key={product.id} className="group text-center">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden bg-stone-50 mb-5">
                  <img
                    src={product.image}
                    alt={language === 'zh' ? product.name : product.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                {/* Info */}
                <h3 className="font-serif text-lg font-light tracking-wide text-stone-800 mb-1">
                  {language === 'zh' ? product.name : product.nameEn}
                </h3>
                <p className="font-sans text-sm font-light text-stone-500 tracking-wide">
                  {t.currency}{product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-stone-400 text-sm py-20">
            {language === 'zh' ? '暂无商品' : 'No products yet'}
          </p>
        )}
      </section>

      {/* Back link */}
      <div className="text-center pb-16">
        <Link
          href="/"
          className="font-sans text-[13px] tracking-[0.1em] uppercase text-stone-500 hover:text-[#C41E3A] transition-colors no-underline"
        >
          ← {t.backToHome}
        </Link>
      </div>
    </div>
  );
}

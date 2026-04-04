'use client';

import { useApp } from '@/app/context/AppContext';

export default function FAQPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-center text-stone-800 mb-12 tracking-wide font-light">
          {language === 'en' ? 'FAQ' : '常见问题'}
        </h1>

        <div className="space-y-10 text-stone-700 leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en'
                ? 'Q: How do I know which Five Elements gemstone suits me?'
                : 'Q: 如何知道我适合什么五行的宝石？'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'A: You can use our website\'s "BaZi Energy Calculator" tool. By entering your birth information, the system will calculate the most harmonious gemstones for you based on ancient Nayin principles.'
                : 'A: 您可以使用我们网站特设的「八字气场测算」工具，输入出生信息，系统将基于古法纳音为您推算出最契合的喜用神宝石。'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en'
                ? 'Q: How should I care for and cleanse my jewelry?'
                : 'Q: 首饰需要如何保养与消磁？'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'A: We recommend avoiding contact with chemicals and perfumes. Precious metal and gemstone components can be gently wiped with a soft cloth. To maintain the purity of crystal energy, we suggest placing your jewelry under the full moon overnight once a month for natural cleansing.'
                : 'A: 建议避免接触化学物品与香水。纯金与宝石部件可用软布轻拭；为保持晶石能量纯净，建议每月在满月光下静置一晚进行天然消磁。'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

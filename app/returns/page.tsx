'use client';

import { useApp } from '@/app/context/AppContext';

export default function ReturnsPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-center text-stone-800 mb-12 tracking-wide font-light">
          {language === 'en' ? 'Returns & Exchanges' : '退换货政策'}
        </h1>

        <div className="space-y-8 text-stone-700 leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en' ? '14-Day Promise' : '14天承诺'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'If you are not completely satisfied with your jewelry, we offer returns and exchanges within 14 days of receipt.'
                : '如果您对收到的饰品不完全满意，我们在您签收后的 14 天内提供退换货服务。'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en' ? 'Condition Requirements' : '状态要求'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'Returned jewelry must be unworn, in original condition, and accompanied by all original packaging and certificates of authenticity.'
                : '退回的饰品必须未经佩戴、保持原样，并附带所有原始包装与鉴定证书。'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en' ? 'Energy Customization Notice' : '能量定制声明'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'Due to the unique nature of our "Five Elements Customization" and "Bespoke Engraving" collections, once sold and energetically bonded with the wearer, these pieces cannot be returned or exchanged. We appreciate your understanding.'
                : '由于"五行定制"与"高定刻字"系列的特殊性，一旦售出且能量已与佩戴者绑定，恕不接受退换货，敬请谅解。'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en' ? 'Shipping Costs' : '邮费说明'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'For returns and exchanges not due to quality issues, return shipping costs are the responsibility of the customer.'
                : '非质量问题的退换货，寄回运费需由顾客自行承担。'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

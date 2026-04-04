'use client';

import { useApp } from '@/app/context/AppContext';

export default function ShippingPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-center text-stone-800 mb-12 tracking-wide font-light">
          {language === 'en' ? 'Shipping & Delivery' : '运费与配送'}
        </h1>

        <div className="space-y-8 text-stone-700 leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en' ? 'Global Complimentary Shipping' : '全球尊享配送'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'The Wu Lab offers complimentary worldwide shipping on all orders over $100.'
                : 'The Wu Lab 订单满 $100 即享全球免邮服务。'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en' ? 'Energy Purification Period' : '能量净化期'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'As each piece undergoes a dedicated energy purification and blessing ritual before dispatch, your order will be processed within 2-3 business days.'
                : '由于每件饰品在发货前均需经过专属的能量净化与祈福仪式，您的订单将在 2-3 个工作日内处理完毕。'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en' ? 'Delivery Timeframe' : '物流时效'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'Standard shipping typically takes 7-14 business days, while express delivery requires 3-5 business days. Upon dispatch, you will receive an email with your exclusive tracking number.'
                : '标准物流通常需要 7-14 个工作日，特快专递需 3-5 个工作日。发货后，您将收到包含专属追踪单号的邮件。'}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-stone-800 mb-3 font-light">
              {language === 'en' ? 'Luxury Packaging' : '奢华包装'}
            </h2>
            <p className="text-base">
              {language === 'en'
                ? 'All products are presented in The Wu Lab\'s bespoke premium velvet gift box with eco-friendly outer packaging, ensuring your energy gemstones arrive safely.'
                : '所有产品均配有 The Wu Lab 定制高级丝绒礼盒与环保外包装，确保您的能量宝石安全抵达。'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

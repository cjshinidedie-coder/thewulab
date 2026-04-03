'use client';

import { useApp } from '@/app/context/AppContext';

const translations = {
  en: {
    shop: 'Shop',
    allBracelets: 'All Bracelets',
    newArrivalsLink: 'New Arrivals',
    bestSellersLink: 'Best Sellers',
    sale: 'Sale',
    customerCare: 'Customer Care',
    contactUs: 'Contact Us',
    shippingInfo: 'Shipping Info',
    returnsExchanges: 'Returns & Exchanges',
    faq: 'FAQ',
    about: 'About',
    ourStory: 'Our Story',
    craftsmanship: 'Craftsmanship',
    energyWork: 'Energy Work',
    blog: 'Blog',
    joinOurJourney: 'Join Our Journey',
    subscribeText: 'Subscribe to receive exclusive offers and cosmic insights',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    followUs: 'Follow Us',
    copyright: '© 2024 the wu lab. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  zh: {
    shop: '购物',
    allBracelets: '所有手链',
    newArrivalsLink: '新品上市',
    bestSellersLink: '热销商品',
    sale: '促销',
    customerCare: '客户服务',
    contactUs: '联系我们',
    shippingInfo: '运费信息',
    returnsExchanges: '退货和换货',
    faq: '常见问题',
    about: '关于',
    ourStory: '我们的故事',
    craftsmanship: '工艺',
    energyWork: '能量工作',
    blog: '博客',
    joinOurJourney: '加入我们的旅程',
    subscribeText: '订阅以获取独家优惠和宇宙见解',
    enterEmail: '输入您的邮箱',
    subscribe: '订阅',
    followUs: '关注我们',
    copyright: '© 2024 the wu lab. 版权所有。',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
  },
};

export default function Footer() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-section">
            <h3>{t.shop}</h3>
            <ul>
              <li><a href="#">{t.allBracelets}</a></li>
              <li><a href="#">{t.newArrivalsLink}</a></li>
              <li><a href="#">{t.bestSellersLink}</a></li>
              <li><a href="#">{t.sale}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{t.customerCare}</h3>
            <ul>
              <li><a href="#">{t.contactUs}</a></li>
              <li><a href="#">{t.shippingInfo}</a></li>
              <li><a href="#">{t.returnsExchanges}</a></li>
              <li><a href="#">{t.faq}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{t.about}</h3>
            <ul>
              <li><a href="#">{t.ourStory}</a></li>
              <li><a href="#">{t.craftsmanship}</a></li>
              <li><a href="#">{t.energyWork}</a></li>
              <li><a href="#">{t.blog}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <div className="newsletter-box">
              <h3>{t.joinOurJourney}</h3>
              <p>{t.subscribeText}</p>
              <div className="newsletter-input">
                <input type="email" placeholder={t.enterEmail} />
                <button>{t.subscribe}</button>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>{t.followUs}</p>
              <div className="social-icons">
                <a href="#">📷</a>
                <a href="#">f</a>
                <a href="#">𝕏</a>
                <a href="#">♪</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.copyright} | <a href="#">{t.privacyPolicy}</a> | <a href="#">{t.termsOfService}</a></p>
        </div>
      </div>
    </footer>
  );
}

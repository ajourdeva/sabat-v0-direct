import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        services: 'Services',
        how_it_works: 'How It Works',
        industries: 'Industries',
        about: 'About SABAT',
        faq: 'FAQ',
        sign_in: 'Sign In',
        sign_up: 'Sign Up',
        book_consultation: 'Book Consultation',
      },
      hero: {
        tagline: 'Professional Corporate Travel Management',
        title: 'Your Global Partner in Corporate Travel',
        description: 'SABAT helps organizations coordinate accommodation, executive hospitality, transfers, and business travel operations through one trusted partner.',
      },
      metrics: {
        enterprise_trust: 'Enterprise Trust Metrics',
        proven_partner: 'Proven partner for organizations.',
        organization_partners: 'Organization Partners',
        service_satisfaction: 'Service Satisfaction',
      },
      features: {
        title: 'Our Services',
      },
      footer: {
        copyright: '2026 SABAT - Professional Corporate Travel Management. All rights reserved.',
      },
    },
  },
  fa: {
    translation: {
      nav: {
        services: 'خدمات',
        how_it_works: 'نحوه کار',
        industries: 'صنایع',
        about: 'درباره SABAT',
        faq: 'سوالات متداول',
        sign_in: 'ورود',
        sign_up: 'ثبت نام',
        book_consultation: 'رزرو مشاوره',
      },
      hero: {
        tagline: 'مدیریت حرفه‌ای سفرهای کسب‌وکار',
        title: 'شریک جهانی شما در سفرهای کسب‌وکار',
        description: 'SABAT به سازمان‌ها کمک می‌کند تا مسکن، میزبانی مدیران، انتقال و عملیات سفرهای تجاری را از طریق یک شریک قابل اعتماد هماهنگ کنند.',
      },
      metrics: {
        enterprise_trust: 'معیارهای اعتماد سازمانی',
        proven_partner: 'شریک شناخته‌شده برای سازمان‌ها.',
        organization_partners: 'شرکای سازمانی',
        service_satisfaction: 'رضایت خدمات',
      },
      features: {
        title: 'خدمات ما',
      },
      footer: {
        copyright: '2026 SABAT - مدیریت حرفه‌ای سفرهای کسب‌وکار. تمامی حقوق محفوظ است.',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

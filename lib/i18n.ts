import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/i18n/messages/en.json';
import fa from '@/i18n/messages/fa.json';
import ar from '@/i18n/messages/ar.json';
import tr from '@/i18n/messages/tr.json';

const resources = {
  en: { translation: en },
  fa: { translation: fa },
  ar: { translation: ar },
  tr: { translation: tr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

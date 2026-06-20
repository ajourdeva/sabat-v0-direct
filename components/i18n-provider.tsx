'use client';

import { useEffect, ReactNode } from 'react';
import i18n from '@/lib/i18n';

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize i18n on client side only
    if (!i18n.isInitialized) {
      i18n.init({
        lng: localStorage.getItem('language') || 'en',
        fallbackLng: 'en',
      });
    }

    // Get saved language or browser preference
    const savedLang = localStorage.getItem('language') || i18n.language || 'en';
    i18n.changeLanguage(savedLang);

    // Update HTML dir attribute
    const htmlElement = document.documentElement;
    htmlElement.dir = savedLang === 'fa' ? 'rtl' : 'ltr';
    htmlElement.lang = savedLang;

    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      localStorage.setItem('language', lng);
      htmlElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
      htmlElement.lang = lng;
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
}

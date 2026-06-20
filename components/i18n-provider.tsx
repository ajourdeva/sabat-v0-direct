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

    // Update HTML lang attribute only (keep header LTR)
    const htmlElement = document.documentElement;
    htmlElement.lang = savedLang;
    
    // Apply RTL only to main content, not header
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.dir = savedLang === 'fa' ? 'rtl' : 'ltr';
    }

    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      localStorage.setItem('language', lng);
      htmlElement.lang = lng;
      
      // Apply RTL only to main content
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
      }
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
}

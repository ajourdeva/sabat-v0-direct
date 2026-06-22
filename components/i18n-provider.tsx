'use client';

import { useEffect, ReactNode } from 'react';
import i18n from '@/lib/i18n';

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Get saved language or browser preference
    const savedLang = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLang);

    // Update HTML lang attribute and apply Persian font class
    const htmlElement = document.documentElement;
    htmlElement.lang = savedLang;
    
    if (savedLang === 'fa') {
      htmlElement.classList.add('fa-font');
    } else {
      htmlElement.classList.remove('fa-font');
    }
    
    // Apply RTL only to main content, not header
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.dir = savedLang === 'fa' ? 'rtl' : 'ltr';
    }

    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      localStorage.setItem('language', lng);
      htmlElement.lang = lng;
      
      // Apply Persian font class
      if (lng === 'fa') {
        htmlElement.classList.add('fa-font');
      } else {
        htmlElement.classList.remove('fa-font');
      }
      
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

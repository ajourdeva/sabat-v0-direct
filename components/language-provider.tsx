'use client';

import { ReactNode, useEffect } from 'react';
import { useLanguage } from '@/lib/language-store';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    // Update HTML dir and lang attributes
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
    
    // Apply RTL class to body for Tailwind
    if (language === 'fa') {
      html.classList.add('rtl');
    } else {
      html.classList.remove('rtl');
    }
  }, [language]);

  return <>{children}</>;
}

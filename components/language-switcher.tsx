'use client';

import { useLanguage } from '@/lib/language-store';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-background/50 rounded-full p-1 border border-foreground/10">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="h-8 px-3 text-xs font-medium rounded-full"
      >
        EN
      </Button>
      <Button
        variant={language === 'fa' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fa')}
        className="h-8 px-3 text-xs font-medium rounded-full"
      >
        فا
      </Button>
    </div>
  );
}

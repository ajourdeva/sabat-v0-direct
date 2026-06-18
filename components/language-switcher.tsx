'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // Navigate to new locale with the same path
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-1 bg-background/50 rounded-full p-1 border border-foreground/10">
      <Button
        variant={locale === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLanguage('en')}
        className="h-8 px-3 text-xs font-medium rounded-full"
      >
        EN
      </Button>
      <Button
        variant={locale === 'fa' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLanguage('fa')}
        className="h-8 px-3 text-xs font-medium rounded-full"
      >
        فا
      </Button>
    </div>
  );
}

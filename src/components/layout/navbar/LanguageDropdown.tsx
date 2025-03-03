
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LanguageDropdown = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    // Force a reload to ensure all components get the updated language
    window.location.reload();
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-gray-800 dark:text-gray-200" aria-label={t('language')}>
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('fr')} 
          className={language === 'fr' ? 'bg-primary/10' : ''}
        >
          🇫🇷 {t('language_settings.fr')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')} 
          className={language === 'en' ? 'bg-primary/10' : ''}
        >
          🇬🇧 {t('language_settings.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TranslationKey, translations, replaceVariables } from '../i18n/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string>) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get language from localStorage or use French as default
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'fr') ? savedLanguage : 'fr';
  });

  // Translation function with variables support
  const t = (key: string, variables?: Record<string, string>): string => {
    // Nested key support (e.g., 'home.title')
    const keys = key.split('.');
    let translation: any = translations[language];
    
    // Navigate through nested objects
    for (const k of keys) {
      if (!translation || !translation[k]) {
        console.warn(`No translation found for key: ${key} in language: ${language}`);
        // Fallback to the other language if key is missing
        const fallbackLang = language === 'fr' ? 'en' : 'fr';
        let fallbackTranslation = translations[fallbackLang];
        for (const fk of keys) {
          if (!fallbackTranslation || !fallbackTranslation[fk]) {
            return key; // If also not found in fallback, return the key
          }
          fallbackTranslation = fallbackTranslation[fk];
        }
        return typeof fallbackTranslation === 'string' 
          ? replaceVariables(fallbackTranslation, variables) 
          : key;
      }
      translation = translation[k];
    }
    
    if (typeof translation !== 'string') {
      console.warn(`Translation for key ${key} in language ${language} is not a string`);
      return key;
    }
    
    return replaceVariables(translation, variables);
  };

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    // Add a console log to verify language change
    console.log('Language changed to:', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

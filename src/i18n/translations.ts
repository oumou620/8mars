
import en from './en';
import fr from './fr';

export type Language = 'fr' | 'en';

export type TranslationKey = string;

export const translations = {
  en: en.translation,
  fr: fr.translation
};

// Function to replace variables in text
export const replaceVariables = (text: string, variables?: Record<string, string>): string => {
  if (!text) return '';
  
  // First, handle the year variable specifically
  let result = text.replace('{year}', new Date().getFullYear().toString());
  
  // Then, if variables are provided, replace them in the text
  if (variables) {
    Object.entries(variables).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, value);
    });
  }
  
  return result;
};

import { useContext } from 'react';
import { LanguageContext } from './language-context';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    console.warn('useLanguage must be used within a LanguageProvider');
    return {
      language: 'en',
      changeLanguage: () => {},
      t: (key) => key,
    };
  }
  return context;
}

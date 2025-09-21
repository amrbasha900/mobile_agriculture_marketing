import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
export const useTranslation = () => {
  const {
    language
  } = useLanguage();
  const t = (key: keyof typeof translations) => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translations[key][language] || translations[key].english;
  };
  return {
    t
  };
};
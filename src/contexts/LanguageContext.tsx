import React, { useEffect, useState, createContext, useContext } from 'react';
type Language = 'english' | 'arabic';
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
}
const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  isRTL: false
});
export const useLanguage = () => useContext(LanguageContext);
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'english';
  });
  // Determine if the current language is RTL
  const isRTL = language === 'arabic';
  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document direction for RTL support
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };
  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    isRTL
  }}>
      {children}
    </LanguageContext.Provider>;
};
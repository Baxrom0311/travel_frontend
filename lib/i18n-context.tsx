'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/constants';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz');

  // Initialize language from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('language') as Language | null;
      if (stored && ['uz', 'en', 'ru'].includes(stored)) {
        setLanguageState(stored);
      }
    } catch {
      // localStorage may not be available (SSR)
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const translation = TRANSLATIONS[key];
    if (!translation) {
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

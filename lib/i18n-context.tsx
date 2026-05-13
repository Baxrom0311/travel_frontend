'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import { translations, getTranslation, getSection } from '@/lib/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: keyof typeof translations, key: string) => string;
  getSection: (section: keyof typeof translations) => Record<string, string>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('language') as Language | null;
      if (stored && ['uz', 'en', 'ru'].includes(stored)) {
        setLanguageState(stored);
      }
    } catch {
      // ignore
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

  const t = (section: keyof typeof translations, key: string): string => {
    return getTranslation(section, key, language);
  };

  const getSec = (section: keyof typeof translations) => getSection(section, language);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, getSection: getSec }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

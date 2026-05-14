'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, MapProvider } from '@/lib/settings-types';

// Sensible defaults (CartoDB Voyager)
const DEFAULT_MAP: MapProvider = {
  key: 'carto_voyager',
  name: 'CartoDB Voyager',
  url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
  max_zoom: 19,
};

const DEFAULT_MAP_DARK: MapProvider = {
  key: 'carto_dark',
  name: 'CartoDB Dark Matter',
  url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
  max_zoom: 19,
};

const DEFAULT_SETTINGS: SiteSettings = {
  site_name: 'Visit Khorezm',
  site_tagline: 'Travel & Tourism',
  site_description: 'Xorazm viloyati turizm portali',
  contact_email: 'info@visitkhorezm.uz',
  contact_phone: '+998 61 226 56 56',
  contact_address: 'Xiva, Xorazm viloyati',
  facebook_url: '',
  instagram_url: '',
  youtube_url: '',
  telegram_url: '',
  maintenance_mode: false,
  maintenance_message: '',
  map_default_zoom: 13,
  map_provider: 'carto_voyager',
  map_dark_provider: 'carto_dark',
  map: DEFAULT_MAP,
  map_dark: DEFAULT_MAP_DARK,
  updated_at: '',
};

interface SettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
).replace(/\/+$/, '');

const CACHE_KEY = 'visitkhorezm_settings';
const CACHE_TTL_MS = 30 * 1000; // 30 seconds - tez yangilanish

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/settings/`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data, ts: Date.now() })
          );
        } catch {}
      }
    } catch (e) {
      console.error('[Settings] Failed to fetch:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try cache first
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL_MS && data) {
          setSettings(data);
          setLoading(false);
        }
      }
    } catch {}

    // Always fetch fresh in background
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    // Graceful fallback if used outside provider
    return { settings: DEFAULT_SETTINGS, loading: false, refresh: async () => {} };
  }
  return ctx;
}

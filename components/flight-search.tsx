'use client';

import { useState } from 'react';
import { Plane, ExternalLink, ArrowRight, Calendar } from 'lucide-react';
import { skyscannerFlightUrl, kiwiFlightUrl } from '@/lib/external-links';

const CITIES = [
  { code: 'TAS', name: 'Tashkent', country: 'Uzbekistan' },
  { code: 'IST', name: 'Istanbul', country: 'Turkey' },
  { code: 'DXB', name: 'Dubai', country: 'UAE' },
  { code: 'MOW', name: 'Moscow', country: 'Russia' },
  { code: 'LED', name: 'St. Petersburg', country: 'Russia' },
  { code: 'FRA', name: 'Frankfurt', country: 'Germany' },
  { code: 'LON', name: 'London', country: 'UK' },
  { code: 'NYC', name: 'New York', country: 'USA' },
  { code: 'PEK', name: 'Beijing', country: 'China' },
  { code: 'ICN', name: 'Seoul', country: 'South Korea' },
];

export function FlightSearch() {
  const [from, setFrom] = useState('IST');
  const today = new Date().toISOString().split('T')[0];
  const twoWeeks = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
  const [date, setDate] = useState(twoWeeks);

  const handleSearch = (platform: 'skyscanner' | 'kiwi') => {
    const url = platform === 'skyscanner'
      ? skyscannerFlightUrl(from)
      : kiwiFlightUrl(from.toLowerCase());
    window.open(url, '_blank');
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
          <Plane className="text-white" size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold">Aviabilet qidirish</h3>
          <p className="text-xs text-muted-foreground">Urganch (UGC) aeroporti</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* From */}
        <div>
          <label className="text-xs font-semibold mb-1 block">Qayerdan</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
          >
            {CITIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code}) · {c.country}
              </option>
            ))}
          </select>
        </div>

        {/* To (fixed) */}
        <div className="flex items-center justify-center text-muted-foreground">
          <ArrowRight size={16} strokeWidth={2.5} />
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Qayerga</label>
          <div className="h-11 px-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center text-sm font-semibold text-primary">
            🛬 Urgench (UGC) · Uzbekistan
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
            <Calendar size={12} strokeWidth={2.5} /> Sana
          </label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
          />
        </div>

        {/* Search buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => handleSearch('skyscanner')}
            className="h-11 rounded-xl bg-sky-500 text-white font-semibold text-sm hover:bg-sky-600 transition-colors inline-flex items-center justify-center gap-2"
          >
            Skyscanner <ExternalLink size={12} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => handleSearch('kiwi')}
            className="h-11 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors inline-flex items-center justify-center gap-2"
          >
            Kiwi.com <ExternalLink size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-[10px] text-muted-foreground flex items-center gap-2">
          ✈️ <span>Eng yaqin aeroport: <strong>Urgench (UGC)</strong></span>
        </p>
        <p className="text-[10px] text-muted-foreground flex items-center gap-2 mt-1">
          📍 <span>Aeroportdan Xivagacha: 30-40 daqiqa taxi</span>
        </p>
      </div>
    </div>
  );
}

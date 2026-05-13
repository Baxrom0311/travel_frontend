'use client';

import { useEffect, useState } from 'react';
import { ArrowLeftRight, DollarSign, Euro, RefreshCw } from 'lucide-react';

interface Rates {
  USD: number; // how many UZS in 1 USD
  EUR: number;
  RUB: number;
  updated_at: string;
}

type Currency = 'UZS' | 'USD' | 'EUR' | 'RUB';

const CURRENCY_INFO: Record<Currency, { symbol: string; name: string; flag: string }> = {
  UZS: { symbol: 'so\'m', name: "O'zbek so'mi", flag: '🇺🇿' },
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
  RUB: { symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺' },
};

// Fallback rates (if API fails)
const FALLBACK_RATES: Rates = {
  USD: 12750,
  EUR: 13800,
  RUB: 135,
  updated_at: '',
};

export function CurrencyConverter() {
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('UZS');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      // Uzbekistan CB rates (free, no key)
      const res = await fetch('https://cbu.uz/en/arkhiv-kursov-valyut/json/');
      if (!res.ok) throw new Error('Rate fetch failed');
      const data = await res.json();
      
      const findRate = (code: string) => {
        const item = data.find((r: any) => r.Ccy === code);
        return item ? parseFloat(item.Rate) : 0;
      };

      const usd = findRate('USD');
      const eur = findRate('EUR');
      const rub = findRate('RUB');

      if (usd && eur && rub) {
        setRates({
          USD: usd,
          EUR: eur,
          RUB: rub,
          updated_at: new Date().toLocaleDateString('uz-UZ'),
        });
      }
    } catch (e) {
      console.error('Currency fetch error:', e);
      // Keep fallback
    } finally {
      setLoading(false);
    }
  };

  const convert = (value: number, fromCur: Currency, toCur: Currency): number => {
    if (fromCur === toCur) return value;
    const getRate = (c: Currency): number => {
      if (c === 'UZS') return 1;
      return rates[c] as number;
    };
    // Everything through UZS
    const inUzs = fromCur === 'UZS' ? value : value * getRate(fromCur);
    if (toCur === 'UZS') return inUzs;
    return inUzs / getRate(toCur);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const num = parseFloat(amount) || 0;
  const result = convert(num, from, to);

  const formatAmount = (val: number, cur: Currency): string => {
    if (cur === 'UZS') {
      return new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 0 }).format(val);
    }
    return val.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  };

  const currencies: Currency[] = ['UZS', 'USD', 'EUR', 'RUB'];

  return (
    <div className="glass-strong rounded-2xl p-5 w-80 max-w-[calc(100vw-2rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <DollarSign size={16} className="text-primary" strokeWidth={2.5} />
            Valyuta kursi
          </h3>
          <p className="text-[10px] text-muted-foreground">
            {loading ? 'Yangilanmoqda...' : rates.updated_at ? `Yangilangan: ${rates.updated_at}` : 'Taxminiy kurs'}
          </p>
        </div>
        <button
          onClick={fetchRates}
          disabled={loading}
          className="glass-button p-1.5 rounded-full hover:scale-105 transition-transform"
          aria-label="Refresh rates"
        >
          <RefreshCw size={14} strokeWidth={2.5} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* From */}
      <div className="mb-2">
        <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">
          Qayerdan
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 h-11 px-3 rounded-xl bg-background border border-border text-sm font-semibold outline-none focus:border-primary min-w-0"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value as Currency)}
            className="h-11 px-2 rounded-xl bg-background border border-border text-sm font-semibold outline-none focus:border-primary"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{CURRENCY_INFO[c].flag} {c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap */}
      <div className="flex justify-center my-2">
        <button
          onClick={swap}
          className="glass-button p-2 rounded-full hover:scale-110 transition-transform"
          aria-label="Swap currencies"
        >
          <ArrowLeftRight size={14} strokeWidth={2.5} className="text-primary rotate-90" />
        </button>
      </div>

      {/* To */}
      <div className="mb-3">
        <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">
          Qayerga
        </label>
        <div className="flex gap-2">
          <div className="flex-1 h-11 px-3 rounded-xl bg-primary/5 border border-primary/20 text-sm font-bold text-primary flex items-center truncate">
            {formatAmount(result, to)}
          </div>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as Currency)}
            className="h-11 px-2 rounded-xl bg-background border border-border text-sm font-semibold outline-none focus:border-primary"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{CURRENCY_INFO[c].flag} {c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Rates */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
        {(['USD', 'EUR', 'RUB'] as const).map((cur) => (
          <div key={cur} className="text-center">
            <div className="text-[10px] text-muted-foreground">1 {cur}</div>
            <div className="text-xs font-semibold">{formatAmount(rates[cur], 'UZS')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

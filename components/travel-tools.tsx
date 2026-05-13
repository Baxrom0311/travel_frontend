'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings2, X, CloudSun, DollarSign } from 'lucide-react';
import { WeatherWidget } from '@/components/weather-widget';
import { CurrencyConverter } from '@/components/currency-converter';

type Tab = 'weather' | 'currency';

export function TravelTools() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('weather');

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-1/2 right-4 -translate-y-1/2 z-40 w-12 h-12 rounded-full glass-strong text-primary shadow-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Travel tools"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Settings2 size={20} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 right-20 -translate-y-1/2 z-40"
            >
              {/* Tabs */}
              <div className="glass-strong rounded-t-2xl p-2 flex gap-1">
                <button
                  onClick={() => setTab('weather')}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 justify-center transition-colors ${
                    tab === 'weather' ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5'
                  }`}
                >
                  <CloudSun size={14} strokeWidth={2.5} /> Ob-havo
                </button>
                <button
                  onClick={() => setTab('currency')}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 justify-center transition-colors ${
                    tab === 'currency' ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5'
                  }`}
                >
                  <DollarSign size={14} strokeWidth={2.5} /> Kurs
                </button>
              </div>

              {/* Content */}
              <div className="glass-strong rounded-b-2xl rounded-t-none -mt-1 pt-1">
                {tab === 'weather' && <WeatherWidget />}
                {tab === 'currency' && <CurrencyConverter />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

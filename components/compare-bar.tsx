'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { GitCompare, X, ArrowRight } from 'lucide-react';
import { useCompare } from '@/hooks/use-compare';
import { getHotelById } from '@/lib/api-client';
import { useI18n } from '@/lib/i18n-context';
import { formatPrice } from '@/lib/i18n-helpers';
import { Hotel } from '@/lib/types';

export function CompareBar() {
  const { items, count, mounted, remove, clear } = useCompare();
  const { language } = useI18n();
  const [hotels, setHotels] = useState<Record<number, Hotel>>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    (async () => {
      const needed = items.filter((id) => !hotels[id]);
      const results = await Promise.all(needed.map((id) => getHotelById(id, language)));
      const next = { ...hotels };
      results.forEach((h, i) => {
        if (h) next[needed[i]] = h;
      });
      setHotels(next);
    })();
  }, [items, language]);

  if (!mounted || count === 0) return null;

  const selected = items.map((id) => hotels[id]).filter(Boolean);

  return (
    <>
      {/* Floating bar */}
      <AnimatePresence>
        {count > 0 && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-strong rounded-full p-2 flex items-center gap-2 shadow-xl"
          >
            <div className="flex items-center gap-1 px-3">
              <GitCompare size={16} className="text-primary" strokeWidth={2.5} />
              <span className="text-sm font-semibold">{count}/3</span>
            </div>
            <div className="flex -space-x-2">
              {selected.map((h) => (
                <div
                  key={h.id}
                  className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-secondary"
                >
                  {h.cover_image ? (
                    <Image src={h.cover_image} alt={h.name} width={32} height={32} className="object-cover" unoptimized />
                  ) : null}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(true)}
              disabled={count < 2}
              className="px-4 h-9 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 inline-flex items-center gap-1"
            >
              Taqqoslash <ArrowRight size={12} strokeWidth={2.5} />
            </button>
            <button
              onClick={clear}
              className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
              aria-label="Clear"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-strong rounded-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold">Mehmonxonalarni taqqoslash</h2>
                <button onClick={() => setShowModal(false)} className="glass-button p-2 rounded-full">
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              <div className={`grid gap-4 ${selected.length === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                {selected.map((h) => (
                  <div key={h.id} className="glass rounded-xl overflow-hidden">
                    <div className="relative h-40">
                      {h.cover_image && (
                        <Image src={h.cover_image} alt={h.name} fill className="object-cover" unoptimized />
                      )}
                      <button
                        onClick={() => remove(h.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                      >
                        <X size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-serif font-bold text-lg line-clamp-1">{h.name}</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Yulduz:</dt>
                          <dd className="font-semibold">{'★'.repeat(h.stars)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Reyting:</dt>
                          <dd className="font-semibold">⭐ {h.rating}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Shahar:</dt>
                          <dd className="font-semibold">{h.city_label}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Narx:</dt>
                          <dd className="font-bold text-primary">{formatPrice(h.price_per_night)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Qulayliklar:</dt>
                          <dd className="font-semibold">{h.amenities.length}</dd>
                        </div>
                      </dl>
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-border/50">
                        {h.amenities.slice(0, 6).map((a) => (
                          <span key={a.id} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {a.icon}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/accommodation/${h.id}`}
                        onClick={() => setShowModal(false)}
                        className="block w-full text-center mt-2 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"
                      >
                        Batafsil
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

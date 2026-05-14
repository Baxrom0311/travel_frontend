'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation, Loader2, AlertCircle, X, MapPin, ArrowRight } from 'lucide-react';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useModalScroll } from '@/hooks/use-modal-scroll';
import { sortByDistance, formatDistance, estimateTravelTime, LatLng } from '@/lib/geo';

const RouteMap = dynamic(() => import('@/components/route-map').then((m) => m.RouteMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted animate-pulse rounded-2xl flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  ),
});

export interface NearestItem extends LatLng {
  id: number | string;
  name: string;
  image?: string | null;
  href: string;
  subtitle?: string;
}

interface Props {
  items: NearestItem[];
  label?: string;
  max?: number;
  className?: string;
}

export function NearestPlaces({ items, label = "Eng yaqin joylar", max = 5, className = '' }: Props) {
  const { coords, status, error, request, reset } = useGeolocation();
  const [open, setOpen] = useState(false);
  useModalScroll(open);
  const [selectedRoute, setSelectedRoute] = useState<NearestItem | null>(null);

  const handleClick = () => {
    if (status === 'success' && coords) {
      setOpen(true);
    } else {
      request();
      setOpen(true);
    }
  };

  const sorted = coords ? sortByDistance(items, coords).slice(0, max) : [];

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-5 h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20 ${className}`}
      >
        {status === 'loading' ? (
          <Loader2 size={16} className="animate-spin" strokeWidth={2.5} />
        ) : (
          <Navigation size={16} strokeWidth={2.5} />
        )}
        <span className="text-sm">{label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { setOpen(false); setSelectedRoute(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass-strong rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold">{label}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sizning joylashuvingizdan yaqinligi bo'yicha
                  </p>
                </div>
                <button
                  onClick={() => { setOpen(false); setSelectedRoute(null); }}
                  className="glass-button p-2 rounded-full"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Status */}
              {status === 'loading' && (
                <div className="text-center py-12">
                  <Loader2 className="animate-spin text-primary mx-auto mb-3" size={32} />
                  <p className="text-sm text-muted-foreground">Joylashuv aniqlanmoqda...</p>
                </div>
              )}

              {status === 'denied' && (
                <div className="text-center py-12 glass rounded-xl">
                  <AlertCircle className="text-red-500 mx-auto mb-3" size={32} strokeWidth={2.5} />
                  <h3 className="font-semibold mb-2">Joylashuv ruxsati rad etildi</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Brauzer sozlamalarida joylashuv ruxsatini yoqing
                  </p>
                  <button
                    onClick={() => { reset(); request(); }}
                    className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                  >
                    Qayta urinish
                  </button>
                </div>
              )}

              {(status === 'unavailable' || status === 'timeout') && (
                <div className="text-center py-12 glass rounded-xl">
                  <AlertCircle className="text-amber-500 mx-auto mb-3" size={32} strokeWidth={2.5} />
                  <h3 className="font-semibold mb-2">Xatolik</h3>
                  <p className="text-sm text-muted-foreground mb-4">{error}</p>
                  <button
                    onClick={() => { reset(); request(); }}
                    className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                  >
                    Qayta urinish
                  </button>
                </div>
              )}

              {/* Results with route */}
              {status === 'success' && coords && selectedRoute && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Map */}
                  <div className="md:col-span-2 h-[500px] relative">
                    <RouteMap
                      start={{ ...coords, label: 'Siz' }}
                      end={{
                        latitude: selectedRoute.latitude,
                        longitude: selectedRoute.longitude,
                        label: selectedRoute.name,
                      }}
                    />
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedRoute(null)}
                      className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                    >
                      ← Boshqa joyni tanlash
                    </button>
                    <div className="glass rounded-xl p-4">
                      <h3 className="font-semibold text-lg mb-1">{selectedRoute.name}</h3>
                      {selectedRoute.subtitle && (
                        <p className="text-sm text-muted-foreground mb-3">{selectedRoute.subtitle}</p>
                      )}
                      <Link
                        href={selectedRoute.href}
                        className="text-sm text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Batafsil <ArrowRight size={14} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* List */}
              {status === 'success' && coords && !selectedRoute && (
                <div>
                  <p className="text-xs text-muted-foreground mb-3">
                    📍 {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
                  </p>
                  <div className="space-y-2">
                    {sorted.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedRoute(item)}
                        className="w-full glass rounded-xl p-3 flex items-center gap-3 hover:bg-foreground/5 transition-colors text-left group"
                      >
                        {/* Rank */}
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                          {idx + 1}
                        </div>

                        {/* Image */}
                        {item.image ? (
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                            <MapPin size={20} className="text-white" strokeWidth={2.5} />
                          </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{item.name}</div>
                          {item.subtitle && (
                            <div className="text-xs text-muted-foreground truncate">{item.subtitle}</div>
                          )}
                        </div>

                        {/* Distance */}
                        <div className="text-right shrink-0">
                          <div className="font-bold text-primary text-sm">
                            {formatDistance(item.distance_km)}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            ~{estimateTravelTime(item.distance_km)}
                          </div>
                        </div>

                        <Navigation
                          size={16}
                          className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                          strokeWidth={2.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

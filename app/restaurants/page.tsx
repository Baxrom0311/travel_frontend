'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FavoriteButton } from '@/components/favorite-button';
import { PriceRange } from '@/components/price-range';
import { Stagger, StaggerItem, HoverCard } from '@/components/motion';
import { NearestPlaces } from '@/components/nearest-places';
import { AddToTripButton } from '@/components/add-to-trip-button';
import dynamic from 'next/dynamic';

const SplitMapView = dynamic(() => import('@/components/split-map-view').then((m) => m.SplitMapView), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-2xl" />,
});
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getRestaurants, getRestaurantOptions } from '@/lib/api-client';
import { Restaurant, RestaurantOptions } from '@/lib/types';
import { MapPin, Wifi, Car, Utensils, Leaf, Star, ArrowRight } from 'lucide-react';

export default function RestaurantsPage() {
  const { language } = useI18n();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [options, setOptions] = useState<RestaurantOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState<string>('all');
  const [cuisine, setCuisine] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [halalOnly, setHalalOnly] = useState(false);

  const t = getSection('restaurants', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [data, opts] = await Promise.all([
        getRestaurants({}, language),
        getRestaurantOptions(language),
      ]);
      setRestaurants(data);
      setOptions(opts);
      setLoading(false);
    })();
  }, [language]);

  const filtered = restaurants.filter((r) => {
    if (city !== 'all' && r.city !== city) return false;
    if (cuisine !== 'all' && !r.cuisines.some(c => c.id.toString() === cuisine)) return false;
    if (priceRange !== 'all' && r.price_range !== priceRange) return false;
    if (halalOnly && !r.is_halal) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[400px] overflow-hidden">
        <Image src="/images/bazaar.jpg" alt={t.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Filters */}
        <div className="glass rounded-2xl p-6 mb-8 -mt-24 relative z-10">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <p className="text-sm text-muted-foreground">
              {filtered.length} ta restoran topildi
            </p>
            <NearestPlaces
              label="Eng yaqin restoran"
              items={restaurants.map((r) => ({
                id: r.id,
                name: r.name,
                latitude: r.latitude,
                longitude: r.longitude,
                image: r.cover_image,
                href: `/restaurants/${r.id}`,
                subtitle: `${r.city_label} · ${r.price_range} · ⭐ ${r.rating}`,
              }))}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select value={city} onChange={(e) => setCity(e.target.value)} className="h-12 px-4 rounded-xl bg-card text-foreground border border-border focus:border-primary outline-none text-sm">
              <option value="all">{tc.view_all}</option>
              {options?.cities.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="h-12 px-4 rounded-xl bg-card text-foreground border border-border focus:border-primary outline-none text-sm">
              <option value="all">{t.all_cuisines}</option>
              {options?.cuisines.map((c) => <option key={c.id} value={c.id.toString()}>{c.icon} {c.name}</option>)}
            </select>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="h-12 px-4 rounded-xl bg-card text-foreground border border-border focus:border-primary outline-none text-sm">
              <option value="all">{t.filter_price}</option>
              {options?.price_ranges.map((p) => <option key={p.value} value={p.value}>{p.value} - {p.label}</option>)}
            </select>
            <label className="h-12 px-4 rounded-xl bg-card text-foreground border border-border flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={halalOnly} onChange={(e) => setHalalOnly(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm font-medium">{t.halal}</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
          <div className="order-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => <div key={i} className="h-96 glass-card rounded-2xl animate-pulse" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 glass rounded-2xl">
                <Utensils className="mx-auto mb-4 text-muted-foreground" size={48} />
                <p className="text-muted-foreground">{t.no_restaurants}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((r) => (
                  <div key={r.id} className="glass-card rounded-2xl overflow-hidden group relative">
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
                    <AddToTripButton
                      type="restaurant"
                      id={r.id}
                      name={r.name}
                      image={r.cover_image}
                      latitude={r.latitude}
                      longitude={r.longitude}
                    />
                    <FavoriteButton
                      type="restaurant"
                      id={r.id}
                      name={r.name}
                      image={r.cover_image || undefined}
                      href={`/restaurants/${r.id}`}
                    />
                  </div>
                  <Link href={`/restaurants/${r.id}`} className="block">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={r.cover_image || '/images/bazaar.jpg'}
                        alt={r.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3 glass-strong px-2 py-1 rounded-full">
                        <PriceRange range={r.price_range} size={12} />
                      </div>
                      <div className="absolute bottom-3 left-3 glass-strong px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star size={10} className="fill-amber-500 text-amber-500" /> {r.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-base mb-2 line-clamp-1">{r.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin size={12} /> {r.city_label}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {r.cuisines.slice(0, 2).map(c => (
                          <span key={c.id} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {c.icon} {c.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        {r.has_wifi && <Wifi size={14} />}
                        {r.has_parking && <Car size={14} />}
                        {r.is_halal && <span className="text-xs text-green-600 font-semibold">HALAL</span>}
                        {r.is_vegetarian_friendly && <Leaf size={14} className="text-green-600" />}
                      </div>
                    </div>
                  </Link>
                </div>
                ))}
              </div>
            )}
          </div>

          {/* MAP */}
          <div className="order-2 lg:sticky lg:top-20 lg:self-start h-[500px] lg:h-[calc(100vh-120px)]">
            {!loading && filtered.length > 0 && (
              <SplitMapView
                items={filtered.map((r) => ({
                  id: r.id,
                  name: r.name,
                  latitude: r.latitude,
                  longitude: r.longitude,
                  href: `/restaurants/${r.id}`,
                  image: r.cover_image,
                  icon: '🍽',
                  subtitle: `${r.price_range} · ⭐ ${r.rating} · ${r.city_label}`,
                  color: '#f97316',
                }))}
                markerColor="#f97316"
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getHotels, getAttractions, getRestaurants } from '@/lib/api-client';
import { Hotel, Attraction, Restaurant } from '@/lib/types';
import { BedDouble, Landmark, Utensils } from 'lucide-react';

const AllPlacesMap = dynamic(
  () => import('@/components/all-places-map').then((m) => m.AllPlacesMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-muted animate-pulse" /> }
);

type FilterType = 'all' | 'hotels' | 'attractions' | 'restaurants';

export default function MapPage() {
  const { language } = useI18n();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  const t = getSection('map', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [h, a, r] = await Promise.all([
        getHotels({ page_size: 50 }, language),
        getAttractions(undefined, language),
        getRestaurants({}, language),
      ]);
      setHotels(h);
      setAttractions(a);
      setRestaurants(r);
      setLoading(false);
    })();
  }, [language]);

  const showHotels = filter === 'all' || filter === 'hotels';
  const showAttractions = filter === 'all' || filter === 'attractions';
  const showRestaurants = filter === 'all' || filter === 'restaurants';

  const filters: { value: FilterType; label: string; icon: any; color: string }[] = [
    { value: 'all', label: t.filter_all, icon: Landmark, color: 'bg-primary' },
    { value: 'hotels', label: t.filter_hotels, icon: BedDouble, color: 'bg-blue-500' },
    { value: 'attractions', label: t.filter_places, icon: Landmark, color: 'bg-amber-500' },
    { value: 'restaurants', label: t.filter_restaurants, icon: Utensils, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground mb-6">{t.subtitle}</p>

          <div className="glass rounded-2xl p-2 inline-flex gap-1 mb-6 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  filter === f.value ? `${f.color} text-white shadow-lg` : 'text-foreground hover:bg-secondary'
                }`}
              >
                <f.icon size={14} />
                {f.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-border h-[calc(100vh-280px)] min-h-[500px]">
            {loading ? (
              <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            ) : (
              <AllPlacesMap
                hotels={showHotels ? hotels : []}
                attractions={showAttractions ? attractions : []}
                restaurants={showRestaurants ? restaurants : []}
              />
            )}
          </div>

          {/* Legend */}
          <div className="glass rounded-2xl p-4 mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span>{hotels.length} {t.filter_hotels}</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span>{attractions.length} {t.filter_places}</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span>{restaurants.length} {t.filter_restaurants}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

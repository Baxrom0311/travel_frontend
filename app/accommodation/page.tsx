'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getHotels, getHotelOptions } from '@/lib/api-client';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { formatPrice } from '@/lib/i18n-helpers';
import { CityEnum, Hotel, HotelOptions } from '@/lib/types';
import { Search, MapPin, Star, ArrowRight } from 'lucide-react';
import { FavoriteButton } from '@/components/favorite-button';
import { Stagger, StaggerItem, HoverCard } from '@/components/motion';
import { TiltCard } from '@/components/tilt-card';
import { NearestPlaces, NearestItem } from '@/components/nearest-places';

export default function AccommodationPage() {
  const { language } = useI18n();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [options, setOptions] = useState<HotelOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState<CityEnum | 'all'>('all');
  const [stars, setStars] = useState<number | 'all'>('all');

  const t = getSection('accommodation', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [data, opts] = await Promise.all([
        getHotels({ page_size: 50 }, language),
        getHotelOptions(language),
      ]);
      setHotels(data);
      setOptions(opts);
      setLoading(false);
    })();
  }, [language]);

  const filtered = hotels.filter((h) => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (city !== 'all' && h.city !== city) return false;
    if (stars !== 'all' && h.stars !== stars) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/hotel-traditional.jpg"
          alt={t.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="glass rounded-2xl p-6 mb-8 -mt-24 relative z-10">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <p className="text-sm text-muted-foreground">
              {filtered.length} ta mehmonxona topildi
            </p>
            <NearestPlaces
              label="Eng yaqin mehmonxona"
              items={hotels.map((h) => ({
                id: h.id,
                name: h.name,
                latitude: h.latitude,
                longitude: h.longitude,
                image: h.cover_image,
                href: `/accommodation/${h.id}`,
                subtitle: `${h.city_label} · ${h.stars}★ · ⭐ ${h.rating}`,
              }))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tc.search}
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
              />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value as CityEnum | 'all')}
              className="h-12 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
            >
              <option value="all">{t.all_cities}</option>
              {options?.cities.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <select
              value={String(stars)}
              onChange={(e) => setStars(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="h-12 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
            >
              <option value="all">{t.filter_stars}</option>
              {options?.stars.map((s) => (
                <option key={s} value={s}>{s} ★</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 glass-card rounded-2xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <p className="text-muted-foreground">{t.no_hotels}</p>
          </div>
        ) : (
          <>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((h) => (
                <StaggerItem key={h.id}>
                  <TiltCard max={8} scale={1.02}>
                    <div className="glass-card rounded-2xl overflow-hidden group relative">
                  <div className="absolute top-3 right-3 z-10">
                    <FavoriteButton
                      type="hotel"
                      id={h.id}
                      name={h.name}
                      image={h.cover_image || undefined}
                      href={`/accommodation/${h.id}`}
                    />
                  </div>
                  <Link href={`/accommodation/${h.id}`} className="block">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={h.cover_image || FALLBACK_IMAGES.hotel}
                        alt={h.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3 glass-strong px-3 py-1 rounded-full text-xs font-semibold">
                        ★ {h.stars}
                      </div>
                      <div className="absolute bottom-3 left-3 glass-strong px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star size={10} className="fill-amber-500 text-amber-500" />
                        {h.rating}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{h.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin size={12} /> {h.city_label}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{h.description}</p>
                      <div className="flex items-end justify-between border-t border-border/50 pt-4">
                        <div>
                          <div className="text-xl font-bold text-primary">{formatPrice(h.price_per_night)}</div>
                          <div className="text-[10px] text-muted-foreground">/ {tc.per_night}</div>
                        </div>
                        <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          {tc.details} <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

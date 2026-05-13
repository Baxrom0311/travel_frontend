'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getAttractions } from '@/lib/api-client';
import { Attraction } from '@/lib/types';
import { MapPin, Star, ArrowRight, Landmark } from 'lucide-react';
import { FavoriteButton } from '@/components/favorite-button';
import { Stagger, StaggerItem, HoverCard } from '@/components/motion';
import { TiltCard } from '@/components/tilt-card';
import { NearestPlaces } from '@/components/nearest-places';
import { AddToTripButton } from '@/components/add-to-trip-button';

const PLACE_IMAGES: Record<string, string> = {
  'Kalta Minor': '/images/kalta-minor.jpg',
  "Ko'hna Ark": '/images/ichan-kala.jpg',
  'Juma Masjidi': '/images/juma-mosque.jpg',
  "Islom Xo'ja Minorasi": '/images/khiva-main.jpg',
};

function placeImg(a: Attraction): string {
  if (a.cover_image) return a.cover_image;
  return PLACE_IMAGES[a.name] || '/images/ichan-kala.jpg';
}

export default function KhivaPage() {
  const { language } = useI18n();
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const t = getSection('khiva', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAttractions(undefined, language);
      setAttractions(data);
      setLoading(false);
    })();
  }, [language]);

  const filtered = featuredOnly ? attractions.filter((a) => a.is_featured) : attractions;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[450px] overflow-hidden">
        <Image src="/images/khiva-main.jpg" alt="Khiva" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="glass-button inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">UNESCO</span>
          </div>
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter + Nearest */}
        <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
          <div className="flex gap-2">
            <button
              onClick={() => setFeaturedOnly(false)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                !featuredOnly ? 'bg-primary text-primary-foreground shadow-lg' : 'glass text-foreground'
              }`}
            >
              {tc.view_all || 'Hammasi'}
            </button>
            <button
              onClick={() => setFeaturedOnly(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-all inline-flex items-center gap-2 ${
                featuredOnly ? 'bg-amber-500 text-white shadow-lg' : 'glass text-foreground'
              }`}
            >
              <Star size={14} /> Featured
            </button>
          </div>
          <NearestPlaces
            label="Eng yaqin joy"
            items={attractions.map((a) => ({
              id: a.id,
              name: a.name,
              latitude: a.latitude,
              longitude: a.longitude,
              image: a.cover_image,
              href: `/khiva/${a.id}`,
              subtitle: a.description.slice(0, 60),
            }))}
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 glass-card rounded-2xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <p className="text-muted-foreground">{t.no_attractions}</p>
          </div>
        ) : (
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <StaggerItem key={a.id}>
                <TiltCard max={8} scale={1.02}>
                  <div className="glass-card rounded-2xl overflow-hidden group relative">
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
                      <AddToTripButton
                        type="attraction"
                        id={a.id}
                        name={a.name}
                        image={a.cover_image}
                        latitude={a.latitude}
                        longitude={a.longitude}
                      />
                      <FavoriteButton
                        type="attraction"
                        id={a.id}
                        name={a.name}
                        image={a.cover_image || undefined}
                        href={`/khiva/${a.id}`}
                      />
                    </div>
                    <Link href={`/khiva/${a.id}`} className="block">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={placeImg(a)}
                          alt={a.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          unoptimized
                        />
                        {/* UNESCO badge */}
                        <div className="absolute top-3 left-3 glass-strong px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1">
                          <Landmark size={11} strokeWidth={2.5} />
                          UNESCO
                        </div>
                        {a.is_featured && (
                          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
                            <Star size={10} className="fill-current" strokeWidth={2.5} /> Featured
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-xl font-bold mb-2">{a.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{a.description}</p>
                        <div className="flex items-center justify-between border-t border-border/50 pt-4">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin size={12} strokeWidth={2.5} /> {a.latitude.toFixed(3)}, {a.longitude.toFixed(3)}
                          </p>
                          <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            {tc.details} <ArrowRight size={14} strokeWidth={2.5} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      <Footer />
    </div>
  );
}

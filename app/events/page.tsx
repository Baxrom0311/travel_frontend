'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getEvents } from '@/lib/api-client';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { Event } from '@/lib/types';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
import { Stagger, StaggerItem, HoverCard } from '@/components/motion';
import dynamic from 'next/dynamic';

const SplitMapView = dynamic(() => import('@/components/split-map-view').then((m) => m.SplitMapView), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-2xl" />,
});

export default function EventsPage() {
  const { language } = useI18n();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming'>('all');

  const t = getSection('events', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getEvents(filter === 'upcoming' ? { upcoming: true } : {}, language);
      setEvents(data);
      setLoading(false);
    })();
  }, [language, filter]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[350px] overflow-hidden">
        <Image src="/images/bazaar.jpg" alt={t.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 justify-center">
          <button onClick={() => setFilter('all')} className={`px-6 py-2 rounded-full font-semibold transition-all text-sm ${filter === 'all' ? 'bg-primary text-primary-foreground shadow-lg' : 'glass text-foreground'}`}>
            {t.all}
          </button>
          <button onClick={() => setFilter('upcoming')} className={`px-6 py-2 rounded-full font-semibold transition-all text-sm ${filter === 'upcoming' ? 'bg-amber-500 text-white shadow-lg' : 'glass text-foreground'}`}>
            {t.upcoming}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
          <div className="order-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => <div key={i} className="h-96 glass-card rounded-2xl animate-pulse" />)}
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20 glass rounded-2xl">
                <Calendar className="mx-auto mb-4 text-muted-foreground" size={48} />
                <p className="text-muted-foreground">{t.no_events}</p>
              </div>
            ) : (
              <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((e) => (
                  <StaggerItem key={e.id}>
                    <Link href={`/events/${e.id}`} className="glass-card rounded-2xl overflow-hidden group block">
                      <div className="relative h-44 overflow-hidden">
                        <Image src={e.cover_image_url || FALLBACK_IMAGES.event} alt={e.title} fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                        <div className="absolute top-3 left-3 glass-strong px-3 py-2 rounded-xl text-center">
                          <div className="text-xs font-semibold">{new Date(e.start_date).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU', { month: 'short' })}</div>
                          <div className="text-lg font-bold leading-none">{new Date(e.start_date).getDate()}</div>
                        </div>
                        {e.is_free && <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">{t.free}</div>}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-base mb-2 line-clamp-2">{e.title}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2"><Clock size={12} className="text-primary" />{e.start_time || new Date(e.start_date).toLocaleDateString()}</p>
                          <p className="flex items-center gap-2"><MapPin size={12} className="text-primary" />{e.location}</p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
                          {!e.is_free && e.price > 0 && <span className="text-primary font-bold text-sm">{new Intl.NumberFormat('uz-UZ').format(e.price)} UZS</span>}
                          <span className="text-primary font-semibold text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 ml-auto">
                            {tc.details} <ArrowRight size={12} strokeWidth={2.5} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>

          {/* MAP */}
          <div className="order-2 lg:sticky lg:top-20 lg:self-start h-[500px] lg:h-[calc(100vh-120px)]">
            {!loading && events.length > 0 && (
              <SplitMapView
                items={events
                  .filter((e) => e.latitude && e.longitude)
                  .map((e) => ({
                    id: e.id,
                    name: e.title,
                    latitude: e.latitude!,
                    longitude: e.longitude!,
                    href: `/events/${e.id}`,
                    image: e.cover_image_url,
                    icon: '🎉',
                    subtitle: `${new Date(e.start_date).toLocaleDateString()} · ${e.location}`,
                    color: e.is_free ? '#10b981' : '#ec4899',
                  }))}
                markerColor="#ec4899"
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

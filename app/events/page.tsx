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

      <section className="relative h-[350px] mt-16 overflow-hidden">
        <Image src="/images/bazaar.jpg" alt={t.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-2 mb-8 justify-center">
          <button onClick={() => setFilter('all')} className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === 'all' ? 'bg-primary text-primary-foreground shadow-lg' : 'glass text-foreground'}`}>
            {t.all}
          </button>
          <button onClick={() => setFilter('upcoming')} className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === 'upcoming' ? 'bg-amber-500 text-white shadow-lg' : 'glass text-foreground'}`}>
            {t.upcoming}
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 glass-card rounded-2xl animate-pulse" />)}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <Calendar className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground">{t.no_events}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <Link key={e.id} href={`/events/${e.id}`} className="glass-card rounded-2xl overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <Image src={e.cover_image_url || FALLBACK_IMAGES.event} alt={e.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                  <div className="absolute top-3 left-3 glass-strong px-3 py-2 rounded-xl text-center">
                    <div className="text-xs font-semibold">{new Date(e.start_date).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU', { month: 'short' })}</div>
                    <div className="text-lg font-bold leading-none">{new Date(e.start_date).getDate()}</div>
                  </div>
                  {e.is_free && <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">{t.free}</div>}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2">{e.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Clock size={14} className="text-primary" />{e.start_time || new Date(e.start_date).toLocaleDateString()}</p>
                    <p className="flex items-center gap-2"><MapPin size={14} className="text-primary" />{e.location}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                    {!e.is_free && e.price > 0 && <span className="text-primary font-bold">{new Intl.NumberFormat('uz-UZ').format(e.price)} UZS</span>}
                    <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 ml-auto">
                      {tc.details} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

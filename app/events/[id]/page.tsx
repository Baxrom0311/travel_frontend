'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getEventById } from '@/lib/api-client';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { Event } from '@/lib/types';
import { Calendar, MapPin, Clock, ArrowLeft, Ticket } from 'lucide-react';

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { language } = useI18n();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const t = getSection('events', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const numId = Number(id);
      if (!numId) { router.push('/events'); return; }
      const data = await getEventById(numId, language);
      if (!data) { router.push('/events'); return; }
      setEvent(data);
      setLoading(false);
    })();
  }, [id, language, router]);

  if (loading || !event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-32">
          <div className="h-96 bg-muted rounded-2xl animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm">
            <ArrowLeft size={16} /> {tc.back}
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image src={event.cover_image_url || FALLBACK_IMAGES.event} alt={event.title} fill className="object-cover" unoptimized priority />
            {event.is_free && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-1.5 rounded-full font-bold">{t.free}</div>
            )}
          </div>

          <div className="glass rounded-2xl p-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">{event.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                <Calendar className="text-primary" size={20} />
                <div>
                  <div className="text-xs text-muted-foreground">{tc.date}</div>
                  <div className="font-semibold text-sm">{new Date(event.start_date).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU')}</div>
                </div>
              </div>
              {event.start_time && (
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                  <Clock className="text-primary" size={20} />
                  <div>
                    <div className="text-xs text-muted-foreground">Time</div>
                    <div className="font-semibold text-sm">{event.start_time}</div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                <MapPin className="text-primary" size={20} />
                <div>
                  <div className="text-xs text-muted-foreground">{tc.location}</div>
                  <div className="font-semibold text-sm">{event.location}</div>
                </div>
              </div>
            </div>

            <p className="text-lg text-foreground leading-relaxed whitespace-pre-line">{event.description}</p>

            {!event.is_free && event.price > 0 && (
              <div className="mt-6 p-4 bg-primary/10 rounded-xl flex items-center gap-3">
                <Ticket className="text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">{t.paid}</div>
                  <div className="text-xl font-bold text-primary">{new Intl.NumberFormat('uz-UZ').format(event.price)} UZS</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

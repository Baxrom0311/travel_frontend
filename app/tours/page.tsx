'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FavoriteButton } from '@/components/favorite-button';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getTours } from '@/lib/api-client';
import { formatPrice } from '@/lib/i18n-helpers';
import { Tour } from '@/lib/types';
import { Clock, Users, Mountain, Star, ArrowRight } from 'lucide-react';

export default function ToursPage() {
  const { language } = useI18n();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<string>('all');

  const t = getSection('tours', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getTours(difficulty === 'all' ? {} : { difficulty }, language);
      setTours(data);
      setLoading(false);
    })();
  }, [language, difficulty]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[400px] overflow-hidden">
        <Image src="/images/ichan-kala.jpg" alt={t.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-2 mb-8 justify-center flex-wrap">
          {['all', 'easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                difficulty === d ? 'bg-primary text-primary-foreground shadow-lg' : 'glass text-foreground'
              }`}
            >
              {d === 'all' ? tc.view_all : d === 'easy' ? 'Oson' : d === 'medium' ? "O'rtacha" : 'Qiyin'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-96 glass-card rounded-2xl animate-pulse" />)}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <Mountain className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground">{t.no_tours}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div key={tour.id} className="glass-card rounded-2xl overflow-hidden group relative">
                <div className="absolute top-3 right-3 z-10">
                  <FavoriteButton
                    type="tour"
                    id={tour.id}
                    name={tour.title}
                    image={tour.cover_image_url || undefined}
                    href={`/tours/${tour.slug}`}
                  />
                </div>
                <Link href={`/tours/${tour.slug}`} className="block">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={tour.cover_image_url || '/images/ichan-kala.jpg'}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 glass-strong px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star size={10} className="fill-amber-500 text-amber-500" /> {tour.rating}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-bold">
                      {tour.difficulty_label}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-lg mb-2 line-clamp-1">{tour.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{tour.short_description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Clock size={12} />{tour.duration} {tour.duration_type_label}</span>
                      <span className="flex items-center gap-1"><Users size={12} />Max {tour.max_people}</span>
                    </div>
                    <div className="flex items-end justify-between border-t border-border/50 pt-4">
                      <div>
                        <div className="text-xl font-bold text-primary">{formatPrice(tour.price)}</div>
                        <div className="text-[10px] text-muted-foreground">/ kishi</div>
                      </div>
                      <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        {tc.details} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

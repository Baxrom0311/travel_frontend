'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SearchBar } from '@/components/search-bar';
import { useI18n } from '@/lib/i18n-context';
import { globalSearch } from '@/lib/api-client';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { SearchResults } from '@/lib/types';
import { Building, Landmark, Calendar, Newspaper, Utensils, Mountain } from 'lucide-react';
import { PriceRange } from '@/components/price-range';

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const { language } = useI18n();
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) { setLoading(false); return; }
    (async () => {
      setLoading(true);
      const data = await globalSearch(q, language);
      setResults(data);
      setLoading(false);
    })();
  }, [q, language]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 section-bg">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-serif text-3xl font-bold mb-6">
            {q ? `"${q}"` : 'Search'}
          </h1>
          <SearchBar className="mb-10" />

          {loading && <div className="text-center py-12 text-muted-foreground">Loading...</div>}

          {results && !loading && (
            <div className="space-y-10">
              {results.counts.hotels > 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <Building size={20} className="text-primary" /> Hotels ({results.counts.hotels})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.results.hotels.map((h) => (
                      <Link key={h.id} href={`/accommodation/${h.id}`} className="glass-card rounded-xl overflow-hidden group">
                        <div className="relative aspect-[4/3]">
                          <Image src={h.cover_image || FALLBACK_IMAGES.hotel} alt={h.name} fill className="object-cover" unoptimized />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold line-clamp-1">{h.name}</h3>
                          <p className="text-xs text-muted-foreground">{h.city_label} • ★ {h.stars}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.counts.attractions > 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <Landmark size={20} className="text-primary" /> Places ({results.counts.attractions})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.results.attractions.map((a) => (
                      <Link key={a.id} href={`/khiva/${a.id}`} className="glass-card rounded-xl overflow-hidden group">
                        <div className="relative aspect-[4/3]">
                          <Image src={a.cover_image || '/images/ichan-kala.jpg'} alt={a.name} fill className="object-cover" unoptimized />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{a.icon} {a.name}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.counts.events > 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-primary" /> Events ({results.counts.events})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.results.events.map((e) => (
                      <Link key={e.id} href={`/events/${e.id}`} className="glass-card rounded-xl overflow-hidden">
                        <div className="relative aspect-[4/3]">
                          <Image src={e.cover_image_url || FALLBACK_IMAGES.event} alt={e.title} fill className="object-cover" unoptimized />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold line-clamp-1">{e.title}</h3>
                          <p className="text-xs text-muted-foreground">{new Date(e.start_date).toLocaleDateString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.counts.news > 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <Newspaper size={20} className="text-primary" /> News ({results.counts.news})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.results.news.map((n) => (
                      <Link key={n.id} href={`/news/${n.slug}`} className="glass-card rounded-xl overflow-hidden">
                        <div className="relative aspect-[4/3]">
                          <Image src={n.cover_image_url || FALLBACK_IMAGES.news} alt={n.title} fill className="object-cover" unoptimized />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold line-clamp-2 text-sm">{n.title}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.counts.restaurants > 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <Utensils size={20} className="text-primary" /> Restaurants ({results.counts.restaurants})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.results.restaurants.map((r) => (
                      <Link key={r.id} href={`/restaurants/${r.id}`} className="glass-card rounded-xl overflow-hidden">
                        <div className="relative aspect-[4/3]">
                          <Image src={r.cover_image || '/images/bazaar.jpg'} alt={r.name} fill className="object-cover" unoptimized />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold line-clamp-1">{r.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <PriceRange range={r.price_range} size={10} />
                            <span>•</span>
                            <span>⭐ {r.rating}</span>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.counts.tours > 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <Mountain size={20} className="text-primary" /> Tours ({results.counts.tours})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.results.tours.map((tour) => (
                      <Link key={tour.id} href={`/tours/${tour.slug}`} className="glass-card rounded-xl overflow-hidden">
                        <div className="relative aspect-[4/3]">
                          <Image src={tour.cover_image_url || '/images/ichan-kala.jpg'} alt={tour.title} fill className="object-cover" unoptimized />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold line-clamp-1">{tour.title}</h3>
                          <p className="text-xs text-muted-foreground">{tour.duration} {tour.duration_type_label}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.counts.hotels + results.counts.attractions + results.counts.events + results.counts.news + results.counts.restaurants + results.counts.tours === 0 && (
                <div className="text-center py-12 glass rounded-2xl">
                  <p className="text-muted-foreground">No results found for "{q}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SearchBar } from '@/components/search-bar';
import { HeroVideo } from '@/components/hero-video';
import { FadeIn, Stagger, StaggerItem, HoverCard } from '@/components/motion';
import { NumberCounter } from '@/components/number-counter';
import { PriceRange } from '@/components/price-range';
import { StatsSection } from '@/components/stats-section';
import { ScrollReveal } from '@/components/scroll-reveal';
import { TestimonialsCarousel, Testimonial } from '@/components/testimonials-carousel';
import { TiltCard } from '@/components/tilt-card';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth-context';
import { getSection } from '@/lib/translations';
import { getHomeSummary } from '@/lib/api-client';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { formatPrice } from '@/lib/i18n-helpers';
import { Attraction, Hotel, Event, News, Restaurant, Tour, StatsData } from '@/lib/types';
import { Landmark, BedDouble, Bus, Calendar, Utensils, Mountain, Newspaper, MapPin, Star, ArrowRight, Clock, Users } from 'lucide-react';

export default function Home() {
  const { language } = useI18n();
  const { user, isAuthenticated } = useAuth();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [stats, setStats] = useState<StatsData>({});
  const [loading, setLoading] = useState(true);

  const t = getSection('home', language);
  const tc = getSection('common', language);
  const tcat = getSection('categories', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getHomeSummary(language);
      setHotels(data?.featured_hotels ?? []);
      setAttractions(data?.attractions ?? []);
      setEvents(data?.events ?? []);
      setNews(data?.news ?? []);
      setRestaurants(data?.restaurants ?? []);
      setTours(data?.tours ?? []);
      setStats(data?.stats ?? {});
      setLoading(false);
    })();
  }, [language]);

  const categories = [
    { icon: Landmark, label: tcat.attractions, count: stats.total_attractions ?? 0, suffix: tcat.attractions_count, href: '/khiva', gradient: 'from-amber-500 to-orange-500' },
    { icon: BedDouble, label: tcat.hotels, count: stats.total_hotels ?? 0, suffix: tcat.hotels_count, href: '/accommodation', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Utensils, label: 'Restoranlar', count: stats.total_restaurants ?? 0, suffix: 'ta restoran', href: '/restaurants', gradient: 'from-orange-500 to-red-500' },
    { icon: Mountain, label: 'Turlar', count: stats.total_tours ?? 0, suffix: 'ta tur', href: '/tours', gradient: 'from-emerald-500 to-teal-500' },
    { icon: Bus, label: tcat.transport, count: stats.transport_routes ?? 0, suffix: tcat.transport_count, href: '/transport', gradient: 'from-green-500 to-lime-500' },
    { icon: Calendar, label: tcat.events, count: stats.total_events ?? 0, suffix: tcat.events_count, href: '/events', gradient: 'from-pink-500 to-rose-500' },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      country: 'United States',
      role: 'Tourist',
      rating: 5,
      text: "Khiva was absolutely magical! The ancient Ichan-Kala is like stepping into a fairytale. Our guide was fantastic and the hotels are surprisingly modern while keeping traditional charm.",
    },
    {
      id: 2,
      name: 'Марина Петрова',
      country: 'Россия',
      role: 'Блогер',
      rating: 5,
      text: "Хорезм превзошёл все ожидания! Кальта Минор, Джума-мечеть, и местная кухня — это то, что нужно обязательно испытать. Настоящая жемчужина Узбекистана.",
    },
    {
      id: 3,
      name: 'Hans Mueller',
      country: 'Germany',
      role: 'Photographer',
      rating: 5,
      text: "As a photographer, Khiva is a paradise. The architecture, the light, the colors — every corner is frame-worthy. UNESCO protected and for good reason!",
    },
    {
      id: 4,
      name: 'Akmal Yusupov',
      country: "O'zbekiston",
      role: 'Turist',
      rating: 5,
      text: "Xivada bo'lib turgan har safargi tashrifim — alohida tajriba. Kalta Minor va Juma masjidi hayratlantiradi. Xiva mehmondo'st, arzon va qulay!",
    },
    {
      id: 5,
      name: 'Yuki Tanaka',
      country: 'Japan',
      role: 'Historian',
      rating: 5,
      text: "The Silk Road history comes alive in Khiva. The preservation of the old city is remarkable. Friendly locals, great food, and incredible history. Highly recommend!",
    },
  ];

  const fallbackPlaceImg = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('kalta')) return '/images/kalta-minor.jpg';
    if (n.includes('juma')) return '/images/juma-mosque.jpg';
    if (n.includes('ark')) return '/images/ichan-kala.jpg';
    if (n.includes('darvoza')) return '/images/khiva-main.jpg';
    return '/images/ichan-kala.jpg';
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <HeroVideo poster="/images/khiva-main.jpg" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          {isAuthenticated && user ? (
            <div className="glass-button inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-in fade-in duration-1000">
              <span className="text-amber-400">👋</span>
              <span className="text-white/90 text-sm font-medium">
                Assalomu alaykum, {user.full_name.split(' ')[0]}!
              </span>
            </div>
          ) : (
            <div className="glass-button inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-in fade-in duration-1000">
              <Star size={14} className="text-amber-400" />
              <span className="text-white/90 text-sm font-medium">{t.hero_label}</span>
            </div>
          )}
          
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-6 leading-none animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t.hero_title}
          </h1>
          
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            {t.hero_subtitle}
          </p>

          <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <SearchBar placeholder={t.search_placeholder} size="lg" variant="glass" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link href="/khiva" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-xl">
              {t.explore_khiva}
            </Link>
            <Link href="/accommodation" className="px-8 py-3 rounded-full glass-button text-white font-semibold hover:scale-105 transition-all">
              {t.find_hotel}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="py-20 section-bg">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">{t.categories_title}</h2>
          </FadeIn>
          <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <StaggerItem key={cat.href}>
                <HoverCard>
                  <Link
                    href={cat.href}
                    className="glass-card rounded-2xl p-6 group block"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform gradient-icon-shadow`}>
                      <cat.icon className="text-white" size={26} strokeWidth={2.25} />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{cat.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      <NumberCounter value={cat.count} /> {cat.suffix}
                    </p>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <StatsSection stats={stats} />

      {/* ============ FEATURED PLACES ============ */}
      <section className="py-20 section-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">{t.featured_title}</h2>
              <p className="text-muted-foreground">UNESCO jahon merosi</p>
            </div>
            <Link href="/khiva" className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              {tc.view_all} <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] glass-card rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {attractions.slice(0, 4).map((p) => (
                <StaggerItem key={p.id}>
                  <HoverCard lift={-6}>
                    <Link
                      href={`/khiva/${p.id}`}
                      className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
                    >
                      <Image
                        src={p.cover_image || fallbackPlaceImg(p.name)}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      {/* UNESCO badge top-left */}
                      <div className="absolute top-3 left-3 glass-strong px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1">
                        <Landmark size={11} strokeWidth={2.5} />
                        UNESCO
                      </div>
                      {/* Top badge top-right */}
                      {p.is_featured && (
                        <div className="absolute top-3 right-3 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                          <Star size={14} className="fill-current" strokeWidth={2.5} />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-serif font-bold text-lg mb-1 drop-shadow-lg">{p.name}</h3>
                        <p className="text-white/80 text-xs flex items-center gap-1">
                          <MapPin size={10} strokeWidth={2.5} /> Xiva, Xorazm
                        </p>
                      </div>
                    </Link>
                  </HoverCard>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {/* ============ BEST HOTELS ============ */}
      <section className="py-20 section-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">{t.hotels_title}</h2>
              <p className="text-muted-foreground">Premium mehmonxonalar</p>
            </div>
            <Link href="/accommodation" className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              {tc.view_all} <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => <div key={i} className="h-80 glass-card rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotels.slice(0, 3).map((h) => (
                <Link
                  key={h.id}
                  href={`/accommodation/${h.id}`}
                  className="glass-card rounded-2xl overflow-hidden group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={h.cover_image || FALLBACK_IMAGES.hotel}
                      alt={h.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4 glass-strong px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold">★ {h.stars}</span>
                    </div>
                    {h.is_featured && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-xl mb-2 line-clamp-1">{h.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                      <MapPin size={12} /> {h.city_label} • ⭐ {h.rating}
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">{formatPrice(h.price_per_night)}</div>
                        <div className="text-xs text-muted-foreground">/ {tc.per_night}</div>
                      </div>
                      <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        {tc.view} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ RESTAURANTS ============ */}
      {restaurants.length > 0 && (
        <section className="py-20 section-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">Mashhur restoranlar</h2>
                <p className="text-muted-foreground">Xorazmning eng yaxshi taomlari</p>
              </div>
              <Link href="/restaurants" className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                {tc.view_all} <ArrowRight size={18} />
              </Link>
            </div>

            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {restaurants.slice(0, 4).map((r) => (
                <StaggerItem key={r.id}>
                  <HoverCard lift={-6}>
                    <Link href={`/restaurants/${r.id}`} className="glass-card rounded-2xl overflow-hidden group block">
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={r.cover_image || '/images/bazaar.jpg'}
                          alt={r.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          unoptimized
                        />
                        <div className="absolute top-3 left-3 glass-strong px-2 py-1 rounded-full">
                          <PriceRange range={r.price_range} size={11} />
                        </div>
                        <div className="absolute top-3 right-3 glass-strong px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star size={10} className="fill-amber-500 text-amber-500" strokeWidth={2.5} /> {r.rating}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-base mb-2 line-clamp-1">{r.name}</h3>
                        <div className="flex flex-wrap gap-1">
                          {r.cuisines.slice(0, 2).map(c => (
                            <span key={c.id} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                              {c.icon} {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ============ TOURS ============ */}
      {tours.length > 0 && (
        <section className="py-20 section-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">Tayyor turlar</h2>
                <p className="text-muted-foreground">Professional gidlar bilan sayohat</p>
              </div>
              <Link href="/tours" className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                {tc.view_all} <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tours.slice(0, 3).map((tour) => (
                <Link key={tour.id} href={`/tours/${tour.slug}`} className="glass-card rounded-2xl overflow-hidden group">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={tour.cover_image_url || '/images/ichan-kala.jpg'}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-3 right-3 glass-strong px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star size={10} className="fill-amber-500 text-amber-500" /> {tour.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-lg mb-2 line-clamp-1">{tour.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{tour.short_description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Clock size={12} />{tour.duration} {tour.duration_type_label}</span>
                      <span className="flex items-center gap-1"><Users size={12} />Max {tour.max_people}</span>
                    </div>
                    <div className="text-lg font-bold text-primary">{formatPrice(tour.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ EVENTS ============ */}
      {events.length > 0 && (
        <section className="py-20 section-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">{t.events_title}</h2>
              </div>
              <Link href="/events" className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                {tc.view_all} <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {events.slice(0, 4).map((e) => (
                <Link
                  key={e.id}
                  href={`/events/${e.id}`}
                  className="glass-card rounded-2xl overflow-hidden group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={e.cover_image_url || FALLBACK_IMAGES.event}
                      alt={e.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 glass-strong px-2 py-1 rounded-lg">
                      <div className="text-xs font-semibold">
                        {new Date(e.start_date).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    {e.is_free && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                        {tc.free}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">{e.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={10} /> {e.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ NEWS ============ */}
      {news.length > 0 && (
        <section className="py-20 section-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">{t.news_title}</h2>
              </div>
              <Link href="/news" className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                {tc.view_all} <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.slice(0, 3).map((n) => (
                <Link
                  key={n.id}
                  href={`/news/${n.slug}`}
                  className="glass-card rounded-2xl overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={n.cover_image_url || FALLBACK_IMAGES.news}
                      alt={n.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                      <Newspaper size={12} />
                      <span>{new Date(n.published_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU')}</span>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{n.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ TESTIMONIALS ============ */}
      <TestimonialsCarousel testimonials={testimonials} />

      <Footer />
    </div>
  );
}

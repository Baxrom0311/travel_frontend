'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { ImageSlideshow } from '@/components/image-slideshow';
import { RatingStars } from '@/components/rating-stars';
import {
  getHotels,
  getHotelStats,
  getTransport,
  getImageUrl,
} from '@/lib/api-client';
import { HOMEPAGE_IMAGES, FALLBACK_IMAGES } from '@/lib/constants';
import { getLocalized, formatPrice } from '@/lib/i18n-helpers';
import { Hotel, TransportRoute, StatsData } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { t, language } = useI18n();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [transport, setTransport] = useState<TransportRoute[]>([]);
  const [stats, setStats] = useState<StatsData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [hotelsData, transportData, statsData] = await Promise.all([
        getHotels({ featured: true }, language),
        getTransport(undefined, language),
        getHotelStats(),
      ]);
      setHotels(hotelsData);
      setTransport(transportData);
      setStats(statsData);
      setLoading(false);
    };
    loadData();
  }, [language]);

  // Slideshow uchun: hotel'lar cover_image'idan + fallback mahalliy rasmlar
  const heroImages =
    hotels.length > 0
      ? hotels
          .slice(0, 4)
          .map((h) => getImageUrl(h.cover_image))
          .filter(Boolean)
      : HOMEPAGE_IMAGES;

  const translations = {
    uz: {
      hero_explore: 'Кашф этинг',
      stats_title: 'Рақамларда',
      features_title: 'Нега Хоразмни танлаш керак',
      features: [
        { title: 'Бой маданият', desc: 'Қадимий ва замонавий меросининг уйғунлиги' },
        { title: 'Қадимий тарих', desc: 'Минг йиллик тарихни кашф этинг' },
        { title: 'Тажрибали гидлар', desc: 'Сафарингиз учун энг яхши гидлар' },
        { title: 'Қулай яшаш', desc: 'Ишончли ва қулай меҳмонхоналар' },
      ],
      hotels: 'Меҳмонхоналар',
      transport: 'Транспорт',
      view_all: 'Барчасини кўриш',
      about: 'Биз ҳақимизда',
      about_desc:
        'Хоразм — Ўзбекистоннинг энг қадимий ҳудуди бўлиб, бой маданият ва тарихий аҳамияти билан машҳур.',
      about_desc2:
        'Хоразмда қадимий шаҳарлар, саройлар ва масжидлар жойлашган бўлиб, улар унинг бой маданий меросидан далолат беради.',
      explore_khiva: 'Хивани кашф этинг',
      book: 'Буюртма бериш',
      view: 'Кўриш',
      visitors: 'Сайёҳлар',
    },
    en: {
      hero_explore: 'Explore Now',
      stats_title: 'By the Numbers',
      features_title: 'Why Choose Khorezm',
      features: [
        { title: 'Rich Culture', desc: 'Blend of ancient and modern heritage' },
        { title: 'Ancient History', desc: 'Discover millennia of history' },
        { title: 'Expert Guides', desc: 'Best guides for your journey' },
        { title: 'Comfortable Stay', desc: 'Reliable and comfortable hotels' },
      ],
      hotels: 'Hotels',
      transport: 'Transport',
      view_all: 'View All',
      about: 'About Us',
      about_desc:
        'Khorezm is the most ancient region of Uzbekistan, famous for its rich culture and historical significance.',
      about_desc2:
        'Khorezm is home to ancient cities, palaces, and mosques that bear witness to its rich cultural heritage.',
      explore_khiva: 'Explore Khiva',
      book: 'Book',
      view: 'View',
      visitors: 'Visitors',
    },
    ru: {
      hero_explore: 'Исследовать',
      stats_title: 'В цифрах',
      features_title: 'Почему выбрать Хорезм',
      features: [
        { title: 'Богатая культура', desc: 'Смесь древнего и современного наследия' },
        { title: 'Древняя история', desc: 'Откройте тысячелетия истории' },
        { title: 'Опытные гиды', desc: 'Лучшие гиды для вашего путешествия' },
        { title: 'Комфортное проживание', desc: 'Надёжные и удобные отели' },
      ],
      hotels: 'Отели',
      transport: 'Транспорт',
      view_all: 'Посмотреть все',
      about: 'О нас',
      about_desc:
        'Хорезм — самый древний регион Узбекистана, известный своей богатой культурой и историческим значением.',
      about_desc2:
        'В Хорезме находятся древние города, дворцы и мечети, которые свидетельствуют о его богатом культурном наследии.',
      explore_khiva: 'Исследовать Хиву',
      book: 'Забронировать',
      view: 'Посмотреть',
      visitors: 'Посетители',
    },
  };

  const trans = translations[language];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-secondary">
        <ImageSlideshow images={heroImages} className="h-full" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white space-y-4 pointer-events-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 text-pretty">
              {t('hero.subtitle')}
            </p>
            <Link href="/accommodation">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {trans.hero_explore}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {trans.stats_title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {(stats.visitors ?? 10000).toLocaleString()}+
              </div>
              <p className="text-muted-foreground">{trans.visitors}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stats.hotels ?? hotels.length ?? 50}+
              </div>
              <p className="text-muted-foreground">{trans.hotels}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stats.attractions ?? 25}+
              </div>
              <p className="text-muted-foreground">{t('stats.attractions')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stats.guides ?? 30}+
              </div>
              <p className="text-muted-foreground">{t('stats.guides')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {trans.features_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trans.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-secondary border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels Preview */}
      <section className="py-16 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {trans.hotels}
            </h2>
            <Link href="/accommodation">
              <Button variant="outline">{trans.view_all}</Button>
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : hotels.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {language === 'uz'
                ? 'Меҳмонхоналар топилмади'
                : language === 'ru'
                  ? 'Отели не найдены'
                  : 'No hotels found'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hotels.slice(0, 3).map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/accommodation?hotel=${hotel.id}`}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors group"
                >
                  <div className="relative h-48 bg-secondary overflow-hidden">
                    <Image
                      src={getImageUrl(hotel.cover_image) || FALLBACK_IMAGES.hotel}
                      alt={getLocalized(hotel, 'name', language) || hotel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
                      {getLocalized(hotel, 'name', language) || hotel.name}
                    </h3>
                    <RatingStars rating={hotel.rating} className="mb-3" />
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {getLocalized(hotel, 'description', language) ||
                        hotel.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-semibold">
                        {formatPrice(hotel.price_per_night)}
                      </span>
                      <Button size="sm" variant="outline">
                        {trans.view}
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Transport Preview */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {trans.transport}
            </h2>
            <Link href="/transport">
              <Button variant="outline">{trans.view_all}</Button>
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-secondary border border-border rounded-lg p-6 animate-pulse"
                >
                  <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {transport.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className="bg-secondary border border-border rounded-lg p-6 hover:border-primary transition-colors"
                >
                  <div className="text-3xl mb-3">{t.icon || '🚕'}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t.type_label}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-1">
                    <span className="font-medium">
                      {getLocalized(t, 'from_location', language) ||
                        t.from_location}
                    </span>
                    {' → '}
                    <span className="font-medium">
                      {getLocalized(t, 'to_location', language) || t.to_location}
                    </span>
                  </p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {getLocalized(t, 'description', language) || t.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold text-sm">
                      {t.price_label}
                    </span>
                    <Link href="/transport">
                      <Button size="sm" variant="outline">
                        {trans.book}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/khiva-main.jpg"
                alt="Khiva ancient city"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {trans.about}
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {trans.about_desc}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {trans.about_desc2}
              </p>
              <Link href="/khiva">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {trans.explore_khiva}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

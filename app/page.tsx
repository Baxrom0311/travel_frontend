'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { ImageSlideshow } from '@/components/image-slideshow';
import { RatingStars } from '@/components/rating-stars';
import { getHotels, getStats, getTransport, getAttractions } from '@/lib/api-client';
import { SAMPLE_HOTELS, SAMPLE_TRANSPORT, HOMEPAGE_IMAGES } from '@/lib/constants';
import { Hotel, Transport, StatsData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HERO_IMAGES = HOMEPAGE_IMAGES;

export default function Home() {
  const { t, language } = useI18n();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [transport, setTransport] = useState<Transport[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [hotelsData, transportData, statsData] = await Promise.all([
          getHotels().catch(() => SAMPLE_HOTELS),
          getTransport().catch(() => SAMPLE_TRANSPORT),
          getStats().catch(() => null),
        ]);
        setHotels(hotelsData || SAMPLE_HOTELS);
        setTransport(transportData || SAMPLE_TRANSPORT);
        setStats(statsData);
        setLoading(false);
      } catch {
        // Use sample data as fallback
        setHotels(SAMPLE_HOTELS);
        setTransport(SAMPLE_TRANSPORT);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const translations = {
    uz: {
      hero_explore: 'Кашф этинг',
      stats_title: 'Кўчайди ва ўсади',
      features_title: 'Нега Хорезмни танлайсиз',
      features: [
        { title: 'Бойитирилган маданият', desc: 'Қадимий ва ҳозирги маданиятнинг мўғимча' },
        { title: 'Қадимий тарих', desc: 'Минг йиллик тарихни кашф этинг' },
        { title: 'Маҳир гидлар', desc: 'Энг яхши гидлар сизнинг йўллашувингизда' },
        { title: 'Ўтирмали қолиш', desc: 'Ишончли ва қўлай меҳманхоналарда' },
      ],
      hotels: 'Меҳманхонаси',
      transport: 'Транспорт',
      about: 'Биз хақимизда',
      about_desc: 'Хорезм Ўзбекистонининг энг қадимий ҳудуди бўлиб, бойитирилган маданият ва тариххи билан машҳур.',
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
      about: 'About Us',
      about_desc: 'Khorezm is the most ancient region of Uzbekistan, famous for its rich culture and historical significance.',
    },
    ru: {
      hero_explore: 'Исследовать',
      stats_title: 'Статистика',
      features_title: 'Почему выбрать Хорезм',
      features: [
        { title: 'Богатая культура', desc: 'Смесь древнего и современного наследия' },
        { title: 'Древняя история', desc: 'Откройте тысячелетия истории' },
        { title: 'Опытные гиды', desc: 'Лучшие гиды для вашего путешествия' },
        { title: 'Комфортное проживание', desc: 'Надежные и удобные отели' },
      ],
      hotels: 'Отели',
      transport: 'Транспорт',
      about: 'О нас',
      about_desc: 'Хорезм - самый древний регион Узбекистана, известный своим богатым культурным наследием.',
    },
  };

  const trans = translations[language];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-secondary">
        <ImageSlideshow images={HERO_IMAGES} className="h-full" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              {t('hero.subtitle')}
            </p>
            <Link href="/accommodation">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
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
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stats.visitors.toLocaleString()}+
                </div>
                <p className="text-muted-foreground">{t('stats.visitors')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stats.hotels}
                </div>
                <p className="text-muted-foreground">{t('stats.hotels')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stats.attractions}
                </div>
                <p className="text-muted-foreground">{t('stats.attractions')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stats.guides}+
                </div>
                <p className="text-muted-foreground">{t('stats.guides')}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {trans.features_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trans.features.map((feature, idx) => (
              <div key={idx} className="bg-secondary border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.desc}</p>
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
              <Button variant="outline">{t('accommodation.filter')}</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotels.slice(0, 3).map((hotel) => (
              <div
                key={hotel.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
              >
                <div className="h-48 bg-secondary" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {hotel.name}
                  </h3>
                  <RatingStars rating={hotel.rating} className="mb-3" />
                  <p className="text-muted-foreground text-sm mb-4">
                    {hotel.description.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">
                      ${hotel.price}
                    </span>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transport.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="bg-secondary border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t.name}
                </h3>
                <RatingStars rating={t.rating} className="mb-3" />
                <p className="text-muted-foreground text-sm mb-4">
                  {t.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">
                    ${t.price}
                  </span>
                  <Button size="sm" variant="outline">
                    Book
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-64 md:h-96 bg-border rounded-lg" />
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {trans.about}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {trans.about_desc}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {language === 'uz'
                  ? 'Хорезм сўзининг маъноси "собиқ қирғоқ" деп маъқул. Бу ўлкада қадимий шахрлар, сарайлар ва мечитлар жойлашган.'
                  : language === 'ru'
                    ? 'В Хорезме находятся древние города, дворцы и мечети, которые свидетельствуют о его богатом культурном наследии.'
                    : 'Khorezm is home to ancient cities, palaces, and mosques that bear witness to its rich cultural heritage.'}
              </p>
              <Link href="/khiva">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {language === 'uz' ? 'Хивани кашф этинг' : language === 'ru' ? 'Исследовать Хиву' : 'Explore Khiva'}
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

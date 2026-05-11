'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getHotels, getImageUrl } from '@/lib/api-client';
import { getLocalized, formatPrice } from '@/lib/i18n-helpers';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { Hotel } from '@/lib/types';
import { RatingStars } from '@/components/rating-stars';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const AccommodationMap = dynamic(
  () =>
    import('@/components/accommodation-map').then(
      (mod) => mod.AccommodationMap
    ),
  { ssr: false }
);

// API'da narx UZS'da keladi. Filter uchun (min,max) ni so'm bo'yicha qo'yamiz.
const MIN_PRICE = 0;
const MAX_PRICE = 5_000_000; // 5 mln so'm

export default function AccommodationPage() {
  const { language } = useI18n();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filtered, setFiltered] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([MIN_PRICE, MAX_PRICE]);
  const [minRating, setMinRating] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const translations = {
    uz: {
      title: 'Меҳмонхона танлаш',
      search: 'Қидириш...',
      price: 'Нарх (сўм)',
      rating: 'Баҳо',
      amenities: 'Қулайликлар',
      reset: 'Тозалаш',
      no_hotels: 'Меҳмонхоналар топилмади',
      stars: 'юлдуз',
      per_night: '/кеча',
    },
    en: {
      title: 'Find Your Hotel',
      search: 'Search hotels...',
      price: 'Price (UZS)',
      rating: 'Rating',
      amenities: 'Amenities',
      reset: 'Reset',
      no_hotels: 'No hotels found',
      stars: 'stars',
      per_night: '/night',
    },
    ru: {
      title: 'Найти отель',
      search: 'Поиск отелей...',
      price: 'Цена (UZS)',
      rating: 'Рейтинг',
      amenities: 'Услуги',
      reset: 'Сбросить',
      no_hotels: 'Отели не найдены',
      stars: 'звёзд',
      per_night: '/ночь',
    },
  };

  const trans = translations[language];

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      const data = await getHotels({}, language);
      setHotels(data);
      setFiltered(data);
      if (data.length > 0) {
        setSelectedHotel(data[0]);
      }
      setLoading(false);
    };
    loadHotels();
  }, [language]);

  useEffect(() => {
    const result = hotels.filter((hotel) => {
      const name = (
        getLocalized(hotel, 'name', language) ||
        hotel.name ||
        ''
      ).toLowerCase();
      const desc = (
        getLocalized(hotel, 'description', language) ||
        hotel.description ||
        ''
      ).toLowerCase();
      const matchesSearch =
        !search ||
        name.includes(search.toLowerCase()) ||
        desc.includes(search.toLowerCase());
      const matchesPrice =
        hotel.price_per_night >= priceRange[0] &&
        hotel.price_per_night <= priceRange[1];
      const matchesRating = hotel.rating >= minRating;
      return matchesSearch && matchesPrice && matchesRating;
    });
    setFiltered(result);
  }, [search, priceRange, minRating, hotels, language]);

  const handleReset = () => {
    setSearch('');
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Sidebar - Filters & List */}
        <div className="w-full lg:w-[450px] border-r border-border overflow-y-auto bg-background">
          <div className="p-6 space-y-6">
            <h1 className="font-serif text-3xl font-bold text-foreground">
              {trans.title}
            </h1>

            {/* Search */}
            <Input
              placeholder={trans.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary border-border"
            />

            {/* Price Filter */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                {trans.price}: {formatPrice(priceRange[0])} —{' '}
                {formatPrice(priceRange[1])}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={100_000}
                className="w-full"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                {trans.rating}: {minRating.toFixed(1)}+
              </label>
              <Slider
                value={[minRating]}
                onValueChange={(val) => setMinRating(val[0])}
                min={0}
                max={10}
                step={0.5}
                className="w-full"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              {trans.reset}
            </Button>

            {/* Hotels List */}
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border-border animate-pulse">
                    <CardContent className="p-4 space-y-2">
                      <div className="h-32 bg-muted rounded" />
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {trans.no_hotels}
              </p>
            ) : (
              <div className="space-y-3">
                {filtered.map((hotel) => (
                  <Card
                    key={hotel.id}
                    className={`cursor-pointer border transition-colors overflow-hidden ${
                      selectedHotel?.id === hotel.id
                        ? 'border-primary bg-secondary'
                        : 'border-border hover:border-primary'
                    }`}
                    onClick={() => setSelectedHotel(hotel)}
                  >
                    {/* Hotel image from backend */}
                    <div className="relative w-full h-40 bg-secondary">
                      <Image
                        src={
                          getImageUrl(hotel.cover_image) ||
                          FALLBACK_IMAGES.hotel
                        }
                        alt={getLocalized(hotel, 'name', language) || hotel.name}
                        fill
                        sizes="450px"
                        className="object-cover"
                        unoptimized
                      />
                      {hotel.stars > 0 && (
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-semibold">
                          {hotel.stars} ★
                        </span>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-foreground line-clamp-1">
                        {getLocalized(hotel, 'name', language) || hotel.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pb-4">
                      <div className="flex justify-between items-start">
                        <RatingStars rating={hotel.rating / 2} />
                        <span className="text-primary font-semibold text-sm">
                          {formatPrice(hotel.price_per_night)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {hotel.city_label} • {hotel.address_i18n || hotel.address}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {getLocalized(hotel, 'description', language) ||
                          hotel.description}
                      </p>
                      {hotel.amenities && hotel.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2">
                          {hotel.amenities.slice(0, 4).map((a) => (
                            <span
                              key={a.id}
                              className="text-xs bg-secondary border border-border rounded-full px-2 py-0.5 text-muted-foreground"
                              title={a.name}
                            >
                              {a.icon}{' '}
                              {getLocalized(a, 'name', language) || a.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="flex-1 hidden lg:block sticky top-16 h-[calc(100vh-64px)]">
          {filtered.length > 0 && (
            <AccommodationMap
              hotels={filtered}
              selectedHotel={selectedHotel}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

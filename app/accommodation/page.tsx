'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getHotels } from '@/lib/api-client';
import { SAMPLE_HOTELS } from '@/lib/constants';
import { Hotel } from '@/lib/types';
import { RatingStars } from '@/components/rating-stars';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const AccommodationMap = dynamic(
  () => import('@/components/accommodation-map').then((mod) => mod.AccommodationMap),
  { ssr: false }
);

export default function AccommodationPage() {
  const { language } = useI18n();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filtered, setFiltered] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const translations = {
    uz: {
      title: 'Меҳманхонасини танлаш',
      search: 'Қидирув...',
      price: 'Нарх',
      rating: 'Баҳо',
      rooms: 'Хонаси',
      reviews: 'Шарҳлар',
      amenities: 'Хизматлар',
      reset: 'Қайта ўзгартириш',
    },
    en: {
      title: 'Find Your Perfect Hotel',
      search: 'Search hotels...',
      price: 'Price',
      rating: 'Rating',
      rooms: 'Rooms',
      reviews: 'Reviews',
      amenities: 'Amenities',
      reset: 'Reset',
    },
    ru: {
      title: 'Найти идеальный отель',
      search: 'Поиск отелей...',
      price: 'Цена',
      rating: 'Рейтинг',
      rooms: 'Комнаты',
      reviews: 'Отзывы',
      amenities: 'Услуги',
      reset: 'Сбросить',
    },
  };

  const trans = translations[language];

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await getHotels();
        setHotels(data || SAMPLE_HOTELS);
        setFiltered(data || SAMPLE_HOTELS);
        if ((data || SAMPLE_HOTELS).length > 0) {
          setSelectedHotel((data || SAMPLE_HOTELS)[0]);
        }
      } catch {
        setHotels(SAMPLE_HOTELS);
        setFiltered(SAMPLE_HOTELS);
        if (SAMPLE_HOTELS.length > 0) {
          setSelectedHotel(SAMPLE_HOTELS[0]);
        }
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, []);

  useEffect(() => {
    const filtered = hotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.description.toLowerCase().includes(search.toLowerCase());
      const matchesPrice =
        hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesRating = hotel.rating >= minRating;
      return matchesSearch && matchesPrice && matchesRating;
    });
    setFiltered(filtered);
  }, [search, priceRange, minRating, hotels]);

  const handleReset = () => {
    setSearch('');
    setPriceRange([0, 500]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Left Sidebar - Filters */}
        <div className="w-full lg:w-96 border-r border-border overflow-y-auto">
          <div className="p-6 space-y-6">
            <h1 className="font-serif text-3xl font-bold text-foreground">
              {trans.title}
            </h1>

            {/* Search */}
            <div>
              <Input
                placeholder={trans.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                {trans.price}: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={500}
                step={10}
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
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Reset Button */}
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full"
            >
              {trans.reset}
            </Button>

            {/* Hotels List */}
            <div className="space-y-3">
              {filtered.map((hotel) => (
                <Card
                  key={hotel.id}
                  className={`cursor-pointer border transition-colors ${
                    selectedHotel?.id === hotel.id
                      ? 'border-primary bg-secondary'
                      : 'border-border hover:border-primary'
                  }`}
                  onClick={() => setSelectedHotel(hotel)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-foreground">
                      {hotel.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-start">
                      <RatingStars rating={hotel.rating} />
                      <span className="text-primary font-semibold">${hotel.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {hotel.rooms} {trans.rooms} • {hotel.reviews} {trans.reviews}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {hotel.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="flex-1 hidden lg:block">
          {selectedHotel && (
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

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getAttractions, getImageUrl } from '@/lib/api-client';
import { getLocalized } from '@/lib/i18n-helpers';
import { Attraction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';

const KhivaMap = dynamic(
  () => import('@/components/khiva-map').then((mod) => mod.KhivaMap),
  { ssr: false }
);

export default function KhivaPage() {
  const { language } = useI18n();
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);

  const translations = {
    uz: {
      title: 'Хива',
      subtitle: 'Ўзбекистоннинг қадимий жавоҳири',
      all: 'Барчаси',
      featured: 'Асосий',
      featured_badge: 'Тавсия этилган',
      location: 'Жойлашув',
      no_attractions: 'Жойлар топилмади',
      view_on_map: 'Харитада кўриш',
    },
    en: {
      title: 'Khiva',
      subtitle: 'The Ancient Jewel of Uzbekistan',
      all: 'All',
      featured: 'Featured',
      featured_badge: 'Featured',
      location: 'Location',
      no_attractions: 'No attractions found',
      view_on_map: 'View on map',
    },
    ru: {
      title: 'Хива',
      subtitle: 'Древняя жемчужина Узбекистана',
      all: 'Все',
      featured: 'Рекомендуемые',
      featured_badge: 'Рекомендуем',
      location: 'Расположение',
      no_attractions: 'Достопримечательности не найдены',
      view_on_map: 'Посмотреть на карте',
    },
  };

  const trans = translations[language];

  useEffect(() => {
    const loadAttractions = async () => {
      setLoading(true);
      const data = await getAttractions(undefined, language);
      setAttractions(data);
      if (data.length > 0) {
        setSelectedAttraction(data[0]);
      }
      setLoading(false);
    };
    loadAttractions();
  }, [language]);

  const filtered = showFeaturedOnly
    ? attractions.filter((a) => a.is_featured)
    : attractions;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative py-20 bg-secondary border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/khiva-main.jpg"
            alt="Khiva"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            {trans.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            {trans.subtitle}
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* Left Sidebar - Attractions List */}
        <div className="w-full lg:w-[420px] border-r border-border overflow-y-auto bg-background">
          <div className="p-6 space-y-4">
            {/* Filter buttons */}
            <div className="flex gap-2">
              <Button
                variant={!showFeaturedOnly ? 'default' : 'outline'}
                onClick={() => setShowFeaturedOnly(false)}
                size="sm"
              >
                {trans.all}
              </Button>
              <Button
                variant={showFeaturedOnly ? 'default' : 'outline'}
                onClick={() => setShowFeaturedOnly(true)}
                size="sm"
              >
                <Star size={14} className="mr-1" />
                {trans.featured}
              </Button>
            </div>

            {/* Attractions list */}
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="border-border animate-pulse">
                    <CardContent className="p-4 space-y-2">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {trans.no_attractions}
              </p>
            ) : (
              <div className="space-y-3">
                {filtered.map((attraction) => (
                  <Card
                    key={attraction.id}
                    className={`cursor-pointer border transition-colors overflow-hidden ${
                      selectedAttraction?.id === attraction.id
                        ? 'border-primary bg-secondary'
                        : 'border-border hover:border-primary'
                    }`}
                    onClick={() => setSelectedAttraction(attraction)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-3xl shrink-0">
                            {attraction.icon || '📍'}
                          </span>
                          <div className="min-w-0">
                            <CardTitle className="text-base text-foreground line-clamp-1">
                              {getLocalized(attraction, 'name', language) ||
                                attraction.name}
                            </CardTitle>
                          </div>
                        </div>
                        {attraction.is_featured && (
                          <Badge className="bg-primary text-primary-foreground text-xs shrink-0">
                            <Star size={10} className="mr-1" />
                            {trans.featured_badge}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {getLocalized(attraction, 'description', language) ||
                          attraction.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <MapPin size={12} />
                        <span>
                          {attraction.latitude.toFixed(4)},{' '}
                          {attraction.longitude.toFixed(4)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Map & Details */}
        <div className="flex-1 flex flex-col">
          {/* Map */}
          <div className="flex-1 min-h-[400px] lg:min-h-0 sticky top-16">
            {filtered.length > 0 && (
              <KhivaMap
                attractions={filtered}
                selectedAttraction={selectedAttraction}
              />
            )}
          </div>

          {/* Details Panel */}
          {selectedAttraction && (
            <div className="p-6 border-t border-border space-y-4 bg-secondary">
              <div className="flex items-start gap-4">
                <span className="text-5xl">{selectedAttraction.icon || '📍'}</span>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-1">
                    {getLocalized(selectedAttraction, 'name', language) ||
                      selectedAttraction.name}
                  </h2>
                  {selectedAttraction.is_featured && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Star size={12} className="mr-1" />
                      {trans.featured_badge}
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {getLocalized(selectedAttraction, 'description', language) ||
                  selectedAttraction.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
                <MapPin size={16} className="text-primary" />
                <span>
                  {selectedAttraction.latitude.toFixed(4)},{' '}
                  {selectedAttraction.longitude.toFixed(4)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

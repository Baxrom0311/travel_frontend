'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getAttractions } from '@/lib/api-client';
import { Attraction } from '@/lib/types';
import { RatingStars } from '@/components/rating-stars';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, MapPin } from 'lucide-react';

const KhivaMap = dynamic(
  () => import('@/components/khiva-map').then((mod) => mod.KhivaMap),
  { ssr: false }
);

export default function KhivaPage() {
  const { language } = useI18n();
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  const translations = {
    uz: {
      title: 'Хива',
      subtitle: 'Ўзбекистонининг қадимий шахри',
      gates: 'Қўллари',
      museums: 'Музейлар',
      monuments: 'Ёдгорликлар',
      historic: 'Тарихий жойлар',
      hours: 'Очиқ вақти',
      entry_fee: 'Кириш нархи',
      learn_more: 'Кўпроқ ўқинг',
      location: 'Жойлашув',
    },
    en: {
      title: 'Khiva',
      subtitle: 'The Ancient Jewel of Uzbekistan',
      gates: 'Gates',
      museums: 'Museums',
      monuments: 'Monuments',
      historic: 'Historic Sites',
      hours: 'Hours',
      entry_fee: 'Entry Fee',
      learn_more: 'Learn More',
      location: 'Location',
    },
    ru: {
      title: 'Хива',
      subtitle: 'Древняя жемчужина Узбекистана',
      gates: 'Ворота',
      museums: 'Музеи',
      monuments: 'Памятники',
      historic: 'Исторические места',
      hours: 'Часы работы',
      entry_fee: 'Входная плата',
      learn_more: 'Узнать больше',
      location: 'Расположение',
    },
  };

  const trans = translations[language];
  const categoryMap: { [key: string]: string } = {
    gate: trans.gates,
    museum: trans.museums,
    monument: trans.monuments,
    historic: trans.historic,
  };

  useEffect(() => {
    const loadAttractions = async () => {
      const data = await getAttractions();
      setAttractions(data);
      if (data.length > 0) {
        setSelectedAttraction(data[0]);
      }
      setLoading(false);
    };
    loadAttractions();
  }, []);

  const filtered = selectedCategory
    ? attractions.filter((a) => a.category === selectedCategory)
    : attractions;

  const categories = [
    'gate',
    'museum',
    'monument',
    'historic',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-16 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {trans.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {trans.subtitle}
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Attractions List */}
        <div className="w-full lg:w-96 border-r border-border overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="p-6 space-y-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {language === 'uz' ? 'Барчаси' : language === 'ru' ? 'Все' : 'All'}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {categoryMap[cat]}
                </button>
              ))}
            </div>

            {/* Attractions List */}
            <div className="space-y-2 mt-6">
              {filtered.map((attraction) => (
                <Card
                  key={attraction.id}
                  className={`cursor-pointer border transition-colors ${
                    selectedAttraction?.id === attraction.id
                      ? 'border-primary bg-secondary'
                      : 'border-border hover:border-primary'
                  }`}
                  onClick={() => setSelectedAttraction(attraction)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-sm text-foreground">
                        {attraction.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {categoryMap[attraction.category]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <RatingStars rating={attraction.rating} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Map & Details */}
        <div className="flex-1 flex flex-col">
          {/* Map */}
          <div className="flex-1 hidden lg:block min-h-96">
            {selectedAttraction && (
              <KhivaMap attractions={filtered} selectedAttraction={selectedAttraction} />
            )}
          </div>

          {/* Details Panel */}
          {selectedAttraction && (
            <div className="p-6 border-t border-border space-y-4 bg-secondary">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {selectedAttraction.name}
                </h2>
                <RatingStars rating={selectedAttraction.rating} className="mb-3" />
              </div>

              <p className="text-muted-foreground">
                {selectedAttraction.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-primary mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">{trans.hours}</p>
                    <p className="text-foreground font-semibold">
                      {selectedAttraction.visitingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign size={20} className="text-primary mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">{trans.entry_fee}</p>
                    <p className="text-foreground font-semibold">
                      ${selectedAttraction.entryFee}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {trans.learn_more}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

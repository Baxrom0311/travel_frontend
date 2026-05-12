'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getTransport } from '@/lib/api-client';
import { getLocalized } from '@/lib/i18n-helpers';
import { TransportRoute, TransportTypeEnum } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';

type FilterType = TransportTypeEnum | 'all';

export default function TransportPage() {
  const { language } = useI18n();
  const [transport, setTransport] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<FilterType>('all');

  const translations = {
    uz: {
      title: 'Транспорт хизматлари',
      subtitle: 'Ҳудудда қулай ва ишончли транспорт йўналишлари',
      types: { taxi: 'Такси', bus: 'Автобус', train: 'Поезд' },
      all: 'Барчаси',
      duration: 'Давомийлик',
      route: 'Йўналиш',
      no_routes: 'Йўналишлар топилмади',
      book: 'Буюртма бериш',
    },
    en: {
      title: 'Transportation Services',
      subtitle: 'Reliable and comfortable transport routes',
      types: { taxi: 'Taxi', bus: 'Bus', train: 'Train' },
      all: 'All',
      duration: 'Duration',
      route: 'Route',
      no_routes: 'No routes found',
      book: 'Book',
    },
    ru: {
      title: 'Услуги транспорта',
      subtitle: 'Надёжные и удобные транспортные маршруты',
      types: { taxi: 'Такси', bus: 'Автобус', train: 'Поезд' },
      all: 'Все',
      duration: 'Длительность',
      route: 'Маршрут',
      no_routes: 'Маршруты не найдены',
      book: 'Забронировать',
    },
  };

  const trans = translations[language];

  useEffect(() => {
    const loadTransport = async () => {
      setLoading(true);
      const data = await getTransport(undefined, language);
      setTransport(data);
      setLoading(false);
    };
    loadTransport();
  }, [language]);

  const filtered =
    selectedType === 'all'
      ? transport
      : transport.filter((t) => t.transport_type === selectedType);

  const types: Array<{ id: FilterType; label: string }> = [
    { id: 'all', label: trans.all },
    { id: 'taxi', label: trans.types.taxi },
    { id: 'bus', label: trans.types.bus },
    { id: 'train', label: trans.types.train },
  ];

  const badgeStyleMap: Record<string, string> = {
    recommended: 'bg-primary text-primary-foreground',
    budget: 'bg-green-700 text-white',
    comfort: 'bg-blue-700 text-white',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-16 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {trans.title}
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            {trans.subtitle}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? 'default' : 'outline'}
                onClick={() => setSelectedType(type.id)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border-border animate-pulse">
                  <CardContent className="p-6 space-y-3">
                    <div className="h-8 bg-muted rounded w-1/3" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">{trans.no_routes}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <Card
                  key={item.id}
                  className="border-border hover:border-primary transition-colors overflow-hidden flex flex-col"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-4xl">{item.icon || '🚕'}</div>
                      {item.badge && (
                        <Badge
                          className={
                            badgeStyleMap[item.badge_style || ''] ||
                            'bg-secondary text-foreground'
                          }
                        >
                          {getLocalized(item, 'badge', language) || item.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg text-foreground">
                      {item.type_label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin
                          size={16}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <span className="text-foreground">
                          <span className="font-medium">
                            {getLocalized(item, 'from_location', language) ||
                              item.from_location}
                          </span>
                          <span className="text-muted-foreground"> → </span>
                          <span className="font-medium">
                            {getLocalized(item, 'to_location', language) ||
                              item.to_location}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-primary" />
                        <span className="text-muted-foreground">
                          {item.duration_label}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm pt-2 line-clamp-3">
                        {getLocalized(item, 'description', language) ||
                          item.description}
                      </p>
                    </div>

                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        {language === 'uz'
                          ? 'Нарх'
                          : language === 'ru'
                            ? 'Цена'
                            : 'Price'}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {item.price_label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getTransport } from '@/lib/api-client';
import { Transport } from '@/lib/types';
import { RatingStars } from '@/components/rating-stars';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Users } from 'lucide-react';

export default function TransportPage() {
  const { language } = useI18n();
  const [transport, setTransport] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const translations = {
    uz: {
      title: 'Транспорт Хизматлари',
      subtitle: 'Ҳудудда қулай ва ишончли транспорт',
      types: {
        taxi: 'Такси',
        shuttle: 'Шатл',
        car_rental: 'Автомобил ижарасы',
        bus: 'Автобус',
      },
      capacity: 'Сиғимдор',
      contact: 'Контакт',
      price_per_person: 'Одамга нарх',
      book: 'Бронь қилиш',
      all: 'Барчаси',
    },
    en: {
      title: 'Transportation Services',
      subtitle: 'Reliable and comfortable transport options',
      types: {
        taxi: 'Taxi',
        shuttle: 'Shuttle',
        car_rental: 'Car Rental',
        bus: 'Bus',
      },
      capacity: 'Capacity',
      contact: 'Contact',
      price_per_person: 'Price per person',
      book: 'Book',
      all: 'All',
    },
    ru: {
      title: 'Услуги транспорта',
      subtitle: 'Надежные и удобные варианты транспорта',
      types: {
        taxi: 'Такси',
        shuttle: 'Трансфер',
        car_rental: 'Аренда автомобиля',
        bus: 'Автобус',
      },
      capacity: 'Вместимость',
      contact: 'Контакт',
      price_per_person: 'Цена за человека',
      book: 'Забронировать',
      all: 'Все',
    },
  };

  const trans = translations[language];

  useEffect(() => {
    const loadTransport = async () => {
      const data = await getTransport();
      setTransport(data);
      setLoading(false);
    };
    loadTransport();
  }, []);

  const filtered = selectedType
    ? transport.filter((t) => t.type === selectedType)
    : transport;

  const types: Array<{ id: string; label: string }> = [
    { id: 'all', label: trans.all },
    { id: 'taxi', label: trans.types.taxi },
    { id: 'shuttle', label: trans.types.shuttle },
    { id: 'car_rental', label: trans.types.car_rental },
    { id: 'bus', label: trans.types.bus },
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

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Button
                key={type.id}
                variant={
                  (selectedType === null && type.id === 'all') ||
                  selectedType === type.id
                    ? 'default'
                    : 'outline'
                }
                onClick={() =>
                  setSelectedType(type.id === 'all' ? null : type.id)
                }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <Card
                key={item.id}
                className="border-border hover:border-primary transition-colors overflow-hidden"
              >
                <div className="h-40 bg-secondary" />
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg text-foreground">
                      {item.name}
                    </CardTitle>
                    <Badge variant="outline">
                      {trans.types[item.type as keyof typeof trans.types]}
                    </Badge>
                  </div>
                  <RatingStars rating={item.rating} />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={16} className="text-primary" />
                      <span>{trans.capacity}: {item.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-primary" />
                      <span>{item.contact}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {trans.price_per_person}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        ${item.price}
                      </p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {trans.book}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No transport options found
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

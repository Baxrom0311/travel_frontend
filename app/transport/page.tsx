'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getTransport } from '@/lib/api-client';
import { TransportRoute } from '@/lib/types';
import { Clock, MapPin, Route } from 'lucide-react';

export default function TransportPage() {
  const { language } = useI18n();
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const t = getSection('transport', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getTransport(undefined, language);
      setRoutes(data);
      setLoading(false);
    })();
  }, [language]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[350px] overflow-hidden">
        <Image src="/images/caravan.jpg" alt={t.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-72 glass-card rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routes.map((r) => (
              <div key={r.id} className="glass-card rounded-2xl p-6">
                <div className="text-5xl mb-4">{r.icon}</div>
                <h3 className="font-serif text-2xl font-bold mb-2">{r.type_label}</h3>
                {r.badge && (
                  <span className="inline-block text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold mb-4">{r.badge}</span>
                )}
                <p className="text-sm text-muted-foreground mb-6">{r.description}</p>
                
                <div className="space-y-3 border-t border-border/50 pt-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Route size={16} className="text-primary shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.from} → {t.to}</div>
                      <div className="font-medium text-sm">{r.from_location} → {r.to_location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-primary shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.duration}</div>
                      <div className="font-medium text-sm">{r.duration_label}</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <div className="text-xs text-muted-foreground">{t.price}</div>
                    <div className="text-xl font-bold text-primary">{r.price_label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

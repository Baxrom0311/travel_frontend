'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { useFavorites, FavoriteType } from '@/hooks/use-favorites';
import { Heart, Trash2, BedDouble, Landmark, Utensils, Mountain, Calendar } from 'lucide-react';

const TYPE_ICONS: Record<FavoriteType, any> = {
  hotel: BedDouble,
  attraction: Landmark,
  restaurant: Utensils,
  tour: Mountain,
  event: Calendar,
};

const TYPE_COLORS: Record<FavoriteType, string> = {
  hotel: 'bg-blue-500',
  attraction: 'bg-amber-500',
  restaurant: 'bg-orange-500',
  tour: 'bg-emerald-500',
  event: 'bg-pink-500',
};

export default function FavoritesPage() {
  const { language } = useI18n();
  const t = getSection('favorites', language);
  const { favorites, remove, clear, mounted } = useFavorites();

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-32">
          <div className="h-64 bg-muted rounded-2xl animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">{t.title}</h1>
              <p className="text-muted-foreground">{t.subtitle} ({favorites.length})</p>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={clear}
                className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 inline-flex items-center gap-2"
              >
                <Trash2 size={14} /> Tozalash
              </button>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="glass rounded-2xl p-16 text-center">
              <Heart className="mx-auto mb-4 text-muted-foreground" size={64} />
              <h2 className="text-xl font-semibold mb-2">{t.empty}</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Barcha sahifalardagi ♥ belgisi orqali sevimli joylarni saqlang
              </p>
              <Link href="/" className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold">
                Bosh sahifa
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((f) => {
                const Icon = TYPE_ICONS[f.type];
                return (
                  <div key={`${f.type}-${f.id}`} className="glass-card rounded-2xl overflow-hidden group relative">
                    <button
                      onClick={() => remove(f.type, f.id)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                    <Link href={f.href}>
                      <div className="relative h-48 overflow-hidden">
                        {f.image ? (
                          <Image
                            src={f.image}
                            alt={f.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className={`w-full h-full ${TYPE_COLORS[f.type]} flex items-center justify-center`}>
                            <Icon size={64} className="text-white/50" />
                          </div>
                        )}
                        <div className={`absolute top-3 left-3 ${TYPE_COLORS[f.type]} text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1`}>
                          <Icon size={12} />
                          {f.type}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1 line-clamp-1">{f.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(f.added_at).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useTripPlanner, TripStop } from '@/hooks/use-trip-planner';
import {
  Calendar, MapPin, Trash2, Plus, Route, Printer, Download,
  BedDouble, Landmark, Utensils, Mountain, CalendarDays,
} from 'lucide-react';
import { haversineDistance, formatDistance, estimateTravelTime } from '@/lib/geo';

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then((m) => m.Polyline), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });

const TYPE_ICONS = {
  attraction: Landmark,
  hotel: BedDouble,
  restaurant: Utensils,
  tour: Mountain,
  event: Calendar,
};

const TYPE_COLORS = {
  attraction: 'bg-amber-500',
  hotel: 'bg-blue-500',
  restaurant: 'bg-orange-500',
  tour: 'bg-emerald-500',
  event: 'bg-pink-500',
};

const KHIVA_CENTER: [number, number] = [41.3786, 60.3592];

export default function TripPlannerPage() {
  const { stops, mounted, remove, byDay, dayNumbers, maxDay, clear, add } = useTripPlanner();
  const [activeDay, setActiveDay] = useState(1);

  const dayStops = byDay(activeDay);

  // Compute total distance for each day
  const dayStats = (day: number) => {
    const stops = byDay(day);
    if (stops.length < 2) return { distance: 0, time: 0, count: stops.length };
    let dist = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      dist += haversineDistance(stops[i], stops[i + 1]);
    }
    return { distance: dist, time: dist / 40 * 60, count: stops.length };
  };

  const totalStats = dayNumbers.reduce(
    (acc, d) => {
      const s = dayStats(d);
      return { distance: acc.distance + s.distance, count: acc.count + s.count };
    },
    { distance: 0, count: 0 }
  );

  const routeCoords: [number, number][] = dayStops.map((s) => [s.latitude, s.longitude]);

  const addNewDay = () => {
    setActiveDay(maxDay + 1);
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[280px] overflow-hidden">
        <Image src="/images/caravan.jpg" alt="Trip Planner" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">Sayohat rejasi</h1>
          <p className="text-gray-200">Bir necha kunlik sayohatingizni rejalashtiring</p>
        </div>
      </section>

      {!mounted ? (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      ) : stops.length === 0 ? (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="glass rounded-3xl p-10">
            <CalendarDays className="mx-auto text-muted-foreground mb-4" size={64} strokeWidth={1.5} />
            <h2 className="font-serif text-2xl font-bold mb-2">Sayohat rejasi bo'sh</h2>
            <p className="text-muted-foreground mb-6">
              Joylar va mehmonxonalar sahifalarida &quot;📍+&quot; tugmasi orqali reja qo'shing
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/khiva" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
                Joylar ko'rish
              </Link>
              <Link href="/accommodation" className="px-6 py-3 rounded-full glass-button text-foreground font-semibold hover:scale-105 transition-all">
                Mehmonxonalar
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Summary */}
          <div className="glass rounded-2xl p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{dayNumbers.length}</div>
              <div className="text-xs text-muted-foreground">Kunlar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalStats.count}</div>
              <div className="text-xs text-muted-foreground">Joylar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{formatDistance(totalStats.distance)}</div>
              <div className="text-xs text-muted-foreground">Jami masofa</div>
            </div>
            <div className="text-center flex items-center justify-center gap-2">
              <button onClick={handlePrint} className="glass-button p-2 rounded-full" title="Print">
                <Printer size={16} strokeWidth={2.5} />
              </button>
              <button onClick={() => { if (confirm("Rejani tozalash?")) clear(); }} className="glass-button p-2 rounded-full text-red-500" title="Clear">
                <Trash2 size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Day tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {dayNumbers.map((d) => {
              const s = dayStats(d);
              return (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    activeDay === d ? 'bg-primary text-primary-foreground shadow-lg' : 'glass text-foreground'
                  }`}
                >
                  Kun {d} <span className="opacity-70 text-xs ml-1">({s.count})</span>
                </button>
              );
            })}
            <button
              onClick={addNewDay}
              className="px-5 py-3 rounded-xl font-semibold whitespace-nowrap glass-button text-primary hover:scale-105 transition-all inline-flex items-center gap-1"
            >
              <Plus size={14} strokeWidth={2.5} /> Kun
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stops list */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold">
                Kun {activeDay} — {dayStops.length} joy
              </h2>

              {dayStops.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <MapPin className="mx-auto text-muted-foreground mb-3" size={40} />
                  <p className="text-sm text-muted-foreground mb-4">
                    Bu kun uchun hali joy qo'shilmagan
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Link href="/khiva" className="text-xs px-4 py-2 rounded-full bg-primary text-primary-foreground">
                      Joylar
                    </Link>
                    <Link href="/accommodation" className="text-xs px-4 py-2 rounded-full glass-button">
                      Mehmonxona
                    </Link>
                    <Link href="/restaurants" className="text-xs px-4 py-2 rounded-full glass-button">
                      Restoran
                    </Link>
                  </div>
                </div>
              ) : (
                dayStops.map((stop, idx) => {
                  const Icon = TYPE_ICONS[stop.type];
                  const nextStop = dayStops[idx + 1];
                  const distToNext = nextStop ? haversineDistance(stop, nextStop) : 0;
                  return (
                    <div key={stop.uid}>
                      <div className="glass rounded-xl p-4 flex items-center gap-3 group">
                        {/* Order */}
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                          {idx + 1}
                        </div>

                        {/* Image */}
                        {stop.image ? (
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                            <Image src={stop.image} alt={stop.name} fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className={`w-14 h-14 rounded-lg ${TYPE_COLORS[stop.type]} flex items-center justify-center shrink-0`}>
                            <Icon size={20} className="text-white" strokeWidth={2.5} />
                          </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Icon size={12} className="text-muted-foreground" strokeWidth={2.5} />
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{stop.type}</span>
                          </div>
                          <div className="font-semibold truncate">{stop.name}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {stop.latitude.toFixed(3)}, {stop.longitude.toFixed(3)}
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => remove(stop.uid)}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove"
                        >
                          <Trash2 size={14} strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Connector */}
                      {nextStop && (
                        <div className="pl-4 flex items-center gap-2 py-1 text-xs text-muted-foreground">
                          <div className="w-px h-4 bg-border ml-3" />
                          <Route size={12} strokeWidth={2.5} className="text-primary" />
                          <span>{formatDistance(distToNext)} · ~{estimateTravelTime(distToNext)}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Map */}
            {dayStops.length > 0 && (
              <div className="h-[500px] lg:h-[600px] lg:sticky lg:top-24 rounded-2xl overflow-hidden border border-border">
                <MapContainer center={KHIVA_CENTER} zoom={13} className="w-full h-full">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                  />
                  {dayStops.map((s, idx) => (
                    <Marker key={s.uid} position={[s.latitude, s.longitude]}>
                      <Popup>
                        <div className="min-w-[160px]">
                          <div className="font-semibold text-sm mb-1">{idx + 1}. {s.name}</div>
                          <div className="text-xs text-gray-500 uppercase">{s.type}</div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  {routeCoords.length > 1 && (
                    <Polyline
                      positions={routeCoords}
                      pathOptions={{ color: '#0d746d', weight: 4, opacity: 0.7, dashArray: '10, 8' }}
                    />
                  )}
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

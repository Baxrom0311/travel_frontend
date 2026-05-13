'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { Hotel, Attraction, Restaurant } from '@/lib/types';
import { KHIVA_CENTER } from '@/lib/constants';

const createIcon = (color: string, emoji: string) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: ${color};
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      border: 3px solid white;
      font-size: 16px;
    ">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

const hotelIcon = createIcon('#3b82f6', '🏨');
const attractionIcon = createIcon('#f59e0b', '🏛️');
const restaurantIcon = createIcon('#f97316', '🍽️');

interface Props {
  hotels: Hotel[];
  attractions: Attraction[];
  restaurants: Restaurant[];
}

export function AllPlacesMap({ hotels, attractions, restaurants }: Props) {
  return (
    <MapContainer
      center={KHIVA_CENTER}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />

      {hotels.map((h) => (
        <Marker key={`h-${h.id}`} position={[h.latitude, h.longitude]} icon={hotelIcon}>
          <Popup>
            <div className="min-w-[200px]">
              <div className="font-semibold text-sm mb-1">{h.name}</div>
              <div className="text-xs text-gray-500 mb-2">★ {h.stars} | ⭐ {h.rating}</div>
              <Link href={`/accommodation/${h.id}`} className="text-primary text-xs font-semibold hover:underline">
                Batafsil →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}

      {attractions.map((a) => (
        <Marker key={`a-${a.id}`} position={[a.latitude, a.longitude]} icon={attractionIcon}>
          <Popup>
            <div className="min-w-[200px]">
              <div className="font-semibold text-sm mb-1">{a.icon} {a.name}</div>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">{a.description}</p>
              <Link href={`/khiva/${a.id}`} className="text-primary text-xs font-semibold hover:underline">
                Batafsil →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}

      {restaurants.map((r) => (
        <Marker key={`r-${r.id}`} position={[r.latitude, r.longitude]} icon={restaurantIcon}>
          <Popup>
            <div className="min-w-[200px]">
              <div className="font-semibold text-sm mb-1">{r.name}</div>
              <div className="text-xs text-gray-500 mb-2">{r.price_range} | ⭐ {r.rating}</div>
              <Link href={`/restaurants/${r.id}`} className="text-primary text-xs font-semibold hover:underline">
                Batafsil →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

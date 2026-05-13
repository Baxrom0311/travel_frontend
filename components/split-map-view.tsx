'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import Image from 'next/image';

export interface MapItem {
  id: number | string;
  name: string;
  latitude: number;
  longitude: number;
  href: string;
  image?: string | null;
  icon?: string; // emoji or letter
  subtitle?: string;
  color?: string; // hex, tailwind-compatible css color
}

interface Props {
  items: MapItem[];
  center?: [number, number];
  zoom?: number;
  markerColor?: string;
  markerEmoji?: string;
  className?: string;
}

const DEFAULT_CENTER: [number, number] = [41.3786, 60.3592]; // Khiva

function createMarkerIcon(color: string, emoji: string) {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 3px solid white;
        font-size: 16px;
        color: white;
        font-weight: 700;
      ">${emoji}</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

export function SplitMapView({
  items,
  center = DEFAULT_CENTER,
  zoom = 13,
  markerColor = '#0d746d',
  markerEmoji = '📍',
  className = '',
}: Props) {
  // Calculate bounds if multiple items
  const validItems = items.filter((i) => i.latitude && i.longitude);
  const bounds: L.LatLngBoundsLiteral | undefined =
    validItems.length > 1
      ? (validItems.map((i) => [i.latitude, i.longitude]) as L.LatLngBoundsLiteral)
      : undefined;

  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden border border-border ${className}`}>
      <MapContainer
        center={validItems.length === 1 ? [validItems[0].latitude, validItems[0].longitude] : center}
        zoom={zoom}
        bounds={bounds}
        boundsOptions={{ padding: [50, 50] }}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />

        {validItems.map((item) => {
          const icon = createMarkerIcon(item.color || markerColor, item.icon || markerEmoji);
          return (
            <Marker
              key={`${item.id}-${item.latitude}-${item.longitude}`}
              position={[item.latitude, item.longitude]}
              icon={icon}
            >
              <Popup>
                <div className="min-w-[220px]">
                  {item.image && (
                    <div className="relative w-full h-28 rounded-lg overflow-hidden mb-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="220px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="font-semibold text-sm mb-1">{item.name}</div>
                  {item.subtitle && (
                    <div className="text-xs text-gray-500 mb-2">{item.subtitle}</div>
                  )}
                  <Link
                    href={item.href}
                    className="text-xs text-primary font-semibold hover:underline inline-block"
                    style={{ color: markerColor }}
                  >
                    Batafsil →
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

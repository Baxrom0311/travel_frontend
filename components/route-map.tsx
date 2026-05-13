'use client';

import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, MapPin, Clock, Route as RouteIcon } from 'lucide-react';
import { formatDistance, estimateTravelTime, haversineDistance, LatLng } from '@/lib/geo';
import { getRoute, RouteResult } from '@/lib/routing';
import { MapTileLayer } from '@/components/map-tile-layer';

interface Props {
  start: LatLng & { label?: string };
  end: LatLng & { label?: string };
  profile?: 'driving' | 'walking' | 'cycling';
  className?: string;
}

const userIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="position:relative;">
      <div style="
        background:#3b82f6;
        width:20px;
        height:20px;
        border-radius:50%;
        border:3px solid white;
        box-shadow:0 0 0 4px rgba(59,130,246,0.3), 0 2px 8px rgba(0,0,0,0.3);
      "></div>
      <div style="
        position:absolute;
        top:-8px;
        left:-8px;
        width:36px;
        height:36px;
        border-radius:50%;
        background:rgba(59,130,246,0.2);
        animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;
      "></div>
    </div>
    <style>
      @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const destIcon = L.divIcon({
  className: 'dest-marker',
  html: `
    <div style="
      background:#ef4444;
      width:30px;
      height:30px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid white;
      box-shadow:0 4px 12px rgba(0,0,0,0.3);
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <div style="
        width:8px;
        height:8px;
        background:white;
        border-radius:50%;
        transform:rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export function RouteMap({ start, end, profile = 'driving', className = '' }: Props) {
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getRoute(start, end, profile);
      setRoute(result);
      setLoading(false);
    })();
  }, [start.latitude, start.longitude, end.latitude, end.longitude, profile]);

  // Calculate bounds
  const bounds: L.LatLngBoundsLiteral = [
    [start.latitude, start.longitude],
    [end.latitude, end.longitude],
  ];

  const directDistance = haversineDistance(start, end);

  return (
    <div className={`relative ${className}`}>
      {/* Info bar */}
      <div className="absolute top-4 left-4 right-4 z-[500] glass-strong rounded-xl p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <RouteIcon size={16} className="text-primary" strokeWidth={2.5} />
            <span className="font-semibold">
              {route ? formatDistance(route.distance_km) : formatDistance(directDistance)}
            </span>
          </div>
          {route && (
            <>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-primary" strokeWidth={2.5} />
                <span>{Math.round(route.duration_min)} daq</span>
              </div>
            </>
          )}
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&travelmode=${profile}`}
          target="_blank"
          className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-semibold hover:bg-primary/90 inline-flex items-center gap-1"
        >
          <Navigation size={12} strokeWidth={2.5} /> Maps
        </a>
      </div>

      {loading && (
        <div className="absolute bottom-4 left-4 glass-strong rounded-full px-4 py-2 z-[500] text-sm font-medium">
          <span className="inline-block w-3 h-3 rounded-full bg-primary animate-pulse mr-2" />
          Yo'l hisoblanmoqda...
        </div>
      )}

      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [80, 80] }}
        className="w-full h-full rounded-2xl"
        scrollWheelZoom={true}
      >
        <MapTileLayer />

        {/* User marker */}
        <Marker position={[start.latitude, start.longitude]} icon={userIcon}>
          <Popup>
            <div className="min-w-[160px]">
              <div className="font-semibold text-sm mb-1">
                {start.label || 'Sizning joylashuvingiz'}
              </div>
              <div className="text-xs text-gray-500">
                {start.latitude.toFixed(4)}, {start.longitude.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Destination marker */}
        <Marker position={[end.latitude, end.longitude]} icon={destIcon}>
          <Popup>
            <div className="min-w-[160px]">
              <div className="font-semibold text-sm mb-1 flex items-center gap-1">
                <MapPin size={12} /> {end.label || 'Manzil'}
              </div>
              <div className="text-xs text-gray-500">
                {formatDistance(directDistance)} (to'g'ri)
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Route line */}
        {route ? (
          <>
            <Polyline
              positions={route.coordinates}
              pathOptions={{
                color: '#0d746d',
                weight: 5,
                opacity: 0.7,
              }}
            />
            {/* Animated overlay */}
            <Polyline
              positions={route.coordinates}
              pathOptions={{
                color: '#ffffff',
                weight: 2,
                opacity: 0.9,
                dashArray: '10, 10',
              }}
            />
          </>
        ) : (
          !loading && (
            <Polyline
              positions={[
                [start.latitude, start.longitude],
                [end.latitude, end.longitude],
              ]}
              pathOptions={{
                color: '#94a3b8',
                weight: 2,
                opacity: 0.5,
                dashArray: '5, 10',
              }}
            />
          )
        )}
      </MapContainer>
    </div>
  );
}

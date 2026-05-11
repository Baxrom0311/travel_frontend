'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Attraction } from '@/lib/types';
import { KHIVA_CENTER } from '@/lib/constants';
import 'leaflet/dist/leaflet.css';

const attractionIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface KhivaMapProps {
  attractions: Attraction[];
  selectedAttraction: Attraction;
}

export function KhivaMap({
  attractions,
  selectedAttraction,
}: KhivaMapProps) {
  const center: LatLngExpression = [
    selectedAttraction.location.lat,
    selectedAttraction.location.lng,
  ];

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {attractions.map((attraction) => (
        <Marker
          key={attraction.id}
          position={[attraction.location.lat, attraction.location.lng]}
          icon={attractionIcon}
        >
          <Popup>
            <div className="w-48">
              <h3 className="font-semibold text-sm text-foreground mb-1">
                {attraction.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                {attraction.description.substring(0, 80)}...
              </p>
              <p className="text-sm font-semibold text-primary">
                Entry: ${attraction.entryFee}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

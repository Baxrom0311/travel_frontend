'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Hotel } from '@/lib/types';
import { KHOREZM_CENTER } from '@/lib/constants';
import 'leaflet/dist/leaflet.css';

const hotelIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface AccommodationMapProps {
  hotels: Hotel[];
  selectedHotel: Hotel;
}

export function AccommodationMap({
  hotels,
  selectedHotel,
}: AccommodationMapProps) {
  const center: LatLngExpression = [
    selectedHotel.location.lat,
    selectedHotel.location.lng,
  ];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {hotels.map((hotel) => (
        <Marker
          key={hotel.id}
          position={[hotel.location.lat, hotel.location.lng]}
          icon={hotelIcon}
        >
          <Popup>
            <div className="w-48">
              <h3 className="font-semibold text-sm text-foreground mb-1">
                {hotel.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                {hotel.description.substring(0, 80)}...
              </p>
              <p className="text-sm font-semibold text-primary">
                ${hotel.price} / night
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

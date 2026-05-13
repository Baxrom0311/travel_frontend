'use client';

import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer, MapPin } from 'lucide-react';

interface WeatherData {
  current: {
    temperature: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather_code: number;
    is_day: boolean;
  };
  daily: {
    time: string;
    temp_max: number;
    temp_min: number;
    weather_code: number;
  }[];
}

const KHIVA = { lat: 41.3786, lng: 60.3592 };

// Weather code mapping (WMO codes)
function weatherInfo(code: number, isDay = true) {
  const sunny = isDay ? Sun : Sun;
  if (code === 0) return { icon: sunny, label: 'Ochiq', color: 'text-amber-500' };
  if (code <= 3) return { icon: Cloud, label: 'Qisman bulutli', color: 'text-slate-400' };
  if (code <= 48) return { icon: Cloud, label: 'Bulutli', color: 'text-slate-500' };
  if (code <= 57) return { icon: CloudRain, label: 'Yomg\'ir', color: 'text-blue-400' };
  if (code <= 67) return { icon: CloudRain, label: 'Yomg\'ir', color: 'text-blue-500' };
  if (code <= 77) return { icon: CloudSnow, label: 'Qor', color: 'text-sky-300' };
  if (code <= 82) return { icon: CloudRain, label: 'Yomg\'ir', color: 'text-blue-500' };
  if (code <= 86) return { icon: CloudSnow, label: 'Qor', color: 'text-sky-400' };
  if (code <= 99) return { icon: CloudLightning, label: 'Momaqaldiroq', color: 'text-amber-600' };
  return { icon: Cloud, label: 'Ob-havo', color: 'text-slate-500' };
}

export function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${KHIVA.lat}&longitude=${KHIVA.lng}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia/Tashkent&forecast_days=5`;
        const res = await fetch(url);
        const json = await res.json();

        setData({
          current: {
            temperature: Math.round(json.current.temperature_2m),
            feels_like: Math.round(json.current.apparent_temperature),
            humidity: json.current.relative_humidity_2m,
            wind_speed: Math.round(json.current.wind_speed_10m),
            weather_code: json.current.weather_code,
            is_day: json.current.is_day === 1,
          },
          daily: json.daily.time.map((t: string, i: number) => ({
            time: t,
            temp_max: Math.round(json.daily.temperature_2m_max[i]),
            temp_min: Math.round(json.daily.temperature_2m_min[i]),
            weather_code: json.daily.weather_code[i],
          })),
        });
      } catch (e) {
        console.error('Weather fetch error:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="glass-strong rounded-2xl p-5 w-72 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/2 mb-3" />
        <div className="h-16 bg-muted rounded mb-3" />
        <div className="flex gap-2">
          {[1,2,3,4,5].map(i => <div key={i} className="h-16 flex-1 bg-muted rounded" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const now = weatherInfo(data.current.weather_code, data.current.is_day);
  const NowIcon = now.icon;

  const dayName = (dateStr: string, idx: number) => {
    if (idx === 0) return 'Bugun';
    const d = new Date(dateStr);
    return d.toLocaleDateString('uz-UZ', { weekday: 'short' });
  };

  return (
    <div className="glass-strong rounded-2xl p-5 w-72 max-w-[calc(100vw-2rem)]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
        <MapPin size={12} strokeWidth={2.5} className="text-primary" />
        <span>Xiva, Xorazm</span>
      </div>

      {/* Current */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-serif text-5xl font-bold leading-none">
            {data.current.temperature}°
          </div>
          <div className="text-sm text-muted-foreground mt-1">{now.label}</div>
          <div className="text-xs text-muted-foreground">
            His: {data.current.feels_like}°
          </div>
        </div>
        <NowIcon className={`${now.color} drop-shadow-lg`} size={64} strokeWidth={1.5} />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
          <Droplets size={14} className="text-blue-500" strokeWidth={2.5} />
          <div>
            <div className="text-[10px] text-muted-foreground leading-none">Namlik</div>
            <div className="text-sm font-semibold">{data.current.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
          <Wind size={14} className="text-sky-500" strokeWidth={2.5} />
          <div>
            <div className="text-[10px] text-muted-foreground leading-none">Shamol</div>
            <div className="text-sm font-semibold">{data.current.wind_speed} km/s</div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="grid grid-cols-5 gap-1">
        {data.daily.map((d, i) => {
          const info = weatherInfo(d.weather_code);
          const Icon = info.icon;
          return (
            <div key={d.time} className="text-center p-2 rounded-lg bg-secondary/30">
              <div className="text-[10px] text-muted-foreground mb-1">{dayName(d.time, i)}</div>
              <Icon size={18} className={`${info.color} mx-auto mb-1`} strokeWidth={2} />
              <div className="text-xs font-semibold">{d.temp_max}°</div>
              <div className="text-[10px] text-muted-foreground">{d.temp_min}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

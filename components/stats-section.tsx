'use client';

import { BedDouble, Landmark, Users, Globe2, Star, MapPin } from 'lucide-react';
import { NumberCounter } from '@/components/number-counter';
import { FadeIn, Stagger, StaggerItem } from '@/components/motion';
import { StatsData } from '@/lib/types';

interface Props {
  stats: StatsData;
}

export function StatsSection({ stats }: Props) {
  const items = [
    {
      icon: Landmark,
      label: 'Tarixiy joylar',
      value: stats.total_attractions ?? 8,
      suffix: '',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: BedDouble,
      label: 'Mehmonxonalar',
      value: stats.total_hotels ?? 10,
      suffix: '+',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      label: 'Sayyohlar',
      value: 450000,
      suffix: '+',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Globe2,
      label: 'Davlatlar',
      value: 85,
      suffix: '+',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className="py-16 section-bg">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4">
            <Star size={12} className="text-amber-500 fill-current" strokeWidth={2.5} />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Raqamlarda
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Visit Khorezm <span className="gradient-text">Statistikasi</span>
          </h2>
        </FadeIn>

        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <StaggerItem key={item.label}>
              <div className="glass-card rounded-2xl p-6 md:p-8 text-center group">
                <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} items-center justify-center mb-4 group-hover:scale-110 transition-transform gradient-icon-shadow`}>
                  <item.icon className="text-white" size={24} strokeWidth={2.25} />
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <NumberCounter value={item.value} />
                  {item.suffix}
                </div>
                <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

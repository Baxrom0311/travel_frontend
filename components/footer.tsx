'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { Newsletter } from './newsletter';
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const { language } = useI18n();
  const t = getSection('footer', language);
  const nav = getSection('nav', language);

  const links = [
    { href: '/', label: nav.home },
    { href: '/khiva', label: nav.places },
    { href: '/accommodation', label: nav.accommodation },
    { href: '/restaurants', label: nav.restaurants },
    { href: '/tours', label: nav.tours },
    { href: '/events', label: nav.events },
    { href: '/map', label: nav.map },
    { href: '/gallery', label: nav.gallery },
    { href: '/trip-planner', label: nav.trip_planner },
    { href: '/tips', label: nav.tips },
    { href: '/faq', label: nav.faq },
    { href: '/contact', label: nav.contact },
  ];

  return (
    <footer className="relative mt-20 border-t border-border/50">
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-serif text-lg font-bold">Visit Khorezm</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Travel & Tourism</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.description}</p>
              <div className="flex gap-2">
                <a href="#" className="w-9 h-9 rounded-full glass-button flex items-center justify-center text-foreground hover:text-primary transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full glass-button flex items-center justify-center text-foreground hover:text-primary transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full glass-button flex items-center justify-center text-foreground hover:text-primary transition-colors">
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">{t.quick_links}</h4>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">{t.contact_us}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-primary" />
                  info@visitkhorezm.uz
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  +998 61 226 56 56
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  Xiva, Xorazm viloyati
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <Newsletter />
          </div>

          <div className="border-t border-border/50 mt-10 pt-6 text-center">
            <p className="text-xs text-muted-foreground">{t.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

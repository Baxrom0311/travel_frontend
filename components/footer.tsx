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
    { href: '/partners', label: nav.partners },
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

          <div className="border-t border-border/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-muted-foreground">{t.copyright}</p>
            <a
              href="https://t.me/bakhromdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group"
            >
              Created by{' '}
              <span className="font-semibold text-foreground group-hover:text-primary inline-flex items-center gap-1">
                Bakhromdev
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.231.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.094.036.306.02.472z"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

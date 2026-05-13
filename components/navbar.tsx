'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { LANGUAGES } from '@/lib/constants';
import { getSection } from '@/lib/translations';
import { useFavorites } from '@/hooks/use-favorites';
import { Menu, X, MapPin, Heart } from 'lucide-react';

interface NavbarProps {
  variant?: 'default' | 'transparent';
}

export function Navbar({ variant = 'default' }: NavbarProps) {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const nav = getSection('nav', language);
  const { count: favCount, mounted: favMounted } = useFavorites();

  const items = [
    { href: '/', label: nav.home },
    { href: '/khiva', label: nav.places },
    { href: '/accommodation', label: nav.accommodation },
    { href: '/restaurants', label: nav.restaurants },
    { href: '/tours', label: nav.tours },
    { href: '/events', label: nav.events },
    { href: '/news', label: nav.news },
    { href: '/map', label: nav.map },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = variant === 'transparent' && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'glass-nav-dark' : 'glass-nav'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${isTransparent ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary'}`}>
              <MapPin className="text-white" size={20} />
            </div>
            <div className="hidden sm:block">
              <div className={`font-serif text-lg font-bold leading-tight ${isTransparent ? 'text-white' : 'text-foreground'}`}>
                Visit Khorezm
              </div>
              <div className={`text-[10px] uppercase tracking-wider ${isTransparent ? 'text-white/70' : 'text-muted-foreground'}`}>
                Travel & Tourism
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {items.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    active
                      ? isTransparent ? 'bg-white/25 text-white backdrop-blur-sm' : 'bg-primary text-primary-foreground'
                      : isTransparent ? 'text-white/90 hover:bg-white/15' : 'text-foreground/80 hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Favorites */}
            {favMounted && (
              <Link
                href="/favorites"
                className={`relative ${isTransparent ? 'glass-button' : 'bg-secondary hover:bg-primary/10'} rounded-full p-2 transition-colors`}
                aria-label="Favorites"
              >
                <Heart size={18} className={isTransparent ? 'text-white' : 'text-foreground'} />
                {favCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {favCount > 9 ? '9+' : favCount}
                  </span>
                )}
              </Link>
            )}

            {/* Language */}
            <div className={`hidden sm:flex items-center gap-1 rounded-full p-1 ${isTransparent ? 'glass-button' : 'bg-secondary'}`}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
                    language === lang.code
                      ? isTransparent ? 'bg-white text-primary' : 'bg-primary text-primary-foreground'
                      : isTransparent ? 'text-white/90 hover:bg-white/15' : 'text-foreground/70 hover:bg-background'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`xl:hidden p-2 rounded-xl transition-colors ${isTransparent ? 'glass-button text-white' : 'bg-secondary text-foreground hover:bg-primary/10'}`}
              aria-label="Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="xl:hidden pb-4 space-y-1 animate-in slide-in-from-top-2 duration-200 max-h-[70vh] overflow-y-auto">
            {items.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/faq' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-secondary'}`}
            >
              {nav.faq}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/contact' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-secondary'}`}
            >
              {nav.contact}
            </Link>
            <div className="flex gap-2 pt-2 border-t border-border mt-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg ${language === lang.code ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth-context';
import { LANGUAGES } from '@/lib/constants';
import { getSection } from '@/lib/translations';
import { useFavorites } from '@/hooks/use-favorites';
import { ThemeToggle } from '@/components/theme-toggle';
import { SoundToggle } from '@/components/sound-toggle';
import { Menu, X, MapPin, Heart, User, LogIn, LogOut, Settings } from 'lucide-react';

interface NavbarProps {
  /** @deprecated - navbar always uses glass now */
  variant?: 'default' | 'transparent';
}

export function Navbar({}: NavbarProps = {}) {
  const { language, setLanguage } = useI18n();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-primary/30">
              <MapPin className="text-white drop-shadow" size={20} strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <div className="font-serif text-lg font-bold leading-tight text-foreground">
                Visit Khorezm
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
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
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:bg-foreground/5 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* User menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full p-1 pr-3 glass-button hover:bg-foreground/5 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                    <User size={14} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-foreground">
                    {user.full_name.split(' ')[0]}
                  </span>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 glass-strong rounded-xl shadow-xl z-50 overflow-hidden">
                      <div className="p-3 border-b border-border">
                        <div className="font-semibold text-sm truncate">{user.full_name}</div>
                        <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                      </div>
                      <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 hover:bg-foreground/5 text-sm">
                        <Settings size={14} /> Profil
                      </Link>
                      <Link href="/trip-planner" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 hover:bg-foreground/5 text-sm">
                        <MapPin size={14} /> {nav.trip_planner}
                      </Link>
                      <Link href="/favorites" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 hover:bg-foreground/5 text-sm">
                        <Heart size={14} /> Sevimlilar {favCount > 0 && `(${favCount})`}
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-500/10 text-sm text-red-600 dark:text-red-400 border-t border-border"
                      >
                        <LogOut size={14} /> Chiqish
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <LogIn size={14} strokeWidth={2.5} /> <span className="hidden sm:inline">Kirish</span>
              </Link>
            )}

            {/* Favorites */}
            {favMounted && !isAuthenticated && (
              <Link
                href="/favorites"
                className="relative glass-button rounded-full p-2 transition-colors"
                aria-label="Favorites"
              >
                <Heart size={18} className="text-foreground" strokeWidth={2.25} />
                {favCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {favCount > 9 ? '9+' : favCount}
                  </span>
                )}
              </Link>
            )}

            {/* Language */}
            <div className="hidden sm:flex items-center gap-1 rounded-full p-1 glass-button">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
                    language === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:bg-foreground/5'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <ThemeToggle variant="glass" />

            {/* Sound toggle */}
            <SoundToggle />

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-xl glass-button text-foreground transition-colors"
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
                    active ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-foreground/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/trip-planner"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/trip-planner' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-foreground/5'}`}
            >
              {nav.trip_planner}
            </Link>
            <Link
              href="/tips"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/tips' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-foreground/5'}`}
            >
              {nav.tips}
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/faq' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-foreground/5'}`}
            >
              {nav.faq}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/contact' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-foreground/5'}`}
            >
              {nav.contact}
            </Link>
            <div className="flex gap-2 pt-2 border-t border-border mt-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg ${language === lang.code ? 'bg-primary text-primary-foreground' : 'bg-foreground/5 text-foreground'}`}
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

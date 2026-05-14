'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Map, Heart, User, MapPinned } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { count: favCount, mounted } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { language } = useI18n();
  const nav = getSection('nav', language);

  const items = [
    { href: '/', label: nav.home, icon: Home },
    { href: '/khiva', label: nav.places, icon: MapPinned },
    { href: '/search', label: nav.search || 'Search', icon: Search },
    { href: '/favorites', label: 'Saqlangan', icon: Heart, badge: mounted ? favCount : 0 },
    { href: isAuthenticated ? '/profile' : '/login', label: isAuthenticated ? 'Profil' : 'Kirish', icon: User },
  ];

  return (
    <nav className="floating-icon fixed bottom-0 left-0 right-0 z-40 xl:hidden nav-glass border-t border-border/50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {items.map((item) => {
          const active = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex-1 h-full flex flex-col items-center justify-center gap-0.5 transition-colors"
            >
              <div className={`relative p-2 rounded-xl transition-all ${active ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center px-1">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

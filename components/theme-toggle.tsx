'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

interface Props {
  variant?: 'default' | 'glass';
  size?: 'sm' | 'md';
}

export function ThemeToggle({ variant = 'default', size = 'md' }: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={`${size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'} rounded-full bg-secondary animate-pulse`} />
    );
  }

  const isDark = resolvedTheme === 'dark';
  const sizeClass = size === 'sm' ? 'w-8 h-8 p-1.5' : 'w-9 h-9 p-2';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`${sizeClass} rounded-full transition-all ${
        variant === 'glass'
          ? 'glass-button hover:scale-110'
          : 'bg-secondary hover:bg-primary/10 text-foreground'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <Sun size={size === 'sm' ? 14 : 18} className="text-amber-400" />
      ) : (
        <Moon size={size === 'sm' ? 14 : 18} />
      )}
    </button>
  );
}

/** Full selector (Light/Dark/System) */
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const options = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="flex gap-1 p-1 rounded-xl bg-secondary">
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground/70 hover:bg-background'
            }`}
          >
            <Icon size={14} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

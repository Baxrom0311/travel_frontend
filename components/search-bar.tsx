'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface Props {
  placeholder?: string;
  size?: 'default' | 'lg';
  variant?: 'default' | 'glass';
  className?: string;
}

export function SearchBar({
  placeholder = 'Search...',
  size = 'default',
  variant = 'default',
  className = '',
}: Props) {
  const [q, setQ] = useState('');
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  const large = size === 'lg';
  const glass = variant === 'glass';

  return (
    <form onSubmit={submit} className={`relative ${className}`}>
      <Search
        className={`absolute left-5 top-1/2 -translate-y-1/2 ${
          glass ? 'text-white/70' : 'text-muted-foreground'
        } ${large ? 'h-5 w-5' : 'h-4 w-4'}`}
      />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${
          large ? 'h-14 pl-14 pr-32 text-base' : 'h-11 pl-11 pr-24 text-sm'
        } rounded-full outline-none transition-all ${
          glass
            ? 'glass-strong text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30'
            : 'bg-white border border-border focus:border-primary shadow-sm'
        }`}
      />
      <button
        type="submit"
        className={`absolute right-2 top-1/2 -translate-y-1/2 ${
          large ? 'h-10 px-5 text-sm' : 'h-8 px-4 text-xs'
        } rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-sm`}
      >
        Search
      </button>
    </form>
  );
}

'use client';

import { GitCompare, Check } from 'lucide-react';
import { useCompare } from '@/hooks/use-compare';
import { toast } from 'sonner';

interface Props {
  id: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function CompareButton({ id, size = 'md', className = '' }: Props) {
  const { has, toggle, mounted } = useCompare();

  if (!mounted) return null;

  const active = has(id);
  const sizes = { sm: 14, md: 16 };
  const paddings = { sm: 'p-1.5', md: 'p-2' };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggle(id);
    if (result === 'limit') {
      toast.error('Eng ko\'pi 3 ta mehmonxona taqqoslash mumkin');
    } else if (result === 'added') {
      toast.success('Taqqoslashga qo\'shildi');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? 'Taqqoslashdan olib tashlash' : 'Taqqoslashga qo\'shish'}
      className={`${paddings[size]} rounded-full transition-all ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-white/90 backdrop-blur-sm text-muted-foreground hover:text-primary shadow-md'
      } ${className}`}
    >
      {active ? <Check size={sizes[size]} strokeWidth={2.5} /> : <GitCompare size={sizes[size]} strokeWidth={2.5} />}
    </button>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPinPlus, Check, X } from 'lucide-react';
import { useTripPlanner, StopType } from '@/hooks/use-trip-planner';
import { toast } from 'sonner';

interface Props {
  type: StopType;
  id: number | string;
  name: string;
  image?: string | null;
  latitude: number;
  longitude: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function AddToTripButton({
  type, id, name, image, latitude, longitude,
  size = 'md',
  className = '',
}: Props) {
  const { add, mounted, maxDay } = useTripPlanner();
  const [open, setOpen] = useState(false);

  if (!mounted) return null;

  const sizes = { sm: 14, md: 16 };
  const paddings = { sm: 'p-1.5', md: 'p-2' };

  const days = Array.from({ length: Math.max(maxDay, 1) + 1 }).map((_, i) => i + 1);

  const handleAdd = (day: number) => {
    add({ type, id, name, image, latitude, longitude, day });
    toast.success(`${day}-kun rejasiga qo'shildi`);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        aria-label="Add to trip"
        className={`${paddings[size]} rounded-full transition-all bg-white/90 backdrop-blur-sm text-muted-foreground hover:text-primary shadow-md ${className}`}
      >
        <MapPinPlus size={sizes[size]} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 glass-strong rounded-xl p-2 min-w-[160px] shadow-xl z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs text-muted-foreground px-2 pb-1 font-medium">Reja kuni</div>
              {days.map((d) => (
                <button
                  key={d}
                  onClick={(e) => { e.preventDefault(); handleAdd(d); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-foreground/5 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Kun {d}</span>
                  {d > maxDay && <span className="text-[10px] text-primary font-semibold">+ yangi</span>}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

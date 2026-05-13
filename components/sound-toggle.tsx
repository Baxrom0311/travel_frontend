'use client';

import { useSounds } from '@/hooks/use-sounds';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundToggle() {
  const { enabled, toggle, play } = useSounds();

  const handleClick = () => {
    toggle();
    // Play sound only when enabling
    if (!enabled) {
      setTimeout(() => play('notification'), 50);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="glass-button p-2 rounded-full transition-all hover:scale-105"
      aria-label={enabled ? 'Disable sounds' : 'Enable sounds'}
      title={enabled ? 'Sounds ON' : 'Sounds OFF'}
    >
      {enabled ? (
        <Volume2 size={16} className="text-primary" strokeWidth={2.5} />
      ) : (
        <VolumeX size={16} className="text-muted-foreground" strokeWidth={2.5} />
      )}
    </button>
  );
}

'use client';

import { useEffect } from 'react';
import { useSounds } from '@/hooks/use-sounds';

/**
 * Global sound provider - adds subtle click sounds to buttons and links.
 * Plays sounds only if user enabled them via SoundToggle.
 */
export function SoundProvider() {
  const { play, enabled } = useSounds();

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a[href], [role="button"]')) {
        play('click');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [enabled, play]);

  return null;
}

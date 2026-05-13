'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'error' | 'notification';

const SOUND_KEY = 'visitkhorezm_sounds';

/**
 * Sound effects using Web Audio API (no external files).
 * Generates sounds procedurally for minimal bundle size.
 */
export function useSounds() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SOUND_KEY);
      setEnabled(stored === '1');
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_KEY, next ? '1' : '0');
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (Ctx) audioCtxRef.current = new Ctx();
    }
    return audioCtxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;

      // Resume if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      const beep = (freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.1) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
      };

      switch (type) {
        case 'click':
          beep(800, 0.05, 'sine', 0.08);
          break;
        case 'hover':
          beep(1200, 0.03, 'sine', 0.03);
          break;
        case 'success':
          beep(523.25, 0.1, 'sine', 0.1); // C5
          setTimeout(() => beep(659.25, 0.15, 'sine', 0.1), 80); // E5
          setTimeout(() => beep(783.99, 0.2, 'sine', 0.1), 160); // G5
          break;
        case 'error':
          beep(300, 0.1, 'sawtooth', 0.08);
          setTimeout(() => beep(250, 0.15, 'sawtooth', 0.08), 100);
          break;
        case 'notification':
          beep(880, 0.1, 'sine', 0.1); // A5
          setTimeout(() => beep(1174.66, 0.15, 'sine', 0.1), 100); // D6
          break;
      }
    },
    [enabled, getCtx]
  );

  return { play, enabled, toggle };
}

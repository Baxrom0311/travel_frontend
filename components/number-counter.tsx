'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion, useMotionValue, animate } from 'motion/react';

interface Props {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export function NumberCounter({ value, duration = 1.5, className = '', suffix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (latest) => {
        setDisplay(Math.round(latest).toLocaleString());
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, count]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}

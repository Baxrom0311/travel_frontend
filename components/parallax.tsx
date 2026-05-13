'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface Props {
  children: ReactNode;
  className?: string;
  speed?: number;
}

/** Parallax effect - element moves slower than scroll */
export function Parallax({ children, className = '', speed = 0.5 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 50}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/** Parallax for background only (content stays) */
export function ParallaxBg({ children, speed = 0.3 }: Props) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div style={{ y }} className="absolute inset-0">
      {children}
    </motion.div>
  );
}

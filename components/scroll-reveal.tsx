'use client';

import { motion, useInView, Variants } from 'motion/react';
import { useRef, ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';

interface Props {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

const getVariants = (direction: Direction, distance: number): Variants => {
  const map: Record<Direction, Variants> = {
    up: {
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -distance },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: distance },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: -distance },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  };
  return map[direction];
};

/**
 * Scroll-triggered reveal animation.
 * Element fades in with direction-specific motion when in view.
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  className = '',
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      variants={getVariants(direction, distance)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Reveal children one-by-one with stagger */
export function ScrollRevealStagger({
  children,
  stagger = 0.08,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

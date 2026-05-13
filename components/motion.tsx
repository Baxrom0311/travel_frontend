'use client';

import { motion, useInView, HTMLMotionProps } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
}

/** Fade-in on scroll into view */
export function FadeIn({ children, delay = 0, duration = 0.5, y = 20, x = 0, once = true, ...rest }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
}

/** Stagger container for children (use with StaggerItem) */
export function Stagger({ children, delay = 0, stagger = 0.08, className = '' }: StaggerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

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

/** Stagger item - use inside <Stagger> */
export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Card with hover lift + tilt */
interface HoverCardProps {
  children: ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
}

export function HoverCard({ children, className = '', lift = -8, scale = 1.02 }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: lift, scale, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

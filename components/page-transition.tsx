'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Smooth page transition on route change.
 * Wraps children in motion.div with fade + slight slide.
 */
export function PageTransition({ children }: Props) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

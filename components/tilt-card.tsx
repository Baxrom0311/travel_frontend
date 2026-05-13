'use client';

import { useRef, ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Props {
  children: ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees */
  max?: number;
  /** Scale on hover */
  scale?: number;
  /** Disable on touch devices */
  mobile?: boolean;
  /** Glare overlay */
  glare?: boolean;
}

/**
 * 3D tilt card effect - follows mouse cursor.
 * Perspective transform with smooth spring animation.
 */
export function TiltCard({
  children,
  className = '',
  max = 10,
  scale = 1.02,
  mobile = false,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 300,
    damping: 30,
  });

  // Glare position
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  // Disable on touch devices (unless explicitly enabled)
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice && !mobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        scale: hovered ? scale : 1,
      }}
      transition={{ scale: { duration: 0.3 } }}
      className={`relative ${className}`}
    >
      {children}

      {glare && hovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.25) 0%, transparent 60%)`,
            transformStyle: 'preserve-3d',
            translateZ: '1px',
          }}
        />
      )}
    </motion.div>
  );
}

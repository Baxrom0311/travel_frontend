'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400 });

  const dotX = useSpring(cursorX, { damping: 40, stiffness: 800 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 800 });

  useEffect(() => {
    // Only enable on devices with fine pointer (desktop mouse)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsEnabled(mq.matches);
    if (!mq.matches) return;

    document.documentElement.classList.add('cursor-custom');

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      document.documentElement.classList.remove('cursor-custom');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Outer ring - follows slowly */}
      <motion.div
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderWidth: isHovering ? 2 : 1.5,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 z-[300] rounded-full border mix-blend-difference"
        style={{
          translateX: springX,
          translateY: springY,
          x: '-50%',
          y: '-50%',
          borderColor: 'white',
        }}
      />

      {/* Inner dot - follows quickly */}
      <motion.div
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed top-0 left-0 z-[300] w-2 h-2 rounded-full bg-white mix-blend-difference"
        style={{
          translateX: dotX,
          translateY: dotY,
          x: '-50%',
          y: '-50%',
        }}
      />
    </>
  );
}

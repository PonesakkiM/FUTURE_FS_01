import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CursorGlow.css';

export default function CursorGlow() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Outer ring — lags behind for a trailing effect
  const springX = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 18 });

  // Inner dot — snaps instantly
  const dotX = useSpring(cursorX, { stiffness: 400, damping: 28 });
  const dotY = useSpring(cursorY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Inner dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}

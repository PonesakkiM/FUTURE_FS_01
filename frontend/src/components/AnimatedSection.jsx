import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Wraps any element with a scroll-triggered reveal animation.
 * Props:
 *   variant  – 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' (default: 'fadeUp')
 *   delay    – number in seconds (default: 0)
 *   className – forwarded to the motion div
 *   as       – element tag (default: 'div')
 */
const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    show: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -48 },
    show: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 48 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1 },
  },
};

export default function AnimatedSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.65,
  className = '',
  as: Tag = 'div',
  threshold = 0.15,
  once = true,
}) {
  const [ref, inView] = useInView({ triggerOnce: once, threshold });
  const chosen = variants[variant] ?? variants.fadeUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={chosen}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

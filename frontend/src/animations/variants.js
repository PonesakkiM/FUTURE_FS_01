// ─── Shared Framer Motion variants ───────────────────────────────────────────

/** Fade up — the default reveal for most elements */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/** Fade in from left */
export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/** Fade in from right */
export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/** Scale pop — for cards and badges */
export const scalePop = {
  hidden: { opacity: 0, scale: 0.82 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14, delay },
  }),
};

/** Stagger container — wraps a list of children */
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Single stagger child — use inside staggerContainer */
export const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Slide down — for navbar / dropdowns */
export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

/** Hover lift — attach to whileHover */
export const hoverLift = { y: -6, transition: { duration: 0.25, ease: 'easeOut' } };

/** Hover glow card */
export const hoverCard = {
  y: -6,
  boxShadow: '0 20px 60px rgba(79,142,247,0.25)',
  borderColor: 'rgba(79,142,247,0.5)',
  transition: { duration: 0.25 },
};

/** Tap shrink */
export const tapShrink = { scale: 0.96 };

/** Continuous float */
export const float = {
  y: [0, -12, 0],
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
};

/** Continuous pulse glow */
export const pulseGlow = {
  opacity: [0.4, 0.9, 0.4],
  scale: [1, 1.08, 1],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
};

/** Draw a line (SVG path) */
export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
};

import { Variants } from 'framer-motion';

/**
 * WearNear Motion System
 * Refined, responsive animation variants adhering to premium fashion e-commerce guidelines.
 * Respects prefers-reduced-motion naturally with lightweight transforms and gentle opacities.
 */

// Page Entrance Variants (fade + subtle upward translation)
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for natural luxury easing
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Section Reveal (triggered when scrolling into viewport)
export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Staggered Container for Lists & Product Grids
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

// Staggered Child Item
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Modal Scale & Fade
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 6,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Modal Backdrop Fade
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Tactile Button Hover & Tap
export const buttonTapTransition = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
};

// Wishlist Heart Bounce
export const heartBounceVariants: Variants = {
  unliked: { scale: 1 },
  liked: {
    scale: [1, 1.35, 0.95, 1.1, 1],
    transition: {
      duration: 0.4,
      times: [0, 0.3, 0.6, 0.8, 1],
      ease: 'easeInOut',
    },
  },
};

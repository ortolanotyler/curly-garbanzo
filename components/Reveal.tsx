import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Optional stagger delay in seconds. */
  delay?: number;
}

/**
 * Soft, once-only fade-up as a section scrolls into view. Subtle by design —
 * a single gentle rise, no bounce — and fully disabled for users who prefer
 * reduced motion.
 */
const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;

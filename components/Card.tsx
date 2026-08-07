'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

export default function Card({
  className = '',
  children,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      {...props}
      className={`glass-card ${className}`}
      transition={{ type: 'spring', stiffness: 160, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

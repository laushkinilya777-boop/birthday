'use client';

import { motion } from 'framer-motion';
import { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'ghost';
}

const variants: Record<'primary' | 'ghost', string> = {
  primary: 'bg-gradient-to-r from-aurora via-lilac to-rose text-white shadow-glow hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500',
  ghost: 'border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10'
};

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      className={`inline-flex items-center justify-center rounded-3xl px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-rose-400/60 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}

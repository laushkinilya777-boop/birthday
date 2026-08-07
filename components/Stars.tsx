'use client';

import { motion } from 'framer-motion';

interface StarsProps {
  isNight: boolean;
}

const starPositions = [
  { x: '10%', y: '18%', size: 6 },
  { x: '85%', y: '12%', size: 4 },
  { x: '75%', y: '70%', size: 5 },
  { x: '20%', y: '78%', size: 3 }
];

export default function Stars({ isNight }: StarsProps) {
  if (!isNight) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-6 top-10 h-28 w-28 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-violet-400/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {starPositions.map((star, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 2 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full bg-white/80"
          style={{ left: star.x, top: star.y, width: star.size, height: star.size }}
        />
      ))}
      <div className="absolute right-10 top-8 h-24 w-24 rounded-full border border-white/20 bg-white/10 blur-sm" />
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isNight: boolean;
}

export default function BackgroundEffects({ isNight }: BackgroundEffectsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-18%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute right-0 top-1/4 h-[280px] w-[280px] rounded-full bg-violet-500/15 blur-3xl" />
      <div className="absolute left-0 top-[55%] h-[240px] w-[240px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.15),transparent_30%)]" />
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 left-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl"
      />
      <motion.div
        animate={{ x: [0, -22, 0], y: [0, 16, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-1/4 top-1/3 h-24 w-24 rounded-full bg-pink-300/20 blur-2xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%,rgba(15,23,42,0.15))]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\" opacity=\"0.08\"><path fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\" d=\"M0 0L64 0M0 16L64 16M0 32L64 32M0 48L64 48M0 64L64 64M0 0L0 64M16 0L16 64M32 0L32 64M48 0L48 64M64 0L64 64\"/></svg>')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      {isNight && (
        <div className="absolute left-[10%] top-[10%] flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-slate-100/80 shadow-soft blur-sm">
          <div className="relative h-14 w-14 rounded-full bg-white/70 shadow-2xl" />
        </div>
      )}
    </div>
  );
}

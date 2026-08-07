'use client';

import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import Button from './Button';

interface HeroProps {
  onOpen: () => void;
}

export default function Hero({ onOpen }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative mx-auto flex w-full max-w-md flex-col gap-8 pb-12 pt-4 sm:max-w-xl"
    >
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-2xl">
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-slate-300">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-slate-100 shadow-glow">
            <Sparkles size={18} />
          </span>
          подарок для тебя
        </div>
        <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
          С ДНЁМ РОЖДЕНИЯ,
          <br />
          любимая моя 🎉
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
          Это поздравление — твой маленький мир тепла, магии и нежности. Плавно проведу тебя сквозь наш вечер, мечты и самые искренние слова.
        </p>
        <div className="mt-8 flex items-center justify-start">
          <Button onClick={onOpen} className="min-w-[220px]" aria-label="Открыть подарок">
            Открыть подарок <Gift className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.section>
  );
}

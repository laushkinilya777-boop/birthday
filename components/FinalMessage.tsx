'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import Stars from './Stars';

interface FinalMessageProps {
  isNight: boolean;
}

const messageLines = [
  'Я тебя очень сильно люблю ❤️',
  'Спасибо, что ты появилась в моей жизни.',
  'Ты делаешь каждый мой день счастливее.',
  'Я очень хочу, чтобы ты улыбалась как можно чаще.',
  'У нас обязательно всё получится.',
  'И пусть впереди будет ещё очень много счастливых дней вместе.'
];

export default function FinalMessage({ isNight }: FinalMessageProps) {
  return (
    <Card className="relative mx-auto w-full max-w-md overflow-hidden rounded-[44px] p-6 sm:max-w-3xl">
      <Stars isNight={isNight} />
      <div className="relative space-y-6">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-6 shadow-soft backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-300">Последнее послание</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">Теплое письмо в конце вечера</h2>
        </div>

        <div className="space-y-3">
          {messageLines.map((line, index) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="text-base leading-8 text-slate-100 sm:text-lg"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="rounded-[32px] border border-rose-300/20 bg-rose-500/10 p-5 text-center shadow-soft backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">Навсегда твой.</p>
          <p className="mt-2 text-sm text-slate-300">С каждым словом, с каждым вдохом — я рядом.</p>
        </div>
      </div>
    </Card>
  );
}

'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface WishFormProps {
  wish: string;
  status: 'idle' | 'sending' | 'success' | 'error';
  successText: string;
  locked: boolean;
  onSubmit: (payload: { wish: string; note: string }) => Promise<boolean>;
}

export default function WishForm({ wish, status, successText, locked, onSubmit }: WishFormProps) {
  const [note, setNote] = useState('');

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!wish || locked) return;
    await onSubmit({ wish, note });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-2xl"
    >
      <div className="space-y-4">
        <div className="rounded-3xl bg-slate-950/50 p-4 text-sm text-slate-300 shadow-inner shadow-slate-950/40">
          <p className="font-semibold text-white">Желание в конверте</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Я отправлю это тихонько, чтобы оно взлетело как нежная мысль.</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Твоя мечта</p>
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner shadow-slate-950/30">
            {wish || 'Пока ничего не выбрано'}
          </div>
        </div>

        <form onSubmit={handleForm} className="space-y-4">
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block text-sm font-medium text-slate-200">Добавь несколько слов</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Хочу, чтобы в следующем году было ещё больше улыбок..."
              className="min-h-[130px] w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-rose-300/80 focus:ring-2 focus:ring-rose-300/20"
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={!wish || status === 'sending' || locked}>
              {status === 'sending' ? 'Отправка...' : locked ? 'Желание запечатано' : 'Отправить желание'}
            </Button>
            <p className="text-sm text-slate-400">После успешной отправки появится анимация счастья.</p>
          </div>
        </form>

        {status === 'success' && (
          <div className="rounded-3xl border border-rose-300/20 bg-rose-500/10 p-4 text-rose-100 shadow-soft">
            <p className="text-sm">{successText || 'Желание отправлено!'}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-3xl border border-rose-300/20 bg-slate-950/80 p-4 text-slate-100 shadow-soft">
            <p className="text-sm">{successText || 'Произошла ошибка. Попробуй ещё раз.'}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

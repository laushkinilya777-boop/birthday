'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface WishOption {
  id: string;
  emoji: string;
  title: string;
}

interface WishSelectorProps {
  options: WishOption[];
  selected: string;
  customValue: string;
  setSelected: (value: string) => void;
  setCustomValue: (value: string) => void;
  onContinue: () => void;
}

export default function WishSelector({ options, selected, customValue, setSelected, setCustomValue, onContinue }: WishSelectorProps) {
  // When user selects a card or types a custom wish, parent should proceed automatically.
  const selectedLabel = useMemo(() => {
    if (customValue.trim()) return customValue.trim();
    const found = options.find((item) => item.id === selected);
    return found ? found.title : '';
  }, [customValue, selected, options]);

  return (
    <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur-2xl">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-slate-300">Выбери или напиши</p>
        <h3 className="text-2xl font-semibold text-white">Интерактивные желания</h3>
        <p className="text-sm leading-6 text-slate-400">
          Нажми на карточку, чтобы она загорелась, а потом допиши свою мечту.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const active = selected === option.id;
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              className={`rounded-3xl border p-4 text-left transition-all duration-300 ${
                active ? 'border-rose-300/60 bg-rose-400/10 shadow-glow' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 text-lg">
                <span className="text-2xl">{option.emoji}</span>
                <span className="font-semibold text-white">{option.title}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <label className="block text-sm text-slate-300">
        <span className="mb-2 block text-sm font-medium text-slate-200">Или напиши своё желание</span>
        <input
          type="text"
          value={customValue}
          onChange={(event) => setCustomValue(event.target.value)}
          placeholder="Например, поездка в Париж..."
          className="w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-rose-300/80 focus:ring-2 focus:ring-rose-300/20"
        />
      </label>
      <p className="text-sm text-slate-400">Выбрано: <span className="font-semibold text-white">{selectedLabel || 'ничего пока'}</span></p>
      <button
        type="button"
        onClick={onContinue}
        disabled={!selectedLabel.trim()}
        className={`mt-4 w-full rounded-3xl py-3 text-sm font-semibold text-white transition ${
          selectedLabel.trim()
            ? 'bg-gradient-to-r from-aurora via-lilac to-rose shadow-glow hover:brightness-105'
            : 'cursor-not-allowed bg-white/10 text-slate-400'
        }`}
      >
        ❤️ Продолжить
      </button>
    </div>
  );
}

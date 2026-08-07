'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import BackgroundEffects from '../components/BackgroundEffects';
import Confetti from '../components/Confetti';
import FinalMessage from '../components/FinalMessage';
import Gallery from '../components/Gallery';
import Hero from '../components/Hero';
import MusicPlayer from '../components/MusicPlayer';
import WishForm from '../components/WishForm';
import WishSelector from '../components/WishSelector';
import CursorGlow from '../components/CursorGlow';

const wishOptions = [
  { id: 'travel', emoji: '✈️', title: 'Путешествие' },
  { id: 'kitten', emoji: '🐱', title: 'Котик' },
  { id: 'sneakers', emoji: '👟', title: 'Новые кроссовки' },
  { id: 'dinner', emoji: '🍣', title: 'Романтический ужин' },
  { id: 'games', emoji: '🎮', title: 'Вечер игр' },
  { id: 'flowers', emoji: '🌸', title: 'Цветы' },
  { id: 'surprise', emoji: '✨', title: 'Сюрприз' }
];

const galleryItems = [
  {
    id: '1',
    title: '🧣 Микаса нашлась ❤️',
    src: '/images/1.png',
    description: 'Кажется, Эрен наконец перестал искать Микaсу… потому что теперь она рядом со мной 😄'
  },
  {
    id: '2',
    title: '⚔️ Разведкорпус одобряет',
    src: '/images/2.png',
    description: 'Даже если вокруг титаны, с тобой вообще ничего не страшно.'
  },
  {
    id: '3',
    title: '🕷️ Моя Гвен',
    src: '/images/3.png',
    description: 'Кажется, Человек-паук снова спас город… и заодно украл моё сердце ❤️'
  },
  {
    id: '4',
    title: '🕸️ Супергероиня моей жизни',
    src: '/images/4.png',
    description: 'Без паутины тоже умеешь притягивать людей. Особенно меня.'
  }
];

const variants = {
  enter: { opacity: 0, y: 20, scale: 0.995 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.995 }
};

export default function HomePage() {
  const [step, setStep] = useState<number>(0); // 0..4
  const [selectedWish, setSelectedWish] = useState<string>('');
  const [customWish, setCustomWish] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isNight, setIsNight] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [wishLocked, setWishLocked] = useState(false);
  const [successText, setSuccessText] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 20 || hour < 6);
  }, []);

  // Preserve wish text
  const wishText = useMemo(() => {
    if (customWish.trim()) return customWish.trim();
    const opt = wishOptions.find((o) => o.id === selectedWish);
    return opt ? opt.title : '';
  }, [customWish, selectedWish]);

  // navigation helpers
  const goNext = () => setStep((s) => Math.min(4, s + 1));
  const goTo = (idx: number) => setStep(Math.max(0, Math.min(4, idx)));

  useEffect(() => {
    // scroll to top on step change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, [step]);

  const handleOpenGift = () => {
    setConfettiActive(true);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([80, 40, 120]);
    }
    setTimeout(() => setConfettiActive(false), 2200);
    goNext();
  };

  const handleSubmit = async (payload: { wish: string; note: string }) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/send-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) {
        const errorMessage = json?.details || json?.error || 'Ошибка при отправке желания.';
        setStatus('error');
        setSuccessText(errorMessage);
        return false;
      }
      setStatus('success');
      setWishLocked(true);
      setSuccessText('Желание уже летит ко мне 🚀');
      setTimeout(() => setSuccessText('Спасибо, солнышко, всё сохранено.'), 3200);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось отправить. Попробуй ещё.';
      setStatus('error');
      setSuccessText(message);
      console.error('Wish submit failed:', error);
      return false;
    }
  };

  // top progress indicator (non-clickable subtle)
  const renderProgress = () => (
    <div className="fixed left-0 right-0 top-4 z-40 flex items-center justify-center">
      <div className="flex items-center gap-2 rounded-full bg-white/3 px-3 py-2 backdrop-blur-lg">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            aria-hidden
            className={`h-2 w-2 rounded-full transition-all ${
              i === step ? 'bg-rose-400 scale-125' : 'bg-white/12'
            }`}
          />
        ))}
        <div className="ml-3 text-xs text-slate-200">{step + 1} / 5</div>
      </div>
    </div>
  );


  return (
    <main className="relative h-screen w-screen overflow-hidden bg-transparent text-white">
      <BackgroundEffects isNight={isNight} />
      <Confetti active={confettiActive} />
      <MusicPlayer />
      <CursorGlow />

      {renderProgress()}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.section
            key="step-0"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, type: 'spring', stiffness: 110, damping: 18 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="mx-auto w-full max-w-md">
              <Hero onOpen={handleOpenGift} />
            </div>
          </motion.section>
        )}

        {step === 1 && (
          <motion.section
            key="step-1"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, type: 'spring', stiffness: 110, damping: 18 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="mx-auto flex h-full w-full max-w-md flex-col justify-between gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                <Star className="h-4 w-4 text-rose-300" /> Наши счастливые моменты
              </div>
              <Gallery items={galleryItems} onFinish={() => goTo(2)} />
            </div>
          </motion.section>
        )}

        {step === 2 && (
          <motion.section
            key="step-2"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, type: 'spring', stiffness: 110, damping: 18 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="mx-auto w-full max-w-md space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-2xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Мечты для следующего года</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">Что ты хочешь на следующий день рождения?</h2>
              </div>
              <WishSelector
                options={wishOptions}
                selected={selectedWish}
                customValue={customWish}
                setSelected={setSelectedWish}
                setCustomValue={setCustomWish}
                onContinue={goNext}
              />
              <div>
                <div className="text-sm text-slate-300">Выбрано: <span className="font-semibold text-white">{wishText || 'ничего'}</span></div>
              </div>
            </div>
          </motion.section>
        )}

        {step === 3 && (
          <motion.section
            key="step-3"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, type: 'spring', stiffness: 110, damping: 18 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="mx-auto w-full max-w-md space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-2xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Запечатать желание</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">Отправь своё желание</h2>
              </div>
              <WishForm
                wish={wishText}
                status={status}
                successText={successText}
                onSubmit={async (p) => {
                  const ok = await handleSubmit(p);
                  if (ok) goNext();
                  return ok;
                }}
                locked={wishLocked}
              />
            </div>
          </motion.section>
        )}

        {step === 4 && (
          <motion.section
            key="step-4"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, type: 'spring', stiffness: 110, damping: 18 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="mx-auto w-full max-w-md">
              <FinalMessage isNight={isNight} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      
    </main>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';

const musicPath = '/music/birthday.mp3';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleError = () => setAvailable(false);
    audio.addEventListener('error', handleError);
    return () => audio.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!available) return;
    if (playing) {
      void audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing, available]);

  if (!available) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-50 flex items-center justify-end sm:right-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="pointer-events-auto flex items-center justify-center rounded-3xl border border-white/15 bg-white/8 p-3 shadow-soft backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => setPlaying((s) => !s)}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-rose-400/60"
          aria-label={playing ? 'Пауза музыки' : 'Включить музыку'}
        >
          <Music2 className="h-4 w-4" />
          <span>{playing ? 'Пауза' : 'Музыка'}</span>
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </motion.div>
      <audio ref={audioRef} src={musicPath} loop preload="none" />
    </div>
  );
}

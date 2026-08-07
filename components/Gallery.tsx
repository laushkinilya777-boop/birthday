'use client';

import Image from 'next/image';
import { motion, PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  src: string;
  description?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  onFinish?: () => void;
}

export default function Gallery({ items, onFinish }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

    const go = useCallback(
      (dir: number) => setIndex((i) => Math.max(0, Math.min(items.length - 1, i + dir))),
      [items.length]
    );

  const handleDragEnd = (_: any, info: PanInfo) => {
      const threshold = 80;
      if (info.offset.x < -threshold) {
        go(1);
        setZoom(false);
      } else if (info.offset.x > threshold) {
        go(-1);
        setZoom(false);
      }
  };

    const handleTap = () => {
      setZoom((z) => !z);
    };

    const current = items[index];

    return (
      <div className="flex h-full min-h-[calc(100vh-220px)] w-full max-w-md flex-col justify-between gap-4">
        <div className="relative h-[62vh] min-h-[360px] w-full overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-soft backdrop-blur-2xl sm:h-[66vh]">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: zoom ? 1.05 : 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={handleDragEnd}
            onTap={handleTap}
            className="relative h-full w-full cursor-grab touch-pan-y"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[36px] bg-slate-950/10">
              <Image
                src={current.src}
                alt={current.title}
                fill
                sizes="(max-width: 420px) 100vw, 420px"
                className="h-full w-full object-cover"
                priority={index === 0}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {index > 0 && (
              <button
                onClick={() => { go(-1); setZoom(false); }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/50 p-2 text-white shadow-glow backdrop-blur"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            {index < items.length - 1 && (
              <button
                onClick={() => { go(1); setZoom(false); }}
                aria-label="Next"
                className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/50 p-2 text-white shadow-glow backdrop-blur"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            )}

            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200 backdrop-blur">
              {index + 1} / {items.length}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4 px-2 text-slate-100">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight text-white">{current.title}</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">Фото {index + 1}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{current.description}</p>
          </div>
        </div>

        <div className="px-2 pb-2">
          <button
            onClick={() => onFinish && onFinish()}
            className="w-full rounded-3xl bg-gradient-to-r from-aurora via-lilac to-rose py-3 text-sm font-semibold text-white shadow-glow"
            aria-label="Продолжить"
          >
            ❤️ Продолжить
          </button>
        </div>
      </div>
    );
}

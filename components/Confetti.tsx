'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  active: boolean;
}

export default function Confetti({ active }: ConfettiProps) {
  useEffect(() => {
    if (!active) return;
    const duration = 1700;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 160, ticks: 60, zIndex: 999 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 20 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount: Math.round(particleCount),
        origin: { x: Math.random(), y: Math.random() * 0.3 }
      });
    }, 200);

    return () => clearInterval(interval);
  }, [active]);

  return null;
}

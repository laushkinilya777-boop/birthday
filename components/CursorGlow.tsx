'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const hide = () => setVisible(false);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', update);
      window.addEventListener('mouseleave', hide);
      return () => {
        window.removeEventListener('mousemove', update);
        window.removeEventListener('mouseleave', hide);
      };
    }
    return undefined;
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-50 opacity-0 transition-opacity duration-300"
      style={{
        left: position.x - 20,
        top: position.y - 20,
        opacity: visible ? 1 : 0
      }}
    >
      <div className="h-10 w-10 rounded-full bg-white/20 blur-2xl shadow-[0_0_40px_rgba(236,72,153,0.35)]" />
    </div>
  );
}

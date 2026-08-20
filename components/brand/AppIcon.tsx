'use client';

import Image from 'next/image';

export default function AppIcon({ src = '/brand/app-icon.png', alt = 'DWH' }: { src?: string; alt?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="app-icon" style={{ width: 290, height: 225 }}>
        <Image src={src} alt={alt} width={290} height={225} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <style jsx>{`
        .app-icon { padding: 16px; box-sizing: border-box; }
        @media (max-width: 420px) { .app-icon { width: 140px; height: 110px; } }
      `}</style>
    </div>
  );
}

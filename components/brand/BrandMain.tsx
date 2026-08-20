'use client';

import Image from 'next/image';

export default function BrandMain({ src = '/brand/logo-main.png', alt = 'DoWorkHere' }: { src?: string; alt?: string }) {
  return (
    <div className="w-full flex justify-center">
      <div className="brand-main-container" style={{ maxWidth: 710, maxHeight: 483 }}>
        <Image src={src} alt={alt} width={710} height={483} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
      </div>
      <style jsx>{`
        .brand-main-container { width: 100%; max-width: 710px; padding: 20px; box-sizing: border-box; }
        @media (max-width: 420px) {
          .brand-main-container { padding: 12px; }
        }
      `}</style>
    </div>
  );
}

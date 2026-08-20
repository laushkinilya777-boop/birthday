'use client';

import Image from 'next/image';

export default function BrandBanner({ src = '/brand/logo-banner.png', alt = 'DoWorkHere' }: { src?: string; alt?: string }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="brand-banner" style={{ width: 418, height: 218 }}>
        <Image src={src} alt={alt} width={418} height={218} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <style jsx>{`
        .brand-banner { padding: 12px; box-sizing: border-box; }
        @media (max-width: 480px) { .brand-banner { width: calc(100% - 24px); height: auto; } }
      `}</style>
    </div>
  );
}

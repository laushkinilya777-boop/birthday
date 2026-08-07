import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'С днём рождения, любимая',
  description: 'Магическое цифровое поздравление с красивыми анимациями, желанием и музыкой.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className="h-full bg-slate-950">
      <body className={`${poppins.className} min-h-screen overflow-hidden text-white`}>
        {children}
      </body>
    </html>
  );
}

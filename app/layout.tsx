import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'DoWorkHere — Нужна помощь? Кто-то сделает',
  description: 'DoWorkHere (DWH) — маркетплейс разовых задач. Создай заказ и найди человека рядом.',
  icons: {
    icon: '/brand/app-icon.png'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className="h-full bg-white text-gray-900">
      <body className={`${poppins.className} min-h-screen overflow-hidden text-gray-900`}>
        <Navbar />
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}

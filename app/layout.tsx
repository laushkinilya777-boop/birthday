import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Providers from '../components/Providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'DoWorkHere — быстрые задачи рядом',
  description: 'DoWorkHere (DWH) — сервис разовых задач. Создайте заказ или найдите работу рядом.',
  icons: { icon: '/brand/app-icon.png' }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ru"><body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}><Providers><Navbar /><main>{children}</main></Providers></body></html>;
}

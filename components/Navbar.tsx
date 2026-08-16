'use client';

import Link from 'next/link';
import BrandBanner from './brand/BrandBanner';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="w-full border-b bg-white/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="w-36">
              <BrandBanner />
            </div>
          </Link>
          <div className="hidden sm:flex gap-4">
            <Link href="/orders" className="text-sm font-medium">Заказы</Link>
            <Link href="/orders/create" className="text-sm font-medium">Создать</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <Link href="/profile" className="rounded-md border px-3 py-2 text-sm">Профиль</Link>
          ) : (
            <>
              <Link href="/auth/signin" className="rounded-md border px-3 py-2 text-sm">Войти</Link>
              <Link href="/auth/signup" className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

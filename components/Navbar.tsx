'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, UserRound, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const links = [['Заказы', '/orders'], ['Создать заказ', '/orders/create'], ['Мои заказы', '/my-orders'], ['Мои отклики', '/my-applications']];
export default function Navbar() {
  const { data: session } = useSession(); const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
    <Link href="/" className="flex shrink-0 items-center"><Image src="/brand/logo-banner.png" alt="DoWorkHere" width={418} height={218} className="h-10 w-20 object-contain sm:w-24" priority /></Link>
    <nav className="hidden items-center gap-5 lg:flex">{links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">{label}</Link>)}</nav>
    <div className="hidden items-center gap-2 sm:flex">{session?.user ? <Link href="/profile" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><UserRound size={16}/>{session.user.name || 'Профиль'}</Link> : <><Link href="/auth/signin" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Войти</Link><Link href="/auth/signup" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700">Регистрация</Link></>}</div>
    <button onClick={() => setOpen(!open)} className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 sm:hidden" aria-label="Открыть меню">{open ? <X/> : <Menu/>}</button>
  </div>{open && <div className="border-t border-slate-100 bg-white px-4 py-3 sm:hidden"><nav className="grid gap-1">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-slate-50">{label}</Link>)}{session?.user ? <Link href="/profile" className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-slate-50">Профиль</Link> : <div className="mt-2 flex gap-2"><Link href="/auth/signin" className="flex-1 rounded-xl border px-3 py-2 text-center text-sm font-semibold">Войти</Link><Link href="/auth/signup" className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white">Регистрация</Link></div>}</nav></div>}</header>;
}

'use client';

import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Заказы рядом</h1>
        <Link href="/orders/create" className="rounded-md bg-indigo-600 px-4 py-2 text-white">Создать заказ</Link>
      </header>

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">🔴 Срочно</div>
              <h2 className="text-lg font-semibold">Вынести 5 шкафов</h2>
              <div className="mt-2 text-sm text-slate-600">25 000 ₸ · Караганда · Сегодня</div>
            </div>
            <div>
              <button className="rounded-md bg-green-500 px-3 py-2 text-white">Откликнуться</button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">🚚</div>
              <h2 className="text-lg font-semibold">Разгрузить газель</h2>
              <div className="mt-2 text-sm text-slate-600">12 000 ₸ · Караганда · Через 2 часа</div>
            </div>
            <div>
              <button className="rounded-md bg-green-500 px-3 py-2 text-white">Откликнуться</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

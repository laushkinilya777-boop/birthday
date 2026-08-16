import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export default async function OrdersPage() {
  // server component - fetch orders from DB
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Заказы рядом</h1>
        <Link href="/orders/create" className="rounded-md bg-indigo-600 px-4 py-2 text-white">Создать заказ</Link>
      </header>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">{o.urgency === 'NORMAL' ? 'Обычная' : '🔴 Срочно'}</div>
                <h2 className="text-lg font-semibold">{o.title}</h2>
                <div className="mt-2 text-sm text-slate-600">{o.price} ₸ · {o.city} · {new Date(o.createdAt).toLocaleDateString()}</div>
              </div>
              <div>
                <Link href={`/orders/${o.id}`} className="rounded-md bg-indigo-600 px-3 py-2 text-white">Подробнее</Link>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-slate-500">Пока нет заказов. Создайте первый!</div>
        )}
      </div>
    </div>
  );
}

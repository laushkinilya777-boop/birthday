export const dynamic = 'force-dynamic';

import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import nextDynamic from 'next/dynamic';

const ApplyClient = nextDynamic(() => import('./ApplyClient'), { ssr: false });
const OrderActions = nextDynamic(() => import('./OrderActions'), { ssr: false });

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id }, include: { author: true, applications: { include: { user: true } } } });
  if (!order) return <div className="min-h-screen p-6">Заказ не найден</div>;

  const accepted = order.applications.find((a) => a.status === 'ACCEPTED');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{order.title}</h1>
              <div className="text-sm text-slate-500">{order.price} ₸ · {order.city}</div>
            </div>
            <div className="text-right">
              <div className="text-sm">Автор: {order.author?.name || '—'}</div>
              <div className="text-sm mt-1">Статус: <span className="font-medium">{order.status}</span></div>
              {accepted && (
                <div className="text-sm mt-1">Исполнитель: <span className="font-medium">{accepted.user?.name || accepted.user?.email}</span></div>
              )}
            </div>
          </div>
          <p className="mt-4 text-slate-300">{order.description}</p>
        </div>

        <div>
          <ApplyClient orderId={order.id} authorId={order.authorId} />
        </div>

        <div>
          <OrderActions orderId={order.id} authorId={order.authorId} initialStatus={order.status} />
        </div>

        <div className="flex gap-3">
          <Link href="/orders" className="rounded-md border px-4 py-2">Назад</Link>
        </div>
      </div>
    </div>
  );
}
import { prisma } from '../../../../lib/prisma';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ApplyClient = dynamic(() => import('./ApplyClient'), { ssr: false });

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id }, include: { author: true } });
  if (!order) return <div className="min-h-screen p-6">Заказ не найден</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{order.title}</h1>
              <div className="text-sm text-slate-500">{order.price} ₸ · {order.city}</div>
            </div>
            <div>
              <div className="text-sm">Автор: {order.author?.name || '—'}</div>
            </div>
          </div>
          <p className="mt-4 text-slate-300">{order.description}</p>
        </div>

        <div>
          <ApplyClient orderId={order.id} authorId={order.authorId} />
        </div>

        <div className="flex gap-3">
          <Link href="/orders" className="rounded-md border px-4 py-2">Назад</Link>
        </div>
      </div>
    </div>
  );
}

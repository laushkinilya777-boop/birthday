import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const userId = (session as any)?.user?.id;
    const orderId = params.id;
    const order = await prisma.order.findUnique({ where: { id: orderId }, select: { authorId: true } });
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    if (order.authorId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const applications = await prisma.application.findMany({
      where: { orderId },
      orderBy: { createdAt: 'asc' },
      include: { user: true }
    });
    return NextResponse.json({ applications });
  } catch (err) {
    console.error('Get applications error', err);
    return NextResponse.json({ error: 'Не удалось получить отклики' }, { status: 500 });
  }
}

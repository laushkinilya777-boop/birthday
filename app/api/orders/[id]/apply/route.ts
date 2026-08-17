import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const userId = (session as any)?.user?.id as string | undefined;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const message = body.message || '';

    const orderId = params.id;
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    if (order.authorId === userId) return NextResponse.json({ error: 'Cannot apply to your own order' }, { status: 400 });
    if (order.status !== 'OPEN') return NextResponse.json({ error: 'Applications are closed for this order' }, { status: 400 });

    const existing = await prisma.application.findFirst({ where: { orderId, userId } });
    if (existing) return NextResponse.json({ error: 'You already applied' }, { status: 400 });

    const app = await prisma.application.create({ data: { message, orderId, userId } });

    return NextResponse.json({ ok: true, application: app });
  } catch (err) {
    console.error('Apply error', err);
    return NextResponse.json({ error: 'Failed to apply' }, { status: 500 });
  }
}

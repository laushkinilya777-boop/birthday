import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../../../lib/auth';

export async function POST(req: Request, { params }: { params: { id: string; appId: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const userId = (session as any)?.user?.id as string | undefined;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: orderId, appId } = params;
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    if (order.authorId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // Do not allow accepting if order already in progress/completed/cancelled
    if (order.status !== 'OPEN') return NextResponse.json({ error: 'Cannot accept application for this order (invalid status)' }, { status: 400 });

    const application = await prisma.application.findUnique({ where: { id: appId } });
    if (!application) return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    if (application.orderId !== orderId) return NextResponse.json({ error: 'Application does not belong to this order' }, { status: 400 });
    if (application.status !== 'PENDING') return NextResponse.json({ error: 'Application is no longer pending' }, { status: 400 });

    if (application.userId === order.authorId) return NextResponse.json({ error: 'Cannot accept your own application' }, { status: 400 });

    // Start a transaction: set application accepted, set other applications rejected, set order status
    const updatedApp = await prisma.$transaction(async (tx) => {
      await tx.application.updateMany({ where: { orderId, id: { not: appId } }, data: { status: 'REJECTED' } });
      const app = await tx.application.update({ where: { id: appId }, data: { status: 'ACCEPTED' } });
      await tx.order.update({ where: { id: orderId }, data: { status: 'IN_PROGRESS', workersSelected: 1 } });
      return app;
    });

    return NextResponse.json({ ok: true, application: updatedApp });
  } catch (err) {
    console.error('Accept application error', err);
    return NextResponse.json({ error: 'Не удалось принять отклик' }, { status: 500 });
  }
}

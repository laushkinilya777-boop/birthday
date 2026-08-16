import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const userId = (session as any)?.user?.id as string | undefined;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const orderId = params.id;
    const body = await req.json().catch(() => ({} as any));
    const reviewPayload = body?.review as { rating?: number; comment?: string } | undefined;

    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { applications: true } });
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    if (order.authorId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // If review payload is provided and order is already COMPLETED or will be completed now, allow creating review
    let updatedOrder = order;

    if (order.status === 'IN_PROGRESS') {
      // complete the order
          updatedOrder = await prisma.order.update({ where: { id: orderId }, data: { status: 'COMPLETED' }, include: { applications: true } });
    }

    if (reviewPayload && typeof reviewPayload.rating === 'number') {
      // find accepted application to determine receiver
      const acceptedApp = order.applications.find((a) => a.status === 'ACCEPTED');
      if (!acceptedApp) return NextResponse.json({ error: 'No accepted application to review' }, { status: 400 });

      const receiverId = acceptedApp.userId;
      const rating = Math.round(reviewPayload.rating);
      if (rating < 1 || rating > 5) return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });

      // prevent duplicate review by same author for same order
      const existingReview = await prisma.review.findFirst({ where: { orderId, authorId: userId } });
      if (existingReview) return NextResponse.json({ error: 'You have already left a review for this order' }, { status: 400 });

      // create review
      const review = await prisma.review.create({
        data: {
          orderId,
          authorId: userId,
          receiverId,
          rating,
          comment: reviewPayload.comment
        }
      });

      // recalc receiver stats
      const agg = await prisma.review.aggregate({ where: { receiverId }, _avg: { rating: true }, _count: { _all: true } });
      const avg = agg._avg.rating ?? rating;
      const count = agg._count._all ?? 1;
      await prisma.user.update({ where: { id: receiverId }, data: { rating: Number(avg), completedOrders: count } });

      return NextResponse.json({ ok: true, order: updatedOrder, review });
    }

    return NextResponse.json({ ok: true, order: updatedOrder });
  } catch (err) {
    console.error('Complete order error', err);
    return NextResponse.json({ error: 'Не удалось завершить заказ' }, { status: 500 });
  }
}

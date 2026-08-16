import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;
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

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const CreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  category: z.string().min(1),
  price: z.number().int().nonnegative(),
  workersNeeded: z.number().int().min(1),
  city: z.string().min(1),
  district: z.string().optional(),
  address: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  urgency: z.string().optional()
});

export async function GET() {
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { author: true } });
    return NextResponse.json(orders);
  } catch (err) {
    console.error('Orders GET error', err);
    return NextResponse.json({ error: 'Не удалось получить заказы' }, { status: 500 });
  }
}

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateSchema.parse(body);

    const session = await getServerSession(authOptions as any);
    const userId = (session as any)?.user?.id as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.create({ data: {
      title: parsed.title,
      description: parsed.description,
      category: parsed.category,
      price: parsed.price,
      workersNeeded: parsed.workersNeeded,
      city: parsed.city,
      district: parsed.district,
      address: parsed.address,
      date: parsed.date ? new Date(parsed.date) : undefined,
      time: parsed.time,
      urgency: parsed.urgency || 'NORMAL',
      authorId: userId
    } });
    return NextResponse.json(order);
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors.map(e => e.message).join(', ') }, { status: 400 });
    console.error('Orders POST error', err);
    return NextResponse.json({ error: 'Не удалось создать заказ' }, { status: 500 });
  }
}

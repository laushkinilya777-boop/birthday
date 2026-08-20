import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const BodySchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BodySchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (existing) return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 400 });

    const passwordHash = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsed.name || undefined,
        email: parsed.email,
        passwordHash
      }
    });

    // Do not return sensitive fields
    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors.map((e) => e.message).join(', ') }, { status: 400 });
    console.error('Signup error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) {
    return (
      <div className="min-h-screen p-6">
        <p>Вы не вошли. <Link href="/auth/signin" className="text-indigo-500">Войти</Link></p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return <div className="min-h-screen p-6">Пользователь не найден</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold">Профиль</h1>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-slate-500">Имя</div>
          <div className="text-lg font-medium">{user.name || '—'}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-slate-500">Email</div>
          <div className="text-lg font-medium">{user.email}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-slate-500">Город</div>
          <div className="text-lg font-medium">{user.city || '—'}</div>
        </div>
        <div className="flex gap-3">
          <Link href="/orders/create" className="rounded-md bg-indigo-600 px-4 py-2 text-white">Создать заказ</Link>
          <Link href="/" className="rounded-md border px-4 py-2">На главную</Link>
        </div>
      </div>
    </div>
  );
}

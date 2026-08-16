'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import ReviewForm from './ReviewForm';

type App = {
  id: string;
  message: string;
  status: string;
  createdAt: string;
  user: { id: string; name?: string; email: string };
};

export default function OrderActions({ orderId, authorId, initialStatus }: { orderId: string; authorId: string; initialStatus: string }) {
  const { data: session } = useSession();
  const userId = (session as any)?.user?.id as string | undefined;

  const [applications, setApplications] = useState<App[]>([]);
  const [status, setStatus] = useState<string>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchApps = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`/api/orders/${orderId}/applications`);
      const json = await res.json();
      if (res.ok) setApplications(json.applications || []);
      else setError(json.error || 'Не удалось загрузить отклики');
    } catch (err) {
      console.error(err);
      setError('Ошибка сети');
    }
  }, [orderId]);

  useEffect(() => {
    fetchApps();
    // poll a bit to catch updates
    const t = setInterval(fetchApps, 5000);
    return () => clearInterval(t);
  }, [fetchApps]);

  const accept = async (appId: string) => {
    if (!confirm('Принять этого исполнителя?')) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/orders/${orderId}/applications/${appId}/accept`, { method: 'POST' });
      const json = await res.json();
      if (res.ok) {
        setSuccess('Исполнитель принят');
        setStatus('IN_PROGRESS');
        await fetchApps();
      } else {
        setError(json.error || 'Ошибка при принятии');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  const complete = async () => {
    if (!confirm('Завершить заказ?')) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/orders/${orderId}/complete`, { method: 'POST' });
      const json = await res.json();
      if (res.ok) {
        setSuccess('Заказ завершён');
        setStatus('COMPLETED');
        await fetchApps();
      } else {
        setError(json.error || 'Ошибка при завершении');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Отклики</h3>
          <div className="text-sm text-slate-500">Статус: <span className="font-medium">{status}</span></div>
        </div>

        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        {success && <div className="mt-2 text-sm text-green-600">{success}</div>}

        {applications.length === 0 && <div className="text-sm text-slate-500 mt-2">Пока нет откликов</div>}
        <div className="mt-3 space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="p-3 rounded-md border bg-white/40 flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium">{app.user?.name || app.user?.email}</div>
                <div className="text-sm text-slate-600 mt-1">{app.message}</div>
                <div className="text-xs text-slate-400 mt-2">{new Date(app.createdAt).toLocaleString()}</div>
              </div>
              <div className="ml-4 flex flex-col items-end">
                <div className="text-sm mb-2">
                  {app.status === 'PENDING' && <span className="text-yellow-600">Ожидает</span>}
                  {app.status === 'ACCEPTED' && <span className="text-green-600">Принят</span>}
                  {app.status === 'REJECTED' && <span className="text-slate-500">Отклонён</span>}
                </div>
                {userId === authorId && app.status === 'PENDING' && (
                  <button disabled={loading} onClick={() => accept(app.id)} className="rounded-md bg-indigo-600 px-3 py-1 text-white text-sm">Принять</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {userId === authorId && status === 'IN_PROGRESS' && (
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Действия</h3>
          <div className="mt-3 flex gap-3">
            <button disabled={loading} onClick={complete} className="rounded-md bg-pink-600 px-4 py-2 text-white">Завершить заказ</button>
          </div>
        </div>
      )}

      {status === 'COMPLETED' && userId === authorId && (
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Оставить отзыв</h3>
          <ReviewForm orderId={orderId} onDone={() => setSuccess('Спасибо за отзыв')} />
        </div>
      )}
    </div>
  );
}

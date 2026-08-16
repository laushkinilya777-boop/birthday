'use client';

import { useState } from 'react';

export default function ReviewForm({ orderId, onDone }: { orderId: string; onDone?: () => void }) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = async () => {
    if (rating < 1 || rating > 5) return setError('Оценка от 1 до 5');
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/orders/${orderId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: { rating, comment } })
      });
      const json = await res.json();
      if (res.ok) {
        setSuccess('Отзыв отправлен');
        onDone?.();
      } else {
        setError(json.error || 'Ошибка при отправке отзыва');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && <div className="text-sm text-red-600">{error}</div>}
      {success && <div className="text-sm text-green-600">{success}</div>}
      <div className="flex items-center gap-2">
        <div className="text-sm">Оценка:</div>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="rounded-md p-2 bg-white/80">
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} ⭐</option>
          ))}
        </select>
      </div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full rounded-md p-3 h-24 text-black" placeholder="Напишите комментарий (опционально)" />
      <div>
        <button disabled={loading} onClick={submit} className="rounded-md bg-indigo-600 px-4 py-2 text-white">{loading ? 'Отправка...' : 'Отправить отзыв'}</button>
      </div>
    </div>
  );
}

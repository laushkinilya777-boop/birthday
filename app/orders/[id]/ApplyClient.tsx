'use client';

import { useState } from 'react';

export default function ApplyClient({ orderId, authorId }: { orderId: string; authorId: string }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const apply = async () => {
    setStatus('sending');
    try {
      const res = await fetch(`/api/orders/${orderId}/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) });
      const json = await res.json();
      if (res.ok) {
        setStatus('success');
        alert('Отклик отправлен');
      } else if (res.status === 401) {
        window.location.href = '/auth/signin';
      } else {
        setStatus('error');
        alert(json.error || 'Ошибка при отправке отклика');
      }
    } catch (err) {
      setStatus('error');
      alert('Ошибка при отправке отклика');
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Напиши, почему ты подходишь" className="w-full rounded-md p-3 h-24 text-black" />
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-500">Автор заказа: {authorId}</div>
        <button onClick={apply} className="rounded-md bg-green-500 px-4 py-2 text-white">Откликнуться</button>
      </div>
    </div>
  );
}

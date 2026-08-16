'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function CreateOrderPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        category: data.category || 'Другое',
        price: Number(data.price) || 0,
        workersNeeded: Number(data.workersNeeded) || 1,
        city: data.city || 'Караганда',
        district: data.district || undefined,
        address: data.address || undefined,
        urgency: data.urgency || 'NORMAL'
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok) {
        router.push('/orders');
      } else if (res.status === 401) {
        router.push('/auth/signin');
      } else {
        alert(json.error || 'Ошибка создания заказа');
        console.error('Create order error', json);
      }
    } catch (err) {
      console.error('Create order exception', err);
      alert('Ошибка создания заказа');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Создать заказ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <input {...register('title')} placeholder="Название" className="w-full rounded-md p-3" />
        <textarea {...register('description')} placeholder="Описание" className="w-full rounded-md p-3 h-32" />
        <input {...register('price')} placeholder="Цена (₸)" className="w-full rounded-md p-3" />
        <input {...register('workersNeeded')} placeholder="Количество исполнителей" className="w-full rounded-md p-3" />
        <input {...register('city')} placeholder="Город" className="w-full rounded-md p-3" />
        <select {...register('urgency')} className="w-full rounded-md p-3">
          <option value="NORMAL">Обычная</option>
          <option value="URGENT">Срочная</option>
        </select>
        <button className="rounded-md bg-indigo-600 px-4 py-3 text-white">Опубликовать заказ</button>
      </form>
    </div>
  );
}

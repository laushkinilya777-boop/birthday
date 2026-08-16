'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function CreateOrderPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    // This will be implemented: call API to create order
    alert('Создание заказа (пока заглушка)');
    router.push('/orders');
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Создать заказ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <input {...register('title')} placeholder="Название" className="w-full rounded-md p-3" />
        <textarea {...register('description')} placeholder="Описание" className="w-full rounded-md p-3 h-32" />
        <input {...register('price')} placeholder="Цена (₸)" className="w-full rounded-md p-3" />
        <button className="rounded-md bg-indigo-600 px-4 py-3 text-white">Опубликовать заказ</button>
      </form>
    </div>
  );
}

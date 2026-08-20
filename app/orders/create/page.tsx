'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import {
  CATEGORIES,
  formatCategory,
  getCategoryLabel,
  getDefaultMainCategoryId,
  getDefaultSubcategoryId,
  getSubcategories,
} from '../../../lib/categories';

type Form = {
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  price: string;
  city: string;
  district: string;
  address: string;
  date: string;
  time: string;
  urgency: string;
  workersNeeded: string;
};

export default function CreateOrderPage() {
  const defaultMain = getDefaultMainCategoryId();
  const { register, handleSubmit, watch, setValue } = useForm<Form>({
    defaultValues: {
      mainCategory: defaultMain,
      subCategory: getDefaultSubcategoryId(defaultMain),
      city: 'Караганда',
      workersNeeded: '1',
      urgency: 'NORMAL',
    },
  });
  const router = useRouter();
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const mainCategory = watch('mainCategory');
  const subCategory = watch('subCategory');

  useEffect(() => {
    const subs = getSubcategories(mainCategory);
    if (!subs.some((s) => s.id === subCategory)) {
      setValue('subCategory', subs[0]?.id ?? 'other');
    }
  }, [mainCategory, subCategory, setValue]);

  const onSubmit = async (data: Form) => {
    setSending(true);
    setError('');
    try {
      const category = formatCategory(data.mainCategory, data.subCategory);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          category,
          price: Number(data.price),
          workersNeeded: Number(data.workersNeeded),
          city: data.city,
          district: data.district,
          address: data.address,
          date: data.date,
          time: data.time,
          urgency: data.urgency === 'URGENT' ? 'URGENT' : 'NORMAL',
        }),
      });
      const json = await res.json();
      if (res.ok) router.push(`/orders/${json.id}`);
      else if (res.status === 401) router.push('/auth/signin');
      else setError(json.error || 'Не удалось опубликовать заказ.');
    } catch {
      setError('Проверьте соединение и попробуйте снова.');
    } finally {
      setSending(false);
    }
  };

  const title = watch('title');
  const price = watch('price');
  const city = watch('city');
  const previewCategory = formatCategory(mainCategory, subCategory);
  const input =
    'mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-bold text-orange-600">Новый заказ</p>
          <h1 className="mt-1 text-3xl font-black">Что нужно сделать?</h1>
          <p className="mt-2 text-slate-500">
            Опишите задачу понятным языком — это поможет быстрее найти исполнителя.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {error && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
            )}
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold">1. О задаче</h2>
              <label className="mt-4 block text-sm font-semibold">
                Название
                <input required {...register('title')} className={input} placeholder="Например, собрать шкаф" />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Описание
                <textarea
                  required
                  {...register('description')}
                  className={`${input} h-32 resize-none`}
                  placeholder="Что нужно сделать, какие есть нюансы?"
                />
              </label>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Категория
                  <select {...register('mainCategory')} className={input}>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold">
                  Подкатегория
                  <select {...register('subCategory')} className={input}>
                    {getSubcategories(mainCategory).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold">2. Когда и где</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Город
                  <input required {...register('city')} className={input} />
                </label>
                <label className="text-sm font-semibold">
                  Район
                  <input {...register('district')} className={input} placeholder="Необязательно" />
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Адрес
                  <input {...register('address')} className={input} placeholder="Улица, дом — можно уточнить позже" />
                </label>
                <label className="text-sm font-semibold">
                  Дата
                  <input type="date" {...register('date')} className={input} />
                </label>
                <label className="text-sm font-semibold">
                  Время
                  <input type="time" {...register('time')} className={input} />
                </label>
              </div>
              <label className="mt-4 flex items-center gap-3 rounded-xl bg-orange-50 p-3 text-sm font-semibold text-orange-800">
                <input type="checkbox" value="URGENT" {...register('urgency')} /> Срочная задача
              </label>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold">3. Оплата</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Сколько готовы заплатить
                  <input required min="1" type="number" {...register('price')} className={input} placeholder="20 000" />
                </label>
                <label className="text-sm font-semibold">
                  Исполнителей
                  <input min="1" type="number" {...register('workersNeeded')} className={input} />
                </label>
              </div>
            </section>
            <button
              disabled={sending}
              className="w-full rounded-xl bg-slate-900 px-5 py-4 font-bold text-white shadow-lg disabled:opacity-60"
            >
              {sending ? 'Публикуем…' : 'Опубликовать заказ'}
            </button>
          </form>
        </div>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Предпросмотр</p>
          <span className="mt-4 inline-block rounded-lg bg-orange-50 px-2 py-1 text-xs font-bold text-orange-700">
            {getCategoryLabel(previewCategory)}
          </span>
          <h2 className="mt-3 text-lg font-bold">{title || 'Название вашей задачи'}</h2>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} />
            {city || 'Город'}
          </p>
          <div className="mt-5 border-t pt-4">
            <p className="text-xs text-slate-400">Оплата</p>
            <strong className="text-2xl">{Number(price || 0).toLocaleString('ru-RU')} ₸</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

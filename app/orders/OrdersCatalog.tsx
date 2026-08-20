'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import OrderCard from '../../components/OrderCard';
import { getFilterOptions, matchesMainCategory } from '../../lib/categories';

export default function OrdersCatalog({ orders }: { orders: any[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [sort, setSort] = useState('new');
  const filterOptions = getFilterOptions();

  const filtered = useMemo(
    () =>
      orders
        .filter(
          (o) =>
            (!query ||
              `${o.title} ${o.description} ${o.city}`.toLowerCase().includes(query.toLowerCase())) &&
            matchesMainCategory(o.category, category) &&
            (!urgent || o.urgency === 'URGENT')
        )
        .sort((a, b) =>
          sort === 'price'
            ? b.price - a.price
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    [orders, query, category, urgent, sort]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold text-orange-600">DWH / Заказы</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Заказы рядом</h1>
          <p className="mt-2 text-slate-500">Найдите задачу, которую сможете выполнить.</p>
        </div>
        <Link
          href="/orders/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white hover:bg-slate-700"
        >
          <Plus size={18} />
          Создать заказ
        </Link>
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3">
          <Search size={20} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найти задачу..."
            className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">Все категории</option>
            {filterOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setUrgent(!urgent)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium ${
              urgent
                ? 'border-orange-300 bg-orange-50 text-orange-700'
                : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            Только срочные
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="new">Сначала новые</option>
            <option value="price">Сначала дорогие</option>
          </select>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-500">Найдено: {filtered.length}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <SlidersHorizontal className="mx-auto text-slate-400" />
          <h2 className="mt-3 font-bold">Пока здесь нет подходящих задач</h2>
          <p className="mt-1 text-sm text-slate-500">Попробуйте изменить фильтры или создайте свой заказ.</p>
          <Link href="/orders/create" className="mt-5 inline-block font-bold text-blue-700">
            Создать заказ
          </Link>
        </div>
      )}
    </div>
  );
}

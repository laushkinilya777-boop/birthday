'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export default function SignInPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const res = await signIn('credentials', { redirect: false, email: data.email, password: data.password });
    if (res && !res.error) {
      router.push('/orders');
    } else {
      alert('Ошибка входа');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4 rounded-lg bg-white/5 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Вход в DWH</h1>
        <input {...register('email')} placeholder="Email" className="w-full rounded-md p-3 text-black" />
        <input {...register('password')} type="password" placeholder="Пароль" className="w-full rounded-md p-3 text-black" />
        <button type="submit" className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white">Войти</button>
      </form>
    </div>
  );
}

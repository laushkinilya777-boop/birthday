'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (res.ok) {
        // auto sign-in after signup
        const signInRes: any = await signIn('credentials', { redirect: false, email: data.email, password: data.password });
        if (signInRes && !signInRes.error) {
          router.push('/orders');
        } else {
          router.push('/auth/signin');
        }
      } else {
        alert(json.error || 'Ошибка регистрации');
      }
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4 rounded-lg bg-white/5 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Регистрация в DWH</h1>
        <input {...register('name')} placeholder="Имя" className="w-full rounded-md p-3 text-black" />
        <input {...register('email')} placeholder="Email" className="w-full rounded-md p-3 text-black" />
        <input {...register('password')} type="password" placeholder="Пароль (min 6)" className="w-full rounded-md p-3 text-black" />
        <button type="submit" className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white">Зарегистрироваться</button>
        <div className="text-center text-sm text-slate-300">
          Уже есть аккаунт? <a href="/auth/signin" className="text-indigo-300 underline">Войти</a>
        </div>
      </form>
    </div>
  );
}

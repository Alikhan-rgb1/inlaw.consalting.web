'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Image from 'next/image';

import { useLanguage } from '@/context/LanguageContext';

export default function DubaiLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const translations = {
    EN: {
      title: 'Dubai Office Portal',
      subtitle: 'Secure Client Access',
      email: 'Email address',
      password: 'Password',
      signIn: 'Sign in',
      signingIn: 'Signing in...',
      newClient: 'New client?',
      register: 'Register Account',
      error: 'Invalid credentials',
      generalError: 'An error occurred'
    },
    RU: {
      title: 'Портал офиса в Дубае',
      subtitle: 'Безопасный вход для клиентов',
      email: 'Email адрес',
      password: 'Пароль',
      signIn: 'Войти',
      signingIn: 'Вход...',
      newClient: 'Новый клиент?',
      register: 'Зарегистрироваться',
      error: 'Неверные данные для входа',
      generalError: 'Произошла ошибка'
    },
    CHI: {
      title: '迪拜办事处门户',
      subtitle: '安全客户访问',
      email: '电子邮件地址',
      password: '密码',
      signIn: '登录',
      signingIn: '登录中...',
      newClient: '新客户？',
      register: '注册账户',
      error: '凭据无效',
      generalError: '发生错误'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(t.error);
        setLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(t.generalError);
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 pt-28 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md border-2 border-white">
            <Image
              src="/logo.png"
              alt="Inlaw.kz Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">
          {t.title}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {t.subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                {t.email}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                {t.password}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t.signingIn : t.signIn}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  {t.newClient}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/dubai/register"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                {t.register}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

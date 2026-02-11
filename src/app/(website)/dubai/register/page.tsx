'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const registerSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();

  const translations = {
    EN: {
      title: 'Client Registration',
      subtitle: 'Create your Dubai Office portal account',
      companyName: 'Company Name',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      password: 'Password',
      register: 'Register',
      creating: 'Creating Account...',
      alreadyAccount: 'Already have an account? Sign in',
      successTitle: 'Registration Successful!',
      successDesc: 'Please check your email to confirm your account. Once confirmed, you can sign in.',
      backToSignIn: 'Back to Sign In',
      errors: {
        companyRequired: "Company name is required",
        nameRequired: "Full name is required",
        emailInvalid: "Invalid email address",
        phoneRequired: "Phone number is required",
        countryRequired: "Country is required",
        passwordLength: "Password must be at least 6 characters",
        failed: 'Registration failed'
      }
    },
    RU: {
      title: 'Регистрация Клиента',
      subtitle: 'Создайте аккаунт в портале офиса Дубая',
      companyName: 'Название Компании',
      fullName: 'ФИО',
      email: 'Email',
      phone: 'Телефон',
      country: 'Страна',
      password: 'Пароль',
      register: 'Зарегистрироваться',
      creating: 'Создание аккаунта...',
      alreadyAccount: 'Уже есть аккаунт? Войти',
      successTitle: 'Регистрация успешна!',
      successDesc: 'Пожалуйста, проверьте email для подтверждения аккаунта. После подтверждения вы сможете войти.',
      backToSignIn: 'Вернуться ко входу',
      errors: {
        companyRequired: "Название компании обязательно",
        nameRequired: "ФИО обязательно",
        emailInvalid: "Неверный email адрес",
        phoneRequired: "Номер телефона обязателен",
        countryRequired: "Страна обязательна",
        passwordLength: "Пароль должен быть не менее 6 символов",
        failed: 'Ошибка регистрации'
      }
    },
    CHI: {
      title: '客户注册',
      subtitle: '创建您的迪拜办事处门户账户',
      companyName: '公司名称',
      fullName: '全名',
      email: '电子邮件',
      phone: '电话',
      country: '国家',
      password: '密码',
      register: '注册',
      creating: '正在创建账户...',
      alreadyAccount: '已有账户？登录',
      successTitle: '注册成功！',
      successDesc: '请检查您的电子邮件以确认您的账户。确认后即可登录。',
      backToSignIn: '返回登录',
      errors: {
        companyRequired: "公司名称为必填项",
        nameRequired: "全名为必填项",
        emailInvalid: "无效的电子邮件地址",
        phoneRequired: "电话号码为必填项",
        countryRequired: "国家为必填项",
        passwordLength: "密码必须至少6个字符",
        failed: '注册失败'
      }
    }
  };

  const t = translations[language];

  // We need to recreate the schema inside the component or use a function to get messages based on language
  // But for simplicity, we'll just use the keys and display translated errors in the UI
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError('');

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            company_name: data.companyName,
            phone: data.phone,
            country: data.country,
            role: 'client', // Default role
          },
        },
      });

      if (authError) throw authError;

      // If successful
      setSuccess(true);
      // Optional: Automatically sign in or wait for email confirmation
    } catch (err: any) {
      setError(err.message || t.errors.failed);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 pt-28 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <h3 className="text-xl font-medium text-green-600 mb-4">{t.successTitle}</h3>
            <p className="text-slate-600 mb-6">
              {t.successDesc}
            </p>
            <Link
              href="/dubai"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t.backToSignIn}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 pt-28 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {t.title}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {t.subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">{t.companyName}</label>
              <input
                {...register('companyName')}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.companyName && <p className="mt-1 text-xs text-red-600">{t.errors.companyRequired}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">{t.fullName}</label>
              <input
                {...register('fullName')}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{t.errors.nameRequired}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">{t.email}</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{t.errors.emailInvalid}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">{t.phone}</label>
                <input
                  {...register('phone')}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{t.errors.phoneRequired}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">{t.country}</label>
                <input
                  {...register('country')}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
                {errors.country && <p className="mt-1 text-xs text-red-600">{t.errors.countryRequired}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">{t.password}</label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{t.errors.passwordLength}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? t.creating : t.register}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
             <Link href="/dubai" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
               {t.alreadyAccount}
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const { t, language } = useLanguage();

  const content = {
    EN: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: May 5, 2026',
      sections: [
        {
          title: '1. Introduction',
          text: 'INLAW inc LTD. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website inlaw.consulting. This Privacy Policy is also applicable to the Ancilla mobile app and other software published by Rakhymzhanov Berik and INLAW Inc. Ltd. on platforms like Google Play and the App Store.'
        },
        {
          title: '2. Information We Collect',
          text: 'We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, such as your name, email address, phone number, and project details.'
        },
        {
          title: '3. How We Use Your Information',
          text: 'We use the information we collect to provide, operate, and maintain our services, improve our website, and communicate with you regarding your inquiries.'
        },
        {
          title: '4. Data Security',
          text: 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.'
        },
        {
          title: '5. Contact Us',
          text: 'If you have questions or comments about this Privacy Policy, please contact us at: info@inlaw.kz'
        }
      ]
    },
    RU: {
      title: 'Политика конфиденциальности',
      lastUpdated: 'Последнее обновление: 5 мая 2026 г.',
      sections: [
        {
          title: '1. Введение',
          text: 'INLAW inc LTD. («мы», «наш» или «нас») стремится защищать вашу конфиденциальность. Настоящая Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию, когда вы посещаете наш веб-сайт inlaw.consulting. Настоящая Политика конфиденциальности также применима к мобильному приложению Ancilla и другому программному обеспечению, опубликованному Рахымжановым Бериком и INLAW Inc. Ltd. на таких платформах, как Google Play и App Store.'
        },
        {
          title: '2. Информация, которую мы собираем',
          text: 'Мы можем собирать личную информацию, которую вы добровольно предоставляете нам, когда выражаете заинтересованность в получении информации о нас или наших услугах, такую как ваше имя, адрес электронной почты, номер телефона и детали проекта.'
        },
        {
          title: '3. Как мы используем вашу информацию',
          text: 'Мы используем собираемую информацию для предоставления, эксплуатации и обслуживания наших услуг, улучшения нашего веб-сайта и общения с вами по поводу ваших запросов.'
        },
        {
          title: '4. Безопасность данных',
          text: 'Мы используем административные, технические и физические меры безопасности, чтобы помочь защитить вашу личную информацию. Хотя мы предприняли разумные шаги для защиты личной информации, которую вы нам предоставляете, имейте в виду, что никакие меры безопасности не являются идеальными или непроницаемыми.'
        },
        {
          title: '5. Свяжитесь с нами',
          text: 'Если у вас есть вопросы или комментарии по поводу настоящей Политики конфиденциальности, свяжитесь с нами по адресу: info@inlaw.kz'
        }
      ]
    },
    CHI: {
      title: '隐私政策',
      lastUpdated: '最后更新：2026年5月5日',
      sections: [
        {
          title: '1. 简介',
          text: 'INLAW inc LTD.（“我们”或“我们的”）致力于保护您的隐私。本隐私政策解释了当您访问我们的网站 inlaw.consulting 时，我们如何收集、使用、披露和保护您的信息。本隐私政策同样适用于 Ancilla 移动应用程序以及 Rakhymzhanov Berik 和 INLAW Inc. Ltd. 在 Google Play 和 App Store 等平台发布的其他软件。'
        },
        {
          title: '2. 我们收集的信息',
          text: '当您表示有兴趣获取有关我们或我们服务的信息时，我们可能会收集您自愿提供给我们的个人信息，例如您的姓名、电子邮件地址、电话号码和项目详情。'
        },
        {
          title: '3. 我们如何使用您的信息',
          text: '我们使用收集的信息来提供、运营和维护我们的服务，改进我们的网站，并就您的咨询与您沟通。'
        },
        {
          title: '4. 数据安全',
          text: '我们使用行政、技术和物理安全措施来帮助保护您的个人信息。虽然我们已采取合理措施保护您提供给我们的个人信息，但请注意，没有任何安全措施是完美或不可逾越的。'
        },
        {
          title: '5. 联系我们',
          text: '如果您对本隐私政策有任何疑问或意见，请通过以下方式联系我们：info@inlaw.kz'
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content] || content.EN;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#2E447A] font-bold mb-8 transition-colors group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {language === 'RU' ? 'На главную' : language === 'CHI' ? '回到首页' : 'Back to Home'}
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-slate-500 mb-12 font-medium">
            {currentContent.lastUpdated}
          </p>

          <div className="space-y-10">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                  {section.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

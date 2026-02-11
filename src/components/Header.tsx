'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/translations';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language: currentLang, setLanguage: setCurrentLang, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', href);
      }
    }
    setMobileMenuOpen(false);
  };

  const languages: { code: Language, label: string, flag: string }[] = [
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'RU', label: 'Russian', flag: '🇷🇺' },
    { code: 'CHI', label: 'Chinese', flag: '🇨🇳' },
  ];

  const navItems = [
    { name: t.header.services, href: '/#services' },
    { name: t.header.solutions, href: '/#solutions' },
    { name: t.header.about, href: '/#about' },
    { name: t.header.jurisdictions, href: '/#jurisdictions' },
    { name: t.header.process, href: '/#process' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-3' 
            : 'bg-white/50 backdrop-blur-sm border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <div className={`relative overflow-hidden rounded-full shadow-sm border border-slate-100 group-hover:shadow-md transition-all duration-300 ${
              isScrolled ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
              <Image
                src="/logo.png"
                alt="Inlaw.kz Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-500 leading-tight uppercase tracking-[0.2em] mb-0.5 opacity-0 sm:opacity-100 transition-opacity">
                Company Service Provider 
              </span>
              <span className={`font-bold text-slate-900 leading-none tracking-tight transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>
                INLAW inc LTD. 
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-white hover:shadow-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
              >
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M3 12h18" strokeLinecap="round"></path>
                  <path d="M12 3v18" strokeLinecap="round"></path>
                  <path d="M5 7.5h14" strokeLinecap="round" opacity="0.4"></path>
                  <path d="M5 16.5h14" strokeLinecap="round" opacity="0.4"></path>
                </svg>
                <span>{languages.find(l => l.code === currentLang)?.code}</span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors ${
                          currentLang === lang.code ? 'text-[#2E447A] font-bold bg-slate-50' : 'text-slate-600'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        {lang.code}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#2E447A] rounded-lg hover:bg-[#2E447A]/90 transition-all duration-300 shadow-lg shadow-[#2E447A]/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              {t.header.contact}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-3xl font-bold text-slate-900 hover:text-[#2E447A] transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-12 border-t border-slate-100"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M3 12h18" strokeLinecap="round"></path>
                    <path d="M12 3v18" strokeLinecap="round"></path>
                    <path d="M5 7.5h14" strokeLinecap="round" opacity="0.4"></path>
                    <path d="M5 16.5h14" strokeLinecap="round" opacity="0.4"></path>
                  </svg>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLang(lang.code)}
                      className={`px-4 py-2 rounded-full border transition-all ${
                        currentLang === lang.code
                          ? 'border-[#2E447A] text-[#2E447A] font-bold bg-blue-50'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      {lang.code}
                    </button>
                  ))}
                </div>
                
                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, '/#contact')}
                  className="w-full py-4 text-center text-lg font-bold text-white bg-[#2E447A] rounded-lg hover:bg-[#2E447A]/90 transition-all shadow-lg shadow-[#2E447A]/20"
                >
                  {t.header.contact}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

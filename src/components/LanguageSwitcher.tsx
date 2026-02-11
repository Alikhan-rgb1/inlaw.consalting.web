'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/translations';

export default function LanguageSwitcher() {
  const { language: currentLang, setLanguage: setCurrentLang } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages: { code: Language, label: string, flag: string }[] = [
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'RU', label: 'Russian', flag: '🇷🇺' },
    { code: 'CHI', label: 'Chinese', flag: '🇨🇳' },
  ];

  if (!mounted) {
    return null; // Or a loading skeleton to prevent hydration mismatch
  }

  return (
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
            className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1 z-50"
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
  );
}
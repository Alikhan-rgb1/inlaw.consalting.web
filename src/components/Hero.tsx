'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/1.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay for text readability - More transparent to show background */}
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-40 pb-20 md:pt-38"
      >
        <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-4 leading-[1.1]">
          {t.hero.title} <br />
          <span className="text-[#2E447A]">{t.hero.subtitle}</span>
        </motion.h1>
        
        <motion.p variants={item} className="text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed mb-6">
          {t.hero.description}
        </motion.p>
        
        {/* Sub-offer items - Horizontal list */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-slate-800 font-medium text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E447A]"></span>
            <span>{t.hero.aifc}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E447A]"></span>
            <span>{t.hero.dubai}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E447A]"></span>
            <span>{t.hero.bishkek}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E447A]"></span>
            <span>{t.hero.shanghai}</span>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col items-start gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#2E447A] text-white rounded-lg font-semibold hover:bg-[#2E447A]/90 transition-colors shadow-lg shadow-[#2E447A]/20 w-full sm:w-auto text-center cursor-pointer"
            >
              {t.hero.getConsultation}
            </Link>
            <Link 
              href="#services" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-[#2E447A] border border-[#2E447A]/20 rounded-lg font-semibold hover:bg-slate-50 transition-colors w-full sm:w-auto text-center cursor-pointer"
            >
              {t.hero.ourServices}
            </Link>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {t.hero.disclaimer}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

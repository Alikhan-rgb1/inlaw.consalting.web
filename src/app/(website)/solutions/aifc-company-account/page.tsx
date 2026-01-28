'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function AifcSolutionPage() {
  const { t } = useLanguage();
  const includedItems: string[] = t.solutionsPages.aifc.includedItems;
  const targetAudience: string[] = t.solutionsPages.aifc.targetAudience;
  const whyAifc: string[] = t.solutionsPages.aifc.whyJurisdictionItems;
  const whyInlaw: string[] = t.solutionsPages.aifc.whyInlawItems;
  const processSteps: { step: string; title: string; desc: string }[] = t.solutionsPages.aifc.processSteps;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#2E447A] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 mix-blend-multiply"></div>
          {/* Abstract Pattern */}
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform origin-bottom-right"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/#solutions" className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t.solutionsPages.common.backToSolutions}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {t.solutionsPages.aifc.title} <br />
              <span className="text-blue-200 text-3xl md:text-4xl font-normal block mt-4">
                {t.solutionsPages.aifc.subtitle}
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl leading-relaxed mb-10">
              {t.solutionsPages.aifc.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-indigo-900 bg-white rounded-xl hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-1"
              >
                {t.solutionsPages.common.getConsultation}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT IS THIS SOLUTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              {t.solutionsPages.aifc.aboutTitle}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              {t.solutionsPages.aifc.aboutDescription}
            </p>
            <p className="text-xl text-slate-900 font-medium leading-relaxed">
              {t.solutionsPages.aifc.aboutSubDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. WHAT IS INCLUDED */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            {t.solutionsPages.common.whatIsIncluded}
          </motion.h2>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {includedItems.map((item: string, index: number) => (
              <motion.div 
                key={index}
                variants={itemVariant}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. WHO IS THIS SOLUTION FOR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                {t.solutionsPages.common.whoIsFor}
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                {t.solutionsPages.aifc.idealForTitle}
              </p>
              <ul className="space-y-4">
                {targetAudience.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-4 text-lg text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-[#2E447A]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Image Placeholder or Abstract Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-3xl overflow-hidden"
            >
              <Image 
                src="/AIFC Company.jpg"
                alt="AIFC Company"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. WHY AIFC & 6. WHY INLAW */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Why AIFC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.solutionsPages.aifc.whyJurisdictionTitle}</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {t.solutionsPages.aifc.whyJurisdictionDescription}
              </p>
              <ul className="space-y-4">
                {whyAifc.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Why INLAW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#2E447A] rounded-3xl p-8 md:p-10 shadow-xl text-white"
            >
              <h2 className="text-3xl font-bold mb-6">{t.solutionsPages.common.whyInlaw}</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                {t.solutionsPages.aifc.whyInlawLead}
              </p>
              <ul className="space-y-4">
                {whyInlaw.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. HOW THE PROCESS WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center"
          >
            {t.solutionsPages.aifc.processTitle}
          </motion.h2>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step: { step: string; title: string; desc: string }, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Step Circle */}
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#2E447A] text-[#2E447A] font-bold text-lg flex items-center justify-center mb-6 relative z-10 mx-auto group-hover:bg-[#2E447A] group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{step.step}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. TIMELINE AND RESULT */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 text-center"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.solutionsPages.aifc.timeline.title}</h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-12">
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">⏱</span>
                <span className="text-slate-500 text-sm uppercase font-bold tracking-wider mb-1">{t.solutionsPages.aifc.timeline.registrationLabel}</span>
                <span className="text-2xl font-bold text-[#2E447A]">{t.solutionsPages.aifc.timeline.registrationValue}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">⏱</span>
                <span className="text-slate-500 text-sm uppercase font-bold tracking-wider mb-1">{t.solutionsPages.aifc.timeline.bankLabel}</span>
                <span className="text-2xl font-bold text-[#2E447A]">{t.solutionsPages.aifc.timeline.bankValue}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">{t.solutionsPages.aifc.timeline.resultTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.solutionsPages.aifc.timeline.resultItems.map((item: string, index: number) => (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 px-4 bg-white"
      >
        <div className="bg-gradient-to-r from-[#2E447A] to-indigo-900 rounded-3xl p-10 sm:p-16 text-white max-w-5xl mx-auto relative overflow-hidden shadow-2xl text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.solutionsPages.aifc.cta.title}</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              {t.solutionsPages.aifc.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-indigo-900 bg-white rounded-xl hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-1"
              >
                {t.solutionsPages.common.getConsultation}
              </Link>
              <Link 
                href="/#contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 transition-all"
              >
                {t.solutionsPages.aifc.cta.requestProposal}
              </Link>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
        </div>
      </motion.div>

    </div>
  );
}

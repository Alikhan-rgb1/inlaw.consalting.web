'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function HoldingKzUaeSolutionPage() {
  const { t } = useLanguage();
  const holding = t.solutionsPages.holding;
  const common = t.solutionsPages.common;

  const includedItems = holding.includedItems || [];

  const targetAudience = holding.targetAudience || [];

  const whyHolding = holding.whyJurisdictionItems || [];

  const whyInlaw = holding.whyInlawItems || [];

  const processSteps = holding.processSteps || [];

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
              {common.backToSolutions}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {holding.title} <br />
              <span className="text-blue-200 text-3xl md:text-4xl font-normal block mt-4">
                {holding.subtitle}
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl leading-relaxed mb-10">
              {holding.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-indigo-900 bg-white rounded-xl hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-1"
              >
                {common.getConsultation}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT THE SOLUTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              {holding.aboutTitle}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              {holding.aboutDescription}
            </p>
            <p className="text-xl text-slate-900 font-medium leading-relaxed">
              {holding.aboutSubDescription}
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
            {common.whatIsIncluded}
          </motion.h2>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {includedItems.map((item, index) => (
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {holding.whoIsForTitle}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {holding.whoIsForDesc}
              </p>
              <div className="space-y-4">
                {targetAudience.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-2 h-2 rounded-full bg-[#2E447A]"></div>
                    <span className="text-lg text-slate-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-full min-h-[400px] rounded-3xl overflow-hidden"
            >
              <Image 
                src="/Holding Structure KZ.jpg"
                alt="Holding Structure KZ"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. WHY HOLDING KZ – UAE */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{holding.whyJurisdictionTitle}</h2>
            <p className="text-lg text-slate-600">
              {holding.whyJurisdictionDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyHolding.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2E447A] flex items-center justify-center mb-6 group-hover:bg-[#2E447A] group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY INLAW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            {common.whyInlaw}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyInlaw.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div className="w-8 h-8 rounded-full bg-[#2E447A] flex items-center justify-center text-white shrink-0 font-bold text-sm">
                  ✓
                </div>
                <span className="text-lg text-slate-800 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCESS STEPS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center"
          >
            {holding.howProcessWorksTitle}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="absolute -top-4 -left-4 bg-[#2E447A] text-white py-1 px-4 rounded-lg font-bold shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TIMELINE AND RESULT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2E447A] rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">{holding.timeline?.title}</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      ⏱
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">{holding.timeline?.registrationLabel}</p>
                      <p className="text-xl font-bold">{holding.timeline?.registrationValue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      ⏱
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">{holding.timeline?.bankLabel}</p>
                      <p className="text-xl font-bold">{holding.timeline?.bankValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold mb-8">{holding.timeline?.resultTitle}</h2>
                <ul className="space-y-4">
                  {(holding.timeline?.resultItems || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white">
                        ✓
                      </div>
                      <span className="text-lg text-blue-50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 9. CTA SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              {holding.cta?.title}
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              {holding.cta?.subtitle}
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-[#2E447A] rounded-xl hover:bg-blue-900 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              {holding.cta?.button}
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

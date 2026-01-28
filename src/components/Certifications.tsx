'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Certifications = () => {
  const { t } = useLanguage();
  
  // Safe check if certifications exists in translations (it should after update)
  const certs = t.certifications || {
    title: 'Accreditations & Certifications',
    subtitle: 'Our expertise is confirmed by official certifications and regulatory accreditations'
  };

  return (
    <section className="py-24 bg-[#2E447A] relative overflow-hidden">
      {/* Decorative background elements similar to Stats/WhyUs but subtle */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {certs.title}
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {certs.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto items-center">
          {/* Certificate 1 (Vertical) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center group"
          >
            <div className="relative w-full max-w-lg aspect-[4/3] bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-[1.02]">
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-white shadow-inner">
                <Image
                  src="/certificate-1.jpg"
                  alt="Certificate 1"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </div>
          </motion.div>

          {/* Certificate 2 (Horizontal) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center group"
          >
            <div className="relative w-full max-w-lg aspect-[4/3] bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-[1.02]">
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-white shadow-inner">
                <Image
                  src="/certificate-2.png"
                  alt="Certificate 2"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

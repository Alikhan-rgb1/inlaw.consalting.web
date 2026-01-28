'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Process = () => {
  const { t, language } = useLanguage();
  const { items } = t.process;

  const steps = [
    {
      number: "01",
      title: items.analysis.title,
      description: items.analysis.description
    },
    {
      number: "02",
      title: items.structuring.title,
      description: items.structuring.description
    },
    {
      number: "03",
      title: items.registration.title,
      description: items.registration.description
    },
    {
      number: "04",
      title: items.support.title,
      description: items.support.description
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            {t.process.title}
          </h2>
          <p className="text-lg text-slate-600">
            {t.process.subtitle}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100"></div>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >

          {steps.map((step, index) => (
            <motion.div key={index} variants={item} className="relative group">
              {/* Number Circle */}
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#2E447A] text-[#2E447A] font-bold text-lg flex items-center justify-center mb-6 relative z-10 mx-auto transition-colors group-hover:bg-[#2E447A] group-hover:text-white">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {language === 'RU' ? `Шаг ${index + 1}` : language === 'CHI' ? `第 ${index + 1} 步` : `Step ${index + 1}`}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;

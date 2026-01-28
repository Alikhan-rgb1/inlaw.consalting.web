'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Solutions = () => {
  const { t } = useLanguage();
  const { items } = t.solutionsSection;

  const solutions = [
    {
      title: items.aifc.title,
      description: items.aifc.description,
      highlight: true,
      link: "/solutions/aifc-company-account"
    },
    {
      title: items.dubai.title,
      description: items.dubai.description,
      highlight: true,
      link: "/solutions/dubai-uae"
    },
    {
      title: items.holding.title,
      description: items.holding.description,
      highlight: false,
      link: "/solutions/holding-kz-uae"
    },
    {
      title: items.fintech.title,
      description: items.fintech.description,
      highlight: false,
      link: "/solutions/fintech-launch"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {t.solutionsSection.title}
          </h2>
          <p className="text-lg text-slate-600">
            {t.solutionsSection.subtitle}
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {solutions.map((solution, index) => (
            <motion.div 
              key={index}
              variants={itemVariant}
              className="relative group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#2E447A] transition-colors duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#2E447A] transition-colors">
                    {solution.title}
                  </h3>
                </div>
                
                <p className="text-slate-600 text-lg mb-8 flex-grow">
                  {solution.description}
                </p>

                {solution.link ? (
                  <Link href={solution.link} className="pt-6 border-t border-slate-100 flex items-center justify-between group/link">
                    <span className="text-sm font-semibold text-[#2E447A] group-hover/link:underline decoration-2 underline-offset-4">
                      {t.solutionsSection.learnMore}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/link:bg-[#2E447A] group-hover/link:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#2E447A] group-hover:underline decoration-2 underline-offset-4">
                      {t.solutionsSection.learnMore}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#2E447A] group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;

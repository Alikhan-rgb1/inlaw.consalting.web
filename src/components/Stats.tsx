'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Stats = () => {
  const { t } = useLanguage();
  const stats = [
    {
      value: "500+",
      label: t.stats.items.companies.label,
      description: t.stats.items.companies.description
    },
    {
      value: "50+",
      label: t.stats.items.licenses.label,
      description: t.stats.items.licenses.description
    },
    {
      value: "4",
      label: t.stats.items.jurisdictions.label,
      description: t.stats.items.jurisdictions.description
    },
    {
      value: "10+",
      label: t.stats.items.practice.label,
      description: t.stats.items.practice.description
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="stats" className="py-24 bg-[#2E447A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t.stats.title}
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {t.stats.subtitle}
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={item} className="p-6">
              <div className="text-5xl sm:text-6xl font-bold mb-4 text-white">
                {stat.value}
              </div>
              <div className="text-xl font-bold mb-2 text-blue-100">
                {stat.label}
              </div>
              {/* Optional description if we want to add more detail later */}
              {/* <div className="text-sm text-blue-200">{stat.description}</div> */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;

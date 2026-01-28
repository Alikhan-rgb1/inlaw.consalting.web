'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white border-t border-slate-200 py-16 mt-auto text-slate-600"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          {t.footer.locations && t.footer.locations.map((loc, index) => (
            <div key={index} className="flex flex-col space-y-3 text-left group">
              <h3 className="font-semibold text-slate-900 tracking-wide text-sm uppercase">{loc.city}</h3>
              <p className="text-xs leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors duration-300 min-h-[40px]">
                {loc.address}
              </p>
              <a 
                href={`tel:${loc.phone.replace(/\s+/g, '')}`} 
                className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors font-medium inline-block tracking-wide"
              >
                {loc.phone}
              </a>
            </div>
          ))}
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-start gap-6 text-xs">
          <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left text-slate-500">
             {t.footer.legal && (
                <>
                  <span className="font-bold text-slate-900 text-sm mb-1">{t.footer.legal.name}</span>
                  <span>{t.footer.legal.bin}</span>
                  <span>{t.footer.legal.license}</span>
                </>
             )}
          </div>

          <div className="text-slate-400 mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} Inlaw.web. {t.footer.rights}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

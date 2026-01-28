'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface LocationConfig {
  id: string;
  top: string;
  left: string;
  address?: string;
  phones?: string[];
  cardPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const locationConfig: LocationConfig[] = [
  {
    id: 'kz',
    top: '17.78%',
    left: '42.25%',
    address: '1 Heydar Aliyev St',
    phones: ['+77001466646', '+77001466601'],
    cardPosition: 'left'
  },
  {
    id: 'ala',
    top: '35.38%',
    left: '47.14%',
    address: '303 Baizakov St',
    phones: ['+77780008872 '],
    cardPosition: 'bottom'
  },
  {
    id: 'kg',
    top: '36.09%',
    left: '45.06%',
    address: '109/1 Turusbekov St, office 508',
    phones: ['+996999100588'],
    cardPosition: 'bottom'
  },
  {
    id: 'uae',
    top: '75%',
    left: '27%',
    address: 'IFZA Business Park - Building A2 - Nadd Hessa - Dubai Silicon Oasis - Dubai - UAE',
    phones: ['+971523524196'],
    cardPosition: 'top'
  },
  {
    id: 'cn',
    top: '62.5%',
    left: '88%',
    address: '上海市闵行区金丰路555弄9R 103 JinFeng RD 555. 9R. 103. Shanghai. China',
    phones: ['+8613918719943'],
    cardPosition: 'left'
  },
];

export default function Geography() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { t } = useLanguage();

  const getLocalizedLocation = (config: LocationConfig) => {
    const { cities, countries, serviceList } = t.geography;
    
    let title = '';
    let country = '';
    let services: string[] = [];

    switch (config.id) {
      case 'kz':
        title = cities.astana;
        country = countries.kazakhstan;
        services = [serviceList.aifc, serviceList.corporateServices, serviceList.legalAdvisory];
        break;
      case 'ala':
        title = cities.almaty;
        country = countries.kazakhstan;
        services = [serviceList.businessConsulting, serviceList.representativeOffice];
        break;
      case 'kg':
        title = cities.bishkek;
        country = countries.kyrgyzstan;
        services = [serviceList.companyRegistration, serviceList.bankingSupport, serviceList.taxOptimization];
        break;
      case 'uae':
        title = cities.dubai;
        country = countries.uae;
        services = [serviceList.companyRegistration, serviceList.bankingSupport, serviceList.licensing];
        break;
      case 'cn':
        title = cities.shanghai;
        country = countries.china;
        services = [serviceList.tradeStructure, serviceList.sourcing, serviceList.logisticsControl];
        break;
    }

    return {
      ...config,
      title,
      country,
      services,
    };
  };

  const locations = locationConfig.map(getLocalizedLocation);

  return (
    <section id="jurisdictions" className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center py-20">
      
      <div className="text-center mb-8 z-10 relative px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
        >
          {t.geography.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 max-w-2xl mx-auto text-lg"
        >
          {t.geography.subtitle}
        </motion.p>
      </div>

      {/* Map Container - Centered */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full overflow-hidden"
      >
        {/* Inner wrapper */}
        <div className="relative w-full aspect-[1000/500] min-h-[350px] max-w-[1400px] mx-auto scale-125 sm:scale-110 translate-y-4">
           {/* Map Image - Light Style */}
           <Image 
             src="/custom-map.svg"
             alt="Eurasia Map"
             fill
             className="object-cover object-[50%_35%]"
             priority
           />
           
           {/* Markers */}
           {locations.map((loc) => {
             const isMain = loc.id === 'kz';
             return (
             <div 
               key={loc.id}
               className="absolute z-20"
               style={{ top: loc.top, left: loc.left }}
               onMouseEnter={() => setHoveredId(loc.id)}
               onMouseLeave={() => setHoveredId(null)}
             >
               {/* Pulse Effect */}
               <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

               {/* Marker Visual */}
               <div className={`relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${isMain ? 'w-8 h-8' : 'w-4 h-4'}`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-20 bg-[#2E447A]`}></span>
                  <span className={`relative inline-flex rounded-full transition-all duration-300 ${isMain ? 'h-5 w-5' : 'h-2.5 w-2.5'} ${hoveredId === loc.id ? 'bg-[#1e3a8a]' : 'bg-[#2E447A]'}`}></span>
               </div>
               
               {/* Hover Card Conditional Positioning */}
               <div className={`
                 absolute z-50 w-72 
                 bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                 transition-all duration-300 ease-out
                 ${hoveredId === loc.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                 ${loc.cardPosition === 'left' ? 'right-full mr-4 top-1/2 -translate-y-1/2 origin-right' : ''}
                 ${loc.cardPosition === 'right' ? 'left-full ml-4 top-1/2 -translate-y-1/2 origin-left' : ''}
                 ${loc.cardPosition === 'top' ? 'left-1/2 -translate-x-1/2 bottom-full mb-4 origin-bottom' : ''}
                 ${loc.cardPosition === 'bottom' ? 'left-1/2 -translate-x-1/2 top-full mt-4 origin-top' : ''}
                 ${!loc.cardPosition ? 'left-1/2 -translate-x-1/2 bottom-full mb-4 origin-bottom' : ''}
               `}>
                 <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-none mb-1">{loc.title}</h3>
                      <span className="text-[10px] text-indigo-600 uppercase tracking-wider font-bold">{loc.country}</span>
                    </div>
                    {/* Flag or Icon placeholder could go here */}
                 </div>

                 {/* Services */}
                 <div className="mb-4">
                   <p className="text-[10px] uppercase text-slate-400 font-semibold mb-2 tracking-wide">{t.geography.servicesLabel}</p>
                   <ul className="space-y-1.5">
                     {loc.services.map((service, idx) => (
                       <li key={idx} className="text-xs text-slate-600 flex items-center gap-2 font-medium">
                         <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></span>
                         {service}
                       </li>
                     ))}
                   </ul>
                 </div>

                 {/* Contact Info */}
                 {(loc.address || loc.phones) && (
                   <div className="pt-3 border-t border-slate-100 space-y-3">
                     {loc.address && (
                       <div className="flex gap-2 items-start group/addr">
                         <svg className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0 group-hover/addr:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                         <p className="text-xs text-slate-500 leading-snug">{loc.address}</p>
                       </div>
                     )}
                     
                     {loc.phones && loc.phones.length > 0 && (
                       <div className="flex gap-2 items-start group/phone">
                         <svg className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0 group-hover/phone:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                         </svg>
                         <div className="flex flex-col gap-0.5">
                           {loc.phones.map((phone, idx) => (
                             <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-xs text-slate-600 hover:text-indigo-600 font-medium transition-colors block">
                               {phone}
                             </a>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
                 {/* Arrow */}
                 <div className={`
                   absolute w-0 h-0 border-[6px] border-transparent
                   ${loc.cardPosition === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-white/95' : ''}
                   ${loc.cardPosition === 'right' ? 'right-full top-1/2 -translate-y-1/2 border-r-white/95' : ''}
                   ${loc.cardPosition === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-white/95' : ''}
                   ${loc.cardPosition === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-white/95' : ''}
                   ${!loc.cardPosition ? 'top-full left-1/2 -translate-x-1/2 border-t-white/95' : ''}
                 `}></div>
               </div>
             </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

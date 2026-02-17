'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface LocationConfig {
  id: string;
  top: string;
  left: string;
  address?: string;
  phones?: string[];
  cardPosition?: 'top' | 'bottom' | 'left' | 'right' | 'left-up';
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const locationConfig: LocationConfig[] = [
  {
    id: 'kz',
    top: '17.78%',
    left: '42.25%',
    address: '1 Heydar Aliyev St',
    phones: ['+77001466646', '+77001466601'],
    cardPosition: 'left',
    labelPosition: 'top' // Changed to top to avoid overlap
  },
  {
    id: 'ala',
    top: '35.38%',
    left: '47.14%',
    address: '303 Baizakov St',
    phones: ['+77780008872 '],
    cardPosition: 'bottom',
    labelPosition: 'right'
  },
  {
    id: 'kg',
    top: '36.09%',
    left: '45.06%',
    address: '109/1 Turusbekov St, office 508',
    phones: ['+996999100588'],
    cardPosition: 'bottom',
    labelPosition: 'left'
  },
  {
    id: 'uae',
    top: '68.5%',
    left: '27.5%',
    address: 'IFZA Business Park - Building A2 - Nadd Hessa - Dubai Silicon Oasis - Dubai - UAE',
    phones: ['+971523524196'],
    cardPosition: 'top'
  },
  {
    id: 'cn',
    top: '60%',
    left: '88%',
    address: '上海市闵行区金丰路555弄9R 103 JinFeng RD 555. 9R. 103. Shanghai. China',
    phones: ['+8613918719943'],
    cardPosition: 'left-up',
    labelPosition: 'top'
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

  const getCardPositionClasses = (position?: string) => {
    switch (position) {
      case 'left': return 'right-full mr-4 top-1/2 -translate-y-1/2 origin-right left-auto bottom-auto';
      case 'left-up': return 'right-full mr-4 bottom-[-10px] origin-bottom-right left-auto top-auto';
      case 'right': return 'left-full ml-4 top-1/2 -translate-y-1/2 origin-left right-auto bottom-auto';
      case 'bottom': return 'left-1/2 -translate-x-1/2 top-full mt-4 origin-top bottom-auto';
      case 'top':
      default: return 'left-1/2 -translate-x-1/2 bottom-full mb-4 origin-bottom top-auto';
    }
  };

  const locations = locationConfig.map(getLocalizedLocation);
  const activeLocation = locations.find(l => l.id === hoveredId);

  return (
    <section id="jurisdictions" className="relative w-full bg-white overflow-hidden flex flex-col items-center justify-center pt-20 pb-0">
      
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
        className="relative w-full overflow-hidden flex justify-center items-center"
      >
        {/* Inner wrapper */}
        <div className="relative w-full aspect-[1000/605] max-w-[1400px] md:scale-110 mt-4 md:mt-10">
           {/* Map Image - Light Style */}
           <Image 
             src="/custom-map.svg"
             alt="Eurasia Map"
             fill
             className="object-contain"
             priority
           />
           
           {/* Markers */}
           {locations.map((loc) => {
             const isMain = loc.id === 'kz';
             const isSelected = hoveredId === loc.id;
             
             return (
             <div 
               key={loc.id}
               className={`absolute ${isSelected ? 'z-50' : 'z-20'}`}
               style={{ top: loc.top, left: loc.left }}
               onMouseEnter={() => {
                  if (window.matchMedia('(min-width: 768px)').matches) {
                    setHoveredId(loc.id);
                  }
               }}
               onMouseLeave={() => {
                  if (window.matchMedia('(min-width: 768px)').matches) {
                    setHoveredId(null);
                  }
               }}
               onClick={(e) => {
                 e.stopPropagation();
                 setHoveredId(isSelected ? null : loc.id);
               }}
             >
               {/* Pulse Effect */}
               <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 hidden md:block"></div>

               {/* Marker Visual */}
               <div className={`relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group w-6 h-6 md:w-8 md:h-8`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-20 bg-[#2E447A] ${isSelected ? 'opacity-40' : ''}`}></span>
                  <span className={`relative inline-flex rounded-full transition-all duration-300 h-4 w-4 md:h-5 md:w-5 ${isSelected ? 'bg-[#1e3a8a] scale-125' : 'bg-[#2E447A]'}`}></span>
                  
                  {/* Label with dynamic positioning */}
                   <div className={`
                     absolute whitespace-nowrap z-30 pointer-events-none transition-opacity duration-200
                     ${isSelected ? 'opacity-0' : 'opacity-100'}
                     ${loc.labelPosition === 'left' ? 'right-full mr-3 top-1/2 -translate-y-1/2' : ''}
                     ${loc.labelPosition === 'right' ? 'left-full ml-3 top-1/2 -translate-y-1/2' : ''}
                     ${loc.labelPosition === 'top' ? 'bottom-full mb-3 left-1/2 -translate-x-1/2' : ''}
                     ${!loc.labelPosition || loc.labelPosition === 'bottom' ? 'top-full mt-3 left-1/2 -translate-x-1/2' : ''}
                   `}>
                    <span className={`
                      text-xs md:text-sm font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-md border transition-all duration-300
                      ${isSelected 
                        ? 'bg-indigo-600 text-white border-indigo-500/50 shadow-indigo-500/20' 
                        : 'bg-white/90 text-slate-700 border-slate-200/50 hover:bg-white'}
                    `}>
                      {loc.title}
                    </span>
                    
                    {/* Connector Line for Side Labels */}
                    {(loc.labelPosition === 'left' || loc.labelPosition === 'right') && (
                      <span className={`
                        absolute top-1/2 -translate-y-1/2 w-3 h-[1px] bg-slate-300/50
                        ${loc.labelPosition === 'left' ? '-right-3' : '-left-3'}
                      `}></span>
                    )}
                  </div>
               </div>
               
               {/* Desktop Hover Card (Hidden on Mobile) */}
               <div className={`
                 hidden md:block absolute w-72 z-50
                 ${getCardPositionClasses(loc.cardPosition)}
                 bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                 transition-all duration-300 ease-out
                 ${isSelected ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 translate-y-4 invisible pointer-events-none'}
               `}>
                 <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-none mb-1">{loc.title}</h3>
                      <span className="text-[10px] text-indigo-600 uppercase tracking-wider font-bold">{loc.country}</span>
                    </div>
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
                
                {/* Dubai Portal Button */}
                {loc.id === 'uae' && (
                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <Link 
                      href="/dubai"
                      className="flex items-center justify-center w-full px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors gap-2 group/btn"
                    >
                      <span>Client Portal</span>
                      <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                )}

                {/* Arrow */}
                <div className={`
                  absolute w-0 h-0 border-[6px] border-transparent
                   ${loc.cardPosition === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-white/95' : ''}
                   ${loc.cardPosition === 'left-up' ? 'left-full bottom-[14px] border-l-white/95' : ''}
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

      {/* Cards Grid Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-50">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {loc.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                    {loc.country}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                   <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                </div>
              </div>

              {/* Services */}
              <div className="mb-6 flex-grow">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  {t.geography.servicesLabel}
                </p>
                <ul className="space-y-2">
                  {loc.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                      <span className="leading-snug">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-4 border-t border-slate-50 mt-auto">
                {loc.address && (
                  <div className="flex gap-3">
                    <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-sm text-slate-500 leading-snug">{loc.address}</p>
                  </div>
                )}
                
                {loc.phones && loc.phones.length > 0 && (
                  <div className="flex gap-3">
                    <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="flex flex-col gap-1">
                      {loc.phones.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dubai Button */}
                {loc.id === 'uae' && (
                  <Link 
                    href="/dubai"
                    className="flex items-center justify-center w-full px-4 py-2.5 mt-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors gap-2 group/btn"
                  >
                    <span>Client Portal</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {activeLocation && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHoveredId(null)}
            />
            
            {/* Sheet */}
            <motion.div
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] border-t border-slate-100 max-h-[80vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) setHoveredId(null);
              }}
            >
               <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
               
               <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">{activeLocation.title}</h3>
                    <span className="text-xs text-indigo-600 uppercase tracking-wider font-bold">{activeLocation.country}</span>
                  </div>
                  <button 
                    onClick={() => setHoveredId(null)}
                    className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
               </div>

               {/* Services */}
               <div className="mb-6">
                 <p className="text-xs uppercase text-slate-400 font-semibold mb-3 tracking-wide">{t.geography.servicesLabel}</p>
                 <ul className="grid grid-cols-1 gap-3">
                   {activeLocation.services.map((service, idx) => (
                     <li key={idx} className="text-sm text-slate-700 flex items-center gap-3 font-medium bg-slate-50 p-3 rounded-lg">
                       <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></span>
                       {service}
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Contact Info */}
               {(activeLocation.address || activeLocation.phones) && (
                 <div className="pt-6 border-t border-slate-100 space-y-4">
                   {activeLocation.address && (
                     <div className="flex gap-3 items-start">
                       <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Address</p>
                         <p className="text-sm text-slate-600 leading-snug">{activeLocation.address}</p>
                       </div>
                     </div>
                   )}
                   
                   {activeLocation.phones && activeLocation.phones.length > 0 && (
                     <div className="flex gap-3 items-start">
                       <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Phone</p>
                         <div className="flex flex-col gap-1">
                           {activeLocation.phones.map((phone, idx) => (
                             <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors block">
                               {phone}
                             </a>
                           ))}
                         </div>
                       </div>
                     </div>
                   )}

                  {/* Dubai Portal Button (Mobile) */}
                  {activeLocation.id === 'uae' && (
                    <div className="pt-4">
                      <Link 
                        href="/dubai"
                        className="flex items-center justify-center w-full px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all gap-2 shadow-lg shadow-indigo-500/30"
                      >
                        <span>Client Portal</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  )}

                 </div>
               )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

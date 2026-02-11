'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Team = () => {
  const { t } = useLanguage();
  const { members } = t.team;

  const kazakhstanTeam = [
    {
      name: members.berik.name,
      role: members.berik.role,
      description: members.berik.description,
      image: "/Berik.jpeg"
    },
    {
      name: members.birzhan.name,
      role: members.birzhan.role,
      description: members.birzhan.description,
      image: "/Birzhan.jpeg"
    },
    {
      name: members.marat.name,
      role: members.marat.role,
      description: members.marat.description,
      image: "/Marat.jpeg"
    },
    {
      name: members.salamat.name,
      role: members.salamat.role,
      description: members.salamat.description,
      image: "/Salamat_new.jpeg"
    },
    {
      name: members.gani.name,
      role: members.gani.role,
      description: members.gani.description,
      image: "/Gani.jpeg"
    },
    {
      name: members.alikhan.name,
      role: members.alikhan.role,
      description: members.alikhan.description,
      image: "/Alikhan.jpeg"
    },
    {
      name: members.azamat.name,
      role: members.azamat.role,
      description: members.azamat.description,
      image: "/Azamat.jpeg"
    }
  ];

  const internationalTeam = [
    {
      name: members.asel.name,
      role: members.asel.role,
      description: members.asel.description,
      image: "/Asel.jpeg"
    },
    {
      name: members.batyrlan.name,
      role: members.batyrlan.role,
      description: members.batyrlan.description,
      image: "/Batyrlan.jpeg"
    },
    {
      name: members.serik.name,
      role: members.serik.role,
      description: members.serik.description,
      image: "/Serik.jpeg"
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
    <section id="team" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            {t.team.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t.team.subtitle}
          </p>
        </motion.div>

        {/* Kazakhstan Team Section */}
        <div className="mb-20">
            <div className="flex items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 pr-4">{t.team.kazakhstan}</h3>
                <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {kazakhstanTeam.map((member, index) => (
                <motion.div key={index} variants={item} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
                {/* Photo Area */}
                <div className="w-full aspect-[4/5] bg-slate-200 relative overflow-hidden">
                    {member.image ? (
                    <Image 
                        src={member.image} 
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                        <span className="text-lg font-medium">Photo</span>
                    </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80"></div>
                    
                    {/* Name and Role overlay on image for modern look */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-1">
                        {member.name}
                        </h3>
                        <p className="text-blue-200 font-medium text-sm">
                        {member.role}
                        </p>
                    </div>
                </div>
                
                <div className="p-6">
                    <p className="text-slate-600 leading-relaxed text-sm">
                    {member.description}
                    </p>
                </div>
                </motion.div>
            ))}
            </motion.div>
        </div>

        {/* International Team Section */}
        <div>
            <div className="flex items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 pr-4">{t.team.international}</h3>
                <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {internationalTeam.map((member, index) => (
                <motion.div key={index} variants={item} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
                {/* Photo Area */}
                <div className="w-full aspect-[4/5] bg-slate-200 relative overflow-hidden">
                    {member.image ? (
                    <Image 
                        src={member.image} 
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                        <span className="text-lg font-medium">Photo</span>
                    </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80"></div>
                    
                    {/* Name and Role overlay on image for modern look */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-1">
                        {member.name}
                        </h3>
                        <p className="text-blue-200 font-medium text-sm">
                        {member.role}
                        </p>
                    </div>
                </div>
                
                <div className="p-6">
                    <p className="text-slate-600 leading-relaxed text-sm">
                    {member.description}
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

export default Team;

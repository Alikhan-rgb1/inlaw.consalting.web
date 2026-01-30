'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [shouldAnimate] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      return true;
    }
    return false;
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          url: window.location.href
        })
      });
      const json = await res.json();
      if (json.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', country: '', message: '' });
      } else {
        setStatus('error');
        alert('Error sending request');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      alert('Error sending request');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-white scroll-mt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto bg-slate-50 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              {t.contact.form.success}
            </h3>
            <button
              onClick={() => setStatus('idle')}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-[#2E447A] bg-white border border-[#2E447A]/20 rounded-lg hover:bg-slate-50 transition-all mt-4"
            >
              Send another message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-white scroll-mt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={shouldAnimate ? undefined : { opacity: 1, y: 0 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-slate-50 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg text-slate-600">
              {t.contact.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-[#2E447A] focus:ring-1 focus:ring-[#2E447A] outline-none transition-colors"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-[#2E447A] focus:ring-1 focus:ring-[#2E447A] outline-none transition-colors"
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.form.phone}
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-[#2E447A] focus:ring-1 focus:ring-[#2E447A] outline-none transition-colors"
                  placeholder={t.contact.form.phonePlaceholder}
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contact.form.country}
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-[#2E447A] focus:ring-1 focus:ring-[#2E447A] outline-none transition-colors"
                  placeholder={t.contact.form.countryPlaceholder}
                />
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-[#2E447A] focus:ring-1 focus:ring-[#2E447A] outline-none transition-colors resize-none"
                placeholder={t.contact.form.messagePlaceholder}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#2E447A] rounded-lg hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 w-full md:w-auto ${
                  status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  t.contact.form.submit
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

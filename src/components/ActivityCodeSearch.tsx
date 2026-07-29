'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { AIFC_ACTIVITY_CODES } from '@/data/aifcActivityCodes';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className: string;
  placeholder?: string;
}

export function ActivityCodeSearch({ value, onChange, className, placeholder }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      requestAnimationFrame(() => searchInputRef.current?.focus());
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AIFC_ACTIVITY_CODES.slice(0, 50);
    return AIFC_ACTIVITY_CODES.filter(
      (a) => a.code.includes(q) || a.name.toLowerCase().includes(q)
    ).slice(0, 50);
  }, [query]);

  const select = (code: string, name: string) => {
    onChange(`${code} - ${name}`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`${className} text-left flex items-center justify-between gap-2 truncate`}
      >
        <span className={value ? 'text-slate-900 truncate' : 'text-slate-400'}>
          {value || placeholder}
        </span>
        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40" onClick={() => setIsOpen(false)}>
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[75vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 outline-none text-sm text-slate-900"
              />
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {results.length === 0 ? (
                <p className="p-6 text-sm text-slate-500 text-center">Ничего не найдено</p>
              ) : (
                results.map((a) => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => select(a.code, a.name)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-indigo-50 border-b border-slate-100 last:border-0"
                  >
                    <span className="font-semibold text-slate-900">{a.code}</span>
                    <span className="text-slate-600"> — {a.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

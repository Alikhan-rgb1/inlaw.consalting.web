'use client';

export default function PrintButton() {
  return (
    <div className="flex justify-end mb-6 print:hidden">
      <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-[#2E447A] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-indigo-700"
      >
        Скачать / Распечатать документ
      </button>
    </div>
  );
}

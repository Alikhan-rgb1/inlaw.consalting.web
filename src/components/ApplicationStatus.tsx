'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ApplicationStatus({ application }: { application: any }) {
  const [status, setStatus] = useState(application.status);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/applications/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: application.id, status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      setStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
       {loading && <span className="text-xs text-slate-400">Updating...</span>}
       
       <button 
         onClick={() => handleStatusChange('In Progress')}
         disabled={loading}
         className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
           status === 'In Progress' 
             ? 'bg-orange-100 text-orange-800 border-orange-200 ring-2 ring-orange-500 ring-offset-1' 
             : 'bg-white text-slate-600 border-slate-200 hover:bg-orange-50 hover:text-orange-700'
         }`}
       >
         В рассмотрении
       </button>

       <button 
         onClick={() => handleStatusChange('Done')}
         disabled={loading}
         className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
           status === 'Done' 
             ? 'bg-green-100 text-green-800 border-green-200 ring-2 ring-green-500 ring-offset-1' 
             : 'bg-white text-slate-600 border-slate-200 hover:bg-green-50 hover:text-green-700'
         }`}
       >
         Одобрено
       </button>

       <button 
         onClick={() => handleStatusChange('Rejected')}
         disabled={loading}
         className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
           status === 'Rejected' 
             ? 'bg-red-100 text-red-800 border-red-200 ring-2 ring-red-500 ring-offset-1' 
             : 'bg-white text-slate-600 border-slate-200 hover:bg-red-50 hover:text-red-700'
         }`}
       >
         Отклонено
       </button>
    </div>
  );
}
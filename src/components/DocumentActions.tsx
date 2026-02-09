'use client';

import { getSignedUrl, updateDocumentStatus } from "@/app/actions";
import { useState } from "react";

export function DocumentActions({ doc }: { doc: any }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(doc.status);

  const handleDownload = async () => {
    setLoading(true);
    const { url, error } = await getSignedUrl(doc.file_path);
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Error downloading file: ' + error);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (newStatus: string) => {
      setLoading(true);
      const { success, error } = await updateDocumentStatus(doc.id, newStatus);
      if (success) {
          setStatus(newStatus);
      } else {
          alert('Error updating status: ' + error);
      }
      setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
      {/* Status Badge */}
      <span className={`self-start sm:self-auto px-2 py-1 rounded text-xs font-medium ${
          status === 'Approved' ? 'bg-green-100 text-green-800' :
          status === 'Rejected' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
      }`}>
          {status}
      </span>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {status !== 'Approved' && (
              <button 
                  onClick={() => handleStatusUpdate('Approved')}
                  disabled={loading}
                  className="flex-1 sm:flex-none justify-center px-3 py-1.5 border border-green-200 rounded text-green-700 hover:bg-green-50 text-xs font-medium disabled:opacity-50 transition-colors"
              >
                  Approve
              </button>
          )}
          {status !== 'Rejected' && (
              <button 
                  onClick={() => handleStatusUpdate('Rejected')}
                  disabled={loading}
                  className="flex-1 sm:flex-none justify-center px-3 py-1.5 border border-red-200 rounded text-red-700 hover:bg-red-50 text-xs font-medium disabled:opacity-50 transition-colors"
              >
                  Reject
              </button>
          )}
          <div className="hidden sm:block h-4 w-px bg-slate-300 mx-1"></div>
          <button 
              onClick={handleDownload}
              disabled={loading}
              className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-1.5 border border-indigo-200 rounded text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-medium disabled:opacity-50 transition-colors"
          >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {loading ? '...' : 'Download'}
          </button>
      </div>
    </div>
  );
}

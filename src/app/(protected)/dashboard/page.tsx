'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const REQUIRED_DOCS = [
  { id: 'passport', label: 'Passport Copy' },
  { id: 'company_docs', label: 'Company Documents' },
  { id: 'proof_address', label: 'Proof of Address' },
  { id: 'other', label: 'Other Files' },
];

interface Document {
  id: string;
  file_name: string;
  file_path: string;
  doc_type: string;
  status: string;
  created_at: string;
}

interface UserProfile {
  full_name: string;
  company_name: string;
  email: string;
  case_status: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    if (!session?.user?.email) return;

    try {
      const res = await fetch('/api/documents');
      const data = await res.json();

      if (data.profile) {
        setProfile(data.profile);
      }
      
      if (data.documents) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  const handleUpload = async (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(docId);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docId', docId);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setMessage({ type: 'success', text: `Successfully uploaded ${file.name}` });
      fetchData(); // Refresh list
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || "Upload failed" });
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (docId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    setDeleting(docId);
    setMessage(null);

    try {
      const res = await fetch('/api/delete-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId, filePath }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Delete failed');
      }

      setMessage({ type: 'success', text: 'Document deleted successfully' });
      fetchData(); // Refresh list
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || "Delete failed" });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Welcome Section */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-[#2E447A] px-6 py-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Welcome, {profile?.full_name || session?.user?.name}
            </h3>
            <p className="mt-1 text-indigo-200 text-lg">
              {profile?.company_name || 'Client Portal'}
            </p>
          </div>
          <div className="flex flex-col items-end">
             <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
               profile?.case_status === 'Done' ? 'bg-green-500 text-white' :
               profile?.case_status === 'In progress' ? 'bg-yellow-500 text-white' :
               'bg-indigo-500 text-white'
             }`}>
               {profile?.case_status || 'New'}
             </span>
             <p className="text-xs text-indigo-200 mt-2 uppercase tracking-wider font-semibold">Case Status</p>
          </div>
        </div>
        <div className="px-6 py-6 sm:px-8">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col">
              <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email address</dt>
              <dd className="text-base font-medium text-slate-800">{session?.user?.email}</dd>
            </div>
            <div className="flex flex-col">
               <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Step</dt>
               <dd className="text-base font-medium text-slate-800 flex items-center gap-2">
                 <span className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                 </span>
                 Your registration is being reviewed by Dubai office.
               </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Upload Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Documents
                </h3>
            </div>
            <div className="p-6 flex-grow">
                {message && (
                  <div className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
                    message.type === 'success' 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}>
                    {message.type === 'success' ? (
                      <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium">{message.text}</span>
                  </div>
                )}
                
                <div className="space-y-4">
                  {REQUIRED_DOCS.map((doc) => (
                    <div key={doc.id} className="group border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all duration-200 bg-white">
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{doc.label}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Required document</p>
                        </div>
                        <div>
                          <label 
                            htmlFor={`file-${doc.id}`}
                            className={`
                              cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-xs font-bold rounded-lg shadow-sm text-white transition-all
                              ${uploading === doc.id 
                                ? 'bg-slate-400 cursor-not-allowed' 
                                : 'bg-[#2E447A] hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95'}
                            `}
                          >
                            {uploading === doc.id ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading
                              </span>
                            ) : 'Upload'}
                          </label>
                          <input 
                            id={`file-${doc.id}`}
                            type="file" 
                            className="hidden" 
                            onChange={(e) => handleUpload(doc.id, e)}
                            disabled={uploading !== null}
                          />
                        </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>

        {/* 3. Files List */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Uploaded Files
                </h3>
            </div>
            <div className="p-0 flex-grow bg-white">
                {documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-medium text-slate-900">No files uploaded</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Upload documents from the panel on the left to see them here.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {documents.map((doc) => (
                            <li key={doc.id} className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 truncate max-w-[150px] sm:max-w-[200px]">{doc.file_name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                            {REQUIRED_DOCS.find(d => d.id === doc.doc_type)?.label || doc.doc_type}
                                          </span>
                                          <span className="text-xs text-slate-400">•</span>
                                          <span className="text-xs text-slate-400">{new Date(doc.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                      doc.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                      doc.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                      'bg-blue-50 text-blue-700 border-blue-200'
                                    }`}>
                                        {doc.status}
                                    </span>
                                    
                                    {doc.status !== 'Approved' && (
                                        <button 
                                            onClick={() => handleDelete(doc.id, doc.file_path)}
                                            disabled={deleting === doc.id}
                                            className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                                            title="Delete file"
                                        >
                                            {deleting === doc.id ? (
                                                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

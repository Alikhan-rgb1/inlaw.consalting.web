'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSignedUrl } from '@/app/actions';

interface ResultDoc {
  id: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

export function AdminApplicationResults({
  userId,
  applicationId,
  documents,
}: {
  userId: string;
  applicationId: string;
  documents: ResultDoc[];
}) {
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [uploading, setUploading] = useState(false);
  const [busyDocId, setBusyDocId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      formData.append('applicationId', applicationId);
      formData.append('label', label);

      const res = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setLabel('');
      e.target.value = '';
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (filePath: string) => {
    const { url, error } = await getSignedUrl(filePath);
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Error downloading file: ' + error);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm('Удалить этот документ?')) return;
    setBusyDocId(docId);
    try {
      const res = await fetch('/api/admin/documents/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    } finally {
      setBusyDocId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <h4 className="text-sm font-bold text-slate-900 mb-3">Документы от INLAW по этой заявке</h4>

      {documents.length === 0 ? (
        <p className="text-sm text-slate-500 italic mb-4">Пока ничего не загружено.</p>
      ) : (
        <ul className="divide-y divide-slate-100 mb-4">
          {documents.map((doc) => (
            <li key={doc.id} className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{doc.file_name}</p>
                <p className="text-xs text-slate-500">{new Date(doc.created_at).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDownload(doc.file_path)}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Скачать
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(doc.id)}
                  disabled={busyDocId === doc.id}
                  className="text-xs font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Название документа (напр. Свидетельство о регистрации)"
          className="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
        />
        <label
          className={`shrink-0 cursor-pointer inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-lg shadow-sm text-white transition-all ${
            uploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#2E447A] hover:bg-indigo-700'
          }`}
        >
          {uploading ? 'Загрузка...' : 'Прикрепить файл'}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
    </div>
  );
}

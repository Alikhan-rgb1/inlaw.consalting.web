'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { AstanaApplicationSummary } from '@/components/AstanaApplicationSummary';
import { PostRegistrationSummary } from '@/components/PostRegistrationSummary';
import { getSignedUrl } from '@/app/actions';

interface UserProfile {
  full_name: string;
  company_name: string;
  email: string;
  case_status: string;
}

interface Document {
  id: string;
  file_name: string;
  file_path: string;
  doc_type: string;
  created_at: string;
  application_id?: string;
  uploaded_by?: string;
}

export default function AstanaDashboardPage() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [viewingApp, setViewingApp] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const translations = {
    EN: {
      welcome: 'Welcome',
      clientPortal: 'AIFC Client Portal',
      dashboardTitle: 'Overview',
      statTotal: 'Total applications',
      statNew: 'New',
      statInProgress: 'In review',
      statDone: 'Approved',
      statRejected: 'Rejected',
      chooseAnketa: 'Choose an application form',
      anketaAifcTitle: 'AIFC Company Registration',
      anketaAifcDesc: 'Full company registration application for the Astana International Financial Centre (AFSA).',
      startApplication: 'Start / continue',
      anketaPostRegTitle: 'Post-Registration Changes',
      anketaPostRegDesc: 'Report changes to an already registered AIFC company — director, address, UBO, share capital, and more.',
      myApplications: 'My Applications',
      noApplications: 'No applications yet — choose a form above to get started.',
      formTitleAifc: 'AIFC Company Registration',
      formTitlePostReg: 'Post-Registration Changes',
      signingDocLink: 'Signing document',
      applicationDetails: 'Application Details',
      resultDocsTitle: 'Documents from INLAW',
      noResultDocs: 'Nothing here yet.',
      download: 'Download',
      edit: 'Edit',
      delete: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this application?',
      downloadSigningDoc: 'Download document for signing',
      statusNew: 'New',
      statusInProgress: 'In Progress',
      statusDone: 'Done',
      statusRejected: 'Rejected',
    },
    RU: {
      welcome: 'Добро пожаловать',
      clientPortal: 'Клиентский портал AIFC',
      dashboardTitle: 'Обзор',
      statTotal: 'Всего заявок',
      statNew: 'Новые',
      statInProgress: 'В рассмотрении',
      statDone: 'Одобрено',
      statRejected: 'Отклонено',
      chooseAnketa: 'Выберите анкету',
      anketaAifcTitle: 'Регистрация компании в AIFC',
      anketaAifcDesc: 'Полная анкета для регистрации компании в Международном финансовом центре «Астана» (AFSA).',
      startApplication: 'Начать / продолжить',
      anketaPostRegTitle: 'Пострегистрационные изменения',
      anketaPostRegDesc: 'Сообщите об изменениях в уже зарегистрированной компании AIFC — директор, адрес, UBO, уставный капитал и другое.',
      myApplications: 'Мои заявки',
      noApplications: 'Пока нет заявок — выберите анкету выше, чтобы начать.',
      formTitleAifc: 'Регистрация компании в AIFC',
      formTitlePostReg: 'Пострегистрационные изменения',
      signingDocLink: 'Документ для подписания',
      applicationDetails: 'Данные заявки',
      resultDocsTitle: 'Документы от INLAW',
      noResultDocs: 'Пока ничего нет.',
      download: 'Скачать',
      edit: 'Редактировать',
      delete: 'Удалить',
      deleteConfirm: 'Вы уверены, что хотите удалить эту заявку?',
      downloadSigningDoc: 'Скачать документ для подписания',
      statusNew: 'Новый',
      statusInProgress: 'В рассмотрении',
      statusDone: 'Одобрено',
      statusRejected: 'Отклонено',
    },
    CHI: {
      welcome: '欢迎',
      clientPortal: 'AIFC 客户门户',
      dashboardTitle: '概览',
      statTotal: '申请总数',
      statNew: '新申请',
      statInProgress: '审核中',
      statDone: '已批准',
      statRejected: '已拒绝',
      chooseAnketa: '选择申请表',
      anketaAifcTitle: 'AIFC 公司注册',
      anketaAifcDesc: '阿斯塔纳国际金融中心 (AFSA) 完整公司注册申请表。',
      startApplication: '开始 / 继续',
      anketaPostRegTitle: '注册后变更',
      anketaPostRegDesc: '报告已注册 AIFC 公司的变更 — 董事、地址、UBO、注册股本等。',
      myApplications: '我的申请',
      noApplications: '暂无申请 — 请选择上方的申请表开始。',
      formTitleAifc: 'AIFC 公司注册',
      formTitlePostReg: '注册后变更',
      signingDocLink: '签署文件',
      applicationDetails: '申请详情',
      resultDocsTitle: '来自INLAW的文件',
      noResultDocs: '暂无内容。',
      download: '下载',
      edit: '编辑',
      delete: '删除',
      deleteConfirm: '您确定要删除此申请吗？',
      downloadSigningDoc: '下载签署文件',
      statusNew: '新',
      statusInProgress: '进行中',
      statusDone: '完成',
      statusRejected: '已拒绝',
    }
  };

  const t = translations[language] || translations.EN;

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const fetchData = async () => {
    if (!session?.user?.email) return;

    try {
      const res = await fetch('/api/astana/documents');
      const data = await res.json();

      if (data.profile) setProfile(data.profile);
      if (data.documents) setDocuments(data.documents);
      if (data.applications) setApplications(data.applications);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  const handleDeleteApplication = async (appId: string) => {
    if (!confirm(t.deleteConfirm)) return;

    setDeleting(true);
    try {
        const res = await fetch(`/api/astana/applications?id=${appId}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error('Failed to delete');

        setViewingApp(null);
        fetchData();
    } catch (err) {
        console.error(err);
    } finally {
        setDeleting(false);
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'New': return t.statusNew;
      case 'In Progress': return t.statusInProgress;
      case 'Done': return t.statusDone;
      case 'Rejected': return t.statusRejected;
      default: return status;
    }
  };

  const appTitle = (app: any) => (app.application_type === 'post_registration_change' ? t.formTitlePostReg : t.formTitleAifc);
  const appEditHref = (app: any) => (app.application_type === 'post_registration_change'
    ? `/astana/application/post-registration?edit=${app.id}`
    : `/astana/application/aifc?edit=${app.id}`);

  const counts = {
    total: applications.length,
    new: applications.filter(a => a.status === 'New' || !a.status).length,
    inProgress: applications.filter(a => a.status === 'In Progress').length,
    done: applications.filter(a => a.status === 'Done').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
  };

  const statTiles = [
    {
      key: 'total',
      label: t.statTotal,
      value: counts.total,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
      iconBg: 'bg-slate-100 text-slate-600',
      valueColor: 'text-slate-900',
    },
    {
      key: 'inProgress',
      label: t.statInProgress,
      value: counts.inProgress,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-orange-100 text-orange-600',
      valueColor: 'text-orange-600',
    },
    {
      key: 'done',
      label: t.statDone,
      value: counts.done,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-green-100 text-green-600',
      valueColor: 'text-green-600',
    },
    {
      key: 'rejected',
      label: t.statRejected,
      value: counts.rejected,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-red-100 text-red-600',
      valueColor: 'text-red-600',
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <>
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-[#2E447A] px-6 py-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {t.welcome}, {profile?.full_name || session?.user?.name}
            </h3>
            <p className="mt-1 text-indigo-200 text-lg">
              {profile?.company_name || t.clientPortal}
            </p>
          </div>
        </div>
      </div>

      {/* Analytics / Stat tiles */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t.dashboardTitle}</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statTiles.map((tile) => (
            <div key={tile.key} className="bg-white rounded-xl shadow-lg border border-slate-100 p-5 flex items-center gap-4">
              <div className={`shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${tile.iconBg}`}>
                {tile.icon}
              </div>
              <div className="min-w-0">
                <p className={`text-2xl font-bold leading-tight ${tile.valueColor}`}>{tile.value}</p>
                <p className="text-xs font-medium text-slate-500 truncate">{tile.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anketa chooser */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t.chooseAnketa}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/astana/application/aifc"
            className="group bg-white rounded-xl shadow-lg border border-slate-100 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-xl transition-all duration-200"
          >
            <div>
              <div className="h-11 w-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h5 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{t.anketaAifcTitle}</h5>
              <p className="mt-1 text-sm text-slate-500">{t.anketaAifcDesc}</p>
            </div>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-indigo-600 group-hover:text-indigo-800">
              {t.startApplication}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>

          <Link
            href="/astana/application/post-registration"
            className="group bg-white rounded-xl shadow-lg border border-slate-100 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-xl transition-all duration-200"
          >
            <div>
              <div className="h-11 w-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h5 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{t.anketaPostRegTitle}</h5>
              <p className="mt-1 text-sm text-slate-500">{t.anketaPostRegDesc}</p>
            </div>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-indigo-600 group-hover:text-indigo-800">
              {t.startApplication}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* My Applications */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">{t.myApplications}</h3>
        </div>
        <div className="p-6">
          {applications.length > 0 ? (
            <div className="space-y-3">
              {applications.map(app => (
                <div
                  key={app.id}
                  onClick={() => setViewingApp(app)}
                  className="bg-slate-50/50 rounded-lg p-3 border border-slate-100 flex justify-between items-center cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/40 transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {appTitle(app)}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      app.status === 'Done' ? 'bg-green-100 text-green-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      <span className={`h-2 w-2 rounded-full ${
                        app.status === 'Done' ? 'bg-green-500' :
                        app.status === 'Rejected' ? 'bg-red-500' :
                        'bg-orange-500'
                      }`}></span>
                      {statusLabel(app.status)}
                    </span>
                    {app.application_type !== 'post_registration_change' && (
                      <Link
                        href={`/astana/print/${app.id}`}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
                      >
                        {t.signingDocLink}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">{t.noApplications}</p>
          )}
        </div>
      </div>
    </div>

    {viewingApp && (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 px-4 bg-black/40" onClick={() => setViewingApp(null)}>
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{t.applicationDetails}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{new Date(viewingApp.created_at).toLocaleDateString()}</p>
            </div>
            <button type="button" onClick={() => setViewingApp(null)} className="text-slate-400 hover:text-slate-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-5 overflow-y-auto flex-1">
            {viewingApp.application_type === 'post_registration_change' ? (
              <PostRegistrationSummary formData={viewingApp.form_data} />
            ) : (
              <AstanaApplicationSummary formData={viewingApp.form_data} />
            )}

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">{t.resultDocsTitle}</h4>
              {(() => {
                const resultDocs = documents.filter(
                  (d) => d.application_id === viewingApp.id && d.uploaded_by === 'admin'
                );
                if (resultDocs.length === 0) {
                  return <p className="text-sm text-slate-500 italic">{t.noResultDocs}</p>;
                }
                return (
                  <ul className="divide-y divide-slate-100">
                    {resultDocs.map((doc) => (
                      <li key={doc.id} className="py-2 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{doc.file_name}</p>
                          <p className="text-xs text-slate-500">{new Date(doc.created_at).toLocaleString()}</p>
                        </div>
                        <button
                          type="button"
                          onClick={async () => {
                            const { url, error } = await getSignedUrl(doc.file_path);
                            if (url) window.open(url, '_blank');
                            else alert(error);
                          }}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 shrink-0"
                        >
                          {t.download}
                        </button>
                      </li>
                    ))}
                  </ul>
                );
              })()}
            </div>
          </div>
          <div className="p-5 border-t border-slate-200 flex flex-wrap gap-3 justify-end">
            <button
              type="button"
              onClick={() => handleDeleteApplication(viewingApp.id)}
              disabled={deleting}
              className="px-4 py-2 text-sm font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50"
            >
              {t.delete}
            </button>
            <Link
              href={appEditHref(viewingApp)}
              className="px-4 py-2 text-sm font-bold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              {t.edit}
            </Link>
            {viewingApp.application_type !== 'post_registration_change' && (
              <Link
                href={`/astana/print/${viewingApp.id}`}
                target="_blank"
                className="px-4 py-2 text-sm font-bold text-white bg-[#2E447A] rounded-lg hover:bg-indigo-700 inline-flex items-center"
              >
                {t.downloadSigningDoc}
              </Link>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}

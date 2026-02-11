'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface UserProfile {
  full_name: string;
  company_name: string;
  email: string;
  case_status: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  interface Document {
    id: string;
    file_name: string;
    doc_type: string;
    created_at: string;
  }

  const [documents, setDocuments] = useState<Document[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const translations = {
    EN: {
      welcome: 'Welcome',
      clientPortal: 'Client Portal',
      caseStatus: 'Case Status',
      new: 'New',
      done: 'Done',
      inProgress: 'In progress',
      email: 'Email address',
      currentStep: 'My Applications',
      stepDesc: 'No active applications',
      stepDescActive: 'Your registration is being reviewed by Dubai office.',
      formTitle: 'IFZA COMPANY REGISTRATION FORM',
      generalInfo: '1. GENERAL APPLICATION INFORMATION',
      activities: 'Business Activities',
      countries: 'Countries of Activity',
      companyNames: '2. COMPANY NAME OPTIONS (In order of priority)',
      structure: '3. COMPANY STRUCTURE',
      shareholders: 'No. of Shareholders',
      visas: 'No. of Visas',
      personData: '4. EMPLOYEE / AUTHORIZED PERSON DETAILS',
      fullName: 'Full Name (as in passport)',
      position: 'Position',
      passport: 'Passport (Series, Number)',
      contactNumber: 'Contact Number',
      country: 'Country',
      address: 'Residential Address',
      uaeVisit: 'Have you visited UAE before (Yes/No)',
      docsChecklist: 'REQUIRED DOCUMENTS (CHECKLIST)',
      passportCopy: 'Passport Copy',
      passportCopyDesc: 'Colored scanned copy',
      passportCover: 'Passport Cover Photo',
      passportCoverDesc: 'Side with emblem and country name',
      whitePhoto: 'Photo on white background',
      whitePhotoDesc: 'Digital',
      visaCopy: 'Copy of last UAE visa or entry stamp',
      visaCopyDesc: 'If applicable',
      uploadTitle: 'Upload Documents',
      uploadFile: 'Upload file',
      uploading: 'Uploading...',
      upload: 'Upload',
      uploadedFiles: 'Uploaded Files',
      noFiles: 'No files uploaded',
      noFilesDesc: 'Upload documents from the panel on the left to see them here.',
      deleteConfirm: 'Are you sure you want to delete this document?',
      successUpload: 'Successfully uploaded',
      failUpload: 'Upload failed',
      successDelete: 'Document deleted successfully',
      failDelete: 'Delete failed',
      submitApplication: 'Submit Application',
      submitting: 'Submitting...',
      applicationSubmitted: 'Application submitted successfully!',
      applicationError: 'Error submitting application'
    },
    RU: {
      welcome: 'Добро пожаловать',
      clientPortal: 'Клиентский портал',
      caseStatus: 'Статус дела',
      new: 'Новый',
      done: 'Готово',
      inProgress: 'В процессе',
      email: 'Email адрес',
      currentStep: 'Мои заявки',
      stepDesc: 'Нет активных заявок',
      stepDescActive: 'Ваша заявка рассматривается офисом в Дубае.',
      formTitle: 'АНКЕТА ДЛЯ РЕГИСТРАЦИИ КОМПАНИИ В IFZA',
      generalInfo: '1. ОБЩАЯ ИНФОРМАЦИЯ О ЗАЯВКЕ',
      activities: 'Виды деятельности',
      countries: 'Страны деятельности',
      companyNames: '2. ВАРИАНТЫ НАЗВАНИЯ КОМПАНИИ (В порядке приоритета)',
      structure: '3. СТРУКТУРА КОМПАНИИ',
      shareholders: 'Кол-во акционеров',
      visas: 'Кол-во сотрудников для визы',
      personData: '4. ДАННЫЕ СОТРУДНИКА / УПОЛНОМОЧЕННОГО ЛИЦА',
      fullName: 'ФИО (как в паспорте)',
      position: 'Должность',
      passport: 'Паспорт (серия, номер)',
      contactNumber: 'Контактный номер',
      country: 'Страна',
      address: 'Адрес проживания',
      uaeVisit: 'Были ли ранее в ОАЭ (Да/Нет)',
      docsChecklist: 'НЕОБХОДИМЫЕ ДОКУМЕНТЫ (ЧЕК-ЛИСТ)',
      passportCopy: 'Копия загранпаспорта',
      passportCopyDesc: 'Цветная сканированная копия',
      passportCover: 'Фото корочки загранпаспорта',
      passportCoverDesc: 'Сторона, где герб и название страны',
      whitePhoto: 'Фото на белом фоне',
      whitePhotoDesc: 'Цифровое',
      visaCopy: 'Копия последней визы в ОАЭ или штампа о въезде',
      visaCopyDesc: 'Если применимо',
      uploadTitle: 'Загрузка документов',
      uploadFile: 'Загрузить файл',
      uploading: 'Загрузка...',
      upload: 'Загрузить',
      uploadedFiles: 'Загруженные файлы',
      noFiles: 'Нет загруженных файлов',
      noFilesDesc: 'Загрузите документы из панели слева, чтобы увидеть их здесь.',
      deleteConfirm: 'Вы уверены, что хотите удалить этот документ?',
      successUpload: 'Успешно загружено',
      failUpload: 'Ошибка загрузки',
      successDelete: 'Документ успешно удален',
      failDelete: 'Ошибка удаления',
      docLabels: {
        passport: 'Копия паспорта',
        company_docs: 'Документы компании',
        proof_address: 'Подтверждение адреса',
        other: 'Другие файлы'
      },
      submitApplication: 'Отправить заявку',
      submitting: 'Отправка...',
      applicationSubmitted: 'Заявка успешно отправлена!',
      applicationError: 'Ошибка при отправке заявки'
    },
    CHI: {
      welcome: '欢迎',
      clientPortal: '客户门户',
      caseStatus: '案件状态',
      new: '新',
      done: '完成',
      inProgress: '进行中',
      email: '电子邮件地址',
      currentStep: '我的申请',
      stepDesc: '没有有效的申请',
      stepDescActive: '迪拜办事处正在审核您的注册。',
      formTitle: 'IFZA 公司注册申请表',
      generalInfo: '1. 申请一般信息',
      activities: '业务活动',
      countries: '活动国家',
      companyNames: '2. 公司名称选项（按优先级排序）',
      structure: '3. 公司结构',
      shareholders: '股东人数',
      visas: '签证人数',
      personData: '4. 员工/授权人详细信息',
      fullName: '全名（与护照一致）',
      position: '职位',
      passport: '护照（系列，号码）',
      contactNumber: '联系电话',
      country: '国家',
      address: '居住地址',
      uaeVisit: '是否曾访问过阿联酋（是/否）',
      docsChecklist: '所需文件（清单）',
      passportCopy: '护照复印件',
      passportCopyDesc: '彩色扫描件',
      passportCover: '护照封面照片',
      passportCoverDesc: '带有国徽和国名的一面',
      whitePhoto: '白底照片',
      whitePhotoDesc: '数字版',
      visaCopy: '最后一次阿联酋签证或入境章复印件',
      visaCopyDesc: '如适用',
      uploadTitle: '上传文件',
      uploadFile: '上传文件',
      uploading: '上传中...',
      upload: '上传',
      uploadedFiles: '已上传文件',
      noFiles: '未上传文件',
      noFilesDesc: '从左侧面板上传文件以在此处查看。',
      deleteConfirm: '您确定要删除此文档吗？',
      successUpload: '上传成功',
      failUpload: '上传失败',
      successDelete: '文档删除成功',
      failDelete: '删除失败',
      docLabels: {
        passport: '护照复印件',
        company_docs: '公司文件',
        proof_address: '地址证明',
        other: '其他文件'
      },
      submitApplication: '提交申请',
      submitting: '提交中...',
      applicationSubmitted: '申请提交成功！',
      applicationError: '提交申请时出错'
    }
  };

  const t = translations[language] || translations.EN;

  const REQUIRED_DOCS = [
    { id: 'passport', label: t.passportCopy, desc: t.passportCopyDesc },
    { id: 'passport_cover', label: t.passportCover, desc: t.passportCoverDesc }, 
    { id: 'photo_white', label: t.whitePhoto, desc: t.whitePhotoDesc },
    { id: 'visa_copy', label: t.visaCopy, desc: t.visaCopyDesc },
  ];

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

      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleDeleteApplication = async (appId: string) => {
      if (!confirm('Are you sure you want to delete this application?')) return;
      
      try {
          const res = await fetch(`/api/applications?id=${appId}`, {
              method: 'DELETE'
          });
          
          if (!res.ok) throw new Error('Failed to delete');
          
          fetchData();
      } catch (err) {
          console.error(err);
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

      setMessage({ type: 'success', text: `${t.successUpload} ${file.name}` });
      fetchData(); // Refresh list
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || t.failUpload });
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (docId: string, filePath: string) => {
    if (!confirm(t.deleteConfirm)) return;
    
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

      setMessage({ type: 'success', text: t.successDelete });
      fetchData(); // Refresh list
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || t.failDelete });
    } finally {
      setDeleting(null);
    }
  };

  const handleSubmitApplication = async () => {
    setSubmitting(true);
    setMessage(null);
    
    try {
        const res = await fetch('/api/applications', {
            method: 'POST',
            body: JSON.stringify({ formData }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || 'Failed to submit application');
        }
        
        setMessage({ type: 'success', text: t.applicationSubmitted });
        fetchData(); // Refresh list
    } catch (err: any) {
        console.error(err);
        setMessage({ type: 'error', text: t.applicationError });
    } finally {
        setSubmitting(false);
    }
  };

  // Helper function to check if a specific document type is uploaded
  const isDocUploaded = (docId: string) => {
    return documents.some(doc => doc.doc_type === docId);
  };

  if (!mounted) {
    return null; // Or a loading spinner
  }

  return (
    <div className="space-y-8">
      {/* 1. Welcome Section */}
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
          <div className="flex flex-col items-end">
             {/* Removed Case Status Label */}
          </div>
        </div>
        <div className="px-6 py-6 sm:px-8">
          <div className="flex flex-col">
             <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{t.currentStep}</dt>
             <div className="mt-2 space-y-3">
               {applications.length > 0 ? (
                 applications.map(app => (
                   <div key={app.id} className="bg-slate-50/50 rounded-lg p-3 border border-slate-100 flex justify-between items-center">
                     <div>
                       <p className="text-sm font-bold text-slate-800">
                         {t.formTitle}
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
                         {app.status === 'In Progress' ? (language === 'RU' ? 'В рассмотрении' : language === 'CHI' ? '进行中' : 'In Progress') :
                          app.status === 'Done' ? (language === 'RU' ? 'Одобрено' : language === 'CHI' ? '完成' : 'Done') :
                          app.status === 'Rejected' ? (language === 'RU' ? 'Отклонено' : language === 'CHI' ? '已拒绝' : 'Rejected') : app.status}
                       </span>
                       <button 
                         onClick={() => handleDeleteApplication(app.id)}
                         className="text-slate-400 hover:text-red-500 transition-colors p-1"
                         title="Delete application"
                       >
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                         </svg>
                       </button>
                     </div>
                   </div>
                 ))
               ) : (
                 <dd className="text-base font-medium text-slate-800 flex items-center gap-2">
                   <span className={`relative flex h-3 w-3 ${profile?.case_status === 'In progress' ? '' : 'hidden'}`}>
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                   </span>
                   {profile?.case_status === 'In progress' ? t.stepDescActive : t.stepDesc}
                 </dd>
               )}
             </div>
          </div>
        </div>
      </div>

        {/* 2. IFZA Registration Form */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col lg:col-span-2">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t.formTitle}
                </h3>
            </div>
            <div className="p-8 space-y-8">
                
                {/* 1. ОБЩАЯ ИНФОРМАЦИЯ О ЗАЯВКЕ */}
                <section>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.generalInfo}</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">{t.activities}:</label>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 text-sm w-4">1.</span>
                                    <input 
                                      type="text" 
                                      name="activities_1"
                                      value={formData.activities_1 || ''}
                                      onChange={handleInputChange}
                                      className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 text-sm w-4">2.</span>
                                    <input 
                                      type="text" 
                                      name="activities_2"
                                      value={formData.activities_2 || ''}
                                      onChange={handleInputChange}
                                      className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 text-sm w-4">3.</span>
                                    <input 
                                      type="text" 
                                      name="activities_3"
                                      value={formData.activities_3 || ''}
                                      onChange={handleInputChange}
                                      className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.countries}:</label>
                            <input 
                              type="text" 
                              name="countries"
                              value={formData.countries || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                    </div>
                </section>

                {/* 2. ВАРИАНТЫ НАЗВАНИЯ КОМПАНИИ */}
                <section>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.companyNames}</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm w-4">1.</span>
                            <input 
                              type="text" 
                              name="company_name_1"
                              value={formData.company_name_1 || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm w-4">2.</span>
                            <input 
                              type="text" 
                              name="company_name_2"
                              value={formData.company_name_2 || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm w-4">3.</span>
                            <input 
                              type="text" 
                              name="company_name_3"
                              value={formData.company_name_3 || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                    </div>
                </section>

                {/* 3. СТРУКТУРА КОМПАНИИ */}
                <section>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.structure}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.shareholders}:</label>
                            <input 
                              type="text" 
                              name="shareholders"
                              value={formData.shareholders || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.visas}:</label>
                            <input 
                              type="text" 
                              name="visas"
                              value={formData.visas || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                    </div>
                </section>

                {/* 4. ДАННЫЕ СОТРУДНИКА / УПОЛНОМОЧЕННОГО ЛИЦА */}
                <section>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.personData}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.fullName}:</label>
                            <input 
                              type="text" 
                              name="full_name"
                              value={formData.full_name || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.position}:</label>
                            <input 
                              type="text" 
                              name="position"
                              value={formData.position || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.passport}:</label>
                            <input 
                              type="text" 
                              name="passport"
                              value={formData.passport || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.email}:</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.contactNumber}:</label>
                            <input 
                              type="text" 
                              name="contact_number"
                              value={formData.contact_number || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.country}:</label>
                            <input 
                              type="text" 
                              name="country"
                              value={formData.country || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.address}:</label>
                            <input 
                              type="text" 
                              name="address"
                              value={formData.address || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.uaeVisit}:</label>
                            <input 
                              type="text" 
                              name="uae_visit"
                              value={formData.uae_visit || ''}
                              onChange={handleInputChange}
                              className="block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm" 
                            />
                        </div>
                    </div>
                </section>

                {/* НЕОБХОДИМЫЕ ДОКУМЕНТЫ */}
                <section>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.docsChecklist}</h4>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input 
                                  id="doc1" 
                                  type="checkbox" 
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-50" 
                                  checked={isDocUploaded('passport')}
                                  readOnly
                                />
                            </div>
                            <div className="text-sm">
                                <label htmlFor="doc1" className="font-medium text-slate-700">{t.passportCopy}</label>
                                <p className="text-slate-500">{t.passportCopyDesc}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input 
                                  id="doc2" 
                                  type="checkbox" 
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-50" 
                                  checked={isDocUploaded('passport_cover')}
                                  readOnly
                                />
                            </div>
                            <div className="text-sm">
                                <label htmlFor="doc2" className="font-medium text-slate-700">{t.passportCover}</label>
                                <p className="text-slate-500">{t.passportCoverDesc}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input 
                                  id="doc3" 
                                  type="checkbox" 
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-50" 
                                  checked={isDocUploaded('photo_white')}
                                  readOnly
                                />
                            </div>
                            <div className="text-sm">
                                <label htmlFor="doc3" className="font-medium text-slate-700">{t.whitePhoto}</label>
                                <p className="text-slate-500">{t.whitePhotoDesc}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input 
                                  id="doc4" 
                                  type="checkbox" 
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-50" 
                                  checked={isDocUploaded('visa_copy')}
                                  readOnly
                                />
                            </div>
                            <div className="text-sm">
                                <label htmlFor="doc4" className="font-medium text-slate-700">{t.visaCopy}</label>
                                <p className="text-slate-500">{t.visaCopyDesc}</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Upload Section (Integrated) */}
                <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.uploadTitle}</h4>
                    {message && (
                      <div className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
                        message.type === 'success' 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}>
                        <span className="text-sm font-medium">{message.text}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {REQUIRED_DOCS.map((doc) => (
                        <div key={doc.id} className="group border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all duration-200 bg-slate-50">
                            <div>
                              <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{doc.label}</h4>
                              <p className="text-xs text-slate-500 mt-0.5">{doc.desc}</p>
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
                                {uploading === doc.id ? t.uploading : t.upload}
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
        </div>

        {/* 3. Submit Button */}
        <div className="flex justify-end">
            <button
                onClick={handleSubmitApplication}
                disabled={submitting}
                className="px-8 py-3 bg-[#2E447A] text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
                {submitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.submitting}
                    </>
                ) : (
                    <>
                        {t.submitApplication}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </>
                )}
            </button>
        </div>
    </div>
  );
}

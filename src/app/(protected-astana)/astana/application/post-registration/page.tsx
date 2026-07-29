'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ActivityCodeSearch } from '@/components/ActivityCodeSearch';

interface UboEntry {
  id: string;
  fullName: string;
  dob: string;
  citizenship: string;
  residenceCountry: string;
  address: string;
  ownershipType: string;
  ownershipPercentage: string;
}

const createEmptyUbo = (): UboEntry => ({
  id: Math.random().toString(36).slice(2),
  fullName: '',
  dob: '',
  citizenship: '',
  residenceCountry: '',
  address: '',
  ownershipType: '',
  ownershipPercentage: '',
});

const CHANGE_TYPE_KEYS = [
  'company_name', 'legal_address', 'main_activity', 'director', 'shareholders',
  'share_transfer', 'share_capital', 'ubo', 'auditor', 'constitutional_documents',
  'suspend_activity', 'resume_activity', 'liquidation', 'extract', 'other',
] as const;

function PostRegistrationForm() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lastSubmittedAppId, setLastSubmittedAppId] = useState<string | null>(null);
  const [editingAppId, setEditingAppId] = useState<string | null>(editId);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);
  const [confirmAuthority, setConfirmAuthority] = useState(false);

  interface Document {
    id: string;
    file_name: string;
    file_path: string;
    doc_type: string;
  }

  const [documents, setDocuments] = useState<Document[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [changeTypes, setChangeTypes] = useState<string[]>([]);
  const [ubos, setUbos] = useState<UboEntry[]>([createEmptyUbo()]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const translations = {
    EN: {
      backToDashboard: '← Back to dashboard',
      formTitle: 'AIFC POST-REGISTRATION CHANGES',
      formSubtitle: 'Report changes to your registered AIFC company. AFSA legal forms and internal INLAW documents are handled by our team and are not shown here.',
      step: 'Step',
      of: 'of',
      s1Title: 'Company information',
      companyName: 'Company name',
      required: '(required)',
      aifcNumber: 'AIFC registration number (if known)',
      bin: 'BIN (if known)',
      contactPerson: 'Contact person',
      contactEmail: 'Email',
      contactPhone: 'Phone',
      s2Title: 'What changed?',
      s2Hint: 'Select everything that applies — a section will appear below for each one.',
      changeTypeLabels: {
        company_name: 'Company name',
        legal_address: 'Legal address',
        main_activity: 'Main business activity',
        director: 'Director',
        shareholders: 'Shareholders',
        share_transfer: 'Share transfer',
        share_capital: 'Share capital',
        ubo: 'Ultimate Beneficiary Owner (UBO)',
        auditor: 'Auditor',
        constitutional_documents: 'Constitutional documents',
        suspend_activity: 'Suspension of activity',
        resume_activity: 'Resumption of activity',
        liquidation: 'Liquidation',
        extract: 'Obtaining an extract',
        other: 'Other',
      },
      directorTitle: 'Director details',
      firstName: 'First name',
      lastName: 'Last name',
      dob: 'Date of birth',
      citizenship: 'Citizenship',
      residenceCountry: 'Country of residence',
      residenceAddress: 'Residence address',
      passportNumber: 'Passport number',
      appointmentDate: 'Appointment date',
      legalAddressTitle: 'Legal address change',
      newLegalAddress: 'New legal address',
      changeDate: 'Change date',
      shareTransferTitle: 'Share transfer',
      transferringShareholder: 'Transferring shareholder (individual/entity)',
      recipientShareholder: 'Recipient of shares (individual/entity)',
      sharesOrPercentage: 'Number of shares or share (%)',
      transferDate: 'Transfer date',
      uboTitle: 'Ultimate Beneficiary Owner (UBO)',
      addUbo: 'Add UBO',
      fullName: 'Full name',
      ownershipType: 'Type of ownership',
      direct: 'Direct',
      indirect: 'Indirect',
      ownershipPercentage: 'Ownership share (%)',
      remove: 'Remove',
      mainActivityTitle: 'Main business activity',
      newMainActivity: 'New main business activity',
      activityDesc: 'Activity description',
      shareCapitalTitle: 'Share capital',
      newCapitalAmount: 'New capital amount',
      capitalSharesCount: 'Number of shares',
      capitalNominalValue: 'Nominal value',
      auditorTitle: 'Auditor',
      auditorName: 'Auditor name',
      auditorContact: 'Contact details',
      extractTitle: 'Obtaining an extract',
      extractType: 'Type of extract',
      electronic: 'Electronic',
      paper: 'Paper',
      s3Title: 'Upload documents',
      docChange: 'Document confirming the change',
      docIdentity: 'Identity document (if required)',
      docAdditional: 'Additional documents',
      docOther: 'Other files',
      uploading: 'Uploading...',
      upload: 'Upload',
      successUpload: 'Successfully uploaded',
      failUpload: 'Upload failed',
      s4Title: 'Comment',
      commentPlaceholder: 'Any additional explanations',
      s5Title: 'Review',
      s5Hint: 'Please check the information below before submitting.',
      confirmAccuracy: 'I confirm the information provided is accurate.',
      confirmAuthority: 'I confirm I am authorised to submit this request.',
      back: 'Back',
      next: 'Next',
      submitApplication: 'Submit request',
      updateApplication: 'Update request',
      submitting: 'Submitting...',
      applicationSubmitted: 'Request submitted successfully!',
      applicationError: 'Error submitting request',
      editingBanner: 'You are editing an existing request.',
      cancelEdit: 'Cancel editing',
      companyNameRequired: 'Please enter the company name to continue.',
    },
    RU: {
      backToDashboard: '← Назад к панели',
      formTitle: 'ПОСТРЕГИСТРАЦИОННЫЕ ИЗМЕНЕНИЯ AIFC',
      formSubtitle: 'Сообщите об изменениях в вашей зарегистрированной компании AIFC. Юридические формы AFSA и внутренние документы INLAW готовит наша команда — здесь они не отображаются.',
      step: 'Шаг',
      of: 'из',
      s1Title: 'Информация о компании',
      companyName: 'Наименование компании',
      required: '(обязательно)',
      aifcNumber: 'Регистрационный номер AIFC (если известен)',
      bin: 'БИН (если известен)',
      contactPerson: 'Контактное лицо',
      contactEmail: 'E-mail',
      contactPhone: 'Телефон',
      s2Title: 'Что изменилось?',
      s2Hint: 'Отметьте всё, что применимо — ниже появится раздел для каждого пункта.',
      changeTypeLabels: {
        company_name: 'Наименование компании',
        legal_address: 'Юридический адрес',
        main_activity: 'Основной вид деятельности',
        director: 'Директор',
        shareholders: 'Акционеры',
        share_transfer: 'Передача акций',
        share_capital: 'Уставный капитал',
        ubo: 'Конечный бенефициар (UBO)',
        auditor: 'Аудитор',
        constitutional_documents: 'Учредительные документы',
        suspend_activity: 'Приостановление деятельности',
        resume_activity: 'Возобновление деятельности',
        liquidation: 'Ликвидация',
        extract: 'Получение выписки',
        other: 'Другое',
      },
      directorTitle: 'Данные директора',
      firstName: 'Имя',
      lastName: 'Фамилия',
      dob: 'Дата рождения',
      citizenship: 'Гражданство',
      residenceCountry: 'Страна проживания',
      residenceAddress: 'Адрес проживания',
      passportNumber: 'Номер паспорта',
      appointmentDate: 'Дата назначения',
      legalAddressTitle: 'Изменение юридического адреса',
      newLegalAddress: 'Новый юридический адрес',
      changeDate: 'Дата изменения',
      shareTransferTitle: 'Передача акций',
      transferringShareholder: 'Передающий акционер (ФЛ/ЮЛ)',
      recipientShareholder: 'Получатель акций (ФЛ/ЮЛ)',
      sharesOrPercentage: 'Количество акций или доля (%)',
      transferDate: 'Дата передачи',
      uboTitle: 'Конечный бенефициар (UBO)',
      addUbo: 'Добавить UBO',
      fullName: 'ФИО',
      ownershipType: 'Тип владения',
      direct: 'Direct',
      indirect: 'Indirect',
      ownershipPercentage: 'Размер доли (%)',
      remove: 'Удалить',
      mainActivityTitle: 'Основной вид деятельности',
      newMainActivity: 'Новый основной вид деятельности',
      activityDesc: 'Описание деятельности',
      shareCapitalTitle: 'Уставный капитал',
      newCapitalAmount: 'Новый размер капитала',
      capitalSharesCount: 'Количество акций',
      capitalNominalValue: 'Номинальная стоимость',
      auditorTitle: 'Аудитор',
      auditorName: 'Наименование аудитора',
      auditorContact: 'Контактные данные',
      extractTitle: 'Получение выписки',
      extractType: 'Тип выписки',
      electronic: 'Электронная',
      paper: 'Бумажная',
      s3Title: 'Загрузка документов',
      docChange: 'Документ, подтверждающий изменение',
      docIdentity: 'Документ, удостоверяющий личность (при необходимости)',
      docAdditional: 'Дополнительные документы',
      docOther: 'Иные файлы',
      uploading: 'Загрузка...',
      upload: 'Загрузить',
      successUpload: 'Успешно загружено',
      failUpload: 'Ошибка загрузки',
      s4Title: 'Комментарий',
      commentPlaceholder: 'Дополнительные пояснения',
      s5Title: 'Проверка',
      s5Hint: 'Проверьте информацию ниже перед отправкой.',
      confirmAccuracy: 'Подтверждаю достоверность предоставленной информации.',
      confirmAuthority: 'Подтверждаю наличие полномочий на отправку этой заявки.',
      back: 'Назад',
      next: 'Далее',
      submitApplication: 'Отправить заявку',
      updateApplication: 'Обновить заявку',
      submitting: 'Отправка...',
      applicationSubmitted: 'Заявка успешно отправлена!',
      applicationError: 'Ошибка при отправке заявки',
      editingBanner: 'Вы редактируете существующую заявку.',
      cancelEdit: 'Отменить редактирование',
      companyNameRequired: 'Укажите наименование компании, чтобы продолжить.',
    },
    CHI: {
      backToDashboard: '← 返回控制台',
      formTitle: 'AIFC 注册后变更',
      formSubtitle: '报告您已注册的 AIFC 公司的变更信息。AFSA 法律表格和 INLAW 内部文件由我们团队处理，此处不显示。',
      step: '步骤',
      of: '共',
      s1Title: '公司信息',
      companyName: '公司名称',
      required: '（必填）',
      aifcNumber: 'AIFC 注册号（如已知）',
      bin: '商业识别号 BIN（如已知）',
      contactPerson: '联系人',
      contactEmail: '电子邮箱',
      contactPhone: '电话',
      s2Title: '发生了什么变化？',
      s2Hint: '选择所有适用项 — 下方将为每一项显示相应部分。',
      changeTypeLabels: {
        company_name: '公司名称',
        legal_address: '法定地址',
        main_activity: '主要业务活动',
        director: '董事',
        shareholders: '股东',
        share_transfer: '股份转让',
        share_capital: '注册股本',
        ubo: '最终受益所有人 (UBO)',
        auditor: '审计师',
        constitutional_documents: '公司章程文件',
        suspend_activity: '暂停运营',
        resume_activity: '恢复运营',
        liquidation: '清算',
        extract: '获取证明',
        other: '其他',
      },
      directorTitle: '董事信息',
      firstName: '名',
      lastName: '姓',
      dob: '出生日期',
      citizenship: '国籍',
      residenceCountry: '居住国',
      residenceAddress: '居住地址',
      passportNumber: '护照号码',
      appointmentDate: '任命日期',
      legalAddressTitle: '法定地址变更',
      newLegalAddress: '新法定地址',
      changeDate: '变更日期',
      shareTransferTitle: '股份转让',
      transferringShareholder: '转让方股东（个人/实体）',
      recipientShareholder: '受让方（个人/实体）',
      sharesOrPercentage: '股份数量或比例 (%)',
      transferDate: '转让日期',
      uboTitle: '最终受益所有人 (UBO)',
      addUbo: '添加 UBO',
      fullName: '全名',
      ownershipType: '持股类型',
      direct: 'Direct',
      indirect: 'Indirect',
      ownershipPercentage: '持股比例 (%)',
      remove: '删除',
      mainActivityTitle: '主要业务活动',
      newMainActivity: '新的主要业务活动',
      activityDesc: '活动说明',
      shareCapitalTitle: '注册股本',
      newCapitalAmount: '新股本金额',
      capitalSharesCount: '股份数量',
      capitalNominalValue: '面值',
      auditorTitle: '审计师',
      auditorName: '审计师名称',
      auditorContact: '联系方式',
      extractTitle: '获取证明',
      extractType: '证明类型',
      electronic: '电子版',
      paper: '纸质版',
      s3Title: '上传文件',
      docChange: '证明变更的文件',
      docIdentity: '身份证明文件（如需要）',
      docAdditional: '补充文件',
      docOther: '其他文件',
      uploading: '上传中...',
      upload: '上传',
      successUpload: '上传成功',
      failUpload: '上传失败',
      s4Title: '备注',
      commentPlaceholder: '其他补充说明',
      s5Title: '核对',
      s5Hint: '提交前请核对以下信息。',
      confirmAccuracy: '我确认所提供的信息真实准确。',
      confirmAuthority: '我确认有权提交此申请。',
      back: '上一步',
      next: '下一步',
      submitApplication: '提交申请',
      updateApplication: '更新申请',
      submitting: '提交中...',
      applicationSubmitted: '申请提交成功！',
      applicationError: '提交申请时出错',
      editingBanner: '您正在编辑现有申请。',
      cancelEdit: '取消编辑',
      companyNameRequired: '请填写公司名称以继续。',
    },
  };

  const t = translations[language] || translations.EN;

  const REQUIRED_DOCS_META = [
    { id: 'pr_change_document', label: t.docChange },
    { id: 'pr_identity_document', label: t.docIdentity },
    { id: 'pr_additional_documents', label: t.docAdditional },
    { id: 'pr_other_files', label: t.docOther },
  ];

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
      if (data.documents) setDocuments(data.documents);

      if (editId && data.applications) {
        const app = data.applications.find((a: any) => a.id === editId);
        if (app) {
          setFormData(app.form_data || {});
          setChangeTypes(Array.isArray(app.form_data?.changeTypes) ? app.form_data.changeTypes : []);
          setUbos(app.form_data?.ubos?.length ? app.form_data.ubos : [createEmptyUbo()]);
          setEditingAppId(app.id);
        }
      }
    } catch (err) {
      console.error('Error loading application data:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const toggleChangeType = (key: string) => {
    setChangeTypes((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const addUbo = () => setUbos((prev) => [...prev, createEmptyUbo()]);
  const removeUbo = (id: string) => setUbos((prev) => prev.filter((u) => u.id !== id));
  const updateUbo = (id: string, field: keyof UboEntry, value: string) => {
    setUbos((prev) => prev.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
  };

  const handleUpload = async (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(docId);
    setMessage(null);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('docId', docId);
      const res = await fetch('/api/astana/upload', { method: 'POST', body: uploadFormData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setMessage({ type: 'success', text: `${t.successUpload} ${file.name}` });
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || t.failUpload });
    } finally {
      setUploading(null);
    }
  };

  const isDocUploaded = (docId: string) => documents.some((d) => d.doc_type === docId);

  const handleSubmit = async () => {
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/astana/applications', {
        method: editingAppId ? 'PATCH' : 'POST',
        body: JSON.stringify({
          id: editingAppId || undefined,
          formData: { ...formData, changeTypes, ubos },
          applicationType: 'post_registration_change',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      setMessage({ type: 'success', text: t.applicationSubmitted });
      setLastSubmittedAppId(data.application?.id || editingAppId);
    } catch (err: any) {
      setMessage({ type: 'error', text: t.applicationError });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1';

  const steps = [t.s1Title, t.s2Title, t.s3Title, t.s4Title, t.s5Title];

  const canAdvanceFromStep1 = (formData.company_name || '').trim().length > 0;

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <Link href="/astana/dashboard" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
        {t.backToDashboard}
      </Link>

      {editingAppId && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 flex items-center justify-between">
          <p className="text-sm font-medium text-indigo-700">{t.editingBanner}</p>
          <Link href="/astana/dashboard" className="text-xs font-medium text-indigo-600 hover:text-indigo-800 whitespace-nowrap">
            {t.cancelEdit}
          </Link>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {t.formTitle}
          </h3>
          <p className="mt-2 text-xs text-slate-500 max-w-2xl">{t.formSubtitle}</p>

          {/* Step indicator */}
          <div className="mt-5 flex items-center gap-2">
            {steps.map((label, idx) => {
              const n = idx + 1;
              const active = step === n;
              const done = step > n;
              return (
                <div key={n} className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    done ? 'bg-indigo-600 text-white' : active ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {done ? '✓' : n}
                  </div>
                  <span className={`text-xs font-medium truncate hidden sm:inline ${active ? 'text-indigo-700' : 'text-slate-400'}`}>{label}</span>
                  {n < steps.length && <div className={`h-px flex-1 ${done ? 'bg-indigo-300' : 'bg-slate-200'}`} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {step === 1 && (
            <section className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 border-b pb-2">{t.s1Title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>{t.companyName} <span className="text-red-500">*</span></label>
                  <input type="text" name="company_name" value={formData.company_name || ''} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t.aifcNumber}</label>
                  <input type="text" name="aifc_registration_number" value={formData.aifc_registration_number || ''} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t.bin}</label>
                  <input type="text" name="bin" value={formData.bin || ''} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t.contactPerson}</label>
                  <input type="text" name="contact_person" value={formData.contact_person || ''} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t.contactEmail}</label>
                  <input type="email" name="contact_email" value={formData.contact_email || ''} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t.contactPhone}</label>
                  <input type="text" name="contact_phone" value={formData.contact_phone || ''} onChange={handleInputChange} className={inputClass} />
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <>
              <section>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 border-b pb-2">{t.s2Title}</h4>
                <p className="text-xs text-slate-500 mb-4">{t.s2Hint}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
                  {CHANGE_TYPE_KEYS.map((key) => (
                    <label key={key} className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={changeTypes.includes(key)}
                        onChange={() => toggleChangeType(key)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      {(t.changeTypeLabels as any)[key]}
                    </label>
                  ))}
                </div>
              </section>

              {changeTypes.includes('director') && (
                <section className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.directorTitle}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={labelClass}>{t.firstName}</label><input type="text" name="director_first_name" value={formData.director_first_name || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.lastName}</label><input type="text" name="director_last_name" value={formData.director_last_name || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.dob}</label><input type="date" name="director_dob" value={formData.director_dob || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.citizenship}</label><input type="text" name="director_citizenship" value={formData.director_citizenship || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.residenceCountry}</label><input type="text" name="director_residence_country" value={formData.director_residence_country || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.residenceAddress}</label><input type="text" name="director_residence_address" value={formData.director_residence_address || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.contactEmail}</label><input type="email" name="director_email" value={formData.director_email || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.contactPhone}</label><input type="text" name="director_phone" value={formData.director_phone || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.passportNumber}</label><input type="text" name="director_passport_number" value={formData.director_passport_number || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.appointmentDate}</label><input type="date" name="director_appointment_date" value={formData.director_appointment_date || ''} onChange={handleInputChange} className={inputClass} /></div>
                  </div>
                </section>
              )}

              {changeTypes.includes('legal_address') && (
                <section className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.legalAddressTitle}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={labelClass}>{t.newLegalAddress}</label><input type="text" name="new_legal_address" value={formData.new_legal_address || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.changeDate}</label><input type="date" name="legal_address_change_date" value={formData.legal_address_change_date || ''} onChange={handleInputChange} className={inputClass} /></div>
                  </div>
                </section>
              )}

              {changeTypes.includes('share_transfer') && (
                <section className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.shareTransferTitle}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={labelClass}>{t.transferringShareholder}</label><input type="text" name="transferring_shareholder" value={formData.transferring_shareholder || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.recipientShareholder}</label><input type="text" name="recipient_shareholder" value={formData.recipient_shareholder || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.sharesOrPercentage}</label><input type="text" name="shares_or_percentage" value={formData.shares_or_percentage || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.transferDate}</label><input type="date" name="transfer_date" value={formData.transfer_date || ''} onChange={handleInputChange} className={inputClass} /></div>
                  </div>
                </section>
              )}

              {changeTypes.includes('ubo') && (
                <section className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.uboTitle}</h4>
                  <div className="space-y-4">
                    {ubos.map((u, idx) => (
                      <div key={u.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">UBO {idx + 1}</span>
                          {ubos.length > 1 && (
                            <button type="button" onClick={() => removeUbo(u.id)} className="text-xs font-medium text-red-500 hover:text-red-700">{t.remove}</button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><label className={labelClass}>{t.fullName}</label><input type="text" value={u.fullName} onChange={(e) => updateUbo(u.id, 'fullName', e.target.value)} className={inputClass} /></div>
                          <div><label className={labelClass}>{t.dob}</label><input type="date" value={u.dob} onChange={(e) => updateUbo(u.id, 'dob', e.target.value)} className={inputClass} /></div>
                          <div><label className={labelClass}>{t.citizenship}</label><input type="text" value={u.citizenship} onChange={(e) => updateUbo(u.id, 'citizenship', e.target.value)} className={inputClass} /></div>
                          <div><label className={labelClass}>{t.residenceCountry}</label><input type="text" value={u.residenceCountry} onChange={(e) => updateUbo(u.id, 'residenceCountry', e.target.value)} className={inputClass} /></div>
                          <div className="md:col-span-2"><label className={labelClass}>{t.residenceAddress}</label><input type="text" value={u.address} onChange={(e) => updateUbo(u.id, 'address', e.target.value)} className={inputClass} /></div>
                          <div>
                            <label className={labelClass}>{t.ownershipType}</label>
                            <select value={u.ownershipType} onChange={(e) => updateUbo(u.id, 'ownershipType', e.target.value)} className={inputClass}>
                              <option value=""></option>
                              <option value="direct">{t.direct}</option>
                              <option value="indirect">{t.indirect}</option>
                            </select>
                          </div>
                          <div><label className={labelClass}>{t.ownershipPercentage}</label><input type="text" value={u.ownershipPercentage} onChange={(e) => updateUbo(u.id, 'ownershipPercentage', e.target.value)} className={inputClass} /></div>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addUbo} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1">+ {t.addUbo}</button>
                  </div>
                </section>
              )}

              {changeTypes.includes('main_activity') && (
                <section className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.mainActivityTitle}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{t.newMainActivity}</label>
                      <ActivityCodeSearch
                        value={formData.new_main_activity || ''}
                        onChange={(v) => setFormData((prev: any) => ({ ...prev, new_main_activity: v }))}
                        className={inputClass}
                      />
                    </div>
                    <div><label className={labelClass}>{t.changeDate}</label><input type="date" name="activity_change_date" value={formData.activity_change_date || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div className="md:col-span-2"><label className={labelClass}>{t.activityDesc}</label><textarea name="activity_description" value={formData.activity_description || ''} onChange={handleInputChange} rows={2} className={inputClass} /></div>
                  </div>
                </section>
              )}

              {changeTypes.includes('share_capital') && (
                <section className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.shareCapitalTitle}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className={labelClass}>{t.newCapitalAmount}</label><input type="text" name="new_capital_amount" value={formData.new_capital_amount || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.capitalSharesCount}</label><input type="text" name="capital_shares_count" value={formData.capital_shares_count || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.capitalNominalValue}</label><input type="text" name="capital_nominal_value" value={formData.capital_nominal_value || ''} onChange={handleInputChange} className={inputClass} /></div>
                  </div>
                </section>
              )}

              {changeTypes.includes('auditor') && (
                <section className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.auditorTitle}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={labelClass}>{t.auditorName}</label><input type="text" name="auditor_name" value={formData.auditor_name || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>{t.appointmentDate}</label><input type="date" name="auditor_appointment_date" value={formData.auditor_appointment_date || ''} onChange={handleInputChange} className={inputClass} /></div>
                    <div className="md:col-span-2"><label className={labelClass}>{t.auditorContact}</label><input type="text" name="auditor_contact_details" value={formData.auditor_contact_details || ''} onChange={handleInputChange} className={inputClass} /></div>
                  </div>
                </section>
              )}

              {changeTypes.includes('extract') && (
                <section className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.extractTitle}</h4>
                  <div className="max-w-xs">
                    <label className={labelClass}>{t.extractType}</label>
                    <select name="extract_type" value={formData.extract_type || ''} onChange={handleInputChange} className={inputClass}>
                      <option value=""></option>
                      <option value="electronic">{t.electronic}</option>
                      <option value="paper">{t.paper}</option>
                    </select>
                  </div>
                </section>
              )}
            </>
          )}

          {step === 3 && (
            <section>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.s3Title}</h4>
              {message && (
                <div className={`mb-6 p-4 rounded-lg border text-sm font-medium ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                  {message.text}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REQUIRED_DOCS_META.map((doc) => (
                  <div key={doc.id} className="group border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all duration-200 bg-slate-50">
                    <div className="flex items-center gap-3 min-w-0">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" checked={isDocUploaded(doc.id)} readOnly />
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors truncate">{doc.label}</h4>
                    </div>
                    <div className="shrink-0">
                      <label htmlFor={`file-${doc.id}`} className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-xs font-bold rounded-lg shadow-sm text-white transition-all ${uploading === doc.id ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#2E447A] hover:bg-indigo-700 active:scale-95'}`}>
                        {uploading === doc.id ? t.uploading : t.upload}
                      </label>
                      <input id={`file-${doc.id}`} type="file" className="hidden" onChange={(e) => handleUpload(doc.id, e)} disabled={uploading !== null} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {step === 4 && (
            <section>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.s4Title}</h4>
              <textarea name="comment" value={formData.comment || ''} onChange={handleInputChange} rows={5} placeholder={t.commentPlaceholder} className={inputClass} />
            </section>
          )}

          {step === 5 && (
            <section>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 border-b pb-2">{t.s5Title}</h4>
              <p className="text-xs text-slate-500 mb-4">{t.s5Hint}</p>

              <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm text-slate-700 mb-6">
                <p><span className="font-semibold">{t.companyName}:</span> {formData.company_name || '-'}</p>
                <p><span className="font-semibold">{t.s2Title}:</span> {changeTypes.length > 0 ? changeTypes.map((c) => (t.changeTypeLabels as any)[c]).join(', ') : '-'}</p>
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              <div className="space-y-3">
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={confirmAccuracy} onChange={(e) => setConfirmAccuracy(e.target.checked)} className="mt-0.5 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  {t.confirmAccuracy}
                </label>
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={confirmAuthority} onChange={(e) => setConfirmAuthority(e.target.checked)} className="mt-0.5 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  {t.confirmAuthority}
                </label>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center gap-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="px-6 py-2.5 text-sm font-bold text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t.back}
        </button>

        {step < 5 ? (
          <div className="flex flex-col items-end gap-1">
            <button
              type="button"
              onClick={() => { if (step !== 1 || canAdvanceFromStep1) setStep((s) => Math.min(5, s + 1)); }}
              disabled={step === 1 && !canAdvanceFromStep1}
              className="px-8 py-2.5 bg-[#2E447A] text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {t.next}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            {step === 1 && !canAdvanceFromStep1 && <span className="text-xs text-red-500">{t.companyNameRequired}</span>}
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || !confirmAccuracy || !confirmAuthority}
            className="px-8 py-3 bg-[#2E447A] text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {submitting ? t.submitting : (editingAppId ? t.updateApplication : t.submitApplication)}
          </button>
        )}
      </div>
    </div>
  );
}

export default function PostRegistrationPage() {
  return (
    <Suspense fallback={null}>
      <PostRegistrationForm />
    </Suspense>
  );
}

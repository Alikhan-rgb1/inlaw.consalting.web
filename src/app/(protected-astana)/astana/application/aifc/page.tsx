'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ActivityCodeSearch } from '@/components/ActivityCodeSearch';

interface Individual {
  id: string;
  fullName: string;
  iin: string;
  roles: string[];
  email: string;
  phone: string;
  shares: string;
  shareholding: string;
  residenceCountry: string;
  residenceCity: string;
  residenceStreet: string;
  residenceBuilding: string;
  residenceApartment: string;
  residencePostalCode: string;
}

interface Activity {
  id: string;
  code: string;
  percentage: string;
}

const ROLE_KEYS = ['director', 'secretary', 'authorised_signatory', 'ceo', 'shareholder', 'ubo'] as const;

const createEmptyIndividual = (): Individual => ({
  id: Math.random().toString(36).slice(2),
  fullName: '',
  iin: '',
  roles: [],
  email: '',
  phone: '',
  shares: '',
  shareholding: '',
  residenceCountry: '',
  residenceCity: '',
  residenceStreet: '',
  residenceBuilding: '',
  residenceApartment: '',
  residencePostalCode: '',
});

const createEmptyActivity = (): Activity => ({
  id: Math.random().toString(36).slice(2),
  code: '',
  percentage: '',
});

function AifcApplicationForm() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const [mounted, setMounted] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lastSubmittedAppId, setLastSubmittedAppId] = useState<string | null>(null);
  const [editingAppId, setEditingAppId] = useState<string | null>(editId);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  interface Document {
    id: string;
    file_name: string;
    file_path: string;
    doc_type: string;
    created_at: string;
    application_id?: string;
    uploaded_by?: string;
  }

  const [documents, setDocuments] = useState<Document[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [individuals, setIndividuals] = useState<Individual[]>([createEmptyIndividual()]);
  const [activities, setActivities] = useState<Activity[]>([createEmptyActivity()]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const translations = {
    EN: {
      backToDashboard: '← Back to dashboard',
      formTitle: 'AIFC COMPANY REGISTRATION FORM',
      s1: '1. COMPANY NAME',
      nameOptionLabel: 'Option',
      s2: '2. BUSINESS ACTIVITY',
      activityType: 'Business activity type',
      activityTypeRegulated: 'Regulated activity',
      activityTypeNonRegulated: 'Non-regulated activity',
      activityDesc: 'Detailed description of business activities',
      mainActivityLabel: 'Main type of activity',
      otherActivityLabel: 'Additional type of activity',
      mainActivityPct: 'Percentage of main activity',
      otherActivityPct: 'Percentage of additional activity',
      addActivity: 'Add activity type',
      activityCodeSearchPlaceholder: 'Search by code or name...',
      s3: '3. COMPANY DETAILS',
      legalEntityType: 'Type of legal entity',
      commercial: 'Commercial',
      nonCommercial: 'Non-commercial',
      businessSize: 'Expected size of business',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      expectedEmployees: 'Expected number of employees',
      vatPayer: 'Is the legal entity a VAT payer?',
      yes: 'Yes',
      no: 'No',
      s4: '4. REGISTRATION CODE ADDRESS',
      registrationCodeAddress: 'Registration Code Address',
      s5: '5. CORPORATE STRUCTURE — INDIVIDUALS',
      s5Hint: 'Add every director, shareholder, secretary or authorised signatory. Personal ID details are taken from the uploaded ID/passport scan below — no need to retype them here.',
      person: 'Person',
      fullName: 'Full name',
      iin: 'Tax ID (IIN)',
      roles: 'Role(s)',
      contactEmail: 'Contact email',
      contactPhone: 'Contact phone',
      sharesCount: 'Number of shares',
      shareholdingPct: 'Shareholding %',
      addPerson: 'Add person',
      remove: 'Remove',
      resCountry: 'Country of main residence',
      resCity: 'City',
      resStreet: 'Street',
      resBuilding: 'Building',
      resApartment: 'Apartment / office',
      resPostalCode: 'Postal code',
      roleLabels: {
        director: 'Director',
        secretary: 'Secretary',
        authorised_signatory: 'Authorised Signatory',
        ceo: 'CEO',
        shareholder: 'Shareholder',
        ubo: 'Ultimate Beneficiary Owner',
      },
      s6: '6. SHARE CAPITAL INFORMATION',
      shareClassName: 'Share class name',
      shareCurrency: 'Currency',
      votesPerShare: 'Number of votes per share',
      nominalValue: 'Nominal value per share',
      totalShares: 'Total number of shares',
      ownershipForm: 'Form of ownership',
      private: 'Private',
      state: 'State',
      totalShareCapital: 'Total amount of share capital',
      s7: '7. CONTACT FOR AFSA CORRESPONDENCE',
      registeredEmail: 'Registered email address',
      docsChecklist: 'UPLOAD DOCUMENTS',
      docId: 'Identity Document (ID card, both sides) or passport scan',
      docIdDesc: 'For every individual listed above',
      docCriminal: 'Certificate of no criminal record (Chinese nationals)',
      docCriminalDesc: 'With notarized translation, if applicable',
      docResolution: 'Signed Resolution',
      docResolutionDesc: 'Resolution of Incorporation',
      docOther: 'Other documents',
      docOtherDesc: 'Any additional supporting documents',
      uploading: 'Uploading...',
      upload: 'Upload',
      successUpload: 'Successfully uploaded',
      failUpload: 'Upload failed',
      submitApplication: 'Submit Application',
      updateApplication: 'Update Application',
      submitting: 'Submitting...',
      applicationSubmitted: 'Application submitted successfully!',
      applicationError: 'Error submitting application',
      downloadSigningDoc: 'Download document for signing',
      editingBanner: 'You are editing an existing application.',
      cancelEdit: 'Cancel editing',
    },
    RU: {
      backToDashboard: '← Назад к панели',
      formTitle: 'АНКЕТА ДЛЯ РЕГИСТРАЦИИ КОМПАНИИ В AIFC',
      s1: '1. НАЗВАНИЕ КОМПАНИИ',
      nameOptionLabel: 'Вариант',
      s2: '2. ВИД ДЕЯТЕЛЬНОСТИ',
      activityType: 'Тип деятельности',
      activityTypeRegulated: 'Регулируемая деятельность',
      activityTypeNonRegulated: 'Нерегулируемая деятельность',
      activityDesc: 'Подробное описание деятельности',
      mainActivityLabel: 'Основной вид деятельности',
      otherActivityLabel: 'Дополнительный вид деятельности',
      mainActivityPct: 'Доля основного вида деятельности (%)',
      otherActivityPct: 'Доля дополнительного вида деятельности (%)',
      addActivity: 'Добавить вид деятельности',
      activityCodeSearchPlaceholder: 'Поиск по коду или названию...',
      s3: '3. ДАННЫЕ О КОМПАНИИ',
      legalEntityType: 'Тип юридического лица',
      commercial: 'Коммерческое',
      nonCommercial: 'Некоммерческое',
      businessSize: 'Ожидаемый размер бизнеса',
      small: 'Малый',
      medium: 'Средний',
      large: 'Крупный',
      expectedEmployees: 'Ожидаемое количество сотрудников',
      vatPayer: 'Является ли юридическое лицо плательщиком НДС?',
      yes: 'Да',
      no: 'Нет',
      s4: '4. РЕГИСТРАЦИОННЫЙ КОД АДРЕСА',
      registrationCodeAddress: 'Registration Code Address',
      s5: '5. КОРПОРАТИВНАЯ СТРУКТУРА — ФИЗИЧЕСКИЕ ЛИЦА',
      s5Hint: 'Добавьте каждого директора, акционера, секретаря или уполномоченное лицо. Персональные данные документа берутся из загруженного ниже скана удостоверения/паспорта — повторно вводить их не нужно.',
      person: 'Человек',
      fullName: 'ФИО',
      iin: 'Налоговый идентификационный номер (ИИН)',
      roles: 'Роль(и)',
      contactEmail: 'Email для связи',
      contactPhone: 'Телефон для связи',
      sharesCount: 'Количество акций',
      shareholdingPct: 'Доля владения (%)',
      addPerson: 'Добавить человека',
      remove: 'Удалить',
      resCountry: 'Страна основного проживания',
      resCity: 'Город',
      resStreet: 'Улица',
      resBuilding: 'Дом',
      resApartment: 'Квартира / офис',
      resPostalCode: 'Почтовый индекс',
      roleLabels: {
        director: 'Директор',
        secretary: 'Секретарь',
        authorised_signatory: 'Уполномоченное лицо',
        ceo: 'CEO',
        shareholder: 'Акционер',
        ubo: 'Конечный бенефициарный владелец',
      },
      s6: '6. УСТАВНЫЙ КАПИТАЛ',
      shareClassName: 'Класс акций',
      shareCurrency: 'Валюта',
      votesPerShare: 'Количество голосов на акцию',
      nominalValue: 'Номинальная стоимость акции',
      totalShares: 'Общее количество акций',
      ownershipForm: 'Форма собственности',
      private: 'Частная',
      state: 'Государственная',
      totalShareCapital: 'Общая сумма уставного капитала',
      s7: '7. КОНТАКТ ДЛЯ ПЕРЕПИСКИ С AFSA',
      registeredEmail: 'Зарегистрированный email адрес',
      docsChecklist: 'ЗАГРУЗКА ДОКУМЕНТОВ',
      docId: 'Фото удостоверения личности с двух сторон или скан паспорта',
      docIdDesc: 'На каждое физическое лицо, указанное выше',
      docCriminal: 'Справка об отсутствии судимости (для граждан Китая)',
      docCriminalDesc: 'С нотариально заверенным переводом, если применимо',
      docResolution: 'Подписанная резолюция',
      docResolutionDesc: 'Резолюция об учреждении компании',
      docOther: 'Прочие документы',
      docOtherDesc: 'Любые дополнительные подтверждающие документы',
      uploading: 'Загрузка...',
      upload: 'Загрузить',
      successUpload: 'Успешно загружено',
      failUpload: 'Ошибка загрузки',
      submitApplication: 'Отправить заявку',
      updateApplication: 'Обновить заявку',
      submitting: 'Отправка...',
      applicationSubmitted: 'Заявка успешно отправлена!',
      applicationError: 'Ошибка при отправке заявки',
      downloadSigningDoc: 'Скачать документ для подписания',
      editingBanner: 'Вы редактируете существующую заявку.',
      cancelEdit: 'Отменить редактирование',
    },
    CHI: {
      backToDashboard: '← 返回控制台',
      formTitle: 'AIFC 公司注册申请表',
      s1: '1. 公司名称',
      nameOptionLabel: '选项',
      s2: '2. 业务活动',
      activityType: '业务活动类型',
      activityTypeRegulated: '受监管活动',
      activityTypeNonRegulated: '非受监管活动',
      activityDesc: '业务活动详细说明',
      mainActivityLabel: '主要业务活动',
      otherActivityLabel: '其他业务活动',
      mainActivityPct: '主要活动占比 (%)',
      otherActivityPct: '其他活动占比 (%)',
      addActivity: '添加业务活动',
      activityCodeSearchPlaceholder: '按代码或名称搜索...',
      s3: '3. 公司详情',
      legalEntityType: '法律实体类型',
      commercial: '商业',
      nonCommercial: '非商业',
      businessSize: '预期业务规模',
      small: '小型',
      medium: '中型',
      large: '大型',
      expectedEmployees: '预期员工人数',
      vatPayer: '该法律实体是否为增值税纳税人？',
      yes: '是',
      no: '否',
      s4: '4. 注册地址代码',
      registrationCodeAddress: '注册地址代码 (Registration Code Address)',
      s5: '5. 公司结构 — 个人信息',
      s5Hint: '请添加每一位董事、股东、秘书或授权签字人。个人证件信息以下方上传的证件/护照扫描件为准，无需重复填写。',
      person: '人员',
      fullName: '全名',
      iin: '税务识别号 (IIN)',
      roles: '角色',
      contactEmail: '联系邮箱',
      contactPhone: '联系电话',
      sharesCount: '股份数量',
      shareholdingPct: '持股比例 (%)',
      addPerson: '添加人员',
      remove: '删除',
      resCountry: '主要居住国',
      resCity: '城市',
      resStreet: '街道',
      resBuilding: '楼栋',
      resApartment: '公寓/办公室',
      resPostalCode: '邮政编码',
      roleLabels: {
        director: '董事',
        secretary: '秘书',
        authorised_signatory: '授权签字人',
        ceo: 'CEO',
        shareholder: '股东',
        ubo: '最终受益所有人',
      },
      s6: '6. 注册股本信息',
      shareClassName: '股份类别名称',
      shareCurrency: '货币',
      votesPerShare: '每股表决权数',
      nominalValue: '每股面值',
      totalShares: '股份总数',
      ownershipForm: '所有制形式',
      private: '私有',
      state: '国有',
      totalShareCapital: '注册股本总额',
      s7: '7. AFSA 通信联系方式',
      registeredEmail: '注册邮箱地址',
      docsChecklist: '上传文件',
      docId: '身份证件（正反面）照片或护照扫描件',
      docIdDesc: '上方列出的每位个人均需提供',
      docCriminal: '无犯罪记录证明（中国公民）',
      docCriminalDesc: '如适用，需附经公证的翻译件',
      docResolution: '已签署的决议',
      docResolutionDesc: '公司设立决议',
      docOther: '其他文件',
      docOtherDesc: '任何其他补充文件',
      uploading: '上传中...',
      upload: '上传',
      successUpload: '上传成功',
      failUpload: '上传失败',
      submitApplication: '提交申请',
      updateApplication: '更新申请',
      submitting: '提交中...',
      applicationSubmitted: '申请提交成功！',
      applicationError: '提交申请时出错',
      downloadSigningDoc: '下载签署文件',
      editingBanner: '您正在编辑现有申请。',
      cancelEdit: '取消编辑',
    }
  };

  const t = translations[language] || translations.EN;

  const REQUIRED_DOCS = [
    { id: 'id_document', label: t.docId, desc: t.docIdDesc },
    { id: 'no_criminal_record_cn', label: t.docCriminal, desc: t.docCriminalDesc },
    { id: 'signed_resolution', label: t.docResolution, desc: t.docResolutionDesc },
    { id: 'other_documents', label: t.docOther, desc: t.docOtherDesc },
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
          setIndividuals(app.form_data?.individuals?.length ? app.form_data.individuals : [createEmptyIndividual()]);
          setActivities(app.form_data?.activities?.length ? app.form_data.activities : [createEmptyActivity()]);
          setEditingAppId(app.id);
        }
      }
    } catch (err) {
      console.error("Error loading application data:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const addIndividual = () => setIndividuals((prev) => [...prev, createEmptyIndividual()]);
  const removeIndividual = (id: string) => setIndividuals((prev) => prev.filter((p) => p.id !== id));
  const updateIndividual = (id: string, field: keyof Individual, value: string) => {
    setIndividuals((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };
  const toggleRole = (id: string, role: string) => {
    setIndividuals((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const roles = p.roles.includes(role) ? p.roles.filter((r) => r !== role) : [...p.roles, role];
        return { ...p, roles };
      })
    );
  };

  const addActivity = () => setActivities((prev) => [...prev, createEmptyActivity()]);
  const removeActivity = (id: string) => setActivities((prev) => prev.filter((a) => a.id !== id));
  const updateActivity = (id: string, field: keyof Activity, value: string) => {
    setActivities((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
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

      const res = await fetch('/api/astana/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setMessage({ type: 'success', text: `${t.successUpload} ${file.name}` });
      fetchData();
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || t.failUpload });
    } finally {
      setUploading(null);
    }
  };

  const handleSubmitApplication = async () => {
    setSubmitting(true);
    setMessage(null);

    try {
        const res = await fetch('/api/astana/applications', {
            method: editingAppId ? 'PATCH' : 'POST',
            body: JSON.stringify({
              id: editingAppId || undefined,
              formData: { ...formData, individuals, activities },
              applicationType: 'aifc_registration',
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to submit application');
        }

        setMessage({ type: 'success', text: t.applicationSubmitted });
        setLastSubmittedAppId(data.application?.id || editingAppId);
        fetchData();
    } catch (err: any) {
        console.error(err);
        setMessage({ type: 'error', text: t.applicationError });
    } finally {
        setSubmitting(false);
    }
  };

  const isDocUploaded = (docId: string) => {
    return documents.some(doc => doc.doc_type === docId);
  };

  const inputClass = "block w-full border-b border-slate-300 focus:border-indigo-500 focus:outline-none px-2 py-1 bg-transparent sm:text-sm";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";

  if (!mounted) {
    return null;
  }

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

      {/* AIFC Registration Form */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t.formTitle}
              </h3>
          </div>
          <div className="p-8 space-y-8">

              {/* 1. Company Name */}
              <section>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.s1}</h4>
                  <div className="space-y-4">
                      {[1, 2, 3].map((n) => (
                        <div key={n}>
                            <label className={labelClass}>{t.nameOptionLabel} {n}:</label>
                            <input type="text" name={`name_en_${n}`} value={formData[`name_en_${n}`] || ''} onChange={handleInputChange} className={inputClass} />
                        </div>
                      ))}
                  </div>
              </section>

              {/* 2. Business Activity */}
              <section>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.s2}</h4>
                  <div className="space-y-4">
                      <div>
                          <label className={labelClass}>{t.activityType}:</label>
                          <select name="activity_type" value={formData.activity_type || ''} onChange={handleInputChange} className={inputClass}>
                              <option value=""></option>
                              <option value="non_regulated">{t.activityTypeNonRegulated}</option>
                              <option value="regulated">{t.activityTypeRegulated}</option>
                          </select>
                      </div>
                      <div>
                          <label className={labelClass}>{t.activityDesc}:</label>
                          <textarea name="activity_description" value={formData.activity_description || ''} onChange={handleInputChange} rows={2} className={inputClass} />
                      </div>
                      <div className="space-y-4">
                          {activities.map((act, idx) => {
                            const otherIdx = idx;
                            const activityLabel = idx === 0 ? t.mainActivityLabel : (activities.length > 2 ? `${t.otherActivityLabel} ${otherIdx}` : t.otherActivityLabel);
                            const pctLabel = idx === 0 ? t.mainActivityPct : (activities.length > 2 ? `${t.otherActivityPct} ${otherIdx}` : t.otherActivityPct);
                            return (
                              <div key={act.id} className="grid grid-cols-1 md:grid-cols-[1fr_180px_auto] gap-4 items-end">
                                  <div>
                                      <label className={labelClass}>{activityLabel}:</label>
                                      <ActivityCodeSearch
                                        value={act.code}
                                        onChange={(v) => updateActivity(act.id, 'code', v)}
                                        className={inputClass}
                                        placeholder={t.activityCodeSearchPlaceholder}
                                      />
                                  </div>
                                  <div>
                                      <label className={labelClass}>{pctLabel}:</label>
                                      <input type="text" value={act.percentage} onChange={(e) => updateActivity(act.id, 'percentage', e.target.value)} className={inputClass} />
                                  </div>
                                  {activities.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeActivity(act.id)}
                                      className="text-xs font-medium text-red-500 hover:text-red-700 h-8"
                                    >
                                      {t.remove}
                                    </button>
                                  )}
                              </div>
                            );
                          })}
                          <button
                            type="button"
                            onClick={addActivity}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                          >
                            + {t.addActivity}
                          </button>
                      </div>
                  </div>
              </section>

              {/* 3. Company Details */}
              <section>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.s3}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className={labelClass}>{t.legalEntityType}:</label>
                          <select name="legal_entity_type" value={formData.legal_entity_type || ''} onChange={handleInputChange} className={inputClass}>
                              <option value=""></option>
                              <option value="commercial">{t.commercial}</option>
                              <option value="non_commercial">{t.nonCommercial}</option>
                          </select>
                      </div>
                      <div>
                          <label className={labelClass}>{t.businessSize}:</label>
                          <select name="business_size" value={formData.business_size || ''} onChange={handleInputChange} className={inputClass}>
                              <option value=""></option>
                              <option value="small">{t.small}</option>
                              <option value="medium">{t.medium}</option>
                              <option value="large">{t.large}</option>
                          </select>
                      </div>
                      <div>
                          <label className={labelClass}>{t.expectedEmployees}:</label>
                          <input type="text" name="expected_employees" value={formData.expected_employees || ''} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                          <label className={labelClass}>{t.vatPayer}:</label>
                          <select name="vat_payer" value={formData.vat_payer || ''} onChange={handleInputChange} className={inputClass}>
                              <option value=""></option>
                              <option value="yes">{t.yes}</option>
                              <option value="no">{t.no}</option>
                          </select>
                      </div>
                  </div>
              </section>

              {/* 4. Registration Code Address */}
              <section>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.s4}</h4>
                  <div>
                      <label className={labelClass}>{t.registrationCodeAddress}:</label>
                      <input type="text" name="registration_code_address" value={formData.registration_code_address || ''} onChange={handleInputChange} className={inputClass} />
                  </div>
              </section>

              {/* 5. Corporate Structure — Individuals */}
              <section>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 border-b pb-2">{t.s5}</h4>
                  <p className="text-xs text-slate-500 mb-4">{t.s5Hint}</p>
                  <div className="space-y-6">
                      {individuals.map((person, idx) => (
                        <div key={person.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.person} {idx + 1}</span>
                                {individuals.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeIndividual(person.id)}
                                    className="text-xs font-medium text-red-500 hover:text-red-700"
                                  >
                                    {t.remove}
                                  </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className={labelClass}>{t.fullName}:</label>
                                    <input
                                      type="text"
                                      value={person.fullName}
                                      onChange={(e) => updateIndividual(person.id, 'fullName', e.target.value)}
                                      className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>{t.iin}:</label>
                                    <input
                                      type="text"
                                      value={person.iin}
                                      onChange={(e) => updateIndividual(person.id, 'iin', e.target.value)}
                                      className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>{t.contactEmail}:</label>
                                    <input
                                      type="email"
                                      value={person.email}
                                      onChange={(e) => updateIndividual(person.id, 'email', e.target.value)}
                                      className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>{t.contactPhone}:</label>
                                    <input
                                      type="text"
                                      value={person.phone}
                                      onChange={(e) => updateIndividual(person.id, 'phone', e.target.value)}
                                      className={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className={labelClass}>{t.roles}:</label>
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {ROLE_KEYS.map((role) => (
                                      <label key={role} className="flex items-center gap-1.5 text-sm text-slate-700">
                                          <input
                                            type="checkbox"
                                            checked={person.roles.includes(role)}
                                            onChange={() => toggleRole(person.id, role)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                          />
                                          {(t.roleLabels as any)[role]}
                                      </label>
                                    ))}
                                </div>
                            </div>
                            {person.roles.includes('shareholder') && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                      <label className={labelClass}>{t.sharesCount}:</label>
                                      <input
                                        type="text"
                                        value={person.shares}
                                        onChange={(e) => updateIndividual(person.id, 'shares', e.target.value)}
                                        className={inputClass}
                                      />
                                  </div>
                                  <div>
                                      <label className={labelClass}>{t.shareholdingPct}:</label>
                                      <input
                                        type="text"
                                        value={person.shareholding}
                                        onChange={(e) => updateIndividual(person.id, 'shareholding', e.target.value)}
                                        className={inputClass}
                                      />
                                  </div>
                              </div>
                            )}
                            <div className="mt-3 pt-3 border-t border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className={labelClass}>{t.resCountry}:</label>
                                        <input type="text" value={person.residenceCountry} onChange={(e) => updateIndividual(person.id, 'residenceCountry', e.target.value)} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t.resCity}:</label>
                                        <input type="text" value={person.residenceCity} onChange={(e) => updateIndividual(person.id, 'residenceCity', e.target.value)} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t.resStreet}:</label>
                                        <input type="text" value={person.residenceStreet} onChange={(e) => updateIndividual(person.id, 'residenceStreet', e.target.value)} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t.resBuilding}:</label>
                                        <input type="text" value={person.residenceBuilding} onChange={(e) => updateIndividual(person.id, 'residenceBuilding', e.target.value)} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t.resApartment}:</label>
                                        <input type="text" value={person.residenceApartment} onChange={(e) => updateIndividual(person.id, 'residenceApartment', e.target.value)} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t.resPostalCode}:</label>
                                        <input type="text" value={person.residencePostalCode} onChange={(e) => updateIndividual(person.id, 'residencePostalCode', e.target.value)} className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        </div>
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={addIndividual}
                    className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                  >
                    + {t.addPerson}
                  </button>
              </section>

              {/* 6. Share Capital */}
              <section>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.s6}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                          <label className={labelClass}>{t.shareClassName}:</label>
                          <input type="text" name="share_class_name" value={formData.share_class_name || ''} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                          <label className={labelClass}>{t.shareCurrency}:</label>
                          <select name="share_currency" value={formData.share_currency || ''} onChange={handleInputChange} className={inputClass}>
                              <option value=""></option>
                              <option value="USD">USD</option>
                              <option value="KZT">KZT</option>
                              <option value="EUR">EUR</option>
                          </select>
                      </div>
                      <div>
                          <label className={labelClass}>{t.votesPerShare}:</label>
                          <input type="text" name="votes_per_share" value={formData.votes_per_share || ''} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                          <label className={labelClass}>{t.nominalValue}:</label>
                          <input type="text" name="nominal_value" value={formData.nominal_value || ''} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                          <label className={labelClass}>{t.totalShares}:</label>
                          <input type="text" name="total_shares" value={formData.total_shares || ''} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                          <label className={labelClass}>{t.ownershipForm}:</label>
                          <select name="ownership_form" value={formData.ownership_form || ''} onChange={handleInputChange} className={inputClass}>
                              <option value=""></option>
                              <option value="private">{t.private}</option>
                              <option value="state">{t.state}</option>
                          </select>
                      </div>
                      <div className="md:col-span-2">
                          <label className={labelClass}>{t.totalShareCapital}:</label>
                          <input type="text" name="total_share_capital" value={formData.total_share_capital || ''} onChange={handleInputChange} className={inputClass} />
                      </div>
                  </div>
              </section>

              {/* 7. Contact */}
              <section>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">{t.s7}</h4>
                  <div>
                      <label className={labelClass}>{t.registeredEmail}:</label>
                      <input type="email" name="registered_email" value={formData.registered_email || ''} onChange={handleInputChange} className={inputClass} />
                  </div>
              </section>

              {/* Upload Section */}
              <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t.docsChecklist}</h4>
                  {message && (
                    <div className={`mb-6 p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                      message.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      <span className="text-sm font-medium">{message.text}</span>
                      {message.type === 'success' && lastSubmittedAppId && (
                        <Link
                          href={`/astana/print/${lastSubmittedAppId}`}
                          target="_blank"
                          className="text-sm font-bold text-indigo-700 hover:text-indigo-900 whitespace-nowrap inline-flex items-center gap-1"
                        >
                          {t.downloadSigningDoc} →
                        </Link>
                      )}
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                      {REQUIRED_DOCS.map((doc) => (
                        <div key={doc.id} className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input
                                  id={`chk-${doc.id}`}
                                  type="checkbox"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-50"
                                  checked={isDocUploaded(doc.id)}
                                  readOnly
                                />
                            </div>
                            <div className="text-sm">
                                <label htmlFor={`chk-${doc.id}`} className="font-medium text-slate-700">{doc.label}</label>
                                <p className="text-slate-500">{doc.desc}</p>
                            </div>
                        </div>
                      ))}
                  </div>

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

      {/* Submit Button */}
      <div className="flex justify-end items-center gap-4">
          {editingAppId && (
            <Link href="/astana/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-700">
              {t.cancelEdit}
            </Link>
          )}
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
                      {editingAppId ? t.updateApplication : t.submitApplication}
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

export default function AifcApplicationPage() {
  return (
    <Suspense fallback={null}>
      <AifcApplicationForm />
    </Suspense>
  );
}

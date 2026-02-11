import { supabaseAdmin } from "@/lib/supabase-admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DocumentActions } from "@/components/DocumentActions";
import { ApplicationStatus } from "@/components/ApplicationStatus";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function ClientDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/dubai");
  }

  const userRole = (session.user as any).role;
  if (userRole !== 'admin') {
      redirect("/dashboard");
  }

  const { userId } = await params;

  // Fetch client profile
  const { data: client, error: clientError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  // Labels mapping
  const fieldLabels: Record<string, string> = {
    'activities_1': 'Виды деятельности (1)',
    'activities_2': 'Виды деятельности (2)',
    'activities_3': 'Виды деятельности (3)',
    'countries': 'Страны деятельности',
    'company_name_1': 'Название компании (1)',
    'company_name_2': 'Название компании (2)',
    'company_name_3': 'Название компании (3)',
    'shareholders': 'Кол-во акционеров',
    'visas': 'Кол-во сотрудников для визы',
    'full_name': 'ФИО (как в паспорте)',
    'position': 'Должность',
    'passport': 'Паспорт (серия, номер)',
    'email': 'Email адрес',
    'contact_number': 'Контактный номер',
    'country': 'Страна',
    'address': 'Адрес проживания',
    'uae_visit': 'Были ли ранее в ОАЭ (Да/Нет)'
  };

  // Define the order of keys as they appear in the form
  const fieldOrder = [
    'activities_1', 'activities_2', 'activities_3', 'countries', // 1. General Info
    'company_name_1', 'company_name_2', 'company_name_3', // 2. Company Names
    'shareholders', 'visas', // 3. Structure
    'full_name', 'position', 'passport', 'email', 'contact_number', 'country', 'address', 'uae_visit' // 4. Person Data
  ];

  // Fetch latest application
  const { data: application } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // Helper to sort form data keys
  const sortedFormData = application?.form_data 
    ? Object.entries(application.form_data).sort((a, b) => {
        const indexA = fieldOrder.indexOf(a[0]);
        const indexB = fieldOrder.indexOf(b[0]);
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      })
    : [];

  if (clientError || !client) {
      // console.error("Client fetch error:", clientError); // Removing server-side console log that might cause hydration issues or just clutter
      return (
          <div className="p-8 text-center">
              <h3 className="text-xl font-bold text-slate-800">Client not found</h3>
              <p className="text-slate-500 mt-2">The requested client profile does not exist.</p>
              <div className="mt-4 p-4 bg-red-50 text-red-700 text-xs text-left rounded overflow-auto max-w-lg mx-auto">
                  <p><strong>Debug Info:</strong></p>
                  <p>User ID: {userId}</p>
                  <p>Error: {clientError ? JSON.stringify(clientError) : 'No error returned, but client is null'}</p>
              </div>
              <Link href="/admin" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
                  &larr; Back to Admin Panel
              </Link>
          </div>
      );
  }

  // Fetch client documents
  const { data: documents } = await supabaseAdmin
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  // Fetch latest application (removed duplicate fetch)
  // const { data: application } = await supabaseAdmin... (already fetched above)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
              <Link href="/admin" className="text-sm text-slate-500 hover:text-indigo-600 mb-2 inline-block">
                  &larr; Назад к списку
              </Link>
              <h2 className="text-2xl font-bold text-slate-900">{client.company_name || 'Название компании отсутствует'}</h2>
              <p className="text-slate-500">{client.full_name} • {client.email}</p>
          </div>
          <div className="flex gap-3">
              {application && <ApplicationStatus application={application} />}
          </div>
      </div>

      {/* Client Details Card */}
      <div className="bg-white shadow rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Детали клиента</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                  <dt className="text-sm font-medium text-slate-500">Телефон</dt>
                  <dd className="mt-1 text-sm text-slate-900">{client.phone || '-'}</dd>
              </div>
              <div>
                  <dt className="text-sm font-medium text-slate-500">Страна</dt>
                  <dd className="mt-1 text-sm text-slate-900">{client.country || '-'}</dd>
              </div>
              <div>
                  <dt className="text-sm font-medium text-slate-500">Зарегистрирован</dt>
                  <dd className="mt-1 text-sm text-slate-900">{new Date(client.created_at).toLocaleDateString()}</dd>
              </div>
          </dl>
      </div>

      {/* Application Data */}
      {application && (
        <div className="bg-white shadow rounded-lg p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-slate-900">Данные заявки</h3>
                <span className="text-xs text-slate-500">Отправлено: {new Date(application.created_at).toLocaleString()}</span>
            </div>
            
            <div className="bg-slate-50 rounded-md p-4 overflow-x-auto">
                {application.form_data && Object.keys(application.form_data).length > 0 ? (
                    <div className="space-y-6">
                        {/* 1. ОБЩАЯ ИНФОРМАЦИЯ */}
                        <section>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">1. ОБЩАЯ ИНФОРМАЦИЯ О ЗАЯВКЕ</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Виды деятельности</dt>
                                    <dd className="text-sm text-slate-900 space-y-1">
                                        <p>1. {application.form_data['activities_1'] || '-'}</p>
                                        <p>2. {application.form_data['activities_2'] || '-'}</p>
                                        <p>3. {application.form_data['activities_3'] || '-'}</p>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Страны деятельности</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['countries'] || '-'}</dd>
                                </div>
                            </div>
                        </section>

                        {/* 2. НАЗВАНИЯ КОМПАНИИ */}
                        <section>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">2. ВАРИАНТЫ НАЗВАНИЯ КОМПАНИИ</h4>
                            <div className="space-y-1">
                                <p className="text-sm text-slate-900"><span className="text-slate-500 w-4 inline-block">1.</span> {application.form_data['company_name_1'] || '-'}</p>
                                <p className="text-sm text-slate-900"><span className="text-slate-500 w-4 inline-block">2.</span> {application.form_data['company_name_2'] || '-'}</p>
                                <p className="text-sm text-slate-900"><span className="text-slate-500 w-4 inline-block">3.</span> {application.form_data['company_name_3'] || '-'}</p>
                            </div>
                        </section>

                        {/* 3. СТРУКТУРА КОМПАНИИ */}
                        <section>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">3. СТРУКТУРА КОМПАНИИ</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Кол-во акционеров</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['shareholders'] || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Кол-во сотрудников для визы</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['visas'] || '-'}</dd>
                                </div>
                            </div>
                        </section>

                        {/* 4. ДАННЫЕ СОТРУДНИКА */}
                        <section>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">4. ДАННЫЕ СОТРУДНИКА / УПОЛНОМОЧЕННОГО ЛИЦА</h4>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">ФИО (как в паспорте)</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['full_name'] || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Должность</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['position'] || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Паспорт (серия, номер)</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['passport'] || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email адрес</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['email'] || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Контактный номер</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['contact_number'] || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Страна</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['country'] || '-'}</dd>
                                </div>
                                <div className="md:col-span-2">
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Адрес проживания</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['address'] || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Были ли ранее в ОАЭ</dt>
                                    <dd className="text-sm text-slate-900">{application.form_data['uae_visit'] || '-'}</dd>
                                </div>
                            </dl>
                        </section>
                    </div>
                ) : (
                    <p className="text-sm text-slate-500 italic">Нет данных формы.</p>
                )}
            </div>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-medium text-slate-900">Загруженные документы</h3>
          </div>
          
          {!documents || documents.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                  Документы пока не загружены.
              </div>
          ) : (
              <ul className="divide-y divide-slate-200">
                  {documents.map((doc) => (
                      <li key={doc.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
                          <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                              </div>
                              <div>
                                  <p className="text-sm font-medium text-slate-900">{doc.file_name}</p>
                                  <p className="text-xs text-slate-500">
                                      {doc.doc_type} • {new Date(doc.created_at).toLocaleString()}
                                  </p>
                              </div>
                          </div>
                          
                          <DocumentActions doc={doc} />
                      </li>
                  ))}
              </ul>
          )}
      </div>
    </div>
  );
}

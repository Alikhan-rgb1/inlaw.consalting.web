import { supabaseAdmin } from "@/lib/supabase-admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DocumentActions } from "@/components/DocumentActions";
import { ApplicationStatus } from "@/components/ApplicationStatus";
import { AstanaApplicationSummary } from "@/components/AstanaApplicationSummary";
import { PostRegistrationSummary, CHANGE_TYPE_LABELS_RU, REQUIRED_DOCS_PR } from "@/components/PostRegistrationSummary";
import { AdminApplicationResults } from "@/components/AdminApplicationResults";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
  searchParams: Promise<{
    applicationId?: string;
  }>;
}

const DOC_TYPE_LABELS_RU: Record<string, string> = {
  id_document: 'Удостоверение личности / паспорт',
  no_criminal_record_cn: 'Справка о несудимости (Китай)',
  signed_resolution: 'Подписанная резолюция',
  other_documents: 'Прочие документы',
  passport: 'Копия паспорта',
  passport_cover: 'Фото корочки паспорта',
  photo_white: 'Фото на белом фоне',
  visa_copy: 'Копия визы/штампа',
};

export default async function ClientDetailPage({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/dubai");
  }

  const userRole = (session.user as any).role;
  if (userRole !== 'admin') {
      redirect("/dashboard");
  }

  const { userId } = await params;
  const { applicationId } = await searchParams;

  // Fetch client profile
  const { data: client, error: clientError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  // Fetch all applications for this client
  const { data: allApplications } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  // If a specific application was requested (from the admin list "Подробнее" link),
  // scope the view down to just that one instead of showing every application.
  const applications = applicationId
    ? (allApplications || []).filter((a) => a.id === applicationId)
    : allApplications;

  const application = applications?.[0] || null;

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
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900">{client.company_name || 'Название компании отсутствует'}</h2>
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  client.office === 'astana' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {client.office === 'astana' ? 'Астана' : 'Дубай'}
                </span>
              </div>
              <p className="text-slate-500">{client.full_name} • {client.email}</p>
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

      {/* Applications */}
      {applications && applications.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-slate-900">
              {applicationId ? 'Заявка' : `Заявки (${applications.length})`}
            </h3>
            {applicationId && (allApplications?.length || 0) > 1 && (
              <Link href={`/admin/${userId}`} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                Показать все заявки клиента ({allApplications!.length}) →
              </Link>
            )}
          </div>
          {applications.map((app) => {
            return (
              <div key={app.id} className="bg-white shadow rounded-lg p-6 border border-slate-200">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          app.office === 'astana' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {app.office === 'astana' ? 'Астана' : 'Дубай'}
                        </span>
                        <span className="text-xs text-slate-500">Отправлено: {new Date(app.created_at).toLocaleString()}</span>
                        {app.office === 'astana' && app.application_type === 'post_registration_change' && (
                          <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-slate-100 text-slate-600">
                            Пострегистрационные изменения
                          </span>
                        )}
                        {app.office === 'astana' && app.application_type !== 'post_registration_change' && (
                          <Link
                            href={`/astana/print/${app.id}`}
                            target="_blank"
                            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
                          >
                            Документ для подписания →
                          </Link>
                        )}
                      </div>
                      <ApplicationStatus application={app} />
                  </div>

                  <div className="bg-slate-50 rounded-md p-4 overflow-x-auto mb-4">
                      {app.form_data && Object.keys(app.form_data).length > 0 ? (
                          app.office === 'astana' ? (
                            app.application_type === 'post_registration_change' ? (
                              <PostRegistrationSummary formData={app.form_data} />
                            ) : (
                              <AstanaApplicationSummary formData={app.form_data} />
                            )
                          ) : (
                          <div className="space-y-6">
                              {/* 1. ОБЩАЯ ИНФОРМАЦИЯ */}
                              <section>
                                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">1. ОБЩАЯ ИНФОРМАЦИЯ О ЗАЯВКЕ</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Виды деятельности</dt>
                                          <dd className="text-sm text-slate-900 space-y-1">
                                              <p>1. {app.form_data['activities_1'] || '-'}</p>
                                              <p>2. {app.form_data['activities_2'] || '-'}</p>
                                              <p>3. {app.form_data['activities_3'] || '-'}</p>
                                          </dd>
                                      </div>
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Страны деятельности</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['countries'] || '-'}</dd>
                                      </div>
                                  </div>
                              </section>

                              {/* 2. НАЗВАНИЯ КОМПАНИИ */}
                              <section>
                                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">2. ВАРИАНТЫ НАЗВАНИЯ КОМПАНИИ</h4>
                                  <div className="space-y-1">
                                      <p className="text-sm text-slate-900"><span className="text-slate-500 w-4 inline-block">1.</span> {app.form_data['company_name_1'] || '-'}</p>
                                      <p className="text-sm text-slate-900"><span className="text-slate-500 w-4 inline-block">2.</span> {app.form_data['company_name_2'] || '-'}</p>
                                      <p className="text-sm text-slate-900"><span className="text-slate-500 w-4 inline-block">3.</span> {app.form_data['company_name_3'] || '-'}</p>
                                  </div>
                              </section>

                              {/* 3. СТРУКТУРА КОМПАНИИ */}
                              <section>
                                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">3. СТРУКТУРА КОМПАНИИ</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Кол-во акционеров</dt>
                                            <dd className="text-sm text-slate-900">{app.form_data['shareholders'] || '-'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Кол-во сотрудников для визы</dt>
                                            <dd className="text-sm text-slate-900">{app.form_data['visas'] || '-'}</dd>
                                        </div>
                                    </div>
                              </section>

                              {/* 4. ДАННЫЕ СОТРУДНИКА */}
                              <section>
                                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">4. ДАННЫЕ СОТРУДНИКА / УПОЛНОМОЧЕННОГО ЛИЦА</h4>
                                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">ФИО (как в паспорте)</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['full_name'] || '-'}</dd>
                                      </div>
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Должность</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['position'] || '-'}</dd>
                                      </div>
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Паспорт (серия, номер)</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['passport'] || '-'}</dd>
                                      </div>
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email адрес</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['email'] || '-'}</dd>
                                      </div>
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Контактный номер</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['contact_number'] || '-'}</dd>
                                      </div>
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Страна</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['country'] || '-'}</dd>
                                      </div>
                                      <div className="md:col-span-2">
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Адрес проживания</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['address'] || '-'}</dd>
                                      </div>
                                      <div>
                                          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Были ли ранее в ОАЭ</dt>
                                          <dd className="text-sm text-slate-900">{app.form_data['uae_visit'] || '-'}</dd>
                                      </div>
                                  </dl>
                              </section>
                          </div>
                          )
                      ) : (
                          <p className="text-sm text-slate-500 italic">Нет данных формы.</p>
                      )}
                  </div>

                  {app.office === 'astana' && app.application_type === 'post_registration_change' && app.form_data && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4">
                        <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3">Информация для менеджера</h4>
                        <div className="mb-3">
                            <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1.5">Выбранные изменения</p>
                            <div className="flex flex-wrap gap-1.5">
                                {(Array.isArray(app.form_data.changeTypes) ? app.form_data.changeTypes : []).map((c: string) => (
                                    <span key={c} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-white text-indigo-700 border border-indigo-200">
                                        {CHANGE_TYPE_LABELS_RU[c] || c}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1.5">Документы</p>
                            <ul className="space-y-1">
                                {REQUIRED_DOCS_PR.map((doc) => {
                                    const uploaded = (documents || []).some((d) => d.doc_type === doc.id && d.uploaded_by !== 'admin');
                                    return (
                                        <li key={doc.id} className="text-sm flex items-center gap-2">
                                            <span className={uploaded ? 'text-green-600' : 'text-slate-400'}>{uploaded ? '✓' : '○'}</span>
                                            <span className={uploaded ? 'text-slate-800' : 'text-slate-400'}>{doc.label}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      )}

      {/* Documents List (client-submitted KYC documents) */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-medium text-slate-900">Документы клиента</h3>
          </div>

          {(() => {
            const clientDocs = (documents || []).filter((d) => d.uploaded_by !== 'admin');
            if (clientDocs.length === 0) {
              return (
                <div className="p-8 text-center text-slate-500">
                    Документы пока не загружены.
                </div>
              );
            }
            return (
              <ul className="divide-y divide-slate-200">
                  {clientDocs.map((doc) => (
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
                                      {DOC_TYPE_LABELS_RU[doc.doc_type] || doc.doc_type} • {new Date(doc.created_at).toLocaleString()}
                                  </p>
                              </div>
                          </div>

                          <DocumentActions doc={doc} />
                      </li>
                  ))}
              </ul>
            );
          })()}
      </div>

      {/* Documents from INLAW (admin-uploaded results, per application) */}
      {applications && applications.length > 0 && (
        <div className="space-y-6">
          {applications.map((app) => {
            const resultDocs = (documents || []).filter(
              (d) => d.application_id === app.id && d.uploaded_by === 'admin'
            );
            return (
              <div key={app.id}>
                  {applications.length > 1 && (
                    <p className="text-xs text-slate-500 mb-2">
                        Заявка от {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  )}
                  <AdminApplicationResults userId={userId} applicationId={app.id} documents={resultDocs} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

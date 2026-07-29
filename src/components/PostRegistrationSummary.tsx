export const CHANGE_TYPE_LABELS_RU: Record<string, string> = {
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
};

export const REQUIRED_DOCS_PR = [
  { id: 'pr_change_document', label: 'Документ, подтверждающий изменение' },
  { id: 'pr_identity_document', label: 'Документ, удостоверяющий личность (при необходимости)' },
  { id: 'pr_additional_documents', label: 'Дополнительные документы' },
  { id: 'pr_other_files', label: 'Иные файлы' },
];

function Field({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</dt>
      <dd className="text-sm text-slate-900">{value || '-'}</dd>
    </div>
  );
}

export function PostRegistrationSummary({ formData }: { formData: any }) {
  const changeTypes: string[] = Array.isArray(formData.changeTypes) ? formData.changeTypes : [];
  const ubos: any[] = Array.isArray(formData.ubos) ? formData.ubos : [];

  const has = (key: string) => changeTypes.includes(key);

  return (
    <div className="space-y-6">
      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">1. Информация о компании</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Наименование компании" value={formData.company_name} />
          <Field label="Регистрационный номер AIFC" value={formData.aifc_registration_number} />
          <Field label="БИН" value={formData.bin} />
          <Field label="Контактное лицо" value={formData.contact_person} />
          <Field label="Email" value={formData.contact_email} />
          <Field label="Телефон" value={formData.contact_phone} />
        </div>
      </section>

      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">2. Что изменилось</h4>
        {changeTypes.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Не указано.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {changeTypes.map((c) => (
              <span key={c} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                {CHANGE_TYPE_LABELS_RU[c] || c}
              </span>
            ))}
          </div>
        )}
      </section>

      {has('director') && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Директор</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Имя" value={formData.director_first_name} />
            <Field label="Фамилия" value={formData.director_last_name} />
            <Field label="Дата рождения" value={formData.director_dob} />
            <Field label="Гражданство" value={formData.director_citizenship} />
            <Field label="Страна проживания" value={formData.director_residence_country} />
            <Field label="Адрес проживания" value={formData.director_residence_address} />
            <Field label="Email" value={formData.director_email} />
            <Field label="Телефон" value={formData.director_phone} />
            <Field label="Номер паспорта" value={formData.director_passport_number} />
            <Field label="Дата назначения" value={formData.director_appointment_date} />
          </div>
        </section>
      )}

      {has('legal_address') && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Юридический адрес</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Новый юридический адрес" value={formData.new_legal_address} />
            <Field label="Дата изменения" value={formData.legal_address_change_date} />
          </div>
        </section>
      )}

      {has('share_transfer') && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Передача акций</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Передающий акционер (ФЛ/ЮЛ)" value={formData.transferring_shareholder} />
            <Field label="Получатель акций (ФЛ/ЮЛ)" value={formData.recipient_shareholder} />
            <Field label="Количество акций или доля (%)" value={formData.shares_or_percentage} />
            <Field label="Дата передачи" value={formData.transfer_date} />
          </div>
        </section>
      )}

      {has('ubo') && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Конечный бенефициар (UBO)</h4>
          {ubos.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Не указаны.</p>
          ) : (
            <div className="space-y-3">
              {ubos.map((u, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="text-sm font-bold text-slate-900">{u.fullName || `UBO ${i + 1}`}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700 mt-1">
                    <p>Дата рождения: {u.dob || '-'}</p>
                    <p>Гражданство: {u.citizenship || '-'}</p>
                    <p>Страна проживания: {u.residenceCountry || '-'}</p>
                    <p>Адрес: {u.address || '-'}</p>
                    <p>Тип владения: {u.ownershipType === 'direct' ? 'Direct' : u.ownershipType === 'indirect' ? 'Indirect' : '-'}</p>
                    <p>Размер доли: {u.ownershipPercentage ? `${u.ownershipPercentage}%` : '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {has('main_activity') && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Основной вид деятельности</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Новый основной вид деятельности" value={formData.new_main_activity} />
            <Field label="Дата изменения" value={formData.activity_change_date} />
            <div className="md:col-span-2">
              <Field label="Описание деятельности" value={formData.activity_description} />
            </div>
          </div>
        </section>
      )}

      {has('share_capital') && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Уставный капитал</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Новый размер капитала" value={formData.new_capital_amount} />
            <Field label="Количество акций" value={formData.capital_shares_count} />
            <Field label="Номинальная стоимость" value={formData.capital_nominal_value} />
          </div>
        </section>
      )}

      {has('auditor') && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Аудитор</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Наименование аудитора" value={formData.auditor_name} />
            <Field label="Дата назначения" value={formData.auditor_appointment_date} />
            <Field label="Контактные данные" value={formData.auditor_contact_details} />
          </div>
        </section>
      )}

      {has('extract') && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Получение выписки</h4>
          <Field label="Тип выписки" value={formData.extract_type === 'electronic' ? 'Электронная' : formData.extract_type === 'paper' ? 'Бумажная' : ''} />
        </section>
      )}

      {formData.comment && (
        <section>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">Комментарий</h4>
          <p className="text-sm text-slate-700 whitespace-pre-wrap">{formData.comment}</p>
        </section>
      )}
    </div>
  );
}

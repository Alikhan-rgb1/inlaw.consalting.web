export const ROLE_LABELS_RU: Record<string, string> = {
  director: 'Директор',
  secretary: 'Секретарь',
  authorised_signatory: 'Уполномоченное лицо',
  ceo: 'CEO',
  shareholder: 'Акционер',
  ubo: 'Конечный бенефициарный владелец',
};

export const YES_NO_RU: Record<string, string> = { yes: 'Да', no: 'Нет' };

function Field({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</dt>
      <dd className="text-sm text-slate-900">{value || '-'}</dd>
    </div>
  );
}

export function AstanaApplicationSummary({ formData }: { formData: any }) {
  const individuals: any[] = Array.isArray(formData.individuals) ? formData.individuals : [];
  const activities: any[] = Array.isArray(formData.activities) ? formData.activities : [];

  return (
    <div className="space-y-6">
      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">1. Название компании</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <Field key={n} label={`Вариант ${n}`} value={formData[`name_en_${n}`]} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">2. Вид деятельности</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <Field label="Тип деятельности" value={formData.activity_type === 'regulated' ? 'Регулируемая' : formData.activity_type === 'non_regulated' ? 'Нерегулируемая' : ''} />
          <Field label="Описание" value={formData.activity_description} />
        </div>
        {activities.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Не указаны.</p>
        ) : (
          <div className="space-y-2">
            {activities.map((act, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={i === 0 ? 'Основной вид деятельности' : `Дополнительный вид деятельности ${activities.length > 2 ? i : ''}`.trim()} value={act.code} />
                <Field label={i === 0 ? 'Доля основного вида деятельности (%)' : `Доля дополнительного вида деятельности ${activities.length > 2 ? i : ''}`.trim() + ' (%)'} value={act.percentage} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">3. Данные о компании</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Тип юр. лица" value={formData.legal_entity_type === 'commercial' ? 'Коммерческое' : formData.legal_entity_type === 'non_commercial' ? 'Некоммерческое' : ''} />
          <Field label="Размер бизнеса" value={formData.business_size} />
          <Field label="Кол-во сотрудников" value={formData.expected_employees} />
          <Field label="Плательщик НДС" value={YES_NO_RU[formData.vat_payer] || ''} />
        </div>
      </section>

      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">4. Регистрационный код адреса</h4>
        <Field label="Registration Code Address" value={formData.registration_code_address} />
      </section>

      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">5. Сотрудники (физические лица)</h4>
        {individuals.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Не указаны.</p>
        ) : (
          <div className="space-y-3">
            {individuals.map((person, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
                <p className="text-sm font-bold text-slate-900">{person.fullName || `Человек ${i + 1}`}</p>
                <p className="text-xs text-slate-500 mb-2">
                  {(person.roles || []).map((r: string) => ROLE_LABELS_RU[r] || r).join(', ') || '-'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                  <p>ИИН: {person.iin || '-'}</p>
                  <p>Email: {person.email || '-'}</p>
                  <p>Телефон: {person.phone || '-'}</p>
                  {person.roles?.includes('shareholder') && (
                    <>
                      <p>Кол-во акций: {person.shares || '-'}</p>
                      <p>Доля владения: {person.shareholding ? `${person.shareholding}%` : '-'}</p>
                    </>
                  )}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Адрес проживания</p>
                  <p className="text-sm text-slate-700">
                    {[person.residenceCountry, person.residenceCity, person.residenceStreet, person.residenceBuilding, person.residenceApartment, person.residencePostalCode]
                      .filter(Boolean)
                      .join(', ') || '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">6. Уставный капитал</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Класс акций" value={formData.share_class_name} />
          <Field label="Валюта" value={formData.share_currency} />
          <Field label="Голосов на акцию" value={formData.votes_per_share} />
          <Field label="Номинал акции" value={formData.nominal_value} />
          <Field label="Всего акций" value={formData.total_shares} />
          <Field label="Форма собственности" value={formData.ownership_form === 'private' ? 'Частная' : formData.ownership_form === 'state' ? 'Государственная' : ''} />
          <Field label="Сумма уставного капитала" value={formData.total_share_capital} />
        </div>
      </section>

      <section>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">7. Контакт для AFSA</h4>
        <Field label="Зарегистрированный email" value={formData.registered_email} />
      </section>
    </div>
  );
}

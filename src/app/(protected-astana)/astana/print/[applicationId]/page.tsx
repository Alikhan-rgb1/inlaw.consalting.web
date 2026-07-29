import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { AstanaApplicationSummary } from "@/components/AstanaApplicationSummary";
import PrintButton from "@/components/PrintButton";

interface PageProps {
  params: Promise<{
    applicationId: string;
  }>;
}

export default async function AstanaPrintPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { applicationId } = await params;

  const { data: application } = await supabaseAdmin
    .from('applications')
    .select('*, profiles(id, full_name, company_name, email)')
    .eq('id', applicationId)
    .eq('office', 'astana')
    .single();

  if (!application) {
    notFound();
  }

  const currentUserId = (session?.user as any)?.id;
  const isAdmin = (session?.user as any)?.role === 'admin';
  const isOwner = application.user_id === currentUserId;

  if (!isOwner && !isAdmin) {
    redirect("/astana/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto py-6 print:py-0">
      <PrintButton />

      <div className="bg-white border border-slate-200 rounded-xl p-8 print:border-0 print:p-0 print:rounded-none">
        <div className="text-center mb-8 pb-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">AIFC COMPANY REGISTRATION FORM</h1>
          <p className="text-sm text-slate-500 mt-1">
            {application.profiles?.company_name || application.profiles?.full_name}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Заявка от {new Date(application.created_at).toLocaleDateString()}
          </p>
        </div>

        <AstanaApplicationSummary formData={application.form_data} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm text-slate-500 mb-12">Подпись клиента</p>
            <div className="border-t border-slate-400 pt-2 text-sm text-slate-700">
              {application.profiles?.full_name || ''}
            </div>
            <p className="text-xs text-slate-400 mt-1">Дата: _______________</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-12">Подпись партнёра (INLAW)</p>
            <div className="border-t border-slate-400 pt-2 text-sm text-slate-700">&nbsp;</div>
            <p className="text-xs text-slate-400 mt-1">Дата: _______________</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-500">
          Подписывая настоящий документ, стороны подтверждают, что все указанные выше данные являются полными и достоверными.
        </p>
      </div>
    </div>
  );
}

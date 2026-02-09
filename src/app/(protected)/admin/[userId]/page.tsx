import { supabaseAdmin } from "@/lib/supabase-admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DocumentActions } from "@/components/DocumentActions";

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
              <Link href="/admin" className="text-sm text-slate-500 hover:text-indigo-600 mb-2 inline-block">
                  &larr; Back to List
              </Link>
              <h2 className="text-2xl font-bold text-slate-900">{client.company_name || 'No Company Name'}</h2>
              <p className="text-slate-500">{client.full_name} • {client.email}</p>
          </div>
          <div className="flex gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  client.case_status === 'Done' ? 'bg-green-100 text-green-800' :
                  client.case_status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
              }`}>
                  {client.case_status || 'New'}
              </span>
          </div>
      </div>

      {/* Client Details Card */}
      <div className="bg-white shadow rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Client Details</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                  <dt className="text-sm font-medium text-slate-500">Phone</dt>
                  <dd className="mt-1 text-sm text-slate-900">{client.phone || '-'}</dd>
              </div>
              <div>
                  <dt className="text-sm font-medium text-slate-500">Country</dt>
                  <dd className="mt-1 text-sm text-slate-900">{client.country || '-'}</dd>
              </div>
              <div>
                  <dt className="text-sm font-medium text-slate-500">Registered At</dt>
                  <dd className="mt-1 text-sm text-slate-900">{new Date(client.created_at).toLocaleDateString()}</dd>
              </div>
          </dl>
      </div>

      {/* Documents List */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-medium text-slate-900">Submitted Documents</h3>
          </div>
          
          {!documents || documents.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                  No documents submitted yet.
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

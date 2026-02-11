import { supabaseAdmin } from "@/lib/supabase-admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/dubai");
  }

  // Check role
  const userRole = (session.user as any).role;
  if (userRole !== 'admin') {
      redirect("/dashboard");
  }

  // Fetch applications instead of profiles
  const { data: applications, error } = await supabaseAdmin
    .from('applications')
    .select('*, profiles!inner(id, full_name, company_name, email, phone, country)')
    .order('created_at', { ascending: false });

  // If table doesn't exist or error, fall back to storage listing (backward compatibility)
  let storageFolders: any[] = [];
  if (error) {
     console.warn("Could not fetch applications (table might be missing), falling back to storage folders:", error.message);
     const { data } = await supabaseAdmin.storage.from('client-documents').list();
     storageFolders = data || [];
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold leading-6 text-slate-900">Админ Панель</h3>
            <p className="mt-1 text-sm text-slate-500">
              Управление клиентами офиса в Дубае и документами.
            </p>
          </div>
          <div className="bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 text-xs font-semibold">
             Режим администратора
          </div>
        </div>

        {error && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Database table 'profiles' not found. Showing raw storage folders instead.
                            <br/>
                            <span className="font-mono text-xs">Run the SQL script from supabase_setup.sql in your Supabase Dashboard.</span>
                        </p>
                    </div>
                </div>
            </div>
        )}

        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-slate-300">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Компания / Имя</th>
                <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Контакты</th>
                <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Статус</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Действия</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {/* Render Applications if available */}
              {applications && applications.length > 0 ? (
                applications.map((app: any) => (
                  <tr key={app.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="font-medium text-slate-900">{app.profiles?.company_name || 'N/A'}</div>
                      <div className="text-slate-500">{app.profiles?.full_name}</div>
                      {/* Mobile Only Info */}
                      <div className="sm:hidden text-xs text-slate-400 mt-1">
                          {app.profiles?.email}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                      <div className="text-slate-900">{app.profiles?.email}</div>
                      <div className="text-slate-500">{app.profiles?.phone}</div>
                      <div className="text-xs text-slate-400">{app.profiles?.country}</div>
                    </td>
                    <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        app.status === 'Done' ? 'bg-green-100 text-green-800' :
                        app.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status === 'New' ? 'Новый' :
                         app.status === 'In Progress' ? 'В рассмотрении' :
                         app.status === 'Done' ? 'Одобрено' :
                         app.status === 'Rejected' ? 'Отклонено' : app.status}
                      </span>
                      <div className="text-xs text-slate-400 mt-1">
                        {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                       <Link href={`/admin/${app.profiles.id}`} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                         Подробнее
                       </Link>
                    </td>
                  </tr>
                ))
              ) : storageFolders.length > 0 ? (
                /* Fallback: Render Storage Folders */
                storageFolders.map((folder) => (
                    <tr key={folder.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-slate-900">{folder.name}</div>
                        <div className="text-slate-500 text-xs">(Folder Name)</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        -
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                          Storage Only
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                         <span className="text-indigo-600 cursor-pointer">View</span>
                      </td>
                    </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={4} className="py-8 text-center text-sm text-slate-500">
                        Клиенты не найдены.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

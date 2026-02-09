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

  // Fetch users from the 'profiles' table
  // This requires the 'profiles' table to be set up in Supabase
  const { data: clients, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  // If table doesn't exist or error, fall back to storage listing (backward compatibility)
  let storageFolders: any[] = [];
  if (error) {
     console.warn("Could not fetch profiles (table might be missing), falling back to storage folders:", error.message);
     const { data } = await supabaseAdmin.storage.from('client-documents').list();
     storageFolders = data || [];
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold leading-6 text-slate-900">Admin Panel</h3>
            <p className="mt-1 text-sm text-slate-500">
              Manage Dubai Office clients and documents.
            </p>
          </div>
          <div className="bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 text-xs font-semibold">
             Admin Mode
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
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Company / Name</th>
                <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Contact Info</th>
                <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Status</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {/* Render Profiles if available */}
              {clients && clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="font-medium text-slate-900">{client.company_name || 'N/A'}</div>
                      <div className="text-slate-500">{client.full_name}</div>
                      {/* Mobile Only Info */}
                      <div className="sm:hidden text-xs text-slate-400 mt-1">
                          {client.email}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                      <div className="text-slate-900">{client.email}</div>
                      <div className="text-slate-500">{client.phone}</div>
                      <div className="text-xs text-slate-400">{client.country}</div>
                    </td>
                    <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                       {client.id ? (
                          <Link href={`/admin/${client.id}`} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            View Files
                          </Link>
                       ) : (
                          <span className="text-gray-400 cursor-not-allowed" title="No ID available">View Files</span>
                       )}
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
                        No clients found.
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

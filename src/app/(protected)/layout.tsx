import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Providers } from "@/components/Providers";
import LogoutButton from "@/components/LogoutButton";
import "../(website)/globals.css";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/dubai");
  }

  // Check role
  const userRole = (session.user as any).role;
  const isAdmin = userRole === 'admin';

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Providers>
            <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-18"> {/* Reduced height from h-20 to h-18 */}
                        <div className="flex items-center gap-8"> {/* Reduced gap */}
                            {/* Logo */}
                            <Link href="/dashboard" className="flex items-center gap-3 group">
                                <div className="relative overflow-hidden rounded-full shadow-sm border border-slate-100 group-hover:shadow-md transition-all duration-300 w-10 h-10"> {/* Reduced logo size */}
                                    <Image
                                        src="/logo.png"
                                        alt="Inlaw.kz Logo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="hidden sm:block text-[9px] font-bold text-slate-500 leading-tight uppercase tracking-[0.2em] mb-0.5 transition-opacity">
                                        Company Service Provider 
                                    </span>
                                    <span className="font-bold text-slate-900 leading-none tracking-tight transition-all duration-300 text-lg"> {/* Reduced text size */}
                                        INLAW inc LTD. 
                                    </span>
                                </div>
                            </Link>
                            
                            {/* Navigation */}
                            <div className="flex items-center gap-1">
                                {isAdmin && (
                                  <Link 
                                    href="/admin" 
                                    className="px-4 py-1.5 text-xs sm:text-sm font-medium text-indigo-600 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-all duration-200 border border-indigo-100 whitespace-nowrap"
                                  >
                                      Admin Panel
                                  </Link>
                                )}
                            </div>
                        </div>
                        
                        {/* User Profile */}
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900">{session.user?.name}</p>
                                <div className="flex items-center justify-end gap-1.5">
                                    <div className={`h-1.5 w-1.5 rounded-full ${isAdmin ? 'bg-indigo-500' : 'bg-green-500'}`}></div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                                        {isAdmin ? 'Administrator' : 'Client Account'}
                                    </p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </nav>
            <main className="py-10 pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </Providers>
      </body>
    </html>
  );
}

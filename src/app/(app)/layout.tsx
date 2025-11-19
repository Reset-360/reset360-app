'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/services/authService';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import useAuthStore from '@/store/AuthState';
import { useRoleRedirect } from '@/hooks/useRoleRedirect';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const router = useRouter();
  const user = useAuthStore(state => state.user);
  const { redirectByRole } = useRoleRedirect();

  useEffect(() => {
    console.log('isauth', isAuthenticated());
    if (isAuthenticated()) {
      redirectByRole(user?.role);
    } else {
      router.replace('/login');
    }
  }, [router, redirectByRole, user?.role]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`bg-[url('/images/background.png')] bg-cover bg-center`}>
      <SidebarProvider>
        <AppSidebar />

        {/* Main Content */}
        <main className="w-full p-5">
          <SidebarTrigger className='hover:bg-primary!' />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

'use client';

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import useAuthStore from '@/store/AuthState';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore(state => state.user);

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

'use client';

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import useAuthStore from '@/store/AuthState';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import AvatarMenu from '@/components/layout/navigation/AvatarMenu';

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore((state) => state.user);

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
          <header className="z-50 h-16">
            <div className="relative flex h-full items-center justify-between gap-3 sm:gap-4 after:absolute after:inset-0 after:-z-10 after:bg-background/20 after:backdrop-blur-lg">
              <SidebarTrigger variant="outline" className="max-md:scale-125" />
              <AvatarMenu />
            </div>
          </header>

          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

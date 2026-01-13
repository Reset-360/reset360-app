'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { logoutUser } from '@/services/authService';
import useAuthStore from '@/store/AuthState';
import useEntitlementStore from '@/store/EntitlementState';
import useQuizStore from '@/store/QuizState';
import {
  Calendar,
  Home,
  Inbox,
  LogOutIcon,
  Search,
  Settings,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const resetQuiz = useQuizStore(state => state.resetQuiz);
  const resetEntitlement = useEntitlementStore((s) => s.resetEntitlement);

  // 🔒 Logging out user and redirecting to login, regardless of outcome
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('🚫 Logout request failed:', error);
    }

    clearUser(); // 🧹 Clear user data from local state
    resetQuiz(); // 🧹 Clear quiz state
    resetEntitlement(); // 🧹 Clear entitlement state
console.log('logged out')
    router.replace('/login'); // 🚪 Redirect to login page
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center">
            <SidebarMenuButton
              asChild
              className="mt-5 hover:bg-transparent! group-data-[collapsible=icon]:p-0!"
              disabled
            >
              <div>
                <Image
                  src="/logo/logo_32.png"
                  alt="Reset 360 Logo"
                  width={32}
                  height={32}
                />
                <span className="font-main font-bold text-primary text-xl">
                  Reset 360
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={logout}>
                <LogOutIcon />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

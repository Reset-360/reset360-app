'use client';

import { useCallback, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import useAuthStore from '@/store/AuthState';
import useLogout from '@/hooks/useLogout';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clientMenuItems } from '@/constants/menu';
import clsx from 'clsx';

export default function TopNav() {
  const identity = useAuthStore((state) => state.profile);
  const logout = useLogout();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleToggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <header className="container mx-auto h-16 flex items-center px-4 justify-between">
      <Link
        href="/client/dashboard"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-1"
      >
        <Image
          src="/logo/logo_full_250.png"
          alt="Reset 360 Logo"
          width={130}
          height={50}
        />
      </Link>

      <div className="flex rounded-full bg-primary/30 py-1 px-1 gap-1">
        {clientMenuItems.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={clsx(
              'group relative text-sm font-medium flex items-center gap-1 rounded-full px-5 py-1 transition-all',
              'hover:bg-white/10 hover:text-white',
              pathname === menu.href ? 'bg-primary/50 text-white' : ''
            )}
          >
            <menu.icon className="h-4 w-4" />
            {menu.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <DropdownMenu open={open} onOpenChange={handleToggleOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 ml-2 rounded-full"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  <p className="text-lg font-bold">
                    {identity?.firstName?.charAt(0)}
                  </p>
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {identity?.firstName}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

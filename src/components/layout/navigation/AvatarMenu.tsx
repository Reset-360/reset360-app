'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  Users,
} from 'lucide-react';
import useAuthStore from '@/store/AuthState';
import { EUserRole } from '@/types/user';
import clsx from 'clsx';
import { useLogout } from '@/hooks/useLogout';

export default function AvatarMenu({ mobile }: { mobile?: boolean }) {
  const logout = useLogout()

  // read directly from the store
  const user = useAuthStore((s) => s.user);
  const clientProfile = useAuthStore((s) => s.clientProfile);
  const coachProfile = useAuthStore((s) => s.coachProfile);

  // prefer clientProfile, then coachProfile, then minimal user
  const profile = clientProfile ?? coachProfile ?? undefined;

  const initials = (() => {
    const fn = profile?.firstName?.trim();
    const ln = profile?.lastName?.trim();
    if (fn && ln) return `${fn.charAt(0)}${ln.charAt(0)}`.toUpperCase();
    if (fn) return fn.charAt(0).toUpperCase();
    // fallback to username or email
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return '?';
  })();

  const displayName = profile?.firstName ?? user?.username ?? 'User';
  const displayEmail = user?.email ?? '';

  const avatarUrl = profile?.imageUrl ?? profile?.imageUrl ?? '';

  const role = user?.role ?? 'guest';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-muted focus:outline-none"
          aria-label="Open profile menu"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl || ''} alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div
            className={clsx(
              'flex-col leading-tight',
              mobile ? 'flex' : 'hidden md:flex '
            )}
          >
            <span className="text-sm font-medium">{displayName}</span>
          </div>

          <ChevronDown className="ml-1 hidden lg:inline-block" size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={mobile ? 'start' : 'end'}
        sideOffset={8}
        className="w-64"
      >
        <div className="px-3 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl || ''} alt={displayName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate">
                {displayName}
              </span>
              {displayEmail && (
                <span className="text-xs text-muted-foreground truncate">
                  {displayEmail}
                </span>
              )}
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="px-3 text-xs">Account</DropdownMenuLabel>

        {/* role-specific items */}
        {role === EUserRole.CLIENT && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/client/dashboard"
                className="flex items-center gap-2"
              >
                <User size={16} />
                Dashboard
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {role === EUserRole.COACH && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/coach/dashboard" className="flex items-center gap-2">
                <User size={16} />
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/coach/clients" className="flex items-center gap-2">
                <Users size={16} />
                My Clients
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/coach/settings" className="flex items-center gap-2">
                <Settings size={16} />
                Settings
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => logout('/') }
          className="flex items-center gap-2 text-accent"
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

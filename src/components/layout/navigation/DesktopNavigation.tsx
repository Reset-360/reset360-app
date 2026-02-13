import React, { useMemo } from 'react';
import NavLinkItem from './NavLinkItem';
import Link from 'next/link';
import { isAuthenticated } from '@/services/authService';
import AvatarMenu from './AvatarMenu';
import useAuthStore from '@/store/AuthState';
import { usePathname } from 'next/navigation';

const DesktopNavigation = () => {
  const pathname = usePathname()

  const user = useAuthStore(s => s.user)
  
  const authLink = useMemo(() => {
    if (isAuthenticated()) {
      return (
        <AvatarMenu />
      );
    } else {
      return (
        <Link
          href={'/login'}
          className="rounded text-sm bg-violet-500 hover:bg-primary text-white px-5 py-1 cursor-pointer"
        >
          Login
        </Link>
      );
    }
  }, [user]);

  if (pathname == '/organizations') {
    return (
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
        {authLink}
      </div>
    );
  }

  return (
    <div className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
      <NavLinkItem href="#home" title="Home" />
      <NavLinkItem href="#adapts" title="ADAPTS" />
      <NavLinkItem href="#how-it-works" title="How It Works" />
      {/* <NavLinkItem href="#coaches" title="Our Coaches" /> */}
      <NavLinkItem href="#organization" title="Organization Pricing" />

      {authLink}
    </div>
  );
};

export default DesktopNavigation;

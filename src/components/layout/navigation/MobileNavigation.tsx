import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import Image from 'next/image';
import NavLinkItem from './NavLinkItem';

type MobileNavigationProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
const MobileNavigation: React.FC<MobileNavigationProps> = ({
  open,
  setOpen,
}) => {
  return (
    <div
      className={`fixed inset-0 z-40 min-h-screen transform transition-transform duration-300 ease-in-out 
          bg-violet-200 text-gray-700 flex flex-col px-6 py-4
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex items-center justify-between ">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo/logo_32.png"
            alt="Reset 360 Logo"
            width={28}
            height={28}
          />
          <span className="text-xl font-sans font-bold text-violet-500 ">
            Reset 360
          </span>
        </Link>

        <button
          className="text-grey-500 hover:text-violet-500 transition-transform duration-300 hover:rotate-90"
          onClick={() => setOpen(false)}
        >
          <X size={32} />
        </button>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center  space-y-8">
          <NavLinkItem href="#home" onClick={() => setOpen(false)} title="Home" />
          <NavLinkItem href="#adapts" onClick={() => setOpen(false)} title="ADAPTS" />
          <NavLinkItem href="#how-it-works" onClick={() => setOpen(false)} title="How It Works" />
          <NavLinkItem href="#coaches" onClick={() => setOpen(false)} title="Our Coaches" />
          <NavLinkItem href="#pricing" onClick={() => setOpen(false)} title="Pricing" />

          <Link href="/login" className="rounded-full bg-primary hover:bg-primary/80 text-white px-5 py-1 cursor-pointer">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;

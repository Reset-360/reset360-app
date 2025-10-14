import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, X } from 'lucide-react';
import Image from 'next/image';
import NavLinkItem from './NavLinkItem';
import { Button } from '@/components/ui/button';

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
            src="/logo/logo_full_250.png"
            alt="Reset 360 Logo"
            width={150}
            height={50}
          />
        </Link>

        <button
          className="text-grey-500 hover:text-violet-500 transition-transform duration-300 hover:rotate-90"
          onClick={() => setOpen(false)}
        >
          <X size={32} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center mb-1">
            <div className="w-10 border border-primary mr-2"></div>
            <p className="font-label text-xs text-muted-foreground">Menu</p>
          </div>

          <div className="ml-12 flex flex-col items-start space-y-2">
            <NavLinkItem
              href="#home"
              onClick={() => setOpen(false)}
              title="Home"
            />
            <NavLinkItem
              href="#adapts"
              onClick={() => setOpen(false)}
              title="ADAPTS"
            />
            <NavLinkItem
              href="#how-it-works"
              onClick={() => setOpen(false)}
              title="How It Works"
            />
            <NavLinkItem
              href="#coaches"
              onClick={() => setOpen(false)}
              title="Our Coaches"
            />
            <NavLinkItem
              href="#pricing"
              onClick={() => setOpen(false)}
              title="Pricing"
            />
          </div>

          <div className="flex items-center mt-5 mb-2">
            <div className="w-10 border border-primary mr-2"></div>
            <p className="font-label text-xs text-muted-foreground">Socials</p>
          </div>
          <div className="ml-12 flex gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-smooth"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-smooth"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-smooth"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="">
          <Link href="/login">
            <Button variant={'default'} className="w-full">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide overflow on mobile nav
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  // Detect scroll position for navbar style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-violet-200/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent border-none shadow-none'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1"
        >
          <Image
            src="/logo/logo_full_250.png"
            alt="Reset 360 Logo"
            width={150}
            height={50}
          />
        </Link>

        {/* Desktop Menu */}
        <DesktopNavigation />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 hover:text-violet-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <MobileNavigation
        open={menuOpen}
        setOpen={(status: boolean) => setMenuOpen(status)}
      />
    </nav>
  );
};

export default Header;

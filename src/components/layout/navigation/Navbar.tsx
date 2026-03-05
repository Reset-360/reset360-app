import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Brain,
  Compass,
  Users,
  Briefcase,
  ArrowRight,
  SquareArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/AuthState';
import { isAuthenticated } from '@/services/authService';
import AvatarMenu from './AvatarMenu';

interface SubLink {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  submenu?: SubLink[];
  featured?: { title: string; description: string; href: string; cta: string };
}

const navItems: NavItem[] = [
  {
    label: 'ADAPTS',
    href: '/adapts',
    icon: <Brain className="w-5 h-5" />,
    featured: {
      title: 'ADAPTS Assessment',
      description:
        'Our proprietary mental wellness tool that measures 6 key dimensions of psychological health.',
      href: '/',
      cta: 'Take the Assessment',
    },
    submenu: [
      {
        label: 'ADAPTS',
        href: '/adapts',
        description: 'What is the ADAPTS model',
      },
      {
        label: 'Who is it for',
        href: '/adapts#who',
        description: 'Who can use ADAPTS?',
      },
      {
        label: 'How It Works',
        href: '/adapts#how-it-works',
        description: 'Step-by-step process',
      },
      {
        label: 'Pricing For Individuals',
        href: '/adapts#pricing',
        description: 'Personal mental wellness',
      },
    ],
  },
  {
    label: 'Coaching',
    href: '/coaching',
    icon: <Compass className="w-5 h-5" />,
    featured: {
      title: 'Smart Coach Matching',
      description:
        'Get paired with a verified coach based on your needs, location, and preferences.',
      href: '/coaching/find',
      cta: 'Find Your Coach',
    },
    submenu: [
      {
        label: 'Overview',
        href: '/coaching',
        description: 'Find guidance or start your coaching journey.',
      },
      {
        label: 'How Matching Works',
        href: '/coaching#how-it-works',
        description: 'Our smart matching system',
      },
      {
        label: 'Session Types',
        href: '/coaching#sessions',
        description: 'Online & café meetups',
      },
      {
        label: 'Venue Accreditation',
        href: '/coaching#cafe',
        description:
          'Become an accredited safe venue for coaching and wellness sessions',
      },
      {
        label: 'Pricing',
        href: '/coaching#pricing',
        description: 'Coaching packages',
      },
      {
        label: 'Trust & Safety',
        href: '/coaching#trust',
        description: 'Verified & confidential',
      },
    ],
  },
  {
    label: 'For Organizations',
    href: '/organization',
    icon: <Briefcase className="w-5 h-5" />,
    featured: {
      title: 'Enterprise Wellness',
      description:
        'Comprehensive mental health solutions designed for teams and organizations.',
      href: '/organization/register',
      cta: 'Get Started',
    },
    submenu: [
      {
        label: 'Overview',
        href: '/organization',
        description: 'Enterprise wellness solutions',
      },
      {
        label: 'How It Works',
        href: '/organization#org-how',
        description: 'Deployment in four steps',
      },
      {
        label: 'ADAPTS Bulk Plans',
        href: '/organization#org-pricing',
        description: 'Assess your entire team',
      },
      {
        label: 'Register Organization',
        href: '/organization#org-register',
        description: 'Get started today',
      },
    ],
  },
  {
    label: 'Become a Coach',
    href: '/coaching/become',
    icon: <Users className="w-5 h-5" />,
    featured: {
      title: 'Join Our Network',
      description:
        'Help people thrive while building a flexible, rewarding coaching practice.',
      href: '/coaching/apply',
      cta: 'Apply Now',
    },
    submenu: [
      {
        label: 'Why Join',
        href: '/coaching/become#join',
        description: 'Benefits of partnering with us',
      },
      {
        label: 'Requirements',
        href: '/coaching/become#requirements',
        description: 'What you need to qualify',
      },
      {
        label: 'Certification Tracks',
        href: '/coaching/become#tracks',
        description: 'Coach Path',
      },
    ],
  },
];

const DesktopMegaMenu = ({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
    >
      <div className="w-[520px] bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-elevated overflow-hidden">
        <div className="grid grid-cols-5">
          {/* Featured panel */}
          <div className="col-span-2 bg-gradient-sage p-5 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                {item.icon}
              </div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-1.5">
                {item.featured?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.featured?.description}
              </p>
            </div>
            <Link
              href={item.featured?.href ?? ''}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-4 group"
            >
              {item.featured?.cta}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Links panel */}
          <div className="col-span-3 p-3">
            <div className="space-y-0.5">
              {item.submenu?.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  onClick={onClose}
                  className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-muted/60 transition-all group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary mt-1.5 transition-colors shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block">
                      {sub.label}
                    </span>
                    {sub.description && (
                      <span className="text-xs text-muted-foreground leading-snug block mt-0.5">
                        {sub.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DesktopNavItem = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(() => null, 0)
  );

  const enter = () => {
    clearTimeout(timeout?.current);
    setOpen(true);
  };

  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 180);
  };

  const closeNow = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(false);
  };

  if (!item.submenu) {
    return (
      <a
        href={item.href}
        className="text-sm font-medium text-foreground hover:text-foreground transition-colors"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {/* ✅ This navigates to /adapts (or /) */}
      <Link
        href={item.href}
        onClick={() => {
          if (pathname === item.href)
            window.scrollTo({ top: 0, behavior: 'smooth' });
          closeNow();
        }}
        className="text-sm font-medium text-foreground hover:text-foreground transition-colors py-1"
      >
        {item.label}
      </Link>

      {/* ✅ Separate trigger to open/close mega menu */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        aria-label={`Open ${item.label} menu`}
        className="ml-1 p-1 rounded-md hover:bg-muted/50 transition-colors"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {open && <DesktopMegaMenu item={item} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

const MobileAccordion = ({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  if (!item.submenu) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="pt-4 flex justify-center"
      >
        {item.label}
      </Link>
    );
  }

  const onNavigate = () => {
    onClose();
    router.push(item.href);
  };

  return (
    <div className="border-b border-border/40 last:border-0">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-medium text-foreground py-3 px-1"
      >
        <span className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {item.icon}
          </span>
          {item.label}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={onNavigate}>
            <SquareArrowUpRight
              className={`w-4 h-4 text-primary transition-transform duration-200`}
            />
          </button>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-12 pb-3 space-y-0.5">
              {item.submenu.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  onClick={onClose}
                  className="block text-sm text-foreground hover:text-primary py-2 transition-colors"
                >
                  {sub.label}
                  {sub.description && (
                    <span className="block text-xs text-muted-foreground/70 mt-0.5">
                      {sub.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  const user = useAuthStore((s) => s.user);

  const authLink = useMemo(() => {
    if (isAuthenticated()) {
      return <AvatarMenu />;
    } else {
      return (
        <Button
          onClick={() => router.push('/login')}
          variant="accent"
          className="flex-1 md:w-auto rounded-full px-6 hover:opacity-90 transition-opacity"
        >
          Login
        </Button>
      );
    }
  }, [user]);

  // Detect scroll position for navbar style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 bg-violet-200/90 backdrop-blur-md border-b border-gray-200 shadow-sm`}
    >
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 w-[200px] block"
          >
            <Image
              src="/logo/reset360_full_250.png"
              alt="Reset 360 Logo"
              width={150}
              height={50}
              className="w-[150px] h-auto"
              priority
            />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </div>
        </div>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            onClick={() => router.push('/coaching/find')}
            className="rounded-full text-foreground bg-transparent hover:bg-primary px-6 hover:opacity-90 transition-opacity"
          >
            Find a Coach
          </Button>

          {/* Login / Avatar menu */}
          {authLink}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-background overflow-hidden"
          >
            <div className=" py-4 px-2 space-y-0">
              {navItems.map((item) => (
                <MobileAccordion
                  key={item.label}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                />
              ))}

              <div className="flex gap-2 mt-4">
                {/* Login / Avatar menu */}
                {authLink}

                <Button
                  onClick={() => router.push('/coaching/find')}
                  
                  variant="default"
                  className="flex-1 rounded-full hover:opacity-90"
                >
                  Find a Coach
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

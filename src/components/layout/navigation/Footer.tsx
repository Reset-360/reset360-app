import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Find a Coach', href: '/coaching/find' },
      { label: 'Online Sessions', href: '/coaching#sessions' },
      { label: 'ADAPTS Assessment', href: '/adapts#pricing' },
      { label: 'For Organization', href: '/organization' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Café Partners', href: '/cafe-partners' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/support/help-center' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Data Processing Agreement', href: '/data-processing-agreement' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="py-12 bg-violet-950">
      <div className="container mx-auto px-10">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <Image
              src="/logo/reset360_full_250.png"
              alt="Reset 360 Logo"
              width={150}
              height={50}
              className="w-[150px] h-auto"
              priority
            />
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Connecting people with certified mental health coaches, online or
              at a café near you.
            </p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-primary-foreground mb-4 text-sm tracking-wide uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/50 text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © 2026 Reset 360. All rights reserved.
          </p>
          <p className="text-primary-foreground/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-coral" /> for mental
            wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

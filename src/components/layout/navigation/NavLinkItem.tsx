import clsx from 'clsx';
import Link from 'next/link';
import React, { ComponentPropsWithoutRef } from 'react';

type NavLinkItemProps = {
  href: string;
  title: string;
  className?: string;
} & ComponentPropsWithoutRef<'a'>;

const NavLinkItem: React.FC<NavLinkItemProps> = ({
  title,
  href,
  className,
  ...props
}) => {
  return (
    <Link
      href={href as any}
      className={clsx(
        'hover:text-violet-500 group relative text-lg font-medium',
        className
      )}
      {...props}
    >
      {title}

      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-violet-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </Link>
  );
};

export default NavLinkItem;

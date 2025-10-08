import React from 'react';
import NavLinkItem from './NavLinkItem';

const DesktopNavigation = () => {
  return (
    <div className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
      <NavLinkItem href="#home" title="Home" />
      <NavLinkItem href="#adapts" title="ADAPTS" />
      <NavLinkItem href="#how-it-works" title="How It Works" />
      <NavLinkItem href="#coaches" title="Our Coaches" />
      <NavLinkItem href="#start" title="Pricing" />
      
      <button className="rounded-full bg-primary hover:bg-primary/80 text-white px-5 py-1 cursor-pointer">
        Sign In
      </button>
    </div>
  );
};

export default DesktopNavigation;

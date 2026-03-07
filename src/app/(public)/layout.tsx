'use client'

import Footer from '@/components/layout/navigation/Footer';
import Navbar from '@/components/layout/navigation/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="top" className="">
      <Navbar />
      
      {children}

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { DM_Sans, Funnel_Display, Playfair_Display } from "next/font/google";
import './globals.css';
import { Toaster } from "@/components/ui/sonner"
import ScrollToHash from '@/components/layout/ScrollHash';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'Reset 360',
  description: 'Reset 360',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
  },
};

const playFair = Playfair_Display({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const funnel = Funnel_Display({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${dmSans.variable} ${playFair.variable} ${funnel.variable} antialiased`}
      >
        <NextTopLoader color="#your-primary-color" showSpinner={false} />

        <ScrollToHash />
        {children}
        
        <Toaster position='top-right' richColors closeButton theme='light' />
      </body>
    </html>
  );
}

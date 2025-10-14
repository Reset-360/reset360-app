import type { Metadata } from "next";
import { Geist, Geist_Mono, Zain } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Reset 360',
  description: 'Reset 360',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
  },
};

const zain = Zain({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zain.variable} antialiased`}
      >
        {children}
        <Toaster position='top-right' richColors closeButton theme='light' />
      </body>
    </html>
  );
}

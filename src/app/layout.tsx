import type { Metadata } from "next";
import { Open_Sans, Newsreader, Funnel_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: 'Reset 360',
  description: 'Reset 360',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
  },
};

const newsReader = Newsreader({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
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
    <html lang="en">
      <body
        className={`${openSans.variable} ${newsReader.variable} ${funnel.variable} antialiased`}
      >
        {children}
        <Toaster position='top-right' richColors closeButton theme='light' />
      </body>
    </html>
  );
}

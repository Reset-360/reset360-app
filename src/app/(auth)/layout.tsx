'use client';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex bg-primary/20">
      <div className="flex w-full">
        {/* Left: Background Image (hidden on small screens) */}
        <div className="relative hidden md:flex flex-1">
          <div className="w-full h-full bg-[url('/images/auth-bg-2.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-indigo-500/20" />
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-[35rem] p-6 md:p-8 flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

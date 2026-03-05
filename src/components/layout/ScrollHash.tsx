"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ScrollToHashInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);

    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return false;

      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scroll()) return;

    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (scroll() || tries > 20) clearInterval(timer);
    }, 100);

    return () => clearInterval(timer);
  }, [pathname, searchParams]);

  return null;
}

export default function ScrollToHash() {
  return (
    <Suspense fallback={null}>
      <ScrollToHashInner />
    </Suspense>
  );
}

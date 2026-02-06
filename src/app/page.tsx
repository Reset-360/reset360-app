'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, isAuthenticated, logoutUser } from '@/services/authService';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import useAuthStore from '@/store/AuthState';
import { useRoleRedirect } from '@/hooks/useRoleRedirect';

import AOS from 'aos';

import Header from '@/components/layout/Header';
import Hero from '@/components/views/home/Hero';
import Features from '@/components/views/features/Features';
import AboutAdapts from '@/components/views/adapts/AboutAdapts';
import HowItWorks from '@/components/views/how-it-works/HowItWorks';
import CoachPreview from '@/components/views/coach-preview/CoachPreview';
import CTA from '@/components/views/cta/CTA';
import Footer from '@/components/layout/PageFooter';
import AdaptsTypes from '@/components/views/adapts/AdaptsTypes';
import { useLogout } from '@/hooks/useLogout';

export default function Home() {
  const logout = useLogout()

  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const auth = await getUser(); // e.g. API call to validate token/session
        if (!auth) {
          logout('/')
        }
      } catch (err) {
        // If error, also clear user
        await logoutUser();
      } finally {
        setLoaded(true);
      }
    };

    if (user) {
      // Always check if auth
      checkUser();
    } else {
      setLoaded(true);
    }
  }, [user]);

  if (!hasHydrated || !isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main id="top" className="">
      <Header />

      <Hero />
      <Features />
      <AboutAdapts />
      <AdaptsTypes />
      <HowItWorks />
      <CoachPreview />
      <CTA />

      <Footer />
    </main>
  );
}

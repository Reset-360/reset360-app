'use client';

import { useEffect, useState } from 'react';
import { getUser } from '@/services/authService';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import useAuthStore from '@/store/AuthState';

import AOS from 'aos';

import Header from '@/components/layout/Header';
import Hero from '@/components/views/home/Hero';
import Features from '@/components/views/home/Features';
import AboutAdapts from '@/components/views/home/adapts/AboutAdapts';
import HowItWorks from '@/components/views/home/how-it-works/HowItWorks';
import CoachPreview from '@/components/views/home/coach-preview/CoachPreview';
import CTA from '@/components/views/home/CTA';
import Footer from '@/components/layout/PageFooter';
import AdaptsTypes from '@/components/views/home/adapts/AdaptsTypes';
import { useLogout } from '@/hooks/useLogout';
import { EUserRole } from '@/types/user';

export default function Home() {
  const logout = useLogout()

  const user = useAuthStore((state) => state.user);

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const auth = await getUser(); // e.g. API call to validate token/session
        if (!auth || auth.role == EUserRole.ADMIN) {
          logout('/')
        }
      } catch (err) {
        // If error, also clear user
        logout('/')
      } finally {
        setLoaded(true);
      }
    };

    if (user) {
      checkUser()
    } else {
      setLoaded(true)
    }
  }, [user]);

  if (!isLoaded) {
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
      {/* <CoachPreview /> */}
      <CTA />

      <Footer />
    </main>
  );
}

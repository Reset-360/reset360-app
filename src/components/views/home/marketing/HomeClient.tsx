'use client';

import { useEffect, useState } from 'react';
import { getUser } from '@/services/authService';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import useAuthStore from '@/store/AuthState';

import AOS from 'aos';

import { useLogout } from '@/hooks/useLogout';
import { EUserRole } from '@/types/user';
import Navbar from '@/components/layout/navigation/Navbar';
import Footer from '@/components/layout/navigation/Footer';
import HomeHero from '@/components/views/home/marketing/HomeHero';
import HomeWhatIs from '@/components/views/home/marketing/HomeWhatIs';
import HomeHowItWorks from '@/components/views/home/marketing/HomeHowItWorks';
import HomeBuiltFor from '@/components/views/home/marketing/HomeBuiltFor';
import HomeTrust from '@/components/views/home/marketing/HomeTrust';
import HomeCTA from '@/components/views/home/marketing/HomeCTA';
import HomeBenefits from '@/components/views/home/marketing/HomeBenefits';

export default function HomeClient() {
  const logout = useLogout();

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
          logout('/');
        }
      } catch (err) {
        // If error, also clear user
        logout('/');
      } finally {
        setLoaded(true);
      }
    };

    if (user) {
      checkUser();
    } else {
      setLoaded(true);
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
      <Navbar />
      <HomeHero />
      <HomeWhatIs />
      <HomeHowItWorks />
      <HomeBenefits />
      <HomeBuiltFor />
      <HomeTrust />
      <HomeCTA />
      <Footer />
    </main>
  );
}

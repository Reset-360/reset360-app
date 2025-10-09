'use client';

import { useEffect } from 'react';
import AOS from 'aos';

import Header from '@/components/layout/Header'
import Hero from '@/components/views/home/Hero';
import Features from '@/components/views/features/Features';
import AboutAdapts from '@/components/views/adapts/AboutAdapts';
import HowItWorks from '@/components/views/how-it-works/HowItWorks';
import CoachPreview from '@/components/views/coach-preview/CoachPreview';
import CTA from '@/components/views/cta/CTA';
import Footer from '@/components/layout/PageFooter';
import AdaptsTypes from '@/components/views/adapts/AdaptsTypes';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

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
  )
}
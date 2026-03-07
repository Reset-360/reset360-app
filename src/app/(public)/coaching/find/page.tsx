'use client'

import CoachMarketplace from '@/components/views/coaching/find/CoachMarketplace';
import FindCoachCTA from '@/components/views/coaching/find/FindCoachCTA';
import FindCoachHero from '@/components/views/coaching/find/FindCoachHero';
import FindCoachHow from '@/components/views/coaching/find/FindCoachHow';
import FindCoachTrust from '@/components/views/coaching/find/FindCoachTrust';
import React from 'react';

const FindCoachPage = () => {
  return (
    <main>
      <FindCoachHero />
      <CoachMarketplace />
      <FindCoachHow />
      <FindCoachTrust />
      <FindCoachCTA />
    </main>
  );
};

export default FindCoachPage;

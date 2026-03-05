'use client';

import React from 'react';
import AdaptsHero from '@/components/views/adapts/marketing/AdaptsHero';
import AdaptsWhat from '@/components/views/adapts/marketing/AdaptsWhat';
import AdaptsWho from '@/components/views/adapts/marketing/AdaptsWho';
import AdaptsHow from '@/components/views/adapts/marketing/AdaptsHow';
import AdaptsReceive from '@/components/views/adapts/marketing/AdaptsReceive';
import AdaptsPricing from '@/components/views/adapts/marketing/AdaptsPricing';
import AdaptsNextSteps from '@/components/views/adapts/marketing/AdaptsNextSteps';

const AdaptsPage = () => {
  return (
    <main>
      <AdaptsHero />
      <AdaptsWhat />
      <AdaptsWho />
      <AdaptsHow />
      <AdaptsReceive />
      <AdaptsPricing />
      <AdaptsNextSteps />
    </main>
  );
};

export default AdaptsPage;

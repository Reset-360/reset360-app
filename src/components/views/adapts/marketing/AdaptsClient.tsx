'use client';

import React from 'react';
import AdaptsHero from '@/components/views/adapts/marketing/AdaptsHero';
import AdaptsWhat from '@/components/views/adapts/marketing/AdaptsWhat';
import AdaptsWho from '@/components/views/adapts/marketing/AdaptsWho';
import AdaptsHow from '@/components/views/adapts/marketing/AdaptsHow';
import AdaptsReceive from '@/components/views/adapts/marketing/AdaptsReceive';
import AdaptsPricing from '@/components/views/adapts/marketing/AdaptsPricing';
import AdaptsNextSteps from '@/components/views/adapts/marketing/AdaptsNextSteps';
import AdaptsBenefits from '@/components/views/adapts/marketing/AdaptsBenefits';

const AdaptsClient = () => {
  return (
    <main>
      <AdaptsHero />
      <AdaptsWhat />
      <AdaptsBenefits />
      <AdaptsWho />
      
      <AdaptsHow />
      <AdaptsPricing />
      <AdaptsReceive />
      <AdaptsNextSteps />
    </main>
  );
};

export default AdaptsClient;

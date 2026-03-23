'use client';

import OrgCapabilities from '@/components/views/organization/marketing/OrgCapabilities';
import OrgCTA from '@/components/views/organization/marketing/OrgCTA';
import OrgHero from '@/components/views/organization/marketing/OrgHero';
import OrgHowItWorks from '@/components/views/organization/marketing/OrgHowItWorks';
import OrgPricing from '@/components/views/organization/marketing/OrgPricing';
import OrgTrust from '@/components/views/organization/marketing/OrgTrust';
import OrgWhyChoose from '@/components/views/organization/marketing/OrgWhyChoose';
import React from 'react';

const OrgClient = () => {
  return (
    <main>
      <OrgHero />
      <OrgWhyChoose />
      <OrgHowItWorks />
      <OrgCapabilities />
      <OrgPricing />
      <OrgTrust />
      <OrgCTA />
    </main>
  );
};

export default OrgClient;

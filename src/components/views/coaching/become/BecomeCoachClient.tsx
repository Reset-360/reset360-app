'use client'

import CoachAfterCert from '@/components/views/coaching/become/CoachAfterCert';
import CoachCertRequirement from '@/components/views/coaching/become/CoachCertRequirement';
import CoachCTA from '@/components/views/coaching/become/CoachCTA';
import CoachERCTracks from '@/components/views/coaching/become/CoachERCTracks';
import CoachHero from '@/components/views/coaching/become/CoachHero';
import CoachWhyJoin from '@/components/views/coaching/become/CoachWhyJoin';
import React from 'react';

const BecomeCoachClient = () => {
  return (
    <main>
      <CoachHero />
      <CoachWhyJoin />
      <CoachCertRequirement />
      <CoachERCTracks />
      <CoachAfterCert />
      <CoachCTA />
    </main>
  );
};

export default BecomeCoachClient;

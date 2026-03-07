'use client'

import ADAPTSSection from '@/components/views/coaching/marketing/ADAPTSSection'
import CafeAccreditation from '@/components/views/coaching/marketing/CafeAccreditation'
import CoachBenefits from '@/components/views/coaching/marketing/CoachBenefits'
import CoachRecruitment from '@/components/views/coaching/marketing/CoachRecruitment'
import CoachingHero from '@/components/views/coaching/marketing/Hero'
import HowItWorks from '@/components/views/coaching/marketing/HowItWorks'
import LocationMatching from '@/components/views/coaching/marketing/LocationMatching'
import PricingSection from '@/components/views/coaching/marketing/PricingSection'
import SessionOptions from '@/components/views/coaching/marketing/SessionOptions'
import TrustSection from '@/components/views/coaching/marketing/TrustSection'
import React from 'react'

const CoachingPage = () => {
  return (
    <main className=''>
      <CoachingHero />
      <CoachBenefits />
      <HowItWorks />
      <LocationMatching />
      <SessionOptions />
      <CafeAccreditation />
      <CoachRecruitment />
      <PricingSection />
      <TrustSection />
      <ADAPTSSection />
    </main>
  )
}

export default CoachingPage
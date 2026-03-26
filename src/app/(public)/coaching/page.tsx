import CoachMarketingClient from '@/components/views/coaching/marketing/CoachMarketingClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find the right coach for you',
  keywords: ['coaching']
};

const CoachingPage = () => {
  return (
    <CoachMarketingClient />
  )
}

export default CoachingPage
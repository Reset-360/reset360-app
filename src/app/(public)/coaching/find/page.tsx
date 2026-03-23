import FindCoachClient from '@/components/views/coaching/find/FindCoachClient'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a coaching session',
  keywords: ['coaching']
};

const FindCoachPage = () => {
  return <FindCoachClient />
}

export default FindCoachPage
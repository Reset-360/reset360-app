import BecomeCoachClient from '@/components/views/coaching/become/BecomeCoachClient'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a coach',
  keywords: ['coaching', 'organization']
};

const BecomeCoachPage = () => {
  return <BecomeCoachClient />
}

export default BecomeCoachPage
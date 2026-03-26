import HomeClient from '@/components/views/home/marketing/HomeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Self‑Assessment & Coaching Hub',
  keywords: ['adapts', 'organization', 'coaching']
};

export default function HomePage() {
  return <HomeClient />;
}
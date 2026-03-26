import AdaptsClient from '@/components/views/adapts/marketing/AdaptsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ADAPTS Assessment',
  keywords: ['adapts', 'organization', 'coaching', 'assessment']
};

export default function AdaptsPage() {
  return <AdaptsClient />;
}
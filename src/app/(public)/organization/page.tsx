import OrgClient from '@/components/views/organization/marketing/OrgClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deploy ADAPTS on your organization',
  keywords: ['organization', 'adapts']
};

const OrganizationPage = () => {
  return <OrgClient />
};

export default OrganizationPage;

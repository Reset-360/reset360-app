import DashboardClient from '@/components/client/dashboard/DashboardClient';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
};

const ClientDashboardPage = () => {
  return <DashboardClient />;
};

export default ClientDashboardPage
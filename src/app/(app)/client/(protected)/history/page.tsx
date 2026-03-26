import HistoryClient from '@/components/client/history/HistoryClient';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'History',
};

const HistoryPage = () => {
  return <HistoryClient />;
};

export default HistoryPage;

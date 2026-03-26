import CalmRoomClient from '@/components/client/calm-room/CalmRoomClient';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'The Calm Room',
  keywords: ['grounding', 'techniques'],
};

const ResetPractice = () => {
  return <CalmRoomClient />;
};

export default ResetPractice;

import ProfileClient from '@/components/client/profile/ProfileClient';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfilePage = () => {
  return <ProfileClient />;
};

export default ProfilePage;

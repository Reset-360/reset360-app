import LoginClient from '@/components/views/auth/LoginClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Member Login',
  description:
    'Log in to Reset 360 to access personalized assessments, coaching, and resources for well-being.',
};

const LoginPage = () => {
  return <LoginClient />;
};

export default LoginPage;

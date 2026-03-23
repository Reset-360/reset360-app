import { Metadata } from 'next';
import RegisterClient from '@/components/views/auth/RegisterClient';

export const metadata: Metadata = {
  title: 'Create an Account',
  description:
    'Register with Reset 360 to access personalized assessments, coaching, and resources for well-being.',
};

const RegisterPage = () => {
  return <RegisterClient />;
};

export default RegisterPage;

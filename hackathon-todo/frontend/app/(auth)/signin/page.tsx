'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-context';
import AuthForm from '../../../components/auth-form';

const SignInPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    router.push('/dashboard');
    return null;
  }

  return <AuthForm type="signin" />;
};

export default SignInPage;
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';

const SignOutPage = () => {
  const router = useRouter();
  const { signOut, user } = useAuth();

  useEffect(() => {
    const logout = async () => {
      if (user) {
        await signOut();
      }
      router.push('/'); // Redirect to home after sign out
    };

    logout();
  }, [signOut, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Signing out...
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please wait while we sign you out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;
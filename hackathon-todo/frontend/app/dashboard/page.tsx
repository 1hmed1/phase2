'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import TaskList from '../../components/task-list';
import { motion } from 'framer-motion';
import { User } from '../../../shared/types';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to sign in if not authenticated
    // In a real app, you would use Next.js router for redirect
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please sign in</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to access the dashboard</p>
          <a 
            href="/signin" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            My Tasks
          </motion.h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {(user as User).name || (user as User).email}</span>
            <a 
              href="/signout" 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Sign Out
            </a>
          </div>
        </div>
      </header>
      
      <main>
        {userId ? (
          <TaskList userId={userId} />
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
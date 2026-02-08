'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../../lib/api';
import { User, RegisterData, LoginCredentials, AuthResponse } from '../../../shared/types';

// Define the shape of our authentication context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    // In a real app, you would check for a stored token and validate it
    // For now, we'll just set loading to false
    setLoading(false);
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, name?: string): Promise<AuthResponse> => {
    try {
      const registerData: RegisterData = { email, password, name };
      const response = await authAPI.signUp(registerData);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const loginData: LoginCredentials = { email, password };
      const response = await authAPI.signIn(loginData);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      await authAPI.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
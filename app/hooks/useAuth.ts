'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
    isLoading: true,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const username = localStorage.getItem('username');
      
      setAuthState({
        isAuthenticated,
        username,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthState({
        isAuthenticated: false,
        username: null,
        isLoading: false,
      });
    }
  };

  const login = (username: string) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
    setAuthState({
      isAuthenticated: true,
      username,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setAuthState({
      isAuthenticated: false,
      username: null,
      isLoading: false,
    });
    router.push('/login');
  };

  const redirectToLogin = () => {
    router.push('/login');
  };

  return {
    ...authState,
    login,
    logout,
    redirectToLogin,
    checkAuthStatus,
  };
};

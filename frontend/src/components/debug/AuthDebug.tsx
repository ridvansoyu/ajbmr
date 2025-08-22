"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const AuthDebug: React.FC = () => {
  const { user, isAuthenticated, isReady } = useAuth();
  const [localStorageData, setLocalStorageData] = useState<{
    authUser: boolean;
    authAccess: boolean;
  }>({ authUser: false, authAccess: false });
  const [mounted, setMounted] = useState(false);

  // Update localStorage data whenever auth state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocalStorageData({
        authUser: !!window.localStorage.getItem('auth:user'),
        authAccess: !!window.localStorage.getItem('auth:access'),
      });
    }
  }, [user, isAuthenticated]); // Re-run when auth state changes

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2">Auth Debug</h4>
      <div className="space-y-1">
        <div>Ready: {isReady ? '✅' : '⏳'}</div>
        <div>Authenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>User: {user ? user.username : 'None'}</div>
        <div>Email: {user ? user.email : 'None'}</div>
        <div>Role: {user ? user.role : 'None'}</div>
        <div>LocalStorage:</div>
        <div className="ml-2">
          <div>auth:user: {localStorageData.authUser ? '✅' : '❌'}</div>
          <div>auth:access: {localStorageData.authAccess ? '✅' : '❌'}</div>
        </div>
        <div className="mt-2 text-xs text-gray-300">
          API: {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not set'}
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
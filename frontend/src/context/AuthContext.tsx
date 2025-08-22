"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type UserRole = 'admin' | 'editor' | 'author';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => boolean;
  loginWithJwt: (email: string, accessToken: string, displayName?: string, refreshToken?: string) => void;
  logout: () => void;
  isReady: boolean; // auth state hydrated from storage
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load user and token from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        setIsReady(true);
        return;
      }
      
      const raw = window.localStorage.getItem('auth:user');
      const token = window.localStorage.getItem('auth:access');
      
      console.log('🔍 Loading auth data from localStorage:', { 
        hasUser: !!raw, 
        hasToken: !!token 
      });
      
      if (raw) {
        const parsedUser = JSON.parse(raw);
        console.log('✅ Parsed user from localStorage:', parsedUser);
        setUser(parsedUser);
      } else {
        console.log('❌ No user found in localStorage');
      }
      
      if (token) {
        console.log('✅ Token found in localStorage');
        setAccessToken(token);
      } else {
        console.log('❌ No token found in localStorage');
      }
    } catch (error) {
      console.error('❌ Error loading auth data from localStorage:', error);
      // Clear corrupted data
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('auth:user');
        window.localStorage.removeItem('auth:access');
        window.localStorage.removeItem('auth:refresh');
      }
    }
    setIsReady(true);
  }, []);

  // Sync user state to localStorage
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      
      if (user) {
        console.log('💾 Saving user to localStorage:', user);
        window.localStorage.setItem('auth:user', JSON.stringify(user));
        console.log('✅ User saved to localStorage successfully');
      } else {
        console.log('🗑️ Removing user from localStorage');
        window.localStorage.removeItem('auth:user');
      }
    } catch (error) {
      console.error('❌ Error syncing user to localStorage:', error);
    }
  }, [user]);

  // Sync access token to localStorage
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      
      if (accessToken) {
        console.log('💾 Saving access token to localStorage');
        window.localStorage.setItem('auth:access', accessToken);
        console.log('✅ Access token saved to localStorage successfully');
      } else {
        console.log('🗑️ Removing access token from localStorage');
        window.localStorage.removeItem('auth:access');
      }
    } catch (error) {
      console.error('❌ Error syncing access token to localStorage:', error);
    }
  }, [accessToken]);

  const login = (email: string, _password: string) => {
    // Demo-only logic
    if (!email) return false;
    const normalized = email.toLowerCase();
    const isAdmin = normalized === 'admin@journal.com';
    const nextUser: AuthUser = {
      id: isAdmin ? 'admin-user-id' : 'author-user-id',
      email: normalized,
      username: isAdmin ? 'Admin' : 'Author',
      role: isAdmin ? 'admin' as const : 'author' as const,
    };
    console.log('🔐 Demo login with user:', nextUser);
    setUser(nextUser);
    return true;
  };

  const loginWithJwt = (email: string, token: string, displayName?: string, refreshToken?: string) => {
    console.log('🔐 JWT login called with:', { email, displayName, hasAccessToken: !!token });
    
    const normalized = email.toLowerCase();
    const nextUser: AuthUser = {
      id: 'jwt-user',
      email: normalized,
      username: (displayName && displayName.trim()) || normalized.split('@')[0],
      role: 'author',
    };
    
    console.log('�� Setting user state:', nextUser);
    console.log('🔑 Setting access token');
    
    // Set user state and token
    setUser(nextUser);
    setAccessToken(token);
    
    // Store refresh token if provided
    if (refreshToken && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('auth:refresh', refreshToken);
        console.log('✅ Refresh token stored successfully');
      } catch (error) {
        console.error('❌ Error storing refresh token:', error);
      }
    }
  };

  const logout = () => {
    console.log('🚪 Logout called');
    setUser(null);
    setAccessToken(null);
    // Clear all auth data
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('auth:user');
        window.localStorage.removeItem('auth:access');
        window.localStorage.removeItem('auth:refresh');
        console.log('✅ Auth data cleared from localStorage');
      }
    } catch (error) {
      console.error('❌ Error clearing auth data:', error);
    }
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    accessToken,
    login,
    loginWithJwt,
    logout,
    isReady,
  }), [user, accessToken, isReady]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
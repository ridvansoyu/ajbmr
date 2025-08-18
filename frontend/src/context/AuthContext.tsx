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
  login: (email: string, password: string) => boolean;
  loginWithJwt: (email: string, accessToken: string, displayName?: string, refreshToken?: string) => void; // added
  logout: () => void;
  isReady: boolean; // auth state hydrated from storage
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('auth:user') : null;
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      if (user) {
        window.localStorage.setItem('auth:user', JSON.stringify(user));
      } else {
        window.localStorage.removeItem('auth:user');
        window.localStorage.removeItem('auth:access');
      }
    } catch {
      // ignore
    }
  }, [user]);

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
    setUser(nextUser);
    return true;
  };

  const loginWithJwt = (email: string, accessToken: string, displayName?: string, refreshToken?: string) => {
    const normalized = email.toLowerCase();
    const nextUser: AuthUser = {
      id: 'jwt-user',
      email: normalized,
      username: (displayName && displayName.trim()) || normalized.split('@')[0],
      role: 'author',
    };
    setUser(nextUser);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('auth:user', JSON.stringify(nextUser));
        window.localStorage.setItem('auth:access', accessToken);
        if (refreshToken) {
          window.localStorage.setItem('auth:refresh', refreshToken);
        }
      }
    } catch {}
  };

  const logout = () => setUser(null);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    login,
    loginWithJwt,
    logout,
    isReady,
  }), [user, isReady]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}



'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, LoginPayload, RegisterPayload } from '@/lib/auth-types';
import * as authAPI from '@/lib/auth-client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<{ success: boolean; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; errors?: any; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const tokens = authAPI.getStoredTokens();
    if (!tokens) {
      setUser(null);
      setLoading(false);
      return;
    }
    const profile = await authAPI.getProfile();
    setUser(profile);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (payload: LoginPayload) => {
    const res = await authAPI.login(payload);
    if (res.success && res.data) {
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const register = async (payload: RegisterPayload) => {
    return await authAPI.register(payload);
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import * as api from "./api";

export type AuthUser = api.ApiUser;

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    try {
      const u = await api.me();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const login: AuthContextValue["login"] = async (email, password) => {
    setIsLoading(true);
    try {
      const u = await api.login(email, password);
      setUser(u);
    } finally {
      setIsLoading(false);
    }
  };

  const signup: AuthContextValue["signup"] = async (name, email, password) => {
    setIsLoading(true);
    try {
      const u = await api.signup(name, email, password);
      setUser(u);
    } finally {
      setIsLoading(false);
    }
  };

  const logout: AuthContextValue["logout"] = async () => {
    setIsLoading(true);
    try {
      await api.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      login,
      signup,
      logout,
      refresh,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}


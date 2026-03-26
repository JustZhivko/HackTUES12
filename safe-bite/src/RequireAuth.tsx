import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="page">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
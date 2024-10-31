import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();
  return user && user.role === role ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

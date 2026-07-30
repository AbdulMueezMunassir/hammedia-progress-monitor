import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified and user role doesn't match
  if (role && user?.role !== role) {
    // Redirect to appropriate dashboard
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user?.role === 'worker') {
      return <Navigate to="/worker" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
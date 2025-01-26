import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { profile } = useAuth();

  return profile ? children : <Navigate to="/" />;
};

export default PrivateRoute;

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');
  return !!token;
};

const ProtectedRoute = ({ element: Element, ...rest }) => {
  if (isAuthenticated()) {
    return <Route {...rest} element={<Element />} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

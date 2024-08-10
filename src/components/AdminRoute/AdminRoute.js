import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ roleRequired }) => {
  const [cookies] = useCookies(['role']);
  const role = cookies.role;
  // Trong PrivateRoute component
console.log('Role cookie value:', role);


  // Kiểm tra quyền truy cập
  if (role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

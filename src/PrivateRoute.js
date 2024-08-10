import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ allowedRoles, children }) => {
  const [cookies] = useCookies(["role"]);
  const location = useLocation();
  const userRole = cookies.role;

  console.log("User Role:", userRole); // Kiểm tra role của người dùng

  // Kiểm tra nếu role của người dùng không nằm trong allowedRoles hoặc là false
  if (!allowedRoles.includes(userRole) || userRole === "false") {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Nếu role hợp lệ, render các children
  return children;
};

export default PrivateRoute;


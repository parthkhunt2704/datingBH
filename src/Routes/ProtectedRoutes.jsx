import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  let user = false;

  if (localStorage.getItem("userinfo")) {
    user = true;
  }
  return user;
};

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;

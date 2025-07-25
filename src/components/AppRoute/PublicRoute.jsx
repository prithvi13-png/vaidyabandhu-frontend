// PublicRoute.js
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Login = lazy(() => import("../pages/auth/login"));
const Logout = lazy(() => import('../pages/auth/logout'))

const PublicRoute = () => {
  return [
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="logout" path="/logout" element={<Logout />} />
  ];
};

export default PublicRoute;
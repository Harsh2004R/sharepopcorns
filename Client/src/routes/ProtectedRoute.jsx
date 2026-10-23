// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0) {
    const normalizedUserRole = (user.role || "").toLowerCase();
    const normalizedAllowed = allowedRoles.map((role) => role.toLowerCase());

    // Map "user" alias to "customer" so existing route definitions work without breaking
    const hasAccess =
      normalizedAllowed.includes(normalizedUserRole) ||
      (normalizedUserRole === "customer" && normalizedAllowed.includes("user"));

    if (!hasAccess) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;

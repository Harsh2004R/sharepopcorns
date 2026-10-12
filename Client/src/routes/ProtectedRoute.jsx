// src/components/common/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { user, isAuthenticated } = {
    isAuthenticated: true, // Change to false to test guest redirect to /auth/login
    user: {
      name: "Test User",
      role: "USER", // 🔄  'VENDOR' or 'ADMIN' to test layouts
    },
  };
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />; // FIX: Point to auth/login
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />; // FIX: Send to home or an 'Unauthorized' page
  }

  return <Outlet />;
};

export default ProtectedRoute;

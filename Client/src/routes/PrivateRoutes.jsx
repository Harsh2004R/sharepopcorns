// src/routes/privateRoutes.jsx
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";
const AddMovieOrWebSeries = lazy(() => 
  import("../features/addMovieOrWebSeries/pages/AddMovieOrWebSeries.jsx")
);
const PublicLayout = lazy(() => import("../layouts/PublicLayout.jsx"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const AdminDashboard = lazy(
  () => import("../features/admin/pages/AdminDashboard.jsx"),
);
const Test = lazy(() => import("../features/test/pages/Test.jsx"));

export const privateRoutes = [
  // ==========================================
  // 1. CUSTOMER ROUTES (Needs Auth, uses Public Header/Footer)
  // ==========================================
  {
    element: <ProtectedRoute allowedRoles={["USER", "ADMIN"]} />,
    children: [
      {
        element: <PublicLayout />, // Re-using your existing layout!
        children: [
          {
            path: "/add",
            element: <AddMovieOrWebSeries />,
          },
          // You might want to move /order and /placed here if checkout requires login!
        ],
      },
    ],
  },

  // ==========================================
  //  ADMIN ROUTES (Needs Admin Auth)
  // ==========================================
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <AdminLayout />, // Custom layout for superusers
        children: [
          {
            path: "/admin/dashboard",
            element: <AdminDashboard />,
          },
          // path: "/admin/users", etc...
        ],
      },
    ],
  },
];

// src/routes/PrivateRoutes.jsx
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";

const PublicLayout = lazy(() => import("../layouts/PublicLayout.jsx"));
const SimpleLayout = lazy(() => import("../layouts/SimpleLayout.jsx"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout.jsx"));

const Home = lazy(() => import("../features/home/pages/Home.jsx"));
const MyCollection = lazy(
  () => import("../features/myCollection/pages/MyCollection.jsx"),
);
const MyPlaylist = lazy(
  () => import("../features/myPlaylist/pages/MyPlaylist.jsx"),
);
const Profile = lazy(() => import("../features/profile/pages/Profile.jsx"));
const AddMovieOrWebSeries = lazy(
  () => import("../features/addMovieOrWebSeries/pages/AddMovieOrWebSeries.jsx"),
);
const MovieDetails = lazy(
  () => import("../features/movieDetails/pages/MovieDetails.jsx"),
);
const AddNewPlaylist = lazy(
  () => import("../features/addNewPlaylist/pages/AddNewPlaylist.jsx"),
);
const AdminDashboard = lazy(
  () => import("../features/admin/pages/AdminDashboard.jsx"),
);

export const privateRoutes = [
  // ==========================================
  // 1. CUSTOMER & ADMIN ROUTES
  // ==========================================
  {
    element: <ProtectedRoute allowedRoles={["customer", "admin"]} />,
    children: [
      // A. Primary Bottombar Tab Screens
      {
        element: <PublicLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/my-collection", element: <MyCollection /> },
          { path: "/my-playlist", element: <MyPlaylist /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
      // B. Focused Form & Detail Screens (Backbar only, no Bottombar clutter)
      {
        element: <SimpleLayout />,
        children: [
          { path: "/add", element: <AddMovieOrWebSeries /> },
          { path: "/movies/:id", element: <MovieDetails /> },
          { path: "/movies/:id/edit", element: <AddMovieOrWebSeries /> },
          { path: "/add-new/playlist", element: <AddNewPlaylist /> },
        ],
      },
    ],
  },

  // ==========================================
  // 2. ADMIN ROUTES
  // ==========================================
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [{ path: "/admin/dashboard", element: <AdminDashboard /> }],
      },
    ],
  },
];

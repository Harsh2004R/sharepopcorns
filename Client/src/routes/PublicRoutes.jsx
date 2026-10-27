// src/routes/PublicRoutes.jsx
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AuthLayout = lazy(() => import("../layouts/AuthLayout.jsx"));
const SimpleLayout = lazy(() => import("../layouts/SimpleLayout.jsx"));
const VerifyEmail = lazy(
  () => import("../features/verifyEmail/pages/VerifyEmail.jsx"),
);
const ForgotPassword = lazy(
  () => import("../features/forgetPassword/pages/ForgotPassword.jsx"),
);
const Login = lazy(() => import("../features/login/pages/Login.jsx"));
const Welcome = lazy(() => import("../features/welcome/pages/Welcome.jsx"));
const Signup = lazy(() => import("../features/signup/pages/Signup.jsx"));
const ResetPassword = lazy(
  () => import("../features/resetPassword/pages/ResetPassword.jsx"),
);
const PlaylistDetails = lazy(
  () => import("../features/playlistDetails/pages/PlaylistDetails.jsx"),
);

export const publicRoutes = [
  // 🔐 Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "forget-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  // 🌐 Publicly Shareable Playlist Reel (Backend uses optionalAuthenticate)
  {
    element: <SimpleLayout />,
    children: [
      {
        path: "/playlist/:id",
        element: <PlaylistDetails />,
      },
    ],
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
];

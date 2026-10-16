import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout.jsx";

const VerifyEmail = lazy(
  () => import("../features/verifyEmail/pages/VerifyEmail.jsx"),
);
const ForgotPassword = lazy(
  () => import("../features/forgetPassword/pages/ForgotPassword.jsx"),
);
const AuthLayout = lazy(() => import("../layouts/AuthLayout.jsx"));
// 🚀 Industry Standard: Lazy load feature components to reduce initial bundle size
const Home = lazy(() => import("../features/home/pages/Home.jsx"));
const Login = lazy(() => import("../features/login/pages/Login.jsx"));
const Welcome = lazy(() => import("../features/welcome/pages/Welcome.jsx"));
const Signup = lazy(() => import("../features/signup/pages/Signup.jsx"));
const ResetPassword = lazy(
  () => import("../features/resetPassword/pages/ResetPassword.jsx"),
);
const MyCollection = lazy(
  () => import("../features/myCollection/pages/MyCollection.jsx"),
);

export const publicRoutes = [
  {
    element: <PublicLayout />, // Wraps all child routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-collection",
        element: <MyCollection />,
      },
    ],
  },

  // 🔐 Auth Routes (Clean Screen: Split View on PC, No Navbar/Footer)
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

  {
    path: "/welcome",
    element: <Welcome />,
  },
  // {
  //   element: <SimpleLayout />,
  //   children: [
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //     {
  //       path: "/signup",
  //       element: <Signup />,
  //     },
  //   ],
  // },
];

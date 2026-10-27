// src/layouts/AuthLayout.jsx
import React, { Suspense } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Container, Text } from "@chakra-ui/react";
import Backbar from "./Backbar/Backbar.jsx";

const getPageMeta = (pathname) => {
  if (pathname.includes("/auth/signup")) return { title: "Sign Up" };
  if (pathname.includes("/auth/verify-email")) return { title: "Verify Email" };
  if (pathname.includes("/auth/login")) return { title: "Login" };
  if (pathname.includes("/auth/forget-password"))
    return { title: "Forgot Password" };
  if (pathname.includes("/auth/reset-password"))
    return { title: "Reset Password" };
  return { title: "SharePopcorns" };
};

export const AuthLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { title } = getPageMeta(location.pathname);

  // Prevent logged-in users from seeing login/signup screens
  if (isAuthenticated && !location.pathname.includes("/auth/reset-password")) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container
      maxW="xl"
      mx="auto"
      p={0}
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box minH="98vh" w="100%">
        <Backbar title={title} />
        <Box as="main" flex="1" w="full">
          <Suspense
            fallback={
              <Text p={8} color="neutralMuted">
                Loading...
              </Text>
            }
          >
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;

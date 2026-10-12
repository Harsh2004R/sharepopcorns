import React from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar/TopBar.jsx";
import { Box, Container, Text, Heading, Image } from "@chakra-ui/react";
import Backbar from "./Backbar/Backbar.jsx";

const getPageMeta = (pathname) => {
  if (pathname.includes("/auth/signup")) return { title: "Sign Up" };
   if (pathname.includes("/auth/login")) return { title: "Login" };
  if (pathname.includes("/playlist/")) return { title: "Playlist" };
  if (pathname === "/") return { title: "Home" };

  return { title: "App", icon: null };
};
export const AuthLayout = () => {
  const location = useLocation();
  const { title, icon } = getPageMeta(location.pathname);
  return (
    <Box minH="100vh" w="full" bg="#FFFFFF">
      <Container
        maxW="xl" // Production Standard Max Width (or 1440px)
        mx="auto"
        p={0}
        minH="100vh"
        display="flex"
        flexDirection="column"
        // borderRight="1px solid #ddd"
        //  borderLeft="1px solid #ddd"
      >
        <Box minH="98vh"  w="100%">
          <Backbar title={title} />
          {/* <TopBar /> */}
          <Box as="main" flex="1" w="full">
            <Suspense
              fallback={
                <Text p={8} color="text.muted">
                  Loading...
                </Text>
              }
            >
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;

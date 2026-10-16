// src/layouts/PublicLayout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, Text, Container } from "@chakra-ui/react";
import Bottombar from "./Bottombar/Bottombar.jsx";
import Footer from "../layouts/Footer/Footer.jsx";
import TopBar from "./TopBar/TopBar.jsx";
const PublicLayout = () => {
  return (
    <Container
      maxW="xl"
      mx="auto"
      p={0}
      bg="background"
      // border="1px solid red"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      {/* Integrated Public components */}
      <TopBar />

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

      <Bottombar />
    </Container>
  );
};

export default PublicLayout;

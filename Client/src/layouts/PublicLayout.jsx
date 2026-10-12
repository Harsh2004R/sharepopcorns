// src/layouts/PublicLayout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, Text, Container } from "@chakra-ui/react";
import Navbar from "../layouts/Navbar/Navbar.jsx";
import Footer from "../layouts/Footer/Footer.jsx";
const PublicLayout = () => {
  return (
    // Outer Box ensures the full page background spans 100% width
    <Box minH="100vh" w="full" bg="#FFFFFF">
      {/* 
        Container restricts maximum width (e.g., 1280px / 1440px / 7xl) 
        and automatically centers content with mx="auto"
      */}
      <Container
        maxW="xl" // Production Standard Max Width (or 1440px)
        mx="auto"
        p={0}
        // px={{ base: "16px", md: "24px", lg: "32px" }}
        minH="100vh"
        display="flex"
        flexDirection="column"
      >
        {/* Integrated Public Navbar */}
        <Navbar />

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

        <Footer />
      </Container>
    </Box>
  );
};

export default PublicLayout;

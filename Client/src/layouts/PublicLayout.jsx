// src/layouts/PublicLayout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, Text, Container } from "@chakra-ui/react";
import Bottombar from "./Bottombar/Bottombar.jsx";
import TopBar from "./TopBar/TopBar.jsx";

const PublicLayout = () => {
  return (
    <Container
      maxW="xl"
      mx="auto"
      p={0}
      bg="background"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      {/* <TopBar /> */}

      <Box as="main" flex="1" w="full" pb="85px">
        <Suspense
          fallback={
            <Text p={8} color="neutralMuted" textAlign="center">
              Loading your cinema nook... 🍿
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

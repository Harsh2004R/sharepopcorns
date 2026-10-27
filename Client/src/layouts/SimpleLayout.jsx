// src/layouts/SimpleLayout.jsx
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Container, Text } from "@chakra-ui/react";
import Backbar from "./Backbar/Backbar.jsx";

const getSimpleTitle = (pathname) => {
  if (pathname.includes("/add-new/playlist")) return "New Playlist";
  if (pathname.includes("/edit")) return "Edit Cinema Memory";
  if (pathname.includes("/add")) return "Log Cinema Memory";
  if (pathname.includes("/movies/")) return "Movie Details";
  if (pathname.includes("/playlist/")) return "Curated Reel";
  return "SharePopcorns";
};

export const SimpleLayout = () => {
  const location = useLocation();
  const title = getSimpleTitle(location.pathname);

  return (
    <Container maxW="xl" minH="100vh" mx="auto" p={0} bg="background">
      <Backbar title={title} />
      <Box as="main" flex="1" w="full">
        <Suspense
          fallback={
            <Text p={8} color="neutralMuted" textAlign="center">
              Loading... 🍿
            </Text>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
    </Container>
  );
};

export default SimpleLayout;

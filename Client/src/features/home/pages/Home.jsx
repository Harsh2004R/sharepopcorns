// src/features/home/pages/Home.jsx
import React from "react";
import { Box } from "@chakra-ui/react";
import UpcomingWatches from "../components/UpcomingWatches.jsx";
import RecentlyWatched from "../components/RecentlyWatched.jsx";
import WelcomeUser from "../components/WelcomeUser.jsx";

function Home() {
  return (
    <Box px={4} pb={6}>
      <WelcomeUser />
      <UpcomingWatches />
      <RecentlyWatched />
    </Box>
  );
}

export default Home;

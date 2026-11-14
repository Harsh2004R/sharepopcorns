// src/features/home/pages/Home.jsx
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import UpcomingWatches from "../components/UpcomingWatches.jsx";
import RecentlyWatched from "../components/RecentlyWatched.jsx";
import WelcomeUser from "../components/WelcomeUser.jsx";
import { useMoviesQuery } from "../../../hooks/useMovieQueries.js";

function Home() {
  const { data, isLoading } = useMoviesQuery();
  const totalSavedTitles = data?.pagination?.total ?? data?.movies?.length ?? 0;
  const isNewUser = !isLoading && totalSavedTitles === 0;
  return (
    <Box px={4} pb={6}>
      <WelcomeUser />
      {isNewUser || <UpcomingWatches />}
      {isNewUser || <RecentlyWatched />}
      {isNewUser && <Text textAlign={"center"} my="20px" fontSize={"xs"} color="neutralMuted">You might like</Text>}
    </Box>
  );
}

export default Home;

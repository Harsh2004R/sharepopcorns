import React from "react";
import { Flex } from "@chakra-ui/react";
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx";
import UpcomingWatches from "../components/UpcomingWatches.jsx";
import RecentlyWatched from "../components/RecentlyWatched.jsx";
import WelcomeUser from "../components/WelcomeUser.jsx";

function Home() {
  return (
    <>
      <WelcomeUser />
      <UpcomingWatches />
      <RecentlyWatched />
      <Flex gap={4} wrap="wrap" p={5}>
        {/* Standard variants */}
        <CustomBadge variant="primary">New</CustomBadge>
        <CustomBadge variant="success">Completed</CustomBadge>
        <CustomBadge variant="fail">Failed</CustomBadge>
        <CustomBadge variant="process">In Progress</CustomBadge>
        <CustomBadge variant="info">Update</CustomBadge>

        {/* Special variants */}
        <CustomBadge variant="date">Oct 12, 2026</CustomBadge>
        <CustomBadge variant="ratings">★ 4.8</CustomBadge>
        <CustomBadge variant="ticket">VIP PASS</CustomBadge>

        {/* Tilt Animations */}
        <CustomBadge variant="primary" tilt="left">
          Leaning Left
        </CustomBadge>
        <CustomBadge variant="secondary" tilt="right">
          Leaning Right
        </CustomBadge>
      </Flex>
    </>
  );
}

export default Home;

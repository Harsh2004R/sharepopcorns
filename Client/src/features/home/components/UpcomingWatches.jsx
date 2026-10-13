import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Clock, Users, Bell } from "lucide-react";
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx"; // Adjust import path as needed

const UpcomingWatches = () => {
  return (
    <Box w="full" maxW="lg" mx="auto">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={5} px={1}>
        <Flex gap={2} align="center">
          <Text fontSize="xl">📅</Text>
          <Text fontSize="xl" fontWeight="bold" color="neutral">
            Upcoming Watches
          </Text>
        </Flex>
        <Text fontSize="sm" fontWeight="bold" color="tertiary" cursor="pointer">
          Friday Sync
        </Text>
      </Flex>

      {/* Main Card */}
      <Box
        bg="white"
        p={4}
        borderRadius="3xl"
        position="relative"
        overflow="hidden"
        boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
      >
        {/* Tilted Ribbon utilizing the custom badge variant */}
        <Box position="absolute" top="15px" right="-15px" zIndex={2}>
          <CustomBadge
            variant="secondary"
            tilt="right"
            px={8}
            py={1}
            borderRadius="none"
            boxShadow="sm"
          >
            IN 2 DAYS
          </CustomBadge>
        </Box>

        <Flex gap={4}>
          {/* Left Image with internal overlay ticket badge */}
          <Box
            position="relative"
            w="110px"
            h="150px"
            borderRadius="2xl"
            p={1}
            bg="neutralSoft"
            flexShrink={0}
          >
            <Image
              src="https://rukminim2.flixcart.com/image/1500/1500/xif0q/poster/x/x/f/medium-dune-part-two-poster-300-gsm-12x18-unframed-multicolor-original-imahakkgyfgeg5df.jpeg"
              w="full"
              h="full"
              objectFit="cover"
              borderRadius="xl"
              alt="Dune Part Two"
            />
            <Box position="absolute" bottom={2} left={2}>
              <CustomBadge
                variant="ticket"
                bg="white"
                border="none"
                color="neutral"
                fontSize="2xs"
                px={2.5}
                py={0.5}
                borderRadius="full"
                textTransform="capitalize"
                letterSpacing="normal"
                boxShadow="sm"
              >
                Sci-Fi
              </CustomBadge>
            </Box>
          </Box>

          {/* Right Content Area */}
          <Flex direction="column" pt={2} pb={1}>
            <Text fontWeight="bold" fontSize="lg" color="neutral" mb={1} pr={8}>
              Dune: Part Two
            </Text>

            <Flex gap={1.5} align="center" color="primary">
              <Clock size={16} strokeWidth={2.5} />
              <Text fontWeight="bold" fontSize="sm">
                Friday • 8:30 PM
              </Text>
            </Flex>

            {/* Bottom Action Badges */}
            <Flex gap={2} mt="auto">
              <CustomBadge
                variant="primary"
                bg="primarySoft"
                color="primary"
                gap={1.5}
                textTransform="none"
                borderRadius="full"
                letterSpacing="normal"
              >
                <Users size={14} strokeWidth={2.5} /> With Alex
              </CustomBadge>

              <CustomBadge
                variant="date"
                bg="neutralSoft"
                border="none"
                gap={1.5}
                textTransform="none"
                borderRadius="full"
                letterSpacing="normal"
              >
                <Bell size={14} strokeWidth={2.5} color="#9296A8" /> Alert ON
              </CustomBadge>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default UpcomingWatches;

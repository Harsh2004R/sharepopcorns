import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { ChevronRight, Star } from "lucide-react";
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx"; // Adjust import path as needed

const mockRecentlyWatched = [
  {
    id: 1,
    type: "Movie",
    badgeBg: "secondarySoft",
    badgeColor: "secondaryDark",
    date: "2 days ago",
    title: "Spirited Away",
    desc: '"The coziest comfort watch ev..."',
    rating: "9.5",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MjaJsFw5Qao82pign5xuxvvEbSdDg1FUCDnrXE0vo9yT-puloq_Z&usqp=CAE&s",
  },
  {
    id: 2,
    type: "Movie",
    badgeBg: "secondarySoft",
    badgeColor: "secondaryDark",
    date: "Last Sunday",
    title: "Past Lives",
    desc: '"In-yun connection touched m..."',
    rating: "9.0",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKnTsEGHURHJuQ8dYRpqmFdeoAWEx61yKpBvJtP91UdoIQzsmKLz2&usqp=CAE&s",
  },
  {
    id: 3,
    type: "Series",
    badgeBg: "primarySoft",
    badgeColor: "primary",
    date: "May 12",
    title: "Heartstopper S2",
    desc: '"Pure warm sunshine energy"',
    rating: "8.8",
    img: "https://i.pinimg.com/474x/74/b3/bf/74b3bf537e2f66841d62c964c241f34b.jpg",
  },
];

const RecentlyWatched = () => {
  return (
    <Box mb={10} w="full" maxW="lg" mx="auto">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={5} px={1}>
        <Flex gap={2} align="center">
          <Text fontSize="xl">🍿</Text>
          <Text fontSize="xl" fontWeight="bold" color="neutral">
            Recently Watched
          </Text>
        </Flex>
        <Flex align="center" gap={1} color="primary" cursor="pointer">
          <Text fontSize="sm" fontWeight="bold">
            View All
          </Text>
          <ChevronRight size={16} strokeWidth={2.5} />
        </Flex>
      </Flex>

      {/* Cards List */}
      <VStack gap={4} align="stretch">
        {mockRecentlyWatched.map((item) => (
          <Flex
            key={item.id}
            bg="white"
            p={3}
            borderRadius="3xl"
            gap={4}
            align="center"
            boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
          >
            {/* Image */}
            <Box
              w="70px"
              h="100px"
              borderRadius="2xl"
              overflow="hidden"
              bg="neutralSoft"
              flexShrink={0}
            >
              <Image
                src={item.img}
                w="full"
                h="full"
                objectFit="cover"
                alt={item.title}
              />
            </Box>

            {/* Content */}
            <Flex direction="column" flex={1} justify="center" gap={0.5}>
              <Flex gap={2} align="center" mb={1}>
                <CustomBadge
                  variant="primary"
                  bg={item.badgeBg}
                  color={item.badgeColor}
                  textTransform="capitalize"
                  px={2}
                  py={0.5}
                  borderRadius="md"
                  letterSpacing="normal"
                >
                  {item.type}
                </CustomBadge>
                <Text fontSize="sm" color="neutralMuted">
                  {item.date}
                </Text>
              </Flex>
              <Text
                fontWeight="bold"
                color="neutral"
                fontSize="md"
                lineClamp={1}
              >
                {item.title}
              </Text>
              <Text fontSize="sm" color="neutralMuted" lineClamp={1}>
                {item.desc}
              </Text>
            </Flex>

            {/* Rating Section */}
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap={1}
              minW="65px"
            >
              <CustomBadge
                variant="ratings"
                textTransform="none"
                gap={1}
                px={2}
              >
                <Star size={12} fill="currentColor" strokeWidth={2.5} />
                {item.rating}
              </CustomBadge>
              <Text fontSize="xs" color="neutralMuted">
                My Rating
              </Text>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default RecentlyWatched;

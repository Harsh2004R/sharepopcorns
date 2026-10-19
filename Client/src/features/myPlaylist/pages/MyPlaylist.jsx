import React, { useState, useMemo } from "react";
import { Box, Flex, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import {
  Plus,
  Globe,
  Lock,
  MoreHorizontal,
  ArrowRight,
  Ticket,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge"; // Adjust path as needed
import { CustomButton } from "../../../shared/components/CustomButton"; // Adjust path as needed

// ==========================================
// DUMMY PLAYLIST DATA
// ==========================================
const mockPlaylists = [
  {
    id: 1,
    title: "Rainy Day Ghibli",
    privacy: "Public",
    filmsCount: 8,
    description:
      "Whimsical comfort animations for rainy Sundays with warm chamomile tea.",
    author: "By Mia (You)",
    authorEmoji: "🍿",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Late Night Mind-Benders",
    privacy: "Private",
    filmsCount: 12,
    description:
      "Complex psychological thrillers and mystery puzzles to dissect at 2 AM.",
    author: "By Mia (You)",
    authorEmoji: "🎬",
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=300&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Autumn Nostalgia & Sweaters",
    privacy: "Public",
    filmsCount: 6,
    description:
      "Cozy coming-of-age dramas, golden foliage palettes, and acoustic scores.",
    author: "By Mia (You)",
    authorEmoji: "🍂",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=300&auto=format&fit=crop",
    ],
  },
  {
    id: 4,
    title: "Secret Guilty Pleasures",
    privacy: "Private",
    filmsCount: 9,
    description:
      "Cheesy 2000s rom-coms and dance movies for rainy weekend marathons.",
    author: "By Mia (You)",
    authorEmoji: "✨",
    images: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300&auto=format&fit=crop",
    ],
  },
];

const MyPlaylist = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "public" | "private"

  // Dynamic filter counts
  const counts = useMemo(() => {
    return {
      all: mockPlaylists.length,
      public: mockPlaylists.filter((p) => p.privacy === "Public").length,
      private: mockPlaylists.filter((p) => p.privacy === "Private").length,
    };
  }, []);

  // Filtered list
  const filteredPlaylists = useMemo(() => {
    if (activeFilter === "public") {
      return mockPlaylists.filter((p) => p.privacy === "Public");
    }
    if (activeFilter === "private") {
      return mockPlaylists.filter((p) => p.privacy === "Private");
    }
    return mockPlaylists;
  }, [activeFilter]);

  return (
    <Box
      minH="100vh"
      w="full"
      bg="white"
      fontFamily="body"
      px={2}
      pt={3}
      pb={24}
    >
      <Box maxW="lg" mx="auto">
        {/* ========================================================
            1. HERO CURATOR NOOK CARD[cite: 20]
            ======================================================== */}
        <Box
          w="full"
          bg="white"
          borderRadius="3xl"
          p={5}
          mb={5}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 8px 24px rgba(30, 34, 56, 0.04)"
          position="relative"
          overflow="hidden"
          background="linear-gradient(135deg, #FFFFFF 65%, #FFF7DF 100%)" // Warm ambient gradient
        >
          {/* Header Row: Badge & Action Button[cite: 20] */}
          <Flex justify="space-between" align="center" mb={3}>
            <CustomBadge
              variant="ratings"
              fontFamily="body"
              textTransform="none"
              px={2}
              py={1}
              fontSize="2xs"
              gap={1.5}
            >
              <Ticket size={12} color="currentColor" />
              <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                CURATOR NOOK
              </Text>
            </CustomBadge>

            <CustomButton
              variant="primary"
              w="auto"
              h="auto"
              py={2.5}
              px={2.5}
              fontSize="xs"
              fontFamily="body"
              leftElement={<Plus size={15} strokeWidth={3} />}
              onClick={() => console.log("Create new playlist")}
            >
              New Playlist
            </CustomButton>
          </Flex>

          {/* Heading & Subtitle[cite: 20] */}
          <Text
            fontFamily="body"
            fontSize="3xl"
            fontWeight="black"
            color="neutral"
            lineHeight="shorter"
            mb={1}
          >
            My Curated
            <br />
            Playlists 🎞️
          </Text>

          <Text
            fontFamily="body"
            fontSize="xs"
            color="neutralMuted"
            lineHeight="tall"
            maxW="260px"
            mb={5}
          >
            Organize movies into cozy themed watch...
          </Text>

          {/* Bottom Stats Floating Bar[cite: 20] */}
          <Flex
            bg="white"
            borderRadius="2xl"
            p={2.5}
            px={3}
            align="center"
            justify="space-between"
            // border="1px solid"
            // borderColor="neutralBorder"
            // boxShadow="sm"
          >
            <Flex align="center" gap={2.5}>
              <Flex
                w="28px"
                h="28px"
                bg="secondarySoft"
                borderRadius="full"
                align="center"
                justify="center"
                fontSize="sm"
              >
                🍿
              </Flex>
              <Text
                fontFamily="body"
                fontSize="2xs"
                fontWeight="semibold"
                color="neutral"
              >
                4 Active Shelf Collections • 35 Stored Films
              </Text>
            </Flex>

            <Flex align="center" gap={1} color="secondaryDark">
              <Sparkles size={13} fill="currentColor" />
              <Text
                fontFamily="body"
                fontSize="3xs"
                fontWeight="extrabold"
                lineHeight="1"
              >
                Butter-
                <br />
                Fresh
              </Text>
            </Flex>
          </Flex>
        </Box>

        {/* ========================================================
            2. HORIZONTAL FILTER PILLS[cite: 20]
            ======================================================== */}
        <Flex gap={2.5} mb={5} overflowX="auto" pb={1}>
          {/* ALL PLAYLISTS PILL[cite: 20] */}
          <Flex
            flex={1}
            py={2.5}
            px={3}
            borderRadius="2xl"
            align="center"
            justify="center"
            cursor="pointer"
            bg={activeFilter === "all" ? "primaryDark" : "neutralSoft"}
            color={activeFilter === "all" ? "white" : "neutral"}
            transition="all 0.2s"
            boxShadow={activeFilter === "all" ? "xs" : "none"}
            onClick={() => setActiveFilter("all")}
          >
            <Text
              fontFamily="body"
              fontSize="xs"
              fontWeight="bold"
              textAlign="center"
            >
              All Playlists ({counts.all})
            </Text>
          </Flex>

          {/* PUBLIC PILL[cite: 20] */}
          <Flex
            flex={1}
            py={2.5}
            px={3}
            borderRadius="2xl"
            align="center"
            justify="center"
            gap={1.5}
            cursor="pointer"
            bg={activeFilter === "public" ? "primaryDark" : "tertiarySoft"}
            color={activeFilter === "public" ? "white" : "neutral"}
            transition="all 0.2s"
            boxShadow={activeFilter === "public" ? "sm" : "none"}
            onClick={() => setActiveFilter("public")}
          >
            <Globe size={14} color="currentColor" />
            <Text fontFamily="body" fontSize="xs" fontWeight="bold">
              Public ({counts.public})
            </Text>
          </Flex>

          {/* PRIVATE PILL[cite: 20] */}
          <Flex
            flex={1}
            py={2.5}
            px={3}
            borderRadius="2xl"
            align="center"
            justify="center"
            gap={1.5}
            cursor="pointer"
            bg={activeFilter === "private" ? "primaryDark" : "tertiarySoft"}
            color={activeFilter === "private" ? "white" : "neutral"}
            transition="all 0.2s"
            boxShadow={activeFilter === "private" ? "sm" : "none"}
            onClick={() => setActiveFilter("private")}
          >
            <Lock size={14} color="currentColor" />
            <Text fontFamily="body" fontSize="xs" fontWeight="bold">
              Private ({counts.private})
            </Text>
          </Flex>
        </Flex>

        {/* ========================================================
            3. PLAYLIST CARDS LIST[cite: 20]
            ======================================================== */}
        <VStack gap={4} align="stretch">
          {filteredPlaylists.map((playlist) => {
            const isPublic = playlist.privacy === "Public";

            return (
              <Box
                key={playlist.id}
                bg="white"
                borderRadius="3xl"
                p={5}
                border="1px solid"
                borderColor="neutralBorder"
                boxShadow="0 4px 16px rgba(0, 0, 0, 0.02)"
                transition="all 0.2s"
                _hover={{
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
                  transform: "translateY(-2px)",
                }}
              >
                {/* Card Top Row: Privacy Pill, Count & Options Menu[cite: 20] */}
                <Flex justify="space-between" align="center" mb={3.5}>
                  <Flex align="center" gap={2}>
                    <CustomBadge
                      variant="info"
                      bg={isPublic ? "tertiarySoft" : "neutralSoft"}
                      color={isPublic ? "tertiaryDark" : "neutral"}
                      fontFamily="body"
                      textTransform="none"
                      px={2.5}
                      py={0.8}
                      fontSize="2xs"
                      fontWeight="bold"
                      gap={1}
                    >
                      {isPublic ? (
                        <Globe size={11} color="currentColor" />
                      ) : (
                        <Lock size={11} color="currentColor" />
                      )}
                      {playlist.privacy}
                    </CustomBadge>

                    <Text
                      fontFamily="body"
                      fontSize="xs"
                      color="neutralMuted"
                      fontWeight="medium"
                    >
                      {playlist.filmsCount} films
                    </Text>
                  </Flex>

                  <Box
                    color="neutralMuted"
                    cursor="pointer"
                    _hover={{ color: "neutral" }}
                  >
                    <MoreHorizontal size={18} color="currentColor" />
                  </Box>
                </Flex>

                {/* 3-Thumbnail Preview Strip[cite: 20] */}
                <Box bg="neutralSoft" p={2} borderRadius="2xl" mb={4}>
                  <SimpleGrid columns={3} gap={2}>
                    {playlist.images.map((imgUrl, idx) => (
                      <Box
                        key={idx}
                        h="80px"
                        borderRadius="xl"
                        overflow="hidden"
                        bg="white"
                      >
                        <Image
                          src={imgUrl}
                          alt={`${playlist.title} frame ${idx + 1}`}
                          w="full"
                          h="full"
                          objectFit="cover"
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Playlist Title & Description[cite: 20] */}
                <Text
                  fontFamily="body"
                  fontSize="xl"
                  fontWeight="bold"
                  color="neutral"
                  lineHeight="shorter"
                  mb={1}
                >
                  {playlist.title}
                </Text>

                <Text
                  fontFamily="body"
                  fontSize="xs"
                  color="neutralMuted"
                  lineHeight="tall"
                  mb={4}
                >
                  {playlist.description}
                </Text>

                {/* Bottom Row: Author & Action Link[cite: 20] */}
                <Flex justify="space-between" align="center" pt={1}>
                  <Flex align="center" gap={2}>
                    <Flex
                      w="24px"
                      h="24px"
                      bg="secondary"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      fontSize="2xs"
                    >
                      {playlist.authorEmoji}
                    </Flex>
                    <Text
                      fontFamily="body"
                      fontSize="2xs"
                      fontWeight="semibold"
                      color="neutral"
                    >
                      {playlist.author}
                    </Text>
                  </Flex>

                  {/* View Reel Link[cite: 20] */}
                  <Flex
                    align="center"
                    gap={1}
                    color="primary"
                    cursor="pointer"
                    _hover={{ color: "primaryDark" }}
                    onClick={() => navigate(`/playlist/${playlist.id}`)}
                  >
                    <Text fontFamily="body" fontSize="xs" fontWeight="bold">
                      View Reel
                    </Text>
                    <ArrowRight
                      size={13}
                      color="currentColor"
                      strokeWidth={2.5}
                    />
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};

export default MyPlaylist;

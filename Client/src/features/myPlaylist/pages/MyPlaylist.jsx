// src/features/myPlaylist/pages/MyPlaylist.jsx
import React, { useState, useMemo } from "react";
import { Box, Flex, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import {
  Plus,
  Globe,
  Lock,
  ArrowRight,
  Ticket,
  Sparkles,
  Film,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import { CustomButton } from "../../../shared/components/CustomButton";
import { useUserPlaylistsQuery } from "../../../hooks/usePlaylistQueries.js";

const MyPlaylist = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: playlists = [], isLoading } = useUserPlaylistsQuery(user?._id);

  const counts = useMemo(() => {
    const publicCount = playlists.filter((p) => p.isPublic).length;
    return {
      all: playlists.length,
      public: publicCount,
      private: playlists.length - publicCount,
      totalFilms: playlists.reduce(
        (acc, p) => acc + (p.movies?.length || 0),
        0,
      ),
    };
  }, [playlists]);

  const filteredPlaylists = useMemo(() => {
    if (activeFilter === "public") return playlists.filter((p) => p.isPublic);
    if (activeFilter === "private") return playlists.filter((p) => !p.isPublic);
    return playlists;
  }, [playlists, activeFilter]);

  const firstName = user?.name ? user.name.split(" ")[0] : "You";

  return (
    <Box
      minH="100vh"
      w="full"
      bg="background"
      fontFamily="body"
      px={4}
      pt={3}
      pb={12}
    >
      <Box maxW="lg" mx="auto">
        {/* HERO CURATOR NOOK CARD */}
        <Box
          w="full"
          bg="white"
          borderRadius="3xl"
          p={5}
          mb={5}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 8px 24px rgba(30, 34, 56, 0.04)"
          background="linear-gradient(135deg, #FFFFFF 65%, #FFF7DF 100%)"
        >
          <Flex justify="space-between" align="center" mb={3}>
            <CustomBadge
              variant="ratings"
              textTransform="none"
              px={2}
              py={1}
              fontSize="2xs"
              gap={1.5}
            >
              <Ticket size={12} color="currentColor" />
              <Text fontSize="2xs" fontWeight="bold">
                CURATOR NOOK
              </Text>
            </CustomBadge>

            <CustomButton
              variant="primary"
              w="auto"
              h="auto"
              py={2.5}
              px={3}
              fontSize="xs"
              leftElement={<Plus size={15} strokeWidth={3} />}
              onClick={() => navigate("/add-new/playlist")}
            >
              New Playlist
            </CustomButton>
          </Flex>

          <Text
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
            fontSize="xs"
            color="neutralMuted"
            lineHeight="tall"
            maxW="260px"
            mb={5}
          >
            Organize movies into cozy themed watch shelves & shareable reels.
          </Text>

          <Flex
            bg="white"
            borderRadius="2xl"
            p={2.5}
            px={3}
            align="center"
            justify="space-between"
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
              <Text fontSize="2xs" fontWeight="semibold" color="neutral">
                {counts.all} Active Shelves • {counts.totalFilms} Stored Films
              </Text>
            </Flex>

            <Flex align="center" gap={1} color="secondaryDark">
              <Sparkles size={13} fill="currentColor" />
              <Text fontSize="3xs" fontWeight="extrabold" lineHeight="1">
                Butter-
                <br />
                Fresh
              </Text>
            </Flex>
          </Flex>
        </Box>

        {/* HORIZONTAL FILTER PILLS */}
        <Flex gap={2.5} mb={5} overflowX="auto" pb={1}>
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
            onClick={() => setActiveFilter("all")}
          >
            <Text fontSize="xs" fontWeight="bold">
              All ({counts.all})
            </Text>
          </Flex>

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
            onClick={() => setActiveFilter("public")}
          >
            <Globe size={14} />
            <Text fontSize="xs" fontWeight="bold">
              Public ({counts.public})
            </Text>
          </Flex>

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
            onClick={() => setActiveFilter("private")}
          >
            <Lock size={14} />
            <Text fontSize="xs" fontWeight="bold">
              Private ({counts.private})
            </Text>
          </Flex>
        </Flex>

        {/* PLAYLIST CARDS LIST */}
        {isLoading ? (
          <Text fontSize="sm" color="neutralMuted" textAlign="center" py={8}>
            Loading your curated shelves... 🎞️
          </Text>
        ) : filteredPlaylists.length === 0 ? (
          <Box
            bg="white"
            p={8}
            borderRadius="3xl"
            textAlign="center"
            border="1px dashed"
            borderColor="neutralBorder"
          >
            <Text fontSize="2xl" mb={2}>
              🎞️
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="neutral">
              No playlists found
            </Text>
            <Text fontSize="xs" color="neutralMuted" mt={1} mb={4}>
              Create your first themed movie shelf to organize your favorites!
            </Text>
            <CustomButton
              variant="primary"
              w="auto"
              px={5}
              onClick={() => navigate("/add-new/playlist")}
            >
              + Create New Playlist
            </CustomButton>
          </Box>
        ) : (
          <VStack gap={4} align="stretch">
            {filteredPlaylists.map((playlist) => {
              const isPublic = Boolean(playlist.isPublic);
              const filmCount = playlist.movies?.length || 0;

              return (
                <Box
                  key={playlist._id}
                  bg="white"
                  borderRadius="3xl"
                  p={5}
                  border="1px solid"
                  borderColor="neutralBorder"
                  boxShadow="0 4px 16px rgba(0, 0, 0, 0.02)"
                  cursor="pointer"
                  onClick={() => navigate(`/playlist/${playlist._id}`)}
                  transition="all 0.2s"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  <Flex justify="space-between" align="center" mb={3}>
                    <Flex align="center" gap={2}>
                      <CustomBadge
                        variant="info"
                        bg={isPublic ? "tertiarySoft" : "neutralSoft"}
                        color={isPublic ? "tertiaryDark" : "neutral"}
                        textTransform="none"
                        px={2.5}
                        py={0.8}
                        fontSize="2xs"
                        fontWeight="bold"
                        gap={1}
                      >
                        {isPublic ? <Globe size={11} /> : <Lock size={11} />}
                        {isPublic ? "Public" : "Private"}
                      </CustomBadge>

                      <Text
                        fontSize="xs"
                        color="neutralMuted"
                        fontWeight="medium"
                      >
                        {filmCount} {filmCount === 1 ? "film" : "films"}
                      </Text>
                    </Flex>

                    <Film size={16} color="#73778D" />
                  </Flex>

                  <Text fontSize="xl" fontWeight="bold" color="neutral" mb={1}>
                    {playlist.name}
                  </Text>

                  <Text
                    fontSize="xs"
                    color="neutralMuted"
                    lineHeight="tall"
                    mb={4}
                  >
                    {playlist.description || "Curated cinema collection."}
                  </Text>

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
                        🍿
                      </Flex>
                      <Text
                        fontSize="2xs"
                        fontWeight="semibold"
                        color="neutral"
                      >
                        By {firstName} (You)
                      </Text>
                    </Flex>

                    <Flex align="center" gap={1} color="primary">
                      <Text fontSize="xs" fontWeight="bold">
                        View Reel
                      </Text>
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default MyPlaylist;

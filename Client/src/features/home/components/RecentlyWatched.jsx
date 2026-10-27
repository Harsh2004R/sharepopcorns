// src/features/home/components/RecentlyWatched.jsx
import React, { useMemo } from "react";
import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx";
import { useMoviesQuery } from "../../../hooks/useMovieQueries.js";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop";

const formatShortDate = (dateStr) => {
  if (!dateStr) return "Recently";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const RecentlyWatched = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useMoviesQuery();

  const recentMovies = useMemo(() => {
    return (data?.movies || [])
      .filter((m) => m.status === "watched")
      .sort(
        (a, b) =>
          new Date(b.watchedDate || b.createdAt) -
          new Date(a.watchedDate || a.createdAt),
      )
      .slice(0, 4);
  }, [data]);

  return (
    <Box mb={10} w="full" maxW="lg" mx="auto">
      <Flex justify="space-between" align="center" mb={5} px={1}>
        <Flex gap={2} align="center">
          <Text fontSize="xl">🍿</Text>
          <Text fontSize="xl" fontWeight="bold" color="neutral">
            Recently Watched
          </Text>
        </Flex>
        <Flex
          align="center"
          gap={1}
          color="primary"
          cursor="pointer"
          onClick={() => navigate("/my-collection")}
        >
          <Text fontSize="sm" fontWeight="bold">
            View All
          </Text>
          <ChevronRight size={16} strokeWidth={2.5} />
        </Flex>
      </Flex>

      {isLoading ? (
        <Text fontSize="sm" color="neutralMuted" textAlign="center" py={6}>
          Loading your recent watches...
        </Text>
      ) : recentMovies.length === 0 ? (
        <Box
          bg="white"
          p={6}
          borderRadius="3xl"
          textAlign="center"
          border="1px dashed"
          borderColor="neutralBorder"
        >
          <Text fontSize="sm" fontWeight="bold" color="neutral">
            Your watched diary is empty
          </Text>
          <Text fontSize="xs" color="neutralMuted" mt={1}>
            Log your first movie above to start tracking ratings!
          </Text>
        </Box>
      ) : (
        <VStack gap={4} align="stretch">
          {recentMovies.map((item) => {
            const isSeries = item.type === "series";
            return (
              <Flex
                key={item._id}
                bg="white"
                p={3}
                borderRadius="3xl"
                gap={4}
                align="center"
                cursor="pointer"
                onClick={() => navigate(`/movies/${item._id}`)}
                boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
                transition="all 0.2s"
                _hover={{ transform: "translateY(-2px)" }}
              >
                <Box
                  w="70px"
                  h="100px"
                  borderRadius="2xl"
                  overflow="hidden"
                  bg="neutralSoft"
                  flexShrink={0}
                >
                  <Image
                    src={item.image || FALLBACK_POSTER}
                    w="full"
                    h="full"
                    objectFit="cover"
                    alt={item.title}
                  />
                </Box>

                <Flex direction="column" flex={1} justify="center" gap={0.5}>
                  <Flex gap={2} align="center" mb={1}>
                    <CustomBadge
                      variant="primary"
                      bg={isSeries ? "primarySoft" : "secondarySoft"}
                      color={isSeries ? "primary" : "secondaryDark"}
                      textTransform="capitalize"
                      px={2}
                      py={0.5}
                      borderRadius="md"
                      letterSpacing="normal"
                    >
                      {item.type}
                    </CustomBadge>
                    <Text fontSize="xs" color="neutralMuted">
                      {formatShortDate(item.watchedDate || item.createdAt)}
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
                    {item.description
                      ? `"${item.description}"`
                      : item.moodTags?.join(" • ") || "Logged in collection"}
                  </Text>
                </Flex>

                {item.rating !== null && item.rating !== undefined && (
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
                      {Number(item.rating).toFixed(1)}
                    </CustomBadge>
                    <Text fontSize="xs" color="neutralMuted">
                      My Rating
                    </Text>
                  </Flex>
                )}
              </Flex>
            );
          })}
        </VStack>
      )}
    </Box>
  );
};

export default RecentlyWatched;

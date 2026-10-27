// src/features/movieDetails/pages/MovieDetails.jsx
import React, { useState } from "react";
import { Box, Flex, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import {
  Star,
  Check,
  ChevronDown,
  ChevronRight,
  Edit3,
  ListPlus,
  Ticket,
  BookOpen,
  Trash2,
  Heart,
  Award,
  Sparkles,
  Film,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx";
import {
  useMovieDetailQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from "../../../hooks/useMovieQueries.js";
import {
  useUserPlaylistsQuery,
  useAddMovieToPlaylistMutation,
} from "../../../hooks/usePlaylistQueries.js";
import { toaster } from "../../../components/ui/toaster.jsx";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id: movieId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { data: movie, isLoading } = useMovieDetailQuery(movieId);
  const { mutate: updateMovie } = useUpdateMovieMutation();
  const { mutate: deleteMovie, isPending: isDeleting } =
    useDeleteMovieMutation();

  const { data: userPlaylists = [] } = useUserPlaylistsQuery(user?._id);
  const { mutate: addMovieToPlaylist } = useAddMovieToPlaylistMutation();

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showPlaylistPicker, setShowPlaylistPicker] = useState(false);

  if (isLoading) {
    return (
      <Box p={10} textAlign="center">
        <Text fontSize="sm" color="neutralMuted">
          Loading cinema memory... 🍿
        </Text>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box p={10} textAlign="center">
        <Text fontWeight="bold" color="neutral">
          Movie not found in your collection
        </Text>
        <Text
          fontSize="xs"
          color="primary"
          mt={2}
          cursor="pointer"
          onClick={() => navigate("/my-collection")}
        >
          ← Back to My Collection
        </Text>
      </Box>
    );
  }

  const handleStatusChange = (nextStatus) => {
    setShowStatusMenu(false);
    if (nextStatus === movie.status) return;
    updateMovie({
      id: movie._id,
      payload: {
        status: nextStatus,
        ...(nextStatus === "watched" && !movie.rating ? { rating: 8.5 } : {}),
      },
    });
  };

  const handleShareTicket = () => {
    navigator.clipboard?.writeText(window.location.href);
    toaster.create({
      title: "Ticket Link Copied! 🎟️",
      description: `Share "${movie.title}" with your cinema crew.`,
      type: "success",
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Remove "${movie.title}" from your collection?`)) {
      deleteMovie(movie._id, {
        onSuccess: () => navigate("/my-collection", { replace: true }),
      });
    }
  };

  // Playlists that already contain this movie
  const includedPlaylists = userPlaylists.filter((pl) =>
    pl.movies?.some((entry) => (entry.movie?._id || entry.movie) === movie._id),
  );

  const firstName = user?.name ? user.name.split(" ")[0] : "Your";

  return (
    <Box
      minH="100vh"
      w="full"
      bg="background"
      fontFamily="body"
      px={4}
      pt={4}
      pb={20}
    >
      <Box maxW="lg" mx="auto">
        {/* POLAROID POSTER SHOWCASE CARD */}
        <Box
          bg="#FBFBEE"
          p={3.5}
          pb={4}
          borderRadius="3xl"
          border="1px solid"
          borderColor="neutralBorder"
          maxW="280px"
          mx="auto"
          mb={6}
          boxShadow="0 25px 55px -10px rgba(184, 50, 80, 0.32), 0 12px 30px 65px rgba(255, 209, 102, 0.1)"
        >
          <Box
            position="relative"
            w="full"
            h="310px"
            borderRadius="2xl"
            overflow="hidden"
            bg="neutralSoft"
            mb={3}
          >
            <Image
              src={movie.image || FALLBACK_POSTER}
              alt={movie.title}
              w="full"
              h="full"
              objectFit="cover"
            />

            <Flex
              position="absolute"
              top={3}
              left={3}
              bg="rgba(255, 255, 255, 0.92)"
              backdropFilter="blur(6px)"
              px={2.5}
              py={1}
              borderRadius="full"
              align="center"
              gap={1.5}
              boxShadow="sm"
            >
              <Star size={12} color="#8A6500" fill="#8A6500" />
              <Text fontSize="2xs" fontWeight="extrabold" color="neutral">
                {movie.rating >= 9
                  ? "Masterpiece"
                  : movie.moodTags?.[0] || "Cinema Pick"}
              </Text>
            </Flex>
          </Box>

          <Box px={1}>
            <Text fontSize="xs" fontWeight="extrabold" color="neutral" mb={0.5}>
              Synopsis & Memory
            </Text>
            <Text
              fontSize="3xs"
              color="neutralMuted"
              lineHeight="shorter"
              lineClamp={3}
            >
              {movie.description ||
                "No personal notes added yet. Tap Edit Movie to write your thoughts!"}
            </Text>
          </Box>
        </Box>

        {/* MOVIE TITLE & METADATA TAGS */}
        <VStack gap={1} mb={5} textAlign="center">
          <Text
            fontSize="3xl"
            fontWeight="black"
            color="neutral"
            lineHeight="shorter"
          >
            {movie.title}
          </Text>

          <Flex wrap="wrap" justify="center" gap={2} mt={2}>
            <CustomBadge
              variant="date"
              textTransform="capitalize"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="semibold"
              color="neutral"
            >
              {movie.type}
            </CustomBadge>
            <CustomBadge
              variant="info"
              textTransform="capitalize"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="bold"
            >
              {movie.status}
            </CustomBadge>
            {(movie.moodTags || []).map((tag) => (
              <CustomBadge
                key={tag}
                variant="date"
                textTransform="none"
                px={3}
                py={1}
                fontSize="2xs"
                fontWeight="semibold"
                color="neutral"
              >
                ✨ {tag}
              </CustomBadge>
            ))}
          </Flex>
        </VStack>

        {/* PERSONAL SCORE CARD */}
        {movie.status === "watched" && movie.rating !== null && (
          <Box
            bg="white"
            borderRadius="3xl"
            p={5}
            pt={0}
            mb={4}
            border="1px solid"
            borderColor="neutralBorder"
            boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
          >
            <Box
              w="80px"
              h="6px"
              bg="secondary"
              borderBottomRadius="md"
              mx="auto"
              mb={4}
            />

            <Flex justify="space-between" align="center">
              <Box>
                <CustomBadge
                  variant="ratings"
                  textTransform="none"
                  px={3}
                  py={0.8}
                  fontSize="2xs"
                  gap={1.5}
                  mb={2}
                >
                  <Text fontSize="xs">🍿</Text>
                  <Text fontSize="2xs" fontWeight="bold">
                    Your Personal Score
                  </Text>
                </CustomBadge>

                <Flex align="baseline" gap={1}>
                  <Text
                    fontSize="4xl"
                    fontWeight="black"
                    color="neutral"
                    lineHeight="1"
                  >
                    {Number(movie.rating).toFixed(1)}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" color="neutralMuted">
                    /10
                  </Text>
                  <Text fontSize="xl" ml={1}>
                    ✨
                  </Text>
                </Flex>

                {movie.watchedDate && (
                  <Text fontSize="2xs" color="neutralMuted" mt={1}>
                    Watched on{" "}
                    {new Date(movie.watchedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                )}
              </Box>

              <Flex
                w="74px"
                h="78px"
                bg="tertiarySoft"
                borderRadius="2xl"
                align="center"
                justify="center"
                direction="column"
                gap={1}
              >
                <Box position="relative">
                  <Flex
                    w="40px"
                    h="40px"
                    bg="primarySoft"
                    borderRadius="full"
                    align="center"
                    justify="center"
                    color="primary"
                  >
                    <Heart size={20} color="currentColor" fill="currentColor" />
                  </Flex>
                  <Box position="absolute" top="-4px" right="-4px">
                    <Sparkles size={14} color="#8A6500" fill="#FFD166" />
                  </Box>
                </Box>
                <Text fontSize="3xs" fontWeight="extrabold" color="neutral">
                  {movie.rating >= 9 ? "Top Pick" : "Logged"}
                </Text>
              </Flex>
            </Flex>
          </Box>
        )}

        {/* WATCH STATUS SWITCHER CARD */}
        <Box
          bg="neutralSoft"
          borderRadius="2xl"
          p={3.5}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
          position="relative"
        >
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={3}>
              <Flex
                w="32px"
                h="32px"
                bg="tertiarySoft"
                borderRadius="full"
                align="center"
                justify="center"
                color="tertiary"
              >
                <Check size={16} color="currentColor" strokeWidth={3} />
              </Flex>
              <Box>
                <Text
                  fontSize="3xs"
                  fontWeight="extrabold"
                  color="neutralMuted"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Status
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="neutral"
                  textTransform="capitalize"
                >
                  {movie.status}
                </Text>
              </Box>
            </Flex>

            <Flex
              align="center"
              gap={1}
              bg="white"
              px={3}
              py={1.5}
              borderRadius="full"
              cursor="pointer"
              boxShadow="sm"
              border="1px solid"
              borderColor="neutralBorder"
              onClick={() => setShowStatusMenu((prev) => !prev)}
            >
              <Text fontSize="2xs" fontWeight="bold" color="neutral">
                Change
              </Text>
              <ChevronDown size={12} color="#73778D" />
            </Flex>
          </Flex>

          {showStatusMenu && (
            <Flex
              gap={2}
              mt={3}
              pt={3}
              borderTop="1px solid"
              borderColor="neutralBorder"
            >
              {["watched", "wishlist", "scheduled"].map((st) => (
                <Flex
                  key={st}
                  flex={1}
                  py={1.5}
                  borderRadius="xl"
                  justify="center"
                  cursor="pointer"
                  bg={movie.status === st ? "primary" : "white"}
                  color={movie.status === st ? "white" : "neutral"}
                  onClick={() => handleStatusChange(st)}
                >
                  <Text
                    fontSize="2xs"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    {st}
                  </Text>
                </Flex>
              ))}
            </Flex>
          )}
        </Box>

        {/* QUICK ACTIONS ROW (Edit / Add to Playlist / Share) */}
        <SimpleGrid columns={3} gap={3} mb={4}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            bg="white"
            p={3.5}
            borderRadius="2xl"
            border="1px solid"
            borderColor="neutralBorder"
            cursor="pointer"
            onClick={() => navigate(`/movies/${movie._id}/edit`)}
            _hover={{ bg: "neutralSoft" }}
          >
            <Box color="primary" mb={1.5}>
              <Edit3 size={18} color="currentColor" strokeWidth={2.5} />
            </Box>
            <Text fontSize="2xs" fontWeight="bold" color="neutral">
              Edit Movie
            </Text>
          </Flex>

          <Flex
            direction="column"
            align="center"
            justify="center"
            bg="white"
            p={3.5}
            borderRadius="2xl"
            border="1px solid"
            borderColor="neutralBorder"
            cursor="pointer"
            onClick={() => setShowPlaylistPicker((prev) => !prev)}
            _hover={{ bg: "neutralSoft" }}
          >
            <Box color="tertiary" mb={1.5}>
              <ListPlus size={18} color="currentColor" strokeWidth={2.5} />
            </Box>
            <Text fontSize="2xs" fontWeight="bold" color="neutral">
              Add to List
            </Text>
          </Flex>

          <Flex
            direction="column"
            align="center"
            justify="center"
            bg="white"
            p={3.5}
            borderRadius="2xl"
            border="1px solid"
            borderColor="neutralBorder"
            cursor="pointer"
            onClick={handleShareTicket}
            _hover={{ bg: "neutralSoft" }}
          >
            <Box color="secondaryDark" mb={1.5}>
              <Ticket size={18} color="currentColor" strokeWidth={2.5} />
            </Box>
            <Text fontSize="2xs" fontWeight="bold" color="neutral">
              Share Ticket
            </Text>
          </Flex>
        </SimpleGrid>

        {/* INLINE ADD TO PLAYLIST PICKER */}
        {showPlaylistPicker && (
          <Box
            bg="white"
            borderRadius="3xl"
            p={4}
            mb={4}
            border="1px solid"
            borderColor="neutralBorder"
          >
            <Flex justify="space-between" align="center" mb={2.5}>
              <Text fontSize="xs" fontWeight="bold" color="neutral">
                Select a Playlist to Add "{movie.title}"
              </Text>
              <Text
                fontSize="2xs"
                fontWeight="bold"
                color="primary"
                cursor="pointer"
                onClick={() => navigate("/add-new/playlist")}
              >
                + New Playlist
              </Text>
            </Flex>
            {userPlaylists.length === 0 ? (
              <Text fontSize="xs" color="neutralMuted">
                You don't have any playlists yet. Create one first!
              </Text>
            ) : (
              <VStack gap={2} align="stretch">
                {userPlaylists.map((pl) => (
                  <Flex
                    key={pl._id}
                    p={2.5}
                    borderRadius="xl"
                    bg="neutralSoft"
                    justify="space-between"
                    align="center"
                    cursor="pointer"
                    onClick={() => {
                      addMovieToPlaylist({
                        playlistId: pl._id,
                        movieId: movie._id,
                      });
                      setShowPlaylistPicker(false);
                    }}
                    _hover={{ bg: "tertiarySoft" }}
                  >
                    <Text fontSize="xs" fontWeight="bold" color="neutral">
                      {pl.name}
                    </Text>
                    <Text fontSize="2xs" color="neutralMuted">
                      {pl.movies?.length || 0} films
                    </Text>
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>
        )}

        {/* WATCH DIARY NOTES CARD */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          pt={0}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
        >
          <Box
            w="80px"
            h="6px"
            bg="primarySoft"
            borderBottomRadius="md"
            mx="auto"
            mb={4}
          />
          <Flex justify="space-between" align="center" mb={3.5}>
            <Flex align="center" gap={2}>
              <BookOpen size={20} />
              <Text fontSize="md" fontWeight="extrabold" color="neutral">
                {firstName}'s Watch Diary Notes
              </Text>
            </Flex>
            <Award size={18} color="#73778D" />
          </Flex>

          <Box bg="neutralSoft" p={4} borderRadius="2xl" mb={3}>
            <Text
              fontSize="xs"
              color="neutral"
              fontStyle="italic"
              lineHeight="tall"
            >
              “
              {movie.description ||
                "No personal diary entry written for this title yet."}
              ”
            </Text>
          </Box>
        </Box>

        {/* PLAYLISTS SECTION */}
        <Box
          bg="neutralSoft"
          borderRadius="3xl"
          p={4}
          mb={6}
          border="1px solid"
          borderColor="neutralBorder"
        >
          <Flex justify="space-between" align="center" mb={3} px={1}>
            <Text
              fontSize="2xs"
              fontWeight="extrabold"
              color="neutralMuted"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Included in Playlists ({includedPlaylists.length})
            </Text>
            <Text
              fontSize="2xs"
              fontWeight="bold"
              color="tertiary"
              cursor="pointer"
              onClick={() => navigate("/my-playlist")}
            >
              View All
            </Text>
          </Flex>

          {includedPlaylists.length === 0 ? (
            <Text fontSize="xs" color="neutralMuted" px={1}>
              Not added to any playlists yet. Tap "Add to List" above!
            </Text>
          ) : (
            <VStack gap={2} align="stretch">
              {includedPlaylists.map((pl) => (
                <Flex
                  key={pl._id}
                  bg="white"
                  borderRadius="2xl"
                  p={3}
                  align="center"
                  justify="space-between"
                  cursor="pointer"
                  border="1px solid"
                  borderColor="neutralBorder"
                  onClick={() => navigate(`/playlist/${pl._id}`)}
                >
                  <Flex align="center" gap={3}>
                    <Flex
                      w="38px"
                      h="38px"
                      bg="tertiarySoft"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      color="tertiary"
                    >
                      <Film size={18} />
                    </Flex>
                    <Box>
                      <Text fontSize="xs" fontWeight="bold" color="neutral">
                        {pl.name}
                      </Text>
                      <Text fontSize="3xs" color="neutralMuted">
                        {pl.movies?.length || 0} films in shelf
                      </Text>
                    </Box>
                  </Flex>
                  <ChevronRight size={18} color="#73778D" />
                </Flex>
              ))}
            </VStack>
          )}
        </Box>

        {/* REMOVE FROM COLLECTION ACTION */}
        <Flex
          justify="center"
          align="center"
          gap={2}
          color="status.error"
          cursor={isDeleting ? "not-allowed" : "pointer"}
          py={3}
          onClick={handleDelete}
          _hover={{ opacity: 0.8 }}
        >
          <Trash2 size={16} color="currentColor" />
          <Text fontSize="xs" fontWeight="bold">
            {isDeleting ? "Removing..." : "Remove from Collection"}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieDetails;

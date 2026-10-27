// src/features/playlistDetails/pages/PlaylistDetails.jsx
import React, { useState, useMemo } from "react";
import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Globe,
  Film,
  PlusCircle,
  Link as LinkIcon,
  Dices,
  ShieldCheck,
  Star,
  Trash2,
  Calendar,
  Heart,
  ArrowRight,
  Clapperboard,
  Lock,
  X,
  Plus,
} from "lucide-react";
import Logo from "../../../logo/logo_nobg.svg";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import { CustomButton } from "../../../shared/components/CustomButton";
import {
  usePlaylistDetailQuery,
  useAddMovieToPlaylistMutation,
  useRemoveMovieFromPlaylistMutation,
} from "../../../hooks/usePlaylistQueries.js";
import { useMoviesQuery } from "../../../hooks/useMovieQueries.js";
import { useThrottledCallback } from "../../../hooks/usePerformance.js";
import { toaster } from "../../../components/ui/toaster.jsx";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop";

const PlaylistDetails = () => {
  const { id: playlistId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [isAddingMovies, setIsAddingMovies] = useState(false);

  // Queries & Mutations
  const { data: playlist, isLoading } = usePlaylistDetailQuery(playlistId);
  const { data: userMoviesData } = useMoviesQuery();
  const { mutate: addMovieToPlaylist, isPending: isAdding } =
    useAddMovieToPlaylistMutation();
  const { mutate: removeMovie, isPending: isRemoving } =
    useRemoveMovieFromPlaylistMutation();

  // Determine if viewing user is the owner
  const isOwner = useMemo(() => {
    if (!user || !playlist) return false;
    const ownerId = playlist.owner?._id || playlist.owner;
    return ownerId?.toString() === user._id?.toString();
  }, [user, playlist]);

  // Extract populated movies list
  const playlistFilms = useMemo(() => {
    return (playlist?.movies || [])
      .map((entry) => ({
        entryAddedAt: entry.addedAt,
        movie: entry.movie,
      }))
      .filter((entry) => Boolean(entry.movie));
  }, [playlist]);

  // Candidates from collection not yet in this playlist
  const availableToAdd = useMemo(() => {
    if (!userMoviesData?.movies) return [];
    const existingIds = new Set(playlistFilms.map((f) => f.movie._id));
    return userMoviesData.movies.filter((m) => !existingIds.has(m._id));
  }, [userMoviesData, playlistFilms]);

  // Copy shareable URL
  const handleShareLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toaster.create({
        title: "Link Copied! 🔗",
        description: "Share this curated reel with your movie buddies.",
        type: "success",
      });
    }
  };

  // Random movie picker
  const handleRandomPick = useThrottledCallback(() => {
    if (playlistFilms.length === 0) {
      toaster.create({
        title: "Shelf is Empty",
        description: "Add movies to this playlist to roll a random pick!",
        type: "warning",
      });
      return;
    }
    const randomIndex = Math.floor(Math.random() * playlistFilms.length);
    const chosen = playlistFilms[randomIndex].movie;

    toaster.create({
      title: `Tonight's Pick: ${chosen.title}! 🍿`,
      description: "Opening details for your screening...",
      type: "success",
    });

    navigate(`/movies/${chosen._id}`);
  }, 1500);

  // Remove a movie from playlist
  const handleRemoveFilm = (movieId, movieTitle) => {
    if (isRemoving) return;
    if (window.confirm(`Remove "${movieTitle}" from this playlist?`)) {
      removeMovie({ playlistId, movieId });
    }
  };

  // Add movie from collection
  const handleAddMovie = (movieId) => {
    if (isAdding) return;
    addMovieToPlaylist({ playlistId, movieId });
  };

  if (isLoading) {
    return (
      <Box minH="70vh" p={10} textAlign="center">
        <Text fontSize="sm" color="neutralMuted">
          Loading curated shelf... 🍿
        </Text>
      </Box>
    );
  }

  if (!playlist) {
    return (
      <Box minH="70vh" p={10} textAlign="center">
        <Text fontWeight="bold" color="neutral">
          Playlist not found or private
        </Text>
        <Text
          fontSize="xs"
          color="primary"
          mt={2}
          cursor="pointer"
          onClick={() => navigate("/my-playlist")}
        >
          ← Back to Curated Shelves
        </Text>
      </Box>
    );
  }

  const curatorName = isOwner
    ? "You"
    : playlist.owner?.name || "Cinephile Curator";

  return (
    <Box
      minH="100vh"
      w="full"
      bg="background"
      fontFamily="body"
      px={4}
      pt={4}
      pb={24}
    >
      <Box maxW="lg" mx="auto">
        {/* 1. PLAYLIST HEADER HERO CARD */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
        >
          <Flex gap={3.5} align="flex-start" mb={3}>
            <Box flex={1}>
              <Text
                fontFamily="body"
                fontSize="3xl"
                fontWeight="black"
                color="neutral"
                lineHeight="short"
                mb={2}
              >
                {playlist.name}
              </Text>

              <Flex wrap="wrap" gap={2}>
                <CustomBadge
                  variant="info"
                  bg={playlist.isPublic ? "tertiarySoft" : "neutralSoft"}
                  color={playlist.isPublic ? "tertiaryDark" : "neutral"}
                  fontFamily="body"
                  textTransform="none"
                  px={2.5}
                  py={0.5}
                  fontSize="2xs"
                  gap={1}
                >
                  {playlist.isPublic ? (
                    <Globe size={11} color="currentColor" />
                  ) : (
                    <Lock size={11} color="currentColor" />
                  )}
                  {playlist.isPublic ? "Public Playlist" : "Private Shelf"}
                </CustomBadge>

                <CustomBadge
                  variant="ratings"
                  fontFamily="body"
                  textTransform="none"
                  px={2.5}
                  py={0.5}
                  fontSize="2xs"
                  gap={1}
                >
                  <Film size={11} color="currentColor" />
                  {playlistFilms.length}{" "}
                  {playlistFilms.length === 1 ? "Film" : "Films"} Curated
                </CustomBadge>
              </Flex>
            </Box>

            {/* Logo Badge */}
            <Box position="relative" flexShrink={0}>
              <Flex
                w="62px"
                h="62px"
                bg="neutralSoft"
                borderRadius="2xl"
                align="center"
                justify="center"
              >
                <Image src={Logo} alt="SharePopcorns Logo" w="42px" h="42px" />
              </Flex>
              <Flex
                position="absolute"
                bottom="-4px"
                right="-4px"
                w="22px"
                h="22px"
                bg="secondary"
                color="secondaryDark"
                borderRadius="full"
                align="center"
                justify="center"
                boxShadow="xs"
              >
                <Star size={12} color="currentColor" fill="currentColor" />
              </Flex>
            </Box>
          </Flex>

          {/* Description */}
          {playlist.description && (
            <Text fontSize="xs" color="neutralMuted" lineHeight="tall" mb={3}>
              {playlist.description}
            </Text>
          )}

          {/* Curator User Info */}
          <Flex align="center" gap={2} mb={5}>
            <Flex
              w="22px"
              h="22px"
              bg="primarySoft"
              borderRadius="full"
              align="center"
              justify="center"
              fontSize="2xs"
            >
              👩🏻‍🎨
            </Flex>
            <Text
              fontFamily="body"
              fontSize="xs"
              color="neutral"
              fontWeight="medium"
            >
              Curated by{" "}
              <Text as="span" fontWeight="bold">
                {curatorName}
              </Text>{" "}
              •{" "}
              {new Date(playlist.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </Text>
          </Flex>

          {/* Action Buttons */}
          <VStack gap={2.5}>
            {isOwner && (
              <CustomButton
                variant="primary"
                fontFamily="body"
                py={6}
                leftElement={<PlusCircle size={18} color="currentColor" />}
                onClick={() => setIsAddingMovies((prev) => !prev)}
              >
                <Text fontSize="md">
                  {isAddingMovies
                    ? "Close Collection Shelf"
                    : "Add Movie from Collection"}
                </Text>
              </CustomButton>
            )}

            <Flex gap={2.5} w="full">
              <CustomButton
                variant="neutral"
                bg="tertiarySoft"
                color="neutral"
                _hover={{ bg: "tertiarySoft", opacity: 0.9 }}
                fontFamily="body"
                flex={1}
                py={4}
                leftElement={<LinkIcon size={14} color="currentColor" />}
                rightElement="🔗"
                onClick={handleShareLink}
              >
                <Text fontSize="xs">Share Link</Text>
              </CustomButton>

              <CustomButton
                variant="secondary"
                _hover={{ bg: "secondary", opacity: 0.9 }}
                fontFamily="body"
                flex={1}
                py={4}
                fontSize="xs"
                leftElement={<Dices size={15} color="currentColor" />}
                rightElement="🎲"
                onClick={handleRandomPick}
              >
                <Text fontSize="xs">Random Pick</Text>
              </CustomButton>
            </Flex>
          </VStack>
        </Box>

        {/* 2. INLINE ADD FROM COLLECTION DRAWER */}
        {isAddingMovies && isOwner && (
          <Box
            bg="white"
            borderRadius="3xl"
            p={5}
            mb={4}
            border="1px solid"
            borderColor="neutralBorder"
            boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
          >
            <Flex justify="space-between" align="center" mb={3}>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="neutral">
                  Add From Your Watched & Wishlist
                </Text>
                <Text fontSize="2xs" color="neutralMuted">
                  Tap to add any title directly into "{playlist.name}"
                </Text>
              </Box>
              <Box
                cursor="pointer"
                color="neutralMuted"
                onClick={() => setIsAddingMovies(false)}
              >
                <X size={16} />
              </Box>
            </Flex>

            {availableToAdd.length === 0 ? (
              <Box py={4} textAlign="center">
                <Text fontSize="xs" color="neutralMuted">
                  All your collection titles are already in this playlist! 🍿
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="primary"
                  mt={2}
                  cursor="pointer"
                  onClick={() => navigate("/add")}
                >
                  + Log a New Title First
                </Text>
              </Box>
            ) : (
              <VStack
                gap={2}
                align="stretch"
                maxH="280px"
                overflowY="auto"
                pr={1}
              >
                {availableToAdd.map((m) => (
                  <Flex
                    key={m._id}
                    bg="neutralSoft"
                    p={2.5}
                    borderRadius="2xl"
                    align="center"
                    justify="space-between"
                  >
                    <Flex align="center" gap={3}>
                      <Box
                        w="40px"
                        h="52px"
                        borderRadius="xl"
                        overflow="hidden"
                        bg="white"
                        flexShrink={0}
                      >
                        <Image
                          src={m.image || FALLBACK_POSTER}
                          alt={m.title}
                          w="full"
                          h="full"
                          objectFit="cover"
                        />
                      </Box>
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          color="neutral"
                          lineClamp={1}
                        >
                          {m.title}
                        </Text>
                        <Text
                          fontSize="3xs"
                          color="neutralMuted"
                          textTransform="capitalize"
                        >
                          {m.type} • {m.status}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex
                      w="28px"
                      h="28px"
                      bg="primary"
                      color="white"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      cursor="pointer"
                      onClick={() => handleAddMovie(m._id)}
                      _hover={{ bg: "primaryDark" }}
                    >
                      <Plus size={14} />
                    </Flex>
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>
        )}

        {/* 3. SAFETY NOTICE BANNER */}
        <Flex
          bg="tertiarySoft"
          borderRadius="2xl"
          p={3.5}
          align="center"
          gap={2.5}
          mb={5}
        >
          <Box color="tertiary" flexShrink={0}>
            <ShieldCheck size={18} color="currentColor" />
          </Box>
          <Text
            fontFamily="body"
            fontSize="2xs"
            color="neutral"
            lineHeight="tall"
          >
            Removing a film from this playlist will{" "}
            <Text as="span" fontWeight="bold">
              never delete it
            </Text>{" "}
            from your SharePopcorns collection.
          </Text>
        </Flex>

        {/* 4. FILMS IN PLAYLIST SECTION */}
        <Flex justify="space-between" align="center" mb={3} px={1}>
          <Flex align="center" gap={2}>
            <Text
              fontFamily="body"
              fontSize="xl"
              fontWeight="extrabold"
              color="neutral"
            >
              Films in Playlist
            </Text>
            <Flex
              bg="primarySoft"
              color="primary"
              px={2}
              py={0.5}
              borderRadius="full"
            >
              <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                {playlistFilms.length} total
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* 5. FILMS CARD LIST */}
        {playlistFilms.length === 0 ? (
          <Box
            bg="white"
            borderRadius="3xl"
            p={8}
            textAlign="center"
            border="1px dashed"
            borderColor="neutralBorder"
            mb={4}
          >
            <Text fontSize="2xl" mb={2}>
              🎞️
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="neutral">
              This playlist is empty
            </Text>
            <Text fontSize="xs" color="neutralMuted" mt={1}>
              {isOwner
                ? "Tap 'Add Movie from Collection' above to add your favorite titles."
                : "The curator hasn't added titles to this shelf yet."}
            </Text>
          </Box>
        ) : (
          <VStack gap={3} align="stretch" mb={4}>
            {playlistFilms.map(({ movie: film }) => (
              <Box
                key={film._id}
                bg="white"
                borderRadius="2xl"
                p={3}
                pl={3}
                border="1px solid"
                borderColor="neutralBorder"
                boxShadow="0 2px 10px rgba(0, 0, 0, 0.02)"
                position="relative"
                overflow="hidden"
              >
                {/* Left Accent Bar */}
                <Box
                  position="absolute"
                  left={0}
                  top={3}
                  bottom={3}
                  w="4px"
                  bg={film.rating >= 9 ? "secondary" : "primary"}
                  borderRightRadius="full"
                />

                <Flex align="center" justify="space-between" gap={3}>
                  <Flex
                    align="center"
                    gap={3}
                    flex={1}
                    cursor="pointer"
                    onClick={() => navigate(`/movies/${film._id}`)}
                  >
                    <Box
                      w="65px"
                      h="75px"
                      borderRadius="2xl"
                      overflow="hidden"
                      bg="neutralSoft"
                      flexShrink={0}
                    >
                      <Image
                        src={film.image || FALLBACK_POSTER}
                        alt={film.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    </Box>

                    <Box flex={1}>
                      <Flex align="center" gap={1.5} mb={0.5}>
                        <Flex
                          bg="neutralSoft"
                          px={1.5}
                          py={0.2}
                          borderRadius="md"
                        >
                          <Text
                            fontFamily="body"
                            fontSize="xs"
                            fontWeight="bold"
                            color="neutral"
                            textTransform="capitalize"
                          >
                            {film.type}
                          </Text>
                        </Flex>

                        {film.moodTags?.[0] && (
                          <Flex align="center" gap={1} color="primary">
                            <Heart size={10} fill="currentColor" />
                            <Text
                              fontFamily="body"
                              fontSize="xs"
                              fontWeight="bold"
                            >
                              {film.moodTags[0]}
                            </Text>
                          </Flex>
                        )}
                      </Flex>

                      <Text
                        fontFamily="body"
                        fontSize="sm"
                        fontWeight="bold"
                        color="neutral"
                        lineClamp={1}
                        mb={1}
                      >
                        {film.title}
                      </Text>

                      {film.rating !== null && film.rating !== undefined && (
                        <CustomBadge bg="secondary" variant="ratings">
                          <Star
                            size={9}
                            color="currentColor"
                            fill="currentColor"
                          />
                          {Number(film.rating).toFixed(1)}
                        </CustomBadge>
                      )}
                    </Box>
                  </Flex>

                  {/* Remove Film Button (Owners only) */}
                  {isOwner && (
                    <Flex
                      w="30px"
                      h="30px"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      color="neutralMuted"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ color: "status.error", bg: "primarySoft" }}
                      onClick={() => handleRemoveFilm(film._id, film.title)}
                    >
                      <Trash2 size={16} color="currentColor" />
                    </Flex>
                  )}
                </Flex>
              </Box>
            ))}
          </VStack>
        )}

        {/* 6. BOTTOM EXPLORE / ADD PROMPT */}
        {isOwner && (
          <Flex
            bg="neutralSoft"
            borderRadius="2xl"
            p={3}
            align="center"
            justify="space-between"
            border="1px solid"
            borderColor="neutralBorder"
            cursor="pointer"
            onClick={() => setIsAddingMovies(true)}
          >
            <Flex align="center" gap={3}>
              <Flex
                w="40px"
                h="40px"
                bg="white"
                borderRadius="xl"
                align="center"
                justify="center"
                color="tertiary"
                boxShadow="xs"
              >
                <Clapperboard size={18} color="currentColor" />
              </Flex>

              <Box>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="bold"
                  color="neutral"
                >
                  Want to add more?
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="3xs"
                  color="neutralMuted"
                  lineClamp={1}
                >
                  Select from {availableToAdd.length} eligible titles in your
                  collection
                </Text>
              </Box>
            </Flex>

            <Flex
              w="36px"
              h="36px"
              bg="tertiary"
              color="white"
              borderRadius="full"
              align="center"
              justify="center"
              transition="all 0.2s"
              _hover={{ bg: "tertiaryDark", transform: "scale(1.05)" }}
            >
              <ArrowRight size={16} color="currentColor" strokeWidth={2.5} />
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default PlaylistDetails;

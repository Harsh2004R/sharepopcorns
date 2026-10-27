// src/features/myCollection/pages/MyCollection.jsx
import React, { useState, useMemo } from "react";
import { Box, Flex, Text, Input, SimpleGrid, Image } from "@chakra-ui/react";
import {
  Search,
  LayoutGrid,
  Menu,
  Check,
  ChevronDown,
  Star,
  Ticket,
  Heart,
  Clock,
  Plus,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMoviesQuery } from "../../../hooks/useMovieQueries.js";
import { useDebounce } from "../../../hooks/usePerformance.js";
import { CustomButton } from "../../../shared/components/CustomButton.jsx";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop";

const formatCardDate = (movie) => {
  const raw =
    movie.status === "scheduled"
      ? movie.scheduledDate
      : movie.watchedDate || movie.createdAt;
  if (!raw) return "Added recently";
  return new Date(raw).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const MyCollection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 250);

  const [activeStatus, setActiveStatus] = useState(
    location.state?.initialStatus || "all",
  );
  const [sortBy, setSortBy] = useState("recent");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const { data, isLoading } = useMoviesQuery();
  const allMovies = data?.movies || [];

  const counts = useMemo(() => {
    return {
      all: allMovies.length,
      watched: allMovies.filter((m) => m.status === "watched").length,
      wishlist: allMovies.filter((m) => m.status === "wishlist").length,
      scheduled: allMovies.filter((m) => m.status === "scheduled").length,
    };
  }, [allMovies]);

  const filteredMovies = useMemo(() => {
    return allMovies
      .filter((movie) => {
        if (activeStatus !== "all" && movie.status !== activeStatus)
          return false;
        if (typeFilter !== "all" && movie.type !== typeFilter) return false;
        if (
          ratingFilter !== "all" &&
          (movie.rating === null || movie.rating < parseFloat(ratingFilter))
        ) {
          return false;
        }
        if (debouncedSearch.trim() !== "") {
          const q = debouncedSearch.toLowerCase();
          const matchTitle = movie.title?.toLowerCase().includes(q);
          const matchDesc = movie.description?.toLowerCase().includes(q);
          const matchMood = movie.moodTags?.some((t) =>
            t.toLowerCase().includes(q),
          );
          if (!matchTitle && !matchDesc && !matchMood) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "recent") {
          return (
            new Date(b.watchedDate || b.createdAt) -
            new Date(a.watchedDate || a.createdAt)
          );
        }
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "alpha") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [
    allMovies,
    activeStatus,
    typeFilter,
    ratingFilter,
    debouncedSearch,
    sortBy,
  ]);

  return (
    <Box
      minH="100vh"
      w="full"
      bg="background"
      fontFamily="body"
      px={4}
      pt={4}
      pb={12}
    >
      <Box maxW="lg" mx="auto">
        {/* 1. HEADER ROW */}
        <Flex justify="space-between" align="center" mb={4}>
          <Flex align="center" gap={2.5}>
            <Text fontSize="2xl" fontWeight="extrabold" color="neutral">
              My Collection
            </Text>
            <Flex
              bg="secondary"
              px={2.5}
              py={0.5}
              borderRadius="full"
              align="center"
            >
              <Text fontSize="2xs" fontWeight="bold" color="secondaryDark">
                {counts.all} items
              </Text>
            </Flex>
          </Flex>

          <Flex
            w="38px"
            h="38px"
            bg="primary"
            color="white"
            borderRadius="full"
            align="center"
            justify="center"
            cursor="pointer"
            onClick={() => navigate("/add")}
            _hover={{ bg: "primaryDark" }}
          >
            <Plus size={18} color="currentColor" />
          </Flex>
        </Flex>

        {/* 2. DEBOUNCED SEARCH & VIEW SWITCHER BAR */}
        <Flex gap={2} align="center" mb={4}>
          <Flex
            flex={1}
            bg="neutralSoft"
            borderRadius="full"
            px={4}
            py={2.5}
            align="center"
            gap={2.5}
          >
            <Search size={16} color="#73778D" />
            <Input
              variant="unstyled"
              placeholder="Search movies, series, or moods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fontSize="sm"
              color="neutral"
              bg="transparent"
              p={0}
              h="auto"
              _placeholder={{ color: "neutralMuted" }}
            />
            {searchQuery && (
              <Box
                cursor="pointer"
                color="neutralMuted"
                onClick={() => setSearchQuery("")}
              >
                <X size={14} />
              </Box>
            )}
          </Flex>

          <Flex
            bg="neutralSoft"
            borderRadius="full"
            p={1}
            align="center"
            gap={1}
          >
            <Flex
              w="30px"
              h="30px"
              borderRadius="full"
              bg={viewMode === "grid" ? "white" : "transparent"}
              color={viewMode === "grid" ? "primary" : "neutralMuted"}
              boxShadow={viewMode === "grid" ? "sm" : "none"}
              align="center"
              justify="center"
              cursor="pointer"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={15} color="currentColor" />
            </Flex>
            <Flex
              w="30px"
              h="30px"
              borderRadius="full"
              bg={viewMode === "list" ? "white" : "transparent"}
              color={viewMode === "list" ? "primary" : "neutralMuted"}
              boxShadow={viewMode === "list" ? "sm" : "none"}
              align="center"
              justify="center"
              cursor="pointer"
              onClick={() => setViewMode("list")}
            >
              <Menu size={15} color="currentColor" />
            </Flex>
          </Flex>
        </Flex>

        {/* 3. STATUS HORIZONTAL TABS */}
        <Flex
          gap={2}
          overflowX="auto"
          pb={2}
          mb={3}
          css={{
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {[
            { id: "all", label: "All", count: counts.all },
            { id: "watched", label: "Watched", count: counts.watched },
            { id: "wishlist", label: "Wishlist", count: counts.wishlist },
            { id: "scheduled", label: "Scheduled", count: counts.scheduled },
          ].map((tab) => {
            const isActive = activeStatus === tab.id;
            return (
              <Flex
                key={tab.id}
                align="center"
                gap={1.5}
                px={3.5}
                py={1.5}
                borderRadius="full"
                cursor="pointer"
                bg={isActive ? "primary" : "neutralSoft"}
                color={isActive ? "white" : "neutral"}
                onClick={() => setActiveStatus(tab.id)}
                flexShrink={0}
              >
                {isActive && tab.id === "watched" && (
                  <Flex
                    w="16px"
                    h="16px"
                    bg="white"
                    borderRadius="full"
                    align="center"
                    justify="center"
                    color="primary"
                  >
                    <Check size={11} color="currentColor" strokeWidth={3} />
                  </Flex>
                )}
                <Text fontSize="xs" fontWeight="bold">
                  {tab.label}
                </Text>
                <Flex
                  bg={isActive ? "whiteAlpha.300" : "neutralBorder"}
                  px={1.5}
                  py={0.2}
                  borderRadius="full"
                >
                  <Text fontSize="2xs" fontWeight="bold">
                    {tab.count}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>

        {/* 4. DROPDOWN FILTERS ROW */}
        <Flex gap={2} align="center" justify="space-between" mb={5}>
          <Box position="relative">
            <Flex align="center" gap={1} cursor="pointer">
              <Text fontSize="xs" fontWeight="bold" color="primary">
                Sorted by:
              </Text>
              <Text fontSize="xs" fontWeight="semibold" color="neutral">
                {sortBy === "recent"
                  ? "Recent"
                  : sortBy === "rating"
                    ? "Top Rated"
                    : "A - Z"}
              </Text>
              <ChevronDown size={12} color="black" />
            </Flex>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                cursor: "pointer",
                width: "100%",
              }}
            >
              <option value="recent">Recent</option>
              <option value="rating">Top Rated</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </Box>

          <Box position="relative">
            <Flex align="center" gap={1} cursor="pointer">
              <Text fontSize="xs" fontWeight="semibold" color="neutralMuted">
                Type:
              </Text>
              <Text
                fontSize="xs"
                fontWeight="bold"
                color="neutral"
                textTransform="capitalize"
              >
                {typeFilter}
              </Text>
              <ChevronDown size={12} color="#73778D" />
            </Flex>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                cursor: "pointer",
                width: "100%",
              }}
            >
              <option value="all">All</option>
              <option value="movie">Movie</option>
              <option value="series">Web Series</option>
            </select>
          </Box>

          <Box position="relative">
            <Flex align="center" gap={1} cursor="pointer">
              <Text fontSize="xs" fontWeight="semibold" color="neutralMuted">
                Rating:
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="secondaryDark">
                {ratingFilter === "all" ? "All" : `${ratingFilter}+`}
              </Text>
              <ChevronDown size={12} color="#73778D" />
            </Flex>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                cursor: "pointer",
                width: "100%",
              }}
            >
              <option value="all">All Ratings</option>
              <option value="8.0">8.0+</option>
              <option value="8.5">8.5+</option>
              <option value="9.0">9.0+</option>
            </select>
          </Box>
        </Flex>

        {/* 5. COLLECTION ITEMS GRID */}
        {isLoading ? (
          <Box p={8} textAlign="center">
            <Text fontSize="sm" color="neutralMuted">
              Opening your cinema shelf... 🍿
            </Text>
          </Box>
        ) : filteredMovies.length === 0 ? (
          <Box
            bg="white"
            p={8}
            borderRadius="3xl"
            textAlign="center"
            border="1px dashed"
            borderColor="neutralBorder"
          >
            <Text fontSize="2xl" mb={2}>
              🍿
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="neutral">
              {allMovies.length === 0
                ? "Your collection is empty"
                : "No titles match your filter"}
            </Text>
            <Text fontSize="xs" color="neutralMuted" mt={1} mb={4}>
              {allMovies.length === 0
                ? "Start logging movies or series you've watched or want to watch!"
                : "Try clearing filters or changing your search criteria."}
            </Text>
            {allMovies.length === 0 && (
              <CustomButton
                variant="primary"
                w="auto"
                px={5}
                onClick={() => navigate("/add")}
              >
                + Log Your First Title
              </CustomButton>
            )}
          </Box>
        ) : (
          <SimpleGrid columns={viewMode === "grid" ? 2 : 1} gap={3.5}>
            {filteredMovies.map((movie) => {
              const primaryMood = movie.moodTags?.[0] || "Cozy";
              return (
                <Box
                  key={movie._id}
                  onClick={() => navigate(`/movies/${movie._id}`)}
                  bg="white"
                  borderRadius="3xl"
                  p={2.5}
                  border="1px solid"
                  borderColor="neutralBorder"
                  boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
                  display="flex"
                  flexDirection={viewMode === "grid" ? "column" : "row"}
                  gap={3}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  <Box
                    position="relative"
                    w={viewMode === "grid" ? "full" : "105px"}
                    h={viewMode === "grid" ? "210px" : "140px"}
                    borderRadius="2xl"
                    overflow="hidden"
                    bg="neutralSoft"
                    flexShrink={0}
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
                      top={2}
                      left={2}
                      bg="secondary"
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      align="center"
                    >
                      <Text
                        fontSize="2xs"
                        fontWeight="bold"
                        color="secondaryDark"
                      >
                        {primaryMood}
                      </Text>
                    </Flex>

                    {movie.rating !== null && movie.rating !== undefined && (
                      <Flex
                        position="absolute"
                        top={2}
                        right={2}
                        bg="rgba(255, 255, 255, 0.9)"
                        backdropFilter="blur(4px)"
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        align="center"
                        gap={0.5}
                      >
                        <Star size={10} color="#8A6500" fill="#8A6500" />
                        <Text fontSize="2xs" fontWeight="bold" color="neutral">
                          {Number(movie.rating).toFixed(1)}
                        </Text>
                      </Flex>
                    )}

                    <Flex
                      position="absolute"
                      bottom={2}
                      left={2}
                      bg="rgba(26, 30, 48, 0.75)"
                      backdropFilter="blur(4px)"
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      align="center"
                      gap={1}
                      color="white"
                    >
                      <Clock size={10} color="currentColor" />
                      <Text fontSize="2xs" fontWeight="semibold">
                        {formatCardDate(movie)}
                      </Text>
                    </Flex>
                  </Box>

                  <Flex
                    direction="column"
                    flex={1}
                    justify="space-between"
                    pt={0.5}
                    px={1}
                  >
                    <Box>
                      <Flex justify="space-between" align="center" mb={0.5}>
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          color="neutralMuted"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          {movie.type}
                        </Text>
                        <Text
                          fontSize="2xs"
                          fontWeight="bold"
                          color="tertiary"
                          textTransform="capitalize"
                        >
                          {movie.status}
                        </Text>
                      </Flex>

                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="neutral"
                        lineClamp={1}
                        lineHeight="short"
                        title={movie.title}
                      >
                        {movie.title}
                      </Text>
                    </Box>

                    <Flex
                      justify="space-between"
                      align="center"
                      pt={2}
                      mt={1}
                      borderTop="1px solid"
                      borderColor="neutralSoft"
                    >
                      <Flex align="center" gap={1.5} color="neutralMuted">
                        <Heart size={12} color="#881938" fill="#881938" />
                        <Text fontSize="xs" fontWeight="semibold" lineClamp={1}>
                          {movie.description || primaryMood}
                        </Text>
                      </Flex>

                      <Flex
                        w="22px"
                        h="22px"
                        bg="secondary"
                        color="secondaryDark"
                        borderRadius="full"
                        align="center"
                        justify="center"
                        flexShrink={0}
                      >
                        <Ticket size={11} color="currentColor" />
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default MyCollection;

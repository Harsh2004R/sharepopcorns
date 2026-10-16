import React, { useState, useMemo } from "react";
import { Box, Flex, Text, Input, SimpleGrid, Image } from "@chakra-ui/react";
import {
  Search,
  LayoutGrid,
  Menu,
  SlidersHorizontal,
  Check,
  ChevronDown,
  Star,
  Ticket,
  Heart,
  MessageSquare,
  Clock,
} from "lucide-react";

// ==========================================
// DUMMY COLLECTION DATA
// ==========================================
const mockMovies = [
  {
    id: 1,
    title: "Spirited Away ",
    type: "Movie",
    year: 2001,
    rating: 9.5,
    status: "Watched",
    mood: "Comfort Watch",
    moodVariant: "secondary", // soft yellow
    timeAgo: "2 days ago",
    statIcon: "heart",
    statText: "Re-watched 4x",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-xULuOTApe4ibW14wHgzhG_fe8BHAEy5vtAkVoFWMDA&s=10",
    addedTimestamp: 10,
  },
  {
    id: 2,
    title: "Past Lives",
    type: "Movie",
    year: 2023,
    rating: 9.0,
    status: "Watched",
    mood: "Tearjerker",
    moodVariant: "primarySoft", // soft pink
    timeAgo: "Oct 12",
    statIcon: "note",
    statText: "12 notes",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNLyMduFg5824KD_zJOp68YFAHGl7cqktBc26WmsttOw&s=10",
    addedTimestamp: 9,
  },
  {
    id: 3,
    title: "Severance",
    type: "Series",
    year: 2022,
    rating: 9.2,
    status: "Watched",
    mood: "Mind-Bender",
    moodVariant: "tertiarySoft", // soft blue
    timeAgo: "Sep 28",
    statIcon: "heart",
    statText: "Season 1 Done",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTGxZDdvOnoONixASEfI5rXxKhqO-2roxDAnSEHrsiw&s=10g",
    addedTimestamp: 8,
  },
  {
    id: 4,
    title: "Little Women",
    type: "Movie",
    year: 2019,
    rating: 9.0,
    status: "Watched",
    mood: "Autumn Vibe",
    moodVariant: "secondary",
    timeAgo: "Sep 15",
    statIcon: "note",
    statText: "Cozy favourite",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwQng2-a15SOL36EX8pufCm2MB0lBrTE8iYsgl4zCLdQ&s=10",
    addedTimestamp: 7,
  },
  {
    id: 5,
    title: "Dune: Part Two",
    type: "Movie",
    year: 2024,
    rating: 8.8,
    status: "Wishlist",
    mood: "Sci-Fi Epic",
    moodVariant: "tertiarySoft",
    timeAgo: "Added Oct 01",
    statIcon: "note",
    statText: "IMAX only",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQcbTH8J2fj9Pw85x-izGTpDxUQMM4k-o84TY9tD2PFg&s=10",
    addedTimestamp: 6,
  },
  {
    id: 6,
    title: "Heartstopper",
    type: "Series",
    year: 2023,
    rating: 8.8,
    status: "Scheduled",
    mood: "Pure Warmth",
    moodVariant: "primarySoft",
    timeAgo: "Friday 8:30 PM",
    statIcon: "heart",
    statText: "With Alex",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2m4x0eK7Wq_7SKHxFvZ7u0FArLwCO3JIeavZL8kMEw&s=10",
    addedTimestamp: 5,
  },
];

const MyCollection = () => {
  // ==========================================
  // FILTER STATES
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("Watched");
  const [sortBy, setSortBy] = useState("recent");
  const [typeFilter, setTypeFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: mockMovies.length,
      watched: mockMovies.filter((m) => m.status === "Watched").length,
      wishlist: mockMovies.filter((m) => m.status === "Wishlist").length,
      scheduled: mockMovies.filter((m) => m.status === "Scheduled").length,
    };
  }, []);

  // Filter & Sort Logic
  const filteredMovies = useMemo(() => {
    return mockMovies
      .filter((movie) => {
        // Status tab
        if (activeStatus !== "All" && movie.status !== activeStatus)
          return false;
        // Type filter
        if (typeFilter !== "All" && movie.type !== typeFilter) return false;
        // Rating filter
        if (ratingFilter !== "all" && movie.rating < parseFloat(ratingFilter)) {
          return false;
        }
        // Search filter (title or mood)
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchTitle = movie.title.toLowerCase().includes(q);
          const matchMood = movie.mood.toLowerCase().includes(q);
          if (!matchTitle && !matchMood) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "recent") return b.addedTimestamp - a.addedTimestamp;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "year") return b.year - a.year;
        if (sortBy === "alpha") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [searchQuery, activeStatus, sortBy, typeFilter, ratingFilter]);

  const truncate = (str, max = 20) => {
    if (!str) return "";
    return str.length > max ? `${str.slice(0, max)}...` : str;
  };

  return (
    <Box
      minH="100vh"
      w="full"
      bg="white"
      fontFamily="body"
      px={4}
      pt={4}
      pb={24}
    >
      <Box maxW="lg" mx="auto">
        {/* ========================================================
            1. HEADER ROW[cite: 16]
            ======================================================== */}
        <Flex justify="space-between" align="center" mb={4}>
          <Flex align="center" gap={2.5}>
            {/* Title */}
            <Text fontSize="2xl" fontWeight="extrabold" color="neutral">
              My Collection
            </Text>

            {/* Total items pill badge */}
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

          {/* Settings/Slider Button */}
          <Flex
            w="38px"
            h="38px"
            bg="neutralSoft"
            borderRadius="full"
            align="center"
            justify="center"
            color="neutral"
            cursor="pointer"
            _hover={{ bg: "neutralBorder" }}
          >
            <SlidersHorizontal size={18} color="currentColor" />
          </Flex>
        </Flex>

        {/* ========================================================
            2. SEARCH & VIEW SWITCHER BAR[cite: 16]
            ======================================================== */}
        <Flex gap={2} align="center" mb={4}>
          {/* Search Input Box */}
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
              placeholder="Search movies, series, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fontSize="sm"
              color="neutral"
              bg="transparent"
              p={0}
              h="auto"
              _placeholder={{ color: "neutralMuted" }}
            />
          </Flex>

          {/* Grid / List Layout Switcher */}
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

        {/* ========================================================
            3. STATUS HORIZONTAL TABS[cite: 16]
            ======================================================== */}
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
          {/* ALL TAB */}
          <Flex
            align="center"
            gap={1.5}
            px={3.5}
            py={1.5}
            borderRadius="full"
            cursor="pointer"
            bg={activeStatus === "All" ? "primary" : "neutralSoft"}
            color={activeStatus === "All" ? "white" : "neutral"}
            onClick={() => setActiveStatus("All")}
            flexShrink={0}
          >
            <Text fontSize="xs" fontWeight="bold">
              All
            </Text>
            <Flex
              bg={activeStatus === "All" ? "whiteAlpha.300" : "neutralBorder"}
              px={1.5}
              py={0.2}
              borderRadius="full"
            >
              <Text fontSize="2xs" fontWeight="bold">
                {counts.all}
              </Text>
            </Flex>
          </Flex>

          {/* WATCHED TAB */}
          <Flex
            align="center"
            gap={1.5}
            px={3.5}
            py={1.5}
            borderRadius="full"
            cursor="pointer"
            bg={activeStatus === "Watched" ? "primary" : "neutralSoft"}
            color={activeStatus === "Watched" ? "white" : "neutral"}
            onClick={() => setActiveStatus("Watched")}
            flexShrink={0}
          >
            {activeStatus === "Watched" && (
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
              Watched
            </Text>
            <Flex
              bg={
                activeStatus === "Watched" ? "whiteAlpha.300" : "neutralBorder"
              }
              px={1.5}
              py={0.2}
              borderRadius="full"
            >
              <Text fontSize="2xs" fontWeight="bold">
                {counts.watched}
              </Text>
            </Flex>
          </Flex>

          {/* WISHLIST TAB */}
          <Flex
            align="center"
            gap={1.5}
            px={3.5}
            py={1.5}
            borderRadius="full"
            cursor="pointer"
            bg={activeStatus === "Wishlist" ? "primary" : "neutralSoft"}
            color={activeStatus === "Wishlist" ? "white" : "neutral"}
            onClick={() => setActiveStatus("Wishlist")}
            flexShrink={0}
          >
            <Text fontSize="xs" fontWeight="bold">
              Wishlist
            </Text>
            <Flex
              bg={
                activeStatus === "Wishlist" ? "whiteAlpha.300" : "neutralBorder"
              }
              px={1.5}
              py={0.2}
              borderRadius="full"
            >
              <Text fontSize="2xs" fontWeight="bold">
                {counts.wishlist}
              </Text>
            </Flex>
          </Flex>

          {/* SCHEDULED TAB */}
          <Flex
            align="center"
            gap={1.5}
            px={3.5}
            py={1.5}
            borderRadius="full"
            cursor="pointer"
            bg={activeStatus === "Scheduled" ? "primary" : "neutralSoft"}
            color={activeStatus === "Scheduled" ? "white" : "neutral"}
            onClick={() => setActiveStatus("Scheduled")}
            flexShrink={0}
          >
            <Text fontSize="xs" fontWeight="bold">
              Scheduled
            </Text>
            <Flex
              bg={
                activeStatus === "Scheduled"
                  ? "whiteAlpha.300"
                  : "neutralBorder"
              }
              px={1.5}
              py={0.2}
              borderRadius="full"
            >
              <Text fontSize="2xs" fontWeight="bold">
                {counts.scheduled}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* ========================================================
            4. DROPDOWN FILTERS ROW[cite: 16]
            ======================================================== */}
        <Flex gap={2} align="center" justify="space-between" mb={5}>
          {/* SORT DROPDOWN */}
          <Box position="relative">
            <Flex align="center" gap={1} cursor="pointer">
              <Text fontSize="xs" fontWeight="bold" color="primary">
                Sorted by:
              </Text>
              <Text fontSize="xs" fontWeight="semibold" color="neutral">
                {sortBy === "recent"
                  ? "Recent watched"
                  : sortBy === "rating"
                    ? "Top Rated"
                    : sortBy === "year"
                      ? "Release Year"
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
              <option value="recent">Recent watched</option>
              <option value="rating">Top Rated</option>
              <option value="year">Release Year</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </Box>

          {/* TYPE DROPDOWN */}
          <Box position="relative">
            <Flex align="center" gap={1} cursor="pointer">
              <Text fontSize="xs" fontWeight="semibold" color="neutralMuted">
                Type:
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="neutral">
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
              <option value="All">All</option>
              <option value="Movie">Movie</option>
              <option value="Series">Web Series</option>
            </select>
          </Box>

          {/* RATING DROPDOWN */}
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

        {/* ========================================================
            5. COLLECTION ITEMS GRID[cite: 16]
            ======================================================== */}
        {filteredMovies.length === 0 ? (
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
              No titles match your filter
            </Text>
            <Text fontSize="xs" color="neutralMuted" mt={1}>
              Try clearing filters or changing your search criteria.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={viewMode === "grid" ? 2 : 1} gap={3.5}>
            {filteredMovies.map((movie) => {
              // Mood sticker background mapping
              const moodBg =
                movie.moodVariant === "secondary"
                  ? "secondary"
                  : movie.moodVariant === "primarySoft"
                    ? "primarySoft"
                    : "tertiarySoft";

              const moodTextColor =
                movie.moodVariant === "secondary"
                  ? "secondaryDark"
                  : movie.moodVariant === "primarySoft"
                    ? "primary"
                    : "tertiaryDark";

              return (
                <Box
                  key={movie.id}
                  bg="white"
                  borderRadius="3xl"
                  p={2.5}
                  border="1px solid"
                  borderColor="neutralBorder"
                  boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
                  display="flex"
                  flexDirection={viewMode === "grid" ? "column" : "row"}
                  gap={3}
                >
                  {/* Poster Image with Overlay Badges[cite: 16] */}
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
                      src={movie.poster}
                      alt={movie.title}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />

                    {/* Top-Left Mood Badge[cite: 16] */}
                    <Flex
                      position="absolute"
                      top={2}
                      left={2}
                      bg={moodBg}
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      align="center"
                    >
                      <Text
                        fontSize="2xs"
                        fontWeight="bold"
                        color={moodTextColor}
                      >
                        {movie.mood}
                      </Text>
                    </Flex>

                    {/* Top-Right Rating Badge[cite: 16] */}
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
                        {movie.rating.toFixed(1)}
                      </Text>
                    </Flex>

                    {/* Bottom Date Overlay Badge[cite: 16] */}
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
                        {movie.timeAgo}
                      </Text>
                    </Flex>
                  </Box>

                  {/* Card Content[cite: 16] */}
                  <Flex
                    direction="column"
                    flex={1}
                    justify="space-between"
                    pt={0.5}
                    px={1}
                  >
                    <Box>
                      {/* Format and Year row */}
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
                        <Text fontSize="xs" fontWeight="bold" color="tertiary">
                          {movie.year}
                        </Text>
                      </Flex>

                      {/* Movie Title */}
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="neutral"
                        lineClamp={1}
                        lineHeight="short"
                        title={movie.title}
                      >
                        {truncate(movie.title, 30)}
                      </Text>
                    </Box>

                    {/* Bottom Stats & Mini Ticket Row[cite: 16] */}
                    <Flex
                      justify="space-between"
                      align="center"
                      pt={2}
                      mt={1}
                      borderTop="1px solid"
                      borderColor="neutralSoft"
                    >
                      <Flex align="center" gap={1.5} color="neutralMuted">
                        {movie.statIcon === "heart" ? (
                          <Heart size={12} color="#881938" fill="#881938" />
                        ) : (
                          <MessageSquare size={12} color="#73778D" />
                        )}
                        <Text fontSize="xs" fontWeight="semibold">
                          {movie.statText}
                        </Text>
                      </Flex>

                      {/* Mini Yellow Ticket Icon */}
                      <Flex
                        w="22px"
                        h="22px"
                        bg="secondary"
                        color="secondaryDark"
                        borderRadius="full"
                        align="center"
                        justify="center"
                        cursor="pointer"
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

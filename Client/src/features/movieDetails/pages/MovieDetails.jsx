import React, { useState } from "react";
import { Box, Flex, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import {
  MoreVertical,
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
  CloudRain,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx"; // Adjust path as needed

const MovieDetails = () => {
  const navigate = useNavigate();

  // Status state
  const [status, setStatus] = useState("Watched");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  return (
    <Box
      minH="100vh"
      w="full"
      bg="white"
      fontFamily="body"
      px={4}
      pt={4}
      pb={20}
    >
      <Box maxW="lg" mx="auto">
        {/* ========================================================
            1. TOP BAR HEADER
            ======================================================== */}

        <Flex align="center" gap={2}>
          <Text fontSize="lg">🍿</Text>
          <Text
            fontFamily="body"
            fontSize="xs"
            fontWeight="extrabold"
            letterSpacing="wider"
            color="neutral"
            textTransform="uppercase"
          >
            Movie Details
          </Text>
        </Flex>

        {/* ========================================================
            2. POLAROID POSTER SHOWCASE CARD
            ======================================================== */}
        <Box
          bg="#FBFBEE" // Warm vintage polaroid background
          p={3.5}
          pb={4}
          borderRadius="3xl"
          border="1px solid"
          borderColor="neutralBorder"
          maxW="280px"
          mx="auto"
          mb={6}
          /* Colorful Sunset Glow Shadow */
          boxShadow="0 25px 55px -10px rgba(184, 50, 80, 0.32), 0 12px 30px 65px rgba(255, 209, 102, 0.1), 0 45px 75px -15px rgba(136, 25, 56, 0.18)"
          transition="all 0.3s ease-out"
          _hover={{
            transform: "translateY(-4px)",
            boxShadow:
              "0 25px 55px -10px rgba(184, 50, 80, 0.42), 0 12px 30px -5px rgba(255, 209, 102, 0.5), 0 45px 75px -15px rgba(136, 25, 56, 0.22)",
          }}
        >
          {/* Poster Image Container */}
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCIm15c1Q9i0CjCcVS78zl2-oC-dHoezGMfu8DP1Ttcg&s=10"
              alt="Spirited Away Poster"
              w="full"
              h="full"
              objectFit="cover"
            />

            {/* Top-Left Masterpiece Pill Badge */}
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
              <Text
                fontFamily="body"
                fontSize="2xs"
                fontWeight="extrabold"
                color="neutral"
              >
                Masterpiece
              </Text>
            </Flex>
          </Box>

          {/* Micro Synopsis on Polaroid Base */}
          <Box px={1}>
            <Text
              fontFamily="body"
              fontSize="xs"
              fontWeight="extrabold"
              color="neutral"
              mb={0.5}
            >
              Synopsis
            </Text>
            <Text
              fontFamily="body"
              fontSize="3xs"
              color="neutralMuted"
              lineHeight="shorter"
              lineClamp={3}
            >
              Chihiro wanders into a magical world ruled by spirits, witches,
              and gods, where humans are changed into beasts. A heartwarming
              coming-of-age journey.
            </Text>
          </Box>
        </Box>

        {/* ========================================================
            3. MOVIE TITLE & METADATA TAGS
            ======================================================== */}
        <VStack gap={1} mb={5} textAlign="center">
          <Text
            fontFamily="body"
            fontSize="3xl"
            fontWeight="black"
            color="neutral"
            lineHeight="shorter"
          >
            Spirited Away
          </Text>
          <Text
            fontFamily="body"
            fontSize="sm"
            color="neutralMuted"
            fontWeight="medium"
          >
            千と千尋の神隠し
          </Text>

          {/* Metadata Badges Row */}
          <Flex wrap="wrap" justify="center" gap={2} mt={3}>
            <CustomBadge
              variant="date"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="semibold"
              color="neutral"
            >
              Movie
            </CustomBadge>

            <CustomBadge
              variant="date"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="semibold"
              color="neutral"
            >
              2h 5m
            </CustomBadge>

            <CustomBadge
              variant="info"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="bold"
            >
              Animation / Fantasy
            </CustomBadge>

            <CustomBadge
              variant="date"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="semibold"
              color="neutral"
            >
              Studio Ghibli
            </CustomBadge>

            <CustomBadge
              variant="date"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="semibold"
              color="neutral"
            >
              2001
            </CustomBadge>
          </Flex>
        </VStack>

        {/* ========================================================
            4. PERSONAL SCORE & TOP 1% CARD
            ======================================================== */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          pt={0}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
          position="relative"
          overflow="hidden"
        >
          {/* Top Center Decorative Yellow Notch */}
          <Box
            w="80px"
            h="6px"
            bg="secondary"
            borderBottomRadius="md"
            mx="auto"
            mb={4}
          />

          <Flex justify="space-between" align="center">
            {/* Left: Score & Date */}
            <Box>
              <CustomBadge
                variant="ratings"
                fontFamily="body"
                textTransform="none"
                px={3}
                py={0.8}
                fontSize="2xs"
                gap={1.5}
                mb={2}
              >
                <Text fontSize="xs">🍿</Text>
                <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                  Your Personal Score
                </Text>
              </CustomBadge>

              <Flex align="baseline" gap={1}>
                <Text
                  fontFamily="body"
                  fontSize="4xl"
                  fontWeight="black"
                  color="neutral"
                  lineHeight="1"
                >
                  9.5
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="xl"
                  fontWeight="bold"
                  color="neutralMuted"
                >
                  /10
                </Text>
                <Text fontSize="xl" ml={1}>
                  ✨
                </Text>
              </Flex>

              <Text
                fontFamily="body"
                fontSize="2xs"
                color="neutralMuted"
                mt={1}
              >
                Rated with love on Oct 16, 2026
              </Text>
            </Box>

            {/* Right: Top 1% Heart Badge */}
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

              <Text
                fontFamily="body"
                fontSize="3xs"
                fontWeight="extrabold"
                color="neutral"
              >
                Top 1%
              </Text>
            </Flex>
          </Flex>
        </Box>

        {/* ========================================================
            5. WATCH STATUS CARD
            ======================================================== */}
        <Box
          bg="neutralSoft"
          borderRadius="2xl"
          p={3.5}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
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
                  fontFamily="body"
                  fontSize="3xs"
                  fontWeight="extrabold"
                  color="neutralMuted"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Status
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="bold"
                  color="neutral"
                >
                  Watched on Oct 16, 2026
                </Text>
              </Box>
            </Flex>

            {/* Change Dropdown Button */}
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
              <Text
                fontFamily="body"
                fontSize="2xs"
                fontWeight="bold"
                color="neutral"
              >
                Change
              </Text>
              <ChevronDown size={12} color="#73778D" />
            </Flex>
          </Flex>
        </Box>

        {/* ========================================================
            6. QUICK ACTIONS ROW (Edit / Add / Share)
            ======================================================== */}
        <SimpleGrid columns={3} gap={3} mb={4}>
          {/* Edit Movie */}
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
            transition="all 0.2s"
            _hover={{ bg: "neutralSoft" }}
          >
            <Box color="primary" mb={1.5}>
              <Edit3 size={18} color="currentColor" strokeWidth={2.5} />
            </Box>
            <Text
              fontFamily="body"
              fontSize="2xs"
              fontWeight="bold"
              color="neutral"
            >
              Edit Movie
            </Text>
          </Flex>

          {/* Add to List */}
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
            transition="all 0.2s"
            _hover={{ bg: "neutralSoft" }}
          >
            <Box color="tertiary" mb={1.5}>
              <ListPlus size={18} color="currentColor" strokeWidth={2.5} />
            </Box>
            <Text
              fontFamily="body"
              fontSize="2xs"
              fontWeight="bold"
              color="neutral"
            >
              Add to List
            </Text>
          </Flex>

          {/* Share Ticket */}
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
            transition="all 0.2s"
            _hover={{ bg: "neutralSoft" }}
          >
            <Box color="secondaryDark" mb={1.5}>
              <Ticket size={18} color="currentColor" strokeWidth={2.5} />
            </Box>
            <Text
              fontFamily="body"
              fontSize="2xs"
              fontWeight="bold"
              color="neutral"
            >
              Share Ticket
            </Text>
          </Flex>
        </SimpleGrid>

        {/* ========================================================
            7. WATCH DIARY NOTES CARD
            ======================================================== */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          pt={0}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
          position="relative"
          overflow="hidden"
        >
          {/* Top Notch Soft Red Accent */}
          <Box
            w="80px"
            h="6px"
            bg="primarySoft"
            borderBottomRadius="md"
            mx="auto"
            mb={4}
          />

          {/* Diary Header */}
          <Flex justify="space-between" align="center" mb={3.5}>
            <Flex align="center" gap={2}>
              <Box color="neutral">
                <BookOpen size={20} color="currentColor" />
              </Box>
              <Text
                fontFamily="body"
                fontSize="md"
                fontWeight="extrabold"
                color="neutral"
              >
                Mia's Watch Diary Notes
              </Text>
            </Flex>

            <Box color="neutralMuted">
              <Award size={18} color="currentColor" />
            </Box>
          </Flex>

          {/* Diary Quotation Box */}
          <Box
            bg="neutralSoft"
            p={4}
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
            mb={4}
          >
            {/* Watermark Mug / Icon */}
            <Text
              position="absolute"
              top={2}
              right={3}
              fontSize="2xl"
              opacity={0.15}
              pointerEvents="none"
            >
              ☕
            </Text>

            <Text
              fontFamily="body"
              fontSize="xs"
              color="neutral"
              fontStyle="italic"
              lineHeight="tall"
            >
              “The coziest comfort watch ever made. Watched on a rainy Sunday
              with lavender tea and cinnamon popcorn. The train scene across the
              ocean still takes my breath away.”
            </Text>
          </Box>

          {/* Mood Tags */}
          <Flex wrap="wrap" gap={2}>
            <CustomBadge
              variant="info"
              bg="tertiarySoft"
              color="tertiaryDark"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="semibold"
              gap={1}
            >
              🌧️ Rainy Comfort
            </CustomBadge>

            <CustomBadge
              variant="ratings"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="bold"
              gap={1}
            >
              ✨ Rewatch #4
            </CustomBadge>

            <CustomBadge
              variant="info"
              bg="tertiarySoft"
              color="tertiaryDark"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={1}
              fontSize="2xs"
              fontWeight="semibold"
              gap={1}
            >
              🍵 Tea & Blankets
            </CustomBadge>
          </Flex>
        </Box>

        {/* ========================================================
            8. PLAYLISTS SECTION
            ======================================================== */}
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
              fontFamily="body"
              fontSize="2xs"
              fontWeight="extrabold"
              color="neutralMuted"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Playlists
            </Text>
            <Text
              fontFamily="body"
              fontSize="2xs"
              fontWeight="bold"
              color="tertiary"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              View All
            </Text>
          </Flex>

          {/* Playlist Card */}
          <Flex
            bg="white"
            borderRadius="2xl"
            p={3}
            align="center"
            justify="space-between"
            cursor="pointer"
            border="1px solid"
            borderColor="neutralBorder"
            boxShadow="sm"
            _hover={{ bg: "neutralSoft" }}
          >
            <Flex align="center" gap={3}>
              <Flex
                w="42px"
                h="42px"
                bg="tertiarySoft"
                borderRadius="full"
                align="center"
                justify="center"
                color="tertiary"
              >
                <CloudRain size={20} color="currentColor" />
              </Flex>

              <Box>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="bold"
                  color="neutral"
                >
                  Rainy Day Ghibli
                </Text>
                <Text fontFamily="body" fontSize="3xs" color="neutralMuted">
                  Included in 8 films collection
                </Text>
              </Box>
            </Flex>

            <Box color="neutralMuted">
              <ChevronRight size={18} color="currentColor" />
            </Box>
          </Flex>
        </Box>

        {/* ========================================================
            9. REMOVE FROM COLLECTION ACTION
            ======================================================== */}
        <Flex
          justify="center"
          align="center"
          gap={2}
          color="status.error"
          cursor="pointer"
          py={3}
          onClick={() => {
            if (window.confirm("Remove this movie from your collection?")) {
              navigate("/collection");
            }
          }}
          _hover={{ opacity: 0.8 }}
        >
          <Trash2 size={16} color="currentColor" />
          <Text fontFamily="body" fontSize="xs" fontWeight="bold">
            Remove from Collection
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieDetails;

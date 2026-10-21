import React, { useState } from "react";
import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import Logo from "../../../logo/logo_nobg.svg";
import {
  Globe,
  Film,
  PlusCircle,
  Link as LinkIcon,
  Dices,
  ShieldCheck,
  ArrowUpDown,
  Star,
  Trash2,
  Calendar,
  Heart,
  ArrowRight,
  Library,
  Clapperboard,
} from "lucide-react";
import { CustomBadge } from "../../../shared/components/CustomBadge"; // Adjust path as needed
import { CustomButton } from "../../../shared/components/CustomButton"; // Adjust path as needed

// ==========================================
// DUMMY PLAYLIST FILMS DATA[cite: 21, 22]
// ==========================================
const title = "Rainy Days Ghiblis";

const initialFilms = [
  {
    id: 1,
    title: "Spirited Away",
    year: 2001,
    tag: "Oct 16",
    tagType: "date",
    score: 9.5,
    accent: "primary",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-xULuOTApe4ibW14wHgzhG_fe8BHAEy5vtAkVoFWMDA&s=10",
  },
  {
    id: 2,
    title: "My Neighbor Totoro",
    year: 1988,
    tag: "Rainy Classic",
    tagType: "text",
    score: 9.2,
    accent: "secondary",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNLyMduFg5824KD_zJOp68YFAHGl7cqktBc26WmsttOw&s=10",
  },
  {
    id: 3,
    title: "Howl's Moving Castle",
    year: 2004,
    tag: "Top Favorite",
    tagType: "favorite",
    score: 9.6,
    accent: "tertiary",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTGxZDdvOnoONixASEfI5rXxKhqO-2roxDAnSEHrsiw&s=10g",
  },
  {
    id: 4,
    title: "Kiki's Delivery Service",
    year: 1989,
    tag: "Cozy Vibe",
    tagType: "text",
    score: 9.0,
    accent: "primary",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwQng2-a15SOL36EX8pufCm2MB0lBrTE8iYsgl4zCLdQ&s=10",
  },
  {
    id: 5,
    title: "Whisper of the Heart",
    year: 1995,
    tag: "Nostalgia",
    tagType: "text",
    score: 8.9,
    accent: "secondary",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQcbTH8J2fj9Pw85x-izGTpDxUQMM4k-o84TY9tD2PFg&s=10",
  },
];

const PlaylistDetails = () => {
  const [films, setFilms] = useState(initialFilms);

  const handleRemoveFilm = (filmId) => {
    setFilms((prev) => prev.filter((f) => f.id !== filmId));
  };

  const handleRandomPick = () => {
    if (films.length === 0) return;
    const random = films[Math.floor(Math.random() * films.length)];
    alert(`Tonight's pick: ${random.title}! 🍿`);
  };

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
        {/* ========================================================
            1. PLAYLIST HEADER HERO CARD[cite: 21]
            ======================================================== */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
        >
          {/* Top Row: Avatar & Title Header[cite: 21] */}
          <Flex gap={3.5} align="flex-start" mb={3}>
            <Box flex={1}>
              <Flex align="center" gap={1.5} mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="4xl"
                  fontWeight="black"
                  color="neutral"
                  lineHeight="short"
                >
                  {title.length > 15 ? `${title.slice(0, 15)}...` : title}
                </Text>
              </Flex>

              <Flex wrap="wrap" gap={2}>
                <CustomBadge
                  variant="info"
                  bg="tertiarySoft"
                  color="tertiaryDark"
                  fontFamily="body"
                  textTransform="none"
                  px={2.5}
                  py={0.5}
                  fontSize="2xs"
                  gap={1}
                >
                  <Globe size={11} color="currentColor" />
                  Public Playlist
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
                  <Film size={11} color="currentColor" />8 Films Curated
                </CustomBadge>
              </Flex>
            </Box>

            {/* Logo section  */}

            <Box position="relative" flexShrink={0}>
              <Flex
                w="62px"
                h="62px"
                bg="neutralSoft"
                borderRadius="2xl"
                align="center"
                justify="center"
                fontSize="2xl"
              >
                <Image src={Logo} alt="logo.png" />
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

          {/* Curator User Info[cite: 21] */}
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
                Mia Jenkins
              </Text>{" "}
              • Sep 2026
            </Text>
          </Flex>

          {/* Action Buttons[cite: 21] */}
          <VStack gap={2.5}>
            {/* Primary Action Button[cite: 21] */}
            <CustomButton
              variant="primary"
              fontFamily="body"
              py={6}
              leftElement={<PlusCircle size={18} color="currentColor" />}
            >
              <Text fontSize={"md"}> Add Movie from Collection</Text>
            </CustomButton>

            {/* Secondary Split Buttons[cite: 21] */}
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
                <Text fontSize="xs"> Random Pick</Text>
              </CustomButton>
            </Flex>
          </VStack>
        </Box>

        {/* ========================================================
            2. PERMANENT COLLECTION INFO BANNER[cite: 21]
            ======================================================== */}
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

        {/* ========================================================
            3. FILMS IN PLAYLIST HEADER[cite: 21]
            ======================================================== */}
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
                {films.length} shown
              </Text>
            </Flex>
          </Flex>

          <Flex
            align="center"
            gap={1}
            color="neutralMuted"
            cursor="pointer"
            _hover={{ color: "neutral" }}
          >
            <ArrowUpDown size={12} color="currentColor" />
            <Text fontFamily="body" fontSize="2xs" fontWeight="semibold">
              Drag to order
            </Text>
          </Flex>
        </Flex>

        {/* ========================================================
            4. FILMS CARD LIST[cite: 21, 22]
            ======================================================== */}
        <VStack gap={3} align="stretch" mb={4}>
          {films.map((film) => (
            <Box
              key={film.id}
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
              {/* Left Accent Color Indicator Bar[cite: 21, 22] */}
              <Box
                position="absolute"
                left={0}
                top={3}
                bottom={3}
                w="4px"
                bg={film.accent}
                borderRightRadius="full"
              />

              <Flex align="center" justify="space-between" gap={3}>
                <Flex align="center" gap={3} flex={1}>
                  {/* Thumbnail Preview[cite: 21, 22] */}
                  <Box
                    w="65px"
                    h="75px"
                    borderRadius="2xl"
                    overflow="hidden"
                    bg="neutralSoft"
                    flexShrink={0}
                  >
                    <Image
                      src={film.poster}
                      alt={film.title}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>

                  {/* Metadata and Title[cite: 21, 22] */}
                  <Box flex={1}>
                    <Flex align="center" gap={1.5} mb={0.5}>
                      {/* Year Tag[cite: 21, 22] */}
                      <Flex
                        bg="neutralSoft"
                        px={1.5}
                        py={0.2}
                        borderRadius="md"
                      >
                        <Text
                          fontFamily="body"
                          fontSize="12px"
                          fontWeight="bold"
                          color="neutral"
                        >
                          {film.year}
                        </Text>
                      </Flex>

                      {/* Dynamic Tag / Date / Favorite[cite: 21, 22] */}
                      {film.tagType === "date" && (
                        <Flex align="center" gap={1} color="neutralMuted">
                          <Calendar size={10} color="currentColor" />
                          <Text
                            fontFamily="body"
                            fontSize="12px"
                            fontWeight="semibold"
                          >
                            {film.tag}
                          </Text>
                        </Flex>
                      )}

                      {film.tagType === "favorite" && (
                        <Flex align="center" gap={1} color="primary">
                          <Heart
                            size={10}
                            color="currentColor"
                            fill="currentColor"
                          />
                          <Text
                            fontFamily="body"
                            fontSize="12px"
                            fontWeight="bold"
                          >
                            {film.tag}
                          </Text>
                        </Flex>
                      )}

                      {film.tagType === "text" && (
                        <Text
                          fontFamily="body"
                          fontSize="12px"
                          fontWeight="semibold"
                          color="neutralMuted"
                        >
                          {film.tag}
                        </Text>
                      )}
                    </Flex>

                    {/* Film Title[cite: 21, 22] */}
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

                    {/* Rating Pill & Label[cite: 21, 22] */}
                    <CustomBadge bg="secondary" variant="ratings">
                      <Star size={9} color="currentColor" fill="currentColor" />
                      {""}
                      {film.score.toFixed(1)}
                    </CustomBadge>
                  </Box>
                </Flex>

                {/* Remove Film Button[cite: 21, 22] */}
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
                  onClick={() => handleRemoveFilm(film.id)}
                >
                  <Trash2 size={16} color="currentColor" />
                </Flex>
              </Flex>
            </Box>
          ))}
        </VStack>

        {/* ========================================================
            5. BOTTOM ADD MORE PROMPT CARD[cite: 22]
            ======================================================== */}
        <Flex
          bg="neutralSoft"
          borderRadius="2xl"
          p={3}
          align="center"
          justify="space-between"
          border="1px solid"
          borderColor="neutralBorder"
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
                Select from 34 eligible watched & wishli...
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
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ bg: "tertiaryDark", transform: "scale(1.05)" }}
          >
            <ArrowRight size={16} color="currentColor" strokeWidth={2.5} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default PlaylistDetails;

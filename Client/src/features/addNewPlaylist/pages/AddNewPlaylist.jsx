import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  X,
  Ticket,
  Film,
  Globe,
  Lock,
  Sparkles,
  Info,
  Library,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import { CustomButton } from "../../../shared/components/CustomButton";
import { CustomInput } from "../../../shared/components/CustomInput";

export default function AddNewPlaylist({ onSubmitPlaylist }) {
  const navigate = useNavigate();

  // Form states aligned with the playlist schema & controllers
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState("Public"); // "Public" | "Private"
  const [description, setDescription] = useState("");
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick curator aesthetic tags
  const vibePills = [
    {
      label: "Rainy Day",
      emoji: "🌧️",
      bg: "tertiarySoft",
      color: "tertiaryDark",
    },
    {
      label: "Cozy Classics",
      emoji: "☕",
      bg: "secondarySoft",
      color: "secondaryDark",
    },
    {
      label: "Midnight Noir",
      emoji: "🌃",
      bg: "neutralSoft",
      color: "neutral",
    },
    { label: "Heartfelt", emoji: "💖", bg: "primarySoft", color: "primary" },
    {
      label: "Ghibli Warmth",
      emoji: "🌿",
      bg: "secondarySoft",
      color: "secondaryDark",
    },
  ];

  const handleVibeClick = (vibe) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe.label)
        ? prev.filter((v) => v !== vibe.label)
        : [...prev, vibe.label],
    );

    if (!description.includes(vibe.label)) {
      setDescription((prev) =>
        prev
          ? `${prev} • ${vibe.emoji} ${vibe.label}`
          : `${vibe.emoji} ${vibe.label}`,
      );
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Playlist title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      visibility,
      isPrivate: visibility === "Private",
    };

    try {
      if (onSubmitPlaylist) {
        await onSubmitPlaylist(payload);
      } else {
        console.log("Submitting Playlist Payload:", payload);
      }
      navigate("/playlists");
    } catch (err) {
      setErrors({ form: err.message || "Failed to create playlist" });
    } finally {
      setIsSubmitting(false);
    }
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
            1. TOP NAVIGATION & BRAND HEADER
            ======================================================== */}
        <Flex justify="space-between" align="center" mb={4}>
          <Flex align="center" gap={3}>
            <Flex
              w="42px"
              h="42px"
              bg="secondary"
              borderRadius="2xl"
              align="center"
              justify="center"
              color="secondaryDark"
              boxShadow="0 4px 12px rgba(255, 209, 102, 0.3)"
            >
              <Library size={22} color="currentColor" />
            </Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="extrabold" color="neutral">
                Create Playlist
              </Text>
              <Text fontFamily="body" fontSize="2xs" color="neutralMuted">
                Curate themed shelves & share reels
              </Text>
            </Box>
          </Flex>

          <Flex
            w="34px"
            h="34px"
            bg="neutralSoft"
            borderRadius="full"
            align="center"
            justify="center"
            color="neutralMuted"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ bg: "neutralBorder", color: "neutral" }}
            onClick={() => navigate(-1)}
          >
            <X size={18} color="currentColor" />
          </Flex>
        </Flex>

        {/* Global Error Banner */}
        {errors.form && (
          <Box
            bg="primarySoft"
            color="primary"
            p={3}
            borderRadius="xl"
            mb={4}
            fontSize="xs"
            fontWeight="bold"
            border="1px solid"
            borderColor="status.error"
          >
            {errors.form}
          </Box>
        )}

        {/* ========================================================
            2. MAIN FORM CARD
            ======================================================== */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          borderRadius="3xl"
          p={5}
          pt={0}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.02)"
          position="relative"
          overflow="hidden"
        >
          {/* Top Decorative Notch */}
          <Box
            w="80px"
            h="5px"
            bg="secondary"
            borderBottomRadius="md"
            mx="auto"
            mb={5}
          />

          <VStack gap={5} align="stretch">
            {/* PLAYLIST TITLE */}
            <Box>
              <CustomInput
                label="Playlist Title"
                required
                fontSize="xs"
                fontWeight="semibold"
                rightLabel="Mandatory"
                bg="transparent"
                placeholder="e.g. Rainy Day Ghibli, Late Night Thrillers..."
                LeftIcon={Film}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: null }));
                }}
                errorText={errors.name}
              />
            </Box>

            {/* VISIBILITY SELECTOR */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="neutral"
                >
                  Playlist Visibility
                </Text>
                <CustomBadge variant="ratings" fontSize="2xs" px={2} py={0.2}>
                  Required
                </CustomBadge>
              </Flex>

              <SimpleGrid columns={2} gap={2.5}>
                {/* PUBLIC OPTION */}
                <Flex
                  p={3.5}
                  borderRadius="2xl"
                  border="1.5px solid"
                  borderColor={
                    visibility === "Public" ? "tertiary" : "neutralBorder"
                  }
                  bg={visibility === "Public" ? "tertiarySoft" : "white"}
                  cursor="pointer"
                  direction="column"
                  gap={1}
                  transition="all 0.2s"
                  onClick={() => setVisibility("Public")}
                >
                  <Flex align="center" justify="space-between">
                    <Flex
                      align="center"
                      gap={1.5}
                      color={
                        visibility === "Public" ? "tertiaryDark" : "neutral"
                      }
                    >
                      <Globe size={16} color="currentColor" />
                      <Text fontFamily="body" fontSize="xs" fontWeight="bold">
                        Public
                      </Text>
                    </Flex>
                    <Box
                      w="16px"
                      h="16px"
                      borderRadius="full"
                      border="1.5px solid"
                      borderColor={
                        visibility === "Public" ? "tertiary" : "neutralBorder"
                      }
                      bg={visibility === "Public" ? "tertiary" : "white"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {visibility === "Public" && (
                        <Box w="6px" h="6px" bg="white" borderRadius="full" />
                      )}
                    </Box>
                  </Flex>
                  <Text
                    fontFamily="body"
                    fontSize="13px"
                    color="neutralMuted"
                    lineHeight="shorter"
                  >
                    Shareable reel link and visible to the cinema community.
                  </Text>
                </Flex>

                {/* PRIVATE OPTION */}
                <Flex
                  p={3.5}
                  borderRadius="2xl"
                  border="1.5px solid"
                  borderColor={
                    visibility === "Private" ? "primary" : "neutralBorder"
                  }
                  bg={visibility === "Private" ? "primarySoft" : "white"}
                  cursor="pointer"
                  direction="column"
                  gap={1}
                  transition="all 0.2s"
                  onClick={() => setVisibility("Private")}
                >
                  <Flex align="center" justify="space-between">
                    <Flex
                      align="center"
                      gap={1.5}
                      color={visibility === "Private" ? "primary" : "neutral"}
                    >
                      <Lock size={16} color="currentColor" />
                      <Text fontFamily="body" fontSize="xs" fontWeight="bold">
                        Private
                      </Text>
                    </Flex>
                    <Box
                      w="16px"
                      h="16px"
                      borderRadius="full"
                      border="1.5px solid"
                      borderColor={
                        visibility === "Private" ? "primary" : "neutralBorder"
                      }
                      bg={visibility === "Private" ? "primary" : "white"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {visibility === "Private" && (
                        <Box w="6px" h="6px" bg="white" borderRadius="full" />
                      )}
                    </Box>
                  </Flex>
                  <Text
                    fontFamily="body"
                    fontSize="13px"
                    color="neutralMuted"
                    lineHeight="shorter"
                  >
                    Only stored in your personal shelf and hidden from peers.
                  </Text>
                </Flex>
              </SimpleGrid>
            </Box>

            {/* DESCRIPTION / SYNOPSIS */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="neutral"
                >
                  About Playlist
                </Text>
                <CustomBadge variant="date" fontSize="2xs" px={2} py={0.2}>
                  Optional
                </CustomBadge>
              </Flex>

              <Box
                bg="neutralSoft"
                p={3.5}
                borderRadius="2xl"
                position="relative"
                border="1px solid"
                borderColor="transparent"
                _focusWithin={{ borderColor: "brand.focusRing", bg: "white" }}
              >
                <Textarea
                  bg="transparent"
                  placeholder="Whimsical comfort animations for rainy Sundays with warm chamomile tea..."
                  variant="unstyled"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 280))}
                  fontFamily="body"
                  fontSize="xs"
                  color="neutral"
                  rows={3}
                  resize="none"
                  p={0}
                  _placeholder={{ color: "fg.subtle" }}
                />
                <Text
                  position="absolute"
                  bottom={2}
                  right={3}
                  fontFamily="body"
                  fontSize="4xs"
                  color="neutralMuted"
                >
                  {description.length} / 280
                </Text>
              </Box>
            </Box>

            {/* CURATOR MOOD / VIBE TAGS */}
            <Box>
              <Flex justify="space-between" align="center" mb={2}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="neutral"
                >
                  Curator Aesthetic Vibe
                </Text>
                <Text fontFamily="body" fontSize="2xs" color="primary">
                  Tap to add to description
                </Text>
              </Flex>

              <Flex wrap="wrap" gap={2}>
                {vibePills.map((vibe) => {
                  const isSelected = selectedVibes.includes(vibe.label);
                  return (
                    <Flex
                      key={vibe.label}
                      bg={isSelected ? vibe.bg : "white"}
                      color={isSelected ? vibe.color : "neutral"}
                      border="1px solid"
                      borderColor={isSelected ? "transparent" : "neutralBorder"}
                      px={3}
                      py={1}
                      borderRadius="full"
                      align="center"
                      gap={1.5}
                      cursor="pointer"
                      onClick={() => handleVibeClick(vibe)}
                      transition="all 0.2s"
                      boxShadow={isSelected ? "xs" : "none"}
                    >
                      <Text fontSize="xs">{vibe.emoji}</Text>
                      <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                        {vibe.label}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>

            {/* CURATION TIP BANNER */}
            <Flex
              bg="tertiarySoft"
              borderRadius="2xl"
              p={3.5}
              align="center"
              gap={2.5}
            >
              <Box color="tertiary" flexShrink={0}>
                <Info size={16} color="currentColor" />
              </Box>
              <Text
                fontFamily="body"
                fontSize="2xs"
                color="neutral"
                lineHeight="tall"
              >
                Once created, you can add movies and series directly from your
                watched collection or wishlist.
              </Text>
            </Flex>

            {/* ACTION BUTTONS */}
            <VStack gap={2.5} pt={2}>
              <CustomButton
                type="submit"
                variant="primary"
                fontFamily="body"
                disabled={isSubmitting}
                leftElement={<Sparkles size={16} color="currentColor" />}
                rightElement="✨"
              >
                {isSubmitting ? "Creating Shelf..." : "Create Curated Playlist"}
              </CustomButton>

              <CustomButton
                variant="neutral"
                fontFamily="body"
                onClick={() => navigate(-1)}
              >
                Cancel
              </CustomButton>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

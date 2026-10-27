// src/features/addNewPlaylist/pages/AddNewPlaylist.jsx
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { Film, Globe, Lock, Sparkles, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import { CustomButton } from "../../../shared/components/CustomButton";
import { CustomInput } from "../../../shared/components/CustomInput";
import { useCreatePlaylistMutation } from "../../../hooks/usePlaylistQueries.js";
import { useThrottledCallback } from "../../../hooks/usePerformance.js";

export default function AddNewPlaylist() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState("Public"); // "Public" | "Private"
  const [description, setDescription] = useState("");
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [errors, setErrors] = useState({});

  const { mutate: createPlaylist, isPending } = useCreatePlaylistMutation();

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

  const submitPlaylist = useThrottledCallback(() => {
    if (!name.trim()) {
      setErrors({ name: "Playlist title is required" });
      return;
    }

    // Matches backend playlistService.createPlaylist schema (isPublic: boolean)
    createPlaylist(
      {
        name: name.trim(),
        description: description.trim(),
        isPublic: visibility === "Public",
      },
      {
        onSuccess: (res) => {
          const createdId = res?.data?._id;
          navigate(createdId ? `/playlist/${createdId}` : "/my-playlist", {
            replace: true,
          });
        },
      },
    );
  }, 1500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPending) return;
    submitPlaylist();
  };

  return (
    <Box
      minH="100vh"
      w="full"
      bg="background"
      fontFamily="body"
      px={4}
      pt={4}
      pb={16}
    >
      <Box maxW="lg" mx="auto">
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
        >
          <Box
            w="80px"
            h="5px"
            bg="secondary"
            borderBottomRadius="md"
            mx="auto"
            mb={5}
          />

          <VStack gap={5} align="stretch">
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
                if (errors.name) setErrors({});
              }}
              errorText={errors.name}
            />

            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text fontSize="xs" fontWeight="semibold" color="neutral">
                  Playlist Visibility
                </Text>
                <CustomBadge variant="ratings" fontSize="2xs" px={2} py={0.2}>
                  Required
                </CustomBadge>
              </Flex>

              <SimpleGrid columns={2} gap={2.5}>
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
                      <Globe size={16} />
                      <Text fontSize="xs" fontWeight="bold">
                        Public
                      </Text>
                    </Flex>
                  </Flex>
                  <Text fontSize="xs" color="neutralMuted">
                    Shareable reel link visible to peers.
                  </Text>
                </Flex>

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
                  onClick={() => setVisibility("Private")}
                >
                  <Flex align="center" justify="space-between">
                    <Flex
                      align="center"
                      gap={1.5}
                      color={visibility === "Private" ? "primary" : "neutral"}
                    >
                      <Lock size={16} />
                      <Text fontSize="xs" fontWeight="bold">
                        Private
                      </Text>
                    </Flex>
                  </Flex>
                  <Text fontSize="xs" color="neutralMuted">
                    Stored only on your personal shelf.
                  </Text>
                </Flex>
              </SimpleGrid>
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text fontSize="xs" fontWeight="semibold" color="neutral">
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
              >
                <Textarea
                  bg="transparent"
                  placeholder="Whimsical comfort animations for rainy Sundays..."
                  variant="unstyled"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 280))}
                  fontSize="xs"
                  color="neutral"
                  rows={3}
                  resize="none"
                  p={0}
                />
                <Text
                  position="absolute"
                  bottom={2}
                  right={3}
                  fontSize="4xs"
                  color="neutralMuted"
                >
                  {description.length} / 280
                </Text>
              </Box>
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="xs" fontWeight="semibold" color="neutral">
                  Curator Aesthetic Vibe
                </Text>
                <Text fontSize="2xs" color="primary">
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
                    >
                      <Text fontSize="xs">{vibe.emoji}</Text>
                      <Text fontSize="2xs" fontWeight="bold">
                        {vibe.label}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>

            <Flex
              bg="tertiarySoft"
              borderRadius="2xl"
              p={3.5}
              align="center"
              gap={2.5}
            >
              <Info size={16} />
              <Text fontSize="2xs" color="neutral" lineHeight="tall">
                Once created, you can add movies and series directly from your
                collection.
              </Text>
            </Flex>

            <VStack gap={2.5} pt={2}>
              <CustomButton
                type="submit"
                variant="primary"
                disabled={isPending}
                leftElement={<Sparkles size={16} color="currentColor" />}
                rightElement="✨"
              >
                {isPending ? "Creating Shelf..." : "Create Curated Playlist"}
              </CustomButton>

              <CustomButton variant="neutral" onClick={() => navigate(-1)}>
                Cancel
              </CustomButton>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

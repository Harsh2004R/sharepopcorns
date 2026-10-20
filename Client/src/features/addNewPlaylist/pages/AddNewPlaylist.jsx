import React, { useState } from "react";
import { Box, Flex, Text, VStack, Input, Textarea } from "@chakra-ui/react";
import { X, Lock, Clapperboard, Star, LockOpen } from "lucide-react";
import { CustomButton } from "../../../shared/components/CustomButton";
import { useNavigate } from "react-router-dom";

export default function AddNewPlaylist() {
  // FORM STATES
  const [title, setTitle] = useState("");
  const [playListType, setPlayListType] = useState("Public");
  const [synopsis, setSynopsis] = useState("");
  const navigate = useNavigate();

  return (
    <Box
      w="full"
      mx="auto"
      bg="white"
      minH="100vh"
      p={{ base: 5, md: 6, lg: 5 }}
    >
      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb={4}>
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="neutral">
            Create New
          </Text>
          <Text fontSize="sm" color="neutralMuted">
            Build your Private / Public cinema Playlist
          </Text>
        </Box>
        <Flex
          w="32px"
          h="32px"
          bg="neutralSoft"
          borderRadius="full"
          align="center"
          justify="center"
          onClick={() => navigate(-1)}
          cursor="pointer"
        >
          <X size={18} color="#73778D" />
        </Flex>
      </Flex>

      <Box borderBottom="1px solid" borderColor="neutralMuted/25" mb={6} />

      <VStack gap={5} align="stretch" mb={8}>
        {/* Title Input */}
        <Box>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="sm" fontWeight="bold" color="neutral">
              Title{" "}
              <Text as="span" color="primary">
                *
              </Text>
            </Text>
            <Text fontSize="xs" color="neutralMuted">
              Mandatory
            </Text>
          </Flex>
          <Flex bg="neutralSoft" p={3} borderRadius="xl" align="center" gap={3}>
            <Clapperboard size={20} color="#73778D" />
            <Input
              bg="neutralSoft"
              variant="unstyled"
              placeholder="Your Playlist title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              color="neutral"
              fontWeight="medium"
              fontSize="sm"
            />
          </Flex>
        </Box>

        {/* Format Type */}
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="neutral" mb={2}>
            Playlist Type
          </Text>
          <Flex bg="neutralSoft" p={1} borderRadius="xl" gap={1}>
            <Flex
              flex={1}
              py={2.5}
              bg={playListType === "Public" ? "white" : "transparent"}
              color={playListType === "Public" ? "primary" : "neutralMuted"}
              borderRadius="lg"
              align="center"
              justify="center"
              gap={2}
              cursor="pointer"
              boxShadow={playListType === "Public" ? "xs" : "none"}
              onClick={() => setPlayListType("Public")}
            >
              <LockOpen size={18} />
              <Text fontWeight="bold" fontSize="sm">
                Public
              </Text>
            </Flex>
            <Flex
              flex={1}
              py={2.5}
              bg={playListType === "Private" ? "white" : "transparent"}
              color={playListType === "Private" ? "primary" : "neutralMuted"}
              borderRadius="lg"
              align="center"
              justify="center"
              gap={2}
              cursor="pointer"
              boxShadow={playListType === "Private" ? "xs" : "none"}
              onClick={() => setPlayListType("Private")}
            >
              <Lock size={18} />
              <Text fontWeight="bold" fontSize="sm">
                Private
              </Text>
            </Flex>
          </Flex>
        </Box>

        {/* Synopsis */}
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="neutral" mb={2}>
            About playlist
          </Text>
          <Box bg="neutralSoft" p={4} borderRadius="xl" position="relative">
            <Textarea
              placeholder="Description : Eg - A magical coming-of-age journey filled with spirits, warmth, and nostalgia."
              variant="unstyled"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              color="neutral"
              fontSize="sm"
              bg="neutralSoft"
              rows={3}
              resize="none"
            />
            <Text
              position="absolute"
              bottom={3}
              right={4}
              fontSize="xs"
              color="neutralMuted"
            >
              {synopsis.length} / 280
            </Text>
          </Box>
        </Box>
      </VStack>

      <Box mb={8}>
        {/* Action Buttons */}
        <VStack gap={3}>
          <CustomButton
            variant="primary"
            onClick={() => console.log("Saved!")}
            leftElement={
              <Flex bg="white" color="primary" borderRadius="full" p={0.5}>
                <Star size={14} fill="currentColor" />
              </Flex>
            }
            rightElement="✨"
          >
            <Text fontWeight="bold" fontSize="md">
              Save to My Collection
            </Text>
          </CustomButton>

          <CustomButton
            onClick={() => {
              navigate("/");
            }}
            variant="neutral"
          >
            Cancel
          </CustomButton>
        </VStack>
      </Box>
      <Box w="100%" h="10vh"></Box>
    </Box>
  );
}

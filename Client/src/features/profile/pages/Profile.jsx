// src/features/profile/pages/Profile.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Box, Flex, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import {
  User,
  Mail,
  Lock,
  LogOut,
  ChevronRight,
  Check,
  Pencil,
  Ticket,
  Sparkles,
  ShieldCheck,
  Film,
  Star,
  Link as LinkIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import { CustomButton } from "../../../shared/components/CustomButton";
import { CustomInput } from "../../../shared/components/CustomInput";
import {
  useProfileQuery,
  useUpdateProfileMutation,
  useLogout,
} from "../../../hooks/useAuthMutations.js";
import { useMoviesQuery } from "../../../hooks/useMovieQueries.js";
import { useUserPlaylistsQuery } from "../../../hooks/usePlaylistQueries.js";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop";

const Profile = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const { data: profile } = useProfileQuery();
  const { mutate: updateProfile, isPending: isSaving } =
    useUpdateProfileMutation();

  const { data: movieData } = useMoviesQuery();
  const { data: playlists = [] } = useUserPlaylistsQuery(profile?._id);

  const [userName, setUserName] = useState(profile?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || "");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  useEffect(() => {
    if (profile) {
      setUserName(profile.name || "");
      setAvatarUrl(profile.avatar || "");
    }
  }, [profile]);

  // Live stats computed from cached movies & playlists
  const stats = useMemo(() => {
    const watched = (movieData?.movies || []).filter(
      (m) => m.status === "watched",
    );
    const rated = watched.filter(
      (m) => m.rating !== null && m.rating !== undefined,
    );
    const avg =
      rated.length > 0
        ? (
            rated.reduce((sum, m) => sum + Number(m.rating), 0) / rated.length
          ).toFixed(1)
        : "—";

    return {
      watchedCount: watched.length,
      avgRating: avg,
      playlistCount: playlists.length,
    };
  }, [movieData, playlists]);

  const handleSaveName = () => {
    setIsEditingName(false);
    if (!userName.trim() || userName.trim() === profile?.name) return;
    updateProfile({ name: userName.trim() });
  };

  const handleSaveAvatar = () => {
    setIsEditingAvatar(false);
    const trimmed = avatarUrl.trim() || null;
    if (trimmed === profile?.avatar) return;
    updateProfile({ avatar: trimmed });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of SharePopcorns?")) {
      logout();
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
      pb={12}
    >
      <Box maxW="md" mx="auto">
        {/* 1. HERO PASSPORT CARD & AVATAR */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={4}
          pt={0}
          mb={5}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.02)"
          textAlign="center"
        >
          <Box
            w="90px"
            h="6px"
            bg="secondary"
            borderBottomRadius="md"
            mx="auto"
            mb={6}
          />

          <Box position="relative" w="104px" h="104px" mx="auto" mb={3.5}>
            <Box
              position="absolute"
              inset="-3px"
              borderRadius="full"
              bg="secondary"
              opacity={0.35}
              filter="blur(8px)"
            />

            <Box
              w="full"
              h="full"
              borderRadius="full"
              overflow="hidden"
              border="3px solid"
              borderColor="white"
              boxShadow="sm"
              position="relative"
              bg="neutralSoft"
            >
              <Image
                src={profile?.avatar || DEFAULT_AVATAR}
                alt={profile?.name || "User"}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>

            <Flex
              position="absolute"
              bottom="2px"
              right="2px"
              w="32px"
              h="32px"
              bg="primary"
              color="white"
              borderRadius="full"
              align="center"
              justify="center"
              cursor="pointer"
              onClick={() => setIsEditingAvatar((prev) => !prev)}
              boxShadow="0 2px 8px rgba(136, 25, 56, 0.35)"
            >
              <Pencil size={14} color="currentColor" />
            </Flex>
          </Box>

          {isEditingAvatar && (
            <Flex gap={2} mb={4} px={2}>
              <CustomInput
                placeholder="Paste avatar image URL..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                LeftIcon={LinkIcon}
              />
              <CustomButton
                variant="primary"
                w="auto"
                px={4}
                disabled={isSaving}
                onClick={handleSaveAvatar}
              >
                Save
              </CustomButton>
            </Flex>
          )}

          <VStack gap={1.5} mb={4}>
            <Text
              fontSize="2xl"
              fontWeight="black"
              color="neutral"
              lineHeight="short"
            >
              {profile?.name || "Cinephile"}
            </Text>

            <CustomBadge
              variant="ratings"
              textTransform="none"
              px={3}
              py={0.8}
              fontSize="2xs"
              gap={1.5}
            >
              <Ticket size={12} color="currentColor" />
              <Text fontSize="2xs" fontWeight="bold">
                Cinephile Passport #
                {profile?._id?.slice(-4)?.toUpperCase() || "0624"}
              </Text>
            </CustomBadge>
          </VStack>

          {/* LIVE STATS ROW */}
          <SimpleGrid
            columns={3}
            bg="neutralSoft"
            p={3}
            borderRadius="2xl"
            border="1px solid"
            borderColor="neutralBorder"
          >
            <VStack
              gap={0.5}
              cursor="pointer"
              onClick={() => navigate("/my-collection")}
            >
              <Flex align="center" gap={1} color="primary">
                <Film size={13} color="currentColor" />
                <Text fontSize="md" fontWeight="black" lineHeight="1">
                  {stats.watchedCount}
                </Text>
              </Flex>
              <Text fontSize="3xs" color="neutralMuted">
                Watched
              </Text>
            </VStack>

            <VStack gap={0.5} borderX="1px solid" borderColor="neutralBorder">
              <Flex align="center" gap={1} color="secondaryDark">
                <Star size={13} color="currentColor" fill="currentColor" />
                <Text fontSize="md" fontWeight="black" lineHeight="1">
                  {stats.avgRating}
                </Text>
              </Flex>
              <Text fontSize="3xs" color="neutralMuted">
                Avg Rating
              </Text>
            </VStack>

            <VStack
              gap={0.5}
              cursor="pointer"
              onClick={() => navigate("/my-playlist")}
            >
              <Flex align="center" gap={1} color="tertiaryDark">
                <Sparkles size={13} color="currentColor" />
                <Text fontSize="md" fontWeight="black" lineHeight="1">
                  {stats.playlistCount}
                </Text>
              </Flex>
              <Text fontSize="3xs" color="neutralMuted">
                Playlists
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* 2. ACCOUNT DETAILS CARD */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
        >
          <Text
            fontSize="xs"
            fontWeight="extrabold"
            color="neutralMuted"
            letterSpacing="wider"
            textTransform="uppercase"
            mb={4}
          >
            Account Details
          </Text>

          <VStack gap={4} align="stretch">
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text fontSize="xs" fontWeight="bold" color="neutral">
                  Full Name
                </Text>

                <Flex
                  align="center"
                  gap={1}
                  color={isEditingName ? "status.success" : "primary"}
                  cursor="pointer"
                  onClick={() =>
                    isEditingName ? handleSaveName() : setIsEditingName(true)
                  }
                >
                  {isEditingName ? (
                    <>
                      <Check size={12} strokeWidth={2.5} />
                      <Text fontSize="2xs" fontWeight="bold">
                        Save
                      </Text>
                    </>
                  ) : (
                    <>
                      <Pencil size={11} />
                      <Text fontSize="2xs" fontWeight="bold">
                        Edit
                      </Text>
                    </>
                  )}
                </Flex>
              </Flex>

              {isEditingName ? (
                <CustomInput
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  LeftIcon={User}
                  autoFocus
                />
              ) : (
                <Flex
                  bg="neutralSoft"
                  p={3.5}
                  borderRadius="xl"
                  align="center"
                  gap={2.5}
                >
                  <User size={16} color="#73778D" />
                  <Text fontSize="sm" fontWeight="semibold" color="neutral">
                    {profile?.name}
                  </Text>
                </Flex>
              )}
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight="bold" color="neutral" mb={1.5}>
                Email Address
              </Text>
              <Flex
                bg="neutralSoft"
                p={3.5}
                borderRadius="xl"
                align="center"
                justify="space-between"
              >
                <Flex align="center" gap={2.5}>
                  <Mail size={16} color="#73778D" />
                  <Text fontSize="sm" fontWeight="semibold" color="neutral">
                    {profile?.email}
                  </Text>
                </Flex>

                <Flex
                  bg="status.success"
                  color="white"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  align="center"
                  gap={1}
                >
                  <ShieldCheck size={10} />
                  <Text fontSize="4xs" fontWeight="bold">
                    Verified
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </VStack>
        </Box>

        {/* 3. SECURITY CARD */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          mb={6}
          border="1px solid"
          borderColor="neutralBorder"
        >
          <Text
            fontSize="xs"
            fontWeight="extrabold"
            color="neutralMuted"
            letterSpacing="wider"
            textTransform="uppercase"
            mb={3}
          >
            Security & Passkey
          </Text>

          <Flex
            bg="neutralSoft"
            borderRadius="2xl"
            p={3.5}
            align="center"
            justify="space-between"
            cursor="pointer"
            _hover={{ bg: "tertiarySoft" }}
            onClick={() => navigate("/auth/forget-password")}
          >
            <Flex align="center" gap={3}>
              <Flex
                w="38px"
                h="38px"
                bg="white"
                borderRadius="xl"
                align="center"
                justify="center"
                color="primary"
              >
                <Lock size={18} />
              </Flex>
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="neutral">
                  Reset Password via Email
                </Text>
                <Text fontSize="xs" color="neutralMuted">
                  Send a secure reset link to your inbox
                </Text>
              </Box>
            </Flex>
            <ChevronRight size={18} color="#73778D" />
          </Flex>
        </Box>

        {/* 4. LOG OUT BUTTON */}
        <CustomButton
          py={5}
          leftElement={<LogOut size={16} strokeWidth={2.5} />}
          onClick={handleLogout}
        >
          Log Out
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Profile;

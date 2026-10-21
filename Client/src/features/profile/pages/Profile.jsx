import React, { useState } from "react";
import { Box, Flex, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import {
  Camera,
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge"; // Adjust path as needed
import { CustomButton } from "../../../shared/components/CustomButton"; // Adjust path as needed
import { CustomInput } from "../../../shared/components/CustomInput"; // Adjust path as needed

const Profile = () => {
  const navigate = useNavigate();

  // Profile editable states
  const [userName, setUserName] = useState("Mia Jenkins");
  const [email, setEmail] = useState("mia@example.com");
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  );

  // Edit toggles
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of SharePopcorns?")) {
      navigate("/auth/login");
    }
  };

  return (
    <Box
      minH="100vh"
      w="full"
      bg="background"
      fontFamily="body"
      px={2}
      pt={4}
      pb={28}
    >
      <Box maxW="md" mx="auto">
        {/* ========================================================
            1. HERO PASSPORT CARD & AVATAR
            ======================================================== */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={4}
          pt={0}
          mb={5}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.02)"
          position="relative"
          overflow="hidden"
          textAlign="center"
        >
          {/* Top Notch Brand Accent */}
          <Box
            w="90px"
            h="6px"
            bg="secondary"
            borderBottomRadius="md"
            mx="auto"
            mb={6}
          />

          {/* Avatar with Floating Camera Edit Trigger */}
          <Box position="relative" w="104px" h="104px" mx="auto" mb={3.5}>
            {/* Ambient Avatar Glow */}
            <Box
              position="absolute"
              inset="-3px"
              borderRadius="full"
              bg="secondary"
              opacity={0.35}
              filter="blur(8px)"
            />

            {/* Profile Image */}
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
                src={avatar}
                alt={userName}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>

            {/* Edit Photo Icon Button */}
            <Flex
              as="label"
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
              boxShadow="0 2px 8px rgba(136, 25, 56, 0.35)"
              transition="all 0.2s"
              _hover={{ transform: "scale(1.08)", bg: "primaryDark" }}
              _active={{ transform: "scale(0.95)" }}
            >
              <Camera size={15} color="currentColor" strokeWidth={2.2} />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </Flex>
          </Box>

          {/* User Name & Cinephile Passport Badge */}
          <VStack gap={1.5} mb={4}>
            <Text
              fontFamily="body"
              fontSize="2xl"
              fontWeight="black"
              color="neutral"
              lineHeight="short"
            >
              {userName}
            </Text>

            <CustomBadge
              variant="ratings"
              fontFamily="body"
              textTransform="none"
              px={3}
              py={0.8}
              fontSize="2xs"
              gap={1.5}
            >
              <Ticket size={12} color="currentColor" />
              <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                Cinephile Passport #0624
              </Text>
            </CustomBadge>
          </VStack>

          {/* Quick Cinema Stats Row */}
          <SimpleGrid
            columns={3}
            bg="neutralSoft"
            p={3}
            borderRadius="2xl"
            border="1px solid"
            borderColor="neutralBorder"
          >
            <VStack gap={0.5}>
              <Flex align="center" gap={1} color="primary">
                <Film size={13} color="currentColor" />
                <Text
                  fontFamily="body"
                  fontSize="md"
                  fontWeight="black"
                  lineHeight="1"
                >
                  63
                </Text>
              </Flex>
              <Text fontFamily="body" fontSize="3xs" color="neutralMuted">
                Watched
              </Text>
            </VStack>

            <VStack gap={0.5} borderX="1px solid" borderColor="neutralBorder">
              <Flex align="center" gap={1} color="secondaryDark">
                <Star size={13} color="currentColor" fill="currentColor" />
                <Text
                  fontFamily="body"
                  fontSize="md"
                  fontWeight="black"
                  lineHeight="1"
                >
                  9.4
                </Text>
              </Flex>
              <Text fontFamily="body" fontSize="3xs" color="neutralMuted">
                Avg Rating
              </Text>
            </VStack>

            <VStack gap={0.5}>
              <Flex align="center" gap={1} color="tertiaryDark">
                <Sparkles size={13} color="currentColor" />
                <Text
                  fontFamily="body"
                  fontSize="md"
                  fontWeight="black"
                  lineHeight="1"
                >
                  4
                </Text>
              </Flex>
              <Text fontFamily="body" fontSize="3xs" color="neutralMuted">
                Playlists
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* ========================================================
            2. PERSONAL INFORMATION SETTINGS CARD
            ======================================================== */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          mb={4}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 2px 12px rgba(0, 0, 0, 0.02)"
        >
          <Text
            fontFamily="body"
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
            {/* USERNAME FIELD */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="bold"
                  color="neutral"
                >
                  Full Name
                </Text>

                <Flex
                  align="center"
                  gap={1}
                  color={isEditingUsername ? "status.success" : "primary"}
                  cursor="pointer"
                  onClick={() => setIsEditingUsername(!isEditingUsername)}
                >
                  {isEditingUsername ? (
                    <>
                      <Check size={12} color="currentColor" strokeWidth={2.5} />
                      <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                        Save
                      </Text>
                    </>
                  ) : (
                    <>
                      <Pencil size={11} color="currentColor" />
                      <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                        Edit
                      </Text>
                    </>
                  )}
                </Flex>
              </Flex>

              {isEditingUsername ? (
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
                  <Box color="neutralMuted">
                    <User size={16} color="currentColor" />
                  </Box>
                  <Text
                    fontFamily="body"
                    fontSize="sm"
                    fontWeight="semibold"
                    color="neutral"
                  >
                    {userName}
                  </Text>
                </Flex>
              )}
            </Box>

            {/* EMAIL ADDRESS FIELD */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="bold"
                  color="neutral"
                >
                  Email Address
                </Text>

                <Flex
                  align="center"
                  gap={1}
                  color={isEditingEmail ? "status.success" : "primary"}
                  cursor="pointer"
                  onClick={() => setIsEditingEmail(!isEditingEmail)}
                >
                  {isEditingEmail ? (
                    <>
                      <Check size={12} color="currentColor" strokeWidth={2.5} />
                      <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                        Save
                      </Text>
                    </>
                  ) : (
                    <>
                      <Pencil size={11} color="currentColor" />
                      <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                        Edit
                      </Text>
                    </>
                  )}
                </Flex>
              </Flex>

              {isEditingEmail ? (
                <CustomInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  LeftIcon={Mail}
                  autoFocus
                />
              ) : (
                <Flex
                  bg="neutralSoft"
                  p={3.5}
                  borderRadius="xl"
                  align="center"
                  justify="space-between"
                >
                  <Flex align="center" gap={2.5}>
                    <Box color="neutralMuted">
                      <Mail size={16} color="currentColor" />
                    </Box>
                    <Text
                      fontFamily="body"
                      fontSize="sm"
                      fontWeight="semibold"
                      color="neutral"
                    >
                      {email}
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
                    <ShieldCheck size={10} color="currentColor" />
                    <Text fontFamily="body" fontSize="4xs" fontWeight="bold">
                      Verified
                    </Text>
                  </Flex>
                </Flex>
              )}
            </Box>
          </VStack>
        </Box>

        {/* ========================================================
            3. SECURITY & PREFERENCES CARD
            ======================================================== */}
        <Box
          bg="white"
          borderRadius="3xl"
          p={5}
          mb={6}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 2px 12px rgba(0, 0, 0, 0.02)"
        >
          <Text
            fontFamily="body"
            fontSize="xs"
            fontWeight="extrabold"
            color="neutralMuted"
            letterSpacing="wider"
            textTransform="uppercase"
            mb={3}
          >
            Security & Passkey
          </Text>

          {/* Reset Password Action Row */}
          <Flex
            bg="neutralSoft"
            borderRadius="2xl"
            p={3.5}
            align="center"
            justify="space-between"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ bg: "tertiarySoft" }}
            onClick={() => navigate("/auth/reset-password")}
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
                boxShadow="xs"
              >
                <Lock size={18} color="currentColor" />
              </Flex>

              <Box>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="bold"
                  color="neutral"
                >
                  Reset Password
                </Text>
                <Text fontFamily="body" fontSize="xs" color="neutralMuted">
                  Change and secure your login key
                </Text>
              </Box>
            </Flex>

            <Box color="neutralMuted">
              <ChevronRight size={18} color="currentColor" />
            </Box>
          </Flex>
        </Box>

        {/* ========================================================
            4. LOG OUT BUTTON
            ======================================================== */}
        <CustomButton
          fontFamily="body"
          py={5}
          leftElement={
            <LogOut size={16} color="currentColor" strokeWidth={2.5} />
          }
          onClick={handleLogout}
        >
          Log Out
        </CustomButton>

        {/* App Version Tag */}
        <Text
          fontFamily="body"
          fontSize="3xs"
          color="neutralMuted"
          textAlign="center"
          mt={4}
        >
          • SharePopcorns v1.0 Edition •
        </Text>
      </Box>
    </Box>
  );
};

export default Profile;

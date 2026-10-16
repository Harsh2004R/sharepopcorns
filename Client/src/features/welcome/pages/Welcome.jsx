import React from "react";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import {
  Heart,
  Star,
  ArrowRight,
  KeyRound,
  Ticket,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../shared/components/CustomButton"; // Adjust path as needed
import { CustomBadge } from "../../../shared/components/CustomBadge"; // Adjust path as needed
import Logo from "../../../logo/logo_nobg.svg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      w="full"
      bg="white"
      px={4}
      py={10}
      fontFamily="body"
      display="flex"
    >
      <style>
        {`
          @keyframes auraPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.5; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.85; }
          }
          @keyframes floatHeart {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
            50% { transform: translate(6px, -9px) rotate(18deg) scale(1.08); }
          }
        `}
      </style>
      <Flex direction="column" align="center" w="full" maxW="md" mx="auto">
        {/* Main Hero Card */}

        <Box
          w="full"
          bg="white"
          borderRadius="3xl"
          px={6}
          pt={10}
          pb={10}
          mb={6}
          // border="1px solid"
          // borderColor="neutralBorder"
          position="relative"
          overflow="hidden"
          textAlign="center"
        >
          {/* Top Peeking Yellow Badge */}
          <Flex
            position="absolute"
            top="10px"
            left="50%"
            transform="translateX(-50%)"
          >
            <CustomBadge
              variant="secondary"
              tilt="left"
              px={4}
              py={1}
              fontSize="2xs"
              gap={1.5}
              fontFamily="body"
            >
              <Ticket size={12} color="currentColor" />
              <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                Share popcorns
              </Text>
            </CustomBadge>
          </Flex>

          {/* Decorative Floating Icon Circles (Popcorn mascot omitted) */}
          <Box
            mt="20px"
            position="relative"
            w="200px"
            h="160px"
            mx="auto"
            mb={4}
          >
            <Box
              position="absolute"
              top="50%"
              left="52%"
              w="100px"
              h="100px"
              bg="secondary/50"
              borderRadius="full"
              zIndex={0}
              animation="auraPulse 4s ease-in-out infinite"
            />
            {/* Top-Left Soft Blue Icon */}
            <Flex
              position="absolute"
              top="12px"
              left="16px"
              w="28px"
              h="28px"
              bg="tertiarySoft"
              color="tertiary"
              borderRadius="full"
              align="center"
              justify="center"
            >
              <ChevronLeft size={14} color="currentColor" strokeWidth={2.5} />
            </Flex>
            <Box
              animation="shadowBreath 3.5s ease-in-out infinite"
              w="80px"
              h="80px"
              position="absolute"
              top="35px"
              left="65px"
            >
              <Image src={Logo} alt="logo.svg" w="100%" h="100%" />
            </Box>
            {/* Top-Right Soft Pink Heart */}
            <Flex
              position="absolute"
              top="0px"
              right="12px"
              w="40px"
              h="40px"
              bg="primaryDark/30"
              color="primaryDark"
              borderRadius="full"
              align="center"
              justify="center"
              animation="floatHeart 2s ease-in-out infinite 0.6s"
            >
              <Heart size={18} color="currentColor" fill="currentColor" />
            </Flex>

            {/* Bottom-Left Soft Yellow Star */}
            <Flex
              position="absolute"
              bottom="4px"
              left="24px"
              w="36px"
              h="36px"
              bg="secondarySoft"
              color="secondaryDark"
              borderRadius="full"
              align="center"
              justify="center"
            >
              <Star size={16} color="currentColor" fill="currentColor" />
            </Flex>
          </Box>

          {/* Main Title & Subtitle */}
          <VStack gap={3} maxW="xs" mx="auto">
            <Text
              fontFamily="body"
              fontSize="3xl"
              fontWeight="extrabold"
              color="neutral"
              lineHeight="shorter"
            >
              Your movie memories deserve a home.
            </Text>

            <Text
              fontFamily="body"
              fontSize="sm"
              color="neutralMuted"
              lineHeight="tall"
            >
              Track what you watch, schedule cozy movie nights, curate dream
              watchlists, and share your cinema diary with friends.
            </Text>
          </VStack>
        </Box>

        {/* Bottom Action Buttons */}
        <VStack w="full" gap={3}>
          {/* Get Started Button (Blue Theme Token) */}
          <CustomButton
            bg="tertiaryDark"
            color="white"
            _hover={{ bg: "tertiary" }}
            fontFamily="body"
            onClick={() => navigate("/auth/signup")}
            rightElement={
              <Flex
                w="24px"
                h="24px"
                bg="tertiary"
                color="white"
                borderRadius="full"
                align="center"
                justify="center"
              >
                <ArrowRight size={14} color="currentColor" strokeWidth={2.5} />
              </Flex>
            }
          >
            Get Started
          </CustomButton>

          {/* Log In Button */}
          <CustomButton
            bg="white"
            color="neutral"
            border="1px solid"
            borderColor="border.muted"
            _hover={{ bg: "neutralSoft" }}
            fontFamily="body"
            onClick={() => navigate("/auth/login")}
            leftElement={
              <Box color="primary" display="inline-flex">
                <KeyRound size={16} color="currentColor" strokeWidth={2.5} />
              </Box>
            }
          >
            Log In
          </CustomButton>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Welcome;

import React, { useState } from "react";
import { Box, Flex, Text, Heading, VStack, Image } from "@chakra-ui/react";
import {
  Ticket,
  Mail,
  Lock,
  MailCheck,
  ArrowRight,
  FlaskConical,
  Check,
} from "lucide-react";

import { CustomInput } from "../../../shared/components/CustomInput.jsx"; // Adjust path as needed
import { CustomButton } from "../../../shared/components/CustomButton.jsx"; // Adjust path as needed
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx"; // Adjust path as needed
import Logo from "../../../logo/logo_nobg.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showVerifyAlert, setShowVerifyAlert] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle authentication logic here
  };

  return (
    <Box
      minH="100vh"
      w="full"
      bg="white"
      px={4}
      pb={10}
      fontFamily="body"
      overflow="hidden"
    >
      <Flex direction="column" align="center" maxW="md" mx="auto" pt={2}>
        {/* Top Peeking Badge & Cute Popcorn Mascot */}
        <VStack gap={2} mb={4} position="relative">
          {/* Cute Smiling Popcorn Bucket built with Theme Tokens */}
          <Box
            position="relative"
            w="64px"
            h="76px"
            mt={1}
          >
            {/* Popcorn Puffs */}
            <Image w="100%" h="100%" src={Logo} alt="logo.svg" />
          </Box>
          {/* Peeking Top Pill */}
          <CustomBadge
            variant="secondary"
            tilt="left"
            px={3}
            py={0.5}
            fontSize="2xs"
            textTransform="none"
          >
            Ready? ✨
          </CustomBadge>
        </VStack>

        {/* Main Heading & Subtitle */}
        <Heading
          as="h1"
          fontFamily="body"
          fontSize="4xl"
          fontWeight="extrabold"
          color="neutral"
          textAlign="center"
          mb={1.5}
        >
          Welcome Back! 🎬
        </Heading>

        <Text
          fontFamily="body"
          fontSize="sm"
          color="neutralMuted"
          textAlign="center"
          maxW="sm"
          mb={6}
        >
          Grab your popcorn and log in to your watch diary.
        </Text>

        {/* Email Verification Banner */}
        {showVerifyAlert && (
          <Flex
            w="full"
            bg="secondarySoft"
            borderRadius="2xl"
            p={4}
            gap={3.5}
            align="flex-start"
            mb={6}
          >
            <Flex
              w="38px"
              h="38px"
              bg="secondary"
              color="secondaryDark"
              borderRadius="full"
              align="center"
              justify="center"
              flexShrink={0}
              mt={0.5}
            >
              <MailCheck size={18} color="currentColor" />
            </Flex>

            <Box flex={1}>
              <Text
                fontFamily="body"
                fontSize="sm"
                color="neutral"
                lineHeight="tall"
              >
                <Text as="span" fontWeight="bold">
                  Please verify your email
                </Text>{" "}
                before signing in. Just registered? Check your verification
                inbox.
              </Text>

              <Flex
                align="center"
                gap={1}
                mt={1.5}
                color="primary"
                cursor="pointer"
                w="fit-content"
                _hover={{ color: "primaryDark" }}
              >
                <Text fontFamily="body" fontSize="sm" fontWeight="bold">
                  Verify Email Now
                </Text>
                <ArrowRight size={13} color="currentColor" strokeWidth={2.5} />
              </Flex>
            </Box>
          </Flex>
        )}

        {/* White Login Form Card */}
        <Box
          as="form"
          onSubmit={handleLogin}
          w="full"
          bg="white"
          borderRadius="3xl"
          p={6}
          border="1px solid"
          borderColor="neutralBorder"
        >
          <VStack gap={5} align="stretch">
            {/* Email Address Field */}
            <CustomInput
              label="Email Address"
              rightLabel="Account ID"
              placeholder="you@example.com"
              type="email"
              LeftIcon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Field */}
            <CustomInput
              label="Password"
              placeholder="••••••••••••"
              type="password"
              LeftIcon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Remember Me & Forgot Password Row */}
            <Flex justify="space-between" align="center" pt={1}>
              <Flex
                align="center"
                gap={2.5}
                cursor="pointer"
                onClick={() => setRememberMe((prev) => !prev)}
                userSelect="none"
              >
                <Flex
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  bg={rememberMe ? "primary" : "neutralSoft"}
                  color="white"
                  align="center"
                  justify="center"
                  transition="all 0.2s"
                >
                  {rememberMe && (
                    <Check size={12} color="currentColor" strokeWidth={3} />
                  )}
                </Flex>
                <Text fontFamily="body" fontSize="sm" color="text">
                  Remember me
                </Text>
              </Flex>

              <Text
                fontFamily="body"
                fontSize="xs"
                fontWeight="bold"
                color="primaryDark"
                cursor="pointer"
                _hover={{ color: "primary" }}
              >
                Forgot Password?
              </Text>
            </Flex>

            {/* Log In Button */}
            <Box pt={2}>
              <CustomButton type="submit" variant="primary" rightElement="🍿">
                Log In
              </CustomButton>
            </Box>

            {/* Simulate Error State Toggle */}
            <Flex
              align="center"
              justify="center"
              gap={1.5}
              pt={1}
              color="neutralMuted"
              cursor="pointer"
              onClick={() => setShowVerifyAlert((prev) => !prev)}
              _hover={{ color: "neutral" }}
            >
              <FlaskConical size={14} color="currentColor" />
              <Text fontFamily="body" fontSize="xs" fontWeight="medium">
                Simulate Error State
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;

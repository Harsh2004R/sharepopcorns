// src/features/login/pages/Login.jsx
import React, { useState } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Mail, Lock, Ticket, ArrowRight, Clapperboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../../shared/components/CustomInput";
import { CustomButton } from "../../../shared/components/CustomButton";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import { useLoginMutation } from "../../../hooks/useAuthMutations.js";
import { useThrottledCallback } from "../../../hooks/usePerformance.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginUser, isPending } = useLoginMutation();

  const submitLogin = useThrottledCallback(() => {
    loginUser({
      email: email.trim().toLowerCase(),
      password,
    });
  }, 1500);

  const handleLogin = (e) => {
    e.preventDefault();
    if (isPending) return;
    submitLogin();
  };

  return (
    <Box minH="100vh" w="full" bg="white" px={4} py={6} fontFamily="body">
      <Flex direction="column" align="center" maxW="md" mx="auto">
        <Flex
          w="full"
          bg="neutralSoft"
          borderRadius="3xl"
          p={4}
          align="center"
          justify="space-between"
          gap={3}
          mb={5}
        >
          <Box flex={1}>
            <CustomBadge
              variant="secondary"
              px={2.5}
              py={0.5}
              fontSize="2xs"
              gap={1}
              mb={1}
            >
              <Ticket size={16} color="currentColor" />
              <Text fontFamily="body" fontSize="xs" fontWeight="bold">
                WELCOME BACK
              </Text>
            </CustomBadge>
            <Text
              fontFamily="body"
              fontSize="2xl"
              fontWeight="extrabold"
              color="neutral"
              lineHeight="short"
            >
              Grab Your Popcorn 🍿
            </Text>
            <Text fontFamily="body" fontSize="sm" color="neutralMuted" mt={0.5}>
              Log in to access your watchlist & playlists
            </Text>
          </Box>
        </Flex>

        <Box
          as="form"
          onSubmit={handleLogin}
          w="full"
          bg="white"
          borderRadius="3xl"
          px={6}
          py={6}
          border="1px solid"
          borderColor="neutralBorder"
        >
          <VStack gap={5} align="stretch">
            <CustomInput
              label="Email Address"
              required
              type="email"
              placeholder="you@example.com"
              LeftIcon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Box>
              <CustomInput
                label="Password"
                required
                type="password"
                placeholder="Enter your password"
                LeftIcon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Flex justify="flex-end" mt={2}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="bold"
                  color="primary"
                  cursor="pointer"
                  onClick={() => navigate("/auth/forget-password")}
                  _hover={{ color: "primaryDark" }}
                >
                  Forgot Password?
                </Text>
              </Flex>
            </Box>

            <Box pt={1}>
              <CustomButton
                type="submit"
                variant="primary"
                disabled={isPending}
                rightElement={
                  <ArrowRight
                    size={18}
                    color="currentColor"
                    strokeWidth={2.5}
                  />
                }
              >
                {isPending ? "Signing In..." : "Log In"}
              </CustomButton>
            </Box>
          </VStack>
        </Box>

        <VStack gap={3} mt={6}>
          <Text fontFamily="body" fontSize="xs" color="neutralMuted">
            New to SharePopcorns?{" "}
            <Text
              as="span"
              fontFamily="body"
              fontWeight="bold"
              color="primary"
              cursor="pointer"
              onClick={() => navigate("/auth/signup")}
              _hover={{ color: "primaryDark" }}
            >
              Create an Account
            </Text>
          </Text>
          <CustomBadge
            variant="date"
            textTransform="none"
            letterSpacing="normal"
            gap={1.5}
            px={3.5}
            py={1}
          >
            <Clapperboard size={12} color="currentColor" />
            <Text
              fontFamily="body"
              fontSize="2xs"
              fontWeight="semibold"
              color="neutral"
            >
              Session secured with dual tokens
            </Text>
          </CustomBadge>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Login;

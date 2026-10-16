import React, { useState } from "react";
import { Box, Flex, Text, Heading, VStack } from "@chakra-ui/react";
import {
  User,
  Mail,
  Lock,
  Heart,
  Drama,
  Ticket,
  ArrowRight,
  Check,
  Clapperboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../../shared/components/CustomInput"; // Adjust path as needed
import { CustomButton } from "../../../shared/components/CustomButton"; // Adjust path as needed
import { CustomBadge } from "../../../shared/components/CustomBadge"; // Adjust path as needed

const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle signup submission logic here
  };

  return (
    <Box minH="100vh" w="full" bg="white" px={4} py={6} fontFamily="body">
      <style>
        {`
          @keyframes bouncePopcorn {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            40% {
              transform: translateY(-14px) rotate(-15deg);
            }
            60% {
              transform: translateY(-7px) rotate(-15deg);
            }
          }
        `}
      </style>

      <Flex direction="column" align="center" maxW="md" mx="auto">
        {/* Top Hero Banner Card */}
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
          {/* Left: Yellow Drama Masks Circle */}
          <Flex
            w="52px"
            h="52px"
            bg="secondary"
            color="secondaryDark"
            borderRadius="full"
            align="center"
            justify="center"
            flexShrink={0}
            display={{ base: "none", md: "flex" }}
          >
            <Drama size={26} color="currentColor" strokeWidth={2} />
          </Flex>

          {/* Center: Ticket Badge & Heading */}
          <Box flex={1}>
            <CustomBadge
              variant="secondary"
              px={2.5}
              py={0.5}
              fontSize="2xs"
              gap={1}
              mb={1}
            >
              <Ticket size={18} color="currentColor" />
              <Text fontFamily="body" fontSize="sm" fontWeight="bold">
                TICKET #001
              </Text>
            </CustomBadge>

            <Text
              fontFamily="body"
              fontSize="2xl"
              fontWeight="extrabold"
              color="neutral"
              lineHeight="short"
            >
              Join SharePopcorns 🍿
            </Text>

            <Text fontFamily="body" fontSize="sm" color="neutralMuted" mt={0.5}>
              Start your cozy movie journal today
            </Text>
          </Box>

          {/* Right: Soft Pink Heart Circle */}
          <Flex
            w="38px"
            h="38px"
            bg="primaryDark/30"
            color="primaryDark"
            borderRadius="full"
            align="center"
            justify="center"
            flexShrink={0}
            animation="bouncePopcorn 2s infinite"
          >
            <Heart size={18} color="currentColor"  fill="currentColor" strokeWidth={2} />
          </Flex>
        </Flex>

        {/* Main White Form Card */}
        <Box
          as="form"
          onSubmit={handleSignUp}
          w="full"
          bg="white"
          borderRadius="3xl"
          px={6}
          py={6}
          border="1px solid"
          borderColor="neutralBorder"
          position="relative"
          overflow="hidden"
        >
          <VStack gap={5} align="stretch">
            {/* Full Name Input */}
            <CustomInput
              label="Full Name"
              required
              placeholder="e.g. Mia Jenkins"
              LeftIcon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* Email Address Input */}
            <CustomInput
              label="Email Address"
              required
              type="email"
              placeholder="you@example.com"
              LeftIcon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <CustomInput
              label="Password"
              required
              type="password"
              placeholder="Create password"
              LeftIcon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Terms of Service & Privacy Policy Checkbox */}
            <Flex
              align="flex-start"
              gap={3}
              pt={1}
              cursor="pointer"
              onClick={() => setAgreeTerms((prev) => !prev)}
              userSelect="none"
            >
              <Flex
                w="18px"
                h="18px"
                mt={0.5}
                borderRadius="sm"
                border="1.5px solid"
                borderColor={agreeTerms ? "primary" : "border.DEFAULT"}
                bg={agreeTerms ? "primary" : "white"}
                color="white"
                align="center"
                justify="center"
                flexShrink={0}
                transition="all 0.2s"
              >
                {agreeTerms && (
                  <Check size={12} color="currentColor" strokeWidth={3} />
                )}
              </Flex>

              <Text
                fontFamily="body"
                fontSize="xs"
                color="text"
                lineHeight="tall"
              >
                I agree to SharePopcorns's{" "}
                <Text
                  as="span"
                  fontFamily="body"
                  fontWeight="bold"
                  color="primary"
                  textDecoration="underline"
                >
                  Terms of Service
                </Text>{" "}
                &{" "}
                <Text
                  as="span"
                  fontFamily="body"
                  fontWeight="bold"
                  color="primary"
                  textDecoration="underline"
                >
                  Privacy Policy
                </Text>
              </Text>
            </Flex>

            {/* Create Account Submit Button */}
            <Box pt={2}>
              <CustomButton
                type="submit"
                variant="primary"
                rightElement={
                  <ArrowRight
                    size={18}
                    color="currentColor"
                    strokeWidth={2.5}
                  />
                }
              >
                Create Account
              </CustomButton>
            </Box>
          </VStack>
        </Box>

        {/* Bottom Footer Section */}
        <VStack gap={3} mt={6}>
          <Text fontFamily="body" fontSize="xs" color="neutralMuted">
            Already have a popcorn stash?{" "}
            <Text
              as="span"
              fontFamily="body"
              fontWeight="bold"
              color="primary"
              cursor="pointer"
              onClick={() => navigate("/auth/login")}
              _hover={{ color: "primaryDark" }}
            >
              Log In
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
              Cozy watchlist syncing ready
            </Text>
          </CustomBadge>
        </VStack>
      </Flex>
    </Box>
  );
};

export default SignUp;

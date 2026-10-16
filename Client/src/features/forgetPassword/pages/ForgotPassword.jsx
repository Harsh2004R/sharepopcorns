import React, { useState } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Mail, Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../../shared/components/CustomInput"; // Adjust path as needed
import { CustomButton } from "../../../shared/components/CustomButton"; // Adjust path as needed

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleResetSubmit = (e) => {
    e.preventDefault();
    console.log("Sending reset link to:", email);
  };

  return (
    <Box minH="100vh" w="full" bg="white" px={4} py={10} fontFamily="body">
      <Flex direction="column" align="center" maxW="md" mx="auto">
        <Box
          as="form"
          onSubmit={handleResetSubmit}
          w="full"
          bg="white"
          borderRadius="3xl"
          p={6}
          border="1px solid"
          borderColor="neutralBorder"
        >
          <VStack gap={5} align="stretch">
            {/* Account Email Input */}
            <Box w="full" fontFamily="body">
              <Flex justify="space-between" align="center" mb={2}>
                <Text
                  fontFamily="body"
                  fontSize="sm"
                  fontWeight="bold"
                  color="neutral"
                >
                  Your Account Email
                </Text>
                <Text fontFamily="body" fontSize="xs" color="neutralMuted">
                  Case-sensitive
                </Text>
              </Flex>

              <CustomInput
                type="email"
                placeholder="cinema-lover@popcorn.club"
                LeftIcon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            {/* Spam/Promotions Folder Notice */}
            <Flex
              bg="neutralSoft"
              borderRadius="xl"
              p={4}
              gap={3}
              align="flex-start"
            >
              <Box color="secondaryDark" mt={0.5} flexShrink={0}>
                <Info size={16} color="currentColor" />
              </Box>
              <Text
                fontFamily="body"
                fontSize="xs"
                color="text"
                lineHeight="tall"
              >
                Make sure to check your spam or promotions folder if you don't
                see the message within a couple of minutes.
              </Text>
            </Flex>

            {/* Send Reset Link Button */}
            <Box pt={1}>
              <CustomButton
                type="submit"
                variant="primary"
                fontFamily="body"
                rightElement="💌"
              >
                Send Reset Link
              </CustomButton>
            </Box>

            {/* Back to Login Footer Link */}
            <Flex
              align="center"
              justify="center"
              gap={2}
              pt={2}
              color="text"
              cursor="pointer"
              onClick={() => navigate("/auth/login")}
              _hover={{ color: "primary" }}
            >
              <ArrowLeft size={14} color="currentColor" />
              <Text fontFamily="body" fontSize="xs" fontWeight="semibold">
                Remembered your password? Back to Login
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ForgotPassword;

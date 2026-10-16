import React, { useState } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import {
  Lock,
  Eye,
  EyeOff,
  Check,
  Lightbulb,
  Ticket,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../../shared/components/CustomInput";
import { CustomButton } from "../../../shared/components/CustomButton"; // Adjust path as needed
const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Live password validation checks
  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const passedChecks = [hasMinLength, hasNumber, hasSpecialChar].filter(
    Boolean,
  ).length;

  const getStrengthMeta = () => {
    if (newPassword.length === 0)
      return { label: "", width: "10%", color: "secondary" };
    if (newPassword.length < 3)
      return { label: "MEDIUM", width: "40%", color: "secondary" };
    if (newPassword.length < 6)
      return { label: "GOOD", width: "60%", color: "secondary" };
    return { label: "STRONG", width: "100%", color: "primary" };
  };

  const strength = getStrengthMeta();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting password update...");
  };

  return (
    <Box minH="100vh" w="full" bg="white" px={4} py={10} fontFamily="body">
      <Flex direction="column" align="center" maxW="md" mx="auto">
        {/* Main White Form Card */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          w="full"
          bg="white"
          borderRadius="3xl"
          p={6}
          border="1px solid"
          borderColor="neutralBorder"
        >
          <VStack gap={5} align="stretch">
            {/* Header Title & Subtitle */}
            <Box>
              <Flex align="center" gap={2}>
                <Text
                  fontFamily="body"
                  fontSize="2xl"
                  fontWeight="extrabold"
                  color="neutral"
                  lineHeight="shorter"
                >
                  Reset Your Password
                </Text>
                <Text fontSize="2xl">🔐</Text>
              </Flex>
            </Box>

            {/* New Password Field */}
            <CustomInput
              label="New Password"
              type="password"
              placeholder="Enter new password"
              LeftIcon={Lock}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {/* Password Strength Card */}
            <Box bg="tertiarySoft" borderRadius="2xl" p={4}>
              {/* Strength Header */}
              <Flex justify="space-between" align="center" mb={2}>
                <Text
                  fontFamily="body"
                  fontSize="2xs"
                  fontWeight="bold"
                  color="neutral"
                >
                  Password Strength:
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="2xs"
                  fontWeight="bold"
                  color={strength.color}
                  letterSpacing="wider"
                >
                  {strength.label}
                </Text>
              </Flex>

              {/* Strength Progress Bar */}
              <Box
                w="full"
                h="4px"
                bg="neutralBorder"
                borderRadius="full"
                overflow="hidden"
                mb={3.5}
              >
                <Box
                  h="full"
                  w={strength.width}
                  bg={passedChecks > 0 ? strength.color : "primary"}
                  borderRadius="full"
                  transition="all 0.3s ease-out"
                />
              </Box>

              {/* Requirement Checklist */}
              <VStack gap={2} align="stretch">
                {[
                  { label: "At least 8 characters", valid: hasMinLength },
                  { label: "At least 1 number", valid: hasNumber },
                  {
                    label: "At least 1 special symbol (!@#$%^&*)",
                    valid: hasSpecialChar,
                  },
                ].map((item, index) => (
                  <Flex key={index} align="center" gap={2.5}>
                    <Flex
                      w="16px"
                      h="16px"
                      borderRadius="full"
                      border="1.5px solid"
                      borderColor={
                        item.valid ? "status.success" : "neutralMuted"
                      }
                      bg={item.valid ? "status.success" : "transparent"}
                      color="white"
                      align="center"
                      justify="center"
                      flexShrink={0}
                      transition="all 0.2s"
                    >
                      {item.valid && (
                        <Check size={10} color="currentColor" strokeWidth={3} />
                      )}
                    </Flex>
                    <Text
                      fontFamily="body"
                      fontSize="xs"
                      color={item.valid ? "neutral" : "text"}
                    >
                      {item.label}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>

            {/* Confirm New Password Field */}
            <CustomInput
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter password"
              LeftIcon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Tip Notice Box */}
            <Flex
              bg="tertiarySoft"
              borderRadius="xl"
              p={3.5}
              gap={3}
              align="center"
            >
              <Box color="secondaryDark" flexShrink={0}>
                <Lightbulb size={18} color="currentColor" />
              </Box>
              <Text
                fontFamily="body"
                fontSize="xs"
                color="text"
                lineHeight="tall"
              >
                Choose a unique password that you haven't used before for
                SharePopcorns.
              </Text>
            </Flex>

            {/* Submit Action Button */}
            <Box pt={1}>
              <CustomButton
                type="submit"
                variant="primary"
                fontFamily="body"
                leftElement={<Ticket size={16} color="currentColor" />}
                rightElement="✨"
              >
                Update Password & Log In
              </CustomButton>
            </Box>

            {/* Cancel and return to Login */}
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
                Cancel and return to Login
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ResetPassword;

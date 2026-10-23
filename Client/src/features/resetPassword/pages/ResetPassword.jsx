// src/features/resetPassword/pages/ResetPassword.jsx
import React, { useState } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Lock, Check, Lightbulb, Ticket, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CustomInput } from "../../../shared/components/CustomInput";
import { CustomButton } from "../../../shared/components/CustomButton";
import { useResetPasswordMutation } from "../../../hooks/useAuthMutations.js";
import { useThrottledCallback } from "../../../hooks/usePerformance.js";
import { toaster } from "../../../components/ui/toaster.jsx";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passedChecks = [hasMinLength, hasNumber, hasSpecialChar].filter(
    Boolean,
  ).length;

  const getStrengthMeta = () => {
    if (newPassword.length === 0)
      return { label: "", width: "10%", color: "secondary" };
    if (passedChecks === 1)
      return { label: "MEDIUM", width: "40%", color: "secondary" };
    if (passedChecks === 2)
      return { label: "GOOD", width: "70%", color: "secondary" };
    return { label: "STRONG", width: "100%", color: "primary" };
  };
  const strength = getStrengthMeta();

  const throttledReset = useThrottledCallback(() => {
    if (!token) {
      toaster.create({
        title: "Missing Reset Token",
        description: "Please open the exact reset link from your email.",
        type: "error",
      });
      return;
    }
    if (!hasMinLength) {
      toaster.create({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        type: "warning",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toaster.create({
        title: "Passwords Do Not Match",
        description: "Please make sure both password fields match.",
        type: "warning",
      });
      return;
    }

    resetPassword({ token, password: newPassword });
  }, 1500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPending) return;
    throttledReset();
  };

  return (
    <Box minH="100vh" w="full" bg="white" px={4} py={10} fontFamily="body">
      <Flex direction="column" align="center" maxW="md" mx="auto">
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

            <CustomInput
              label="New Password"
              type="password"
              required
              placeholder="Enter new password"
              LeftIcon={Lock}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Box bg="tertiarySoft" borderRadius="2xl" p={4}>
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

            <CustomInput
              label="Confirm New Password"
              type="password"
              required
              placeholder="Re-enter password"
              LeftIcon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

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

            <Box pt={1}>
              <CustomButton
                type="submit"
                variant="primary"
                fontFamily="body"
                disabled={isPending}
                leftElement={<Ticket size={16} color="currentColor" />}
                rightElement="✨"
              >
                {isPending ? "Updating..." : "Update Password & Log In"}
              </CustomButton>
            </Box>

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

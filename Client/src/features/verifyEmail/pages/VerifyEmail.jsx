import React, { useState, useRef } from "react";
import { Box, Flex, Text, Input, VStack } from "@chakra-ui/react";
import { Ticket, Pencil, Sparkles, Timer, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../shared/components/CustomButton"; // Adjust path as needed
import { CustomBadge } from "../../../shared/components/CustomBadge"; // Adjust path as needed

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    // Allow only single numeric digit
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    // Move focus to next box if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("Verifying OTP:", code);
  };

  return (
    <Box minH="100vh" w="full" bg="white" px={4} py={10} fontFamily="body">
      <Flex direction="column" align="center" maxW="md" mx="auto">
        <Box
          as="form"
          onSubmit={handleVerify}
          w="full"
          bg="white"
          borderRadius="3xl"
          px={6}
          pb={7}
          pt={8}
          border="1px solid"
          borderColor="neutralBorder"
          position="relative"
        >
          {/* Overlapping Top Ticket Badge */}
          <Flex
            position="absolute"
            top="-14px"
            left="50%"
            transform="translateX(-50%)"
          >
            <CustomBadge
              variant="secondary"
              px={3}
              py={1}
              fontSize="2xs"
              gap={1.5}
              fontFamily="body"
            >
              <Ticket size={12} color="currentColor" />
              <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                TICKET #0624
              </Text>
            </CustomBadge>
          </Flex>

          <VStack gap={6} align="stretch">
            {/* Target Email Address Box */}
            <Box bg="neutralSoft" borderRadius="2xl" p={4} textAlign="center">
              <Text fontFamily="body" fontSize="sm" color="text" mb={1}>
                We've sent a 6-digit verification code to
              </Text>
              <Flex align="center" justify="center" gap={2}>
                <Text
                  fontFamily="body"
                  fontSize="md"
                  fontWeight="bold"
                  color="primary"
                >
                  mia@example.com
                </Text>
                <Flex
                  w="22px"
                  h="22px"
                  bg="white"
                  color="neutralMuted"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  _hover={{ color: "neutral" }}
                >
                  <Pencil size={11} color="currentColor" />
                </Flex>
              </Flex>
            </Box>

            {/* 6-Digit OTP Input Section */}
            <Box>
              <Text
                fontFamily="body"
                fontSize="2xs"
                fontWeight="bold"
                letterSpacing="wider"
                color="neutralMuted"
                textAlign="center"
                mb={3}
              >
                ENTER VERIFICATION CODE
              </Text>

              <Flex justify="space-between" gap={2}>
                {otp.map((digit, index) => {
                  const isFocused = activeIndex === index;
                  return (
                    <Flex
                      key={index}
                      w="46px"
                      h="54px"
                      borderRadius="xl"
                      bg={isFocused ? "primarySoft" : "white"}
                      border={isFocused ? "1.5px solid" : "1px solid"}
                      borderColor={isFocused ? "primary" : "border.DEFAULT"}
                      align="center"
                      justify="center"
                      transition="all 0.2s"
                    >
                      <Input
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        placeholder="•"
                        onFocus={() => setActiveIndex(index)}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        inputMode="numeric"
                        variant=""
                        bg={isFocused ? "primarySoft" : "white"}
                        textAlign="center"
                        fontFamily="body"
                        fontSize="lg"
                        fontWeight="bold"
                        color="neutral"
                        p={0}
                        _placeholder={{
                          color: "fg.subtle",
                          fontSize: "lg",
                        }}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Box>

            {/* Verify Email Button */}
            <CustomButton
              type="submit"
              variant="primary"
              fontFamily="body"
              rightElement={<Sparkles size={16} color="currentColor" />}
            >
              Verify Email
            </CustomButton>

            {/* Expiration Countdown */}
            <Flex align="center" justify="center" gap={1.5}>
              <Box color="primary" display="inline-flex">
                <Timer size={15} color="currentColor" />
              </Box>
              <Text fontFamily="body" fontSize="xs" color="neutralMuted">
                Code expires in{" "}
                <Text
                  as="span"
                  fontFamily="body"
                  fontWeight="bold"
                  color="primary"
                >
                  02:57
                </Text>
              </Text>
            </Flex>

            {/* Security Notice Box */}
            <Flex
              bg="neutralSoft"
              borderRadius="2xl"
              p={3}
              align="center"
              gap={3}
            >
              <Flex
                w="32px"
                h="32px"
                bg="white"
                color="secondaryDark"
                borderRadius="full"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Lock size={14} color="currentColor" />
              </Flex>
              <Text
                fontFamily="body"
                fontSize="2xs"
                color="neutral"
                lineHeight="short"
              >
                💡 Never share your verification code with anyone. Popcorn crew
                will never ask for it.
              </Text>
            </Flex>

            {/* Back to Sign Up Link */}
            <Text
              fontFamily="body"
              fontSize="xs"
              fontWeight="bold"
              color="neutral"
              textAlign="center"
              cursor="pointer"
              onClick={() => navigate("/auth/signup")}
              _hover={{ color: "primary" }}
            >
              Back to Sign Up
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default VerifyEmail;

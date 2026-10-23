// src/features/verifyEmail/pages/VerifyEmail.jsx
import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Text, Input, VStack } from "@chakra-ui/react";
import { Ticket, Pencil, Sparkles, Timer, Lock, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomButton } from "../../../shared/components/CustomButton";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import {
  useVerifyEmailMutation,
  useResendVerificationMutation,
} from "../../../hooks/useAuthMutations.js";
import { useThrottledCallback } from "../../../hooks/usePerformance.js";
import { toaster } from "../../../components/ui/toaster.jsx";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const pendingEmail = useSelector(
    (state) => state.auth.pendingVerificationEmail,
  );

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes matching backend OTP validity
  const inputRefs = useRef([]);

  const { mutate: verifyEmail, isPending: isVerifying } =
    useVerifyEmailMutation();
  const { mutate: resendOtp, isPending: isResending } =
    useResendVerificationMutation();

  // Redirect back to signup if user lands here without an email in state
  useEffect(() => {
    if (!pendingEmail) {
      navigate("/auth/signup", { replace: true });
    }
  }, [pendingEmail, navigate]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Support pasting full 6-digit code at once
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedDigits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (pastedDigits.length === 0) return;

    const updatedOtp = [...otp];
    pastedDigits.forEach((digit, idx) => {
      updatedOtp[idx] = digit;
    });
    setOtp(updatedOtp);

    const focusIndex = Math.min(pastedDigits.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const throttledVerify = useThrottledCallback((code) => {
    verifyEmail({ email: pendingEmail, otp: code });
  }, 1500);

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      toaster.create({
        title: "Incomplete Code",
        description: "Please enter all 6 digits of your verification code.",
        type: "warning",
      });
      return;
    }
    throttledVerify(code);
  };

  const handleResend = useThrottledCallback(() => {
    if (!pendingEmail || isResending) return;
    resendOtp(pendingEmail, {
      onSuccess: () => {
        setOtp(["", "", "", "", "", ""]);
        setSecondsLeft(600);
        inputRefs.current[0]?.focus();
      },
    });
  }, 5000);

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
                  {pendingEmail || "your email"}
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
                  onClick={() => navigate("/auth/signup")}
                  _hover={{ color: "neutral" }}
                >
                  <Pencil size={11} color="currentColor" />
                </Flex>
              </Flex>
            </Box>

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
              <Flex justify="space-between" gap={2} onPaste={handlePaste}>
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
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Box>

            <CustomButton
              type="submit"
              variant="primary"
              fontFamily="body"
              disabled={isVerifying}
              rightElement={<Sparkles size={16} color="currentColor" />}
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </CustomButton>

            <Flex align="center" justify="space-between" px={1}>
              <Flex align="center" gap={1.5}>
                <Box color="primary" display="inline-flex">
                  <Timer size={15} color="currentColor" />
                </Box>
                <Text fontFamily="body" fontSize="xs" color="neutralMuted">
                  Expires in{" "}
                  <Text
                    as="span"
                    fontFamily="body"
                    fontWeight="bold"
                    color="primary"
                  >
                    {formatTime(secondsLeft)}
                  </Text>
                </Text>
              </Flex>

              <Flex
                align="center"
                gap={1}
                cursor={isResending ? "not-allowed" : "pointer"}
                color="primary"
                onClick={handleResend}
                _hover={{ color: "primaryDark" }}
              >
                <RefreshCw size={13} />
                <Text fontFamily="body" fontSize="xs" fontWeight="bold">
                  {isResending ? "Sending..." : "Resend Code"}
                </Text>
              </Flex>
            </Flex>

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

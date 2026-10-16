import React, { useState } from "react";
import { Box, Flex, Text, Input } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";

const CustomInput = ({
  label,
  required = false,
  rightLabel,
  LeftIcon,
  rightElement,
  type = "text",
  helperText,
  errorText,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <Box w="full" fontFamily="body">
      {/* Top Labels Row */}
      {(label || rightLabel) && (
        <Flex justify="space-between" align="center" mb={2}>
          {label && (
            <Text
              fontFamily="body"
              fontSize="sm"
              fontWeight="bold"
              color="neutral"
            >
              {label}{" "}
              {required && (
                <Text as="span" color="primary">
                  *
                </Text>
              )}
            </Text>
          )}
          {rightLabel && (
            <Text fontFamily="body" fontSize="xs" color="neutralMuted">
              {rightLabel}
            </Text>
          )}
        </Flex>
      )}

      {/* Input Field Wrapper */}
      <Flex
        bg="neutralSoft"
        px={4}
        py={3.5}
        borderRadius="2xl"
        align="center"
        gap={3}
        border="1px solid"
        borderColor={errorText ? "status.error" : "transparent"}
        transition="all 0.2s ease-out"
        _focusWithin={{
          borderColor: "brand.focusRing",
          bg: "white",
        }}
      >
        {/* Left Icon */}
        {LeftIcon && (
          <Box color="neutralMuted" display="inline-flex" flexShrink={0}>
            <LeftIcon size={18} color="currentColor" />
          </Box>
        )}

        {/* Chakra v3 Input */}
        <Input
          type={inputType}
          variant="unstyled"
          border="none"
          outline="none"
          bg="transparent"
          p={0}
          h="auto"
          flex={1}
          color="neutral"
          fontFamily="body"
          fontSize="sm"
          _placeholder={{ color: "fg.subtle" }}
          {...rest}
        />

        {/* Automatic Password Eye Toggle OR Custom Right Element */}
        {isPassword ? (
          <Box
            as="button"
            type="button"
            color="neutralMuted"
            cursor="pointer"
            display="inline-flex"
            onClick={() => setShowPassword((prev) => !prev)}
            _hover={{ color: "neutral" }}
          >
            {showPassword ? (
              <EyeOff size={18} color="currentColor" />
            ) : (
              <Eye size={18} color="currentColor" />
            )}
          </Box>
        ) : (
          rightElement && (
            <Box color="neutralMuted" display="inline-flex" flexShrink={0}>
              {rightElement}
            </Box>
          )
        )}
      </Flex>

      {/* Bottom Helper or Error Text */}
      {(errorText || helperText) && (
        <Text
          fontFamily="body"
          fontSize="xs"
          color={errorText ? "status.error" : "neutralMuted"}
          mt={1.5}
        >
          {errorText || helperText}
        </Text>
      )}
    </Box>
  );
};

export { CustomInput };

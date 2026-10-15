import React from "react";
import { Button, Text, Box } from "@chakra-ui/react";

// Mapped directly to your colorConfig theme tokens
const buttonVariants = {
  primary: {
    bg: "primary",
    color: "white",
    _hover: { bg: "primaryDark" },
  },
  secondary: {
    bg: "secondary",
    color: "neutral",
    _hover: { opacity: 0.9 },
  },
  neutral: {
    bg: "neutralSoft",
    color: "neutral",
    _hover: { bg: "border.muted", color: "white" },
  },
  outline: {
    bg: "white",
    color: "primary",
    border: "2px solid",
    borderColor: "primary",
    _hover: { bg: "primarySoft" },
  },
  destructive: {
    bg: "action.destructive",
    color: "white",
    _hover: { opacity: 0.9 },
  },
};

function CustomButton({
  children,
  variant = "primary",
  leftElement,
  rightElement,
  ...rest
}) {
  const activeVariant = buttonVariants[variant] || buttonVariants.primary;

  return (
    <Button
      w="full"
      py={6}
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      cursor="pointer"
      transition="all 0.2s ease-out"
      _active={{ transform: "scale(0.98)" }}
      _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
      {...activeVariant}
      {...rest} // Allows overriding width, margin, onClick, type="submit", disabled, etc.
    >
      {leftElement && (
        <Box as="span" display="inline-flex" alignItems="center">
          {leftElement}
        </Box>
      )}

      <Text as="span" fontWeight="bold" fontSize="md" color="inherit">
        {children}
      </Text>

      {rightElement && (
        <Box as="span" display="inline-flex" alignItems="center">
          {rightElement}
        </Box>
      )}
    </Button>
  );
}

export { CustomButton };

// <VStack gap={3} maxW="md" mx="auto" p={4}>
//       <CustomButton
//         variant="primary"
//         onClick={() => console.log("Saved!")}
//         leftElement={
//           <Flex bg="white" color="primary" borderRadius="full" p={0.5}>
//             <Star size={14} fill="currentColor" />
//           </Flex>
//         }
//         rightElement="✨"
//       >
//         Save to My Collection
//       </CustomButton>

//       <CustomButton variant="neutral" onClick={() => console.log("Cancelled")}>
//         Cancel
//       </CustomButton>

//       <CustomButton
//         variant="secondary"
//         rightElement={<ArrowRight size={18} strokeWidth={2.5} />}
//       >
//         Continue
//       </CustomButton>

//       <CustomButton
//         variant="destructive"
//         type="submit"
//         w="auto"
//         px={8}
//         leftElement={<Trash2 size={18} />}
//       >
//         Delete Entry
//       </CustomButton>
//     </VStack>

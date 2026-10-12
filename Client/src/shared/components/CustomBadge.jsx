import { Box } from "@chakra-ui/react";

// Mapping your specific variations to your theme tokens
const variantStyles = {
  primary: {
    bg: "primary",
    color: "white",
  },
  secondary: {
    bg: "secondary/90",
    color: "neutral",
  },
  success: {
    bg: "status.success",
    color: "white",
  },
  fail: {
    bg: "status.error",
    color: "white",
  },
  process: {
    bg: "status.warning/50",
    color: "white",
  },
  info: {
    bg: "status.info",
    color: "white",
  },
  ratings: {
    bg: "secondarySoft",
    color: "secondaryDark",
    fontWeight: "bold",
  },
  date: {
    bg: "neutralSoft",
    color: "neutralMuted",
    border: "1px solid",
    borderColor: "border.muted",
  },
  ticket: {
    bg: "white",
    color: "primary",
    border: "2px dashed",
    borderColor: "border.accent",
    borderRadius: "sm", // Tickets usually have sharper edges
  },
};

export const CustomBadge = ({
  variant = "primary",
  tilt,
  children,
  ...rest
}) => {
  // Determine rotation based on the tilt flag
  let transform = "rotate(0deg)";
  if (tilt === "left") transform = "rotate(-5deg)";
  if (tilt === "right") transform = "rotate(5deg)";

  // Fallback to primary if an invalid variant is passed
  const activeStyle = variantStyles[variant] || variantStyles.primary;

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      px={3}
      py={1}
      fontSize="xs"
      fontWeight="semibold"
      textTransform="uppercase"
      letterSpacing="wider"
      borderRadius="full"
      transform={transform}
      transition="transform 0.2s ease-in-out" // Smooth animation if tilt changes
      {...activeStyle}
      {...rest}
    >
      {children}
    </Box>
  );
};

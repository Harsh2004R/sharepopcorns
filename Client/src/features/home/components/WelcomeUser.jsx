import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Sparkles, Ticket, ArrowRight } from "lucide-react";

const WelcomeUser = () => {
  return (
    <Box w="full" maxW="lg" mx="auto" pt={6} pb={4}>
      {/* <style>
        {`
          @keyframes floatPopcorn {
            0% { transform: translateY(0px) rotate(-15deg); }
            50% { transform: translateY(-8px) rotate(-15deg); }
            100% { transform: translateY(0px) rotate(-15deg); }
          }
        `}
      </style> */}
      <style>
        {`
          @keyframes bouncePopcorn {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0px) rotate(-15deg);
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
      {/* Top Section: Greeting & Avatar */}
      <Flex justify="space-between" align="flex-start" mb={8} px={1}>
        {/* Left: Text Content */}
        <Box>
          <Text
            as="h1"
            fontSize="4xl"
            fontFamily={"body"}
            fontWeight="extrabold"
            color="neutral"
            lineHeight="1.2"
            letterSpacing="tight"
          >
            Welcome back,
            <br />
            Harsh
          </Text>
          <Text color="neutralMuted" mt={2} fontSize="md">
            Ready for tonight's cozy movie session?
          </Text>
        </Box>

        {/* Right: Avatar (No PRO badge) */}
        <Box position="relative" mt={1}>
          {/* Floating Popcorn Emoji */}
          <Text
            position="absolute"
            left="-20px"
            top="10px"
            fontSize="lg"
            transform="rotate(-15deg)"
            animation="bouncePopcorn 2s infinite"
            zIndex={2}
          >
            🍿
          </Text>

          {/* Avatar Circle */}
          <Flex
            w="70px"
            h="70px"
            bg="#FFE299" // Slightly lighter than secondary to match mockup
            borderRadius="full"
            align="center"
            justify="center"
            boxShadow="0 8px 20px rgba(255, 209, 102, 0.3)"
          >
            {/* Sparkles using dual-color to match the cute vector look */}
            <Sparkles
              size={32}
              color="#1E2238"
              fill="#FFD166"
              strokeWidth={1.5}
            />
          </Flex>
        </Box>
      </Flex>

      {/* Action Banner */}
      <Link to="/add">
        <Flex
          bg="secondary"
          borderRadius="3xl"
          p={3}
          align="center"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ transform: "scale(0.98)", opacity: 0.95 }}
          _active={{ transform: "scale(0.95)" }}
          boxShadow="0 4px 15px rgba(255, 209, 102, 0.2)"
        >
          {/* White Ticket Icon Container */}
          <Flex
            w="64px"
            h="64px"
            bg="white"
            borderRadius="2xl"
            align="center"
            justify="center"
            mr={4}
            flexShrink={0}
          >
            {/* secondaryDark (#8A6500) matches the dark brown/gold icon */}
            <Ticket size={28} color="secondaryDark" fill="secondaryDark" />
          </Flex>

          {/* Banner Text */}
          <Box flex={1}>
            <Text fontWeight="bold" color="#68543B" fontSize="md">
              + Log Movie or Popcorn ✨
            </Text>
            <Text color="#806B51" fontSize="sm" mt={0.5}>
              Add to your memory diary in seconds
            </Text>
          </Box>

          {/* Right Arrow */}
          <Box pr={2} color="#68543B">
            <ArrowRight size={24} strokeWidth={2.5} />
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};

export default WelcomeUser;

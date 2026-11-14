import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sparkles, Plus, ArrowRight } from "lucide-react";
import { useMoviesQuery } from "../../../hooks/useMovieQueries.js";

const WelcomeUser = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useMoviesQuery();

  const firstName = user?.name ? user.name.split(" ")[0] : "Cinephile";

  // Check total saved movies/series from the shared TanStack Query cache
  const totalSavedTitles =
    data?.pagination?.total ?? data?.movies?.length ?? 0;

  // Guard with !isLoading so existing users don't see a brief flash of the banner on cold load
  const isNewUser = !isLoading && totalSavedTitles === 0;

  return (
    <Box w="full" maxW="lg" mx="auto" pt={6} pb={4}>
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
      <Flex
        justify="space-between"
        align="flex-start"
        mb={isNewUser ? 8 : 3}
        px={1}
      >
        {/* Left: Text Content */}
        <Box>
          <Text
            as="h1"
            fontSize="4xl"
            fontFamily="body"
            fontWeight="extrabold"
            color="neutral"
            lineHeight="1.2"
            letterSpacing="tight"
            mr="10px"
          >
            {isNewUser ? "Welcome," : "Welcome back,"}
            <br />
            {firstName}
          </Text>
          <Text color="neutralMuted" mt={2} fontSize="md">
            {isNewUser
              ? "Let's log your very first movie memory!"
              : "Ready for tonight's cozy movie session?"}
          </Text>
        </Box>

        {/* Right: Avatar */}
        <Box
          position="relative"
          mt={1}
          cursor="pointer"
          onClick={() => navigate("/profile")}
        >
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
            bg="#FFE299"
            borderRadius="full"
            align="center"
            justify="center"
            overflow="hidden"
            boxShadow="0 8px 20px rgba(255, 209, 102, 0.3)"
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                w="full"
                h="full"
                objectFit="cover"
              />
            ) : (
              <Sparkles
                size={32}
                color="#1E2238"
                fill="#FFD166"
                strokeWidth={1.5}
              />
            )}
          </Flex>
        </Box>
      </Flex>

      {/* Onboarding Action Banner: Shown ONLY for new users with 0 movies */}
      {isNewUser && (
        <Link to="/add">
          <Flex
            bg="white"
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
              bg="primary"
              borderRadius="2xl"
              align="center"
              justify="center"
              mr={4}
              flexShrink={0}
            >
              <Plus size={38}  color="white"/>
            </Flex>

            {/* Banner Text */}
            <Box flex={1}>
              <Text fontWeight="bold" color="neutral" fontSize="md">
                + Add Movies / Series ❤
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
      )}
    </Box>
  );
};

export default WelcomeUser;
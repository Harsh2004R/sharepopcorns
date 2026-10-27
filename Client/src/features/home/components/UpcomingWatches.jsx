// src/features/home/components/UpcomingWatches.jsx
import React, { useMemo } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Clock, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx";
import { useMoviesQuery } from "../../../hooks/useMovieQueries.js";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop";

const formatRelativeDays = (dateStr) => {
  if (!dateStr) return "SOON";
  const target = new Date(dateStr);
  const diffDays = Math.ceil((target - new Date()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "TONIGHT";
  if (diffDays === 1) return "TOMORROW";
  return `IN ${diffDays} DAYS`;
};

const formatScheduleTime = (dateStr) => {
  if (!dateStr) return "Scheduled Watch";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const UpcomingWatches = () => {
  const navigate = useNavigate();
  const { data } = useMoviesQuery();

  const nextScheduled = useMemo(() => {
    const scheduled = (data?.movies || []).filter(
      (m) => m.status === "scheduled",
    );
    if (scheduled.length === 0) return null;
    return [...scheduled].sort(
      (a, b) =>
        new Date(a.scheduledDate || a.createdAt) -
        new Date(b.scheduledDate || b.createdAt),
    )[0];
  }, [data]);

  return (
    <Box w="full" maxW="lg" mx="auto" mb={8}>
      <Flex justify="space-between" align="center" mb={4} px={1}>
        <Flex gap={2} align="center">
          <Text fontSize="xl">📅</Text>
          <Text fontSize="xl" fontWeight="bold" color="neutral">
            Upcoming Watches
          </Text>
        </Flex>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="tertiary"
          cursor="pointer"
          onClick={() =>
            navigate("/my-collection", {
              state: { initialStatus: "scheduled" },
            })
          }
        >
          View Schedule
        </Text>
      </Flex>

      {!nextScheduled ? (
        <Flex
          bg="white"
          p={5}
          borderRadius="3xl"
          align="center"
          justify="space-between"
          border="1px dashed"
          borderColor="neutralBorder"
          cursor="pointer"
          onClick={() =>
            navigate("/add", { state: { defaultStatus: "Scheduled" } })
          }
        >
          <Box>
            <Text fontWeight="bold" fontSize="sm" color="neutral">
              No movie night scheduled yet 🍿
            </Text>
            <Text fontSize="xs" color="neutralMuted" mt={0.5}>
              Tap to plan your next cozy screening
            </Text>
          </Box>
          <Flex
            w="36px"
            h="36px"
            bg="secondary"
            color="secondaryDark"
            borderRadius="full"
            align="center"
            justify="center"
          >
            <Plus size={18} />
          </Flex>
        </Flex>
      ) : (
        <Box
          bg="white"
          p={4}
          borderRadius="3xl"
          position="relative"
          overflow="hidden"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.02)"
          cursor="pointer"
          onClick={() => navigate(`/movies/${nextScheduled._id}`)}
        >
          <Box position="absolute" top="15px" right="-15px" zIndex={2}>
            <CustomBadge
              variant="secondary"
              tilt="right"
              px={8}
              py={1}
              borderRadius="none"
              boxShadow="sm"
            >
              {formatRelativeDays(nextScheduled.scheduledDate)}
            </CustomBadge>
          </Box>

          <Flex gap={4}>
            <Box
              position="relative"
              w="110px"
              h="150px"
              borderRadius="2xl"
              p={1}
              bg="neutralSoft"
              flexShrink={0}
            >
              <Image
                src={nextScheduled.image || FALLBACK_POSTER}
                w="full"
                h="full"
                objectFit="cover"
                borderRadius="xl"
                alt={nextScheduled.title}
              />
              <Box position="absolute" bottom={2} left={2}>
                <CustomBadge
                  variant="ticket"
                  bg="white"
                  border="none"
                  color="neutral"
                  fontSize="2xs"
                  px={2.5}
                  py={0.5}
                  borderRadius="full"
                  textTransform="capitalize"
                  letterSpacing="normal"
                  boxShadow="sm"
                >
                  {nextScheduled.moodTags?.[0] || nextScheduled.type}
                </CustomBadge>
              </Box>
            </Box>

            <Flex direction="column" pt={2} pb={1} flex={1}>
              <Text
                fontWeight="bold"
                fontSize="lg"
                color="neutral"
                mb={1}
                pr={12}
              >
                {nextScheduled.title}
              </Text>

              <Flex gap={1.5} align="center" color="primary">
                <Clock size={16} strokeWidth={2.5} />
                <Text fontWeight="bold" fontSize="sm">
                  {formatScheduleTime(nextScheduled.scheduledDate)}
                </Text>
              </Flex>

              {nextScheduled.description && (
                <Text fontSize="xs" color="neutralMuted" mt={2} lineClamp={2}>
                  {nextScheduled.description}
                </Text>
              )}

              <Flex gap={2} mt="auto" pt={2}>
                <CustomBadge
                  variant="date"
                  bg="neutralSoft"
                  border="none"
                  gap={1.5}
                  textTransform="none"
                  borderRadius="full"
                  letterSpacing="normal"
                >
                  <Bell size={14} strokeWidth={2.5} color="#9296A8" /> Reminder
                  Set
                </CustomBadge>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default UpcomingWatches;

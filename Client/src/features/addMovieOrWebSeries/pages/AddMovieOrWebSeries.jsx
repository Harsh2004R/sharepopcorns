import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Input,
  Textarea,
  Image,
  DatePicker,
  Portal,
  Button,
} from "@chakra-ui/react";
import {
  X,
  Ticket,
  Clapperboard,
  Tv,
  Link as LinkIcon,
  Calendar,
  CheckCircle2,
  Bookmark,
  CalendarClock,
  Star,
  Lock,
  StarHalf, // Using for the 4.5 star look if needed
} from "lucide-react";
import { CustomBadge } from "../../../shared/components/CustomBadge.jsx";
import { CustomButton } from "../../../shared/components/CustomButton";
import { useNavigate } from "react-router-dom";

export default function AddMovieOrWebSeries() {
  // ==========================================
  // FORM STATES
  // ==========================================
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("Movie");
  const [posterUrl, setPosterUrl] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [watchStatus, setWatchStatus] = useState("Watched");
  const [watchDate, setWatchDate] = useState("");
  const [rating, setRating] = useState(9.5);
  const [selectedMoods, setSelectedMoods] = useState(["Cozy"]);
  const navigate = useNavigate();
  // Helper for mood stickers
  const moods = [
    { label: "Cozy", emoji: "✨", bg: "secondarySoft", color: "secondaryDark" },
    { label: "Tearjerker", emoji: "💧", bg: "primarySoft", color: "primary" },
    { label: "Date Night", emoji: "🕯️", bg: "tertiarySoft", color: "neutral" },
    { label: "Rewatch", emoji: "🔄", bg: "tertiarySoft", color: "neutral" },
    { label: "Indie Gem", emoji: "🍿", bg: "tertiarySoft", color: "neutral" },
  ];

  const toggleMood = (moodLabel) => {
    setSelectedMoods((prev) =>
      prev.includes(moodLabel)
        ? prev.filter((m) => m !== moodLabel)
        : [...prev, moodLabel],
    );
  };

  return (
    <Box w="full" maxW="lg" mx="auto" bg="white" minH="100vh" p={{base:5,md:6,lg:5}}>
      {/* ==========================================
          PART 1: HEADER & BASIC INFO
          ========================================== */}

      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb={4}>
        <Flex gap={3}>
          <Flex
            w="48px"
            h="48px"
            bg="secondarySoft"
            borderRadius="xl"
            align="center"
            justify="center"
          >
            <Ticket size={24} />
          </Flex>
          <Box>
            <Flex align="center" gap={2}>
              <Text fontSize="xl" fontWeight="bold" color="neutral">
                Log a Movie or Series
              </Text>
              <Text fontSize="xl">🍿</Text>
            </Flex>
            <Text fontSize="sm" color="neutralMuted">
              Add to your personal cinema memories
            </Text>
          </Box>
        </Flex>
        <Flex
          w="32px"
          h="32px"
          bg="neutralSoft"
          borderRadius="full"
          align="center"
          justify="center"
          cursor="pointer"
        >
          <X size={18} color="#73778D" />
        </Flex>
      </Flex>

      <Box borderBottom="2px dashed" borderColor="secondaryDark" mb={6} />

      <VStack gap={5} align="stretch" mb={8}>
        {/* Title Input */}
        <Box>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="sm" fontWeight="bold" color="neutral">
              Title{" "}
              <Text as="span" color="primary">
                *
              </Text>
            </Text>
            <Text fontSize="xs" color="neutralMuted">
              Mandatory
            </Text>
          </Flex>
          <Flex bg="neutralSoft" p={3} borderRadius="xl" align="center" gap={3}>
            <Clapperboard size={20} color="#73778D" />
            <Input
              bg="neutralSoft"
              variant="unstyled"
              placeholder="Movie / webseries title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              color="neutral"
              fontWeight="medium"
              fontSize="sm"
            />
          </Flex>
        </Box>

        {/* Format Type */}
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="neutral" mb={2}>
            Format Type
          </Text>
          <Flex bg="neutralSoft" p={1} borderRadius="xl" gap={1}>
            <Flex
              flex={1}
              py={2.5}
              bg={format === "Movie" ? "white" : "transparent"}
              color={format === "Movie" ? "primary" : "neutralMuted"}
              borderRadius="lg"
              align="center"
              justify="center"
              gap={2}
              cursor="pointer"
              boxShadow={format === "Movie" ? "xs" : "none"}
              onClick={() => setFormat("Movie")}
            >
              <Clapperboard size={18} />
              <Text fontWeight="bold" fontSize="sm">
                Movie
              </Text>
            </Flex>
            <Flex
              flex={1}
              py={2.5}
              bg={format === "Web Series" ? "white" : "transparent"}
              color={format === "Web Series" ? "primary" : "neutralMuted"}
              borderRadius="lg"
              align="center"
              justify="center"
              gap={2}
              cursor="pointer"
              boxShadow={format === "Web Series" ? "xs" : "none"}
              onClick={() => setFormat("Web Series")}
            >
              <Tv size={18} />
              <Text fontWeight="bold" fontSize="sm">
                Web Series
              </Text>
            </Flex>
          </Flex>
        </Box>

        {/* Poster Image URL */}
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="neutral" mb={2}>
            Poster Image URL
          </Text>
          <Flex gap={3} align="center">
            <Flex
              flex={1}
              bg="neutralSoft"
              p={3}
              borderRadius="xl"
              align="center"
              gap={3}
            >
              <LinkIcon size={18} color="#9296A8" />
              <Input
                variant="unstyled"
                bg="neutralSoft"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                color="neutral"
                fontSize="sm"
                placeholder="enter poster url..."
              />
            </Flex>
            <Image
              src={posterUrl}
              w="48px"
              h="48px"
              borderRadius="full"
              objectFit="cover"
            />
          </Flex>
          <Text fontSize="xs" color="neutralMuted" mt={1}>
            Paste direct image URL for poster art
          </Text>
        </Box>

        {/* Synopsis */}
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="neutral" mb={2}>
            Personal Synopsis & Memory
          </Text>
          <Box bg="neutralSoft" p={4} borderRadius="xl" position="relative">
            <Textarea
              placeholder="A magical coming-of-age journey filled with spirits, warmth, and nostalgia."
              variant="unstyled"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              color="neutral"
              fontSize="sm"
              bg="neutralSoft"
              rows={3}
              resize="none"
            />
            <Text
              position="absolute"
              bottom={3}
              right={4}
              fontSize="xs"
              color="neutralMuted"
            >
              {synopsis.length} / 280
            </Text>
          </Box>
        </Box>
      </VStack>

      {/* ==========================================
          PART 2: WATCH STATUS & RATING
          ========================================== */}

      <Box mb={8}>
        <Text fontSize="sm" fontWeight="bold" color="neutral" mb={3}>
          Watch Status
        </Text>

        {/* Status Toggle */}
        <Flex bg="white" p={1} gap={2} mb={4}>
          <Flex
            flex={1}
            direction="column"
            align="center"
            py={3}
            bg={watchStatus === "Watched" ? "primary" : "neutralSoft"}
            color={watchStatus === "Watched" ? "white" : "neutralMuted"}
            borderRadius="xl"
            cursor="pointer"
            onClick={() => setWatchStatus("Watched")}
          >
            <CheckCircle2 size={20} mb={1} />
            <Text fontSize="sm" fontWeight="bold">
              Watched
            </Text>
          </Flex>
          <Flex
            flex={1}
            direction="column"
            align="center"
            py={3}
            bg={watchStatus === "Wishlist" ? "primary" : "neutralSoft"}
            color={watchStatus === "Wishlist" ? "white" : "neutralMuted"}
            borderRadius="xl"
            cursor="pointer"
            onClick={() => setWatchStatus("Wishlist")}
          >
            <Bookmark size={20} mb={1} />
            <Text fontSize="sm" fontWeight="bold">
              Wishlist
            </Text>
          </Flex>
          <Flex
            flex={1}
            direction="column"
            align="center"
            py={3}
            bg={watchStatus === "Scheduled" ? "primary" : "neutralSoft"}
            color={watchStatus === "Scheduled" ? "white" : "neutralMuted"}
            borderRadius="xl"
            cursor="pointer"
            onClick={() => setWatchStatus("Scheduled")}
          >
            <CalendarClock size={20} mb={1} />
            <Text fontSize="sm" fontWeight="bold">
              Scheduled
            </Text>
          </Flex>
        </Flex>

        {/* Watched Details Card */}
        {watchStatus === "Watched" && (
          <Box bg="neutralSoft" borderRadius="2xl" p={5}>
            {/* Date Picker */}
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="sm" fontWeight="bold" color="neutral">
                When did you watch it?{" "}
                <Text as="span" color="primary">
                  *
                </Text>
              </Text>
            </Flex>
            <Flex
              // bg="white"
              justifyContent={"center"}
              borderRadius="xl"
              align="center"
              justify="space-between"
              mb={6}
            >
              <DatePicker.Root maxWidth="20rem">
                <DatePicker.Label>Select date</DatePicker.Label>
                <DatePicker.Control>
                  <DatePicker.Input color="neutralMuted" />
                  <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger
                      _hover={{ color: "grey", cursor: "pointer" }}
                    >
                      <Calendar size={16} />
                    </DatePicker.Trigger>
                  </DatePicker.IndicatorGroup>
                </DatePicker.Control>
                <Portal>
                  <DatePicker.Positioner>
                    <DatePicker.Content>
                      <DatePicker.View view="day">
                        <DatePicker.Header />
                        <DatePicker.DayTable />
                      </DatePicker.View>
                      <DatePicker.View view="month">
                        <DatePicker.Header />
                        <DatePicker.MonthTable />
                      </DatePicker.View>
                      <DatePicker.View view="year">
                        <DatePicker.Header />
                        <DatePicker.YearTable />
                      </DatePicker.View>
                    </DatePicker.Content>
                  </DatePicker.Positioner>
                </Portal>
              </DatePicker.Root>
            </Flex>

            {/* Rating */}
            <Flex justify="space-between" align="center" mb={3}>
              <Text fontSize="sm" fontWeight="bold" color="neutral">
                Personal Rating{" "}
                <Text as="span" color="primary">
                  *
                </Text>
              </Text>
              <Flex
                bg="secondary"
                px={3}
                py={1}
                borderRadius="full"
                align="center"
                gap={1.5}
              >
                <Text fontSize="xs">🍿</Text>
                <Text fontSize="xs" fontWeight="bold" color="neutral">
                  {rating.toFixed(1)} / 10
                </Text>
              </Flex>
            </Flex>

            {/* Rating Stars & Title */}
            <Flex justify="space-between" align="center" mb={5}>
              <Flex align="center" gap={2}>
                <Text fontSize="lg">🏆</Text>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="primary"
                  lineHeight="1.1"
                >
                  Masterpiece
                  <br />
                  Popcorn!
                </Text>
              </Flex>
              <Flex gap={1} color="secondary">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} size={20} fill="currentColor" />
                ))}
                {/* Simulated half/empty star for 9.5 */}
                <Star size={20} />
              </Flex>
            </Flex>

            {/* Pure HTML Range input styled to match the maroon slider perfectly */}
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              style={{
                width: "100%",
                accentColor: "#881938",
                height: "6px",
                borderRadius: "full",
                cursor: "pointer",
              }}
            />
            <Flex
              justify="space-between"
              mt={2}
              color="neutralMuted"
              fontSize="xs"
            >
              <Text>0 (Burnt)</Text>
              <Text>5.0</Text>
              <Text>10 (Golden Sweet)</Text>
            </Flex>

            <Flex align="flex-start" gap={2} mt={5}>
              <Lock size={14} color="#73778D" style={{ marginTop: "4px" }} />
              <Text fontSize="xs" fontStyle="italic" color="neutralMuted">
                Owner rating only — your authentic personal score
              </Text>
            </Flex>
          </Box>
        )}
      </Box>

      {/* ==========================================
          PART 3: MOOD STICKERS & SUBMIT
          ========================================== */}

      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="sm" fontWeight="bold" color="neutral">
            Cinema Mood Stickers
          </Text>
          <Text fontSize="xs" color="primary">
            Tap to tag
          </Text>
        </Flex>

        {/* Stickers Wrap */}
        <Flex wrap="wrap" gap={3} mb={6}>
          {moods.map((mood) => {
            const isSelected = selectedMoods.includes(mood.label);
            return (
              <Flex
                key={mood.label}
                bg={isSelected ? mood.bg : "white"}
                color={isSelected ? mood.color : "neutral"}
                border={isSelected ? "1px solid transparent" : "1px solid"}
                borderColor="border.muted"
                px={4}
                py={2}
                borderRadius="full"
                align="center"
                gap={2}
                cursor="pointer"
                onClick={() => toggleMood(mood.label)}
                transition="all 0.2s"
              >
                <Text fontSize="sm">{mood.emoji}</Text>
                <Text fontSize="sm" fontWeight={isSelected ? "bold" : "medium"}>
                  {mood.label}
                </Text>
              </Flex>
            );
          })}
        </Flex>

        <Box borderBottom="2px dashed" borderColor="secondaryDark" mb={6} />

        {/* Action Buttons */}
        <VStack gap={3}>
          <CustomButton
            variant="primary"
            onClick={() => console.log("Saved!")}
            leftElement={
              <Flex bg="white" color="primary" borderRadius="full" p={0.5}>
                <Star size={14} fill="currentColor" />
              </Flex>
            }
            rightElement="✨"
          >
            <Text fontWeight="bold" fontSize="md">
              Save to My Collection
            </Text>
          </CustomButton>

          <CustomButton
            onClick={() => {
              navigate("/");
            }}
            variant="neutral"
          >
            Cancel
          </CustomButton>
        </VStack>
      </Box>
      <Box w="100%" h="10vh"></Box>
    </Box>
  );
}

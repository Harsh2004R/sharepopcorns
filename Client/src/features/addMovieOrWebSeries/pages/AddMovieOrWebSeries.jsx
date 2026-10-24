import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Input,
  Textarea,
  Image,
  SimpleGrid,
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
  Sparkles,
  Info,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import { CustomButton } from "../../../shared/components/CustomButton";

export default function AddMovieOrWebSeries({ onSubmitMovie }) {
  const navigate = useNavigate();

  // ==========================================
  // FORM STATES (Mapped to Mongoose Schema)
  // ==========================================
  const [type, setType] = useState("Movie"); // MOVIE_TYPE_VALUES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Watched"); // MOVIE_STATUS_VALUES
  const [rating, setRating] = useState(9.0);
  const [watchedDate, setWatchedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [scheduledDate, setScheduledDate] = useState("");

  // Validation & UI states
  const [errors, setErrors] = useState({});
  const [selectedMoods, setSelectedMoods] = useState(["Cozy"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preset Mood tags to quickly enrich the description
  const moodTags = [
    { label: "Cozy", emoji: "✨", bg: "secondarySoft", color: "secondaryDark" },
    { label: "Tearjerker", emoji: "💧", bg: "primarySoft", color: "primary" },
    { label: "Date Night", emoji: "🕯️", bg: "tertiarySoft", color: "neutral" },
    { label: "Rewatch", emoji: "🔄", bg: "tertiarySoft", color: "neutral" },
    {
      label: "Indie Gem",
      emoji: "🍿",
      bg: "secondarySoft",
      color: "secondaryDark",
    },
  ];

  const handleMoodClick = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood.label)
        ? prev.filter((m) => m !== mood.label)
        : [...prev, mood.label],
    );

    // Contextually append to description if not already present
    if (!description.includes(mood.label)) {
      setDescription((prev) =>
        prev
          ? `${prev} • ${mood.emoji} ${mood.label}`
          : `${mood.emoji} ${mood.label}`,
      );
    }
  };

  const getScoreMeta = (val) => {
    if (val >= 9.0) return { title: "Masterpiece Popcorn!", emoji: "🏆" };
    if (val >= 7.5) return { title: "Great Watch!", emoji: "🍿" };
    if (val >= 5.0) return { title: "Decent Comfort Film", emoji: "☕" };
    return { title: "Burnt Kernel", emoji: "🥣" };
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Movie or Series title is required";
    }
    if (status === "Scheduled" && !scheduledDate) {
      newErrors.scheduledDate = "Please choose a planned watch date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Exact payload structured for movieService.createMovie
    const payload = {
      type,
      title: title.trim(),
      description: description.trim(),
      image: image.trim() || null,
      status,
      rating: status === "Watched" ? Number(rating) : null,
      watchedDate:
        status === "Watched"
          ? watchedDate
            ? new Date(watchedDate)
            : new Date()
          : null,
      scheduledDate:
        status === "Scheduled"
          ? scheduledDate
            ? new Date(scheduledDate)
            : null
          : null,
    };

    try {
      if (onSubmitMovie) {
        await onSubmitMovie(payload);
      } else {
        console.log("Submitting Movie Payload:", payload);
      }
      navigate(-1);
    } catch (err) {
      setErrors({ form: err.message || "Failed to save title" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      minH="100vh"
      w="full"
      bg="background"
      fontFamily="body"
      px={4}
      pt={4}
      pb={24}
    >
      <Box maxW="lg" mx="auto">
        {/* ========================================================
            1. TOP NAVIGATION HEADER
            ======================================================== */}
        <Flex justify="space-between" align="center" mb={4}>
          <Flex align="center" gap={3}>
            <Flex
              w="42px"
              h="42px"
              bg="secondary"
              borderRadius="2xl"
              align="center"
              justify="center"
              color="secondaryDark"
              boxShadow="0 4px 12px rgba(255, 209, 102, 0.3)"
            >
              <Ticket size={22} color="currentColor" />
            </Flex>
            <Box>
              <Flex align="center" gap={1.5}>
                <Text fontSize="2xl" fontWeight="extrabold" color="neutral">
                  Log Cinema Memory
                </Text>
                <Text fontSize="md">🍿</Text>
              </Flex>
              <Text fontFamily="body" fontSize="2xs" color="neutralMuted">
                Add to your permanent diary & shelves
              </Text>
            </Box>
          </Flex>

          <Flex
            w="34px"
            h="34px"
            bg="neutralSoft"
            borderRadius="full"
            align="center"
            justify="center"
            color="neutralMuted"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ bg: "neutralBorder", color: "neutral" }}
            onClick={() => navigate(-1)}
          >
            <X size={18} color="currentColor" />
          </Flex>
        </Flex>

        {/* Global Error Banner */}
        {errors.form && (
          <Box
            bg="primarySoft"
            color="primary"
            p={3}
            borderRadius="xl"
            mb={4}
            fontSize="xs"
            fontWeight="bold"
            border="1px solid"
            borderColor="status.error"
          >
            {errors.form}
          </Box>
        )}

        {/* ========================================================
            2. MAIN FORM CARD
            ======================================================== */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          borderRadius="3xl"
          p={5}
          pt={0}
          border="1px solid"
          borderColor="neutralBorder"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.02)"
          position="relative"
          overflow="hidden"
        >
          {/* Top Notch Brand Accent */}
          <Box
            w="80px"
            h="5px"
            bg="secondary"
            borderBottomRadius="md"
            mx="auto"
            mb={5}
          />

          <VStack gap={5} align="stretch">
            {/* FORMAT TYPE SELECTOR */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="neutral"
                >
                  Content Format
                </Text>
                <CustomBadge variant="ratings" fontSize="2xs" px={2} py={0.2}>
                  Required
                </CustomBadge>
              </Flex>

              <Flex bg="neutralSoft" p={1} borderRadius="2xl" gap={1}>
                <Flex
                  flex={1}
                  py={2.5}
                  bg={type === "Movie" ? "white" : "transparent"}
                  color={type === "Movie" ? "primary" : "neutralMuted"}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  gap={2}
                  cursor="pointer"
                  boxShadow={type === "Movie" ? "sm" : "none"}
                  onClick={() => setType("Movie")}
                  transition="all 0.2s"
                >
                  <Clapperboard size={16} />
                  <Text fontFamily="body" fontWeight="bold" fontSize="xs">
                    Movie
                  </Text>
                </Flex>

                <Flex
                  flex={1}
                  py={2.5}
                  bg={type === "Series" ? "white" : "transparent"}
                  color={type === "Series" ? "primary" : "neutralMuted"}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  gap={2}
                  cursor="pointer"
                  boxShadow={type === "Series" ? "sm" : "none"}
                  onClick={() => setType("Series")}
                  transition="all 0.2s"
                >
                  <Tv size={16} />
                  <Text fontFamily="body" fontWeight="bold" fontSize="xs">
                    Web Series
                  </Text>
                </Flex>
              </Flex>
            </Box>

            {/* TITLE FIELD */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="neutral"
                >
                  Title{" "}
                  <Text as="span" color="primary">
                    *
                  </Text>
                </Text>
                <Text fontFamily="body" fontSize="2xs" color="neutralMuted">
                  Case-sensitive match
                </Text>
              </Flex>

              <Flex
                bg="neutralSoft"
                px={3.5}
                py={3}
                borderRadius="2xl"
                align="center"
                gap={2.5}
                border="1px solid"
                borderColor={errors.title ? "status.error" : "transparent"}
                _focusWithin={{
                  borderColor: "brand.focusRing",
                  bg: "white",
                }}
              >
                <Box color="neutralMuted">
                  <Clapperboard size={18} color="currentColor" />
                </Box>
                <Input
                  variant="unstyled"
                  placeholder="e.g. Spirited Away, Past Lives..."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title)
                      setErrors((prev) => ({ ...prev, title: null }));
                  }}
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="medium"
                  color="neutral"
                  p={0}
                  bg="transparent"
                  h="auto"
                  _placeholder={{ color: "fg.subtle" }}
                />
              </Flex>
              {errors.title && (
                <Text
                  fontFamily="body"
                  fontSize="2xs"
                  color="status.error"
                  mt={1}
                >
                  {errors.title}
                </Text>
              )}
            </Box>

            {/* POSTER URL & INSTANT PREVIEW */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="neutral"
                >
                  Poster Artwork URL
                </Text>
                <CustomBadge variant="date" fontSize="2xs" px={2} py={0.2}>
                  Optional
                </CustomBadge>
              </Flex>

              <Flex gap={2.5} align="center">
                <Flex
                  flex={1}
                  bg="neutralSoft"
                  px={3.5}
                  py={2.5}
                  borderRadius="2xl"
                  align="center"
                  gap={2.5}
                  border="1px solid"
                  borderColor="transparent"
                  _focusWithin={{ borderColor: "brand.focusRing", bg: "white" }}
                >
                  <Box color="neutralMuted">
                    <LinkIcon size={16} color="currentColor" />
                  </Box>
                  <Input
                    variant="unstyled"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    fontFamily="body"
                    fontSize="xs"
                    color="neutral"
                     bg="transparent"
                    p={0}
                    h="auto"
                    _placeholder={{ color: "fg.subtle" }}
                  />
                </Flex>

                {/* Instant Dynamic Thumbnail */}
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="xl"
                  bg="neutralSoft"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="neutralBorder"
                  flexShrink={0}
                  position="relative"
                >
                  {image ? (
                    <Image
                      src={image}
                      alt="Preview"
                      w="full"
                      h="full"
                      objectFit="cover"
                      fallback={
                        <Flex
                          w="full"
                          h="full"
                          align="center"
                          justify="center"
                          color="neutralMuted"
                        >
                          <ImageIcon size={18} />
                        </Flex>
                      }
                    />
                  ) : (
                    <Flex
                      w="full"
                      h="full"
                      align="center"
                      justify="center"
                      color="neutralMuted"
                    >
                      <ImageIcon size={18} />
                    </Flex>
                  )}
                </Box>
              </Flex>
            </Box>

            {/* ========================================================
                3. WATCH STATUS SELECTION & CONDITIONAL FIELDS
                ======================================================== */}
            <Box pt={1}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="neutral"
                >
                  Watch Status{" "}
                  <Text as="span" color="primary">
                    *
                  </Text>
                </Text>
                {/* <Text fontFamily="body" fontSize="2xs" color="neutralMuted">
                  Controls diary rating & dates
                </Text> */}
              </Flex>

              <SimpleGrid columns={3} gap={2} mb={3}>
                {/* WATCHED */}
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py={2.5}
                  borderRadius="2xl"
                  cursor="pointer"
                  transition="all 0.2s"
                  bg={status === "Watched" ? "primary" : "neutralSoft"}
                  color={status === "Watched" ? "white" : "neutral"}
                  onClick={() => setStatus("Watched")}
                >
                  <CheckCircle2 size={16} />
                  <Text
                    fontFamily="body"
                    fontSize="2xs"
                    fontWeight="bold"
                    mt={1}
                  >
                    Watched
                  </Text>
                </Flex>

                {/* WISHLIST */}
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py={2.5}
                  borderRadius="2xl"
                  cursor="pointer"
                  transition="all 0.2s"
                  bg={status === "Wishlist" ? "primary" : "neutralSoft"}
                  color={status === "Wishlist" ? "white" : "neutral"}
                  onClick={() => setStatus("Wishlist")}
                >
                  <Bookmark size={16} />
                  <Text
                    fontFamily="body"
                    fontSize="2xs"
                    fontWeight="bold"
                    mt={1}
                  >
                    Wishlist
                  </Text>
                </Flex>

                {/* SCHEDULED */}
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py={2.5}
                  borderRadius="2xl"
                  cursor="pointer"
                  transition="all 0.2s"
                  bg={status === "Scheduled" ? "primary" : "neutralSoft"}
                  color={status === "Scheduled" ? "white" : "neutral"}
                  onClick={() => setStatus("Scheduled")}
                >
                  <CalendarClock size={16} />
                  <Text
                    fontFamily="body"
                    fontSize="2xs"
                    fontWeight="bold"
                    mt={1}
                  >
                    Scheduled
                  </Text>
                </Flex>
              </SimpleGrid>

              {/* A. CONDITIONAL: WATCHED CARD (Rating & Date) */}
              {status === "Watched" && (
                <Box
                  bg="neutralSoft"
                  borderRadius="2xl"
                  p={4}
                  border="1px solid"
                  borderColor="neutralBorder"
                  animation="fadeIn 0.2s ease-out"
                >
                  {/* Watched Date */}
                  <Box mb={4}>
                    <Flex justify="space-between" align="center" mb={1.5}>
                      <Text
                        fontFamily="body"
                        fontSize="xs"
                        fontWeight="semibold"
                        color="neutral"
                      >
                        When did you watch it?
                      </Text>
                      <Text
                        fontFamily="body"
                        fontSize="2xs"
                        color="neutralMuted"
                      >
                        Defaults to Today
                      </Text>
                    </Flex>
                    <Flex
                      bg="white"
                      px={3}
                      py={2}
                      borderRadius="xl"
                      align="center"
                      justify="space-between"
                      border="1px solid"
                      borderColor="neutralBorder"
                    >
                      <Input
                        type="date"
                        value={watchedDate}
                        bg="transparent"
                        onChange={(e) => setWatchedDate(e.target.value)}
                        variant="unstyled"
                        fontFamily="body"
                        fontSize="xs"
                        fontWeight="semibold"
                        color="neutral"
                        p={0}
                        h="auto"
                      />
                      <Calendar size={15} color="#73778D" />
                    </Flex>
                  </Box>

                  {/* Rating Slider & Score Pill */}
                  <Box>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text
                        fontFamily="body"
                        fontSize="xs"
                        fontWeight="semibold"
                        color="neutral"
                      >
                        Personal Popcorn Rating
                      </Text>
                      <CustomBadge variant="secondary" px={2.5} py={0.5}>
                        🍿 {Number(rating).toFixed(1)} / 10
                      </CustomBadge>
                    </Flex>

                    {/* Tier Title & Stars */}
                    <Flex justify="space-between" align="center" mb={3}>
                      <Flex align="center" gap={1.5}>
                        <Text fontSize="md">{getScoreMeta(rating).emoji}</Text>
                        <Text
                          fontFamily="body"
                          fontSize="xs"
                          fontWeight="black"
                          color="primary"
                        >
                          {getScoreMeta(rating).title}
                        </Text>
                      </Flex>
                      <Flex gap={0.5} color="secondary">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <Star
                            key={idx}
                            size={16}
                            fill={rating >= idx * 2 ? "currentColor" : "none"}
                            color="currentColor"
                          />
                        ))}
                      </Flex>
                    </Flex>

                    {/* Smooth Range Slider */}
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
                      mt={1.5}
                      fontSize="3xs"
                      color="neutralMuted"
                    >
                      <Text fontSize={"sm"}>0 (Burnt)</Text>
                      <Text fontSize={"sm"}>5.0</Text>
                      <Text fontSize={"sm"}>10 (Golden Sweet)</Text>
                    </Flex>

                    <Flex align="center" gap={1.5} mt={3} color="neutralMuted">
                      <Lock size={12} color="currentColor" />
                      <Text fontFamily="body" fontSize="2xs" fontStyle="italic">
                        Owner rating only — saved to your personal watch
                        statistics
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              )}

              {/* B. CONDITIONAL: SCHEDULED DATE PICKER */}
              {status === "Scheduled" && (
                <Box
                  bg="neutralSoft"
                  borderRadius="2xl"
                  p={4}
                  border="1px solid"
                  borderColor="neutralBorder"
                >
                  <Flex justify="space-between" align="center" mb={1.5}>
                    <Text
                      fontFamily="body"
                      fontSize="xs"
                      fontWeight="semibold"
                      color="neutral"
                    >
                      Target Watch Date{" "}
                      <Text as="span" color="primary">
                        *
                      </Text>
                    </Text>
                    <CustomBadge
                      variant="ratings"
                      fontSize="2xs"
                      px={2}
                      py={0.2}
                    >
                      Required
                    </CustomBadge>
                  </Flex>

                  <Flex
                    bg="white"
                    px={3}
                    py={2.5}
                    borderRadius="xl"
                    align="center"
                    justify="space-between"
                    border="1px solid"
                    borderColor={
                      errors.scheduledDate ? "status.error" : "neutralBorder"
                    }
                  >
                    <Input
                      type="datetime-local"
                      bg="transparent"
                      value={scheduledDate}
                      onChange={(e) => {
                        setScheduledDate(e.target.value);
                        if (errors.scheduledDate) {
                          setErrors((prev) => ({
                            ...prev,
                            scheduledDate: null,
                          }));
                        }
                      }}
                      variant="unstyled"
                      fontFamily="body"
                      fontSize="xs"
                      fontWeight="semibold"
                      color="neutral"
                      p={0}
                      h="auto"
                    />
                    <CalendarClock size={16} color="#73778D" />
                  </Flex>
                  {errors.scheduledDate && (
                    <Text
                      fontFamily="body"
                      fontSize="2xs"
                      color="status.error"
                      mt={1}
                    >
                      {errors.scheduledDate}
                    </Text>
                  )}
                </Box>
              )}

              {/* C. CONDITIONAL: WISHLIST INFO NOTE */}
              {status === "Wishlist" && (
                <Flex
                  bg="tertiarySoft"
                  borderRadius="2xl"
                  p={3.5}
                  align="center"
                  gap={2.5}
                >
                  <Box color="tertiary" flexShrink={0}>
                    <Info size={16} color="currentColor" />
                  </Box>
                  <Text
                    fontFamily="body"
                    fontSize="2xs"
                    color="neutral"
                    lineHeight="tall"
                  >
                    Saved to your wishlist! Ratings and watch dates will unlock
                    once marked as watched.
                  </Text>
                </Flex>
              )}
            </Box>

            {/* DESCRIPTION & CINEMA SYNOPSIS */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="neutral"
                >
                  Personal Synopsis & Memory
                </Text>
                <CustomBadge variant="date" fontSize="2xs" px={2} py={0.2}>
                  Optional
                </CustomBadge>
              </Flex>

              <Box
                bg="neutralSoft"
                p={3.5}
                borderRadius="2xl"
                position="relative"
                border="1px solid"
                borderColor="transparent"
                _focusWithin={{ borderColor: "brand.focusRing", bg: "white" }}
              >
                <Textarea
                  placeholder="The coziest comfort watch with tea and fluffy blankets..."
                  variant="unstyled"
                  bg='transparent'
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 280))}
                  fontFamily="body"
                  fontSize="xs"
                  color="neutral"
                  rows={3}
                  resize="none"
                  p={0}
                  _placeholder={{ color: "fg.subtle" }}
                />
                <Text
                  position="absolute"
                  bottom={2}
                  right={3}
                  fontFamily="body"
                  fontSize="4xs"
                  color="neutralMuted"
                >
                  {description.length} / 280
                </Text>
              </Box>
            </Box>

            {/* MOOD STICKER CHIPS */}
            <Box>
              <Flex justify="space-between" align="center" mb={2}>
                <Text
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="bold"
                  color="neutral"
                >
                  Cinema Mood Stickers
                </Text>
                <Text fontFamily="body" fontSize="2xs" color="primary">
                  Tap to add to notes
                </Text>
              </Flex>

              <Flex wrap="wrap" gap={2}>
                {moodTags.map((m) => {
                  const isSelected = selectedMoods.includes(m.label);
                  return (
                    <Flex
                      key={m.label}
                      bg={isSelected ? m.bg : "white"}
                      color={isSelected ? m.color : "neutral"}
                      border="1px solid"
                      borderColor={isSelected ? "transparent" : "neutralBorder"}
                      px={3}
                      py={1}
                      borderRadius="full"
                      align="center"
                      gap={1.5}
                      cursor="pointer"
                      onClick={() => handleMoodClick(m)}
                      transition="all 0.2s"
                      boxShadow={isSelected ? "xs" : "none"}
                    >
                      <Text fontSize="xs">{m.emoji}</Text>
                      <Text fontFamily="body" fontSize="2xs" fontWeight="bold">
                        {m.label}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>

            {/* ACTION BUTTONS */}
            <VStack gap={2.5} pt={2}>
              <CustomButton
                type="submit"
                variant="primary"
                fontFamily="body"
                disabled={isSubmitting}
                leftElement={<Sparkles size={16} color="currentColor" />}
                rightElement="✨"
              >
                {isSubmitting
                  ? "Saving to Collection..."
                  : "Save to My Collection"}
              </CustomButton>

              <CustomButton
                variant="neutral"
                fontFamily="body"
                onClick={() => navigate(-1)}
              >
                Cancel
              </CustomButton>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

// src/features/addMovieOrWebSeries/pages/AddMovieOrWebSeries.jsx
import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CustomBadge } from "../../../shared/components/CustomBadge";
import { CustomButton } from "../../../shared/components/CustomButton";
import {
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useMovieDetailQuery,
} from "../../../hooks/useMovieQueries.js";
import { useThrottledCallback } from "../../../hooks/usePerformance.js";

export default function AddMovieOrWebSeries() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: editMovieId } = useParams();
  const isEditMode = Boolean(editMovieId);

  const { data: existingMovie } = useMovieDetailQuery(editMovieId);
  const { mutate: createMovie, isPending: isCreating } =
    useCreateMovieMutation();
  const { mutate: updateMovie, isPending: isUpdating } =
    useUpdateMovieMutation();
  const isPending = isCreating || isUpdating;

  const [type, setType] = useState("movie"); // "movie" | "series"
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(
    (location.state?.defaultStatus || "watched").toLowerCase(),
  ); // "watched" | "wishlist" | "scheduled"
  const [rating, setRating] = useState(9.0);
  const [watchedDate, setWatchedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [scheduledDate, setScheduledDate] = useState("");
  const [customMood, setCustomMood] = useState("");
  const [moodError, setMoodError] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedMoods, setSelectedMoods] = useState(["Cozy"]);

  // Populate form when editing an existing movie
  useEffect(() => {
    if (isEditMode && existingMovie) {
      setType(existingMovie.type || "movie");
      setTitle(existingMovie.title || "");
      setDescription(existingMovie.description || "");
      setImage(existingMovie.image || "");
      setStatus(existingMovie.status || "watched");
      setRating(existingMovie.rating ?? 9.0);
      if (existingMovie.watchedDate) {
        setWatchedDate(
          new Date(existingMovie.watchedDate).toISOString().split("T")[0],
        );
      }
      if (existingMovie.scheduledDate) {
        setScheduledDate(
          new Date(existingMovie.scheduledDate).toISOString().slice(0, 16),
        );
      }
      if (existingMovie.moodTags?.length > 0) {
        setSelectedMoods(existingMovie.moodTags);
      }
    }
  }, [isEditMode, existingMovie]);

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
    {
      label: "Feel Good",
      emoji: "😊",
      bg: "secondarySoft",
      color: "secondaryDark",
    },
    { label: "Mind Blowing", emoji: "🤯", bg: "primarySoft", color: "primary" },
    { label: "Nostalgic", emoji: "🌅", bg: "tertiarySoft", color: "neutral" },
    { label: "Dark", emoji: "🌑", bg: "primarySoft", color: "primary" },
    {
      label: "Adventurous",
      emoji: "🚀",
      bg: "secondarySoft",
      color: "secondaryDark",
    },
    {
      label: "Thought Provoking",
      emoji: "💭",
      bg: "tertiarySoft",
      color: "neutral",
    },
    { label: "Heartwarming", emoji: "❤️", bg: "primarySoft", color: "primary" },
  ];

  const handleMoodClick = (mood) => {
    setMoodError("");
    setSelectedMoods((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.toLowerCase() === mood.label.toLowerCase(),
      );
      if (existingIndex !== -1) {
        if (prev.length === 1) {
          setMoodError("Please select at least one mood.");
          return prev;
        }
        return prev.filter((_, index) => index !== existingIndex);
      }
      if (prev.length >= 5) {
        setMoodError("You can select a maximum of 5 moods.");
        return prev;
      }
      return [...prev, mood.label];
    });
  };

  const handleAddCustomMood = () => {
    const newMood = customMood.trim();
    if (!newMood) {
      setMoodError("Please enter a mood.");
      return;
    }
    if (selectedMoods.some((m) => m.toLowerCase() === newMood.toLowerCase())) {
      setMoodError("This mood has already been selected.");
      return;
    }
    if (selectedMoods.length >= 5) {
      setMoodError("You can select a maximum of 5 moods.");
      return;
    }
    setSelectedMoods((prev) => [...prev, newMood]);
    setCustomMood("");
    setMoodError("");
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
    if (status === "scheduled" && !scheduledDate) {
      newErrors.scheduledDate = "Please choose a planned watch date";
    }
    if (selectedMoods.length < 1 || selectedMoods.length > 5) {
      newErrors.moodTags = "Please select between 1 and 5 moods.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitMoviePayload = useThrottledCallback(() => {
    const payload = {
      type: type.toLowerCase(), // Matches backend MOVIE_TYPE_VALUES ("movie" | "series")
      title: title.trim(),
      description: description.trim(),
      image: image.trim() || null,
      status: status.toLowerCase(), // Matches backend MOVIE_STATUS_VALUES
      rating: status === "watched" ? Number(rating) : null,
      moodTags: selectedMoods,
      watchedDate:
        status === "watched"
          ? watchedDate
            ? new Date(watchedDate).toISOString()
            : new Date().toISOString()
          : null,
      scheduledDate:
        status === "scheduled" && scheduledDate
          ? new Date(scheduledDate).toISOString()
          : null,
    };

    if (isEditMode) {
      updateMovie(
        { id: editMovieId, payload },
        {
          onSuccess: () =>
            navigate(`/movies/${editMovieId}`, { replace: true }),
        },
      );
    } else {
      createMovie(payload, {
        onSuccess: (res) => {
          const newId = res?.data?._id;
          navigate(newId ? `/movies/${newId}` : "/my-collection", {
            replace: true,
          });
        },
      });
    }
  }, 1500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPending || !validateForm()) return;
    submitMoviePayload();
  };

  return (
    <Box
      minH="100vh"
      w="full"
      bg="background"
      fontFamily="body"
      px={4}
      pt={4}
      pb={16}
    >
      <Box maxW="lg" mx="auto">
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
                <Text fontSize="xs" fontWeight="semibold" color="neutral">
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
                  bg={type === "movie" ? "white" : "transparent"}
                  color={type === "movie" ? "primary" : "neutralMuted"}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  gap={2}
                  cursor="pointer"
                  boxShadow={type === "movie" ? "sm" : "none"}
                  onClick={() => setType("movie")}
                  transition="all 0.2s"
                >
                  <Clapperboard size={16} />
                  <Text fontWeight="bold" fontSize="xs">
                    Movie
                  </Text>
                </Flex>

                <Flex
                  flex={1}
                  py={2.5}
                  bg={type === "series" ? "white" : "transparent"}
                  color={type === "series" ? "primary" : "neutralMuted"}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  gap={2}
                  cursor="pointer"
                  boxShadow={type === "series" ? "sm" : "none"}
                  onClick={() => setType("series")}
                  transition="all 0.2s"
                >
                  <Tv size={16} />
                  <Text fontWeight="bold" fontSize="xs">
                    Web Series
                  </Text>
                </Flex>
              </Flex>
            </Box>

            {/* TITLE FIELD */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text fontSize="xs" fontWeight="semibold" color="neutral">
                  Title{" "}
                  <Text as="span" color="primary">
                    *
                  </Text>
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
                  fontSize="xs"
                  fontWeight="medium"
                  color="neutral"
                  p={0}
                  bg="transparent"
                  h="auto"
                />
              </Flex>
              {errors.title && (
                <Text fontSize="2xs" color="status.error" mt={1}>
                  {errors.title}
                </Text>
              )}
            </Box>

            {/* POSTER URL & INSTANT PREVIEW */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text fontSize="xs" fontWeight="semibold" color="neutral">
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
                >
                  <Box color="neutralMuted">
                    <LinkIcon size={16} color="currentColor" />
                  </Box>
                  <Input
                    variant="unstyled"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    fontSize="xs"
                    color="neutral"
                    bg="transparent"
                    p={0}
                    h="auto"
                  />
                </Flex>

                <Box
                  w="44px"
                  h="44px"
                  borderRadius="xl"
                  bg="neutralSoft"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="neutralBorder"
                  flexShrink={0}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt="Preview"
                      w="full"
                      h="full"
                      objectFit="cover"
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

            {/* WATCH STATUS SELECTION */}
            <Box pt={1}>
              <Text fontSize="xs" fontWeight="semibold" color="neutral" mb={2}>
                Watch Status{" "}
                <Text as="span" color="primary">
                  *
                </Text>
              </Text>

              <SimpleGrid columns={3} gap={2} mb={3}>
                {[
                  { id: "watched", label: "Watched", Icon: CheckCircle2 },
                  { id: "wishlist", label: "Wishlist", Icon: Bookmark },
                  { id: "scheduled", label: "Scheduled", Icon: CalendarClock },
                ].map(({ id, label, Icon }) => (
                  <Flex
                    key={id}
                    direction="column"
                    align="center"
                    justify="center"
                    py={2.5}
                    borderRadius="2xl"
                    cursor="pointer"
                    transition="all 0.2s"
                    bg={status === id ? "primary" : "neutralSoft"}
                    color={status === id ? "white" : "neutral"}
                    onClick={() => setStatus(id)}
                  >
                    <Icon size={16} />
                    <Text fontSize="2xs" fontWeight="bold" mt={1}>
                      {label}
                    </Text>
                  </Flex>
                ))}
              </SimpleGrid>

              {status === "watched" && (
                <Box
                  bg="neutralSoft"
                  borderRadius="2xl"
                  p={4}
                  border="1px solid"
                  borderColor="neutralBorder"
                >
                  <Box mb={4}>
                    <Flex justify="space-between" align="center" mb={1.5}>
                      <Text fontSize="xs" fontWeight="semibold" color="neutral">
                        When did you watch it?
                      </Text>
                      <Text fontSize="2xs" color="neutralMuted">
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
                        fontSize="xs"
                        fontWeight="semibold"
                        color="neutral"
                        p={0}
                        h="auto"
                      />
                      <Calendar size={15} color="#73778D" />
                    </Flex>
                  </Box>

                  <Box>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text fontSize="xs" fontWeight="semibold" color="neutral">
                        Personal Popcorn Rating
                      </Text>
                      <CustomBadge variant="secondary" px={2.5} py={0.5}>
                        🍿 {Number(rating).toFixed(1)} / 10
                      </CustomBadge>
                    </Flex>

                    <Flex justify="space-between" align="center" mb={3}>
                      <Flex align="center" gap={1.5}>
                        <Text fontSize="md">{getScoreMeta(rating).emoji}</Text>
                        <Text fontSize="xs" fontWeight="black" color="primary">
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

                    <Flex align="center" gap={1.5} mt={3} color="neutralMuted">
                      <Lock size={12} color="currentColor" />
                      <Text fontSize="2xs" fontStyle="italic">
                        Owner rating only — saved to your personal watch
                        statistics
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              )}

              {status === "scheduled" && (
                <Box
                  bg="neutralSoft"
                  borderRadius="2xl"
                  p={4}
                  border="1px solid"
                  borderColor="neutralBorder"
                >
                  <Flex justify="space-between" align="center" mb={1.5}>
                    <Text fontSize="xs" fontWeight="semibold" color="neutral">
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
                      fontSize="xs"
                      fontWeight="semibold"
                      color="neutral"
                      p={0}
                      h="auto"
                    />
                    <CalendarClock size={16} color="#73778D" />
                  </Flex>
                  {errors.scheduledDate && (
                    <Text fontSize="2xs" color="status.error" mt={1}>
                      {errors.scheduledDate}
                    </Text>
                  )}
                </Box>
              )}

              {status === "wishlist" && (
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
                  <Text fontSize="2xs" color="neutral" lineHeight="tall">
                    Saved to your wishlist! Ratings and watch dates will unlock
                    once marked as watched.
                  </Text>
                </Flex>
              )}
            </Box>

            {/* DESCRIPTION */}
            <Box>
              <Flex justify="space-between" align="center" mb={1.5}>
                <Text fontSize="xs" fontWeight="semibold" color="neutral">
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
              >
                <Textarea
                  placeholder="The coziest comfort watch with tea and fluffy blankets..."
                  variant="unstyled"
                  bg="transparent"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 280))}
                  fontSize="xs"
                  color="neutral"
                  rows={3}
                  resize="none"
                  p={0}
                />
                <Text
                  position="absolute"
                  bottom={2}
                  right={3}
                  fontSize="2xs"
                  color={description.length >= 280 ? "primary" : "neutralMuted"}
                >
                  {description.length} / 280
                </Text>
              </Box>
            </Box>

            {/* CINEMA MOOD STICKERS */}
            <Box>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="xs" fontWeight="bold" color="neutral">
                  Cinema Mood Stickers
                </Text>
                <Text fontSize="2xs" color="primary">
                  {selectedMoods.length}/5 selected
                </Text>
              </Flex>

              <Flex wrap="wrap" gap={2}>
                {moodTags.map((m) => {
                  const isSelected = selectedMoods.some(
                    (mood) => mood.toLowerCase() === m.label.toLowerCase(),
                  );
                  return (
                    <Flex
                      key={m.label}
                      bg={isSelected ? m.bg : "white"}
                      color={isSelected ? m.color : "neutral"}
                      border="1px solid"
                      borderColor={isSelected ? "transparent" : "neutralBorder"}
                      px={3}
                      py={1.5}
                      borderRadius="full"
                      align="center"
                      gap={1.5}
                      cursor="pointer"
                      onClick={() => handleMoodClick(m)}
                      transition="all 0.2s"
                      opacity={
                        !isSelected && selectedMoods.length >= 5 ? 0.5 : 1
                      }
                    >
                      <Text fontSize="xs">{m.emoji}</Text>
                      <Text fontSize="2xs" fontWeight="bold">
                        {m.label}
                      </Text>
                      {isSelected && <CheckCircle2 size={12} />}
                    </Flex>
                  );
                })}
              </Flex>

              <Box mt={4}>
                <Flex gap={2}>
                  <Input
                    value={customMood}
                    onChange={(e) => {
                      setCustomMood(e.target.value);
                      setMoodError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomMood();
                      }
                    }}
                    placeholder="Add custom mood (e.g. Rainy Day)..."
                    bg="neutralSoft"
                    border="1px solid"
                    borderColor="neutralBorder"
                    borderRadius="xl"
                    fontSize="xs"
                    disabled={selectedMoods.length >= 5}
                    maxLength={40}
                  />
                  <CustomButton
                    type="button"
                    variant="primary"
                    w="auto"
                    px={4}
                    disabled={selectedMoods.length >= 5 || !customMood.trim()}
                    onClick={handleAddCustomMood}
                  >
                    Add
                  </CustomButton>
                </Flex>
              </Box>

              {selectedMoods.length > 0 && (
                <Flex wrap="wrap" gap={2} mt={3}>
                  {selectedMoods.map((mood) => (
                    <Flex
                      key={mood}
                      align="center"
                      gap={1.5}
                      px={2.5}
                      py={1}
                      borderRadius="full"
                      bg="tertiarySoft"
                      color="neutral"
                      fontSize="2xs"
                    >
                      <Text fontWeight="semibold">{mood}</Text>
                      {selectedMoods.length > 1 && (
                        <Box
                          as="span"
                          cursor="pointer"
                          onClick={() =>
                            setSelectedMoods((prev) =>
                              prev.filter((item) => item !== mood),
                            )
                          }
                        >
                          <X size={12} />
                        </Box>
                      )}
                    </Flex>
                  ))}
                </Flex>
              )}

              {(moodError || errors.moodTags) && (
                <Text fontSize="2xs" color="status.error" mt={2}>
                  {moodError || errors.moodTags}
                </Text>
              )}
            </Box>

            <VStack gap={2.5} pt={2}>
              <CustomButton
                type="submit"
                variant="primary"
                disabled={isPending}
                leftElement={<Sparkles size={16} color="currentColor" />}
                rightElement="✨"
              >
                {isPending
                  ? "Saving..."
                  : isEditMode
                    ? "Update Cinema Memory"
                    : "Save to My Collection"}
              </CustomButton>

              <CustomButton variant="neutral" onClick={() => navigate(-1)}>
                Cancel
              </CustomButton>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

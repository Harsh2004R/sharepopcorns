// src/hooks/useMovieQueries.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { movieApi } from "../api/movie.api.js";
import { PLAYLIST_QUERY_KEYS } from "./usePlaylistQueries.js";
import { toaster } from "../components/ui/toaster.jsx";

export const MOVIE_QUERY_KEYS = {
  all: ["movies"],
  list: (filters = { limit: 100, page: 1 }) => ["movies", "list", filters],
  detail: (id) => ["movies", "detail", id],
};

const getErrorMessage = (error, fallback = "Operation failed") =>
  error?.response?.data?.message || error?.message || fallback;

/**
 * Fetch user's movie collection (Cached for 2 minutes, kept in memory for 15 minutes)
 */
export const useMoviesQuery = (params = { limit: 100, page: 1 }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.list(params),
    queryFn: () => movieApi.getMovies(params),
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // 2 minutes fresh: switching Bottombar tabs = 0 API calls
    gcTime: 15 * 60 * 1000,
  });
};

/**
 * Fetch single movie by ID with instant zero-latency initialData from collection cache
 */
export const useMovieDetailQuery = (movieId) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.detail(movieId),
    queryFn: () => movieApi.getMovieById(movieId),
    enabled: Boolean(movieId) && isAuthenticated,
    initialData: () => {
      // Pull movie directly from the cached collection list if already loaded!
      const cachedLists = queryClient.getQueriesData({
        queryKey: ["movies", "list"],
      });
      for (const [, listData] of cachedLists) {
        const found = listData?.movies?.find((m) => m._id === movieId);
        if (found) return found;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useCreateMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieApi.createMovie,
    onSuccess: (response) => {
      const createdMovie = response.data;
      // Pre-seed detail cache
      if (createdMovie?._id) {
        queryClient.setQueryData(
          MOVIE_QUERY_KEYS.detail(createdMovie._id),
          createdMovie,
        );
      }
      queryClient.invalidateQueries({ queryKey: MOVIE_QUERY_KEYS.all });
      toaster.create({
        title: "Saved to Collection! 🍿",
        description: response.message,
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Could Not Save Title",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

export const useUpdateMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieApi.updateMovie,
    onSuccess: (response, variables) => {
      const updatedMovie = response.data;
      queryClient.setQueryData(
        MOVIE_QUERY_KEYS.detail(variables.id),
        updatedMovie,
      );
      queryClient.invalidateQueries({ queryKey: MOVIE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEYS.all });

      toaster.create({
        title: "Cinema Memory Updated ✨",
        description: response.message,
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Update Failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

export const useDeleteMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieApi.deleteMovie,
    onSuccess: (_, movieId) => {
      queryClient.removeQueries({ queryKey: MOVIE_QUERY_KEYS.detail(movieId) });
      queryClient.invalidateQueries({ queryKey: MOVIE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEYS.all });

      toaster.create({
        title: "Removed from Collection",
        description:
          "The title was removed from your collection and playlists.",
        type: "info",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Delete Failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

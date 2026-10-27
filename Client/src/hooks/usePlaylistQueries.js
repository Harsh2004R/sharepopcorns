// src/hooks/usePlaylistQueries.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { playlistApi } from "../api/playlist.api.js";
import { toaster } from "../components/ui/toaster.jsx";

export const PLAYLIST_QUERY_KEYS = {
  all: ["playlists"],
  userList: (userId) => ["playlists", "user", userId],
  detail: (playlistId) => ["playlists", "detail", playlistId],
  yearly: (year) => ["playlists", "yearly", year],
};

const getErrorMessage = (error, fallback = "Playlist action failed") =>
  error?.response?.data?.message || error?.message || fallback;

export const useUserPlaylistsQuery = (targetUserId) => {
  const { user } = useSelector((state) => state.auth);
  const resolvedUserId = targetUserId || user?._id;

  return useQuery({
    queryKey: PLAYLIST_QUERY_KEYS.userList(resolvedUserId),
    queryFn: () => playlistApi.getUserPlaylists(resolvedUserId),
    enabled: Boolean(resolvedUserId),
    staleTime: 2 * 60 * 1000, // 2 minutes fresh
    gcTime: 15 * 60 * 1000,
  });
};

export const usePlaylistDetailQuery = (playlistId) => {
  return useQuery({
    queryKey: PLAYLIST_QUERY_KEYS.detail(playlistId),
    queryFn: () => playlistApi.getPlaylistById(playlistId),
    enabled: Boolean(playlistId),
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useCreatePlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playlistApi.createPlaylist,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEYS.all });
      toaster.create({
        title: "Playlist Created! 🎞️",
        description: response.message,
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Could Not Create Playlist",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

export const useAddMovieToPlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playlistApi.addMovieToPlaylist,
    onSuccess: (response, variables) => {
      queryClient.setQueryData(
        PLAYLIST_QUERY_KEYS.detail(variables.playlistId),
        response.data,
      );
      queryClient.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEYS.all });
      toaster.create({
        title: "Added to Playlist! ✨",
        description: response.message,
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Could Not Add Movie",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

export const useRemoveMovieFromPlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playlistApi.removeMovieFromPlaylist,
    onSuccess: (response, variables) => {
      queryClient.setQueryData(
        PLAYLIST_QUERY_KEYS.detail(variables.playlistId),
        response.data,
      );
      queryClient.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEYS.all });
      toaster.create({
        title: "Removed from Playlist",
        description: response.message,
        type: "info",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Could Not Remove Movie",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

// src/api/playlist.api.js
import { apiClient } from "./axiosInstance.js";

export const playlistApi = {
  createPlaylist: async (payload) => {
    // payload: { name, description, isPublic }
    const { data } = await apiClient.post("/playlists", payload);
    return data;
  },
  getUserPlaylists: async (userId) => {
    const { data } = await apiClient.get(`/playlists/user/${userId}`);
    return data.data;
  },
  getPlaylistById: async (playlistId) => {
    const { data } = await apiClient.get(`/playlists/${playlistId}`);
    return data.data;
  },
  getYearlyPlaylist: async (year) => {
    const { data } = await apiClient.get(`/playlists/yearly/${year}`);
    return data.data;
  },
  addMovieToPlaylist: async ({ playlistId, movieId }) => {
    const { data } = await apiClient.post(`/playlists/${playlistId}/movies`, {
      movieId,
    });
    return data;
  },
  removeMovieFromPlaylist: async ({ playlistId, movieId }) => {
    const { data } = await apiClient.delete(
      `/playlists/${playlistId}/movies/${movieId}`,
    );
    return data;
  },
};

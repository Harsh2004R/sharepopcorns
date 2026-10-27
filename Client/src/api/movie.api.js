// src/api/movie.api.js
import { apiClient } from "./axiosInstance.js";

export const movieApi = {
  getMovies: async (params = { limit: 100, page: 1 }) => {
    const { data } = await apiClient.get("/movies", { params });
    return data.data; // { movies: [...], pagination: {...} }
  },
  getMovieById: async (id) => {
    const { data } = await apiClient.get(`/movies/${id}`);
    return data.data;
  },
  createMovie: async (payload) => {
    const { data } = await apiClient.post("/movies", payload);
    return data;
  },
  updateMovie: async ({ id, payload }) => {
    const { data } = await apiClient.patch(`/movies/${id}`, payload);
    return data;
  },
  deleteMovie: async (id) => {
    const { data } = await apiClient.delete(`/movies/${id}`);
    return data;
  },
};

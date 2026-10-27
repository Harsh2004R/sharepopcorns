// Auth & user API functions
// src/api/auth.api.js
import { apiClient } from "./axiosInstance.js";

export const authApi = {
  register: async (payload) => {
    // payload: { name, email, password }
    const { data } = await apiClient.post("/auth/register", payload);
    return data;
  },
  verifyEmail: async (payload) => {
    // payload: { email, otp }
    const { data } = await apiClient.post("/auth/verify-email", payload);
    return data;
  },
  resendVerification: async (email) => {
    const { data } = await apiClient.post("/auth/resend-verification", {
      email,
    });
    return data;
  },
  login: async (payload) => {
    // payload: { email, password }
    const { data } = await apiClient.post("/auth/login", payload);
    return data;
  },
  forgotPassword: async (email) => {
    const { data } = await apiClient.post("/auth/forgot-password", { email });
    return data;
  },
  resetPassword: async (payload) => {
    // payload: { token, password }
    const { data } = await apiClient.post("/auth/reset-password", payload);
    return data;
  },
  getProfile: async () => {
    const { data } = await apiClient.get("/users/profile");
    return data.data;
  },
  updateProfile: async (payload) => {
    // payload: { name, avatar }
    const { data } = await apiClient.patch("/users/profile", payload);
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.post("/auth/logout");
    return data;
  },
};

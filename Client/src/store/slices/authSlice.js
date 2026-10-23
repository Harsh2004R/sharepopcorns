// Client auth state & pending OTP email
// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadInitialUser = () => {
  try {
    const rawUser = localStorage.getItem("sp_user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: loadInitialUser(),
  accessToken: localStorage.getItem("sp_access_token") || null,
  isAuthenticated: Boolean(localStorage.getItem("sp_access_token")),
  pendingVerificationEmail: sessionStorage.getItem("sp_pending_email") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPendingVerificationEmail: (state, action) => {
      state.pendingVerificationEmail = action.payload;
      if (action.payload) {
        sessionStorage.setItem("sp_pending_email", action.payload);
      } else {
        sessionStorage.removeItem("sp_pending_email");
      }
    },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      if (user) {
        state.user = user;
        localStorage.setItem("sp_user", JSON.stringify(user));
      }
      if (accessToken) {
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        localStorage.setItem("sp_access_token", accessToken);
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("sp_user");
      localStorage.removeItem("sp_access_token");
    },
  },
});

export const { setPendingVerificationEmail, setCredentials, clearCredentials } =
  authSlice.actions;

export default authSlice.reducer;

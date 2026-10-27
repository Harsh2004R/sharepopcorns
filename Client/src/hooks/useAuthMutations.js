// TanStack Query mutations & profile query
// src/hooks/useAuthMutations.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api.js";
import {
  setCredentials,
  setPendingVerificationEmail,
  clearCredentials,
} from "../store/slices/authSlice.js";
import { toaster } from "../components/ui/toaster.jsx";

export const AUTH_QUERY_KEYS = {
  profile: ["user", "profile"],
};

const getErrorMessage = (error, fallback = "Something went wrong") =>
  error?.response?.data?.message || error?.message || fallback;

export const useRegisterMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (response, variables) => {
      dispatch(setPendingVerificationEmail(variables.email));
      toaster.create({
        title: "Account Created!",
        description: response.message,
        type: "success",
      });
      navigate("/auth/verify-email");
    },
    onError: (error) => {
      toaster.create({
        title: "Registration Failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

export const useVerifyEmailMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: (response) => {
      dispatch(setPendingVerificationEmail(""));
      toaster.create({
        title: "Email Verified!",
        description: response.message,
        type: "success",
      });
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      toaster.create({
        title: "Verification Failed",
        description: getErrorMessage(error, "Invalid or expired OTP"),
        type: "error",
      });
    },
  });
};

export const useResendVerificationMutation = () => {
  return useMutation({
    mutationFn: authApi.resendVerification,
    onSuccess: (response) => {
      toaster.create({
        title: "OTP Sent",
        description:
          response.message || "A new verification code has been sent.",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Could Not Resend OTP",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      // Pre-populate React Query cache so /profile renders instantaneously
      queryClient.setQueryData(AUTH_QUERY_KEYS.profile, user);

      toaster.create({
        title: `Welcome back, ${user.name}! 🍿`,
        description: response.message,
        type: "success",
      });

      const targetPath = user.role === "admin" ? "/admin/dashboard" : "/";
      navigate(targetPath, { replace: true });
    },
    onError: (error, variables) => {
      const msg = getErrorMessage(error, "Invalid email or password");
      toaster.create({
        title: "Login Failed",
        description: msg,
        type: "error",
      });

      // If backend rejects login because email isn't verified yet, redirect to OTP screen
      if (msg.toLowerCase().includes("verify") && variables?.email) {
        dispatch(setPendingVerificationEmail(variables.email));
        navigate("/auth/verify-email");
      }
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (response) => {
      toaster.create({
        title: "Reset Link Sent 💌",
        description: response.message || "Check your inbox for the reset link.",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Request Failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (response) => {
      toaster.create({
        title: "Password Updated ✨",
        description:
          response.message || "You can now log in with your new password.",
        type: "success",
      });
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      toaster.create({
        title: "Reset Failed",
        description: getErrorMessage(
          error,
          "Reset token is invalid or has expired.",
        ),
        type: "error",
      });
    },
  });
};

/**
 * Cached Profile Hook (Stale time: 5 minutes)
 */
export const useProfileQuery = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.profile,
    queryFn: async () => {
      const profile = await authApi.getProfile();
      dispatch(setCredentials({ user: profile }));
      return profile;
    },
    enabled: isAuthenticated,
    initialData: user || undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes cache before background refetch
    gcTime: 30 * 60 * 1000, // Keep in memory for 30 minutes
    retry: 1,
  });
};
// Add to src/hooks/useAuthMutations.js
export const useUpdateProfileMutation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (response) => {
      const updatedUser = response.data;
      // 1. Sync Redux + localStorage ("sp_user")
      dispatch(setCredentials({ user: updatedUser }));
      // 2. Update TanStack Query cache immediately
      queryClient.setQueryData(AUTH_QUERY_KEYS.profile, updatedUser);

      toaster.create({
        title: "Profile Updated ✨",
        description: response.message || "Your changes have been saved.",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Update Failed",
        description: getErrorMessage(error, "Could not update profile"),
        type: "error",
      });
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore network errors on logout and clear local session regardless
    } finally {
      dispatch(clearCredentials());
      queryClient.clear();
      navigate("/auth/login", { replace: true });
    }
  };
};

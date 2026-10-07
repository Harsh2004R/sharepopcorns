import { HTTP_STATUS } from "../constants/httpStatusCodes.js";
import * as userService from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getCookieOptions } from "../utils/token.utils.js";

// ==========================================
// AUTHENTICATION & REGISTRATION
// ==========================================

export const registerUser = asyncHandler(async (req, res) => {
  const result = await userService.register(req.body);

  res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, result.message, null));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const result = await userService.verifyEmail(req.body);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result.message, null));
});

export const resendVerification = asyncHandler(async (req, res) => {
  const result = await userService.resendVerification(req.body?.email);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result.message, null));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await userService.login(req.body);

  // Derive Cookie lifetimes mathematically
  const accessCookieOpts = getCookieOptions(30 * 60 * 1000); // 30 minutes
  const refreshCookieOpts = getCookieOptions(14 * 24 * 60 * 60 * 1000); // 14 days

  res
    .status(HTTP_STATUS.OK)
    .cookie("accessToken", accessToken, accessCookieOpts)
    .cookie("refreshToken", refreshToken, refreshCookieOpts)
    .json(
      new ApiResponse(HTTP_STATUS.OK, "Login successful", {
        user,
        accessToken,
        refreshToken,
      }),
    );
});

// ==========================================
// PROFILE & PASSWORD RESET
// ==========================================

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getProfile(req.user._id);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, "Profile fetched successfully", profile),
    );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await userService.updateProfile(req.user._id, req.body);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, "Profile updated successfully", profile),
    );
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await userService.forgotPassword(req.body?.email);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result.message, null));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await userService.resetPassword({
    token: req.body?.token,
    password: req.body?.password,
  });

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result.message, null));
});

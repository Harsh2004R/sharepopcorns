import crypto from "crypto";
import bcrypt from "bcrypt";

import { HTTP_STATUS } from "../constants/httpStatusCodes.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { sendPasswordResetEmail, sendOtpEmail } from "../utils/email.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.utils.js";

const PASSWORD_RESET_EXPIRY_MS = 10 * 60 * 1000;
const OTP_EXPIRY_MS = 10 * 60 * 1000;

const OTP_BCRYPT_ROUNDS = 8;

const GENERIC_RESET_MESSAGE =
  "If an account exists, a password reset link has been sent.";

// ==========================================
// TOKEN / OTP HELPERS
// ==========================================

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const generateNumericOTP = () => crypto.randomInt(100000, 1000000).toString();

const hashOTP = (otp) => bcrypt.hash(String(otp), OTP_BCRYPT_ROUNDS);

// ==========================================
// USER SANITIZATION
// ==========================================

const sanitizeUser = (user) => {
  if (!user) return null;

  if (typeof user.toSafeObject === "function") {
    return user.toSafeObject();
  }

  const data = user.toObject ? user.toObject() : { ...user };

  delete data.password;
  delete data.passwordResetToken;
  delete data.passwordResetExpires;
  delete data.emailVerificationOTP;
  delete data.emailVerificationOTPExpires;
  delete data.__v;

  return data;
};

// ==========================================
// AUTHENTICATION & REGISTRATION
// ==========================================

export const register = async (payload) => {
  const { name, email, password } = payload;

  if (!name || typeof name !== "string" || !name.trim()) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Name is required",
      code: "INVALID_NAME",
    });
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Email is required",
      code: "INVALID_EMAIL",
    });
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Password must be at least 8 characters",
      code: "INVALID_PASSWORD",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  let user = await User.findOne({ email: normalizedEmail });

  if (user?.emailVerified) {
    throw new ApiError({
      statusCode: HTTP_STATUS.CONFLICT,
      message: "User with this email already exists",
      code: "USER_ALREADY_EXISTS",
    });
  }

  // Update existing unverified user
  if (user) {
    user.name = name.trim();
    user.password = password;
  } else {
    user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });
  }

  // Generate a new OTP every time registration is attempted
  const otp = generateNumericOTP();

  // bcrypt hash OTP before storing
  user.emailVerificationOTP = await hashOTP(otp);
  user.emailVerificationOTPExpires = new Date(Date.now() + OTP_EXPIRY_MS);

  user.emailVerified = false;

  await user.save();

  // Don't make the HTTP response wait for Resend.
  // In production, ideally replace this with a job queue.
  void sendOtpEmail(user.email, otp, "VERIFY_EMAIL").catch((error) => {
    console.error("[REGISTRATION_EMAIL_ERROR]", error);
  });

  return {
    message:
      "Registration successful. Please verify your email using the OTP sent to your email address.",
  };
};

// ==========================================
// EMAIL VERIFICATION
// ==========================================

export const verifyEmail = async ({ email, otp }) => {
  if (!email || !otp) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Email and OTP are required",
      code: "INVALID_INPUT",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedOTP = String(otp).trim();

  // Basic OTP format validation
  if (!/^\d{6}$/.test(normalizedOTP)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "OTP must be a 6-digit number",
      code: "INVALID_OTP",
    });
  }

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+emailVerificationOTP +emailVerificationOTPExpires");

  if (!user) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid email or OTP",
      code: "INVALID_VERIFICATION",
    });
  }

  if (user.emailVerified) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Email is already verified",
      code: "ALREADY_VERIFIED",
    });
  }

  if (!user.emailVerificationOTP || !user.emailVerificationOTPExpires) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "OTP has expired or is invalid. Please request a new one.",
      code: "OTP_EXPIRED",
    });
  }

  if (user.emailVerificationOTPExpires <= new Date()) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "OTP has expired. Please request a new one.",
      code: "OTP_EXPIRED",
    });
  }

  // IMPORTANT:
  // bcrypt hash cannot be compared using ===.
  // bcrypt.compare() checks the OTP against the stored hash.
  const isOTPValid = await bcrypt.compare(
    normalizedOTP,
    user.emailVerificationOTP,
  );

  if (!isOTPValid) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid OTP",
      code: "INVALID_OTP",
    });
  }

  user.emailVerified = true;
  user.emailVerificationOTP = null;
  user.emailVerificationOTPExpires = null;

  await user.save();

  return {
    message: "Email verified successfully. Your account is now active.",
  };
};

// ==========================================
// RESEND VERIFICATION OTP
// ==========================================

export const resendVerification = async (email) => {
  if (!email || typeof email !== "string" || !email.trim()) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Email is required",
      code: "INVALID_EMAIL",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  const successMessage =
    "If your email is registered and unverified, a new OTP has been sent.";

  if (!user) {
    return { message: successMessage };
  }

  if (user.emailVerified) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Email is already verified",
      code: "ALREADY_VERIFIED",
    });
  }

  const otp = generateNumericOTP();

  user.emailVerificationOTP = await hashOTP(otp);
  user.emailVerificationOTPExpires = new Date(Date.now() + OTP_EXPIRY_MS);

  await user.save({ validateBeforeSave: false });

  // Don't block HTTP response on email provider
  void sendOtpEmail(user.email, otp, "VERIFY_EMAIL").catch((error) => {
    console.error("[RESEND_VERIFICATION_EMAIL_ERROR]", error);
  });

  return {
    message: successMessage,
  };
};

// ==========================================
// LOGIN
// ==========================================

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Email and password are required",
      code: "INVALID_CREDENTIALS",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid credentials",
      code: "UNAUTHORIZED",
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid credentials",
      code: "UNAUTHORIZED",
    });
  }

  if (!user.emailVerified) {
    throw new ApiError({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message: "Please verify your email before logging in",
      code: "EMAIL_NOT_VERIFIED",
    });
  }

  const sessionId = crypto.randomBytes(16).toString("hex");

  const tokenPayload = {
    _id: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(tokenPayload, sessionId);

  const refreshToken = generateRefreshToken(tokenPayload, sessionId);

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

// ==========================================
// PROFILE
// ==========================================

export const getProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "User not found",
      code: "USER_NOT_FOUND",
    });
  }

  return sanitizeUser(user);
};

export const updateProfile = async (userId, payload) => {
  const updates = {};

  if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || !payload.name.trim()) {
      throw new ApiError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Name is required",
        code: "INVALID_NAME",
      });
    }

    updates.name = payload.name.trim();
  }

  if (payload.avatar !== undefined) {
    if (payload.avatar !== null && typeof payload.avatar !== "string") {
      throw new ApiError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Avatar must be a string URL",
        code: "INVALID_AVATAR",
      });
    }

    updates.avatar = payload.avatar ? payload.avatar.trim() : null;
  }

  if (Object.keys(updates).length === 0) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "No valid profile fields provided",
      code: "INVALID_PROFILE_UPDATE",
    });
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!user) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "User not found",
      code: "USER_NOT_FOUND",
    });
  }

  return sanitizeUser(user);
};

// ==========================================
// PASSWORD RESET
// ==========================================

export const forgotPassword = async (email) => {
  if (!email || typeof email !== "string" || !email.trim()) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Email is required",
      code: "INVALID_EMAIL",
    });
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    return {
      message: GENERIC_RESET_MESSAGE,
    };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = hashToken(rawToken);
  user.passwordResetExpires = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS);

  await user.save({ validateBeforeSave: false });

  void sendPasswordResetEmail(user.email, rawToken).catch((error) => {
    console.error("[PASSWORD_RESET_EMAIL_ERROR]", error);
  });

  return {
    message: GENERIC_RESET_MESSAGE,
  };
};

export const resetPassword = async ({ token, password }) => {
  if (!token || typeof token !== "string") {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid or expired password reset token",
      code: "INVALID_RESET_TOKEN",
    });
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Password must be at least 8 characters",
      code: "INVALID_PASSWORD",
    });
  }

  const hashedToken = hashToken(token);

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: new Date(),
    },
  }).select("+password +passwordResetToken +passwordResetExpires");

  if (!user) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid or expired password reset token",
      code: "INVALID_RESET_TOKEN",
    });
  }

  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await user.save();

  return {
    message: "Password reset successful",
  };
};

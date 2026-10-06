import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatusCodes.js";

const ENV = process.env;

export const generateAccessToken = (payload, sessionId) => {
  return jwt.sign({ ...payload, sessionId }, ENV.JWT_ACCESS_SECRET, {
    expiresIn: ENV.JWT_ACCESS_EXPIRY,
  });
};

export const generateRefreshToken = (payload, sessionId) => {
  return jwt.sign({ ...payload, sessionId }, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.JWT_REFRESH_EXPIRY,
  });
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ENV.JWT_ACCESS_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Access token has expired",
        code: "ACCESS_TOKEN_EXPIRED",
      });
    }
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid access token",
      code: "INVALID_ACCESS_TOKEN",
    });
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Refresh token has expired. Please sign in again.",
        code: "REFRESH_TOKEN_EXPIRED",
      });
    }
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid refresh token",
      code: "INVALID_REFRESH_TOKEN",
    });
  }
};

export const getCookieOptions = (maxAgeMs) => {
  const isProduction = ENV.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    ...(maxAgeMs && { maxAge: maxAgeMs }),
  };
};

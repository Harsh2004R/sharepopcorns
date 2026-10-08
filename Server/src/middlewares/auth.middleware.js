import { HTTP_STATUS } from "../constants/httpStatusCodes.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/token.utils.js";

const extractAccessToken = (req) => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    return header.slice(7).trim();
  }

  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  return null;
};

const resolveUserFromToken = async (token) => {
  const decoded = verifyAccessToken(token);
  const userId = decoded._id || decoded.userId || decoded.id;

  if (!userId) {
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Unauthorized",
      code: "UNAUTHENTICATED",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Unauthorized",
      code: "UNAUTHENTICATED",
    });
  }

  if (user.emailVerified === false) {
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Please verify your email before continuing",
      code: "EMAIL_NOT_VERIFIED",
    });
  }

  return user;
};

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = extractAccessToken(req);

  if (!token) {
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Unauthorized",
      code: "UNAUTHENTICATED",
    });
  }

  req.user = await resolveUserFromToken(token);
  next();
});

export const optionalAuthenticate = asyncHandler(async (req, res, next) => {
  const token = extractAccessToken(req);

  if (!token) {
    return next();
  }

  req.user = await resolveUserFromToken(token);
  next();
});

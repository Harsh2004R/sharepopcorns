import rateLimit from "express-rate-limit";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatusCodes.js";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new ApiError({
        statusCode: HTTP_STATUS.CONFLICT,
        message: "Too many authentication requests. Please try again later.",
        code: "RATE_LIMIT_EXCEEDED",
      }),
    );
  },
});

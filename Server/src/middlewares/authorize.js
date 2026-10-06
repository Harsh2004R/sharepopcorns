import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatusCodes.js";

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(
        new ApiError({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: "Unauthenticated request",
          code: "UNAUTHENTICATED",
        }),
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError({
          statusCode: HTTP_STATUS.FORBIDDEN,
          message: "You do not have permission to perform this action",
          code: "FORBIDDEN_RESOURCE",
        }),
      );
    }

    next();
  };
};

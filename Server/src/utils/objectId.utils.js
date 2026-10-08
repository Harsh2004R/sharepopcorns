import mongoose from "mongoose";
import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatusCodes.js";

export const ensureValidObjectId = (id, label = "ID") => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: `Invalid ${label}`,
      code: "INVALID_ID",
    });
  }
};

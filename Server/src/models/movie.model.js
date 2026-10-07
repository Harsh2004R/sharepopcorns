import mongoose from "mongoose";
import {
  MOVIE_STATUS_VALUES,
  MOVIE_STATUSES,
  MOVIE_TYPE_VALUES,
  RATING_MAX,
  RATING_MIN,
} from "../constants/content.js";

const movieSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: MOVIE_TYPE_VALUES,
        message: "Invalid movie type",
      },
      required: [true, "Type is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: MOVIE_STATUS_VALUES,
        message: "Invalid status",
      },
      required: [true, "Status is required"],
    },
    rating: {
      type: Number,
      default: null,
      min: [RATING_MIN, "Invalid rating"],
      max: [RATING_MAX, "Invalid rating"],
    },
    watchedDate: {
      type: Date,
      default: null,
    },
    scheduledDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

movieSchema.index({ owner: 1, createdAt: -1 });
movieSchema.index({ owner: 1, status: 1, createdAt: -1 });
movieSchema.index({ owner: 1, status: 1, watchedDate: -1 });

movieSchema.pre("validate", function assignWatchedDate() {
  if (this.status === MOVIE_STATUSES.WATCHED && !this.watchedDate) {
    this.watchedDate = new Date();
  }
});

export const Movie = mongoose.model("Movie", movieSchema);

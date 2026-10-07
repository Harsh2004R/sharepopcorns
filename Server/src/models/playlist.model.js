import mongoose from "mongoose";

const playlistMovieSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const playlistSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Playlist name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    movies: {
      type: [playlistMovieSchema],
      default: [],
    },
  },
  { timestamps: true },
);

playlistSchema.index({ owner: 1, createdAt: -1 });
playlistSchema.index({ owner: 1, isPublic: 1 });

export const Playlist = mongoose.model("Playlist", playlistSchema);

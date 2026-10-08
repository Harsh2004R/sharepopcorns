import { HTTP_STATUS } from "../constants/httpStatusCodes.js";
import { Movie } from "../models/movie.model.js";
import { Playlist } from "../models/playlist.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ensureValidObjectId } from "../utils/objectId.utils.js";
import { getWatchedMoviesByYear } from "./movie.service.js";

const isOwner = (resourceOwner, userId) =>
  Boolean(userId) && resourceOwner.toString() === userId.toString();

const assertPlaylistOwner = (playlist, userId) => {
  if (!isOwner(playlist.owner, userId)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message: "You are not allowed to modify this playlist",
      code: "FORBIDDEN_RESOURCE",
    });
  }
};

const populatePlaylist = (query) =>
  query.populate({
    path: "movies.movie",
    select: "-__v",
  });

const assertCanViewPlaylist = (playlist, requesterId) => {
  if (playlist.isPublic) {
    return;
  }

  if (!isOwner(playlist.owner, requesterId)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message: "This playlist is private",
      code: "PLAYLIST_PRIVATE",
    });
  }
};

export const createPlaylist = async (userId, payload) => {
  if (
    !payload.name ||
    typeof payload.name !== "string" ||
    !payload.name.trim()
  ) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Playlist name is required",
      code: "INVALID_PLAYLIST_NAME",
    });
  }

  if (payload.isPublic !== undefined && typeof payload.isPublic !== "boolean") {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "isPublic must be a boolean",
      code: "INVALID_PLAYLIST_VISIBILITY",
    });
  }

  const playlistName = payload.name.trim();

  // 1. Check if a playlist with the exact same name already exists for this user
  const existingPlaylist = await Playlist.findOne({
    owner: userId,
    // Using a case-insensitive regex so "Action" and "action" trigger the duplicate error
    name: { $regex: new RegExp(`^${playlistName}$`, "i") },
  });

  // 2. Throw a 409 Conflict error if a match is found
  if (existingPlaylist) {
    throw new ApiError({
      statusCode: HTTP_STATUS.CONFLICT,
      message: "You already have a playlist with this name",
      code: "DUPLICATE_PLAYLIST_NAME",
    });
  }

  const playlist = await Playlist.create({
    owner: userId,
    name: payload.name.trim(),
    description:
      typeof payload.description === "string" ? payload.description.trim() : "",
    isPublic: Boolean(payload.isPublic),
  });

  return playlist;
};

export const getYearlyPlaylist = async (userId, year) => {
  return getWatchedMoviesByYear(userId, year);
};

export const getUserPlaylists = async (ownerId, requesterId) => {
  ensureValidObjectId(ownerId, "user ID");

  const owner = await User.findById(ownerId);
  if (!owner) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "User not found",
      code: "USER_NOT_FOUND",
    });
  }

  const filter = { owner: ownerId };
  if (!isOwner(ownerId, requesterId)) {
    filter.isPublic = true;
  }

  return Playlist.find(filter).sort({ createdAt: -1 });
};

export const getPlaylistById = async (playlistId, requesterId) => {
  ensureValidObjectId(playlistId, "playlist ID");

  const playlist = await populatePlaylist(Playlist.findById(playlistId));
  if (!playlist) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "Playlist not found",
      code: "PLAYLIST_NOT_FOUND",
    });
  }

  assertCanViewPlaylist(playlist, requesterId);
  return playlist;
};

export const addMovieToPlaylist = async (playlistId, userId, movieId) => {
  ensureValidObjectId(playlistId, "playlist ID");
  ensureValidObjectId(movieId, "movie ID");

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "Playlist not found",
      code: "PLAYLIST_NOT_FOUND",
    });
  }

  assertPlaylistOwner(playlist, userId);

  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "Movie not found",
      code: "MOVIE_NOT_FOUND",
    });
  }

  if (movie.owner.toString() !== userId.toString()) {
    throw new ApiError({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message: "You can only add your own movies to this playlist",
      code: "FORBIDDEN_RESOURCE",
    });
  }

  const alreadyAdded = playlist.movies.some(
    (entry) => entry.movie.toString() === movieId.toString(),
  );

  if (alreadyAdded) {
    throw new ApiError({
      statusCode: HTTP_STATUS.CONFLICT,
      message: "Movie already exists in this playlist",
      code: "DUPLICATE_PLAYLIST_MOVIE",
    });
  }

  playlist.movies.push({ movie: movie._id, addedAt: new Date() });
  await playlist.save();

  return populatePlaylist(Playlist.findById(playlist._id));
};

export const removeMovieFromPlaylist = async (playlistId, userId, movieId) => {
  ensureValidObjectId(playlistId, "playlist ID");
  ensureValidObjectId(movieId, "movie ID");

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "Playlist not found",
      code: "PLAYLIST_NOT_FOUND",
    });
  }

  assertPlaylistOwner(playlist, userId);

  const initialLength = playlist.movies.length;
  playlist.movies = playlist.movies.filter(
    (entry) => entry.movie.toString() !== movieId.toString(),
  );

  if (playlist.movies.length === initialLength) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "Movie not found",
      code: "MOVIE_NOT_FOUND",
    });
  }

  await playlist.save();
  return populatePlaylist(Playlist.findById(playlist._id));
};

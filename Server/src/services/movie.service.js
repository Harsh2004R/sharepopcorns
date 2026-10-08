import {
  MOVIE_STATUS_VALUES,
  MOVIE_STATUSES,
  MOVIE_TYPE_VALUES,
  PAGINATION,
  RATING_MAX,
  RATING_MIN,
} from "../constants/content.js";
import { HTTP_STATUS } from "../constants/httpStatusCodes.js";
import { Movie } from "../models/movie.model.js";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ensureValidObjectId } from "../utils/objectId.utils.js";

const isOwner = (resourceOwner, userId) =>
  resourceOwner.toString() === userId.toString();

const assertMovieOwner = (movie, userId) => {
  if (!isOwner(movie.owner, userId)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message: "You are not allowed to modify this movie",
      code: "FORBIDDEN_RESOURCE",
    });
  }
};

const parseOptionalDate = (value, fieldName) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: `Invalid ${fieldName}`,
      code: "INVALID_DATE",
    });
  }

  return date;
};

const parseRating = (value) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const rating = Number(value);
  if (Number.isNaN(rating) || rating < RATING_MIN || rating > RATING_MAX) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid rating",
      code: "INVALID_RATING",
    });
  }

  return rating;
};

const parsePagination = (query) => {
  const page = Math.max(
    Number.parseInt(query.page, 10) || PAGINATION.DEFAULT_PAGE,
    1,
  );
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || PAGINATION.DEFAULT_LIMIT, 1),
    PAGINATION.MAX_LIMIT,
  );

  return { page, limit, skip: (page - 1) * limit };
};

export const createMovie = async (userId, payload) => {
  const {
    type,
    title,
    description,
    image,
    status,
    rating,
    watchedDate,
    scheduledDate,
  } = payload;

  if (!type || !MOVIE_TYPE_VALUES.includes(type)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid movie type",
      code: "INVALID_MOVIE_TYPE",
    });
  }

  if (!title || typeof title !== "string" || !title.trim()) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Title is required",
      code: "INVALID_TITLE",
    });
  }

  if (!status || !MOVIE_STATUS_VALUES.includes(status)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid status",
      code: "INVALID_STATUS",
    });
  }
  const movieTitle = title.trim();

  // 1. Check if the user has already added this movie/title
  const existingMovie = await Movie.findOne({
    owner: userId,
    type: type,
    title: { $regex: new RegExp(`^${movieTitle}$`, "i") }, // Case-insensitive exact match
  });

  // 2. Throw a 409 Conflict error if a match is found
  if (existingMovie) {
    throw new ApiError({
      statusCode: HTTP_STATUS.CONFLICT,
      message: "You have already added this movie",
      code: "DUPLICATE_MOVIE",
    });
  }
  const parsedRating = parseRating(rating);
  const movieData = {
    owner: userId,
    type,
    title: title.trim(),
    description: typeof description === "string" ? description.trim() : "",
    image: typeof image === "string" && image.trim() ? image.trim() : null,
    status,
    rating: status === MOVIE_STATUSES.WATCHED ? parsedRating : null,
    watchedDate:
      status === MOVIE_STATUSES.WATCHED
        ? parseOptionalDate(watchedDate, "watchedDate") || new Date()
        : parseOptionalDate(watchedDate, "watchedDate"),
    scheduledDate: parseOptionalDate(scheduledDate, "scheduledDate"),
  };

  const movie = await Movie.create(movieData);
  return movie;
};

export const getUserMovies = async (userId, query = {}) => {
  const filter = { owner: userId };

  if (query.status) {
    if (!MOVIE_STATUS_VALUES.includes(query.status)) {
      throw new ApiError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Invalid status",
        code: "INVALID_STATUS",
      });
    }
    filter.status = query.status;
  }

  const { page, limit, skip } = parsePagination(query);
  const [movies, total] = await Promise.all([
    Movie.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Movie.countDocuments(filter),
  ]);

  return {
    movies,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 0,
    },
  };
};

export const getMovieById = async (movieId, userId) => {
  ensureValidObjectId(movieId, "movie ID");
  const movie = await Movie.findById(movieId);

  if (!movie) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "Movie not found",
      code: "MOVIE_NOT_FOUND",
    });
  }

  if (!isOwner(movie.owner, userId)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message: "You are not allowed to modify this movie",
      code: "FORBIDDEN_RESOURCE",
    });
  }

  return movie;
};

export const updateMovie = async (movieId, userId, payload) => {
  ensureValidObjectId(movieId, "movie ID");
  const movie = await Movie.findById(movieId);

  if (!movie) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "Movie not found",
      code: "MOVIE_NOT_FOUND",
    });
  }

  assertMovieOwner(movie, userId);

  const nextStatus =
    payload.status !== undefined ? payload.status : movie.status;

  if (
    payload.status !== undefined &&
    !MOVIE_STATUS_VALUES.includes(payload.status)
  ) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid status",
      code: "INVALID_STATUS",
    });
  }

  if (payload.type !== undefined && !MOVIE_TYPE_VALUES.includes(payload.type)) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid movie type",
      code: "INVALID_MOVIE_TYPE",
    });
  }

  if (payload.title !== undefined) {
    if (typeof payload.title !== "string" || !payload.title.trim()) {
      throw new ApiError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Title is required",
        code: "INVALID_TITLE",
      });
    }
    movie.title = payload.title.trim();
  }

  if (payload.description !== undefined) {
    movie.description =
      typeof payload.description === "string" ? payload.description.trim() : "";
  }

  if (payload.image !== undefined) {
    movie.image =
      typeof payload.image === "string" && payload.image.trim()
        ? payload.image.trim()
        : null;
  }

  if (payload.type !== undefined) {
    movie.type = payload.type;
  }

  if (payload.status !== undefined) {
    movie.status = payload.status;
  }

  if (payload.watchedDate !== undefined) {
    movie.watchedDate = parseOptionalDate(payload.watchedDate, "watchedDate");
  }

  if (payload.scheduledDate !== undefined) {
    movie.scheduledDate = parseOptionalDate(
      payload.scheduledDate,
      "scheduledDate",
    );
  }

  if (payload.rating !== undefined) {
    if (nextStatus !== MOVIE_STATUSES.WATCHED) {
      movie.rating = null;
    } else {
      movie.rating = parseRating(payload.rating);
    }
  }

  if (movie.status === MOVIE_STATUSES.WATCHED && !movie.watchedDate) {
    movie.watchedDate = new Date();
  }

  await movie.save();
  return movie;
};

export const deleteMovie = async (movieId, userId) => {
  ensureValidObjectId(movieId, "movie ID");
  const movie = await Movie.findById(movieId);

  if (!movie) {
    throw new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: "Movie not found",
      code: "MOVIE_NOT_FOUND",
    });
  }

  assertMovieOwner(movie, userId);

  await movie.deleteOne();
  await Playlist.updateMany(
    { "movies.movie": movie._id },
    { $pull: { movies: { movie: movie._id } } },
  );

  return { deleted: true };
};

export const getWatchedMoviesByYear = async (userId, year) => {
  const parsedYear = Number.parseInt(year, 10);

  if (Number.isNaN(parsedYear) || parsedYear < 1900 || parsedYear > 2100) {
    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid year",
      code: "INVALID_YEAR",
    });
  }

  const start = new Date(Date.UTC(parsedYear, 0, 1));
  const end = new Date(Date.UTC(parsedYear + 1, 0, 1));

  const movies = await Movie.find({
    owner: userId,
    status: MOVIE_STATUSES.WATCHED,
    watchedDate: { $gte: start, $lt: end },
  }).sort({ watchedDate: -1 });

  return {
    year: parsedYear,
    count: movies.length,
    movies,
  };
};

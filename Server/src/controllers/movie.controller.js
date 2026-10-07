import { HTTP_STATUS } from "../constants/httpStatusCodes.js";
import * as movieService from "../services/movie.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.createMovie(req.user._id, req.body);

  res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, "Movie created successfully", movie));
});

export const getMovies = asyncHandler(async (req, res) => {
  const result = await movieService.getUserMovies(req.user._id, req.query);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, "Movies fetched successfully", result));
});

export const updateMovie = asyncHandler(async (req, res) => {
  const movie = await movieService.updateMovie(
    req.params.id,
    req.user._id,
    req.body,
  );

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, "Movie updated successfully", movie));
});

export const deleteMovie = asyncHandler(async (req, res) => {
  await movieService.deleteMovie(req.params.id, req.user._id);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, "Movie deleted successfully", null));
});

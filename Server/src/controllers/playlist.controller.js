import { HTTP_STATUS } from "../constants/httpStatusCodes.js";
import * as playlistService from "../services/playlist.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.createPlaylist(req.user._id, req.body);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(HTTP_STATUS.CREATED, "Playlist created successfully", playlist),
    );
});

export const getYearlyPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.getYearlyPlaylist(
    req.user._id,
    req.params.year,
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        "Yearly playlist fetched successfully",
        playlist,
      ),
    );
});

export const getUserPlaylists = asyncHandler(async (req, res) => {
  const playlists = await playlistService.getUserPlaylists(
    req.params.userId,
    req.user?._id,
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, "Playlists fetched successfully", playlists),
    );
});

export const getPlaylistById = asyncHandler(async (req, res) => {
  const playlist = await playlistService.getPlaylistById(
    req.params.id,
    req.user?._id,
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, "Playlist fetched successfully", playlist),
    );
});

export const addMovieToPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.addMovieToPlaylist(
    req.params.id,
    req.user._id,
    req.body?.movieId,
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, "Movie added to playlist successfully", playlist),
    );
});

export const removeMovieFromPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.removeMovieFromPlaylist(
    req.params.id,
    req.user._id,
    req.params.movieId,
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        "Movie removed from playlist successfully",
        playlist,
      ),
    );
});

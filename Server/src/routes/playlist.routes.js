import { Router } from "express";
import {
  addMovieToPlaylist,
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  getYearlyPlaylist,
  removeMovieFromPlaylist,
} from "../controllers/playlist.controller.js";
import {
  authenticate,
  optionalAuthenticate,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createPlaylist);
router.get("/yearly/:year", authenticate, getYearlyPlaylist);
router.get("/user/:userId", optionalAuthenticate, getUserPlaylists);
router.get("/:id", optionalAuthenticate, getPlaylistById);
router.post("/:id/movies", authenticate, addMovieToPlaylist);
router.delete("/:id/movies/:movieId", authenticate, removeMovieFromPlaylist);

export default router;

// routes/index.js
import { Router } from "express";
import movieRoutes from "./movie.routes.js";
import playlistRoutes from "./playlist.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/playlists", playlistRoutes);

export default router;

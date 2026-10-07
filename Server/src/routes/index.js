// routes/index.js
import { Router } from "express";
import movieRoutes from "./movie.routes.js";
import playlistRoutes from "./playlist.routes.js";
import userRoutes from "./user/user.routes.js";

const router = Router();

router.use("/auth", userRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/playlists", playlistRoutes);

export default router;

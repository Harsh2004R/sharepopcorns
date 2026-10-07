import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", createMovie);
router.get("/", getMovies);
router.patch("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;

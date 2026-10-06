// routes/index.js
import { Router } from "express";
import userRoutes from "./user/user.routes.js";

const router = Router();

router.use("/auth", userRoutes);

export default router;

import { Router } from "express";

const ENV = process.env;
const router = Router();

// ==========================================
// 1. LOCAL AUTHENTICATION
// ==========================================

router.post("/register", async (req, res) => {});
// router.post("/verify-email");
// router.post("/login");

export default router;

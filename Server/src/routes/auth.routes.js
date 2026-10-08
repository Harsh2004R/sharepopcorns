import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  registerUser,
  verifyEmail,
  loginUser,
  resendVerification,
} from "../controllers/user.controller.js";
import { authLimiter, otpLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

// ==========================================
// 1. LOCAL AUTHENTICATION
// ==========================================

router.post("/register", authLimiter, registerUser);
router.post("/verify-email", authLimiter, verifyEmail);
router.post("/resend-verification", otpLimiter, resendVerification);
router.post("/login", authLimiter, loginUser);

// ==========================================
// 2. PASSWORD RESET
// ==========================================

router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

export default router;

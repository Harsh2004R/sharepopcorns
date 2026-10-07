import { Router } from "express";
import {
  forgotPassword,
  getProfile,
  resetPassword,
  updateProfile,
  registerUser,
  verifyEmail,
  loginUser,
  resendVerification,
} from "../../controllers/user.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authLimiter, otpLimiter } from "../../middlewares/rateLimiter.js";

const router = Router();

// ==========================================
// 1. LOCAL AUTHENTICATION
// ==========================================

router.post("/register", authLimiter, registerUser);
router.post("/verify-email", authLimiter, verifyEmail);
router.post("/resend-verification", otpLimiter, resendVerification);
router.post("/login", authLimiter, loginUser);

// ==========================================
// 2. PROFILE & SETTINGS
// ==========================================

router.get("/profile", authenticate, getProfile);
router.patch("/profile", authenticate, updateProfile);

// ==========================================
// 3. PASSWORD RESET
// ==========================================

router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

export default router;

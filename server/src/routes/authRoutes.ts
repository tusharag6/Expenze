import { Router } from "express";
import { authController } from "../controllers";
import { verificationController } from "../controllers";
import { passwordController } from "../controllers";

const router = Router();

// Register Route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Send verification email
router.post("/send-verification", verificationController.sendVerificationEmail);

// Endpoint for verifying email
router.get("/verify/:token", verificationController.verifyEmail);

// Forgot Password
router.post("/forgot-password", passwordController.forgotPassword);

// Reset Password
router.post("/reset-password", passwordController.resetPassword);

// Check Reset Token
router.post("/check-token", passwordController.checkToken);

export default router;

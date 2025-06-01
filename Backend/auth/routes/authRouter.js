import express from "express";
import { validateRequest } from "../../middleware/validationMiddleware.js";
import { createAccessTokenController, forgotPasswordController, resetPasswordController } from "../../controllers/authController.js";

const router = express.Router();

router.post("/refresh", createAccessTokenController);
router.post("/forgot-password", validateRequest("forgotPassword"), forgotPasswordController);
router.post("/reset-password", validateRequest("resetPassword"), resetPasswordController);

export default router;

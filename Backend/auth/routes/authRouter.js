import express from "express";
import { validateRequest } from "../../middleware/validationMiddleware";
import { createAccessTokenController, forgotPasswordController, resetPasswordController } from "../../controllers/authController";

const router = express.Router();

router.post("/refresh", createAccessTokenController);
router.post("/forgot-password", validateRequest("forgotPassword"), forgotPasswordController);
router.post("/reset-password", validateRequest("resetPassword"), resetPasswordController);

export default router;

import express from "express";
import { authLimiter } from "../../middleware/rateLimiters";
import { validateRequest } from "../../middleware/validationMiddleware";
import authMiddleware from "../../middleware/authMiddleware";
import {
	deleteUserController,
	getAllUsersController,
	getUserController,
	getUserFavoritesController,
	loginUserController,
	registerUserController,
	updateEmployeeStatusController,
	updateFavoriteItemController,
	updateUserController,
} from "../../controllers/userController";

const router = express.Router();

router.post("/login", authLimiter, validateRequest("loginUser"), loginUserController);
router.post("/register", validateRequest("registerUser"), registerUserController);
router.get("/", authMiddleware, getAllUsersController);
router.get("/favorite-products", authMiddleware, getUserFavoritesController);
router.post("/favorite-products", authMiddleware, updateFavoriteItemController);
router.patch("/employee/:id", authMiddleware, updateEmployeeStatusController);
router.get("/:id", authMiddleware, getUserController);
router.put("/:id", authMiddleware, validateRequest("registerUser"), updateUserController);
router.delete("/:id", authMiddleware, deleteUserController);

export default router;

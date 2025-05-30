import express from "express";
import { authLimiter } from "../../middleware/rateLimiters";
import userServices from "../services/userServices";
import CustomError from "../../utils/customError";
import { validateRequest } from "../../middleware/validationMiddleware";
import authMiddleware from "../../middleware/authMiddleware";

const router = express.Router();
router.post("/login", authLimiter, validateRequest("loginUser"), async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const response = await userServices.loginUser(email, password);
		if (!response.success) {
			return next(new CustomError("Login failed", 401, "AuthenticationError"));
		}
		res.cookie("refreshToken", response.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "Strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});
		res.status(200).json({
			accessToken: response.accessToken,
			message: "Login successful",
		});
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "ServerError"));
	}
});

router.post("/register", validateRequest("registerUser"), async (req, res, next) => {
	try {
		const response = await userServices.registerUser(req.body);
		if (!response.success) {
			return next(new CustomError("Registration failed", 422, "RegistrationError"));
		}
		res.status(201).json({
			message: "Registration successful",
			user: response.user,
		});
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "ServerError"));
	}
});

router.get("/", authMiddleware, async (req, res, next) => {
	try {
		const isAdmin = req.user.isAdmin;
		if (!isAdmin) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const users = await userServices.getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "Error"));
	}
});

router.get("/:id", authMiddleware, async (req, res, next) => {
	try {
		const userId = req.user.id;
		if (req.params.id !== userId && !req.user.isAdmin) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const user = await userServices.getUserById(req.params.id);
		if (!user) {
			return next(new CustomError("User not found", 404, "NotFoundError"));
		}
		res.status(200).json(user);
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "Error"));
	}
});

router.put("/:id", authMiddleware, validateRequest("registerUser"), async (req, res, next) => {
	try {
		const isAdmin = req.user.isAdmin;
		const userIdFromToken = req.user.id;
		const userIdFromParams = req.params.id;
		if (!isAdmin && userIdFromToken !== userIdFromParams) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const response = await userServices.updateUser(userIdFromToken, req.body);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json({
			message: "User updated successfully",
			user: response.user,
		});
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "Error"));
	}
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
	try {
		const isAdmin = req.user.isAdmin;
		if (!isAdmin) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const response = await userServices.deleteUser(req.user.id);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json({
			message: "User deleted successfully",
		});
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "Error"));
	}
});

router.post("/favorite-products", authMiddleware, async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { productId } = req.body;
		if (!productId) {
			return next(new CustomError("Product ID is required", 400, "ValidationError"));
		}
		const response = await userServices.updateFavoriteItem(userId, productId);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json(response);
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "Error"));
	}
});

router.get("/favorite-products", authMiddleware, async (req, res, next) => {
	try {
		const userId = req.user.id;
		const response = await userServices.getUserFavorites(userId);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json(response.favorites);
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "Error"));
	}
});

router.patch("/employee/:id", authMiddleware, async (req, res, next) => {
	try {
		const isAdmin = req.user.isAdmin;
		if (!isAdmin) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const userIdFromParams = req.params.id;
		const response = await userServices.updateEmployeeRole(userIdFromParams);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json(response);
	} catch (error) {
		return next(new CustomError(error.message || "Internal server error", error.status || 500, error.name || "Error"));
	}
});

export default router;

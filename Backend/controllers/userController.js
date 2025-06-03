import CustomError from "../utils/customError.js";
import userServices from "../users/services/userServices.js";
import { handleControllerError } from "../utils/errorsHandlers.js";

const { loginUser, registerUser, getAllUsers, getUserById, updateUser, deleteUser, updateFavoriteItem, getUserFavorites, updateEmployeeStatus } = userServices;

export async function loginUserController(req, res, next) {
	try {
		const userData = req.body;
		const response = await loginUser(userData);
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
		handleControllerError(error, next, "Failed to login user");
	}
}

export async function registerUserController(req, res, next) {
	try {
		const response = await registerUser(req.body);
		if (!response.success) {
			return next(new CustomError("Registration failed", 422, "RegistrationError"));
		}
		res.status(201).json({
			message: "Registration successful",
			user: response.user,
		});
	} catch (error) {
		handleControllerError(error, next, "Failed to register user");
	}
}

export async function getAllUsersController(req, res, next) {
	try {
		const isAdmin = req.user.isAdmin;
		if (!isAdmin) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const users = await getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		handleControllerError(error, next, "Failed to retrieve users");
	}
}

export async function getUserController(req, res, next) {
	try {
		const userId = req.user.id;
		if (req.params.id !== userId && !req.user.isAdmin) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const user = await getUserById(req.params.id);
		if (!user) {
			return next(new CustomError("User not found", 404, "NotFoundError"));
		}
		res.status(200).json(user);
	} catch (error) {
		handleControllerError(error, next, "Failed to retrieve user");
	}
}

export async function updateUserController(req, res, next) {
	try {
		const isAdmin = req.user.isAdmin;
		const userIdFromToken = req.user.id;
		const userIdFromParams = req.params.id;
		if (!isAdmin && userIdFromToken !== userIdFromParams) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const response = await updateUser(userIdFromToken, req.body);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json({
			message: "User updated successfully",
			user: response.user,
		});
	} catch (error) {
		handleControllerError(error, next, "Failed to update user");
	}
}

export async function deleteUserController(req, res, next) {
	try {
		const isAdmin = req.user.isAdmin;
		if (!isAdmin) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const response = await deleteUser(req.user.id);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json({
			message: "User deleted successfully",
		});
	} catch (error) {
		handleControllerError(error, next, "Failed to delete user");
	}
}

export async function updateFavoriteItemController(req, res, next) {
	try {
		if (!req.user) {
			return next(new CustomError("User not authenticated", 401, "AuthenticationError"));
		}
		const userId = req.user.id;
		const { productId } = req.body;
		if (!productId) {
			return next(new CustomError("Product ID is required", 400, "ValidationError"));
		}
		const response = await updateFavoriteItem(userId, productId);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json(response);
	} catch (error) {
		handleControllerError(error, next, "Failed to update favorite item");
	}
}

export async function getUserFavoritesController(req, res, next) {
	try {
		if (!req.user) {
			return next(new CustomError("User not authenticated", 401, "AuthenticationError"));
		}
		const userId = req.user.id;
		const response = await getUserFavorites(userId);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json(response.favorites);
	} catch (error) {
		handleControllerError(error, next, "Failed to retrieve user favorites");
	}
}

export async function updateEmployeeStatusController(req, res, next) {
	try {
		const isAdmin = req.user.isAdmin;
		if (!isAdmin) {
			return next(new CustomError("Access denied", 403, "AuthorizationError"));
		}
		const userIdFromParams = req.params.id;
		const response = await updateEmployeeStatus(userIdFromParams);
		if (!response.success) {
			return next(new CustomError(response.message, response.status, response.error?.name || "Error"));
		}
		res.status(200).json(response);
	} catch (error) {
		handleControllerError(error, next, "Failed to update employee status");
	}
}

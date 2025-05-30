import { createAccessToken, createRefreshToken } from "../../../auth/jwt/createToken.js";
import CustomError from "../../../utils/customError.js";
import { handleServiceError } from "../../../utils/handleServiceError.js";
import User from "../../models/mongoDB/userSchema.js";
import { comparePasswords, hashPassword } from "../passwordsServices.js";

const registerUser = async (userData) => {
	try {
		const { email, password } = userData;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new CustomError("User already exists with this email", 409, "Conflict");
		}
		const hashedPassword = await hashPassword(password);
		const newUser = new User({
			...userData,
			password: hashedPassword,
		});
		await newUser.save();
		return {
			success: true,
			message: "User registered successfully",
			userId: newUser._id,
		};
	} catch (error) {
		handleServiceError(error, "An error occurred while registering the user");
	}
};

const loginUser = async (userData) => {
	try {
		const { email, password } = userData;
		const user = await User.findOne({ email });
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		const isPasswordValid = await comparePasswords(password, user.password);
		if (!isPasswordValid) {
			throw new CustomError("Invalid password", 401, "Unauthorized");
		}
		const accessToken = createAccessToken(user);
		const refreshToken = createRefreshToken(user);
		user.refreshToken = refreshToken;
		await user.save();
		return {
			success: true,
			accessToken,
			refreshToken,
		};
	} catch (error) {
		handleServiceError(error, "An error occurred while logging in the user");
	}
};

const updateUser = async (userId, userData) => {
	try {
		const updateData = { ...userData };
		const user = await User.findById(userId);
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		user.set(updateData);
		await user.save();
		return {
			success: true,
			message: "User updated successfully",
			userId: user._id,
		};
	} catch (error) {
		handleServiceError(error, "An error occurred while editing the user");
	}
};

const deleteUser = async (userId) => {
	try {
		const user = await User.findByIdAndDelete(userId);
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		return {
			success: true,
			message: "User deleted successfully",
			userId: user._id,
		};
	} catch (error) {
		handleServiceError(error, "An error occurred while deleting the user");
	}
};

const getUserById = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		return user;
	} catch (error) {
		handleServiceError(error, "An error occurred while getting user");
	}
};

const findUserByEmail = async (email) => {
	try {
		const user = await User.find({ email });
		if (!user || user.length === 0) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		return user[0];
	} catch (error) {
		handleServiceError(error, "An error occurred while finding user by email");
	}
};

const getAllUsers = async () => {
	try {
		const users = await User.find();
		return users;
	} catch (error) {
		handleServiceError(error, "An error occurred while getting all users");
	}
};

const updateFavoriteItem = async (userId, productId) => {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		const isFavorite = user.favorites.includes(productId.toString());
		if (isFavorite) {
			user.favorites = user.favorites.filter((id) => id.toString() !== productId.toString());
		} else {
			user.favorites.push(productId);
		}
		await user.save();
		return {
			success: true,
			message: isFavorite ? "Item removed from favorites" : "Item added to favorites",
			favorites: user.favorites,
		};
	} catch (error) {
		handleServiceError(error, "An error occurred while adding favorite item");
	}
};

const getUserFavorites = async (userId) => {
	try {
		const user = await User.findById(userId).populate("favorites");
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		return {
			success: true,
			favorites: user.favorites,
		};
	} catch (error) {
		handleServiceError(error, "An error occurred while retrieving favorite items");
	}
};

const updateEmployeeStatus = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		user.isEmployee = !user.isEmployee;
		await user.save();
		return {
			success: true,
			message: user.isEmployee ? "User promoted to employee" : "User demoted from employee",
			userId: user._id,
		};
	} catch (error) {
		handleServiceError(error, "An error occurred while updating employee role");
	}
};

const mongoService = {
	registerUser,
	loginUser,
	updateUser,
	deleteUser,
	getUserById,
	findUserByEmail,
	getAllUsers,
	updateFavoriteItem,
	getUserFavorites,
	updateEmployeeStatus,
};

export default mongoService;

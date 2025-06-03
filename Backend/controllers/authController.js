import dotenv from "dotenv";
import userServices from "../users/services/userServices.js";
import authProvider from "../auth/authProvider.js";
import CustomError from "../utils/customError.js";
import { createResetTokenAndSendEmail, resetPassword } from "../auth/services/resetPasswordService.js";
import { handleControllerError } from "../utils/errorsHandlers.js";

dotenv.config();

const REFRESH_SECRET = process.env.REFRESH_SECRET;
const { getUserById } = userServices;
const { createAccessToken, verifyToken } = authProvider;

export async function createAccessTokenController(req, res, next) {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			return next(new CustomError("No refresh token provided", 401, "AuthenticationError"));
		}
		const decoded = verifyToken(refreshToken, REFRESH_SECRET);
		const user = await getUserById(decoded.id);
		if (!user || user.refreshToken !== refreshToken) {
			return next(new CustomError("Invalid refresh token", 401, "AuthenticationError"));
		}
		const newAccessToken = createAccessToken(user);
		res.status(200).json({
			success: true,
			accessToken: newAccessToken,
		});
	} catch (error) {
		handleControllerError(error, next, "Failed to create access token");
	}
}

export async function forgotPasswordController(req, res, next) {
	try {
		const { email } = req.body;
		const baseUrl = `${req.protocol}://${req.get("host")}`;
		const result = await createResetTokenAndSendEmail(email, baseUrl);
		res.status(200).json({
			success: true,
			message: result.message || "Reset password email sent successfully",
		});
	} catch (error) {
		handleControllerError(error, next, "Failed to send reset password email");
	}
}

export async function resetPasswordController(req, res, next) {
	try {
		const { email, token, newPassword } = req.body;
		const result = await resetPassword(email, token, newPassword);
		res.status(200).json({
			success: true,
			message: result.message || "Password reset successfully",
		});
	} catch (error) {
		handleControllerError(error, next, "Failed to reset password");
	}
}

export async function logoutController(req, res, next) {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			return next(new CustomError("No refresh token provided", 401, "AuthenticationError"));
		}
		const decoded = verifyToken(refreshToken, REFRESH_SECRET);
		const user = await getUserById(decoded.id);
		if (!user || user.refreshToken !== refreshToken) {
			return next(new CustomError("Invalid refresh token", 401, "AuthenticationError"));
		}
		user.refreshToken = null;
		await user.save();
		res.clearCookie("refreshToken");
		res.status(200).json({
			success: true,
			message: "Logged out successfully",
		});
	} catch (error) {
		handleControllerError(error, next, "Failed to logout");
	}
}

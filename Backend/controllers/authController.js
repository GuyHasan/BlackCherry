import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userServices from "../users/services/userServices";
import { createAccessToken } from "../auth/jwt/createToken";
import CustomError from "../utils/customError.js";
import { createResetTokenAndSendEmail, resetPassword } from "../auth/services/resetPasswordService.js";

dotenv.config();

const REFRESH_SECRET = process.env.REFRESH_SECRET;
const { getUserById } = userServices;

export async function createAccessTokenController(req, res, next) {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			return next(new CustomError("No refresh token provided", 401, "AuthenticationError"));
		}
		const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
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
		return next(new CustomError(error.message || "Failed to refresh token", error.statusCode || 500, error.name || "Internal Server Error"));
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
		return next(new CustomError(error.message || "Failed to process forgot password request", error.statusCode || 500, error.name || "Internal Server Error"));
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
		return next(new CustomError(error.message || "Failed to reset password", error.statusCode || 500, error.name || "Internal Server Error"));
	}
}

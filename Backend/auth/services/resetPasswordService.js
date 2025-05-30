import crypto from "crypto";
import { handleServiceError } from "../../utils/handleServiceError.js";
import User from "../../users/models/mongoDB/userSchema.js";
import userServices from "../../users/services/userServices.js";
import { sendResetPasswordEmail } from "./emailService.js";
import { hashPassword } from "../../users/services/passwordsServices.js";
import CustomError from "../../utils/customError.js";

const RESET_TOKEN_EXPIRATION = 60 * 60 * 1000; // 1 hour

export const generateResetPasswordToken = async (email) => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		const resetToken = crypto.randomBytes(32).toString("hex");
		const expires = Date.now() + RESET_TOKEN_EXPIRATION;

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = expires;

		await user.save();
		return resetToken;
	} catch (error) {
		handleServiceError(error, "Failed to generate reset password token");
	}
};

export const createResetTokenAndSendEmail = async (email, baseUrl) => {
	try {
		const user = await userServices.findUserByEmail(email);
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		const resetToken = await generateResetPasswordToken(email);
		const resetLink = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
		await sendResetPasswordEmail(email, resetLink);
		return { message: "Reset password email sent successfully" };
	} catch (error) {
		handleServiceError(error, "Failed to create reset token and send email");
	}
};

export const resetPassword = async (email, token, newPassword) => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new CustomError("User not found", 404, "Not Found");
		}
		if (!user.resetPasswordToken || user.resetPasswordToken !== token || !user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
			throw new CustomError("Invalid or expired reset token", 400, "Bad Request");
		}
		const hashedPassword = await hashPassword(newPassword);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();
		return { message: "Password reset successfully" };
	} catch (error) {
		handleServiceError(error, "Failed to reset password");
	}
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CustomError from "../../utils/customError.js";
dotenv.config();

const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_SECRET = process.env.ACCESS_SECRET;

export function verifyRefreshToken(token) {
	try {
		const decoded = jwt.verify(token, REFRESH_SECRET);
		return decoded;
	} catch (err) {
		throw new CustomError("Invalid or expired token", 401, "TokenVerificationError");
	}
}

export function verifyAccessToken(token) {
	try {
		const decoded = jwt.verify(token, ACCESS_SECRET);
		return decoded;
	} catch (err) {
		throw new CustomError("Invalid or expired access token", 401, "TokenVerificationError");
	}
}

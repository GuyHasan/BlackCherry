import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET || process.env.SECRET_WORD;
const REFRESH_SECRET = process.env.REFRESH_SECRET || "very_secret_refresh_key";

const ACCESS_EXPIRES_IN = process.env.TOKEN_EXPIRATION_TIME || "15m";
const REFRESH_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRATION_TIME || "1d";

export function createAccessToken(user) {
	const payload = {
		id: user._id,
		isAdmin: user.isAdmin,
		isEmployee: user.isEmployee,
	};
	return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

export function createRefreshToken(user) {
	const payload = {
		id: user._id,
	};
	return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

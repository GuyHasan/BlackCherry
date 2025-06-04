import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

const AUTH_LIMIT = process.env.AUTH_LIMIT || 10;
const GLOBAL_LIMIT = process.env.GLOBAL_LIMIT || 100;

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: AUTH_LIMIT,
	message: {
		status: 429,
		error: "Too many login attempts, please try again later.",
	},
});

const globalLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: GLOBAL_LIMIT,
	message: {
		status: 429,
		error: "Too many requests, please try again later.",
	},
});

export { authLimiter, globalLimiter };

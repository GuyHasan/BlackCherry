import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10,
	message: {
		status: 429,
		error: "Too many login attempts, please try again later.",
	},
});

const globalLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 100,
	message: {
		status: 429,
		error: "Too many requests, please try again later.",
	},
});

export { authLimiter, globalLimiter };

import { verifyToken } from "../auth/jwt/jwtService.js";
import CustomError from "../utils/customError.js";

export default function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return next(new CustomError("Authentication token is missing", 401));
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = verifyToken(token);
		req.user = decoded;
		next();
	} catch (err) {
		return next(new CustomError("Invalid or expired token", 401));
	}
}

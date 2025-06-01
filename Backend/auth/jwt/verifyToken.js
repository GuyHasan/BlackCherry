import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CustomError from "../../utils/customError.js";
dotenv.config();

const SECRET_WORD = process.env.SECRET_WORD;

export function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, SECRET_WORD);
		return decoded;
	} catch (err) {
		throw new CustomError("Invalid or expired token", 401, "TokenVerificationError");
	}
}

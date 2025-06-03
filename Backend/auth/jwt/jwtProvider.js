import { createAccessToken, createRefreshToken } from "./createToken.js";
import { verifyAccessToken, verifyRefreshToken } from "./verifyToken.js";

const jwtProvider = {
	createAccessToken,
	createRefreshToken,
	verifyRefreshToken,
	verifyAccessToken,
};

export default jwtProvider;

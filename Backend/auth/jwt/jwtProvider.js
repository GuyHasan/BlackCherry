import { createAccessToken, createRefreshToken } from "./createToken.js";
import { verifyToken } from "./verifyToken.js";

const jwtProvider = {
	createAccessToken,
	createRefreshToken,
	verifyToken,
};

export default jwtProvider;

import { createAccessToken, createRefreshToken } from "./createToken";
import { verifyToken } from "./verifyToken";

const jwtProvider = {
	createAccessToken,
	createRefreshToken,
	verifyToken,
};

export default jwtProvider;

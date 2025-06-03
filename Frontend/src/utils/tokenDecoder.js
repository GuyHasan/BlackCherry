import jwt_decode from "jwt-decode";

const method = import.meta.env.VITE_TOKEN_DECODE_METHOD || "jwt";

export function decodeToken(token) {
	switch (method) {
		case "jwt":
			return jwt_decode(token);
		default:
			throw new Error(`Unknown token decode method: ${method}`);
	}
}

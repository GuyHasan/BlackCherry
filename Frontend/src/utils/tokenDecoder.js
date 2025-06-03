import { jwtDecode } from "jwt-decode";

const method = import.meta.env.VITE_TOKEN_DECODE_METHOD || "jwt";

const decodeToken = (token) => {
	switch (method) {
		case "jwt":
			return jwtDecode(token);
		default:
			throw new Error(`Unknown token decode method: ${method}`);
	}
};

export default decodeToken;

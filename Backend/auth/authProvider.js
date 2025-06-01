import config from "config";
import jwtProvider from "./jwt/jwtProvider.js";

const providerType = config.get("AUTH_PROVIDER");

let authProvider;

switch (providerType) {
	case "jwt":
		authProvider = jwtProvider;
		break;
	default:
		throw new Error(`Unsupported auth provider: ${providerType}`);
}

export default authProvider;

import dotenv from "dotenv";
import CustomError from "../utils/customError.js";
import cloundryServices from "./uploadClouds/cloudinaryService.js";
dotenv.config();

const provider = process.env.CLOUD_PROVIDER;
if (!provider) {
	throw new CustomError("CLOUD_PROVIDER is not set in environment variables", 500, "Configuration Error");
}
let cloudService;

switch (provider) {
	case "cloudinary":
		cloudService = cloundryServices;
		break;

	default:
		throw new CustomError(`Invalid cloud provider: ${provider}`, 400, "Configuration Error");
}

export default cloudService;

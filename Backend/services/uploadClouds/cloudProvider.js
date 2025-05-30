import dotenv from "dotenv";
import cloundryServices from "./cloudinaryService.js";
import CustomError from "../../utils/customError.js";
dotenv.config();

const provider = process.env.CLOUD_PROVIDER;
if (!provider) {
	throw new Error("CLOUD_PROVIDER environment variable is not set");
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

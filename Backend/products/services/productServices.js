import CustomError from "../../utils/customError.js";
import mongoService from "./mongoDB/mongoService.js";
import config from "config";

const dbType = config.get("DB");
let productService;

switch (dbType) {
	case "MongoDB":
		productService = mongoService;
		break;
	default:
		throw new CustomError(`Invalid database type: ${dbType}`, 400, "Configuration Error");
}

export default productService;

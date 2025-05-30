import CustomError from "../../utils/customError.js";
import mongoService from "./mongoDB/mongoService.js";
import config from "config";

const dbType = config.get("DB");
let userServices;

switch (dbType) {
	case "MongoDB":
		userServices = mongoService;
		break;
	default:
		throw new CustomError(`Invalid database type: ${dbType}`, 400, "Configuration Error");
}

export default userServices;

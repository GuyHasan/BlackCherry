import CustomError from "../customError.js";
import morganLogger from "./loggers/morganLogger.js";
import config from "config";

const logger = config.get("LOGGER");
let loggerMiddleware;

switch (logger) {
	case "morgan":
		loggerMiddleware = morganLogger;
		break;
	default:
		throw new CustomError(`Logger ${logger} is not supported`, 500, "LoggerError");
}

export default loggerMiddleware;

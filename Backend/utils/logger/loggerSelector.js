import morganLogger from "./loggers/morganLogger.js";
import config from "config";

const logger = config.get("LOGGER");
let loggerMiddleware;

const loggerSelector = () => {
	switch (logger) {
		case "morgan":
			loggerMiddleware = morganLogger;
		default:
			return (req, res, next) => next();
	}
};

export default loggerMiddleware;

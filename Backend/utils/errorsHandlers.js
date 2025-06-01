import CustomError from "./customError.js";

export function handleServiceError(err, defaultMessage) {
	if (err instanceof CustomError) {
		throw err;
	}
	throw new CustomError(err.message || defaultMessage, err.statusCode || 500, err.name || "ServiceError");
}

export function handleControllerError(err, next, defaultMessage) {
	if (err instanceof CustomError) {
		return next(err);
	}
	return next(new CustomError(err.message || defaultMessage, err.statusCode || 500, err.name || "ControllerError"));
}

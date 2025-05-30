import CustomError from "./customError";

export function handleServiceError(error, defaultMessage) {
	throw new CustomError(error.message || defaultMessage, error.statusCode || 500, error.name || "Internal Server Error");
}

class CustomError extends Error {
	constructor(message, statusCode = 500, name = "CustomError") {
		super(message);
		this.status = statusCode;
		this.name = name;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default CustomError;

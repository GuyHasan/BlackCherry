import CustomError from "../utils/customError.js";
import validators from "../validation/validator.js";

export function validateRequest(schemaName) {
	return (req, res, next) => {
		const schemaValidator = validators[schemaName];
		if (!schemaValidator) {
			return next(new CustomError("Validator not found", 500, "Internal Server Error"));
		}

		const { error } = schemaValidator(req.body);
		if (error) {
			const errorMessage = error.details.map((detail) => detail.message).join(", ");
			return next(new CustomError(`${errorMessage}`, 400, "Validation Error"));
		}
		next();
	};
}

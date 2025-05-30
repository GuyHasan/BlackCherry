import CustomError from "../utils/customError.js";
import joiValidators from "./joi/joiValidators.js";
import config from "config";

const validatorType = config.get("VALIDATOR");

let validators;

switch (validatorType) {
	case "joi":
		validators = joiValidators;
		break;
	default:
		throw new CustomError(`Invalid validator type: ${validatorType}`, 400, "Configuration Error");
}

export default validators;

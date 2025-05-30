import { validateForgotPassword, validateLogin, validateRegister, validateResetPassword } from "./userValidator.js";
import { validateProduct } from "./productValidator.js";
import { validateCreateImage, validateImage } from "./imageValidator.js";

const joiValidators = {
	registerUser: validateRegister,
	loginUser: validateLogin,
	forgotPassword: validateForgotPassword,
	resetPassword: validateResetPassword,
	product: validateProduct,
	image: validateImage,
	createImage: validateCreateImage,
};

export default joiValidators;

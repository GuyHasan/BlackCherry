import { validateForgotPassword, validateLogin, validateRegister, validateResetPassword } from "./userValidator.js";
import { validateEditProduct, validateProduct } from "./productValidator.js";

const joiValidators = {
	registerUser: validateRegister,
	loginUser: validateLogin,
	forgotPassword: validateForgotPassword,
	resetPassword: validateResetPassword,
	product: validateProduct,
};

export default joiValidators;

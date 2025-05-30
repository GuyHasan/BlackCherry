import Joi from "joi";

const userSchema = Joi.object({
	username: Joi.string()
		.pattern(/^[a-zA-Z0-9]+$/)
		.min(3)
		.max(20)
		.trim()
		.required()
		.messages({
			"string.base": "Username חייב להיות מחרוזת",
			"string.pattern.base": "שם המשתמש יכול להכיל רק אותיות באנגלית ומספרים, ללא תווים מיוחדים או עברית",
			"string.empty": "Username הוא שדה חובה",
			"string.min": "Username חייב להכיל לפחות 3 תווים",
			"string.max": "Username יכול להכיל עד 20 תווים",
			"any.required": "Username הוא שדה חובה",
		}),

	email: Joi.string().email().lowercase().trim().required().messages({
		"string.email": "כתובת המייל אינה תקינה",
		"string.empty": "מייל הוא שדה חובה",
		"any.required": "מייל הוא שדה חובה",
	}),

	password: Joi.string()
		.min(8)
		.pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){4,})(?=.*[)!@%$#\^&*\-_\(\)]).*$/))
		.required()
		.messages({
			"string.pattern.base": "הסיסמה חייבת להכיל לפחות אות אחת גדולה, אות קטנה, 4 ספרות, ותו מיוחד",
			"string.min": "הסיסמה חייבת להכיל לפחות 8 תווים",
			"string.empty": "סיסמה היא שדה חובה",
			"any.required": "סיסמה היא שדה חובה",
		}),

	Employee: Joi.boolean().default(false),

	Admin: Joi.boolean().default(false),

	favorites: Joi.array()
		.items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
		.unique()
		.messages({
			"array.base": "המועדפים חייבים להיות מערך של מזהי מוצרים תקינים",
			"array.items": "כל פריט במועדפים חייב להיות מזהה מוצר תקין",
			"array.unique": "המועדפים לא יכולים להכיל פריטים כפולים",
		}),
});

const loginSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"string.email": "אימייל לא תקין",
			"string.empty": "אימייל הוא שדה חובה",
			"any.required": "אימייל הוא שדה חובה",
		}),
	password: Joi.string().required().messages({
		"string.empty": "סיסמה היא שדה חובה",
		"any.required": "סיסמה היא שדה חובה",
	}),
});

export function validateRegister(userData) {
	return userSchema.validate(userData, { abortEarly: false });
}

export function validateLogin(data) {
	return loginSchema.validate(data, { abortEarly: false });
}

export const validateForgotPassword = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			"string.email": "Invalid email format",
			"any.required": "Email is required",
			"string.empty": "Email cannot be empty",
		}),
	});
	return schema.validate(data, { abortEarly: false });
};

export const validateResetPassword = (data) => {
	const schema = Joi.object({
		newPassword: Joi.string()
			.min(8)
			.pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){4,})(?=.*[)!@%$#\^&*\-_\(\)]).*$/))
			.required()
			.messages({
				"string.pattern.base": "הסיסמה חייבת להכיל לפחות אות אחת גדולה, אות קטנה, 4 ספרות, ותו מיוחד",
				"string.min": "הסיסמה חייבת להכיל לפחות 8 תווים",
				"string.empty": "סיסמה היא שדה חובה",
				"any.required": "סיסמה היא שדה חובה",
			}),
	});
	return schema.validate(data, { abortEarly: false });
};

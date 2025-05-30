import Joi from "joi";

const allowedCategories = ["בשרי", "חלבי", "קינוחים", "מגשים", "סלטים", "תוספות", "טבעוני"];
const allowedSubCategories = ["חלבי", "פרווה", "טבעוני"];
const allowedUnits = ["kg", "g", "L", "יחידות"];

const sizeSchema = Joi.object({
	quantity: Joi.number().required().min(0),
	price: Joi.number().required().min(0),
});

const productSchema = Joi.object({
	name: Joi.string().min(3).max(100).required(),
	description: Joi.string().min(10).required(),
	category: Joi.string()
		.valid(...allowedCategories)
		.required(),
	subCategory: Joi.when("category", {
		is: "קינוחים",
		then: Joi.string()
			.valid(...allowedSubCategories)
			.required(),
		otherwise: Joi.forbidden(),
	}),
	size: Joi.array().items(sizeSchema).min(1).required(),
	unit: Joi.string()
		.valid(...allowedUnits)
		.required(),
	popularity: Joi.number().integer().min(0).default(0),
	imageUrl: Joi.string().uri().required(),
});

export function validateProduct(productData) {
	return productSchema.validate(productData, { abortEarly: false });
}

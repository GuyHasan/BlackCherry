import Joi from "joi";
import { categories } from "../../config/constants/categories.js";

const allowedCategories = categories.map((category) => category.key);
const subCategoriesByCategory = categories.reduce((acc, category) => {
	acc[category.key] = (category.subCategories || []).map((sc) => sc.key);
	return acc;
}, {});
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
	subCategory: Joi.any().custom((value, helpers) => {
		const chosenCategory = helpers.state.ancestors[0].category;
		const validSubs = subCategoriesByCategory[chosenCategory] || [];
		if (validSubs.length === 0) {
			if (value !== undefined && value !== null && value !== "") {
				return helpers.error("any.invalid", { message: "קטגוריה זו אינה תומכת בתת־קטגוריה" });
			}
			return value;
		}
		if (value === undefined || value === null || value === "") {
			return helpers.error("any.required", { message: "חובה לבחור תת־קטגוריה עבור קטגוריה זו" });
		}
		if (!validSubs.includes(value)) {
			return helpers.error("any.invalid", { message: "תת־קטגוריה לא תואמת לקטגוריה" });
		}
		return value;
	}),
	size: Joi.array().items(sizeSchema).min(1).required(),
	unit: Joi.string()
		.valid(...allowedUnits)
		.required(),
	popularity: Joi.number().integer().min(0).default(0),
	image: Joi.object({
		url: Joi.string().uri().required(),
		alt: Joi.string().max(100).required(),
	}).required(),
});

export function validateProduct(productData) {
	return productSchema.validate(productData, { abortEarly: false });
}

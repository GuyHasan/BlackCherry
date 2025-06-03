import { categories } from "../config/constants/categories.js";

export const getCategoriesList = (req, res, next) => {
	try {
		return res.status(200).json(categories);
	} catch (err) {
		next(err);
	}
};

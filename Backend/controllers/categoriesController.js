// server/controllers/categoriesController.js

import { categories } from "../config/constants/categories";

export const getCategoriesList = (req, res, next) => {
	try {
		return res.status(200).json(categories);
	} catch (err) {
		next(err);
	}
};

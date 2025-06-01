import mongoose from "mongoose";
import { categories } from "../../../config/constants/categories.js";

const categoryEnum = categories.map((category) => category.he);
const subCategoryEnum = [...new Set(categories.flatMap((c) => c.subCategories.map((sc) => sc.key)))];

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 3,
		maxlength: 100,
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 10,
	},
	category: {
		type: String,
		required: true,
		enum: categoryEnum,
	},
	subCategory: {
		type: String,
		enum: subCategoryEnum,
	},
	size: [
		{
			quantity: {
				type: Number,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
	unit: {
		type: String,
		required: true,
		enum: ["kg", "g", "L", "יחידות"],
	},
	popularity: {
		type: Number,
		default: 0,
		min: 0,
	},
	imageUrl: {
		type: String,
		required: true,
		trim: true,
		match: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i,
	},
});

const Product = mongoose.model("Product", productSchema);

export default Product;

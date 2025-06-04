import productService from "../products/services/productServices.js";
import CustomError from "../utils/customError.js";
import { handleControllerError } from "../utils/errorsHandlers.js";
import { categories } from "../config/constants/categories.js";

const { getAllProducts, getProductById, createProduct, editProduct, deleteProduct } = productService;

export const getAllProductsController = async (req, res, next) => {
	try {
		const { search, category, subCategory, minPrice, maxPrice, sort, page = 1, limit = 50 } = req.query;

		const pageNum = Number(page) >= 1 ? Number(page) : 1;
		const limitNum = Number(limit) >= 1 ? Number(limit) : 20;
		const minPriceNum = minPrice ? Number(minPrice) : undefined;
		const maxPriceNum = maxPrice ? Number(maxPrice) : undefined;
		const filter = {};
		if (search) {
			filter.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
		}
		if (category) {
			filter.category = category;
		}
		if (subCategory) {
			filter.subCategory = subCategory;
		}
		if (minPriceNum !== undefined || maxPriceNum !== undefined) {
			filter.price = {};
			if (minPriceNum !== undefined) filter.price.$gte = minPriceNum;
			if (maxPriceNum !== undefined) filter.price.$lte = maxPriceNum;
		}
		let sortObj = { createdAt: -1 };
		if (sort) {
			const [field, order] = sort.split("_");
			sortObj = { [field]: order === "asc" ? 1 : -1 };
		}
		const skip = (pageNum - 1) * limitNum;
		const options = {
			sort: sortObj,
			skip,
			limit: limitNum,
		};
		const products = await getAllProducts(filter, options);
		res.status(200).json({ success: true, products });
	} catch (error) {
		handleControllerError(error, next, "Failed to retrieve products");
	}
};

export const getProductByIdController = async (req, res, next) => {
	try {
		const productId = req.params.id;
		const product = await getProductById(productId);
		res.status(200).json({ success: true, product });
	} catch (error) {
		handleControllerError(error, next, "Failed to retrieve product by ID");
	}
};

export const createProductController = async (req, res, next) => {
	try {
		if (!req.user.isEmployee && !req.user.isAdmin) {
			return next(new CustomError("You are not authorized to create a product", 403, "AuthorizationError"));
		}
		const newProduct = await createProduct(req.body);
		res.status(201).json({ success: true, product: newProduct });
	} catch (error) {
		handleControllerError(error, next, "Failed to create product");
	}
};

export const editProductController = async (req, res, next) => {
	try {
		const productId = req.params.id;
		if (!req.user.isEmployee && !req.user.isAdmin) {
			return next(new CustomError("You are not authorized to edit a product", 403, "AuthorizationError"));
		}
		const updatedFields = { ...req.body };
		const updatedProduct = await editProduct(productId, updatedFields);
		res.status(200).json({ success: true, product: updatedProduct });
	} catch (error) {
		handleControllerError(error, next, "Failed to edit product");
	}
};

export const deleteProductController = async (req, res, next) => {
	try {
		const productId = req.params.id;

		if (!req.user.isEmployee && !req.user.isAdmin) {
			return next(new CustomError("You are not authorized to delete a product", 403, "AuthorizationError"));
		}

		await deleteProduct(productId);
		res.status(200).json({ success: true, message: "Product deleted successfully" });
	} catch (error) {
		handleControllerError(error, next, "Failed to delete product");
	}
};

export const getMenuPreviewController = async (req, res, next) => {
	try {
		const previews = await Promise.all(
			categories.map(async (category) => {
				const { key: catKey, he: catHe, subCategories } = category;
				if (Array.isArray(subCategories) && subCategories.length > 0) {
					const subs = await Promise.all(
						subCategories.map(async (subCat) => {
							const result = await getAllProducts(
								{
									category: catKey,
									subCategory: subCat.key,
								},
								{
									sort: { createdAt: -1 },
									limit: 5,
								}
							);
							const productsArray = Array.isArray(result.data) ? result.data : [];
							return {
								key: subCat.key,
								he: subCat.he,
								products: productsArray,
							};
						})
					);
					return {
						key: catKey,
						he: catHe,
						subCategories: subs,
						products: [],
					};
				}
				const result = await getAllProducts(
					{
						category: catKey,
					},
					{
						sort: { createdAt: -1 },
						limit: 5,
					}
				);
				const productsArray = Array.isArray(result.data) ? result.data : [];
				return {
					key: catKey,
					he: catHe,
					subCategories: [],
					products: productsArray,
				};
			})
		);
		res.status(200).json({ success: true, data: previews });
	} catch (error) {
		handleControllerError(error, next, "Failed to load menu preview");
	}
};

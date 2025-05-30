import productService from "../products/services/productServices";
import CustomError from "../utils/customError.js";

const { getAllProducts, getProductById, getProductsByCategory, getProductsBySubCategory, createProduct, editProduct, deleteProduct } = productService;

export const getAllProductsController = async (req, res, next) => {
	try {
		const products = await getAllProducts();
		res.status(200).json({ success: true, products });
	} catch (error) {
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
	}
};

export const getProductByIdController = async (req, res, next) => {
	try {
		const productId = req.params.id;
		const product = await getProductById(productId);
		res.status(200).json({ success: true, product });
	} catch (error) {
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
	}
};

export const getProductsByCategoryController = async (req, res, next) => {
	try {
		const category = req.params.subCategory;
		const products = await getProductsByCategory({ category });
		res.status(200).json({ success: true, products });
	} catch (error) {
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
	}
};

export const getProductsBySubCategoryController = async (req, res, next) => {
	try {
		const subCategory = req.params.subCategory;
		const products = await getProductsBySubCategory({ subCategory });
		res.status(200).json({ success: true, products });
	} catch (error) {
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
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
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
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
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
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
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
	}
};

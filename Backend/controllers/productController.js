import productService from "../services/productService.js";
import CustomError from "../../utils/customError.js";

export const getAllProductsController = async (req, res, next) => {
	try {
		const products = await productService.getAllProducts();
		res.status(200).json({ success: true, products });
	} catch (error) {
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
	}
};

export const getProductByIdController = async (req, res, next) => {
	try {
		const productId = req.params.id;
		const product = await productService.getProductById(productId);
		res.status(200).json({ success: true, product });
	} catch (error) {
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
	}
};

export const createProductController = async (req, res, next) => {
	try {
		if (!req.user.isEmployee && !req.user.isAdmin) {
			return next(new CustomError("You are not authorized to create a product", 403, "AuthorizationError"));
		}
		const newProduct = await productService.createProduct(req.body);
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
		const updatedProduct = await productService.editProduct(productId, updatedFields);
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

		await productService.deleteProduct(productId);
		res.status(200).json({ success: true, message: "Product deleted successfully" });
	} catch (error) {
		next(new CustomError(error.message || "Internal server error", error.statusCode || 500, error.name || "ServerError"));
	}
};

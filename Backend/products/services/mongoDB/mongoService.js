import Product from "../../models/mongoDB/productSchema.js";
import { uploadImageToCloude } from "../../../services/uploadService.js";
import CustomError from "../../../utils/customError.js";

export const getProductById = async (productId) => {
	try {
		const product = await Product.findById(productId);
		if (!product) {
			throw new CustomError(`Product with ID ${productId} not found`, 404, "NotFoundError");
		}
		return product;
	} catch (error) {
		if (error instanceof CustomError) throw error;
		throw new CustomError(`Error fetching product by ID: ${error.message}`, 500, "ServerError");
	}
};

export const getAllProducts = async () => {
	try {
		const products = await Product.find();
		return products;
	} catch (error) {
		throw new CustomError(`Error fetching all products: ${error.message}`, 500, "ServerError");
	}
};

export const createProduct = async (productData) => {
	try {
		const newProduct = new Product(productFields);
		await newProduct.save();
		return newProduct;
	} catch (error) {
		if (error instanceof CustomError) throw error;
		throw new CustomError(`Error creating product: ${error.message}`, 500, "ServerError");
	}
};

export const editProduct = async (productId, updatedFields) => {
	try {
		const product = await Product.findById(productId);
		if (!product) {
			throw new CustomError(`Product with ID ${productId} not found`, 404, "NotFoundError");
		}
		Object.assign(product, updatedFields);
		await product.save();
		return product;
	} catch (error) {
		if (error instanceof CustomError) throw error;
		throw new CustomError(`Error editing product: ${error.message}`, 500, "ServerError");
	}
};

export const deleteProduct = async (productId) => {
	try {
		const product = await Product.findById(productId);
		if (!product) {
			throw new CustomError(`Product with ID ${productId} not found`, 404, "NotFoundError");
		}
		await Product.findByIdAndDelete(productId);
	} catch (error) {
		if (error instanceof CustomError) throw error;
		throw new CustomError(`Error deleting product: ${error.message}`, 500, "ServerError");
	}
};

const mongoService = {
	getProductById,
	getAllProducts,
	createProduct,
	editProduct,
	deleteProduct,
};

export default mongoService;

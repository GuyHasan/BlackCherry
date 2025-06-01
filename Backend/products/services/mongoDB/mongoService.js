import Product from "../../models/mongoDB/productSchema.js";
import CustomError from "../../../utils/customError.js";
import { handleServiceError } from "../../../utils/errorsHandlers.js";

const getProductById = async (productId) => {
	try {
		const product = await Product.findById(productId);
		if (!product) {
			throw new CustomError(`Product with ID ${productId} not found`, 404, "NotFoundError");
		}
		return product;
	} catch (error) {
		handleServiceError(error, `Error retrieving product by ID ${productId}`);
	}
};

const getAllProducts = async (filter, options) => {
	try {
		const totalCount = await Product.countDocuments(filter);

		const products = await Product.find(filter).sort(options.sort).skip(options.skip).limit(options.limit).lean();

		const totalPages = Math.ceil(totalCount / options.limit);
		const currentPage = Math.floor(options.skip / options.limit) + 1;

		return {
			data: products,
			meta: {
				totalCount,
				totalPages,
				currentPage,
			},
		};
	} catch (error) {
		handleServiceError(error, "Error retrieving all products");
	}
};

const createProduct = async (productData) => {
	try {
		const newProduct = new Product(productFields);
		await newProduct.save();
		return newProduct;
	} catch (error) {
		if (error instanceof CustomError) throw error;
		handleServiceError(error, "Error creating product");
	}
};

const editProduct = async (productId, updatedFields) => {
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
		handleServiceError(error, `Error editing product with ID ${productId}`);
	}
};

const deleteProduct = async (productId) => {
	try {
		const product = await Product.findById(productId);
		if (!product) {
			throw new CustomError(`Product with ID ${productId} not found`, 404, "NotFoundError");
		}
		await Product.findByIdAndDelete(productId);
	} catch (error) {
		if (error instanceof CustomError) throw error;
		handleServiceError(error, `Error deleting product with ID ${productId}`);
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

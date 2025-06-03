import api from "./api";

const getAllProducts = async () => {
	try {
		const res = await api.get("/products");
		return res.data;
	} catch (error) {
		throw error;
	}
};

const getProductById = async (id) => {
	try {
		const res = await api.get(`/products/${id}`);
		return res.data;
	} catch (error) {
		throw error;
	}
};

const createProduct = async (productData) => {
	try {
		const res = await api.post("/products", productData);
		return res.data;
	} catch (error) {
		throw error;
	}
};

const deleteProduct = async (id) => {
	try {
		const res = await api.delete(`/products/${id}`);
		return res.data;
	} catch (error) {
		throw error;
	}
};

const getMenuPreviewProducts = async () => {
	try {
		const res = await api.get("/products/menu-preview");
		return res.data.data;
	} catch (error) {
		throw error;
	}
};

const getProductsByCategory = async (categoryKey) => {
	try {
		const res = await api.get(`/products?category=${categoryKey}`);
		return res.data;
	} catch (error) {
		throw error;
	}
};

const getProductsBySubCategory = async (categoryKey, subKey) => {
	try {
		const res = await api.get(`/products?category=${categoryKey}&subCategory=${subKey}`);
		return res.data;
	} catch (error) {
		throw error;
	}
};

const productService = {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProduct,
	getMenuPreviewProducts,
	getProductsByCategory,
	getProductsBySubCategory,
};

export default productService;

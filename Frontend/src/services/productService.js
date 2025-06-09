import api from "./api";

const getAllProducts = async () => {
	try {
		const res = await api.get("/products");
		return res.data.products;
	} catch (error) {
		throw error;
	}
};

export const getProducts = async ({ page = 1, limit = 10, search = "" }) => {
	try {
		const params = new URLSearchParams();
		params.append("page", page);
		params.append("limit", limit);
		if (search) {
			params.append("search", search);
		}
		const res = await api.get(`/products?${params.toString()}`);
		return res.data;
	} catch (error) {
		throw error;
	}
};

const getProductById = async (id) => {
	try {
		const res = await api.get(`/products/${id}`);
		return res.data.product;
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

const editProduct = async (id, productData) => {
	try {
		const res = await api.put(`/products/${id}`, productData);
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
		return res.data.products;
	} catch (error) {
		throw error;
	}
};

const getProductsBySubCategory = async (categoryKey, subKey) => {
	try {
		const res = await api.get(`/products?category=${categoryKey}&subCategory=${subKey}`);
		return res.data.products;
	} catch (error) {
		throw error;
	}
};

const productService = {
	getAllProducts,
	getProductById,
	getProducts,
	createProduct,
	deleteProduct,
	editProduct,
	getMenuPreviewProducts,
	getProductsByCategory,
	getProductsBySubCategory,
};

export default productService;

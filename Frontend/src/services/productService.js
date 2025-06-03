import api from "./api";

const getAllProducts = async () => {
	const res = await api.get("/products");
	return res.data;
};

const getProductById = async (id) => {
	const res = await api.get(`/products/${id}`);
	return res.data;
};

const createProduct = async (productData) => {
	const res = await api.post("/products", productData);
	return res.data;
};

const deleteProduct = async (id) => {
	const res = await api.delete(`/products/${id}`);
	return res.data;
};

const getMenuPreviewProducts = async () => {
	const res = await api.get("/products/menu-preview");
	return res.data.data;
};

const getProductsByCategory = async (categoryKey) => {
	const res = await api.get(`/products?category=${categoryKey}`);
	return res.data;
};

const getProductsBySubCategory = async (categoryKey, subKey) => {
	const res = await api.get(`/products?category=${categoryKey}&subCategory=${subKey}`);
	return res.data;
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

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

const productService = {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProduct,
};

export default productService;

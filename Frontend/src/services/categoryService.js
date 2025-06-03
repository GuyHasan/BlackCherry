import api from "./api";

const getCategories = async () => {
	const res = await api.get("/products/category");
	return res.data;
};

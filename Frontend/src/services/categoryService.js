import api from "./api";
const getCategories = async () => {
	try {
		const res = await api.get("/products/category");
		return res.data;
	} catch (error) {
		throw error;
	}
};

export default {
	getCategories,
};

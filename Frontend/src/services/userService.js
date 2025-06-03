// src/services/userService.js
import api from "./api";

const login = async ({ email, password }) => {
	const { data } = await api.post("/users/login", { email, password });
	return data;
};

const register = async (userData) => {
	const { data } = await api.post("/users/register", userData);
	return data;
};

const getUserById = async (userId) => {
	const { data } = await api.get(`/users/${userId}`);
	return data;
};

const getAllUsers = async () => {
	const { data } = await api.get("/users");
	return data;
};

const deleteUser = async (userId) => {
	const { data } = await api.delete(`/users/${userId}`);
	return data;
};

const updateEmployeeStatus = async (userId) => {
	const { data } = await api.patch(`/users/employee/${userId}`);
	return data;
};

const toggleFavoriteProduct = async (productId) => {
	const { data } = await axios.post("/users/favorite-products", { productId });
	return data;
};

export default {
	login,
	register,
	getUserById,
	getAllUsers,
	deleteUser,
	updateEmployeeStatus,
	toggleFavoriteProduct,
};

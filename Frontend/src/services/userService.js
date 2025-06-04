// src/services/userService.js
import api from "./api";

const login = async ({ email, password }) => {
	try {
		const { data } = await api.post("/users/login", { email, password }, { skipRefresh: true });
		return data;
	} catch (error) {
		throw error;
	}
};

const register = async (userData) => {
	try {
		const { data } = await api.post("/users/register", userData);
		return data;
	} catch (error) {
		throw error;
	}
};

const getUserById = async (userId) => {
	try {
		const { data } = await api.get(`/users/${userId}`);
		return data;
	} catch (error) {
		throw error;
	}
};

const getAllUsers = async () => {
	try {
		const { data } = await api.get("/users");
		return data;
	} catch (error) {
		throw error;
	}
};

const deleteUser = async (userId) => {
	try {
		const { data } = await api.delete(`/users/${userId}`);
		return data;
	} catch (error) {
		throw error;
	}
};

const updateEmployeeStatus = async (userId) => {
	try {
		const { data } = await api.patch(`/users/employee/${userId}`);
		return data;
	} catch (error) {
		throw error;
	}
};

const toggleFavoriteProduct = async (productId) => {
	try {
		const { data } = await api.post("/users/favorite-products", { productId });
		return data;
	} catch (error) {
		throw error;
	}
};

const getUserFavorites = async () => {
	try {
		const { data } = await api.get("/users/favorite-products");
		return data.favorites;
	} catch (error) {
		throw error;
	}
};

export default {
	login,
	register,
	getUserById,
	getAllUsers,
	deleteUser,
	updateEmployeeStatus,
	toggleFavoriteProduct,
	getUserFavorites,
};

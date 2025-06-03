import api from "./api";

const logout = async () => {
	try {
		await api.post("/auth/logout");
	} catch (error) {
		throw error;
	}
};

const refreshAccessToken = async () => {
	try {
		const { data } = await api.post("/auth/refresh");
		return data;
	} catch (error) {
		throw error;
	}
};

export default {
	logout,
	refreshAccessToken,
};

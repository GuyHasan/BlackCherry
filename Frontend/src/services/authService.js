import api from "./api";

const logout = async () => {
	await api.post("/auth/logout");
};

const refreshAccessToken = async () => {
	const { data } = await api.post("/auth/refresh");
	return data;
};

export default {
	logout,
	refreshAccessToken,
};

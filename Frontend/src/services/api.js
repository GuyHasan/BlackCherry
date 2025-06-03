import axios from "axios";
import { clearUserState, logoutThunk, refreshThunk } from "../redux/slices/userSlice";

let storeDispatch = null;
export const injectStoreDispatch = (dispatch) => {
	storeDispatch = dispatch;
};

const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8181/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach(({ resolve, reject }) => {
		if (error) reject(error);
		else resolve(token);
	});
	failedQueue = [];
};

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const status = error.response?.status;
		if (originalRequest?.skipRefresh) {
			return Promise.reject(error);
		}

		if (status === 403) {
			console.log("403 detected, clearing user state");
			if (storeDispatch) {
				storeDispatch(clearUserState());
			}
			return Promise.reject(error);
		}

		if (status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers["Authorization"] = "Bearer " + token;
						return axios(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			isRefreshing = true;

			try {
				const resultAction = await storeDispatch(refreshThunk());
				if (refreshThunk.fulfilled.match(resultAction)) {
					const newToken = resultAction.payload;
					originalRequest.headers["Authorization"] = "Bearer " + newToken;
					processQueue(null, newToken);
					return axios(originalRequest);
				} else {
					throw new Error("Failed to refresh token");
				}
			} catch (err) {
				processQueue(err, null);
				if (storeDispatch) {
					storeDispatch(clearUserState());
					storeDispatch(logoutThunk());
				}
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default api;

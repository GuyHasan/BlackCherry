import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import authService from "../../services/authService";
import api from "../../services/api";
import decodeToken from "../../utils/tokenDecoder";

export const loginThunk = createAsyncThunk("user/login", async ({ email, password }, thunkAPI) => {
	try {
		const { accessToken } = await userService.login({ email, password });
		const { id, isAdmin, isEmployee } = decodeToken(accessToken);
		const user = { id, isAdmin, isEmployee };
		api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
		return { user, accessToken };
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const registerThunk = createAsyncThunk("user/register", async (userData, thunkAPI) => {
	try {
		const { user } = await userService.register(userData);
		return { user };
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const getUserByIdThunk = createAsyncThunk("user/getUserById", async (_, thunkAPI) => {
	try {
		const state = thunkAPI.getState();
		const userId = state.user.user?.id;
		if (!userId) throw new Error("No user ID available in state");
		const user = await userService.getUserById(userId);
		return user;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const getAllUsersThunk = createAsyncThunk("user/getAllUsers", async (_, thunkAPI) => {
	try {
		const users = await userService.getAllUsers();
		return users;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const refreshThunk = createAsyncThunk("user/refreshToken", async (_, thunkAPI) => {
	try {
		const { accessToken } = await authService.refreshAccessToken();
		api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
		const decodedToken = decodeToken(accessToken);
		const { id, isAdmin, isEmployee } = decodedToken;
		const user = await userService.getUserById(id);
		return { accessToken, user, isAdmin, isEmployee };
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const logoutThunk = createAsyncThunk("user/logout", async (_, thunkAPI) => {
	try {
		await authService.logout();
		delete api.defaults.headers.common["Authorization"];
		return;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const deleteUserThunk = createAsyncThunk("user/deleteUser", async (userId, thunkAPI) => {
	try {
		await userService.deleteUser(userId);
		return userId;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const updateEmployeeStatusThunk = createAsyncThunk("user/updateEmployeeStatus", async ({ userId, newStatus }, thunkAPI) => {
	try {
		const updated = await userService.updateEmployeeStatus(userId, newStatus);
		return updated;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

const initialState = {
	user: null,
	accessToken: null,
	loading: false,
	error: null,
	isAuthenticated: false,
	isAdmin: false,
	isEmployee: false,
	userList: [],
	userListLoading: false,
	userListError: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearError(state) {
			state.error = null;
		},
		clearUserState: (state) => {
			state.user = null;
			state.accessToken = null;
			state.loading = false;
			state.error = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		const setLoading = (state) => {
			state.loading = true;
			state.error = null;
		};
		const setError = (state, action) => {
			state.loading = false;
			state.error = action.payload || action.error.message;
			state.isAuthenticated = false;
		};
		builder
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				state.isAdmin = action.payload.user.isAdmin;
				state.isEmployee = action.payload.user.isEmployee;
				state.isAuthenticated = true;
			})
			.addCase(registerThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				state.isAdmin = action.payload.user.isAdmin;
				state.isEmployee = action.payload.user.isEmployee;
				state.isAuthenticated = true;
			})
			.addCase(getUserByIdThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(refreshThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.accessToken = action.payload.accessToken;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.isAdmin = action.payload.isAdmin;
				state.isEmployee = action.payload.isEmployee;
			})
			.addCase(logoutThunk.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.accessToken = null;
				state.isAuthenticated = false;
				state.isAdmin = false;
				state.isEmployee = false;
			})
			.addCase(deleteUserThunk.fulfilled, (state, action) => {
				state.userList = state.userList.filter((user) => user._id !== action.payload._id);
			})
			.addCase(updateEmployeeStatusThunk.fulfilled, (state, action) => {
				const updatedUser = action.payload;
				const index = state.userList.findIndex((user) => user._id === updatedUser._id);
				if (index !== -1) {
					state.userList[index] = updatedUser;
				}
			})
			.addCase(getAllUsersThunk.pending, (state) => {
				state.userListLoading = true;
				state.userListError = null;
			})
			.addCase(getAllUsersThunk.fulfilled, (state, action) => {
				state.userListLoading = false;
				state.userList = action.payload;
			})
			.addCase(getAllUsersThunk.rejected, (state, action) => {
				state.userListLoading = false;
				state.userListError = action.payload || action.error.message;
			})
			.addMatcher(isAnyOf(loginThunk.pending, registerThunk.pending, getUserByIdThunk.pending, refreshThunk.pending, logoutThunk.pending, deleteUserThunk.pending, updateEmployeeStatusThunk.pending), setLoading)
			.addMatcher(isAnyOf(loginThunk.rejected, registerThunk.rejected, getUserByIdThunk.rejected, refreshThunk.rejected, logoutThunk.rejected, deleteUserThunk.rejected, updateEmployeeStatusThunk.rejected), setError);
	},
});

export const { clearError, clearUserState } = userSlice.actions;
export default userSlice.reducer;

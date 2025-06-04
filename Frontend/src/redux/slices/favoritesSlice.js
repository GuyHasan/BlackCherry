import userService from "../../services/userService";
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";

export const getUserFavorites = createAsyncThunk("user/getUserFavorites", async (_, { getState, rejectWithValue }) => {
	try {
		const favorites = await userService.getUserFavorites();
		const favoritesIdList = favorites.map((prod) => prod._id) || [];
		return { favorites, favoritesIdList };
	} catch (error) {
		return rejectWithValue(error.response?.data || error.message);
	}
});

export const toggleFavorite = createAsyncThunk("user/toggleFavorite", async (productId, { rejectWithValue, dispatch }) => {
	try {
		const response = await userService.toggleFavoriteProduct(productId);
		dispatch(getUserFavorites());
		return response.favorites;
	} catch (err) {
		return rejectWithValue(err.message || "שגיאה בשמירה למועדפים");
	}
});

const initalState = {
	favorites: [],
	favoritesIdList: [],
	status: "idle",
	error: null,
};

const favoritesSlice = createSlice({
	name: "favorites",
	initialState: initalState,
	reducers: {
		resetFavoritesState: (state) => {
			state.favorites = [];
			state.favoritesIdList = [];
			state.loading = false;
			state.error = null;
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
		};
		builder
			.addCase(toggleFavorite.pending, (state) => {
				state.status = "loading";
			})
			.addCase(toggleFavorite.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.favoritesIdList = action.payload;
			})
			.addCase(toggleFavorite.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(getUserFavorites.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getUserFavorites.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.favorites = action.payload.favorites;
				state.favoritesIdList = action.payload.favoritesIdList;
			})
			.addCase(getUserFavorites.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addMatcher(isAnyOf(toggleFavorite.pending, getUserFavorites.pending), setLoading)
			.addMatcher(isAnyOf(toggleFavorite.rejected, getUserFavorites.rejected), setError);
	},
});

export const { resetFavoritesState } = favoritesSlice.actions;
export default favoritesSlice.reducer;

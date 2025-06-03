import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";

export const fetchCategoryProducts = createAsyncThunk("category/fetchProducts", async (categoryKey, thunkAPI) => {
	try {
		const res = await productService.getProductsByCategory(categoryKey);
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const fetchSubCategoryProducts = createAsyncThunk("category/fetchSubProducts", async ({ categoryKey, subKey }, thunkAPI) => {
	try {
		const res = await productService.getProductsBySubCategory(categoryKey, subKey);
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
	}
});

const categorySlice = createSlice({
	name: "category",
	initialState: {
		products: [],
		loading: false,
		error: null,
	},
	reducers: {
		clearCategory: (state) => {
			state.products = [];
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategoryProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchCategoryProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(fetchSubCategoryProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSubCategoryProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchSubCategoryProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { clearCategory } = categorySlice.actions;
export default categorySlice.reducer;

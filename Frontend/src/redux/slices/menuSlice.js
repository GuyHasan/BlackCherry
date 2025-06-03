// src/redux/slices/menuSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";

export const loadMenuPreview = createAsyncThunk("menu/loadPreview", async (_, thunkAPI) => {
	try {
		const data = await productService.getMenuPreviewProducts();
		return data;
	} catch (err) {
		const message = err.response?.data?.message || err.message;
		return thunkAPI.rejectWithValue(message);
	}
});

const menuSlice = createSlice({
	name: "menu",
	initialState: {
		menuPreview: [],
		loading: false,
		error: null,
	},
	reducers: {
		clearMenu: (state) => {
			state.menuPreview = [];
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadMenuPreview.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadMenuPreview.fulfilled, (state, action) => {
				state.loading = false;
				state.menuPreview = action.payload;
			})
			.addCase(loadMenuPreview.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { clearMenu } = menuSlice.actions;
export default menuSlice.reducer;

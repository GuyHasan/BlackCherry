import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const getAllProducts = createAsyncThunk("products/getAllProducts", async (_, thunkAPI) => {
	try {
		return await productService.getAllProducts();
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const getProductById = createAsyncThunk("products/getProductById", async (id, thunkAPI) => {
	try {
		return await productService.getProductById(id);
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const createProduct = createAsyncThunk("products/createProduct", async (data, thunkAPI) => {
	try {
		return await productService.createProduct(data);
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, thunkAPI) => {
	try {
		await productService.deleteProduct(id);
		return id;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
	}
});

const initialState = {
	products: [],
	product: null,
	loading: false,
	error: null,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getProductById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload;
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter((product) => product.id !== action.payload);
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

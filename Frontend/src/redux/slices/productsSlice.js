import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";

export const getAllProducts = createAsyncThunk("products/getAllProducts", async (_, thunkAPI) => {
	try {
		return await productService.getAllProducts();
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const fetchProducts = createAsyncThunk("products/fetchProducts", async ({ page, limit, search }, thunkAPI) => {
	try {
		const data = await productService.getProducts({ page, limit, search });
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
	pagantionProducts: [],
	totalCount: 0,
	totalPages: 0,
	page: 1,
	limit: 10,
	search: "",
	product: null,
	loading: false,
	error: null,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setSearchParam(state, action) {
			state.search = action.payload;
			state.page = 1;
			state.pagantionProducts = [];
			state.totalCount = 0;
			state.totalPages = 0;
			state.error = null;
		},
		resetProducts(state) {
			state.pagantionProducts = [];
			state.totalCount = 0;
			state.totalPages = 0;
			state.page = 1;
			state.search = "";
			state.loading = false;
			state.error = null;
		},
	},
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
			})
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				const { data: newItems, meta } = action.payload;
				const { totalCount, totalPages, currentPage } = meta;

				state.loading = false;
				state.totalCount = totalCount;
				state.totalPages = totalPages;
				state.page = currentPage;

				if (currentPage === 1) {
					state.pagantionProducts = newItems;
				} else {
					state.pagantionProducts = [...state.items, ...newItems];
				}
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Unknown error";
			});
	},
});

export const { productsActions, resetProducts, setSearchParam } = productsSlice.actions;
export default productsSlice.reducer;

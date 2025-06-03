import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, thunkAPI) => {
	try {
		const response = await fetch("/api/categories");
		if (!response.ok) throw new Error("Failed to fetch categories");
		const data = await response.json();
		return data; // מערך של קטגוריות
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
});

const categoriesSlice = createSlice({
	name: "categories",
	initialState: {
		list: [],
		loading: false,
		error: null,
	},
	reducers: {
		// אם צריך פעולות סינכרוניות, נוסיף כאן
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default categoriesSlice.reducer;

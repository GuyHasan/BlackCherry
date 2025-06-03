import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import userReducer from "./slices/userSlice";
import favoritesReducer from "./slices/favoritesSlice";
import adminImagesReducer from "./slices/adminImagesSlice";
import adminUsersReducer from "./slices/adminUsersSlice";

const store = configureStore({
	reducer: {
		products: productsReducer,
		categories: categoriesReducer,
		user: userReducer,
		favorites: favoritesReducer,
		adminImages: adminImagesReducer,
		adminUsers: adminUsersReducer,
	},
});

export default store;

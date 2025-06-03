import { configureStore } from "@reduxjs/toolkit";

import api, { injectStoreDispatch } from "../services/api";
import userReducer from "./slices/userSlice";
// import productsReducer from "./slices/productsSlice";
// import categoriesReducer from "./slices/categoriesSlice";
// import favoritesReducer from "./slices/favoritesSlice";
// import adminImagesReducer from "./slices/adminImagesSlice";
// import adminUsersReducer from "./slices/adminUsersSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		// products: productsReducer,
		// categories: categoriesReducer,
		// favorites: favoritesReducer,
		// adminImages: adminImagesReducer,
		// adminUsers: adminUsersReducer,
	},
});

injectStoreDispatch(store.dispatch);

export default store;

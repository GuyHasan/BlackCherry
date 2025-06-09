import "./style/App.css";

import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Kashrut from "./components/Kashrut";
import Profile from "./components/users/Profile";
import CategoryPage from "./components/products/CategoryPage";
import ProductPage from "./components/products/ProductPage";
import AddProduct from "./components/products/AddProduct";
import Admin from "./components/Admin";
import ManageProducts from "./components/products/ManageProducts";
import ManageUsers from "./components/users/ManageUsers";
import UserFavorites from "./components/users/UserFavorites";

import RequireAdminOrEmployee from "./guards/RequireAdminOrEmployee";
import RequireAdmin from "./guards/RequireAdmin";
import RequireAuth from "./guards/RequireAuth";
import RequireGuest from "./guards/RequireGuest";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshThunk } from "./redux/slices/userSlice";
import { ToastContainer } from "react-toastify";
import { getUserFavorites } from "./redux/slices/favoritesSlice";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const init = async () => {
			const refreshResult = await dispatch(refreshThunk());
			if (refreshThunk.fulfilled.match(refreshResult)) {
				await dispatch(getUserFavorites());
			}
		};
		init();
	}, [dispatch]);

	return (
		<>
			<div className='d-flex flex-column min-vh-100'>
				<Router>
					<Navbar />
					<main className='flex-grow-1'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/contact' element={<Contact />} />
							<Route path='/menu'>
								<Route index element={<Menu />} />
								<Route path=':categoryKey' element={<CategoryPage />} />
								<Route path=':categoryKey/:subKey' element={<CategoryPage />} />
							</Route>
							<Route path='/products/:slugId' element={<ProductPage />} />
							<Route path='/kashrut' element={<Kashrut />} />
							<Route element={<RequireAuth />}>
								<Route path='/profile'>
									<Route index element={<Profile />} />
									<Route path='favorites' element={<UserFavorites />} />
								</Route>
							</Route>
							<Route path='/admin' element={<RequireAdminOrEmployee />}>
								<Route index element={<Admin />} />
								<Route path='products'>
									<Route index element={<ManageProducts />} />
									<Route path='add' element={<AddProduct />} />
								</Route>
								<Route path='users' element={<RequireAdmin />}>
									<Route index element={<ManageUsers />} />
								</Route>
							</Route>
							<Route element={<RequireGuest />}>
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
							</Route>

							<Route path='*' element={<h1>404 Not Found</h1>} />
						</Routes>
					</main>
					<Footer />
				</Router>
				<ToastContainer theme='colored' />
			</div>
		</>
	);
}

export default App;

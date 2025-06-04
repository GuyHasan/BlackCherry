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

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshThunk } from "./redux/slices/userSlice";
import { ToastContainer } from "react-toastify";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(refreshThunk());
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
								<Route path=':categoryKey/:subKey/:productSlug' element={<ProductPage />} />
								<Route path=':categoryKey/:productSlug' element={<ProductPage />} />
							</Route>
							<Route path='/admin'>
								<Route index element={<h1>Admin Dashboard</h1>} />
								<Route path='products'>
									<Route index element={<h1>Manage Products</h1>} />
									<Route path='add' element={<AddProduct />} />
									<Route path='edit/:productId' element={<h1>Edit Product</h1>} />
								</Route>
							</Route>
							<Route path='/kashrut' element={<Kashrut />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/profile' element={<Profile />} />
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

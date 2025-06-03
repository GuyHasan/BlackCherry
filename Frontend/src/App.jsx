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
							<Route path='/menu' element={<Menu />} />
							<Route path='/kashrut' element={<Kashrut />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
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

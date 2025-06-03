import "./style/App.css";

import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshThunk } from "./redux/slices/userSlice";

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
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='*' element={<h1>404 Not Found</h1>} />
						</Routes>
					</main>
					<Footer />
				</Router>
			</div>
		</>
	);
}

export default App;

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutThunk } from "../redux/slices/userSlice";
import { useState } from "react";

function Navbar() {
	const { isAuthenticated, isAdmin, isEmployee } = useSelector((state) => state.user);
	const isAdminOrEmployee = Boolean(isAdmin || isEmployee);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);

	const handleLogout = async () => {
		await dispatch(logoutThunk());
		navigate("/");
	};

	const toggleNavbar = () => {
		setExpanded(!expanded);
	};

	return (
		<header className='sticky-top shadow-sm' style={{ backgroundColor: "#fcfcfc", zIndex: 1000 }}>
			<nav className='navbar navbar-expand-lg container'>
				<div className='container-fluid d-flex justify-content-between align-items-center'>
					<button className='navbar-toggler' type='button' onClick={toggleNavbar} aria-controls='navbarSupportedContent' aria-expanded={expanded} aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>

					<NavLink className='navbar-brand mx-auto order-0' to='/'>
						<img src='/logo.svg' alt='BlackCherry Logo' style={{ height: "40px" }} />
					</NavLink>

					<div className='d-none d-lg-flex align-items-center gap-3 order-lg-3'>
						{isAuthenticated ? (
							<>
								<NavLink className='nav-link' to='/profile'>
									הפרופיל שלי
								</NavLink>
								<button onClick={handleLogout} className='btn btn-link p-0 fw-bold' style={{ color: "#000", textDecoration: "none" }}>
									התנתקות
								</button>
							</>
						) : (
							<>
								<NavLink className='nav-link' to='/login'>
									התחברות
								</NavLink>
								<NavLink className='nav-link' to='/register'>
									הרשמה
								</NavLink>
							</>
						)}
					</div>

					<div className={`collapse navbar-collapse ${expanded ? "show" : ""}`} id='navbarSupportedContent'>
						<ul className='navbar-nav mx-auto text-center'>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/kashrut' onClick={() => setExpanded(false)}>
									כשרות
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/about' onClick={() => setExpanded(false)}>
									אודות
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/menu' onClick={() => setExpanded(false)}>
									תפריט
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/contact' onClick={() => setExpanded(false)}>
									צור קשר
								</NavLink>
							</li>
							{isAuthenticated && (
								<li className='nav-item'>
									<NavLink className='nav-link' to='/profile/favorites' onClick={() => setExpanded(false)}>
										מועדפים
									</NavLink>
								</li>
							)}
							{isAdminOrEmployee && (
								<li className='nav-item'>
									<NavLink className='nav-link' to='/admin' onClick={() => setExpanded(false)}>
										ניהול
									</NavLink>
								</li>
							)}
							{isAuthenticated ? (
								<>
									<li className='nav-item d-lg-none'>
										<NavLink className='nav-link' to='/profile' onClick={() => setExpanded(false)}>
											הפרופיל שלי
										</NavLink>
									</li>
									<li className='nav-item d-lg-none'>
										<button className='btn text-secondry text-decoration-none w-100 px-3' onClick={handleLogout}>
											התנתקות
										</button>
									</li>
								</>
							) : (
								<>
									<li className='nav-item d-lg-none'>
										<NavLink className='nav-link' to='/login' onClick={() => setExpanded(false)}>
											התחברות
										</NavLink>
									</li>
									<li className='nav-item d-lg-none'>
										<NavLink className='nav-link' to='/register' onClick={() => setExpanded(false)}>
											הרשמה
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;

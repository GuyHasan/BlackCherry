import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutThunk } from "../redux/slices/userSlice";

function Navbar() {
	const { isAuthenticated } = useSelector((state) => state.user);
	const isAdminOrEmployee = useSelector((state) => state.user.user?.isAdmin || state.user.user?.isEmployee) || false;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = async () => {
		await dispatch(logoutThunk());
		navigate("/");
	};
	return (
		<>
			<header className='sticky-top fw-bold' style={{ backgroundColor: "#fcfcfc", boxShadow: "0 0 2px rgba(0, 0, 0, 0.1)" }}>
				<nav className='d-grid align-items-center gap-5  px-5 py-3 w-100' style={{ gridTemplateColumns: "1fr auto 1fr" }}>
					<div></div>
					<div className='d-flex align-items-center gap-4'>
						<NavLink className='nav-link' to='/kashrut'>
							כשרות
						</NavLink>
						<NavLink className='nav-link' to='/about'>
							אודות
						</NavLink>
						<NavLink className='navbar-brand' to='/'>
							<img src='/logo.svg' alt='BlackCherry Logo' style={{ height: "40px" }} />
						</NavLink>
						<NavLink className='nav-link' to='/menu'>
							תפריט
						</NavLink>
						<NavLink className='nav-link' to='/contact'>
							צור קשר
						</NavLink>
						{isAuthenticated && (
							<NavLink className='nav-link' to='/profile/favorites'>
								מועדפים
							</NavLink>
						)}
						{isAdminOrEmployee && (
							<NavLink className='nav-link' to='/admin'>
								ניהול
							</NavLink>
						)}
					</div>
					<div className='d-flex align-items-center justify-content-end gap-3'>
						{isAuthenticated ? (
							<>
								<NavLink className='nav-link' to='/profile'>
									הפרופיל שלי
								</NavLink>
								<button onClick={handleLogout} style={{ backgroundColor: "transparent", border: "none", color: "#000", cursor: "pointer", fontWeight: "bold" }}>
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
				</nav>
			</header>
		</>
	);
}

export default Navbar;

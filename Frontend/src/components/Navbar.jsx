import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navbar() {
	const { isAuthenticated } = useSelector((state) => state.user);
	const handleLogout = () => {};
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
					</div>
					<div className='d-flex align-items-center justify-content-end gap-3'>
						{isAuthenticated ? (
							<>
								<NavLink className='nav-link' to='/menu'>
									הפרופיל שלי
								</NavLink>
								<button onClick={handleLogout}>התנתקות</button>
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

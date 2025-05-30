import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<>
			<header className='sticky-top fw-bold' style={{ backgroundColor: "#fcfcfc", boxShadow: "0 0 2px rgba(0, 0, 0, 0.1)" }}>
				<nav className='d-flex align-items-center justify-content-center px-5 py-3 gap-5'>
					<NavLink className='nav-link' to='/'>
						תפריט
					</NavLink>
					<NavLink className='nav-link' to='/'>
						אודות
					</NavLink>
					<NavLink className='navbar-brand' to='/'>
						<img src='/logo.svg' alt='BlackCherry Logo' style={{ height: "40px" }} />
					</NavLink>
					<NavLink className='nav-link' to='/about'>
						צור קשר
					</NavLink>
					<NavLink className='nav-link' to='/about'>
						כשרות
					</NavLink>
				</nav>
			</header>
		</>
	);
}

export default Navbar;

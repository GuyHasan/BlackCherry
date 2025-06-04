import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Admin() {
	const isAdmin = useSelector((state) => state.user.user?.isAdmin);
	const isEmployee = useSelector((state) => state.user.user?.isEmployee);
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAdmin && !isEmployee) {
			navigate("/");
		}
	}, [isAdmin, isEmployee, navigate]);

	return (
		<div className='d-flex flex-column align-items-center justify-content-center pt-5 text-center'>
			<h1>פאנל מנהלים</h1>
			<p>ברוכים הבאים לפאנל המנהלים של האתר. כאן תוכלו לנהל את התוכן והמשתמשים.</p>
			<nav>
				<ul className='list-unstyled d-flex gap-3 justify-content-center p-0'>
					<li>
						<Link to='/admin/products' className='btn btn-outline-secondary px-4 py-3 rounded shadow-sm'>
							ניהול מוצרים
						</Link>
					</li>
					<li>
						<Link to='/admin/orders' className='btn btn-outline-secondary px-4 py-3 rounded shadow-sm'>
							ניהול תמונות
						</Link>
					</li>
					{isAdmin && (
						<li>
							<Link to='/admin/users' className='btn btn-outline-secondary px-4 py-3 rounded shadow-sm'>
								ניהול משתמשים
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
}

export default Admin;

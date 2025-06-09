import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Admin() {
	return (
		<div className='container pt-5 text-center'>
			<h1>פאנל מנהלים</h1>
			<p>ברוכים הבאים לפאנל המנהלים של האתר. כאן תוכלו לנהל את התוכן והמשתמשים.</p>
			<nav>
				<ul className='list-unstyled row justify-content-center g-3 p-0'>
					<li className='col-12 col-sm-6 col-md-4'>
						<Link to='/admin/products' className='btn btn-outline-secondary w-100 py-3 rounded shadow-sm'>
							ניהול מוצרים
						</Link>
					</li>
					<li className='col-12 col-sm-6 col-md-4'>
						<Link to='/admin/orders' className='btn btn-outline-secondary w-100 py-3 rounded shadow-sm'>
							ניהול תמונות
						</Link>
					</li>
					{isAdmin && (
						<li className='col-12 col-sm-6 col-md-4'>
							<Link to='/admin/users' className='btn btn-outline-secondary w-100 py-3 rounded shadow-sm'>
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

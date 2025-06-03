import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
	return (
		<footer className='d-flex flex-wrap justify-content-between align-items-center p-3 border-top mt-5'>
			<div className='col-md-4 d-flex align-items-center gap-3'>
				<NavLink to='/' className='mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1'>
					<img src='/logo.svg' alt='' style={{ height: "30px" }} />
				</NavLink>
				<span className='mb-3 mb-md-0 text-body-secondary'>© כל הזכויות שמורות</span>
			</div>

			<ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
				<li className='ms-3'>
					<a className='text-body-secondary' href='#'>
						<FaTwitter size={24} />
					</a>
				</li>
				<li className='ms-3'>
					<a className='text-body-secondary' href='#'>
						<FaInstagram size={24} />
					</a>
				</li>
				<li className='ms-3'>
					<a className='text-body-secondary' href='#'>
						<FaFacebook size={24} />
					</a>
				</li>
			</ul>
		</footer>
	);
}

export default Footer;

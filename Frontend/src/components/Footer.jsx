import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
	return (
		<footer class='d-flex flex-wrap justify-content-between align-items-center p-3 border-top mt-5'>
			<div class='col-md-4 d-flex align-items-center gap-3'>
				<NavLink to='/' class='mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1'>
					<img src='/logo.svg' alt='' style={{ height: "30px" }} />
				</NavLink>
				<span class='mb-3 mb-md-0 text-body-secondary'>© כל הזכויות שמורות</span>
			</div>

			<ul class='nav col-md-4 justify-content-end list-unstyled d-flex'>
				<li class='ms-3'>
					<a class='text-body-secondary' href='#'>
						<FaTwitter size={24} />
					</a>
				</li>
				<li class='ms-3'>
					<a class='text-body-secondary' href='#'>
						<FaInstagram size={24} />
					</a>
				</li>
				<li class='ms-3'>
					<a class='text-body-secondary' href='#'>
						<FaFacebook size={24} />
					</a>
				</li>
			</ul>
		</footer>
	);
}

export default Footer;

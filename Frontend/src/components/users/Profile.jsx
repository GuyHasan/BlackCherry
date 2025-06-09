import { FiUser, FiMail } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	if (!user) {
		navigate("/login");
		return null;
	}

	return (
		<>
			<div className='container py-5'>
				<div className='row justify-content-center'>
					<div className='col-md-7 col-lg-6'>
						<div className='card shadow rounded-4'>
							<div className='card-body text-center bg-light text-dark rounded-top-4'>
								<div className='mb-3'>
									<div className='d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary bg-opacity-25' style={{ width: 90, height: 90, padding: 12 }}>
										<FiUser size={44} />
									</div>
								</div>
								<h2 className='mb-1'>{user.username}</h2>
								<p className='mb-0'>פרטי חשבון</p>
							</div>
							<ul className='list-group list-group-flush'>
								<li className='list-group-item d-flex align-items-center'>
									<FiUser className='me-3 text-secondary' size={20} />
									&nbsp;
									<span className='fw-semibold'>שם משתמש:&nbsp;</span>
									<span className='ms-auto'>{user.username}</span>
								</li>
								<li className='list-group-item d-flex align-items-center'>
									<FiMail className='me-3 text-secondary' size={20} />
									&nbsp;
									<span className='fw-semibold'>אימייל:&nbsp;</span>
									<span className='ms-auto'>{user.email}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;

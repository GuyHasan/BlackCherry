import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../redux/slices/userSlice";
import DeleteUserModal from "./DeleteUserModal";
import EmployeeStatusModal from "./EmployeeStatusModal";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isFirstLoad = useRef(true);
	const { userList, userListLoading, accessToken } = useSelector((state) => state.user);
	const [currentUser, setCurrentUser] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEmployeeStatusModal, setShowEmployeeStatusModal] = useState(false);
	const handleBack = () => navigate(-1);

	useEffect(() => {
		if (accessToken && isFirstLoad.current) {
			dispatch(getAllUsersThunk());
			isFirstLoad.current = false;
		}
	}, [accessToken, dispatch]);

	const handleDelete = (e, user) => {
		e.stopPropagation();
		setCurrentUser(user);
		setShowDeleteModal(true);
	};
	const handleEmployeeUpdate = (e, user) => {
		e.stopPropagation();
		setCurrentUser(user);
		setShowEmployeeStatusModal(true);
	};

	return (
		<div className='container py-5'>
			<div className='text-center mb-4'>
				<h1>ניהול משתמשים</h1>
				<p>כאן תוכלו לנהל ולמחוק משתמשים רשומים לאתר.</p>
				<button className='btn btn-outline-secondary' onClick={handleBack}>
					← חזרה
				</button>
			</div>
			<div className='d-none d-md-block'>
				<div className='table-responsive'>
					<table className='table table-striped align-middle'>
						<thead>
							<tr>
								<th>#</th>
								<th>שם משתמש</th>
								<th>אימייל</th>
								<th>סוג משתמש</th>
								<th className='text-center'>פעולות</th>
							</tr>
						</thead>
						<tbody>
							{userList.length === 0 && !userListLoading && (
								<tr>
									<td colSpan='5' className='text-center py-4'>
										לא נמצאו משתמשים
									</td>
								</tr>
							)}
							{userList.map((user, index) => (
								<tr key={user._id}>
									<td>{index + 1}</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.isAdmin ? "מנהל" : user.isEmployee ? "עובד" : "רגיל"}</td>
									<td className='d-flex gap-2 justify-content-center'>
										{user.isAdmin ? (
											<button className='btn btn-sm btn-outline-secondary' disabled>
												מנהל
											</button>
										) : (
											<>
												<button className='btn btn-sm btn-outline-danger' onClick={(e) => handleDelete(e, user)}>
													מחק
												</button>
												<button className='btn btn-sm btn-outline-primary' onClick={(e) => handleEmployeeUpdate(e, user)}>
													{user.isEmployee ? "בטל עובד" : "הגדר כעובד"}
												</button>
											</>
										)}
									</td>
								</tr>
							))}
							{userListLoading && (
								<tr>
									<td colSpan='5' className='text-center py-4'>
										טוען…
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			<div className='d-block d-md-none'>
				{userList.length === 0 && !userListLoading && <p className='text-center'>לא נמצאו משתמשים</p>}
				{userList.map((user, index) => (
					<div key={user._id} className='card mb-3 shadow-sm'>
						<div className='card-body'>
							<h5 className='card-title mb-2'>{user.username}</h5>
							<p className='mb-1'>
								<strong>אימייל:</strong> {user.email}
							</p>
							<p className='mb-2'>
								<strong>סוג:</strong> {user.isAdmin ? "מנהל" : user.isEmployee ? "עובד" : "רגיל"}
							</p>
							<div className='d-flex flex-wrap gap-2'>
								{user.isAdmin ? (
									<button className='btn btn-sm btn-outline-secondary w-100' disabled>
										מנהל
									</button>
								) : (
									<>
										<button className='btn btn-sm btn-outline-danger flex-fill' onClick={(e) => handleDelete(e, user)}>
											מחק
										</button>
										<button className='btn btn-sm btn-outline-primary flex-fill' onClick={(e) => handleEmployeeUpdate(e, user)}>
											{user.isEmployee ? "בטל עובד" : "הגדר כעובד"}
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				))}
				{userListLoading && <p className='text-center'>טוען…</p>}
			</div>
			<DeleteUserModal user={currentUser} show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} />
			<EmployeeStatusModal user={currentUser} show={showEmployeeStatusModal} handleClose={() => setShowEmployeeStatusModal(false)} />
		</div>
	);
}

export default ManageUsers;

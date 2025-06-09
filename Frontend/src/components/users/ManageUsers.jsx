import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../redux/slices/userSlice";
import DeleteUserModal from "./DeleteUserModal";
import EmployeeStatusModal from "./EmployeeStatusModal";

function ManageUsers() {
	const dispatch = useDispatch();
	const isFirstLoad = useRef(true);
	const { userList, userListLoading } = useSelector((state) => state.user);
	const [currentUser, setCurrentUser] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEmployeeStatusModal, setShowEmployeeStatusModal] = useState(false);

	useEffect(() => {
		if (isFirstLoad.current) {
			dispatch(getAllUsersThunk());
			isFirstLoad.current = false;
		}
		return () => {
			dispatch(getAllUsersThunk());
		};
	}, [dispatch]);

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
		<div className='container pt-5'>
			<div className='d-flex flex-column align-items-center text-center mb-4'>
				<h1>ניהול משתמשים</h1>
				<p>כאן תוכלו לנהל ולמחוק משתמשים רשומים לאתר.</p>
			</div>

			<div className='table-responsive'>
				<table className='table table-striped align-middle'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>שם משתמש</th>
							<th scope='col'>אימייל</th>
							<th scope='col'>סוג משתמש</th>
							<th scope='col' className='text-center'>
								פעולות
							</th>
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
								<td>{user.isAdmin ? <div>מנהל</div> : user.isEmployee ? <div>עובד</div> : <div>רגיל</div>}</td>
								<td className='d-flex gap-2 justify-content-center'>
									{user.isAdmin ? (
										<div>
											<button className='btn btn-sm btn-outline-secondary' disabled>
												מנהל
											</button>
										</div>
									) : (
										<button className='btn btn-sm btn-outline-danger' onClick={(e) => handleDelete(e, user)}>
											מחק
										</button>
									)}
									{!user.isAdmin && (
										<button className='btn btn-sm btn-outline-primary' onClick={(e) => handleEmployeeUpdate(e, user)}>
											{user.isEmployee ? "בטל עובד" : "הגדר כעובד"}
										</button>
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
			<DeleteUserModal user={currentUser} show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} />
			<EmployeeStatusModal user={currentUser} show={showEmployeeStatusModal} handleClose={() => setShowEmployeeStatusModal(false)} />
		</div>
	);
}

export default ManageUsers;

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { errorMessage, successMessage } from "../../services/messageServices";
import { deleteUserThunk } from "../../redux/slices/userSlice";

function DeleteUserModal({ show, handleClose, user }) {
	const dispatch = useDispatch();
	if (!user) return null;
	const handleDelete = async (userId) => {
		try {
			dispatch(deleteUserThunk(userId)).unwrap();
			successMessage("user deleted successfully");
			handleClose();
		} catch (error) {
			console.error("Failed to delete user:", error);
			errorMessage("Failed to delete user");
		}
	};
	const { username, _id: userId } = user;
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className='text-center border-0 w-100'>
				<Modal.Title>אזהרה</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-center fw-400 fs-5 border-0'>
				<p className='text-capitalize'>האם אתה בטוח שאתה רוצה למחוק את המשתמש {username}?</p>
			</Modal.Body>

			<Modal.Footer className='justify-content-center border-0'>
				<Button variant='secondary' onClick={handleClose}>
					לא, ביטול
				</Button>
				<Button variant='danger' onClick={() => handleDelete(userId)}>
					כן, מחיקה
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteUserModal;

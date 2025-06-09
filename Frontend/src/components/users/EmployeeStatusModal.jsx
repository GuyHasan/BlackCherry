import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { errorMessage, successMessage } from "../../services/messageServices";
import { updateEmployeeStatusThunk } from "../../redux/slices/userSlice";

function EmployeeStatusModal({ show, handleClose, user }) {
	const { _id: userId } = user || "";
	const dispatch = useDispatch();
	if (!user) return null;
	const handleUpdatedEmployeeStatus = async (userId) => {
		try {
			await dispatch(updateEmployeeStatusThunk(userId)).unwrap();
			successMessage("משתמש עודכן בהצלחה");
			handleClose();
		} catch (error) {
			console.error("עדכון המשתמש נכשל:", error);
			errorMessage("עדכון המשתמש נכשל, אנא נסה שוב מאוחר יותר");
			handleClose();
		}
	};

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className='text-center border-0 w-100'>
				<Modal.Title>אזהרה</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-center fw-400 fs-5 border-0'>
				<p className='text-capitalize'>
					האם אתה בטוח שאתה רוצה
					{user.isEmployee ? " להסיר את הרשאות העובד" : " להפוך את המשתמש לעובד"}?
				</p>
			</Modal.Body>

			<Modal.Footer className='justify-content-center border-0'>
				<Button variant='secondary' onClick={handleClose}>
					לא, ביטול
				</Button>
				<Button variant='success' onClick={() => handleUpdatedEmployeeStatus(userId)}>
					כן, עדכון
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EmployeeStatusModal;

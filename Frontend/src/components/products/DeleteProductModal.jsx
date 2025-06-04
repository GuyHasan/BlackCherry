import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/slices/productsSlice";
import { errorMessage, successMessage } from "../../services/messageServices";

function DeleteCardModal({ show, handleClose, product }) {
	const dispatch = useDispatch();
	if (!product) return null;
	const handleDelete = async (productId) => {
		try {
			dispatch(deleteProduct(productId)).unwrap();
			successMessage("Product deleted successfully");
			handleClose();
		} catch (error) {
			console.error("Failed to delete product:", error);
			errorMessage("Failed to delete product");
		}
	};
	const { name, _id: productId } = product;
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className='text-center border-0 w-100'>
				<Modal.Title>אזהרה</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-center fw-400 fs-5 border-0'>
				<p className='text-capitalize'>האם אתה בטוח שאתה רוצה למחוק את המוצר {name}?</p>
			</Modal.Body>

			<Modal.Footer className='justify-content-center border-0'>
				<Button variant='secondary' onClick={handleClose}>
					לא, ביטול
				</Button>
				<Button variant='danger' onClick={() => handleDelete(productId)}>
					כן, מחיקה
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteCardModal;

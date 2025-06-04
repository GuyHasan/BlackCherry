import { Modal } from "react-bootstrap";
import EditProduct from "./EditProduct";

function EditProductModal({ product, show, handleClose }) {
	return (
		<>
			<Modal show={show} onHide={handleClose} size='lg' className='text-center' aria-labelledby='contained-modal-title-vcenter' centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>Edit User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditProduct card={product} handleClose={handleClose} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditProductModal;

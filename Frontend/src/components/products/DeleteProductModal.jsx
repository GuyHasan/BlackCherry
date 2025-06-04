import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteCardModal({ show, handleClose, handleDelete, product }) {
	if (!product) return null;
	const { name, _id: productId } = product;
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className='text-center border-0 w-100'>
				<Modal.Title>Warning</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-center fw-400 fs-5 border-0'>
				<p className='text-capitalize'>Are you sure you want to delete the {name} Product?</p>
			</Modal.Body>

			<Modal.Footer className='justify-content-center border-0'>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button variant='danger' onClick={() => handleDelete(productId)}>
					Yes, Delete It
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteCardModal;

import { Button } from "react-bootstrap";
import { useSmartProductNavigation } from "../../hooks/useSmartProductNavigation";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toggleFavorite } from "../../redux/slices/favoritesSlice";
import { useState } from "react";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

export default function ProductCard({ prod }) {
	const goToProduct = useSmartProductNavigation();
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector((state) => state.user);
	const favorites = useSelector((state) => state.favorites.favoritesIdList || []);
	const isFavorite = favorites.includes(prod._id);
	const isEditor = user?.isAdmin || user?.isEmployee;
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleToggleFavorite = (e) => {
		e.stopPropagation();
		dispatch(toggleFavorite(prod._id));
	};

	return (
		<>
			<div className='card h-100 d-flex flex-column shadow-sm rounded overflow-hidden position-relative' role='button' onClick={() => goToProduct(prod._id)}>
				{isAuthenticated && (
					<Button variant='light' onClick={handleToggleFavorite} className='position-absolute top-0 start-0 m-2 p-1 rounded-circle z-2' aria-label={isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}>
						{isFavorite ? <AiFillHeart color='red' size={18} /> : <AiOutlineHeart color='gray' size={18} />}
					</Button>
				)}

				<img src={prod.image.url} alt={prod.image.alt} loading='lazy' className='card-img-top' style={{ objectFit: "cover", height: "140px", width: "100%" }} />

				<div className='card-body d-flex flex-column justify-content-between p-3'>
					<div className='text-center mb-2'>
						<h5 className='card-title mb-1 fw-bold' style={{ fontSize: "1.2rem" }}>
							{prod.name}
						</h5>
					</div>

					{Array.isArray(prod.size) && prod.size.length > 0 && (
						<div className='d-flex flex-wrap justify-content-center gap-2 mb-3'>
							{prod.size.map((s, idx) => (
								<Button key={idx} variant='outline-secondary' size='sm'>
									{s.quantity} {prod.unit} – ₪{s.price.toFixed(2)}
								</Button>
							))}
						</div>
					)}

					<div className='d-flex flex-column gap-2'>
						<Button
							variant='outline-primary'
							size='sm'
							onClick={(e) => {
								e.stopPropagation();
								goToProduct(prod._id);
							}}>
							לצפייה במוצר
						</Button>

						{isEditor && (
							<div className='d-flex justify-content-center gap-2'>
								<Button
									variant='outline-secondary'
									size='sm'
									onClick={(e) => {
										e.stopPropagation();
										setShowEditModal(true);
									}}>
									<FiEdit size={16} />
								</Button>
								<Button
									variant='outline-danger'
									size='sm'
									onClick={(e) => {
										e.stopPropagation();
										setShowDeleteModal(true);
									}}>
									<FiTrash2 size={16} />
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>

			<EditProductModal product={prod} show={showEditModal} handleClose={() => setShowEditModal(false)} />
			<DeleteProductModal product={prod} show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} />
		</>
	);
}

import { Button } from "react-bootstrap";
import { useSmartProductNavigation } from "../../hooks/useSmartProductNavigation";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toggleFavorite } from "../../redux/slices/userSlice";

export default function ProductCard({ prod }) {
	const goToProduct = useSmartProductNavigation();
	const dispatch = useDispatch();
	const { favorites, user } = useSelector((state) => state.user);
	const isFavorite = favorites?.some((p) => p._id === prod._id);
	const isEditor = user?.isAdmin || user?.isEmployee;

	const handleToggleFavorite = (e) => {
		e.stopPropagation();
		dispatch(toggleFavorite(prod._id));
	};

	const handleEdit = (e) => {
		e.stopPropagation();
		console.log("עריכת מוצר:", prod._id);
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		console.log("מחיקת מוצר:", prod._id);
	};

	return (
		<div className='col-6 col-sm-4 col-md-3 col-lg-2 mb-3'>
			<div className='card h-100 position-relative d-flex flex-column' style={{ overflow: "hidden" }}>
				{/* כפתור לב מועדף */}
				<Button variant='light' onClick={handleToggleFavorite} className='position-absolute top-0 start-0 m-1 p-1 rounded-circle z-2' aria-label={isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}>
					{isFavorite ? <AiFillHeart color='red' size={18} /> : <AiOutlineHeart color='gray' size={18} />}
				</Button>

				<img src={prod.imageUrl} className='card-img-top' alt={prod.name} style={{ objectFit: "cover", height: "120px" }} />

				<div className='card-body p-2 d-flex flex-column justify-content-between flex-grow-1'>
					<div>
						<h5 className='card-title mb-1' style={{ fontSize: "0.9rem" }}>
							{prod.name}
						</h5>
						{Array.isArray(prod.size) && prod.size.length > 0 && (
							<p className='card-text text-muted mb-2' style={{ fontSize: "0.8rem" }}>
								{prod.size[0].price} ₪
							</p>
						)}
					</div>

					<div className='d-flex justify-content-between align-items-center mt-auto'>
						<Button variant='outline-primary' size='sm' onClick={() => goToProduct(prod._id)}>
							לצפייה במוצר
						</Button>

						{isEditor && (
							<div className='d-flex gap-2'>
								<Button variant='outline-secondary' size='sm' onClick={handleEdit} aria-label='ערוך מוצר'>
									<FiEdit size={16} />
								</Button>
								<Button variant='outline-danger' size='sm' onClick={handleDelete} aria-label='מחק מוצר'>
									<FiTrash2 size={16} />
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

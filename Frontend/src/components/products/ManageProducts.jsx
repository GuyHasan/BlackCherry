import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, setSearchParam, resetProducts } from "../../redux/slices/productsSlice";
import { fetchCategoriesList } from "../../redux/slices/categoriesSlice";
import DeleteProductModal from "./DeleteProductModal";
import EditProductModal from "./EditProductModal";

function ManageProducts() {
	const dispatch = useDispatch();
	const { pagantionProducts, totalPages, page: currentPage, limit, search: currentSearch, loading, error } = useSelector((state) => state.products);
	const { categoriesList } = useSelector((state) => state.categories);
	const [searchInput, setSearchInput] = useState(currentSearch || "");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const isFirstLoad = useRef(true);

	useEffect(() => {
		if (isFirstLoad.current) {
			dispatch(fetchProducts({ page: 1, limit, search: currentSearch }));
			dispatch(fetchCategoriesList());
			isFirstLoad.current = false;
		}
		return () => {
			dispatch(resetProducts());
		};
	}, [dispatch, limit, currentSearch]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		const trimmed = searchInput.trim();
		if (trimmed !== currentSearch) {
			dispatch(setSearchParam(trimmed));
			dispatch(fetchProducts({ page: 1, limit, search: trimmed }));
		}
	};

	const handleLoadMore = () => {
		if (!loading && currentPage < totalPages) {
			dispatch(fetchProducts({ page: currentPage + 1, limit, search: currentSearch }));
		}
	};

	const handleDelete = (e, product) => {
		e.stopPropagation();
		setSelectedProduct(product);
		setShowDeleteModal(true);
	};
	const handleEdit = (e, product) => {
		e.stopPropagation();
		setSelectedProduct(product);
		setShowEditModal(true);
	};

	return (
		<div className='container pt-5'>
			<div className='d-flex flex-column align-items-center text-center mb-4'>
				<h1>ניהול מוצרים</h1>
				<p>כאן תוכלו לחפש, לצפות, לערוך ולמחוק מוצרים.</p>
				<Link to='/admin/products/add' className='btn btn-primary'>
					הוספת מוצר חדש
				</Link>
			</div>

			<form onSubmit={handleSearchSubmit} className='d-flex justify-content-center mb-4'>
				<input type='text' className='form-control w-50' placeholder='חיפוש מוצר לפי שם...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
				<button type='submit' className='btn btn-outline-primary ms-2'>
					חפש
				</button>
			</form>

			<div className='table-responsive'>
				<table className='table table-striped align-middle'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>שם מוצר</th>
							<th scope='col'>קטגוריה</th>
							<th scope='col'>מחיר</th>
							<th scope='col' className='text-center'>
								פעולות
							</th>
						</tr>
					</thead>
					<tbody>
						{pagantionProducts.length === 0 && !loading && (
							<tr>
								<td colSpan='5' className='text-center py-4'>
									לא נמצאו מוצרים תואמים
								</td>
							</tr>
						)}

						{pagantionProducts.map((prod, idx) => (
							<tr key={prod._id}>
								<th scope='row'>{idx + 1}</th>
								<td>{prod.name}</td>
								<td>
									{categoriesList.map((cat) => {
										if (cat.key === prod.category) {
											return cat.he;
										}
										return null;
									})}
								</td>
								<td>
									{prod.size[0].price}
									<span>&#8362;</span>
								</td>
								<td className='text-center'>
									<div className='btn btn-sm btn-outline-secondary me-2' onClick={(e) => handleEdit(e, prod)}>
										ערוך
									</div>
									<button className='btn btn-sm btn-outline-danger' onClick={(e) => handleDelete(e, prod)}>
										מחק
									</button>
								</td>
							</tr>
						))}

						{loading && pagantionProducts.length === 0 && (
							<tr>
								<td colSpan='5' className='text-center py-4'>
									טוען…
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{currentPage < totalPages && !loading && pagantionProducts.length > 0 && (
				<div className='d-flex justify-content-center mb-5'>
					<button type='button' className='btn btn-outline-primary' onClick={handleLoadMore}>
						טען עוד
					</button>
				</div>
			)}

			{loading && pagantionProducts.length > 0 && <div className='text-center mb-5'>טוען עוד מוצרים…</div>}
			<DeleteProductModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} product={selectedProduct} />
			<EditProductModal show={showEditModal} handleClose={() => setShowEditModal(false)} product={selectedProduct} />
		</div>
	);
}

export default ManageProducts;

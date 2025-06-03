import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCategoryProducts, fetchSubCategoryProducts, clearCategory } from "../../redux/slices/categoriesSlice";
import { Spinner } from "react-bootstrap";

export default function CategoryPage() {
	const { categoryKey, subKey } = useParams();
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.categories);
	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		dispatch(clearCategory());
		if (subKey) {
			dispatch(fetchSubCategoryProducts({ categoryKey, subKey }));
		} else {
			dispatch(fetchCategoryProducts(categoryKey));
		}
	}, [dispatch, categoryKey, subKey]);

	useEffect(() => {
		if (!loading) {
			setHasFetched(true);
		}
	}, [loading]);

	if (loading && !hasFetched) {
		return (
			<div className='d-flex justify-content-center py-4'>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</div>
		);
	}

	if (loading && hasFetched) {
		return (
			<div className='d-flex justify-content-center py-4'>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</div>
		);
	}

	if (hasFetched && error) {
		return <div className='text-center py-4 text-danger'>שגיאה בטעינת מוצרים: {error}</div>;
	}
	if (hasFetched && (!products || products.length === 0)) {
		return <div className='text-center py-4'>לא נמצאו מוצרים {subKey ? "בתת־קטגוריה זו" : "בקטגוריה זו"}.</div>;
	}

	return (
		<div className='container my-4'>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h2 className='h3'>{subKey ? `תת־קטגוריה: ${subKey} (קבוצה: ${categoryKey})` : `קטגוריה: ${categoryKey}`}</h2>
			</div>
			<div className='row'>
				{products.map((prod) => (
					<div key={prod._id} className='col-6 col-sm-4 col-md-3 col-lg-2 mb-3'>
						<Link to={`/product/${prod._id}`} className='text-decoration-none text-dark'>
							<div className='card h-100'>
								<img src={prod.imageUrl} className='card-img-top' alt={prod.name} style={{ objectFit: "cover", height: "120px" }} />
								<div className='card-body p-2'>
									<h5 className='card-title mb-1' style={{ fontSize: "0.9rem" }}>
										{prod.name}
									</h5>
									{Array.isArray(prod.size) && prod.size.length > 0 && (
										<p className='card-text text-muted mb-0' style={{ fontSize: "0.8rem" }}>
											{prod.size[0].price} ₪
										</p>
									)}
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

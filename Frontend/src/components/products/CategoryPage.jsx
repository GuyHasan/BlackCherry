import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryProducts, fetchSubCategoryProducts, clearCategory } from "../../redux/slices/categoriesSlice";
import { Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";

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

	if (hasFetched && error) {
		return <div className='text-center py-4 text-danger'>שגיאה בטעינת מוצרים: {error}</div>;
	}

	const safeProducts = Array.isArray(products) ? products : [];

	if (hasFetched && safeProducts.length === 0) {
		return <div className='text-center py-4'>לא נמצאו מוצרים {subKey ? "בתת־קטגוריה זו" : "בקטגוריה זו"}.</div>;
	}

	return (
		<div className='container my-4'>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h2 className='h3'>{subKey ? `תת־קטגוריה: ${subKey} (קבוצה: ${categoryKey})` : `קטגוריה: ${categoryKey}`}</h2>
			</div>
			<div className='row'>{safeProducts.map((prod) => (prod ? <ProductCard key={prod._id} prod={prod} /> : null))}</div>
		</div>
	);
}

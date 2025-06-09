import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryProducts, fetchSubCategoryProducts, clearCategory } from "../../redux/slices/categoriesSlice";
import { Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function CategoryPage() {
	const { categoryKey, subKey } = useParams();
	const dispatch = useDispatch();
	const { products, loading } = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(clearCategory());
		if (subKey) {
			dispatch(fetchSubCategoryProducts({ categoryKey, subKey }));
		} else {
			dispatch(fetchCategoryProducts(categoryKey));
		}
	}, [dispatch, categoryKey, subKey]);

	if (loading) {
		return (
			<div className='d-flex justify-content-center py-4'>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</div>
		);
	}

	return (
		<div className='container my-4'>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h2 className='h3'>{subKey ? `תת־קטגוריה: ${subKey} (קבוצה: ${categoryKey})` : `קטגוריה: ${categoryKey}`}</h2>
			</div>
			{Array.isArray(products) && products.length > 0 ? (
				<div className='row'>{products.map((prod) => (prod ? <ProductCard key={prod._id} prod={prod} /> : null))}</div>
			) : (
				<div className='text-center py-4'>לא נמצאו מוצרים {subKey ? "בתת־קטגוריה זו" : "בקטגוריה זו"}.</div>
			)}
		</div>
	);
}

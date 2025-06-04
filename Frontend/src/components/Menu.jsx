import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMenuPreview } from "../redux/slices/menuSlice";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCard from "./products/ProductCard";

export default function Menu() {
	const dispatch = useDispatch();
	const { menuPreview, loading, error } = useSelector((state) => state.menu);
	const [hasFetched, setHasFetched] = useState(false);
	useEffect(() => {
		dispatch(loadMenuPreview());
	}, [dispatch]);
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
		return <div className='text-center py-4 text-danger'>שגיאה: {error}</div>;
	}
	if (hasFetched && !menuPreview.length) {
		return <div className='text-center py-4'>אין קטגוריות להצגה.</div>;
	}
	return (
		<div className='container my-4'>
			<h1 className='mb-4'>תפריט</h1>
			<p className='text-muted mb-4'>בחר קטגוריה או תת-קטגוריה כדי לראות את המוצרים.</p>
			{menuPreview.map((category) => {
				const { key: catKey, he: catHe, subCategories, products } = category;
				const hasSub = Array.isArray(subCategories) && subCategories.length > 0;

				return (
					<section key={catKey} className='mb-5'>
						<div className='d-flex justify-content-between align-items-center mb-3'>
							<h2 className='h3'>{catHe}</h2>
							{!hasSub && (
								<Link to={`/menu/${catKey}`} className='btn btn-sm btn-outline-primary'>
									צפה בכל הקטגוריה
								</Link>
							)}
						</div>

						{hasSub ? (
							subCategories.map((subCat) => {
								const { key: subKey, he: subHe, products: subProducts } = subCat;
								return (
									<div key={subKey} className='mb-4'>
										<div className='d-flex justify-content-between align-items-center mb-2'>
											<h3 className='h5 mb-0'>{subHe}</h3>
											<Link to={`/menu/${catKey}/${subKey}`} className='btn btn-sm btn-outline-primary'>
												צפה בכל הקטגוריה
											</Link>
										</div>
										{Array.isArray(subProducts) && subProducts.length > 0 ? (
											<div className='row'>
												{subProducts.map((prod) => (
													<ProductCard key={prod._id} prod={prod} />
												))}
											</div>
										) : (
											<p className='text-muted'>אין מוצרים בתת-קטגוריה זו.</p>
										)}
									</div>
								);
							})
						) : (
							<div className='row'>{Array.isArray(products) && products.length > 0 ? products.map((prod) => <ProductCard key={prod._id} prod={prod} />) : <p className='text-muted'>אין מוצרים בקטגוריה זו.</p>}</div>
						)}
					</section>
				);
			})}
		</div>
	);
}

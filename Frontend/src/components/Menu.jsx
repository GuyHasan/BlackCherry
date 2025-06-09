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
					<section key={catKey} className='mb-5 d-flex flex-column'>
						<div className='row align-items-center mb-3'>
							<div className='col d-flex justify-content-between align-items-center'>
								<h2 className='h3 mb-0'>{catHe}</h2>
								{!hasSub && (
									<Link to={`/menu/${catKey}`} className='btn btn-sm btn-outline-primary'>
										צפה בכל הקטגוריה
									</Link>
								)}
							</div>
						</div>

						{hasSub ? (
							subCategories.map((subCat) => {
								const { key: subKey, he: subHe, products: subProducts } = subCat;
								return (
									<div key={subKey} className='mb-4'>
										<div className='row align-items-center mb-2'>
											<div className='col d-flex justify-content-between align-items-center'>
												<h3 className='h5 mb-0'>{subHe}</h3>
												<Link to={`/menu/${catKey}/${subKey}`} className='btn btn-sm btn-outline-primary'>
													צפה בכל הקטגוריה
												</Link>
											</div>
										</div>
										{Array.isArray(subProducts) && subProducts.length > 0 ? (
											<div className='row '>
												{subProducts.map((prod) => (
													<div key={prod._id} className='col-6 col-sm-4 col-md-3 col-lg-2-4 mb-4'>
														<ProductCard prod={prod} />
													</div>
												))}
											</div>
										) : (
											<p className='text-muted'>אין מוצרים בתת-קטגוריה זו.</p>
										)}
									</div>
								);
							})
						) : (
							<div className='row'>
								{Array.isArray(products) && products.length > 0 ? (
									products.map((prod) => (
										<div key={prod._id} className='col-6 col-sm-4 col-md-3 col-lg-2-4 mb-4'>
											<ProductCard prod={prod} />
										</div>
									))
								) : (
									<p className='text-muted'>אין מוצרים בקטגוריה זו.</p>
								)}
							</div>
						)}
					</section>
				);
			})}
		</div>
	);
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryProducts, fetchSubCategoryProducts, clearCategory, fetchCategoriesList } from "../../redux/slices/categoriesSlice";
import { Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function CategoryPage() {
	const { categoryKey, subKey } = useParams();
	const dispatch = useDispatch();
	const { products, loading, categoriesList } = useSelector((state) => state.categories);
	const [currentHebrewCategory, setCurrentHebrewCategory] = useState("");
	const [currentHebrewSubCategory, setCurrentHebrewSubCategory] = useState("");

	useEffect(() => {
		dispatch(clearCategory());
		dispatch(fetchCategoriesList());
		if (subKey) {
			dispatch(fetchSubCategoryProducts({ categoryKey, subKey }));
		} else {
			dispatch(fetchCategoryProducts(categoryKey));
		}
	}, [dispatch, categoryKey, subKey]);

	useEffect(() => {
		if (categoriesList && categoriesList.length > 0) {
			const category = categoriesList.find((cat) => cat.key === categoryKey);
			if (category) {
				setCurrentHebrewCategory(category.he);
			}

			if (subKey) {
				const subCategory = category?.subCategories?.find((sub) => sub.key === subKey);
				if (subCategory) {
					setCurrentHebrewSubCategory(subCategory.he);
				}
			} else {
				setCurrentHebrewSubCategory("");
			}
		}
	}, [categoriesList]);

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
				<h2 className='h3'>{subKey ? `תת־קטגוריה: ${currentHebrewSubCategory} (קבוצה: ${currentHebrewCategory})` : `קטגוריה: ${currentHebrewCategory}`}</h2>
			</div>
			{Array.isArray(products) && products.length > 0 ? (
				<div className='row'>
					{products.map((prod) =>
						prod ? (
							<div className='col-6 col-sm-4 col-md-3 col-lg-2-4 mb-4'>
								<ProductCard key={prod._id} prod={prod} />
							</div>
						) : null
					)}
				</div>
			) : (
				<div className='text-center py-4'>לא נמצאו מוצרים {subKey ? "בתת־קטגוריה זו" : "בקטגוריה זו"}.</div>
			)}
		</div>
	);
}

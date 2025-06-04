import { useDispatch, useSelector } from "react-redux";
import { getUserFavorites } from "../../redux/slices/favoritesSlice";
import ProductCard from "../products/ProductCard";
import { useEffect } from "react";

function UserFavorites() {
	const dispatch = useDispatch();
	const favoriteProducts = useSelector((state) => state.favorites.favorites || []);

	useEffect(() => {
		dispatch(getUserFavorites());
	}, [dispatch]);

	return (
		<>
			<div className='d-flex flex-column align-items-center w-100'>
				<h1 className='my-3'>המוצרים המועדפים שלי</h1>
				<div className='d-flex flex-wrap w-100 px-4 justify-content-center gap-5'>{favoriteProducts.length > 0 ? favoriteProducts.map((product) => <ProductCard key={product._id} prod={product} />) : <p>אין מוצרים מועדפים</p>}</div>
			</div>
		</>
	);
}

export default UserFavorites;

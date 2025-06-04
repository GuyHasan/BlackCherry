// hooks/useSmartProductNavigation.js
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../redux/slices/productsSlice";

export function useSmartProductNavigation() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const productInState = useSelector((state) => state.products.product);

	const goToProduct = async (productId) => {
		try {
			let product = productInState;
			if (!productInState || productInState._id !== productId) {
				const action = await dispatch(getProductById(productId));
				if (getProductById.fulfilled.match(action)) {
					product = action.payload;
				} else {
					throw new Error("טעינת מוצר נכשלה");
				}
			}

			if (!product) return;

			const slug = product.name
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/\s+/g, "-")
				.replace(/[^a-zA-Z0-9-א-ת]/g, "")
				.toLowerCase();

			const path = `/products/${slug}-${product._id}`;
			navigate(path);
		} catch (err) {
			console.error("שגיאה בניווט למוצר:", err);
		}
	};

	return goToProduct;
}

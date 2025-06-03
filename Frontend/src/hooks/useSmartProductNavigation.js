import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../redux/slices/productsSlice";

export function useSmartProductNavigation() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const productInState = useSelector((state) => state.products.product);

	const goToProduct = async (productId) => {
		try {
			if (!productInState || productInState._id !== productId) {
				const action = await dispatch(getProductById(productId));
				if (getProductById.fulfilled.match(action)) {
					const product = action.payload;
					const slug = createSlug(product.name);
					navigate(`/product/${product._id}-${slug}`);
				} else {
					throw new Error("טעינת מוצר נכשלה");
				}
			} else {
				const slug = createSlug(productInState.name);
				navigate(`/product/${productInState._id}-${slug}`);
			}
		} catch (err) {
			console.error("שגיאה בניווט למוצר:", err);
		}
	};

	return goToProduct;
}

function createSlug(name) {
	return name
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/\s+/g, "-")
		.replace(/[^a-zA-Z0-9-א-ת]/g, "")
		.toLowerCase();
}

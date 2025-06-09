import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCategoryProducts, fetchSubCategoryProducts, clearCategory, fetchCategoriesList } from "../../redux/slices/categoriesSlice";
import { Spinner } from "react-bootstrap";
import { FaArrowDown, FaArrowUp, FaArrowRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";
import "../../style/CategoryPage.css";

export default function CategoryPage() {
	const { categoryKey, subKey } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { products, categoriesList } = useSelector((state) => state.categories);
	const [currentHebrewCategory, setCurrentHebrewCategory] = useState("");
	const [currentHebrewSubCategory, setCurrentHebrewSubCategory] = useState("");
	const [showSidebar, setShowSidebar] = useState(false);
	const [sortOrder, setSortOrder] = useState("asc");
	const [initialLoading, setInitialLoading] = useState(true);

	useEffect(() => {
		dispatch(clearCategory());
		dispatch(fetchCategoriesList());
		const fetchData = async () => {
			if (subKey) {
				await dispatch(fetchSubCategoryProducts({ categoryKey, subKey }));
			} else {
				await dispatch(fetchCategoryProducts(categoryKey));
			}
			setInitialLoading(false);
		};
		fetchData();
	}, [dispatch, categoryKey, subKey]);

	useEffect(() => {
		if (categoriesList?.length > 0) {
			const category = categoriesList.find((cat) => cat.key === categoryKey);
			if (category) {
				setCurrentHebrewCategory(category.he);
				if (subKey) {
					const subCategory = category.subCategories?.find((sub) => sub.key === subKey);
					if (subCategory) {
						setCurrentHebrewSubCategory(subCategory.he);
					}
				} else {
					setCurrentHebrewSubCategory("");
				}
			}
		}
	}, [categoriesList, categoryKey, subKey]);

	return (
		<div className='container my-4'>
			<div className='mb-3 text-end'>
				<button className='btn btn-outline-dark' onClick={() => navigate("/menu")}>
					<FaArrowRight className='ms-2' />
					חזרה לעמוד תפריט
				</button>
			</div>

			<div className='mb-4 border-bottom pb-2 text-end'>
				<h2 className='h4 fw-bold'>{subKey ? `תת־קטגוריה: ${currentHebrewSubCategory} (קבוצה: ${currentHebrewCategory})` : `קטגוריה: ${currentHebrewCategory}`}</h2>
			</div>

			<div className='d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2'>
				<input type='text' placeholder='חיפוש מוצר...' className='form-control w-100 w-md-auto' style={{ maxWidth: "250px", direction: "rtl" }} disabled />

				<div className='d-flex align-items-center gap-2'>
					<select className='form-select' style={{ maxWidth: "200px" }} disabled>
						<option>מיין לפי</option>
						<option>מחיר</option>
						<option>פופולריות</option>
					</select>
					<button className='btn btn-outline-secondary' title='מיין לפי עלייה/ירידה' onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}>
						{sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
					</button>
				</div>
			</div>

			<div className='row'>
				<div className='col-12 col-md-3 mb-4'>
					<button className='btn btn-outline-primary w-100 d-md-none mb-3' onClick={() => setShowSidebar((prev) => !prev)}>
						תפריט קטגוריות
					</button>

					<div className={`sidebar-wrapper ${showSidebar ? "d-block" : "d-none"} d-md-block`}>
						<h6 className='fw-bold mb-3 pb-2 border-bottom text-end'>קטגוריות</h6>
						<ul className='list-unstyled text-end category-list' style={{ direction: "rtl" }}>
							{categoriesList.map((cat) => (
								<li key={cat.key} className='mb-2'>
									<Link to={`/menu/${cat.key}`} className={`text-decoration-none fw-bold d-flex justify-content-between align-items-center px-2 py-1 rounded ${cat.key === categoryKey ? "active-category" : "text-dark"}`}>
										<span>{cat.he}</span>
										{cat.subCategories?.length > 0 && <span className='text-muted small'>{cat.key === categoryKey ? <FaArrowUp /> : <FaArrowDown />}</span>}
									</Link>

									<AnimatePresence initial={false}>
										{cat.key === categoryKey && cat.subCategories && (
											<motion.ul className='list-unstyled pe-3 mt-2 sub-category-list' initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
												{cat.subCategories.map((sub) => (
													<li key={sub.key} className='mt-1'>
														<Link to={`/menu/${cat.key}/${sub.key}`} className={`text-decoration-none d-block py-1 px-2 rounded ${sub.key === subKey ? "active-sub" : "text-secondary"}`}>
															{sub.he}
														</Link>
													</li>
												))}
											</motion.ul>
										)}
									</AnimatePresence>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='col-12 col-md-9'>
					{initialLoading ? (
						<div className='d-flex justify-content-center py-5'>
							<Spinner animation='border' />
						</div>
					) : Array.isArray(products) && products.length > 0 ? (
						<div className='row'>
							{products.map((prod) =>
								prod ? (
									<div key={prod._id} className='col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2-4 mb-4'>
										<ProductCard prod={prod} />
									</div>
								) : null
							)}
						</div>
					) : (
						<div className='text-center py-4'>לא נמצאו מוצרים {subKey ? "בתת־קטגוריה זו" : "בקטגוריה זו"}.</div>
					)}
				</div>
			</div>
		</div>
	);
}

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Container, Row, Col, Button, Badge } from "react-bootstrap";
import { getProductById } from "../../redux/slices/productsSlice";
import { fetchCategoriesList } from "../../redux/slices/categoriesSlice";

export default function ProductPage() {
	const { slugId } = useParams();
	const productId = slugId.slice(slugId.lastIndexOf("-") + 1);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { categoriesList } = useSelector((state) => state.categories);

	const [product, setProduct] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentCategoryHe, setCurrentCategoryHe] = useState("");
	const [currentSubCategoryHe, setCurrentSubCategoryHe] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				await dispatch(fetchCategoriesList());
				const action = await dispatch(getProductById(productId));
				if (getProductById.fulfilled.match(action)) {
					const data = action.payload;
					setProduct(data);
					const productHebrawCategory = categoriesList.find((cat) => cat.key === data.category)?.he;
					const productHebrawSubCategory = data.subCategory ? categoriesList.find((cat) => cat.key === data.category)?.subCategories?.find((sub) => sub.key === data.subCategory)?.he : "";
					setCurrentCategoryHe(productHebrawCategory);
					setCurrentSubCategoryHe(productHebrawSubCategory);
					if (Array.isArray(data.size) && data.size.length > 0) {
						setSelectedSize(data.size[0]);
					}
				} else {
					setProduct(null);
				}
			} catch (err) {
				console.error("Failed to fetch product:", err);
				setProduct(null);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [dispatch, productId]);

	if (isLoading) {
		return (
			<div className='d-flex justify-content-center align-items-center vh-100 bg-white'>
				<Spinner animation='border' variant='warning' />
			</div>
		);
	}

	if (!product) {
		return (
			<div className='d-flex justify-content-center align-items-center vh-100 bg-white px-3'>
				<div className='text-center'>
					<h2 className='h4 text-dark mb-3'>No product found</h2>
					<p className='text-muted'>Please add a product or try again</p>
					<Button variant='primary' onClick={() => navigate(-1)}>
						חזור אחורה
					</Button>
				</div>
			</div>
		);
	}

	const prices = (product.size || []).map((s) => s.price);
	const minPrice = prices.length ? Math.min(...prices) : 0;
	const maxPrice = prices.length ? Math.max(...prices) : 0;
	const priceDisplay = minPrice === maxPrice ? `₪${minPrice.toFixed(2)}` : `₪${minPrice.toFixed(2)} - ₪${maxPrice.toFixed(2)}`;
	const totalPrice = selectedSize ? selectedSize.price.toFixed(2) : "0.00";

	return (
		<Container className='py-4 bg-white'>
			<Button variant='light' className='mb-4' onClick={() => navigate(-1)}>
				&larr; חזרה אחורה
			</Button>

			<Row className='gx-4 gy-4'>
				<Col md={6}>
					<div className='border rounded overflow-hidden'>
						<img src={product.image?.url || "https://via.placeholder.com/600x400?text=No+Image"} alt={product.image?.alt || product.name} className='img-fluid' style={{ objectFit: "cover", width: "100%", height: "400px" }} />
					</div>
				</Col>

				<Col md={6}>
					<div className='mb-2'>
						<Badge bg='warning' text='dark'>
							{currentCategoryHe} {product.subCategory ? `- ${currentSubCategoryHe}` : ""}
						</Badge>
					</div>

					<h1 className='h2 fw-light mb-3'>{product.name}</h1>

					<div className='mb-3'>
						<h4 className='fw-light'>{priceDisplay}</h4>
					</div>

					<p className='text-secondary mb-4'>{product.description}</p>

					{Array.isArray(product.size) && product.size.length > 0 && (
						<div className='mb-4'>
							<label className='form-label fw-medium'>גדלים</label>
							<div className='d-flex flex-wrap gap-2'>
								{product.size.map((s, idx) => {
									const isSelected = selectedSize === s;
									return (
										<Button key={idx} variant={isSelected ? "warning" : "outline-secondary"} onClick={() => setSelectedSize(s)}>
											{s.quantity} {product.unit} – ₪{s.price.toFixed(2)}
										</Button>
									);
								})}
							</div>
						</div>
					)}

					<div className='border-top pt-3'>
						<h5 className='fw-normal'>
							סה"כ: <span className='fw-semibold'>₪{totalPrice}</span>
						</h5>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { fetchCategoriesList } from "../../redux/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, successMessage } from "../../services/messageServices";
import { editProduct } from "../../redux/slices/productsSlice";

function EditProduct({ product }) {
	const dispatch = useDispatch();
	const categoriesList = useSelector((state) => state.categories?.categoriesList || []);
	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		dispatch(fetchCategoriesList());
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			name: product?.name || "",
			description: product?.description || "",
			category: product?.category || "",
			subCategory: product?.subCategory || "",
			size: product?.size || [{ quantity: 0, price: 0 }],
			unit: product?.unit || "",
			popularity: product?.popularity || 0,
			image: {
				url: product?.image?.url || "",
				alt: product?.image?.alt || "",
			},
		},
		validationSchema: yup.object({
			name: yup.string().required("יש להזין שם").min(3, "השם חייב להכיל לפחות 3 תווים").max(100, "השם יכול להכיל עד 100 תווים"),
			description: yup.string().required("יש להזין תיאור").min(10, "התיאור חייב להכיל לפחות 10 תווים"),
			category: yup.string().required("יש לבחור קטגוריה"),
			subCategory: yup.string(),
			size: yup
				.array()
				.of(
					yup.object({
						quantity: yup.number().required("יש להזין כמות"),
						price: yup.number().required("יש להזין מחיר"),
					})
				)
				.min(1, "יש להזין לפחות גודל אחד"),
			unit: yup.string().required("יש לבחור יחידה").oneOf(["kg", "g", "L", "יחידות"], "יחידה לא תקינה"),
			popularity: yup.number().min(0, "הפופולריות חייבת להיות לפחות 0").default(0),
			image: yup.object({
				url: yup
					.string()
					.required("יש להזין כתובת תמונה")
					.matches(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i, "כתובת תמונה לא תקינה"),
				alt: yup.string().required("יש להזין תיאור תמונה").min(1, "התיאור חייב להכיל לפחות תו אחד").max(200, "התיאור יכול להכיל עד 200 תווים"),
			}),
		}),
		onSubmit: async (values) => {
			try {
				console.log("Form values:", values);
				const response = await dispatch(editProduct({ id: product._id, data: values })).unwrap();
				successMessage("המוצר עודכן בהצלחה");
			} catch (error) {
				console.log(error);
				errorMessage("ארעה שגיאה בעדכון המוצר");
			}
		},
	});

	return (
		<>
			<h1 className='my-4 text-center'>הוסף מוצר</h1>
			<div className='container w-100 text-center'>
				<FormikProvider value={formik}>
					<form onSubmit={formik.handleSubmit} className='w-100 p-3 border rounded bg-light'>
						<div className='row gx-3 gy-3 mb-4'>
							<div className='col-12 col-md-6'>
								<div className='form-floating'>
									<input type='text' name='name' className='form-control' id='name' placeholder='שם' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
									<label htmlFor='name'>שם</label>
								</div>
								{formik.errors.name && formik.touched.name && <div className='text-danger small mt-1'>{formik.errors.name}</div>}
							</div>

							<div className='col-12 col-md-6'>
								<div className='form-floating'>
									<textarea
										name='description'
										className='form-control'
										id='description'
										placeholder='תיאור'
										value={formik.values.description}
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										style={{ minHeight: 80, resize: "none" }}
									/>
									<label htmlFor='description'>תיאור</label>
								</div>
								{formik.errors.description && formik.touched.description && <div className='text-danger small mt-1'>{formik.errors.description}</div>}
							</div>
						</div>

						<div className='row gx-3 gy-3 mb-4'>
							<div className='col-12 col-md-6'>
								<div className='form-floating'>
									<select
										name='category'
										id='category'
										className='form-select'
										value={formik.values.category}
										onChange={(e) => {
											const selected = e.target.value;
											setSelectedCategory(selected);
											formik.setFieldValue("category", selected);
											formik.setFieldValue("subCategory", "");
										}}
										onBlur={formik.handleBlur}
										disabled={categoriesList.length === 0}>
										{categoriesList.length === 0 ? (
											<option value=''>טוען קטגוריות…</option>
										) : (
											<>
												<option value=''>בחר קטגוריה</option>
												{categoriesList.map((cat) => (
													<option key={cat.key} value={cat.key}>
														{cat.he}
													</option>
												))}
											</>
										)}
									</select>
									<label htmlFor='category'>קטגוריה</label>
								</div>
								{formik.touched.category && formik.errors.category && <div className='text-danger small mt-1'>{formik.errors.category}</div>}
							</div>

							<div className='col-12 col-md-6'>
								<div className='form-floating'>
									<select
										name='subCategory'
										id='subCategory'
										className='form-select'
										value={formik.values.subCategory}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										disabled={!selectedCategory || !(categoriesList.find((cat) => cat.key === selectedCategory)?.subCategories?.length > 0)}>
										<option value=''>{!selectedCategory || !(categoriesList.find((cat) => cat.key === selectedCategory)?.subCategories?.length > 0) ? "אין תת־קטגוריות" : "בחר תת־קטגוריה"}</option>
										{selectedCategory &&
											categoriesList
												.find((cat) => cat.key === selectedCategory)
												?.subCategories.map((sub) => (
													<option key={sub.key} value={sub.key}>
														{sub.he}
													</option>
												))}
									</select>
									<label htmlFor='subCategory'>תת קטגוריה</label>
								</div>
								{formik.touched.subCategory && formik.errors.subCategory && <div className='text-danger small mt-1'>{formik.errors.subCategory}</div>}
							</div>
						</div>

						<div className='row gx-3 gy-3 mb-4'>
							<div className='col-12 col-md-6'>
								<div className='form-floating'>
									<input type='number' name='popularity' className='form-control' id='popularity' placeholder='פופולריות' value={formik.values.popularity} onBlur={formik.handleBlur} onChange={formik.handleChange} />
									<label htmlFor='popularity'>פופולריות</label>
								</div>
								{formik.errors.popularity && formik.touched.popularity && <div className='text-danger small mt-1'>{formik.errors.popularity}</div>}
							</div>

							<div className='col-12 col-md-6'>
								<div className='form-floating'>
									<select name='unit' className='form-select' id='unit' value={formik.values.unit} onBlur={formik.handleBlur} onChange={formik.handleChange}>
										<option value=''>בחר יחידה</option>
										<option value='kg'>kg</option>
										<option value='g'>g</option>
										<option value='L'>L</option>
										<option value='יחידות'>יחידות</option>
									</select>
									<label htmlFor='unit'>יחידה*</label>
								</div>
								{formik.errors.unit && formik.touched.unit && <div className='text-danger small mt-1'>{formik.errors.unit}</div>}
							</div>
						</div>

						<div className='row gx-3 gy-3 mb-4'>
							<div className='col-12'>
								<FieldArray name='size'>
									{({ push, remove }) => (
										<>
											{formik.values.size.map((item, index) => (
												<div key={index} className='row gx-3 gy-2 align-items-end mb-2'>
													<div className='col-12 col-sm'>
														<div className='form-floating'>
															<input
																type='number'
																name={`size[${index}].quantity`}
																className='form-control'
																id={`sizeQuantity${index}`}
																placeholder='כמות'
																value={formik.values.size[index]?.quantity}
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
															/>
															<label htmlFor={`sizeQuantity${index}`}>כמות</label>
														</div>
														{formik.touched.size?.[index]?.quantity && formik.errors.size?.[index]?.quantity && <div className='text-danger small mt-1'>{formik.errors.size[index].quantity}</div>}
													</div>

													<div className='col-12 col-sm'>
														<div className='form-floating'>
															<input
																type='number'
																name={`size[${index}].price`}
																className='form-control'
																id={`sizePrice${index}`}
																placeholder='מחיר'
																value={formik.values.size[index]?.price}
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
															/>
															<label htmlFor={`sizePrice${index}`}>מחיר</label>
														</div>
														{formik.touched.size?.[index]?.price && formik.errors.size?.[index]?.price && <div className='text-danger small mt-1'>{formik.errors.size[index].price}</div>}
													</div>

													{index > 0 && (
														<div className='col-auto'>
															<button type='button' className='btn btn-outline-danger' onClick={() => remove(index)}>
																הסר
															</button>
														</div>
													)}
												</div>
											))}

											{formik.values.size.length < 3 && (
												<button type='button' className='btn btn-outline-primary' onClick={() => push({ quantity: 0, price: 0 })}>
													הוסף כמות ומחיר
												</button>
											)}
										</>
									)}
								</FieldArray>
							</div>
						</div>

						<div className='row gx-3 gy-3 mb-4'>
							<div className='col-12 col-md-6'>
								<div className='form-floating'>
									<input type='url' name='image.url' className='form-control' id='imageUrl' placeholder='כתובת תמונה' value={formik.values.image.url} onBlur={formik.handleBlur} onChange={formik.handleChange} />
									<label htmlFor='imageUrl'>כתובת תמונה</label>
								</div>
								{formik.errors.image?.url && formik.touched.image?.url && <div className='text-danger small mt-1'>{formik.errors.image.url}</div>}
							</div>

							<div className='col-12 col-md-6'>
								<div className='form-floating'>
									<input type='text' name='image.alt' className='form-control' id='imageAlt' placeholder='תיאור תמונה' value={formik.values.image.alt} onBlur={formik.handleBlur} onChange={formik.handleChange} />
									<label htmlFor='imageAlt'>תיאור תמונה</label>
								</div>
								{formik.errors.image?.alt && formik.touched.image?.alt && <div className='text-danger small mt-1'>{formik.errors.image.alt}</div>}
							</div>
						</div>

						<div className='row'>
							<div className='col-12'>
								<button type='submit' className='btn btn-primary w-100' disabled={!formik.isValid}>
									שלח
								</button>
							</div>
						</div>
					</form>
				</FormikProvider>
			</div>
		</>
	);
}

export default EditProduct;

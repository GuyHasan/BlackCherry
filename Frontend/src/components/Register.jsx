import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerThunk } from "../redux/slices/userSlice";
import { errorMessage, successMessage } from "../services/messageServices";

function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.user);
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, []);
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			username: yup.string().required("שם משתמש הוא חובה").min(5, "שם משתמש חייב להיות לפחות 5 תווים").max(256, "שם משתמש לא יכול להיות ארוך מ-256 תווים"),
			email: yup.string().email("אימייל לא תקין").required("אימייל הינו שדה חובה").min(5, "אימייל לא יכול להיות קצר מ5 תווים"),
			password: yup
				.string()
				.required("סיסמא היא שדה חובה")
				.min(9, "סיסמא חייבת להיות לפחות באורך 9 תווים")
				.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/, "סיסמא חייבת להכיל לפחות אות גדולה ואות קטנה ואחד מהתווים הבאים !@#$%^&*-"),
		}),
		onSubmit: async (values) => {
			try {
				console.log(values);
				const response = await dispatch(registerThunk(values)).unwrap();
				successMessage("נרשמת בהצלחה!");
				navigate("/login");
			} catch (error) {
				console.log(error);
				errorMessage(error.message || "ארעה שגיאה במהלך ההרשמה, אנא בדוק את הפרטים שהזנת ונסה שנית מאוחר יותר.");
			}
		},
	});
	return (
		<>
			<div className='container w-100 mt-5 p-0 pb-5'>
				<h1 className='w-100 text-center'>הרשמה</h1>
				<form onSubmit={formik.handleSubmit} className='my-3 w-75 mx-auto'>
					<div className='d-flex flex-column g-0 mx-auto w-75 '>
						<div className='form-floating mb-3 col-sm'>
							<input name='username' type='text' className='form-control' id='username' placeholder='Username' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
							<label htmlFor='username'>שם משתמש</label>
							{formik.errors.username && formik.touched.username && <div className='text-danger'>{formik.errors.username}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='email' type='email' className='form-control' id='email' placeholder='Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
							<label htmlFor='email'>אימייל</label>
							{formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='password' type='password' className='form-control' id='password' placeholder='Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
							<label htmlFor='password'>סיסמא</label>
							{formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
						</div>
					</div>

					<div className='d-flex justify-content-center'>
						<button type='submit' className='btn btn-success' disabled={!formik.isValid || !formik.dirty}>
							להרשמה
						</button>
					</div>
				</form>
				<p className='text-center'>
					נרשמת כבר? ניתן להתחבר <Link to='/login'>כאן</Link>
				</p>
			</div>
			<p className='spacerFromFooter mt-5'></p>
		</>
	);
}

export default Register;

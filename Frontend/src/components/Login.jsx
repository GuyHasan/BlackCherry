import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginThunk } from "../redux/slices/userSlice";
import { errorMessage, successMessage } from "../services/messageServices";
import SEO from "./SEO";

function Login() {
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
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup.string().required("אימייל הוא שדה חובה").email("אימייל לא תקין").min(5, "אימייל לא יכול להיות קצר מ-5 תווים"),
			password: yup.string().required("סיסמא היא שדה חובה").min(8, "סיסמא חייבת להיות לפחות באורך 8 תווים"),
		}),
		onSubmit: async (values) => {
			try {
				console.log("Login values:", values);
				const response = await dispatch(loginThunk(values)).unwrap();
				console.log("Login response:", response);
				successMessage("התחברת בהצלחה!");
				navigate("/");
			} catch (error) {
				console.log(error);
				errorMessage(error.message || " ארעה שגיאה במהלך ההתחברות, אנא בדוק את פרטי ההתחברות או נסה שנית מאוחר יותר.");
			}
		},
	});
	return (
		<>
			<SEO title='התחברות' description='התחברו לאתר שלנו' keywords={["התחברות, משתמש קיים, כניסה לחשבון"]} />
			<h1 className='w-100 text-center mt-5'>התחברות</h1>
			<form onSubmit={formik.handleSubmit} className='my-3 w-50 mx-auto'>
				<div className='form-floating mb-3'>
					<input name='email' type='text' className='form-control' id='email' placeholder='אימייל' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
					<label htmlFor='email' className='text-end'>
						אימייל
					</label>
				</div>
				{formik.errors.email && formik.touched.email && <div className='text-danger m-2'>{formik.errors.email}</div>}
				<div className='form-floating'>
					<input name='password' type='password' className='form-control' id='password' placeholder='סיסמא' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
					<label htmlFor='password'>סיסמא</label>
				</div>
				{formik.errors.password && formik.touched.password && <div className='text-danger m-2'>{formik.errors.password}</div>}
				<button type='submit' className='btn btn-primary my-4 mx-auto d-block' disabled={!formik.isValid || !formik.dirty}>
					כניסה
				</button>
			</form>
			<p className='text-center'>
				עוד לא נרשמתם? ניתן להירשם <Link to='/register'>כאן</Link>
			</p>
		</>
	);
}

export default Login;

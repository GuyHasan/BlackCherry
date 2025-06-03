import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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
			username: "",
			password: "",
		},
		validationSchema: yup.object({
			username: yup.string().required("שם משתמש הוא שדה חובה"),
			password: yup.string().required("סיסמא היא שדה חובה").min(9, "סיסמא חייבת להיות לפחות באורך 9 תווים"),
		}),
		onSubmit: async (values) => {
			try {
				console.log("Login values:", values);
				if (response) {
					navigate("/");
				}
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<>
			<h1 className='w-100 text-center mt-5'>התחברות</h1>
			<form onSubmit={formik.handleSubmit} className='my-3 w-50 mx-auto'>
				<div className='form-floating mb-3'>
					<input name='username' type='text' className='form-control' id='username' placeholder='שם משתמש' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
					<label htmlFor='username' className='text-end'>
						שם משתמש
					</label>
				</div>
				{formik.errors.username && formik.touched.username && <div className='text-danger m-2'>{formik.errors.username}</div>}
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

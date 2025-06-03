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
			username: yup.string().required("Username is required"),
			password: yup.string().required("Password is required").min(9, "Password must be at least 9 characters long"),
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
			<h1 className='w-100 text-center mt-5'>Login</h1>
			<form onSubmit={formik.handleSubmit} className='my-3 w-50 mx-auto'>
				<div className='form-floating mb-3'>
					<input name='username' type='text' className='form-control' id='username' placeholder='username' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
					<label htmlFor='username'>Username</label>
				</div>
				{formik.errors.username && formik.touched.username && <div className='text-danger m-2'>{formik.errors.username}</div>}
				<div className='form-floating'>
					<input name='password' type='password' className='form-control' id='password' placeholder='Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
					<label htmlFor='password'>Password</label>
				</div>
				{formik.errors.password && formik.touched.password && <div className='text-danger m-2'>{formik.errors.password}</div>}
				<button type='submit' className='btn btn-primary my-4 mx-auto d-block' disabled={!formik.isValid || !formik.dirty}>
					Login
				</button>
			</form>
			<p className='text-center'>
				Don't Have a User? You Can Register <Link to='/register'>Here</Link>
			</p>
		</>
	);
}

export default Login;

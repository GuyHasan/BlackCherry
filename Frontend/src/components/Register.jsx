import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Register() {
	const navigate = useNavigate();
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
			username: yup.string().required("Username is required").min(5, "Username must be at least 5 characters").max(256, "Username must be at most 256 characters").required("Username is required"),
			email: yup.string().email("Invalid Email Format").required("Email is required").min(5, "Email must be at least 5 characters"),
			password: yup
				.string()
				.required("Password is required")
				.min(9, "Password must be at least 9 characters")
				.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/, "Password must contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"),
		}),
		onSubmit: async (values) => {
			try {
				console.log(values);
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<>
			<div className='container w-100 mt-5 p-0 pb-5'>
				<h1 className='w-100 text-center'>Register</h1>
				<form onSubmit={formik.handleSubmit} className='my-3 w-75 mx-auto'>
					<div className='d-flex flex-column g-0 mx-auto w-75 '>
						<div className='form-floating mb-3 col-sm'>
							<input name='username' type='text' className='form-control' id='username' placeholder='Username' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
							<label htmlFor='username'>Username</label>
							{formik.errors.username && formik.touched.username && <div className='text-danger'>{formik.errors.username}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='email' type='email' className='form-control' id='email' placeholder='Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
							<label htmlFor='email'>Email</label>
							{formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='password' type='password' className='form-control' id='password' placeholder='Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
							<label htmlFor='password'>Password</label>
							{formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
						</div>
					</div>

					<div className='d-flex justify-content-center'>
						<button type='submit' className='btn btn-success' disabled={!formik.isValid || !formik.dirty}>
							Register
						</button>
					</div>
				</form>
				<p className='text-center'>
					Already Registered? You Can Login <Link to='/login'>Here</Link>
				</p>
			</div>
			<p className='spacerFromFooter mt-5'></p>
		</>
	);
}

export default Register;
